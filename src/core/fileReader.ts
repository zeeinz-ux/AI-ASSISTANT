import fs from "fs";
import path from "path";

const MAX_FILES = 3;
const MAX_FILE_CONTENT_LENGTH = 1500;

export interface RelatedFile {
  path: string;
  content: string;
}

export function loadRelatedFiles(files: string[]): RelatedFile[] {
  return files
    .slice(0, MAX_FILES)
    .filter((file) => fs.existsSync(file))
    .map((file) => ({
      path: file,
      content: fs
        .readFileSync(path.resolve(file), "utf-8")
        .slice(0, MAX_FILE_CONTENT_LENGTH),
    }));
}
