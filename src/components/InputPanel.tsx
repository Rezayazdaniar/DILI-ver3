/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  FlaskConical,
  HelpCircle,
  Pill,
  Search,
  ShieldAlert,
  User,
} from 'lucide-react';
import { LabValues, PatientClinicalContext } from '../types/clinical';
import { DRUG_CATALOG, resolveDrugByName } from '../data/drugCatalog';
import { DrugCatalogEntry } from '../types/dili-evidence';

interface InputPanelProps {
  selectedDrug: DrugCatalogEntry;
  onDrugChange: (drug: DrugCatalogEntry) => void;
  labs: LabValues;
  onLabsChange: (labs: LabValues) => void;
  context: PatientClinicalContext;
  onContextChange: (ctx: PatientClinicalContext) => void;
  onTriggerAssessment: () => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  selectedDrug,
  onDrugChange,
  labs,
  onLabsChange,
  context,
  onContextChange,
  onTriggerAssessment,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [concomitantInput, setConcomitantInput] = useState('');

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setIsSearchOpen(true);
  };

  const handleSelectDrug = (drug: DrugCatalogEntry) => {
    onDrugChange(drug);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const filteredDrugs = searchQuery.trim()
    ? DRUG_CATALOG.filter(
        (d) =>
          d.standardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.persianName.includes(searchQuery) ||
          d.brandNames.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : DRUG_CATALOG.slice(0, 8);

  const addConcomitant = () => {
    if (concomitantInput.trim()) {
      onContextChange({
        ...context,
        concomitantMedications: [...context.concomitantMedications, concomitantInput.trim()],
      });
      setConcomitantInput('');
    }
  };

  const removeConcomitant = (index: number) => {
    const updated = [...context.concomitantMedications];
    updated.splice(index, 1);
    onContextChange({ ...context, concomitantMedications: updated });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-6">
      {/* 1. Drug Selection & DrugResolver */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Pill className="w-4 h-4 text-teal-400" />
            <span>شناسایی دارو و تفکیک شواهد (DrugResolver)</span>
          </label>
          <span className="text-[11px] text-slate-400">جستجو با نام ژنریک یا برند تجاری</span>
        </div>

        <div className="relative">
          <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 focus-within:border-teal-500 transition shadow-inner">
            <Search className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="مثال: Isoniazid، Lasix، Augmentin، استامینوفن..."
              className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full"
            />
            {selectedDrug && !searchQuery && (
              <span className="text-xs px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-medium">
                {selectedDrug.standardName}
              </span>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-950 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto divide-y divide-slate-800/80">
              {filteredDrugs.length > 0 ? (
                filteredDrugs.map((drug) => (
                  <button
                    key={drug.id}
                    onClick={() => handleSelectDrug(drug)}
                    className="w-full text-right p-3 hover:bg-slate-800/80 transition flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-100 group-hover:text-teal-300 flex items-center gap-2">
                        <span>{drug.standardName}</span>
                        <span className="text-xs text-slate-400 font-normal">({drug.persianName})</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>کلاس: {drug.persianDrugClassName}</span>
                        <span>•</span>
                        <span>نام‌های تجاری: {drug.brandNames.join('، ')}</span>
                      </div>
                    </div>
                    <div className="text-left shrink-0">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-mono border border-slate-700">
                        LiverTox {drug.livertoxCategory}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-3 text-xs text-slate-400 text-center">دارویی یافت نشد.</div>
              )}
            </div>
          )}
        </div>

        {/* Selected Drug Badge details */}
        {selectedDrug && (
          <div className="mt-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400">داروی انتخاب‌شده:</span>
              <span className="font-bold text-teal-300">{selectedDrug.standardName}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">{selectedDrug.persianName}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">گروه: {selectedDrug.persianDrugClassName}</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                  selectedDrug.evidenceLevel === 'CLASS_LEVEL'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
                title={
                  selectedDrug.evidenceLevel === 'CLASS_LEVEL'
                    ? 'شواهد در سطح گروه دارویی است و نباید به عنوان گزارش موردی اختصاصی دارو تلقی شود'
                    : 'شواهد اختصاصی در سطح تک‌نگاشت خود دارو موجود است'
                }
              >
                {selectedDrug.evidenceLevel === 'CLASS_LEVEL'
                  ? 'شواهد سطح گروه (Class-Level)'
                  : 'شواهد اختصاصی دارو (Drug-Level)'}
              </span>
              {selectedDrug.pubchemCid && (
                <span className="text-[11px] text-slate-400 font-mono">
                  PubChem CID: {selectedDrug.pubchemCid}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Laboratory Biochemical Parameters */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-cyan-400" />
            <span>داده‌های آزمایشگاهی و حد بالای نرمال (Lab & ULN)</span>
          </label>
          <span className="text-[11px] text-slate-400">ضروری جهت محاسبه R-ratio و قانون های</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* ALT */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold text-slate-300">ALT (SGPT)</span>
              <span className="text-[10px]">U/L</span>
            </div>
            <input
              type="number"
              value={labs.alt}
              onChange={(e) => onLabsChange({ ...labs, alt: Number(e.target.value) || 0 })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-base font-mono font-bold text-white focus:outline-none focus:border-cyan-400"
            />
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
              <span>ULN:</span>
              <input
                type="number"
                value={labs.ulnAlt}
                onChange={(e) => onLabsChange({ ...labs, ulnAlt: Number(e.target.value) || 40 })}
                className="w-12 bg-transparent text-right font-mono border-b border-slate-700 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* AST */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold text-slate-300">AST (SGOT)</span>
              <span className="text-[10px]">U/L</span>
            </div>
            <input
              type="number"
              value={labs.ast}
              onChange={(e) => onLabsChange({ ...labs, ast: Number(e.target.value) || 0 })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-base font-mono font-bold text-white focus:outline-none focus:border-cyan-400"
            />
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
              <span>ULN:</span>
              <input
                type="number"
                value={labs.ulnAst}
                onChange={(e) => onLabsChange({ ...labs, ulnAst: Number(e.target.value) || 40 })}
                className="w-12 bg-transparent text-right font-mono border-b border-slate-700 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Total Bilirubin */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold text-slate-300">Total Bilirubin</span>
              <span className="text-[10px]">mg/dL</span>
            </div>
            <input
              type="number"
              step="0.1"
              value={labs.totalBilirubin}
              onChange={(e) =>
                onLabsChange({ ...labs, totalBilirubin: Number(e.target.value) || 0 })
              }
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-base font-mono font-bold text-white focus:outline-none focus:border-cyan-400"
            />
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
              <span>ULN:</span>
              <input
                type="number"
                step="0.1"
                value={labs.ulnBilirubin}
                onChange={(e) =>
                  onLabsChange({ ...labs, ulnBilirubin: Number(e.target.value) || 1.2 })
                }
                className="w-12 bg-transparent text-right font-mono border-b border-slate-700 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* ALP */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold text-slate-300">ALP (فسفاتاز قلیایی)</span>
              <span className="text-[10px]">U/L</span>
            </div>
            <input
              type="number"
              value={labs.alp}
              onChange={(e) => onLabsChange({ ...labs, alp: Number(e.target.value) || 0 })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-base font-mono font-bold text-white focus:outline-none focus:border-cyan-400"
            />
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
              <span>ULN:</span>
              <input
                type="number"
                value={labs.ulnAlp}
                onChange={(e) => onLabsChange({ ...labs, ulnAlp: Number(e.target.value) || 100 })}
                className="w-12 bg-transparent text-right font-mono border-b border-slate-700 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Clinical Timeline & RUCAM Context */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>زمان‌بندی، عوامل خطر و ارزیابی علّیت (RUCAM Factors)</span>
          </label>
          <span className="text-[11px] text-slate-400">اطلاعات ضروری جهت برآورد علیت بیمار</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Duration of therapy */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">طول دوره مصرف تا بروز اختلال:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={context.treatmentDurationDays}
                onChange={(e) =>
                  onContextChange({
                    ...context,
                    treatmentDurationDays: Number(e.target.value) || 0,
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-indigo-400"
              />
              <span className="text-xs text-slate-400 shrink-0">روز</span>
            </div>
          </div>

          {/* Days post discontinuation */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">مدت زمان پس از قطع مصرف (Dechallenge):</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={context.daysSinceDrugDiscontinuation || 0}
                onChange={(e) =>
                  onContextChange({
                    ...context,
                    daysSinceDrugDiscontinuation: Number(e.target.value) || 0,
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-indigo-400"
              />
              <span className="text-xs text-slate-400 shrink-0">روز</span>
            </div>
          </div>

          {/* Age & Alcohol */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
            <div className="w-1/2">
              <span className="text-xs text-slate-400 block mb-1">سن بیمار:</span>
              <input
                type="number"
                value={context.patientAge}
                onChange={(e) =>
                  onContextChange({ ...context, patientAge: Number(e.target.value) || 0 })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-indigo-400"
              />
            </div>
            <div className="w-1/2">
              <span className="text-xs text-slate-400 block mb-1">مصرف الکل:</span>
              <select
                value={context.alcoholHistory}
                onChange={(e) =>
                  onContextChange({ ...context, alcoholHistory: e.target.value as any })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-1.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400"
              >
                <option value="none_or_light">عدم مصرف / کم</option>
                <option value="moderate">متوسط</option>
                <option value="excessive">سوءمصرف / مداوم</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rule out alternative causes */}
        <div className="mt-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
          <span className="text-xs font-semibold text-slate-300 block">
            بررسی و رد علل غیردارویی جایگزین (جهت احراز شرایط Hy's Law و RUCAM):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={context.viralHepatitisNegative}
                onChange={(e) =>
                  onContextChange({ ...context, viralHepatitisNegative: e.target.checked })
                }
                className="rounded border-slate-700 text-teal-500 focus:ring-0 w-4 h-4"
              />
              <span>هپاتیت‌های ویروسی A/B/C/E و EBV/CMV منفی یا رد شده است</span>
            </label>

            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={context.biliaryObstructionRuledOut}
                onChange={(e) =>
                  onContextChange({ ...context, biliaryObstructionRuledOut: e.target.checked })
                }
                className="rounded border-slate-700 text-teal-500 focus:ring-0 w-4 h-4"
              />
              <span>انسداد حاد مجاری صفراوی با سونوگرافی شکم رد شده است</span>
            </label>

            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={context.hemodynamicInstabilityRuledOut}
                onChange={(e) =>
                  onContextChange({
                    ...context,
                    hemodynamicInstabilityRuledOut: e.target.checked,
                  })
                }
                className="rounded border-slate-700 text-teal-500 focus:ring-0 w-4 h-4"
              />
              <span>شوک همودینامیک، سپسیس یا هپاتیت ایسکمیک رد شده است</span>
            </label>

            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={context.alcoholEtiologyRuledOut}
                onChange={(e) =>
                  onContextChange({ ...context, alcoholEtiologyRuledOut: e.target.checked })
                }
                className="rounded border-slate-700 text-teal-500 focus:ring-0 w-4 h-4"
              />
              <span>هپاتیت الکلی حاد به عنوان علت اصلی رد شده است</span>
            </label>
          </div>
        </div>

        {/* Concomitant medications tags */}
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={concomitantInput}
              onChange={(e) => setConcomitantInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addConcomitant())}
              placeholder="افزودن داروی همزمان (مثلاً Rifampin، پیرازینامید)..."
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 flex-1 focus:outline-none focus:border-teal-500"
            />
            <button
              type="button"
              onClick={addConcomitant}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition cursor-pointer"
            >
              افزودن
            </button>
          </div>

          {context.concomitantMedications.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {context.concomitantMedications.map((med, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700"
                >
                  <span>{med}</span>
                  <button
                    onClick={() => removeConcomitant(idx)}
                    className="hover:text-rose-400 cursor-pointer font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
