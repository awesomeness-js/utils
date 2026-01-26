// example.test.js
import { expect, test } from 'vitest';
import utils from '../index.js';


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
});

test('file list of 3', () => {

	expect(fileList2.length).toBe(4); // Adjust this number based on your test folder contents

});
