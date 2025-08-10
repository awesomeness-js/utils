import build from '../src/build.js';

build({
	src: './src',
	dest: './index.js',
	dts: false,
	hotModuleReload: false,
	hotCallback: (file) => {

		console.log(`[build callback] processed ${file}`);

	},
	ignore: [
		'ignoreMe.js',
		'ignoreFolder/*',
	],
});

build({
	src: './schemas',
	dest: './schemas.js',
	dts: false
});