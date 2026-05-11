"""
Molecule Quantum Descriptor Training — VQC (Variational Quantum Classifier).

Pipeline: ECFP fingerprints → PCA (n_qubits dims) → ZZFeatureMap + RealAmplitudes → measurement
Fully integrated with ExperimentLogger for run_meta.json, experiment.log, TensorBoard.
"""
import os
import sys
import argparse
import json
import time
import numpy as np
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from qiskit_machine_learning.algorithms.classifiers import VQC
from qiskit_machine_learning.optimizers import COBYLA

from shared.utils import Config, set_seed
from shared.utils.imbalance import (
    is_extremely_imbalanced_binary,
    predict_binary_with_threshold,
    tune_binary_threshold,
)
from shared.utils.seed_resume import (
    build_aggregate_payload,
    load_completed_test_metrics,
    recover_completed_seed_result,
    write_aggregate_payload,
)
from shared.utils.paths import get_results_dir
from shared.metrics import compute_molecule_metrics
from shared.visualization import save_all_experiment_plots
from shared.quantum_utils import (
    PCAEncoder,
    QuantumTrainer,
    create_aer_sampler,
    create_ansatz,
    create_feature_map,
    get_circuit_metrics,
    get_qiskit_backend_info,
    prepare_circuit_for_aer,
)
from molecule.classical.dataset import MoleculeDescriptorDataset

RESULTS_DIR = get_results_dir(project_root=PROJECT_ROOT)


def train_vqc_single(config: Config) -> dict:
    """Train a single VQC experiment with full logging."""
    set_seed(config.seed)

    qt = QuantumTrainer(config)
    qt.info(f"VQC — {config.dataset_name.upper()} | seed={config.seed} | "
            f"qubits={config.n_qubits} | depth={config.circuit_depth} | ent={config.entanglement}")

    # --- Data ---
    t_data = time.time()
    train_ds = MoleculeDescriptorDataset(
        config.data_dir, config.dataset_name, "train",
        data_fraction=config.data_fraction, seed=config.seed,
    )
    val_ds = MoleculeDescriptorDataset(config.data_dir, config.dataset_name, "val")
    test_ds = MoleculeDescriptorDataset(config.data_dir, config.dataset_name, "test")
    X_train, y_train = train_ds.get_numpy()
    X_val, y_val = val_ds.get_numpy()
    X_test, y_test = test_ds.get_numpy()
    use_imbalance_fix = is_extremely_imbalanced_binary(y_train)
    data_time = time.time() - t_data
    qt.info(f"Data loaded in {data_time:.1f}s — Train: {len(X_train)} | Val: {len(X_val)} | Test: {len(X_test)}")

    # --- PCA ---
    t_pca = time.time()
    encoder = PCAEncoder(n_components=config.n_qubits)
    X_train_q = encoder.fit_transform(X_train)
    X_val_q = encoder.transform(X_val)
    X_test_q = encoder.transform(X_test)
    pca_time = time.time() - t_pca
    qt.log_pca_info(encoder.summary())

    # --- Subsample ---
    max_samples = getattr(config, 'max_samples', 500)
    if len(X_train_q) > max_samples:
        qt.info(f"Subsampling train {len(X_train_q)} → {max_samples}")
        idx = np.random.choice(len(X_train_q), max_samples, replace=False)
        X_train_q, y_train = X_train_q[idx], y_train[idx]
    if use_imbalance_fix:
        classes, counts = np.unique(y_train.astype(int), return_counts=True)
        majority_count = int(counts.max())
        balanced_idx = []
        rng = np.random.RandomState(config.seed)
        for cls in classes:
            cls_idx = np.where(y_train.astype(int) == int(cls))[0]
            sampled_idx = rng.choice(cls_idx, size=majority_count, replace=True)
            balanced_idx.append(sampled_idx)
        balanced_idx = np.concatenate(balanced_idx)
        rng.shuffle(balanced_idx)
        X_train_q, y_train = X_train_q[balanced_idx], y_train[balanced_idx]
        qt.info(f"Balanced resampling enabled for VQC train set - n_train={len(X_train_q)}")

    # --- Build VQC ---
    feature_map = create_feature_map(
        n_qubits=config.n_qubits, feature_map_type="zz",
        reps=config.circuit_depth, entanglement=config.entanglement,
    )
    ansatz = create_ansatz(
        n_qubits=config.n_qubits, ansatz_type="real_amplitudes",
        reps=config.circuit_depth, entanglement=config.entanglement,
    )
    full_circuit = feature_map.compose(ansatz)
    circuit_info = get_circuit_metrics(full_circuit)
    qt.log_quantum_info(circuit_info)

    feature_map_exec = prepare_circuit_for_aer(
        feature_map, preferred_device=config.backend, max_parallel_threads=config.num_workers
    )
    ansatz_exec = prepare_circuit_for_aer(
        ansatz, preferred_device=config.backend, max_parallel_threads=config.num_workers
    )
    optimizer = COBYLA(maxiter=config.epochs)
    backend_info = get_qiskit_backend_info(config.backend, config.num_workers, config.shots)
    qt.info(
        f"Qiskit backend: {backend_info['backend']} | device={backend_info['device']} | "
        f"threads={backend_info['max_parallel_threads']} | "
        f"shots={backend_info.get('shots', '?')} ({backend_info.get('sampling_mode', 'n/a')})"
    )
    sampler = create_aer_sampler(
        seed=config.seed,
        shots=config.shots,
        preferred_device=config.backend,
        max_parallel_threads=config.num_workers,
    )
    callback_state = {"iter": 0}

    def vqc_callback(*cb_args):
        callback_state["iter"] += 1
        obj = cb_args[1] if len(cb_args) > 1 else (cb_args[0] if cb_args else None)
        if callback_state["iter"] == 1 or callback_state["iter"] % 25 == 0:
            if isinstance(obj, (float, int, np.floating)):
                qt.info(f"VQC iter {callback_state['iter']:4d} | objective={float(obj):.6f}")
            else:
                qt.info(f"VQC iter {callback_state['iter']:4d}")

    vqc = VQC(
        sampler=sampler,
        feature_map=feature_map_exec,
        ansatz=ansatz_exec,
        optimizer=optimizer,
        callback=vqc_callback,
    )

    # --- Train ---
    t_train = time.time()
    qt.info(f"Training VQC (maxiter={config.epochs}, n_train={len(X_train_q)})...")
    y_train_oh = np.eye(2)[y_train.astype(int)]
    vqc.fit(X_train_q, y_train_oh)
    train_time = time.time() - t_train
    qt.info(f"Training completed in {train_time:.1f}s")
    eval_threshold = 0.5
    if use_imbalance_fix:
        val_prob = vqc.predict_proba(X_val_q)
        eval_threshold, threshold_score = tune_binary_threshold(
            y_val, val_prob, metric="balanced_accuracy"
        )
        qt.info(
            f"Binary eval threshold tuned on val: {eval_threshold:.3f} "
            f"(balanced_accuracy={threshold_score:.4f})"
        )

    # --- Evaluate ---
    results = {}
    for name, X_q, y in [("train", X_train_q, y_train),
                          ("val", X_val_q, y_val),
                          ("test", X_test_q, y_test)]:
        t_eval = time.time()
        y_prob = vqc.predict_proba(X_q)
        y_pred = (
            predict_binary_with_threshold(y_prob, eval_threshold)
            if use_imbalance_fix else np.argmax(y_prob, axis=1)
        )
        eval_time = time.time() - t_eval
        metrics = compute_molecule_metrics(y, y_pred, y_prob, task="binary", num_classes=2)
        metrics["eval_time_sec"] = round(eval_time, 3)
        results[name] = metrics
        qt.log_phase(name, metrics, step=0)

    # --- Timing ---
    qt.log_timing({
        "data_load_sec": round(data_time, 3),
        "pca_sec": round(pca_time, 3),
        "vqc_train_sec": round(train_time, 3),
        "total_train_sec": round(train_time, 3),
        "maxiter": config.epochs,
    })

    # --- Save ---
    tag = config.make_experiment_tag()
    results_dir = str(RESULTS_DIR / "tables")
    os.makedirs(results_dir, exist_ok=True)
    with open(os.path.join(results_dir, f"{tag}_results.json"), "w") as f:
        json.dump({
            "metrics": results,
            "quantum_info": {
                "n_qubits": config.n_qubits, "circuit_depth": config.circuit_depth,
                "entanglement": config.entanglement,
                "feature_map": "ZZFeatureMap", "ansatz": "RealAmplitudes",
                "optimizer": "COBYLA", "maxiter": config.epochs,
                "circuit_metrics": circuit_info, "pca_summary": encoder.summary(),
                "backend": backend_info,
            },
            "timing": {"vqc_train_sec": train_time, "total_train_sec": train_time},
        }, f, indent=2, default=str)

    # --- Plots ---
    figures_dir = str(RESULTS_DIR / "figures" / tag)
    y_prob_test = vqc.predict_proba(X_test_q)
    y_pred_test = (
        predict_binary_with_threshold(y_prob_test, eval_threshold)
        if use_imbalance_fix else np.argmax(y_prob_test, axis=1)
    )
    save_all_experiment_plots(
        output_dir=figures_dir, y_true=y_test, y_pred=y_pred_test, y_prob=y_prob_test,
        class_names=["Inactive", "Active"], model_name=f"VQC ({config.dataset_name.upper()})",
    )

    test_metrics = {k: v for k, v in results["test"].items() if isinstance(v, (int, float))}
    qt.finalize(final_metrics=test_metrics)
    return {"test_metrics": results["test"], "train_time": train_time}


def run_multi_seed(config: Config, resume_seeds: bool = False) -> dict:
    """Run VQC across multiple seeds and aggregate."""
    all_results = {}

    for seed in config.seeds:
        print(f"\n{'='*60}\nSEED {seed}\n{'='*60}")
        config.seed = seed
        recovered = recover_completed_seed_result(config, seed, enabled=resume_seeds)
        if recovered:
            all_results[seed] = recovered
            continue
        try:
            results = train_vqc_single(config)
            if "test_metrics" not in results or not results["test_metrics"]:
                recovered_metrics = load_completed_test_metrics(config, seed)
                if recovered_metrics:
                    results["test_metrics"] = recovered_metrics
                    results["recovered_from_run_meta"] = True
            all_results[seed] = results
        except Exception as e:
            recovered = recover_completed_seed_result(config, seed, enabled=True, verbose=False)
            if recovered:
                print(f"  [WARN] seed {seed}: {e} | recovered metrics from run_meta.json")
                recovered["error"] = str(e)
                all_results[seed] = recovered
            else:
                print(f"  [ERROR] seed {seed}: {e}")
                all_results[seed] = {"error": str(e)}

    payload = build_aggregate_payload(all_results)
    write_aggregate_payload(RESULTS_DIR, config, payload)

    print(f"\n{'='*60}\nAGGREGATED ({len(config.seeds)} seeds)\n{'='*60}")
    for key, val in payload["summary"].items():
        print(f"  {key}: {val:.4f}")
    return {"summary": payload["summary"], "per_seed": all_results}


def main():
    parser = argparse.ArgumentParser(description="Train ECFP+VQC on molecule datasets")
    parser.add_argument("--dataset", type=str, required=True, choices=["bace", "bbbp", "clintox"])
    parser.add_argument("--data-dir", type=str, default=str(PROJECT_ROOT.parent / "data" / "processed"))
    parser.add_argument("--n-qubits", type=int, default=8)
    parser.add_argument("--circuit-depth", type=int, default=2)
    parser.add_argument("--entanglement", type=str, default="full", choices=["full", "linear"])
    parser.add_argument("--maxiter", type=int, default=200)
    parser.add_argument("--max-samples", type=int, default=500)
    parser.add_argument("--backend", type=str, default="auto", choices=["auto", "CPU", "GPU"])
    parser.add_argument("--data-fraction", type=float, default=1.0)
    parser.add_argument("--resume-seeds", action="store_true", default=False)
    parser.add_argument("--seed", type=int, default=None)
    parser.add_argument("--seeds", nargs="+", type=int, default=[0, 42, 123, 456, 789])
    args = parser.parse_args()

    frac_suffix = f"_frac{args.data_fraction}" if args.data_fraction < 1.0 else ""
    config = Config(
        experiment_name=f"mol_vqc_{args.dataset}{frac_suffix}",
        modality="molecule", model_name="vqc", task="binary",
        data_dir=args.data_dir, dataset_name=args.dataset, num_classes=2,
        n_qubits=args.n_qubits, circuit_depth=args.circuit_depth,
        entanglement=args.entanglement, epochs=args.maxiter,
        backend=args.backend, num_workers=os.cpu_count() or 1,
        max_samples=args.max_samples,
        data_fraction=args.data_fraction, seeds=args.seeds,
    )

    if args.seed is not None:
        config.seed = args.seed
        config.seeds = [args.seed]
        train_vqc_single(config)
    else:
        run_multi_seed(config, resume_seeds=args.resume_seeds)

    print("\n[DONE] VQC training completed.")


if __name__ == "__main__":
    main()
