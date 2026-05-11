"""Quantum feature map factories for kernel and variational methods."""

from qiskit.circuit.library import z_feature_map, zz_feature_map


def create_feature_map(
    n_qubits: int,
    feature_map_type: str = "zz",
    reps: int = 2,
    entanglement: str = "full",
):
    """Create a Qiskit feature map circuit.

    Args:
        n_qubits: Number of qubits (= feature dimension after PCA).
        feature_map_type: 'z' for ZFeatureMap, 'zz' for ZZFeatureMap.
        reps: Number of repetitions of the feature map circuit.
        entanglement: Entanglement strategy for ZZFeatureMap ('full' or 'linear').

    Returns:
        Qiskit QuantumCircuit acting as the feature map.
    """
    fmap_type = feature_map_type.lower()

    if fmap_type == "z":
        return z_feature_map(feature_dimension=n_qubits, reps=reps, entanglement=entanglement)
    elif fmap_type == "zz":
        return zz_feature_map(
            feature_dimension=n_qubits,
            reps=reps,
            entanglement=entanglement,
        )
    else:
        raise ValueError(f"Unknown feature_map_type: {feature_map_type}. Use 'z' or 'zz'.")
