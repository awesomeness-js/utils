// example.test.js
import {
	expect, test 
} from 'vitest';
import utils from '../../index.js';

const testStringArray = [ 'a', 'b', 'c' ];
const testIntegerArray = [ 1, 2, 3, 4, 5 ];
const testBooleanArray = [ true, false, true, false ];

const testArrayOfArraysOfIntegers = [
	testIntegerArray,
	testIntegerArray,
	testIntegerArray
];

const testArrayOfArraysOfStrings = [
	testStringArray,
	testStringArray,
	testStringArray
];

const schemaForStrings = {
	type: 'array',
	items: {
		type: 'string'
	}
};

const schemaForIntegers = {
	type: 'array',
	items: {
		type: 'integer'
	}
};


const schemaForBooleans = {
	type: 'array',
	items: {
		type: 'boolean'
	}
};

const schemaForArrayOfArrays_integers = {
	type: 'array',
	items: {
		type: 'array',
		items: { type: 'integer' }
	}
};

const schemaForArrayOfArrays_strings = {
	type: 'array',
	items: {
		type: 'array',
		items: { type: 'string' }
	}
};

const testObject = {
	stringProp: 'a string',
	integerProp: 42,
	numberProp: 3.14,
	booleanProp: true,
	timestampProp: new Date().toISOString(),
	uuidProp: utils.uuid(), // generate a valid UUID
};

const arrayOfObjects = [
	{ ...testObject },
	{ ...testObject },
	{ ...testObject }
];

const objSchema = {
	type: 'object',
	properties: {
		stringProp: {
			type: 'string',
			required: true 
		},
		integerProp: {
			type: 'integer',
			required: true 
		},
		numberProp: {
			type: 'number',
			required: true 
		},
		booleanProp: {
			type: 'boolean',
			required: true 
		},
		timestampProp: {
			type: 'timestamp',
			required: true 
		},
		uuidProp: {
			type: 'uuid',
			required: true 
		},
		optionalStringProp: {
			type: 'string',
			required: false 
		},
		optionalIntegerProp: {
			type: 'integer',
			required: false 
		},
		optionalNumberProp: {
			type: 'number',
			required: false 
		},
		optionalBooleanProp: {
			type: 'boolean',
			required: false 
		},
		optionalTimestampProp: {
			type: 'timestamp',
			required: false 
		},
		optionalUuidProp: {
			type: 'uuid',
			required: false 
		}
	},
};


const schemaForArrayOfObjects = {
	type: 'array',
	required: true,
	items: {
		... objSchema,
	}
};

test('testStringArray', () => {

	const x = utils.clean.array(testStringArray, schemaForStrings);

	expect(x).toStrictEqual(testStringArray);

});

test('testIntegerArray', () => {

	const x = utils.clean.array(testIntegerArray, schemaForIntegers);

	expect(x).toStrictEqual(testIntegerArray);

});

test('testBooleanArray', () => {

	const x = utils.clean.array(testBooleanArray, schemaForBooleans);

	expect(x).toStrictEqual(testBooleanArray);

});

test('testBooleanArray but pass different schema', () => {

	expect(()=> utils.clean.array(testBooleanArray, {
		... schemaForIntegers,
		required: true 
	}) ).toThrow();

});

test('schemaForArrayOfArrays_integers', () => {

	const x = utils.clean.array(testArrayOfArraysOfIntegers, schemaForArrayOfArrays_integers);

	expect(x).toStrictEqual(testArrayOfArraysOfIntegers);

});

test('schemaForArrayOfArrays_strings', () => {

	const x = utils.clean.array(testArrayOfArraysOfStrings, schemaForArrayOfArrays_strings);

	expect(x).toStrictEqual(testArrayOfArraysOfStrings);

});

test('schemaForArrayOfArrays_strings wrong type', () => {

	const x = utils.clean.array(testArrayOfArraysOfStrings, schemaForArrayOfArrays_integers);

	expect(x).toBe(null);

});

test('schemaForArrayOfObjects', () => {

	const x = utils.clean.array(arrayOfObjects, schemaForArrayOfObjects);

	expect(x).toStrictEqual(arrayOfObjects);   

});