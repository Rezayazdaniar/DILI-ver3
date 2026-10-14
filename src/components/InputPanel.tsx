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
  Dna,
  Filter,
  FlaskConical,
  HelpCircle,
  Pill,
  Search,
  ShieldAlert,
  Sparkles,
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
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-5">
      {/* 1. Drug Selection & DrugResolver */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
            <Pill className="w-4 h-4 text-teal-600" />
            <span>ماژول شناسایی مولکول دارویی (DrugResolver)</span>
          </label>
          <span className="text-[11px] text-slate-500">پوشش نام‌های استاندارد، فارسی و برندهای تجاری</span>
        </div>

        <div className="relative">
          <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus-within:border-teal-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-100 transition">
            <Search className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="جستجوی نام دارو یا برند (مانند Isoniazid، Lasix، Augmentin، استامینوفن...)"
              className="bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
            />
            {selectedDrug && !searchQuery && (
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 font-bold border border-teal-200 shrink-0">
                {selectedDrug.standardName}
              </span>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto divide-y divide-slate-100">
              {filteredDrugs.length > 0 ? (
                filteredDrugs.map((drug) => (
                  <button
                    key={drug.id}
                    onClick={() => handleSelectDrug(drug)}
                    className="w-full text-right p-3 hover:bg-teal-50/50 transition flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-teal-700 flex items-center gap-2">
                        <span>{drug.standardName}</span>
                        <span className="text-xs text-slate-500 font-normal">({drug.persianName})</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>کلاس: {drug.persianDrugClassName}</span>
                        <span>•</span>
                        <span>برندها: {drug.brandNames.join('، ')}</span>
                      </div>
                    </div>
                    <div className="text-left shrink-0">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono border border-slate-200">
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

        {/* Selected Drug Badge Details */}
        {selectedDrug && (
          <div className="mt-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap text-slate-700">
              <span className="font-semibold text-slate-500">داروی فعال:</span>
              <span className="font-extrabold text-teal-800">{selectedDrug.standardName}</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-800 font-medium">{selectedDrug.persianName}</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">گروه: {selectedDrug.persianDrugClassName}</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                  selectedDrug.evidenceLevel === 'CLASS_LEVEL'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {selectedDrug.evidenceLevel === 'CLASS_LEVEL'
                  ? 'شواهد سطح گروه دارویی (Class-Level)'
                  : 'شواهد اختصاصی دارو (Drug-Level)'}
              </span>
              {selectedDrug.pubchemCid && (
                <span className="text-[11px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                  PubChem CID: {selectedDrug.pubchemCid}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Biochemical Laboratory Parameters */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
            <FlaskConical className="w-4 h-4 text-cyan-600" />
            <span>پنل آزمایشگاهی بیوشیمیایی کبد (Liver Panel & ULN)</span>
          </label>
          <span className="text-[11px] text-slate-500">مبنای محاسبه شاخص R و سه‌گانه قانون های</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* ALT */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span className="font-bold text-slate-800">ALT (SGPT)</span>
              <span className="text-[10px] text-slate-400">U/L</span>
            </div>
            <input
              type="number"
              value={labs.alt}
              onChange={(e) => onLabsChange({ ...labs, alt: Number(e.target.value) || 0 })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-base font-mono font-extrabold text-slate-900 focus:outline-none focus:border-teal-600"
            />
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
              <span>حد بالای نرمال (ULN):</span>
              <input
                type="number"
                value={labs.ulnAlt}
                onChange={(e) => onLabsChange({ ...labs, ulnAlt: Number(e.target.value) || 40 })}
                className="w-12 bg-transparent text-right font-mono font-semibold border-b border-slate-300 focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>

          {/* AST */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span className="font-bold text-slate-800">AST (SGOT)</span>
              <span className="text-[10px] text-slate-400">U/L</span>
            </div>
            <input
              type="number"
              value={labs.ast}
              onChange={(e) => onLabsChange({ ...labs, ast: Number(e.target.value) || 0 })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-base font-mono font-extrabold text-slate-900 focus:outline-none focus:border-teal-600"
            />
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
              <span>حد بالای نرمال (ULN):</span>
              <input
                type="number"
                value={labs.ulnAst}
                onChange={(e) => onLabsChange({ ...labs, ulnAst: Number(e.target.value) || 40 })}
                className="w-12 bg-transparent text-right font-mono font-semibold border-b border-slate-300 focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>

          {/* Total Bilirubin */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span className="font-bold text-slate-800">Total Bilirubin</span>
              <span className="text-[10px] text-slate-400">mg/dL</span>
            </div>
            <input
              type="number"
              step="0.1"
              value={labs.totalBilirubin}
              onChange={(e) =>
                onLabsChange({ ...labs, totalBilirubin: Number(e.target.value) || 0 })
              }
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-base font-mono font-extrabold text-slate-900 focus:outline-none focus:border-teal-600"
            />
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
              <span>حد بالای نرمال (ULN):</span>
              <input
                type="number"
                step="0.1"
                value={labs.ulnBilirubin}
                onChange={(e) =>
                  onLabsChange({ ...labs, ulnBilirubin: Number(e.target.value) || 1.2 })
                }
                className="w-12 bg-transparent text-right font-mono font-semibold border-b border-slate-300 focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>

          {/* ALP */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span className="font-bold text-slate-800">ALP (آلکالین فسفاتاز)</span>
              <span className="text-[10px] text-slate-400">U/L</span>
            </div>
            <input
              type="number"
              value={labs.alp}
              onChange={(e) => onLabsChange({ ...labs, alp: Number(e.target.value) || 0 })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-base font-mono font-extrabold text-slate-900 focus:outline-none focus:border-teal-600"
            />
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
              <span>حد بالای نرمال (ULN):</span>
              <input
                type="number"
                value={labs.ulnAlp}
                onChange={(e) => onLabsChange({ ...labs, ulnAlp: Number(e.target.value) || 100 })}
                className="w-12 bg-transparent text-right font-mono font-semibold border-b border-slate-300 focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Clinical Timeline & RUCAM Context */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>متغیرهای زمان‌بندی و عوامل اختصاصی علّیت (RUCAM CIOMS)</span>
          </label>
          <span className="text-[11px] text-slate-500">محاسبه احتمال قطعی علیت در بیمار</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Duration of therapy */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-600 block mb-1 font-medium">فاصله شروع تا اختلال:</span>
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
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 font-bold focus:outline-none focus:border-indigo-600"
              />
              <span className="text-xs text-slate-500 shrink-0">روز</span>
            </div>
          </div>

          {/* Days post discontinuation */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-600 block mb-1 font-medium">فاصله پس از قطع دارو (Dechallenge):</span>
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
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm font-mono text-slate-900 font-bold focus:outline-none focus:border-indigo-600"
              />
              <span className="text-xs text-slate-500 shrink-0">روز</span>
            </div>
          </div>

          {/* Age & Alcohol */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
            <div className="w-1/2">
              <span className="text-xs text-slate-600 block mb-1 font-medium">سن بیمار:</span>
              <input
                type="number"
                value={context.patientAge}
                onChange={(e) =>
                  onContextChange({ ...context, patientAge: Number(e.target.value) || 0 })
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-mono text-slate-900 font-bold focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div className="w-1/2">
              <span className="text-xs text-slate-600 block mb-1 font-medium">سابقه الکل:</span>
              <select
                value={context.alcoholHistory}
                onChange={(e) =>
                  onContextChange({ ...context, alcoholHistory: e.target.value as any })
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-1.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-600"
              >
                <option value="none_or_light">عدم مصرف / کم</option>
                <option value="moderate">متوسط</option>
                <option value="excessive">سوءمصرف / مداوم</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rule out alternative causes */}
        <div className="mt-3 p-3 bg-slate-50/80 border border-slate-200 rounded-xl space-y-2">
          <span className="text-xs font-bold text-slate-800 block">
            چک‌لیست بررسی و رد علل غیردارویی جایگزین (معیار حیاتی Hy's Law و RUCAM):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <label className="flex items-center gap-2 text-slate-700 cursor-pointer hover:text-slate-900 transition">
              <input
                type="checkbox"
                checked={context.viralHepatitisNegative}
                onChange={(e) =>
                  onContextChange({ ...context, viralHepatitisNegative: e.target.checked })
                }
                className="rounded border-slate-300 text-teal-600 focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <span>هپاتیت‌های ویروسی A/B/C/E و EBV/CMV منفی یا رد شده است</span>
            </label>

            <label className="flex items-center gap-2 text-slate-700 cursor-pointer hover:text-slate-900 transition">
              <input
                type="checkbox"
                checked={context.biliaryObstructionRuledOut}
                onChange={(e) =>
                  onContextChange({ ...context, biliaryObstructionRuledOut: e.target.checked })
                }
                className="rounded border-slate-300 text-teal-600 focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <span>انسداد حاد مجاری صفراوی با سونوگرافی شکم رد شده است</span>
            </label>

            <label className="flex items-center gap-2 text-slate-700 cursor-pointer hover:text-slate-900 transition">
              <input
                type="checkbox"
                checked={context.hemodynamicInstabilityRuledOut}
                onChange={(e) =>
                  onContextChange({
                    ...context,
                    hemodynamicInstabilityRuledOut: e.target.checked,
                  })
                }
                className="rounded border-slate-300 text-teal-600 focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <span>شوک همودینامیک، سپسیس یا هپاتیت ایسکمیک رد شده است</span>
            </label>

            <label className="flex items-center gap-2 text-slate-700 cursor-pointer hover:text-slate-900 transition">
              <input
                type="checkbox"
                checked={context.alcoholEtiologyRuledOut}
                onChange={(e) =>
                  onContextChange({ ...context, alcoholEtiologyRuledOut: e.target.checked })
                }
                className="rounded border-slate-300 text-teal-600 focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <span>هپاتیت الکلی حاد به عنوان علت اولیه رد شده است</span>
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
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 flex-1 focus:outline-none focus:border-teal-600"
            />
            <button
              type="button"
              onClick={addConcomitant}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition cursor-pointer border border-slate-200"
            >
              افزودن
            </button>
          </div>

          {context.concomitantMedications.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {context.concomitantMedications.map((med, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700 border border-slate-200"
                >
                  <span>{med}</span>
                  <button
                    onClick={() => removeConcomitant(idx)}
                    className="hover:text-rose-600 cursor-pointer font-bold"
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
