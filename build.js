import build from './src/build.js';

build({
    src: './src',
    dest: './index.js',
    ignore: [
        'ignoreMe.js',
        'ignoreFolder/*',
    ],
});