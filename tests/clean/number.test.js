// example.test.js
import {
	expect, test 
} from 'vitest';
import utils from '../../index.js';

let x = 1;
let y = 1.2;
let z = '102';
let z2 = '102.45';
let bad = 'bad';

test('number - 1', () => {

	expect(utils.clean.number(x)).toBe(1);

});

test('number - 1.2', () => {

	expect(utils.clean.number(y)).toBe(1.2);

});

test('number as string - 102', () => {

	expect(utils.clean.number(z)).toBe(102);

});

test('number - string to 102', () => {

	expect(utils.clean.number(z, { required: true })).toBe(102);

});

test('number - string to 102.45', () => {

	console.log(utils.clean.number(z2));
	expect(utils.clean.number(z2, { required: true })).toBe(102.45);

});

test('number as string - bad to null', () => {

	expect(utils.clean.number(bad)).toBe(null);

});

test('number as string - bad to throw', () => {

	expect(()=> utils.clean.number(bad, { required: true }) ).toThrow();

});

test('number is too high', () => {

	expect(()=> utils.clean.number(100, {
		min: 1,
		max: 10,
		required: true 
	}) ).toThrow();
	expect(()=> utils.clean.number(100.11, {
		min: 1,
		max: 100.1,
		required: true 
	}) ).toThrow();

});

test('number is too low', () => {

	expect(()=> utils.clean.number(0, {
		min: 1,
		max: 10,
		required: true 
	}) ).toThrow();
	expect(()=> utils.clean.number(1.2, {
		min: 1.3,
		max: 10,
		required: true 
	}) ).toThrow();

});

