import torch
import torch.nn as nn
import pennylane as qml


class QuantumProjectionHead(nn.Module):
    """Lightweight hybrid classifier head for frozen classical embeddings."""

    def __init__(
        self,
        input_dim: int,
        num_classes: int,
        n_qubits: int = 4,
        circuit_depth: int = 2,
        hidden_dim: int = 128,
        dropout: float = 0.2,
        backend: str = "lightning.qubit",
        diff_method: str = "adjoint",
    ):
        super().__init__()
        self.input_dim = input_dim
        self.n_qubits = n_qubits
        self.circuit_depth = circuit_depth

        self.pre_net = nn.Sequential(
            nn.LayerNorm(input_dim),
            nn.Linear(input_dim, hidden_dim),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim, n_qubits),
        )

        self.dev = qml.device(backend, wires=n_qubits)
        weight_shapes = {"weights": (circuit_depth, n_qubits)}
        qnode = qml.QNode(self._circuit, self.dev, interface="torch", diff_method=diff_method)
        self.quantum_layer = qml.qnn.TorchLayer(qnode, weight_shapes)

        fused_dim = n_qubits * 2
        self.post_net = nn.Sequential(
            nn.LayerNorm(fused_dim),
            nn.Linear(fused_dim, hidden_dim),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim, num_classes),
        )

    def _circuit(self, inputs, weights):
        qml.AngleEmbedding(inputs, wires=range(self.n_qubits), rotation="Y")
        qml.BasicEntanglerLayers(weights, wires=range(self.n_qubits))
        return [qml.expval(qml.PauliZ(i)) for i in range(self.n_qubits)]

    def forward(self, x):
        projected = torch.tanh(self.pre_net(x))
        q_out = self.quantum_layer(projected)
        fused = torch.cat([projected, q_out], dim=1)
        return self.post_net(fused)

    def get_embedding(self, x):
        projected = torch.tanh(self.pre_net(x))
        q_out = self.quantum_layer(projected)
        return torch.cat([projected, q_out], dim=1)
