import { readFileSync } from 'fs';
import exportToAssign from './exportToAssign.js';
import stripImports from './stripImports.js';

/**
 * Reads one file for combineFiles({ namespace }) and assigns its default export to name.
 * Order: strip imports (if enabled), assign the default export, then run processContent.
 *
 * @param {Object} options
 * @param {string} options.path - The file path.
 * @param {string} options.name - The namespace name, such as 'app.state.create'.
 * @param {Object} options.options - The combineFiles namespace options.
 * @returns {string} The file content ready to concatenate.
 */
export default function namespaceFile({
	path,
	name,
	options,
}) {

	let content = readFileSync(path, 'utf8');

	if (options.stripImports) {

		content = stripImports(content);

	}

	content = exportToAssign({
		content,
		name,
	});

	if (typeof options.processContent === 'function') {

		content = options.processContent({
			content,
			path,
			name,
		});

	}

	return content;

}
