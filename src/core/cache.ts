import { ProjectInfo } from "./projectAnalyzer";

export interface ProjectCache {
  projectInfo?: ProjectInfo;
  projectStructure?: string[];
  keyFiles?: string[];
}

export const cache: ProjectCache = {};
