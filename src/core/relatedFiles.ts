import path from "path";

export function resolveRelatedFiles(imports: string[]): string[] {
  return imports
    .filter((item) => item.startsWith("../"))
    .map((item) => {
      const normalized = item.replace("../", "");
      return path.join("src", normalized) + ".ts";
    });
}
