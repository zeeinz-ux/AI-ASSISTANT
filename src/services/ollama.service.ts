import axios from "axios";
import { config } from "../config/env";

/**
 * Panggilan ke Ollama /api/generate endpoint.
 *
 * Timeout: 120 detik (model 7B di hardware mid-range bisa memakan waktu)
 * TODO(Phase 1.1):
 * - Streaming response (Ollama mendukung stream: true untuk latency lebih baik)
 * - Retry logic kalau timeout terjadi
 * - Health check otomatis sebelum generate
 *
 * Referensi: https://github.com/ollama/ollama/blob/main/docs/api.md
 */
export async function callOllama(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      `${config.ollama.host}/api/generate`,
      {
        model: config.ollama.model,
        prompt,
        stream: false,
      },
      { timeout: 120_000 }, // 120 detik — model 7B first-run bisa lama
    );

    // Ollama API response format: { response: string, ...metadata }
    if (
      !response.data?.response ||
      typeof response.data.response !== "string"
    ) {
      throw new Error(
        `Format response Ollama tidak valid. Diharapkan {response: string}, dapat: ${JSON.stringify(response.data)}`,
      );
    }

    return response.data.response;
  } catch (error) {
    const err = error as Error & { code?: string };

    // Error message yang lebih informatif
    let detail = err.message;
    if (err.code === "ECONNREFUSED") {
      detail = `Ollama service tidak aktif di ${config.ollama.host}. Pastikan 'ollama serve' sudah jalan.`;
    } else if (err.code === "ECONNABORTED") {
      detail = `Request timeout (120s) — model sedang memproses atau membutuhkan waktu lebih lama. Coba ulang atau naikkan timeout.`;
    }

    throw new Error(`[Ollama] ${detail}`);
  }
}
