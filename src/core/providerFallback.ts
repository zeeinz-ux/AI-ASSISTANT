import { callGemini } from "../services/gemini.service";
import { callGroq } from "../services/groq.service";
import { callOllama } from "../services/ollama.service";
import { ProviderName } from "./providerHealth";

export interface ProviderAttempt {
  provider: ProviderName;
  ok: boolean;
  durationMs: number;
  error?: string;
}

export class ProviderFallbackError extends Error {
  attempts: ProviderAttempt[];

  constructor(attempts: ProviderAttempt[]) {
    super("Semua AI provider gagal merespons.");
    this.name = "ProviderFallbackError";
    this.attempts = attempts;
    Object.setPrototypeOf(this, ProviderFallbackError.prototype);
  }
}

const FALLBACK_ORDER: Record<ProviderName, ProviderName[]> = {
  ollama: ["ollama", "gemini", "groq"],
  gemini: ["gemini", "groq", "ollama"],
  groq: ["groq", "gemini", "ollama"],
};

async function callProvider(provider: ProviderName, prompt: string) {
  switch (provider) {
    case "ollama":
      return callOllama(prompt);
    case "gemini":
      return callGemini(prompt);
    case "groq":
      return callGroq(prompt);
  }
}

export async function executeWithFallback(
  primaryProvider: ProviderName,
  prompt: string,
): Promise<{
  provider: ProviderName;
  response: string;
  attempts: ProviderAttempt[];
}> {
  const attempts: ProviderAttempt[] = [];
  const order = FALLBACK_ORDER[primaryProvider];

  for (const provider of order) {
    const startedAt = Date.now();

    try {
      const response = await callProvider(provider, prompt);

      attempts.push({
        provider,
        ok: true,
        durationMs: Date.now() - startedAt,
      });

      return { provider, response, attempts };
    } catch (error) {
      attempts.push({
        provider,
        ok: false,
        durationMs: Date.now() - startedAt,
        error: (error as Error).message,
      });
    }
  }

  throw new ProviderFallbackError(attempts);
}
