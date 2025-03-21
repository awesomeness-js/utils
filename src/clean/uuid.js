import isUUID from "../isUUID.js";
export default function cleanUUID(uuid,{
    required = false,
} = {}){
    
    try {
            
        if(typeof uuid !== 'string'){
            throw {
                message: 'Input must be a string',
                uuid
            };
        }

        if(!isUUID(uuid)){
            throw {
                message: 'Invalid UUID format',
                uuid
            };
        }

        return uuid;

    } catch (e) {

        if(required) { throw e; } else { return null; }

    }



}

