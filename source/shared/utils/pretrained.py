import re
from pathlib import Path
from typing import Optional

import torch
from .paths import get_results_dir


def _project_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def _checkpoint_seed_dir(experiment_name: str, seed: int = 0) -> Path:
    return get_results_dir(project_root=_project_root()) / "checkpoints" / experiment_name / f"{experiment_name}_seed{seed}"


def resolve_best_checkpoint(
    experiment_name: str,
    seed: int = 0,
    mode: str = "min",
) -> Optional[Path]:
    """Return the best checkpoint path for a finished experiment."""
    ckpt_dir = _checkpoint_seed_dir(experiment_name, seed)
    if not ckpt_dir.exists():
        return None

    scored = []
    pattern = re.compile(r"score(-?\d+(?:\.\d+)?)")
    for path in ckpt_dir.glob("checkpoint_epoch*_score*.pt"):
        match = pattern.search(path.name)
        if not match:
            continue
        scored.append((float(match.group(1)), path))

    if scored:
        scored.sort(key=lambda item: item[0], reverse=(mode == "max"))
        return scored[0][1]

    last_path = ckpt_dir / "last.pt"
    return last_path if last_path.exists() else None


def load_checkpoint_state(path: Path, device: str = "cpu"):
    """Load a checkpoint from disk using PyTorch 2.6-safe explicit args."""
    return torch.load(path, map_location=device, weights_only=False)
