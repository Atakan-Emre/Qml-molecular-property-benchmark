# Yayın Öncesi Kontrol Listesi

Bu kontrol listesi, projenin tez teslimi veya public GitHub paylaşımı öncesinde temiz ve profesyonel görünmesini sağlamak için hazırlanmıştır.

## Repoya Dahil Edilecekler

- `README.md`
- `requirements.txt`
- `LICENSE`
- `CITATION.cff`
- `.gitignore`
- `.gitattributes`
- `docs/`
- `source/`
- `data/README.md`
- `data/processed/`
- `results/README.md`
- `results/analysis/`
- `results/tables/`
- `provenance/README.md`
- `provenance/MANIFEST.md`

## Repoya Dahil Edilmemesi Gerekenler

- `results/checkpoints/`
- `results/logs/`
- `results/figures/`
- `results_runtime/`
- `outputs_runtime/`
- `__pycache__/`
- `*.pyc`
- `events.out.tfevents.*`
- Yerel arşiv ve eski kopya klasörleri

## Akademik Kontrol

- Veri setlerinin kaynakları ve lisansları tez metninde belirtilmeli.
- MoleculeNet, RDKit, PyTorch, PyTorch Geometric, Qiskit ve PennyLane atıfları eklenmeli.
- ClinTox sonuçları accuracy üzerinden tek başına yorumlanmamalı.
- QGNN, tamamen saf kuantum model gibi sunulmamalı; kuantum grafik/hibridize grafik yaklaşımı olarak açıklanmalı.
- Hibrit quantum head mimarisi tezin ana deneysel katkılarından biri olarak öne çıkarılmalı.

## Teknik Kontrol

- Yeni deneyler için `MOLECULAR_RESULTS_DIR` ve `MOLECULAR_OUTPUT_DIR` kullanılmalı.
- Public Git geçmişine checkpoint, TensorBoard log ve ara figür klasörleri alınmamalı.
- Büyük ikili dosyalar gerekiyorsa Git LFS veya harici arşiv kullanılmalı.
- README'deki komutlar `data/processed/` yolunu göstermeli.
- Kod varsayılanları ile dokümantasyon yolları tutarlı kalmalı.
