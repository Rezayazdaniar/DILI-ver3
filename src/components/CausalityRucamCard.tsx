/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertCircle,
  Award,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  HelpCircle,
  Info,
  Scale,
  ShieldAlert,
} from 'lucide-react';
import { DiliAssessmentResponse } from '../types/dili-explanation';

interface CausalityRucamCardProps {
  assessment: DiliAssessmentResponse;
}

export const CausalityRucamCard: React.FC<CausalityRucamCardProps> = ({ assessment }) => {
  const { coreAssessment, drug } = assessment;
  const { causality } = coreAssessment;
  const [showItemDetails, setShowItemDetails] = useState(true);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                ارزیابی علّیت در مورد مشخص (Causality / RUCAM)
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 font-mono">
                CIOMS Algorithm
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              تفکیک شفاف میان داده‌های کاربر، شواهد بازیابی‌شده، فیلدهای ناقص و منطق امتیازدهی
            </p>
          </div>
        </div>

        {/* Score & Category Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">مجموع امتیاز RUCAM:</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-mono text-teal-300">
                {causality.totalScore}
              </span>
              <span className="text-xs text-slate-500">/ 14</span>
            </div>
          </div>

          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-sans ${causality.colorClass}`}
          >
            {causality.interpretationFa}
          </div>
        </div>
      </div>

      {/* Completeness & Data Quality Bar */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-slate-400">میزان تکمیل داده‌های بالینی:</span>
          <div className="w-28 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                causality.dataCompletenessPercent >= 80 ? 'bg-teal-400' : 'bg-amber-400'
              }`}
              style={{ width: `${causality.dataCompletenessPercent}%` }}
            />
          </div>
          <span className="font-mono text-teal-300 font-semibold">
            {causality.dataCompletenessPercent}%
          </span>
        </div>

        <div className="text-slate-400 text-[11px] flex items-center gap-2">
          <span>طبقات امتیازدهی:</span>
          <span className="font-mono text-emerald-400">≥9 بسیار محتمل</span>
          <span>|</span>
          <span className="font-mono text-teal-400">6-8 محتمل</span>
          <span>|</span>
          <span className="font-mono text-amber-400">3-5 ممکن</span>
          <span>|</span>
          <span className="font-mono text-slate-400">1-2 بعید</span>
          <span>|</span>
          <span className="font-mono text-rose-400">≤0 رد شده</span>
        </div>
      </div>

      {/* Missing Fields or Limitations alert if any */}
      {causality.missingFieldsNotesFa.length > 0 && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">نقص‌های اطلاعاتی یا داده‌های ناموجود:</span>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-amber-200/90 text-[11px]">
              {causality.missingFieldsNotesFa.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Toggle Details Button */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
          <span>ریز امتیازات ۷ بخش استاندارد RUCAM و مبنای محاسبه:</span>
        </span>
        <button
          onClick={() => setShowItemDetails(!showItemDetails)}
          className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>{showItemDetails ? 'بستن جدول جزئیات' : 'نمایش تفکیک هر بخش'}</span>
          {showItemDetails ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Items Breakdown Table */}
      {showItemDetails && (
        <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/80 bg-slate-950/40">
          <div className="grid grid-cols-12 bg-slate-950 p-2.5 text-[11px] font-semibold text-slate-400">
            <div className="col-span-4">بخش و مولفه بالینی</div>
            <div className="col-span-3">داده واردشده / منبع</div>
            <div className="col-span-4">دلیل و مستند امتیاز</div>
            <div className="col-span-1 text-center">امتیاز</div>
          </div>

          {causality.items.map((item) => (
            <div
              key={item.domainId}
              className={`grid grid-cols-12 p-3 text-xs items-center gap-2 transition hover:bg-slate-900/50 ${
                item.isMissingData ? 'bg-amber-950/10' : ''
              }`}
            >
              <div className="col-span-4 font-medium text-slate-200">
                <div className="flex items-center gap-1.5">
                  {item.isMissingData && (
                    <FileQuestion className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                  <span>{item.titleFa}</span>
                </div>
              </div>

              <div className="col-span-3 text-[11px] font-mono text-slate-300 truncate">
                {item.userInputOrSource}
              </div>

              <div className="col-span-4 text-[11px] text-slate-400 leading-snug">
                {item.rationaleFa}
              </div>

              <div className="col-span-1 text-center">
                <span
                  className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                    item.points > 0
                      ? 'bg-teal-500/20 text-teal-300'
                      : item.points < 0
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.points > 0 ? `+${item.points}` : item.points}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
