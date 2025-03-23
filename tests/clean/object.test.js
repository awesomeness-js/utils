// example.test.js
import { expect, test } from 'vitest'
import utils from '../../index.js';

const testObject = {
    stringProp: 'a string',
    integerProp: 42,
    numberProp: 3.14,
    booleanProp: true,
    timestampProp: new Date().toISOString(),
    uuidProp: utils.uuid(), // generate a valid UUID
};

const invalidTestObject = {
    stringProp: 123, // should be a string
    integerProp: 'not an integer', // should be an integer
    numberProp: 'not a number', // should be a number
    booleanProp: 'not a boolean', // should be a boolean
    timestampProp: 'not a timestamp', // should be a timestamp
    uuidProp: 'not a uuid', // should be a uuid
    optionalStringProp: 456, // should be a string
    optionalIntegerProp: 'not an integer', // should be an integer
    optionalNumberProp: 'not a number', // should be a number
    optionalBooleanProp: 'not a boolean', // should be a boolean
    optionalTimestampProp: 'not a timestamp', // should be a timestamp
    optionalUuidProp: 'not a uuid' // should be a uuid
};

const testObject2 = {
    obj1: { ...testObject },
    obj2: { ...testObject }
};

const invalidTestObject2 = {
    obj1: { ...invalidTestObject },
    obj2: { ...invalidTestObject }
};

const schema = {
    type: 'object',
    properties: {
        stringProp: { type: 'string', required: true },
        integerProp: { type: 'integer', required: true },
        numberProp: { type: 'number', required: true },
        booleanProp: { type: 'boolean', required: true },
        timestampProp: { type: 'timestamp', required: true },
        uuidProp: { type: 'uuid', required: true },
        optionalStringProp: { type: 'string', required: false },
        optionalIntegerProp: { type: 'integer', required: false },
        optionalNumberProp: { type: 'number', required: false },
        optionalBooleanProp: { type: 'boolean', required: false },
        optionalTimestampProp: { type: 'timestamp', required: false },
        optionalUuidProp: { type: 'uuid', required: false }
    },
};

const schema2 = {
    type: 'object',
    properties: {
        obj1: {
            type: 'object',
            required: true,
            properties: { ... schema.properties }
        },
        obj2: {
            type: 'object',
            required: true,
            properties: { ... schema.properties }
        }
    },
};

test('testObject', () => {
    try {
        const cleanedObject = utils.clean.object(testObject, schema);
        expect(cleanedObject).toStrictEqual(testObject);
    } catch (error) {
        console.error('Error cleaning object:', error);
        throw error; // rethrow to fail the test
    }
});

test('invalidTestObject', () => {
    try {
        const cleanedObject = utils.clean.object(invalidTestObject, schema);
        //console.log({ cleanedObject })
        expect(cleanedObject).toStrictEqual(invalidTestObject);
    } catch (error) {
        //console.error('Error cleaning object:', error);
        expect(error.message).toBe('type invalid');
    }
});

test('testObject2', () => {
    try {
        const cleanedObject = utils.clean.object(testObject2, schema2);
        //console.log('cleanedObject', cleanedObject);
        expect(cleanedObject).toStrictEqual(testObject2);
    } catch (error) {
        console.error('Error cleaning object:', error);
        throw error; // rethrow to fail the test
    }
});


test('incorrect should throw', () => {
    expect(()=> utils.clean.object(testObject, schema2)).toThrow();
});