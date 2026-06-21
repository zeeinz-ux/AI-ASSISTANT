import { DebugCategory } from "./debugClassifier";

export const DEBUG_PROMPTS: Record<DebugCategory, string> = {
  "type-error": `
Focus on:
- Undefined values
- Null values
- Wrong object access
- Missing validation
`,

  "reference-error": `
Focus on:
- Missing variables
- Scope issues
- Incorrect imports
`,

  "syntax-error": `
Focus on:
- Missing brackets
- Missing commas
- Invalid syntax
`,

  "module-error": `
Focus on:
- Dependency installation
- Import paths
- Package configuration
`,

  "runtime-error": `
Focus on:
- Runtime exceptions
- State issues
- Async issues
`,

  unknown: `
Provide a general debugging analysis.
`,
};
