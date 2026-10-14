/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Database,
  Download,
  Info,
  Server,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  onSelectGoldenScenario: (scenarioKey: 'isoniazid' | 'amoxclav' | 'acetaminophen' | 'furosemide' | 'atorvastatin') => void;
  onOpenSystemModal: () => void;
  onPrintReport: () => void;
  activeScenarioName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectGoldenScenario,
  onOpenSystemModal,
  onPrintReport,
  activeScenarioName,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-600 via-cyan-600 to-indigo-600 p-0.5 shadow-lg shadow-teal-950/50 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Activity className="w-6 h-6 text-teal-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>هوش‌دارو</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 font-mono">
                    Pharmaceutical Intelligence
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="text-teal-400 font-semibold">ماژول اختصاصی: DILI Navigator</span>
                <span>•</span>
                <span>سامانه پشتیبان تصمیم‌گیری بالینی آسیب کبدی ناشی از داروها</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & System Info */}
          <div className="flex items-center gap-3">
            {/* System Status Pill */}
            <button
              onClick={onOpenSystemModal}
              title="مشاهده وضعیت استقرار و سرویس‌های systemd"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700/80 transition-all cursor-pointer group"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
              <Server className="w-3.5 h-3.5 text-slate-400" />
              <span>وضعیت سرویس‌ها</span>
              <span className="text-[10px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-teal-300">
                MVP v1.4
              </span>
            </button>

            {/* Print/Export Button */}
            <button
              onClick={onPrintReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition cursor-pointer"
              title="خروجی و چاپ پرونده ارزیابی بالینی"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">چاپ / خروجی گزارش</span>
            </button>
          </div>
        </div>

        {/* Golden Scenario Bar */}
        <div className="py-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs overflow-x-auto gap-3">
          <div className="flex items-center gap-2 text-slate-400 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-slate-300">سناریوهای مرجع و آزموده شده گزارش:</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectGoldenScenario('isoniazid')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer border ${
                activeScenarioName === 'Isoniazid'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700/60'
              }`}
              title="سناریوی ثبت‌شده در صفحه ۸ گزارش: ALT 350, R=9.72, Hy's Law True, RUCAM 9"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-400 ml-1.5"></span>
              سناریوی طلایی ایزونیازید (صفحه ۸)
            </button>

            <button
              onClick={() => onSelectGoldenScenario('amoxclav')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer border ${
                activeScenarioName === 'Amoxicillin-Clavulanate'
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-sm'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700/60'
              }`}
              title="آموکسی‌سیلین-کلاوولانات: شایع‌ترین علت DILI کلستاتیک با فاصله تأخیری"
            >
              کوآموکسی‌کلاو (کلستاتیک)
            </button>

            <button
              onClick={() => onSelectGoldenScenario('furosemide')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer border ${
                activeScenarioName === 'Furosemide'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700/60'
              }`}
              title="فوروزماید: نشان‌دهنده اصل تمایز شواهد گروه دیورتیک‌های لوپ از خود دارو (صفحه ۶ گزارش)"
            >
              فوروزماید (شواهد گروهی)
            </button>

            <button
              onClick={() => onSelectGoldenScenario('acetaminophen')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer border ${
                activeScenarioName === 'Acetaminophen'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700/60'
              }`}
              title="استامینوفن: سمّیت حاد دوزمحور با افزایش شدید ترانس‌آمینازها"
            >
              استامینوفن (بحرانی)
            </button>

            <button
              onClick={() => onSelectGoldenScenario('atorvastatin')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer border ${
                activeScenarioName === 'Atorvastatin'
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-sm'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700/60'
              }`}
              title="آتورواستاتین: ترانس‌آمینیت بدون علامت و الگوی مختلط"
            >
              آتورواستاتین
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
