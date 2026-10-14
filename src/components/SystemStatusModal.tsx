/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle,
  Cpu,
  HardDrive,
  Layers,
  Network,
  RotateCw,
  Server,
  ShieldAlert,
  Terminal,
  X,
} from 'lucide-react';

interface SystemStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemStatusModal: React.FC<SystemStatusModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'services' | 'specs' | 'criteria'>('services');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>زیرساخت سرور محاسباتی و معیارهای پذیرش MVP</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  ONLINE
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                مستندات بخش ۱۱، ۱۶ و ۱۷ گزارش جامع DILI Navigator (اکتبر ۲۰۲۶)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/40 px-5 text-xs">
          <button
            onClick={() => setActiveTab('services')}
            className={`py-3 px-4 font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'services'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            سرویس‌های systemd و پورت‌ها
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-4 font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'specs'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            مشخصات محیط محاسباتی (Proxmox/GPU)
          </button>
          <button
            onClick={() => setActiveTab('criteria')}
            className={`py-3 px-4 font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'criteria'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ۶ معیار پذیرش پیشنهادی MVP
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* dili-backend */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-800">
                      dili-backend.service
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      active (running)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-1 font-mono">
                    <div>FastAPI Framework • Uvicorn Worker</div>
                    <div className="text-teal-700 font-semibold">داخلی: 192.168.98.49:3004</div>
                    <div className="text-slate-500">بیرونی: 2.144.135.209:8083</div>
                  </div>
                </div>

                {/* dili-frontend */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-800">
                      dili-frontend.service
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      active (running)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-1 font-mono">
                    <div>Next.js 16.3 • React 19 • Tailwind 4</div>
                    <div className="text-teal-700 font-semibold">داخلی: 192.168.98.49:3003</div>
                    <div className="text-slate-500">بیرونی: 2.144.135.209:8082</div>
                  </div>
                </div>

                {/* dili-vllm */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-800">
                      dili-vllm.service
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      active (running)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-1 font-mono">
                    <div>vLLM 0.29.0 • Qwen2.5-7B-Instruct-AWQ</div>
                    <div className="text-teal-700 font-semibold">لوکال: localhost:8001/v1</div>
                    <div className="text-slate-500">محدود به شبکه محلی بدون انتشار عمومی</div>
                  </div>
                </div>

                {/* pharmacy-frontend */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-800">
                      pharmacy-frontend.service
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                      active
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-1 font-mono">
                    <div>درگاه عمومی هوش‌دارو (Attar)</div>
                    <div className="text-teal-700 font-semibold">داخلی: 192.168.98.49:3006</div>
                    <div className="text-slate-500">بیرونی: 2.144.135.209:8086</div>
                  </div>
                </div>
              </div>

              {/* CLI Command reference */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-[11px] font-mono text-slate-200">
                <span className="text-slate-400 block mb-1">دستورات ترمینال سرور:</span>
                <p className="text-teal-300 select-all">sudo systemctl status dili-backend dili-frontend dili-vllm</p>
                <p className="text-slate-400 select-all">sudo journalctl -u dili-backend -n 50 --no-pager</p>
              </div>
            </div>
          )}

          {/* Machine Specs Tab */}
          {activeTab === 'specs' && (
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white text-xs">
                <div className="flex items-center justify-between p-3">
                  <span className="text-slate-500">سیستم‌عامل سرور:</span>
                  <span className="font-mono text-slate-900 font-bold">Ubuntu 26.04.1 LTS</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-slate-500">میزبان مجازی (Hypervisor):</span>
                  <span className="font-mono text-slate-800">Proxmox VE (VMID 100)</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-slate-500">حافظه رم (RAM):</span>
                  <span className="font-mono text-teal-800 font-bold">حدود ۶۲ گیگابایت</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-slate-500">فضای ذخیره‌سازی:</span>
                  <span className="font-mono text-slate-800">۳۰۰ گیگابایت NVMe</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-slate-500">پردازنده گرافیکی (GPU):</span>
                  <span className="font-mono text-amber-700 font-bold">
                    NVIDIA GeForce RTX 5070 (12 GB VRAM)
                  </span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-slate-500">درایور و CUDA:</span>
                  <span className="font-mono text-slate-800">Driver 595.91.07 • CUDA 13.2</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-slate-500">محیط پایتون و هوش مصنوعی:</span>
                  <span className="font-mono text-slate-800">Python 3.14 • vLLM 0.29.0</span>
                </div>
              </div>
            </div>
          )}

          {/* Acceptance Criteria Tab */}
          {activeTab === 'criteria' && (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                معیارهای ۶ گانه پذیرش پیشنهادی MVP (بخش ۱۶ گزارش) که جهت اعتبارسنجی بالینی رعایت
                شده‌اند:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">۱. بازتولیدپذیری نتایج محاسبات:</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      برای ورودی‌های ثابت (مانند سناریوی Isoniazid صفحه ۸)، نتایج R-ratio و Hy's Law دقیقاً قطعی و یکسان تولید می‌شوند.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">۲. انتساب صریح به منابع و محدودیت‌ها:</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      هر ادعای علمی به تک‌نگاشت مشخص LiverTox (NBK547852) یا راهنمای FDA متصل است.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">۳. اعلام محدودیت در صورت نقص داده‌ها:</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      اگر پارامترهای آزمایشگاهی یا سرولوژی ناقص باشند، سامانه وضعیت Indeterminate را اعلام می‌کند و نتیجه کاذب قطعی نمی‌دهد.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">۴. عدم مداخله مدل زبانی در محاسبات قطعی:</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      مدل زبانی حق تغییر نمرات R-ratio یا RUCAM را ندارد و صرفاً نتایج را تشریح می‌کند.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">۵. اجرای بدون خطای سناریوهای مرجع:</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      سناریوهای طلایی ایزونیازید، کوآموکسی‌کلاو، فوروزماید و استامینوفن بدون نقص اجرا می‌شوند.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">۶. شناسایی نسخه و پیکربندی:</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      نسخه استقرار MVP v1.4 و شناسه پایگاه LiverTox در پرونده ثبت می‌شود.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>هوش‌دارو • تیم تحقیق و توسعه ایمنی داروها (R&D / Pharmacovigilance)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition font-bold cursor-pointer"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
