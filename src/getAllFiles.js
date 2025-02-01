import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath = './', arrayOfFiles = []){

  const items = fs.readdirSync(dirPath);

  items.forEach((item) => {
    const fullPath = path.resolve(dirPath, item);

    if (fs.statSync(fullPath).isDirectory()) {
      // Recurse into the directory
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      // Add only files
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;

};

export default getAllFiles;