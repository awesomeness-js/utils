// example.test.js
import { expect, test } from 'vitest';
import utils from '../../index.js';

let x = true;
let y = false;
let z = 1;

test('boolean - true', () => {

	expect(utils.clean.boolean(x)).toBe(true);

});

test('boolean - false', () => {

	expect(utils.clean.boolean(y)).toBe(false);

});

test('boolean - number', () => {

	expect(utils.clean.boolean(z)).toBe(null);

});

test('boolean - NOT to throw', () => {

	expect(() => utils.clean.boolean(y, { required: true })).not.toThrow();

});

test('boolean - to throw', () => {

	expect(() => utils.clean.boolean(z, { required: true })).toThrow();

});