export default function shouldIgnore(filePath, ignorePatterns) {

	const normalizePath = (p) => {

		let v = String(p).replace(/\\/g, '/');      // Windows → POSIX

		v = v.replace(/^\.\/+/, '');                // strip leading ./
		v = v.replace(/\/+/g, '/');                 // collapse multiple slashes
		// if the path includes /src/, make it relative to src
		v = v.replace(/^.*\/src(\/|$)/, '/');       // ".../src/foo" → "/foo"
		if (!v.startsWith('/')) v = '/' + v;        // ensure leading slash
		// strip trailing slash except for root
		if (v.length > 1 && v.endsWith('/')) v = v.slice(0, -1);
		
		return v.toLowerCase();                     // case-insensitive
	
	};

	const normalizePattern = (p) => {

		let v = String(p).replace(/\\/g, '/').replace(/^\.\/+/, '').replace(/\/+/g, '/');

		if (!v.includes('*') && !v.includes('.') && !v.endsWith('/')) v += '/';
		if (!v.startsWith('/')) v = '/' + v;
		
		return v.toLowerCase();                     // case-insensitive
	
	};

	const pathCandidates = (() => {

		const p = normalizePath(filePath);
		const noSrc = String(filePath).replace(/\\/g, '/').replace(/^\.\/+/, '');
		const alt = (noSrc.startsWith('/') ? noSrc : '/' + noSrc).toLowerCase();

    
		return Array.from(new Set([ p, alt ]));
	
	})();

	const matches = (fp, pat) => {

		// 1) "*.ext" anywhere
		if (/^\/\*\.[^/]+$/.test(pat)) {

			const ext = pat.slice(2); // "*.js" -> ".js"

      
			return fp.endsWith(ext);
		
		}

		// 2) "folder/*" => only immediate children (no subfolders)
		if (pat.endsWith('/*')) {

			const base = pat.slice(0, -2);

      
			return fp.startsWith(base + '/') && !fp.slice(base.length + 1).includes('/');
		
		}

		// 3) "folder/*.ext" => files with ext in that folder (no subfolders)
		if (pat.includes('/*')) {

			const [ base, tail ] = pat.split('/*');

      
			return fp.startsWith(base + '/') &&
             fp.endsWith(tail) &&
             !fp.slice(base.length + 1).includes('/');
		
		}

		// 4) Plain directory "folder/" => whole dir + subdirs
		if (pat.endsWith('/')) {

			const base = pat.slice(0, -1);

      
			return fp === base || fp.startsWith(base + '/');
		
		}

		// 5) Exact file
		return fp === pat;
	
	};

	return ignorePatterns.some((raw) => {

		const pat = normalizePattern(raw);

    
		return pathCandidates.some((fp) => matches(fp, pat));
	
	});

}
