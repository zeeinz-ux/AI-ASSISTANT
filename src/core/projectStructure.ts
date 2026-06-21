import fs from "fs";
import path from "path";

export interface ProjectStructure {
  folders: string[];
}

export function getProjectStructure(rootPath: string): ProjectStructure {
  const srcPath = path.join(rootPath, "src");

  if (!fs.existsSync(srcPath)) {
    return {
      folders: [],
    };
  }

  const folders = fs
    .readdirSync(srcPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `src/${entry.name}`);

  return {
    folders,
  };
}
