# Sonuç Dizini

Bu klasör, tezde kullanılan resmi analiz çıktıları ile yerel eğitim artefaktlarını ayırır.

## Repoya Dahil Edilecek Sonuçlar

```text
results/analysis/
results/tables/
```

Bu iki klasör, tez ve makale yazımında kullanılabilecek özet tabloları, manifestleri ve seçilmiş figürleri içerir.

## Yerelde Korunan Ağır Çıktılar

```text
results/checkpoints/
results/logs/
results/figures/
```

Bu klasörler silinmemiştir. Eğitim doğrulaması ve yerel inceleme için korunur; ancak checkpoint, TensorBoard log ve ara görsel dosyaları Git geçmişine alınmamalıdır.

## Yeni Deneyler

Yeni denemelerin resmi sonuç klasörlerini kirletmemesi için çalışma çıktıları varsayılan olarak `results_runtime/` altında üretilir. İstenirse ortam değişkeniyle farklı bir konum verilebilir:

```powershell
$env:MOLECULAR_RESULTS_DIR = "E:\molecular\results_runtime"
```
