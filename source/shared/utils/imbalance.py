import numpy as np
import torch
from sklearn.metrics import balanced_accuracy_score, f1_score
from torch.utils.data import WeightedRandomSampler


def is_extremely_imbalanced_binary(labels, minority_threshold: float = 0.15) -> bool:
    labels = np.asarray(labels).reshape(-1)
    labels = labels[~np.isnan(labels)] if labels.dtype.kind in {"f"} else labels
    labels = labels.astype(int)
    if labels.size == 0:
        return False
    values, counts = np.unique(labels, return_counts=True)
    if len(values) != 2:
        return False
    minority_ratio = float(np.min(counts) / np.sum(counts))
    return minority_ratio < minority_threshold


def compute_balanced_class_weights(labels, num_classes: int = 2) -> torch.Tensor:
    labels = np.asarray(labels).reshape(-1).astype(int)
    counts = np.bincount(labels, minlength=num_classes).astype(np.float64)
    counts[counts == 0] = 1.0
    weights = labels.size / (num_classes * counts)
    return torch.tensor(weights, dtype=torch.float32)


def build_balanced_sampler(labels) -> WeightedRandomSampler:
    labels = np.asarray(labels).reshape(-1).astype(int)
    class_weights = compute_balanced_class_weights(labels, num_classes=max(2, int(labels.max()) + 1))
    sample_weights = class_weights[labels].double()
    return WeightedRandomSampler(
        weights=sample_weights,
        num_samples=len(sample_weights),
        replacement=True,
    )


def predict_binary_with_threshold(y_prob, threshold: float = 0.5) -> np.ndarray:
    y_prob = np.asarray(y_prob)
    if y_prob.ndim == 2:
        pos_prob = y_prob[:, 1]
    else:
        pos_prob = y_prob
    return (pos_prob >= threshold).astype(int)


def tune_binary_threshold(
    y_true,
    y_prob,
    metric: str = "balanced_accuracy",
    min_threshold: float = 0.05,
    max_threshold: float = 0.95,
    num_steps: int = 181,
) -> tuple[float, float]:
    y_true = np.asarray(y_true).reshape(-1).astype(int)
    y_prob = np.asarray(y_prob)
    if y_prob.ndim == 2:
        pos_prob = y_prob[:, 1]
    else:
        pos_prob = y_prob

    best_threshold = 0.5
    best_score = float("-inf")
    thresholds = np.linspace(min_threshold, max_threshold, num_steps)
    for threshold in thresholds:
        y_pred = predict_binary_with_threshold(pos_prob, threshold)
        if metric == "f1":
            score = f1_score(y_true, y_pred, zero_division=0)
        else:
            score = balanced_accuracy_score(y_true, y_pred)
        if score > best_score + 1e-12:
            best_score = float(score)
            best_threshold = float(threshold)

    return best_threshold, best_score
