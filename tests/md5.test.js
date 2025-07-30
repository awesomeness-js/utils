// example.test.js
import {
	expect, test 
} from 'vitest';
import utils from '../index.js';
let md5Test = utils.md5('test');

test('md5 test', () => {

	expect(md5Test).toBe('098f6bcd4621d373cade4e832627b4f6');

});