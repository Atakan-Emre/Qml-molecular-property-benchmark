"""
Graph-based molecular models: GNN/MPNN and GAT.
Uses PyTorch Geometric for graph neural networks.
"""
import torch
import torch.nn as nn
import torch.nn.functional as F

try:
    from torch_geometric.nn import (
        GCNConv, GATConv, GINConv, NNConv,
        global_mean_pool, global_add_pool,
        BatchNorm,
    )
    from torch_geometric.data import Data, Batch
    HAS_PYG = True
except ImportError:
    HAS_PYG = False


# ──────────────────────────────────────────────────────────────────────────────
# MPNN / GNN
# ──────────────────────────────────────────────────────────────────────────────
class MolecularGNN(nn.Module):
    """GCN-based molecular property predictor."""

    def __init__(self, node_feat_dim: int = 9, num_classes: int = 2,
                 hidden_dim: int = 128, num_layers: int = 3, dropout: float = 0.3,
                 pool: str = "mean"):
        super().__init__()
        assert HAS_PYG, "PyTorch Geometric required for GNN models"

        self.convs = nn.ModuleList()
        self.bns = nn.ModuleList()

        self.convs.append(GCNConv(node_feat_dim, hidden_dim))
        self.bns.append(BatchNorm(hidden_dim))

        for _ in range(num_layers - 1):
            self.convs.append(GCNConv(hidden_dim, hidden_dim))
            self.bns.append(BatchNorm(hidden_dim))

        self.pool = global_mean_pool if pool == "mean" else global_add_pool
        self.dropout = dropout

        self.classifier = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.ReLU(inplace=True),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim // 2, num_classes),
        )

    def forward(self, data):
        x, edge_index, batch = data.x, data.edge_index, data.batch

        for conv, bn in zip(self.convs, self.bns):
            x = conv(x, edge_index)
            x = bn(x)
            x = F.relu(x)
            x = F.dropout(x, p=self.dropout, training=self.training)

        x = self.pool(x, batch)
        return self.classifier(x)

    def get_embedding(self, data):
        x, edge_index, batch = data.x, data.edge_index, data.batch
        for conv, bn in zip(self.convs, self.bns):
            x = conv(x, edge_index)
            x = bn(x)
            x = F.relu(x)
        return self.pool(x, batch)


# ──────────────────────────────────────────────────────────────────────────────
# GAT
# ──────────────────────────────────────────────────────────────────────────────
class MolecularGAT(nn.Module):
    """Graph Attention Network for molecular property prediction."""

    def __init__(self, node_feat_dim: int = 9, num_classes: int = 2,
                 hidden_dim: int = 128, num_layers: int = 3, heads: int = 4,
                 dropout: float = 0.3, pool: str = "mean"):
        super().__init__()
        assert HAS_PYG, "PyTorch Geometric required for GAT models"

        self.convs = nn.ModuleList()
        self.bns = nn.ModuleList()

        self.convs.append(GATConv(node_feat_dim, hidden_dim // heads, heads=heads, dropout=dropout))
        self.bns.append(BatchNorm(hidden_dim))

        for _ in range(num_layers - 2):
            self.convs.append(GATConv(hidden_dim, hidden_dim // heads, heads=heads, dropout=dropout))
            self.bns.append(BatchNorm(hidden_dim))

        # Last layer: single head
        self.convs.append(GATConv(hidden_dim, hidden_dim, heads=1, concat=False, dropout=dropout))
        self.bns.append(BatchNorm(hidden_dim))

        self.pool = global_mean_pool if pool == "mean" else global_add_pool
        self.dropout = dropout

        self.classifier = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.ReLU(inplace=True),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim // 2, num_classes),
        )

    def forward(self, data):
        x, edge_index, batch = data.x, data.edge_index, data.batch

        for conv, bn in zip(self.convs, self.bns):
            x = conv(x, edge_index)
            x = bn(x)
            x = F.elu(x)
            x = F.dropout(x, p=self.dropout, training=self.training)

        x = self.pool(x, batch)
        return self.classifier(x)

    def get_embedding(self, data):
        x, edge_index, batch = data.x, data.edge_index, data.batch
        for conv, bn in zip(self.convs, self.bns):
            x = conv(x, edge_index)
            x = bn(x)
            x = F.elu(x)
        return self.pool(x, batch)


def build_graph_model(model_name: str, node_feat_dim: int = 9,
                      num_classes: int = 2, **kwargs) -> nn.Module:
    """Factory for graph-based models."""
    model_name = model_name.lower()
    if model_name in ("gnn", "gcn", "mpnn"):
        return MolecularGNN(node_feat_dim, num_classes, **kwargs)
    elif model_name == "gat":
        return MolecularGAT(node_feat_dim, num_classes, **kwargs)
    else:
        raise ValueError(f"Unknown graph model: {model_name}")
