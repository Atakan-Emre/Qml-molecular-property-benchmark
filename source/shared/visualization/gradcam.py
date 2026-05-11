"""
GradCAM and Saliency visualization for model interpretability.
- GradCAM for 2D CNN models (Retina: fundus images)
- 1D GradCAM for 1D CNN/ResNet models (ECG signals)
- Vanilla gradient saliency for all models
"""
import os
import numpy as np
import torch
import torch.nn.functional as F
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
from typing import Optional, List, Tuple

DPI = 150


def _save_fig(fig, path: str, dpi: int = DPI):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    fig.savefig(path, dpi=dpi, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# ──────────────────────────────────────────────────────────────────────────────
# GradCAM for 2D images (Retina fundus)
# ──────────────────────────────────────────────────────────────────────────────
class GradCAM2D:
    """GradCAM for 2D CNN models. Hooks into the last conv layer."""

    def __init__(self, model, target_layer=None):
        self.model = model
        self.model.eval()
        self.gradients = None
        self.activations = None

        # Auto-find last conv layer if not specified
        if target_layer is None:
            target_layer = self._find_last_conv2d(model)
        self.target_layer = target_layer

        # Register hooks
        self.target_layer.register_forward_hook(self._save_activation)
        self.target_layer.register_full_backward_hook(self._save_gradient)

    def _find_last_conv2d(self, model):
        last_conv = None
        for module in model.modules():
            if isinstance(module, torch.nn.Conv2d):
                last_conv = module
        if last_conv is None:
            raise ValueError("No Conv2d layer found in model")
        return last_conv

    def _save_activation(self, module, input, output):
        self.activations = output.detach()

    def _save_gradient(self, module, grad_input, grad_output):
        self.gradients = grad_output[0].detach()

    def generate(self, input_tensor, target_class=None):
        """Generate GradCAM heatmap for input."""
        self.model.zero_grad()
        output = self.model(input_tensor)

        if target_class is None:
            target_class = output.argmax(dim=1).item()

        # Backward pass for target class
        one_hot = torch.zeros_like(output)
        one_hot[0, target_class] = 1.0
        output.backward(gradient=one_hot, retain_graph=True)

        # Weighted combination
        weights = self.gradients.mean(dim=[2, 3], keepdim=True)  # GAP
        cam = (weights * self.activations).sum(dim=1, keepdim=True)
        cam = F.relu(cam)

        # Normalize
        cam = cam.squeeze().cpu().numpy()
        if cam.max() > 0:
            cam = cam / cam.max()

        return cam, target_class, torch.softmax(output, dim=1).detach().cpu().numpy()[0]


# ──────────────────────────────────────────────────────────────────────────────
# GradCAM for 1D signals (ECG)
# ──────────────────────────────────────────────────────────────────────────────
class GradCAM1D:
    """GradCAM for 1D CNN/ResNet models (ECG signals)."""

    def __init__(self, model, target_layer=None):
        self.model = model
        self.model.eval()
        self.gradients = None
        self.activations = None

        if target_layer is None:
            target_layer = self._find_last_conv1d(model)
        self.target_layer = target_layer

        self.target_layer.register_forward_hook(self._save_activation)
        self.target_layer.register_full_backward_hook(self._save_gradient)

    def _find_last_conv1d(self, model):
        last_conv = None
        for module in model.modules():
            if isinstance(module, torch.nn.Conv1d):
                last_conv = module
        if last_conv is None:
            raise ValueError("No Conv1d layer found in model")
        return last_conv

    def _save_activation(self, module, input, output):
        self.activations = output.detach()

    def _save_gradient(self, module, grad_input, grad_output):
        self.gradients = grad_output[0].detach()

    def generate(self, input_tensor, target_class=None):
        """Generate 1D GradCAM for ECG signal."""
        self.model.zero_grad()
        output = self.model(input_tensor)

        if target_class is None:
            target_class = output.argmax(dim=1).item()

        one_hot = torch.zeros_like(output)
        one_hot[0, target_class] = 1.0
        output.backward(gradient=one_hot, retain_graph=True)

        weights = self.gradients.mean(dim=2, keepdim=True)  # GAP over time
        cam = (weights * self.activations).sum(dim=1)  # (1, T)
        cam = F.relu(cam)

        cam = cam.squeeze().cpu().numpy()
        if cam.max() > 0:
            cam = cam / cam.max()

        # Interpolate to input length
        input_len = input_tensor.shape[-1]
        if len(cam) != input_len:
            from scipy.interpolate import interp1d
            x_old = np.linspace(0, 1, len(cam))
            x_new = np.linspace(0, 1, input_len)
            cam = interp1d(x_old, cam, kind='linear')(x_new)

        return cam, target_class, torch.softmax(output, dim=1).detach().cpu().numpy()[0]


# ──────────────────────────────────────────────────────────────────────────────
# Vanilla Gradient Saliency
# ──────────────────────────────────────────────────────────────────────────────
def compute_saliency(model, input_tensor, target_class=None):
    """Compute vanilla gradient saliency map."""
    model.eval()
    input_tensor = input_tensor.clone().requires_grad_(True)
    output = model(input_tensor)

    if target_class is None:
        target_class = output.argmax(dim=1).item()

    one_hot = torch.zeros_like(output)
    one_hot[0, target_class] = 1.0
    output.backward(gradient=one_hot)

    saliency = input_tensor.grad.data.abs()
    saliency = saliency.squeeze().cpu().numpy()

    return saliency, target_class


# ──────────────────────────────────────────────────────────────────────────────
# Plot: ECG GradCAM (12-lead signal with attention overlay)
# ──────────────────────────────────────────────────────────────────────────────
def plot_ecg_gradcam(
    signal: np.ndarray,
    cam: np.ndarray,
    pred_class: int,
    pred_probs: np.ndarray,
    true_label: int = None,
    lead_names: List[str] = None,
    save_path: str = "ecg_gradcam.png",
    title: str = "ECG GradCAM - Model Attention",
    sampling_rate: int = 100,
):
    """
    Plot 12-lead ECG with GradCAM overlay showing where model focuses.
    signal: (channels, length) or (length,) for single-lead
    cam: (length,) attention weights 0-1
    """
    if lead_names is None:
        lead_names = ["I", "II", "III", "aVR", "aVL", "aVF",
                      "V1", "V2", "V3", "V4", "V5", "V6"]

    if signal.ndim == 1:
        signal = signal[np.newaxis, :]

    n_leads = min(signal.shape[0], len(lead_names))
    time_axis = np.arange(signal.shape[1]) / sampling_rate

    fig, axes = plt.subplots(n_leads, 1, figsize=(16, 2 * n_leads), sharex=True)
    if n_leads == 1:
        axes = [axes]

    # Color map for attention
    from matplotlib.collections import LineCollection

    for i in range(n_leads):
        ax = axes[i]
        lead_signal = signal[i]

        # Plot signal with color-coded attention
        points = np.array([time_axis, lead_signal]).T.reshape(-1, 1, 2)
        segments = np.concatenate([points[:-1], points[1:]], axis=1)
        lc = LineCollection(segments, cmap='YlOrRd', linewidth=1.5)
        lc.set_array(cam[:len(segments)])
        ax.add_collection(lc)

        # Also shade high-attention regions
        ax.fill_between(time_axis, lead_signal.min(), lead_signal.max(),
                        where=cam > 0.5, alpha=0.15, color='red',
                        label='High attention')

        ax.set_xlim(time_axis[0], time_axis[-1])
        y_margin = (lead_signal.max() - lead_signal.min()) * 0.1 + 0.01
        ax.set_ylim(lead_signal.min() - y_margin, lead_signal.max() + y_margin)
        ax.set_ylabel(lead_names[i], fontsize=10, fontweight='bold', rotation=0, ha='right')
        ax.tick_params(axis='y', labelsize=7)
        if i == 0:
            ax.legend(loc='upper right', fontsize=8)

    axes[-1].set_xlabel("Time (seconds)", fontsize=11)

    # Title with prediction info
    pred_label = f"Pred: class {pred_class} (conf={pred_probs[pred_class]:.2f})"
    true_info = f" | True: class {true_label}" if true_label is not None else ""
    correct = ""
    if true_label is not None:
        correct = " [CORRECT]" if pred_class == true_label else " [WRONG]"
    fig.suptitle(f"{title}\n{pred_label}{true_info}{correct}",
                 fontsize=13, fontweight='bold', y=1.01)
    fig.tight_layout()

    # Add colorbar
    sm = plt.cm.ScalarMappable(cmap='YlOrRd', norm=plt.Normalize(0, 1))
    sm.set_array([])
    cbar = fig.colorbar(sm, ax=axes, orientation='vertical', fraction=0.01, pad=0.02)
    cbar.set_label('Attention', fontsize=10)

    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# Plot: Retina GradCAM (fundus image with heatmap overlay)
# ──────────────────────────────────────────────────────────────────────────────
def plot_retina_gradcam(
    image: np.ndarray,
    cam: np.ndarray,
    pred_class: int,
    pred_probs: np.ndarray,
    true_label: int = None,
    class_names: List[str] = None,
    save_path: str = "retina_gradcam.png",
    title: str = "Retina GradCAM - Detection Focus",
):
    """
    Plot fundus image with GradCAM overlay.
    image: (H, W, 3) or (3, H, W) normalized image
    cam: (h, w) GradCAM heatmap (will be resized)
    """
    import cv2

    # Handle channel-first format
    if image.ndim == 3 and image.shape[0] == 3:
        image = np.transpose(image, (1, 2, 0))

    # Denormalize if needed
    if image.max() <= 1.0:
        img_show = (image * 255).astype(np.uint8)
    else:
        img_show = image.astype(np.uint8)

    # Resize CAM to image size
    h, w = img_show.shape[:2]
    cam_resized = cv2.resize(cam, (w, h))
    cam_resized = np.clip(cam_resized, 0, 1)

    # Create heatmap
    heatmap = cv2.applyColorMap((cam_resized * 255).astype(np.uint8), cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)

    # Overlay
    overlay = (0.6 * img_show + 0.4 * heatmap).astype(np.uint8)

    fig, axes = plt.subplots(1, 3, figsize=(18, 6))

    axes[0].imshow(img_show)
    axes[0].set_title("Original Image", fontsize=12, fontweight='bold')
    axes[0].axis('off')

    axes[1].imshow(cam_resized, cmap='jet', vmin=0, vmax=1)
    axes[1].set_title("GradCAM Heatmap", fontsize=12, fontweight='bold')
    axes[1].axis('off')

    axes[2].imshow(overlay)
    axes[2].set_title("Overlay (Detected Region)", fontsize=12, fontweight='bold')
    axes[2].axis('off')

    # Prediction info
    if class_names and pred_class < len(class_names):
        pred_name = class_names[pred_class]
        true_name = class_names[true_label] if true_label is not None and true_label < len(class_names) else str(true_label)
    else:
        pred_name = str(pred_class)
        true_name = str(true_label)

    pred_info = f"Pred: {pred_name} (conf={pred_probs[pred_class]:.3f})"
    true_info = f" | True: {true_name}" if true_label is not None else ""
    correct = ""
    if true_label is not None:
        correct = " [CORRECT]" if pred_class == true_label else " [WRONG]"

    fig.suptitle(f"{title}\n{pred_info}{true_info}{correct}",
                 fontsize=14, fontweight='bold')
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


def plot_retina_saliency(
    image: np.ndarray,
    saliency: np.ndarray,
    pred_class: int,
    true_label: int = None,
    class_names: List[str] = None,
    save_path: str = "retina_saliency.png",
    title: str = "Retina Saliency - Pixel Sensitivity",
):
    """Plot fundus image with saliency overlay for models without Conv2d layers."""
    import cv2

    if image.ndim == 3 and image.shape[0] == 3:
        image = np.transpose(image, (1, 2, 0))

    if image.max() <= 1.0:
        img_show = (image * 255).astype(np.uint8)
    else:
        img_show = image.astype(np.uint8)

    if saliency.ndim == 3:
        saliency = saliency.max(axis=0)

    saliency = saliency.astype(np.float32)
    saliency -= saliency.min()
    if saliency.max() > 0:
        saliency /= saliency.max()

    h, w = img_show.shape[:2]
    saliency_resized = cv2.resize(saliency, (w, h))
    heatmap = cv2.applyColorMap((saliency_resized * 255).astype(np.uint8), cv2.COLORMAP_INFERNO)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
    overlay = (0.55 * img_show + 0.45 * heatmap).astype(np.uint8)

    fig, axes = plt.subplots(1, 3, figsize=(18, 6))
    axes[0].imshow(img_show)
    axes[0].set_title("Original Image", fontsize=12, fontweight='bold')
    axes[0].axis("off")
    axes[1].imshow(saliency_resized, cmap="inferno", vmin=0, vmax=1)
    axes[1].set_title("Saliency Map", fontsize=12, fontweight='bold')
    axes[1].axis("off")
    axes[2].imshow(overlay)
    axes[2].set_title("Overlay", fontsize=12, fontweight='bold')
    axes[2].axis("off")

    if class_names and pred_class < len(class_names):
        pred_name = class_names[pred_class]
        true_name = class_names[true_label] if true_label is not None and true_label < len(class_names) else str(true_label)
    else:
        pred_name = str(pred_class)
        true_name = str(true_label)

    true_info = f" | True: {true_name}" if true_label is not None else ""
    fig.suptitle(f"{title}\nPred: {pred_name}{true_info}", fontsize=14, fontweight='bold')
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# Plot: Epoch Timing
# ──────────────────────────────────────────────────────────────────────────────
def plot_epoch_times(
    epoch_times: List[float],
    save_path: str = "epoch_times.png",
    title: str = "Training Time per Epoch",
):
    """Bar chart of epoch training times."""
    fig, ax = plt.subplots(figsize=(10, 4))
    epochs = range(len(epoch_times))
    ax.bar(epochs, epoch_times, color='#2196F3', alpha=0.8, edgecolor='black', linewidth=0.3)
    ax.axhline(y=np.mean(epoch_times), color='red', linestyle='--', linewidth=1.5,
               label=f'Mean: {np.mean(epoch_times):.1f}s')
    ax.set_xlabel("Epoch")
    ax.set_ylabel("Time (seconds)")
    ax.set_title(title, fontsize=14, fontweight='bold')
    ax.legend()
    ax.grid(True, alpha=0.3, axis='y')
    fig.tight_layout()
    _save_fig(fig, save_path)
    return save_path


# ──────────────────────────────────────────────────────────────────────────────
# Master: Generate all interpretability plots for an experiment
# ──────────────────────────────────────────────────────────────────────────────
def generate_interpretability_plots(
    model,
    test_loader,
    output_dir: str,
    modality: str = "ecg",
    device: str = "cpu",
    class_names: List[str] = None,
    num_samples: int = 4,
    lr_history: List[float] = None,
    epoch_times: List[float] = None,
    model_name: str = "model",
):
    """
    Generate GradCAM / saliency plots for sample test inputs.
    Also generates LR schedule and epoch timing plots if data is available.
    """
    from shared.visualization.plots import plot_learning_rate_schedule
    generated = []
    os.makedirs(output_dir, exist_ok=True)

    # LR schedule plot
    if lr_history and len(lr_history) > 1:
        p = plot_learning_rate_schedule(
            lr_history,
            save_path=os.path.join(output_dir, "lr_schedule.png"),
            title=f"{model_name} - Learning Rate Schedule",
        )
        generated.append(p)

    # Epoch timing plot
    if epoch_times and len(epoch_times) > 1:
        p = plot_epoch_times(
            epoch_times,
            save_path=os.path.join(output_dir, "epoch_times.png"),
            title=f"{model_name} - Epoch Training Time",
        )
        generated.append(p)

    # GradCAM / Saliency for sample predictions
    model.eval()
    device = torch.device(device)
    samples_seen = 0

    try:
        if modality == "ecg":
            gradcam = GradCAM1D(model)
            for batch in test_loader:
                if isinstance(batch, (list, tuple)):
                    inputs, labels = batch[0], batch[1]
                else:
                    inputs, labels = batch["input"], batch["label"]

                for i in range(min(len(inputs), num_samples - samples_seen)):
                    inp = inputs[i:i+1].to(device)
                    cam, pred_cls, probs = gradcam.generate(inp)
                    signal = inputs[i].cpu().numpy()
                    true_lbl = int(labels[i])
                    p = plot_ecg_gradcam(
                        signal, cam, pred_cls, probs, true_label=true_lbl,
                        save_path=os.path.join(output_dir, f"gradcam_ecg_sample{samples_seen}.png"),
                        title=f"{model_name} - ECG GradCAM Sample {samples_seen}",
                    )
                    generated.append(p)
                    samples_seen += 1
                    if samples_seen >= num_samples:
                        break
                if samples_seen >= num_samples:
                    break

        elif modality == "retina":
            try:
                gradcam = GradCAM2D(model)
                use_saliency = False
            except Exception:
                gradcam = None
                use_saliency = True

            for batch in test_loader:
                if isinstance(batch, (list, tuple)):
                    inputs, labels = batch[0], batch[1]
                else:
                    inputs, labels = batch["input"], batch["label"]

                for i in range(min(len(inputs), num_samples - samples_seen)):
                    inp = inputs[i:i+1].to(device)
                    image = inputs[i].cpu().numpy()
                    true_lbl = int(labels[i])

                    if not use_saliency:
                        try:
                            cam, pred_cls, probs = gradcam.generate(inp)
                            p = plot_retina_gradcam(
                                image, cam, pred_cls, probs, true_label=true_lbl,
                                class_names=class_names,
                                save_path=os.path.join(output_dir, f"gradcam_retina_sample{samples_seen}.png"),
                                title=f"{model_name} - Retina GradCAM Sample {samples_seen}",
                            )
                            generated.append(p)
                        except Exception:
                            use_saliency = True

                    if use_saliency:
                        saliency, pred_cls = compute_saliency(model, inp)
                        p = plot_retina_saliency(
                            image, saliency, pred_cls, true_label=true_lbl,
                            class_names=class_names,
                            save_path=os.path.join(output_dir, f"saliency_retina_sample{samples_seen}.png"),
                            title=f"{model_name} - Retina Saliency Sample {samples_seen}",
                        )
                        generated.append(p)

                    samples_seen += 1
                    if samples_seen >= num_samples:
                        break
                if samples_seen >= num_samples:
                    break

    except Exception as e:
        print(f"  [WARN] GradCAM generation failed: {e}")

    return generated
