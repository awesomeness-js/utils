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