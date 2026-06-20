import { TaskComplexity } from "../types";

const COMPLEX_KEYWORDS = [
  "architecture",
  "arsitektur",
  "refactor besar",
  "security review",
  "race condition",
  "memory leak",
  "performance bottleneck",
  "design pattern",
  "scalability",
  "debug rumit",
  "stack trace",
  "kenapa ini gagal",
  "analisis mendalam",
];

const PROMPT_LENGTH_THRESHOLD = 600; // karakter, bukan token — cukup untuk heuristic awal

/**
 * TODO(Phase 1.1): Heuristic ini masih kasar (keyword + panjang prompt).
 * Saat sudah ada data request nyata, ganti dengan classifier yang lebih baik
 * (mis. embedding similarity, atau small local model untuk klasifikasi).
 */
export function classifyTask(prompt: string, context?: string): TaskComplexity {
  const combined = `${prompt} ${context ?? ""}`.toLowerCase();

  const hasComplexKeyword = COMPLEX_KEYWORDS.some((kw) => combined.includes(kw));
  const isLong = combined.length > PROMPT_LENGTH_THRESHOLD;

  return hasComplexKeyword || isLong ? "complex" : "simple";
}
