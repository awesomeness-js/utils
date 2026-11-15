import { readdirSync, statSync } from 'fs';
import namespaceName from './namespaceName.js';
import namespaceInits from './namespaceInits.js';
import namespaceFile from './namespaceFile.js';

/**
 * Combines a folder for combineFiles({ namespace }): each file's default export
 * is assigned to a name built from its path and file name.
 * The index file comes first in each folder so a parent function exists before its children.
 *
 * @param {string} dir - The folder to combine.
 * @param {string} namespace - The namespace for this folder.
 * @param {Object} options - fileType, indexIsParent, parentInits, stripImports, processContent.
 * @returns {string} The combined content.
 */
export default function combineNamespacedDir(dir, namespace, options) {

	const indexFile = `index.${options.fileType}`;
	const entries = readdirSync(dir).sort();
	let out = '';

	if (options.indexIsParent && entries.includes(indexFile)) {

		entries.splice(entries.indexOf(indexFile), 1);
		entries.unshift(indexFile);

	}

	entries.forEach((entry) => {

		const path = `${dir}/${entry}`;
		const isDir = statSync(path).isDirectory();

		if (!isDir && entry.split('.').pop() !== options.fileType) {

			return;

		}

		const name = namespaceName({
			path,
			root: dir,
			namespace,
			fileType: isDir ? null : options.fileType,
			indexIsParent: !isDir && options.indexIsParent,
		});

		if (!isDir) {

			out += namespaceFile({
				path,
				name,
				options,
			}) + " \n ";

			return;

		}

		const children = combineNamespacedDir(path, name, options);

		// folders with no matching files add nothing, not even an init line
		if (children && options.parentInits) {

			out += namespaceInits({
				name,
				base: namespace,
			});

		}

		out += children;

	});

	return out;

}
