import { writeFileSync } from 'node:fs';
import path from 'node:path';
import generateFile from './utils/generateFile.js';
import writeHotWrapper from './utils/writeHotWrapper.js';


async function build({
	src = './src',
	dest = './index.js',            // consumers import this always
	exportRoots = true,
	ignore = [],
	includeComments = true,
	dts = false,
	useTabs = true,
	hotModuleReload = false,
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

	if (hotModuleReload) buildHot(); else buildCold();

	if (hotModuleReload) {

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
			
			}, 50);
		
		});
	
	}

	return true;

}

export default build;
