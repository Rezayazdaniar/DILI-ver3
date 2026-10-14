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
  HelpCircle,
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

  return (
    <div className="space-y-4">
      {/* Top Banner: Clinical Concern (Distinct Concept #3 from Page 2 & 9) */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${clinicalConcern.colorClass} backdrop-blur-sm`}
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-current shrink-0">
            {clinicalConcern.level === 'CRITICAL' ? (
              <Flame className="w-6 h-6 animate-bounce text-rose-400" />
            ) : clinicalConcern.level === 'HIGH' ? (
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                مفهوم بنیادین ۳: نگرانی بالینی فعلی (Clinical Concern)
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold border border-current">
                {clinicalConcern.badgeFa}
              </span>
            </div>
            <p className="text-sm mt-0.5 font-medium leading-relaxed">
              {clinicalConcern.urgencyDescriptionFa}
            </p>
          </div>
        </div>

        <div className="hidden lg:block text-left shrink-0">
          <span className="text-[11px] block text-slate-300/80">اصل تفکیک مفهومی:</span>
          <span className="text-xs font-mono text-slate-200">
            نگرانی بالینی ≠ درجه خطر کلی دارو
          </span>
        </div>
      </div>

      {/* Grid of 3 Main Cards: DILI Risk · Liver Injury · Hy's Law (Section 10 Page 13) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: DILI Risk (Drug-related Risk) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">۱. خطر مرتبط با دارو</h3>
                  <span className="text-[10px] text-slate-400 font-mono">Drug-related Risk</span>
                </div>
              </div>

              <div className="text-left">
                <span
                  className={`text-xl font-black font-mono px-2.5 py-0.5 rounded-lg border ${
                    drugRelatedRisk.category === 'A'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : drugRelatedRisk.category === 'B'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : drugRelatedRisk.category === 'C'
                      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
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
                    ? 'bg-amber-950/60 text-amber-300 border border-amber-600/40'
                    : 'bg-teal-950/60 text-teal-300 border border-teal-600/40'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {drug.evidenceLevel === 'CLASS_LEVEL'
                    ? 'شواهد در سطح گروه دارویی (Class-level)'
                    : 'شواهد اختصاصی در سطح تک‌نگاشت دارو'}
                </span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
              {drugRelatedRisk.descriptionFa}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>کد نگاشت داخلی:</span>
                <span className="font-mono font-bold text-slate-200">
                  {drugRelatedRisk.internalCode}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>الگوی تیپیک دارو:</span>
                <span className="text-slate-200">{drug.typicalPattern}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>دوره کمون متداول:</span>
                <span className="text-slate-200">{drug.typicalLatency}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2.5 border-t border-slate-800/50 flex items-center justify-between text-[11px] text-slate-500">
            <span>منبع شواهد: {drugRelatedRisk.sourceCitation}</span>
            <span className="text-teal-400 font-mono">NIH/NLM</span>
          </div>
        </div>

        {/* Card 2: Liver Injury Pattern (R-ratio) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Gauge className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">۲. الگوی آسیب بیوشیمیایی</h3>
                  <span className="text-[10px] text-slate-400 font-mono">R-ratio Calculation</span>
                </div>
              </div>

              <div className="text-left">
                <span
                  className={`text-xl font-black font-mono px-2.5 py-0.5 rounded-lg border ${
                    liverInjuryPattern.pattern === 'Hepatocellular'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : liverInjuryPattern.pattern === 'Cholestatic'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
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
                    ? 'bg-rose-950/60 text-rose-300 border-rose-600/40'
                    : liverInjuryPattern.pattern === 'Cholestatic'
                    ? 'bg-cyan-950/60 text-cyan-300 border-cyan-600/40'
                    : 'bg-amber-950/60 text-amber-300 border-amber-600/40'
                }`}
              >
                <span>الگوی آسیب: {liverInjuryPattern.patternFa}</span>
              </span>
            </div>

            {/* Formula Visual Box */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 mb-3 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>فرمول محاسبه:</span>
                <span className="font-mono text-teal-300">
                  (ALT / ULN_ALT) ÷ (ALP / ULN_ALP)
                </span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs text-slate-200 pt-1">
                <span>
                  ({labValues.alt}/{labValues.ulnAlt} = {liverInjuryPattern.altMultipleOfUln}×) ÷ ({labValues.alp}/{labValues.ulnAlp} = {liverInjuryPattern.alpMultipleOfUln}×)
                </span>
                <span className="font-bold text-teal-400">≈ {liverInjuryPattern.rValue}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
              {liverInjuryPattern.interpretationFa}
            </p>
          </div>

          {/* Classification thresholds footer */}
          <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className={liverInjuryPattern.rValue >= 5 ? 'text-rose-400 font-bold' : ''}>
              R ≥ 5 (هپاتوسلولار)
            </span>
            <span
              className={
                liverInjuryPattern.rValue > 2 && liverInjuryPattern.rValue < 5
                  ? 'text-amber-400 font-bold'
                  : ''
              }
            >
              2 &lt; R &lt; 5 (مختلط)
            </span>
            <span className={liverInjuryPattern.rValue <= 2 ? 'text-cyan-400 font-bold' : ''}>
              R ≤ 2 (کلستاتیک)
            </span>
          </div>
        </div>

        {/* Card 3: Hy's Law (Criterion Card) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">۳. وضعیت معیار Hy's Law</h3>
                  <span className="text-[10px] text-slate-400 font-mono">FDA Premarketing Rule</span>
                </div>
              </div>

              <div className="text-left">
                <span
                  className={`text-xs font-black font-mono px-2.5 py-1 rounded-lg border ${
                    hysLaw.isMet
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 animate-pulse'
                      : hysLaw.statusTextFa.includes('احتمالی')
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {hysLaw.isMet ? 'HY\'S LAW: TRUE' : 'HY\'S LAW: FALSE'}
                </span>
              </div>
            </div>

            {/* Checklist of 4 criteria */}
            <div className="space-y-2 mb-3">
              {hysLaw.criteria.map((crit) => (
                <div
                  key={crit.id}
                  className={`p-2 rounded-lg border text-xs flex items-start gap-2 ${
                    crit.isMet
                      ? 'bg-rose-950/30 border-rose-900/40 text-rose-200'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                  }`}
                >
                  {crit.isMet ? (
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  )}
                  <div className="w-full">
                    <div className="flex items-center justify-between font-medium">
                      <span>{crit.nameFa}</span>
                      <span className="font-mono text-[10px]">{crit.isMet ? 'برقرار' : 'منفی'}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      {crit.currentValueDescription}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Alert commentary */}
            {hysLaw.isMet && (
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-xs text-rose-200">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>نرخ مورتالیتی ۱۰ درصدی (Mortality Signal)</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  احراز هر سه معیار آزمایشگاهی به علاوه رد علل جایگزین نشانگر آسیب شدید هپاتوسلولار با خطر بالای پیوند یا فوت بیمار است.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>راهنمای پیش از بازاریابی FDA (2009)</span>
            <span className="text-rose-400">سند راهنما</span>
          </div>
        </div>
      </div>
    </div>
  );
};
