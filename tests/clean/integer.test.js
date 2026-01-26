// example.test.js
import { expect, test } from 'vitest';
import utils from '../../index.js';

let x = 1;
let y = 1.2;
let z = '102';
let z2 = '102.45';
let z3 = 102.45;

test('integer - 1', () => {

	expect(utils.clean.integer(x)).toBe(1);

});

test('integer - null', () => {

	expect(utils.clean.integer(y)).toBe(null);

});


test('integer as string - 102', () => {

	expect(utils.clean.integer(z)).toBe(102);

});

test('integer - NOT to throw - 102', () => {

	expect(() => utils.clean.integer(z, { required: true })).not.toThrow();

});

test('integer - to throw', () => {

	expect(() => utils.clean.integer(y, { required: true })).toThrow();

});

test('integer - to throw - "102.45"', () => {

	expect(() => utils.clean.integer(z2, { required: true })).toThrow();

});

test('integer - to throw - 102.45', () => {

	console.log(utils.clean.integer(z3));
	expect(() => utils.clean.integer(z3, { required: true })).toThrow();

});
