"""
Download and validate molecular datasets: BACE, BBBP, ClinTox.
Downloads raw CSV from MoleculeNet, applies scaffold/random split via RDKit.
Generates ECFP fingerprints. No DeepChem/TensorFlow dependency.
"""
import os
import sys
import argparse
import hashlib
import numpy as np
import pandas as pd
from pathlib import Path
from collections import Counter
from urllib.request import urlretrieve
from tqdm import tqdm

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

# ──────────────────────────────────────────────────────────────────────────────
# Dataset metadata & download URLs (MoleculeNet raw CSVs)
# ──────────────────────────────────────────────────────────────────────────────
DATASETS = {
    "bace": {
        "url": "https://deepchemdata.s3-us-west-1.amazonaws.com/datasets/bace.csv",
        "description": "BACE-1 inhibitor classification",
        "smiles_col": "mol",
        "label_col": "Class",
        "split": "scaffold",
        "expected_min": 1500,
    },
    "bbbp": {
        "url": "https://deepchemdata.s3-us-west-1.amazonaws.com/datasets/BBBP.csv",
        "description": "Blood-brain barrier penetration",
        "smiles_col": "smiles",
        "label_col": "p_np",
        "split": "scaffold",
        "expected_min": 2000,
    },
    "clintox": {
        "url": "https://deepchemdata.s3-us-west-1.amazonaws.com/datasets/clintox.csv.gz",
        "description": "Clinical toxicity (FDA approval status)",
        "smiles_col": "smiles",
        "label_col": "CT_TOX",
        "split": "random",
        "expected_min": 1400,
    },
}


class _DownloadBar(tqdm):
    def update_to(self, b=1, bsize=1, tsize=None):
        if tsize is not None:
            self.total = tsize
        self.update(b * bsize - self.n)


def _download(url: str, dest: str):
    if os.path.exists(dest):
        print(f"  Already cached: {dest}")
        return
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    print(f"  Downloading {url}")
    with _DownloadBar(unit="B", unit_scale=True, miniters=1, desc=os.path.basename(dest)) as t:
        urlretrieve(url, dest, reporthook=t.update_to)


# ──────────────────────────────────────────────────────────────────────────────
# Scaffold split (Bemis-Murcko) via RDKit — no DeepChem needed
# ──────────────────────────────────────────────────────────────────────────────
def scaffold_split(smiles_list, labels, frac_train=0.8, frac_val=0.1, frac_test=0.1, seed=42):
    """Stratified Bemis-Murcko scaffold split.
    
    Groups molecules by scaffold, then distributes scaffold groups to
    train/val/test while monitoring class balance. If any split ends up
    with a single class, falls back to stratified random split.
    """
    from rdkit import Chem
    from rdkit.Chem.Scaffolds.MurckoScaffold import MurckoScaffoldSmiles

    labels = np.asarray(labels)
    scaffolds = {}
    for idx, smi in enumerate(smiles_list):
        mol = Chem.MolFromSmiles(str(smi))
        if mol is None:
            scaffold = "INVALID"
        else:
            scaffold = MurckoScaffoldSmiles(mol=mol, includeChirality=False)
        scaffolds.setdefault(scaffold, []).append(idx)

    # Sort scaffolds by size (largest first) for determinism
    scaffold_sets = sorted(scaffolds.values(), key=lambda x: (-len(x), x[0]))

    rng = np.random.RandomState(seed)
    train_idx, val_idx, test_idx = [], [], []
    n = len(smiles_list)

    for group in scaffold_sets:
        if len(train_idx) / n < frac_train:
            train_idx.extend(group)
        elif len(val_idx) / n < frac_val:
            val_idx.extend(group)
        else:
            test_idx.extend(group)

    # Validate class balance — every split must have all classes
    all_classes = set(np.unique(labels))
    splits_ok = True
    for name, idx_list in [("train", train_idx), ("val", val_idx), ("test", test_idx)]:
        split_classes = set(np.unique(labels[idx_list]))
        if split_classes != all_classes:
            print(f"  [WARN] Scaffold split: {name} missing classes {all_classes - split_classes}")
            splits_ok = False

    if not splits_ok:
        print("  [INFO] Falling back to stratified random split for class balance")
        return stratified_random_split(labels, frac_train, frac_val, frac_test, seed)

    return np.array(train_idx), np.array(val_idx), np.array(test_idx)


def random_split(n, frac_train=0.8, frac_val=0.1, frac_test=0.1, seed=42):
    """Simple random split."""
    rng = np.random.RandomState(seed)
    indices = rng.permutation(n)
    n_train = int(n * frac_train)
    n_val = int(n * frac_val)
    return indices[:n_train], indices[n_train:n_train + n_val], indices[n_train + n_val:]


def stratified_random_split(labels, frac_train=0.8, frac_val=0.1, frac_test=0.1, seed=42):
    """Stratified random split ensuring class balance in every split."""
    from sklearn.model_selection import StratifiedShuffleSplit

    labels = np.asarray(labels)
    n = len(labels)

    # First split: train vs (val+test)
    sss1 = StratifiedShuffleSplit(n_splits=1, test_size=frac_val + frac_test, random_state=seed)
    train_idx, rest_idx = next(sss1.split(np.zeros(n), labels))

    # Second split: val vs test (from the rest)
    rest_labels = labels[rest_idx]
    val_frac_of_rest = frac_val / (frac_val + frac_test)
    sss2 = StratifiedShuffleSplit(n_splits=1, test_size=1.0 - val_frac_of_rest, random_state=seed)
    val_sub_idx, test_sub_idx = next(sss2.split(np.zeros(len(rest_idx)), rest_labels))

    val_idx = rest_idx[val_sub_idx]
    test_idx = rest_idx[test_sub_idx]

    return train_idx, val_idx, test_idx


# ──────────────────────────────────────────────────────────────────────────────
# Download & process
# ──────────────────────────────────────────────────────────────────────────────
def download_dataset(name: str, data_dir: str, seed: int = 42):
    """Download raw CSV, parse, split, save."""
    info = DATASETS[name]
    save_dir = os.path.join(data_dir, name)
    os.makedirs(save_dir, exist_ok=True)

    # Check if already processed
    if all(os.path.exists(os.path.join(save_dir, s, "data.csv")) for s in ["train", "val", "test"]):
        print(f"\n=== {name.upper()} already processed, skipping download ===")
        return

    print(f"\n=== Downloading {name.upper()} ===")
    print(f"  Description: {info['description']}")

    url = info["url"]
    ext = ".csv.gz" if url.endswith(".gz") else ".csv"
    raw_path = os.path.join(save_dir, f"raw{ext}")
    _download(url, raw_path)

    # Load
    df = pd.read_csv(raw_path)
    smiles_col = info["smiles_col"]
    label_col = info["label_col"]

    # Validate SMILES exist
    from rdkit import Chem
    valid_mask = []
    for smi in df[smiles_col]:
        mol = Chem.MolFromSmiles(str(smi))
        valid_mask.append(mol is not None)
    valid_mask = np.array(valid_mask)
    n_invalid = (~valid_mask).sum()
    if n_invalid > 0:
        print(f"  Dropping {n_invalid} invalid SMILES")
    df = df[valid_mask].reset_index(drop=True)

    # Drop NaN labels
    df = df.dropna(subset=[label_col]).reset_index(drop=True)
    df["label"] = df[label_col].astype(int)

    print(f"  Total valid molecules: {len(df)}")
    print(f"  Label distribution: {dict(Counter(df['label']))}")

    # Split
    if info["split"] == "scaffold":
        train_idx, val_idx, test_idx = scaffold_split(
            df[smiles_col].tolist(), df["label"].values, seed=seed
        )
        print(f"  Split: scaffold (with stratified fallback)")
    else:
        train_idx, val_idx, test_idx = stratified_random_split(
            df["label"].values, seed=seed
        )
        print(f"  Split: stratified random")

    print(f"  Train: {len(train_idx)} | Val: {len(val_idx)} | Test: {len(test_idx)}")

    # Save splits
    for split_name, idx in [("train", train_idx), ("val", val_idx), ("test", test_idx)]:
        split_dir = os.path.join(save_dir, split_name)
        os.makedirs(split_dir, exist_ok=True)

        split_df = df.iloc[idx].reset_index(drop=True)
        # Standardize columns
        out_df = pd.DataFrame({
            "smiles": split_df[smiles_col],
            "y": split_df["label"],
        })
        out_df.to_csv(os.path.join(split_dir, "data.csv"), index=False)

        # Also save as numpy
        np.save(os.path.join(split_dir, "y.npy"), out_df["y"].values)

    print(f"  [OK] {name.upper()} downloaded and split")


# ──────────────────────────────────────────────────────────────────────────────
# ECFP fingerprints
# ──────────────────────────────────────────────────────────────────────────────
def generate_ecfp_features(data_dir: str, name: str, radius: int = 2, n_bits: int = 1024):
    """Generate ECFP fingerprints from SMILES."""
    from rdkit import Chem
    from rdkit.Chem import AllChem

    save_dir = os.path.join(data_dir, name)
    print(f"\n=== Generating ECFP for {name.upper()} (r={radius}, bits={n_bits}) ===")

    for split_name in ["train", "val", "test"]:
        split_dir = os.path.join(save_dir, split_name)
        csv_path = os.path.join(split_dir, "data.csv")
        if not os.path.exists(csv_path):
            print(f"  [WARN] No data.csv for {split_name}, skipping")
            continue

        df = pd.read_csv(csv_path)
        fps = []
        valid_mask = []

        for smi in df["smiles"]:
            mol = Chem.MolFromSmiles(str(smi))
            if mol is not None:
                fp = AllChem.GetMorganFingerprintAsBitVect(mol, radius, nBits=n_bits)
                fps.append(np.array(fp))
                valid_mask.append(True)
            else:
                fps.append(np.zeros(n_bits))
                valid_mask.append(False)

        fps = np.array(fps, dtype=np.float32)
        valid_mask = np.array(valid_mask)

        np.save(os.path.join(split_dir, f"ecfp_r{radius}_b{n_bits}.npy"), fps)
        # Also save as X.npy for compatibility with dataset loader
        np.save(os.path.join(split_dir, "X.npy"), fps)
        np.save(os.path.join(split_dir, "valid_mask.npy"), valid_mask)

        n_invalid = (~valid_mask).sum()
        print(f"  {split_name}: {len(fps)} fingerprints, {n_invalid} invalid SMILES")


# ──────────────────────────────────────────────────────────────────────────────
# RDKit 2D descriptors
# ──────────────────────────────────────────────────────────────────────────────
def generate_rdkit_descriptors(data_dir: str, name: str):
    """Generate RDKit 2D descriptors from SMILES."""
    from rdkit import Chem
    from rdkit.Chem import Descriptors
    from rdkit.ML.Descriptors.MoleculeDescriptors import MolecularDescriptorCalculator

    save_dir = os.path.join(data_dir, name)
    print(f"\n=== Generating RDKit descriptors for {name.upper()} ===")

    desc_names = [desc[0] for desc in Descriptors._descList]
    calc = MolecularDescriptorCalculator(desc_names)

    for split_name in ["train", "val", "test"]:
        split_dir = os.path.join(save_dir, split_name)
        csv_path = os.path.join(split_dir, "data.csv")
        if not os.path.exists(csv_path):
            continue

        df = pd.read_csv(csv_path)
        all_descs = []

        for smi in df["smiles"]:
            mol = Chem.MolFromSmiles(str(smi))
            if mol is not None:
                descs = calc.CalcDescriptors(mol)
                all_descs.append(list(descs))
            else:
                all_descs.append([0.0] * len(desc_names))

        desc_array = np.array(all_descs, dtype=np.float32)
        desc_array = np.nan_to_num(desc_array, nan=0.0, posinf=0.0, neginf=0.0)

        np.save(os.path.join(split_dir, "rdkit_descriptors.npy"), desc_array)
        pd.Series(desc_names).to_csv(
            os.path.join(split_dir, "rdkit_descriptor_names.csv"), index=False
        )
        print(f"  {split_name}: {desc_array.shape} descriptors ({len(desc_names)} features)")


# ──────────────────────────────────────────────────────────────────────────────
# Validation
# ──────────────────────────────────────────────────────────────────────────────
def validate_dataset(data_dir: str, name: str):
    """Validate dataset integrity."""
    info = DATASETS[name]
    save_dir = os.path.join(data_dir, name)
    print(f"\n=== Validating {name.upper()} ===")

    total = 0
    for split_name in ["train", "val", "test"]:
        split_dir = os.path.join(save_dir, split_name)
        csv_path = os.path.join(split_dir, "data.csv")
        df = pd.read_csv(csv_path)
        n = len(df)
        total += n

        counts = Counter(df["y"].values)
        print(f"  {split_name}: n={n}")
        for label, cnt in sorted(counts.items()):
            pct = cnt / n * 100
            print(f"    Label {label}: {cnt} ({pct:.1f}%)")

        # Check ECFP if exists
        ecfp_path = os.path.join(split_dir, "ecfp_r2_b1024.npy")
        if os.path.exists(ecfp_path):
            ecfp = np.load(ecfp_path)
            print(f"    ECFP: {ecfp.shape}")

        # Check X.npy
        x_path = os.path.join(split_dir, "X.npy")
        if os.path.exists(x_path):
            X = np.load(x_path)
            print(f"    X.npy: {X.shape}")

    assert total >= info["expected_min"], \
        f"Expected >={info['expected_min']} compounds, got {total}"
    print(f"  Total: {total}")
    print(f"  [OK] {name.upper()} validation passed")


def print_summary(data_dir: str):
    """Print comprehensive summary of all molecular datasets."""
    print("\n" + "=" * 60)
    print("MOLECULAR DATASETS SUMMARY")
    print("=" * 60)

    for name, info in DATASETS.items():
        save_dir = os.path.join(data_dir, name)
        if not os.path.exists(save_dir):
            print(f"\n  {name.upper()}: Not downloaded")
            continue

        print(f"\n  {name.upper()} -- {info['description']}")
        print(f"  Split strategy: {info['split']}")

        total = 0
        for split_name in ["train", "val", "test"]:
            csv_path = os.path.join(save_dir, split_name, "data.csv")
            if os.path.exists(csv_path):
                df = pd.read_csv(csv_path)
                n = len(df)
                total += n
                print(f"    {split_name}: {n}")
        print(f"    Total: {total}")

    print("=" * 60)


def main():
    parser = argparse.ArgumentParser(description="Download and validate molecular datasets")
    parser.add_argument("--data-dir", type=str, default=str(PROJECT_ROOT.parent / "data" / "processed"),
                        help="Directory to store data")
    parser.add_argument("--datasets", nargs="+", default=["bace", "bbbp", "clintox"],
                        help="Datasets to download")
    parser.add_argument("--skip-download", action="store_true", help="Skip download")
    parser.add_argument("--generate-ecfp", action="store_true",
                        help="Generate ECFP fingerprints")
    parser.add_argument("--generate-rdkit", action="store_true",
                        help="Generate RDKit descriptors")
    parser.add_argument("--ecfp-radius", type=int, default=2)
    parser.add_argument("--ecfp-bits", type=int, default=1024)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    data_dir = args.data_dir
    os.makedirs(data_dir, exist_ok=True)

    for name in args.datasets:
        if not args.skip_download:
            download_dataset(name, data_dir, seed=args.seed)

        if args.generate_ecfp:
            generate_ecfp_features(data_dir, name, args.ecfp_radius, args.ecfp_bits)

        if args.generate_rdkit:
            generate_rdkit_descriptors(data_dir, name)

        validate_dataset(data_dir, name)

    print_summary(data_dir)
    print("\n[DONE] Molecular data pipeline ready.")


if __name__ == "__main__":
    main()
