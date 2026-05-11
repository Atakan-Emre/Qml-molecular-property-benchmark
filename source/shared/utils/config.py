import yaml
import json
import os
from dataclasses import dataclass, field, asdict
from typing import Optional, List, Dict, Any
from pathlib import Path
from .paths import get_project_root, get_results_dir


@dataclass
class Config:
    """Central configuration for all experiments."""

    # Experiment identity
    experiment_name: str = "default"
    modality: str = "ecg"  # ecg, retina, molecule
    model_name: str = "resnet1d"
    task: str = "binary"  # binary, multiclass, multilabel, ordinal, regression
    run_id: int = 0

    # Data
    data_dir: str = ""
    dataset_name: str = ""
    num_classes: int = 2
    input_channels: int = 12
    input_length: int = 1000
    image_size: int = 224
    hidden_dim: int = 32
    split_strategy: str = "official"  # official, scaffold, random

    # Training
    seed: int = 42
    seeds: List[int] = field(default_factory=lambda: [0, 42, 123, 456, 789])
    batch_size: int = 32
    epochs: int = 100
    lr: float = 1e-3
    weight_decay: float = 1e-4
    optimizer: str = "adam"  # adam, adamw, sgd, cobyla
    scheduler: str = "plateau"  # plateau, cosine, step, none
    scheduler_patience: int = 5
    scheduler_factor: float = 0.5

    # Early stopping
    early_stopping: bool = True
    es_patience: int = 15
    es_min_delta: float = 1e-4
    es_monitor: str = "val_loss"  # auto-mapped by task when left as val_loss
    es_mode: str = "min"  # min, max

    # Checkpointing
    checkpoint_dir: str = "checkpoints"
    save_top_k: int = 3
    resume_from: Optional[str] = None

    # Logging
    log_dir: str = "logs"
    log_every_n_steps: int = 10
    save_predictions: bool = True
    save_embeddings: bool = False

    # Data regime ablation
    data_fraction: float = 1.0  # 0.1, 0.25, 0.5, 1.0

    # Quantum-specific
    n_qubits: int = 8
    circuit_depth: int = 2
    entanglement: str = "full"  # linear, full, circular
    feature_dim: int = 8
    shots: int = 0  # 0 = statevector (exact), else 1024/4096
    backend: str = "statevector"  # statevector, aer, fake_manila, ibm_real
    feature_map: str = "ZZFeatureMap"
    ansatz: str = "RealAmplitudes"
    max_kernel_samples: int = 500  # QSVM kernel matrix subsample limit
    max_total_kernel_pairs: int = 2000000  # cap for train+val+test kernel evaluations
    max_samples: int = 500  # VQC/QLSTM training subsample limit
    quantum_diff_method: str = "backprop"

    # Device & Performance
    device: str = "auto"  # auto, cpu, cuda, cuda:0
    num_workers: int = 4
    pin_memory: bool = True
    persistent_workers: bool = False
    use_amp: bool = False  # Automatic Mixed Precision (FP16)
    tune_binary_threshold_on_val: bool = False
    binary_eval_threshold: float = 0.5
    binary_threshold_metric: str = "balanced_accuracy"

    def __post_init__(self):
        if self.device == "auto":
            import torch
            self.device = "cuda" if torch.cuda.is_available() else "cpu"

        # Task-aware early-stopping monitor defaults.
        # If caller did not explicitly override monitor, prefer robust
        # task-specific metrics over raw val_loss for model selection.
        if not self.es_monitor or self.es_monitor == "val_loss":
            if self.task == "binary":
                self.es_monitor = "val_auroc"
            elif self.task in {"multiclass", "ordinal", "severity"}:
                self.es_monitor = "val_macro_f1"

        source_root = Path(__file__).resolve().parent.parent.parent
        repo_root = get_project_root()
        if not self.data_dir:
            if self.modality == "molecule":
                self.data_dir = str(repo_root / "data" / "processed")
            else:
                self.data_dir = str(source_root / self.modality / "data")
        results_dir = get_results_dir(project_root=repo_root)
        if not self.checkpoint_dir or self.checkpoint_dir == "checkpoints":
            self.checkpoint_dir = str(
                results_dir / "checkpoints" / self.experiment_name
            )
        if not self.log_dir or self.log_dir == "logs":
            self.log_dir = str(
                results_dir / "logs" / self.experiment_name
            )

    @classmethod
    def from_yaml(cls, path: str) -> "Config":
        with open(path, "r") as f:
            data = yaml.safe_load(f)
        return cls(**{k: v for k, v in data.items() if k in cls.__dataclass_fields__})

    @classmethod
    def from_dict(cls, d: Dict[str, Any]) -> "Config":
        return cls(**{k: v for k, v in d.items() if k in cls.__dataclass_fields__})

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    def save(self, path: str):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w") as f:
            yaml.dump(self.to_dict(), f, default_flow_style=False, sort_keys=False)

    def make_experiment_tag(self) -> str:
        tag = f"{self.experiment_name}_seed{self.seed}"
        if "q" in self.model_name.lower() or self.model_name.lower() in ("vqc", "qsvm"):
            tag += f"_q{self.n_qubits}_d{self.circuit_depth}_{self.entanglement}"
            if self.shots > 0:
                tag += f"_shots{self.shots}"
        return tag

    def make_aggregate_tag(self) -> str:
        tag = self.experiment_name
        if "q" in self.model_name.lower() or self.model_name.lower() in ("vqc", "qsvm"):
            tag += f"_q{self.n_qubits}_d{self.circuit_depth}_{self.entanglement}"
            if self.shots > 0:
                tag += f"_shots{self.shots}"
        return tag
