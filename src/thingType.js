import isUUID from './isUUID.js';

export default (thing) => {

	if (thing === undefined) {

		return 'undefined'; 

	}

	if (thing === null) {

		return 'null'; 

	}

	let type = typeof thing;

	let same = [ 'undefined', 'null', 'boolean', 'function', 'symbol', 'bigint' ].includes(type);


	if (same) {

		return type; 

	}

	// array vs object
	if (type === 'object' && thing !== null) {

		type = Array.isArray(thing) ? 'array' : 'object';
		
		return type;
	
	}

	// integer vs double
	if (type === 'number') {

		type = Number.isInteger(thing) ? 'integer' : 'number';
		
		return type;
	
	}

	// string vs iso timestamp vs uuid
	let is_uuid = isUUID(thing);


	if(is_uuid){

		type = 'uuid'; 

		return type; 

	}

	let is_iso_dateTime = thing && typeof thing === 'string' && thing.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/);


	if(is_iso_dateTime) {

		type = 'timestamp'; 

		return type; 

	}

	return type;

	
};

