"""
Molecule Descriptor Training Script.
Trains ECFP+SVM and ECFP+MLP on BACE, BBBP, ClinTox.
Supports: early stopping, checkpointing, resume, full metrics & visualization.
"""
import os
import sys
import argparse
import json
import time
import numpy as np
import torch
from pathlib import Path
from sklearn.metrics import roc_auc_score

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from shared.utils import Config, set_seed, Trainer
from shared.utils.imbalance import (
    compute_balanced_class_weights,
    is_extremely_imbalanced_binary,
    predict_binary_with_threshold,
    tune_binary_threshold,
)
from shared.utils.paths import get_results_dir
from shared.metrics import compute_molecule_metrics
from shared.visualization import (
    save_all_experiment_plots, plot_training_curves,
    plot_model_comparison_bar,
)
from molecule.classical.descriptor.models import build_descriptor_model, MolecularMLP
from molecule.classical.dataset import get_descriptor_dataloaders, MoleculeDescriptorDataset

RESULTS_DIR = get_results_dir(project_root=PROJECT_ROOT)


def make_metrics_fn(task: str = "binary", num_classes: int = 2):
    def metrics_fn(y_true, y_pred, y_prob):
        return compute_molecule_metrics(y_true, y_pred, y_prob, task=task, num_classes=num_classes)
    return metrics_fn


def train_svm(config: Config) -> dict:
    """Train SVM model (sklearn pipeline — no epochs, no early stopping)."""
    set_seed(config.seed)

    # Load data as numpy
    train_ds = MoleculeDescriptorDataset(
        config.data_dir, config.dataset_name, "train",
        data_fraction=config.data_fraction, seed=config.seed,
    )
    val_ds = MoleculeDescriptorDataset(config.data_dir, config.dataset_name, "val")
    test_ds = MoleculeDescriptorDataset(config.data_dir, config.dataset_name, "test")

    X_train, y_train = train_ds.get_numpy()
    X_val, y_val = val_ds.get_numpy()
    X_test, y_test = test_ds.get_numpy()
    use_imbalance_fix = is_extremely_imbalanced_binary(y_train)

    print(f"\nSVM Training — {config.dataset_name.upper()}")
    print(f"  Train: {len(X_train)} | Val: {len(X_val)} | Test: {len(X_test)}")

    # Build and train
    model = build_descriptor_model("svm")
    t0 = time.time()
    model.fit(X_train, y_train)
    train_time = time.time() - t0

    threshold = 0.5
    if use_imbalance_fix:
        val_prob = model.predict_proba(X_val)
        threshold, threshold_score = tune_binary_threshold(y_val, val_prob, metric="balanced_accuracy")
        print(
            f"  Threshold tuned on val: {threshold:.3f} "
            f"(balanced_accuracy={threshold_score:.4f})"
        )

    # Predictions
    results = {}
    for name, X, y in [("train", X_train, y_train), ("val", X_val, y_val), ("test", X_test, y_test)]:
        y_prob = model.predict_proba(X)
        y_pred = (
            predict_binary_with_threshold(y_prob, threshold)
            if use_imbalance_fix else model.predict(X)
        )
        metrics = compute_molecule_metrics(y, y_pred, y_prob, task="binary", num_classes=2)
        metrics["time"] = train_time
        results[name] = metrics
        parts = [f"{k}={v:.4f}" for k, v in metrics.items() if isinstance(v, float)]
        print(f"  {name}: {' | '.join(parts)}")

    # Save results
    tag = config.make_experiment_tag()
    results_dir = str(RESULTS_DIR / "tables")
    os.makedirs(results_dir, exist_ok=True)
    with open(os.path.join(results_dir, f"{tag}_results.json"), "w") as f:
        json.dump(results, f, indent=2, default=str)

    # Plots
    figures_dir = str(RESULTS_DIR / "figures" / tag)
    save_all_experiment_plots(
        output_dir=figures_dir,
        y_true=y_test,
        y_pred=(predict_binary_with_threshold(model.predict_proba(X_test), threshold) if use_imbalance_fix else model.predict(X_test)),
        y_prob=model.predict_proba(X_test),
        class_names=["Inactive", "Active"],
        model_name=f"SVM ({config.dataset_name.upper()})",
    )

    return {"test_metrics": results["test"], "train_time": train_time}


def train_mlp(config: Config) -> dict:
    """Train MLP model with full Trainer infrastructure."""
    set_seed(config.seed)

    train_ds = MoleculeDescriptorDataset(
        config.data_dir, config.dataset_name, "train",
        data_fraction=config.data_fraction, seed=config.seed,
    )
    use_imbalance_fix = is_extremely_imbalanced_binary(train_ds.y)
    if use_imbalance_fix:
        config.es_monitor = "val_pr_auc"
        config.tune_binary_threshold_on_val = True

    train_loader, val_loader, test_loader = get_descriptor_dataloaders(
        data_dir=config.data_dir,
        dataset_name=config.dataset_name,
        batch_size=config.batch_size,
        num_workers=config.num_workers,
        data_fraction=config.data_fraction,
        seed=config.seed,
        pin_memory=config.pin_memory,
        persistent_workers=getattr(config, 'persistent_workers', False),
        weighted_sampling=use_imbalance_fix,
    )

    # Infer input dim
    sample_x, _ = next(iter(train_loader))
    input_dim = sample_x.shape[1]

    model = MolecularMLP(input_dim=input_dim, num_classes=config.num_classes)
    criterion = (
        torch.nn.CrossEntropyLoss(weight=compute_balanced_class_weights(train_ds.y).to(config.device))
        if use_imbalance_fix else torch.nn.CrossEntropyLoss()
    )
    metrics_fn = make_metrics_fn("binary", config.num_classes)

    trainer = Trainer(
        model=model,
        config=config,
        train_loader=train_loader,
        val_loader=val_loader,
        test_loader=test_loader,
        criterion=criterion,
        metrics_fn=metrics_fn,
    )

    results = trainer.train()

    # Plots
    tag = config.make_experiment_tag()
    figures_dir = str(RESULTS_DIR / "figures" / tag)

    pred_path = os.path.join(config.log_dir, tag, "predictions.json")
    if os.path.exists(pred_path):
        with open(pred_path, "r") as f:
            preds = json.load(f)
        save_all_experiment_plots(
            output_dir=figures_dir,
            history=trainer.logger.get_history(),
            y_true=np.array(preds["y_true"]),
            y_pred=np.array(preds["y_pred"]),
            y_prob=np.array(preds["y_prob"]),
            class_names=["Inactive", "Active"],
            model_name=f"MLP ({config.dataset_name.upper()})",
        )

    return results


def run_multi_seed(config: Config, model_type: str) -> dict:
    all_results = {}
    all_test_metrics = {}

    for seed in config.seeds:
        print(f"\n{'='*60}\nSEED {seed}\n{'='*60}")
        config.seed = seed

        if model_type == "svm":
            results = train_svm(config)
        else:
            results = train_mlp(config)

        all_results[seed] = results
        if "test_metrics" in results:
            for key, val in results["test_metrics"].items():
                if key not in all_test_metrics:
                    all_test_metrics[key] = []
                if isinstance(val, (int, float)):
                    all_test_metrics[key].append(val)

    # Aggregate
    summary = {}
    for key, vals in all_test_metrics.items():
        if vals:
            summary[f"{key}_mean"] = float(np.mean(vals))
            summary[f"{key}_std"] = float(np.std(vals))

    tag_base = config.experiment_name
    agg_dir = str(RESULTS_DIR / "tables")
    os.makedirs(agg_dir, exist_ok=True)
    with open(os.path.join(agg_dir, f"{tag_base}_aggregated.json"), "w") as f:
        json.dump({"summary": summary, "per_seed": {
            str(k): {mk: mv for mk, mv in v.get("test_metrics", {}).items()
                     if isinstance(mv, (int, float))}
            for k, v in all_results.items()
        }}, f, indent=2, default=str)

    print(f"\n{'='*60}\nAGGREGATED ({len(config.seeds)} seeds)\n{'='*60}")
    for key, val in summary.items():
        print(f"  {key}: {val:.4f}")

    return {"summary": summary, "per_seed": all_results}


def main():
    parser = argparse.ArgumentParser(description="Train descriptor-based molecule models")
    parser.add_argument("--model", type=str, required=True,
                        choices=["svm", "mlp"],
                        help="Model type")
    parser.add_argument("--dataset", type=str, default="bace",
                        choices=["bace", "bbbp", "clintox"])
    parser.add_argument("--data-dir", type=str,
                        default=str(PROJECT_ROOT.parent / "data" / "processed"))
    parser.add_argument("--batch-size", type=int, default=256)
    parser.add_argument("--epochs", type=int, default=100)
    parser.add_argument("--lr", type=float, default=1e-3)
    parser.add_argument("--patience", type=int, default=15)
    parser.add_argument("--seed", type=int, default=None)
    parser.add_argument("--seeds", nargs="+", type=int, default=[0, 42, 123, 456, 789])
    parser.add_argument("--data-fraction", type=float, default=1.0)
    parser.add_argument("--resume", type=str, default=None)
    parser.add_argument("--device", type=str, default="auto")
    parser.add_argument("--num-workers", type=int, default=8)
    parser.add_argument("--use-amp", action="store_true", default=False,
                        help="Enable Automatic Mixed Precision (FP16)")
    parser.add_argument("--persistent-workers", action="store_true", default=False,
                        help="Keep DataLoader workers alive between epochs")
    args = parser.parse_args()

    config = Config(
        experiment_name=f"mol_{args.model}_{args.dataset}" + (f"_frac{args.data_fraction}" if args.data_fraction < 1.0 else ""),
        modality="molecule",
        model_name=args.model,
        task="binary",
        data_dir=args.data_dir,
        dataset_name=args.dataset,
        num_classes=2,
        batch_size=args.batch_size,
        epochs=args.epochs,
        lr=args.lr,
        es_patience=args.patience,
        data_fraction=args.data_fraction,
        resume_from=args.resume,
        device=args.device,
        num_workers=args.num_workers,
        use_amp=args.use_amp,
        persistent_workers=args.persistent_workers,
        seeds=args.seeds,
    )

    if args.seed is not None:
        config.seed = args.seed
        config.seeds = [args.seed]

    run_multi_seed(config, args.model)
    print(f"\n[DONE] Molecule descriptor training ({args.model}/{args.dataset}) completed.")


if __name__ == "__main__":
    main()
