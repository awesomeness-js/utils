import thingType from '../thingType.js'; 
function cleanArray(arr, schema = {}){

    if(!Array.isArray(arr)) {
        throw {
            name: 'TypeError',
            message: 'Input must be an array',
            arr
        };
    }

    validateSchema(schema);

    const cleanArrayItems = [];

    const supposedToBeType = schema.type;

    arr.forEach( item => {

        const itemType = thingType(item);

        if(itemType !== supposedToBeType){

            throw {
                message: 'type invalid',
                itemType,
                supposedToBeType
            };

        }

        const cleanFnImported = import(`./${supposedToBeType}.js`);
        const cleanItem = cleanFnImported(value, schema[key]);

        cleanArrayItems.push(cleanItem);

    });

    return cleanArrayItems;
    
}

export default cleanArray;