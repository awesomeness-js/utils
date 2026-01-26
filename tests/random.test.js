import { expect, test } from 'vitest';
import utils from '../index.js';
import schemas from '../schemas.js';

// string
test('should create a random string', () => {

	const randomString = utils.random.string({ minLength: 5, maxLength: 10 });

	console.log('Generated random string:', randomString);

	expect(randomString.length).toBeGreaterThanOrEqual(5);
	expect(randomString.length).toBeLessThanOrEqual(10);

});

// array value
test('should create a random array value', () => {
	const sampleArray = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

	const randomValue = utils.random.arrayValue(sampleArray);
	console.log('Generated random array value:', randomValue);

	expect(sampleArray).toContain(randomValue);

});

// boolean
test('should create a random boolean', () => {
	const randomBoolean = utils.random.boolean();
	console.log('Generated random boolean:', randomBoolean);
	expect(typeof randomBoolean).toBe('boolean');
});

// integer
test('should create a random integer', () => {
	const randomInteger = utils.random.integer({ min: 10, max: 20 });
	console.log('Generated random integer:', randomInteger);

	expect(randomInteger).toBeGreaterThanOrEqual(10);
	expect(randomInteger).toBeLessThanOrEqual(20);
});

// number
test('should create a random number', () => {
  const decimalPlaces = 3;
  const randomNumber = utils.random.number({
    min: 1.5,
    max: 5.5,
    decimalPlaces
  });

  console.log('Generated random number:', randomNumber);

  expect(randomNumber).toBeGreaterThanOrEqual(1.5);
  expect(randomNumber).toBeLessThanOrEqual(5.5);

  const decimals =
    Number.isInteger(randomNumber)
      ? 0
      : randomNumber.toString().split('.')[1].length;

  expect(decimals).toBeLessThanOrEqual(decimalPlaces);
});

// timestamp
test('should create a random timestamp', () => {

	const randomTimestamp = utils.random.timestamp({ 
		maxDays: 10,
		minDays: 5,
		future: true
	});

	console.log('Generated random timestamp:', randomTimestamp);

	const randomTimestampPast = utils.random.timestamp({ 
		maxDays: 10,
		minDays: 5,
		future: false
	});

	console.log('Generated random past timestamp:', randomTimestampPast);

	// should be an ISO string
	expect(new Date(randomTimestamp).toISOString()).toBe(randomTimestamp);
	expect(new Date(randomTimestampPast).toISOString()).toBe(randomTimestampPast);

});

// uuid
test('should create a random UUID', () => {
	const randomUUID = utils.random.uuid();
	console.log('Generated random UUID:', randomUUID);
	expect(utils.isUUID(randomUUID)).toBe(true);
});

// object
test('should create a random object based on schema1', () => {

	const randomObject = utils.random.object(schemas.schema1);
	console.log('Generated random object (schema1):', randomObject);
	expect(typeof randomObject).toBe('object');

	expect(typeof randomObject.exampleId).toBe('string');
	expect(Array.isArray(randomObject.exampleArray)).toBe(true);
	expect(Array.isArray(randomObject.exampleArrayOfObjects)).toBe(true);
	expect(typeof randomObject.exampleObject).toBe('object');
	
});