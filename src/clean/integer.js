export default function cleanInt(x, {
    required = false,
    min = false,
    max = false,
} = {}){

    try {

        if (typeof x !== 'number' || !Number.isInteger(x)) {

            // convert string to number if possible
            if (typeof x === 'string' && !isNaN(parseInt(x))) {
                x = parseInt(x);
            } else {
                throw {
                    message: 'Input must be an integer',
                    value: x
                }
            }
    
        }
    
        if (min !== false && x < min) { 
        
            throw {
                message: `Integer must be greater than or equal to ${min}`,
                value: x,
                min,
                max
            }
    
        }
    
        if (max !== false && x > max) { 
    
            throw {
                message: `Integer must be less than or equal to ${max}`,
                value: x,
                min,
                max
            }        
    
        }
    
        return x;

    } catch (e) {

        if(required) { throw e; } else { return null; }
        
    }
    
    
}

