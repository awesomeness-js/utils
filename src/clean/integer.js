export default function cleanInt(x, {
	required = false,
	convertString = true,
	min = false,
	max = false,
} = {}){

	try {

		if (typeof x !== 'number' || !Number.isInteger(x)) {

			// convert string to number if possible
			// but not a decimal string
			if (convertString && typeof x === 'string') {

				if(x.includes('.')){

					throw {
						message: 'string contains decimal',
						value: x
					};
				
				}

				if(!isNaN(parseInt(x))){

					x = parseInt(x);
				
				} else {

					throw {
						message: 'string cannot be parsed to integer',
						value: x
					};
				
				}
				

			} else {

				throw {
					message: 'Input must be an integer',
					value: x
				};
			
			}
	
		}
	
		if (min !== false && x < min) { 
		
			throw {
				message: `Integer must be greater than or equal to ${min}`,
				value: x,
				min,
				max
			};
	
		}
	
		if (max !== false && x > max) { 
	
			throw {
				message: `Integer must be less than or equal to ${max}`,
				value: x,
				min,
				max
			};        
	
		}
	
		return x;

	} catch (e) {

		if(required) {

			throw e; 

		} else {

			return null; 

		}
		
	}
	
	
}

