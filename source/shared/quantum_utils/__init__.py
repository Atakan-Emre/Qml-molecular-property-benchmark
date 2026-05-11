"""Shared quantum utilities for cross-modal benchmarking."""

from .pca_encoder import PCAEncoder
from .feature_maps import create_feature_map
from .ansatze import create_ansatz
from .backends import (
    create_aer_sampler,
    create_fidelity_kernel,
    get_qiskit_backend_info,
    prepare_circuit_for_aer,
    resolve_pennylane_backend,
)
from .circuit_metrics import get_circuit_metrics
from .trainer import QuantumTrainer
from .hybrid_head import QuantumProjectionHead

__all__ = [
    "PCAEncoder",
    "create_feature_map",
    "create_ansatz",
    "create_aer_sampler",
    "create_fidelity_kernel",
    "get_qiskit_backend_info",
    "prepare_circuit_for_aer",
    "resolve_pennylane_backend",
    "get_circuit_metrics",
    "QuantumTrainer",
    "QuantumProjectionHead",
]
