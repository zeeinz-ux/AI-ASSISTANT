export interface ScoredImport {
  path: string;
  score: number;
}

export function rankImports(imports: string[], prompt: string): string[] {
  const keywords = prompt.toLowerCase().split(/\s+/).filter(Boolean);

  const scored: ScoredImport[] = imports.map((item) => {
    let score = 0;

    const normalized = item.toLowerCase();

    for (const keyword of keywords) {
      if (normalized.includes(keyword)) {
        score += 10;
      }
    }

    return {
      path: item,
      score,
    };
  });

  return scored.sort((a, b) => b.score - a.score).map((item) => item.path);
}
