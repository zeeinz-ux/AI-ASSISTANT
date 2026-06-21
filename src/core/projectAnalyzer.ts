import fs from "fs";
import path from "path";

export interface ProjectInfo {
  projectName?: string;
  language?: string;
  packageManager?: string;
  framework?: string;
}

export function analyzeProject(rootPath: string): ProjectInfo {
  const packageJsonPath = path.join(rootPath, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    return {};
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  const dependencies = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {}),
  };

  let framework = "unknown";

  if ("express" in dependencies) {
    framework = "express";
  } else if ("next" in dependencies) {
    framework = "nextjs";
  } else if ("react" in dependencies) {
    framework = "react";
  }

  return {
    projectName: packageJson.name,
    language: "typescript",
    packageManager: "npm",
    framework,
  };
}
