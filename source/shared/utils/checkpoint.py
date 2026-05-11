import os
import glob
import torch
from pathlib import Path
from typing import Optional, Dict, Any


class CheckpointManager:
    """
    Manages saving/loading checkpoints with top-k tracking.
    Supports full resume: model, optimizer, scheduler, epoch, early_stopping, metrics.
    """

    def __init__(self, checkpoint_dir: str, save_top_k: int = 3, mode: str = "min"):
        self.checkpoint_dir = Path(checkpoint_dir)
        self.checkpoint_dir.mkdir(parents=True, exist_ok=True)
        self.save_top_k = save_top_k
        self.mode = mode
        self.saved_checkpoints = []  # list of (score, path)

    def save(
        self,
        epoch: int,
        model,
        optimizer,
        scheduler,
        early_stopping,
        metrics: Dict[str, float],
        score: float,
        config: Optional[Dict] = None,
        extra: Optional[Dict] = None,
    ) -> Optional[str]:
        """Save checkpoint if score is in top-k. Returns path if saved, else None."""

        state = {
            "epoch": epoch,
            "model_state_dict": model.state_dict(),
            "optimizer_state_dict": optimizer.state_dict(),
            "scheduler_state_dict": scheduler.state_dict() if scheduler else None,
            "early_stopping_state": early_stopping.state_dict() if early_stopping else None,
            "metrics": metrics,
            "score": score,
            "config": config,
        }
        if extra:
            state.update(extra)

        # Check if this score deserves saving
        if len(self.saved_checkpoints) < self.save_top_k or self._is_better(score):
            filename = f"checkpoint_epoch{epoch:04d}_score{score:.4f}.pt"
            filepath = self.checkpoint_dir / filename
            torch.save(state, filepath)

            self.saved_checkpoints.append((score, str(filepath)))
            self.saved_checkpoints.sort(
                key=lambda x: x[0], reverse=(self.mode == "max")
            )

            # Remove worst if over budget
            while len(self.saved_checkpoints) > self.save_top_k:
                _, remove_path = self.saved_checkpoints.pop()
                if os.path.exists(remove_path):
                    os.remove(remove_path)

            # Always save 'last.pt' for resume
            last_path = self.checkpoint_dir / "last.pt"
            torch.save(state, last_path)

            return str(filepath)

        # Always save 'last.pt' even if not top-k
        state_last = {
            "epoch": epoch,
            "model_state_dict": model.state_dict(),
            "optimizer_state_dict": optimizer.state_dict(),
            "scheduler_state_dict": scheduler.state_dict() if scheduler else None,
            "early_stopping_state": early_stopping.state_dict() if early_stopping else None,
            "metrics": metrics,
            "score": score,
            "config": config,
        }
        if extra:
            state_last.update(extra)
        torch.save(state_last, self.checkpoint_dir / "last.pt")
        return None

    def _is_better(self, score: float) -> bool:
        if not self.saved_checkpoints:
            return True
        worst_score = self.saved_checkpoints[-1][0]
        if self.mode == "min":
            return score < worst_score
        else:
            return score > worst_score

    def load_best(self, model, optimizer=None, scheduler=None, early_stopping=None, device="cpu"):
        """Load the best checkpoint."""
        if not self.saved_checkpoints:
            # Try to find checkpoints on disk
            self._discover_checkpoints()
        if not self.saved_checkpoints:
            raise FileNotFoundError(f"No checkpoints found in {self.checkpoint_dir}")

        best_path = self.saved_checkpoints[0][1]
        return self._load(best_path, model, optimizer, scheduler, early_stopping, device)

    def load_last(self, model, optimizer=None, scheduler=None, early_stopping=None, device="cpu"):
        """Load last.pt for resuming training."""
        last_path = self.checkpoint_dir / "last.pt"
        if not last_path.exists():
            raise FileNotFoundError(f"No last.pt found in {self.checkpoint_dir}")
        return self._load(str(last_path), model, optimizer, scheduler, early_stopping, device)

    @staticmethod
    def load_from_path(
        path: str, model, optimizer=None, scheduler=None, early_stopping=None, device="cpu"
    ):
        """Load from an arbitrary path."""
        ckpt = torch.load(path, map_location=device, weights_only=False)
        model.load_state_dict(ckpt["model_state_dict"])
        if optimizer and "optimizer_state_dict" in ckpt:
            optimizer.load_state_dict(ckpt["optimizer_state_dict"])
        if scheduler and ckpt.get("scheduler_state_dict"):
            scheduler.load_state_dict(ckpt["scheduler_state_dict"])
        if early_stopping and ckpt.get("early_stopping_state"):
            early_stopping.load_state_dict(ckpt["early_stopping_state"])
        return ckpt

    def _load(self, path, model, optimizer, scheduler, early_stopping, device):
        return self.load_from_path(path, model, optimizer, scheduler, early_stopping, device)

    def _discover_checkpoints(self):
        """Find existing checkpoints on disk."""
        pattern = str(self.checkpoint_dir / "checkpoint_epoch*.pt")
        files = glob.glob(pattern)
        for f in files:
            ckpt = torch.load(f, map_location="cpu", weights_only=False)
            score = ckpt.get("score", 0.0)
            self.saved_checkpoints.append((score, f))
        self.saved_checkpoints.sort(
            key=lambda x: x[0], reverse=(self.mode == "max")
        )

    def get_best_path(self) -> Optional[str]:
        if not self.saved_checkpoints:
            self._discover_checkpoints()
        if self.saved_checkpoints:
            return self.saved_checkpoints[0][1]
        return None
