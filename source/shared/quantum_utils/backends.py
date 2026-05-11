"""Backend helpers for efficient local quantum simulation."""

import os
from typing import Dict, Optional

import pennylane as qml
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit_aer.primitives import SamplerV2
from qiskit_machine_learning.kernels import FidelityQuantumKernel, FidelityStatevectorKernel
from qiskit_machine_learning.state_fidelities import ComputeUncompute


def get_cpu_thread_count() -> int:
    """Use all available logical CPUs for local simulation by default."""
    return max(1, os.cpu_count() or 1)


def resolve_aer_device(preferred: str = "auto") -> str:
    """Choose the best available Aer simulation device."""
    if preferred in {"CPU", "GPU"}:
        if preferred == "GPU":
            probe = QuantumCircuit(1)
            probe.ry(0.1, 0)
            probe.measure_all()
            try:
                AerSimulator(method="statevector", device="GPU").run(probe, shots=16).result()
                return "GPU"
            except Exception:
                return "CPU"
        return preferred
    return resolve_aer_device("GPU")


def create_aer_sampler(
    seed: Optional[int] = None,
    shots: Optional[int] = None,
    preferred_device: str = "auto",
    max_parallel_threads: Optional[int] = None,
) -> SamplerV2:
    """Create an Aer sampler tuned for local CPU/GPU simulation."""
    effective_shots = 256 if shots in (None, 0) else int(shots)
    backend_options = {
        "method": "statevector",
        "device": resolve_aer_device(preferred_device),
        "max_parallel_threads": max_parallel_threads or get_cpu_thread_count(),
    }
    return SamplerV2(
        default_shots=effective_shots,
        seed=seed,
        options={"backend_options": backend_options},
    )


def prepare_circuit_for_aer(
    circuit,
    preferred_device: str = "auto",
    max_parallel_threads: Optional[int] = None,
):
    """Transpile a parameterized circuit to Aer-supported instructions."""
    simulator = AerSimulator(
        method="statevector",
        device=resolve_aer_device(preferred_device),
        max_parallel_threads=max_parallel_threads or get_cpu_thread_count(),
    )
    return transpile(circuit, backend=simulator, optimization_level=0)


def create_fidelity_kernel(
    feature_map,
    seed: Optional[int] = None,
    shots: Optional[int] = None,
    preferred_device: str = "auto",
    max_parallel_threads: Optional[int] = None,
) -> FidelityQuantumKernel:
    """Create a FidelityQuantumKernel backed by Aer ComputeUncompute."""
    if shots in (None, 0):
        return FidelityStatevectorKernel(feature_map=feature_map, shots=None, enforce_psd=True)

    sampler = create_aer_sampler(
        seed=seed,
        shots=shots,
        preferred_device=preferred_device,
        max_parallel_threads=max_parallel_threads,
    )
    fidelity = ComputeUncompute(sampler=sampler)
    return FidelityQuantumKernel(feature_map=feature_map, fidelity=fidelity)


def get_qiskit_backend_info(
    preferred_device: str = "auto",
    max_parallel_threads: Optional[int] = None,
    shots: Optional[int] = None,
) -> Dict[str, object]:
    """Report the backend config used by local Qiskit simulation."""
    shot_value = 0 if shots in (None, 0) else int(shots)
    return {
        "backend": "aer_statevector",
        "device": resolve_aer_device(preferred_device),
        "max_parallel_threads": max_parallel_threads or get_cpu_thread_count(),
        "shots": shot_value,
        "sampling_mode": "exact_statevector" if shot_value == 0 else "shot_based",
    }


def pennylane_backend_to_torch_device(backend: str) -> str:
    """Map the resolved PennyLane device to the preferred PyTorch device."""
    return "cuda" if backend == "lightning.gpu" else "cpu"


def resolve_pennylane_backend(preferred: str = "auto") -> Dict[str, str]:
    """
    Select the fastest available PennyLane device with a matching diff method.

    Preference order:
      auto -> lightning.gpu -> lightning.qubit -> default.qubit
    """
    candidate_sets = {
        "auto": ("lightning.gpu", "lightning.qubit", "default.qubit"),
        "lightning.gpu": ("lightning.gpu", "lightning.qubit", "default.qubit"),
        "lightning.qubit": ("lightning.qubit", "default.qubit"),
        "default.qubit": ("default.qubit",),
    }
    diff_methods = {
        "lightning.gpu": "adjoint",
        "lightning.qubit": "adjoint",
        "default.qubit": "backprop",
    }

    for backend in candidate_sets.get(preferred, candidate_sets["auto"]):
        try:
            qml.device(backend, wires=1)
            return {
                "backend": backend,
                "diff_method": diff_methods[backend],
                "torch_device": pennylane_backend_to_torch_device(backend),
            }
        except Exception:
            continue

    return {
        "backend": "default.qubit",
        "diff_method": "backprop",
        "torch_device": "cpu",
    }
