/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LocalLlmConfig {
  isEnabled: boolean;
  endpointUrl: string; // e.g. http://localhost:8001/v1 or http://192.168.98.49:8001/v1
  modelName: string; // e.g. Qwen2.5-7B-Instruct-AWQ or qwen2.5:8b or my-medical-model
  apiKey?: string;
  temperature: number;
  maxTokens: number;
  timeoutSeconds: number;
}

export const DEFAULT_LOCAL_LLM_CONFIG: LocalLlmConfig = {
  isEnabled: true, // Enabled by default as the primary AI engine of the project
  endpointUrl: 'http://localhost:8001/v1',
  modelName: 'my-medical-model', // Alias for Qwen 8B / Qwen2.5-7B-Instruct-AWQ
  apiKey: '',
  temperature: 0.0, // Strict zero temperature as specified in report section 9.3
  maxTokens: 512,
  timeoutSeconds: 60,
};

export const LOCAL_LLM_STORAGE_KEY = 'hoshdaru_local_llm_config';

export function getStoredLlmConfig(): LocalLlmConfig {
  if (typeof window === 'undefined') return DEFAULT_LOCAL_LLM_CONFIG;
  try {
    const raw = localStorage.getItem(LOCAL_LLM_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_LOCAL_LLM_CONFIG, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_LOCAL_LLM_CONFIG;
}

export function saveStoredLlmConfig(config: LocalLlmConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_LLM_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}
