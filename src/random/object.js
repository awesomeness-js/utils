import randomArrayValue from './arrayValue.js';
import randomBoolean from './boolean.js';
import randomInteger from './integer.js';
import randomNumber from './number.js';
import randomArray from './array.js';
import randomString from './string.js';
import randomTimestamp from './timestamp.js';
import randomUUID from './uuid.js';
import each from '../each.js';

function randomObject({
	properties = {},
} = {}) {

	const result = {};

	const randomTypes = {
			array: randomArray,
			arrayValue: randomArrayValue,
			boolean: randomBoolean,
			integer: randomInteger,
			number: randomNumber,
			object: randomObject,
			string: randomString,
			timestamp: randomTimestamp,
			uuid: randomUUID
		}

	each(properties, (value, key) => {

		if(typeof randomTypes[value.type] !== 'function') {

			throw new Error(`Random function for type "${value.type}" is not defined.`);
		
		}

		result[key] = randomTypes[value.type](value);

	});

	return result;

};


export default randomObject;