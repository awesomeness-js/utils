import each from '../each.js';
import validateSchema from '../validateSchema.js';
import thingType from '../thingType.js'; 

function cleanObject(obj, schema = {}){

    try {

        validateSchema(schema);

        if(typeof obj !== 'object' || obj === null){
            throw {
                message: 'Input must be an object',
                obj
            };
        }
    
        let keysPassed = Object.keys(obj);
        let keysSchema = Object.keys(schema.properties);

        const origLength = keysPassed.length;
        keysPassed = keysPassed.filter(key => keysSchema.includes(key));

        if(origLength !== keysPassed.length){
            throw {
                name: 'KeyError',
                message: 'Object contains keys not in schema',
                keysPassed,
                keysSchema
            };
        }
    
        const cleanObj = {};
    
        // Iterate over the schema keys
        each(obj, (value, key) => {

            const valType = thingType(value);
            const supposedToBeType = schema[key].type;

            if(valType !== supposedToBeType){

                throw {
                    message: 'type invalid',
                    valType,
                    supposedToBeType
                };

            }

            const cleanFnImported = import(`./${supposedToBeType}.js`);
            cleanObj[key] = cleanFnImported(value, schema[key]);
    
        });

        return cleanObj;

    } catch(e){

        if(required) { throw e; } else { return null; }

    }

}

export default cleanObject;

