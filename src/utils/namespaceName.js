/**
 * Turns a file path into a namespace name, relative to a root folder.
 * Accepts Windows, POSIX, and mixed slashes. index files map to their parent by default.
 * Segments that are not valid identifiers use bracket notation.
 *
 * @example namespaceName({ path: 'D:\\core\\js\\app/state/create.js', root: 'D:/core/js/app', namespace: 'app' }); // 'app.state.create'
 * @example namespaceName({ path: 'components/button/index.js', root: 'components', namespace: 'ui' }); // 'ui.button'
 * @param {Object} options
 * @param {string} options.path - The file (or folder) path.
 * @param {string} [options.root=''] - The folder the namespace starts at.
 * @param {string} options.namespace - The namespace for the root folder, such as 'app' or 'ui'.
 * @param {string|null} [options.fileType='js'] - Extension removed from the last segment. null keeps it.
 * @param {boolean} [options.indexIsParent=true] - Map index files to their parent namespace.
 * @returns {string} The namespace name, such as 'app.state.create'.
 */
export default function namespaceName({
	path,
	root = '',
	namespace,
	fileType = 'js',
	indexIsParent = true,
}) {

	const rootParts = String(root).replaceAll('\\', '/').split('/').filter(Boolean);
	const parts = String(path).replaceAll('\\', '/').split('/').filter(Boolean).slice(rootParts.length);
	const last = parts.length - 1;

	if (fileType && parts[last]?.endsWith(`.${fileType}`)) {

		parts[last] = parts[last].slice(0, -(fileType.length + 1));

	}

	if (indexIsParent && parts[last] === 'index') {

		parts.pop();

	}

	let name = namespace;

	parts.forEach((part) => {

		name += /^[A-Za-z_$][\w$]*$/.test(part) ? `.${part}` : `["${part}"]`;

	});

	return name;

}
