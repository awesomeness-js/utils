import {
	readdirSync, statSync 
} from 'fs';
import { join } from 'path';
import shouldIgnore from './shouldIgnore.js';

export default function getAllFiles(base, {
	dir = '.',
	files = [], 
	ignore = [],
	fileTypes = []
} = {}) {

	const directory = join(base, dir);

	const sortedFiles = readdirSync(directory).sort();

	sortedFiles.forEach((file) => {

		const fullPath = join(directory, file);
		// 1) Generate the original "relative path"
		const relativePath = join(dir, file).replace(/\\/g, '/');

		// 2) Prepend a slash so patterns like "/css/*.js" will match "/css/some.js"
		const pathForIgnore = '/' + relativePath.replace(/^\/*/, '');

		// 3) Check with the leading slash path
		if (shouldIgnore(pathForIgnore, ignore)) {

			return;
		
		}

		// Recurse if it's a directory
		if (statSync(fullPath).isDirectory()) {

			getAllFiles(base, {
				dir: join(dir, file),
				files,
				ignore,
				fileTypes
			});
		
		} else {

			// Filter by file types if specified
			if (fileTypes.length > 0 && !fileTypes.some((ext) => file.endsWith(ext))) {

				return;
			
			}

			// 4) Store the original relative path (without leading slash) in `files` if you prefer
			files.push(relativePath);
		
		}
	
	});

	return files;

}
