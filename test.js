import utils from './index.js';

let fileList = utils.getAllFiles('./src');
console.log(fileList);

let md5Test = utils.md5('test');
console.log(md5Test);