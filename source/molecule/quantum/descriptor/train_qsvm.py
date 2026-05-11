"""
Molecule Quantum Descriptor Training — QSVM (Quantum Kernel SVM).

Pipeline: ECFP fingerprints → PCA (n_qubits dims) → ZZFeatureMap → Quantum Kernel → SVM
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

from sklearn.svm import SVC

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
    create_feature_map,
    create_fidelity_kernel,
    get_circuit_metrics,
    get_qiskit_backend_info,
    prepare_circuit_for_aer,
)
from molecule.classical.dataset import MoleculeDescriptorDataset

RESULTS_DIR = get_results_dir(project_root=PROJECT_ROOT)


def _safe_kernel_train_size(
    requested_samples: int,
    train_size: int,
    val_size: int,
    test_size: int,
    max_total_pairs: int,
) -> int:
    """Bound train-kernel sample size so total kernel evaluations stay under budget."""
    requested = min(requested_samples, train_size)
    b = val_size + test_size
    disc = b * b + 4.0 * float(max_total_pairs)
    safe_by_budget = int(max(64, ((disc ** 0.5) - b) / 2.0))
    return max(64, min(requested, safe_by_budget, train_size))


def train_qsvm_single(config: Config) -> dict:
    """Train a single QSVM experiment with full logging."""
    set_seed(config.seed)

    # --- Logger ---
    qt = QuantumTrainer(config)
    qt.info(f"QSVM — {config.dataset_name.upper()} | seed={config.seed} | "
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

    # --- PCA encoding ---
    t_pca = time.time()
    encoder = PCAEncoder(n_components=config.n_qubits)
    X_train_q = encoder.fit_transform(X_train)
    X_val_q = encoder.transform(X_val)
    X_test_q = encoder.transform(X_test)
    pca_time = time.time() - t_pca
    qt.log_pca_info(encoder.summary())

    # --- Subsample for kernel ---
    max_kernel_samples = getattr(config, 'max_kernel_samples', 500)
    max_total_pairs = getattr(config, "max_total_kernel_pairs", 2000000)
    safe_kernel_samples = _safe_kernel_train_size(
        requested_samples=max_kernel_samples,
        train_size=len(X_train_q),
        val_size=len(X_val_q),
        test_size=len(X_test_q),
        max_total_pairs=max_total_pairs,
    )
    if safe_kernel_samples < max_kernel_samples:
        qt.warning(
            "Requested max-kernel-samples=%d is too expensive for this split; "
            "auto-capped to %d (max-total-kernel-pairs=%d)"
            % (max_kernel_samples, safe_kernel_samples, max_total_pairs)
        )
    max_kernel_samples = safe_kernel_samples
    if len(X_train_q) > max_kernel_samples:
        qt.info(f"Subsampling train {len(X_train_q)} → {max_kernel_samples} for kernel computation")
        idx = np.random.choice(len(X_train_q), max_kernel_samples, replace=False)
        X_train_q_sub, y_train_sub = X_train_q[idx], y_train[idx]
    else:
        X_train_q_sub, y_train_sub = X_train_q, y_train

    # --- Quantum Kernel ---
    feature_map = create_feature_map(
        n_qubits=config.n_qubits,
        feature_map_type="zz",
        reps=config.circuit_depth,
        entanglement=config.entanglement,
    )
    circuit_info = get_circuit_metrics(feature_map)
    qt.log_quantum_info(circuit_info)

    backend_info = get_qiskit_backend_info(config.backend, config.num_workers, config.shots)
    qt.info(
        f"Qiskit backend: {backend_info['backend']} | device={backend_info['device']} | "
        f"threads={backend_info['max_parallel_threads']} | "
        f"shots={backend_info.get('shots', '?')} ({backend_info.get('sampling_mode', 'n/a')})"
    )
    feature_map_exec = prepare_circuit_for_aer(
        feature_map, preferred_device=config.backend, max_parallel_threads=config.num_workers
    )
    kernel = create_fidelity_kernel(
        feature_map=feature_map_exec,
        seed=config.seed,
        shots=config.shots,
        preferred_device=config.backend,
        max_parallel_threads=config.num_workers,
    )
    svm = SVC(
        kernel="precomputed",
        probability=True,
        C=1.0,
        class_weight=("balanced" if use_imbalance_fix else None),
    )

    # --- Kernel computation ---
    t_kernel = time.time()
    qt.info(f"Computing quantum kernel matrix ({len(X_train_q_sub)}x{len(X_train_q_sub)})...")
    K_train = kernel.evaluate(X_train_q_sub)
    kernel_time = time.time() - t_kernel
    qt.info(f"Kernel matrix computed in {kernel_time:.1f}s")

    # --- SVM fit ---
    t_fit = time.time()
    svm.fit(K_train, y_train_sub)
    fit_time = time.time() - t_fit
    qt.info(f"SVM fitted in {fit_time:.1f}s")

    total_train_time = kernel_time + fit_time
    eval_threshold = 0.5
    if use_imbalance_fix:
        K_val_for_threshold = kernel.evaluate(X_val_q, X_train_q_sub)
        val_prob = svm.predict_proba(K_val_for_threshold)
        eval_threshold, threshold_score = tune_binary_threshold(
            y_val, val_prob, metric="balanced_accuracy"
        )
        qt.info(
            f"Binary eval threshold tuned on val: {eval_threshold:.3f} "
            f"(balanced_accuracy={threshold_score:.4f})"
        )

    # --- Evaluate all splits ---
    results = {}
    test_pred = None
    test_prob = None
    for name, X_q_or_kernel, y in [("train", K_train, y_train_sub),
                                   ("val", X_val_q, y_val),
                                   ("test", X_test_q, y_test)]:
        t_eval = time.time()
        qt.info(f"Evaluating {name} split...")
        if name == "train":
            K = X_q_or_kernel
        else:
            K = kernel.evaluate(X_q_or_kernel, X_train_q_sub)
        y_prob = svm.predict_proba(K)
        y_pred = (
            predict_binary_with_threshold(y_prob, eval_threshold)
            if use_imbalance_fix else svm.predict(K)
        )
        eval_time = time.time() - t_eval
        metrics = compute_molecule_metrics(y, y_pred, y_prob, task="binary", num_classes=2)
        metrics["eval_time_sec"] = round(eval_time, 3)
        results[name] = metrics
        qt.log_phase(name, metrics, step=0)
        if name == "test":
            test_pred = y_pred
            test_prob = y_prob

    # --- Timing summary ---
    qt.log_timing({
        "data_load_sec": round(data_time, 3),
        "pca_sec": round(pca_time, 3),
        "kernel_compute_sec": round(kernel_time, 3),
        "svm_fit_sec": round(fit_time, 3),
        "total_train_sec": round(total_train_time, 3),
    })

    # --- Save results ---
    tag = config.make_experiment_tag()
    results_dir = str(RESULTS_DIR / "tables")
    os.makedirs(results_dir, exist_ok=True)
    with open(os.path.join(results_dir, f"{tag}_results.json"), "w") as f:
        json.dump({
            "metrics": results,
            "quantum_info": {
                "n_qubits": config.n_qubits,
                "circuit_depth": config.circuit_depth,
                "entanglement": config.entanglement,
                "feature_map": "ZZFeatureMap",
                "circuit_metrics": circuit_info,
                "pca_summary": encoder.summary(),
                "backend": backend_info,
            },
            "timing": {
                "kernel_compute_sec": kernel_time,
                "svm_fit_sec": fit_time,
                "total_train_sec": total_train_time,
            },
        }, f, indent=2, default=str)

    # --- Plots ---
    figures_dir = str(RESULTS_DIR / "figures" / tag)
    save_all_experiment_plots(
        output_dir=figures_dir,
        y_true=y_test,
        y_pred=test_pred,
        y_prob=test_prob,
        class_names=["Inactive", "Active"],
        model_name=f"QSVM ({config.dataset_name.upper()})",
    )

    # --- Finalize ---
    test_metrics = {k: v for k, v in results["test"].items() if isinstance(v, (int, float))}
    qt.finalize(final_metrics=test_metrics)

    return {"test_metrics": results["test"], "train_time": total_train_time}


def run_multi_seed(config: Config, resume_seeds: bool = False) -> dict:
    """Run QSVM across multiple seeds and aggregate."""
    all_results = {}

    for seed in config.seeds:
        print(f"\n{'='*60}\nSEED {seed}\n{'='*60}")
        config.seed = seed
        recovered = recover_completed_seed_result(config, seed, enabled=resume_seeds)
        if recovered:
            all_results[seed] = recovered
            continue
        try:
            results = train_qsvm_single(config)
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
    parser = argparse.ArgumentParser(description="Train ECFP+QSVM on molecule datasets")
    parser.add_argument("--dataset", type=str, required=True, choices=["bace", "bbbp", "clintox"])
    parser.add_argument("--data-dir", type=str, default=str(PROJECT_ROOT.parent / "data" / "processed"))
    parser.add_argument("--n-qubits", type=int, default=8)
    parser.add_argument("--circuit-depth", type=int, default=2)
    parser.add_argument("--entanglement", type=str, default="full", choices=["full", "linear"])
    parser.add_argument("--max-kernel-samples", type=int, default=500)
    parser.add_argument("--max-total-kernel-pairs", type=int, default=2000000)
    parser.add_argument("--backend", type=str, default="auto", choices=["auto", "CPU", "GPU"])
    parser.add_argument("--data-fraction", type=float, default=1.0)
    parser.add_argument("--resume-seeds", action="store_true", default=False)
    parser.add_argument("--seed", type=int, default=None)
    parser.add_argument("--seeds", nargs="+", type=int, default=[0, 42, 123, 456, 789])
    args = parser.parse_args()

    frac_suffix = f"_frac{args.data_fraction}" if args.data_fraction < 1.0 else ""
    config = Config(
        experiment_name=f"mol_qsvm_{args.dataset}{frac_suffix}",
        modality="molecule",
        model_name="qsvm",
        task="binary",
        data_dir=args.data_dir,
        dataset_name=args.dataset,
        num_classes=2,
        n_qubits=args.n_qubits,
        circuit_depth=args.circuit_depth,
        entanglement=args.entanglement,
        max_kernel_samples=args.max_kernel_samples,
        max_total_kernel_pairs=args.max_total_kernel_pairs,
        backend=args.backend,
        num_workers=min(16, os.cpu_count() or 1),
        data_fraction=args.data_fraction,
        seeds=args.seeds,
    )

    if args.seed is not None:
        config.seed = args.seed
        config.seeds = [args.seed]
        train_qsvm_single(config)
    else:
        run_multi_seed(config, resume_seeds=args.resume_seeds)

    print("\n[DONE] QSVM training completed.")


if __name__ == "__main__":
    main()
