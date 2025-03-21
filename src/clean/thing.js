import thingType from '../thingType.js';

export default (thing, schema) => {

    const type = thingType(thing);
    
    let validTypes = [
        'array',
        'boolean',
        'integer',
        'number',
        'object',
        'string',
        'timestamp',
        'uuid'
    ];

    if(!validTypes.includes(type)){
        throw {
            message: `Invalid type "${type}" for thing`,
            thing
        }
    }

    const cleanFnImported = import(`./${type}.js`);
    const cleanedThing = cleanFnImported(thing, schema);

    return cleanedThing;

}

