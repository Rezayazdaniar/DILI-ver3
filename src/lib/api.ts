/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DRUG_CATALOG, resolveDrugByName } from '../data/drugCatalog';
import {
  calculateRRatio,
  calculateRucamScore,
  determineClinicalConcern,
  evaluateHysLaw,
  generateClinicalInterpretation,
} from './clinical-engine';
import { buildDrugKnowledgeGraph } from './knowledge-graph';
import { LabValues, PatientClinicalContext } from '../types/clinical';
import { DiliAssessmentResponse, DrugKnowledgeGraph } from '../types/dili-explanation';
import { DrugCatalogEntry, EvidenceDocument } from '../types/dili-evidence';

export interface AssessRequest {
  drugQuery: string;
  labs: LabValues;
  patientContext: PatientClinicalContext;
}

/**
 * Standard API Service simulating the FastAPI endpoints specified in Section 7 of the report:
 * - GET /health
 * - GET /api/v1/dili/search
 * - POST /api/v1/dili/assess
 * - GET /drugs
 * - GET /evidence/retrieve
 * - GET /evidence/context
 * - GET /api/v1/kg/drugs/{drug_name}/graph
 */
export const diliApi = {
  // GET /health
  async getHealth(): Promise<{ status: string; version: string; database: string; timestamp: string }> {
    return {
      status: 'healthy',
      version: 'DILI-Navigator-v1.4-MVP',
      database: 'PostgreSQL-Mock + Qdrant-BGE-M3 (Staging NBK547852)',
      timestamp: new Date().toISOString(),
    };
  },

  // GET /drugs
  async getAllDrugs(): Promise<DrugCatalogEntry[]> {
    return DRUG_CATALOG;
  },

  // GET /api/v1/dili/search?q=...
  async searchDrugs(query: string): Promise<{
    results: DrugCatalogEntry[];
    resolvedFrom?: string;
    isSynonym?: boolean;
  }> {
    if (!query.trim()) return { results: DRUG_CATALOG.slice(0, 8) };

    const { matchedDrug, resolvedFromName, isSynonym } = resolveDrugByName(query);
    if (matchedDrug) {
      return {
        results: [matchedDrug],
        resolvedFrom: resolvedFromName,
        isSynonym,
      };
    }

    const q = query.toLowerCase();
    const filtered = DRUG_CATALOG.filter(
      (d) =>
        d.standardName.toLowerCase().includes(q) ||
        d.persianName.includes(q) ||
        d.drugClassName.toLowerCase().includes(q) ||
        d.brandNames.some((b) => b.toLowerCase().includes(q))
    );

    return { results: filtered };
  },

  // POST /api/v1/dili/assess
  async assessDili(request: AssessRequest): Promise<DiliAssessmentResponse> {
    const { matchedDrug, resolvedFromName } = resolveDrugByName(request.drugQuery);
    const drug = matchedDrug || DRUG_CATALOG[0]; // fallback to Isoniazid if empty

    const rRatioResult = calculateRRatio(request.labs);
    const hysLawResult = evaluateHysLaw(request.labs, request.patientContext);
    const rucamResult = calculateRucamScore(drug, request.labs, request.patientContext, rRatioResult);
    const concernResult = determineClinicalConcern(request.labs, hysLawResult, rRatioResult);
    const clinicalInterpretation = generateClinicalInterpretation(
      drug,
      request.labs,
      rRatioResult,
      hysLawResult,
      rucamResult,
      concernResult.level
    );

    const knowledgeGraph = buildDrugKnowledgeGraph(drug);

    const assessmentResponse: DiliAssessmentResponse = {
      timestamp: new Date().toISOString(),
      drug,
      resolvedFromName: resolvedFromName || drug.standardName,
      patientContext: request.patientContext,
      labValues: request.labs,
      coreAssessment: {
        drugRelatedRisk: {
          category: drug.livertoxCategory,
          internalCode: drug.internalCode,
          titleFa: `درجه شواهد آسیب در LiverTox: رده ${drug.livertoxCategory} (${drug.internalCode})`,
          descriptionFa:
            drug.evidenceLevel === 'CLASS_LEVEL'
              ? `توجه: شواهد آسیب برای این دارو در سطح «گروه دارویی (${drug.persianDrugClassName})» ارزیابی شده است و نباید به عنوان گزارش اختصاصی داروی ${drug.standardName} تلقی شود.`
              : `ارزیابی منبع‌محور در تک‌نگاشت اختصاصی داروی ${drug.standardName} در کتابخانه ملی پزشکی آمریکا (NLM).`,
          evidenceLevel: drug.evidenceLevel,
          sourceCitation: `LiverTox NBK547852 / PubChem CID: ${drug.pubchemCid || 'N/A'}`,
        },
        liverInjuryPattern: rRatioResult,
        hysLaw: hysLawResult,
        causality: rucamResult,
        clinicalConcern: concernResult,
      },
      clinicalInterpretation,
      evidence: {
        retrievedDocuments: drug.documents,
        caseReports: drug.reportedCases || [],
        citationNoteFa:
          'تمام استنادات به تک‌نگاشت‌های رسمی LiverTox، برچسب‌های تاییدشده DailyMed و راهنمای ارزیابی پیش از بازاریابی FDA متصل هستند.',
      },
      knowledgeGraph,
    };

    return assessmentResponse;
  },

  // GET /evidence/retrieve
  async retrieveEvidence(drugName: string): Promise<EvidenceDocument[]> {
    const { matchedDrug } = resolveDrugByName(drugName);
    return matchedDrug ? matchedDrug.documents : [];
  },

  // GET /api/v1/kg/drugs/{drug_name}/graph
  async getDrugKnowledgeGraph(drugName: string): Promise<DrugKnowledgeGraph> {
    const { matchedDrug } = resolveDrugByName(drugName);
    return buildDrugKnowledgeGraph(matchedDrug || DRUG_CATALOG[0]);
  },
};
