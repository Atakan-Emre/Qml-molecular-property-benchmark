"""
Molecule Graph Training Script.
Trains GNN/MPNN and GAT on BACE, BBBP, ClinTox molecular graphs.
Supports: early stopping, checkpointing, resume, full metrics & visualization.
"""
import os
import sys
import argparse
import json
import time
import numpy as np
import torch
import torch.nn as nn
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from shared.utils import Config, set_seed, EarlyStopping, CheckpointManager
from shared.utils.imbalance import (
    compute_balanced_class_weights,
    is_extremely_imbalanced_binary,
    predict_binary_with_threshold,
    tune_binary_threshold,
)
from shared.utils.paths import get_results_dir
from shared.utils.logger import ExperimentLogger
from shared.metrics import compute_molecule_metrics
from shared.visualization import save_all_experiment_plots
from molecule.classical.graph.models import build_graph_model
from molecule.classical.dataset import get_graph_dataloaders

RESULTS_DIR = get_results_dir(project_root=PROJECT_ROOT)


def make_metrics_fn():
    def metrics_fn(y_true, y_pred, y_prob):
        return compute_molecule_metrics(y_true, y_pred, y_prob, task="binary", num_classes=2)
    return metrics_fn


class GraphTrainer:
    """
    Trainer for PyG graph models — handles graph batches differently from Trainer.
    Full support: early stopping, checkpoint, resume, logging, visualization.
    """

    def __init__(self, model, config, train_loader, val_loader, test_loader=None, criterion=None):
        self.config = config
        self.device = torch.device(config.device)
        self.model = model.to(self.device)
        self.train_loader = train_loader
        self.val_loader = val_loader
        self.test_loader = test_loader

        self.criterion = criterion or nn.CrossEntropyLoss()
        self.optimizer = torch.optim.Adam(
            model.parameters(), lr=config.lr, weight_decay=config.weight_decay
        )
        sched_mode = "min" if "loss" in config.es_monitor else "max"
        self.scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
            self.optimizer, mode=sched_mode, factor=0.5, patience=config.scheduler_patience
        )

        self.metrics_fn = make_metrics_fn()

        self.tag = config.make_experiment_tag()
        log_dir = os.path.join(config.log_dir, self.tag)
        self.logger = ExperimentLogger(log_dir, self.tag, config.to_dict())

        es_mode = "min" if "loss" in config.es_monitor else "max"
        self.early_stopping = EarlyStopping(
            patience=config.es_patience, min_delta=config.es_min_delta, mode=es_mode
        )
        ckpt_dir = os.path.join(config.checkpoint_dir, self.tag)
        self.ckpt_manager = CheckpointManager(ckpt_dir, config.save_top_k, es_mode)

        self.start_epoch = 0
        self.best_metrics = {}
        self.binary_eval_threshold = float(getattr(config, "binary_eval_threshold", 0.5))

        # Model summary
        total_params = sum(p.numel() for p in model.parameters())
        trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
        self.logger.log_model_summary({
            "name": config.model_name, "total_params": total_params,
            "trainable_params": trainable, "device": str(self.device),
        })

        if config.resume_from:
            self._resume(config.resume_from)

    def _resume(self, path):
        if path == "last":
            ckpt = self.ckpt_manager.load_last(
                self.model, self.optimizer, self.scheduler, self.early_stopping, self.device
            )
        else:
            ckpt = CheckpointManager.load_from_path(
                path, self.model, self.optimizer, self.scheduler, self.early_stopping, self.device
            )
        self.start_epoch = ckpt["epoch"] + 1
        self.best_metrics = ckpt.get("metrics", {})
        self.logger.info(f"Resumed from epoch {ckpt['epoch']}")

    def train(self) -> dict:
        self.logger.info(f"Starting graph training for {self.config.epochs} epochs")

        for epoch in range(self.start_epoch, self.config.epochs):
            train_metrics = self._train_epoch(epoch)
            self.logger.log_epoch(epoch, train_metrics, "train")

            val_metrics = self._eval_epoch(self.val_loader)
            self.logger.log_epoch(epoch, val_metrics, "val")

            monitor_val = val_metrics.get(
                self.config.es_monitor.replace("val_", ""), val_metrics.get("loss", 0)
            )
            self.logger.tb_writer.add_scalar("lr", self.optimizer.param_groups[0]["lr"], epoch)
            self.scheduler.step(monitor_val)
            should_stop = self.early_stopping(monitor_val, epoch)

            self.ckpt_manager.save(
                epoch=epoch, model=self.model, optimizer=self.optimizer,
                scheduler=self.scheduler, early_stopping=self.early_stopping,
                metrics={**{f"train_{k}": v for k, v in train_metrics.items()},
                         **{f"val_{k}": v for k, v in val_metrics.items()}},
                score=monitor_val, config=self.config.to_dict(),
            )

            if self.early_stopping.improved:
                self.best_metrics = val_metrics.copy()
                self.best_metrics["binary_eval_threshold"] = self.binary_eval_threshold

            if should_stop:
                self.logger.info(f"Early stopping at epoch {epoch}")
                break

        # Load best and test
        results = {"best_val_metrics": self.best_metrics, "best_epoch": self.early_stopping.best_epoch}
        try:
            self.ckpt_manager.load_best(self.model, device=self.device)
        except FileNotFoundError:
            pass

        if self.test_loader:
            test_metrics = self._eval_epoch(self.test_loader)
            self.logger.log_epoch(self.early_stopping.best_epoch, test_metrics, "test")
            results["test_metrics"] = test_metrics

            if self.config.save_predictions:
                preds = self._get_predictions(self.test_loader)
                self.logger.save_predictions(preds)

        self.logger.finalize(results.get("test_metrics", self.best_metrics))
        return results

    def _predictions_from_probabilities(self, y_true, y_prob, tune_threshold=False):
        if (
            getattr(self.config, "task", None) == "binary"
            and y_prob.ndim == 2
            and y_prob.shape[1] == 2
        ):
            if tune_threshold and getattr(self.config, "tune_binary_threshold_on_val", False):
                threshold, threshold_score = tune_binary_threshold(
                    y_true,
                    y_prob,
                    metric=getattr(self.config, "binary_threshold_metric", "balanced_accuracy"),
                )
                self.binary_eval_threshold = threshold
                self.logger.info(
                    "Binary eval threshold tuned on val: "
                    f"{self.binary_eval_threshold:.3f} "
                    f"({self.config.binary_threshold_metric}={threshold_score:.4f})"
                )
            return predict_binary_with_threshold(y_prob, self.binary_eval_threshold)
        return np.argmax(y_prob, axis=1)

    def _train_epoch(self, epoch):
        self.model.train()
        total_loss = 0
        all_labels, all_probs = [], []
        n = 0

        for batch in self.train_loader:
            batch = batch.to(self.device)
            self.optimizer.zero_grad()
            out = self.model(batch)
            loss = self.criterion(out, batch.y.squeeze())
            loss.backward()
            torch.nn.utils.clip_grad_norm_(self.model.parameters(), 1.0)
            self.optimizer.step()

            total_loss += loss.item()
            n += 1
            probs = torch.softmax(out, dim=1).detach().cpu().numpy()
            all_probs.append(probs)
            all_labels.append(batch.y.squeeze().cpu().numpy())

        metrics = {"loss": total_loss / max(n, 1)}
        y_true = np.concatenate(all_labels)
        y_prob = np.concatenate(all_probs)
        y_pred = self._predictions_from_probabilities(y_true, y_prob, tune_threshold=False)
        metrics.update(self.metrics_fn(y_true, y_pred, y_prob))
        return metrics

    @torch.no_grad()
    def _eval_epoch(self, loader):
        self.model.eval()
        total_loss = 0
        all_labels, all_probs = [], []
        n = 0

        for batch in loader:
            batch = batch.to(self.device)
            out = self.model(batch)
            loss = self.criterion(out, batch.y.squeeze())
            total_loss += loss.item()
            n += 1
            probs = torch.softmax(out, dim=1).cpu().numpy()
            all_probs.append(probs)
            all_labels.append(batch.y.squeeze().cpu().numpy())

        metrics = {"loss": total_loss / max(n, 1)}
        y_true = np.concatenate(all_labels)
        y_prob = np.concatenate(all_probs)
        y_pred = self._predictions_from_probabilities(
            y_true,
            y_prob,
            tune_threshold=(loader is self.val_loader),
        )
        metrics.update(self.metrics_fn(y_true, y_pred, y_prob))
        return metrics

    @torch.no_grad()
    def _get_predictions(self, loader):
        self.model.eval()
        all_labels, all_probs = [], []
        for batch in loader:
            batch = batch.to(self.device)
            out = self.model(batch)
            probs = torch.softmax(out, dim=1).cpu().numpy()
            all_probs.append(probs)
            all_labels.append(batch.y.squeeze().cpu().numpy())
        y_true = np.concatenate(all_labels)
        y_prob = np.concatenate(all_probs)
        y_pred = self._predictions_from_probabilities(y_true, y_prob, tune_threshold=False)
        return {
            "y_true": y_true.tolist(),
            "y_pred": y_pred.tolist(),
            "y_prob": y_prob.tolist(),
        }


def run_single_experiment(config: Config) -> dict:
    set_seed(config.seed)

    train_loader, val_loader, test_loader, node_feat_dim = get_graph_dataloaders(
        data_dir=config.data_dir,
        dataset_name=config.dataset_name,
        batch_size=config.batch_size,
        data_fraction=config.data_fraction,
        seed=config.seed,
        weighted_sampling=(config.dataset_name == "clintox"),
    )
    train_labels = np.array([int(d.y.item()) for d in train_loader.dataset.data_list], dtype=int)
    use_imbalance_fix = is_extremely_imbalanced_binary(train_labels)
    if use_imbalance_fix:
        config.es_monitor = "val_pr_auc"
        config.tune_binary_threshold_on_val = True

    model = build_graph_model(
        model_name=config.model_name,
        node_feat_dim=node_feat_dim,
        num_classes=config.num_classes,
    )

    criterion = (
        nn.CrossEntropyLoss(weight=compute_balanced_class_weights(train_labels).to(config.device))
        if use_imbalance_fix else nn.CrossEntropyLoss()
    )
    trainer = GraphTrainer(model, config, train_loader, val_loader, test_loader, criterion=criterion)
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
            model_name=f"{config.model_name.upper()} ({config.dataset_name.upper()})",
        )
    return results


def run_multi_seed(config: Config) -> dict:
    all_results = {}
    all_test_metrics = {}

    for seed in config.seeds:
        print(f"\n{'='*60}\nSEED {seed}\n{'='*60}")
        config.seed = seed
        results = run_single_experiment(config)
        all_results[seed] = results
        if "test_metrics" in results:
            for key, val in results["test_metrics"].items():
                if key not in all_test_metrics:
                    all_test_metrics[key] = []
                if isinstance(val, (int, float)):
                    all_test_metrics[key].append(val)

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
    parser = argparse.ArgumentParser(description="Train graph-based molecule models")
    parser.add_argument("--model", type=str, required=True,
                        choices=["gnn", "gat"],
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

    run_multi_seed(config)
    print(f"\n[DONE] Molecule graph training ({args.model}/{args.dataset}) completed.")


if __name__ == "__main__":
    main()
