"""PCA-based dimensionality reduction for quantum feature encoding.

Reduces high-dimensional classical features to n_qubits dimensions
and normalizes to [0, pi] range for quantum circuit angle encoding.
"""

import numpy as np
from sklearn.decomposition import PCA
from sklearn.preprocessing import MinMaxScaler, StandardScaler


class PCAEncoder:
    """Reduce features to n_components dims and scale for quantum circuits."""

    def __init__(self, n_components: int = 8, scale_range: tuple = (0, np.pi)):
        self.n_components = n_components
        self.scale_range = scale_range
        self.standardizer = StandardScaler()
        self.pca = PCA(n_components=n_components)
        self.scaler = MinMaxScaler(feature_range=scale_range)
        self._fitted = False

    def fit(self, X: np.ndarray) -> "PCAEncoder":
        """Fit standardizer, PCA and output scaler on training data."""
        X_std = self.standardizer.fit_transform(X)
        X_pca = self.pca.fit_transform(X_std)
        self.scaler.fit(X_pca)
        self._fitted = True
        return self

    def transform(self, X: np.ndarray) -> np.ndarray:
        """Transform data: standardize + PCA + scale to [0, pi]."""
        assert self._fitted, "PCAEncoder must be fitted before transform"
        X_std = self.standardizer.transform(X)
        X_pca = self.pca.transform(X_std)
        return self.scaler.transform(X_pca)

    def fit_transform(self, X: np.ndarray) -> np.ndarray:
        """Fit and transform in one step."""
        X_std = self.standardizer.fit_transform(X)
        X_pca = self.pca.fit_transform(X_std)
        self.scaler.fit(X_pca)
        self._fitted = True
        return self.scaler.transform(X_pca)

    @property
    def explained_variance_ratio(self) -> np.ndarray:
        """Return explained variance ratio per component."""
        assert self._fitted, "PCAEncoder must be fitted first"
        return self.pca.explained_variance_ratio_

    @property
    def total_explained_variance(self) -> float:
        """Return total explained variance."""
        assert self._fitted, "PCAEncoder must be fitted first"
        return float(np.sum(self.pca.explained_variance_ratio_))

    def summary(self) -> dict:
        """Return summary dict for logging."""
        assert self._fitted, "PCAEncoder must be fitted first"
        return {
            "n_components": self.n_components,
            "scale_range": list(self.scale_range),
            "explained_variance_ratio": self.pca.explained_variance_ratio_.tolist(),
            "total_explained_variance": self.total_explained_variance,
        }
