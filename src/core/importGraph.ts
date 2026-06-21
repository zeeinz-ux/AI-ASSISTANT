export interface ImportGraph {
  imports: string[];
}

const IMPORT_REGEX = /import\s+(?:[\w*\s{},]+)\s+from\s+["']([^"']+)["']/g;

export function analyzeImports(fileContent: string): ImportGraph {
  const imports: string[] = [];

  let match: RegExpExecArray | null;

  while ((match = IMPORT_REGEX.exec(fileContent)) !== null) {
    imports.push(match[1]);
  }

  return {
    imports,
  };
}
