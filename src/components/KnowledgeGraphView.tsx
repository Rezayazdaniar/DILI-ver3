/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  ExternalLink,
  FileText,
  Info,
  Layers,
  Network,
  Pill,
  Share2,
  Users,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { DrugKnowledgeGraph, GraphLink, GraphNode } from '../types/dili-explanation';
import { DrugCatalogEntry } from '../types/dili-evidence';

interface KnowledgeGraphViewProps {
  graph: DrugKnowledgeGraph;
  drug: DrugCatalogEntry;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({ graph, drug }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(graph.nodes[0] || null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Position nodes radially or linearly for a clean, deterministic, interactive layout
  const width = 800;
  const height = 480;
  const centerX = width / 2;
  const centerY = height / 2;

  // Assign coordinate positions based on node types
  const nodePositions = React.useMemo(() => {
    const posMap: Record<string, { x: number; y: number }> = {};

    // Center the main Drug node
    const drugNode = graph.nodes.find((n) => n.type === 'drug');
    if (drugNode) {
      posMap[drugNode.id] = { x: centerX, y: centerY };
    }

    // Drug class node: top
    const classNode = graph.nodes.find((n) => n.type === 'drug_class');
    if (classNode) {
      posMap[classNode.id] = { x: centerX, y: centerY - 150 };
    }

    // Synonyms: left side
    const synonyms = graph.nodes.filter((n) => n.type === 'synonym');
    synonyms.forEach((node, idx) => {
      const offset = (idx - (synonyms.length - 1) / 2) * 80;
      posMap[node.id] = { x: centerX - 240, y: centerY + offset };
    });

    // Evidence documents: right side
    const docs = graph.nodes.filter((n) => n.type === 'evidence_document');
    docs.forEach((node, idx) => {
      const offset = (idx - (docs.length - 1) / 2) * 90;
      const isClassDoc = graph.links.some(
        (l) => l.target === node.id && l.source.startsWith('class-')
      );
      posMap[node.id] = {
        x: centerX + 240,
        y: isClassDoc ? centerY - 130 + offset : centerY + offset,
      };
    });

    // Clinical cases: bottom
    const cases = graph.nodes.filter((n) => n.type === 'clinical_case');
    cases.forEach((node, idx) => {
      const offset = (idx - (cases.length - 1) / 2) * 110;
      posMap[node.id] = { x: centerX + offset, y: centerY + 160 };
    });

    return posMap;
  }, [graph, centerX, centerY]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                کاوشگر گراف دانش دارویی (Drug Knowledge Graph)
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-mono">
                Graph Schema v1.2
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              نمایش روابط معنایی، نگاشت به گروه دارویی و تمایز شواهد سطح دارو از شواهد سطح کالس
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
            <span>دارو</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 inline-block" />
            <span>گروه دارویی</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
            <span>نام تجاری</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            <span>سند شواهد</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
            <span>مورد بالینی</span>
          </span>
        </div>
      </div>

      {/* Graph Visual Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* SVG Canvas */}
        <div className="lg:col-span-3 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden h-[450px] flex items-center justify-center">
          {/* Zoom Controls */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-sm p-1 rounded-lg border border-slate-700/80 z-20">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.6))}
              className="p-1 hover:bg-slate-800 rounded text-slate-300 cursor-pointer"
              title="بزرگ‌نمایی"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono px-1 text-slate-400">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.7))}
              className="p-1 hover:bg-slate-800 rounded text-slate-300 cursor-pointer"
              title="کوچک‌نمایی"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="18"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
              </marker>
              <marker
                id="arrowhead-class"
                markerWidth="8"
                markerHeight="6"
                refX="18"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#eab308" />
              </marker>
            </defs>

            {/* Links */}
            {graph.links.map((link, idx) => {
              const srcPos = nodePositions[link.source];
              const tgtPos = nodePositions[link.target];
              if (!srcPos || !tgtPos) return null;

              const isClassLevel = link.isClassLevel;

              return (
                <g key={`link-${idx}`} className="group">
                  <line
                    x1={srcPos.x}
                    y1={srcPos.y}
                    x2={tgtPos.x}
                    y2={tgtPos.y}
                    stroke={isClassLevel ? '#eab308' : '#475569'}
                    strokeWidth={isClassLevel ? 2 : 1.5}
                    strokeDasharray={isClassLevel ? '4 3' : undefined}
                    markerEnd={isClassLevel ? 'url(#arrowhead-class)' : 'url(#arrowhead)'}
                    className="transition-colors group-hover:stroke-teal-400"
                  />
                  {/* Link Label */}
                  <text
                    x={(srcPos.x + tgtPos.x) / 2}
                    y={(srcPos.y + tgtPos.y) / 2 - 6}
                    fill={isClassLevel ? '#facc15' : '#94a3b8'}
                    fontSize="9"
                    fontFamily="Vazirmatn"
                    textAnchor="middle"
                    className="select-none pointer-events-none font-medium"
                  >
                    {link.labelFa}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {graph.nodes.map((node) => {
              const pos = nodePositions[node.id];
              if (!pos) return null;

              const isSelected = selectedNode?.id === node.id;
              const isMainDrug = node.type === 'drug';

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer group"
                >
                  {/* Halo pulse when selected */}
                  {isSelected && (
                    <circle
                      r={isMainDrug ? 32 : 24}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="3"
                      strokeDasharray="4 2"
                      className="animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                  )}

                  <circle
                    r={isMainDrug ? 26 : 18}
                    fill="#090d16"
                    stroke={node.color || '#38bdf8'}
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-all group-hover:scale-110 shadow-lg"
                  />

                  {/* Icon or Symbol */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={node.color || '#fff'}
                    fontSize={isMainDrug ? '12' : '9'}
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                    className="pointer-events-none select-none"
                  >
                    {node.type === 'drug'
                      ? 'Rx'
                      : node.type === 'drug_class'
                      ? 'CLS'
                      : node.type === 'synonym'
                      ? 'SYN'
                      : node.type === 'evidence_document'
                      ? 'DOC'
                      : 'CASE'}
                  </text>

                  {/* Label below node */}
                  <text
                    y={isMainDrug ? 36 : 28}
                    textAnchor="middle"
                    fill="#f1f5f9"
                    fontSize="11"
                    fontFamily="Vazirmatn"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    className="pointer-events-none select-none shadow-sm"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Inspector Drawer */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>مشخصات گره انتخاب‌شده</span>
              </span>
              {selectedNode && (
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase"
                  style={{
                    backgroundColor: `${selectedNode.color}22`,
                    color: selectedNode.color,
                    borderColor: `${selectedNode.color}55`,
                    borderWidth: '1px',
                  }}
                >
                  {selectedNode.type}
                </span>
              )}
            </div>

            {selectedNode ? (
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">عنوان:</span>
                  <div className="font-bold text-sm text-white mt-0.5">{selectedNode.label}</div>
                </div>

                {selectedNode.type === 'drug' && (
                  <div className="space-y-1.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="flex justify-between">
                      <span className="text-slate-400">نام فارسی:</span>
                      <span className="text-slate-200">{drug.persianName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">رده LiverTox:</span>
                      <span className="font-mono text-rose-300 font-bold">
                        {drug.livertoxCategory} ({drug.internalCode})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">شناسه PubChem:</span>
                      <span className="font-mono text-cyan-300">{drug.pubchemCid || 'ندارد'}</span>
                    </div>
                  </div>
                )}

                {selectedNode.type === 'drug_class' && (
                  <div className="space-y-1.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-slate-400 block text-[11px]">نام فارسی گروه:</span>
                    <span className="text-slate-200 font-medium">
                      {selectedNode.details?.classNameFa}
                    </span>
                  </div>
                )}

                {selectedNode.type === 'evidence_document' && (
                  <div className="space-y-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="flex justify-between">
                      <span className="text-slate-400">مرجع:</span>
                      <span className="font-mono text-teal-300 font-semibold">
                        {selectedNode.details?.source}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      {selectedNode.details?.excerptFa}
                    </p>
                  </div>
                )}

                {selectedNode.type === 'clinical_case' && (
                  <div className="space-y-1.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="flex justify-between">
                      <span className="text-slate-400">سن و جنس:</span>
                      <span className="text-slate-200">
                        {selectedNode.details?.age} سال ({selectedNode.details?.gender})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">پیامد بالینی:</span>
                      <span className="text-rose-400 font-bold">{selectedNode.details?.outcome}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {selectedNode.details?.summaryFa}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">روی یکی از گره‌های گراف کلیک کنید.</p>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-500">
            سازگار با انطباق Neo4j / PostgreSQL Graph Schema
          </div>
        </div>
      </div>
    </div>
  );
};
