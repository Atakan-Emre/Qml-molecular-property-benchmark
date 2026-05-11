# Moleküler Deney Manifesti

## Aktif Bileşenler

| Bileşen | Konum | Açıklama |
|---|---|---|
| Kaynak kod | `source/` | Klasik, kuantum ve hibrit model eğitim kodları |
| İşlenmiş veri | `data/processed/` | BACE, BBBP ve ClinTox train/val/test ayrımları |
| Analiz çıktıları | `results/analysis/` | Özet tablolar, liderlik tablosu, seçilmiş figürler |
| Deney metrikleri | `results/tables/` | Seed bazlı ve aggregate sonuç dosyaları |
| Tez dokümanları | `docs/` | Rapor, tez yapısı ve yayın kontrol listesi |

## Veri Setleri

| Veri seti | Kaynak | Görev |
|---|---|---|
| BACE | MoleculeNet/DeepChem | BACE-1 inhibitör sınıflandırması |
| BBBP | MoleculeNet/DeepChem | Kan-beyin bariyeri geçiş tahmini |
| ClinTox | MoleculeNet/DeepChem | Klinik toksisite tahmini |

## Tekrar Üretilebilirlik Notları

- Ana seed seti: `0, 42, 123, 456, 789`.
- Ana metrik: AUROC.
- Dengesiz veri setlerinde PR-AUC, F1, MCC, sensitivity ve specificity birlikte değerlendirilmelidir.
- Yeni deney çıktıları için `results_runtime/` kullanılması önerilir.

## Public Repo Dışı Yerel Arşivler

Silinmeden korunan, ancak Git geçmişine alınmaması gereken yerel klasörler:

- `docs/archive/`
- `data/source_copy_backup/`
- `provenance/legacy_quantum_benchmark/`
- `results/checkpoints/`
- `results/logs/`
- `results/figures/`
