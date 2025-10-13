export default function cleanBuffer(fileObj, {
	required = false,
	validTypes = [],  // ['image/png', '.jpg']
	minSize = false,  // bytes
	maxSize = false,  // bytes
} = {}) {

	try {
		if (
			!fileObj ||
			typeof fileObj !== 'object' ||
			!(fileObj.buffer instanceof Buffer)
		) {
			throw {
				message: 'Invalid buffer object (expected Busboy fileObj)',
				value: fileObj
			};
		}

		const { buffer, filename, mimeType, totalSize } = fileObj;
		const size = totalSize ?? buffer.length;

		// basic fields check
		if (typeof size !== 'number' || !mimeType) {
			throw {
				message: 'Missing required fields (mimeType, size)',
				value: fileObj
			};
		}

		// type validation
		if (Array.isArray(validTypes) && validTypes.length > 0) {
			const isValidType = validTypes.some(t =>
				mimeType === t || (filename && filename.endsWith(t))
			);

			if (!isValidType) {
				throw {
					message: `Invalid buffer type: ${mimeType}`,
					allowed: validTypes,
					value: filename || null
				};
			}
		}

		// size validation
		if (minSize !== false && size < minSize) {
			throw {
				message: `Buffer smaller than minimum size (${minSize} bytes)`,
				value: size
			};
		}

		if (maxSize !== false && size > maxSize) {
			throw {
				message: `Buffer larger than maximum size (${maxSize} bytes)`,
				value: size
			};
		}

		// normalized safe object
		return {
			name: filename || null,
			type: mimeType,
			size,
			encoding: fileObj.encoding || null,
			createdAt: new Date().toISOString(),
		};

	} catch (e) {
		if (required) throw e;
		return null;
	}
}
