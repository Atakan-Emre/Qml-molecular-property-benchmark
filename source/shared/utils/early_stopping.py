import numpy as np
from pathlib import Path


class EarlyStopping:
    """Early stopping with patience, min_delta, and best model tracking."""

    def __init__(
        self,
        patience: int = 15,
        min_delta: float = 1e-4,
        mode: str = "min",
        verbose: bool = True,
    ):
        self.patience = patience
        self.min_delta = min_delta
        self.mode = mode
        self.verbose = verbose

        self.best_score = None
        self.counter = 0
        self.best_epoch = 0
        self.early_stop = False
        self.improved = False

        if mode == "min":
            self.best_score = np.inf
            self._is_better = lambda new, best: new < best - self.min_delta
        elif mode == "max":
            self.best_score = -np.inf
            self._is_better = lambda new, best: new > best + self.min_delta
        else:
            raise ValueError(f"mode must be 'min' or 'max', got '{mode}'")

    def __call__(self, score: float, epoch: int) -> bool:
        """
        Call with current metric value.
        Returns True if training should stop.
        """
        self.improved = False

        if self._is_better(score, self.best_score):
            if self.verbose:
                direction = "decreased" if self.mode == "min" else "increased"
                print(
                    f"  EarlyStopping: metric {direction} "
                    f"({self.best_score:.6f} -> {score:.6f}). Saving."
                )
            self.best_score = score
            self.best_epoch = epoch
            self.counter = 0
            self.improved = True
        else:
            self.counter += 1
            if self.verbose:
                print(
                    f"  EarlyStopping: no improvement for {self.counter}/{self.patience} epochs. "
                    f"Best: {self.best_score:.6f} at epoch {self.best_epoch}"
                )
            if self.counter >= self.patience:
                self.early_stop = True
                if self.verbose:
                    print(
                        f"  EarlyStopping: TRIGGERED at epoch {epoch}. "
                        f"Best was epoch {self.best_epoch} with {self.best_score:.6f}"
                    )

        return self.early_stop

    def state_dict(self) -> dict:
        return {
            "best_score": self.best_score,
            "counter": self.counter,
            "best_epoch": self.best_epoch,
            "early_stop": self.early_stop,
            "patience": self.patience,
            "min_delta": self.min_delta,
            "mode": self.mode,
        }

    def load_state_dict(self, state: dict):
        self.best_score = state["best_score"]
        self.counter = state["counter"]
        self.best_epoch = state["best_epoch"]
        self.early_stop = state["early_stop"]
