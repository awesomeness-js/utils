// example.test.js
import {
	expect, test 
} from 'vitest';

import { password } from '../index.js';

test('test named export', () => {

	expect(password.check).toBeDefined();
	expect(password.hash).toBeDefined();

});