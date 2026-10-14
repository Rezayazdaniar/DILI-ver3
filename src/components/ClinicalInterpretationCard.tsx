/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Clock,
  HeartPulse,
  ListFilter,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react';
import { DiliAssessmentResponse } from '../types/dili-explanation';

interface ClinicalInterpretationCardProps {
  assessment: DiliAssessmentResponse;
}

export const ClinicalInterpretationCard: React.FC<ClinicalInterpretationCardProps> = ({
  assessment,
}) => {
  const { clinicalInterpretation, coreAssessment, drug } = assessment;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>تفسیر بالینی، پیامدها و اقدامات درمانی</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 font-mono font-normal">
                Clinical Interpretation
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              توضیح اهمیت یافته‌ها، طیف شدت بالینی و راهنمای مداخله بدون تکرار غیرضروری مقادیر خام
            </p>
          </div>
        </div>

        <div className="text-left hidden sm:block">
          <span className="text-[11px] text-slate-400 block">سطح پیامد بالینی:</span>
          <span className="text-xs font-semibold text-indigo-300">
            {clinicalInterpretation.severitySpectrumFa.split(':')[0]}
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {/* Qualitative Clinical Synthesis */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-sm leading-relaxed text-slate-200">
          <div className="font-semibold text-slate-100 flex items-center gap-2 mb-1.5 text-xs">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <span>جمع‌بندی وضعیت ارگان و ایمنی بیمار:</span>
          </div>
          <p>{clinicalInterpretation.summaryFa}</p>
          <div className="mt-2 text-xs font-medium text-teal-400">
            {clinicalInterpretation.severitySpectrumFa}
          </div>
        </div>

        {/* 2-Column layout: Immediate Actions & Monitoring vs Differential Warnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Actions & Monitoring */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>اقدامات بالینی و دارویی توصیه‌شده:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {clinicalInterpretation.recommendedActionsFa.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-medium mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>برنامه پایش آزمایشگاهی:</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                {clinicalInterpretation.monitoringGuidanceFa}
              </p>
            </div>
          </div>

          {/* Differential Diagnosis Warnings */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <ListFilter className="w-4 h-4 text-indigo-400" />
              <span>تشخیص‌های افتراقی نیازمند رد قطعی:</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              انتساب قطعی آسیب به داروی {drug.standardName} منوط به بررسی منفی موارد زیر در این مرحله است:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              {clinicalInterpretation.differentialWarningsFa.map((diff, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span>{diff}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
              بر اساس چارچوب تشخیصی DILIN (شبکه آسیب کبدی دارویی ایالات متحده)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
