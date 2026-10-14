/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  Layers,
  RefreshCw,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react';
import { DiliAssessmentResponse } from '../types/dili-explanation';
import { generateEvidenceGroundedExplanation } from '../lib/dili-explanation-api';

interface EvidenceExplanationCardProps {
  assessment: DiliAssessmentResponse;
  onUpdateAssessment: (updated: DiliAssessmentResponse) => void;
}

export const EvidenceExplanationCard: React.FC<EvidenceExplanationCardProps> = ({
  assessment,
  onUpdateAssessment,
}) => {
  const { drug, evidence, explanation } = assessment;
  const [activeTab, setActiveTab] = useState<'narrative' | 'documents' | 'cases'>('narrative');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRegenerate = async () => {
    setIsGenerating(true);
    try {
      const newExplanation = await generateEvidenceGroundedExplanation(assessment);
      onUpdateAssessment({
        ...assessment,
        explanation: newExplanation,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                شواهد علمی و توضیح مستند (Evidence-Grounded Explanation)
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-purple-300 font-mono">
                RAG + Controlled AI
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              اتصال ادعاها به تک‌نگاشت‌های LiverTox و راهنماهای FDA با کنترل دقیق مرز مدل زبانی
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`px-3 py-1.5 rounded-lg transition font-medium cursor-pointer ${
              activeTab === 'narrative'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            توضیح تحلیلی مستند
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-3 py-1.5 rounded-lg transition font-medium cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'documents'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>اسناد و تک‌نگاشت‌ها</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full text-slate-300">
              {evidence.retrievedDocuments.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-3 py-1.5 rounded-lg transition font-medium cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cases'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>موارد بالینی ثبت‌شده</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full text-slate-300">
              {evidence.caseReports.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: AI Evidence-Grounded Narrative */}
      {activeTab === 'narrative' && (
        <div className="space-y-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-slate-200">
                  سنتز شواهد تحت سیاست پرامپت DILI Navigator:
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-teal-400">
                  {explanation?.generatedBy === 'GEMINI_SERVER'
                    ? 'Gemini 2.5 Server'
                    : 'Deterministic Synthesizer'}
                </span>
              </div>

              <button
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition cursor-pointer border border-slate-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-purple-400 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'در حال بازتولید...' : 'بازتولید تحلیل'}</span>
              </button>
            </div>

            <div className="text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-line space-y-3 font-sans">
              {explanation?.narrativeFa}
            </div>

            {/* Grounded Sources Footer */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>منابع استناد شده:</span>
                <span className="text-slate-300 font-mono">LiverTox, FDA Guidance, CIOMS, DailyMed</span>
              </div>
              <span className="text-slate-500 font-mono">
                درجه اطمینان علمی: {explanation?.confidence === 'HIGH' ? 'بالا (High)' : 'متوسط'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Retrieved Documents */}
      {activeTab === 'documents' && (
        <div className="space-y-3">
          {evidence.retrievedDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      doc.source === 'LiverTox'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : doc.source === 'FDA'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    }`}
                  >
                    {doc.source}
                  </span>
                  <h4 className="text-xs font-bold text-slate-100">{doc.title}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                      doc.evidenceLevel === 'CLASS_LEVEL'
                        ? 'bg-amber-500/10 text-amber-300'
                        : 'bg-emerald-500/10 text-emerald-300'
                    }`}
                  >
                    {doc.evidenceLevel === 'CLASS_LEVEL' ? 'سطح گروه دارویی' : 'سطح اختصاصی دارو'}
                  </span>
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-400 hover:text-teal-300"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
                <p className="mb-1 font-medium">{doc.excerptFa}</p>
                <p className="text-[11px] text-slate-400 font-mono dir-ltr text-left">
                  "{doc.excerptEn}"
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>شناسه سند: {doc.sourceId}</span>
                <span>نسخه بازیابی: {doc.retrievalVersion}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Reported Clinical Cases */}
      {activeTab === 'cases' && (
        <div className="space-y-3">
          {evidence.caseReports.length > 0 ? (
            evidence.caseReports.map((c) => (
              <div
                key={c.caseId}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      {c.caseId}
                    </span>
                    <span className="text-xs text-slate-300 font-semibold">
                      بیمار {c.age} ساله ({c.gender === 'F' ? 'خانم' : 'آقا'})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-slate-400">کمون: {c.latencyDays} روز</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        c.outcome === 'Recovered'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      پیامد: {c.outcome === 'Recovered' ? 'بهبود کامل' : 'کشنده / پیوند'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">{c.summaryFa}</p>

                <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800/80">
                  مرجع: {c.sourceReference}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
              <Layers className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="font-medium text-slate-300">
                هیچ مورد بالینی اختصاصی مستقلی برای این دارو در پایگاه گزارش نشده است.
              </p>
              <p className="text-slate-400 text-[11px] max-w-md mx-auto">
                مطابق اصل طراحی شواهد در گزارش، برای داروهایی مانند فوروزماید شواهد صرفاً در سطح
                گروه دارویی (Loop Diuretics) موجود است و به درستی از نمایش موارد اختصاصی کاذب جلوگیری
                می‌شود.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
