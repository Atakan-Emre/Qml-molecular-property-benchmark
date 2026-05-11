# Veri Dizini

Bu klasör, moleküler özellik tahmini deneylerinde kullanılan BACE, BBBP ve ClinTox veri setlerinin işlenmiş hallerini içerir.

## Aktif Veri Konumu

```text
data/processed/
├── bace/
├── bbbp/
└── clintox/
```

Her veri seti `train`, `val` ve `test` ayrımlarına sahiptir. Split klasörlerinde `data.csv`, `X.npy`, `y.npy`, `valid_mask.npy` ve `ecfp_r2_b1024.npy` dosyaları bulunur.

## Kaynak ve Atıf

Veriler MoleculeNet/DeepChem kaynaklıdır. Bu repo içindeki veri kopyaları yalnızca deneylerin tekrar üretilebilirliğini desteklemek için tutulur. Akademik yazımda ilgili MoleculeNet veri setlerinin ve kullanılan kütüphanelerin özgün yayınlarına atıf verilmelidir.

## Yerel Yedekler

Eski dosya düzeninden kalan kopyalar silinmemiştir; `data/source_copy_backup/` altında yerel olarak korunur ve `.gitignore` kapsamındadır. Aktif deneylerde bu klasör kullanılmaz.
