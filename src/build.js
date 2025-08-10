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
import writeHotWrapper from './utils/writeHotWrapper.js';

async function build({
	src = './src',
	dest = './index.js',
	exportRoots = true,
	ignore = [],
	includeComments = true,
	dts = false,
	useTabs = true,
	hotModuleReload = false,
	hotCallback = null,
	hotSource = './hot-source.js'   // generated only when hot is enabled
} = {}) {

	const gen = () => generateFile({
		src,
		exportRoots,
		ignore,
		includeComments,
		dts,
		useTabs 
	});

	const buildHot = () => {

		// 1) write payload that the wrapper imports
		writeFileSync(hotSource, gen());
		console.log(`[build] wrote ${hotSource}`);
		
		// 2) ensure index.js is a hot wrapper
		writeHotWrapper({
			dest,
			hotSource 
		});

		console.log(`[build] ensured hot wrapper ${dest}`);
	
	};

	const buildCold = () => {

		// single-file classic output (no second file)
		writeFileSync(dest, gen());
		console.log(`[build] wrote ${dest}`);
	
	};

	if (hotModuleReload) {

		buildHot();

		// watch only src; each change regenerates hot-source.js (wrapper auto-reloads it)
		const chokidar = (await import('chokidar')).default;

		console.log(`[build] watching ${src} for changes...`);
		const watcher = chokidar.watch(src, {
			ignoreInitial: true,
			ignored: ignore 
		});

		let timeout;

		watcher.on('all', (_event, file) => {

			clearTimeout(timeout);
			timeout = setTimeout(() => {

				console.log(`[build] change detected in ${file}, rebuilding payload...`);
				writeFileSync(hotSource, gen());

				if(typeof hotCallback === 'function') {

					hotCallback(file);
				
				}

				console.log(`[build] ready.`);
			
			}, 50);
		
		});
	
	} else {

		buildCold();

	}
	
	return true;

}

export default build;
