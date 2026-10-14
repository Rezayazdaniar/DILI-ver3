/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Database,
  ExternalLink,
  Flame,
  Gauge,
  Layers,
  Scale,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { DiliAssessmentResponse } from '../types/dili-explanation';

interface CoreAssessmentGridProps {
  assessment: DiliAssessmentResponse;
}

export const CoreAssessmentGrid: React.FC<CoreAssessmentGridProps> = ({ assessment }) => {
  const { coreAssessment, drug, labValues } = assessment;
  const { drugRelatedRisk, liverInjuryPattern, hysLaw, clinicalConcern } = coreAssessment;

  // Visual background styling based on concern
  const concernTheme =
    clinicalConcern.level === 'CRITICAL'
      ? {
          banner: 'bg-rose-50 border-rose-200 text-rose-900',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: <Flame className="w-5 h-5 text-rose-600 animate-bounce" />,
        }
      : clinicalConcern.level === 'HIGH'
      ? {
          banner: 'bg-amber-50 border-amber-200 text-amber-900',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
        }
      : clinicalConcern.level === 'MODERATE'
      ? {
          banner: 'bg-yellow-50 border-yellow-200 text-yellow-900',
          badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
        }
      : {
          banner: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
        };

  return (
    <div className="space-y-4">
      {/* Top Banner: Clinical Concern (Distinct Concept #3 from Page 2 & 9) */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all shadow-xs ${concernTheme.banner}`}>
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0">
            {concernTheme.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                مفهوم بنیادین ۳: سطح فوریت و نگرانی بالینی (Clinical Concern)
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${concernTheme.badge}`}>
                {clinicalConcern.badgeFa}
              </span>
            </div>
            <p className="text-xs sm:text-sm mt-0.5 font-medium leading-relaxed text-slate-800">
              {clinicalConcern.urgencyDescriptionFa}
            </p>
          </div>
        </div>

        <div className="hidden lg:block text-left shrink-0">
          <span className="text-[11px] block text-slate-500 font-medium">اصل تفکیک مفهومی:</span>
          <span className="text-xs font-mono font-bold text-slate-700">
            Clinical Concern ≠ Drug-level Risk
          </span>
        </div>
      </div>

      {/* Grid of 3 Main Cards: DILI Risk · Liver Injury · Hy's Law (Section 10 Page 13) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: DILI Risk (Drug-related Risk) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 transition">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">۱. خطر مرتبط با دارو</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Drug-related Risk</span>
                </div>
              </div>

              <div className="text-left">
                <span
                  className={`text-lg font-black font-mono px-2.5 py-0.5 rounded-lg border ${
                    drugRelatedRisk.category === 'A'
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : drugRelatedRisk.category === 'B'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : drugRelatedRisk.category === 'C'
                      ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  رده {drugRelatedRisk.category}
                </span>
              </div>
            </div>

            {/* Level of evidence flag: Drug-Level vs Class-Level */}
            <div className="mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                  drug.evidenceLevel === 'CLASS_LEVEL'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'bg-teal-50 text-teal-900 border border-teal-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-teal-600" />
                <span>
                  {drug.evidenceLevel === 'CLASS_LEVEL'
                    ? 'شواهد در سطح گروه دارویی (Class-level)'
                    : 'شواهد اختصاصی در سطح تک‌نگاشت دارو'}
                </span>
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed min-h-[44px]">
              {drugRelatedRisk.descriptionFa}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>کد نگاشت داخلی:</span>
                <span className="font-mono font-bold text-slate-800">
                  {drugRelatedRisk.internalCode}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>الگوی تیپیک دارو:</span>
                <span className="text-slate-800 font-medium">{drug.typicalPattern}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>دوره کمون متداول:</span>
                <span className="text-slate-800 font-medium">{drug.typicalLatency}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>منبع شواهد: {drugRelatedRisk.sourceCitation}</span>
            <span className="text-teal-700 font-mono font-bold">NIH / NLM</span>
          </div>
        </div>

        {/* Card 2: Liver Injury Pattern (R-ratio) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 transition">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200">
                  <Gauge className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">۲. الگوی آسیب بیوشیمیایی</h3>
                  <span className="text-[10px] text-slate-500 font-mono">R-ratio Calculation</span>
                </div>
              </div>

              <div className="text-left">
                <span
                  className={`text-lg font-black font-mono px-2.5 py-0.5 rounded-lg border ${
                    liverInjuryPattern.pattern === 'Hepatocellular'
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : liverInjuryPattern.pattern === 'Cholestatic'
                      ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  R = {liverInjuryPattern.rValue}
                </span>
              </div>
            </div>

            {/* Pattern Badge */}
            <div className="mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${
                  liverInjuryPattern.pattern === 'Hepatocellular'
                    ? 'bg-rose-50 text-rose-900 border-rose-200'
                    : liverInjuryPattern.pattern === 'Cholestatic'
                    ? 'bg-cyan-50 text-cyan-900 border-cyan-200'
                    : 'bg-amber-50 text-amber-900 border-amber-200'
                }`}
              >
                <span>الگوی آسیب: {liverInjuryPattern.patternFa}</span>
              </span>
            </div>

            {/* Formula Visual Box */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 mb-3 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>فرمول محاسبه:</span>
                <span className="font-mono text-teal-700 font-bold">
                  (ALT / ULN_ALT) ÷ (ALP / ULN_ALP)
                </span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs text-slate-800 pt-1">
                <span>
                  ({labValues.alt}/{labValues.ulnAlt} = {liverInjuryPattern.altMultipleOfUln}×) ÷ ({labValues.alp}/{labValues.ulnAlp} = {liverInjuryPattern.alpMultipleOfUln}×)
                </span>
                <span className="font-bold text-teal-700">≈ {liverInjuryPattern.rValue}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed min-h-[44px]">
              {liverInjuryPattern.interpretationFa}
            </p>
          </div>

          {/* Classification thresholds footer */}
          <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span className={liverInjuryPattern.rValue >= 5 ? 'text-rose-700 font-bold' : ''}>
              R ≥ 5 (هپاتوسلولار)
            </span>
            <span
              className={
                liverInjuryPattern.rValue > 2 && liverInjuryPattern.rValue < 5
                  ? 'text-amber-700 font-bold'
                  : ''
              }
            >
              2 &lt; R &lt; 5 (مختلط)
            </span>
            <span className={liverInjuryPattern.rValue <= 2 ? 'text-cyan-700 font-bold' : ''}>
              R ≤ 2 (کلستاتیک)
            </span>
          </div>
        </div>

        {/* Card 3: Hy's Law (Criterion Card) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 transition">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">۳. وضعیت معیار Hy's Law</h3>
                  <span className="text-[10px] text-slate-500 font-mono">FDA Premarketing Rule</span>
                </div>
              </div>

              <div className="text-left">
                <span
                  className={`text-xs font-black font-mono px-2.5 py-1 rounded-lg border ${
                    hysLaw.isMet
                      ? 'bg-rose-100 text-rose-900 border-rose-300'
                      : hysLaw.statusTextFa.includes('احتمالی')
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  }`}
                >
                  {hysLaw.isMet ? 'HY\'S LAW: TRUE' : 'HY\'S LAW: FALSE'}
                </span>
              </div>
            </div>

            {/* Checklist of 4 criteria */}
            <div className="space-y-1.5 mb-3">
              {hysLaw.criteria.map((crit) => (
                <div
                  key={crit.id}
                  className={`p-2 rounded-lg border text-xs flex items-start gap-2 ${
                    crit.isMet
                      ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {crit.isMet ? (
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <div className="w-full">
                    <div className="flex items-center justify-between font-medium">
                      <span>{crit.nameFa}</span>
                      <span className="font-mono text-[10px] font-bold">{crit.isMet ? 'احراز شده' : 'منفی'}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                      {crit.currentValueDescription}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Alert commentary */}
            {hysLaw.isMet && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>نرخ مورتالیتی ۱۰ درصدی (Mortality Signal)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-rose-800">
                  احراز هر سه معیار آزمایشگاهی به علاوه رد علل جایگزین نشانگر آسیب شدید هپاتوسلولار با خطر بالای پیوند یا فوت بیمار است.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>راهنمای پیش از بازاریابی FDA (2009)</span>
            <span className="text-rose-700 font-semibold">سند راهنما</span>
          </div>
        </div>
      </div>
    </div>
  );
};
