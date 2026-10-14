/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClinicalCaseReport, DrugCatalogEntry, EvidenceDocument } from './dili-evidence';
import {
  ClinicalConcernLevel,
  HysLawResult,
  LabValues,
  PatientClinicalContext,
  RRatioResult,
  RucamResult,
} from './clinical';

export interface GraphNode {
  id: string;
  label: string;
  type: 'drug' | 'synonym' | 'drug_class' | 'evidence_document' | 'clinical_case';
  color?: string;
  details?: Record<string, any>;
}

export interface GraphLink {
  source: string;
  target: string;
  relation:
    | 'RESOLVES_TO_CLASS'
    | 'HAS_EVIDENCE'
    | 'SYNONYM_OF'
    | 'HAS_CASE_REPORT'
    | 'ASSOCIATED_WITH_PATHWAY';
  labelFa: string;
  isClassLevel?: boolean;
}

export interface DrugKnowledgeGraph {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface DiliAssessmentResponse {
  timestamp: string;
  drug: DrugCatalogEntry;
  resolvedFromName: string;
  patientContext: PatientClinicalContext;
  labValues: LabValues;
  
  // The Three Fundamental Distinctions (Page 2 & Page 9)
  coreAssessment: {
    // 1. Drug-related Risk (خطر ذاتی دارو در منابع مرجع)
    drugRelatedRisk: {
      category: string;
      internalCode: string;
      titleFa: string;
      descriptionFa: string;
      evidenceLevel: 'DRUG_LEVEL' | 'CLASS_LEVEL';
      sourceCitation: string;
    };

    // 2. Biochemical Injury Pattern & R-ratio (الگوی آسیب بیوشیمیایی)
    liverInjuryPattern: RRatioResult;

    // 3. Hy's Law (معیار پیش‌آگهی شدید قانون های)
    hysLaw: HysLawResult;

    // 4. Causality Score in this Specific Patient (علّیت در مورد مشخص - RUCAM)
    causality: RucamResult;

    // 5. Clinical Concern Level (سطح نگرانی و فوریت بالینی)
    clinicalConcern: {
      level: ClinicalConcernLevel;
      badgeFa: string;
      colorClass: string;
      urgencyDescriptionFa: string;
    };
  };

  // Distinct Clinical Interpretation (Page 8 & 13: explains severity/actions without redundant raw repetition)
  clinicalInterpretation: {
    summaryFa: string;
    severitySpectrumFa: string;
    recommendedActionsFa: string[];
    monitoringGuidanceFa: string;
    differentialWarningsFa: string[];
  };

  // Evidence Documents and Case Evidence
  evidence: {
    retrievedDocuments: EvidenceDocument[];
    caseReports: ClinicalCaseReport[];
    citationNoteFa: string;
  };

  // Knowledge Graph Data
  knowledgeGraph: DrugKnowledgeGraph;

  // AI Evidence-Grounded Explanation
  explanation?: {
    narrativeFa: string;
    groundedSources: string[];
    generatedBy: 'LOCAL_QWEN_LLM' | 'GEMINI_SERVER' | 'DETERMINISTIC_SYNTHESIZER';
    confidence: 'HIGH' | 'MODERATE' | 'CAUTION';
  };
}
