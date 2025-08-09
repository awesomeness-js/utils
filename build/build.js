import build from '../src/build.js';

const time1 = Date.now();

console.log('Building...');

build({
	src: './src',
	dest: './index.js',
	dts: false,
	ignore: [
		'ignoreMe.js',
		'ignoreFolder/*',
		//'namespaceExample/*',
	],
	hotModuleReload: false
});

const time2 = Date.now();

console.log(`Build completed in ${time2 - time1}ms`);

build({
	src: './schemas',
	dest: './schemas.js',
	dts: false
});