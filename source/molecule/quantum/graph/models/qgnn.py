"""
Quantum Graph Neural Network (QGNN) Model — PennyLane + PyG hybrid.

Based on Verdon et al. 2019 (arXiv:1909.12264).
Uses variational quantum circuits for message passing on molecular graphs.

Architecture:
  Molecular graph → Classical node embedding → Quantum message passing → Global pool → FC → classification
"""
import torch
import torch.nn as nn
import numpy as np
import pennylane as qml
from torch_geometric.nn import global_mean_pool


class QuantumMessagePassingLayer(nn.Module):
    """Quantum-enhanced message passing layer.

    For each edge, a small VQC processes the concatenated node features
    of source and target to produce a quantum-processed message.
    """

    def __init__(
        self,
        node_dim: int,
        n_qubits: int = 4,
        n_layers: int = 2,
        backend: str = "lightning.qubit",
        diff_method: str = "adjoint",
    ):
        super().__init__()
        self.node_dim = node_dim
        self.n_qubits = n_qubits
        self.n_layers = n_layers

        # Project node pair features to n_qubits
        self.edge_proj = nn.Linear(2 * node_dim, n_qubits)

        # Quantum circuit for message computation
        self.dev = qml.device(backend, wires=n_qubits)
        weight_shapes = {"weights": (n_layers, n_qubits, 3)}

        qnode = qml.QNode(self._circuit, self.dev, interface="torch",
                          diff_method=diff_method)
        self.qlayer = qml.qnn.TorchLayer(qnode, weight_shapes)

        # Project quantum output back to node_dim
        self.msg_proj = nn.Linear(n_qubits, node_dim)

    def _circuit(self, inputs, weights):
        """VQC for edge message computation."""
        qml.AngleEmbedding(inputs, wires=range(self.n_qubits), rotation="Y")

        for layer in range(self.n_layers):
            for q in range(self.n_qubits):
                qml.Rot(weights[layer, q, 0],
                        weights[layer, q, 1],
                        weights[layer, q, 2], wires=q)
            for q in range(self.n_qubits - 1):
                qml.CNOT(wires=[q, q + 1])

        return [qml.expval(qml.PauliZ(q)) for q in range(self.n_qubits)]

    def forward(self, x, edge_index):
        """
        Args:
            x: Node features (N, node_dim)
            edge_index: Edge indices (2, E)
        Returns:
            Updated node features (N, node_dim)
        """
        src, dst = edge_index
        # Concatenate source and destination node features
        edge_features = torch.cat([x[src], x[dst]], dim=1)  # (E, 2*node_dim)
        edge_proj = torch.tanh(self.edge_proj(edge_features))  # (E, n_qubits)

        # Apply quantum circuit to each edge
        quantum_msg = self.qlayer(edge_proj)  # (E, n_qubits)
        messages = self.msg_proj(quantum_msg)  # (E, node_dim)

        # Aggregate messages (scatter add)
        out = torch.zeros_like(x)
        out.index_add_(0, dst, messages)

        # Residual connection + activation
        return torch.relu(x + out)


class QGNN(nn.Module):
    """Full QGNN model for molecular property prediction."""

    def __init__(
        self,
        input_dim: int = 9,
        hidden_dim: int = 32,
        num_classes: int = 2,
        n_qubits: int = 4,
        n_layers: int = 2,
        n_message_passes: int = 3,
        dropout: float = 0.3,
        backend: str = "lightning.qubit",
        diff_method: str = "adjoint",
    ):
        super().__init__()
        self.n_message_passes = n_message_passes

        # Initial node embedding
        self.node_embed = nn.Linear(input_dim, hidden_dim)

        # Quantum message passing layers
        self.qmp_layers = nn.ModuleList([
            QuantumMessagePassingLayer(
                hidden_dim,
                n_qubits,
                n_layers,
                backend=backend,
                diff_method=diff_method,
            )
            for _ in range(n_message_passes)
        ])

        # Classification head
        self.classifier = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim, num_classes),
        )

    def forward(self, data):
        """
        Args:
            data: PyG Data object with x, edge_index, batch.
        Returns:
            logits: (batch_size, num_classes)
        """
        x = self.node_embed(data.x.float())

        for qmp in self.qmp_layers:
            x = qmp(x, data.edge_index)

        # Global mean pooling
        graph_emb = global_mean_pool(x, data.batch)

        return self.classifier(graph_emb)

    def get_embedding(self, data):
        """Extract graph embedding before classifier."""
        x = self.node_embed(data.x.float())
        for qmp in self.qmp_layers:
            x = qmp(x, data.edge_index)
        return global_mean_pool(x, data.batch)
