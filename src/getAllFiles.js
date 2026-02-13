import { readdirSync, statSync } from "fs";
import path from "path";
import shouldIgnore from "./shouldIgnore.js";

export default function getAllFiles(base, {
	dir = ".",
	files = [],
	ignore = [],
	fileTypes = [],
	root,
} = {}) {

	const isAbsDir = path.isAbsolute(dir);

	// If scanning absolute paths, keep a stable root for relative paths
	const scanRoot = root ?? (isAbsDir ? dir : path.join(base, dir));

	// Resolve the directory we are currently reading
	const directory = isAbsDir ? dir : path.join(base, dir);

	const sortedFiles = readdirSync(directory).sort();

	sortedFiles.forEach((file) => {

		const fullPath = path.join(directory, file);

		// Always store relative to scanRoot when working with absolute paths
		const relativePath = (
			isAbsDir
				? path.relative(scanRoot, fullPath)
				: path.join(dir, file)
		).replace(/\\/g, "/");

		const pathForIgnore = "/" + relativePath.replace(/^\/*/, "");

		if (shouldIgnore(pathForIgnore, ignore)) return;

		if (statSync(fullPath).isDirectory()) {

			getAllFiles(base, {
				dir: isAbsDir ? fullPath : path.join(dir, file),
				files,
				ignore,
				fileTypes,
				root: scanRoot, // PASS ROOT DOWN
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
