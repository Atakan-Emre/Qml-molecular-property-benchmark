import os
import time
import torch
import torch.nn as nn
import numpy as np
from typing import Dict, Optional, Any, Callable
from pathlib import Path

from .config import Config
from .seed import set_seed
from .early_stopping import EarlyStopping
from .checkpoint import CheckpointManager
from .logger import ExperimentLogger
from .imbalance import predict_binary_with_threshold, tune_binary_threshold


class Trainer:
    """
    Universal trainer with early stopping, checkpointing, logging, and resume support.
    Works for all classical PyTorch models across ECG, Retina, and Molecule modalities.
    """

    def __init__(
        self,
        model: nn.Module,
        config: Config,
        train_loader,
        val_loader,
        test_loader=None,
        criterion=None,
        optimizer=None,
        scheduler=None,
        metrics_fn: Optional[Callable] = None,
    ):
        self.config = config
        self.device = torch.device(config.device)
        self.model = model.to(self.device)

        # AMP (Automatic Mixed Precision) for GPU speedup
        self.use_amp = getattr(config, 'use_amp', False) and self.device.type == 'cuda'
        self.scaler = torch.amp.GradScaler('cuda', enabled=self.use_amp) if self.use_amp else None
        self.train_loader = train_loader
        self.val_loader = val_loader
        self.test_loader = test_loader

        # Loss
        self.criterion = criterion or nn.CrossEntropyLoss()

        # Optimizer
        if optimizer is None:
            self.optimizer = self._build_optimizer()
        else:
            self.optimizer = optimizer

        # Scheduler
        if scheduler is None:
            self.scheduler = self._build_scheduler()
        else:
            self.scheduler = scheduler

        # Metrics function: takes (y_true, y_pred, y_prob) -> dict
        self.metrics_fn = metrics_fn

        # Experiment tag
        self.tag = config.make_experiment_tag()

        # Logger
        log_dir = os.path.join(config.log_dir, self.tag)
        self.logger = ExperimentLogger(log_dir, self.tag, config.to_dict())

        # Early stopping / monitor direction
        es_mode = "min" if "loss" in config.es_monitor else "max"
        self.monitor_mode = es_mode
        self.early_stopping = EarlyStopping(
            patience=config.es_patience,
            min_delta=config.es_min_delta,
            mode=es_mode,
            verbose=True,
        )

        # Checkpoint manager
        ckpt_dir = os.path.join(config.checkpoint_dir, self.tag)
        self.ckpt_manager = CheckpointManager(
            checkpoint_dir=ckpt_dir,
            save_top_k=config.save_top_k,
            mode=es_mode,
        )

        # State
        self.start_epoch = 0
        self.global_step = 0
        self.best_metrics = {}
        self.binary_eval_threshold = float(getattr(config, "binary_eval_threshold", 0.5))

        # Log model summary
        total_params = sum(p.numel() for p in model.parameters())
        trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
        gpu_name = torch.cuda.get_device_name(0) if torch.cuda.is_available() else "CPU"
        gpu_mem = f"{torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f}GB" if torch.cuda.is_available() else "N/A"
        self.logger.log_model_summary({
            "name": config.model_name,
            "total_params": total_params,
            "trainable_params": trainable_params,
            "device": str(self.device),
            "gpu": gpu_name,
            "gpu_memory": gpu_mem,
            "amp": self.use_amp,
            "batch_size": getattr(config, 'batch_size', 'N/A'),
            "num_workers": getattr(config, 'num_workers', 0),
        })

        # Resume if requested
        if config.resume_from:
            self._resume(config.resume_from)

    def _build_optimizer(self):
        cfg = self.config
        if cfg.optimizer == "adam":
            return torch.optim.Adam(self.model.parameters(), lr=cfg.lr, weight_decay=cfg.weight_decay)
        elif cfg.optimizer == "adamw":
            return torch.optim.AdamW(self.model.parameters(), lr=cfg.lr, weight_decay=cfg.weight_decay)
        elif cfg.optimizer == "sgd":
            return torch.optim.SGD(
                self.model.parameters(), lr=cfg.lr, momentum=0.9, weight_decay=cfg.weight_decay
            )
        else:
            return torch.optim.Adam(self.model.parameters(), lr=cfg.lr, weight_decay=cfg.weight_decay)

    def _build_scheduler(self):
        cfg = self.config
        if cfg.scheduler == "plateau":
            # Keep scheduler direction consistent with the monitored early-stop metric.
            mode = "min" if "loss" in cfg.es_monitor else "max"
            return torch.optim.lr_scheduler.ReduceLROnPlateau(
                self.optimizer, mode=mode, factor=cfg.scheduler_factor,
                patience=cfg.scheduler_patience,
            )
        elif cfg.scheduler == "cosine":
            return torch.optim.lr_scheduler.CosineAnnealingLR(
                self.optimizer, T_max=cfg.epochs, eta_min=1e-6
            )
        elif cfg.scheduler == "step":
            return torch.optim.lr_scheduler.StepLR(self.optimizer, step_size=30, gamma=0.1)
        else:
            return None

    def _resume(self, path: str):
        """Resume training from checkpoint."""
        try:
            if path == "last":
                ckpt = self.ckpt_manager.load_last(
                    self.model, self.optimizer, self.scheduler, self.early_stopping, self.device
                )
            else:
                ckpt = CheckpointManager.load_from_path(
                    path, self.model, self.optimizer, self.scheduler, self.early_stopping, self.device
                )
        except FileNotFoundError:
            self.logger.warning(f"Resume requested but checkpoint not found for '{path}'. Starting fresh.")
            return
        except RuntimeError as exc:
            self.logger.warning(
                f"Resume checkpoint for '{path}' is incompatible with the current model "
                f"({exc}). Starting fresh."
            )
            return
        self.start_epoch = ckpt["epoch"] + 1
        self.best_metrics = ckpt.get("metrics", {})
        self.logger.info(f"Resumed from epoch {ckpt['epoch']} (score: {ckpt.get('score', '?')})")

    def train(self) -> Dict[str, Any]:
        """Full training loop with early stopping, checkpointing, and logging."""
        self.logger.info(f"Starting training for {self.config.epochs} epochs "
                         f"(resume from epoch {self.start_epoch})")

        # Track LR history and epoch timing
        self.lr_history = []
        self.epoch_times = []

        for epoch in range(self.start_epoch, self.config.epochs):
            epoch_start = time.time()

            # --- Train ---
            train_metrics = self._train_epoch(epoch)
            self.logger.log_epoch(epoch, train_metrics, phase="train")

            # --- Validate ---
            val_metrics = self._validate_epoch(epoch)
            self.logger.log_epoch(epoch, val_metrics, phase="val")

            # Current LR
            current_lr = self.optimizer.param_groups[0]["lr"]
            self.lr_history.append(current_lr)
            self.logger.tb_writer.add_scalar("lr", current_lr, epoch)

            # Epoch wall time
            epoch_time = time.time() - epoch_start
            self.epoch_times.append(epoch_time)
            self.logger.tb_writer.add_scalar("epoch_time_sec", epoch_time, epoch)

            # GPU memory tracking
            if self.device.type == 'cuda':
                mem_alloc = torch.cuda.max_memory_allocated() / 1024**2
                self.logger.tb_writer.add_scalar("gpu_mem_mb", mem_alloc, epoch)

            # Use the same monitored validation metric for scheduler + early stopping.
            monitor_val = val_metrics.get(
                self.config.es_monitor.replace("val_", ""),
                val_metrics.get("loss", 0),
            )

            # --- Scheduler step ---
            if self.scheduler:
                if isinstance(self.scheduler, torch.optim.lr_scheduler.ReduceLROnPlateau):
                    self.scheduler.step(monitor_val)
                else:
                    self.scheduler.step()

            # --- Early stopping ---
            should_stop = self.early_stopping(monitor_val, epoch)

            # --- Checkpoint ---
            self.ckpt_manager.save(
                epoch=epoch,
                model=self.model,
                optimizer=self.optimizer,
                scheduler=self.scheduler,
                early_stopping=self.early_stopping,
                metrics={**{f"train_{k}": v for k, v in train_metrics.items()},
                         **{f"val_{k}": v for k, v in val_metrics.items()}},
                score=monitor_val,
                config=self.config.to_dict(),
            )

            if self.early_stopping.improved:
                self.best_metrics = val_metrics.copy()
                self.best_metrics["binary_eval_threshold"] = self.binary_eval_threshold

            if should_stop:
                self.logger.info(f"Early stopping at epoch {epoch}")
                break

        # --- Load best model and test ---
        results = {"best_val_metrics": self.best_metrics, "best_epoch": self.early_stopping.best_epoch}
        results["lr_history"] = self.lr_history
        results["epoch_times"] = self.epoch_times
        results["total_epochs_run"] = len(self.epoch_times)

        try:
            self.ckpt_manager.load_best(self.model, device=self.device)
            self.logger.info(f"Loaded best model from epoch {self.early_stopping.best_epoch}")
        except FileNotFoundError:
            self.logger.warning("No best checkpoint found, using last model state")

        if self.test_loader:
            # Recreate test_loader with num_workers=0 to avoid Windows
            # persistent_workers crash during test phase
            import sys
            if sys.platform == "win32" and getattr(self.test_loader, 'num_workers', 0) > 0:
                from torch.utils.data import DataLoader
                test_loader = DataLoader(
                    self.test_loader.dataset,
                    batch_size=self.test_loader.batch_size,
                    shuffle=False,
                    num_workers=0,
                    pin_memory=False,
                )
            else:
                test_loader = self.test_loader

            infer_start = time.time()
            test_metrics = self._validate_epoch(-1, loader=test_loader)
            infer_time = time.time() - infer_start

            results["inference_time_sec"] = infer_time
            self.logger.log_epoch(self.early_stopping.best_epoch, test_metrics, phase="test")
            results["test_metrics"] = test_metrics

            # Save predictions
            if self.config.save_predictions:
                preds = self._get_predictions(test_loader)
                self.logger.save_predictions(preds)

            # Extract embeddings for t-SNE (if model has get_embedding)
            if self.config.save_embeddings and hasattr(self.model, 'get_embedding'):
                embeddings, emb_labels = self._get_embeddings(test_loader)
                results["embeddings"] = embeddings
                results["embedding_labels"] = emb_labels
                self.logger.info(f"Embeddings extracted: shape {embeddings.shape}")

        # Total training time
        results["total_training_time_sec"] = sum(self.epoch_times)

        # Save LR history and epoch times
        self.logger.save_json("lr_history.json", self.lr_history)
        self.logger.save_json("epoch_times.json", self.epoch_times)

        # Save timing summary for cross-comparison
        timing = {
            "total_training_time_sec": results["total_training_time_sec"],
            "inference_time_sec": results.get("inference_time_sec", None),
            "total_epochs_run": results["total_epochs_run"],
            "mean_epoch_time_sec": float(np.mean(self.epoch_times)) if self.epoch_times else 0,
            "batch_size": self.config.batch_size,
            "amp_enabled": self.use_amp,
            "device": str(self.device),
            "model_params": sum(p.numel() for p in self.model.parameters()),
        }
        # Quantum-specific fields (if applicable)
        if hasattr(self.config, 'n_qubits') and (
            'q' in self.config.model_name.lower() or
            self.config.model_name.lower() in ('vqc', 'qsvm')
        ):
            timing["n_qubits"] = self.config.n_qubits
            timing["circuit_depth"] = self.config.circuit_depth
            timing["shots"] = self.config.shots
            timing["entanglement"] = self.config.entanglement
            timing["backend"] = self.config.backend
        self.logger.save_json("timing_summary.json", timing)

        # Finalize
        final = results.get("test_metrics", self.best_metrics)
        self.logger.finalize(final_metrics=final, status="completed")

        return results

    def _supports_binary_thresholding(self, y_prob: np.ndarray) -> bool:
        return (
            getattr(self.config, "task", None) == "binary"
            and y_prob.ndim == 2
            and y_prob.shape[1] == 2
        )

    def _predictions_from_probabilities(
        self,
        y_true: np.ndarray,
        y_prob: np.ndarray,
        tune_threshold: bool = False,
    ) -> np.ndarray:
        if self._supports_binary_thresholding(y_prob):
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

    def _train_epoch(self, epoch: int) -> Dict[str, float]:
        self.model.train()
        total_loss = 0.0
        all_labels, all_probs = [], []
        num_batches = 0

        for batch_idx, batch in enumerate(self.train_loader):
            inputs, labels = self._unpack_batch(batch)
            inputs, labels = inputs.to(self.device, non_blocking=True), labels.to(self.device, non_blocking=True)

            self.optimizer.zero_grad(set_to_none=True)

            # AMP forward pass
            if self.use_amp:
                with torch.amp.autocast('cuda'):
                    outputs = self.model(inputs)
                    loss = self.criterion(outputs, labels)
                self.scaler.scale(loss).backward()
                self.scaler.unscale_(self.optimizer)
                torch.nn.utils.clip_grad_norm_(self.model.parameters(), max_norm=1.0)
                self.scaler.step(self.optimizer)
                self.scaler.update()
            else:
                outputs = self.model(inputs)
                loss = self.criterion(outputs, labels)
                loss.backward()
                torch.nn.utils.clip_grad_norm_(self.model.parameters(), max_norm=1.0)
                self.optimizer.step()

            total_loss += loss.item()
            num_batches += 1

            # Collect predictions (cast to float32 for AMP compatibility)
            with torch.no_grad():
                probs = torch.softmax(outputs.float(), dim=1).detach().cpu().numpy()
            labels_np = labels.detach().cpu().numpy()

            all_probs.append(probs)
            all_labels.append(labels_np)

            # Step-level logging
            self.global_step += 1
            if self.global_step % self.config.log_every_n_steps == 0:
                self.logger.log_step(self.global_step, {"loss": loss.item()}, phase="train")

        avg_loss = total_loss / max(num_batches, 1)
        metrics = {"loss": avg_loss}

        if self.metrics_fn:
            y_true = np.concatenate(all_labels)
            y_prob = np.concatenate(all_probs)
            y_pred = self._predictions_from_probabilities(y_true, y_prob, tune_threshold=False)
            computed = self.metrics_fn(y_true, y_pred, y_prob)
            metrics.update(computed)

        return metrics

    def _validate_epoch(self, epoch: int, loader=None) -> Dict[str, float]:
        self.model.eval()
        loader = loader or self.val_loader
        total_loss = 0.0
        all_labels, all_probs = [], []
        num_batches = 0

        with torch.no_grad():
            for batch in loader:
                inputs, labels = self._unpack_batch(batch)
                inputs, labels = inputs.to(self.device, non_blocking=True), labels.to(self.device, non_blocking=True)

                if self.use_amp:
                    with torch.amp.autocast('cuda'):
                        outputs = self.model(inputs)
                        loss = self.criterion(outputs, labels)
                else:
                    outputs = self.model(inputs)
                    loss = self.criterion(outputs, labels)

                total_loss += loss.item()
                num_batches += 1

                probs = torch.softmax(outputs.float(), dim=1).cpu().numpy()
                labels_np = labels.cpu().numpy()

                all_probs.append(probs)
                all_labels.append(labels_np)

        avg_loss = total_loss / max(num_batches, 1)
        metrics = {"loss": avg_loss}

        if self.metrics_fn:
            y_true = np.concatenate(all_labels)
            y_prob = np.concatenate(all_probs)
            y_pred = self._predictions_from_probabilities(
                y_true,
                y_prob,
                tune_threshold=(loader is self.val_loader),
            )
            computed = self.metrics_fn(y_true, y_pred, y_prob)
            metrics.update(computed)

        return metrics

    @torch.no_grad()
    def _get_predictions(self, loader) -> Dict[str, Any]:
        self.model.eval()
        all_labels, all_probs = [], []

        for batch in loader:
            inputs, labels = self._unpack_batch(batch)
            inputs = inputs.to(self.device)

            outputs = self.model(inputs)
            probs = torch.softmax(outputs.float(), dim=1).cpu().numpy()

            all_probs.append(probs)
            all_labels.append(labels.numpy() if hasattr(labels, 'numpy') else labels)

        y_true = np.concatenate(all_labels)
        y_prob = np.concatenate(all_probs)
        y_pred = self._predictions_from_probabilities(y_true, y_prob, tune_threshold=False)
        return {
            "y_true": y_true.tolist(),
            "y_pred": y_pred.tolist(),
            "y_prob": y_prob.tolist(),
        }

    @torch.no_grad()
    def _get_embeddings(self, loader) -> tuple:
        """Extract embeddings from model's get_embedding method for t-SNE."""
        self.model.eval()
        all_embs, all_labels = [], []

        for batch in loader:
            inputs, labels = self._unpack_batch(batch)
            inputs = inputs.to(self.device)

            emb = self.model.get_embedding(inputs)
            all_embs.append(emb.cpu().numpy())
            all_labels.append(labels.numpy() if hasattr(labels, 'numpy') else np.array(labels))

        return np.concatenate(all_embs), np.concatenate(all_labels)

    def _unpack_batch(self, batch):
        """Handle different batch formats."""
        if isinstance(batch, (list, tuple)):
            return batch[0], batch[1]
        elif isinstance(batch, dict):
            return batch["input"], batch["label"]
        elif hasattr(batch, 'x') and hasattr(batch, 'y'):
            # PyG Data object (for graph neural networks)
            return batch, batch.y.squeeze()
        else:
            raise ValueError(f"Unknown batch type: {type(batch)}")
