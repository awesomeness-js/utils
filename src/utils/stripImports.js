/**
 * Removes line-anchored static import statements (single or multi-line).
 * Browser bundles get their globals (ui, app) from the page, not from imports.
 *
 * @example stripImports("import ui from '#ui';\nexport default 1;"); // 'export default 1;'
 * @param {string} content - The file content.
 * @returns {string} The content without import statements.
 */
export default function stripImports(content) {

	const fromImport = /^import\s[^;'"]*?\sfrom\s*(['"])[^'"\n]+\1;?[^\S\n]*\r?\n?/gm;
	const bareImport = /^import\s*(['"])[^'"\n]+\1;?[^\S\n]*\r?\n?/gm;

	return String(content).replace(fromImport, '').replace(bareImport, '');

}
