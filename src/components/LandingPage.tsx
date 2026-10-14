/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Activity,
  AlertOctagon,
  ArrowLeft,
  ArrowRight,
  Award,
  Bot,
  CheckCircle,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Compass,
  Cpu,
  Database,
  Dna,
  FileCheck2,
  FileText,
  Flame,
  FlaskConical,
  Gauge,
  Globe,
  HeartPulse,
  Layers,
  Lock,
  Network,
  Pill,
  Scale,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Terminal,
  Zap,
} from 'lucide-react';

interface LandingPageProps {
  onStartExplorer: () => void;
  onStartAssessment: () => void;
  onOpenLocalLlmModal: () => void;
  isLocalLlmActive?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartExplorer,
  onStartAssessment,
  onOpenLocalLlmModal,
  isLocalLlmActive,
}) => {
  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-sm">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-biotech-grid opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            <span>سامانه تخصصی پشتیبان تصمیم‌گیری دارویی • هوش‌دارو</span>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-teal-900 font-extrabold">inClinico :: DILI Navigator</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            سامانه هوشمند ارزیابی خطر آسیب کبدی داروها{' '}
            <span className="bg-gradient-to-l from-teal-700 via-cyan-700 to-indigo-700 bg-clip-text text-transparent">
              (DILI Navigator)
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
            ایجاد یک زنجیره قابل ردیابی و قطعی از قواعد بالینی، شواهد ساخت‌یافته کتابخانه ملی پزشکی
            (LiverTox)، محاسبه شاخص R-ratio، بررسی معیارهای هشداردهنده Hy's Law، امتیازدهی استاندارد علّیت
            RUCAM و پشتیبانی از مدل محلی هوش مصنوعی Qwen 8B.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onStartExplorer}
              className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm shadow-md shadow-teal-700/20 flex items-center gap-2 transition cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>کاوشگر جامع داروهای LiverTox</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onStartAssessment}
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md shadow-slate-900/10 flex items-center gap-2 transition cursor-pointer"
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>شروع ارزیابی بالینی بیمار (DILI Engine)</span>
            </button>

            <button
              onClick={onOpenLocalLlmModal}
              className={`px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 border transition cursor-pointer ${
                isLocalLlmActive
                  ? 'bg-purple-50 text-purple-900 border-purple-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Bot className="w-4 h-4 text-purple-600" />
              <span>اتصال سرور محلی Qwen 8B</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  isLocalLlmActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                }`}
              />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200">
              <span className="text-xl sm:text-2xl font-mono font-black text-teal-800">۱,۳۶۹</span>
              <span className="text-xs text-slate-500 block font-medium mt-0.5">تک‌نگاشت پردازش‌شده LiverTox</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200">
              <span className="text-xl sm:text-2xl font-mono font-black text-cyan-800">۱,۱۲۱</span>
              <span className="text-xs text-slate-500 block font-medium mt-0.5">دارای رده احتمال DILI (A-E)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200">
              <span className="text-xl sm:text-2xl font-mono font-black text-indigo-800">۱۰۰٪</span>
              <span className="text-xs text-slate-500 block font-medium mt-0.5">محاسبات قطعی و بازتولیدپذیر</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200">
              <span className="text-xl sm:text-2xl font-mono font-black text-purple-800">Qwen 8B</span>
              <span className="text-xs text-slate-500 block font-medium mt-0.5">سرویس محلی vLLM / بدون خروج داده</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Problem & Solution (Why a standard chatbot is not enough) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block font-mono">
            PHILOSOPHY & CLINICAL CONSTITUTION
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            چرا ارزیابی سمیت دارویی فراتر از یک چت‌بات عمومی است؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
            مسئله اصلی سامانه هوش‌دارو صرفاً نمایش متن یا ارائه پاسخ احتمالی توسط یک مدل زبانی نیست؛ بلکه
            ایجاد یک زنجیره شفاف و قابل استناد است که در آن مدل زبانی حق تغییر قواعد یا جعل علیت ندارد و
            محاسبات بیوشیمیایی در یک موتور مستقل قطعی اجرا می‌شوند.
          </p>
        </div>

        {/* 3 Pillars Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold font-mono">
              ۱
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">خطر مرتبط با دارو (Drug-related Risk)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ارزیابی منبع‌محور از میزان پتانسیل کلی مولکول دارویی بر اساس رده‌های A تا E پایگاه LiverTox.
              این شاخص پتانسیل عمومی دارو است، نه احتمال قطعی در یک بیمار خاص.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold font-mono">
              ۲
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">علّیت در مورد مشخص (Causality / RUCAM)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              برآورد احتمال انتساب آسیب به داروی مصرفی با امتیازدهی ۷ بخشی CIOMS (شامل زمان‌بندی، دی‌چلنج،
              سن، الکل، بارداری و رد سیستماتیک علل جایگزین غیردارویی).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold font-mono">
              ۳
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">نگرانی بالینی (Clinical Concern)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              شدت فعلی آسیب و معیارهای هشداردهنده (مانند سه‌گانه Hy's Law یا افزایش شدید ترانس‌آمینازها). حتی
              اگر علیت هنوز نهایی نشده باشد، نگرانی بالینی فوری و اقدامات مداخله‌ای را مشخص می‌کند.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 4 Functional Modules */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider font-mono">
            CORE PLATFORM MODULES
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            ماژول‌های تخصصی سامانه هوش‌دارو
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            محیطی یکپارچه برای تیم‌های تحقیق و توسعه دارو (R&D)، ایمنی بیمار، سم‌شناسی و فارماکولوژی
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Module 1: Explorer */}
          <div
            onClick={onStartExplorer}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition cursor-pointer group space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 group-hover:bg-teal-700 group-hover:text-white transition">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                MODULE 01
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-teal-800 transition flex items-center gap-2">
                <span>کاوشگر جامع داروهای LiverTox</span>
                <ChevronLeft className="w-4 h-4 text-teal-600 group-hover:-translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                جستجو در کاتالوگ غنی داروها، تفکیک شواهد اختصاصی دارو از شواهد عمومی گروه، مطالعه سازوکار
                سلولی و هشدارهای تجویزی به همراه دکمه بارگذاری مستقیم در موتور ارزیابی.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-100">
              <span>فیلتر رده‌های A تا E</span>
              <span>•</span>
              <span>PubChem CID</span>
              <span>•</span>
              <span>الگوهای هپاتوسلولار/کلستاتیک</span>
            </div>
          </div>

          {/* Module 2: Assessment Engine */}
          <div
            onClick={onStartAssessment}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-cyan-400 hover:shadow-md transition cursor-pointer group space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-200 group-hover:bg-cyan-700 group-hover:text-white transition">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-200">
                MODULE 02
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-cyan-800 transition flex items-center gap-2">
                <span>موتور ارزیابی بالینی DILI Navigator</span>
                <ChevronLeft className="w-4 h-4 text-cyan-600 group-hover:-translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                محاسبه خودکار شاخص R-ratio، ارزیابی سه‌گانه قانون های (Hy's Law)، امتیازدهی استاندارد علّیت
                RUCAM، و نمودار استاندارد پراکندگی eDISH با Recharts.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-100">
              <span>نمودار پراکندگی eDISH</span>
              <span>•</span>
              <span>R-ratio Gauge</span>
              <span>•</span>
              <span>تفسیر بالینی مجزا</span>
            </div>
          </div>

          {/* Module 3: Knowledge Graph */}
          <div
            onClick={onStartAssessment}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition cursor-pointer group space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200 group-hover:bg-indigo-700 group-hover:text-white transition">
                <Network className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                MODULE 03
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-800 transition flex items-center gap-2">
                <span>کاوشگر گراف دانش و توپولوژی دارویی</span>
                <ChevronLeft className="w-4 h-4 text-indigo-600 group-hover:-translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                نمایش تصویری روابط معنایی دارو، نام‌های تجاری، گروه دارویی و اسناد شواهد، با تفکیک بصری
                شواهد عمومی گروه (Class-level) مانند دیورتیک‌های لوپ از خود دارو.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-100">
              <span>بوم تعاملی SVG</span>
              <span>•</span>
              <span>بازرسی مشخصات گره‌ها</span>
              <span>•</span>
              <span>انطباق با Neo4j</span>
            </div>
          </div>

          {/* Module 4: Local Qwen 8B Integration */}
          <div
            onClick={onOpenLocalLlmModal}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-md transition cursor-pointer group space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 group-hover:bg-purple-700 group-hover:text-white transition">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                MODULE 04
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-800 transition flex items-center gap-2">
                <span>اتصال سرور محلی مدل زبانی Qwen 8B</span>
                <ChevronLeft className="w-4 h-4 text-purple-600 group-hover:-translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                تنظیم آدرس اینفرنس محلی (vLLM، Ollama یا کانتینر اختصاصی شما)، تست اتصال بلادرنگ، پایش تاخیر
                میلی‌ثانیه‌ای و تضمین عدم خروج داده‌های بیمار از سرور شما.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-100">
              <span>OpenAI API Compatible</span>
              <span>•</span>
              <span>حفظ محرمانگی داده‌ها</span>
              <span>•</span>
              <span>کنترل پرامپت بالینی</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Local Qwen 8B Setup Guide Banner */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-400" />
              <span className="text-xs font-mono font-bold uppercase text-purple-300">
                LOCAL LLM SERVER INTEGRATION
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-snug">
              مدل محلی Qwen 8B خود را مستقیماً به هوش‌دارو متصل کنید
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              آیا مدل Qwen 8B (مانند Qwen2.5-7B/8B-Instruct-AWQ) را روی vLLM یا Ollama سرور خود راه‌اندازی
              کرده‌اید؟ سامانه هوش‌دارو می‌تواند تمام درخواست‌های سنتز شواهد را مستقیماً به پورت محلی سرور شما
              (مانند http://localhost:8001/v1) ارسال کند.
            </p>
          </div>

          <button
            onClick={onOpenLocalLlmModal}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs shadow-md transition cursor-pointer shrink-0 flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-purple-600" />
            <span>تنظیمات و تست اتصال سرور Qwen</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-purple-800/60 text-xs font-mono text-slate-300">
          <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60">
            <span className="text-purple-300 font-bold block mb-0.5">آدرس پیش‌فرض:</span>
            <span>http://localhost:8001/v1</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60">
            <span className="text-purple-300 font-bold block mb-0.5">شناسه مدل پیشنهادی:</span>
            <span>Qwen2.5-7B-Instruct-AWQ</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60">
            <span className="text-purple-300 font-bold block mb-0.5">سیاست پرامپت:</span>
            <span>Zero Alteration of R-ratio / RUCAM</span>
          </div>
        </div>
      </section>
    </div>
  );
};
