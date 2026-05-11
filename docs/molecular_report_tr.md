# Moleküler Deneyler Raporu

Bu rapor, BACE, BBBP ve ClinTox veri setleri üzerinde yürütülen klasik, saf kuantum ve hibrit kuantum-klasik model deneylerinin özetidir. Raporun amacı, tez metninde kullanılabilecek yöntem, veri, deney protokolü ve sonuç anlatısını düzenli biçimde sunmaktır.

## 1. Kapsam

| Başlık | Değer |
|---|---:|
| Veri seti | BACE, BBBP, ClinTox |
| Ana görev | İkili moleküler özellik tahmini |
| Seed politikası | 0, 42, 123, 456, 789 |
| Ana metrik | AUROC |
| Yardımcı metrikler | PR-AUC, F1, MCC, sensitivity, specificity, ECE |
| Aktif veri konumu | `data/processed/` |
| Resmi sonuç konumu | `results/analysis/`, `results/tables/` |

## 2. Veri Setleri

| Veri seti | Görev | Train | Validation | Test | Değerlendirme notu |
|---|---|---:|---:|---:|---|
| BACE | BACE-1 inhibitör sınıflandırması | 1211 | 151 | 152 | Dengeliye yakın ikili sınıflandırma |
| BBBP | Kan-beyin bariyeri geçiş tahmini | 1631 | 204 | 204 | Pozitif sınıf baskın |
| ClinTox | Klinik toksisite tahmini | 1184 | 148 | 148 | Belirgin sınıf dengesizliği |

SMILES dizgeleri RDKit ile işlenmiştir. Descriptor modelleri için ECFP/Morgan parmak izleri, grafik modelleri için moleküler grafik temsilleri kullanılmıştır.

## 3. Yöntemler

- Klasik descriptor modeller: ECFP üzerinde SVM ve MLP.
- Klasik grafik modeller: SMILES kaynaklı moleküler grafikler üzerinde GNN ve GAT.
- Saf kuantum descriptor modeller: PCA ile kubit sayısına indirgenen ECFP temsili üzerinde QSVM ve VQC.
- Kuantum grafik modeli: Moleküler grafik üzerinde QGNN.
- Hibrit kuantum-klasik model: Donmuş MLP encoder çıktısı üzerine PennyLane tabanlı quantum head.

QGNN, grafik temsiliyle kuantum katmanı birleştirdiği için tez metninde tamamen saf kuantum model olarak değil, kuantum grafik/hibridize grafik yaklaşımı olarak dikkatli adlandırılmalıdır.

## 4. En İyi Sonuçlar

| Veri seti | En güçlü klasik sonuç | En güçlü hibrit sonuç | Saf kuantumda öne çıkan sonuç |
|---|---:|---:|---:|
| BACE | MLP: 0.9905 | Hybrid QHead q6-d1: 0.9914 | QSVM q6: 0.8741 |
| BBBP | SVM: 0.9706 | Hybrid QHead q4-d1: 0.9444 | QGNN: 0.8995 |
| ClinTox | MLP: 0.8802 | Hybrid QHead q8-d2: 0.8804 | QGNN: 0.7582 |

## 5. Veri Seti Bazlı Yorum

### BACE

BACE veri setinde klasik MLP ve hibrit quantum head en güçlü sonuçları vermiştir. Hibrit modelin q6-d1 ayarı AUROC bakımından klasik MLP ile aynı seviyeye ulaşmıştır. QSVM, saf kuantum descriptor modeller içinde en kararlı adaydır; ancak klasik ve hibrit modellerin gerisinde kalır.

### BBBP

BBBP veri setinde SVM ve MLP güçlü klasik baseline oluşturur. Hibrit quantum head, GNN seviyesine yakın bir performans üretse de en iyi klasik descriptor modellerinin gerisindedir. QGNN bu veri setinde anlamlı sinyal üretmiş, fakat SVM/MLP düzeyine çıkamamıştır.

### ClinTox

ClinTox belirgin sınıf dengesizliği içerdiği için accuracy tek başına yorumlanmamalıdır. Hibrit quantum head q8-d2 ayarı AUROC bakımından klasik MLP seviyesine yaklaşır. Bu veri seti için PR-AUC, F1, MCC, sensitivity ve specificity birlikte raporlanmalıdır.

## 6. Tez İçin Ana Tartışma Noktaları

- Klasik descriptor modeller hâlâ çok güçlü bir referans noktasıdır.
- Saf kuantum descriptor modellerde QSVM, VQC'ye göre daha kararlı görünmektedir.
- Hibrit quantum head mimarisi, saf kuantum modellere göre daha uygulanabilir ve daha rekabetçi bir deney zemini sunmaktadır.
- Qubit sayısı ve devre derinliği veri setine duyarlıdır; tek bir kuantum konfigürasyonu tüm görevlerde en iyi sonucu vermemektedir.
- ClinTox gibi dengesiz veri setlerinde threshold duyarlılığı ve kalibrasyon ayrıca tartışılmalıdır.

## 7. Raporlanacak Artefaktlar

Tez ve makale metninde öncelikli kullanılabilecek dosyalar:

- `results/analysis/molecular_benchmark_summary.csv`
- `results/analysis/molecular_leaderboard.csv`
- `results/analysis/paper_figures/`
- `results/analysis/figures/`
- `results/tables/*_aggregated.json`

Yerel doğrulama için tutulan checkpoint, TensorBoard log ve ara figürler korunmuştur; ancak public Git geçmişine alınmamalıdır.
