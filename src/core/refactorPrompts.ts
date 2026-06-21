import { RefactorCategory } from "./refactorClassifier";

export const REFACTOR_PROMPTS: Record<RefactorCategory, string> = {
  "long-function": `
Focus on:
- Extract method
- Single responsibility
- Smaller functions
`,

  "duplicate-code": `
Focus on:
- DRY principle
- Shared utilities
- Reusable abstractions
`,

  "complex-logic": `
Focus on:
- Reduce nesting
- Improve readability
- Simplify conditions
`,

  naming: `
Focus on:
- Better naming
- Clear intent
- Consistent terminology
`,

  general: `
Provide a general refactor analysis.
`,
};
