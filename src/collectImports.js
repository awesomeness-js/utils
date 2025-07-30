import fs from 'fs';
import path from 'path';
import md5 from './md5.js';
import each from './each.js';


function collectImports(filePath, seen = new Set(), collected = []) {
  
	const fullPath = path.resolve(filePath);
 
	if (seen.has(fullPath)) return;
	seen.add(fullPath);

	const code = fs.readFileSync(fullPath, 'utf-8');
	const hash = md5(code);

	collected.push({ 
		fullPath, 
		hash,
		code,
	});

	const importRegex = /import\s+.*?['"](.+?)['"];?/g;
	let match;

	while ((match = importRegex.exec(code)) !== null) {

		const importPath = match[1];

		// Skip package imports (non-relative paths)
		if (!importPath.startsWith('.')) continue;

		const resolved = resolveImport(path.dirname(fullPath), importPath);

		if (resolved) collectImports(resolved, seen, collected);
	
	}

	return collected;

}

function findProjectRoot(from = process.cwd()) {

	let currentPath = from;

	while (true) {

		if (fs.existsSync(path.join(currentPath, 'package.json'))) {

			return currentPath;
		
		}

		const parent = path.dirname(currentPath);


		if (parent === currentPath) {

			throw new Error('Project root not found (no package.json)');
		
		}

		currentPath = parent;
	
	}

}


function resolveImport(baseDir, importPath) {

	const candidates = [
		importPath,
		`${importPath}.js`,
		`${importPath}.css`,
		path.join(importPath, 'index.js'),
		path.join(importPath, 'index.css'),
	];

	for (const candidate of candidates) {

		const full = path.resolve(baseDir, candidate);


		if (fs.existsSync(full) && fs.statSync(full).isFile()) {

			return full;
		
		}
	
	}

	return null;

}

function jsName( file ){

	return file.rootPath
		.replace('.'+file.type, '')
		.replaceAll('/', '.');

}

function cssName( file ){

	return file.rootPath
		.replace('.'+file.type, '')
		.replaceAll('/', '_');

}

function run(filePath, {
	returnCode = true,
	jsMaps = {},
	cssMaps = {}
} = {}){

	const root = findProjectRoot(__dirname);

	const imports = collectImports(filePath);

	imports.forEach((file) => {
    
		const rootPath = path.relative(root, file.fullPath).replace(/\\/g, '/');

		file.rootPath = rootPath;

		// strip file type
		const fileType = rootPath.split('.').pop();

		file.type = fileType;

		if(fileType === 'js'){
      
			file.name = jsName(file);

			if(Object.keys(jsMaps).length){
        
				each(jsMaps,( v, k ) => {

					file.name = file.name.replace(k.replace(/\.\//g, ''),v);
				
				});

			}

			if(returnCode){

				file.code = file.code.replace(/import\s+.*?['"](.+?)['"];?/g, '').replace('export default', `${file.name} =`);
			
			} else {

				delete file.code;
			
			}
      

		}

		if(fileType === 'css'){

			file.name = cssName(file);

			if(Object.keys(cssMaps).length){
        
				each(cssMaps,( v, k ) => {

					file.name = file.name.replace(k.replace(/\.\//g, ''),v);
				
				});

			}

			if(returnCode){

				file.code = file.code.replace(/import\s+.*?['"](.+?)['"];?/g, '');
			
			} else {

				delete file.code;
			
			}


		}

	});

	return imports;

}

export default run;
