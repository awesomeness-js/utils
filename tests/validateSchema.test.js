import { expect, test } from 'vitest';
import utils from '../index.js';
import schemas from '../schemas.js';

let schema1 = utils.validateSchema(schemas.schema1);
let schema2 = utils.validateSchema(schemas.schema2);


test('schema1 is valid', () => {

	expect(schema1).toBe(true);

});

test('schema2 is valid', () => {

	expect(schema2).toBe(true);

});

let expectedError;

try {

	utils.validateSchema({
		notReal: true
	});
	expectedError = false; // should not reach here

} catch(e){

	expectedError = true;

}

test('invalid schema throws error', () => {

	expect(expectedError).toBe(true);

});