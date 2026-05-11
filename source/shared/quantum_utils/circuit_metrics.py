"""Quantum circuit metrics for benchmarking and reporting.

Extracts gate counts, circuit depth, and parameter counts from
Qiskit quantum circuits — important for fair quantum vs classical comparison.
"""

from typing import Dict, Any, Optional
from qiskit import QuantumCircuit
from qiskit.transpiler.preset_passmanagers import generate_preset_pass_manager


def get_circuit_metrics(
    circuit: QuantumCircuit,
    optimization_level: int = 1,
    backend=None,
) -> Dict[str, Any]:
    """Extract metrics from a quantum circuit.

    Args:
        circuit: Qiskit QuantumCircuit to analyze.
        optimization_level: Transpilation optimization level (0-3).
        backend: Optional backend for hardware-aware transpilation.

    Returns:
        Dictionary with circuit metrics.
    """
    # Decompose BlueprintCircuits for accurate metrics
    try:
        decomposed = circuit.decompose()
    except Exception:
        decomposed = circuit

    # Raw circuit metrics
    metrics = {
        "n_qubits": circuit.num_qubits,
        "raw_depth": decomposed.depth(),
        "raw_gate_count": sum(decomposed.count_ops().values()),
        "raw_ops": dict(decomposed.count_ops()),
        "n_parameters": circuit.num_parameters,
    }

    # Transpile for more realistic metrics
    try:
        pm = generate_preset_pass_manager(
            optimization_level=optimization_level,
            basis_gates=["cx", "rz", "sx", "x", "id"],
        )
        transpiled = pm.run(circuit)
        metrics["transpiled_depth"] = transpiled.depth()
        metrics["transpiled_gate_count"] = sum(transpiled.count_ops().values())
        metrics["transpiled_ops"] = dict(transpiled.count_ops())
        metrics["cx_count"] = transpiled.count_ops().get("cx", 0)
    except Exception:
        metrics["transpiled_depth"] = None
        metrics["transpiled_gate_count"] = None

    return metrics


def estimate_shot_time(
    n_circuits: int,
    shots: int,
    gate_time_ns: float = 100.0,
    circuit_depth: int = 10,
) -> Dict[str, float]:
    """Estimate wall-clock time for shot-based execution.

    Args:
        n_circuits: Number of circuits to evaluate.
        shots: Number of shots per circuit.
        gate_time_ns: Approximate gate execution time in nanoseconds.
        circuit_depth: Average circuit depth.

    Returns:
        Dict with estimated times in seconds.
    """
    single_shot_ns = circuit_depth * gate_time_ns
    single_circuit_s = (single_shot_ns * shots) / 1e9
    total_s = single_circuit_s * n_circuits

    return {
        "single_circuit_sec": single_circuit_s,
        "total_sec": total_s,
        "total_min": total_s / 60,
        "n_circuits": n_circuits,
        "shots": shots,
    }
