// example.test.js
import {
	expect, test 
} from 'vitest';
import utils from '../../index.js';

test('good uuid', () => {

	const id = utils.uuid();
	const x = utils.clean.uuid(id);

	expect(x).toBe(id);

});

test('bad uuid', () => {

	expect(utils.clean.uuid('2024-12-32')).toBe(null);
	expect(()=>utils.clean.uuid('2024-12-32', { required: true })).toThrow();

});