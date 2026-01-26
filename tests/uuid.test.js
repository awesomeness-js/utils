// example.test.js
import { expect, test } from 'vitest';
import utils from '../index.js';

let uuid = utils.uuid();
let isValid = utils.isUUID(uuid);

test('uuid create', () => {

	expect(uuid).toBeDefined();
	expect(uuid.length).toBe(36);

});

test('uuid isValid', () => {

	expect(isValid).toBe(true);

});