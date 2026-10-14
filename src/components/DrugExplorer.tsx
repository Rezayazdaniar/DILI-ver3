/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Flame,
  FlaskConical,
  Layers,
  Network,
  Pill,
  Search,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';
import { DRUG_CATALOG } from '../data/drugCatalog';
import { DrugCatalogEntry, LiverToxCategory } from '../types/dili-evidence';

interface DrugExplorerProps {
  onSelectAndAssessDrug: (drug: DrugCatalogEntry) => void;
  selectedDrugId?: string;
}

export const DrugExplorer: React.FC<DrugExplorerProps> = ({
  onSelectAndAssessDrug,
  selectedDrugId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedPattern, setSelectedPattern] = useState<string>('ALL');
  const [selectedDrug, setSelectedDrug] = useState<DrugCatalogEntry>(
    DRUG_CATALOG.find((d) => d.id === selectedDrugId) || DRUG_CATALOG[0]
  );
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter drugs
  const filteredDrugs = DRUG_CATALOG.filter((drug) => {
    // Search query
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      drug.standardName.toLowerCase().includes(q) ||
      drug.persianName.includes(searchQuery) ||
      drug.drugClassName.toLowerCase().includes(q) ||
      drug.persianDrugClassName.includes(searchQuery) ||
      drug.brandNames.some((b) => b.toLowerCase().includes(q));

    // Category filter
    const matchesCategory =
      selectedCategory === 'ALL' || drug.livertoxCategory === selectedCategory;

    // Pattern filter
    const matchesPattern =
      selectedPattern === 'ALL' || drug.typicalPattern === selectedPattern;

    return matchesSearch && matchesCategory && matchesPattern;
  });

  return (
    <div className="space-y-6">
      {/* Explorer Header & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900">
                  کاوشگر جامع تک‌نگاشت‌های LiverTox
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-mono font-bold border border-teal-200">
                  NIH / NLM Bookshelf
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                دسترسی به شناسنامه مولکولی، رده احتمال سمیت کبدی (A-E)، سازوکار آسیب و گزارش‌های موردی
              </p>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <span>تعداد داروهای فعال:</span>
            <span className="font-extrabold text-teal-700">{filteredDrugs.length}</span>
            <span className="text-slate-300">/</span>
            <span>{DRUG_CATALOG.length} رکورد</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus-within:border-teal-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-100 transition">
              <Search className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی نام دارو، نام فارسی، برند تجاری (مانند Lipitor, Lasix, INH) یا کلاس دارویی..."
                className="bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-bold ml-1 text-[11px]">رده LiverTox:</span>
            {['ALL', 'A', 'B', 'C', 'D', 'E'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer border text-xs ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat === 'ALL' ? 'همه رده‌ها' : `رده ${cat}`}
              </button>
            ))}
          </div>

          {/* Pattern Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-bold ml-1 text-[11px]">الگوی آسیب:</span>
            {[
              { id: 'ALL', label: 'همه الگوها' },
              { id: 'Hepatocellular', label: 'هپاتوسلولار' },
              { id: 'Cholestatic', label: 'کلستاتیک' },
              { id: 'Mixed', label: 'مختلط' },
            ].map((pat) => (
              <button
                key={pat.id}
                onClick={() => setSelectedPattern(pat.id)}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer border text-xs ${
                  selectedPattern === pat.id
                    ? 'bg-cyan-700 text-white border-cyan-700 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {pat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout: Left Drug List / Right Selected Drug Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Drug List (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span>فهرست داروهای بازیابی‌شده از LiverTox ({filteredDrugs.length} مورد):</span>
            <span className="text-[11px]">جهت مشاهده دوسیه، روی هر دارو کلیک کنید</span>
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredDrugs.length > 0 ? (
              filteredDrugs.map((drug) => {
                const isSelected = selectedDrug.id === drug.id;

                const catColor =
                  drug.livertoxCategory === 'A'
                    ? 'bg-rose-50 text-rose-800 border-rose-300'
                    : drug.livertoxCategory === 'B'
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : drug.livertoxCategory === 'C'
                    ? 'bg-yellow-50 text-yellow-800 border-yellow-300'
                    : drug.livertoxCategory === 'D'
                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-300';

                return (
                  <div
                    key={drug.id}
                    onClick={() => setSelectedDrug(drug)}
                    className={`p-4 rounded-xl border transition cursor-pointer text-right relative overflow-hidden group ${
                      isSelected
                        ? 'bg-teal-50/60 border-teal-500 ring-2 ring-teal-200/80 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 group-hover:text-teal-800 transition">
                          {drug.standardName}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          ({drug.persianName})
                        </span>
                      </div>

                      <span className={`text-[11px] font-mono font-extrabold px-2 py-0.5 rounded border ${catColor}`}>
                        رده {drug.livertoxCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
                      <span className="font-medium">{drug.persianDrugClassName}</span>
                      <span className="text-slate-300">|</span>
                      <span className="font-mono text-slate-500 text-[11px]">
                        الگو: {drug.typicalPattern}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span className="truncate max-w-[200px]">
                        برندها: {drug.brandNames.join('، ')}
                      </span>
                      <span
                        className={`font-semibold ${
                          drug.evidenceLevel === 'CLASS_LEVEL'
                            ? 'text-amber-700'
                            : 'text-teal-700'
                        }`}
                      >
                        {drug.evidenceLevel === 'CLASS_LEVEL'
                          ? 'شواهد گروهی'
                          : 'شواهد اختصاصی'}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                دارویی با مشخصات جستجویافته یافت نشد.
              </div>
            )}
          </div>
        </div>

        {/* Right: Selected Drug Comprehensive Dossier (7 cols on lg) */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6 sticky top-24">
            {/* Dossier Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-xl font-black text-slate-900">
                    {selectedDrug.standardName}
                  </h3>
                  <span className="text-sm font-semibold text-slate-600">
                    ({selectedDrug.persianName})
                  </span>
                  <span
                    className={`text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-lg border ${
                      selectedDrug.livertoxCategory === 'A'
                        ? 'bg-rose-50 text-rose-800 border-rose-300'
                        : selectedDrug.livertoxCategory === 'B'
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    LiverTox {selectedDrug.livertoxCategory} ({selectedDrug.internalCode})
                  </span>
                </div>

                <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                  <span>کلاس دارویی: {selectedDrug.persianDrugClassName} ({selectedDrug.drugClassName})</span>
                  {selectedDrug.pubchemCid && (
                    <>
                      <span>•</span>
                      <a
                        href={`https://pubchem.ncbi.nlm.nih.gov/compound/${selectedDrug.pubchemCid}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-700 hover:text-teal-900 font-mono font-bold flex items-center gap-1"
                      >
                        <span>PubChem CID: {selectedDrug.pubchemCid}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* CTA: Assess in DILI Navigator */}
              <button
                onClick={() => onSelectAndAssessDrug(selectedDrug)}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 flex items-center gap-2 cursor-pointer transition shrink-0"
              >
                <Activity className="w-4 h-4" />
                <span>ارزیابی در DILI Navigator</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Evidence Level & Synonyms Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-500 block text-[11px] font-semibold mb-1">
                  سطح شواهد علمی (Evidence Hierarchy):
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold ${
                    selectedDrug.evidenceLevel === 'CLASS_LEVEL'
                      ? 'bg-amber-50 text-amber-900 border border-amber-200'
                      : 'bg-teal-50 text-teal-900 border border-teal-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {selectedDrug.evidenceLevel === 'CLASS_LEVEL'
                      ? 'شواهد در سطح گروه دارویی (Class-Level)'
                      : 'شواهد اختصاصی در سطح تک‌نگاشت دارو'}
                  </span>
                </span>
                {selectedDrug.evidenceLevel === 'CLASS_LEVEL' && (
                  <p className="text-[11px] text-amber-800 mt-1 leading-snug">
                    توجه گزارش: شواهد آسیب فقط در سطح گروه دارویی ثبت شده و نباید به عنوان سمیت مستقیم این دارو تلقی شود.
                  </p>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-500 block text-[11px] font-semibold mb-1">
                  نام‌های تجاری و مترادف‌های بالینی:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedDrug.brandNames.map((brand, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white text-slate-800 font-medium text-[11px] border border-slate-200"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Clinical Presentation & Mechanism */}
            <div className="space-y-4">
              {/* Mechanism */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-cyan-600" />
                  <span>سازوکار سلولی و بیوشیمیایی آسیب کبدی (Mechanism of Toxicity):</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedDrug.mechanismFa}
                </p>
              </div>

              {/* Latency & Pattern */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px] font-semibold mb-1">
                    دوره کمون متداول (Typical Latency):
                  </span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{selectedDrug.typicalLatency}</span>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px] font-semibold mb-1">
                    الگوی غالب آسیب کبدی:
                  </span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{selectedDrug.typicalPattern}</span>
                  </span>
                </div>
              </div>

              {/* Clinical Pearls & Warnings */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                <h4 className="text-xs font-bold text-amber-900 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-amber-700" />
                  <span>نکات بالینی و هشدارهای تجویزی (Clinical Pearls & Warnings):</span>
                </h4>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {selectedDrug.clinicalPearlsFa}
                </p>
              </div>

              {/* Literature Monograph Excerpt */}
              {selectedDrug.documents.length > 0 && (
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <span>تک‌نگاشت رسمی پایگاه LiverTox:</span>
                    </span>
                    {selectedDrug.documents[0].url && (
                      <a
                        href={selectedDrug.documents[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1"
                      >
                        <span>مشاهده در NCBI Bookshelf</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 font-medium">
                    {selectedDrug.documents[0].excerptFa}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono dir-ltr text-left">
                    "{selectedDrug.documents[0].excerptEn}"
                  </p>
                </div>
              )}
            </div>

            {/* Reported Cases if any */}
            {selectedDrug.reportedCases && selectedDrug.reportedCases.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span>موارد بالینی و گزارش‌های موردی مستند:</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                    {selectedDrug.reportedCases.length} مورد
                  </span>
                </h4>
                <div className="space-y-2">
                  {selectedDrug.reportedCases.map((c) => (
                    <div
                      key={c.caseId}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-teal-800">{c.caseId}</span>
                        <span className="font-medium text-slate-500">
                          بیمار {c.age} ساله ({c.gender === 'F' ? 'خانم' : 'آقا'}) • کمون: {c.latencyDays} روز
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.outcome === 'Recovered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {c.outcome === 'Recovered' ? 'بهبود' : 'پیوند / کشنده'}
                        </span>
                      </div>
                      <p className="text-slate-800 mt-1">{c.summaryFa}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
