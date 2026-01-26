import randomArrayValue from './arrayValue.js';
import randomBoolean from './boolean.js';
import randomInteger from './integer.js';
import randomNumber from './number.js';
import randomObject from './object.js';
import randomString from './string.js';
import randomTimestamp from './timestamp.js';
import randomUUID from './uuid.js';

function randomArray({
	items = {
		type: 'string',
		minLength: 1,
		maxLength: 10
	},
	min = 1,
	max = 10
} = {}){

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

	const array = [];

	for(let i = 0; i < Math.floor(Math.random() * (max - min + 1)) + min; i++) {

		const item = randomTypes[items.type](items);

		array.push(item);

	}

	return array;

};

export default randomArray;