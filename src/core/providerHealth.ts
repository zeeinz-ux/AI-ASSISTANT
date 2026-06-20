import axios from "axios";
import { config } from "../config/env";

export type ProviderName = "ollama" | "gemini" | "groq";

export interface ProviderHealthStatus {
  ollama: boolean;
  gemini: boolean;
  groq: boolean;
  checkedAt: string;
}

const PING_TIMEOUT_MS = 5_000;

async function safeGet(url: string, options: Record<string, unknown> = {}) {
  try {
    const response = await axios.get(url, {
      timeout: PING_TIMEOUT_MS,
      ...options,
    });

    return response.status >= 200 && response.status < 300;
  } catch {
    return false;
  }
}

export async function checkOllama(): Promise<boolean> {
  return safeGet(`${config.ollama.host}/api/tags`);
}

export async function checkGemini(): Promise<boolean> {
  if (!config.gemini.apiKey) return false;

  return safeGet("https://generativelanguage.googleapis.com/v1beta/models", {
    params: { key: config.gemini.apiKey },
  });
}

export async function checkGroq(): Promise<boolean> {
  if (!config.groq.apiKey) return false;

  return safeGet("https://api.groq.com/openai/v1/models", {
    headers: {
      Authorization: `Bearer ${config.groq.apiKey}`,
    },
  });
}

export async function checkAllProviders(): Promise<ProviderHealthStatus> {
  const [ollama, gemini, groq] = await Promise.all([
    checkOllama(),
    checkGemini(),
    checkGroq(),
  ]);

  return {
    ollama,
    gemini,
    groq,
    checkedAt: new Date().toISOString(),
  };
}
