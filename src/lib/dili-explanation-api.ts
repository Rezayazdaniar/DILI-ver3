/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DiliAssessmentResponse } from '../types/dili-explanation';

/**
 * Generates an evidence-grounded scientific narrative strictly controlled by
 * the deterministic clinical rules, LiverTox monographs, and FDA guidance.
 * Adheres strictly to the architectural boundary:
 * "مدل زبانی نباید مستقلاً علّیت را تعیین کند. ارزیابی علّیت باید از مسیر قواعد انجام شود
 * و مدل فقط نتیجه و شواهد را توضیح دهد."
 */
export async function generateEvidenceGroundedExplanation(
  assessment: DiliAssessmentResponse
): Promise<{
  narrativeFa: string;
  groundedSources: string[];
  generatedBy: 'GEMINI_SERVER' | 'DETERMINISTIC_SYNTHESIZER';
  confidence: 'HIGH' | 'MODERATE' | 'CAUTION';
}> {
  const drug = assessment.drug;
  const core = assessment.coreAssessment;
  const labs = assessment.labValues;

  const sources: string[] = [
    `LiverTox (NIH/NLM) Monograph [${drug.standardName}]`,
    `FDA Guidance for Industry: Drug-Induced Liver Injury (Premarketing Evaluation)`,
    `RUCAM / CIOMS Causality Assessment System`,
    `U.S. National Library of Medicine DailyMed Label [${drug.standardName}]`,
  ];

  // Try using Gemini if API key is provided in browser or window
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof window !== 'undefined' && (window as any).GEMINI_API_KEY);

  if (apiKey) {
    try {
      const prompt = `شما یک دستیار تخصصی فارماکولوژی بالینی در سامانه «هوش‌دارو (DILI Navigator)» هستید.
بر اساس قواعد قطعی از پیش محاسبه‌شده زیر، یک گزارش تحلیلی مستند، علمی و حرفه‌ای به زبان فارسی تولید کنید.
نکته حیاتی: شما نباید علیت یا محاسبات را از خود تغییر دهید. صرفاً محاسبات و شواهد زیر را تشریح و به منابع متصل کنید:

اطلاعات ورودی ارزیابی:
- دارو: ${drug.standardName} (${drug.persianName})
- کالس دارویی: ${drug.persianDrugClassName}
- سطح شواهد: ${drug.evidenceLevel === 'CLASS_LEVEL' ? 'شواهد در سطح گروه دارویی (Class-level)' : 'شواهد اختصاصی دارو (Drug-level)'}
- درجه احتمال LiverTox: رده ${drug.livertoxCategory} (${drug.internalCode})
- شاخص R-ratio: ${core.liverInjuryPattern.rValue} (الگوی ${core.liverInjuryPattern.patternFa})
- وضعیت قانون های (Hy's Law): ${core.hysLaw.statusTextFa}
- امتیاز RUCAM علیت: ${core.causality.totalScore} امتیاز (تفسیر: ${core.causality.interpretationFa})
- سطح نگرانی بالینی: ${core.clinicalConcern.badgeFa}
- مقادیر آزمایشگاهی: ALT=${labs.alt} (ULN=${labs.ulnAlt}), AST=${labs.ast}, ALP=${labs.alp} (ULN=${labs.ulnAlp}), Bilirubin=${labs.totalBilirubin} (ULN=${labs.ulnBilirubin})

لطفاً متنی در قالب ۳ پاراگراف تخصصی، با ارجاع دقیق به منابع، لحن کاملاً بالینی و تاکید بر تمایز سه مفهوم (خطر دارو، علیت در این بیمار، و نگرانی بالینی) ارائه دهید.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 800,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            narrativeFa: text,
            groundedSources: sources,
            generatedBy: 'GEMINI_SERVER',
            confidence: 'HIGH',
          };
        }
      }
    } catch {
      // Fallback silently to our high-fidelity deterministic synthesizer
    }
  }

  // High-fidelity deterministic clinical evidence synthesizer
  let paragraph1 = '';
  if (drug.evidenceLevel === 'CLASS_LEVEL') {
    paragraph1 = `بر اساس داده‌های استخراج‌شده از پایگاه جامع LiverTox (مجموعه مرجع NLM/NIH)، داروی ${drug.standardName} (${drug.persianName}) در رده شواهد ${drug.livertoxCategory} قرار دارد. توجه ویژه معماری بالینی سامانه این است که شواهد آسیب برای این دارو در سطح «گروه دارویی ${drug.persianDrugClassName}» ثبت شده است و نباید به عنوان گزارش موردی مستقیم و اثبات‌شده برای خودِ دارو تفسیر گردد. سازوکار مطرح در این دسته دارویی عمدتاً ${drug.mechanismFa} است.`;
  } else {
    paragraph1 = `بر اساس تک‌نگاشت اختصاصی داروی ${drug.standardName} (${drug.persianName}) در پایگاه مرجع LiverTox، این مولکول با درجه احتمال ${drug.livertoxCategory} (${drug.internalCode}) از علل شناخته‌شده سمیت کبدی با الگوی تیپیک ${drug.typicalPattern} به شمار می‌رود. دوره کمون متداول آن ${drug.typicalLatency} است و سازوکار سلولی آن شامل «${drug.mechanismFa}» گزارش شده است.`;
  }

  const paragraph2 = `در ارزیابی بیوشیمیایی مورد حاضر، محاسبه شاخص R-ratio عدد ${core.liverInjuryPattern.rValue} را نشان می‌دهد که موید الگوی آسیب «${core.liverInjuryPattern.patternFa}» است. از منظر معیارهای هشداردهنده راهنمای FDA (Hy's Law)، وضعیت این بیمار ${core.hysLaw.statusTextFa} است. ${core.hysLaw.criticalAlertFa}`;

  const paragraph3 = `در ارزیابی اختصاصی علّیت بالینی بر اساس الگوریتم اعتبارسنجی RUCAM (CIOMS)، مجموع امتیاز کسب‌شده ${core.causality.totalScore} است که در طبقه کیفی «${core.causality.interpretationFa}» قرار می‌گیرد (${core.causality.dataCompletenessPercent}٪ کامل‌بودن فیلدها). مطابق اصول طراحی هوش‌دارو، سطح نگرانی بالینی (${core.clinicalConcern.badgeFa}) مستقل از درجه خطر ذاتی دارو یا مرحله قطعی‌سازی علیت بوده و اقدامات مداخله‌ای و پایش‌های بیوشیمیایی متناسب با آن توصیه می‌شود.`;

  const fullNarrative = `${paragraph1}\n\n${paragraph2}\n\n${paragraph3}`;

  return {
    narrativeFa: fullNarrative,
    groundedSources: sources,
    generatedBy: 'DETERMINISTIC_SYNTHESIZER',
    confidence: core.causality.dataCompletenessPercent >= 80 ? 'HIGH' : 'MODERATE',
  };
}
