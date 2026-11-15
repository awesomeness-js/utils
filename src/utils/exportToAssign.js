/**
 * Turns the first line-anchored `export default` into an assignment to name.
 * Covers functions, async functions, arrows, and objects with one replace.
 * `export default` in the middle of a line (comments, strings) is left alone.
 *
 * @example exportToAssign({ content: 'export default function(){}', name: 'app.state.get' }); // 'app.state.get = function(){}'
 * @param {Object} options
 * @param {string} options.content - The file content.
 * @param {string} options.name - The name to assign, such as 'app.state.get'.
 * @returns {string} The content with the default export assigned to name.
 */
export default function exportToAssign({
	content,
	name,
}) {

	return String(content).replace(/^export default\s+/m, () => {

		return `${name} = `;

	});

}
