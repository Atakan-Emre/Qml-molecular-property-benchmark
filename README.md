# Classical and Quantum Machine Learning Models for Medical Data Analysis

**Seminar title:** MEDİKAL VERİ ANALİZİNDE KLASİK VE KUANTUM MAKİNE ÖĞRENMESİ MODELLERİNİN İNCELENMESİ<br>
**Presenter:** Şahin Atakan Emre<br>
**Advisor:** Doç. Dr. Bihter DAŞ<br>
**Repository:** QML Molecular Property Benchmark

This repository contains a reproducible molecular property benchmark comparing classical machine learning, classical graph learning, pure quantum machine learning, quantum graph learning, and hybrid quantum-classical models on biomedical molecular datasets.

The study does not claim real quantum hardware advantage. Quantum models are evaluated as circuit-simulation based research models under the same data splits, seed policy, and metric family used for the classical baselines.

## Seminar Page

Interactive seminar page:

[https://atakan-emre.github.io/Qml-molecular-property-benchmark/](https://atakan-emre.github.io/Qml-molecular-property-benchmark/)

## Research Aim

The aim of this seminar study is to compare quantum models with classical methods under experimental conditions.

The central question is whether quantum and hybrid quantum models can produce meaningful signals for molecular property prediction when they are compared against strong classical baselines instead of weakened reference models.

## Datasets

The benchmark uses MoleculeNet-derived molecular datasets. Each molecule is represented by SMILES strings and processed into ECFP/Morgan fingerprints, graph representations, and compressed qubit-level inputs where required.

| Dataset | Biomedical task | Train | Validation | Test | Interpretation note |
|---|---:|---:|---:|---:|---|
| BACE | BACE-1 inhibitor classification | 1211 | 151 | 152 | Nearly balanced binary classification task |
| BBBP | Blood-brain barrier penetration prediction | 1631 | 204 | 204 | Positive class is dominant |
| ClinTox | Clinical toxicity signal prediction | 1184 | 148 | 148 | Strong class imbalance |

Processed data location:

```text
data/processed/{bace,bbbp,clintox}/{train,val,test}/
```

Each split contains:

- `data.csv`: SMILES records and labels
- `ecfp_r2_b1024.npy`: radius-2 1024-bit ECFP/Morgan fingerprints
- `X.npy`: model-ready feature array
- `y.npy`: binary labels
- `valid_mask.npy`: valid SMILES mask

## Model Families

| Family | Models | Representation | Role in the study |
|---|---|---|---|
| Classical descriptor models | SVM, MLP | ECFP/Morgan fingerprints | Strong non-quantum baselines |
| Classical graph models | GNN, GAT | Atom-bond molecular graphs | Graph-based molecular learning baselines |
| Pure quantum descriptor models | QSVM, VQC | ECFP + PCA + quantum circuit simulation | Quantum feature map and variational circuit comparison |
| Quantum graph model | QGNN | Molecular graph + quantum layer | Quantum graph learning experiment |
| Hybrid quantum-classical model | Frozen MLP encoder + Quantum Head | Learned embedding + parametrized quantum circuit | Main hybrid comparison line |

## Quantum Scope

The quantum part is implemented as simulation-based quantum machine learning. Classical molecular features are compressed to the selected qubit dimension, encoded into a quantum circuit, processed through quantum gates, and measured back into classical statistics.

Key concepts represented in the seminar page:

- **Qubit:** A two-state quantum representation before measurement.
- **Quantum gates:** H, X, RX, RY, RZ, CNOT, CZ, and measurement operations are used to explain state rotation, phase change, controlled interaction, entanglement, and readout.
- **Circuit depth:** The number of successive quantum gate layers. Higher depth increases expressive capacity but does not guarantee better performance.
- **Measurement:** The circuit output is converted into classical statistics and evaluated with classical metrics.

## Main Results

The primary ranking metric is AUROC. Because ClinTox is strongly imbalanced, AUROC should be read together with PR-AUC, F1, MCC, sensitivity, specificity, and balanced accuracy.

| Dataset | Best result by AUROC | Strong classical reference | Best pure or graph quantum result |
|---|---:|---:|---:|
| BACE | Hybrid QHead q6-d1: 0.9914 ± 0.0027 | MLP: 0.9905 ± 0.0033 | QSVM q6-d2: 0.8741 ± 0.0274 |
| BBBP | SVM: 0.9706 ± 0.0000 | MLP: 0.9564 ± 0.0107 | QGNN q4-d2: 0.8995 ± 0.0326 |
| ClinTox | Hybrid QHead q8-d2: 0.8804 ± 0.0157 | MLP: 0.8802 ± 0.0189 | QGNN q4-d2: 0.7582 ± 0.1350 |

Summary of interpretation:

- Classical descriptor models remain very strong, especially SVM on BBBP and MLP on BACE and ClinTox.
- Hybrid QHead is competitive on BACE and ClinTox and is the top-ranked configuration for those two datasets.
- QSVM is more stable than VQC among pure quantum descriptor models, but it does not surpass the strongest classical baselines.
- QGNN produces meaningful graph-quantum signals on BBBP, but variability increases across tasks.
- More qubits or greater circuit depth does not automatically improve performance. The best qubit-depth setting is task dependent.

## Reproducibility

Main experiments use five seeds:

```text
0, 42, 123, 456, 789
```

Reported scores are mean and standard deviation across seeds where applicable. Single-seed interpretation is intentionally avoided.

Experimental hardware used for the reported training runs:

```text
CPU: AMD Ryzen 9 9950X
GPU: MSI NVIDIA GeForce RTX 4080 SUPER
RAM: 64 GB DDR5 6200 MHz
```

## Experimental Outputs

The repository is organized around completed experiment outputs. The main CSV files summarize the evaluated models, dataset-level rankings, seed stability, qubit-depth settings, and metric families used in the seminar.

Main analysis files:

| File | Purpose |
|---|---|
| `results/analysis/molecular_leaderboard.csv` | Ranked AUROC leaderboard by dataset and model configuration |
| `results/analysis/molecular_benchmark_summary.csv` | Full metric summary across classical, graph, quantum, and hybrid models |
| `results/analysis/molecular_inventory.json` | Inventory of generated tables, figures, and experiment artifacts |

Frontend-ready copies used by the seminar page:

| File | Purpose |
|---|---|
| `frontend/data/molecular_leaderboard.csv` | Interactive leaderboard and result visuals |
| `frontend/data/molecular_benchmark_summary.csv` | Dynamic charts, metric cards, and model comparisons |
| `frontend/data/figure_manifest.json` | Figure registry for seminar visuals |

Experiment-level outputs:

| Path | Content |
|---|---|
| `results/tables/*_aggregated.json` | Mean and standard deviation over seeds for each experiment |
| `results/tables/*_results.json` | Seed-level metric records where available |
| `results/analysis/figures/` | Analysis figures used for interpretation |
| `results/analysis/paper_figures/` | Selected high-resolution comparison figures |

Selected visual outputs:

![BACE all-method parameter summary](results/analysis/paper_figures/molecule_bace_all_methods_parameters.png)

![BBBP all-method parameter summary](results/analysis/paper_figures/molecule_bbbp_all_methods_parameters.png)

![ClinTox all-method parameter summary](results/analysis/paper_figures/molecule_clintox_all_methods_parameters.png)

## Repository Structure

```text
Qml-molecular-property-benchmark/
├── data/
│   └── processed/
├── docs/
│   └── molecular_report_tr.md
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   ├── sunum.html
│   ├── data/
│   └── assets/
├── provenance/
├── results/
│   ├── analysis/
│   └── tables/
├── source/
│   ├── molecule/
│   └── shared/
├── CITATION.cff
├── LICENSE
├── README.md
└── requirements.txt
```

The `thesis/` directory is intentionally ignored by Git. It is kept as a local seminar and thesis working area and is not part of the public repository content.

## Metrics

The benchmark reports:

- AUROC
- PR-AUC
- Accuracy
- Balanced Accuracy
- F1
- Precision
- Recall
- MCC
- Sensitivity
- Specificity
- ECE
- Training time
- Inference time

## Citation and License

The code is released under the MIT License. The datasets originate from MoleculeNet and DeepChem resources and remain subject to their own citation and licensing requirements.

When using this repository in academic writing, cite the relevant sources for MoleculeNet, RDKit, PyTorch, PyTorch Geometric, Qiskit, PennyLane, SVM, GNN, GAT, QSVM, VQC, QGNN, and hybrid quantum-classical learning methods.
