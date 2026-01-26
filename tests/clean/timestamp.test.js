// example.test.js
import { expect, test } from 'vitest';
import utils from '../../index.js';

test('good timestamp', () => {

	const x = utils.clean.timestamp('2024-12-30');

	expect(x).toBe('2024-12-30T00:00:00.000Z');

});

test('bad timestamp', () => {

	expect(utils.clean.timestamp('2024-12-32')).toBe(null);
	expect(()=>utils.clean.timestamp('2024-12-32', { required: true })).toThrow();

});