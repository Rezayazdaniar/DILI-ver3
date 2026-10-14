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
  Compass,
  Database,
  Dna,
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
import { LandingPage } from './components/LandingPage';
import { InputPanel } from './components/InputPanel';
import { DrugExplorer } from './components/DrugExplorer';
import { CoreAssessmentGrid } from './components/CoreAssessmentGrid';
import { ClinicalInterpretationCard } from './components/ClinicalInterpretationCard';
import { CausalityRucamCard } from './components/CausalityRucamCard';
import { EvidenceExplanationCard } from './components/EvidenceExplanationCard';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { SystemStatusModal } from './components/SystemStatusModal';
import { LocalLlmModal } from './components/LocalLlmModal';
import { DRUG_CATALOG } from './data/drugCatalog';
import { LabValues, PatientClinicalContext } from './types/clinical';
import { DiliAssessmentResponse } from './types/dili-explanation';
import { DrugCatalogEntry } from './types/dili-evidence';
import { getStoredLlmConfig, LocalLlmConfig } from './types/llm-config';
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
  const [activeTab, setActiveTab] = useState<'landing' | 'explorer' | 'assessment' | 'graph' | 'evidence'>('landing');
  const [isSystemModalOpen, setIsSystemModalOpen] = useState(false);
  const [isLocalLlmModalOpen, setIsLocalLlmModalOpen] = useState(false);
  const [isLocalLlmActive, setIsLocalLlmActive] = useState<boolean>(() => {
    return getStoredLlmConfig().isEnabled;
  });

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

  // Handler for selecting a drug from the LiverTox Drug Explorer and loading it into the assessment engine
  const handleSelectAndAssessDrug = (drug: DrugCatalogEntry) => {
    setSelectedDrug(drug);

    // Adjust default labs according to drug's typical presentation if transitioning from explorer
    let newLabs: LabValues = { ...labs };
    let newCtx: PatientClinicalContext = { ...context, drugName: drug.standardName };

    if (drug.id === 'amoxicillin_clavulanate') {
      newLabs = {
        alt: 180,
        ast: 110,
        totalBilirubin: 3.2,
        alp: 320,
        ulnAlt: 40,
        ulnAst: 40,
        ulnBilirubin: 1.2,
        ulnAlp: 100,
      };
      newCtx = {
        ...newCtx,
        treatmentDurationDays: 14,
        daysSinceDrugDiscontinuation: 18,
        patientAge: 62,
        patientGender: 'M',
      };
    } else if (drug.id === 'acetaminophen') {
      newLabs = {
        alt: 4200,
        ast: 4800,
        totalBilirubin: 3.8,
        alp: 110,
        ulnAlt: 40,
        ulnAst: 40,
        ulnBilirubin: 1.2,
        ulnAlp: 100,
      };
      newCtx = {
        ...newCtx,
        treatmentDurationDays: 2,
        daysSinceDrugDiscontinuation: 1,
        patientAge: 28,
        patientGender: 'F',
      };
    } else if (drug.id === 'furosemide') {
      newLabs = {
        alt: 65,
        ast: 55,
        totalBilirubin: 0.9,
        alp: 85,
        ulnAlt: 40,
        ulnAst: 40,
        ulnBilirubin: 1.2,
        ulnAlp: 100,
      };
      newCtx = {
        ...newCtx,
        treatmentDurationDays: 120,
        daysSinceDrugDiscontinuation: 0,
        patientAge: 68,
        patientGender: 'M',
      };
    } else if (drug.id === 'atorvastatin') {
      newLabs = {
        alt: 140,
        ast: 110,
        totalBilirubin: 1.1,
        alp: 75,
        ulnAlt: 40,
        ulnAst: 40,
        ulnBilirubin: 1.2,
        ulnAlp: 100,
      };
      newCtx = {
        ...newCtx,
        treatmentDurationDays: 90,
        daysSinceDrugDiscontinuation: 0,
        patientAge: 56,
        patientGender: 'M',
      };
    }

    setLabs(newLabs);
    setContext(newCtx);
    triggerAssessment(drug, newLabs, newCtx);

    // Switch to assessment tab!
    setActiveTab('assessment');
  };

  const handleLlmConfigSaved = (config: LocalLlmConfig) => {
    setIsLocalLlmActive(config.isEnabled);
    // Re-generate explanation with new LLM config
    if (assessment) {
      triggerAssessment();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-600 selection:text-white">
      {/* Top Header with High-Fidelity Menus */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSystemModal={() => setIsSystemModalOpen(true)}
        onOpenLocalLlmModal={() => setIsLocalLlmModalOpen(true)}
        onPrintReport={handlePrint}
        activeDrugName={selectedDrug?.standardName}
        activeDrugCategory={selectedDrug?.livertoxCategory}
        isLocalLlmActive={isLocalLlmActive}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Tab 0: Tailored Landing Page */}
        {activeTab === 'landing' && (
          <LandingPage
            onStartExplorer={() => setActiveTab('explorer')}
            onStartAssessment={() => setActiveTab('assessment')}
            onOpenLocalLlmModal={() => setIsLocalLlmModalOpen(true)}
            isLocalLlmActive={isLocalLlmActive}
          />
        )}

        {/* Tab 1: LiverTox Drug Explorer */}
        {activeTab === 'explorer' && (
          <DrugExplorer
            onSelectAndAssessDrug={handleSelectAndAssessDrug}
            selectedDrugId={selectedDrug?.id}
          />
        )}

        {/* Tab 2: Core Clinical Assessment Engine */}
        {activeTab === 'assessment' && assessment && (
          <div className="space-y-6">
            {/* Input Panel */}
            <InputPanel
              selectedDrug={selectedDrug}
              onDrugChange={(d) => setSelectedDrug(d)}
              labs={labs}
              onLabsChange={setLabs}
              context={context}
              onContextChange={setContext}
              onTriggerAssessment={triggerAssessment}
            />

            {/* Core Assessment Grid: 3 Fundamental cards */}
            <CoreAssessmentGrid assessment={assessment} />

            {/* Clinical Interpretation: Meaning, actions, and Hy's Law Scatter Plot */}
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

        {/* Tab 3: Knowledge Graph */}
        {activeTab === 'graph' && assessment && (
          <div className="space-y-6">
            <KnowledgeGraphView
              graph={assessment.knowledgeGraph}
              drug={assessment.drug}
            />

            {/* Explanatory banner for Graph principles in the report */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-2 shadow-xs">
              <h4 className="font-bold text-cyan-800 flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-600" />
                <span>اصول معماری گراف دانش در سامانه هوش‌دارو (بخش ۸.۲ گزارش):</span>
              </h4>
              <p className="leading-relaxed text-slate-600">
                گراف دانش روابط معنایی میان داروها، نام‌های تجاری مترادف (مانند Lasix به Furosemide)،
                کالس دارویی و شواهد منتشرشده را برقرار می‌سازد. مهم‌ترین اصل کنترل کیفیت داده، تفکیک
                شواهد اختصاصی خود دارو (Drug-level) از شواهد عمومی گروه دارویی (Class-level) است؛ بنابراین
                سامانه هیچ‌گاه هشدارهای کلی یک دسته دارویی را به عنوان گزارش موردی کاذب برای دارویی با
                سمیت پایین ثبت نمی‌کند.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Evidence & AI Dossier */}
        {activeTab === 'evidence' && assessment && (
          <div className="space-y-6">
            <EvidenceExplanationCard
              assessment={assessment}
              onUpdateAssessment={setAssessment}
            />
          </div>
        )}
      </main>

      {/* System & Services Modal */}
      <SystemStatusModal
        isOpen={isSystemModalOpen}
        onClose={() => setIsSystemModalOpen(false)}
      />

      {/* Local Qwen 8B Configuration Modal */}
      <LocalLlmModal
        isOpen={isLocalLlmModalOpen}
        onClose={() => setIsLocalLlmModalOpen(false)}
        onConfigSaved={handleLlmConfigSaved}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">مجموعه Pharma.AI • سامانه هوش‌دارو</span>
            <span>•</span>
            <span className="font-mono text-teal-800 font-semibold">inClinico :: DILI Navigator</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
            <span>پایگاه مرجع: LiverTox NBK547852</span>
            <span>•</span>
            <span>الگوریتم علیت: CIOMS / RUCAM</span>
            <span>•</span>
            <span>پشتیبانی از مدل محلی Qwen 8B</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
