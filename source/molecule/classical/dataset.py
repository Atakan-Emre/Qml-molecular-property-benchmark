"""
Molecular Dataset loaders for PyTorch.
Supports both descriptor-based (ECFP) and graph-based representations.
Datasets: BACE, BBBP, ClinTox.
"""
import os
import numpy as np
import pandas as pd
import torch
from torch.utils.data import Dataset, DataLoader
from pathlib import Path
from typing import Tuple, Optional
from shared.utils.imbalance import build_balanced_sampler

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent

try:
    from torch_geometric.data import Data, InMemoryDataset
    from torch_geometric.loader import DataLoader as PyGDataLoader
    HAS_PYG = True
except ImportError:
    Data = None
    HAS_PYG = False

try:
    from rdkit import Chem
    from rdkit.Chem import AllChem
    HAS_RDKIT = True
except ImportError:
    Chem = None
    HAS_RDKIT = False


# ──────────────────────────────────────────────────────────────────────────────
# Descriptor Dataset (ECFP fingerprints → SVM / MLP)
# ──────────────────────────────────────────────────────────────────────────────
class MoleculeDescriptorDataset(Dataset):
    """ECFP fingerprint-based dataset."""

    def __init__(
        self,
        data_dir: str,
        dataset_name: str = "bace",
        split: str = "train",
        ecfp_radius: int = 2,
        ecfp_bits: int = 1024,
        data_fraction: float = 1.0,
        seed: int = 42,
    ):
        self.dataset_name = dataset_name
        split_dir = os.path.join(data_dir, dataset_name, split)

        # Try ECFP first
        ecfp_path = os.path.join(split_dir, f"ecfp_r{ecfp_radius}_b{ecfp_bits}.npy")
        if os.path.exists(ecfp_path):
            self.X = np.load(ecfp_path).astype(np.float32)
        else:
            self.X = np.load(os.path.join(split_dir, "X.npy"), allow_pickle=True).astype(np.float32)

        self.y = np.load(os.path.join(split_dir, "y.npy"), allow_pickle=True)

        # Handle multi-task (ClinTox has 2 tasks — use first task by default)
        if self.y.ndim > 1 and self.y.shape[1] > 1:
            self.y = self.y[:, 0]
        self.y = self.y.flatten().astype(np.float32)

        # Remove NaN labels
        valid = ~np.isnan(self.y)
        self.X = self.X[valid]
        self.y = self.y[valid].astype(int)

        # Weights if available
        w_path = os.path.join(split_dir, "w.npy")
        if os.path.exists(w_path):
            self.w = np.load(w_path, allow_pickle=True)
            if self.w.ndim > 1:
                self.w = self.w[:, 0]
            self.w = self.w.flatten()[valid]
        else:
            self.w = np.ones(len(self.y))

        # Data fraction
        if data_fraction < 1.0 and split == "train":
            rng = np.random.RandomState(seed)
            n = int(len(self.X) * data_fraction)
            idx = rng.choice(len(self.X), size=n, replace=False)
            self.X = self.X[idx]
            self.y = self.y[idx]
            self.w = self.w[idx]

        self.num_classes = len(np.unique(self.y))

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx) -> Tuple[torch.Tensor, torch.Tensor]:
        return torch.FloatTensor(self.X[idx]), torch.LongTensor([self.y[idx]]).squeeze()

    def get_numpy(self) -> Tuple[np.ndarray, np.ndarray]:
        """Return raw numpy arrays (for sklearn models)."""
        return self.X, self.y


# ──────────────────────────────────────────────────────────────────────────────
# Graph Dataset (molecular graph → GNN / GAT)
# ──────────────────────────────────────────────────────────────────────────────

if HAS_RDKIT:
    ATOM_FEATURES = {
        "atomic_num": list(range(1, 119)),
        "degree": [0, 1, 2, 3, 4, 5],
        "formal_charge": [-2, -1, 0, 1, 2],
        "num_hs": [0, 1, 2, 3, 4],
        "hybridization": [
            Chem.rdchem.HybridizationType.SP,
            Chem.rdchem.HybridizationType.SP2,
            Chem.rdchem.HybridizationType.SP3,
            Chem.rdchem.HybridizationType.SP3D,
            Chem.rdchem.HybridizationType.SP3D2,
        ],
    }
else:
    ATOM_FEATURES = {}


def atom_to_features(atom) -> list:
    """Convert RDKit atom to feature vector."""
    features = [
        atom.GetAtomicNum(),
        atom.GetDegree(),
        atom.GetFormalCharge(),
        atom.GetNumRadicalElectrons(),
        atom.GetTotalNumHs(),
        int(atom.GetIsAromatic()),
        int(atom.IsInRing()),
        atom.GetMass() / 100.0,
        atom.GetNumImplicitHs(),
    ]
    return features


def smiles_to_graph(smiles: str) -> Optional[Data]:
    """Convert SMILES string to PyG Data object."""
    if not HAS_RDKIT or not HAS_PYG:
        return None

    mol = Chem.MolFromSmiles(str(smiles))
    if mol is None:
        return None

    # Node features
    node_features = []
    for atom in mol.GetAtoms():
        node_features.append(atom_to_features(atom))
    x = torch.FloatTensor(node_features)

    # Edge index
    edge_index = []
    for bond in mol.GetBonds():
        i = bond.GetBeginAtomIdx()
        j = bond.GetEndAtomIdx()
        edge_index.append([i, j])
        edge_index.append([j, i])

    if len(edge_index) == 0:
        edge_index = torch.zeros((2, 0), dtype=torch.long)
    else:
        edge_index = torch.LongTensor(edge_index).T

    return Data(x=x, edge_index=edge_index)


class MoleculeGraphDataset:
    """Graph-based molecular dataset using PyG."""

    def __init__(
        self,
        data_dir: str,
        dataset_name: str = "bace",
        split: str = "train",
        data_fraction: float = 1.0,
        seed: int = 42,
    ):
        assert HAS_PYG and HAS_RDKIT, "PyG and RDKit required for graph dataset"

        split_dir = os.path.join(data_dir, dataset_name, split)
        csv_path = os.path.join(split_dir, "data.csv")

        if not os.path.exists(csv_path):
            raise FileNotFoundError(f"No data.csv in {split_dir}. Run download with SMILES first.")

        df = pd.read_csv(csv_path)

        # Handle multi-task
        y_col = "y"
        if y_col not in df.columns:
            # Fallback: load from numpy
            y = np.load(os.path.join(split_dir, "y.npy"), allow_pickle=True)
            if y.ndim > 1:
                y = y[:, 0]
            df["y"] = y.flatten()

        # Build graphs
        self.data_list = []
        for _, row in df.iterrows():
            smiles = str(row["smiles"])
            label = row["y"]
            if np.isnan(label):
                continue

            graph = smiles_to_graph(smiles)
            if graph is not None:
                graph.y = torch.LongTensor([int(label)])
                self.data_list.append(graph)

        # Data fraction
        if data_fraction < 1.0 and split == "train":
            rng = np.random.RandomState(seed)
            n = int(len(self.data_list) * data_fraction)
            idx = rng.choice(len(self.data_list), size=n, replace=False)
            self.data_list = [self.data_list[i] for i in idx]

        self.num_classes = len(set(int(d.y.item()) for d in self.data_list))
        self.node_feat_dim = self.data_list[0].x.shape[1] if self.data_list else 9

    def __len__(self):
        return len(self.data_list)

    def __getitem__(self, idx):
        return self.data_list[idx]


def get_descriptor_dataloaders(
    data_dir: str,
    dataset_name: str = "bace",
    batch_size: int = 32,
    num_workers: int = 0,
    data_fraction: float = 1.0,
    seed: int = 42,
    pin_memory: bool = True,
    persistent_workers: bool = False,
    weighted_sampling: bool = False,
    **kwargs,
) -> Tuple[DataLoader, DataLoader, DataLoader]:
    """Create descriptor-based dataloaders."""
    train_ds = MoleculeDescriptorDataset(data_dir, dataset_name, "train",
                                         data_fraction=data_fraction, seed=seed, **kwargs)
    val_ds = MoleculeDescriptorDataset(data_dir, dataset_name, "val", **kwargs)
    test_ds = MoleculeDescriptorDataset(data_dir, dataset_name, "test", **kwargs)

    print(f"Molecule Descriptor Dataset -- {dataset_name.upper()}")
    print(f"  Train: {len(train_ds)} | Val: {len(val_ds)} | Test: {len(test_ds)}")
    print(f"  Feature dim: {train_ds.X.shape[1]} | Classes: {train_ds.num_classes}")

    pw = persistent_workers and num_workers > 0
    train_sampler = build_balanced_sampler(train_ds.y) if weighted_sampling else None
    return (
        DataLoader(
            train_ds,
            batch_size=batch_size,
            shuffle=train_sampler is None,
            sampler=train_sampler,
            num_workers=num_workers,
            pin_memory=pin_memory,
            persistent_workers=pw,
        ),
        DataLoader(val_ds, batch_size=batch_size, shuffle=False, num_workers=num_workers, pin_memory=pin_memory, persistent_workers=pw),
        DataLoader(test_ds, batch_size=batch_size, shuffle=False, num_workers=num_workers, pin_memory=pin_memory, persistent_workers=pw),
    )


def get_graph_dataloaders(
    data_dir: str,
    dataset_name: str = "bace",
    batch_size: int = 32,
    num_workers: int = 0,
    data_fraction: float = 1.0,
    seed: int = 42,
    pin_memory: bool = True,
    persistent_workers: bool = False,
    weighted_sampling: bool = False,
) -> Tuple:
    """Create graph-based dataloaders using PyG."""
    assert HAS_PYG, "PyTorch Geometric required for graph dataloaders"

    train_ds = MoleculeGraphDataset(data_dir, dataset_name, "train",
                                    data_fraction=data_fraction, seed=seed)
    val_ds = MoleculeGraphDataset(data_dir, dataset_name, "val")
    test_ds = MoleculeGraphDataset(data_dir, dataset_name, "test")

    print(f"Molecule Graph Dataset -- {dataset_name.upper()}")
    print(f"  Train: {len(train_ds)} | Val: {len(val_ds)} | Test: {len(test_ds)}")
    print(f"  Node feat dim: {train_ds.node_feat_dim} | Classes: {train_ds.num_classes}")

    pw = persistent_workers and num_workers > 0
    train_labels = [int(d.y.item()) for d in train_ds.data_list]
    train_sampler = build_balanced_sampler(train_labels) if weighted_sampling else None
    return (
        PyGDataLoader(
            train_ds,
            batch_size=batch_size,
            shuffle=train_sampler is None,
            sampler=train_sampler,
            num_workers=num_workers,
            pin_memory=pin_memory,
            persistent_workers=pw,
        ),
        PyGDataLoader(val_ds, batch_size=batch_size, shuffle=False, num_workers=num_workers, pin_memory=pin_memory, persistent_workers=pw),
        PyGDataLoader(test_ds, batch_size=batch_size, shuffle=False, num_workers=num_workers, pin_memory=pin_memory, persistent_workers=pw),
        train_ds.node_feat_dim,
    )
