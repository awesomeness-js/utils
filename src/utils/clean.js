import thingType from '../thingType.js'; 
import validateSchema from '../validateSchema.js';
import each from '../each.js';

import cleanBoolean from '../clean/boolean.js';
import cleanInteger from '../clean/integer.js';
import cleanNumber from '../clean/number.js';
import cleanString from '../clean/string.js';
import cleanTimestamp from '../clean/timestamp.js';
import cleanUUID from '../clean/uuid.js';
import cleanCustom from '../clean/custom.js';

const knownTypesToClean = [
	'array',
	'boolean',
	'buffer',
	'custom',
	'integer',
	'number',
	'object',
	'string',
	'timestamp',
	'uuid',
];

function cleanArray(arr, schema = {}, {
	testMode = false,
	allOrNothing = false,
	path = ''
} = {}){

	try {

		if(!Array.isArray(arr)) {

			throw {
				message: 'Input must be an array',
				arr
			};
		
		}
    
		validateSchema(schema);
    
		const cleanArrayItems = [];
		const errors = {};

		const supposedToBeType = schema.items.type;
    
		arr.forEach( (item, key) => {

			let cleanedItem;

			try {

				const itemType = thingType(item);
    
				if(itemType !== supposedToBeType){
		
					throw {
						message: 'type invalid',
						itemType,
						supposedToBeType
					};
		
				}
		
				cleanedItem = item;

				if(!knownTypesToClean.includes(supposedToBeType)){

					throw {
						message: 'Unknown type to clean in schema',
						supposedToBeType
					};

				}


				if(testMode){

					console.log(`cleaning ${supposedToBeType}`, item, schema.items); 

				}


				if(supposedToBeType === 'boolean'){

					cleanedItem = cleanBoolean(item); 

				}

				if(supposedToBeType === 'integer'){

					cleanedItem = cleanInteger(item); 

				}

				if(supposedToBeType === 'number'){

					cleanedItem = cleanNumber(item); 

				}

				if(supposedToBeType === 'string'){

					cleanedItem = cleanString(item); 

				}

				if(supposedToBeType === 'timestamp'){

					cleanedItem = cleanTimestamp(item); 

				}

				if(supposedToBeType === 'uuid'){

					cleanedItem = cleanUUID(item); 

				}
				
				if(supposedToBeType === 'array'){
	
					cleanedItem = cleanArray(item, schema.items, {
						testMode,
						allOrNothing,
						path: path ? `${path}.${key}` : key
					}); 
				
				}

				if(supposedToBeType === 'object'){
	
					cleanedItem = cleanObject(item, schema.properties, {
						testMode,
						allOrNothing,
						path: path ? `${path}.${key}` : key
					}); 
				
				}

				if(supposedToBeType === 'custom'){
	
					cleanedItem = cleanCustom(item, schema.items);

				}

				if(cleanedItem === null){

					if(schema.required === true){

						throw {
							message: 'required item is null',
							item,
							key
						};
					
					} else {

						return; // skip this item if it's not required and is null
					
					}
				
				}


			} catch(err){

				if(allOrNothing){

					throw err;

				} else {

					const errorPath = path ? `${path}[${key}]` : `[${key}]`;

					errors[errorPath] = {
						error: err,
						value: item,
						requirements: schema.items
					};

				}

				return; // skip this item if there's an error

			}
    
			cleanArrayItems.push(cleanedItem);
    
		});

		if(Object.keys(errors).length > 0){

			throw {
				message: 'Array not clean',
				errors
			};

		}

		if(cleanArrayItems.length === 0){

			throw {
				message: 'array is empty',
				arr
			};
		
		}

		return cleanArrayItems;

	} catch (e) {

		if(schema.required === true){

			throw e;
		
		} else {

			return null;
		
		}

	}


    
}


function cleanObject(obj, schema, {
	testMode = false,
	allOrNothing = false,
	path = ''
} = {}){

	validateSchema(schema);

	if(typeof obj !== 'object' || obj === null){

		throw {
			message: 'Clean Object - Input must be an object',
			obj,
			schema
		};
	
	}

	let keysPassed = Object.keys(obj);
	let keysSchema = Object.keys(schema.properties);

	const origLength = keysPassed.length;

	keysPassed = keysPassed.filter((key) => keysSchema.includes(key));

	if(origLength !== keysPassed.length){

		throw {
			name: 'KeyError',
			message: 'Object contains keys not in schema',
			keysPassed,
			keysSchema,
			obj
		};
	
	}

	if(testMode){

		console.log('cleanObject keysPassed:', keysPassed);
	
	}

	const cleanObj = {};
	const errors = {};

	// Iterate over the schema keys
	each(schema.properties, (schemaItemProperties, key) => {

		let cleanedValue;

		const value = obj[key];

		const valType = thingType(value);
		const supposedToBeType = schemaItemProperties.type;

		if(valType === 'undefined'){
			
			if(schemaItemProperties.required){

				throw {
					message: 'key required',
					key,
					schemaItemProperties
				};
			
			}

			return true;
			
		}

		if(valType !== supposedToBeType){

			if(schemaItemProperties.required){
	
				throw {
					message: 'type invalid',
					valType,
					supposedToBeType,
					key
				};
			
			}

		}


		if(!knownTypesToClean.includes(supposedToBeType)){

			throw {
				message: 'Unknown type to clean in schema',
				supposedToBeType,
				key
			};

		}

			
		if(testMode){

			console.log(`cleaning ${supposedToBeType}`, value, schema.properties[key]); 

		}


		if(supposedToBeType === 'boolean'){

			cleanedValue = cleanBoolean(value, schema.properties[key]); 

		}

		if(supposedToBeType === 'integer'){

			cleanedValue = cleanInteger(value, schema.properties[key]); 

		}

		if(supposedToBeType === 'number'){

			cleanedValue = cleanNumber(value, schema.properties[key]); 

		}

		if(supposedToBeType === 'string'){

			cleanedValue = cleanString(value, schema.properties[key]); 

		}

		if(supposedToBeType === 'timestamp'){

			cleanedValue = cleanTimestamp(value, schema.properties[key]); 

		}

		if(supposedToBeType === 'uuid'){

			cleanedValue = cleanUUID(value, schema.properties[key]); 

		}

		if(supposedToBeType === 'object'){
 
			cleanedValue = cleanObject(value, schema.properties[key]); 
		
		}

		if(supposedToBeType === 'array'){
 
			cleanedValue = cleanArray(value, schema.properties[key]); 
		
		}

		cleanObj[key] = cleanedValue;

	});

	if(Object.keys(errors).length > 0){

		throw {
			message: 'Object not clean',
			errors
		};

	}

	return cleanObj;

}

export default {
	array: cleanArray,
	object: cleanObject,
	boolean: cleanBoolean,
	integer: cleanInteger,
	number: cleanNumber,
	string: cleanString,
	timestamp: cleanTimestamp,
	uuid: cleanUUID
};