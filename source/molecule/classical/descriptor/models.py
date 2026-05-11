"""
Descriptor-based molecular models: ECFP+SVM, ECFP+MLP.
These operate on fingerprint/descriptor vectors, not graphs.
"""
import torch
import torch.nn as nn
import numpy as np
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline


# ──────────────────────────────────────────────────────────────────────────────
# ECFP + MLP (PyTorch)
# ──────────────────────────────────────────────────────────────────────────────
class MolecularMLP(nn.Module):
    def __init__(self, input_dim: int = 1024, num_classes: int = 2,
                 hidden_dims: list = None, dropout: float = 0.3):
        super().__init__()
        if hidden_dims is None:
            hidden_dims = [512, 256, 128]

        layers = []
        in_dim = input_dim
        for h_dim in hidden_dims:
            layers.extend([
                nn.Linear(in_dim, h_dim),
                nn.BatchNorm1d(h_dim),
                nn.ReLU(inplace=True),
                nn.Dropout(dropout),
            ])
            in_dim = h_dim

        self.features = nn.Sequential(*layers)
        self.classifier = nn.Linear(in_dim, num_classes)

    def forward(self, x):
        h = self.features(x)
        return self.classifier(h)

    def get_embedding(self, x):
        return self.features(x)


# ──────────────────────────────────────────────────────────────────────────────
# ECFP + SVM (scikit-learn)
# ──────────────────────────────────────────────────────────────────────────────
def build_svm_pipeline(kernel: str = "rbf", C: float = 1.0, gamma: str = "scale"):
    """Build SVM pipeline with scaling."""
    return Pipeline([
        ("scaler", StandardScaler()),
        ("svm", SVC(
            kernel=kernel,
            C=C,
            gamma=gamma,
            probability=True,
            class_weight="balanced",
            random_state=42,
        )),
    ])


def build_descriptor_model(model_name: str, input_dim: int = 1024,
                           num_classes: int = 2, **kwargs):
    """Factory for descriptor-based models."""
    model_name = model_name.lower()
    if model_name in ("mlp", "ecfp_mlp"):
        return MolecularMLP(input_dim, num_classes, **kwargs)
    elif model_name in ("svm", "ecfp_svm"):
        return build_svm_pipeline(**kwargs)
    else:
        raise ValueError(f"Unknown descriptor model: {model_name}")
