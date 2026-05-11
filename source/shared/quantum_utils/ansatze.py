"""Parameterized quantum circuit ansatze for variational methods."""

from qiskit.circuit.library import efficient_su2, real_amplitudes


def create_ansatz(
    n_qubits: int,
    ansatz_type: str = "real_amplitudes",
    reps: int = 2,
    entanglement: str = "full",
):
    """Create a parameterized ansatz circuit.

    Args:
        n_qubits: Number of qubits.
        ansatz_type: 'real_amplitudes' or 'efficient_su2'.
        reps: Number of repetitions (circuit depth).
        entanglement: Entanglement strategy ('full' or 'linear').

    Returns:
        Qiskit QuantumCircuit acting as the variational ansatz.
    """
    atype = ansatz_type.lower()

    if atype == "real_amplitudes":
        return real_amplitudes(
            num_qubits=n_qubits,
            reps=reps,
            entanglement=entanglement,
        )
    elif atype == "efficient_su2":
        return efficient_su2(
            num_qubits=n_qubits,
            reps=reps,
            entanglement=entanglement,
        )
    else:
        raise ValueError(
            f"Unknown ansatz_type: {ansatz_type}. "
            "Use 'real_amplitudes' or 'efficient_su2'."
        )
