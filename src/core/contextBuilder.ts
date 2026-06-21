import { ContextPayload } from "../types";

export function buildContext(prompt: string, context?: ContextPayload): string {
  const sections: string[] = [];

  // ============================================================================
  // PROJECT AWARENESS
  // ============================================================================

  if (context?.projectName) {
    sections.push(`Project: ${context.projectName}`);
  }

  if (context?.framework) {
    sections.push(`Framework: ${context.framework}`);
  }

  if (context?.packageManager) {
    sections.push(`Package Manager: ${context.packageManager}`);
  }

  if (context?.projectStructure && context.projectStructure.length > 0) {
    sections.push(`Project Structure:\n${context.projectStructure.join("\n")}`);
  }

  // ============================================================================
  // WORKSPACE CONTEXT
  // ============================================================================

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

  // ============================================================================
  // USER REQUEST
  // ============================================================================

  sections.push(`User Request:\n${prompt}`);

  return sections.join("\n\n");
}
