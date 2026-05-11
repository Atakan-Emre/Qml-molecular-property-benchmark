"""
Molecule Quantum Graph Training — QGNN (Quantum Graph Neural Network).

Pipeline: Molecular graph → Classical node embedding → Quantum message passing → Global pool → FC
Based on Verdon et al. 2019 (arXiv:1909.12264).
Uses shared Trainer for epoch-level logging, TensorBoard, checkpoints.
"""
import os
import sys
import argparse
import json
import numpy as np
import torch
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from shared.utils import Config, set_seed, Trainer
from shared.utils.imbalance import compute_balanced_class_weights, is_extremely_imbalanced_binary
from shared.utils.seed_resume import (
    build_aggregate_payload,
    load_completed_test_metrics,
    recover_completed_seed_result,
    write_aggregate_payload,
)
from shared.utils.paths import get_results_dir
from shared.metrics import compute_molecule_metrics
from shared.quantum_utils import resolve_pennylane_backend
from shared.visualization import save_all_experiment_plots, plot_embedding_tsne
from molecule.quantum.graph.models.qgnn import QGNN

RESULTS_DIR = get_results_dir(project_root=PROJECT_ROOT)


def make_metrics_fn(task="binary", num_classes=2):
    def fn(y_true, y_pred, y_prob):
        return compute_molecule_metrics(y_true, y_pred, y_prob, task=task, num_classes=num_classes)
    return fn


def get_graph_dataloaders(data_dir, dataset_name, batch_size=32, data_fraction=1.0, seed=42):
    from molecule.classical.dataset import get_graph_dataloaders as _get
    train_loader, val_loader, test_loader, _ = _get(
        data_dir=data_dir,
        dataset_name=dataset_name,
        batch_size=batch_size,
        num_workers=0,
        data_fraction=data_fraction,
        seed=seed,
        weighted_sampling=(dataset_name == "clintox"),
    )
    return train_loader, val_loader, test_loader


def run_single_experiment(config: Config) -> dict:
    set_seed(config.seed)

    train_loader, val_loader, test_loader = get_graph_dataloaders(
        config.data_dir, config.dataset_name, batch_size=config.batch_size,
        data_fraction=config.data_fraction, seed=config.seed,
    )
    train_labels = np.array([int(d.y.item()) for d in train_loader.dataset.data_list], dtype=int)
    use_imbalance_fix = is_extremely_imbalanced_binary(train_labels)
    if use_imbalance_fix:
        config.es_monitor = "val_pr_auc"
        config.tune_binary_threshold_on_val = True
    print(f"\n  QGNN — {config.dataset_name.upper()} | seed={config.seed} | "
          f"qubits={config.n_qubits} | depth={config.circuit_depth}")
    print(f"  Train: {len(train_loader.dataset)} | Val: {len(val_loader.dataset)} | Test: {len(test_loader.dataset)}")

    sample = next(iter(train_loader))
    input_dim = sample.x.shape[1] if sample.x is not None else 9

    model = QGNN(
        input_dim=input_dim, hidden_dim=32, num_classes=config.num_classes,
        n_qubits=config.n_qubits, n_layers=config.circuit_depth,
        n_message_passes=3, dropout=0.3,
        backend=config.backend, diff_method=config.quantum_diff_method,
    )
    param_count = sum(p.numel() for p in model.parameters())
    print(f"  QGNN: {param_count} params, {config.n_qubits}q, depth={config.circuit_depth}")
    print(f"  PennyLane backend: {config.backend} | torch device: {config.device}")

    config.use_amp = False
    trainer = Trainer(
        model=model, config=config,
        train_loader=train_loader, val_loader=val_loader, test_loader=test_loader,
        criterion=(
            torch.nn.CrossEntropyLoss(weight=compute_balanced_class_weights(train_labels).to(config.device))
            if use_imbalance_fix else None
        ),
        metrics_fn=make_metrics_fn("binary", config.num_classes),
    )
    results = trainer.train()

    tag = config.make_experiment_tag()
    figures_dir = str(RESULTS_DIR / "figures" / tag)
    pred_path = os.path.join(config.log_dir, tag, "predictions.json")
    if os.path.exists(pred_path):
        with open(pred_path, "r") as f:
            preds = json.load(f)

        y_true = np.array(preds["y_true"])
        y_pred = np.array(preds["y_pred"])
        y_prob = np.array(preds["y_prob"])

        save_all_experiment_plots(
            output_dir=figures_dir,
            history=trainer.logger.get_history(),
            y_true=y_true,
            y_pred=y_pred,
            y_prob=y_prob,
            class_names=["Inactive", "Active"],
            model_name=f"QGNN ({config.dataset_name.upper()})",
            labels_for_dist=y_true,
        )

        if "embeddings" in results:
            plot_embedding_tsne(
                results["embeddings"],
                results["embedding_labels"],
                class_names=["Inactive", "Active"],
                save_path=os.path.join(figures_dir, "tsne_embedding.png"),
                title=f"QGNN - {config.dataset_name.upper()} t-SNE",
            )

    return results


def run_multi_seed(config: Config, resume_seeds: bool = False) -> dict:
    all_results = {}
    for seed in config.seeds:
        print(f"\n{'='*60}\nSEED {seed}\n{'='*60}")
        config.seed = seed
        recovered = recover_completed_seed_result(config, seed, enabled=resume_seeds)
        if recovered:
            all_results[seed] = recovered
            continue
        try:
            r = run_single_experiment(config)
            if "test_metrics" not in r or not r["test_metrics"]:
                recovered_metrics = load_completed_test_metrics(config, seed)
                if recovered_metrics:
                    r["test_metrics"] = recovered_metrics
                    r["recovered_from_run_meta"] = True
            all_results[seed] = r
        except Exception as e:
            recovered = recover_completed_seed_result(config, seed, enabled=True, verbose=False)
            if recovered:
                print(f"  [WARN] seed {seed}: {e} | recovered metrics from run_meta.json")
                recovered["error"] = str(e)
                all_results[seed] = recovered
            else:
                print(f"  [ERROR] seed {seed}: {e}")
                all_results[seed] = {"error": str(e)}

    payload = build_aggregate_payload(all_results)
    write_aggregate_payload(RESULTS_DIR, config, payload)

    print(f"\n{'='*60}\nAGGREGATED ({len(config.seeds)} seeds)\n{'='*60}")
    for k, v in payload["summary"].items():
        print(f"  {k}: {v:.4f}")
    return {"summary": payload["summary"], "per_seed": all_results}


def main():
    parser = argparse.ArgumentParser(description="Train Molecule QGNN")
    parser.add_argument("--dataset", type=str, required=True, choices=["bace", "bbbp", "clintox"])
    parser.add_argument("--data-dir", type=str, default=str(PROJECT_ROOT.parent / "data" / "processed"))
    parser.add_argument("--n-qubits", type=int, default=4)
    parser.add_argument("--circuit-depth", type=int, default=2)
    parser.add_argument("--batch-size", type=int, default=32)
    parser.add_argument("--epochs", type=int, default=60)
    parser.add_argument("--lr", type=float, default=1e-3)
    parser.add_argument("--patience", type=int, default=15)
    parser.add_argument(
        "--backend",
        type=str,
        default="auto",
        choices=["auto", "lightning.gpu", "lightning.qubit", "default.qubit"],
    )
    parser.add_argument("--data-fraction", type=float, default=1.0)
    parser.add_argument("--resume", type=str, default=None)
    parser.add_argument("--resume-seeds", action="store_true", default=False)
    parser.add_argument("--seed", type=int, default=None)
    parser.add_argument("--seeds", nargs="+", type=int, default=[0, 42, 123, 456, 789])
    args = parser.parse_args()

    pl_backend = resolve_pennylane_backend(args.backend)
    frac_suffix = f"_frac{args.data_fraction}" if args.data_fraction < 1.0 else ""
    config = Config(
        experiment_name=f"mol_qgnn_{args.dataset}{frac_suffix}",
        modality="molecule", model_name="qgnn", task="binary",
        data_dir=args.data_dir, dataset_name=args.dataset, num_classes=2,
        n_qubits=args.n_qubits, circuit_depth=args.circuit_depth,
        entanglement="full", batch_size=args.batch_size,
        backend=pl_backend["backend"], quantum_diff_method=pl_backend["diff_method"],
        epochs=args.epochs, lr=args.lr, es_patience=args.patience,
        data_fraction=args.data_fraction, resume_from=args.resume,
        seeds=args.seeds, save_embeddings=True, device=pl_backend["torch_device"],
    )
    if args.seed is not None:
        config.seed = args.seed
        config.seeds = [args.seed]
        run_single_experiment(config)
    else:
        run_multi_seed(config, resume_seeds=args.resume_seeds or args.resume is not None)
    print("\n[DONE] Molecule QGNN training completed.")


if __name__ == "__main__":
    main()
