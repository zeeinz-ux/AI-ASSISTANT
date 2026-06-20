import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = {
  port: Number(getEnv("PORT", "3000")),
  nodeEnv: getEnv("NODE_ENV", "development"),
  ollama: {
    host: getEnv("OLLAMA_HOST", "http://localhost:11434"),
    model: getEnv("OLLAMA_MODEL", "qwen2.5-coder:7b"),
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY ?? "",
  },
  groq: {
    apiKey: process.env.GROQ_API_KEY ?? "",
  },
};

/**
 * Cloud API key bersifat opsional by design (local-first).
 * Kalau tidak ada sama sekali, sistem tetap harus bisa jalan,
 * cuma tanpa cloud fallback untuk task kompleks.
 */
export function checkCloudConfig(): void {
  if (!config.gemini.apiKey && !config.groq.apiKey) {
    console.warn(
      "[Synapse AI] Tidak ada cloud API key (Gemini/Groq) yang dikonfigurasi. " +
        "Sistem berjalan local-only — cloud fallback tidak akan tersedia untuk task kompleks."
    );
  }
}
