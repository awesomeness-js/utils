import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import shouldIgnore from './utils/shouldIgnore.js';

export default function getAllFiles(base, {
	dir = '.',
	files = [], 
	ignore = [],
	fileTypes = []
} = {}) {

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

			getAllFiles(base, {
				dir: join(dir, file),
				files, 
				ignore
			});

		} else {

			if(fileTypes.length > 0) {
				if (!fileTypes.some(ext => file.endsWith(ext))) return;
			}

			files.push(relativePath);

		}

	});

	return files;

}