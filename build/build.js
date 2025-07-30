import build from '../src/build.js';

build({
	src: './src',
	dest: './index.js',
	dts: false,
	ignore: [
		'ignoreMe.js',
		'ignoreFolder/*',
		//'namespaceExample/*',
	],
});

build({
	src: './schemas',
	dest: './schemas.js',
	dts: false
});