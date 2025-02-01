import utils from './index.js';

let fileList = utils.getAllFiles('./src');
console.log({fileList});

let md5Test = utils.md5('test');
console.log({md5Test});

let uuidTest = utils.uuid();
console.log({uuidTest});

let isUUIDTest = utils.isUUID(uuidTest);
console.log({isUUIDTest});

let combineTest = utils.combineFiles('./src', 'js');
console.log('combineTest', combineTest.length);

let combineTestBrowser = utils.combineFiles('./src', 'js', { moduleToBrowser: true });
console.log('combineTestBrowser', combineTestBrowser.length);