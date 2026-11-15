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
export default function combineNamespacedDir(dir: string, namespace: string, options: any): string;
