import { cache } from "./cache";
import { analyzeProject } from "./projectAnalyzer";
import { getProjectStructure } from "./projectStructure";
import { getKeyFiles } from "./keyFiles";

export function getProjectContext(rootPath: string) {
  if (!cache.projectInfo) {
    console.log("[CACHE MISS] projectInfo");
    cache.projectInfo = analyzeProject(rootPath);
  }

  if (!cache.projectStructure) {
    console.log("[CACHE MISS] projectStructure");
    cache.projectStructure = getProjectStructure(rootPath).folders;
  }

  if (!cache.keyFiles) {
    console.log("[CACHE MISS] keyFiles");
    cache.keyFiles = getKeyFiles(rootPath).files;
  }

  return {
    projectInfo: cache.projectInfo,
    projectStructure: cache.projectStructure,
    keyFiles: cache.keyFiles,
  };
}
