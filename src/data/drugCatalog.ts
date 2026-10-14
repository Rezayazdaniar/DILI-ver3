/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DrugCatalogEntry } from '../types/dili-evidence';

export const DRUG_CATALOG: DrugCatalogEntry[] = [
  {
    id: 'isoniazid',
    standardName: 'Isoniazid',
    persianName: 'ایزونیازید (INH)',
    brandNames: ['Nydrazid', 'Laniazid', 'Rimifon', 'ایزونیازید'],
    drugClassId: 'antitubercular_agents',
    drugClassName: 'Antitubercular Agents',
    persianDrugClassName: 'داروهای ضد سل',
    pubchemCid: '3767',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Hepatocellular',
    typicalLatency: '۲ الی ۶ ماه (دامنه ۱ تا ۱۲ ماه)',
    mechanismFa: 'متابولیت‌های فعال استیله شده (استیل‌هیدرازین) و القای استرس اکسیداتیو و آپوپتوز هپاتوسیت‌ها با وساطت CYP2E1.',
    clinicalPearlsFa: 'در ۱۰ تا ۲۰ درصد بیماران بالا رفتن بدون علامت آنزیم‌های کبدی دیده می‌شود که خودبه‌خود فروکش می‌کند. اما هپاتیت بالینی حاد در ۰٫۵ تا ۲ درصد بروز کرده و در صورت همزمانی یرقان و الگوی هپاتوسلولار شدید، نرخ مرگ‌ومیر ۱۰ تا ۵۰ درصد دارد (خطر بسیار بالای Hy\'s Law).',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-nbk547852-inh',
        source: 'LiverTox',
        sourceId: 'NBK547852: Isoniazid',
        title: 'Isoniazid - LiverTox: Clinical and Research Information on Drug-Induced Liver Injury',
        drugOrClass: 'Isoniazid',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-05-10',
        retrievalVersion: '2026-Q3-Staging',
        excerptFa: 'ایزونیازید یکی از شناخته‌شده‌ترین علل آسیب شدید کبدی دارویی (DILI) با درجه احتمال A است. آسیب غالب از نوع هپاتوسلولار شدید و شبیه هپاتیت ویروسی حاد است.',
        excerptEn: 'Isoniazid is a well-established cause of severe drug-induced liver injury, ranked Category A in LiverTox. The clinical presentation is typically acute hepatocellular necrosis resembling viral hepatitis.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      },
      {
        id: 'fda-bbw-inh',
        source: 'FDA',
        sourceId: 'FDA Boxed Warning - Isoniazid',
        title: 'FDA Premarketing Guidance & Boxed Warning for Isoniazid Severe Hepatitis',
        drugOrClass: 'Isoniazid',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2023-11-15',
        retrievalVersion: '2026-Q1',
        excerptFa: 'هشدار جعبه سیاه FDA: هپاتیت شدید و گاه کشنده مرتبط با درمان ایزونیازید ممکن است حتی پس از چند ماه درمان رخ دهد. سن بالاتر و مصرف الکل عوامل خطر اصلی هستند.',
        excerptEn: 'Severe and sometimes fatal hepatitis associated with isoniazid therapy may occur and may develop even after many months of treatment.',
        url: 'https://www.accessdata.fda.gov/'
      },
      {
        id: 'dailymed-inh',
        source: 'DailyMed',
        sourceId: 'DailyMed: NDC 0641-6056-25',
        title: 'DailyMed Official Label: Isoniazid Oral Tablets',
        drugOrClass: 'Isoniazid',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2025-01-20',
        retrievalVersion: '2026-Q2',
        excerptFa: 'توصیه اکید به پایش ماهانه علائم کبدی و آزمایش‌های ALT/AST در تمام بیماران تحت درمان، به‌ویژه افراد بالای ۳۵ سال.',
        excerptEn: 'Patients should be monitored carefully and warned to report immediately any of the early symptoms of hepatitis.',
        url: 'https://dailymed.nlm.nih.gov/'
      }
    ],
    reportedCases: [
      {
        caseId: 'CASE-INH-001',
        drugName: 'Isoniazid',
        age: 52,
        gender: 'F',
        latencyDays: 75,
        pattern: 'Hepatocellular',
        outcome: 'Recovered',
        summaryFa: 'خانم ۵۲ ساله تحت درمان سل نهفته پس از ۷۵ روز با بی‌حالی، زردی و ALT: 1200 U/L مراجعه کرد؛ پس از قطع دارو طی ۶ هفته رو به بهبودی نهاد.',
        sourceReference: 'LiverTox Case Record #1'
      },
      {
        caseId: 'CASE-INH-002',
        drugName: 'Isoniazid',
        age: 64,
        gender: 'M',
        latencyDays: 110,
        pattern: 'Hepatocellular',
        outcome: 'Fatal',
        summaryFa: 'مرد ۶۴ ساله الکلی با نارسایی حاد کبد و بیلی‌روبین ۱۸ mg/dL که علی‌رغم اقدامات مراقبت ویژه فوت شد.',
        sourceReference: 'PubMed PMID: 18456123'
      }
    ]
  },
  {
    id: 'amoxicillin_clavulanate',
    standardName: 'Amoxicillin-Clavulanate',
    persianName: 'آموکسی‌سیلین-کلاوولانات (کوآموکسی‌کلاو)',
    brandNames: ['Augmentin', 'Co-Amoxiclav', 'Amoclan', 'کوآموکسی کلاو', 'آگمنتین'],
    drugClassId: 'aminopenicillins_beta_lactamase_inhibitors',
    drugClassName: 'Aminopenicillins with Beta-Lactamase Inhibitors',
    persianDrugClassName: 'آمینوپنی‌سیلین‌ها به همراه مهارکننده بتا-لاکتاماز',
    pubchemCid: '9926791',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Cholestatic',
    typicalLatency: '۲ تا ۶ هفته (حتی تا ۴ هفته پس از اتمام دوره دارو)',
    mechanismFa: 'پاسخ ایمنی با واسطه آنتی‌ژن‌های HLA کلاوولانیک‌اسید؛ اتصال هاپتنی و القای کلانژیت ایمونولوژیک.',
    clinicalPearlsFa: 'شایع‌ترین علت DILI تک‌دارویی گزارش‌شده در جهان غرب. ویژگی بارز آن ظهور علائم ۲ تا ۴ هفته پس از قطع کامل مصرف آنتی‌بیوتیک است. غالب الگو کلستاتیک یا مختلط بوده و آلکالین فسفاتاز بسیار بالا است.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-nbk547852-amoxclav',
        source: 'LiverTox',
        sourceId: 'NBK547852: Amoxicillin-Clavulanate',
        title: 'Amoxicillin-Clavulanate - LiverTox',
        drugOrClass: 'Amoxicillin-Clavulanate',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-03-12',
        retrievalVersion: '2026-Q3',
        excerptFa: 'آموکسی‌سیلین-کلاوولانات رتبه A در لیورتوکس دارد. جزء کلاوولانات مسئول اصلی ایجاد زردی کلستاتیک است و به ندرت در مصرف آموکسی‌سیلین به تنهایی دیده می‌شود.',
        excerptEn: 'Amoxicillin-clavulanate is the single most common cause of clinically apparent idiosyncratic DILI in North America and Europe, ranked Category A.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: [
      {
        caseId: 'CASE-AMOX-01',
        age: 58,
        gender: 'M',
        drugName: 'Amoxicillin-Clavulanate',
        latencyDays: 21,
        pattern: 'Cholestatic',
        outcome: 'Recovered',
        summaryFa: 'مرد ۵۸ ساله دو هفته پس از اتمام دوره ۱۰ روزه آگمنتین دچار خارش شدید، ادرار تیره و بیلی‌روبین ۶٫۲ با ALP: 480 U/L گردید.',
        sourceReference: 'LiverTox Case Record #12'
      }
    ]
  },
  {
    id: 'acetaminophen',
    standardName: 'Acetaminophen',
    persianName: 'استامینوفن (پاراستامول)',
    brandNames: ['Tylenol', 'Paracetamol', 'Panadol', 'APAP', 'استامینوفن'],
    drugClassId: 'analgesics_antipyretics',
    drugClassName: 'Analgesics & Antipyretics',
    persianDrugClassName: 'مسکن‌ها و ضدتب‌ها',
    pubchemCid: '1983',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Hepatocellular',
    typicalLatency: '۲۴ الی ۷۲ ساعت پس از مصرف بیش‌ازحد (Dose-dependent intrinsic toxicity)',
    mechanismFa: 'تولید بیش‌ازحد NAPQI از طریق CYP2E1، تخلیه ذخایر گلوتاتیون سلولی و نکروز هپاتوسیت‌های ناحیه Centrolobular (منطقه ۳).',
    clinicalPearlsFa: 'مهم‌ترین علت نارسایی حاد کبد (ALF) در جهان. افزایش آنزیم‌های ترانس‌آمیناز می‌تواند به بالای ۱۰,۰۰۰ U/L برسد. آنتی‌دوت انتخابی N-استیل‌سیستئین (NAC) است.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-acetaminophen',
        source: 'LiverTox',
        sourceId: 'NBK547852: Acetaminophen',
        title: 'Acetaminophen Hepatotoxicity - LiverTox Review',
        drugOrClass: 'Acetaminophen',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-06-01',
        retrievalVersion: '2026-Q3',
        excerptFa: 'آسیب مستقیم دوزمحور با افزایش سرسام‌آور ترانس‌آمینازها و افت زمان پروترومبین. رده شواهد A قطعی.',
        excerptEn: 'Acetaminophen overdose is the foremost cause of acute liver failure in the Western world.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: [
      {
        caseId: 'CASE-APAP-01',
        age: 26,
        gender: 'F',
        drugName: 'Acetaminophen',
        latencyDays: 2,
        pattern: 'Hepatocellular',
        outcome: 'Recovered',
        summaryFa: 'مصرف ۲۰ گرم استامینوفن؛ ALT: 6400 U/L، درمان سریع با پروتکل وریدی استیل‌سیستئین بدون نیاز به پیوند.',
        sourceReference: 'Gastroenterology 2021 Clinical Review'
      }
    ]
  },
  {
    id: 'furosemide',
    standardName: 'Furosemide',
    persianName: 'فوروزماید (لازیکس)',
    brandNames: ['Lasix', 'Diaqua-2', 'لازیکس', 'فورزماید'],
    drugClassId: 'loop_diuretics',
    drugClassName: 'Loop Diuretics',
    persianDrugClassName: 'دیورتیک‌های لوپ',
    pubchemCid: '3440',
    livertoxCategory: 'E',
    internalCode: 'LIMITED',
    evidenceLevel: 'CLASS_LEVEL', // Crucial distinction highlighted in the report!
    typicalPattern: 'Variable',
    typicalLatency: 'نامشخص / گزارش‌های فوق‌العاده نادر',
    mechanismFa: 'فوروزماید به خودی خود سمیت کبدی اثبات‌شده ندارد؛ شواهد سمیت کبدی در دیورتیک‌های لوپ عمدتاً مربوط به تداخلات همودینامیک و شوک ایسکمیک یا موارد نادر گروهی است.',
    clinicalPearlsFa: 'توجه مهم معماری هوش‌دارو: برای فوروزماید شواهد آسیب فقط در سطح کالس دیورتیک‌های لوپ موجود است و نباید به عنوان گزارش موردی اثبات‌شده مستقیم تلقی شود. کاتگوری E در لیورتوکس.',
    hasSpecificCases: false,
    documents: [
      {
        id: 'lt-furosemide-class',
        source: 'LiverTox',
        sourceId: 'NBK547852: Loop Diuretics',
        title: 'Loop Diuretics & Furosemide - Class-Level Evidence Monograph',
        drugOrClass: 'Loop Diuretics',
        evidenceLevel: 'CLASS_LEVEL',
        publicationDate: '2024-01-15',
        retrievalVersion: '2026-Q3-Staging',
        excerptFa: 'دیورتیک‌های قوس هنله (از جمله فوروزماید و بومتانید) به ندرت با آسیب کبدی مرتبط بوده‌اند و رده احتمال آسیب آن E (احتمال ناچیز یا رد شده) است. در صورت بروز زردی، هیپوتانسیون یا نارسایی احتقانی کبد عامل اصلی است.',
        excerptEn: 'Loop diuretics have rarely been linked to liver injury and are classified under Category E (unlikely cause). Evidence is evaluated at class-level.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'atorvastatin',
    standardName: 'Atorvastatin',
    persianName: 'آتورواستاتین (لیپیتور)',
    brandNames: ['Lipitor', 'Atorvapharm', 'آتورواستاتین', 'لیپیتور'],
    drugClassId: 'hmg_coa_reductase_inhibitors',
    drugClassName: 'Statins / HMG-CoA Reductase Inhibitors',
    persianDrugClassName: 'استاتین‌ها (مهارکننده‌های HMG-CoA ردوکتاز)',
    pubchemCid: '60823',
    livertoxCategory: 'B',
    internalCode: 'HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Mixed',
    typicalLatency: '۱ تا ۶ ماه',
    mechanismFa: 'پاسخ ایدئوسینکراتیک ایمنی یا تداخل ترانسپورترهای غشایی کبدی (OATP1B1) و متابولیسم CYP3A4.',
    clinicalPearlsFa: 'افزایش خفیف ترانس‌آمینازها (کمتر از ۳ برابر ULN) در ۱ تا ۳ درصد شایع و خوش‌خیم است. DILI بارز بالینی بسیار نادر است (۱ در ۱۰۰,۰۰۰ بیمار). قطع دارو معمولاً منجر به بهبود کامل می‌شود.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-atorvastatin',
        source: 'LiverTox',
        sourceId: 'NBK547852: Atorvastatin',
        title: 'Atorvastatin Hepatotoxicity Profile',
        drugOrClass: 'Atorvastatin',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-04-18',
        retrievalVersion: '2026-Q3',
        excerptFa: 'آتورواستاتین در رده B قرار دارد؛ موارد اثبات‌شده با الگوی کلستاتیک یا مختلط وجود دارند اما در مقایسه با وسعت تجویز بسیار نادرند.',
        excerptEn: 'Atorvastatin is classified as Category B (highly likely cause of idiosyncratic injury, though incidence is low).',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: [
      {
        caseId: 'CASE-ATOR-01',
        age: 61,
        gender: 'M',
        drugName: 'Atorvastatin',
        latencyDays: 90,
        pattern: 'Mixed',
        outcome: 'Recovered',
        summaryFa: 'مرد ۶۱ ساله پس از ۳ ماه مصرف آتورواستاتین ۴۰ میلی‌گرم دچار زردی بدون درد و ALP: 320, ALT: 280 شد. ۳ ماه پس از قطع به نرمال بازگشت.',
        sourceReference: 'LiverTox Case #4'
      }
    ]
  },
  {
    id: 'nitrofurantoin',
    standardName: 'Nitrofurantoin',
    persianName: 'نیتروفورانتوئین (ماکرودانتین)',
    brandNames: ['Macrodantin', 'Macrobid', 'Furadantin', 'نیتروفورانتوئین'],
    drugClassId: 'nitrofuran_antibacterials',
    drugClassName: 'Nitrofuran Antibacterials',
    persianDrugClassName: 'ضدمیکروب‌های نیتروفوران',
    pubchemCid: '6604200',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Hepatocellular',
    typicalLatency: 'حاد: ۱ تا ۴ هفته | مزمن (شبه خودایمنی): ۶ ماه تا سال‌ها',
    mechanismFa: 'ایجاد هپاتیت اتوایمیون ناشی از دارو (AIH-like DILI) با حضور آنتی‌بادی‌های ANA و SMA و هیپرگاماگلوبولینمی.',
    clinicalPearlsFa: 'در زنانی که مصرف پروفیلاکسی طولانی‌مدت برای عفونت ادراری دارند می‌تواند به سیروز بی‌صدا یا هپاتیت خودایمنی شدید تبدیل شود. رده A در لیورتوکس.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-nitrofurantoin',
        source: 'LiverTox',
        sourceId: 'NBK547852: Nitrofurantoin',
        title: 'Nitrofurantoin - LiverTox Monograph',
        drugOrClass: 'Nitrofurantoin',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-02-14',
        retrievalVersion: '2026-Q3',
        excerptFa: 'نیتروفورانتوئین از علل کلاسیک آسیب هپاتوسلولار مزمن با خصوصیات اتوایمیون است و رده A دارد.',
        excerptEn: 'Nitrofurantoin is a well-established cause of severe idiosyncratic DILI with autoimmune features.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'methotrexate',
    standardName: 'Methotrexate',
    persianName: 'متوتروکسات (MTX)',
    brandNames: ['Rheumatrex', 'Trexall', 'متوترکسات'],
    drugClassId: 'antimetabolites',
    drugClassName: 'Antimetabolite / Folate Antagonists',
    persianDrugClassName: 'آنتی‌متابولیت‌ها و آنتاگونیست‌های فولات',
    pubchemCid: '126941',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Mixed',
    typicalLatency: 'ماهها تا سالها (وابسته به دوز تجمعی)',
    mechanismFa: 'استرس اکسیداتیو فیبروژنیک در سلول‌های ستاره‌ای کبد (Ito cells) و تجمع متوتروکسات پلی‌گلوتامات.',
    clinicalPearlsFa: 'سمیت مزمن با فیبروز کبد و سیروز بدون افزایش شدید و حاد در ترانس‌آمینازها بروز می‌کند. پایش با الاستوگرافی (FibroScan) یا Procollagen III peptide پیشنهاد می‌شود.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-methotrexate',
        source: 'LiverTox',
        sourceId: 'NBK547852: Methotrexate',
        title: 'Methotrexate Hepatic Fibrosis and Cirrhosis',
        drugOrClass: 'Methotrexate',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-01-20',
        retrievalVersion: '2026-Q3',
        excerptFa: 'متوتروکسات در مصرف طولانی‌مدت سبب استئاتوهپاتیت و فیبروز پیشرونده می‌شود. رده شواهد A.',
        excerptEn: 'Methotrexate can cause progressive hepatic fibrosis and cirrhosis during long-term maintenance therapy.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'allopurinol',
    standardName: 'Allopurinol',
    persianName: 'آلوپورینول (زیلوپریک)',
    brandNames: ['Zyloprim', 'Aloprim', 'آلوپورینول'],
    drugClassId: 'xanthine_oxidase_inhibitors',
    drugClassName: 'Xanthine Oxidase Inhibitors',
    persianDrugClassName: 'مهارکننده‌های گزانتین اکسیداز',
    pubchemCid: '135401907',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Mixed',
    typicalLatency: '۲ تا ۶ هفته',
    mechanismFa: 'بخشی از سندرم ازدیاد حساسیت دارویی (DRESS / AHS) همراه با آلل HLA-B*58:01.',
    clinicalPearlsFa: 'آسیب کبد معمولاً همراه با تب، راش پوستی شدید، ائوزینوفیلی و نارسایی حاد کلیه است. مرگ‌ومیر می‌تواند به ۲۰٪ برسد.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-allopurinol',
        source: 'LiverTox',
        sourceId: 'NBK547852: Allopurinol',
        title: 'Allopurinol Hypersensitivity & Hepatotoxicity',
        drugOrClass: 'Allopurinol',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-05-18',
        retrievalVersion: '2026-Q3',
        excerptFa: 'رده احتمال A. همراهی مشخص با سندرم واکنش دارویی همراه با ائوزینوفیلی و علائم سیستمیک (DRESS).',
        excerptEn: 'Allopurinol is a well-established cause of severe DILI, commonly as part of a severe systemic hypersensitivity syndrome.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'valproic_acid',
    standardName: 'Valproic Acid',
    persianName: 'والپروات سدیم / اسید والپروئیک (دپاکین)',
    brandNames: ['Depakene', 'Depakote', 'دپاکین', 'والپروات'],
    drugClassId: 'anticonvulsants',
    drugClassName: 'Anticonvulsants / Fatty Acid Derivatives',
    persianDrugClassName: 'داروهای ضد صرع',
    pubchemCid: '3121',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Mixed',
    typicalLatency: '۱ تا ۶ ماه',
    mechanismFa: 'مهار بتای اکسیداسیون میتوکندریایی اسیدهای چرب، کاهش کارنیتین و ایجاد میکرووسیکولار استئاتوز.',
    clinicalPearlsFa: 'در کودکان زیر دو سال، به ویژه مبتلایان به جهش ژن POLG، خطر نارسایی برق‌آسای کبد بسیار بالاست.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-valproate',
        source: 'LiverTox',
        sourceId: 'NBK547852: Valproic Acid',
        title: 'Valproic Acid Microvesicular Steatosis & Liver Failure',
        drugOrClass: 'Valproic Acid',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-04-02',
        retrievalVersion: '2026-Q3',
        excerptFa: 'رده A در لیورتوکس. سمیت میتوکندریایی شاخص که ممکن است با هیپرآمونمی حتی در غیاب زردی شدید همراه شود.',
        excerptEn: 'Valproate is classified in Category A, characterized by microvesicular steatosis and mitochondrial injury.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'diclofenac',
    standardName: 'Diclofenac',
    persianName: 'دیکلوفناک (ولتارن)',
    brandNames: ['Voltaren', 'Cataflam', 'دیکلوفناک', 'ولتارن'],
    drugClassId: 'nsaids',
    drugClassName: 'Nonsteroidal Anti-inflammatory Drugs (NSAIDs)',
    persianDrugClassName: 'ضدالتهاب‌های غیراستروئیدی (NSAIDs)',
    pubchemCid: '3033',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Hepatocellular',
    typicalLatency: '۱ تا ۶ ماه',
    mechanismFa: 'تشکیل متابولیت‌های واکنش‌پذیر کینون‌ایمین و اسیدگلوکورونید فعال ناشی از اکسیداسیون CYP2C9/CYP3A4.',
    clinicalPearlsFa: 'شایع‌ترین NSAID ایجادکننده آسیب کبدی بارز در بالین. تا ۱۰٪ افراد بالا رفتن خفیف آنزیم‌ها را تجربه می‌کنند.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-diclofenac',
        source: 'LiverTox',
        sourceId: 'NBK547852: Diclofenac',
        title: 'Diclofenac Hepatotoxicity Overview',
        drugOrClass: 'Diclofenac',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-03-30',
        retrievalVersion: '2026-Q3',
        excerptFa: 'رده احتمال A. پاسخ ایدئوسینکراتیک هپاتوسلولار که در زنان مسن‌تر با شیوع بیشتری گزارش شده است.',
        excerptEn: 'Diclofenac is the NSAID most frequently associated with clinically apparent liver injury, ranked Category A.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'ketoconazole',
    standardName: 'Ketoconazole',
    persianName: 'کتوکونازول (نیزورال)',
    brandNames: ['Nizoral', 'کتوکونازول'],
    drugClassId: 'antifungals_azoles',
    drugClassName: 'Azole Antifungals',
    persianDrugClassName: 'ضدقارچ‌های آزول',
    pubchemCid: '3823',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Hepatocellular',
    typicalLatency: '۲ تا ۱۲ هفته',
    mechanismFa: 'سمیت سیتوپلاسمی مستقیم و واکنش‌های افزایش حساسیت همراه با متابولیت‌های هیدروکسیله.',
    clinicalPearlsFa: 'به دلیل موارد متعدد نارسایی برق‌آسای کبد و مرگ، مصرف خوراکی آن در بیشتر مراجع دارویی محدود شده است.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-ketoconazole',
        source: 'LiverTox',
        sourceId: 'NBK547852: Ketoconazole',
        title: 'Ketoconazole Oral Hepatotoxicity Alert',
        drugOrClass: 'Ketoconazole',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-02-19',
        retrievalVersion: '2026-Q3',
        excerptFa: 'رده A در لیورتوکس. هشدارهای جدی از سوی FDA و EMA در مورد خطرات مرگبار تجویز سیستمیک خوراکی.',
        excerptEn: 'Ketoconazole oral tablets are classified as Category A with severe hepatotoxicity warnings.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'amiodarone',
    standardName: 'Amiodarone',
    persianName: 'آمیودارون (کوردارون)',
    brandNames: ['Cordarone', 'Pacerone', 'آمیودارون'],
    drugClassId: 'antiarrhythmics',
    drugClassName: 'Class III Antiarrhythmic Agents',
    persianDrugClassName: 'داروهای ضد آریتمی کلاس III',
    pubchemCid: '2157',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Mixed',
    typicalLatency: 'چندین ماه تا چند سال (دارای نیمه‌عمر بسیار طولانی)',
    mechanismFa: 'تجمع فسفولیپیدها در لیزوزوم‌های هپاتوسیت و سمیت مستقیم میتوکندریایی؛ ایجاد بافت شبه استئاتوهپاتیت الکلی (MALLORY BODIES).',
    clinicalPearlsFa: 'در ۱۵ تا ۳۰٪ بیماران افزایش ترانس‌آمینازها دیده می‌شود. ممکن است سال‌ها پس از قطع دارو به دلیل ذخیره بافتی طولانی باقی بماند.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-amiodarone',
        source: 'LiverTox',
        sourceId: 'NBK547852: Amiodarone',
        title: 'Amiodarone Phospholipidosis & Cirrhosis',
        drugOrClass: 'Amiodarone',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-05-02',
        retrievalVersion: '2026-Q3',
        excerptFa: 'رده شواهد A. شبیه‌ساز استئاتوهپاتیت غیرالکلی و ایجاد فیبروز پنهان.',
        excerptEn: 'Amiodarone can cause chronic liver injury resembling alcoholic hepatitis and cirrhosis, Category A.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'azathioprine',
    standardName: 'Azathioprine',
    persianName: 'آزاتیوپرین (ایموران)',
    brandNames: ['Imuran', 'Azasan', 'آزاتیوپرین'],
    drugClassId: 'immunosuppressants',
    drugClassName: 'Purine Analog Immunosuppressants',
    persianDrugClassName: 'سرکوب‌کننده‌های سیستم ایمنی (آنالوگ پورین)',
    pubchemCid: '2265',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Cholestatic',
    typicalLatency: '۱ الی ۵ ماه',
    mechanismFa: 'تولید متابولیت‌های فعال ۶-مرکاپتوپورین و تیوگوانین نوکلئوتیدها با واسطه TPMT و NUDT15؛ ایجاد ترومبوز عروقی سینوزوئید و سندرم انسداد سینوزوئیدی (SOS/VOD) و هیپرپلازی نودولار ژنراتیو (NRH).',
    clinicalPearlsFa: 'آسیب از نوع کلستاتیک یا آسیب اندوتلیوم عروقی کبد (Peliosis hepatis / SOS). اندازه‌گیری فعالیت آنزیم TPMT پیش از شروع درمان الزامی است.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-azathioprine',
        source: 'LiverTox',
        sourceId: 'NBK547852: Azathioprine',
        title: 'Azathioprine Vascular & Cholestatic Hepatotoxicity',
        drugOrClass: 'Azathioprine',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-03-15',
        retrievalVersion: '2026-Q3',
        excerptFa: 'آزاتیوپرین رده A در لیورتوکس است و می‌تواند سبب هپاتیت کلستاتیک حاد یا بیماری‌های عروقی کبد شود.',
        excerptEn: 'Azathioprine is a well-established cause of clinically apparent liver injury, categorized as Category A in LiverTox.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'carbamazepine',
    standardName: 'Carbamazepine',
    persianName: 'کاربامازپین (تگرتول)',
    brandNames: ['Tegretol', 'Carbatrol', 'Epitol', 'تگرتول'],
    drugClassId: 'anticonvulsants',
    drugClassName: 'Iminostilbene Anticonvulsants',
    persianDrugClassName: 'داروهای ضد تشنج (ایمینوستیلبن)',
    pubchemCid: '2554',
    livertoxCategory: 'A',
    internalCode: 'VERY_HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Mixed',
    typicalLatency: '۲ الی ۸ هفته',
    mechanismFa: 'تشکیل مشتقات اپوکسید آرن فعال از طریق CYP3A4 و واکنش‌های ایمنی سیستمیک وابسته به آلل‌های HLA-A*31:01 و HLA-B*15:02.',
    clinicalPearlsFa: 'آسیب کبد اغلب بخشی از سندرم واکنش سیستمیک دارویی همراه با ائوزینوفیلی (DRESS) یا ونیشینگ بایل داکت (Ductopenia) است.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-carbamazepine',
        source: 'LiverTox',
        sourceId: 'NBK547852: Carbamazepine',
        title: 'Carbamazepine DRESS Syndrome and Hepatotoxicity',
        drugOrClass: 'Carbamazepine',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-04-12',
        retrievalVersion: '2026-Q3',
        excerptFa: 'رده A در لیورتوکس. سندرم DRESS و هپاتیت حاد مختلط با تب و راش اریتماتوز.',
        excerptEn: 'Carbamazepine is a well-known cause of severe liver injury, typically appearing as part of DRESS syndrome.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'infliximab',
    standardName: 'Infliximab',
    persianName: 'اینفلیکسیماب (رمی کید)',
    brandNames: ['Remicade', 'Inflectra', 'رمی‌کید'],
    drugClassId: 'tnf_inhibitors',
    drugClassName: 'TNF Alpha Inhibitors',
    persianDrugClassName: 'مهارکننده‌های فاکتور نکروز تومور (TNF-alpha)',
    pubchemCid: '44134606',
    livertoxCategory: 'B',
    internalCode: 'HIGH',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Hepatocellular',
    typicalLatency: '۱ الی ۱۲ ماه (معمولاً پس از ۲ تا ۴ دوز انفوزیون)',
    mechanismFa: 'تعدیل سیستم ایمنی و القای فنوتیپ خودایمنی (Autoimmune Hepatitis-like DILI) با تشکیل آنتی‌بادی‌های ضد هسته (ANA) و anti-dsDNA.',
    clinicalPearlsFa: 'فعال‌سازی مجدد ویروس هپاتیت B (HBV Reactivation) یکی از بزرگترین خطرات تهدیدکننده حیات است؛ غربالگری پیش از تجویز با HBsAg و Anti-HBc ضروری است.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-infliximab',
        source: 'LiverTox',
        sourceId: 'NBK547852: Infliximab',
        title: 'Infliximab Autoimmune-like DILI and HBV Reactivation',
        drugOrClass: 'Infliximab',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-02-10',
        retrievalVersion: '2026-Q3',
        excerptFa: 'رده B در لیورتوکس. خطر شعله‌ور شدن هپاتیت B و القای هپاتیت اتوایمیون دارویی پاسخ‌دهنده به کورتیکواستروئید.',
        excerptEn: 'Infliximab therapy has been linked to rare instances of autoimmune-like DILI and serious reactivation of chronic hepatitis B, ranked Category B.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'rosuvastatin',
    standardName: 'Rosuvastatin',
    persianName: 'روزوواستاتین (کرستور)',
    brandNames: ['Crestor', 'روزوواستاتین'],
    drugClassId: 'hmg_coa_reductase_inhibitors',
    drugClassName: 'Statins / HMG-CoA Reductase Inhibitors',
    persianDrugClassName: 'استاتین‌ها',
    pubchemCid: '446157',
    livertoxCategory: 'C',
    internalCode: 'MODERATE',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Mixed',
    typicalLatency: '۲ الی ۶ ماه',
    mechanismFa: 'متابولیسم محدود وابسته به CYP2C9 و تداخلات ترانسپورتر SLCO1B1.',
    clinicalPearlsFa: 'رده C در لیورتوکس (آسیب بالینی اثبات‌شده ولی بسیار نادرتر از آتورواستاتین). در کمتر از ۱٪ بالا رفتن خفیف ALT رخ می‌دهد.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-rosuvastatin',
        source: 'LiverTox',
        sourceId: 'NBK547852: Rosuvastatin',
        title: 'Rosuvastatin Liver Safety Profile',
        drugOrClass: 'Rosuvastatin',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-05-11',
        retrievalVersion: '2026-Q3',
        excerptFa: 'رده C در لیورتوکس. شواهد سمیت کبدی قطعی اما با شیوع بسیار نادر در مطالعات جمعیتی بزرگ.',
        excerptEn: 'Rosuvastatin is classified in Category C (probable but very rare cause of clinically apparent liver injury).',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'duloxetine',
    standardName: 'Duloxetine',
    persianName: 'دولوکستین (سیمبالتا)',
    brandNames: ['Cymbalta', 'دولوکستین'],
    drugClassId: 'snri_antidepressants',
    drugClassName: 'Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs)',
    persianDrugClassName: 'مهارکننده‌های بازجذب سروتونین و نوراپی‌نفرین',
    pubchemCid: '60835',
    livertoxCategory: 'C',
    internalCode: 'MODERATE',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Hepatocellular',
    typicalLatency: '۲ الی ۱۲ هفته',
    mechanismFa: 'متابولیسم کبدی متراکم وابسته به CYP1A2 و CYP2D6 و ایجاد استرس هپاتوسلولار در مصرف همزمان با الکل.',
    clinicalPearlsFa: 'در بیمارانی که بیماری مزمن کبدی یا مصرف الکل دارند منع مصرف دارد؛ موارد هپاتیت حاد با ترانس‌آمینازهای بالای ۱۰ برابر گزارش شده است.',
    hasSpecificCases: true,
    documents: [
      {
        id: 'lt-duloxetine',
        source: 'LiverTox',
        sourceId: 'NBK547852: Duloxetine',
        title: 'Duloxetine Hepatotoxicity Profile',
        drugOrClass: 'Duloxetine',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-01-28',
        retrievalVersion: '2026-Q3',
        excerptFa: 'رده C در لیورتوکس. هشدار عدم مصرف در بیماران با سیروز یا الکلیسم مزمن.',
        excerptEn: 'Duloxetine is classified as Category C in LiverTox.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'metformin',
    standardName: 'Metformin',
    persianName: 'متفورمین (گلوکوفاژ)',
    brandNames: ['Glucophage', 'Fortamet', 'متفورمین'],
    drugClassId: 'biguanides',
    drugClassName: 'Biguanides / Antidiabetic Agents',
    persianDrugClassName: 'بیگوانیدها / ضددیابت خوراکی',
    pubchemCid: '4091',
    livertoxCategory: 'D',
    internalCode: 'LOW',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Cholestatic',
    typicalLatency: 'بسیار نادر',
    mechanismFa: 'متفورمین متابولیسم کبدی ندارد و دفع آن ۱۰۰٪ کلیوی است؛ آسیب کبدی مستقیم عملاً اثبات نشده و خطر اصلی آن اسیدوز لاکتیک است.',
    clinicalPearlsFa: 'رده D در لیورتوکس (علت بسیار نامحتمل آسیب کبدی). در بیماران کبد چرب (NAFLD/MASLD) تجویز آن معمولاً امن و حتی به دلیل بهبود حساسیت انسولینی مفید است.',
    hasSpecificCases: false,
    documents: [
      {
        id: 'lt-metformin',
        source: 'LiverTox',
        sourceId: 'NBK547852: Metformin',
        title: 'Metformin Liver Safety & Rare Case Analysis',
        drugOrClass: 'Metformin',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-02-05',
        retrievalVersion: '2026-Q3',
        excerptFa: 'رده D در لیورتوکس. متفورمین عامل مستقیم سمیت کبدی به شمار نمی‌رود.',
        excerptEn: 'Metformin is classified in Category D (rare possible cause of liver injury, essentially devoid of intrinsic hepatotoxicity).',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'lisinopril',
    standardName: 'Lisinopril',
    persianName: 'لیزینوپریل (زستریل)',
    brandNames: ['Zestril', 'Prinivil', 'لیزینوپریل'],
    drugClassId: 'ace_inhibitors',
    drugClassName: 'Angiotensin-Converting Enzyme (ACE) Inhibitors',
    persianDrugClassName: 'مهارکننده‌های آنزیم مبدل آنژیوتانسین (ACEI)',
    pubchemCid: '5362119',
    livertoxCategory: 'D',
    internalCode: 'LOW',
    evidenceLevel: 'DRUG_LEVEL',
    typicalPattern: 'Cholestatic',
    typicalLatency: 'چندین هفته تا چندین ماه',
    mechanismFa: 'احتباس برادی‌کینین و پاسخ‌های ایمونولوژیک ایدئوسینکراتیک نادر.',
    clinicalPearlsFa: 'رده D در لیورتوکس. آسیب کبدی با ACEI بسیار نادر است و در صورت بروز معمولاً به شکل زردی کلستاتیک بدون درد با خارش تظاهر می‌کند.',
    hasSpecificCases: false,
    documents: [
      {
        id: 'lt-lisinopril',
        source: 'LiverTox',
        sourceId: 'NBK547852: Lisinopril',
        title: 'Lisinopril Cholestatic Jaundice Overview',
        drugOrClass: 'Lisinopril',
        evidenceLevel: 'DRUG_LEVEL',
        publicationDate: '2024-03-08',
        retrievalVersion: '2026-Q3',
        excerptFa: 'رده D در لیورتوکس. موارد تک‌گیر کلستاز با خارش.',
        excerptEn: 'Lisinopril is categorized as Category D in LiverTox.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ],
    reportedCases: []
  },
  {
    id: 'loop_diuretics_class',
    standardName: 'Loop Diuretics (Class)',
    persianName: 'گروه دیورتیک‌های قوس هنله (لوپ)',
    brandNames: ['Bumetanide', 'Torsemide', 'Ethacrynic acid'],
    drugClassId: 'loop_diuretics',
    drugClassName: 'Loop Diuretics',
    persianDrugClassName: 'دیورتیک‌های لوپ',
    pubchemCid: '999999',
    livertoxCategory: 'E',
    internalCode: 'LIMITED',
    evidenceLevel: 'CLASS_LEVEL',
    typicalPattern: 'Variable',
    typicalLatency: 'بسیار نادر',
    mechanismFa: 'اثرات غیرمستقیم ناشی از افت حجم درون‌عروقی و افت پرفیوژن کبدی، بدون سمیت سلولی ذاتی در کبد.',
    clinicalPearlsFa: 'شواهد در سطح کلاس دارویی نشان‌دهنده امنیت بسیار بالای کبد است. گزارش‌های آسیب ناشی از هیپوتانسیون یا شوک ایسکمیک زمینه‌ای هستند.',
    hasSpecificCases: false,
    documents: [
      {
        id: 'lt-loop-diur-class',
        source: 'LiverTox',
        sourceId: 'NBK547852: Class-Level Loop Diuretics',
        title: 'Class Overview: Loop Diuretics Safety Profile',
        drugOrClass: 'Loop Diuretics',
        evidenceLevel: 'CLASS_LEVEL',
        publicationDate: '2024-01-10',
        retrievalVersion: '2026-Q1',
        excerptFa: 'شواهد کلی کالس: دیورتیک‌های لوپ فاقد هرگونه سیگنال آسیب کبدی بارز هستند.',
        excerptEn: 'Class-level review indicates loop diuretics are devoid of significant direct hepatotoxicity signals.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK547852/'
      }
    ]
  }
];

export function resolveDrugByName(query: string): {
  matchedDrug: DrugCatalogEntry | null;
  resolvedFromName: string;
  isSynonym: boolean;
} {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return { matchedDrug: null, resolvedFromName: query, isSynonym: false };

  // 1. Direct standard name match
  for (const drug of DRUG_CATALOG) {
    if (drug.standardName.toLowerCase() === cleanQuery || drug.id.toLowerCase() === cleanQuery) {
      return { matchedDrug: drug, resolvedFromName: drug.standardName, isSynonym: false };
    }
  }

  // 2. Persian name exact or partial
  for (const drug of DRUG_CATALOG) {
    if (drug.persianName.includes(query) || query.includes(drug.persianName)) {
      return { matchedDrug: drug, resolvedFromName: drug.standardName, isSynonym: true };
    }
  }

  // 3. Brand names / Synonyms
  for (const drug of DRUG_CATALOG) {
    for (const brand of drug.brandNames) {
      if (brand.toLowerCase() === cleanQuery || cleanQuery.includes(brand.toLowerCase())) {
        return { matchedDrug: drug, resolvedFromName: `${brand} (مترادف ${drug.standardName})`, isSynonym: true };
      }
    }
  }

  // 4. Fuzzy / substring in standard name
  for (const drug of DRUG_CATALOG) {
    if (drug.standardName.toLowerCase().includes(cleanQuery)) {
      return { matchedDrug: drug, resolvedFromName: drug.standardName, isSynonym: false };
    }
  }

  // Default fallback if not found
  return { matchedDrug: null, resolvedFromName: query, isSynonym: false };
}
