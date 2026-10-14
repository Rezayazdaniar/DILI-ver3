/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Activity,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Compass,
  Database,
  Dna,
  Download,
  ExternalLink,
  Layers,
  Network,
  Printer,
  Search,
  Server,
  Sparkles,
  Zap,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'explorer' | 'assessment' | 'graph' | 'evidence';
  onTabChange: (tab: 'explorer' | 'assessment' | 'graph' | 'evidence') => void;
  onOpenSystemModal: () => void;
  onPrintReport: () => void;
  activeDrugName?: string;
  activeDrugCategory?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenSystemModal,
  onPrintReport,
  activeDrugName,
  activeDrugCategory,
}) => {
  return (
    <header className="border-b border-slate-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs transition-colors">
      {/* Top Suite Bar */}
      <div className="border-b border-slate-100 bg-slate-50/90 px-4 sm:px-6 lg:px-8 py-1.5 text-[11px] text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <span className="font-mono tracking-tight font-black text-teal-800 text-xs">
              Pharma.AI
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-800 font-semibold">پلتفرم بیوانفورماتیک هوش‌دارو</span>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-teal-100/70 text-teal-900 font-extrabold border border-teal-300 text-[10px] flex items-center gap-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
              inClinico :: DILI Navigator
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 hover:text-slate-800 transition cursor-default">
              PandaOmics (اهداف دارویی)
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 hover:text-slate-800 transition cursor-default">
              Chemistry42 (طراحی ساختار مولکولی)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] sm:text-[11px]">
          <span className="hidden sm:inline">پایگاه داده: LiverTox NBK547852 (Staging)</span>
          <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-300 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Proxmox VM 100 Online
          </span>
        </div>
      </div>

      {/* Main Navigation & App Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
          {/* Logo & Product Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-700 via-teal-600 to-cyan-500 p-0.5 shadow-md shadow-teal-700/10 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Dna className="w-6 h-6 text-teal-700" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-2">
                  <span>هوش‌دارو</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-mono font-extrabold">
                    inClinico
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                سامانه پشتیبان تصمیم‌گیری بالینی آسیب کبدی داروها مبتنی بر شواهد ساخت‌یافته LiverTox
              </p>
            </div>
          </div>

          {/* Active Drug Indicator & Actions */}
          <div className="flex items-center gap-2.5">
            {activeDrugName && (
              <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                <span className="text-slate-500 font-medium">داروی فعال:</span>
                <span className="font-extrabold text-teal-800">{activeDrugName}</span>
                {activeDrugCategory && (
                  <span className="px-1.5 py-0.2 rounded bg-teal-100 text-teal-900 font-mono font-extrabold text-[10px] border border-teal-200">
                    رده {activeDrugCategory}
                  </span>
                )}
              </div>
            )}

            <button
              onClick={onOpenSystemModal}
              title="مشاهده وضعیت استقرار سرور و سرویس‌های systemd"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 border border-slate-200 transition cursor-pointer font-bold"
            >
              <Server className="w-3.5 h-3.5 text-teal-700" />
              <span className="hidden sm:inline">سرویس‌ها</span>
              <span className="text-[10px] font-mono bg-white px-1.5 py-0.2 rounded text-teal-800 border border-slate-200">
                v1.4
              </span>
            </button>

            <button
              onClick={onPrintReport}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-sm shadow-teal-700/20 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>چاپ / خروجی دوسیه</span>
            </button>
          </div>
        </div>

        {/* Sophisticated UI Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-slate-100 text-xs sm:text-sm">
          {/* Tab 1: Drug Explorer (Featured New Module) */}
          <button
            onClick={() => onTabChange('explorer')}
            className={`px-3.5 py-2 rounded-xl font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
              activeTab === 'explorer'
                ? 'bg-teal-700 text-white border-teal-700 shadow-sm shadow-teal-700/25 ring-2 ring-teal-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Compass className={`w-4 h-4 ${activeTab === 'explorer' ? 'text-white' : 'text-teal-700'}`} />
            <span>کاوشگر جامع داروهای LiverTox</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeTab === 'explorer'
                  ? 'bg-teal-800 text-teal-100'
                  : 'bg-teal-50 text-teal-800 border border-teal-200'
              }`}
            >
              تک‌نگاشت‌ها
            </span>
          </button>

          {/* Tab 2: Core Assessment */}
          <button
            onClick={() => onTabChange('assessment')}
            className={`px-3.5 py-2 rounded-xl font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
              activeTab === 'assessment'
                ? 'bg-teal-700 text-white border-teal-700 shadow-sm shadow-teal-700/25 ring-2 ring-teal-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Activity className={`w-4 h-4 ${activeTab === 'assessment' ? 'text-white' : 'text-cyan-700'}`} />
            <span>موتور ارزیابی بالینی DILI</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeTab === 'assessment'
                  ? 'bg-teal-800 text-teal-100'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              R-ratio · Hy's Law
            </span>
          </button>

          {/* Tab 3: Knowledge Graph */}
          <button
            onClick={() => onTabChange('graph')}
            className={`px-3.5 py-2 rounded-xl font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
              activeTab === 'graph'
                ? 'bg-teal-700 text-white border-teal-700 shadow-sm shadow-teal-700/25 ring-2 ring-teal-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Network className={`w-4 h-4 ${activeTab === 'graph' ? 'text-white' : 'text-indigo-600'}`} />
            <span>گراف دانش و کالس داروها</span>
          </button>

          {/* Tab 4: Evidence & AI Dossier */}
          <button
            onClick={() => onTabChange('evidence')}
            className={`px-3.5 py-2 rounded-xl font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
              activeTab === 'evidence'
                ? 'bg-teal-700 text-white border-teal-700 shadow-sm shadow-teal-700/25 ring-2 ring-teal-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${activeTab === 'evidence' ? 'text-white' : 'text-purple-600'}`} />
            <span>دوسیه شواهد و تحلیل مستند</span>
          </button>
        </div>
      </div>
    </header>
  );
};
