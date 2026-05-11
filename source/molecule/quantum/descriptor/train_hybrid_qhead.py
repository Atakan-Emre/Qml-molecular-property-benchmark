"""
Molecule descriptor hybrid quantum head training.

Pipeline:
  ECFP descriptor -> frozen classical MLP encoder (GPU if available) -> embedding cache ->
  lightweight PennyLane quantum head -> classifier
"""
import argparse
import json
import os
import sys
import time
from pathlib import Path

import numpy as np
import torch
from torch.utils.data import DataLoader, TensorDataset

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from molecule.classical.dataset import MoleculeDescriptorDataset
from molecule.classical.descriptor.models import build_descriptor_model
from shared.metrics import compute_molecule_metrics
from shared.quantum_utils import QuantumProjectionHead, resolve_pennylane_backend
from shared.utils import Config, Trainer, load_checkpoint_state, resolve_best_checkpoint, set_seed
from shared.utils.imbalance import (
    build_balanced_sampler,
    compute_balanced_class_weights,
    is_extremely_imbalanced_binary,
)
from shared.utils.seed_resume import (
    build_aggregate_payload,
    load_completed_test_metrics,
    recover_completed_seed_result,
    write_aggregate_payload,
)
from shared.utils.paths import get_results_dir
from shared.visualization import plot_embedding_tsne, save_all_experiment_plots

RESULTS_DIR = get_results_dir(project_root=PROJECT_ROOT)


def make_metrics_fn():
    def metrics_fn(y_true, y_pred, y_prob):
        return compute_molecule_metrics(y_true, y_pred, y_prob, task="binary", num_classes=2)
    return metrics_fn


def _resolve_device(preferred: str) -> str:
    if preferred != "auto":
        return preferred
    return "cuda" if torch.cuda.is_available() else "cpu"


def build_frozen_encoder(dataset_name: str, input_dim: int, device: str):
    model = build_descriptor_model("mlp", input_dim=input_dim, num_classes=2)
    experiment_name = f"mol_mlp_{dataset_name}"
    ckpt_path = resolve_best_checkpoint(experiment_name, seed=0, mode="min")
    if ckpt_path is None:
        raise FileNotFoundError(f"No classical checkpoint found for {experiment_name}")
    state = load_checkpoint_state(ckpt_path, device="cpu")
    model.load_state_dict(state["model_state_dict"])
    for param in model.parameters():
        param.requires_grad = False
    model = model.to(device)
    model.eval()
    return model, str(ckpt_path)


def extract_embeddings(model, X: np.ndarray, y: np.ndarray, device: str, batch_size: int = 512, max_samples: int = 0):
    if max_samples and len(X) > max_samples:
        X = X[:max_samples]
        y = y[:max_samples]
    xs = []
    ys = []
    with torch.no_grad():
        for start in range(0, len(X), batch_size):
            batch_x = torch.tensor(X[start:start + batch_size], dtype=torch.float32, device=device)
            emb = model.get_embedding(batch_x).detach().cpu()
            xs.append(emb)
            ys.append(torch.tensor(y[start:start + batch_size], dtype=torch.long))
    return torch.cat(xs, dim=0), torch.cat(ys, dim=0)


def run_single_experiment(config: Config, encoder_device: str, smoke_test: bool = False) -> dict:
    set_seed(config.seed)
    train_ds = MoleculeDescriptorDataset(config.data_dir, config.dataset_name, "train", data_fraction=config.data_fraction, seed=config.seed)
    val_ds = MoleculeDescriptorDataset(config.data_dir, config.dataset_name, "val")
    test_ds = MoleculeDescriptorDataset(config.data_dir, config.dataset_name, "test")
    X_train_np, y_train_np = train_ds.get_numpy()
    X_val_np, y_val_np = val_ds.get_numpy()
    X_test_np, y_test_np = test_ds.get_numpy()
    use_imbalance_fix = is_extremely_imbalanced_binary(y_train_np)
    if use_imbalance_fix:
        config.es_monitor = "val_pr_auc"
        config.tune_binary_threshold_on_val = True

    encoder, ckpt_path = build_frozen_encoder(config.dataset_name, X_train_np.shape[1], encoder_device)
    t_extract = time.time()
    eval_cap = 128 if smoke_test else 0
    X_train, y_train = extract_embeddings(encoder, X_train_np, y_train_np, encoder_device, max_samples=config.max_samples)
    X_val, y_val = extract_embeddings(encoder, X_val_np, y_val_np, encoder_device, max_samples=eval_cap)
    X_test, y_test = extract_embeddings(encoder, X_test_np, y_test_np, encoder_device, max_samples=eval_cap)
    extract_sec = time.time() - t_extract

    pl_backend = resolve_pennylane_backend("lightning.qubit")
    model = QuantumProjectionHead(
        input_dim=X_train.shape[1],
        num_classes=2,
        n_qubits=config.n_qubits,
        circuit_depth=config.circuit_depth,
        hidden_dim=config.hidden_dim,
        dropout=0.2,
        backend=pl_backend["backend"],
        diff_method=pl_backend["diff_method"],
    )
    trainer = Trainer(
        model=model,
        config=config,
        train_loader=DataLoader(
            TensorDataset(X_train, y_train),
            batch_size=config.batch_size,
            shuffle=not use_imbalance_fix,
            sampler=(build_balanced_sampler(y_train.numpy()) if use_imbalance_fix else None),
            num_workers=0,
        ),
        val_loader=DataLoader(TensorDataset(X_val, y_val), batch_size=config.batch_size, shuffle=False, num_workers=0),
        test_loader=DataLoader(TensorDataset(X_test, y_test), batch_size=config.batch_size, shuffle=False, num_workers=0),
        criterion=(
            torch.nn.CrossEntropyLoss(weight=compute_balanced_class_weights(y_train_np).to(config.device))
            if use_imbalance_fix else torch.nn.CrossEntropyLoss()
        ),
        metrics_fn=make_metrics_fn(),
    )
    results = trainer.train()

    tag = config.make_experiment_tag()
    figures_dir = RESULTS_DIR / "figures" / tag
    pred_path = Path(config.log_dir) / tag / "predictions.json"
    if pred_path.exists():
        preds = json.loads(pred_path.read_text(encoding="utf-8"))
        y_true = np.array(preds["y_true"])
        y_pred = np.array(preds["y_pred"])
        y_prob = np.array(preds["y_prob"])
        save_all_experiment_plots(
            output_dir=str(figures_dir),
            history=trainer.logger.get_history(),
            y_true=y_true,
            y_pred=y_pred,
            y_prob=y_prob,
            class_names=["Inactive", "Active"],
            model_name=f"HybridQHead ({config.dataset_name.upper()})",
            labels_for_dist=y_true,
        )
        if "embeddings" in results:
            plot_embedding_tsne(
                results["embeddings"],
                results["embedding_labels"],
                class_names=["Inactive", "Active"],
                save_path=str(figures_dir / "tsne_embedding.png"),
                title=f"HybridQHead - t-SNE ({config.dataset_name.upper()})",
            )

    payload = {
        "metrics": {
            "best_val_metrics": results.get("best_val_metrics", {}),
            "test": results.get("test_metrics", {}),
        },
        "timing": {
            "embedding_extract_sec": round(extract_sec, 3),
            "head_training_sec": round(results.get("total_training_time_sec", 0.0), 3),
            "inference_time_sec": round(results.get("inference_time_sec", 0.0), 3),
            "encoder_device": encoder_device,
            "head_device": config.device,
        },
        "quantum_info": {
            "n_qubits": config.n_qubits,
            "circuit_depth": config.circuit_depth,
            "backend": pl_backend,
            "encoder_model": "mlp",
            "encoder_checkpoint": ckpt_path,
            "embedding_dim": int(X_train.shape[1]),
        },
    }
    results_dir = RESULTS_DIR / "tables"
    results_dir.mkdir(parents=True, exist_ok=True)
    (results_dir / f"{tag}_results.json").write_text(json.dumps(payload, indent=2, default=str), encoding="utf-8")
    trainer.logger.save_json("hybrid_runtime.json", payload["timing"])
    return results


def run_multi_seed(config: Config, encoder_device: str, smoke_test: bool = False, resume_seeds: bool = False) -> dict:
    all_results = {}
    for seed in config.seeds:
        print(f"\n{'='*60}\nSEED {seed}\n{'='*60}")
        config.seed = seed
        recovered = recover_completed_seed_result(config, seed, enabled=resume_seeds)
        if recovered:
            all_results[seed] = recovered
            continue
        result = run_single_experiment(config, encoder_device, smoke_test=smoke_test)
        if "test_metrics" not in result or not result["test_metrics"]:
            recovered_metrics = load_completed_test_metrics(config, seed)
            if recovered_metrics:
                result["test_metrics"] = recovered_metrics
                result["recovered_from_run_meta"] = True
        all_results[seed] = result

    payload = build_aggregate_payload(all_results, extra={"dataset_name": config.dataset_name})
    write_aggregate_payload(RESULTS_DIR, config, payload)
    return {"summary": payload["summary"], "per_seed": all_results}


def main():
    parser = argparse.ArgumentParser(description="Train molecule frozen-encoder hybrid quantum head")
    parser.add_argument("--dataset", type=str, required=True, choices=["bace", "bbbp", "clintox"])
    parser.add_argument("--data-dir", type=str, default=str(PROJECT_ROOT.parent / "data" / "processed"))
    parser.add_argument("--n-qubits", type=int, default=4)
    parser.add_argument("--circuit-depth", type=int, default=2)
    parser.add_argument("--hidden-dim", type=int, default=128)
    parser.add_argument("--batch-size", type=int, default=128)
    parser.add_argument("--epochs", type=int, default=50)
    parser.add_argument("--lr", type=float, default=1e-3)
    parser.add_argument("--patience", type=int, default=12)
    parser.add_argument("--max-samples", type=int, default=4096)
    parser.add_argument("--data-fraction", type=float, default=1.0)
    parser.add_argument("--resume", type=str, default=None)
    parser.add_argument("--resume-seeds", action="store_true", default=False)
    parser.add_argument("--seed", type=int, default=None)
    parser.add_argument("--seeds", nargs="+", type=int, default=[0, 42, 123, 456, 789])
    parser.add_argument("--encoder-device", type=str, default="auto", choices=["auto", "cpu", "cuda"])
    parser.add_argument("--smoke-test", action="store_true", default=False)
    args = parser.parse_args()

    config = Config(
        experiment_name=f"mol_hybrid_qhead_{args.dataset}" + (f"_frac{args.data_fraction}" if args.data_fraction < 1.0 else ""),
        modality="molecule",
        model_name="hybrid_qhead",
        task="binary",
        data_dir=args.data_dir,
        dataset_name=args.dataset,
        num_classes=2,
        n_qubits=args.n_qubits,
        circuit_depth=args.circuit_depth,
        entanglement="linear",
        hidden_dim=args.hidden_dim,
        batch_size=args.batch_size,
        epochs=args.epochs,
        lr=args.lr,
        optimizer="adamw",
        scheduler="cosine",
        es_patience=args.patience,
        device="cpu",
        num_workers=0,
        max_samples=args.max_samples,
        data_fraction=args.data_fraction,
        resume_from=args.resume,
        seeds=args.seeds,
        save_embeddings=True,
    )

    encoder_device = _resolve_device(args.encoder_device)
    if args.seed is not None:
        config.seed = args.seed
        config.seeds = [args.seed]
        run_single_experiment(config, encoder_device, smoke_test=args.smoke_test)
    else:
        run_multi_seed(
            config,
            encoder_device,
            smoke_test=args.smoke_test,
            resume_seeds=args.resume_seeds or args.resume is not None,
        )

    print("\n[DONE] Molecule hybrid quantum head training completed.")


if __name__ == "__main__":
    main()
