import os
import json
import csv
import time
import math
import logging
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, Optional, List
from torch.utils.tensorboard import SummaryWriter


def _safe_scalar(v):
    """Return v if it is a finite number, else None."""
    if isinstance(v, (int, float)) and not (isinstance(v, float) and (math.isnan(v) or math.isinf(v))):
        return v
    return None


def _sanitize_for_json(obj):
    """Replace NaN / Inf with None so json.dump never emits bare NaN."""
    if isinstance(obj, float):
        if math.isnan(obj) or math.isinf(obj):
            return None
        return obj
    if isinstance(obj, dict):
        return {k: _sanitize_for_json(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [_sanitize_for_json(v) for v in obj]
    return obj


class ExperimentLogger:
    """
    Comprehensive experiment logger.
    - Console logging
    - CSV metric history
    - JSON run config & summary
    - TensorBoard
    - Per-epoch detail log
    """

    def __init__(self, log_dir: str, experiment_name: str, config: Optional[Dict] = None):
        self.log_dir = Path(log_dir)
        self.log_dir.mkdir(parents=True, exist_ok=True)
        self.experiment_name = experiment_name
        self.start_time = time.time()

        # Console logger
        self._setup_console_logger()

        # TensorBoard
        self.tb_writer = SummaryWriter(log_dir=str(self.log_dir / "tensorboard"))

        # CSV for metric history
        self.csv_path = self.log_dir / "metrics_history.csv"
        self.csv_initialized = False
        self.history: List[Dict[str, Any]] = []

        # Save config
        if config:
            self.save_json("config.json", config)

        # Run metadata
        self.run_meta = {
            "experiment_name": experiment_name,
            "start_time": datetime.now().isoformat(),
            "status": "running",
        }
        self.save_json("run_meta.json", self.run_meta)

        self.info(f"Experiment '{experiment_name}' started. Logs: {self.log_dir}")

    def _setup_console_logger(self):
        self.logger = logging.getLogger(self.experiment_name)
        self.logger.setLevel(logging.DEBUG)
        self.logger.handlers = []

        # File handler
        fh = logging.FileHandler(self.log_dir / "experiment.log", encoding="utf-8")
        fh.setLevel(logging.DEBUG)

        # Console handler
        ch = logging.StreamHandler()
        ch.setLevel(logging.INFO)

        fmt = logging.Formatter(
            "[%(asctime)s] %(levelname)s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
        )
        fh.setFormatter(fmt)
        ch.setFormatter(fmt)

        self.logger.addHandler(fh)
        self.logger.addHandler(ch)

    def info(self, msg: str):
        self.logger.info(msg)

    def debug(self, msg: str):
        self.logger.debug(msg)

    def warning(self, msg: str):
        self.logger.warning(msg)

    def error(self, msg: str):
        self.logger.error(msg)

    def log_epoch(self, epoch: int, metrics: Dict[str, float], phase: str = "train"):
        """Log metrics for an epoch to CSV, TensorBoard, and console."""
        row = {"epoch": epoch, "phase": phase, "timestamp": time.time() - self.start_time}
        row.update(metrics)
        self.history.append(row)

        # CSV
        if not self.csv_initialized:
            self._init_csv(row.keys())
        self._write_csv_row(row)

        # TensorBoard (skip NaN/Inf)
        for key, val in metrics.items():
            sv = _safe_scalar(val)
            if sv is not None:
                self.tb_writer.add_scalar(f"{phase}/{key}", sv, epoch)

        # Console summary (NaN-safe)
        parts = []
        for k, v in metrics.items():
            if isinstance(v, float):
                parts.append(f"{k}=nan" if math.isnan(v) else f"{k}={v:.4f}")
            else:
                parts.append(f"{k}={v}")
        self.info(f"Epoch {epoch:4d} [{phase:5s}] {' | '.join(parts)}")

    def log_step(self, global_step: int, metrics: Dict[str, float], phase: str = "train"):
        """Log per-step metrics to TensorBoard only (avoids CSV spam)."""
        for key, val in metrics.items():
            sv = _safe_scalar(val)
            if sv is not None:
                self.tb_writer.add_scalar(f"{phase}_step/{key}", sv, global_step)

    def log_hyperparams(self, hparams: Dict[str, Any], final_metrics: Dict[str, float]):
        """Log hyperparameters and final metrics to TensorBoard."""
        safe_hparams = {k: v for k, v in hparams.items()
                        if isinstance(v, (str, bool)) or _safe_scalar(v) is not None}
        safe_metrics = {f"hparam/{k}": v for k, v in final_metrics.items()
                        if _safe_scalar(v) is not None}
        if safe_hparams and safe_metrics:
            self.tb_writer.add_hparams(safe_hparams, safe_metrics)

    def log_model_summary(self, model_info: Dict[str, Any]):
        """Log model architecture summary."""
        self.save_json("model_summary.json", model_info)
        total_params = model_info.get('total_params', '?')
        params_str = f"{total_params:,}" if isinstance(total_params, (int, float)) else str(total_params)
        self.info(f"Model: {model_info.get('name', 'unknown')} | "
                  f"Params: {params_str}")

    def save_json(self, filename: str, data: Any):
        path = self.log_dir / filename
        with open(path, "w", encoding="utf-8") as f:
            json.dump(_sanitize_for_json(data), f, indent=2, default=str)

    def save_predictions(self, predictions: Dict[str, Any], filename: str = "predictions.json"):
        self.save_json(filename, predictions)
        self.info(f"Predictions saved to {filename}")

    def get_history(self, phase: Optional[str] = None) -> List[Dict]:
        if phase:
            return [r for r in self.history if r.get("phase") == phase]
        return self.history

    def finalize(self, final_metrics: Optional[Dict[str, float]] = None, status: str = "completed"):
        """Finalize the experiment — save summary, close writers."""
        elapsed = time.time() - self.start_time
        self.run_meta["end_time"] = datetime.now().isoformat()
        self.run_meta["elapsed_seconds"] = elapsed
        self.run_meta["elapsed_human"] = self._format_time(elapsed)
        self.run_meta["status"] = status
        if final_metrics:
            self.run_meta["final_metrics"] = final_metrics
        self.save_json("run_meta.json", self.run_meta)

        # Save full history as JSON too
        self.save_json("full_history.json", self.history)

        self.info(f"Experiment '{self.experiment_name}' {status}. "
                  f"Duration: {self._format_time(elapsed)}")
        self.tb_writer.close()

    def _init_csv(self, columns):
        with open(self.csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=list(columns))
            writer.writeheader()
        self.csv_initialized = True
        self._csv_columns = list(columns)

    def _write_csv_row(self, row: Dict):
        # Extend columns if new keys appear
        new_keys = [k for k in row.keys() if k not in self._csv_columns]
        if new_keys:
            self._csv_columns.extend(new_keys)
            # Rewrite CSV with new header
            with open(self.csv_path, "w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=self._csv_columns)
                writer.writeheader()
                for past_row in self.history:
                    writer.writerow({k: past_row.get(k, "") for k in self._csv_columns})
            return

        with open(self.csv_path, "a", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=self._csv_columns)
            writer.writerow({k: row.get(k, "") for k in self._csv_columns})

    @staticmethod
    def _format_time(seconds: float) -> str:
        h = int(seconds // 3600)
        m = int((seconds % 3600) // 60)
        s = int(seconds % 60)
        return f"{h:02d}h {m:02d}m {s:02d}s"
