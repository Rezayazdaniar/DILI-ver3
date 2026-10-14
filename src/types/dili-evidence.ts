/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LiverToxCategory = 'A' | 'B' | 'C' | 'D' | 'E' | 'E*' | 'X';
export type InternalLikelihoodCode = 'VERY_HIGH' | 'HIGH' | 'MODERATE' | 'LOW' | 'LIMITED';

export type EvidenceLevel = 'DRUG_LEVEL' | 'CLASS_LEVEL';

export interface EvidenceDocument {
  id: string;
  source: 'LiverTox' | 'DailyMed' | 'FDA' | 'PubMed' | 'PubChem';
  sourceId: string;
  title: string;
  drugOrClass: string;
  evidenceLevel: EvidenceLevel;
  publicationDate?: string;
  retrievalVersion?: string;
  excerptFa: string;
  excerptEn: string;
  url?: string;
}

export interface ClinicalCaseReport {
  caseId: string;
  drugName: string;
  age: number;
  gender: 'M' | 'F';
  latencyDays: number;
  pattern: 'Hepatocellular' | 'Cholestatic' | 'Mixed';
  outcome: 'Recovered' | 'Fatal' | 'Transplant' | 'Chronic';
  summaryFa: string;
  sourceReference: string;
}

export interface DrugCatalogEntry {
  id: string;
  standardName: string;
  persianName: string;
  brandNames: string[];
  drugClassId: string;
  drugClassName: string;
  persianDrugClassName: string;
  pubchemCid?: string;
  livertoxCategory: LiverToxCategory;
  internalCode: InternalLikelihoodCode;
  evidenceLevel: EvidenceLevel;
  typicalPattern: 'Hepatocellular' | 'Cholestatic' | 'Mixed' | 'Variable';
  typicalLatency: string;
  mechanismFa: string;
  clinicalPearlsFa: string;
  hasSpecificCases: boolean;
  documents: EvidenceDocument[];
  reportedCases?: ClinicalCaseReport[];
}
