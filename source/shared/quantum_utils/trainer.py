"""
Quantum Experiment Trainer — Logger-integrated wrapper for QSVM/VQC experiments.

Provides the same logging infrastructure as classical Trainer but adapted for
quantum models that don't use PyTorch training loops (kernel/variational methods).

Logs: run_meta.json, experiment.log, config.json, timing_summary.json,
      quantum_metrics.json, TensorBoard scalars.
"""
import os
import sys
import time
import json
import numpy as np
from pathlib import Path
from typing import Dict, Any, Optional, Callable

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from shared.utils.logger import ExperimentLogger
from shared.utils.paths import get_results_dir


class QuantumTrainer:
    """Wrapper that provides Logger integration for quantum experiments."""

    def __init__(self, config, experiment_tag: str = None):
        self.config = config
        self.tag = experiment_tag or config.make_experiment_tag()

        # Setup logger
        results_dir = get_results_dir(project_root=PROJECT_ROOT)
        log_dir = str(results_dir / "logs" / config.experiment_name / self.tag)
        self.logger = ExperimentLogger(
            log_dir=log_dir,
            experiment_name=self.tag,
            config=self._config_dict(),
        )

        # Log model info
        self.logger.log_model_summary({
            "name": config.model_name,
            "type": "quantum",
            "n_qubits": config.n_qubits,
            "circuit_depth": config.circuit_depth,
            "entanglement": getattr(config, 'entanglement', 'full'),
            "shots": getattr(config, 'shots', 0),
            "backend": getattr(config, 'backend', 'statevector'),
        })

    def _config_dict(self) -> dict:
        """Convert config to dict for logging."""
        d = {}
        for k in dir(self.config):
            if not k.startswith('_') and not callable(getattr(self.config, k)):
                v = getattr(self.config, k)
                if isinstance(v, (int, float, str, bool, list)):
                    d[k] = v
        return d

    def log_phase(self, phase: str, metrics: Dict[str, Any], step: int = 0):
        """Log a training/eval phase with full Logger pipeline."""
        self.logger.log_epoch(step, metrics, phase=phase)

    def log_quantum_info(self, info: dict):
        """Save quantum-specific circuit and timing information."""
        self.logger.save_json("quantum_metrics.json", info)
        self.logger.info(f"Quantum circuit: {info.get('n_qubits', '?')}q, "
                         f"depth={info.get('transpiled_depth', info.get('raw_depth', '?'))}, "
                         f"gates={info.get('transpiled_gate_count', info.get('raw_gate_count', '?'))}, "
                         f"cx={info.get('cx_count', '?')}")

    def log_timing(self, timing: dict):
        """Save timing summary."""
        self.logger.save_json("timing_summary.json", timing)
        import math
        for k, v in timing.items():
            if isinstance(v, (int, float)) and not (isinstance(v, float) and (math.isnan(v) or math.isinf(v))):
                self.logger.tb_writer.add_scalar(f"timing/{k}", v, 0)

    def log_pca_info(self, pca_summary: dict):
        """Log PCA information."""
        self.logger.save_json("pca_summary.json", pca_summary)
        self.logger.info(f"PCA: {pca_summary['n_components']} components, "
                         f"explained variance: {pca_summary['total_explained_variance']:.4f}")

    def save_predictions(self, predictions: dict):
        """Save predictions."""
        self.logger.save_predictions(predictions)

    def finalize(self, final_metrics: Dict[str, float], status: str = "completed"):
        """Finalize experiment with Logger."""
        # Log hyperparams to TensorBoard
        hparams = {
            "n_qubits": self.config.n_qubits,
            "circuit_depth": self.config.circuit_depth,
            "entanglement": getattr(self.config, 'entanglement', 'full'),
            "shots": getattr(self.config, 'shots', 0),
            "data_fraction": self.config.data_fraction,
            "seed": self.config.seed,
        }
        self.logger.log_hyperparams(hparams, final_metrics)
        self.logger.finalize(final_metrics=final_metrics, status=status)

    @property
    def info(self):
        return self.logger.info

    @property
    def warning(self):
        return self.logger.warning
