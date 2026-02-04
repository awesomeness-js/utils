import { readdirSync, statSync } from "fs";
import path from "path";
import shouldIgnore from "./shouldIgnore.js";

export default function getAllFiles(base, {
  dir = ".",
  files = [],
  ignore = [],
  fileTypes = [],
} = {}) {

  const isAbsDir = path.isAbsolute(dir);

  // ✅ if dir is absolute, don't join it onto base
  const directory = isAbsDir ? dir : path.join(base, dir);

  const sortedFiles = readdirSync(directory).sort();

  sortedFiles.forEach((file) => {
    const fullPath = path.join(directory, file);

    // ✅ if dir is absolute, store relative to the scan root (directory)
    //    otherwise keep original behavior (join(dir, file))
    const relativePath = (
      isAbsDir ? path.relative(dir, fullPath) : path.join(dir, file)
    ).replace(/\\/g, "/");

    const pathForIgnore = "/" + relativePath.replace(/^\/*/, "");
    if (shouldIgnore(pathForIgnore, ignore)) return;

    if (statSync(fullPath).isDirectory()) {
      getAllFiles(base, {
        // ✅ if absolute, recurse using absolute path; else keep old join(dir, file)
        dir: isAbsDir ? fullPath : path.join(dir, file),
        files,
        ignore,
        fileTypes,
      });
    } else {
      if (fileTypes.length > 0 && !fileTypes.some((ext) => file.endsWith(ext))) {
        return;
      }
      files.push(relativePath);
    }
  });

  return files;
}
