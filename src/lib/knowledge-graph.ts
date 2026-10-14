/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DrugKnowledgeGraph, GraphLink, GraphNode } from '../types/dili-explanation';
import { DrugCatalogEntry } from '../types/dili-evidence';

export function buildDrugKnowledgeGraph(drug: DrugCatalogEntry): DrugKnowledgeGraph {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  // Root node: Drug
  nodes.push({
    id: `drug-${drug.id}`,
    label: drug.standardName,
    type: 'drug',
    color: '#06b6d4', // Cyan
    details: {
      standardName: drug.standardName,
      persianName: drug.persianName,
      pubchemCid: drug.pubchemCid,
      livertoxCategory: drug.livertoxCategory,
      internalLikelihood: drug.internalCode,
      evidenceLevel: drug.evidenceLevel,
    },
  });

  // Drug Class Node
  const classNodeId = `class-${drug.drugClassId}`;
  nodes.push({
    id: classNodeId,
    label: drug.drugClassName,
    type: 'drug_class',
    color: '#8b5cf6', // Violet
    details: {
      classNameFa: drug.persianDrugClassName,
      classNameEn: drug.drugClassName,
    },
  });

  links.push({
    source: `drug-${drug.id}`,
    target: classNodeId,
    relation: 'RESOLVES_TO_CLASS',
    labelFa: 'متعلق به کالس دارویی',
    isClassLevel: true,
  });

  // Synonyms / Brands
  drug.brandNames.slice(0, 3).forEach((brand, idx) => {
    const brandNodeId = `brand-${drug.id}-${idx}`;
    nodes.push({
      id: brandNodeId,
      label: brand,
      type: 'synonym',
      color: '#3b82f6', // Blue
      details: { brandName: brand },
    });

    links.push({
      source: brandNodeId,
      target: `drug-${drug.id}`,
      relation: 'SYNONYM_OF',
      labelFa: 'نام تجاری / مترادف',
    });
  });

  // Evidence Documents (Separating Drug-Level vs Class-Level)
  drug.documents.forEach((doc) => {
    const docNodeId = `doc-${doc.id}`;
    const isClassDoc = doc.evidenceLevel === 'CLASS_LEVEL';

    nodes.push({
      id: docNodeId,
      label: `${doc.source}: ${doc.sourceId}`,
      type: 'evidence_document',
      color: isClassDoc ? '#eab308' : '#10b981', // Amber for Class, Emerald for Specific
      details: {
        source: doc.source,
        title: doc.title,
        evidenceLevel: doc.evidenceLevel,
        date: doc.publicationDate,
        excerptFa: doc.excerptFa,
        url: doc.url,
      },
    });

    if (isClassDoc) {
      // Connect to Class Node! (Critical distinction in Section 8.2 & 11)
      links.push({
        source: classNodeId,
        target: docNodeId,
        relation: 'HAS_EVIDENCE',
        labelFa: 'شواهد سطح گروه دارویی (Class-level)',
        isClassLevel: true,
      });
    } else {
      // Connect directly to Drug Node
      links.push({
        source: `drug-${drug.id}`,
        target: docNodeId,
        relation: 'HAS_EVIDENCE',
        labelFa: 'شواهد اختصاصی دارو (Drug-level)',
        isClassLevel: false,
      });
    }
  });

  // Reported Cases (if any exist for this drug, e.g. Isoniazid has cases, Furosemide has 0)
  if (drug.reportedCases && drug.reportedCases.length > 0) {
    drug.reportedCases.forEach((c) => {
      const caseNodeId = `case-${c.caseId}`;
      nodes.push({
        id: caseNodeId,
        label: `مورد ${c.caseId}`,
        type: 'clinical_case',
        color: '#f43f5e', // Rose
        details: {
          caseId: c.caseId,
          age: c.age,
          gender: c.gender,
          outcome: c.outcome,
          summaryFa: c.summaryFa,
          source: c.sourceReference,
        },
      });

      links.push({
        source: `drug-${drug.id}`,
        target: caseNodeId,
        relation: 'HAS_CASE_REPORT',
        labelFa: 'مورد بالینی ثبت‌شده (Case Report)',
      });
    });
  }

  return { nodes, links };
}
