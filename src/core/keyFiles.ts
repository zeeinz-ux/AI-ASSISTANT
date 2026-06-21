import fs from "fs";
import path from "path";

export interface KeyFilesInfo {
  files: string[];
}

const CANDIDATE_FILES = [
  "package.json",
  "README.md",
  "tsconfig.json",
  ".env.example",
  ".gitignore",
];

export function getKeyFiles(rootPath: string): KeyFilesInfo {
  const files = CANDIDATE_FILES.filter((file) =>
    fs.existsSync(path.join(rootPath, file)),
  );

  return {
    files,
  };
}
