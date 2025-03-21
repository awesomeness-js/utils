import each from './each.js';

function validateSchema(schema){

    // ref todo
    if(schema.ref){ return true; }

    let schemaType = typeof schema;

    if(schemaType !== 'object' || schema === null) {
        throw {
            message: 'Input must be an object',
            schema
        };
    }

    // object properties dont have type
    if(!schema.type && schema.properties){ schema.type = 'object'; }

    const validTypes = [
        'array',
        'boolean',
        'integer',
        'number',
        'object',
        'string',
        'timestamp',
        'uuid'
    ];

    if(!schema.type || !validTypes.includes(schema.type)) {
        throw {
            message: `Schema must have a valid type.`,
            validTypes,
            schema
        };
    }


    if(schema.type === 'object') {

        if(schema.properties){
            
            // run through each property
            each(schema.properties, (v,k) => {
                validateSchema(v);
            });
            
        } else {

            throw {
                message: 'Object invalid - needs "properties"',
                schema
            }

        }

    }

    if(schema.type === 'array') {

        if(!schema.items){
            throw {
                message: 'Array schema must have items defined.',
                schema
            };
        }

        validateSchema(schema.items);

    }

    return true;

}

export default validateSchema;

