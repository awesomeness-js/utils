export default function cleanFile(file, {
	required = false,
	validTypes = [],
	minSize = false, // bytes
	maxSize = false, // bytes
} = {}) {

	try {
		if (!file || typeof file !== 'object') {
			throw {
				message: 'File must be an object (like req.file or File API object)',
				value: file
			};
		}

		if (typeof file.size !== 'number' || typeof file.type !== 'string') {
			throw {
				message: 'File object missing required fields (size, type)',
				value: file
			};
		}

		// type validation
		if (Array.isArray(validTypes) && validTypes.length > 0) {
			const isValidType = validTypes.some(t => file.type === t || file.name?.endsWith(t));
			if (!isValidType) {
				throw {
					message: `Invalid file type: ${file.type}`,
					allowed: validTypes,
					value: file.name || null
				};
			}
		}

		// size validation
		if (minSize !== false && file.size < minSize) {
			throw {
				message: `File is smaller than minimum size (${minSize} bytes)`,
				value: file.size
			};
		}

		if (maxSize !== false && file.size > maxSize) {
			throw {
				message: `File is larger than maximum size (${maxSize} bytes)`,
				value: file.size
			};
		}

		// return a normalized safe file info object
		return {
			name: file.name || null,
			type: file.type,
			size: file.size,
			lastModified: file.lastModified ? new Date(file.lastModified).toISOString() : null,
		};

	} catch (e) {
		if (required) throw e;
		else return null;
	}
}