import build from '../src/build.js';
build({ 
	src: './src', 
	dest: './types/index.d.ts', 
	dts: true,
	ignore: [
		'ignoreMe.js',
		'ignoreFolder/*',
		//'namespaceExample/*',
	],
});
