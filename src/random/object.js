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

			if(typeof value.random === 'function') {
				result[key] = value.random();
			} else if(
				value.default !== undefined 
				&& value.default !== null
			) {
				result[key] = value.default;
			} else {
				
				result[key] = null;

			}
		
		} else {

			result[key] = randomTypes[value.type](value);

		}

	});

	return result;

};


export default randomObject;