/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LabValues {
  alt: number; // U/L
  ast: number; // U/L
  alp: number; // U/L
  totalBilirubin: number; // mg/dL
  ulnAlt: number; // default 40 U/L
  ulnAst: number; // default 40 U/L
  ulnAlp: number; // default 100 U/L
  ulnBilirubin: number; // default 1.2 mg/dL
}

export type InjuryPatternType = 'Hepatocellular' | 'Cholestatic' | 'Mixed';

export interface RRatioResult {
  rValue: number;
  pattern: InjuryPatternType;
  patternFa: string;
  altMultipleOfUln: number;
  alpMultipleOfUln: number;
  interpretationFa: string;
}

export interface HysLawCriterion {
  id: string;
  nameFa: string;
  requiredCondition: string;
  currentValueDescription: string;
  isMet: boolean;
  notesFa: string;
}

export interface HysLawResult {
  isMet: boolean;
  statusTextFa: string;
  criteria: HysLawCriterion[];
  criticalAlertFa: string;
  clinicalSignificanceFa: string;
}

export type ClinicalConcernLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';

export interface RucamItemScore {
  domainId: string;
  titleFa: string;
  points: number;
  userInputOrSource: string;
  rationaleFa: string;
  isMissingData: boolean;
}

export type RucamInterpretation =
  | 'Highly Probable'
  | 'Probable'
  | 'Possible'
  | 'Unlikely'
  | 'Excluded';

export interface RucamResult {
  totalScore: number;
  interpretation: RucamInterpretation;
  interpretationFa: string;
  colorClass: string;
  items: RucamItemScore[];
  dataCompletenessPercent: number;
  missingFieldsNotesFa: string[];
}

export interface PatientClinicalContext {
  drugName: string;
  treatmentDurationDays: number;
  daysSinceDrugDiscontinuation?: number;
  patientAge: number;
  patientGender: 'M' | 'F';
  isPregnant: boolean;
  alcoholHistory: 'none_or_light' | 'moderate' | 'excessive';
  concomitantMedications: string[];
  viralHepatitisNegative: boolean;
  biliaryObstructionRuledOut: boolean;
  hemodynamicInstabilityRuledOut: boolean;
  alcoholEtiologyRuledOut: boolean;
  rechallengeAttempted: boolean;
  rechallengePositive?: boolean;
}
