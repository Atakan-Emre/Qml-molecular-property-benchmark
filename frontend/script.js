const i18n = {
  en: {
    "Medikal veri analizinde klasik ve kuantum makine öğrenmesi modellerinin moleküler özellik tahmini üzerindeki karşılaştırmalı seminer anlatımı.": "A comparative seminar narrative on classical and quantum machine learning models for molecular property prediction in medical data analysis.",
    "Medikal Veri Analizinde Klasik ve Kuantum Makine Öğrenmesi Modellerinin İncelenmesi": "An Examination of Classical and Quantum Machine Learning Models in Medical Data Analysis",
    "Ana bölüme git": "Go to the main section",
    "QML Semineri": "QML Seminar",
    "Sayfa bölümleri": "Page sections",
    "Dil seçimi": "Language selection",
    "Veri": "Data",
    "Yolculuk": "Pipeline",
    "Modeller": "Models",
    "Klasik": "Classical",
    "Kuantum": "Quantum",
    "Mimariler": "Architectures",
    "Yöntem": "Method",
    "Sonuçlar": "Results",
    "Metrik": "Metrics",
    "Hibrit": "Hybrid",
    "Ablasyon": "Ablation",
    "Kararlılık": "Stability",
    "Kanıtlar": "Evidence",
    "Anlam": "Meaning",
    "Temsil": "Representation",
    "Matris": "Matrix",
    "Kapasite": "Capacity",
    "Seed": "Seed",
    "Yüksek Lisans Semineri - Şahin Atakan Emre": "Graduate Seminar - Şahin Atakan Emre",
    "BACE, BBBP ve ClinTox veri setleri üzerinde klasik descriptor tabanlı modeller, moleküler grafik ağları, saf kuantum yöntemler ve hibrit kuantum-klasik başlık mimarisi aynı deneysel zeminde karşılaştırıldı.": "Classical descriptor-based models, molecular graph networks, purely quantum methods, and a hybrid quantum-classical head architecture were compared on the same experimental basis across the BACE, BBBP, and ClinTox datasets.",
    "Hızlı bağlantılar": "Quick links",
    "Bulguları İncele": "Inspect Findings",
    "Kuantum Nedir?": "What Is Quantum?",
    "Ana seminer bulguları": "Main seminar findings",
    "MoleculeNet görevi": "MoleculeNet tasks",
    "model ailesi": "model families",
    "deney tekrarı": "experimental repetitions",
    "en yüksek AUROC": "highest AUROC",
    "Araştırma odağı": "Research focus",
    "Kuantum avantajı varsayılmadı; güçlü klasik referanslarla ölçüldü.": "Quantum advantage was not assumed; it was evaluated against strong classical baselines.",
    "Seminerin temel sorusu, kuantum modellerin moleküler özellik tahmininde hangi koşullarda anlamlı sinyal ürettiğidir. Bu nedenle SVM ve MLP gibi güçlü klasik yöntemler zayıflatılmadan korunmuş, QSVM, VQC, QGNN ve Hybrid QHead sonuçları aynı veri ayrımları ve aynı metrik ailesiyle değerlendirilmiştir.": "The central question of the seminar is under which conditions quantum models produce meaningful signal in molecular property prediction. Therefore, strong classical methods such as SVM and MLP were preserved without weakening, while QSVM, VQC, QGNN, and Hybrid QHead results were evaluated with the same data splits and metric family.",
    "Klasik descriptor tabanlı modeller küçük ve orta ölçekli moleküler verilerde güçlü referanstır.": "Classical descriptor-based models constitute strong baselines for small- and medium-scale molecular data.",
    "QSVM, VQC'ye göre daha kararlı saf kuantum sinyali üretmiştir.": "QSVM produced a more stable purely quantum signal than VQC.",
    "Hibrit kuantum başlık, bazı görevlerde klasik modellerle aynı performans bölgesine yaklaşmıştır.": "The hybrid quantum head approached the performance region of classical models in selected tasks.",
    "Materyal": "Material",
    "Üç ilaç keşfi görevi, tek deneysel zemin": "Three drug discovery tasks on a common experimental basis",
    "Moleküller SMILES dizgeleri üzerinden işlendi; descriptor tabanlı modeller için ECFP/Morgan parmak izleri, grafik modeller için atom-bağ yapıları kullanıldı.": "Molecules were processed through SMILES strings; ECFP/Morgan fingerprints were used for descriptor-based models, and atom-bond structures were used for graph models.",
    "Ön işleme sonrası kullanılan veri ayrımları": "Data splits used after preprocessing",
    "Veri seti": "Dataset",
    "Görev": "Task",
    "Eğitim": "Training",
    "Doğrulama": "Validation",
    "Test": "Test",
    "Değerlendirme notu": "Evaluation note",
    "BACE-1 inhibitör sınıflandırması": "BACE-1 inhibitor classification",
    "Kan-beyin bariyeri geçiş tahmini": "Blood-brain barrier penetration prediction",
    "Klinik toksisite tahmini": "Clinical toxicity prediction",
    "Dengeliye yakın ikili sınıflandırma": "Nearly balanced binary classification",
    "Pozitif sınıf baskın": "Positive-class dominant",
    "Belirgin sınıf dengesizliği": "Pronounced class imbalance",
    "Verinin anlamı": "Data meaning",
    "BACE, BBBP ve ClinTox aynı boyutta değil, aynı soruda da değil": "BACE, BBBP, and ClinTox do not have the same size or the same scientific question",
    "Veri setleri yalnızca satır sayısı olarak okunmadı. BACE enzim inhibisyonunu, BBBP kan-beyin bariyeri geçişini, ClinTox ise klinik toksisite sinyalini temsil eder. Sınıf dağılımı ve biyomedikal soru, model yorumunu doğrudan değiştirir.": "The datasets were not interpreted only as row counts. BACE represents enzyme inhibition, BBBP represents blood-brain barrier penetration, and ClinTox represents clinical toxicity signal. Class distribution and the biomedical question directly change model interpretation.",
    "Veri setlerinin biyomedikal anlam ve sınıf dağılım haritası": "Biomedical meaning and class-distribution map of the datasets",
    "Veri okuma kuralı": "Rule for reading the data",
    "AUROC karşılaştırması aynı metrik dili verir; ancak veri setinin sınıf dengesi ve biyomedikal görevi sonuçların nasıl savunulacağını belirler.": "AUROC comparison gives a common metric language, but the class balance and biomedical task determine how the results should be defended.",
    "Enzim inhibitörlüğü; dengeliye yakın test ayrımı.": "Enzyme inhibition; nearly balanced test split.",
    "Pozitif sınıf baskın; geçiş sinyali güçlü.": "Positive class is dominant; penetration signal is strong.",
    "Az pozitif örnek; F1, MCC ve özgüllük zorunlu.": "Few positive samples; F1, MCC, and specificity are mandatory.",
    "Veri temsili": "Data representation",
    "SMILES kaydı klasik, grafik ve kuantum modele farklı yüzlerle girer": "A SMILES record enters classical, graph, and quantum models through different representations",
    "Aynı molekül önce kimyasal dize olarak gelir; descriptor hattında ECFP bitlerine, grafik hattında atom-bağ ağına, kuantum hattında ise sıkıştırılmış kubit temsiline dönüşür.": "The same molecule first arrives as a chemical string; it becomes ECFP bits in the descriptor pipeline, an atom-bond network in the graph pipeline, and a compressed qubit representation in the quantum pipeline.",
    "Temsil dönüşümü": "Representation transformation",
    "Bu katman, seminerdeki model ailelerinin neden doğrudan aynı iç yapıyla karşılaştırılamadığını gösterir: girdi aynı molekül olsa da temsil uzayı değişir.": "This layer shows why the model families in the seminar cannot be compared as identical internal structures: the input molecule is the same, but the representation space changes.",
    "1024 bit, radius 2 Morgan parmak izi.": "1024-bit radius-2 Morgan fingerprint.",
    "Atom düğümleri ve bağ kenarları.": "Atom nodes and bond edges.",
    "PCA veya kodlayıcı sonrası q boyutlu devre girişi.": "q-dimensional circuit input after PCA or an encoder.",
    "SMILES verisinin ECFP, grafik, PCA ve kubit temsiline dönüşümü": "Transformation of SMILES data into ECFP, graph, PCA, and qubit representations",
    "Deney matrisi": "Experimental matrix",
    "Veri seti, model ailesi ve AUROC tek ısı haritasında birleşiyor": "Dataset, model family, and AUROC merge into one heatmap",
    "Liderlik CSV'sindeki her görev için en iyi SVM, MLP, GNN, GAT, QSVM, VQC, QGNN ve Hybrid QHead değeri alınır. Böylece seminer bulgusu tablo yerine doğrudan karşılaştırılabilir bir model matrisi olarak okunur.": "For each task in the leaderboard CSV, the best SVM, MLP, GNN, GAT, QSVM, VQC, QGNN, and Hybrid QHead value is selected. Thus, the seminar finding can be read as a directly comparable model matrix instead of only a table.",
    "Model ailesi ve veri setine göre AUROC deney matrisi": "AUROC experimental matrix by model family and dataset",
    "Matris okuması": "Reading the matrix",
    "Renk koyulaştıkça AUROC yükselir. Aynı satır içinde model aileleri, aynı sütun içinde veri seti davranışı karşılaştırılır.": "Darker color indicates higher AUROC. Model families are compared within a row, and dataset behavior is compared within a column.",
    "Kubit-derinlik kapasitesi": "Qubit-depth capacity",
    "Daha fazla kubit veya derinlik otomatik üstünlük üretmedi": "More qubits or greater depth did not automatically produce superiority",
    "Hybrid QHead ablasyonları, q ve d ayarlarının veri setine göre farklı tepki verdiğini gösterir. Kapasite artışı, küçük moleküler veri rejiminde her zaman daha iyi genelleme anlamına gelmez.": "Hybrid QHead ablations show that q and d settings respond differently by dataset. Increasing capacity does not always mean better generalization in a small molecular data regime.",
    "Kapasite yorumu": "Capacity interpretation",
    "BACE q6-d1, BBBP q4-d1, ClinTox q8-d2 ile en iyi değeri verdi. Bu yüzden sayfadaki kuantum yorumu genel üstünlük değil, görev bazlı uyum vurgusudur.": "BACE achieved its best value with q6-d1, BBBP with q4-d1, and ClinTox with q8-d2. Therefore, the quantum interpretation on this page emphasizes task-specific fit, not general superiority.",
    "Devreye giren özellik boyutu ve kubit sayısı.": "Feature dimension entering the circuit and number of qubits.",
    "Ardışık kuantum kapı katmanı derinliği.": "Depth of successive quantum gate layers.",
    "Yüksek skor, düşük std ile birlikte okunur.": "A high score is read together with a low std.",
    "Kubit sayısı ve devre derinliğine göre kapasite haritası": "Capacity map by qubit count and circuit depth",
    "Seed dağılımı": "Seed distribution",
    "Ortalama ve standart sapma birlikte raporlandığında karar daha güvenilir olur": "Decision-making is more reliable when mean and standard deviation are reported together",
    "Bu görsel, liderlik CSV'sindeki ortalama AUROC ve standart sapma değerlerini temsili seed noktalarıyla açar. Noktalar ham seed kayıtları değil, raporlanan ortalama ve std bilgisinin görsel karşılığıdır.": "This visual expands the mean AUROC and standard deviation values in the leaderboard CSV with representative seed points. The points are not raw seed records; they are a visual counterpart of the reported mean and std information.",
    "Raporlanan ortalama ve standart sapmaya göre temsili seed dağılımı": "Representative seed distribution based on reported mean and standard deviation",
    "Kararlılık okuması": "Stability reading",
    "SVM gibi deterministik çizgilerde std sıfıra yakındır. QGNN ve bazı kuantum ayarlarında std büyüdükçe aynı ortalama daha dikkatli yorumlanmalıdır.": "For deterministic lines such as SVM, std is close to zero. As std increases for QGNN and some quantum settings, the same mean should be interpreted more cautiously.",
    "Molekül yolculuğu": "Molecular pipeline",
    "SMILES dizgesinden kuantum ölçümüne kadar bütün hat tek sahnede": "The complete route from SMILES string to quantum measurement in a single scene",
    "Bu görsel, seminerdeki deney hattını adım adım gösterir: molekül önce RDKit ile işlenir, ECFP parmak izine çevrilir, PCA veya kodlayıcı ile sıkıştırılır, kubitlere kodlanır ve ölçümden sonra klasik metriklerle değerlendirilir.": "This visual presents the seminar's experimental pipeline step by step: the molecule is first processed with RDKit, converted into an ECFP fingerprint, compressed with PCA or an encoder, encoded into qubits, and evaluated with classical metrics after measurement.",
    "SMILES'tan kuantum ölçümüne molekül yolculuğu": "Molecular journey from SMILES to quantum measurement",
    "Yöntem aileleri": "Method families",
    "Klasik çizgi, grafik öğrenme, saf kuantum ve hibrit başlık aynı sahnede": "Classical baselines, graph learning, purely quantum models, and the hybrid head in one view",
    "Klasik ve grafik yöntemler nasıl çalışır?": "How do classical and graph-based methods operate?",
    "SVM, MLP, GNN ve GAT için dinamik karar akışı": "Dynamic decision flow for SVM, MLP, GNN, and GAT",
    "Seminerde klasik taraf iki çizgide ilerler: ECFP/Morgan parmak izleri üzerinde SVM ve MLP; moleküler grafik üzerinde GNN ve GAT. Molekül görüntü olarak değil, atom-bağ grafiği olarak işlendiği için bu bölümde CNN yerine GNN/GAT akışı anlatılır.": "The classical side of the seminar proceeds along two routes: SVM and MLP on ECFP/Morgan fingerprints, and GNN and GAT on molecular graphs. Because the molecule is processed as an atom-bond graph rather than as an image, this section explains the GNN/GAT flow rather than presenting CNN as an experimental model.",
    "Klasik ve grafik yöntem seçimi": "Classical and graph method selection",
    "Klasik ve grafik makine öğrenmesi modellerini anlatan dinamik görsel": "Dynamic visual explaining classical and graph machine learning models",
    "Kuantum nedir?": "What is quantum?",
    "Kubit, süperpozisyon ve ölçüm aynı görsel anlatımda": "Qubit, superposition, and measurement in a shared visual explanation",
    "Kuantum hesaplama, klasik bitlerden farklı olarak kubit durumları üzerinde çalışır. Bu bölüm, seminerde kullanılan QML akışının arkasındaki kubit, süperpozisyon, dolanıklık, ölçüm ve devre derinliği kavramlarını hareketli grafikle açar.": "Unlike classical computing over bits, quantum computing operates on qubit states. This section uses motion graphics to unpack the qubit, superposition, entanglement, measurement, and circuit-depth concepts behind the QML pipeline used in the seminar.",
    "Kuantum kavram seçimi": "Quantum concept selection",
    "Kuantum kavramlarını anlatan dinamik görsel": "Dynamic visual explaining quantum concepts",
    "Model mimarileri": "Model architectures",
    "Seminerde kullanılan bütün modeller aynı görsel dilde açılıyor": "All models used in the seminar are explained in a shared visual language",
    "Her sekme, modelin veri girişinden karar skoruna kadar izlediği yolu dinamik olarak çizer. Klasik makine öğrenmesi, grafik öğrenme, saf kuantum ve hibrit yapıların farkı böylece doğrudan okunabilir.": "Each tab dynamically draws the route followed by a model from data input to decision score. The differences between classical machine learning, graph learning, purely quantum, and hybrid structures can therefore be read directly.",
    "Model mimarisi seçimi": "Model architecture selection",
    "Model mimarilerini anlatan dinamik görsel": "Dynamic visual explaining model architectures",
    "Kuantum anlatımı": "Quantum narrative",
    "ECFP uzayından kubitlere, kubitlerden karar sınırına": "From ECFP space to qubits, and from qubits to the decision boundary",
    "Saf kuantum descriptor hattında ECFP vektörleri PCA ile kubit sayısına indirgenir ve ZZFeatureMap üzerinden kuantum özellik uzayına taşınır. Hibrit yaklaşımda ise dondurulmuş MLP kodlayıcı daha kompakt bir gömme temsil üretir; Quantum Head bu temsil üzerinde parametrik devreyle karar katmanı kurar.": "In the purely quantum descriptor pipeline, ECFP vectors are reduced to the qubit dimension with PCA and mapped into a quantum feature space through ZZFeatureMap. In the hybrid approach, the frozen MLP encoder produces a more compact embedding; the Quantum Head builds a parametric-circuit decision layer on that representation.",
    "Moleküler yapı metinsel gösterim olarak alınır.": "The molecular structure is taken as a textual representation.",
    "Radius 2, 1024 bit Morgan parmak izi üretilir.": "A radius-2, 1024-bit Morgan fingerprint is generated.",
    "Klasik özellik uzayı kubit sayısına veya gömme uzayına indirgenir.": "The classical feature space is reduced to the qubit dimension or embedding space.",
    "Parametrik kuantum devre temsil üzerinde dönüşüm uygular.": "The parametric quantum circuit transforms the representation.",
    "Sonuçlar çoklu metriklerle raporlanır.": "Results are reported with multiple metrics.",
    "Animasyonlu kuantum devre görselleştirmesi": "Animated quantum circuit visualization",
    "Deneysel yöntem ve CSV veri katmanı": "Experimental method and CSV data layer",
    "Analiz CSV'lerinden beslenen araştırma paneli": "Research panel driven by analysis CSV files",
    "Benchmark özeti, liderlik tablosu, figür manifesti ve deney bayrakları GitHub Pages içinde okunur. Böylece bulgu tabloları, model yoğunluğu ve kanıt galerisi tek kaynaktan güncellenir.": "The benchmark summary, leaderboard, figure manifest, and experiment flags are read inside GitHub Pages. As a result, finding tables, model density views, and the evidence gallery are updated from a single source.",
    "Deney kategorileri ve veri setleri araştırma haritası": "Research map of experimental categories and datasets",
    "Bulgular": "Findings",
    "AUROC ana metrik; ClinTox için tamamlayıcı metrikler zorunlu": "AUROC is the primary metric; complementary metrics are required for ClinTox",
    "Veri seti seçerek sıralamayı, model ailelerini ve hibrit modelin konumunu incele.": "Select a dataset to inspect the ranking, model families, and the position of the hybrid model.",
    "Veri seti seçimi": "Dataset selection",
    "Veri setine göre AUROC liderlik grafiği": "AUROC leaderboard chart by dataset",
    "Seçili veri seti için model sıralaması": "Model ranking for the selected dataset",
    "Sıra": "Rank",
    "Aile": "Family",
    "Std": "Std",
    "Dengeli Doğr.": "Balanced Acc.",
    "Metrik laboratuvarı": "Metric laboratory",
    "ClinTox için eşik değişince model davranışı nasıl değişiyor?": "How does model behavior change when the threshold changes for ClinTox?",
    "ClinTox dengesiz olduğu için AUROC tek başına yeterli değildir. Burada eşik değeri değiştikçe karışıklık matrisi, F1, MCC, duyarlılık, özgüllük ve dengeli doğruluk birlikte hareket eder.": "Because ClinTox is imbalanced, AUROC alone is insufficient. Here, as the threshold changes, the confusion matrix, F1, MCC, sensitivity, specificity, and balanced accuracy move together.",
    "Metrik laboratuvarı model seçimi": "Metric laboratory model selection",
    "Karar eşiği": "Decision threshold",
    "ClinTox metrik laboratuvarı": "ClinTox metric laboratory",
    "Hibrit ablasyon": "Hybrid ablation",
    "Tek bir kubit sayısı bütün görevlerde en iyi değil": "No single qubit count is optimal for all tasks",
    "BACE için q6-d1, BBBP için q4-d1, ClinTox için q8-d2 öne çıktı. Bu sonuç, kuantum başlığın kapasitesi ile veri setinin yapısı arasında görev bazlı bir uyum gerektiğini gösterir.": "q6-d1 stood out for BACE, q4-d1 for BBBP, and q8-d2 for ClinTox. This result indicates that a task-specific match is required between the capacity of the quantum head and the structure of the dataset.",
    "Hibrit veri seti seçimi": "Hybrid dataset selection",
    "Kuantum ablasyon küpü": "Quantum ablation cube",
    "Kubit sayısı, devre derinliği ve model ailesi aynı yüzeyde": "Qubit count, circuit depth, and model family on the same surface",
    "Hybrid QHead, QSVM ve VQC için q/d ayarları veri setine göre farklı davranır. Bu panel daha fazla kubit veya daha fazla derinliğin otomatik olarak daha iyi olmadığını gösterir.": "q/d settings for Hybrid QHead, QSVM, and VQC behave differently by dataset. This panel shows that more qubits or greater depth are not automatically better.",
    "Ablasyon model seçimi": "Ablation model selection",
    "Ablasyon veri seti seçimi": "Ablation dataset selection",
    "Kuantum ablasyon yüzeyi": "Quantum ablation surface",
    "Seed/tekrar kararlılığı": "Seed/repetition stability",
    "En yüksek skor kadar standart sapma da kararın parçası": "Standard deviation is part of the decision, not only the highest score",
    "Beş farklı seed ile tekrarlanan deneylerde standart sapma model kararlılığını gösterir. QGNN ve bazı kuantum ayarlarında değişkenlik artarken, hibrit ve klasik çizgide daha kontrollü davranışlar görülebilir.": "In experiments repeated with five different seeds, the standard deviation indicates model stability. Variability increases for QGNN and some quantum settings, whereas more controlled behavior can be observed in the hybrid and classical lines.",
    "Kararlılık veri seti seçimi": "Stability dataset selection",
    "Seed ve tekrar kararlılığı grafiği": "Seed and repetition stability chart",
    "ClinTox okuması": "ClinTox interpretation",
    "Yüksek AUROC, dengesiz veri setinde tek başına karar değildir.": "High AUROC is not sufficient for decision-making in an imbalanced dataset.",
    "ClinTox test ayrımında pozitif sınıf çok azdır. Bu nedenle MLP ve Hybrid QHead AUROC bakımından neredeyse aynı görünse bile F1, MCC, duyarlılık ve özgüllük değerleri model davranışını değiştiren kritik kanıtlar sağlar.": "The positive class is very scarce in the ClinTox test split. Therefore, even when MLP and Hybrid QHead appear nearly identical in AUROC, F1, MCC, sensitivity, and specificity provide critical evidence that changes the interpretation of model behavior.",
    "Görsel kanıt galerisi": "Visual evidence gallery",
    "61 deney figürü filtrelenebilir kanıt paneline dönüştürüldü": "Sixty-one experimental figures were converted into a filterable evidence panel",
    "Tüm yöntem-parametre atlasları, eğitim eğrileri, ısı haritaları, radarlar, seed kutu grafikleri ve veri rejimi çıktıları tek galeride gezilebilir.": "All method-parameter atlases, training curves, heatmaps, radar charts, seed boxplots, and data-regime outputs can be explored in a single gallery.",
    "Galeri veri seti seçimi": "Gallery dataset selection",
    "Galeri figür tipi seçimi": "Gallery figure-type selection",
    "BACE - tüm yöntem ve parametre varyasyonları": "BACE - all method and parameter variations",
    "BBBP - tüm yöntem ve parametre varyasyonları": "BBBP - all method and parameter variations",
    "ClinTox - tüm yöntem ve parametre varyasyonları": "ClinTox - all method and parameter variations",
    "Sınırlılıklar ve araştırma dürüstlüğü": "Limitations and research integrity",
    "Bu çalışma kuantum üstünlüğü iddiası değil, dengeli karşılaştırma sunar": "This study does not claim quantum supremacy; it presents a balanced comparison",
    "Seminerin akademik gücü, güçlü klasik referansları korumasından ve dengesiz veri setlerinde tek metrikle karar vermemesinden gelir.": "The academic strength of the seminar comes from preserving strong classical baselines and avoiding single-metric decisions on imbalanced datasets.",
    "Seminer sonucu": "Seminar conclusion",
    "Kuantum modeller güçlü klasik referanslarla birlikte okunmalıdır.": "Quantum models should be interpreted together with strong classical baselines.",
    "Bulgular genel bir kuantum üstünlüğü iddiasını desteklememektedir. Daha savunulabilir sonuç; SVM ve MLP'nin güçlü referans konumunu koruduğu, QSVM'in VQC'ye göre daha kararlı davrandığı, QGNN'in bazı görevlerde sinyal ürettiği ve Hybrid QHead'in belirli veri setlerinde rekabetçi bir tamamlayıcı model ailesi olduğudur.": "The findings do not support a general claim of quantum advantage. The more defensible conclusion is that SVM and MLP retain their strong baseline position, QSVM behaves more stably than VQC, QGNN produces signal in some tasks, and Hybrid QHead is a competitive complementary model family for specific datasets.",
    "Hybrid QHead q6-d1 zirvede, MLP çok yakın.": "Hybrid QHead q6-d1 ranks first, with MLP very close.",
    "SVM en güçlü, hibrit GNN ile rekabetçi.": "SVM is strongest, while the hybrid model is competitive with GNN.",
    "Hibrit ve MLP AUROC yakın; eşik metrikleri belirleyici.": "Hybrid and MLP AUROC values are close; threshold-dependent metrics are decisive.",
    "Klasik descriptor tabanlı": "Classical descriptor-based",
    "Klasik grafik": "Classical graph",
    "Saf kuantum descriptor hattı": "Pure quantum descriptor pipeline",
    "Kuantum grafik": "Quantum graph",
    "Hibrit kuantum başlık": "Hybrid quantum head",
    "Metrik ailesi": "Metric family",
    "SVM ve MLP, radius 2 ve 1024 bit ECFP/Morgan parmak izleri üzerinde güçlü klasik referans çizgisini oluşturur.": "SVM and MLP form a strong classical baseline on radius-2, 1024-bit ECFP/Morgan fingerprints.",
    "Moleküller atomları düğüm, bağları kenar olan grafikler olarak ele alınır; mesaj geçirme ve dikkat mekanizması kullanılır.": "Molecules are treated as graphs whose nodes are atoms and whose edges are bonds; message passing and attention mechanisms are used.",
    "ECFP özellikleri PCA ile kubit sayısına indirgenir; QSVM kuantum çekirdek, VQC parametrik devre yaklaşımı kullanır.": "ECFP features are reduced to the qubit dimension with PCA; QSVM uses a quantum kernel, whereas VQC uses a parametric circuit approach.",
    "Grafik temsili ile parametrik kuantum mesaj geçirme fikrini bir araya getiren araştırma modelidir.": "It is a research model that combines graph representation with the idea of parametric quantum message passing.",
    "Dondurulmuş MLP kodlayıcı kompakt bir gömme temsil üretir; Quantum Head bu temsil üzerinde parametrik devre tabanlı karar katmanı kurar.": "The frozen MLP encoder produces a compact embedding representation; the Quantum Head builds a parametric-circuit decision layer on that representation.",
    "Ana metrik AUROC'tur; dengesiz görevlerde PR-AUC, F1, MCC, duyarlılık ve özgüllük birlikte yorumlanır.": "The primary metric is AUROC; in imbalanced tasks, PR-AUC, F1, MCC, sensitivity, and specificity are interpreted together.",
    "SVM: marj tabanlı karar sınırı": "SVM: margin-based decision boundary",
    "MLP: doğrusal olmayan descriptor temsili": "MLP: nonlinear descriptor representation",
    "BACE ve BBBP için güçlü ana karşılaştırma": "Strong primary comparison for BACE and BBBP",
    "GNN: komşuluk mesajları": "GNN: neighborhood messages",
    "GAT: öğrenilebilir dikkat katsayıları": "GAT: learnable attention coefficients",
    "BBBP ve ClinTox üzerinde anlamlı sinyal": "Meaningful signal on BBBP and ClinTox",
    "QSVM, VQC'ye göre daha kararlı": "QSVM is more stable than VQC",
    "q6 ayarı BACE, BBBP ve ClinTox için öne çıktı": "The q6 setting stood out for BACE, BBBP, and ClinTox",
    "Klasik referansların gerisinde kaldı": "Remained behind the classical baselines",
    "BACE üzerinde değişken": "Variable on BACE",
    "BBBP ve ClinTox üzerinde ayırt etme sinyali": "Discriminative signal on BBBP and ClinTox",
    "Olgun üstünlük iddiası değil": "Not a mature superiority claim",
    "ClinTox tek metrikle okunmaz": "ClinTox cannot be interpreted with a single metric",
    "Seed/tekrar ortalaması ve standart sapma raporlandı": "Seed/repetition mean and standard deviation were reported",
    "SVM sonuçları deterministik değerlerdir": "SVM results are deterministic values",
    "descriptor tabanlı klasik çizgi": "descriptor-based classical line",
    "descriptor tabanlı sinir ağı": "descriptor-based neural network",
    "klasik grafik öğrenme": "classical graph learning",
    "dikkat tabanlı grafik öğrenme": "attention-based graph learning",
    "SVM: ECFP uzayında en geniş marjı bulur": "SVM: finds the widest margin in ECFP space",
    "MLP: sabit descriptor vektöründen karar fonksiyonu öğrenir": "MLP: learns a decision function from a fixed descriptor vector",
    "GNN: atom komşuluklarından mesaj toplayarak molekülü temsil eder": "GNN: represents the molecule by aggregating messages from atomic neighborhoods",
    "GAT: her komşunun etkisini dikkat ağırlığıyla ayarlar": "GAT: adjusts each neighbor's contribution with attention weights",
    "SMILES verisi Morgan/ECFP parmak izine çevrilir. SVM bu yüksek boyutlu vektörde iki sınıfı ayıran karar sınırını ve destek vektörlerini kullanır.": "SMILES data are converted into a Morgan/ECFP fingerprint. SVM uses support vectors and a decision boundary that separates the two classes in this high-dimensional vector space.",
    "ECFP vektörü yoğun katmanlardan geçer; aktivasyon ve dropout ile doğrusal olmayan bir temsil oluşur, son katman sınıf skorunu üretir.": "The ECFP vector passes through dense layers; activation and dropout produce a nonlinear representation, and the final layer produces the class score.",
    "Molekül, atom düğümleri ve bağ kenarları olan grafik olarak okunur. Mesaj geçirme katmanları komşu atom bilgisini birleştirir ve grafik havuzlama molekül temsilini çıkarır.": "The molecule is read as a graph with atom nodes and bond edges. Message-passing layers combine neighboring atom information, and graph pooling extracts a molecular representation.",
    "GAT, GNN mesajlarını eşit ağırlıkla toplamak yerine komşu atomların katkısını öğrenilebilir dikkat katsayılarıyla tartar.": "Rather than aggregating GNN messages with equal weight, GAT weights neighboring atoms through learnable attention coefficients.",
    "Girdi": "Input",
    "Karar fikri": "Decision principle",
    "Seminer yorumu": "Seminar interpretation",
    "Radius 2, 1024 bit ECFP/Morgan parmak izi": "Radius-2, 1024-bit ECFP/Morgan fingerprint",
    "Marjı büyüten sınır ve destek vektörleri": "Margin-maximizing boundary and support vectors",
    "BBBP için güçlü klasik referans çizgisi": "Strong classical baseline for BBBP",
    "Sabit uzunluklu ECFP vektörü": "Fixed-length ECFP vector",
    "Yoğun katmanlar + aktivasyon + sigmoid": "Dense layers + activation + sigmoid",
    "BACE ve ClinTox için güçlü klasik karşılaştırma": "Strong classical comparison for BACE and ClinTox",
    "Atom düğümleri, bağ kenarları ve atom özellikleri": "Atom nodes, bond edges, and atom features",
    "Mesaj geçirme + grafik havuzlama": "Message passing + graph pooling",
    "BBBP ve ClinTox üzerinde anlamlı grafik sinyali": "Meaningful graph signal on BBBP and ClinTox",
    "Moleküler grafik ve komşuluk ilişkileri": "Molecular graph and neighborhood relations",
    "alpha dikkat katsayılarıyla ağırlıklı mesaj": "Weighted message with alpha attention coefficients",
    "ClinTox için güçlü klasik grafik alternatifi": "Strong classical graph alternative for ClinTox",
    "Kubit": "Qubit",
    "Süperpozisyon": "Superposition",
    "Ölçüm": "Measurement",
    "Dolanıklık": "Entanglement",
    "Derinlik": "Depth",
    "Denetimli öğrenme": "Supervised learning",
    "Kubit nedir?": "What is a qubit?",
    "Süperpozisyon nasıl okunur?": "How should superposition be interpreted?",
    "Ölçüm neden kritik?": "Why is measurement critical?",
    "Dolanıklık ne sağlar?": "What does entanglement provide?",
    "Devre derinliği neyi değiştirir?": "What does circuit depth change?",
    "Seminerde öğrenme problemi nasıl kuruldu?": "How was the learning problem formulated in the seminar?",
    "Kubit, klasik bit gibi yalnızca 0 veya 1 değildir; ölçülene kadar iki temel durumun karmaşık katsayılı birleşimi olarak temsil edilir.": "A qubit is not restricted to 0 or 1 like a classical bit; until measurement, it is represented as a complex-coefficient combination of two basis states.",
    "Süperpozisyon, bir kubitin ölçümden önce birden fazla olası sonucu aynı anda taşıyan olasılık genliği durumudur.": "Superposition is the probability-amplitude state in which a qubit carries multiple possible outcomes before measurement.",
    "Kuantum devre sonunda ölçüm yapıldığında sürekli durum, klasik modele aktarılabilecek ayrık istatistiklere dönüşür.": "When measurement is performed at the end of a quantum circuit, the continuous state is converted into discrete statistics that can be transferred to a classical model.",
    "Dolanıklık, kubitlerin bağımsız okunamayacak biçimde ortak bir durum üretmesidir; özellikler arası etkileşimleri temsil etmek için kullanılır.": "Entanglement is the production of a joint state that cannot be read as independent qubits; it is used to represent interactions among features.",
    "Derinlik, ardışık kuantum kapı katmanı sayısıdır. Daha derin devre daha esnek olabilir, ancak küçük veri ve gürültü altında her zaman daha iyi değildir.": "Depth is the number of successive quantum-gate layers. A deeper circuit can be more flexible, but it is not always better under small-data and noisy conditions.",
    "BACE, BBBP ve ClinTox ikili sınıflandırma görevleri olarak ele alındı; model, molekülden etikete giden karar fonksiyonunu öğrenir.": "BACE, BBBP, and ClinTox were treated as binary classification tasks; the model learns the decision function from molecule to label.",
    "Durum": "State",
    "Koşul": "Condition",
    "Seminerdeki rol": "Role in the seminar",
    "ECFP/PCA özellikleri kubit durumlarına kodlandı": "ECFP/PCA features were encoded into qubit states",
    "Genlik": "Amplitude",
    "Faz": "Phase",
    "Model etkisi": "Model effect",
    "alpha ve beta ölçüm olasılığını belirler": "alpha and beta determine measurement probability",
    "Aynı olasılık farklı girişim davranışı üretebilir": "The same probability can produce different interference behavior",
    "Özellik haritası klasik veriyi kuantum genliklerine taşır": "The feature map transfers classical data into quantum amplitudes",
    "Çıkış": "Output",
    "Beklenen değer veya ölçüm frekansı": "Expectation value or measurement frequency",
    "Karar": "Decision",
    "Sigmoid / margin / sınıf olasılığı": "Sigmoid / margin / class probability",
    "Metrik": "Metric",
    "AUROC, PR-AUC, F1 ve MCC ile okunur": "Interpreted with AUROC, PR-AUC, F1, and MCC",
    "Bağ": "Coupling",
    "Kontrollü kapılar kubitleri korele eder": "Controlled gates correlate qubits",
    "Yorum": "Interpretation",
    "Özellik çiftleri arasında doğrusal olmayan ilişki": "Nonlinear relationship between feature pairs",
    "Risk": "Risk",
    "Küçük veride yüksek kapasite kararsızlık yaratabilir": "High capacity on small data can create instability",
    "Daha yalın, daha kontrollü kapasite": "Simpler, more controlled capacity",
    "Daha fazla etkileşim ve parametre": "More interactions and parameters",
    "En iyi derinlik veri setine göre değişti": "The best depth varied by dataset",
    "Hedef": "Target",
    "0/1 sınıf etiketi": "0/1 class label",
    "Değerlendirme": "Evaluation",
    "Aynı veri ayrımı ve metrik ailesiyle karşılaştırma": "Comparison with the same data split and metric family",
    "klasik descriptor tabanlı": "classical descriptor-based",
    "klasik grafik": "classical graph",
    "saf kuantum": "pure quantum",
    "saf kuantum descriptor hattı": "pure quantum descriptor pipeline",
    "kuantum grafik": "quantum graph",
    "hibrit": "hybrid",
    "hibrit kuantum başlık": "hybrid quantum head",
    "hibrit kuantum-klasik": "hybrid quantum-classical",
    "ECFP/Morgan parmak izleri üzerinde marj tabanlı karar sınırı kurar ve küçük-orta veri rejiminde güçlü referans üretir.": "It builds a margin-based decision boundary on ECFP/Morgan fingerprints and provides a strong baseline in small- to medium-data regimes.",
    "ECFP vektörünü yoğun katmanlardan geçirerek doğrusal olmayan descriptor temsili öğrenir.": "It learns a nonlinear descriptor representation by passing the ECFP vector through dense layers.",
    "Molekülü atom düğümleri ve bağ kenarları olarak işler; komşuluk mesajlarını toplayarak grafik temsili üretir.": "It processes the molecule as atom nodes and bond edges, producing a graph representation by aggregating neighborhood messages.",
    "GNN çizgisini dikkat katsayılarıyla genişletir; her komşunun katkısını öğrenilebilir ağırlıklarla ayarlar.": "It extends the GNN line with attention coefficients, adjusting each neighbor's contribution with learnable weights.",
    "ECFP özellikleri PCA ile kubit boyutuna indirilir; kuantum özellik haritası ile çekirdek matrisi hesaplanır.": "ECFP features are reduced to the qubit dimension with PCA, and the kernel matrix is computed with a quantum feature map.",
    "Özellik haritasından sonra parametrik ansatz çalışır; ölçüm çıktısı sınıf olasılığına dönüştürülür.": "After the feature map, a parametric ansatz is applied; measurement output is converted into class probability.",
    "Grafik temsili ile kuantum mesaj geçirme fikrini birleştirir; araştırma amaçlı, değişken ama öğretici bir modeldir.": "It combines graph representation with the idea of quantum message passing; it is a research-oriented, variable, but instructive model.",
    "Klasik MLP kodlayıcı dondurulur; kompakt gömme temsil, Quantum Head içinde parametrik devreyle karar skoruna çevrilir.": "The classical MLP encoder is frozen; the compact embedding is converted into a decision score inside the Quantum Head through a parametric circuit.",
    "Ölçekleme": "Scaling",
    "SVM marjı": "SVM margin",
    "Karar skoru": "Decision score",
    "Yoğun katman + aktivasyon": "Dense layer + activation",
    "Moleküler grafik": "Molecular graph",
    "Atom özellikleri": "Atom features",
    "Mesaj geçirme": "Message passing",
    "Grafik havuzlama": "Graph pooling",
    "Sınıflandırıcı": "Classifier",
    "Dikkat başlığı": "Attention head",
    "Ağırlıklı mesaj": "Weighted message",
    "Kuantum çekirdek": "Quantum kernel",
    "Özellik haritası": "Feature map",
    "Ölçüm": "Measurement",
    "Grafik": "Graph",
    "Düğüm gömmesi": "Node embedding",
    "Kuantum mesaj": "Quantum message",
    "Havuzlama": "Pooling",
    "MLP kodlayıcı": "MLP encoder",
    "Dondurulmuş temsil": "Frozen representation",
    "Yapı": "Structure",
    "Marj maksimizasyonu": "Margin maximization",
    "BBBP için en güçlü ana referans": "Strongest primary baseline for BBBP",
    "Sabit uzunluklu descriptor": "Fixed-length descriptor",
    "Çok katmanlı algılayıcı": "Multilayer perceptron",
    "BACE ve ClinTox için güçlü klasik çizgi": "Strong classical line for BACE and ClinTox",
    "Atom-bağ grafiği": "Atom-bond graph",
    "Komşuluk mesajları": "Neighborhood messages",
    "Öğrenilebilir dikkat": "Learnable attention",
    "PCA ile q boyutlu descriptor": "q-dimensional descriptor after PCA",
    "VQC'ye göre daha kararlı saf kuantum çizgi": "More stable pure-quantum line than VQC",
    "Kubit sayısına indirgenmiş özellik": "Feature reduced to the qubit count",
    "Parametrik kuantum devre": "Parametric quantum circuit",
    "Saf kuantum deneme ailesi": "Pure quantum experiment family",
    "Grafik + kuantum katman": "Graph + quantum layer",
    "Bazı görevlerde ayırt etme sinyali": "Discriminative signal in selected tasks",
    "Klasik kodlayıcı temsili": "Classical encoder representation",
    "Dondurulmuş kodlayıcı + PQC başlık": "Frozen encoder + PQC head",
    "BACE, BBBP ve ClinTox'ta rekabetçi hibrit aile": "Competitive hybrid family on BACE, BBBP, and ClinTox",
    "klasik veri ablasyonu": "classical data ablation",
    "kuantum veri ablasyonu": "quantum data ablation",
    "Molekül metinsel kimyasal dize olarak alınır.": "The molecule is taken as a textual chemical string.",
    "Geçerli molekül nesnesi, atom ve bağ bilgisi üretilir.": "A valid molecule object, atom information, and bond information are generated.",
    "Radius 2 ve 1024 bit Morgan parmak izi çıkarılır.": "A radius-2, 1024-bit Morgan fingerprint is extracted.",
    "Klasik temsil kubit sayısına veya gömme uzayına sıkıştırılır.": "The classical representation is compressed to the qubit count or embedding space.",
    "Özellikler AngleEmbedding veya ZZFeatureMap ile devreye girer.": "Features enter the circuit through AngleEmbedding or ZZFeatureMap.",
    "Beklenen değerler klasik skor ve metriklere çevrilir.": "Expectation values are converted into classical scores and metrics.",
    "Tek çalıştırma": "Single run",
    "Dengesiz veri": "Imbalanced data",
    "NISQ gerçekliği": "NISQ reality",
    "Dikkatli adlandırma": "Careful terminology",
    "Küçük fark": "Small difference",
    "Sayfa": "Page",
    "Kaynak tutarlılığı": "Source consistency",
    "SVM sonuçları mevcut deney kayıtlarında tek çalıştırma değeridir; çoklu seed güvenilirliği diğer modeller kadar güçlü değildir.": "SVM results are single-run values in the available experiment records; multi-seed reliability is therefore not as strong as for the other models.",
    "AUROC yüksek olsa bile F1, MCC, duyarlılık ve özgüllük birlikte okunmalıdır.": "Even when AUROC is high, F1, MCC, sensitivity, and specificity must be interpreted together.",
    "Sınırlı kubit sayısı, devre derinliği, gürültü ve ölçüm maliyeti kuantum modellerin pratik sınırlarıdır.": "Limited qubit count, circuit depth, noise, and measurement cost are practical constraints for quantum models.",
    "QGNN saf kuantum model olarak değil, kuantum grafik veya hibritize grafik araştırma hattı olarak sunulmalıdır.": "QGNN should be presented not as a purely quantum model, but as a quantum-graph or hybridized graph research line.",
    "Hybrid QHead ile MLP arasındaki AUROC farkları çok küçük olduğu için istatistiksel güvenilirlik vurgusu gerekir.": "Because AUROC differences between Hybrid QHead and MLP are very small, statistical reliability must be emphasized.",
    "Yeni paneller CSV ve figür manifestinden beslendiği için sonuç dosyaları değişirse sayfa da güncellenebilir.": "Because the new panels are driven by CSV files and the figure manifest, the page can also update when the result files change.",
    "eğitim": "train",
    "doğrulama": "validation",
    "test": "test",
    "Sınıf dağılımı:": "Class distribution:",
    "Deney satırı": "Experiment rows",
    "Model kategorisi": "Model categories",
    "Figür": "Figures",
    "ROC + PR kanıtı": "ROC + PR evidence",
    "Kalibrasyon": "Calibration",
    "Seed/tekrar": "Seed/repetition",
    "CSV özeti": "CSV summary",
    "klasik / kuantum / hibrit": "classical / quantum / hybrid",
    "galeri manifesti": "gallery manifest",
    "eğri çıktısı": "curve outputs",
    "ECE ve reliability": "ECE and reliability",
    "Deney kapsam haritası": "Experimental coverage map",
    "deney": "experiments",
    "CSV veri katmanı": "CSV data layer",
    "Benchmark özeti -> liderlik tablosu -> figür manifesti": "Benchmark summary -> leaderboard -> figure manifest",
    "Veri seti satır dağılımı": "Dataset row distribution",
    "Model ailesi yoğunluğu": "Model-family density",
    "kategori": "category",
    "figür": "figure",
    "sayfa": "page",
    "kategori satırı CSV'den okunur": "category rows are read from CSV",
    "En yüksek AUROC": "Highest AUROC",
    "En iyi hibrit": "Best hybrid",
    "QSVM sinyali": "QSVM signal",
    "CSV sıralaması": "CSV ranking",
    "Yok": "None",
    "Dengeli doğr.": "Balanced acc.",
    "Görev bazlı kapasite uyumu": "Task-specific capacity alignment",
    "ClinTox üzerinde AUROC yakın; eşik bağımlı metrikler ayrıştırıcı.": "AUROC is close on ClinTox; threshold-dependent metrics are discriminative.",
    "Duyarlılık": "Sensitivity",
    "Özgüllük": "Specificity",
    "Deney hattı": "Experimental pipeline",
    "Bu akış, klasik modeller ile kuantum modellerin aynı molekül kaydını farklı temsil biçimleriyle nasıl kullandığını gösterir.": "This flow shows how classical and quantum models use the same molecular record through different representation forms.",
    "Sens.": "Sens.",
    "Spec.": "Spec.",
    "Dengeli": "Balanced",
    "Kesinlik": "Precision",
    "ClinTox eşik laboratuvarı": "ClinTox threshold laboratory",
    "Simüle edilmiş eşik duyarlılığı: test sınıf dağılımı 137 negatif / 11 pozitif üzerinden okunur.": "Simulated threshold sensitivity: interpreted through the test class distribution of 137 negatives / 11 positives.",
    "Veri yok": "No data",
    "Bu model için ablasyon kaydı bulunamadı.": "No ablation record was found for this model.",
    "En iyi ayar": "The best setting",
    "olarak okunuyor.": "is read as",
    "Daha fazla kubit garanti değil": "More qubits are not a guarantee",
    "Yüzey, kubit sayısı ve derinlik arttıkça başarının her zaman artmadığını gösterir. Veri seti ile devre kapasitesi arasında görev bazlı uyum gerekir.": "The surface shows that performance does not necessarily increase as qubit count and depth increase. A task-specific match is required between the dataset and circuit capacity.",
    "Standart sapma, seed değiştiğinde modelin ne kadar değiştiğini gösterir.": "Standard deviation shows how much the model changes when the seed changes.",
    "En kararlı": "Most stable",
    "En değişken": "Most variable",
    "Okuma": "Interpretation",
    "AUROC + std birlikte": "AUROC + std together",
    "AUROC ve seed/tekrar değişkenliği": "AUROC and seed/repetition variability",
    "Tümü": "All",
    "Parametre": "Parameter",
    "Eğitim": "Training",
    "Isı haritası": "Heatmap",
    "Seed": "Seed",
    "Karşılaştırma": "Comparison",
    "PCA / Kodlayıcı": "PCA / Encoder",
    "Kubit kodlama": "Qubit encoding",
    "Deney satırı": "Experiment rows",
    "CSV özeti": "CSV summary",
    "Model kategorisi": "Model categories",
    "klasik / kuantum / hibrit": "classical / quantum / hybrid",
    "Figür": "Figures",
    "galeri manifesti": "gallery manifest",
    "ROC + PR kanıtı": "ROC + PR evidence",
    "eğri çıktısı": "curve output",
    "Kalibrasyon": "Calibration",
    "ECE ve reliability": "ECE and reliability",
    "Seed/tekrar": "Seed/repetition",
    "QSVM sinyali": "QSVM signal",
    "Yok": "None",
    "CSV sıralaması": "CSV ranking",
    "deney": "experiments",
    "kararlılık okuması": "stability reading",
    "parametre skorları": "parameter scores",
    "eğitim eğrileri": "training curves",
    "ısı haritası": "heatmap",
    "radar metrik özeti": "radar metric summary",
    "seed kutu grafiği": "seed boxplot",
    "yöntem karşılaştırması": "method comparison",
    "veri rejimi analizi": "data-regime analysis",
    "tüm yöntemler": "all methods",
    "Bu filtrede figür yok.": "No figure is available for this filter.",
    "tüm yöntem parametreleri": "all method parameters",
    "Kuantum özellik akışı": "Quantum feature flow",
    "Kuantum nedir?": "What is quantum?",
    "QML SEMİNER GÖRSELİ": "QML SEMINAR VISUAL",
    "Ölçüm": "Measurement",
    "klasik skor": "classical score",
    "00 ve 11 birlikte güçlenir": "00 and 11 are jointly amplified",
    "kapasite artar, kararlılık garanti değildir": "capacity increases, stability is not guaranteed",
    "loss -> parametre güncelleme": "loss -> parameter update",
    "1024 bit kimyasal alt yapı izi": "1024-bit chemical substructure trace",
    "marj ve destek vektörleri": "margin and support vectors",
    "yoğun katman akışı": "dense-layer flow",
    "moleküler grafik + dikkat": "molecular graph + attention",
    "moleküler grafik": "molecular graph",
    "ağırlıklı mesaj": "weighted message",
    "dikkatli havuzlama": "attention-aware pooling",
    "kalın bağ = yüksek dikkat ağırlığı": "thick bond = high attention weight",
    "hareketli noktalar = komşuluk mesajı": "moving dots = neighborhood message",
    "GAT komşuları eşit görmez": "GAT does not treat neighbors equally",
    "GNN komşuları toplar ve günceller": "GNN aggregates and updates neighbors",
    "molekül temsili -> sınıf skoru": "molecular representation -> class score",
    "mimarisi": "architecture",
    "çekirdek": "kernel",
    "dondurulmuş kodlayıcı": "frozen encoder",
    "kuantum başlık": "quantum head",
    "SMILES -> RDKit -> ECFP -> PCA/Kodlayıcı -> Kubitler -> Metrikler": "SMILES -> RDKit -> ECFP -> PCA/Encoder -> Qubits -> Metrics",
    "Aynı molekül kaydı klasik çizgide SVM/MLP/GNN'e, kuantum çizgide QSVM/VQC/QGNN'e, hibrit çizgide dondurulmuş MLP + Quantum Head'e ayrılır.": "The same molecular record branches into SVM/MLP/GNN in the classical line, QSVM/VQC/QGNN in the quantum line, and frozen MLP + Quantum Head in the hybrid line.",
    "Bir kubit ölçülmeden önce Bloch küresi üzerinde bir yön gibi düşünülebilir. Yön değiştikçe ölçüm olasılıkları değişir.": "Before measurement, a qubit can be interpreted as a direction on the Bloch sphere. As the direction changes, measurement probabilities change.",
    "Süperpozisyon olasılıkların basit toplamı değil; genlik ve faz birlikte devre içindeki girişimi belirler.": "Superposition is not a simple sum of probabilities; amplitude and phase jointly determine interference inside the circuit.",
    "Modelin sonundaki ölçüm, kuantum durumunu sınıflandırıcıya aktarılabilir klasik istatistiğe çevirir.": "Measurement at the end of the model converts the quantum state into classical statistics that can be transferred to the classifier.",
    "Dolanıklık, tek tek kubitlerden değil ortak durumdan gelen korelasyonu temsil eder. ZZFeatureMap ve kontrollü kapılar bu etkileşimi üretir.": "Entanglement represents correlation arising from the joint state rather than individual qubits. ZZFeatureMap and controlled gates generate this interaction.",
    "Seminer bulgusunda en iyi kubit sayısı ve derinlik veri setine göre değişti: BACE q6-d1, BBBP q4-d1, ClinTox q8-d2.": "In the seminar findings, the best qubit count and depth varied by dataset: BACE q6-d1, BBBP q4-d1, ClinTox q8-d2.",
    "Bu seminerde tüm modeller denetimli ikili sınıflandırma olarak karşılaştırıldı: aynı veri ayrımı, aynı hedef, aynı metrik ailesi.": "In this seminar, all models were compared as supervised binary classifiers: the same data split, the same target, and the same metric family.",
    "SVM, descriptor uzayında sınıfları ayıran en geniş marjlı sınırı arar.": "SVM searches for the widest-margin boundary that separates classes in descriptor space.",
    "MLP, ECFP vektörünü katman katman soyutlayarak doğrusal olmayan karar fonksiyonu üretir.": "MLP abstracts the ECFP vector layer by layer to produce a nonlinear decision function.",
    "Hybrid QHead, klasik kodlayıcı temsilini kuantum başlıkla yeniden işler; seminerde en rekabetçi kuantum-klasik yapı budur.": "Hybrid QHead reprocesses the classical encoder representation with a quantum head; it is the most competitive quantum-classical structure in the seminar.",
    "Klasik bit": "Classical bit",
    "kesin 0/1": "definite 0/1",
    "Kubit": "Qubit",
    "süperpozisyon": "superposition",
    "Bit kesin durum taşır; kubit ölçümden önce genlik ve faz taşır. Seminerde klasik ve kuantum farkı buradan başlar.": "A bit carries a definite state; a qubit carries amplitude and phase before measurement. The classical-quantum distinction in the seminar starts here.",
    "Biyomedikal görev haritası": "Biomedical task map",
    "Satır sayısı + sınıf dengesi + klinik soru birlikte okunur.": "Row count + class balance + clinical question are read together.",
    "eğitim": "training",
    "doğrulama": "validation",
    "test": "test",
    "pozitif": "positive",
    "Temsil dönüşüm katmanı": "Representation transformation layer",
    "Aynı molekül üç model çizgisinde farklı bilgi geometrisine dönüşür.": "The same molecule becomes a different information geometry across the three model lines.",
    "Molekül grafiği": "Molecular graph",
    "atom + bağ": "atom + bond",
    "radius 2 bit vektörü": "radius-2 bit vector",
    "PCA / kodlayıcı": "PCA / encoder",
    "q boyutlu temsil": "q-dimensional representation",
    "Kubit devresi": "Qubit circuit",
    "klasik modeller": "classical models",
    "grafik modeller": "graph models",
    "kuantum modeller": "quantum models",
    "CSV liderlik matrisi": "CSV leaderboard matrix",
    "Her hücre, ilgili veri setinde model ailesinin en iyi AUROC değeridir.": "Each cell is the best AUROC value of the model family for the corresponding dataset.",
    "AUROC ölçeği": "AUROC scale",
    "En yüksek hücre": "Highest cell",
    "En iyi hibrit": "Best hybrid",
    "En iyi kuantum çizgi": "Best quantum line",
    "Hybrid QHead kapasite haritası": "Hybrid QHead capacity map",
    "q ve d arttıkça performansın doğrusal artmadığı ablasyon yüzeyi.": "An ablation surface where performance does not increase linearly with q and d.",
    "en iyi": "best",
    "raporlanan mean±std dağılımı": "reported mean±std distribution",
    "Noktalar ham seed değeri değil; CSV'deki ortalama/std bilgisinin görsel temsilidir.": "The points are not raw seed values; they visually represent the mean/std information in the CSV.",
    "düşük std": "low std",
    "yüksek AUROC": "high AUROC",
    "Seçili veri seti": "Selected dataset",
    "En düşük std": "Lowest std",
    "En yüksek std": "Highest std",
    "ayrımları": "splits",
    "Sınıf dağılımı": "Class distribution",
    "yorumu": "interpretation",
    "En iyi konfigürasyon": "Best configuration",
    "olarak raporlandı.": "was reported.",
    "Görev bazlı kapasite uyumu": "Task-specific capacity fit",
    "Veri yok": "No data",
    "Bu model için ablasyon kaydı bulunamadı.": "No ablation record was found for this model.",
    "En iyi ayar": "Best setting",
    "olarak okunuyor.": "is read as the best setting.",
    "Daha fazla kubit garanti değil": "More qubits are not guaranteed to help",
    "Standart sapma, seed değiştiğinde modelin ne kadar değiştiğini gösterir.": "Standard deviation shows how much the model changes when the seed changes.",
    "En kararlı": "Most stable",
    "En değişken": "Most variable",
    "Okuma": "Reading",
    "AUROC + std birlikte": "AUROC + std together",
    "ClinTox üzerinde AUROC yakın; eşik bağımlı metrikler ayrıştırıcı.": "AUROC is close on ClinTox; threshold-dependent metrics separate the models.",
    "Tümü": "All",
    "Parametre": "Parameter",
    "Eğitim": "Training",
    "Radar": "Radar",
    "Karşılaştırma": "Comparison"
  }
};

let currentLanguage = (() => {
  try {
    return localStorage.getItem("qmlSeminarLanguage") === "en" ? "en" : "tr";
  } catch (error) {
    return "tr";
  }
})();
let languageObserver = null;
let languageApplyQueued = false;
let isApplyingLanguage = false;
const originalTextNodes = new WeakMap();
const i18nAttributes = ["aria-label", "alt", "title", "placeholder", "content"];

function normalizeI18nText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function translateDynamicText(text) {
  if (currentLanguage !== "en") return text;
  const splitMatch = text.match(/^(eğitim|doğrulama|test) (.+)$/);
  if (splitMatch) {
    return `${tx(splitMatch[1])} ${splitMatch[2]}`;
  }
  const parentheticalMatch = text.match(/^(.+) \((\d+)\)$/);
  if (parentheticalMatch) {
    const translatedBase = tx(parentheticalMatch[1]);
    if (translatedBase !== parentheticalMatch[1]) return `${translatedBase} (${parentheticalMatch[2]})`;
  }
  const replacements = [
    [/^(.+) için model sıralaması$/, "$1 model ranking"],
    [/^(.+) yorumu$/, "$1 interpretation"],
    [/^(.+) hibrit yorumu$/, "$1 hybrid interpretation"],
    [/^(.+) kararlılık okuması$/, "$1 stability interpretation"],
    [/^(.+) mimarisi$/, "$1 architecture"],
    [/^(.+) · AUROC ve seed\/tekrar değişkenliği$/, "$1 · AUROC and seed/repetition variability"],
    [/^(.+) ablasyon · (.+)$/, "$1 ablation · $2"],
    [/^(.+) · (\d+) satır$/, "$1 · $2 rows"],
    [/^(\d+) deney$/, "$1 experiments"],
    [/^(\d+) kategori satırı CSV'den okunur$/, "$1 category rows are read from CSV"],
    [/^En iyi konfigürasyon$/, "The best configuration"],
    [/^olarak raporlandı\\.$/, "was reported."],
  ];
  for (const [pattern, replacement] of replacements) {
    if (pattern.test(text)) return text.replace(pattern, replacement);
  }
  return text;
}

function tx(value) {
  const raw = String(value ?? "");
  if (currentLanguage === "tr") return raw;
  const normalized = normalizeI18nText(raw);
  if (!normalized) return raw;
  return i18n.en[normalized] || translateDynamicText(normalized);
}

function preserveWhitespace(original, translated) {
  const leading = original.match(/^\s*/)?.[0] || "";
  const trailing = original.match(/\s*$/)?.[0] || "";
  return `${leading}${translated}${trailing}`;
}

function translateTextNode(node) {
  if (!node.parentElement || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.parentElement.tagName)) return;
  if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
  const original = originalTextNodes.get(node);
  const normalized = normalizeI18nText(original);
  if (!normalized) return;
  node.nodeValue = currentLanguage === "tr" ? original : preserveWhitespace(original, tx(original));
}

function originalAttributeName(attr) {
  return `data-i18n-original-${attr.replace(/[^a-z0-9]/gi, "-")}`;
}

function translateElementAttributes(root) {
  const elements = [root, ...root.querySelectorAll("*")].filter((node) => node.nodeType === Node.ELEMENT_NODE);
  elements.forEach((element) => {
    i18nAttributes.forEach((attr) => {
      if (!element.hasAttribute(attr)) return;
      const originalAttr = originalAttributeName(attr);
      if (!element.hasAttribute(originalAttr)) element.setAttribute(originalAttr, element.getAttribute(attr));
      const original = element.getAttribute(originalAttr);
      element.setAttribute(attr, currentLanguage === "tr" ? original : tx(original));
    });
  });
}

function applyLanguageToDocument() {
  isApplyingLanguage = true;
  document.documentElement.lang = currentLanguage;
  document.title = tx("Medikal Veri Analizinde Klasik ve Kuantum Makine Öğrenmesi Modellerinin İncelenmesi");
  document.querySelector('meta[name="description"]')?.setAttribute("content", tx("Medikal veri analizinde klasik ve kuantum makine öğrenmesi modellerinin moleküler özellik tahmini üzerindeki karşılaştırmalı seminer anlatımı."));

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(translateTextNode);
  translateElementAttributes(document.documentElement);
  updateLanguageButtons();
  isApplyingLanguage = false;
}

function scheduleLanguageApply() {
  if (isApplyingLanguage || currentLanguage === "tr" || languageApplyQueued) return;
  languageApplyQueued = true;
  requestAnimationFrame(() => {
    languageApplyQueued = false;
    applyLanguageToDocument();
  });
}

function initLanguageObserver() {
  if (languageObserver) return;
  languageObserver = new MutationObserver(() => scheduleLanguageApply());
  languageObserver.observe(document.body, { childList: true, characterData: true, subtree: true });
}

function updateLanguageButtons() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentLanguage));
  });
}

function redrawLanguageCanvases() {
  drawHeroQuantumCanvas();
  drawQuantumConceptCanvas();
  drawClassicalVisualCanvas();
  drawModelArchitectureCanvas();
  drawDatasetMeaningCanvas();
  drawDataRepresentationCanvas();
  drawExperimentMatrixCanvas();
  drawResearchMapCanvas();
  drawMoleculeJourneyCanvas();
  drawMetricLabCanvas();
  drawCapacityCanvas();
  drawAblationCubeCanvas();
  drawStabilityCanvas();
  drawSeedDistributionCanvas();
}

function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "tr";
  try {
    localStorage.setItem("qmlSeminarLanguage", currentLanguage);
  } catch (error) {
    // Local storage may be unavailable in a restricted browser context.
  }
  rerenderLocalizedContent();
  applyLanguageToDocument();
  redrawLanguageCanvases();
}

function initLanguageControls() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
  applyLanguageToDocument();
  initLanguageObserver();
}

function localizeCanvasContext(ctx) {
  if (ctx.__i18nFillTextWrapped) return;
  const nativeFillText = ctx.fillText.bind(ctx);
  ctx.fillText = (text, x, y, maxWidth) => {
    if (typeof maxWidth === "number") return nativeFillText(tx(text), x, y, maxWidth);
    return nativeFillText(tx(text), x, y);
  };
  ctx.__i18nFillTextWrapped = true;
}

function rerenderLocalizedContent() {
  renderDatasetCards();
  renderModelFamilies();
  renderClassicalVisuals();
  renderDataCockpit();
  renderExperimentMatrixNote();
  renderQuantumConcepts();
  renderModelArchitecture();
  renderJourneyNote();
  renderResults();
  renderHybrid();
  renderAblationControls();
  renderAblationNote();
  renderStabilityControls();
  renderStabilityNote();
  renderSeedDistributionNote();
  renderClinToxCompare();
  renderGallery();
  renderLimitations();
}

const datasets = {
  bace: {
    label: "BACE",
    task: "BACE-1 inhibitör sınıflandırması",
    note: "Dengeliye yakın ikili sınıflandırma",
    splits: { train: 1211, val: 151, test: 152 },
    classes: { train: "0: 582 / 1: 629", val: "0: 82 / 1: 69", test: "0: 83 / 1: 69" },
    accent: "#00a6c8",
  },
  bbbp: {
    label: "BBBP",
    task: "Kan-beyin bariyeri geçiş tahmini",
    note: "Pozitif sınıf baskın",
    splits: { train: 1631, val: 204, test: 204 },
    classes: { train: "0: 383 / 1: 1248", val: "0: 48 / 1: 156", test: "0: 48 / 1: 156" },
    accent: "#24a148",
  },
  clintox: {
    label: "ClinTox",
    task: "Klinik toksisite tahmini",
    note: "Belirgin sınıf dengesizliği",
    splits: { train: 1184, val: 148, test: 148 },
    classes: { train: "0: 1094 / 1: 90", val: "0: 137 / 1: 11", test: "0: 137 / 1: 11" },
    accent: "#e65f4f",
  },
};

const modelFamilies = [
  {
    title: "Klasik descriptor tabanlı",
    tag: "ECFP",
    color: "#00a6c8",
    text: "SVM ve MLP, radius 2 ve 1024 bit ECFP/Morgan parmak izleri üzerinde güçlü klasik referans çizgisini oluşturur.",
    points: ["SVM: marj tabanlı karar sınırı", "MLP: doğrusal olmayan descriptor temsili", "BACE ve BBBP için güçlü ana karşılaştırma"],
  },
  {
    title: "Klasik grafik",
    tag: "GNN / GAT",
    color: "#24a148",
    text: "Moleküller atomları düğüm, bağları kenar olan grafikler olarak ele alınır; mesaj geçirme ve dikkat mekanizması kullanılır.",
    points: ["GNN: komşuluk mesajları", "GAT: öğrenilebilir dikkat katsayıları", "BBBP ve ClinTox üzerinde anlamlı sinyal"],
  },
  {
    title: "Saf kuantum descriptor hattı",
    tag: "QSVM / VQC",
    color: "#7b61ff",
    text: "ECFP özellikleri PCA ile kubit sayısına indirgenir; QSVM kuantum çekirdek, VQC parametrik devre yaklaşımı kullanır.",
    points: ["QSVM, VQC'ye göre daha kararlı", "q6 ayarı BACE, BBBP ve ClinTox için öne çıktı", "Klasik referansların gerisinde kaldı"],
  },
  {
    title: "Kuantum grafik",
    tag: "QGNN",
    color: "#c93d8d",
    text: "Grafik temsili ile parametrik kuantum mesaj geçirme fikrini bir araya getiren araştırma modelidir.",
    points: ["BACE üzerinde değişken", "BBBP ve ClinTox üzerinde ayırt etme sinyali", "Olgun üstünlük iddiası değil"],
  },
  {
    title: "Hibrit kuantum başlık",
    tag: "Dondurulmuş MLP + QHead",
    color: "#e0a100",
    text: "Dondurulmuş MLP kodlayıcı kompakt bir gömme temsil üretir; Quantum Head bu temsil üzerinde parametrik devre tabanlı karar katmanı kurar.",
    points: ["BACE q6-d1: 0.9914 AUROC", "BBBP q4-d1: 0.9444 AUROC", "ClinTox q8-d2: 0.8804 AUROC"],
  },
  {
    title: "Metrik ailesi",
    tag: "AUROC + PR-AUC",
    color: "#e65f4f",
    text: "Ana metrik AUROC'tur; dengesiz görevlerde PR-AUC, F1, MCC, duyarlılık ve özgüllük birlikte yorumlanır.",
    points: ["ClinTox tek metrikle okunmaz", "Seed/tekrar ortalaması ve standart sapma raporlandı", "SVM sonuçları deterministik değerlerdir"],
  },
];

const classicalVisuals = [
  {
    key: "svm",
    label: "SVM",
    family: "descriptor tabanlı klasik çizgi",
    color: "#00a6c8",
    title: "SVM: ECFP uzayında en geniş marjı bulur",
    summary: "SMILES verisi Morgan/ECFP parmak izine çevrilir. SVM bu yüksek boyutlu vektörde iki sınıfı ayıran karar sınırını ve destek vektörlerini kullanır.",
    facts: [
      ["Girdi", "Radius 2, 1024 bit ECFP/Morgan parmak izi"],
      ["Karar fikri", "Marjı büyüten sınır ve destek vektörleri"],
      ["Seminer yorumu", "BBBP için güçlü klasik referans çizgisi"],
    ],
  },
  {
    key: "mlp",
    label: "MLP",
    family: "descriptor tabanlı sinir ağı",
    color: "#00a6c8",
    title: "MLP: sabit descriptor vektöründen karar fonksiyonu öğrenir",
    summary: "ECFP vektörü yoğun katmanlardan geçer; aktivasyon ve dropout ile doğrusal olmayan bir temsil oluşur, son katman sınıf skorunu üretir.",
    facts: [
      ["Girdi", "Sabit uzunluklu ECFP vektörü"],
      ["Karar fikri", "Yoğun katmanlar + aktivasyon + sigmoid"],
      ["Seminer yorumu", "BACE ve ClinTox için güçlü klasik karşılaştırma"],
    ],
  },
  {
    key: "gnn",
    label: "GNN",
    family: "klasik grafik öğrenme",
    color: "#24a148",
    title: "GNN: atom komşuluklarından mesaj toplayarak molekülü temsil eder",
    summary: "Molekül, atom düğümleri ve bağ kenarları olan grafik olarak okunur. Mesaj geçirme katmanları komşu atom bilgisini birleştirir ve grafik havuzlama molekül temsilini çıkarır.",
    facts: [
      ["Girdi", "Atom düğümleri, bağ kenarları ve atom özellikleri"],
      ["Karar fikri", "Mesaj geçirme + grafik havuzlama"],
      ["Seminer yorumu", "BBBP ve ClinTox üzerinde anlamlı grafik sinyali"],
    ],
  },
  {
    key: "gat",
    label: "GAT",
    family: "dikkat tabanlı grafik öğrenme",
    color: "#24a148",
    title: "GAT: her komşunun etkisini dikkat ağırlığıyla ayarlar",
    summary: "GAT, GNN mesajlarını eşit ağırlıkla toplamak yerine komşu atomların katkısını öğrenilebilir dikkat katsayılarıyla tartar.",
    facts: [
      ["Girdi", "Moleküler grafik ve komşuluk ilişkileri"],
      ["Karar fikri", "alpha dikkat katsayılarıyla ağırlıklı mesaj"],
      ["Seminer yorumu", "ClinTox için güçlü klasik grafik alternatifi"],
    ],
  },
];

const quantumConcepts = [
  {
    key: "qubit",
    label: "Kubit",
    title: "Kubit nedir?",
    accent: "#00a6c8",
    summary: "Kubit, klasik bit gibi yalnızca 0 veya 1 değildir; ölçülene kadar iki temel durumun karmaşık katsayılı birleşimi olarak temsil edilir.",
    facts: [
      ["Durum", "|psi> = alpha|0> + beta|1>"],
      ["Koşul", "|alpha|^2 + |beta|^2 = 1"],
      ["Seminerdeki rol", "ECFP/PCA özellikleri kubit durumlarına kodlandı"],
    ],
  },
  {
    key: "superposition",
    label: "Süperpozisyon",
    title: "Süperpozisyon nasıl okunur?",
    accent: "#7b61ff",
    summary: "Süperpozisyon, bir kubitin ölçümden önce birden fazla olası sonucu aynı anda taşıyan olasılık genliği durumudur.",
    facts: [
      ["Genlik", "alpha ve beta ölçüm olasılığını belirler"],
      ["Faz", "Aynı olasılık farklı girişim davranışı üretebilir"],
      ["Model etkisi", "Özellik haritası klasik veriyi kuantum genliklerine taşır"],
    ],
  },
  {
    key: "measurement",
    label: "Ölçüm",
    title: "Ölçüm neden kritik?",
    accent: "#e0a100",
    summary: "Kuantum devre sonunda ölçüm yapıldığında sürekli durum, klasik modele aktarılabilecek ayrık istatistiklere dönüşür.",
    facts: [
      ["Çıkış", "Beklenen değer veya ölçüm frekansı"],
      ["Karar", "Sigmoid / margin / sınıf olasılığı"],
      ["Metrik", "AUROC, PR-AUC, F1 ve MCC ile okunur"],
    ],
  },
  {
    key: "entanglement",
    label: "Dolanıklık",
    title: "Dolanıklık ne sağlar?",
    accent: "#c93d8d",
    summary: "Dolanıklık, kubitlerin bağımsız okunamayacak biçimde ortak bir durum üretmesidir; özellikler arası etkileşimleri temsil etmek için kullanılır.",
    facts: [
      ["Bağ", "Kontrollü kapılar kubitleri korele eder"],
      ["Yorum", "Özellik çiftleri arasında doğrusal olmayan ilişki"],
      ["Risk", "Küçük veride yüksek kapasite kararsızlık yaratabilir"],
    ],
  },
  {
    key: "depth",
    label: "Derinlik",
    title: "Devre derinliği neyi değiştirir?",
    accent: "#e65f4f",
    summary: "Derinlik, ardışık kuantum kapı katmanı sayısıdır. Daha derin devre daha esnek olabilir, ancak küçük veri ve gürültü altında her zaman daha iyi değildir.",
    facts: [
      ["d=1", "Daha yalın, daha kontrollü kapasite"],
      ["d=2", "Daha fazla etkileşim ve parametre"],
      ["Bulgular", "En iyi derinlik veri setine göre değişti"],
    ],
  },
  {
    key: "supervised",
    label: "Denetimli öğrenme",
    title: "Seminerde öğrenme problemi nasıl kuruldu?",
    accent: "#24a148",
    summary: "BACE, BBBP ve ClinTox ikili sınıflandırma görevleri olarak ele alındı; model, molekülden etikete giden karar fonksiyonunu öğrenir.",
    facts: [
      ["Girdi", "SMILES, ECFP veya moleküler grafik"],
      ["Hedef", "0/1 sınıf etiketi"],
      ["Değerlendirme", "Aynı veri ayrımı ve metrik ailesiyle karşılaştırma"],
    ],
  },
];

const architectureModels = [
  {
    key: "svm",
    label: "SVM",
    family: "klasik descriptor tabanlı",
    color: "#00a6c8",
    summary: "ECFP/Morgan parmak izleri üzerinde marj tabanlı karar sınırı kurar ve küçük-orta veri rejiminde güçlü referans üretir.",
    blocks: ["SMILES", "ECFP 1024", "Ölçekleme", "SVM marjı", "Karar skoru"],
    facts: [["Girdi", "Radius 2 Morgan parmak izi"], ["Yapı", "Marj maksimizasyonu"], ["Seminer rolü", "BBBP için en güçlü ana referans"]],
  },
  {
    key: "mlp",
    label: "MLP",
    family: "klasik descriptor tabanlı",
    color: "#00a6c8",
    summary: "ECFP vektörünü yoğun katmanlardan geçirerek doğrusal olmayan descriptor temsili öğrenir.",
    blocks: ["SMILES", "ECFP 1024", "Yoğun katman + aktivasyon", "Dropout", "Sigmoid"],
    facts: [["Girdi", "Sabit uzunluklu descriptor"], ["Yapı", "Çok katmanlı algılayıcı"], ["Seminer rolü", "BACE ve ClinTox için güçlü klasik çizgi"]],
  },
  {
    key: "gnn",
    label: "GNN",
    family: "klasik grafik",
    color: "#24a148",
    summary: "Molekülü atom düğümleri ve bağ kenarları olarak işler; komşuluk mesajlarını toplayarak grafik temsili üretir.",
    blocks: ["Moleküler grafik", "Atom özellikleri", "Mesaj geçirme", "Grafik havuzlama", "Sınıflandırıcı"],
    facts: [["Girdi", "Atom-bağ grafiği"], ["Yapı", "Komşuluk mesajları"], ["Seminer rolü", "BBBP ve ClinTox için anlamlı grafik sinyali"]],
  },
  {
    key: "gat",
    label: "GAT",
    family: "klasik grafik",
    color: "#24a148",
    summary: "GNN çizgisini dikkat katsayılarıyla genişletir; her komşunun katkısını öğrenilebilir ağırlıklarla ayarlar.",
    blocks: ["Moleküler grafik", "Dikkat başlığı", "Ağırlıklı mesaj", "Grafik havuzlama", "Sınıflandırıcı"],
    facts: [["Girdi", "Moleküler grafik"], ["Yapı", "Öğrenilebilir dikkat"], ["Seminer rolü", "ClinTox üzerinde güçlü grafik alternatifi"]],
  },
  {
    key: "qsvm",
    label: "QSVM",
    family: "saf kuantum descriptor hattı",
    color: "#7b61ff",
    summary: "ECFP özellikleri PCA ile kubit boyutuna indirilir; kuantum özellik haritası ile çekirdek matrisi hesaplanır.",
    blocks: ["ECFP", "PCA q", "ZZFeatureMap", "Kuantum çekirdek", "SVM"],
    facts: [["Girdi", "PCA ile q boyutlu descriptor"], ["Yapı", "Kuantum çekirdek"], ["Seminer rolü", "VQC'ye göre daha kararlı saf kuantum çizgi"]],
  },
  {
    key: "vqc",
    label: "VQC",
    family: "saf kuantum descriptor hattı",
    color: "#7b61ff",
    summary: "Özellik haritasından sonra parametrik ansatz çalışır; ölçüm çıktısı sınıf olasılığına dönüştürülür.",
    blocks: ["ECFP", "PCA q", "Özellik haritası", "Ansatz theta", "Ölçüm"],
    facts: [["Girdi", "Kubit sayısına indirgenmiş özellik"], ["Yapı", "Parametrik kuantum devre"], ["Seminer rolü", "Saf kuantum deneme ailesi"]],
  },
  {
    key: "qgnn",
    label: "QGNN",
    family: "kuantum grafik",
    color: "#c93d8d",
    summary: "Grafik temsili ile kuantum mesaj geçirme fikrini birleştirir; araştırma amaçlı, değişken ama öğretici bir modeldir.",
    blocks: ["Grafik", "Düğüm gömmesi", "Kuantum mesaj", "Havuzlama", "Sınıflandırıcı"],
    facts: [["Girdi", "Moleküler grafik"], ["Yapı", "Grafik + kuantum katman"], ["Seminer rolü", "Bazı görevlerde ayırt etme sinyali"]],
  },
  {
    key: "hybrid",
    label: "Hybrid QHead",
    family: "hibrit kuantum-klasik",
    color: "#e0a100",
    summary: "Klasik MLP kodlayıcı dondurulur; kompakt gömme temsil, Quantum Head içinde parametrik devreyle karar skoruna çevrilir.",
    blocks: ["ECFP", "MLP kodlayıcı", "Dondurulmuş temsil", "Quantum Head", "Sınıflandırıcı"],
    facts: [["Girdi", "Klasik kodlayıcı temsili"], ["Yapı", "Dondurulmuş kodlayıcı + PQC başlık"], ["Seminer rolü", "BACE, BBBP ve ClinTox'ta rekabetçi hibrit aile"]],
  },
];

const leaderboard = {
  bace: [
    ["Hybrid QHead q6-d1", "hybrid", 0.9913741924, 0.0027355552, 0.9688842326, 0.9654872872],
    ["Hybrid QHead q4-d1", "hybrid", 0.9909202025, 0.0053841531, 0.9674349572, 0.9640073283],
    ["MLP", "classical", 0.9904662127, 0.0033324730, 0.9703335079, 0.9669662129],
    ["Hybrid QHead q8-d2", "hybrid", 0.9890693208, 0.0034138221, 0.9761306094, 0.9728875380],
    ["SVM", "classical", 0.9631569757, 0.0, 0.8576916361, 0.8472222222],
    ["QSVM q6", "quantum", 0.8741400384, 0.0273596536, 0.7845119609, 0.7608914627],
    ["GNN", "graph", 0.8360048891, 0.0351019302, 0.7402479483, 0.7377846658],
    ["GAT", "graph", 0.7982189628, 0.0049628996, 0.7104941505, 0.7288525837],
    ["VQC q6", "quantum", 0.6413829230, 0.0490304461, 0.6039462197, 0.5277999170],
    ["QGNN", "quantumGraph", 0.6072987603, 0.1142182857, 0.5259821896, 0.6302113872],
  ],
  bbbp: [
    ["SVM", "classical", 0.9706196581, 0.0, 0.9030448718, 0.96875],
    ["MLP", "classical", 0.9563835470, 0.0107165462, 0.6951923077, 0.9142588674],
    ["Hybrid QHead q4-d1", "hybrid", 0.9444444444, 0.0064794388, 0.8945512821, 0.9616646568],
    ["GNN", "graph", 0.9434027778, 0.0062430334, 0.8538461538, 0.9413548332],
    ["Hybrid QHead q6-d2", "hybrid", 0.9407852564, 0.0074411454, 0.8785256410, 0.9575291172],
    ["GAT", "graph", 0.9168803419, 0.0050723959, 0.7828525641, 0.9293595768],
    ["QGNN", "quantumGraph", 0.8995459402, 0.0325672282, 0.8285256410, 0.9371881082],
    ["QSVM q6", "quantum", 0.8521634615, 0.0357807907, 0.7730769231, 0.9081979053],
    ["VQC q6", "quantum", 0.6282051282, 0.0712835328, 0.6112179487, 0.8206411399],
  ],
  clintox: [
    ["Hybrid QHead q8-d2", "hybrid", 0.8804246848, 0.0157499707, 0.6588586596, 0.3937434868],
    ["MLP", "classical", 0.8801592568, 0.0188836681, 0.5255474453, 0.1461756949],
    ["Hybrid QHead q8-d1", "hybrid", 0.8775049768, 0.0180539827, 0.6988055740, 0.4057985598],
    ["Hybrid QHead q4-d1", "hybrid", 0.8427339084, 0.0444046849, 0.7420703384, 0.4763478261],
    ["GAT", "graph", 0.8191108162, 0.0414157001, 0.7498341075, 0.2599588710],
    ["GNN", "graph", 0.8152621102, 0.0551962621, 0.7298606503, 0.3402100489],
    ["QGNN", "quantumGraph", 0.7581950896, 0.1349842974, 0.7077637691, 0.2828646934],
    ["SVM", "classical", 0.7571333776, 0.0, 0.6214333112, 0.2222222222],
    ["QSVM q6", "quantum", 0.7053749171, 0.0453331949, 0.6556403446, 0.2526806527],
    ["VQC q2", "quantum", 0.6302587923, 0.0353326460, 0.5, 0.1383647799],
  ],
};

const hybridAblation = {
  bace: [
    [4, 1, 0.9909202025, 0.0053841531, 0.9674349572, 0.9640073283],
    [4, 2, 0.9884756417, 0.0066855910, 0.9732320587, 0.9698851792],
    [6, 1, 0.9913741924, 0.0027355552, 0.9688842326, 0.9654872872],
    [6, 2, 0.9868692160, 0.0033865627, 0.9746813340, 0.9713865868],
    [8, 1, 0.9836214423, 0.0070343946, 0.9688842326, 0.9655087359],
    [8, 2, 0.9890693208, 0.0034138221, 0.9761306094, 0.9728875380],
  ],
  bbbp: [
    [4, 1, 0.9444444444, 0.0064794388, 0.8945512821, 0.9616646568],
    [4, 2, 0.9277644231, 0.0199808552, 0.8799679487, 0.9574565656],
    [6, 1, 0.9365918803, 0.0124097152, 0.8818910256, 0.9594146676],
    [6, 2, 0.9407852564, 0.0074411454, 0.8785256410, 0.9575291172],
    [8, 1, 0.9349225427, 0.0150877152, 0.8833333333, 0.9593641260],
    [8, 2, 0.9375133547, 0.0119067026, 0.8883012821, 0.9598622969],
  ],
  clintox: [
    [4, 1, 0.8427339084, 0.0444046849, 0.7420703384, 0.4763478261],
    [4, 2, 0.8303915063, 0.0939523275, 0.6355673524, 0.3265840072],
    [6, 1, 0.8285335103, 0.0899225259, 0.7213669542, 0.4712334309],
    [6, 2, 0.8165228932, 0.0992133695, 0.7322495023, 0.4609523810],
    [8, 1, 0.8775049768, 0.0180539827, 0.6988055740, 0.4057985598],
    [8, 2, 0.8804246848, 0.0157499707, 0.6588586596, 0.3937434868],
  ],
};

const colors = {
  classical: "#00a6c8",
  graph: "#24a148",
  quantum: "#7b61ff",
  quantumGraph: "#c93d8d",
  hybrid: "#e0a100",
};

const dataSources = {
  benchmark: "data/molecular_benchmark_summary.csv",
  leaderboard: "data/molecular_leaderboard.csv",
  figures: "data/figure_manifest.json",
};

const categoryLabels = {
  classical_descriptor: "klasik descriptor tabanlı",
  classical_graph: "klasik grafik",
  classical_ablation: "klasik veri ablasyonu",
  quantum_descriptor: "saf kuantum descriptor hattı",
  quantum_graph: "kuantum grafik",
  quantum_ablation: "kuantum veri ablasyonu",
  quantum_data_ablation: "kuantum veri ablasyonu",
  hybrid_quantum_descriptor: "hibrit kuantum başlık",
};

const taskOrder = ["bace", "bbbp", "clintox"];
const modelOrder = ["svm", "mlp", "gnn", "gat", "qsvm", "vqc", "qgnn", "hybrid_qhead"];
const experimentMatrixModels = [
  { key: "svm", label: "SVM", family: "classical" },
  { key: "mlp", label: "MLP", family: "classical" },
  { key: "gnn", label: "GNN", family: "graph" },
  { key: "gat", label: "GAT", family: "graph" },
  { key: "qsvm", label: "QSVM", family: "quantum" },
  { key: "vqc", label: "VQC", family: "quantum" },
  { key: "qgnn", label: "QGNN", family: "quantumGraph" },
  { key: "hybrid_qhead", label: "Hybrid", family: "hybrid" },
];
const representativeSeedOffsets = [-0.92, -0.42, 0.05, 0.48, 0.88];

const journeySteps = [
  ["SMILES", "Molekül metinsel kimyasal dize olarak alınır."],
  ["RDKit", "Geçerli molekül nesnesi, atom ve bağ bilgisi üretilir."],
  ["ECFP", "Radius 2 ve 1024 bit Morgan parmak izi çıkarılır."],
  ["PCA / Kodlayıcı", "Klasik temsil kubit sayısına veya gömme uzayına sıkıştırılır."],
  ["Kubit kodlama", "Özellikler AngleEmbedding veya ZZFeatureMap ile devreye girer."],
  ["Ölçüm", "Beklenen değerler klasik skor ve metriklere çevrilir."],
];

const metricLabModels = {
  hybrid: {
    label: "Hybrid QHead q8-d2",
    color: "#e0a100",
    anchor: { sensitivity: 0.5455, specificity: 0.7723, f1: 0.3937, mcc: 0.3425, balanced: 0.6589 },
  },
  mlp: {
    label: "MLP",
    color: "#e65f4f",
    anchor: { sensitivity: 1.0, specificity: 0.0511, f1: 0.1462, mcc: 0.0315, balanced: 0.5255 },
  },
};

const limitations = [
  ["SVM", "Tek çalıştırma", "SVM sonuçları mevcut deney kayıtlarında tek çalıştırma değeridir; çoklu seed güvenilirliği diğer modeller kadar güçlü değildir."],
  ["ClinTox", "Dengesiz veri", "AUROC yüksek olsa bile F1, MCC, duyarlılık ve özgüllük birlikte okunmalıdır."],
  ["QML", "NISQ gerçekliği", "Sınırlı kubit sayısı, devre derinliği, gürültü ve ölçüm maliyeti kuantum modellerin pratik sınırlarıdır."],
  ["QGNN", "Dikkatli adlandırma", "QGNN saf kuantum model olarak değil, kuantum grafik veya hibritize grafik araştırma hattı olarak sunulmalıdır."],
  ["BACE/ClinTox", "Küçük fark", "Hybrid QHead ile MLP arasındaki AUROC farkları çok küçük olduğu için istatistiksel güvenilirlik vurgusu gerekir."],
  ["Sayfa", "Kaynak tutarlılığı", "Yeni paneller CSV ve figür manifestinden beslendiği için sonuç dosyaları değişirse sayfa da güncellenebilir."],
];

let selectedDataset = "bace";
let selectedHybrid = "bace";
let selectedConcept = "qubit";
let selectedClassicalVisual = "svm";
let selectedArchitecture = "svm";
let selectedMetricLabModel = "hybrid";
let selectedAblationModel = "hybrid_qhead";
let selectedAblationTask = "bace";
let selectedStabilityTask = "bace";
let selectedGalleryTask = "all";
let selectedGalleryKind = "all";
let selectedGalleryIndex = 0;
let chartAnimation = 0;
let conceptFrame = 0;
let classicalFrame = 0;
let architectureFrame = 0;
let extendedFrame = 0;
let benchmarkRows = [];
let liveLeaderboardRows = [];
let figureManifest = [];

function formatMetric(value, digits = 4) {
  return Number(value).toFixed(digits);
}

function toNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

async function fetchText(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Cannot load ${path}`);
  return response.text();
}

function parseCsv(text) {
  const rows = [];
  let field = "";
  let row = [];
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field);
      if (row.some((item) => item !== "")) rows.push(row);
      field = "";
      row = [];
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  const headers = rows.shift() || [];
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

async function loadLiveData() {
  try {
    const [benchmarkText, leaderboardText, figureResponse] = await Promise.all([
      fetchText(dataSources.benchmark),
      fetchText(dataSources.leaderboard),
      fetch(dataSources.figures, { cache: "no-store" }),
    ]);
    benchmarkRows = parseCsv(benchmarkText);
    liveLeaderboardRows = parseCsv(leaderboardText);
    figureManifest = figureResponse.ok ? await figureResponse.json() : [];
  } catch (error) {
    benchmarkRows = [];
    liveLeaderboardRows = [];
    figureManifest = [];
  }
}

function familyKeyFromCategory(category) {
  if (category === "classical_descriptor") return "classical";
  if (category === "classical_graph") return "graph";
  if (category === "hybrid_quantum_descriptor") return "hybrid";
  if (category === "quantum_graph") return "quantumGraph";
  return "quantum";
}

function modelLabelFromRow(row) {
  const base = row.model === "hybrid_qhead" ? "Hybrid QHead" : (row.model || "").toUpperCase();
  const q = row.n_qubits ? ` q${row.n_qubits}` : "";
  const d = row.circuit_depth ? `-d${row.circuit_depth}` : "";
  return `${base}${q}${d}`;
}

function getLeaderboardRowsForTask(task) {
  if (liveLeaderboardRows.length) {
    return liveLeaderboardRows
      .filter((row) => row.task === task)
      .sort((a, b) => toNumber(a.rank_in_task) - toNumber(b.rank_in_task))
      .map((row) => [
        modelLabelFromRow(row),
        familyKeyFromCategory(row.category),
        toNumber(row.auroc_mean),
        toNumber(row.primary_metric_std),
        toNumber(row.balanced_accuracy_mean),
        toNumber(row.f1_mean),
        row,
      ]);
  }
  return leaderboard[task];
}

function getBenchmarkRows({ task, model, category } = {}) {
  return benchmarkRows.filter((row) => {
    if (task && row.task !== task) return false;
    if (model && row.model !== model) return false;
    if (category && row.category !== category) return false;
    return true;
  });
}

function taskLabel(task) {
  return datasets[task]?.label || task.toUpperCase();
}

function fitCanvas(canvas, heightRatio = 0.54, minHeight = 320) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(320, rect.width);
  const height = Math.max(minHeight, width * heightRatio);
  const pixelWidth = Math.floor(width * dpr);
  const pixelHeight = Math.floor(height * dpr);
  if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
  if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  localizeCanvasContext(ctx);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function fitFixedCanvas(canvas, minWidth = 320, minHeight = 320) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(minWidth, rect.width || minWidth);
  const height = Math.max(minHeight, rect.height || minHeight);
  const pixelWidth = Math.floor(width * dpr);
  const pixelHeight = Math.floor(height * dpr);
  if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
  if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
  const ctx = canvas.getContext("2d");
  localizeCanvasContext(ctx);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function parseClassCounts(value) {
  const result = { "0": 0, "1": 0 };
  String(value || "").replace(/([01]):\s*(\d+)/g, (_, label, count) => {
    result[label] = Number(count);
    return "";
  });
  return result;
}

function testClassStats(task) {
  const counts = parseClassCounts(datasets[task].classes.test);
  const total = counts["0"] + counts["1"];
  return {
    negative: counts["0"],
    positive: counts["1"],
    total,
    positiveRatio: total ? counts["1"] / total : 0,
  };
}

function matrixRowMatches(row, key) {
  const raw = row[6] || {};
  const model = raw.model || "";
  const name = row[0] || "";
  if (model) return model === key;
  if (key === "hybrid_qhead") return name.startsWith("Hybrid QHead");
  if (key === "qsvm") return name.startsWith("QSVM");
  if (key === "vqc") return name.startsWith("VQC");
  if (key === "qgnn") return name.startsWith("QGNN");
  return name === key.toUpperCase() || name.startsWith(`${key.toUpperCase()} `);
}

function bestMatrixCell(task, modelKey) {
  const candidates = getLeaderboardRowsForTask(task)
    .filter((row) => matrixRowMatches(row, modelKey))
    .sort((a, b) => b[2] - a[2]);
  return candidates[0] || null;
}

function matrixCells() {
  return taskOrder.flatMap((task) => experimentMatrixModels.map((model) => ({
    task,
    model,
    row: bestMatrixCell(task, model.key),
  })));
}

function modelShortLabel(name, max = 18) {
  const label = String(name || "").replace("Hybrid QHead", "HQ");
  return label.length > max ? `${label.slice(0, max - 1)}…` : label;
}

function renderDatasetCards() {
  const target = document.getElementById("datasetCards");
  target.innerHTML = Object.entries(datasets).map(([key, item]) => `
    <article class="dataset-card">
      <h3>${item.label}</h3>
      <p>${tx(item.task)}</p>
      <div class="split" aria-label="${item.label} ${tx("ayrımları")}">
        <span>${tx("eğitim")} ${item.splits.train}</span>
        <span>${tx("doğrulama")} ${item.splits.val}</span>
        <span>${tx("test")} ${item.splits.test}</span>
      </div>
      <p><strong>${tx("Sınıf dağılımı")}:</strong> ${tx("eğitim")} ${item.classes.train}</p>
      <p>${tx(item.note)}</p>
    </article>
  `).join("");
}

function renderModelFamilies() {
  const target = document.getElementById("modelFamilies");
  target.innerHTML = modelFamilies.map((model) => `
    <article class="model-card" style="border-top: 4px solid ${model.color}">
      <div class="model-top">
        <h3>${tx(model.title)}</h3>
        <span class="model-tag">${model.tag}</span>
      </div>
      <p>${tx(model.text)}</p>
      <ul>
        ${model.points.map((point) => `<li>${tx(point)}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

function renderClassicalVisualTabs() {
  const target = document.getElementById("classicalVisualTabs");
  if (!target) return;
  target.innerHTML = classicalVisuals.map((model) => `
    <button class="tab-button" type="button" data-classical="${model.key}" aria-pressed="${model.key === selectedClassicalVisual}">
      ${model.label}
    </button>
  `).join("");
  target.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedClassicalVisual = button.dataset.classical;
      classicalFrame = 0;
      renderClassicalVisuals();
      drawClassicalVisualCanvas();
    });
  });
}

function renderClassicalVisualNote() {
  const target = document.getElementById("classicalVisualNote");
  if (!target) return;
  const model = classicalVisuals.find((item) => item.key === selectedClassicalVisual);
  target.innerHTML = `
    <h3>${tx(model.title)}</h3>
    <p><strong>${tx(model.family)}</strong></p>
    <p>${tx(model.summary)}</p>
    <div class="classical-visual-facts">
      ${model.facts.map(([label, value]) => `
        <div class="classical-visual-fact">
          <span>${tx(label)}</span>
          <strong>${tx(value)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderClassicalVisuals() {
  renderClassicalVisualTabs();
  renderClassicalVisualNote();
}

function renderConceptTabs() {
  const target = document.getElementById("conceptTabs");
  target.innerHTML = quantumConcepts.map((concept) => `
    <button class="tab-button" type="button" data-concept="${concept.key}" aria-pressed="${concept.key === selectedConcept}">
      ${concept.label}
    </button>
  `).join("");
  target.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedConcept = button.dataset.concept;
      conceptFrame = 0;
      renderQuantumConcepts();
      drawQuantumConceptCanvas();
    });
  });
}

function renderConceptNote() {
  const target = document.getElementById("conceptNote");
  const concept = quantumConcepts.find((item) => item.key === selectedConcept);
  target.innerHTML = `
    <h3>${tx(concept.title)}</h3>
    <p>${tx(concept.summary)}</p>
    <div class="concept-facts">
      ${concept.facts.map(([label, value]) => `
        <div class="concept-fact">
          <span>${tx(label)}</span>
          <strong>${tx(value)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderQuantumConcepts() {
  renderConceptTabs();
  renderConceptNote();
}

function renderArchitectureTabs() {
  const target = document.getElementById("architectureTabs");
  target.innerHTML = architectureModels.map((model) => `
    <button class="tab-button" type="button" data-model="${model.key}" aria-pressed="${model.key === selectedArchitecture}">
      ${model.label}
    </button>
  `).join("");
  target.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedArchitecture = button.dataset.model;
      architectureFrame = 0;
      renderModelArchitecture();
      drawModelArchitectureCanvas();
    });
  });
}

function renderArchitectureNote() {
  const target = document.getElementById("architectureNote");
  const model = architectureModels.find((item) => item.key === selectedArchitecture);
  target.innerHTML = `
    <h3>${model.label}</h3>
    <p><strong>${tx(model.family)}</strong></p>
    <p>${tx(model.summary)}</p>
    <div class="architecture-facts">
      ${model.facts.map(([label, value]) => `
        <div class="architecture-fact">
          <span>${tx(label)}</span>
          <strong>${tx(value)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderModelArchitecture() {
  renderArchitectureTabs();
  renderArchitectureNote();
}

function renderDataCockpit() {
  const target = document.getElementById("dataCockpitCards");
  if (!target) return;
  const rows = benchmarkRows.length ? benchmarkRows : [];
  const categories = new Set(rows.map((row) => row.category).filter(Boolean));
  const figures = figureManifest.length;
  const rocCount = rows.filter((row) => row.has_roc === "True").length;
  const calibrationCount = rows.filter((row) => row.has_calibration === "True").length;
  const seedCount = Math.max(...rows.map((row) => toNumber(row.seed_count, 0)), 5);
  const stats = [
    ["Deney satırı", rows.length || 67, "CSV özeti"],
    ["Model kategorisi", categories.size || 8, "klasik / kuantum / hibrit"],
    ["Figür", figures || 61, "galeri manifesti"],
    ["ROC + PR kanıtı", rocCount || 36, "eğri çıktısı"],
    ["Kalibrasyon", calibrationCount || 36, "ECE ve reliability"],
    ["Seed/tekrar", seedCount, "0, 42, 123, 456, 789"],
  ];
  target.innerHTML = stats.map(([label, value, note]) => `
    <div class="cockpit-card">
      <span>${tx(label)}</span>
      <strong>${value}</strong>
      <small>${tx(note)}</small>
    </div>
  `).join("");
}

function renderExperimentMatrixNote() {
  const target = document.getElementById("experimentMatrixNote");
  if (!target) return;
  const cells = matrixCells().filter((cell) => cell.row);
  const best = cells.reduce((acc, cell) => (!acc || cell.row[2] > acc.row[2] ? cell : acc), null);
  const hybridBest = cells
    .filter((cell) => cell.model.key === "hybrid_qhead")
    .sort((a, b) => b.row[2] - a.row[2])[0];
  const qBest = cells
    .filter((cell) => ["qsvm", "vqc", "qgnn"].includes(cell.model.key))
    .sort((a, b) => b.row[2] - a.row[2])[0];
  target.innerHTML = [
    ["En yüksek hücre", best ? `${taskLabel(best.task)} · ${best.row[0]} · ${formatMetric(best.row[2])}` : "-"],
    ["En iyi hibrit", hybridBest ? `${taskLabel(hybridBest.task)} · ${hybridBest.row[0]} · ${formatMetric(hybridBest.row[2])}` : "-"],
    ["En iyi kuantum çizgi", qBest ? `${taskLabel(qBest.task)} · ${qBest.row[0]} · ${formatMetric(qBest.row[2])}` : "-"],
  ].map(([label, value]) => `
    <div><span>${tx(label)}</span><strong>${value}</strong></div>
  `).join("");
}

function renderSeedDistributionNote() {
  const target = document.getElementById("seedDistributionNote");
  if (!target) return;
  const rows = stabilityRows();
  const stable = [...rows].sort((a, b) => a[3] - b[3])[0];
  const volatile = [...rows].sort((a, b) => b[3] - a[3])[0];
  target.innerHTML = [
    ["Seçili veri seti", taskLabel(selectedStabilityTask)],
    ["En düşük std", stable ? `${stable[0]} · ${formatMetric(stable[3])}` : "-"],
    ["En yüksek std", volatile ? `${volatile[0]} · ${formatMetric(volatile[3])}` : "-"],
  ].map(([label, value]) => `
    <div><span>${tx(label)}</span><strong>${value}</strong></div>
  `).join("");
}

function drawResearchMapCanvas() {
  const canvas = document.getElementById("researchMapCanvas");
  if (!canvas) return;
  const compact = canvas.getBoundingClientRect().width < 700;
  const { ctx, width, height } = fitCanvas(canvas, compact ? 1.02 : 0.5, compact ? 560 : 440);
  const rows = benchmarkRows.length ? benchmarkRows : [];
  const taskCounts = taskOrder.map((task) => rows.filter((row) => row.task === task).length || (task === "bace" ? 29 : 19));
  const categoryCounts = Object.entries(rows.reduce((acc, row) => {
    acc[row.category] = (acc[row.category] || 0) + 1;
    return acc;
  }, {}));
  if (!categoryCounts.length) {
    categoryCounts.push(["quantum_descriptor", 23], ["hybrid_quantum_descriptor", 18], ["classical_descriptor", 6], ["classical_graph", 6], ["quantum_graph", 3]);
  }

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);
  drawResearchGrid(ctx, width, height);

  if (compact) {
    drawCompactResearchMap(ctx, width, height, taskCounts, categoryCounts, rows.length || 67);
    return;
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText("Deney kapsam haritası", 24, 34);

  const cx = width * 0.3;
  const cy = height * 0.56;
  const radius = Math.min(width, height) * 0.25;
  const total = taskCounts.reduce((a, b) => a + b, 0);
  let start = -Math.PI / 2;
  taskOrder.forEach((task, index) => {
    const angle = (taskCounts[index] / total) * Math.PI * 2;
    ctx.fillStyle = datasets[task].accent;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, start + angle);
    ctx.closePath();
    ctx.fill();
    start += angle;
  });
  ctx.fillStyle = "#101216";
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.52, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 28px JetBrains Mono, monospace";
  ctx.fillText(String(rows.length || 67), cx - 28, cy + 8);
  ctx.font = "800 12px JetBrains Mono, monospace";
  ctx.fillText("deney", cx - 22, cy + 28);

  taskOrder.forEach((task, index) => {
    const y = height * 0.28 + index * 34;
    ctx.fillStyle = datasets[task].accent;
    ctx.fillRect(width * 0.52, y - 12, 18, 18);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 13px Inter, sans-serif";
    ctx.fillText(`${taskLabel(task)} · ${taskCounts[index]} satır`, width * 0.52 + 28, y + 2);
  });

  const barLeft = width * 0.52;
  const barTop = height * 0.48;
  const barWidth = width * 0.38;
  const maxCount = Math.max(...categoryCounts.map(([, count]) => count));
  categoryCounts.slice(0, 8).forEach(([category, count], index) => {
    const y = barTop + index * 24;
    const color = colors[familyKeyFromCategory(category)] || "#ffffff";
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(barLeft, y, barWidth, 12);
    ctx.fillStyle = color;
    ctx.fillRect(barLeft, y, barWidth * (count / maxCount), 12);
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    ctx.font = "800 11px JetBrains Mono, monospace";
    ctx.fillText(`${categoryLabels[category] || category} (${count})`, barLeft, y - 4);
  });
}

function drawResearchGrid(ctx, width, height) {
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  for (let x = 0; x < width; x += 42) {
    ctx.fillRect(x, 0, 1, height);
  }
  for (let y = 0; y < height; y += 42) {
    ctx.fillRect(0, y, width, 1);
  }
}

function drawCompactResearchMap(ctx, width, height, taskCounts, categoryCounts, totalRows) {
  const pad = Math.max(18, width * 0.045);
  const contentW = width - pad * 2;
  const categoryTotal = categoryCounts.reduce((sum, [, count]) => sum + count, 0);
  const topStats = [
    ["Deney satırı", totalRows],
    ["Veri seti", taskOrder.length],
    ["Model ailesi", categoryCounts.length],
  ];

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText("CSV veri katmanı", pad, 34);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "700 12px Inter, sans-serif";
  ctx.fillText("Benchmark özeti -> liderlik tablosu -> figür manifesti", pad, 55);

  const statGap = 8;
  const statW = (contentW - statGap * 2) / 3;
  topStats.forEach(([label, value], index) => {
    const x = pad + index * (statW + statGap);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    roundRect(ctx, x, 76, statW, 58, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.62)";
    ctx.font = "800 10px Inter, sans-serif";
    ctx.fillText(label, x + 10, 98);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 20px JetBrains Mono, monospace";
    ctx.fillText(String(value), x + 10, 122);
  });

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 14px Inter, sans-serif";
  ctx.fillText("Veri seti satır dağılımı", pad, 164);
  const taskMax = Math.max(...taskCounts);
  taskOrder.forEach((task, index) => {
    const y = 188 + index * 38;
    const labelW = Math.min(92, contentW * 0.24);
    const barX = pad + labelW;
    const barW = contentW - labelW - 46;
    ctx.fillStyle = datasets[task].accent;
    ctx.font = "800 12px JetBrains Mono, monospace";
    ctx.fillText(taskLabel(task), pad, y + 10);
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    roundRect(ctx, barX, y, barW, 14, 999);
    ctx.fill();
    ctx.fillStyle = datasets[task].accent;
    roundRect(ctx, barX, y, barW * (taskCounts[index] / taskMax), 14, 999);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 11px JetBrains Mono, monospace";
    ctx.fillText(String(taskCounts[index]), barX + barW + 12, y + 12);
  });

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 14px Inter, sans-serif";
  ctx.fillText("Model ailesi yoğunluğu", pad, 320);
  const maxCount = Math.max(...categoryCounts.map(([, count]) => count));
  const barLeft = pad + Math.min(142, contentW * 0.36);
  const barWidth = Math.max(120, contentW - (barLeft - pad) - 42);
  categoryCounts
    .slice()
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .forEach(([category, count], index) => {
      const y = 346 + index * 24;
      const color = colors[familyKeyFromCategory(category)] || "#ffffff";
      ctx.fillStyle = "rgba(255,255,255,0.72)";
      ctx.font = "800 10px JetBrains Mono, monospace";
      const label = categoryLabels[category] || category;
      ctx.fillText(label.length > 21 ? `${label.slice(0, 20)}...` : label, pad, y + 10);
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      roundRect(ctx, barLeft, y, barWidth, 12, 999);
      ctx.fill();
      ctx.fillStyle = color;
      roundRect(ctx, barLeft, y, barWidth * (count / maxCount), 12, 999);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 10px JetBrains Mono, monospace";
      ctx.fillText(String(count), barLeft + barWidth + 10, y + 10);
    });

  const nodes = [
    ["CSV", "#00a6c8"],
    ["kategori", "#24a148"],
    ["figür", "#e0a100"],
    ["sayfa", "#7b61ff"],
  ];
  const nodeY = height - 42;
  const nodeW = Math.min(86, (contentW - 54) / 4);
  nodes.forEach(([label, color], index) => {
    const x = pad + index * (nodeW + 18);
    ctx.fillStyle = withAlpha(color, 0.18);
    roundRect(ctx, x, nodeY - 18, nodeW, 32, 7);
    ctx.fill();
    ctx.strokeStyle = withAlpha(color, 0.7);
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 11px JetBrains Mono, monospace";
    ctx.fillText(label, x + 10, nodeY + 2);
    if (index < nodes.length - 1) drawArrow(ctx, x + nodeW + 3, nodeY - 2, x + nodeW + 15, nodeY - 2, color);
  });

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "700 10px Inter, sans-serif";
  ctx.fillText(`${categoryTotal} kategori satırı CSV'den okunur`, pad, height - 14);
}

function renderDatasetTabs() {
  const target = document.getElementById("datasetTabs");
  target.innerHTML = Object.entries(datasets).map(([key, item]) => `
    <button class="tab-button" type="button" data-dataset="${key}" aria-pressed="${key === selectedDataset}">
      ${item.label}
    </button>
  `).join("");
  target.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDataset = button.dataset.dataset;
      chartAnimation = 0;
      renderResults();
    });
  });
}

function renderHybridTabs() {
  const target = document.getElementById("hybridTabs");
  target.innerHTML = Object.entries(datasets).map(([key, item]) => `
    <button class="tab-button" type="button" data-dataset="${key}" aria-pressed="${key === selectedHybrid}">
      ${item.label}
    </button>
  `).join("");
  target.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedHybrid = button.dataset.dataset;
      renderHybrid();
    });
  });
}

function renderResults() {
  renderDatasetTabs();
  drawLeaderboardChart();
  renderResultSummary();
  renderLeaderboardTable();
}

function drawLeaderboardChart() {
  const canvas = document.getElementById("leaderboardChart");
  const { ctx, width, height } = fitCanvas(canvas, 0.56, 340);
  const rows = getLeaderboardRowsForTask(selectedDataset).slice(0, 8);
  const left = Math.min(220, width * 0.3);
  const right = 42;
  const top = 42;
  const rowHeight = (height - top - 54) / rows.length;
  const chartWidth = width - left - right;
  const minValue = Math.max(0.55, Math.min(...rows.map((row) => row[2])) - 0.04);
  const maxValue = Math.min(1, Math.max(...rows.map((row) => row[2])) + 0.01);
  const progress = Math.min(1, chartAnimation);
  chartAnimation += 0.055;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#111111";
  ctx.font = "800 16px Inter, sans-serif";
  ctx.fillText(`${datasets[selectedDataset].label} AUROC sıralaması`, 18, 26);

  ctx.strokeStyle = "rgba(17,17,17,0.14)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const x = left + (chartWidth * i) / 4;
    ctx.beginPath();
    ctx.moveTo(x, top - 6);
    ctx.lineTo(x, height - 38);
    ctx.stroke();
    const value = minValue + ((maxValue - minValue) * i) / 4;
    ctx.fillStyle = "#5a6068";
    ctx.font = "700 11px JetBrains Mono, monospace";
    ctx.fillText(value.toFixed(2), x - 12, height - 16);
  }

  rows.forEach((row, index) => {
    const [name, family, auroc, std] = row;
    const y = top + index * rowHeight + 8;
    const barWidth = ((auroc - minValue) / (maxValue - minValue)) * chartWidth * progress;

    ctx.fillStyle = "#22262c";
    ctx.font = "800 12px Inter, sans-serif";
    const label = name.length > 24 ? `${name.slice(0, 23)}...` : name;
    ctx.fillText(label, 18, y + rowHeight * 0.52);

    ctx.fillStyle = "rgba(17,17,17,0.08)";
    ctx.fillRect(left, y, chartWidth, Math.max(14, rowHeight * 0.48));

    ctx.fillStyle = colors[family] || "#111111";
    ctx.fillRect(left, y, barWidth, Math.max(14, rowHeight * 0.48));

    ctx.fillStyle = "#111111";
    ctx.font = "800 12px JetBrains Mono, monospace";
    ctx.fillText(`${auroc.toFixed(4)} ± ${std.toFixed(4)}`, left + Math.min(chartWidth - 112, barWidth + 8), y + rowHeight * 0.36);
  });

  if (progress < 1) {
    requestAnimationFrame(drawLeaderboardChart);
  }
}

function renderResultSummary() {
  const target = document.getElementById("resultSummary");
  const item = datasets[selectedDataset];
  const rows = getLeaderboardRowsForTask(selectedDataset);
  const best = rows[0];
  const hybrid = rows.find((row) => row[1] === "hybrid");
  const qsvm = rows.find((row) => row[0].startsWith("QSVM"));
  const count = liveLeaderboardRows.length ? rows.length : leaderboard[selectedDataset].length;
  target.innerHTML = `
    <h3>${item.label} ${tx("yorumu")}</h3>
    <p>${tx(item.task)}. ${tx(item.note)}.</p>
    <div class="metric-list">
      <div class="metric-line"><span>${tx("En yüksek AUROC")}</span><strong>${best[0]} · ${formatMetric(best[2])}</strong></div>
      <div class="metric-line"><span>${tx("En iyi hibrit")}</span><strong>${hybrid[0]} · ${formatMetric(hybrid[2])}</strong></div>
      <div class="metric-line"><span>${tx("QSVM sinyali")}</span><strong>${qsvm ? `${qsvm[0]} · ${formatMetric(qsvm[2])}` : tx("Yok")}</strong></div>
      <div class="metric-line"><span>${tx("CSV sıralaması")}</span><strong>${count} ${tx("deney")}</strong></div>
    </div>
  `;
}

function renderLeaderboardTable() {
  const caption = document.getElementById("leaderboardCaption");
  const target = document.getElementById("leaderboardRows");
  caption.textContent = `${datasets[selectedDataset].label} için model sıralaması`;
  target.innerHTML = getLeaderboardRowsForTask(selectedDataset).map((row, index) => {
    const [name, family, auroc, std, balanced, f1] = row;
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${name}</td>
        <td><span class="metric-pill" style="border-left: 4px solid ${colors[family] || "#111"}">${familyLabel(family)}</span></td>
        <td>${formatMetric(auroc)}</td>
        <td>${formatMetric(std)}</td>
        <td>${formatMetric(balanced)}</td>
        <td>${formatMetric(f1)}</td>
      </tr>
    `;
  }).join("");
}

function familyLabel(family) {
  return {
    classical: "klasik descriptor tabanlı",
    graph: "klasik grafik",
    quantum: "saf kuantum",
    quantumGraph: "kuantum grafik",
    hybrid: "hibrit",
  }[family] || family;
}

function renderHybrid() {
  renderHybridTabs();
  const rows = hybridAblation[selectedHybrid];
  const best = rows.reduce((acc, row) => (row[2] > acc[2] ? row : acc), rows[0]);
  const min = Math.min(...rows.map((row) => row[2]));
  const max = Math.max(...rows.map((row) => row[2]));
  const heatmap = document.getElementById("hybridHeatmap");
  heatmap.innerHTML = rows.map(([q, depth, auroc, std, balanced, f1]) => {
    const t = (auroc - min) / Math.max(0.0001, max - min);
    const bg = mixColor("#272b31", datasets[selectedHybrid].accent, 0.35 + t * 0.65);
    return `
      <div class="heat-cell" style="background: ${bg}">
        <span>q${q} · d${depth}</span>
        <strong>${formatMetric(auroc)}</strong>
        <small>AUROC ± ${formatMetric(std)} · F1 ${formatMetric(f1)}</small>
      </div>
    `;
  }).join("");

  const note = document.getElementById("hybridNote");
  note.innerHTML = `
    <h3>${datasets[selectedHybrid].label} ${tx("hibrit")} ${tx("yorumu")}</h3>
    <p>${tx("En iyi konfigürasyon")} <strong>q${best[0]}-d${best[1]}</strong> ${tx("olarak raporlandı.")}</p>
    <div class="metric-list">
      <div class="metric-line"><span>AUROC</span><strong>${formatMetric(best[2])} ± ${formatMetric(best[3])}</strong></div>
      <div class="metric-line"><span>${tx("Dengeli doğr.")}</span><strong>${formatMetric(best[4])}</strong></div>
      <div class="metric-line"><span>F1</span><strong>${formatMetric(best[5])}</strong></div>
      <div class="metric-line"><span>${tx("Yorum")}</span><strong>${tx("Görev bazlı kapasite uyumu")}</strong></div>
    </div>
  `;
}

function mixColor(a, b, t) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ar = (pa >> 16) & 255;
  const ag = (pa >> 8) & 255;
  const ab = pa & 255;
  const br = (pb >> 16) & 255;
  const bg = (pb >> 8) & 255;
  const bb = pb & 255;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `rgb(${rr}, ${rg}, ${rb})`;
}

function renderClinToxCompare() {
  const target = document.getElementById("clintoxCompare");
  const rows = [
    {
      title: "Hybrid QHead q8-d2",
      metrics: { AUROC: 0.8804, "PR-AUC": 0.4230, F1: 0.3937, MCC: 0.3425, Duyarlılık: 0.5455, Özgüllük: 0.7723 },
    },
    {
      title: "MLP",
      metrics: { AUROC: 0.8802, "PR-AUC": 0.3809, F1: 0.1462, MCC: 0.0315, Duyarlılık: 1.0, Özgüllük: 0.0511 },
    },
  ];
  target.innerHTML = rows.map((item) => `
    <article class="metric-item">
      <h3>${item.title}</h3>
      <p>${tx("ClinTox üzerinde AUROC yakın; eşik bağımlı metrikler ayrıştırıcı.")}</p>
      <div class="mini-bars">
        ${Object.entries(item.metrics).map(([name, value]) => `
          <div class="mini-bar">
            <span>${tx(name)}</span>
            <div class="mini-bar-track"><span style="width: ${Math.max(3, value * 100)}%"></span></div>
            <strong>${formatMetric(value)}</strong>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderJourneyNote() {
  const target = document.getElementById("journeyNote");
  if (!target) return;
  target.innerHTML = `
    <h3>${tx("Deney hattı")}</h3>
    <p>${tx("Bu akış, klasik modeller ile kuantum modellerin aynı molekül kaydını farklı temsil biçimleriyle nasıl kullandığını gösterir.")}</p>
    <div class="journey-step-list">
      ${journeySteps.map(([label, text], index) => `
        <div class="journey-step">
          <span>${String(index + 1).padStart(2, "0")} · ${tx(label)}</span>
          <strong>${tx(text)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function drawMoleculeJourneyCanvas() {
  const canvas = document.getElementById("moleculeJourneyCanvas");
  if (!canvas) return;
  const { ctx, width, height } = fitCanvas(canvas, 0.52, 430);
  const t = extendedFrame;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.055)";
  for (let x = 0; x < width; x += 38) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 38) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const y = height * 0.46;
  const xStart = width * 0.08;
  const xEnd = width * 0.9;
  const stepGap = (xEnd - xStart) / (journeySteps.length - 1);
  journeySteps.forEach(([label], index) => {
    const x = xStart + index * stepGap;
    const active = (Math.sin(t * 1.8 + index * 0.75) + 1) / 2;
    const color = index < 2 ? "#00a6c8" : index < 4 ? "#24a148" : index === 4 ? "#7b61ff" : "#e0a100";
    if (index < journeySteps.length - 1) {
      drawArrow(ctx, x + 36, y, x + stepGap - 40, y, "rgba(255,255,255,0.58)");
    }
    ctx.fillStyle = withAlpha(color, 0.22 + active * 0.22);
    roundRect(ctx, x - 48, y - 34, 96, 68, 8);
    ctx.fill();
    ctx.strokeStyle = withAlpha(color, 0.86);
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 12px Inter, sans-serif";
    drawWrappedText(ctx, label, x - 38, y - 5, 76, 14, "#ffffff", "800 12px Inter, sans-serif");
  });

  drawMoleculeGlyph(ctx, width * 0.12, height * 0.73, 62, "#00a6c8");
  drawFingerprintBits(ctx, width * 0.34, height * 0.68, width * 0.22, height * 0.16, t);
  drawQuantumWires(ctx, width * 0.62, height * 0.66, width * 0.26, height * 0.17, "#7b61ff");

  const pulseX = xStart + ((Math.sin(t * 1.2) + 1) / 2) * (xEnd - xStart);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(pulseX, y, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText("SMILES -> RDKit -> ECFP -> PCA/Kodlayıcı -> Kubitler -> Metrikler", 24, 34);
  drawWrappedText(ctx, "Aynı molekül kaydı klasik çizgide SVM/MLP/GNN'e, kuantum çizgide QSVM/VQC/QGNN'e, hibrit çizgide dondurulmuş MLP + Quantum Head'e ayrılır.", 24, 58, width * 0.86, 18, "rgba(255,255,255,0.74)", "600 14px Inter, sans-serif");
}

function drawMoleculeGlyph(ctx, cx, cy, radius, color) {
  const nodes = [
    [cx - radius * 0.65, cy],
    [cx - radius * 0.2, cy - radius * 0.45],
    [cx + radius * 0.38, cy - radius * 0.3],
    [cx + radius * 0.55, cy + radius * 0.28],
    [cx - radius * 0.08, cy + radius * 0.48],
  ];
  const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 4]];
  ctx.strokeStyle = "rgba(255,255,255,0.48)";
  ctx.lineWidth = 2;
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);
    ctx.stroke();
  });
  nodes.forEach(([x, y], index) => {
    ctx.fillStyle = index % 2 ? color : "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawFingerprintBits(ctx, x, y, width, height, t) {
  const cols = 16;
  const rows = 5;
  const gap = 4;
  const cell = Math.min((width - gap * (cols - 1)) / cols, (height - gap * (rows - 1)) / rows);
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const on = ((r * 7 + c * 11 + Math.floor(t * 4)) % 5) < 2;
      ctx.fillStyle = on ? "#24a148" : "rgba(255,255,255,0.1)";
      ctx.fillRect(x + c * (cell + gap), y + r * (cell + gap), cell, cell);
    }
  }
}

function renderMetricLab() {
  const tabs = document.getElementById("metricLabModelTabs");
  const slider = document.getElementById("thresholdSlider");
  if (!tabs || !slider) return;
  tabs.innerHTML = Object.entries(metricLabModels).map(([key, model]) => `
    <button class="tab-button" type="button" data-lab-model="${key}" aria-pressed="${key === selectedMetricLabModel}">
      ${model.label}
    </button>
  `).join("");
  tabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedMetricLabModel = button.dataset.labModel;
      renderMetricLab();
      drawMetricLabCanvas();
    });
  });
  slider.addEventListener("input", () => {
    renderMetricLabStats();
    drawMetricLabCanvas();
  });
  renderMetricLabStats();
}

function metricLabState() {
  const slider = document.getElementById("thresholdSlider");
  const threshold = slider ? toNumber(slider.value, 0.5) : 0.5;
  const model = metricLabModels[selectedMetricLabModel];
  const pos = datasets.clintox.splits.test ? 11 : 11;
  const neg = 137;
  const shift = threshold - 0.5;
  const sensitivity = Math.max(0.02, Math.min(1, model.anchor.sensitivity - shift * (selectedMetricLabModel === "mlp" ? 1.25 : 0.82)));
  const specificity = Math.max(0.02, Math.min(1, model.anchor.specificity + shift * (selectedMetricLabModel === "mlp" ? 1.7 : 0.95)));
  const tp = Math.round(pos * sensitivity);
  const fn = pos - tp;
  const tn = Math.round(neg * specificity);
  const fp = neg - tn;
  const precision = tp + fp ? tp / (tp + fp) : 0;
  const recall = tp + fn ? tp / (tp + fn) : 0;
  const f1 = Math.max(0, Math.min(1, model.anchor.f1 * (1 - Math.abs(shift) * 0.85) + shift * (selectedMetricLabModel === "hybrid" ? 0.05 : -0.08)));
  const mcc = Math.max(-1, Math.min(1, model.anchor.mcc * (1 - Math.abs(shift) * 0.75) + shift * (selectedMetricLabModel === "hybrid" ? 0.06 : -0.04)));
  const balanced = ((tp + fn ? tp / (tp + fn) : 0) + (tn + fp ? tn / (tn + fp) : 0)) / 2;
  return { model, threshold, tp, fp, tn, fn, precision, recall, sensitivity, specificity, f1, mcc, balanced };
}

function renderMetricLabStats() {
  const value = document.getElementById("thresholdValue");
  const stats = document.getElementById("metricLabStats");
  if (!value || !stats) return;
  const s = metricLabState();
  value.textContent = s.threshold.toFixed(2);
  const rows = [
    ["F1", s.f1],
    ["MCC", s.mcc],
    ["Sens.", s.sensitivity],
    ["Spec.", s.specificity],
    ["Dengeli", s.balanced],
    ["Kesinlik", s.precision],
  ];
  stats.innerHTML = rows.map(([label, metric]) => `
    <div class="lab-stat">
      <span>${label}</span>
      <strong>${metric.toFixed(3)}</strong>
    </div>
  `).join("");
}

function drawMetricLabCanvas() {
  const canvas = document.getElementById("metricLabCanvas");
  if (!canvas) return;
  const { ctx, width, height } = fitCanvas(canvas, 0.54, 420);
  const s = metricLabState();
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText(`ClinTox eşik laboratuvarı · ${s.model.label}`, 24, 34);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "600 13px Inter, sans-serif";
  ctx.fillText("Simüle edilmiş eşik duyarlılığı: test sınıf dağılımı 137 negatif / 11 pozitif üzerinden okunur.", 24, 56);

  const matrixX = width * 0.08;
  const matrixY = height * 0.22;
  const cell = Math.min(width * 0.18, height * 0.22);
  const cells = [
    ["TN", s.tn, "#24a148", 0, 0],
    ["FP", s.fp, "#e65f4f", 1, 0],
    ["FN", s.fn, "#e0a100", 0, 1],
    ["TP", s.tp, s.model.color, 1, 1],
  ];
  cells.forEach(([label, value, color, col, row]) => {
    const x = matrixX + col * (cell + 10);
    const y = matrixY + row * (cell + 10);
    ctx.fillStyle = withAlpha(color, 0.2 + Math.min(0.45, value / 140));
    roundRect(ctx, x, y, cell, cell, 8);
    ctx.fill();
    ctx.strokeStyle = withAlpha(color, 0.85);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 14px JetBrains Mono, monospace";
    ctx.fillText(label, x + 16, y + 28);
    ctx.font = "800 38px JetBrains Mono, monospace";
    ctx.fillText(String(value), x + 16, y + cell * 0.68);
  });

  const metrics = [["F1", s.f1], ["MCC", Math.max(0, s.mcc)], ["Duyarlılık", s.sensitivity], ["Özgüllük", s.specificity], ["Dengeli", s.balanced]];
  const barX = width * 0.53;
  const barY = height * 0.24;
  const barW = width * 0.34;
  metrics.forEach(([label, value], index) => {
    const y = barY + index * 48;
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.font = "800 12px JetBrains Mono, monospace";
    ctx.fillText(label, barX, y);
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    roundRect(ctx, barX, y + 12, barW, 14, 999);
    ctx.fill();
    ctx.fillStyle = index < 2 ? s.model.color : "#00a6c8";
    roundRect(ctx, barX, y + 12, barW * Math.max(0.02, Math.min(1, value)), 14, 999);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.fillText(value.toFixed(3), barX + barW + 12, y + 24);
  });
}

function renderAblationControls() {
  const modelTabs = document.getElementById("ablationModelTabs");
  const taskTabs = document.getElementById("ablationTaskTabs");
  if (!modelTabs || !taskTabs) return;
  const models = [
    ["hybrid_qhead", "Hybrid QHead"],
    ["qsvm", "QSVM"],
    ["vqc", "VQC"],
  ];
  modelTabs.innerHTML = models.map(([key, label]) => `
    <button class="tab-button" type="button" data-ablation-model="${key}" aria-pressed="${key === selectedAblationModel}">
      ${label}
    </button>
  `).join("");
  taskTabs.innerHTML = taskOrder.map((task) => `
    <button class="tab-button" type="button" data-ablation-task="${task}" aria-pressed="${task === selectedAblationTask}">
      ${taskLabel(task)}
    </button>
  `).join("");
  modelTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedAblationModel = button.dataset.ablationModel;
      renderAblationControls();
      renderAblationNote();
      drawAblationCubeCanvas();
    });
  });
  taskTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedAblationTask = button.dataset.ablationTask;
      renderAblationControls();
      renderAblationNote();
      drawAblationCubeCanvas();
    });
  });
}

function getAblationRows() {
  const rows = getBenchmarkRows({ task: selectedAblationTask, model: selectedAblationModel })
    .filter((row) => row.n_qubits && row.circuit_depth)
    .sort((a, b) => toNumber(a.n_qubits) - toNumber(b.n_qubits) || toNumber(a.circuit_depth) - toNumber(b.circuit_depth));
  if (rows.length) return rows;
  const fallback = selectedAblationModel === "hybrid_qhead" ? hybridAblation[selectedAblationTask] : [];
  return fallback.map(([q, depth, auroc, std, balanced, f1]) => ({
    n_qubits: String(q),
    circuit_depth: String(depth),
    auroc_mean: String(auroc),
    auroc_std: String(std),
    balanced_accuracy_mean: String(balanced),
    f1_mean: String(f1),
    model: selectedAblationModel,
  }));
}

function renderAblationNote() {
  const target = document.getElementById("ablationNote");
  if (!target) return;
  const rows = getAblationRows();
  if (!rows.length) {
    target.innerHTML = `<h3>${tx("Veri yok")}</h3><p>${tx("Bu model için ablasyon kaydı bulunamadı.")}</p>`;
    return;
  }
  const best = rows.reduce((acc, row) => toNumber(row.auroc_mean) > toNumber(acc.auroc_mean) ? row : acc, rows[0]);
  target.innerHTML = `
    <h3>${selectedAblationModel.toUpperCase()} · ${taskLabel(selectedAblationTask)}</h3>
    <p>${tx("En iyi ayar")} <strong>q${best.n_qubits}-d${best.circuit_depth}</strong> ${tx("olarak okunuyor.")}</p>
    <div class="metric-list">
      <div class="metric-line"><span>AUROC</span><strong>${formatMetric(best.auroc_mean)} ± ${formatMetric(best.auroc_std || 0)}</strong></div>
      <div class="metric-line"><span>${tx("Dengeli doğr.")}</span><strong>${formatMetric(best.balanced_accuracy_mean || 0)}</strong></div>
      <div class="metric-line"><span>F1</span><strong>${formatMetric(best.f1_mean || 0)}</strong></div>
      <div class="metric-line"><span>${tx("Yorum")}</span><strong>${tx("Daha fazla kubit garanti değil")}</strong></div>
    </div>
  `;
}

function drawAblationCubeCanvas() {
  const canvas = document.getElementById("ablationCubeCanvas");
  if (!canvas) return;
  const { ctx, width, height } = fitCanvas(canvas, 0.54, 420);
  const rows = getAblationRows();
  if (!rows.length) return;
  const qubits = [...new Set(rows.map((row) => row.n_qubits))].sort((a, b) => toNumber(a) - toNumber(b));
  const depths = [...new Set(rows.map((row) => row.circuit_depth))].sort((a, b) => toNumber(a) - toNumber(b));
  const values = rows.map((row) => toNumber(row.auroc_mean));
  const min = Math.min(...values);
  const max = Math.max(...values);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText(`${selectedAblationModel.toUpperCase()} ablasyon · ${taskLabel(selectedAblationTask)}`, 24, 34);

  const gridX = width * 0.12;
  const gridY = height * 0.2;
  const cellW = Math.min(150, (width * 0.64) / Math.max(1, qubits.length));
  const cellH = Math.min(130, (height * 0.48) / Math.max(1, depths.length));
  depths.forEach((depth, r) => {
    qubits.forEach((q, c) => {
      const row = rows.find((item) => item.n_qubits === q && item.circuit_depth === depth);
      const value = row ? toNumber(row.auroc_mean) : min;
      const normalized = (value - min) / Math.max(0.0001, max - min);
      const color = mixColor("#272b31", datasets[selectedAblationTask].accent, 0.25 + normalized * 0.75);
      const x = gridX + c * (cellW + 12);
      const y = gridY + r * (cellH + 12);
      ctx.fillStyle = color;
      roundRect(ctx, x, y, cellW, cellH, 8);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.28)";
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 13px JetBrains Mono, monospace";
      ctx.fillText(`q${q} · d${depth}`, x + 14, y + 26);
      ctx.font = "800 30px JetBrains Mono, monospace";
      ctx.fillText(value.toFixed(4), x + 14, y + cellH * 0.62);
      ctx.font = "800 11px JetBrains Mono, monospace";
      ctx.fillText(`std ${toNumber(row?.auroc_std).toFixed(4)}`, x + 14, y + cellH - 18);
    });
  });

  const legendX = width * 0.78;
  drawWrappedText(ctx, "Yüzey, kubit sayısı ve derinlik arttıkça başarının her zaman artmadığını gösterir. Veri seti ile devre kapasitesi arasında görev bazlı uyum gerekir.", legendX, height * 0.25, width * 0.18, 18, "rgba(255,255,255,0.76)", "600 14px Inter, sans-serif");
}

function renderStabilityControls() {
  const target = document.getElementById("stabilityTaskTabs");
  if (!target) return;
  target.innerHTML = taskOrder.map((task) => `
    <button class="tab-button" type="button" data-stability-task="${task}" aria-pressed="${task === selectedStabilityTask}">
      ${taskLabel(task)}
    </button>
  `).join("");
  target.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedStabilityTask = button.dataset.stabilityTask;
      renderStabilityControls();
      renderStabilityNote();
      renderSeedDistributionNote();
      drawStabilityCanvas();
      drawSeedDistributionCanvas();
    });
  });
}

function stabilityRows() {
  const rows = getLeaderboardRowsForTask(selectedStabilityTask)
    .filter((row) => Number.isFinite(row[2]))
    .slice(0, 12);
  return rows;
}

function renderStabilityNote() {
  const target = document.getElementById("stabilityNote");
  if (!target) return;
  const rows = stabilityRows();
  const stable = [...rows].sort((a, b) => a[3] - b[3])[0];
  const volatile = [...rows].sort((a, b) => b[3] - a[3])[0];
  target.innerHTML = `
    <h3>${taskLabel(selectedStabilityTask)} ${tx("kararlılık okuması")}</h3>
    <p>${tx("Standart sapma, seed değiştiğinde modelin ne kadar değiştiğini gösterir.")}</p>
    <div class="metric-list">
      <div class="metric-line"><span>${tx("En kararlı")}</span><strong>${stable?.[0] || "-"} · ${formatMetric(stable?.[3] || 0)}</strong></div>
      <div class="metric-line"><span>${tx("En değişken")}</span><strong>${volatile?.[0] || "-"} · ${formatMetric(volatile?.[3] || 0)}</strong></div>
      <div class="metric-line"><span>${tx("Okuma")}</span><strong>${tx("AUROC + std birlikte")}</strong></div>
    </div>
  `;
}

function drawStabilityCanvas() {
  const canvas = document.getElementById("stabilityCanvas");
  if (!canvas) return;
  const { ctx, width, height } = fitCanvas(canvas, 0.5, 400);
  const allRows = stabilityRows();
  const compact = width < 620;
  const rows = compact ? allRows.slice(0, 8) : allRows;
  if (!rows.length) return;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText(`${taskLabel(selectedStabilityTask)} · AUROC ve seed/tekrar değişkenliği`, 24, 34);

  if (compact) {
    drawCompactStabilityChart(ctx, width, height, rows);
    return;
  }

  const left = compact ? 52 : Math.max(72, width * 0.1);
  const right = compact ? 22 : 44;
  const top = height * 0.18;
  const plotW = width - left - right;
  const plotH = height * 0.62;
  const minAuc = Math.max(0.5, Math.min(...rows.map((row) => row[2])) - 0.04);
  const maxAuc = Math.min(1, Math.max(...rows.map((row) => row[2])) + 0.01);
  const maxStd = Math.max(0.03, Math.max(...rows.map((row) => row[3])) * 1.15);

  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left, top + plotH);
  ctx.lineTo(left + plotW, top + plotH);
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.68)";
  ctx.font = "800 11px JetBrains Mono, monospace";
  ctx.fillText("std", left - 34, top + 6);
  ctx.fillText("AUROC", left + plotW - 42, top + plotH + 30);

  rows.forEach((row, index) => {
    const x = left + ((row[2] - minAuc) / Math.max(0.0001, maxAuc - minAuc)) * plotW;
    const y = top + plotH - (row[3] / maxStd) * plotH;
    const color = colors[row[1]] || "#ffffff";
    ctx.fillStyle = withAlpha(color, 0.85);
    ctx.beginPath();
    ctx.arc(x, y, 8 + index * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = compact ? "800 9px Inter, sans-serif" : "800 10px Inter, sans-serif";
    const label = row[0].replace("Hybrid QHead", "HQ");
    const trimmed = compact && label.length > 12 ? `${label.slice(0, 11)}…` : label;
    if (!compact || index < 6) {
      ctx.fillText(trimmed, Math.min(x + 10, width - 92), y + 4);
    }
  });
}

function drawCompactStabilityChart(ctx, width, height, rows) {
  const left = 28;
  const labelW = Math.min(138, width * 0.3);
  const valueX = left + labelW + 10;
  const barLeft = valueX + 64;
  const stdX = width - 64;
  const barRight = 86;
  const barW = width - barLeft - barRight;
  const top = 74;
  const rowH = Math.min(38, (height - top - 42) / rows.length);
  const minAuc = Math.max(0.5, Math.min(...rows.map((row) => row[2])) - 0.04);
  const maxAuc = Math.min(1, Math.max(...rows.map((row) => row[2])) + 0.01);

  ctx.fillStyle = "rgba(255,255,255,0.66)";
  ctx.font = "800 11px JetBrains Mono, monospace";
  ctx.fillText("model", left, top - 16);
  ctx.fillText("AUROC", valueX, top - 16);
  ctx.fillText("std", stdX, top - 16);

  rows.forEach((row, index) => {
    const [name, family, auroc, std] = row;
    const y = top + index * rowH;
    const color = colors[family] || "#ffffff";
    const label = name.replace("Hybrid QHead", "HQ");
    const shortLabel = label.length > 18 ? `${label.slice(0, 17)}…` : label;
    const normalized = (auroc - minAuc) / Math.max(0.0001, maxAuc - minAuc);

    ctx.fillStyle = "rgba(255,255,255,0.76)";
    ctx.font = "800 11px Inter, sans-serif";
    ctx.fillText(shortLabel, left, y + 16);

    ctx.fillStyle = "rgba(255,255,255,0.1)";
    roundRect(ctx, barLeft, y + 5, barW, 12, 999);
    ctx.fill();
    ctx.fillStyle = color;
    roundRect(ctx, barLeft, y + 5, Math.max(8, barW * normalized), 12, 999);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 10px JetBrains Mono, monospace";
    ctx.fillText(auroc.toFixed(4), valueX, y + 16);
    ctx.fillText(std.toFixed(4), stdX, y + 16);
  });
}

function renderGalleryControls() {
  const taskTabs = document.getElementById("galleryTaskTabs");
  const kindTabs = document.getElementById("galleryKindTabs");
  if (!taskTabs || !kindTabs) return;
  const tasks = [["all", "Tümü"], ...taskOrder.map((task) => [task, taskLabel(task)])];
  const kinds = [["all", "Tümü"], ["parameter", "Parametre"], ["training", "Eğitim"], ["heatmap", "Isı haritası"], ["radar", "Radar"], ["stability", "Seed"], ["comparison", "Karşılaştırma"], ["data", "Veri"]];
  taskTabs.innerHTML = tasks.map(([key, label]) => `<button class="tab-button" type="button" data-gallery-task="${key}" aria-pressed="${key === selectedGalleryTask}">${tx(label)}</button>`).join("");
  kindTabs.innerHTML = kinds.map(([key, label]) => `<button class="tab-button" type="button" data-gallery-kind="${key}" aria-pressed="${key === selectedGalleryKind}">${tx(label)}</button>`).join("");
  taskTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedGalleryTask = button.dataset.galleryTask;
      selectedGalleryIndex = 0;
      renderGallery();
    });
  });
  kindTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedGalleryKind = button.dataset.galleryKind;
      selectedGalleryIndex = 0;
      renderGallery();
    });
  });
}

function figureKindLabel(kind) {
  return tx({
    parameter: "parametre skorları",
    training: "eğitim eğrileri",
    heatmap: "ısı haritası",
    radar: "radar metrik özeti",
    stability: "seed kutu grafiği",
    comparison: "yöntem karşılaştırması",
    data: "veri rejimi analizi",
  }[kind] || kind);
}

function figureModelLabel(model) {
  return {
    all: "tüm yöntemler",
    svm: "SVM",
    mlp: "MLP",
    gnn: "GNN",
    gat: "GAT",
    qsvm: "QSVM",
    vqc: "VQC",
    qgnn: "QGNN",
    hybrid_qhead: "Hybrid QHead",
  }[model] || model;
}

function figureDisplayTitle(item) {
  const task = taskLabel(item.task);
  const model = figureModelLabel(item.model);
  if (item.kind === "comparison") return `${task} - ${tx("yöntem karşılaştırması")}`;
  if (item.kind === "data") return `${task} - ${tx("veri rejimi analizi")}`;
  if (item.kind === "radar") return `${task} - ${tx("radar metrik özeti")}`;
  if (item.kind === "stability") return `${task} - ${tx("seed kutu grafiği")}`;
  if (item.kind === "parameter" && item.model === "all") return `${task} - ${tx("tüm yöntem parametreleri")}`;
  return `${task} - ${model} ${figureKindLabel(item.kind)}`;
}

function filteredFigures() {
  const all = figureManifest.length ? figureManifest : [
    { src: "assets/bace_all_methods.png", task: "bace", kind: "parameter", model: "all", title: "BACE All Methods" },
    { src: "assets/bbbp_all_methods.png", task: "bbbp", kind: "parameter", model: "all", title: "BBBP All Methods" },
    { src: "assets/clintox_all_methods.png", task: "clintox", kind: "parameter", model: "all", title: "ClinTox All Methods" },
  ];
  return all.filter((item) => {
    if (selectedGalleryTask !== "all" && item.task !== selectedGalleryTask) return false;
    if (selectedGalleryKind !== "all" && item.kind !== selectedGalleryKind) return false;
    return true;
  });
}

function renderGallery() {
  renderGalleryControls();
  const feature = document.getElementById("galleryFeature");
  const strip = document.getElementById("galleryStrip");
  if (!feature || !strip) return;
  const figures = filteredFigures();
  const selected = figures[Math.min(selectedGalleryIndex, Math.max(0, figures.length - 1))];
  if (!selected) {
    feature.innerHTML = "<div class=\"gallery-empty\">Bu filtrede figür yok.</div>";
    strip.innerHTML = "";
    return;
  }
  const selectedTitle = figureDisplayTitle(selected);
  feature.innerHTML = `
    <figure>
      <img src="${selected.src}" alt="${selectedTitle}">
      <figcaption>${selectedTitle}</figcaption>
    </figure>
  `;
  strip.innerHTML = figures.map((item, index) => `
    <button class="gallery-card" type="button" data-gallery-index="${index}" aria-selected="${index === selectedGalleryIndex}">
      <img src="${item.src}" alt="">
      <span>
        <strong>${figureDisplayTitle(item)}</strong>
        <span>${taskLabel(item.task)} · ${figureModelLabel(item.model)} · ${figureKindLabel(item.kind)}</span>
      </span>
    </button>
  `).join("");
  strip.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedGalleryIndex = toNumber(button.dataset.galleryIndex, 0);
      renderGallery();
    });
  });
}

function renderLimitations() {
  const target = document.getElementById("limitationsGrid");
  if (!target) return;
  target.innerHTML = limitations.map(([tag, title, text]) => `
    <article class="limitation-card">
      <span>${tag}</span>
      <strong>${tx(title)}</strong>
      <p>${tx(text)}</p>
    </article>
  `).join("");
}

function drawQuantumConceptCanvas() {
  const canvas = document.getElementById("quantumConceptCanvas");
  if (!canvas) return;
  const concept = quantumConcepts.find((item) => item.key === selectedConcept);
  const { ctx, width, height } = fitCanvas(canvas, 0.62, 430);
  conceptFrame += 0.018;
  drawConceptBackground(ctx, width, height, concept);

  if (concept.key === "qubit") drawQubitConcept(ctx, width, height, concept);
  if (concept.key === "superposition") drawSuperpositionConcept(ctx, width, height, concept);
  if (concept.key === "measurement") drawMeasurementConcept(ctx, width, height, concept);
  if (concept.key === "entanglement") drawEntanglementConcept(ctx, width, height, concept);
  if (concept.key === "depth") drawDepthConcept(ctx, width, height, concept);
  if (concept.key === "supervised") drawSupervisedConcept(ctx, width, height, concept);
}

function drawConceptBackground(ctx, width, height, concept) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);

  const grid = 36;
  ctx.strokeStyle = "rgba(255,255,255,0.055)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += grid) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.fillStyle = withAlpha(concept.accent, 0.13);
  ctx.beginPath();
  ctx.arc(width * 0.86, height * 0.16, Math.min(width, height) * 0.28, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 19px Inter, sans-serif";
  ctx.fillText("Kuantum nedir?", 28, 38);
  ctx.fillStyle = concept.accent;
  ctx.font = "800 12px JetBrains Mono, monospace";
  ctx.fillText(`${tx(concept.label).toLocaleUpperCase(currentLanguage === "en" ? "en-US" : "tr-TR")} · ${tx("QML SEMİNER GÖRSELİ")}`, 28, 62);
}

function drawQubitConcept(ctx, width, height, concept) {
  const radius = Math.min(width, height) * 0.25;
  const cx = width * 0.43;
  const cy = height * 0.55;
  const t = conceptFrame;
  const endX = cx + Math.cos(t * 1.3) * radius * 0.72;
  const endY = cy - radius * 0.44 + Math.sin(t * 0.9) * radius * 0.42;
  const p0 = 0.5 + Math.sin(t * 1.1) * 0.28;
  const p1 = 1 - p0;

  ctx.strokeStyle = "rgba(255,255,255,0.42)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius, radius * 0.34, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius * 0.34, radius, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = withAlpha(concept.accent, 0.82);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy - radius - 18);
  ctx.lineTo(cx, cy + radius + 18);
  ctx.stroke();
  drawArrow(ctx, cx, cy, endX, endY, concept.accent);

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px JetBrains Mono, monospace";
  ctx.fillText("|0>", cx - 18, cy - radius - 26);
  ctx.fillText("|1>", cx - 18, cy + radius + 44);

  drawProbabilityBars(ctx, width * 0.68, height * 0.38, width * 0.22, [["P(0)", p0], ["P(1)", p1]], concept.accent);
  drawWrappedText(ctx, "Bir kubit ölçülmeden önce Bloch küresi üzerinde bir yön gibi düşünülebilir. Yön değiştikçe ölçüm olasılıkları değişir.", 34, height - 68, width * 0.86, 18, "rgba(255,255,255,0.74)", "600 14px Inter, sans-serif");
}

function drawSuperpositionConcept(ctx, width, height, concept) {
  const baseY = height * 0.5;
  const left = width * 0.12;
  const right = width * 0.58;
  const t = conceptFrame;

  ["#00a6c8", concept.accent].forEach((color, index) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = index === 0 ? 2 : 3;
    ctx.beginPath();
    for (let x = left; x < right; x += 4) {
      const y = baseY + Math.sin((x * 0.026) + t * (2.2 + index)) * (34 - index * 8) + (index ? 18 : -18);
      if (x === left) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  roundRect(ctx, width * 0.63, height * 0.25, width * 0.25, height * 0.45, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.stroke();

  const alpha = 0.5 + Math.sin(t * 1.1) * 0.18;
  const beta = 1 - alpha;
  drawProbabilityBars(ctx, width * 0.67, height * 0.36, width * 0.17, [["|alpha|²", alpha], ["|beta|²", beta]], concept.accent);

  const phaseX = width * 0.76 + Math.cos(t * 2) * 38;
  const phaseY = height * 0.28 + Math.sin(t * 2) * 38;
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.beginPath();
  ctx.arc(width * 0.76, height * 0.28, 38, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = concept.accent;
  ctx.beginPath();
  ctx.arc(phaseX, phaseY, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px JetBrains Mono, monospace";
  ctx.fillText("|psi> = alpha|0> + beta|1>", left, height * 0.24);
  drawWrappedText(ctx, "Süperpozisyon olasılıkların basit toplamı değil; genlik ve faz birlikte devre içindeki girişimi belirler.", left, height * 0.74, width * 0.74, 18, "rgba(255,255,255,0.74)", "600 14px Inter, sans-serif");
}

function drawMeasurementConcept(ctx, width, height, concept) {
  const t = conceptFrame;
  const p0 = 0.62 + Math.sin(t) * 0.12;
  const p1 = 1 - p0;
  const result = Math.sin(t * 1.6) > 0.18 ? "0" : "1";

  drawProbabilityBars(ctx, width * 0.12, height * 0.34, width * 0.24, [["|0>", p0], ["|1>", p1]], concept.accent);
  drawArrow(ctx, width * 0.42, height * 0.5, width * 0.56, height * 0.5, concept.accent);

  ctx.fillStyle = "rgba(255,255,255,0.11)";
  roundRect(ctx, width * 0.58, height * 0.31, width * 0.2, height * 0.32, 8);
  ctx.fill();
  ctx.strokeStyle = withAlpha(concept.accent, 0.7);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 16px Inter, sans-serif";
  ctx.fillText("Ölçüm", width * 0.63, height * 0.39);
  ctx.font = "800 64px JetBrains Mono, monospace";
  ctx.fillStyle = concept.accent;
  ctx.fillText(result, width * 0.665, height * 0.56);

  drawArrow(ctx, width * 0.79, height * 0.5, width * 0.9, height * 0.5, "#ffffff");
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px JetBrains Mono, monospace";
  ctx.fillText("klasik skor", width * 0.79, height * 0.66);
  drawWrappedText(ctx, "Modelin sonundaki ölçüm, kuantum durumunu sınıflandırıcıya aktarılabilir klasik istatistiğe çevirir.", width * 0.1, height * 0.78, width * 0.78, 18, "rgba(255,255,255,0.74)", "600 14px Inter, sans-serif");
}

function drawEntanglementConcept(ctx, width, height, concept) {
  const t = conceptFrame;
  const c1 = { x: width * 0.32, y: height * 0.5 };
  const c2 = { x: width * 0.66, y: height * 0.5 };
  const radius = Math.min(width, height) * 0.16;
  [c1, c2].forEach((center, index) => {
    ctx.strokeStyle = "rgba(255,255,255,0.42)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(center.x, center.y, radius, radius * 0.32, 0, 0, Math.PI * 2);
    ctx.stroke();
    drawArrow(ctx, center.x, center.y, center.x + Math.cos(t * 1.2 + index) * radius * 0.62, center.y + Math.sin(t * 1.2 + index) * radius * 0.62, concept.accent);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 15px JetBrains Mono, monospace";
    ctx.fillText(`q${index}`, center.x - 12, center.y + radius + 28);
  });

  ctx.strokeStyle = concept.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = c1.x + radius; x <= c2.x - radius; x += 4) {
    const y = height * 0.5 + Math.sin(x * 0.055 + t * 5) * 18;
    if (x === c1.x + radius) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.fillStyle = withAlpha(concept.accent, 0.14);
  roundRect(ctx, width * 0.38, height * 0.22, width * 0.22, 48, 8);
  ctx.fill();
  ctx.strokeStyle = withAlpha(concept.accent, 0.55);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 15px JetBrains Mono, monospace";
  ctx.fillText("00 ve 11 birlikte güçlenir", width * 0.405, height * 0.25);
  drawWrappedText(ctx, "Dolanıklık, tek tek kubitlerden değil ortak durumdan gelen korelasyonu temsil eder. ZZFeatureMap ve kontrollü kapılar bu etkileşimi üretir.", width * 0.12, height * 0.77, width * 0.76, 18, "rgba(255,255,255,0.74)", "600 14px Inter, sans-serif");
}

function drawDepthConcept(ctx, width, height, concept) {
  const wires = 4;
  const left = width * 0.12;
  const right = width * 0.58;
  const top = height * 0.24;
  const gap = height * 0.09;
  const t = conceptFrame;

  for (let i = 0; i < wires; i += 1) {
    const y = top + i * gap;
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.74)";
    ctx.font = "800 12px JetBrains Mono, monospace";
    ctx.fillText(`q${i}`, left - 36, y + 4);
  }

  [0.25, 0.43, 0.61, 0.79].forEach((ratio, layer) => {
    const x = left + (right - left) * ratio;
    for (let i = 0; i < wires; i += 1) {
      const y = top + i * gap;
      const alpha = 0.45 + Math.sin(t * 2.5 + layer + i) * 0.18;
      ctx.fillStyle = layer < 2 ? withAlpha("#00a6c8", alpha) : withAlpha(concept.accent, alpha);
      roundRect(ctx, x - 18, y - 15, 36, 30, 6);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.38)";
      ctx.stroke();
    }
  });

  drawProbabilityBars(ctx, width * 0.67, height * 0.3, width * 0.2, [["d=1", 0.56], ["d=2", 0.79], ["risk", 0.48 + Math.sin(t) * 0.16]], concept.accent);
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 15px JetBrains Mono, monospace";
  ctx.fillText("kapasite artar, kararlılık garanti değildir", width * 0.17, height * 0.66);
  drawWrappedText(ctx, "Seminer bulgusunda en iyi kubit sayısı ve derinlik veri setine göre değişti: BACE q6-d1, BBBP q4-d1, ClinTox q8-d2.", width * 0.12, height * 0.76, width * 0.78, 18, "rgba(255,255,255,0.74)", "600 14px Inter, sans-serif");
}

function drawSupervisedConcept(ctx, width, height, concept) {
  const y = height * 0.48;
  const blocks = [
    { label: "molekül x", x: width * 0.13, color: "#ffffff" },
    { label: "model fθ", x: width * 0.36, color: concept.accent },
    { label: "tahmin ŷ", x: width * 0.59, color: "#e0a100" },
    { label: "etiket y", x: width * 0.8, color: "#e65f4f" },
  ];
  blocks.forEach((block, index) => {
    ctx.fillStyle = withAlpha(block.color, index === 0 ? 0.12 : 0.2);
    roundRect(ctx, block.x - 58, y - 34, 116, 68, 8);
    ctx.fill();
    ctx.strokeStyle = withAlpha(block.color, 0.8);
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 15px JetBrains Mono, monospace";
    ctx.fillText(block.label, block.x - 42, y + 5);
    if (index < blocks.length - 1) drawArrow(ctx, block.x + 65, y, blocks[index + 1].x - 65, y, "#ffffff");
  });

  ctx.strokeStyle = concept.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width * 0.76, y + 56);
  ctx.bezierCurveTo(width * 0.63, height * 0.77, width * 0.42, height * 0.77, width * 0.36, y + 58);
  ctx.stroke();
  ctx.fillStyle = concept.accent;
  ctx.font = "800 14px JetBrains Mono, monospace";
  ctx.fillText("loss -> parametre güncelleme", width * 0.43, height * 0.72);
  drawWrappedText(ctx, "Bu seminerde tüm modeller denetimli ikili sınıflandırma olarak karşılaştırıldı: aynı veri ayrımı, aynı hedef, aynı metrik ailesi.", width * 0.12, height * 0.82, width * 0.76, 18, "rgba(255,255,255,0.74)", "600 14px Inter, sans-serif");
}

function drawClassicalVisualCanvas() {
  const canvas = document.getElementById("classicalVisualCanvas");
  if (!canvas) return;
  const model = classicalVisuals.find((item) => item.key === selectedClassicalVisual);
  const rectWidth = canvas.getBoundingClientRect().width;
  const compact = rectWidth < 680;
  const { ctx, width, height } = fitCanvas(canvas, compact ? 1.16 : 0.56, compact ? 650 : 430);
  classicalFrame += 0.018;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);
  drawCanvasGrid(ctx, width, height, model.color);

  ctx.fillStyle = withAlpha(model.color, 0.15);
  ctx.beginPath();
  ctx.arc(width * 0.14, height * 0.14, Math.min(width, height) * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = withAlpha("#ffffff", 0.045);
  ctx.beginPath();
  ctx.arc(width * 0.86, height * 0.24, Math.min(width, height) * 0.18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = `800 ${compact ? 17 : 21}px Inter, sans-serif`;
  ctx.fillText(model.title, 28, 36);
  ctx.fillStyle = model.color;
  ctx.font = "800 12px JetBrains Mono, monospace";
  ctx.fillText(tx(model.family).toLocaleUpperCase(currentLanguage === "en" ? "en-US" : "tr-TR"), 28, 59);
  drawWrappedText(ctx, model.summary, 28, 85, width - 56, 17, "rgba(255,255,255,0.72)", "600 13px Inter, sans-serif");

  if (model.key === "svm") drawClassicalSvm(ctx, width, height, model, compact);
  if (model.key === "mlp") drawClassicalMlp(ctx, width, height, model, compact);
  if (model.key === "gnn") drawClassicalGnn(ctx, width, height, model, compact, false);
  if (model.key === "gat") drawClassicalGnn(ctx, width, height, model, compact, true);
}

function drawCanvasGrid(ctx, width, height, color) {
  ctx.strokeStyle = "rgba(255,255,255,0.045)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 34) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 34) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.strokeStyle = withAlpha(color, 0.18);
  ctx.beginPath();
  ctx.moveTo(0, height * 0.72);
  ctx.bezierCurveTo(width * 0.25, height * 0.56, width * 0.62, height * 0.88, width, height * 0.62);
  ctx.stroke();
}

function drawClassicalSvm(ctx, width, height, model, compact) {
  const top = compact ? 132 : 122;
  if (compact) {
    const left = 34;
    const panelW = width - 68;
    const gap = 20;
    const panelH = (height - top - 34 - gap * 2) / 3;
    drawFingerprintPanel(ctx, left, top, panelW, panelH, model.color, classicalFrame);
    drawArrow(ctx, width * 0.5, top + panelH + 3, width * 0.5, top + panelH + gap - 4, model.color);
    drawSvmDecisionPanel(ctx, left, top + panelH + gap, panelW, panelH, model.color, classicalFrame);
    drawArrow(ctx, width * 0.5, top + panelH * 2 + gap + 3, width * 0.5, top + panelH * 2 + gap * 2 - 4, model.color);
    drawScorePanel(ctx, left, top + panelH * 2 + gap * 2, panelW, panelH, model.color, classicalFrame, "karar skoru");
    return;
  }

  const gap = 26;
  const panelH = height - top - 34;
  const leftW = width * 0.24;
  const midW = width * 0.39;
  const rightW = width - 72 - leftW - midW - gap * 2;
  const x1 = 36;
  const x2 = x1 + leftW + gap;
  const x3 = x2 + midW + gap;
  drawFingerprintPanel(ctx, x1, top, leftW, panelH, model.color, classicalFrame);
  drawArrow(ctx, x1 + leftW + 5, top + panelH * 0.5, x2 - 8, top + panelH * 0.5, model.color);
  drawSvmDecisionPanel(ctx, x2, top, midW, panelH, model.color, classicalFrame);
  drawArrow(ctx, x2 + midW + 5, top + panelH * 0.5, x3 - 8, top + panelH * 0.5, model.color);
  drawScorePanel(ctx, x3, top, rightW, panelH, model.color, classicalFrame, "SVM skoru");
}

function drawClassicalMlp(ctx, width, height, model, compact) {
  const top = compact ? 132 : 122;
  if (compact) {
    const left = 34;
    const panelW = width - 68;
    const gap = 20;
    const panelH = (height - top - 34 - gap * 2) / 3;
    drawFingerprintPanel(ctx, left, top, panelW, panelH, model.color, classicalFrame);
    drawArrow(ctx, width * 0.5, top + panelH + 3, width * 0.5, top + panelH + gap - 4, model.color);
    drawMlpNetworkPanel(ctx, left, top + panelH + gap, panelW, panelH, model.color, classicalFrame);
    drawArrow(ctx, width * 0.5, top + panelH * 2 + gap + 3, width * 0.5, top + panelH * 2 + gap * 2 - 4, model.color);
    drawScorePanel(ctx, left, top + panelH * 2 + gap * 2, panelW, panelH, model.color, classicalFrame, "sigmoid");
    return;
  }

  const gap = 26;
  const panelH = height - top - 34;
  const leftW = width * 0.23;
  const midW = width * 0.44;
  const rightW = width - 72 - leftW - midW - gap * 2;
  const x1 = 36;
  const x2 = x1 + leftW + gap;
  const x3 = x2 + midW + gap;
  drawFingerprintPanel(ctx, x1, top, leftW, panelH, model.color, classicalFrame);
  drawArrow(ctx, x1 + leftW + 5, top + panelH * 0.5, x2 - 8, top + panelH * 0.5, model.color);
  drawMlpNetworkPanel(ctx, x2, top, midW, panelH, model.color, classicalFrame);
  drawArrow(ctx, x2 + midW + 5, top + panelH * 0.5, x3 - 8, top + panelH * 0.5, model.color);
  drawScorePanel(ctx, x3, top, rightW, panelH, model.color, classicalFrame, "olasılık");
}

function drawClassicalGnn(ctx, width, height, model, compact, attention) {
  const top = compact ? 132 : 122;
  if (compact) {
    const left = 34;
    const panelW = width - 68;
    const gap = 20;
    const panelH = (height - top - 34 - gap * 2) / 3;
    drawMolecularGraphPanel(ctx, left, top, panelW, panelH, model.color, classicalFrame, attention);
    drawArrow(ctx, width * 0.5, top + panelH + 3, width * 0.5, top + panelH + gap - 4, model.color);
    drawMessagePanel(ctx, left, top + panelH + gap, panelW, panelH, model.color, classicalFrame, attention);
    drawArrow(ctx, width * 0.5, top + panelH * 2 + gap + 3, width * 0.5, top + panelH * 2 + gap * 2 - 4, model.color);
    drawGraphPoolingPanel(ctx, left, top + panelH * 2 + gap * 2, panelW, panelH, model.color, classicalFrame, attention);
    return;
  }

  const gap = 26;
  const panelH = height - top - 34;
  const leftW = width * 0.31;
  const midW = width * 0.31;
  const rightW = width - 72 - leftW - midW - gap * 2;
  const x1 = 36;
  const x2 = x1 + leftW + gap;
  const x3 = x2 + midW + gap;
  drawMolecularGraphPanel(ctx, x1, top, leftW, panelH, model.color, classicalFrame, attention);
  drawArrow(ctx, x1 + leftW + 5, top + panelH * 0.5, x2 - 8, top + panelH * 0.5, model.color);
  drawMessagePanel(ctx, x2, top, midW, panelH, model.color, classicalFrame, attention);
  drawArrow(ctx, x2 + midW + 5, top + panelH * 0.5, x3 - 8, top + panelH * 0.5, model.color);
  drawGraphPoolingPanel(ctx, x3, top, rightW, panelH, model.color, classicalFrame, attention);
}

function drawPanelFrame(ctx, x, y, width, height, title, color) {
  ctx.fillStyle = "rgba(255,255,255,0.055)";
  roundRect(ctx, x, y, width, height, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.fillStyle = withAlpha(color, 0.18);
  roundRect(ctx, x + 12, y + 12, Math.min(width - 24, Math.max(112, width * 0.46)), 28, 6);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 12px JetBrains Mono, monospace";
  ctx.fillText(title, x + 22, y + 31);
}

function drawFingerprintPanel(ctx, x, y, width, height, color, t) {
  drawPanelFrame(ctx, x, y, width, height, "ECFP / Morgan", color);
  const gridX = x + 20;
  const gridY = y + 58;
  const gridW = width - 40;
  const gridH = Math.max(58, height - 96);
  const cols = Math.max(7, Math.floor(gridW / 22));
  const rows = Math.max(3, Math.floor(gridH / 18));
  const cellW = gridW / cols;
  const cellH = gridH / rows;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const active = ((r * 17 + c * 11) % 9) < 3;
      const pulse = 0.45 + Math.sin(t * 5 + r * 0.7 + c * 0.35) * 0.32;
      ctx.fillStyle = active ? withAlpha(color, 0.35 + pulse * 0.45) : "rgba(255,255,255,0.09)";
      roundRect(ctx, gridX + c * cellW + 2, gridY + r * cellH + 2, cellW - 4, cellH - 4, 4);
      ctx.fill();
    }
  }
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "700 12px Inter, sans-serif";
  ctx.fillText("1024 bit kimyasal alt yapı izi", x + 20, y + height - 21);
}

function drawSvmDecisionPanel(ctx, x, y, width, height, color, t) {
  drawPanelFrame(ctx, x, y, width, height, "marj ve destek vektörleri", color);
  const left = x + width * 0.14;
  const bottom = y + height * 0.82;
  const plotW = width * 0.72;
  const plotH = height * 0.56;
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(left, bottom);
  ctx.lineTo(left + plotW, bottom);
  ctx.moveTo(left, bottom);
  ctx.lineTo(left, bottom - plotH);
  ctx.stroke();

  const wobble = Math.sin(t * 1.8) * 0.05;
  const y1 = bottom - plotH * (0.23 + wobble);
  const y2 = bottom - plotH * (0.82 - wobble);
  ctx.strokeStyle = "rgba(255,255,255,0.32)";
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(left + plotW * 0.14, y1 + 24);
  ctx.lineTo(left + plotW * 0.9, y2 + 24);
  ctx.moveTo(left + plotW * 0.14, y1 - 24);
  ctx.lineTo(left + plotW * 0.9, y2 - 24);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(left + plotW * 0.14, y1);
  ctx.lineTo(left + plotW * 0.9, y2);
  ctx.stroke();

  for (let i = 0; i < 30; i += 1) {
    const px = left + plotW * (0.09 + ((i * 37) % 82) / 100);
    const py = bottom - plotH * (0.08 + ((i * 23) % 82) / 100);
    const lineY = y1 + ((px - left - plotW * 0.14) / (plotW * 0.76)) * (y2 - y1);
    const positive = py < lineY;
    ctx.fillStyle = positive ? "#e65f4f" : color;
    ctx.beginPath();
    ctx.arc(px, py, positive ? 4.5 : 4, 0, Math.PI * 2);
    ctx.fill();
    if (Math.abs(py - lineY) < 18) {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(px, py, 8 + Math.sin(t * 4 + i) * 1.5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "700 12px Inter, sans-serif";
  ctx.fillText("f(x) = w.x + b", x + 20, y + height - 21);
}

function drawMlpNetworkPanel(ctx, x, y, width, height, color, t) {
  drawPanelFrame(ctx, x, y, width, height, "yoğun katman akışı", color);
  const layers = [6, 7, 5, 3, 1];
  const left = x + width * 0.13;
  const right = x + width * 0.86;
  const top = y + height * 0.25;
  const layerGap = (right - left) / (layers.length - 1);
  const positions = [];
  layers.forEach((count, layer) => {
    const lx = left + layer * layerGap;
    const nodeGap = (height * 0.48) / Math.max(1, count - 1);
    positions[layer] = [];
    for (let i = 0; i < count; i += 1) positions[layer].push([lx, top + i * nodeGap]);
  });

  positions.forEach((layer, index) => {
    if (index === positions.length - 1) return;
    layer.forEach(([sx, sy], from) => {
      positions[index + 1].forEach(([tx, ty], to) => {
        const pulse = 0.5 + Math.sin(t * 4 + index * 0.8 + from * 0.4 + to * 0.2) * 0.5;
        ctx.strokeStyle = withAlpha(color, 0.08 + pulse * 0.24);
        ctx.lineWidth = 0.7 + pulse * 1.4;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      });
    });
  });

  positions.flat().forEach(([nx, ny], index) => {
    const dropped = index % 11 === 5;
    ctx.fillStyle = dropped ? "rgba(255,255,255,0.1)" : (index % 3 === 0 ? color : "#ffffff");
    ctx.beginPath();
    ctx.arc(nx, ny, dropped ? 6 : 7.5, 0, Math.PI * 2);
    ctx.fill();
    if (dropped) {
      ctx.strokeStyle = "#e65f4f";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(nx - 6, ny - 6);
      ctx.lineTo(nx + 6, ny + 6);
      ctx.moveTo(nx + 6, ny - 6);
      ctx.lineTo(nx - 6, ny + 6);
      ctx.stroke();
    }
  });

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "700 12px Inter, sans-serif";
  ctx.fillText("aktivasyon + dropout + sigmoid", x + 20, y + height - 21);
}

function drawScorePanel(ctx, x, y, width, height, color, t, label) {
  drawPanelFrame(ctx, x, y, width, height, label, color);
  const cx = x + width * 0.5;
  const cy = y + height * 0.47;
  const radius = Math.min(width, height) * 0.24;
  const value = 0.68 + Math.sin(t * 1.6) * 0.08;
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, Math.PI * 0.82, Math.PI * 2.18);
  ctx.stroke();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, Math.PI * 0.82, Math.PI * (0.82 + 1.36 * value));
  ctx.stroke();
  const angle = Math.PI * (0.82 + 1.36 * value);
  drawArrow(ctx, cx, cy, cx + Math.cos(angle) * radius * 0.72, cy + Math.sin(angle) * radius * 0.72, "#ffffff");
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 24px JetBrains Mono, monospace";
  ctx.fillText(value.toFixed(2), cx - 34, cy + 10);
  drawProbabilityBars(ctx, x + width * 0.14, y + height * 0.72, width * 0.5, [["P(aktif)", value]], color);
}

function drawMolecularGraphPanel(ctx, x, y, width, height, color, t, attention) {
  drawPanelFrame(ctx, x, y, width, height, attention ? "moleküler grafik + dikkat" : "moleküler grafik", color);
  const nodes = graphNodes(x, y, width, height);
  const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [4, 5], [5, 2], [3, 6], [6, 0]];
  edges.forEach(([a, b], index) => {
    const pulse = 0.5 + Math.sin(t * 4.5 + index) * 0.5;
    ctx.strokeStyle = attention ? withAlpha(color, 0.18 + pulse * 0.66) : "rgba(255,255,255,0.27)";
    ctx.lineWidth = attention ? 1.4 + pulse * 4.2 : 2;
    ctx.beginPath();
    ctx.moveTo(nodes[a].x, nodes[a].y);
    ctx.lineTo(nodes[b].x, nodes[b].y);
    ctx.stroke();
    if (!attention) {
      const dotT = (t * 0.85 + index * 0.13) % 1;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(nodes[a].x + (nodes[b].x - nodes[a].x) * dotT, nodes[a].y + (nodes[b].y - nodes[a].y) * dotT, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  const labels = ["C", "N", "C", "O", "C", "S", "Cl"];
  nodes.forEach((node, index) => {
    ctx.fillStyle = index % 2 === 0 ? color : "#ffffff";
    ctx.beginPath();
    ctx.arc(node.x, node.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.72)";
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.fillStyle = index % 2 === 0 ? "#101216" : "#101216";
    ctx.font = "800 10px JetBrains Mono, monospace";
    ctx.fillText(labels[index], node.x - (labels[index].length > 1 ? 7 : 4), node.y + 4);
  });

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "700 12px Inter, sans-serif";
  ctx.fillText(attention ? "kalın bağ = yüksek dikkat ağırlığı" : "hareketli noktalar = komşuluk mesajı", x + 20, y + height - 21);
}

function graphNodes(x, y, width, height) {
  return [
    { x: x + width * 0.26, y: y + height * 0.46 },
    { x: x + width * 0.39, y: y + height * 0.29 },
    { x: x + width * 0.57, y: y + height * 0.39 },
    { x: x + width * 0.47, y: y + height * 0.62 },
    { x: x + width * 0.73, y: y + height * 0.31 },
    { x: x + width * 0.77, y: y + height * 0.59 },
    { x: x + width * 0.25, y: y + height * 0.68 },
  ];
}

function drawMessagePanel(ctx, x, y, width, height, color, t, attention) {
  drawPanelFrame(ctx, x, y, width, height, attention ? "ağırlıklı mesaj" : "mesaj geçirme", color);
  const sourceX = x + width * 0.18;
  const targetX = x + width * 0.73;
  const rows = attention ? [
    ["C", 0.16],
    ["N", 0.44],
    ["O", 0.28],
    ["S", 0.12],
  ] : [
    ["C", 0.25],
    ["N", 0.25],
    ["O", 0.25],
    ["S", 0.25],
  ];
  rows.forEach(([label, weight], index) => {
    const rowY = y + height * (0.27 + index * 0.13);
    ctx.fillStyle = withAlpha(color, attention ? 0.18 + weight : 0.28);
    roundRect(ctx, sourceX - 18, rowY - 15, 48, 30, 6);
    ctx.fill();
    ctx.strokeStyle = withAlpha(color, 0.65);
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 12px JetBrains Mono, monospace";
    ctx.fillText(label, sourceX, rowY + 4);

    const pulse = (t * 0.95 + index * 0.2) % 1;
    ctx.strokeStyle = withAlpha(color, 0.22 + weight * 0.9);
    ctx.lineWidth = attention ? 1.4 + weight * 6 : 2.2;
    ctx.beginPath();
    ctx.moveTo(sourceX + 40, rowY);
    ctx.lineTo(targetX - 30, y + height * 0.5);
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(sourceX + 40 + (targetX - sourceX - 70) * pulse, rowY + (y + height * 0.5 - rowY) * pulse, 3.8, 0, Math.PI * 2);
    ctx.fill();
    if (attention) {
      ctx.fillStyle = "rgba(255,255,255,0.72)";
      ctx.font = "800 11px JetBrains Mono, monospace";
      ctx.fillText(`alpha=${weight.toFixed(2)}`, sourceX + 54, rowY - 8);
    }
  });

  ctx.fillStyle = withAlpha(color, 0.22);
  roundRect(ctx, targetX - 28, y + height * 0.39, 72, 58, 8);
  ctx.fill();
  ctx.strokeStyle = withAlpha(color, 0.74);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 13px JetBrains Mono, monospace";
  ctx.fillText("h_v'", targetX - 5, y + height * 0.51);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "700 12px Inter, sans-serif";
  ctx.fillText(attention ? "GAT komşuları eşit görmez" : "GNN komşuları toplar ve günceller", x + 20, y + height - 21);
}

function drawGraphPoolingPanel(ctx, x, y, width, height, color, t, attention) {
  drawPanelFrame(ctx, x, y, width, height, attention ? "dikkatli havuzlama" : "grafik havuzlama", color);
  const barX = x + width * 0.16;
  const barY = y + height * 0.27;
  const barW = width * 0.42;
  const rows = [
    ["h1", 0.35 + Math.sin(t * 1.4) * 0.08],
    ["h2", 0.72 + Math.sin(t * 1.1 + 1) * 0.07],
    ["h3", 0.54 + Math.sin(t * 1.2 + 2) * 0.06],
    ["h4", 0.82 + Math.sin(t * 1.3 + 3) * 0.05],
  ];
  const rowGap = Math.max(29, Math.min(43, height * 0.15));
  rows.forEach(([label, value], index) => {
    const rowY = barY + index * rowGap;
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.font = "800 11px JetBrains Mono, monospace";
    ctx.fillText(label, barX, rowY);
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    roundRect(ctx, barX + 28, rowY - 10, barW, 11, 999);
    ctx.fill();
    ctx.fillStyle = color;
    roundRect(ctx, barX + 28, rowY - 10, barW * Math.max(0.05, Math.min(1, value)), 11, 999);
    ctx.fill();
  });
  drawArrow(ctx, x + width * 0.63, y + height * 0.48, x + width * 0.78, y + height * 0.48, color);
  ctx.fillStyle = withAlpha(color, 0.22);
  roundRect(ctx, x + width * 0.8, y + height * 0.33, width * 0.14, height * 0.28, 8);
  ctx.fill();
  ctx.strokeStyle = withAlpha(color, 0.75);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 17px JetBrains Mono, monospace";
  ctx.fillText((attention ? "0.82" : "0.76"), x + width * 0.825, y + height * 0.49);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "700 12px Inter, sans-serif";
  ctx.fillText("molekül temsili -> sınıf skoru", x + 20, y + height - 21);
}

function drawModelArchitectureCanvas() {
  const canvas = document.getElementById("modelArchitectureCanvas");
  if (!canvas) return;
  const model = architectureModels.find((item) => item.key === selectedArchitecture);
  const { ctx, width, height } = fitCanvas(canvas, 0.54, 440);
  architectureFrame += 0.018;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = withAlpha(model.color, 0.14);
  ctx.beginPath();
  ctx.arc(width * 0.14, height * 0.18, Math.min(width, height) * 0.24, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 20px Inter, sans-serif";
  ctx.fillText(`${model.label} mimarisi`, 28, 36);
  ctx.fillStyle = model.color;
  ctx.font = "800 12px JetBrains Mono, monospace";
  ctx.fillText(tx(model.family).toLocaleUpperCase(currentLanguage === "en" ? "en-US" : "tr-TR"), 28, 58);

  const signatureTop = drawArchitectureFlow(ctx, model, width, height);
  drawModelSignature(ctx, model, 34, signatureTop, width - 68, height - signatureTop - 28);
}

function drawArchitectureFlow(ctx, model, width, height) {
  const compact = width < 560;
  const blocks = model.blocks;

  if (compact) {
    const blockW = width - 72;
    const blockH = 42;
    const left = 36;
    const top = 80;
    const gap = 9;
    blocks.forEach((label, index) => {
      const y = top + index * (blockH + gap);
      drawBlock(ctx, left, y, blockW, blockH, label, model.color, index);
      if (index < blocks.length - 1) drawArrow(ctx, width * 0.5, y + blockH + 2, width * 0.5, y + blockH + gap - 2, "#ffffff");
    });
    return top + blocks.length * (blockH + gap) + 14;
  }

  const left = 34;
  const top = 86;
  const gap = 16;
  const available = width - left * 2 - gap * (blocks.length - 1);
  const blockW = Math.min(160, available / blocks.length);
  const blockH = 70;
  const startX = (width - (blockW * blocks.length + gap * (blocks.length - 1))) / 2;
  blocks.forEach((label, index) => {
    const x = startX + index * (blockW + gap);
    drawBlock(ctx, x, top, blockW, blockH, label, model.color, index);
    if (index < blocks.length - 1) drawArrow(ctx, x + blockW + 3, top + blockH / 2, x + blockW + gap - 3, top + blockH / 2, "#ffffff");
  });
  return top + blockH + 42;
}

function drawModelSignature(ctx, model, x, y, width, height) {
  ctx.fillStyle = "rgba(255,255,255,0.055)";
  roundRect(ctx, x, y, width, height, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.stroke();

  if (model.key === "svm") drawSvmPlane(ctx, x, y, width, height, model.color);
  if (model.key === "mlp") drawDenseNetwork(ctx, x, y, width, height, model.color);
  if (model.key === "gnn") drawGraphSignature(ctx, x, y, width, height, model.color, false, false);
  if (model.key === "gat") drawGraphSignature(ctx, x, y, width, height, model.color, true, false);
  if (model.key === "qsvm") drawQuantumSignature(ctx, x, y, width, height, model.color, "kernel");
  if (model.key === "vqc") drawQuantumSignature(ctx, x, y, width, height, model.color, "ansatz");
  if (model.key === "qgnn") drawGraphSignature(ctx, x, y, width, height, model.color, true, true);
  if (model.key === "hybrid") drawHybridSignature(ctx, x, y, width, height, model.color);
}

function drawBlock(ctx, x, y, width, height, label, color, index) {
  ctx.fillStyle = withAlpha(color, 0.18 + index * 0.025);
  roundRect(ctx, x, y, width, height, 8);
  ctx.fill();
  ctx.strokeStyle = withAlpha(color, 0.78);
  ctx.lineWidth = 1.4;
  ctx.stroke();
  drawWrappedText(ctx, label, x + 10, y + height * 0.42, width - 20, 15, "#ffffff", "800 13px Inter, sans-serif");
}

function drawSvmPlane(ctx, x, y, width, height, color) {
  const left = x + width * 0.15;
  const bottom = y + height * 0.82;
  const plotW = width * 0.7;
  const plotH = height * 0.58;
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.beginPath();
  ctx.moveTo(left, bottom);
  ctx.lineTo(left + plotW, bottom);
  ctx.moveTo(left, bottom);
  ctx.lineTo(left, bottom - plotH);
  ctx.stroke();

  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(left + plotW * 0.12, bottom - plotH * 0.18);
  ctx.lineTo(left + plotW * 0.88, bottom - plotH * 0.84);
  ctx.stroke();

  for (let i = 0; i < 26; i += 1) {
    const px = left + plotW * (0.12 + ((i * 37) % 75) / 100);
    const py = bottom - plotH * (0.12 + ((i * 19) % 72) / 100);
    const side = py > bottom - plotH * 0.95 + (px - left) * 0.72;
    ctx.fillStyle = side ? "#00a6c8" : "#e65f4f";
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  drawWrappedText(ctx, "SVM, descriptor uzayında sınıfları ayıran en geniş marjlı sınırı arar.", x + 22, y + 24, width * 0.82, 17, "rgba(255,255,255,0.76)", "600 14px Inter, sans-serif");
}

function drawDenseNetwork(ctx, x, y, width, height, color) {
  const layers = [5, 7, 5, 1];
  const left = x + width * 0.16;
  const right = x + width * 0.84;
  const top = y + height * 0.25;
  const layerGap = (right - left) / (layers.length - 1);
  const positions = [];
  layers.forEach((count, layer) => {
    const lx = left + layer * layerGap;
    const nodeGap = (height * 0.48) / Math.max(1, count - 1);
    positions[layer] = [];
    for (let i = 0; i < count; i += 1) {
      const ly = top + i * nodeGap;
      positions[layer].push([lx, ly]);
    }
  });
  ctx.strokeStyle = "rgba(255,255,255,0.13)";
  positions.forEach((layer, index) => {
    if (index === positions.length - 1) return;
    layer.forEach(([sx, sy]) => {
      positions[index + 1].forEach(([tx, ty]) => {
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      });
    });
  });
  positions.flat().forEach(([nx, ny], index) => {
    ctx.fillStyle = index % 3 === 0 ? color : "#ffffff";
    ctx.beginPath();
    ctx.arc(nx, ny, 7, 0, Math.PI * 2);
    ctx.fill();
  });
  drawWrappedText(ctx, "MLP, ECFP vektörünü katman katman soyutlayarak doğrusal olmayan karar fonksiyonu üretir.", x + 22, y + 24, width * 0.82, 17, "rgba(255,255,255,0.76)", "600 14px Inter, sans-serif");
}

function drawGraphSignature(ctx, x, y, width, height, color, attention, quantum) {
  const nodes = [
    [x + width * 0.24, y + height * 0.42],
    [x + width * 0.39, y + height * 0.28],
    [x + width * 0.53, y + height * 0.46],
    [x + width * 0.42, y + height * 0.65],
    [x + width * 0.67, y + height * 0.34],
    [x + width * 0.71, y + height * 0.62],
  ];
  const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [4, 5], [5, 2]];
  edges.forEach(([a, b], index) => {
    const pulse = 0.5 + Math.sin(architectureFrame * 4 + index) * 0.5;
    ctx.strokeStyle = attention ? withAlpha(color, 0.28 + pulse * 0.5) : "rgba(255,255,255,0.25)";
    ctx.lineWidth = attention ? 1.5 + pulse * 3 : 2;
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);
    ctx.stroke();
  });
  nodes.forEach(([nx, ny], index) => {
    ctx.fillStyle = quantum && index % 2 === 0 ? "#c93d8d" : color;
    ctx.beginPath();
    ctx.arc(nx, ny, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.3;
    ctx.stroke();
  });
  if (quantum) {
    drawQuantumWires(ctx, x + width * 0.2, y + height * 0.78, width * 0.62, height * 0.13, color);
  }
  const message = quantum
    ? "QGNN, grafik mesajlarını kuantum katman fikriyle birleştirir."
    : attention
      ? "GAT, komşuların katkısını dikkat ağırlıklarıyla değiştirir."
      : "GNN, atom komşuluklarından mesaj toplayarak molekül temsili oluşturur.";
  drawWrappedText(ctx, message, x + 22, y + 24, width * 0.82, 17, "rgba(255,255,255,0.76)", "600 14px Inter, sans-serif");
}

function drawQuantumSignature(ctx, x, y, width, height, color, mode) {
  drawQuantumWires(ctx, x + width * 0.1, y + height * 0.3, width * 0.58, height * 0.36, color);
  if (mode === "kernel") {
    const startX = x + width * 0.73;
    const startY = y + height * 0.33;
    const cell = Math.min(26, width * 0.04);
    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        const alpha = 0.18 + (((r + c) % 4) / 4) * 0.65;
        ctx.fillStyle = withAlpha(color, alpha);
        ctx.fillRect(startX + c * cell, startY + r * cell, cell - 2, cell - 2);
      }
    }
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 12px JetBrains Mono, monospace";
    ctx.fillText("çekirdek", startX, startY + cell * 4 + 20);
  } else {
    for (let i = 0; i < 3; i += 1) {
      const knobX = x + width * (0.73 + i * 0.07);
      const knobY = y + height * 0.45;
      ctx.strokeStyle = withAlpha(color, 0.85);
      ctx.beginPath();
      ctx.arc(knobX, knobY, 22, 0, Math.PI * 2);
      ctx.stroke();
      drawArrow(ctx, knobX, knobY, knobX + Math.cos(architectureFrame + i) * 18, knobY + Math.sin(architectureFrame + i) * 18, color);
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 11px JetBrains Mono, monospace";
      ctx.fillText(`θ${i + 1}`, knobX - 9, knobY + 42);
    }
  }
  const message = mode === "kernel"
    ? "QSVM, kuantum özellik haritası sonrası örnekler arası çekirdek benzerliğini SVM'e verir."
    : "VQC, parametrik ansatz ağırlıklarını eğiterek ölçümden sınıf olasılığı çıkarır.";
  drawWrappedText(ctx, message, x + 22, y + 24, width * 0.82, 17, "rgba(255,255,255,0.76)", "600 14px Inter, sans-serif");
}

function drawHybridSignature(ctx, x, y, width, height, color) {
  drawWrappedText(ctx, "Hybrid QHead, klasik kodlayıcı temsilini kuantum başlıkla yeniden işler; seminerde en rekabetçi kuantum-klasik yapı budur.", x + 22, y + 24, width * 0.86, 17, "rgba(255,255,255,0.76)", "600 14px Inter, sans-serif");

  const layers = [4, 5, 3];
  const left = x + width * 0.12;
  const top = y + height * 0.42;
  const layerGap = width * 0.12;
  const positions = [];
  layers.forEach((count, layer) => {
    const lx = left + layer * layerGap;
    const nodeGap = (height * 0.28) / Math.max(1, count - 1);
    positions[layer] = [];
    for (let i = 0; i < count; i += 1) {
      positions[layer].push([lx, top + i * nodeGap]);
    }
  });
  ctx.strokeStyle = "rgba(255,255,255,0.13)";
  positions.forEach((layer, index) => {
    if (index === positions.length - 1) return;
    layer.forEach(([sx, sy]) => {
      positions[index + 1].forEach(([tx, ty]) => {
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      });
    });
  });
  positions.flat().forEach(([nx, ny], index) => {
    ctx.fillStyle = index % 2 === 0 ? "#00a6c8" : "#ffffff";
    ctx.beginPath();
    ctx.arc(nx, ny, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  drawArrow(ctx, x + width * 0.44, y + height * 0.56, x + width * 0.56, y + height * 0.56, color);
  drawQuantumWires(ctx, x + width * 0.59, y + height * 0.43, width * 0.31, height * 0.26, color);
  ctx.fillStyle = color;
  ctx.font = "800 13px JetBrains Mono, monospace";
  ctx.fillText("dondurulmuş kodlayıcı", x + width * 0.12, y + height * 0.82);
  ctx.fillText("kuantum başlık", x + width * 0.63, y + height * 0.82);
}

function drawQuantumWires(ctx, x, y, width, height, color) {
  const wires = 4;
  const gap = height / Math.max(1, wires - 1);
  for (let i = 0; i < wires; i += 1) {
    const wy = y + i * gap;
    ctx.strokeStyle = "rgba(255,255,255,0.26)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x, wy);
    ctx.lineTo(x + width, wy);
    ctx.stroke();
  }
  [0.24, 0.48, 0.72].forEach((ratio, gate) => {
    const gx = x + width * ratio;
    for (let i = 0; i < wires; i += 1) {
      const gy = y + i * gap;
      ctx.fillStyle = withAlpha(gate === 1 ? "#e65f4f" : color, 0.65 + Math.sin(architectureFrame * 3 + i + gate) * 0.12);
      roundRect(ctx, gx - 15, gy - 13, 30, 26, 5);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.38)";
      ctx.stroke();
    }
  });
}

function drawProbabilityBars(ctx, x, y, width, rows, color) {
  rows.forEach(([label, value], index) => {
    const rowY = y + index * 48;
    ctx.fillStyle = "rgba(255,255,255,0.78)";
    ctx.font = "800 12px JetBrains Mono, monospace";
    ctx.fillText(label, x, rowY);
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    roundRect(ctx, x, rowY + 10, width, 12, 999);
    ctx.fill();
    ctx.fillStyle = color;
    roundRect(ctx, x, rowY + 10, width * Math.max(0.02, Math.min(1, value)), 12, 999);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 11px JetBrains Mono, monospace";
    ctx.fillText(value.toFixed(2), x + width + 10, rowY + 20);
  });
}

function drawArrow(ctx, x1, y1, x2, y2, color) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - Math.cos(angle - 0.45) * 10, y2 - Math.sin(angle - 0.45) * 10);
  ctx.lineTo(x2 - Math.cos(angle + 0.45) * 10, y2 - Math.sin(angle + 0.45) * 10);
  ctx.closePath();
  ctx.fill();
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, color, font) {
  text = tx(text);
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  ctx.fillStyle = color;
  ctx.font = font;
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = test;
    }
  });
  if (line) ctx.fillText(line, x, currentY);
  return currentY + lineHeight - y;
}

function withAlpha(hex, alpha) {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawHeroQuantumCanvas() {
  const canvas = document.getElementById("heroQuantumCanvas");
  if (!canvas) return;
  const { ctx, width, height } = fitFixedCanvas(canvas, 320, 560);
  const t = extendedFrame || 0;
  const compact = width < 720;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.045)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 44) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 44) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const particleCount = compact ? 42 : 86;
  for (let i = 0; i < particleCount; i += 1) {
    const x = (Math.sin(i * 12.989 + t * 0.8) * 43758.5453) % 1;
    const y = (Math.sin(i * 78.233 + t * 0.45) * 24634.6345) % 1;
    const px = Math.abs(x) * width;
    const py = Math.abs(y) * height;
    const color = i % 5 === 0 ? "#7b61ff" : i % 3 === 0 ? "#00a6c8" : "#24a148";
    ctx.fillStyle = withAlpha(color, 0.22);
    ctx.beginPath();
    ctx.arc(px, py, 1.6 + (i % 4) * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  const bitX = compact ? width * 0.18 : width * 0.58;
  const bitY = compact ? height * 0.64 : height * 0.26;
  const bitW = compact ? width * 0.34 : width * 0.2;
  const bitH = compact ? 104 : 126;
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  roundRect(ctx, bitX, bitY, bitW, bitH, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 13px JetBrains Mono, monospace";
  ctx.fillText("Klasik bit", bitX + 16, bitY + 28);
  ctx.font = "800 34px JetBrains Mono, monospace";
  const activeBit = Math.sin(t * 1.7) > 0 ? "1" : "0";
  ctx.fillText(activeBit, bitX + 18, bitY + 72);
  ctx.fillStyle = "rgba(255,255,255,0.62)";
  ctx.font = "700 12px Inter, sans-serif";
  ctx.fillText("kesin 0/1", bitX + 18, bitY + 96);

  const railY = bitY + bitH + 36;
  ctx.strokeStyle = "#00a6c8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = bitX; x <= bitX + bitW; x += 7) {
    const pulse = Math.sin(x * 0.06 + t * 5) > 0 ? -22 : 22;
    const py = railY + pulse;
    if (x === bitX) ctx.moveTo(x, py);
    else ctx.lineTo(x, py);
  }
  ctx.stroke();

  const sphereR = Math.min(width, height) * (compact ? 0.17 : 0.18);
  const cx = compact ? width * 0.68 : width * 0.82;
  const cy = compact ? height * 0.32 : height * 0.45;
  ctx.strokeStyle = "rgba(255,255,255,0.42)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, sphereR, sphereR * 0.34, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, sphereR * 0.34, sphereR, 0, 0, Math.PI * 2);
  ctx.stroke();

  const vx = cx + Math.cos(t * 1.35) * sphereR * 0.68;
  const vy = cy - sphereR * 0.18 + Math.sin(t * 1.08) * sphereR * 0.6;
  drawArrow(ctx, cx, cy, vx, vy, "#7b61ff");
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 13px JetBrains Mono, monospace";
  ctx.fillText("Kubit", cx - 22, cy - sphereR - 24);
  ctx.fillStyle = "#7b61ff";
  ctx.fillText("süperpozisyon", cx - sphereR * 0.74, cy + sphereR + 34);

  const p0 = 0.5 + Math.sin(t * 1.35) * 0.27;
  const barsX = compact ? width * 0.52 : width * 0.72;
  const barsY = compact ? height * 0.54 : height * 0.7;
  drawProbabilityBars(ctx, barsX, barsY, compact ? width * 0.26 : width * 0.16, [["P(0)", p0], ["P(1)", 1 - p0]], "#e0a100");

  drawArrow(ctx, bitX + bitW + 18, bitY + 48, cx - sphereR - 18, cy - 12, "#ffffff");
  drawWrappedText(
    ctx,
    "Bit kesin durum taşır; kubit ölçümden önce genlik ve faz taşır. Seminerde klasik ve kuantum farkı buradan başlar.",
    compact ? width * 0.08 : width * 0.56,
    compact ? height * 0.82 : height * 0.83,
    compact ? width * 0.84 : width * 0.34,
    18,
    "rgba(255,255,255,0.72)",
    "700 14px Inter, sans-serif",
  );
}

function drawDatasetMeaningCanvas() {
  const canvas = document.getElementById("datasetMeaningCanvas");
  if (!canvas) return;
  const compact = canvas.getBoundingClientRect().width < 720;
  const { ctx, width, height } = fitCanvas(canvas, compact ? 1.16 : 0.52, compact ? 620 : 430);
  const t = extendedFrame;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);
  drawCanvasGrid(ctx, width, height, "#00a6c8");

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText("Biyomedikal görev haritası", 24, 34);
  ctx.fillStyle = "rgba(255,255,255,0.68)";
  ctx.font = "700 12px Inter, sans-serif";
  ctx.fillText("Satır sayısı + sınıf dengesi + klinik soru birlikte okunur.", 24, 56);

  const pad = compact ? 22 : 30;
  const panelGap = compact ? 16 : 18;
  const panelW = compact ? width - pad * 2 : (width - pad * 2 - panelGap * 2) / 3;
  const panelH = compact ? (height - 92 - panelGap * 2 - 24) / 3 : height - 124;
  taskOrder.forEach((task, index) => {
    const item = datasets[task];
    const stats = testClassStats(task);
    const x = compact ? pad : pad + index * (panelW + panelGap);
    const y = compact ? 86 + index * (panelH + panelGap) : 88;
    const ratio = stats.positiveRatio;
    const glow = 0.12 + ((Math.sin(t * 2 + index) + 1) / 2) * 0.08;

    ctx.fillStyle = withAlpha(item.accent, glow);
    roundRect(ctx, x, y, panelW, panelH, 8);
    ctx.fill();
    ctx.strokeStyle = withAlpha(item.accent, 0.72);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 17px Inter, sans-serif";
    ctx.fillText(item.label, x + 16, y + 28);
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    drawWrappedText(ctx, item.task, x + 16, y + 52, panelW - 32, 16, "rgba(255,255,255,0.72)", "700 12px Inter, sans-serif");

    const splitY = y + (compact ? 86 : 100);
    const splitTotal = item.splits.train + item.splits.val + item.splits.test;
    const splitW = panelW - 32;
    let cursor = x + 16;
    [
      ["eğitim", item.splits.train, "#00a6c8"],
      ["doğrulama", item.splits.val, "#e0a100"],
      ["test", item.splits.test, "#e65f4f"],
    ].forEach(([label, value, color]) => {
      const w = splitW * (value / splitTotal);
      ctx.fillStyle = withAlpha(color, 0.75);
      roundRect(ctx, cursor, splitY, Math.max(8, w), 16, 999);
      ctx.fill();
      cursor += w;
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "800 10px JetBrains Mono, monospace";
      ctx.fillText(`${label} ${value}`, x + 16, splitY + 36 + (label === "eğitim" ? 0 : label === "doğrulama" ? 15 : 30));
    });

    const barY = y + panelH - 58;
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    roundRect(ctx, x + 16, barY, splitW, 18, 999);
    ctx.fill();
    ctx.fillStyle = "#6f7a86";
    roundRect(ctx, x + 16, barY, splitW * (1 - ratio), 18, 999);
    ctx.fill();
    ctx.fillStyle = item.accent;
    roundRect(ctx, x + 16 + splitW * (1 - ratio), barY, splitW * ratio, 18, 999);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 11px JetBrains Mono, monospace";
    ctx.fillText(`test 0:${stats.negative} / 1:${stats.positive}`, x + 16, barY - 10);
    ctx.fillText(`${(ratio * 100).toFixed(1)}% pozitif`, x + 16, barY + 42);
  });
}

function drawDataRepresentationCanvas() {
  const canvas = document.getElementById("dataRepresentationCanvas");
  if (!canvas) return;
  const compact = canvas.getBoundingClientRect().width < 720;
  const { ctx, width, height } = fitCanvas(canvas, compact ? 1.18 : 0.52, compact ? 640 : 430);
  const t = extendedFrame;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);
  drawCanvasGrid(ctx, width, height, "#24a148");

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText("Temsil dönüşüm katmanı", 24, 34);
  ctx.fillStyle = "rgba(255,255,255,0.68)";
  ctx.font = "700 12px Inter, sans-serif";
  ctx.fillText("Aynı molekül üç model çizgisinde farklı bilgi geometrisine dönüşür.", 24, 56);

  const steps = [
    { key: "smiles", label: "SMILES", sub: "CC(=O)Nc1ccc(O)cc1", color: "#ffffff" },
    { key: "graph", label: "Molekül grafiği", sub: "atom + bağ", color: "#24a148" },
    { key: "ecfp", label: "ECFP 1024", sub: "radius 2 bit vektörü", color: "#00a6c8" },
    { key: "pca", label: "PCA / kodlayıcı", sub: "q boyutlu temsil", color: "#e0a100" },
    { key: "qubit", label: "Kubit devresi", sub: "QSVM · VQC · QHead", color: "#7b61ff" },
  ];

  const startY = compact ? 92 : 110;
  const panelW = compact ? width - 48 : (width - 88) / steps.length;
  const panelH = compact ? 84 : height * 0.58;
  const gap = compact ? 18 : 10;
  steps.forEach((step, index) => {
    const x = compact ? 24 : 24 + index * (panelW + gap);
    const y = compact ? startY + index * (panelH + gap) : startY;
    const pulse = 0.5 + Math.sin(t * 2.4 + index) * 0.5;
    ctx.fillStyle = withAlpha(step.color === "#ffffff" ? "#00a6c8" : step.color, 0.12 + pulse * 0.08);
    roundRect(ctx, x, y, panelW, panelH, 8);
    ctx.fill();
    ctx.strokeStyle = withAlpha(step.color === "#ffffff" ? "#ffffff" : step.color, 0.68);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 13px Inter, sans-serif";
    drawWrappedText(ctx, step.label, x + 12, y + 24, panelW - 24, 15, "#ffffff", "800 13px Inter, sans-serif");
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "800 10px JetBrains Mono, monospace";
    drawWrappedText(ctx, step.sub, x + 12, y + 48, panelW - 24, 13, "rgba(255,255,255,0.65)", "800 10px JetBrains Mono, monospace");

    if (step.key === "smiles") {
      ctx.fillStyle = "#e0a100";
      ctx.font = "800 20px JetBrains Mono, monospace";
      ctx.fillText("C", x + panelW * 0.46, y + panelH * 0.68);
    }
    if (step.key === "graph") drawMoleculeGlyph(ctx, x + panelW * 0.52, y + panelH * 0.68, Math.min(panelW, panelH) * 0.24, step.color);
    if (step.key === "ecfp") drawFingerprintBits(ctx, x + 14, y + panelH * 0.6, panelW - 28, panelH * 0.2, t);
    if (step.key === "pca") {
      for (let i = 0; i < 32; i += 1) {
        const px = x + panelW * (0.2 + ((i * 17) % 60) / 100);
        const py = y + panelH * (0.58 + ((i * 29) % 28) / 100);
        ctx.fillStyle = i % 2 ? "#00a6c8" : step.color;
        ctx.beginPath();
        ctx.arc(px, py + Math.sin(t * 2 + i) * 4, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (step.key === "qubit") drawQuantumWires(ctx, x + 14, y + panelH * 0.58, panelW - 28, panelH * 0.24, step.color);

    if (index < steps.length - 1) {
      if (compact) drawArrow(ctx, x + panelW * 0.5, y + panelH + 2, x + panelW * 0.5, y + panelH + gap - 4, step.color);
      else drawArrow(ctx, x + panelW + 2, y + panelH * 0.54, x + panelW + gap - 2, y + panelH * 0.54, step.color);
    }
  });

  const lanesY = compact ? height - 54 : height - 52;
  const lanes = [
    ["klasik modeller", "#00a6c8"],
    ["grafik modeller", "#24a148"],
    ["kuantum modeller", "#7b61ff"],
  ];
  const laneW = compact ? (width - 64) / 3 : 170;
  lanes.forEach(([label, color], index) => {
    const x = compact ? 24 + index * laneW : width * 0.44 + index * (laneW + 16);
    ctx.fillStyle = withAlpha(color, 0.18);
    roundRect(ctx, x, lanesY - 22, laneW - 8, 34, 7);
    ctx.fill();
    ctx.strokeStyle = withAlpha(color, 0.65);
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 11px JetBrains Mono, monospace";
    ctx.fillText(label, x + 10, lanesY);
  });
}

function drawExperimentMatrixCanvas() {
  const canvas = document.getElementById("experimentMatrixCanvas");
  if (!canvas) return;
  const compact = canvas.getBoundingClientRect().width < 760;
  const { ctx, width, height } = fitCanvas(canvas, compact ? 1.06 : 0.5, compact ? 580 : 430);
  const cells = matrixCells();
  const values = cells.map((cell) => cell.row?.[2]).filter(Number.isFinite);
  const min = Math.max(0.55, Math.min(...values) - 0.02);
  const max = Math.min(1, Math.max(...values) + 0.005);
  const t = extendedFrame;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);
  drawCanvasGrid(ctx, width, height, "#e0a100");
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText("CSV liderlik matrisi", 24, 34);
  ctx.fillStyle = "rgba(255,255,255,0.68)";
  ctx.font = "700 12px Inter, sans-serif";
  ctx.fillText("Her hücre, ilgili veri setinde model ailesinin en iyi AUROC değeridir.", 24, 56);

  if (compact) {
    const left = 24;
    const top = 86;
    const blockH = (height - top - 34) / taskOrder.length;
    taskOrder.forEach((task, rowIndex) => {
      const y = top + rowIndex * blockH;
      ctx.fillStyle = datasets[task].accent;
      ctx.font = "800 14px JetBrains Mono, monospace";
      ctx.fillText(taskLabel(task), left, y + 14);
      const barTop = y + 30;
      const rowH = (blockH - 38) / experimentMatrixModels.length;
      experimentMatrixModels.forEach((model, index) => {
        const row = bestMatrixCell(task, model.key);
        const value = row?.[2] || 0;
        const normalized = (value - min) / Math.max(0.0001, max - min);
        const barW = width - left * 2 - 96;
        const by = barTop + index * rowH;
        ctx.fillStyle = "rgba(255,255,255,0.72)";
        ctx.font = "800 10px JetBrains Mono, monospace";
        ctx.fillText(model.label, left, by + 12);
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        roundRect(ctx, left + 64, by + 2, barW, 13, 999);
        ctx.fill();
        ctx.fillStyle = mixColor("#273039", datasets[task].accent, Math.max(0.08, normalized));
        roundRect(ctx, left + 64, by + 2, Math.max(8, barW * normalized), 13, 999);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.fillText(value ? value.toFixed(4) : "-", left + 70 + barW, by + 13);
      });
    });
    return;
  }

  const left = Math.max(96, width * 0.11);
  const top = 104;
  const right = 28;
  const bottom = 56;
  const gridW = width - left - right;
  const gridH = height - top - bottom;
  const cellW = gridW / experimentMatrixModels.length;
  const cellH = gridH / taskOrder.length;

  experimentMatrixModels.forEach((model, index) => {
    const x = left + index * cellW + cellW * 0.08;
    ctx.fillStyle = colors[model.family] || "#ffffff";
    ctx.font = "800 11px JetBrains Mono, monospace";
    ctx.fillText(model.label, x, top - 18);
  });

  taskOrder.forEach((task, r) => {
    const y = top + r * cellH;
    ctx.fillStyle = datasets[task].accent;
    ctx.font = "800 14px JetBrains Mono, monospace";
    ctx.fillText(taskLabel(task), 24, y + cellH * 0.55);
    experimentMatrixModels.forEach((model, c) => {
      const row = bestMatrixCell(task, model.key);
      const value = row?.[2] || 0;
      const normalized = (value - min) / Math.max(0.0001, max - min);
      const x = left + c * cellW;
      const glow = 0.04 * Math.sin(t * 2 + r + c);
      const color = value ? mixColor("#252b31", datasets[task].accent, Math.max(0.08, normalized + glow)) : "#252b31";
      ctx.fillStyle = color;
      roundRect(ctx, x + 4, y + 4, cellW - 8, cellH - 8, 8);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 15px JetBrains Mono, monospace";
      ctx.fillText(value ? value.toFixed(4) : "-", x + 14, y + cellH * 0.46);
      ctx.fillStyle = "rgba(255,255,255,0.68)";
      ctx.font = "800 10px Inter, sans-serif";
      drawWrappedText(ctx, row ? modelShortLabel(row[0], 17) : "veri yok", x + 14, y + cellH * 0.68, cellW - 28, 12, "rgba(255,255,255,0.68)", "800 10px Inter, sans-serif");
    });
  });

  const legendX = left;
  const legendY = height - 30;
  for (let i = 0; i < 120; i += 1) {
    const ratio = i / 119;
    ctx.fillStyle = mixColor("#252b31", "#e0a100", ratio);
    ctx.fillRect(legendX + i * 2, legendY, 2, 10);
  }
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "800 10px JetBrains Mono, monospace";
  ctx.fillText(min.toFixed(2), legendX, legendY + 24);
  ctx.fillText(max.toFixed(2), legendX + 218, legendY + 24);
  ctx.fillText("AUROC ölçeği", legendX + 78, legendY + 24);
}

function drawCapacityCanvas() {
  const canvas = document.getElementById("capacityCanvas");
  if (!canvas) return;
  const compact = canvas.getBoundingClientRect().width < 760;
  const { ctx, width, height } = fitCanvas(canvas, compact ? 1.55 : 0.5, compact ? 760 : 430);
  const all = taskOrder.flatMap((task) => hybridAblation[task].map((row) => ({ task, row })));
  const values = all.map((item) => item.row[2]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const t = extendedFrame;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);
  drawCanvasGrid(ctx, width, height, "#7b61ff");
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText("Hybrid QHead kapasite haritası", 24, 34);
  ctx.fillStyle = "rgba(255,255,255,0.68)";
  drawWrappedText(ctx, "q ve d arttıkça performansın doğrusal artmadığı ablasyon yüzeyi.", 24, 56, width - 48, 15, "rgba(255,255,255,0.68)", "700 12px Inter, sans-serif");

  const top = compact ? 88 : 100;
  const pad = compact ? 24 : 30;
  const panelGap = compact ? 18 : 20;
  const panelW = compact ? width - pad * 2 : (width - pad * 2 - panelGap * 2) / 3;
  const panelH = compact ? (height - top - 38 - panelGap * 2) / 3 : height - top - 46;

  taskOrder.forEach((task, index) => {
    const x = compact ? pad : pad + index * (panelW + panelGap);
    const y = compact ? top + index * (panelH + panelGap) : top;
    const rows = hybridAblation[task];
    const best = rows.reduce((acc, row) => (row[2] > acc[2] ? row : acc), rows[0]);
    const qubits = [4, 6, 8];
    const depths = [1, 2];
    ctx.fillStyle = "rgba(255,255,255,0.055)";
    roundRect(ctx, x, y, panelW, panelH, 8);
    ctx.fill();
    ctx.strokeStyle = withAlpha(datasets[task].accent, 0.66);
    ctx.stroke();
    ctx.fillStyle = datasets[task].accent;
    ctx.font = "800 14px JetBrains Mono, monospace";
    ctx.fillText(taskLabel(task), x + 14, y + 24);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 11px Inter, sans-serif";
    ctx.fillText(`en iyi q${best[0]}-d${best[1]} · ${best[2].toFixed(4)}`, x + 14, y + 44);

    const gridX = x + 14;
    const gridY = y + 66;
    const cellGap = 8;
    const cellW = (panelW - 28 - cellGap * 2) / 3;
    const cellH = (panelH - 88 - cellGap) / 2;
    depths.forEach((depth, r) => {
      qubits.forEach((q, c) => {
        const row = rows.find((item) => item[0] === q && item[1] === depth);
        const normalized = (row[2] - min) / Math.max(0.0001, max - min);
        const cellX = gridX + c * (cellW + cellGap);
        const cellY = gridY + r * (cellH + cellGap);
        const isBest = row[0] === best[0] && row[1] === best[1];
        ctx.fillStyle = mixColor("#252b31", datasets[task].accent, 0.22 + normalized * 0.78);
        roundRect(ctx, cellX, cellY, cellW, cellH, 7);
        ctx.fill();
        ctx.strokeStyle = isBest ? "#ffffff" : "rgba(255,255,255,0.18)";
        ctx.lineWidth = isBest ? 2.4 + Math.sin(t * 4) * 0.4 : 1;
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.font = `800 ${compact ? 9 : 11}px JetBrains Mono, monospace`;
        ctx.fillText(`q${q} d${depth}`, cellX + 9, cellY + (compact ? 13 : 20));
        ctx.font = `800 ${compact ? 13 : 18}px JetBrains Mono, monospace`;
        ctx.fillText(row[2].toFixed(4), cellX + 9, cellY + (compact ? 31 : cellH * 0.58));
        ctx.fillStyle = "rgba(255,255,255,0.66)";
        ctx.font = `800 ${compact ? 8 : 10}px JetBrains Mono, monospace`;
        ctx.fillText(`std ${row[3].toFixed(4)}`, cellX + 9, cellY + cellH - (compact ? 7 : 12));
      });
    });
  });
}

function drawSeedDistributionCanvas() {
  const canvas = document.getElementById("seedDistributionCanvas");
  if (!canvas) return;
  const compact = canvas.getBoundingClientRect().width < 720;
  const { ctx, width, height } = fitCanvas(canvas, compact ? 1.05 : 0.5, compact ? 560 : 430);
  const rows = stabilityRows().slice(0, compact ? 7 : 9);
  if (!rows.length) return;
  const means = rows.map((row) => row[2]);
  const stds = rows.map((row) => row[3]);
  const min = Math.max(0.5, Math.min(...rows.map((row) => row[2] - row[3])) - 0.02);
  const max = Math.min(1, Math.max(...rows.map((row) => row[2] + row[3])) + 0.01);
  const t = extendedFrame;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#101216";
  ctx.fillRect(0, 0, width, height);
  drawCanvasGrid(ctx, width, height, "#c93d8d");
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText(`${taskLabel(selectedStabilityTask)} · raporlanan mean±std dağılımı`, 24, 34);
  ctx.fillStyle = "rgba(255,255,255,0.68)";
  drawWrappedText(ctx, "Noktalar ham seed değeri değil; CSV'deki ortalama/std bilgisinin görsel temsilidir.", 24, 56, width - 48, 15, "rgba(255,255,255,0.68)", "700 12px Inter, sans-serif");

  const left = compact ? 28 : Math.max(150, width * 0.2);
  const right = compact ? 24 : 44;
  const top = compact ? 94 : 96;
  const plotW = width - left - right;
  const rowH = (height - top - 56) / rows.length;
  const xScale = (value) => left + ((value - min) / Math.max(0.0001, max - min)) * plotW;

  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const x = left + (plotW * i) / 4;
    ctx.beginPath();
    ctx.moveTo(x, top - 8);
    ctx.lineTo(x, height - 48);
    ctx.stroke();
    const value = min + ((max - min) * i) / 4;
    ctx.fillStyle = "rgba(255,255,255,0.66)";
    ctx.font = "800 10px JetBrains Mono, monospace";
    ctx.fillText(value.toFixed(2), x - 12, height - 24);
  }

  rows.forEach((row, index) => {
    const [name, family, mean, std] = row;
    const y = top + index * rowH + rowH * 0.52;
    const color = colors[family] || "#ffffff";
    const bandStart = xScale(mean - std);
    const bandEnd = xScale(mean + std);
    const meanX = xScale(mean);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "800 11px Inter, sans-serif";
    const label = compact ? modelShortLabel(name, 15) : modelShortLabel(name, 23);
    ctx.fillText(label, 24, y + 4);

    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(left + plotW, y);
    ctx.stroke();

    ctx.fillStyle = withAlpha(color, 0.18 + Math.min(0.36, std * 2));
    roundRect(ctx, Math.min(bandStart, bandEnd), y - 11, Math.max(4, Math.abs(bandEnd - bandStart)), 22, 999);
    ctx.fill();
    ctx.strokeStyle = withAlpha(color, 0.65);
    ctx.stroke();

    representativeSeedOffsets.forEach((offset, seedIndex) => {
      const jitter = Math.sin(t * 2 + seedIndex + index) * Math.min(0.004, std * 0.18);
      const x = xScale(mean + offset * std + jitter);
      ctx.fillStyle = seedIndex === 2 ? "#ffffff" : color;
      ctx.beginPath();
      ctx.arc(x, y + (seedIndex - 2) * 1.8, seedIndex === 2 ? 5 : 4, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(meanX, y - 17);
    ctx.lineTo(meanX, y + 17);
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 10px JetBrains Mono, monospace";
    ctx.fillText(`${mean.toFixed(4)} ± ${std.toFixed(4)}`, Math.min(meanX + 8, width - 118), y - 16);
  });

  const stableIndex = stds.indexOf(Math.min(...stds));
  const strongIndex = means.indexOf(Math.max(...means));
  ctx.fillStyle = "rgba(255,255,255,0.68)";
  ctx.font = "800 10px JetBrains Mono, monospace";
  ctx.fillText(`düşük std: ${modelShortLabel(rows[stableIndex][0], 16)}`, left, height - 8);
  ctx.fillText(`yüksek AUROC: ${modelShortLabel(rows[strongIndex][0], 16)}`, left + Math.min(240, plotW * 0.42), height - 8);
}

function initQuantumField() {
  const canvas = document.getElementById("quantumField");
  const ctx = canvas.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const palette = ["#00a6c8", "#24a148", "#e0a100", "#e65f4f", "#7b61ff", "#c93d8d"];
  let width = 0;
  let height = 0;
  let particles = [];
  let time = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(110, Math.max(46, width / 14)));
    particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      phase: Math.random() * Math.PI * 2,
      radius: 1.2 + Math.random() * 2.4,
      color: palette[index % palette.length],
    }));
  }

  function draw() {
    time += reduced ? 0.004 : 0.012;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      if (!reduced) {
        p.x += p.vx + Math.sin(time + p.phase) * 0.12;
        p.y += p.vy + Math.cos(time * 0.8 + p.phase) * 0.12;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;

      for (let j = i + 1; j < particles.length; j += 1) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 128) {
          const alpha = (1 - dist / 128) * 0.18;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `${p.color}55`;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.radius * 5, p.radius * 2.2, time + p.phase, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (!reduced) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

function initCircuitCanvas() {
  const canvas = document.getElementById("circuitCanvas");
  const ctx = canvas.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let t = 0;

  function draw() {
    const { width, height } = fitCanvas(canvas, 0.58, 420);
    t += reduced ? 0 : 0.018;
    ctx.clearRect(0, 0, width, height);

    const wires = 6;
    const marginX = 60;
    const top = 74;
    const gap = (height - 140) / (wires - 1);
    const gateXs = [width * 0.24, width * 0.42, width * 0.6, width * 0.78];
    const labels = ["ECFP", "PCA", "ZZ", "PQC", "AUROC"];

    ctx.fillStyle = "rgba(255,255,255,0.035)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 18px Inter, sans-serif";
    ctx.fillText("Kuantum özellik akışı", marginX, 34);

    labels.forEach((label, index) => {
      const x = marginX + index * ((width - marginX * 2) / (labels.length - 1));
      ctx.fillStyle = index < 2 ? "#7ee6ff" : index === 4 ? "#f9c74f" : "#ff9588";
      ctx.font = "800 12px JetBrains Mono, monospace";
      ctx.fillText(label, x - 16, height - 34);
    });

    for (let i = 0; i < wires; i += 1) {
      const y = top + i * gap;
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(marginX, y);
      ctx.lineTo(width - marginX, y);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.74)";
      ctx.font = "800 12px JetBrains Mono, monospace";
      ctx.fillText(`q${i}`, 24, y + 4);
    }

    gateXs.forEach((x, gateIndex) => {
      for (let i = 0; i < wires; i += 1) {
        const y = top + i * gap;
        const pulse = 0.5 + 0.5 * Math.sin(t * 3 + i * 0.7 + gateIndex);
        ctx.fillStyle = gateIndex < 2 ? `rgba(0,166,200,${0.5 + pulse * 0.35})` : `rgba(230,95,79,${0.45 + pulse * 0.35})`;
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 1;
        roundRect(ctx, x - 19, y - 16, 38, 32, 6);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.font = "800 11px JetBrains Mono, monospace";
        ctx.fillText(gateIndex === 0 ? "Y" : gateIndex === 1 ? "Z" : gateIndex === 2 ? "R" : "M", x - 4, y + 4);
      }

      if (gateIndex > 0) {
        ctx.strokeStyle = gateIndex === 2 ? "#f9c74f" : "rgba(255,255,255,0.38)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, top);
        ctx.lineTo(x, top + (wires - 1) * gap);
        ctx.stroke();
      }
    });

    const waveX = marginX + ((Math.sin(t) + 1) / 2) * (width - marginX * 2);
    ctx.strokeStyle = "#24a148";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = marginX; x <= width - marginX; x += 5) {
      const y = height * 0.5 + Math.sin(x * 0.035 + t * 8) * 26 + Math.sin(x * 0.013 - t * 3) * 18;
      if (x === marginX) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = "#24a148";
    ctx.beginPath();
    ctx.arc(waveX, height * 0.5 + Math.sin(waveX * 0.035 + t * 8) * 26, 7, 0, Math.PI * 2);
    ctx.fill();

    if (!reduced) requestAnimationFrame(draw);
  }

  draw();
}

function initQuantumConceptCanvas() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function draw() {
    drawQuantumConceptCanvas();
    if (!reduced) requestAnimationFrame(draw);
  }

  draw();
}

function initModelArchitectureCanvas() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function draw() {
    drawModelArchitectureCanvas();
    if (!reduced) requestAnimationFrame(draw);
  }

  draw();
}

function initClassicalVisualCanvas() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function draw() {
    drawClassicalVisualCanvas();
    if (!reduced) requestAnimationFrame(draw);
  }

  draw();
}

function initExtendedCanvases() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function draw() {
    extendedFrame += reduced ? 0.004 : 0.016;
    drawHeroQuantumCanvas();
    drawDatasetMeaningCanvas();
    drawDataRepresentationCanvas();
    drawExperimentMatrixCanvas();
    drawResearchMapCanvas();
    drawMoleculeJourneyCanvas();
    drawMetricLabCanvas();
    drawCapacityCanvas();
    drawAblationCubeCanvas();
    drawStabilityCanvas();
    drawSeedDistributionCanvas();
    if (!reduced) requestAnimationFrame(draw);
  }

  draw();
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, Math.abs(width) / 2, Math.abs(height) / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

async function init() {
  await loadLiveData();
  renderDatasetCards();
  renderModelFamilies();
  renderClassicalVisuals();
  renderDataCockpit();
  renderExperimentMatrixNote();
  renderQuantumConcepts();
  renderModelArchitecture();
  renderJourneyNote();
  renderResults();
  renderMetricLab();
  renderHybrid();
  renderAblationControls();
  renderAblationNote();
  renderStabilityControls();
  renderStabilityNote();
  renderSeedDistributionNote();
  renderClinToxCompare();
  renderGallery();
  renderLimitations();
  initLanguageControls();
  initQuantumField();
  initClassicalVisualCanvas();
  initQuantumConceptCanvas();
  initModelArchitectureCanvas();
  initCircuitCanvas();
  initExtendedCanvases();

  window.addEventListener("resize", () => {
    chartAnimation = 1;
    drawHeroQuantumCanvas();
    drawLeaderboardChart();
    drawClassicalVisualCanvas();
    drawQuantumConceptCanvas();
    drawModelArchitectureCanvas();
    drawDatasetMeaningCanvas();
    drawDataRepresentationCanvas();
    drawExperimentMatrixCanvas();
    drawResearchMapCanvas();
    drawMoleculeJourneyCanvas();
    drawMetricLabCanvas();
    drawCapacityCanvas();
    drawAblationCubeCanvas();
    drawStabilityCanvas();
    drawSeedDistributionCanvas();
  });
}

document.addEventListener("DOMContentLoaded", init);
