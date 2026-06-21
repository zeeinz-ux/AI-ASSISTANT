export type PromptMode = "general" | "explain" | "debug" | "refactor";

export function selectPromptMode(prompt: string): PromptMode {
  const normalized = prompt.toLowerCase();

  if (
    normalized.includes("error") ||
    normalized.includes("bug") ||
    normalized.includes("exception") ||
    normalized.includes("gagal")
  ) {
    return "debug";
  }

  if (
    normalized.includes("refactor") ||
    normalized.includes("rapikan") ||
    normalized.includes("improve")
  ) {
    return "refactor";
  }

  if (
    normalized.includes("jelaskan") ||
    normalized.includes("explain") ||
    normalized.includes("apa fungsi")
  ) {
    return "explain";
  }

  return "general";
}
