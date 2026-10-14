/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Clock,
  Crosshair,
  Gauge,
  HeartPulse,
  Info,
  ListFilter,
  ShieldAlert,
  Stethoscope,
  TrendingUp,
} from 'lucide-react';
import {
  CartesianGrid,
  Cell,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { DiliAssessmentResponse } from '../types/dili-explanation';

interface ClinicalInterpretationCardProps {
  assessment: DiliAssessmentResponse;
}

export const ClinicalInterpretationCard: React.FC<ClinicalInterpretationCardProps> = ({
  assessment,
}) => {
  const { clinicalInterpretation, coreAssessment, drug, labValues } = assessment;
  const { liverInjuryPattern, hysLaw } = coreAssessment;

  // Multiples of ULN
  const altMultiple = Number((labValues.alt / (labValues.ulnAlt || 40)).toFixed(2));
  const astMultiple = Number((labValues.ast / (labValues.ulnAst || 40)).toFixed(2));
  const biliMultiple = Number(
    (labValues.totalBilirubin / (labValues.ulnBilirubin || 1.2)).toFixed(2)
  );
  const alpMultiple = Number((labValues.alp / (labValues.ulnAlp || 100)).toFixed(2));

  // Patient's current position on the Hy's Law (eDISH) coordinate system
  const patientDataPoint = [
    {
      x: altMultiple,
      y: biliMultiple,
      z: alpMultiple,
      drugName: drug.standardName,
      persianName: drug.persianName,
      isPatient: true,
      altVal: labValues.alt,
      biliVal: labValues.totalBilirubin,
      alpVal: labValues.alp,
      rValue: liverInjuryPattern.rValue,
      pattern: liverInjuryPattern.patternFa,
      isHysLaw: hysLaw.isMet,
    },
  ];

  // Subtle clinical reference benchmark points to give spatial clinical depth
  const referencePoints = [
    { x: 0.8, y: 0.7, z: 0.9, label: 'محدوده طبیعی / سالم', category: 'normal' },
    { x: 1.5, y: 1.0, z: 1.1, label: 'افزایش خفیف بدون علامت', category: 'normal' },
    { x: 4.5, y: 1.2, z: 1.0, label: 'ترانس‌آمینیت ایزوله (Temple)', category: 'temple' },
    { x: 1.4, y: 3.2, z: 3.8, label: 'کلستاز غالب (زردی انسدادی)', category: 'cholestatic' },
    { x: 8.5, y: 3.5, z: 1.1, label: 'مورد کلاسیک Hy\'s Law (FDA)', category: 'hys_law' },
  ];

  // Determine which eDISH quadrant the patient occupies
  const inHysLawQuadrant = altMultiple >= 3.0 && biliMultiple >= 2.0;
  const inTempleQuadrant = altMultiple >= 3.0 && biliMultiple < 2.0;
  const inCholestaticQuadrant = altMultiple < 3.0 && biliMultiple >= 2.0;
  const inNormalQuadrant = altMultiple < 3.0 && biliMultiple < 2.0;

  // Max bounds for axes (dynamically adapt if patient has massive transaminases e.g. Acetaminophen)
  const xMax = Math.max(12, Math.ceil(altMultiple * 1.25));
  const yMax = Math.max(6, Math.ceil(biliMultiple * 1.3));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>تفسیر بالینی، پیامدها و ماتریس بصری خطرات</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-indigo-800 font-mono font-bold">
                Clinical Interpretation & Hy's Law Plot
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              ترکیب شواهد آزمایشگاهی، نمودار پراکندگی استاندارد eDISH FDA و تحلیل شدت بالینی
            </p>
          </div>
        </div>

        <div className="text-left hidden sm:block">
          <span className="text-[11px] text-slate-500 block">سطح پیامد بالینی:</span>
          <span className="text-xs font-bold text-indigo-800">
            {clinicalInterpretation.severitySpectrumFa.split(':')[0]}
          </span>
        </div>
      </div>

      {/* NEW SECTION: Standard Hy's Law Scatter Plot (eDISH Evaluation) */}
      <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-rose-600" />
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span>نمودار پراکندگی غربالگری خطر Hy's Law (eDISH Scatter Plot)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  FDA Standard Model
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                محور افقی: ضریب حد بالای نرمال ALT | محور عمودی: ضریب حد بالای نرمال بیلی‌روبین کل (Total Bilirubin)
              </p>
            </div>
          </div>

          {/* Current Patient Quadrant Badge */}
          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-500 block font-medium">موقعیت فعلی بیمار در ماتریس:</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                inHysLawQuadrant
                  ? hysLaw.isMet
                    ? 'bg-rose-100 text-rose-900 border-rose-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                  : inTempleQuadrant
                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                  : inCholestaticQuadrant
                  ? 'bg-cyan-50 text-cyan-900 border-cyan-200'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  inHysLawQuadrant
                    ? 'bg-rose-600 animate-ping'
                    : inTempleQuadrant
                    ? 'bg-amber-600'
                    : inCholestaticQuadrant
                    ? 'bg-cyan-600'
                    : 'bg-emerald-600'
                }`}
              />
              <span>
                {inHysLawQuadrant
                  ? 'چارک بحرانی Hy\'s Law (ALT ≥ 3× & Bili ≥ 2×)'
                  : inTempleQuadrant
                  ? 'چارک آسیب هپاتوسلولار بدون یرقان (Temple)'
                  : inCholestaticQuadrant
                  ? 'چارک کلستاز یا هیپربیلی‌روبینمی ایزوله'
                  : 'محدوده ایمن / اختلال خفیف (Normal/Safe)'}
              </span>
            </span>
          </div>
        </div>

        {/* The Recharts Scatter Plot */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 15, right: 25, bottom: 25, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                {/* X Axis: ALT multiple of ULN */}
                <XAxis
                  type="number"
                  dataKey="x"
                  name="ALT (× ULN)"
                  domain={[0, xMax]}
                  tickCount={7}
                  unit="×"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  label={{
                    value: 'ALT (ضریب حد بالای نرمال ULN)',
                    position: 'insideBottom',
                    offset: -12,
                    fontSize: 11,
                    fill: '#475569',
                    fontFamily: 'Vazirmatn',
                  }}
                />

                {/* Y Axis: Total Bilirubin multiple of ULN */}
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Bilirubin (× ULN)"
                  domain={[0, yMax]}
                  tickCount={6}
                  unit="×"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  label={{
                    value: 'بیلی‌روبین کل (× ULN)',
                    angle: -90,
                    position: 'insideLeft',
                    offset: 5,
                    fontSize: 11,
                    fill: '#475569',
                    fontFamily: 'Vazirmatn',
                  }}
                />

                <ZAxis type="number" dataKey="z" range={[80, 260]} name="ALP (× ULN)" />

                {/* Standard Threshold Reference Lines */}
                {/* Vertical Line at ALT = 3x ULN */}
                <ReferenceLine
                  x={3.0}
                  stroke="#dc2626"
                  strokeWidth={2}
                  strokeDasharray="4 3"
                  label={{
                    value: 'آستانه 3× ULN (ALT)',
                    position: 'top',
                    fill: '#dc2626',
                    fontSize: 10,
                    fontFamily: 'Vazirmatn',
                    fontWeight: 'bold',
                  }}
                />

                {/* Horizontal Line at Total Bilirubin = 2x ULN */}
                <ReferenceLine
                  y={2.0}
                  stroke="#dc2626"
                  strokeWidth={2}
                  strokeDasharray="4 3"
                  label={{
                    value: 'آستانه 2× ULN (Bilirubin)',
                    position: 'insideTopRight',
                    fill: '#dc2626',
                    fontSize: 10,
                    fontFamily: 'Vazirmatn',
                    fontWeight: 'bold',
                  }}
                />

                {/* Hy's Law Danger Zone Area Highlight (Top Right) */}
                <ReferenceArea
                  x1={3.0}
                  x2={xMax}
                  y1={2.0}
                  y2={yMax}
                  fill="#fee2e2"
                  fillOpacity={0.45}
                />

                {/* Custom Tooltip */}
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      if (data.isPatient) {
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 font-sans text-right dir-rtl">
                            <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-1">
                              <span className="font-bold text-teal-300">
                                موقعیت بیمار ({data.drugName})
                              </span>
                              <span
                                className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                                  data.isHysLaw
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-teal-500 text-white'
                                }`}
                              >
                                {data.isHysLaw ? 'Hy\'s Law: MET' : 'Hy\'s Law: Not Met'}
                              </span>
                            </div>
                            <div className="font-mono text-[11px] text-slate-300 space-y-0.5">
                              <div>ALT: {data.altVal} U/L ({data.x}× ULN)</div>
                              <div>Bilirubin: {data.biliVal} mg/dL ({data.y}× ULN)</div>
                              <div>ALP: {data.alpVal} U/L ({data.z}× ULN)</div>
                              <div>شاخص R: {data.rValue} ({data.pattern})</div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div className="bg-white text-slate-800 p-2.5 rounded-lg shadow-lg border border-slate-200 text-xs text-right dir-rtl">
                          <span className="font-bold text-slate-700 block">{data.label}</span>
                          <span className="font-mono text-slate-500 text-[11px]">
                            ALT: {data.x}× | Bili: {data.y}× | ALP: {data.z}×
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Benchmark Reference Points */}
                <Scatter
                  name="موقعیت‌های مرجع"
                  data={referencePoints}
                  fill="#94a3b8"
                  opacity={0.65}
                >
                  {referencePoints.map((entry, index) => (
                    <Cell
                      key={`ref-${index}`}
                      fill={
                        entry.category === 'hys_law'
                          ? '#f43f5e'
                          : entry.category === 'temple'
                          ? '#f59e0b'
                          : entry.category === 'cholestatic'
                          ? '#06b6d4'
                          : '#10b981'
                      }
                      opacity={0.5}
                    />
                  ))}
                </Scatter>

                {/* Patient's Actual Point (Rendered larger, highlighted) */}
                <Scatter
                  name="بیمار فعلی"
                  data={patientDataPoint}
                  fill={
                    inHysLawQuadrant
                      ? '#e11d48'
                      : inTempleQuadrant
                      ? '#d97706'
                      : inCholestaticQuadrant
                      ? '#0284c7'
                      : '#059669'
                  }
                >
                  <Cell
                    stroke="#ffffff"
                    strokeWidth={3}
                    fill={
                      inHysLawQuadrant
                        ? '#e11d48'
                        : inTempleQuadrant
                        ? '#d97706'
                        : inCholestaticQuadrant
                        ? '#0284c7'
                        : '#059669'
                    }
                  />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Quadrant Legend & Educational Guide */}
          <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
            <div className="p-2 rounded-lg bg-rose-50 border border-rose-200/80">
              <span className="font-bold text-rose-900 block">چارک ۱: Hy's Law Zone</span>
              <span className="text-rose-700 font-mono">ALT ≥ 3× & Bili ≥ 2×</span>
              <span className="text-slate-500 block mt-0.5">هشدار پیش‌آگهی شدید مورتالیتی ۱۰٪</span>
            </div>

            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200/80">
              <span className="font-bold text-amber-900 block">چارک ۲: Temple's Corollary</span>
              <span className="text-amber-700 font-mono">ALT ≥ 3× & Bili &lt; 2×</span>
              <span className="text-slate-500 block mt-0.5">نکروز هپاتوسلولار بدون نارسایی دفع</span>
            </div>

            <div className="p-2 rounded-lg bg-cyan-50 border border-cyan-200/80">
              <span className="font-bold text-cyan-900 block">چارک ۳: Cholestatic / Jaundice</span>
              <span className="text-cyan-700 font-mono">ALT &lt; 3× & Bili ≥ 2×</span>
              <span className="text-slate-500 block mt-0.5">انسداد صفراوی، کلستاز یا ژیلبرت</span>
            </div>

            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200/80">
              <span className="font-bold text-emerald-900 block">چارک ۴: Normal / Mild</span>
              <span className="text-emerald-700 font-mono">ALT &lt; 3× & Bili &lt; 2×</span>
              <span className="text-slate-500 block mt-0.5">محدوده ایمن و فاقد سمیت بارز</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Synthesis & Action Plan */}
      <div className="space-y-4">
        {/* Qualitative Clinical Synthesis */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm leading-relaxed text-slate-800">
          <div className="font-bold text-slate-900 flex items-center gap-2 mb-1.5 text-xs">
            <HeartPulse className="w-4 h-4 text-rose-600" />
            <span>جمع‌بندی وضعیت ارگان و ایمنی بیمار:</span>
          </div>
          <p className="text-slate-700">{clinicalInterpretation.summaryFa}</p>
          <div className="mt-2 text-xs font-bold text-teal-800 bg-teal-50/70 p-2 rounded-lg border border-teal-200/60">
            {clinicalInterpretation.severitySpectrumFa}
          </div>
        </div>

        {/* 2-Column layout: Immediate Actions & Monitoring vs Differential Warnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Actions & Monitoring */}
          <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>اقدامات بالینی و دارویی توصیه‌شده:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {clinicalInterpretation.recommendedActionsFa.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-200 text-xs">
              <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>پروتکل پایش آزمایشگاهی:</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {clinicalInterpretation.monitoringGuidanceFa}
              </p>
            </div>
          </div>

          {/* Differential Diagnosis Warnings */}
          <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <ListFilter className="w-4 h-4 text-indigo-600" />
              <span>تشخیص‌های افتراقی نیازمند رد قطعی:</span>
            </h4>
            <p className="text-[11px] text-slate-500">
              انتساب قطعی آسیب به داروی {drug.standardName} منوط به بررسی منفی موارد زیر در این مرحله است:
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              {clinicalInterpretation.differentialWarningsFa.map((diff, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                  <span>{diff}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
              بر اساس چارچوب تشخیصی DILIN (شبکه آسیب کبدی دارویی ایالات متحده)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
