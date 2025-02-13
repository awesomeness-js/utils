import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import shouldIgnore from './utils/shouldIgnore.js';

export default function getAllFiles(base, dir, files = [], ignore = []) {
  const directory = join(base, dir);
  const normalizedDir = dir.replace(/\\/g, '/');
  if (ignore.some(pattern => normalizedDir.startsWith(pattern.replace(/\/\*$/, '')))) {
      return files;
  }
  const sortedFiles = readdirSync(directory).sort();
  sortedFiles.forEach(file => {
      const fullPath = join(directory, file);
      const relativePath = join(dir, file).replace(/\\/g, '/');
      if (shouldIgnore(relativePath, ignore)) {
          return;
      }
      if (statSync(fullPath).isDirectory()) {
          getAllFiles(base, join(dir, file), files, ignore);
      } else if (file.endsWith('.js') && !file.match(/\..*\./)) {
          files.push(relativePath);
      }
  });
  return files;
}