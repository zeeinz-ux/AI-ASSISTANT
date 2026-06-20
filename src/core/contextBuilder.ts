import { ContextPayload } from "../types";

export function buildContext(prompt: string, context?: ContextPayload): string {
  const sections: string[] = [];

  if (context?.workspace) {
    sections.push(`Workspace: ${context.workspace}`);
  }

  if (context?.filePath) {
    sections.push(`File: ${context.filePath}`);
  }

  if (context?.language) {
    sections.push(`Language: ${context.language}`);
  }

  if (context?.selectedCode) {
    sections.push(`Selected Code:\n${context.selectedCode}`);
  }

  sections.push(`User Request:\n${prompt}`);

  return sections.join("\n\n");
}
