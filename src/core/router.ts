import { classifyTask } from "./taskClassifier";
import { config } from "../config/env";
import { ChatRequestBody, RouteDecision } from "../types";

/**
 * Kebijakan routing (lihat PRD section 8):
 * 1. Task sederhana / autocomplete -> Local AI (Ollama)
 * 2. Reasoning kompleks / debugging berat -> Cloud AI
 * 3. Local AI gagal/lambat -> fallback ke Cloud AI (ditangani di layer pemanggil,
 *    lihat chat.route.ts, supaya fungsi ini tetap pure & mudah ditest)
 */
export function decideRoute(body: ChatRequestBody): RouteDecision {
  // ==========================================================
  // TEST MODE (sementara untuk validasi provider)
  // ==========================================================
  const forceProvider = process.env.FORCE_PROVIDER;

  if (
    forceProvider === "ollama" ||
    forceProvider === "gemini" ||
    forceProvider === "groq"
  ) {
    return {
      provider: forceProvider,
      complexity: "complex",
      reason: `Forced provider test: ${forceProvider}`,
    };
  }

  // ==========================================================
  // LOGIKA ASLI PHASE 1 (JANGAN DIUBAH)
  // ==========================================================
  const complexity = classifyTask(body.prompt, body.context);

  if (complexity === "simple") {
    return {
      provider: "ollama",
      complexity,
      reason:
        "Task sederhana — diarahkan ke Local AI (Ollama) sesuai kebijakan local-first.",
    };
  }

  if (config.gemini.apiKey) {
    return {
      provider: "gemini",
      complexity,
      reason:
        "Task kompleks — diarahkan ke Gemini API untuk reasoning yang lebih kuat.",
    };
  }

  if (config.groq.apiKey) {
    return {
      provider: "groq",
      complexity,
      reason:
        "Task kompleks — diarahkan ke Groq API (Gemini API key tidak tersedia).",
    };
  }

  return {
    provider: "ollama",
    complexity,
    reason:
      "Task kompleks, tapi tidak ada cloud API key dikonfigurasi — fallback ke Local AI.",
  };
}

// TODO(Phase 1.2): tambahkan health-check Ollama (GET /api/tags) di sini supaya
// kalau local AI down, router otomatis fallback ke cloud meskipun task-nya simple.
