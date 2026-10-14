/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ClinicalConcernLevel,
  HysLawCriterion,
  HysLawResult,
  InjuryPatternType,
  LabValues,
  PatientClinicalContext,
  RRatioResult,
  RucamItemScore,
  RucamResult,
} from '../types/clinical';
import { DrugCatalogEntry } from '../types/dili-evidence';

/**
 * 1. Calculate R-ratio and determine biochemical liver injury pattern
 * Formula: R = (ALT / ULN_ALT) / (ALP / ULN_ALP)
 */
export function calculateRRatio(labs: LabValues): RRatioResult {
  const altUln = labs.ulnAlt || 40;
  const alpUln = labs.ulnAlp || 100;

  const altRatio = labs.alt / altUln;
  const alpRatio = labs.alp / alpUln;

  const rValue = alpRatio > 0 ? Number((altRatio / alpRatio).toFixed(2)) : 0;

  let pattern: InjuryPatternType = 'Mixed';
  let patternFa = 'مختلط (Mixed)';
  let interpretationFa = '';

  if (rValue >= 5.0) {
    pattern = 'Hepatocellular';
    patternFa = 'هپاتوسلولار (Hepatocellular)';
    interpretationFa = `شاخص R برابر با ${rValue} است (≥ 5.0)؛ نشان‌دهنده غالب بودن آسیب مستقیم نکروتیک سلول‌های کبدی و ترانس‌آمینازها در مقایسه با فسفاتاز قلیایی است.`;
  } else if (rValue <= 2.0) {
    pattern = 'Cholestatic';
    patternFa = 'کلستاتیک (Cholestatic)';
    interpretationFa = `شاخص R برابر با ${rValue} است (≤ 2.0)؛ نشان‌دهنده آسیب غالب در مجاری صفراوی، احتباس صفرا و افزایش بارز آلکالین فسفاتاز در مقایسه با آسیب هپاتوسیت‌هاست.`;
  } else {
    pattern = 'Mixed';
    patternFa = 'مختلط (Mixed)';
    interpretationFa = `شاخص R برابر با ${rValue} است (بین ۲٫۰ و ۵٫۰)؛ نشان‌دهنده الگوی آسیب توأم هپاتوسلولار و کلستاتیک است.`;
  }

  return {
    rValue,
    pattern,
    patternFa,
    altMultipleOfUln: Number(altRatio.toFixed(2)),
    alpMultipleOfUln: Number(alpRatio.toFixed(2)),
    interpretationFa,
  };
}

/**
 * 2. Evaluate Hy's Law Criteria
 * Requirements:
 * - ALT or AST >= 3x ULN
 * - Total Bilirubin >= 2x ULN
 * - ALP < 2x ULN (ruling out dominant initial cholestasis)
 * - Absence of competing etiologies (viral, biliary, ischemic)
 */
export function evaluateHysLaw(
  labs: LabValues,
  context: PatientClinicalContext
): HysLawResult {
  const altRatio = labs.alt / (labs.ulnAlt || 40);
  const astRatio = labs.ast / (labs.ulnAst || 40);
  const biliRatio = labs.totalBilirubin / (labs.ulnBilirubin || 1.2);
  const alpRatio = labs.alp / (labs.ulnAlp || 100);

  const meetsTransaminases = altRatio >= 3.0 || astRatio >= 3.0;
  const meetsBilirubin = biliRatio >= 2.0;
  const meetsAlp = alpRatio < 2.0;
  const alternativeCausesRuledOut =
    context.viralHepatitisNegative &&
    context.biliaryObstructionRuledOut &&
    context.hemodynamicInstabilityRuledOut;

  const criteria: HysLawCriterion[] = [
    {
      id: 'transaminases',
      nameFa: 'افزایش ترانس‌آمینازها (ALT یا AST ≥ 3× ULN)',
      requiredCondition: 'ALT ≥ 3× ULN یا AST ≥ 3× ULN',
      currentValueDescription: `ALT: ${altRatio.toFixed(1)}× ULN (${labs.alt} U/L) | AST: ${astRatio.toFixed(1)}× ULN (${labs.ast} U/L)`,
      isMet: meetsTransaminases,
      notesFa: meetsTransaminases
        ? 'شرط برقرار است (آسیب هپاتوسلولار مشخص).'
        : 'شرط برقرار نیست (ترانس‌آمینازها زیر آستانه ۳ برابر حد بالای نرمال هستند).',
    },
    {
      id: 'bilirubin',
      nameFa: 'هیپربیلی‌روبینمی آشکار (Total Bilirubin ≥ 2× ULN)',
      requiredCondition: 'بیلی‌روبین کل ≥ ۲ برابر حد بالای نرمال (ULN)',
      currentValueDescription: `بیلی‌روبین: ${biliRatio.toFixed(1)}× ULN (${labs.totalBilirubin} mg/dL)`,
      isMet: meetsBilirubin,
      notesFa: meetsBilirubin
        ? 'شرط برقرار است (نشانه اختلال در کلیرانس بیلی‌روبین و کاهش عملکرد دفعی کبد).'
        : 'شرط برقرار نیست (بیلی‌روبین کل کمتر از ۲ برابر ULN است).',
    },
    {
      id: 'alp_threshold',
      nameFa: 'عدم غلبه کلستاز اولیه (ALP < 2× ULN)',
      requiredCondition: 'آلکالین فسفاتاز کمتر از ۲ برابر حد بالای نرمال',
      currentValueDescription: `ALP: ${alpRatio.toFixed(1)}× ULN (${labs.alp} U/L)`,
      isMet: meetsAlp,
      notesFa: meetsAlp
        ? 'شرط برقرار است (زردی بیمار ناشی از کلستاز انسدادی اولیه نیست، بلکه ناشی از نارسایی دفع هپاتوسلولار است).'
        : 'شرط برقرار نیست (ALP ≥ 2× ULN نشان‌دهنده الگوی انسدادی/کلستاتیک است که قانون های کلاسیک در آن صدق نمی‌کند).',
    },
    {
      id: 'competing_etiology',
      nameFa: 'رد علل حاد جایگزین (هپاتیت ویروسی، انسداد صفراوی، شوک ایسکمیک)',
      requiredCondition: 'بررسی آزمایشگاهی و رد شدن سایر علل حاد هپاتیت',
      currentValueDescription: alternativeCausesRuledOut
        ? 'هپاتیت ویروسی منفی، سونوگرافی مجاری طبیعی، ایسکمی رد شده'
        : 'یک یا چند علت جایگزین به طور قطعی بررسی/رد نشده است',
      isMet: alternativeCausesRuledOut,
      notesFa: alternativeCausesRuledOut
        ? 'علل رقیب شایع بر اساس شرح حال و آزمایش‌های منفی رد شده‌اند.'
        : 'احتیاط: برای انتساب به قانون های، باید سایر علل حاد کبدی به طور کامل رد شده باشند.',
    },
  ];

  const isMet =
    meetsTransaminases && meetsBilirubin && meetsAlp && alternativeCausesRuledOut;

  let statusTextFa = '';
  let criticalAlertFa = '';
  let clinicalSignificanceFa = '';

  if (isMet) {
    statusTextFa = 'مثبت (معیارهای قانون های تماماً احراز شده‌اند - TRUE)';
    criticalAlertFa =
      'هشدار بالینی بحرانی: بیمار دارای تمام معیارهای Hy\'s Law است. در کارآزمایی‌های بالینی و مطالعات دارویی، احراز این معیار پیش‌آگهی نرخ مورتالیتی یا نیاز به پیوند کبد حدود ۱۰ درصد را به همراه دارد.';
    clinicalSignificanceFa =
      'نشان‌دهنده آسیب شدید هپاتوسلولار با افت عملکرد دفعی کبد در غیاب انسداد مجاری یا هپاتیت ویروسی حاد. قطع فوری داروی مظنون و ارجاع اورژانسی به فوق‌تخصص گوارش/کبد ضروری است.';
  } else if (meetsTransaminases && meetsBilirubin && meetsAlp && !alternativeCausesRuledOut) {
    statusTextFa = 'احتمالی / نیازمند تکمیل رد علل جایگزین (Indeterminate)';
    criticalAlertFa =
      'معیارهای آزمایشگاهی Hy\'s Law برقرار است، اما علل جایگزین (هپاتیت‌های A/B/C، سپسیس یا انسداد صفراوی) هنوز به طور کامل رد نشده‌اند.';
    clinicalSignificanceFa =
      'الگوی بیوشیمیایی نگران‌کننده است؛ باید فوراً سرولوژی‌های ویروسی و تصویربرداری مجاری صفراوی تکمیل شود.';
  } else {
    statusTextFa = 'منفی (معیارهای قانون های احراز نشده‌اند - FALSE)';
    criticalAlertFa = 'در حال حاضر ترکیب کامل سه‌گانه Hy\'s Law برقرار نیست.';
    clinicalSignificanceFa =
      'هرچند معیار قانون های منفی است، اما ارزیابی الگوی آسیب (R-ratio) و امتیاز RUCAM باید برای تصمیم‌گیری بالینی دقیق انجام پذیرد.';
  }

  return {
    isMet,
    statusTextFa,
    criteria,
    criticalAlertFa,
    clinicalSignificanceFa,
  };
}

/**
 * 3. Calculate RUCAM (CIOMS) Causality Scoring
 * With full transparency of user inputs, missing data, and domain rationales
 */
export function calculateRucamScore(
  drug: DrugCatalogEntry,
  labs: LabValues,
  context: PatientClinicalContext,
  rRatio: RRatioResult
): RucamResult {
  const items: RucamItemScore[] = [];
  const missingFields: string[] = [];

  // 1. Time to onset
  let onsetPoints = 0;
  let onsetRationale = '';
  const days = context.treatmentDurationDays;

  if (days >= 5 && days <= 90) {
    onsetPoints = +2;
    onsetRationale = `فاصله شروع مصرف تا بروز اختلال (${days} روز) در بازه تیپیک ۵ تا ۹۰ روز قرار دارد (+۲ امتیاز).`;
  } else if (days > 90) {
    onsetPoints = +1;
    onsetRationale = `فاصله شروع مصرف (${days} روز) بیشتر از ۹۰ روز است (+۱ امتیاز).`;
  } else if (days > 0 && days < 5) {
    onsetPoints = +1;
    onsetRationale = `بروز بسیار سریع کمتر از ۵ روز (+۱ امتیاز؛ در صورتی که مصرف مجدد نباشد).`;
  } else {
    onsetPoints = 0;
    onsetRationale = 'اطلاعات زمان شروع دارو نامشخص است (۰ امتیاز).';
    missingFields.push('مدت زمان شروع مصرف دارو نامشخص است.');
  }

  items.push({
    domainId: 'time_to_onset',
    titleFa: '۱. زمانبندی و فاصله شروع تا بروز (Time to Onset)',
    points: onsetPoints,
    userInputOrSource: `${days} روز مصرف`,
    rationaleFa: onsetRationale,
    isMissingData: days <= 0,
  });

  // 2. Course / Dechallenge
  let dechallengePoints = 0;
  let dechallengeRationale = '';
  const daysPostStop = context.daysSinceDrugDiscontinuation ?? 0;

  if (daysPostStop > 0) {
    // If stopped and transaminases are resolving
    dechallengePoints = +3;
    dechallengeRationale = `قطع دارو انجام شده و سیر رو به بهبود گزارش شده است (+۳ امتیاز).`;
  } else {
    dechallengePoints = +1;
    dechallengeRationale = `دارو به تازگی قطع شده یا پایش افت آنزیم‌ها پس از قطع هنوز کامل نشده است (+۱ امتیاز احتیاطی).`;
  }

  items.push({
    domainId: 'dechallenge',
    titleFa: '۲. سیر بهبودی پس از قطع دارو (Dechallenge Course)',
    points: dechallengePoints,
    userInputOrSource: daysPostStop > 0 ? `${daysPostStop} روز پس از قطع` : 'در حال ارزیابی اولیه',
    rationaleFa: dechallengeRationale,
    isMissingData: false,
  });

  // 3. Risk Factors (Alcohol, Age >= 55, Pregnancy)
  let riskPoints = 0;
  const riskNotes: string[] = [];

  if (context.alcoholHistory === 'excessive' || context.alcoholHistory === 'moderate') {
    riskPoints += 1;
    riskNotes.push('سابقه مصرف الکل (+۱)');
  }
  if (context.patientAge >= 55) {
    riskPoints += 1;
    riskNotes.push('سن بالای ۵۵ سال (+۱)');
  }
  if (context.isPregnant) {
    riskPoints += 1;
    riskNotes.push('بارداری (+۱)');
  }
  // Max 2 points for risk factors in RUCAM
  riskPoints = Math.min(riskPoints, 2);

  items.push({
    domainId: 'risk_factors',
    titleFa: '۳. عوامل خطرساز بیمار (سن، الکل، بارداری)',
    points: riskPoints,
    userInputOrSource: `سن: ${context.patientAge} | الکل: ${context.alcoholHistory} | بارداری: ${context.isPregnant ? 'بله' : 'خیر'}`,
    rationaleFa: riskNotes.length > 0 ? riskNotes.join('، ') : 'عامل خطرساز اضافی ثبت نشده است (۰ امتیاز).',
    isMissingData: false,
  });

  // 4. Concomitant Medications
  let concomitantPoints = 0;
  let concomitantRationale = '';
  if (!context.concomitantMedications || context.concomitantMedications.length === 0) {
    concomitantPoints = 0;
    concomitantRationale = 'هیچ داروی همزمانی با پتانسیل سمیت کبدی گزارش نشده است (۰ امتیاز).';
  } else {
    concomitantPoints = -1;
    concomitantRationale = `وجود داروهای همزمان (${context.concomitantMedications.join('، ')}) که می‌توانند در بروز اختلال نقش داشته باشند (-۱ امتیاز).`;
  }

  items.push({
    domainId: 'concomitant_drugs',
    titleFa: '۴. داروهای همزمان (Concomitant Medications)',
    points: concomitantPoints,
    userInputOrSource: context.concomitantMedications?.join(', ') || 'ندارد',
    rationaleFa: concomitantRationale,
    isMissingData: false,
  });

  // 5. Search for non-drug causes
  let nonDrugPoints = 0;
  let nonDrugRationale = '';
  if (
    context.viralHepatitisNegative &&
    context.biliaryObstructionRuledOut &&
    context.hemodynamicInstabilityRuledOut &&
    context.alcoholEtiologyRuledOut
  ) {
    nonDrugPoints = +2;
    nonDrugRationale = 'علل جایگزین اصلی (هپاتیت ویروسی، سنگ مجاری صفراوی، افت فشار خون/ایسکمی، سوءمصرف الکل) تماماً رد شده‌اند (+۲ امتیاز).';
  } else if (context.viralHepatitisNegative && context.biliaryObstructionRuledOut) {
    nonDrugPoints = +1;
    nonDrugRationale = 'علل ویروسی و صفراوی رد شده‌اند، اما علل عروقی یا خودایمنی نیاز به رد کامل دارند (+۱ امتیاز).';
  } else {
    nonDrugPoints = -2;
    nonDrugRationale = 'علل جایگزین غیردارویی هنوز به دقت رد نشده‌اند (-۲ امتیاز).';
    missingFields.push('بررسی‌های سرولوژی هپاتیت یا سونوگرافی کبد ناقص است.');
  }

  items.push({
    domainId: 'alternative_causes',
    titleFa: '۵. بررسی و رد علل غیردارویی جایگزین (Alternative Causes)',
    points: nonDrugPoints,
    userInputOrSource: nonDrugPoints > 0 ? 'بررسی‌های جامع منفی' : 'ناقص یا بررسی نشده',
    rationaleFa: nonDrugRationale,
    isMissingData: nonDrugPoints < 0,
  });

  // 6. Previous information on drug hepatotoxicity (LiverTox rating)
  let previousInfoPoints = 0;
  let previousInfoRationale = '';
  if (drug.livertoxCategory === 'A' || drug.livertoxCategory === 'B') {
    previousInfoPoints = +2;
    previousInfoRationale = `داروی ${drug.standardName} در پایگاه LiverTox دارای رده احتمال ${drug.livertoxCategory} (شواهد قطعی/بسیار بالا) است (+۲ امتیاز).`;
  } else if (drug.livertoxCategory === 'C') {
    previousInfoPoints = +1;
    previousInfoRationale = `داروی ${drug.standardName} در LiverTox دارای رده احتمال C (شواهد متوسط) است (+۱ امتیاز).`;
  } else {
    previousInfoPoints = 0;
    previousInfoRationale = `داروی ${drug.standardName} رده ${drug.livertoxCategory} دارد؛ آسیب شناخته‌شده قبلی برای خود دارو محدود یا در سطح کالس دارویی است (۰ امتیاز).`;
  }

  items.push({
    domainId: 'previous_info',
    titleFa: '۶. سابقه شناخته‌شده سمیت دارویی در منابع (LiverTox Evidence)',
    points: previousInfoPoints,
    userInputOrSource: `رده LiverTox: ${drug.livertoxCategory} (${drug.internalCode})`,
    rationaleFa: previousInfoRationale,
    isMissingData: false,
  });

  // 7. Rechallenge response
  let rechallengePoints = 0;
  let rechallengeRationale = '';
  if (context.rechallengeAttempted) {
    if (context.rechallengePositive) {
      rechallengePoints = +3;
      rechallengeRationale = 'مواجهه مجدد با دارو منجر به بازگشت سریع اختلال آنزیمی شده است (+۳ امتیاز).';
    } else {
      rechallengePoints = -2;
      rechallengeRationale = 'مواجهه مجدد منجر به عود آسیب نشده است (-۲ امتیاز).';
    }
  } else {
    rechallengePoints = 0;
    rechallengeRationale = 'مواجهه مجدد عمدی انجام نشده است (بر اساس اصول اخلاق پزشکی - ۰ امتیاز).';
  }

  items.push({
    domainId: 'rechallenge',
    titleFa: '۷. پاسخ به مواجهه مجدد (Rechallenge)',
    points: rechallengePoints,
    userInputOrSource: context.rechallengeAttempted ? 'انجام شده' : 'انجام نشده (پیش‌فرض ایمن)',
    rationaleFa: rechallengeRationale,
    isMissingData: false,
  });

  // Total Score
  const totalScore = items.reduce((acc, curr) => acc + curr.points, 0);

  // Interpretation Categories
  let interpretation: RucamResult['interpretation'] = 'Possible';
  let interpretationFa = '';
  let colorClass = '';

  if (totalScore >= 9) {
    interpretation = 'Highly Probable';
    interpretationFa = 'بسیار محتمل (Highly Probable)';
    colorClass = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40';
  } else if (totalScore >= 6) {
    interpretation = 'Probable';
    interpretationFa = 'محتمل (Probable)';
    colorClass = 'text-teal-400 bg-teal-950/40 border-teal-500/40';
  } else if (totalScore >= 3) {
    interpretation = 'Possible';
    interpretationFa = 'ممکن (Possible)';
    colorClass = 'text-amber-400 bg-amber-950/40 border-amber-500/40';
  } else if (totalScore >= 1) {
    interpretation = 'Unlikely';
    interpretationFa = 'بعید (Unlikely)';
    colorClass = 'text-slate-400 bg-slate-900/60 border-slate-700';
  } else {
    interpretation = 'Excluded';
    interpretationFa = 'رد شده (Excluded)';
    colorClass = 'text-rose-400 bg-rose-950/40 border-rose-500/40';
  }

  const answeredCount = items.filter((i) => !i.isMissingData).length;
  const dataCompletenessPercent = Math.round((answeredCount / items.length) * 100);

  return {
    totalScore,
    interpretation,
    interpretationFa,
    colorClass,
    items,
    dataCompletenessPercent,
    missingFieldsNotesFa: missingFields,
  };
}

/**
 * 4. Determine Clinical Concern Level (Distinct concept from Causality!)
 */
export function determineClinicalConcern(
  labs: LabValues,
  hysLaw: HysLawResult,
  rRatio: RRatioResult
): {
  level: ClinicalConcernLevel;
  badgeFa: string;
  colorClass: string;
  urgencyDescriptionFa: string;
} {
  const altRatio = labs.alt / (labs.ulnAlt || 40);
  const biliRatio = labs.totalBilirubin / (labs.ulnBilirubin || 1.2);

  if (hysLaw.isMet || altRatio >= 15.0 || biliRatio >= 5.0) {
    return {
      level: 'CRITICAL',
      badgeFa: 'بحرانی (CRITICAL_CONCERN)',
      colorClass: 'bg-rose-500/20 text-rose-300 border-rose-500/60',
      urgencyDescriptionFa:
        'نگرانی بالینی در بالاترین سطح قرار دارد؛ خطر نکروز حاد کبد و سندرم نارسایی برق‌آسا (ALF). مداخله و پایش بیوشیمیایی روزانه فوری الزامی است.',
    };
  }

  if (altRatio >= 5.0 || biliRatio >= 2.0 || hysLaw.statusTextFa.includes('احتمالی')) {
    return {
      level: 'HIGH',
      badgeFa: 'بالا (HIGH_CONCERN)',
      colorClass: 'bg-amber-500/20 text-amber-300 border-amber-500/60',
      urgencyDescriptionFa:
        'نگرانی بالینی بالا؛ افزایش معنادار آنزیم‌ها همراه با علائم یا افزایش بیلی‌روبین که نیازمند قطع سریع داروی احتمالی و پایش ۴۸ تا ۷۲ ساعته است.',
    };
  }

  if (altRatio >= 3.0 || labs.alp >= 2 * (labs.ulnAlp || 100)) {
    return {
      level: 'MODERATE',
      badgeFa: 'متوسط (MODERATE_CONCERN)',
      colorClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/60',
      urgencyDescriptionFa:
        'نگرانی بالینی در سطح متوسط؛ آنزیم‌ها بین ۳ تا ۵ برابر حد بالای نرمال هستند و نیاز به تکرار آزمایش هفتگی و پایش دقیق علائم بالینی وجود دارد.',
    };
  }

  return {
    level: 'LOW',
    badgeFa: 'پایین (LOW_CONCERN)',
    colorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60',
    urgencyDescriptionFa:
      'نگرانی بالینی پایین؛ اختلال خفیف آزمایشگاهی بدون علائم زردی یا اختلال دفع، نیازمند مشاهده بالینی روتین.',
  };
}

/**
 * 5. Distinct Clinical Interpretation (Page 8 & 13)
 * Explains meaning, severity, differential warnings, without duplicating raw data
 */
export function generateClinicalInterpretation(
  drug: DrugCatalogEntry,
  labs: LabValues,
  rRatio: RRatioResult,
  hysLaw: HysLawResult,
  rucam: RucamResult,
  concernLevel: ClinicalConcernLevel
) {
  const actions: string[] = [];
  const differentials: string[] = [];

  if (hysLaw.isMet) {
    actions.push('قطع فوری و بدون تاخیر داروی ' + drug.standardName);
    actions.push('پایش روزانه INR/PT و بیلی‌روبین جهت تشخیص سریع آنسفالوپاتی یا کواگولوپاتی کبدی');
    actions.push('آماده‌باش برای بستری در بخش مراقبت‌های ویژه در صورت اختلال در هوشیاری یا طولانی شدن زمان پروترومبین');
  } else if (concernLevel === 'HIGH' || concernLevel === 'CRITICAL') {
    actions.push('توقف مصرف داروی مشکوک و جایگزینی با داروی خط دوم فاقد سمیت کبدی مشابه');
    actions.push('تکرار آزمایش‌های عملکرد کبد ظرف ۴۸ تا ۷۲ ساعت آینده');
  } else {
    actions.push('پایش آنزیم‌های کبد در فواصل هفتگی تا دوهفته‌ای تا زمان تثبیت یا بازگشت به محدوده طبیعی');
    actions.push('آموزش به بیمار جهت گزارش فوری علائمی نظیر تهوع، ادرار تیره، مدفوع کم‌رنگ یا خارش');
  }

  // Differentials
  differentials.push('هپاتیت‌های ویروسی حاد (Anti-HAV IgM, HBsAg, Anti-HBc IgM, Anti-HCV RNA)');
  differentials.push('بیماری‌های انسدادی مجاری صفراوی و کلدوکولیتیازیس (تأیید شده با التراسونوگرافی شکم)');
  if (rRatio.pattern === 'Hepatocellular') {
    differentials.push('هپاتیت ایسکمیک حاد ناشی از افت گذار فشار خون یا نارسایی قلبی');
    differentials.push('هپاتیت خودایمنی (ANA, ASMA, IgG)');
  } else {
    differentials.push('کلانژیت صفراوی اولیه یا دارویی ناشی از سایر عوامل (مانند آنتی‌بیوتیک‌ها)');
  }

  let summaryFa = '';
  if (hysLaw.isMet) {
    summaryFa = `بیمار دارای الگوی شاخص ${rRatio.patternFa} با احراز کامل معیارهای Hy's Law است. این وضعیت بالینی بیانگر خطر حاد نارسایی کبدی با نرخ مورتالیتی قابل توجه است که اقدام فوری را می‌طلبد.`;
  } else if (rucam.totalScore >= 6) {
    summaryFa = `شواهد بالینی و زمان‌بندی مصرف داروی ${drug.persianName} با احتمال بالینی «${rucam.interpretationFa}» همخوانی دارد. نوع آسیب بیوشیمیایی از الگوی ${rRatio.patternFa} تبعیت می‌کند.`;
  } else {
    summaryFa = `ارزیابی علیت دارویی در محدوده «${rucam.interpretationFa}» است. ضرورت دارد سایر علل احتمالی آسیب کبدی پیش از نتیجه‌گیری قطعی ارزیابی شوند.`;
  }

  return {
    summaryFa,
    severitySpectrumFa:
      concernLevel === 'CRITICAL'
        ? 'طیف شدت: آسیب حاد شدید هپاتوسیت‌ها با تهدید نارسایی اندام (Severe / Acute Liver Failure Risk)'
        : concernLevel === 'HIGH'
        ? 'طیف شدت: آسیب معنادار با زردی بالینی یا افزایش چندبرابری آنزیم‌ها (Marked Hepatic Dysfunction)'
        : concernLevel === 'MODERATE'
        ? 'طیف شدت: اختلال بیوشیمیایی متوسط بدون اختلال کارکرد سنتتیک (Moderate Biochemical DILI)'
        : 'طیف شدت: تغییرات خفیف آنزیمی بدون علائم بالینی واضح (Mild / Tolerable Transaminitis)',
    recommendedActionsFa: actions,
    monitoringGuidanceFa:
      concernLevel === 'CRITICAL' || concernLevel === 'HIGH'
        ? 'پایش روزانه یا هر ۴۸ ساعت شامل: ALT, AST, Total & Direct Bilirubin, INR, Platelet, Albumin'
        : 'پایش هر ۱ تا ۲ هفته تا طبیعی شدن آزمایش‌ها',
    differentialWarningsFa: differentials,
  };
}
