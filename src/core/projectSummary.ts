import fs from "fs";
import path from "path";

export interface ProjectSummary {
  routes: string[];
  core: string[];
  services: string[];
}

function listFiles(folderPath: string): string[] {
  if (!fs.existsSync(folderPath)) {
    return [];
  }

  return fs.readdirSync(folderPath).filter((file) => file.endsWith(".ts"));
}

export function getProjectSummary(rootPath: string): ProjectSummary {
  return {
    routes: listFiles(path.join(rootPath, "src", "routes")),

    core: listFiles(path.join(rootPath, "src", "core")),

    services: listFiles(path.join(rootPath, "src", "services")),
  };
}
