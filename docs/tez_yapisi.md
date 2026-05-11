# Projeye Göre Tez Yapısı

Bu doküman, moleküler özellik tahmini deneylerini tez metnine dönüştürmek için hazırlanmış proje-özel yazım iskeletidir. Ana anlatımda "ilaç adaylarına ait moleküler veriler" ifadesi; teknik bölümlerde SMILES, ECFP, moleküler grafik, QSVM, VQC, QGNN ve quantum head terimleri korunmalıdır.

## Başlık Önerisi

**İlaç Adaylarına Ait Moleküler Verilerde Klasik, Saf Kuantum ve Hibrit Kuantum Makine Öğrenmesi Yöntemlerinin Karşılaştırmalı Analizi**

## 1. Giriş

### 1.1. Çalışmanın Amacı

Bu çalışmanın amacı, BACE, BBBP ve ClinTox veri setleri üzerinde klasik, saf kuantum ve hibrit kuantum makine öğrenmesi yöntemlerini karşılaştırmaktır. Değerlendirme AUROC başta olmak üzere PR-AUC, accuracy, balanced accuracy, F1, MCC, sensitivity, specificity ve ECE metrikleriyle yapılmıştır.

### 1.2. Çalışmanın Kapsamı

Çalışma üç MoleculeNet kaynaklı ikili sınıflandırma görevine odaklanır:

| Veri seti | Görev | Bölünme | Test boyutu | Not |
|---|---|---:|---:|---|
| BACE | BACE-1 inhibitör sınıflandırması | train/val/test | 152 | Dengeliye yakın |
| BBBP | Kan-beyin bariyeri geçirgenliği | train/val/test | 204 | Pozitif sınıf baskın |
| ClinTox | Klinik toksisite | train/val/test | 148 | Belirgin sınıf dengesizliği |

Docking, moleküler dinamik, ıslak laboratuvar doğrulaması ve gerçek kuantum donanım üzerinde çalışma bu tezin kapsamı dışında bırakılmıştır.

### 1.3. Çalışmanın Katkıları

- Üç moleküler veri setinde aynı deney protokolüyle klasik, saf kuantum ve hibrit kuantum modellerin karşılaştırılması.
- ECFP tabanlı descriptor temsili ile moleküler grafik temsilinin birlikte incelenmesi.
- QSVM, VQC, QGNN ve frozen MLP encoder + quantum head mimarisinin aynı problem ailesinde değerlendirilmesi.
- Beş seed üzerinden model kararlılığının raporlanması.
- Qubit sayısı, devre derinliği ve düşük veri rejimi etkilerinin ayrıca tartışılması.

## 2. Literatür Taraması

Bu bölümde ilaç keşfinde makine öğrenmesi, MoleculeNet veri setleri, moleküler özellik tahmini, grafik sinir ağları, kuantum kernel yöntemleri, varyasyonel kuantum sınıflandırıcılar ve hibrit kuantum-klasik öğrenme çalışmaları ele alınmalıdır.

## 3. Kuramsal Temeller

### 3.1. Moleküler Temsiller

SMILES gösterimi, ECFP/Morgan parmak izleri ve moleküler grafik temsili bu bölümde açıklanmalıdır. Projede ECFP için `radius=2`, `bits=1024` ayarı kullanılmıştır.

### 3.2. Klasik Modeller

SVM, ECFP vektörleri üzerinde `StandardScaler + SVC(probability=True, class_weight="balanced")` hattıyla değerlendirilmiştir. MLP, 512-256-128 gizli katman yapısı, BatchNorm, ReLU ve Dropout bileşenleriyle kullanılmıştır. GNN ve GAT modelleri moleküler grafik temsili üzerinde eğitilmiştir.

### 3.3. Kuantum Modeller

QSVM hattı:

```text
ECFP -> PCA(n_qubits) -> ZZFeatureMap -> Fidelity Quantum Kernel -> SVM
```

VQC hattı:

```text
ECFP -> PCA(n_qubits) -> ZZFeatureMap + RealAmplitudes -> COBYLA optimizasyonu
```

Hibrit quantum head hattı:

```text
ECFP -> frozen MLP encoder -> embedding -> PennyLane quantum projection head -> sınıflandırıcı
```

## 4. Materyal ve Metot

### 4.1. Veri Ön İşleme

Veriler MoleculeNet kaynaklı CSV dosyalarından alınmış, SMILES dizgeleri RDKit ile molekül nesnesine çevrilmiş, geçersiz kayıtlar elenmiş ve etiket kolonları standartlaştırılmıştır.

### 4.2. Deney Protokolü

Tüm ana deneylerde seed seti `0, 42, 123, 456, 789` olarak kullanılmıştır. QSVM/VQC için 2, 4, 6 ve 8 kubit varyasyonları; hibrit quantum head için 4, 6 ve 8 kubit ile 1 ve 2 devre derinliği varyasyonları değerlendirilmiştir.

### 4.3. Değerlendirme

Ana metrik AUROC'tur. Yardımcı metrikler PR-AUC, accuracy, balanced accuracy, F1, precision, recall, MCC, sensitivity, specificity ve ECE'dir. ClinTox sonuçları sınıf dengesizliği nedeniyle özellikle PR-AUC, F1, MCC ve sensitivity/specificity ile birlikte yorumlanmalıdır.

## 5. Bulgular ve Tartışma

### 5.1. BACE

BACE için en güçlü sonuçlar klasik MLP ve hibrit quantum head tarafındadır. En iyi hibrit varyant q6-d1 ile AUROC 0.9914; klasik MLP AUROC 0.9905; SVM AUROC 0.9632'dir. QSVM içinde en iyi varyant q6 ile AUROC 0.8741'dir.

### 5.2. BBBP

BBBP'de klasik descriptor modeller öndedir. SVM AUROC 0.9706, MLP AUROC 0.9564'tür. En iyi hibrit quantum head AUROC 0.9444 ile GNN'e yakın, QGNN ve QSVM'den yüksektir.

### 5.3. ClinTox

ClinTox'ta AUROC açısından hibrit quantum head q8-d2 0.8804 ile MLP 0.8802 seviyesine ulaşır. Ancak bu veri setinde threshold duyarlılığı ve seed kararsızlığı ayrıca tartışılmalıdır.

### 5.4. Genel Karşılaştırma

- Klasik descriptor modeller güçlü baseline oluşturur.
- QSVM, VQC'ye göre daha rekabetçi saf kuantum descriptor modelidir.
- QGNN, BBBP ve ClinTox'ta anlamlı sinyal üretse de klasik descriptor modellerin gerisindedir.
- Hibrit quantum head, BACE ve ClinTox'ta klasik performans seviyesine yaklaşmıştır.

## 6. Sonuçlar ve Öneriler

Bu proje, ilaç adaylarına ait moleküler verilerde klasik modellerin hâlâ çok güçlü olduğunu, buna karşın hibrit kuantum modellerin belirli veri setlerinde klasik performans seviyesine yaklaşabildiğini göstermektedir. Gelecek çalışma olarak atom/bond seviyesinde açıklanabilirlik, daha büyük MoleculeNet veri setleri, noise-aware simülasyonlar ve gerçek kuantum donanım deneyleri önerilebilir.
