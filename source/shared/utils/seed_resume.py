import json
from pathlib import Path
from typing import Any, Dict, Optional


def get_run_meta_path(config, seed: int) -> Path:
    original_seed = config.seed
    try:
        config.seed = seed
        tag = config.make_experiment_tag()
    finally:
        config.seed = original_seed
    return Path(config.log_dir) / tag / "run_meta.json"


def load_run_meta(config, seed: int) -> Dict[str, Any]:
    run_meta_path = get_run_meta_path(config, seed)
    if not run_meta_path.exists():
        return {}
    try:
        return json.loads(run_meta_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}


def load_completed_test_metrics(config, seed: int) -> Dict[str, float]:
    payload = load_run_meta(config, seed)
    if payload.get("status") != "completed":
        return {}

    final_metrics = payload.get("final_metrics", {})
    return {
        key: value
        for key, value in final_metrics.items()
        if isinstance(value, (int, float))
    }


def recover_completed_seed_result(
    config,
    seed: int,
    enabled: bool = False,
    verbose: bool = True,
) -> Optional[Dict[str, Any]]:
    if not enabled:
        return None

    metrics = load_completed_test_metrics(config, seed)
    if not metrics:
        return None

    if verbose:
        print(f"  [SKIP] seed {seed}: already completed, reusing run_meta.json")

    return {
        "test_metrics": metrics,
        "recovered_from_run_meta": True,
    }


def build_aggregate_payload(
    all_results: Dict[Any, Dict[str, Any]],
    extra: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    per_seed = {}
    for seed, result in all_results.items():
        numeric_metrics = {
            metric_key: metric_value
            for metric_key, metric_value in result.get("test_metrics", {}).items()
            if isinstance(metric_value, (int, float))
        }
        if numeric_metrics:
            per_seed[str(seed)] = numeric_metrics

    summary = {}
    metric_names = sorted({metric for metrics in per_seed.values() for metric in metrics})
    for metric_name in metric_names:
        values = [metrics[metric_name] for metrics in per_seed.values() if metric_name in metrics]
        if values:
            summary[f"{metric_name}_mean"] = float(sum(values) / len(values))
            mean_val = summary[f"{metric_name}_mean"]
            variance = sum((value - mean_val) ** 2 for value in values) / len(values)
            summary[f"{metric_name}_std"] = float(variance ** 0.5)

    payload = {
        "summary": summary,
        "per_seed": per_seed,
    }
    if extra:
        payload.update(extra)
    return payload


def write_aggregate_payload(results_dir, config, payload: Dict[str, Any]) -> Path:
    agg_dir = Path(results_dir) / "tables"
    agg_dir.mkdir(parents=True, exist_ok=True)
    agg_path = agg_dir / f"{config.make_aggregate_tag()}_aggregated.json"
    agg_path.write_text(json.dumps(payload, indent=2, default=str), encoding="utf-8")
    return agg_path
