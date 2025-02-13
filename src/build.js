/**
 * Builds a file from the specified source directory and writes it to the destination file.
 *
 * @param {Object} options - The options for the build process.
 * @param {string} [options.src='./src'] - The source directory to build from.
 * @param {string} [options.dest='./index.js'] - The destination file to write the built content to.
 * @param {boolean} [options.exportRoots=true] - Whether to export root files.
 * @param {string[]} [options.ignore=[]] - An array of file patterns to ignore.
 * @param {boolean} [options.includeComments=true] - Whether to include comments in the generated file.
 * @param {boolean} [options.dts=false] - Whether to generate TypeScript declaration files.
 * @returns {Promise<boolean>} A promise that resolves to true when the build is complete.
 */
import { writeFileSync } from 'fs';
import generateFile from './utils/generateFile.js';

async function build({
    src = './src',
    dest = './index.js',
    exportRoots = true,
    ignore = [],
    includeComments = true,
    dts = false
} = {}) {
    writeFileSync(dest, generateFile(src, exportRoots, ignore, includeComments, dts));
    return true;
}

export default build;
