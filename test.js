import utils from './index.js';

let fileList2 = utils.getAllFiles('./test', {
   // fileTypes: ['.css'],
   // fileTypes: ['.js'],
   ignore: [
        "/ignoreFolder", 
        "/ignoreFolder2/", 
        "*.env",
        "*.test.js",
        "/css/*.js",
        "/js/*.css"
    ]
})

console.log({fileList2});

let md5Test = utils.md5('test');
console.log({md5Test});

let uuidTest = utils.uuid();
console.log({uuidTest});

let convertBytesTest = utils.convertBytes(1024);
console.log({convertBytesTest});

let isUUIDTest = utils.isUUID(uuidTest);
console.log({isUUIDTest});

let combineTest = utils.combineFiles('./src', 'js');
console.log('combineTest', combineTest.length);

let combineTestBrowser = utils.combineFiles('./src', 'js', { 
    moduleToBrowser: true 
});
console.log('combineTestBrowser', combineTestBrowser.length);

await utils.setLocalEnvs('./secrets/local.env');
console.log('localEnv', process.env.JUST_A_TEST);

await utils.setLocalEnvs('./secrets/dev.env');
console.log('localEnv', process.env.JUST_A_TEST);

const storedHash = utils.password.hash('mySecret123');
console.log('Stored Hash:', storedHash);
console.log('Is valid (correct password)?', utils.password.check('mySecret123', storedHash));
console.log('Is valid (wrong password)?', utils.password.check('wrongPassword', storedHash));


// Example 256-bit key for AES-256
// In real usage, store this securely (e.g., an environment variable or key vault).

const secretMessage = 'This is top secret!';
const encrypted = utils.encrypt(secretMessage);
console.log('Encrypted Data:', encrypted);

const decrypted = utils.decrypt(encrypted);
console.log('Decrypted Data:', decrypted);