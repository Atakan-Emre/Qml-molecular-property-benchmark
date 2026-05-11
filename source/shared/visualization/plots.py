import os
import json
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import seaborn as sns
from sklearn.metrics import (
    confusion_matrix,
    roc_curve,
    auc,
    precision_recall_curve,
    average_precision_score,
)
from sklearn.manifold import TSNE
from sklearn.calibration import calibration_curve
from typing import Dict, List, Optional, Tuple, Any
from pathlib import Path

# Style defaults
sns.set_theme(style="whitegrid", font_scale=1.1)
COLORS_CLASSICAL = ["#2196F3", "#1565C0", "#0D47A1", "#42A5F5"]
COLORS_QUANTUM = ["#FF5722", "#E64A19", "#BF360C", "#FF8A65"]
FIGSIZE_SINGLE = (8, 6)
FIGSIZE_WIDE = (14, 6)
FIGSIZE_LARGE = (16, 10)
DPI = 150


def _save_fig(fig, path: str, dpi: int = DPI):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    fig.savefig(path, dpi=dpi, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ──────────────────────────────────────────────────────────────────────────────
# 1. Training Curves (loss, metrics over epochs)
# ──────────────────────────────────────────────────────────────────────────────
def plot_training_curves(
    history: List[Dict],
    metrics: List[str] = None,
    save_path: str = "training_curves.png",
    title: str = "Training Curves",
):
    """Plot train/val loss and metric curves from epoch history."""
    if metrics is None:
        metrics = ["loss", "auroc", "macro_f1", "accuracy"]

    train_hist = [h for h in history if h.get("phase") == "train"]
    val_hist = [h for h in history if h.get("phase") == "val"]

    available = [m for m in metrics if m in train_hist[0] or m in val_hist[0]] if train_hist else []
    if not available:
        available = ["loss"]

    n = len(available)
    cols = min(n, 3)
    rows = (n + cols - 1) // cols
    fig, axes = plt.subplots(rows, cols, figsize=(5 * cols, 4 * rows))
    if n == 1:
        axes = [axes]
    else:
        axes = axes.flatten() if hasattr(axes, "flatten") else [axes]

    for i, metric in enumerate(available):
        ax = axes[i]
        train_vals = [h.get(metric) for h in train_hist if h.get(metric) is not None]
        val_vals = [h.get(metric) for h in val_hist if h.get(metric) is not None]
        epochs_t = list(range(len(train_vals)))
        epochs_v = list(range(len(val_vals)))

        if train_vals:
            ax.plot(epochs_t, train_vals, label="Train", color=COLORS_CLASSICAL[0], linewidth=2)
        if val_vals:
            ax.plot(epochs_v, val_vals, label="Val", color=COLORS_QUANTUM[0], linewidth=2)

        ax.set_xlabel("Epoch")
        ax.set_ylabel(metric.replace("_", " ").title())
        ax.set_title(metric.replace("_", " ").title())
        ax.legend()
        ax.grid(True, alpha=0.3)

    # Hide unused axes
    for j in range(i + 1, len(axes)):
        axes[j].set_visible(False)

    fig.suptitle(title, fontsize=14, fontweight="bold", y=1.02)
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 2. Confusion Matrix
# ──────────────────────────────────────────────────────────────────────────────
def plot_confusion_matrix(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    class_names: List[str] = None,
    save_path: str = "confusion_matrix.png",
    title: str = "Confusion Matrix",
    normalize: bool = True,
):
    """Plot annotated confusion matrix heatmap."""
    cm = confusion_matrix(y_true, y_pred)
    if normalize:
        cm_plot = cm.astype(float) / cm.sum(axis=1, keepdims=True)
        cm_plot = np.nan_to_num(cm_plot)
        fmt = ".2f"
    else:
        cm_plot = cm
        fmt = "d"

    n_classes = cm.shape[0]
    if class_names is None:
        class_names = [str(i) for i in range(n_classes)]

    fig, ax = plt.subplots(figsize=(max(6, n_classes), max(5, n_classes - 1)))
    sns.heatmap(
        cm_plot, annot=True, fmt=fmt, cmap="Blues",
        xticklabels=class_names, yticklabels=class_names,
        square=True, linewidths=0.5, ax=ax,
    )

    # Overlay raw counts if normalized
    if normalize:
        for i in range(n_classes):
            for j in range(n_classes):
                ax.text(
                    j + 0.5, i + 0.75, f"(n={cm[i, j]})",
                    ha="center", va="center", fontsize=7, color="gray",
                )

    ax.set_xlabel("Predicted", fontsize=12)
    ax.set_ylabel("True", fontsize=12)
    ax.set_title(title, fontsize=14, fontweight="bold")
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 3. ROC Curves (per-class + macro)
# ──────────────────────────────────────────────────────────────────────────────
def plot_roc_curves(
    y_true: np.ndarray,
    y_prob: np.ndarray,
    class_names: List[str] = None,
    save_path: str = "roc_curves.png",
    title: str = "ROC Curves",
):
    """Plot per-class ROC curves + macro average."""
    fig, ax = plt.subplots(figsize=FIGSIZE_SINGLE)

    if y_prob.ndim == 1 or (y_prob.ndim == 2 and y_prob.shape[1] == 2):
        # Binary
        prob = y_prob[:, 1] if y_prob.ndim == 2 else y_prob
        fpr, tpr, _ = roc_curve(y_true, prob)
        roc_auc = auc(fpr, tpr)
        ax.plot(fpr, tpr, linewidth=2, label=f"AUC = {roc_auc:.3f}")
    else:
        # Multi-class OVR
        n_classes = y_prob.shape[1]
        if class_names is None:
            class_names = [f"Class {i}" for i in range(n_classes)]

        all_fpr = np.linspace(0, 1, 100)
        mean_tpr = np.zeros_like(all_fpr)

        colors = plt.cm.tab10(np.linspace(0, 1, n_classes))
        for i in range(n_classes):
            y_bin = (y_true == i).astype(int)
            if y_bin.sum() == 0:
                continue
            fpr, tpr, _ = roc_curve(y_bin, y_prob[:, i])
            roc_auc = auc(fpr, tpr)
            ax.plot(fpr, tpr, color=colors[i], linewidth=1.5,
                    label=f"{class_names[i]} (AUC={roc_auc:.3f})")
            mean_tpr += np.interp(all_fpr, fpr, tpr)

        mean_tpr /= n_classes
        mean_auc = auc(all_fpr, mean_tpr)
        ax.plot(all_fpr, mean_tpr, "k--", linewidth=2.5,
                label=f"Macro avg (AUC={mean_auc:.3f})")

    ax.plot([0, 1], [0, 1], "k:", alpha=0.3)
    ax.set_xlim([0, 1])
    ax.set_ylim([0, 1.02])
    ax.set_xlabel("False Positive Rate")
    ax.set_ylabel("True Positive Rate")
    ax.set_title(title, fontsize=14, fontweight="bold")
    ax.legend(loc="lower right", fontsize=9)
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 4. Precision-Recall Curves
# ──────────────────────────────────────────────────────────────────────────────
def plot_pr_curves(
    y_true: np.ndarray,
    y_prob: np.ndarray,
    class_names: List[str] = None,
    save_path: str = "pr_curves.png",
    title: str = "Precision-Recall Curves",
):
    """Plot per-class PR curves."""
    fig, ax = plt.subplots(figsize=FIGSIZE_SINGLE)

    if y_prob.ndim == 1 or (y_prob.ndim == 2 and y_prob.shape[1] == 2):
        prob = y_prob[:, 1] if y_prob.ndim == 2 else y_prob
        precision, recall, _ = precision_recall_curve(y_true, prob)
        ap = average_precision_score(y_true, prob)
        ax.plot(recall, precision, linewidth=2, label=f"AP = {ap:.3f}")
    else:
        n_classes = y_prob.shape[1]
        if class_names is None:
            class_names = [f"Class {i}" for i in range(n_classes)]
        colors = plt.cm.tab10(np.linspace(0, 1, n_classes))
        for i in range(n_classes):
            y_bin = (y_true == i).astype(int)
            if y_bin.sum() == 0:
                continue
            precision, recall, _ = precision_recall_curve(y_bin, y_prob[:, i])
            ap = average_precision_score(y_bin, y_prob[:, i])
            ax.plot(recall, precision, color=colors[i], linewidth=1.5,
                    label=f"{class_names[i]} (AP={ap:.3f})")

    ax.set_xlabel("Recall")
    ax.set_ylabel("Precision")
    ax.set_title(title, fontsize=14, fontweight="bold")
    ax.legend(loc="lower left", fontsize=9)
    ax.set_xlim([0, 1])
    ax.set_ylim([0, 1.02])
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 5. Calibration Curve
# ──────────────────────────────────────────────────────────────────────────────
def plot_calibration_curve(
    y_true: np.ndarray,
    y_prob: np.ndarray,
    n_bins: int = 10,
    save_path: str = "calibration_curve.png",
    title: str = "Calibration Curve",
):
    """Reliability diagram with histogram."""
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(8, 8), gridspec_kw={"height_ratios": [3, 1]})

    if y_prob.ndim == 2 and y_prob.shape[1] == 2:
        prob = y_prob[:, 1]
    elif y_prob.ndim == 1:
        prob = y_prob
    else:
        prob = np.max(y_prob, axis=1)
        y_true = (y_true == np.argmax(y_prob, axis=1)).astype(int)

    fraction_pos, mean_predicted = calibration_curve(y_true, prob, n_bins=n_bins, strategy="uniform")

    ax1.plot(mean_predicted, fraction_pos, "s-", color=COLORS_CLASSICAL[0], linewidth=2, label="Model")
    ax1.plot([0, 1], [0, 1], "k--", alpha=0.5, label="Perfect calibration")
    ax1.set_ylabel("Fraction of positives")
    ax1.set_title(title, fontsize=14, fontweight="bold")
    ax1.legend()
    ax1.set_xlim([0, 1])
    ax1.set_ylim([0, 1])

    ax2.hist(prob, bins=n_bins, range=(0, 1), color=COLORS_CLASSICAL[0], alpha=0.7, edgecolor="black")
    ax2.set_xlabel("Mean predicted probability")
    ax2.set_ylabel("Count")

    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 6. Model Comparison Bar Chart
# ──────────────────────────────────────────────────────────────────────────────
def plot_model_comparison_bar(
    results: Dict[str, Dict[str, float]],
    metric: str = "auroc",
    save_path: str = "model_comparison.png",
    title: str = "Model Comparison",
    error_key: str = None,
):
    """
    Bar chart comparing models.
    results: {"ModelName": {"auroc": 0.95, "auroc_std": 0.02, ...}, ...}
    """
    fig, ax = plt.subplots(figsize=FIGSIZE_WIDE)

    models = list(results.keys())
    values = [results[m].get(metric, 0) for m in models]
    errors = [results[m].get(error_key or f"{metric}_std", 0) for m in models]

    # Color by type
    colors = []
    for m in models:
        m_lower = m.lower()
        if any(q in m_lower for q in ["qsvm", "vqc", "qlstm", "qcnn", "qgnn", "qgat", "quantum", "hybrid"]):
            colors.append(COLORS_QUANTUM[0])
        else:
            colors.append(COLORS_CLASSICAL[0])

    bars = ax.bar(range(len(models)), values, yerr=errors, capsize=4,
                  color=colors, edgecolor="black", linewidth=0.5, alpha=0.85)

    # Value labels on bars
    for bar, val, err in zip(bars, values, errors):
        ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + err + 0.005,
                f"{val:.3f}", ha="center", va="bottom", fontsize=9, fontweight="bold")

    ax.set_xticks(range(len(models)))
    ax.set_xticklabels(models, rotation=35, ha="right", fontsize=10)
    ax.set_ylabel(metric.upper().replace("_", " "))
    ax.set_title(title, fontsize=14, fontweight="bold")

    # Legend
    from matplotlib.patches import Patch
    legend_elements = [
        Patch(facecolor=COLORS_CLASSICAL[0], label="Classical"),
        Patch(facecolor=COLORS_QUANTUM[0], label="Quantum"),
    ]
    ax.legend(handles=legend_elements, loc="upper right")

    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 7. Qubit × Depth Heatmap (Ablation)
# ──────────────────────────────────────────────────────────────────────────────
def plot_qubit_depth_heatmap(
    data: Dict[Tuple[int, int], float],
    save_path: str = "qubit_depth_heatmap.png",
    title: str = "AUROC by Qubit Count × Circuit Depth",
    metric_name: str = "AUROC",
):
    """
    Heatmap for qubit-depth ablation.
    data: {(qubits, depth): metric_value, ...}
    """
    qubits = sorted(set(k[0] for k in data.keys()))
    depths = sorted(set(k[1] for k in data.keys()))

    matrix = np.full((len(qubits), len(depths)), np.nan)
    for (q, d), val in data.items():
        qi = qubits.index(q)
        di = depths.index(d)
        matrix[qi, di] = val

    fig, ax = plt.subplots(figsize=(max(6, len(depths) * 2), max(5, len(qubits))))
    sns.heatmap(
        matrix, annot=True, fmt=".3f", cmap="YlOrRd",
        xticklabels=depths, yticklabels=qubits,
        linewidths=1, ax=ax, cbar_kws={"label": metric_name},
    )
    ax.set_xlabel("Circuit Depth (layers)")
    ax.set_ylabel("Qubit Count")
    ax.set_title(title, fontsize=14, fontweight="bold")
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 8. Data Regime Line Plot
# ──────────────────────────────────────────────────────────────────────────────
def plot_data_regime_lines(
    results: Dict[str, Dict[float, float]],
    save_path: str = "data_regime.png",
    title: str = "Performance vs Training Data Fraction",
    metric_name: str = "AUROC",
    errors: Dict[str, Dict[float, float]] = None,
):
    """
    Line plot: data fraction (10-100%) vs performance for multiple models.
    results: {"ModelName": {0.1: 0.85, 0.25: 0.88, 0.5: 0.91, 1.0: 0.93}, ...}
    """
    fig, ax = plt.subplots(figsize=FIGSIZE_SINGLE)

    all_colors = COLORS_CLASSICAL + COLORS_QUANTUM
    markers = ["o", "s", "^", "D", "v", "P", "X", "*"]

    for i, (model, fracs) in enumerate(results.items()):
        x = sorted(fracs.keys())
        y = [fracs[f] for f in x]
        color = all_colors[i % len(all_colors)]
        marker = markers[i % len(markers)]

        if errors and model in errors:
            yerr = [errors[model].get(f, 0) for f in x]
            ax.errorbar(x, y, yerr=yerr, label=model, color=color, marker=marker,
                        linewidth=2, markersize=8, capsize=4)
        else:
            ax.plot(x, y, label=model, color=color, marker=marker, linewidth=2, markersize=8)

    ax.set_xlabel("Training Data Fraction")
    ax.set_ylabel(metric_name)
    ax.set_title(title, fontsize=14, fontweight="bold")
    ax.set_xticks([0.1, 0.25, 0.5, 1.0])
    ax.set_xticklabels(["10%", "25%", "50%", "100%"])
    ax.legend(loc="lower right")
    ax.grid(True, alpha=0.3)
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 9. Pareto Front (Performance vs Cost)
# ──────────────────────────────────────────────────────────────────────────────
def plot_pareto_front(
    results: Dict[str, Dict[str, float]],
    x_metric: str = "training_time",
    y_metric: str = "auroc",
    save_path: str = "pareto_front.png",
    title: str = "Performance vs Computational Cost",
):
    """Scatter plot with Pareto frontier."""
    fig, ax = plt.subplots(figsize=FIGSIZE_SINGLE)

    for model, metrics in results.items():
        x = metrics.get(x_metric, 0)
        y = metrics.get(y_metric, 0)
        is_quantum = any(q in model.lower() for q in ["qsvm", "vqc", "qlstm", "qcnn", "qgnn", "quantum", "hybrid"])
        color = COLORS_QUANTUM[0] if is_quantum else COLORS_CLASSICAL[0]
        marker = "^" if is_quantum else "o"
        ax.scatter(x, y, c=color, marker=marker, s=120, edgecolors="black", zorder=5)
        ax.annotate(model, (x, y), textcoords="offset points", xytext=(5, 5), fontsize=8)

    ax.set_xlabel(x_metric.replace("_", " ").title())
    ax.set_ylabel(y_metric.upper().replace("_", " "))
    ax.set_title(title, fontsize=14, fontweight="bold")

    from matplotlib.patches import Patch
    from matplotlib.lines import Line2D
    legend_elements = [
        Line2D([0], [0], marker="o", color="w", markerfacecolor=COLORS_CLASSICAL[0],
               markersize=10, label="Classical"),
        Line2D([0], [0], marker="^", color="w", markerfacecolor=COLORS_QUANTUM[0],
               markersize=10, label="Quantum"),
    ]
    ax.legend(handles=legend_elements)
    ax.grid(True, alpha=0.3)
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 10. Radar / Spider Chart
# ──────────────────────────────────────────────────────────────────────────────
def plot_radar_chart(
    results: Dict[str, Dict[str, float]],
    metrics: List[str] = None,
    save_path: str = "radar_chart.png",
    title: str = "Multi-Metric Comparison",
):
    """Spider/radar chart for multi-metric comparison."""
    if metrics is None:
        metrics = ["auroc", "macro_f1", "mcc", "balanced_accuracy"]

    n_metrics = len(metrics)
    angles = np.linspace(0, 2 * np.pi, n_metrics, endpoint=False).tolist()
    angles += angles[:1]

    fig, ax = plt.subplots(figsize=(8, 8), subplot_kw=dict(polar=True))

    all_colors = COLORS_CLASSICAL + COLORS_QUANTUM
    for i, (model, vals) in enumerate(results.items()):
        values = [vals.get(m, 0) for m in metrics]
        values += values[:1]
        color = all_colors[i % len(all_colors)]
        ax.plot(angles, values, linewidth=2, label=model, color=color)
        ax.fill(angles, values, alpha=0.1, color=color)

    ax.set_xticks(angles[:-1])
    ax.set_xticklabels([m.replace("_", " ").upper() for m in metrics], fontsize=10)
    ax.set_ylim(0, 1)
    ax.set_title(title, fontsize=14, fontweight="bold", y=1.08)
    ax.legend(loc="upper right", bbox_to_anchor=(1.3, 1.1), fontsize=9)
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 11. Boxplot: Seed Variation
# ──────────────────────────────────────────────────────────────────────────────
def plot_boxplot_seeds(
    results: Dict[str, List[float]],
    metric: str = "auroc",
    save_path: str = "boxplot_seeds.png",
    title: str = "Performance Stability Across Seeds",
):
    """Boxplot of metric values across seeds for each model."""
    fig, ax = plt.subplots(figsize=FIGSIZE_WIDE)

    models = list(results.keys())
    data = [results[m] for m in models]

    colors = []
    for m in models:
        is_q = any(q in m.lower() for q in ["qsvm", "vqc", "qlstm", "qcnn", "qgnn", "quantum", "hybrid"])
        colors.append(COLORS_QUANTUM[0] if is_q else COLORS_CLASSICAL[0])

    bp = ax.boxplot(data, tick_labels=models, patch_artist=True, widths=0.6)
    for patch, color in zip(bp["boxes"], colors):
        patch.set_facecolor(color)
        patch.set_alpha(0.7)

    # Overlay individual points
    for i, d in enumerate(data):
        jitter = np.random.normal(0, 0.04, size=len(d))
        ax.scatter(np.full(len(d), i + 1) + jitter, d, alpha=0.6, s=30, color="black", zorder=5)

    ax.set_ylabel(metric.upper().replace("_", " "))
    ax.set_title(title, fontsize=14, fontweight="bold")
    plt.xticks(rotation=35, ha="right")
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 12. Learning Rate Schedule
# ──────────────────────────────────────────────────────────────────────────────
def plot_learning_rate_schedule(
    lr_history: List[float],
    save_path: str = "lr_schedule.png",
    title: str = "Learning Rate Schedule",
):
    fig, ax = plt.subplots(figsize=FIGSIZE_SINGLE)
    ax.plot(lr_history, color=COLORS_CLASSICAL[0], linewidth=2)
    ax.set_xlabel("Epoch")
    ax.set_ylabel("Learning Rate")
    ax.set_title(title, fontsize=14, fontweight="bold")
    ax.set_yscale("log")
    ax.grid(True, alpha=0.3)
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 13. Metric Correlation Matrix
# ──────────────────────────────────────────────────────────────────────────────
def plot_metric_correlation(
    results_df,
    metrics: List[str] = None,
    save_path: str = "metric_correlation.png",
    title: str = "Metric Correlation",
):
    """Correlation heatmap of metrics across models. Pass a pandas DataFrame."""
    if metrics:
        results_df = results_df[metrics]

    corr = results_df.corr()
    fig, ax = plt.subplots(figsize=(max(6, len(corr)), max(5, len(corr) - 1)))
    sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", center=0,
                square=True, linewidths=0.5, ax=ax)
    ax.set_title(title, fontsize=14, fontweight="bold")
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 14. Class Distribution
# ──────────────────────────────────────────────────────────────────────────────
def plot_class_distribution(
    labels: np.ndarray,
    class_names: List[str] = None,
    split_name: str = "All",
    save_path: str = "class_distribution.png",
    title: str = "Class Distribution",
):
    """Bar chart of class frequencies."""
    unique, counts = np.unique(labels, return_counts=True)
    if class_names is None:
        class_names = [str(u) for u in unique]

    fig, ax = plt.subplots(figsize=FIGSIZE_SINGLE)
    bars = ax.bar(class_names, counts, color=COLORS_CLASSICAL[0], edgecolor="black", alpha=0.85)

    for bar, count in zip(bars, counts):
        pct = count / len(labels) * 100
        ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 1,
                f"{count}\n({pct:.1f}%)", ha="center", va="bottom", fontsize=9)

    ax.set_xlabel("Class")
    ax.set_ylabel("Count")
    ax.set_title(f"{title} ({split_name}, n={len(labels)})", fontsize=14, fontweight="bold")
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 15. t-SNE Embedding Visualization
# ──────────────────────────────────────────────────────────────────────────────
def plot_embedding_tsne(
    embeddings: np.ndarray,
    labels: np.ndarray,
    class_names: List[str] = None,
    save_path: str = "tsne_embedding.png",
    title: str = "t-SNE Embedding",
    perplexity: int = 30,
):
    """2D t-SNE visualization of learned embeddings."""
    tsne = TSNE(n_components=2, perplexity=perplexity, random_state=42, max_iter=1000)
    coords = tsne.fit_transform(embeddings)

    unique_labels = np.unique(labels)
    if class_names is None:
        class_names = [str(l) for l in unique_labels]

    fig, ax = plt.subplots(figsize=FIGSIZE_SINGLE)
    colors = plt.cm.tab10(np.linspace(0, 1, len(unique_labels)))

    for i, label in enumerate(unique_labels):
        mask = labels == label
        ax.scatter(coords[mask, 0], coords[mask, 1], c=[colors[i]], s=15, alpha=0.6,
                   label=class_names[i])

    ax.set_xlabel("t-SNE 1")
    ax.set_ylabel("t-SNE 2")
    ax.set_title(title, fontsize=14, fontweight="bold")
    ax.legend(markerscale=3, fontsize=9)
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# 16. Master: Save All Experiment Plots
# ──────────────────────────────────────────────────────────────────────────────
def save_all_experiment_plots(
    output_dir: str,
    history: List[Dict] = None,
    y_true: np.ndarray = None,
    y_pred: np.ndarray = None,
    y_prob: np.ndarray = None,
    class_names: List[str] = None,
    model_name: str = "model",
    embeddings: np.ndarray = None,
    labels_for_dist: np.ndarray = None,
):
    """Generate all applicable plots for one experiment run."""
    os.makedirs(output_dir, exist_ok=True)
    generated = []

    if history:
        p = plot_training_curves(history, save_path=os.path.join(output_dir, "training_curves.png"),
                                 title=f"{model_name} - Training Curves")
        generated.append(p)

    if y_true is not None and y_pred is not None:
        p = plot_confusion_matrix(y_true, y_pred, class_names=class_names,
                                  save_path=os.path.join(output_dir, "confusion_matrix.png"),
                                  title=f"{model_name} - Confusion Matrix")
        generated.append(p)

    if y_true is not None and y_prob is not None:
        p = plot_roc_curves(y_true, y_prob, class_names=class_names,
                            save_path=os.path.join(output_dir, "roc_curves.png"),
                            title=f"{model_name} - ROC Curves")
        generated.append(p)

        p = plot_pr_curves(y_true, y_prob, class_names=class_names,
                           save_path=os.path.join(output_dir, "pr_curves.png"),
                           title=f"{model_name} - PR Curves")
        generated.append(p)

        p = plot_calibration_curve(y_true, y_prob,
                                   save_path=os.path.join(output_dir, "calibration_curve.png"),
                                   title=f"{model_name} - Calibration")
        generated.append(p)

    if embeddings is not None and y_true is not None:
        p = plot_embedding_tsne(embeddings, y_true, class_names=class_names,
                                save_path=os.path.join(output_dir, "tsne_embedding.png"),
                                title=f"{model_name} - t-SNE")
        generated.append(p)

    if labels_for_dist is not None:
        p = plot_class_distribution(labels_for_dist, class_names=class_names,
                                    save_path=os.path.join(output_dir, "class_distribution.png"),
                                    title=f"{model_name} - Class Distribution")
        generated.append(p)

    return generated
