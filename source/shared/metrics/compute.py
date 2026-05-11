import numpy as np
from sklearn.metrics import (
    accuracy_score,
    balanced_accuracy_score,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
    average_precision_score,
    matthews_corrcoef,
    confusion_matrix,
    classification_report,
    cohen_kappa_score,
)
from typing import Dict, Optional


def compute_binary_metrics(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    y_prob: np.ndarray,
) -> Dict[str, float]:
    """Metrics for binary classification."""
    metrics = {}
    metrics["accuracy"] = accuracy_score(y_true, y_pred)
    metrics["balanced_accuracy"] = balanced_accuracy_score(y_true, y_pred)
    metrics["f1"] = f1_score(y_true, y_pred, average="binary", zero_division=0)
    metrics["precision"] = precision_score(y_true, y_pred, average="binary", zero_division=0)
    metrics["recall"] = recall_score(y_true, y_pred, average="binary", zero_division=0)
    metrics["mcc"] = matthews_corrcoef(y_true, y_pred)

    # AUC — use probability of positive class
    try:
        if y_prob.ndim == 2 and y_prob.shape[1] >= 2:
            metrics["auroc"] = roc_auc_score(y_true, y_prob[:, 1])
            metrics["pr_auc"] = average_precision_score(y_true, y_prob[:, 1])
        elif y_prob.ndim == 1:
            metrics["auroc"] = roc_auc_score(y_true, y_prob)
            metrics["pr_auc"] = average_precision_score(y_true, y_prob)
    except ValueError:
        metrics["auroc"] = 0.0
        metrics["pr_auc"] = 0.0

    # Sensitivity / Specificity
    cm = confusion_matrix(y_true, y_pred, labels=[0, 1])
    if cm.shape == (2, 2):
        tn, fp, fn, tp = cm.ravel()
        metrics["sensitivity"] = tp / max(tp + fn, 1)
        metrics["specificity"] = tn / max(tn + fp, 1)

    # Calibration
    metrics["ece"] = compute_calibration(y_true, y_prob)

    return metrics


def compute_multiclass_metrics(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    y_prob: np.ndarray,
    num_classes: int = 5,
) -> Dict[str, float]:
    """Metrics for multi-class classification."""
    metrics = {}
    metrics["accuracy"] = accuracy_score(y_true, y_pred)
    metrics["balanced_accuracy"] = balanced_accuracy_score(y_true, y_pred)
    metrics["macro_f1"] = f1_score(y_true, y_pred, average="macro", zero_division=0)
    metrics["weighted_f1"] = f1_score(y_true, y_pred, average="weighted", zero_division=0)
    metrics["macro_precision"] = precision_score(y_true, y_pred, average="macro", zero_division=0)
    metrics["macro_recall"] = recall_score(y_true, y_pred, average="macro", zero_division=0)
    metrics["mcc"] = matthews_corrcoef(y_true, y_pred)

    # AUROC (one-vs-rest)
    try:
        if y_prob.ndim == 2 and y_prob.shape[1] == num_classes:
            labels = list(range(num_classes))
            metrics["auroc_macro"] = roc_auc_score(
                y_true, y_prob, multi_class="ovr", average="macro", labels=labels
            )
            metrics["auroc_weighted"] = roc_auc_score(
                y_true, y_prob, multi_class="ovr", average="weighted", labels=labels
            )
    except (ValueError, TypeError) as e:
        import warnings
        warnings.warn(f"AUROC computation failed: {e}")
        metrics["auroc_macro"] = 0.0
        metrics["auroc_weighted"] = 0.0

    # Calibration
    metrics["ece"] = compute_calibration(y_true, y_prob)

    return metrics


def compute_ordinal_metrics(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    y_prob: np.ndarray,
    num_classes: int = 5,
) -> Dict[str, float]:
    """Metrics for ordinal regression / grading (e.g., DR levels)."""
    metrics = compute_multiclass_metrics(y_true, y_pred, y_prob, num_classes)

    # Quadratic Weighted Kappa
    metrics["qwk"] = cohen_kappa_score(y_true, y_pred, weights="quadratic")
    metrics["linear_kappa"] = cohen_kappa_score(y_true, y_pred, weights="linear")

    return metrics


def compute_ecg_metrics(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    y_prob: np.ndarray,
    task: str = "binary",
    num_classes: int = 2,
) -> Dict[str, float]:
    """ECG-specific metrics."""
    if task == "binary":
        return compute_binary_metrics(y_true, y_pred, y_prob)
    else:
        return compute_multiclass_metrics(y_true, y_pred, y_prob, num_classes)


def compute_retina_metrics(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    y_prob: np.ndarray,
    task: str = "binary",
    num_classes: int = 2,
) -> Dict[str, float]:
    """Retina-specific metrics (supports ordinal)."""
    if task == "binary":
        return compute_binary_metrics(y_true, y_pred, y_prob)
    elif task == "ordinal":
        return compute_ordinal_metrics(y_true, y_pred, y_prob, num_classes)
    else:
        return compute_multiclass_metrics(y_true, y_pred, y_prob, num_classes)


def compute_molecule_metrics(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    y_prob: np.ndarray,
    task: str = "binary",
    num_classes: int = 2,
) -> Dict[str, float]:
    """Molecule-specific metrics."""
    if task == "binary":
        metrics = compute_binary_metrics(y_true, y_pred, y_prob)
        return metrics
    else:
        return compute_multiclass_metrics(y_true, y_pred, y_prob, num_classes)


def compute_calibration(
    y_true: np.ndarray,
    y_prob: np.ndarray,
    n_bins: int = 15,
) -> float:
    """Expected Calibration Error (ECE)."""
    if y_prob.ndim == 2:
        confidences = np.max(y_prob, axis=1)
        if y_prob.shape[1] == 2:
            predicted = (y_prob[:, 1] > 0.5).astype(int)
        else:
            predicted = np.argmax(y_prob, axis=1)
    else:
        confidences = np.where(y_prob > 0.5, y_prob, 1 - y_prob)
        predicted = (y_prob > 0.5).astype(int)

    correctness = (predicted == y_true).astype(float)

    bin_boundaries = np.linspace(0, 1, n_bins + 1)
    ece = 0.0
    for i in range(n_bins):
        mask = (confidences > bin_boundaries[i]) & (confidences <= bin_boundaries[i + 1])
        if mask.sum() == 0:
            continue
        bin_acc = correctness[mask].mean()
        bin_conf = confidences[mask].mean()
        ece += mask.sum() / len(y_true) * abs(bin_acc - bin_conf)

    return float(ece)
