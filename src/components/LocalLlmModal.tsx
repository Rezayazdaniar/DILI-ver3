/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertCircle,
  Bot,
  CheckCircle2,
  Cpu,
  Globe,
  Key,
  Layers,
  RefreshCw,
  Server,
  Settings,
  Sparkles,
  Terminal,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';
import {
  DEFAULT_LOCAL_LLM_CONFIG,
  getStoredLlmConfig,
  LocalLlmConfig,
  saveStoredLlmConfig,
} from '../types/llm-config';
import { testLocalLlmConnection } from '../lib/dili-explanation-api';

interface LocalLlmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved: (config: LocalLlmConfig) => void;
}

export const LocalLlmModal: React.FC<LocalLlmModalProps> = ({
  isOpen,
  onClose,
  onConfigSaved,
}) => {
  const [config, setConfig] = useState<LocalLlmConfig>(DEFAULT_LOCAL_LLM_CONFIG);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    latencyMs?: number;
    modelsFound?: string[];
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setConfig(getStoredLlmConfig());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testLocalLlmConnection(config);
      setTestResult(res);
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    saveStoredLlmConfig(config);
    onConfigSaved(config);
    onClose();
  };

  const applyPreset = (preset: { url: string; model: string }) => {
    setConfig((prev) => ({
      ...prev,
      endpointUrl: preset.url,
      modelName: preset.model,
    }));
    setTestResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">
                  اتصال مدل محلی Qwen 8B (Local LLM Server)
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold border border-purple-200">
                  vLLM / OpenAI Compatible
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                اتصال مستقیم سامانه هوش‌دارو به مدل زبان بزرگ مستقر روی سرور شخصی شما
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

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Active Switch Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="font-bold text-slate-900 text-sm block">
                فعال‌سازی استفاده از مدل محلی برای تولید توضیحات
              </span>
              <span className="text-slate-500 text-xs">
                در صورت فعال‌بودن، تحلیل شواهد توسط مدل Qwen مستقر روی سرور شما انجام می‌شود.
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.isEnabled}
                onChange={(e) => setConfig({ ...config, isEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <span className="text-slate-600 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>تنظیمات پیش‌فرض سرورهای گزارش پروژه:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    url: 'http://localhost:8001/v1',
                    model: 'my-medical-model',
                  })
                }
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] border border-slate-200 cursor-pointer"
              >
                vLLM Localhost (پورت ۸۰۰۱)
              </button>
              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    url: 'http://192.168.98.49:8001/v1',
                    model: 'Qwen2.5-7B-Instruct-AWQ',
                  })
                }
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] border border-slate-200 cursor-pointer"
              >
                سرور داخلی LAN (192.168.98.49)
              </button>
              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    url: 'http://localhost:11434/v1',
                    model: 'qwen2.5:8b',
                  })
                }
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] border border-slate-200 cursor-pointer"
              >
                Ollama Localhost (qwen2.5:8b)
              </button>
            </div>
          </div>

          {/* Endpoint URL */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>آدرس سرویس اینفرنس (Base Endpoint URL):</span>
            </label>
            <input
              type="text"
              value={config.endpointUrl}
              onChange={(e) => setConfig({ ...config, endpointUrl: e.target.value })}
              placeholder="مثال: http://localhost:8001/v1 یا http://192.168.1.100:8000/v1"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 font-mono text-slate-900 focus:outline-none focus:border-purple-600 focus:bg-white transition text-xs"
            />
            <p className="text-[11px] text-slate-500">
              باید با مشخصات سرویس سازگار با OpenAI (مثل vLLM، Ollama، TGI یا LM Studio) همخوانی داشته باشد.
            </p>
          </div>

          {/* Model Name & API Key */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-600" />
                <span>شناسه مدل (Model ID):</span>
              </label>
              <input
                type="text"
                value={config.modelName}
                onChange={(e) => setConfig({ ...config, modelName: e.target.value })}
                placeholder="مثال: Qwen2.5-7B-Instruct-AWQ یا qwen2.5:8b"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:outline-none focus:border-purple-600 focus:bg-white transition text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-600" />
                <span>کلید احراز هویت (API Key - اختیاری):</span>
              </label>
              <input
                type="password"
                value={config.apiKey || ''}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                placeholder="در صورت عدم نیاز، خالی بگذارید"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:outline-none focus:border-purple-600 focus:bg-white transition text-xs"
              />
            </div>
          </div>

          {/* Inference Hyperparameters */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block text-[11px] font-semibold mb-1">
                دما (Temperature):
              </span>
              <input
                type="number"
                step="0.05"
                min="0"
                max="1"
                value={config.temperature}
                onChange={(e) =>
                  setConfig({ ...config, temperature: parseFloat(e.target.value) || 0.1 })
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 font-mono text-slate-800 text-xs focus:outline-none"
              />
            </div>

            <div>
              <span className="text-slate-500 block text-[11px] font-semibold mb-1">
                حداکثر توکن خروجی:
              </span>
              <input
                type="number"
                step="64"
                min="128"
                max="2048"
                value={config.maxTokens}
                onChange={(e) =>
                  setConfig({ ...config, maxTokens: parseInt(e.target.value) || 512 })
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 font-mono text-slate-800 text-xs focus:outline-none"
              />
            </div>

            <div>
              <span className="text-slate-500 block text-[11px] font-semibold mb-1">
                مهلت انتظار (ثانیه):
              </span>
              <input
                type="number"
                min="5"
                max="180"
                value={config.timeoutSeconds}
                onChange={(e) =>
                  setConfig({ ...config, timeoutSeconds: parseInt(e.target.value) || 60 })
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1 font-mono text-slate-800 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Test Connection Button & Result Box */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting || !config.endpointUrl}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 border border-slate-300 transition cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-purple-600 ${isTesting ? 'animate-spin' : ''}`} />
                <span>{isTesting ? 'در حال تست پینگ و اعتبارسنجی سرور...' : 'تست اتصال زنده به سرور محلی'}</span>
              </button>

              <span className="text-[11px] text-slate-400 font-mono">OpenAI v1 Compatible</span>
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 transition animate-in fade-in duration-150 ${
                  testResult.success
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                {testResult.success ? (
                  <Wifi className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <WifiOff className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold block">
                    {testResult.success ? 'اتصال موفقیت‌آمیز بود' : 'خطا در برقراری اتصال'}
                  </span>
                  <p className="text-[11px] mt-0.5 leading-relaxed">{testResult.message}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 transition font-medium cursor-pointer"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold transition cursor-pointer shadow-sm shadow-purple-700/20"
          >
            ذخیره و اعمال تنظیمات
          </button>
        </div>
      </div>
    </div>
  );
};
