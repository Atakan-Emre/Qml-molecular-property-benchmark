import os
from pathlib import Path


def get_project_root() -> Path:
    return Path(__file__).resolve().parents[3]


def _normalise_project_root(project_root: Path | None = None) -> Path:
    root = project_root or get_project_root()
    root = root.resolve()
    if root.name == "source":
        return root.parent
    return root


def _first_env_value(*env_names: str) -> str:
    for env_name in env_names:
        raw = os.environ.get(env_name, "").strip()
        if raw:
            return raw
    return ""


def _resolve_root(env_names: tuple[str, ...], default_dirname: str, project_root: Path | None = None) -> Path:
    root = _normalise_project_root(project_root)
    raw = _first_env_value(*env_names)
    if raw:
        path = Path(raw).expanduser()
        if not path.is_absolute():
            path = root / path
        return path
    return root / default_dirname


def get_results_dir(project_root: Path | None = None) -> Path:
    return _resolve_root(
        ("MOLECULAR_RESULTS_DIR", "QUANTUM_RESULTS_DIR"),
        "results_runtime",
        project_root=project_root,
    )


def get_outputs_dir(project_root: Path | None = None) -> Path:
    return _resolve_root(
        ("MOLECULAR_OUTPUT_DIR", "QUANTUM_OUTPUT_DIR"),
        "outputs_runtime",
        project_root=project_root,
    )


def ensure_runtime_dirs(project_root: Path | None = None) -> tuple[Path, Path]:
    results = get_results_dir(project_root=project_root)
    outputs = get_outputs_dir(project_root=project_root)

    for path in (
        results,
        results / "tables",
        results / "logs",
        results / "figures",
        results / "checkpoints",
        results / "analysis",
        outputs,
    ):
        path.mkdir(parents=True, exist_ok=True)

    return results, outputs
