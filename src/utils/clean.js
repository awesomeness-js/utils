import thingType from '../thingType.js'; 
import validateSchema from '../validateSchema.js';
import each from '../each.js';

import cleanBoolean from '../clean/boolean.js';
import cleanInteger from '../clean/integer.js';
import cleanNumber from '../clean/number.js';
import cleanString from '../clean/string.js';
import cleanTimestamp from '../clean/timestamp.js';
import cleanUUID from '../clean/uuid.js';

function cleanArray(arr, schema = {}){

	try {

		if(!Array.isArray(arr)) {

			throw {
				message: 'Input must be an array',
				arr
			};
		
		}
    
		validateSchema(schema);
    
		const cleanArrayItems = [];
    
		const supposedToBeType = schema.items.type;
    
		arr.forEach( (item, key) => {
    
			const itemType = thingType(item);
    
    
			if(itemType !== supposedToBeType){
    
				throw {
					message: 'type invalid',
					itemType,
					supposedToBeType
				};
    
			}
    
			let cleanedItem = item;
    
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
 
				cleanedItem = cleanArray(item, schema.items); 
			
			}

			if(supposedToBeType === 'object'){
 
				cleanedItem = cleanObject(item, schema.items); 
			
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

    
			cleanArrayItems.push(cleanedItem);
    
		});
    
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


function cleanObject(obj, schema){

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

	const cleanObj = {};

	// Iterate over the schema keys
	each(obj, (value, key) => {

		const valType = thingType(value);
		const supposedToBeType = schema.properties[key].type;

		if(valType !== supposedToBeType){

			throw {
				message: 'type invalid',
				valType,
				supposedToBeType,
				key
			};

		}

		let cleanedValue;

		if(supposedToBeType === 'boolean'){

			cleanedValue = cleanBoolean(value); 

		}

		if(supposedToBeType === 'integer'){

			cleanedValue = cleanInteger(value); 

		}

		if(supposedToBeType === 'number'){

			cleanedValue = cleanNumber(value); 

		}

		if(supposedToBeType === 'string'){

			cleanedValue = cleanString(value); 

		}

		if(supposedToBeType === 'timestamp'){

			cleanedValue = cleanTimestamp(value); 

		}

		if(supposedToBeType === 'uuid'){

			cleanedValue = cleanUUID(value); 

		}

		if(supposedToBeType === 'object'){
 
			cleanedValue = cleanObject(value, schema.properties[key]); 
		
		}

		if(supposedToBeType === 'array'){
 
			cleanedValue = cleanArray(value, schema.properties[key]); 
		
		}

		cleanObj[key] = cleanedValue;

	});

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