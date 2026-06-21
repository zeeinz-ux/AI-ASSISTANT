export type DebugCategory =
  | "type-error"
  | "reference-error"
  | "syntax-error"
  | "module-error"
  | "runtime-error"
  | "unknown";

export function classifyDebugError(prompt: string): DebugCategory {
  const text = prompt.toLowerCase();

  if (text.includes("typeerror")) {
    return "type-error";
  }

  if (text.includes("referenceerror")) {
    return "reference-error";
  }

  if (text.includes("syntaxerror")) {
    return "syntax-error";
  }

  if (
    text.includes("cannot find module") ||
    text.includes("module not found")
  ) {
    return "module-error";
  }

  if (text.includes("exception") || text.includes("runtime")) {
    return "runtime-error";
  }

  return "unknown";
}
