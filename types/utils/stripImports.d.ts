/**
 * Removes line-anchored static import statements (single or multi-line).
 * Browser bundles get their globals (ui, app) from the page, not from imports.
 *
 * @example stripImports("import ui from '#ui';\nexport default 1;"); // 'export default 1;'
 * @param {string} content - The file content.
 * @returns {string} The content without import statements.
 */
export default function stripImports(content: string): string;
