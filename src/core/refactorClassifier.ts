export type RefactorCategory =
  | "long-function"
  | "duplicate-code"
  | "complex-logic"
  | "naming"
  | "general";

export function classifyRefactorRequest(prompt: string): RefactorCategory {
  const text = prompt.toLowerCase();

  if (text.includes("terlalu panjang") || text.includes("long function")) {
    return "long-function";
  }

  if (text.includes("duplikasi") || text.includes("duplicate")) {
    return "duplicate-code";
  }

  if (text.includes("kompleks") || text.includes("complex")) {
    return "complex-logic";
  }

  if (text.includes("nama") || text.includes("naming")) {
    return "naming";
  }

  return "general";
}
