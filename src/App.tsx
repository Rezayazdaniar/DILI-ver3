/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Activity,
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Database,
  Download,
  FileText,
  FlaskConical,
  HeartHandshake,
  Layers,
  Network,
  Printer,
  RotateCcw,
  Scale,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { CoreAssessmentGrid } from './components/CoreAssessmentGrid';
import { ClinicalInterpretationCard } from './components/ClinicalInterpretationCard';
import { CausalityRucamCard } from './components/CausalityRucamCard';
import { EvidenceExplanationCard } from './components/EvidenceExplanationCard';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { SystemStatusModal } from './components/SystemStatusModal';
import { DRUG_CATALOG } from './data/drugCatalog';
import { LabValues, PatientClinicalContext } from './types/clinical';
import { DiliAssessmentResponse } from './types/dili-explanation';
import { DrugCatalogEntry } from './types/dili-evidence';
import { diliApi } from './lib/api';
import { generateEvidenceGroundedExplanation } from './lib/dili-explanation-api';

// Initial Golden Test Case from Page 8 of the report: Isoniazid
const INITIAL_ISONIAZID_LABS: LabValues = {
  alt: 350,
  ast: 300,
  totalBilirubin: 4.5,
  alp: 90,
  ulnAlt: 40,
  ulnAst: 40,
  ulnBilirubin: 1.2,
  ulnAlp: 100,
};

const INITIAL_PATIENT_CONTEXT: PatientClinicalContext = {
  drugName: 'Isoniazid',
  treatmentDurationDays: 75,
  daysSinceDrugDiscontinuation: 5,
  patientAge: 52,
  patientGender: 'F',
  isPregnant: false,
  alcoholHistory: 'none_or_light',
  concomitantMedications: ['Pyridoxine (Vitamin B6)'],
  viralHepatitisNegative: true,
  biliaryObstructionRuledOut: true,
  hemodynamicInstabilityRuledOut: true,
  alcoholEtiologyRuledOut: true,
  rechallengeAttempted: false,
};

export default function App() {
  const [selectedDrug, setSelectedDrug] = useState<DrugCatalogEntry>(DRUG_CATALOG[0]); // Isoniazid
  const [labs, setLabs] = useState<LabValues>(INITIAL_ISONIAZID_LABS);
  const [context, setContext] = useState<PatientClinicalContext>(INITIAL_PATIENT_CONTEXT);
  const [assessment, setAssessment] = useState<DiliAssessmentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'assessment' | 'graph' | 'evidence' | 'architecture'>('assessment');
  const [isSystemModalOpen, setIsSystemModalOpen] = useState(false);
  const [activeScenarioName, setActiveScenarioName] = useState<string>('Isoniazid');

  // Run assessment on inputs change or drug change
  const triggerAssessment = async (
    targetDrug = selectedDrug,
    targetLabs = labs,
    targetContext = context
  ) => {
    setIsLoading(true);
    try {
      const res = await diliApi.assessDili({
        drugQuery: targetDrug.standardName,
        labs: targetLabs,
        patientContext: targetContext,
      });

      // Generate explanation
      const explanation = await generateEvidenceGroundedExplanation(res);
      res.explanation = explanation;

      setAssessment(res);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    triggerAssessment();
  }, [selectedDrug, labs, context]);

  // Load Golden Test Scenarios directly from the report
  const handleSelectGoldenScenario = (
    key: 'isoniazid' | 'amoxclav' | 'acetaminophen' | 'furosemide' | 'atorvastatin'
  ) => {
    if (key === 'isoniazid') {
      const drug = DRUG_CATALOG.find((d) => d.id === 'isoniazid') || DRUG_CATALOG[0];
      const newLabs: LabValues = {
        alt: 350,
        ast: 300,
        totalBilirubin: 4.5,
        alp: 90,
        ulnAlt: 40,
        ulnAst: 40,
        ulnBilirubin: 1.2,
        ulnAlp: 100,
      };
      const newCtx: PatientClinicalContext = {
        drugName: 'Isoniazid',
        treatmentDurationDays: 75,
        daysSinceDrugDiscontinuation: 5,
        patientAge: 52,
        patientGender: 'F',
        isPregnant: false,
        alcoholHistory: 'none_or_light',
        concomitantMedications: ['Pyridoxine'],
        viralHepatitisNegative: true,
        biliaryObstructionRuledOut: true,
        hemodynamicInstabilityRuledOut: true,
        alcoholEtiologyRuledOut: true,
        rechallengeAttempted: false,
      };
      setSelectedDrug(drug);
      setLabs(newLabs);
      setContext(newCtx);
      setActiveScenarioName('Isoniazid');
      triggerAssessment(drug, newLabs, newCtx);
    } else if (key === 'amoxclav') {
      const drug = DRUG_CATALOG.find((d) => d.id === 'amoxicillin_clavulanate') || DRUG_CATALOG[1];
      const newLabs: LabValues = {
        alt: 180,
        ast: 110,
        totalBilirubin: 3.2,
        alp: 320,
        ulnAlt: 40,
        ulnAst: 40,
        ulnBilirubin: 1.2,
        ulnAlp: 100,
      };
      const newCtx: PatientClinicalContext = {
        drugName: 'Amoxicillin-Clavulanate',
        treatmentDurationDays: 14,
        daysSinceDrugDiscontinuation: 18, // Notice: Delayed onset after stopping
        patientAge: 62,
        patientGender: 'M',
        isPregnant: false,
        alcoholHistory: 'none_or_light',
        concomitantMedications: [],
        viralHepatitisNegative: true,
        biliaryObstructionRuledOut: true,
        hemodynamicInstabilityRuledOut: true,
        alcoholEtiologyRuledOut: true,
        rechallengeAttempted: false,
      };
      setSelectedDrug(drug);
      setLabs(newLabs);
      setContext(newCtx);
      setActiveScenarioName('Amoxicillin-Clavulanate');
      triggerAssessment(drug, newLabs, newCtx);
    } else if (key === 'acetaminophen') {
      const drug = DRUG_CATALOG.find((d) => d.id === 'acetaminophen') || DRUG_CATALOG[2];
      const newLabs: LabValues = {
        alt: 4200,
        ast: 4800,
        totalBilirubin: 3.8,
        alp: 110,
        ulnAlt: 40,
        ulnAst: 40,
        ulnBilirubin: 1.2,
        ulnAlp: 100,
      };
      const newCtx: PatientClinicalContext = {
        drugName: 'Acetaminophen',
        treatmentDurationDays: 2,
        daysSinceDrugDiscontinuation: 1,
        patientAge: 28,
        patientGender: 'F',
        isPregnant: false,
        alcoholHistory: 'moderate',
        concomitantMedications: [],
        viralHepatitisNegative: true,
        biliaryObstructionRuledOut: true,
        hemodynamicInstabilityRuledOut: true,
        alcoholEtiologyRuledOut: true,
        rechallengeAttempted: false,
      };
      setSelectedDrug(drug);
      setLabs(newLabs);
      setContext(newCtx);
      setActiveScenarioName('Acetaminophen');
      triggerAssessment(drug, newLabs, newCtx);
    } else if (key === 'furosemide') {
      // Demonstrates Class-level evidence vs Drug-level evidence!
      const drug = DRUG_CATALOG.find((d) => d.id === 'furosemide') || DRUG_CATALOG[3];
      const newLabs: LabValues = {
        alt: 65,
        ast: 55,
        totalBilirubin: 0.9,
        alp: 85,
        ulnAlt: 40,
        ulnAst: 40,
        ulnBilirubin: 1.2,
        ulnAlp: 100,
      };
      const newCtx: PatientClinicalContext = {
        drugName: 'Furosemide',
        treatmentDurationDays: 120,
        daysSinceDrugDiscontinuation: 0,
        patientAge: 68,
        patientGender: 'M',
        isPregnant: false,
        alcoholHistory: 'none_or_light',
        concomitantMedications: ['Captopril', 'Aspirin'],
        viralHepatitisNegative: true,
        biliaryObstructionRuledOut: true,
        hemodynamicInstabilityRuledOut: true,
        alcoholEtiologyRuledOut: true,
        rechallengeAttempted: false,
      };
      setSelectedDrug(drug);
      setLabs(newLabs);
      setContext(newCtx);
      setActiveScenarioName('Furosemide');
      triggerAssessment(drug, newLabs, newCtx);
    } else if (key === 'atorvastatin') {
      const drug = DRUG_CATALOG.find((d) => d.id === 'atorvastatin') || DRUG_CATALOG[4];
      const newLabs: LabValues = {
        alt: 140,
        ast: 110,
        totalBilirubin: 1.1,
        alp: 75,
        ulnAlt: 40,
        ulnAst: 40,
        ulnBilirubin: 1.2,
        ulnAlp: 100,
      };
      const newCtx: PatientClinicalContext = {
        drugName: 'Atorvastatin',
        treatmentDurationDays: 90,
        daysSinceDrugDiscontinuation: 0,
        patientAge: 56,
        patientGender: 'M',
        isPregnant: false,
        alcoholHistory: 'none_or_light',
        concomitantMedications: ['Metformin'],
        viralHepatitisNegative: true,
        biliaryObstructionRuledOut: true,
        hemodynamicInstabilityRuledOut: true,
        alcoholEtiologyRuledOut: true,
        rechallengeAttempted: false,
      };
      setSelectedDrug(drug);
      setLabs(newLabs);
      setContext(newCtx);
      setActiveScenarioName('Atorvastatin');
      triggerAssessment(drug, newLabs, newCtx);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Header */}
      <Header
        onSelectGoldenScenario={handleSelectGoldenScenario}
        onOpenSystemModal={() => setIsSystemModalOpen(true)}
        onPrintReport={handlePrint}
        activeScenarioName={activeScenarioName}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('assessment')}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'assessment'
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>ارزیابی جامع بالینی (Core Assessment)</span>
            </button>

            <button
              onClick={() => setActiveTab('graph')}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'graph'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>گراف دانش و نگاشت کالس (Knowledge Graph)</span>
            </button>

            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'evidence'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>پایگاه شواهد LiverTox و FDA</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>معماری سامانه و ممیزی علمی</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
            <span>محیط استقرار: Proxmox VMID 100 • Ubuntu 26.04</span>
          </div>
        </div>

        {/* 1. Input Panel (Always visible at top for immediate adjustment) */}
        <InputPanel
          selectedDrug={selectedDrug}
          onDrugChange={(d) => {
            setSelectedDrug(d);
            setActiveScenarioName(d.standardName);
          }}
          labs={labs}
          onLabsChange={setLabs}
          context={context}
          onContextChange={setContext}
          onTriggerAssessment={triggerAssessment}
        />

        {/* 2. Tab Content */}
        {assessment && (
          <div>
            {activeTab === 'assessment' && (
              <div className="space-y-6">
                {/* Core Assessment Grid: 3 Fundamental cards */}
                <CoreAssessmentGrid assessment={assessment} />

                {/* Clinical Interpretation: Meaning and actions without repeating raw values */}
                <ClinicalInterpretationCard assessment={assessment} />

                {/* Causality Scoring (RUCAM): Itemized breakdown */}
                <CausalityRucamCard assessment={assessment} />

                {/* Evidence Explanation: Controlled LLM narrative + documents */}
                <EvidenceExplanationCard
                  assessment={assessment}
                  onUpdateAssessment={setAssessment}
                />
              </div>
            )}

            {activeTab === 'graph' && (
              <div className="space-y-6">
                <KnowledgeGraphView
                  graph={assessment.knowledgeGraph}
                  drug={assessment.drug}
                />

                {/* Explanatory banner for Graph principles in the report */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <h4 className="font-bold text-cyan-300 flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    <span>اصول معماری گراف دانش در سامانه هوش‌دارو (بخش ۸.۲ گزارش):</span>
                  </h4>
                  <p className="leading-relaxed text-slate-300">
                    گراف دانش روابط معنایی میان داروها، نام‌های تجاری مترادف (مانند Lasix به Furosemide)،
                    کالس دارویی و شواهد منتشرشده را برقرار می‌سازد. مهم‌ترین اصل کنترل کیفیت داده، تفکیک
                    شواهد اختصاصی خود دارو (Drug-level) از شواهد عمومی گروه دارویی (Class-level) است؛ بنابراین
                    سامانه هیچ‌گاه هشدارهای کلی یک دسته دارویی را به عنوان گزارش موردی کاذب برای دارویی با
                    سمیت پایین ثبت نمی‌کند.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'evidence' && (
              <div className="space-y-6">
                <EvidenceExplanationCard
                  assessment={assessment}
                  onUpdateAssessment={setAssessment}
                />
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      چارچوب معماری کلان و تمایزهای مفهومی بنیادین
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      مستندات مهندسی بازطراحی‌شده بر مبنای گزارش جامع ۱۴ اکتبر ۲۰۲۶
                    </p>
                  </div>
                </div>

                {/* 3 Core Conceptual Distinctions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-cyan-400 block font-mono">
                      ۱. Drug-related Risk
                    </span>
                    <h4 className="text-sm font-semibold text-slate-200">خطر مرتبط با دارو</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      میزان شناخته‌شدگی ارتباط یک دارو یا کالس دارویی با آسیب کبدی بر اساس شواهد موجود در
                      LiverTox (رده‌های A تا E). این یک ارزیابی منبع‌محور از پتانسیل کلی دارو است، نه احتمال عددی
                      در یک بیمار خاص.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-teal-400 block font-mono">
                      ۲. Causality in Case
                    </span>
                    <h4 className="text-sm font-semibold text-slate-200">علّیت در مورد مشخص</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      میزان حمایت شواهد از اینکه داروی موردنظر علت آسیب مشاهده‌شده در این بیمار مشخص است
                      (الگوریتم RUCAM). زمان‌بندی، سیر پس از قطع، عوامل خطر و رد علل جایگزین در آن نقش دارند.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-rose-400 block font-mono">
                      ۳. Clinical Concern
                    </span>
                    <h4 className="text-sm font-semibold text-slate-200">نگرانی بالینی</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      میزان اهمیت وضعیت فعلی از نظر شدت آسیب و معیارهای هشداردهنده (Hy's Law و ترانس‌آمینازها).
                      حتی اگر علیت دارو هنوز قطعی نشده باشد، افزایش شدید بیلی‌روبین و ALT نیازمند مداخله و نگرانی بالینی فوری است.
                    </p>
                  </div>
                </div>

                {/* Verification & 2-Week Plan Summary */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>برنامه تثبیت و معیارهای پذیرش MVP (بخش‌های ۱۶ و ۱۷):</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="font-bold text-teal-300 block mb-1">
                        روز ۱ تا ۵: تثبیت نسخه و ممیزی علمی موتور DILI
                      </span>
                      <span>
                        بازبینی دقیق محاسبات R-ratio، اعتبارسنجی مستقل معیارهای Hy's Law و آزمون مقادیر مرزی در سناریوهای طلایی.
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="font-bold text-teal-300 block mb-1">
                        روز ۶ تا ۱۱: تثبیت شواهد و بازطراحی تجربه کاربری
                      </span>
                      <span>
                        حذف تکرار غیرضروری اطلاعات بین Hy's Law و کارت تفسیر بالینی، نمایش شفاف شواهد سطح گروه دارویی و کنترل پرامپت LLM.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* System & Services Modal */}
      <SystemStatusModal
        isOpen={isSystemModalOpen}
        onClose={() => setIsSystemModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">سامانه هوش‌دارو (Pharmaceutical Intelligence)</span>
            <span>•</span>
            <span>ماژول DILI Navigator</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
            <span>پایگاه مرجع: LiverTox NBK547852</span>
            <span>•</span>
            <span>الگوریتم علیت: CIOMS / RUCAM</span>
            <span>•</span>
            <span>راهنمای FDA (2009)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
