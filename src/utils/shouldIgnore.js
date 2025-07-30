export default function shouldIgnore(filePath, ignorePatterns) {

	// filePath is already something like "/css/some.js" 
	return ignorePatterns.some((pattern) => {

		// pattern might be "/css/*.js" or "/ignoreFolder", etc.
		let normalizedPattern = pattern.replace(/\\/g, '/');

		// 1) Full directory ignore: "/ignoreFolder" => ignore "/ignoreFolder" + subdirectories
		//    If the pattern ends with "/", treat it as a directory path.
		if (!normalizedPattern.includes('*')) {

			// e.g. "/ignoreFolder/"
			if (normalizedPattern.endsWith('/')) {

				normalizedPattern = normalizedPattern.slice(0, -1); // remove trailing slash
			
			}

			return filePath === normalizedPattern || filePath.startsWith(normalizedPattern + '/');
		
		}

		// 2) folder/* => Ignore all immediate children in that folder (no subfolders)
		if (normalizedPattern.endsWith('/*')) {

			const baseFolder = normalizedPattern.slice(0, -2); // e.g. "/css"
			// e.g. filePath === "/css/some.js" => startsWith("/css/")
			// But also ensure there's no further subfolder.

			return filePath.startsWith(baseFolder + '/') &&
                   !filePath.slice(baseFolder.length + 1).includes('/');
		
		}

		// 3) *.ext => extension-based ignore (any folder)
		if (normalizedPattern.startsWith('*.')) {

			const ext = normalizedPattern.slice(1); // remove '*'

            
			return filePath.endsWith(ext);
		
		}

		// 4) folder/*.ext => only files with that extension in that folder (no subfolders)
		if (normalizedPattern.includes('/*')) {

			const [ baseFolder, ext ] = normalizedPattern.split('/*');

            
			return filePath.startsWith(baseFolder + '/') &&
                   filePath.endsWith(ext) &&
                   !filePath.slice(baseFolder.length + 1).includes('/');
		
		}

		// 5) Exact match
		return filePath === normalizedPattern;
	
	});

}
