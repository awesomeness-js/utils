export default function cleanNumber(x, {
	required = false,
	convertString = true,
	min = false,
	max = false,
	maxDecimal = false,
	minDecimal = false,
} = {}){

	try {

		if (typeof x !== 'number') {

			// convert string to number if possible
			if (convertString && typeof x === 'string') {

				try {

					x = parseFloat(x);
				
				} catch(e){

					throw {
						message: 'Input cannot be parsed',
						value: x
					};
				
				}
								

				if(isNaN(x)){

					throw {
						message: 'Input cannot be parsed NaN',
						value: x
					};
				
				}

			} else {

				throw {
					message: 'Input must be a number',
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

		if (maxDecimal !== false && x.toString().split('.')[1]?.length > maxDecimal) { 

			throw {
				message: `Number must have at most ${maxDecimal} decimal places`,
				value: x,
				maxDecimal
			};        

		}

		if (minDecimal !== false && x.toString().split('.')[1]?.length < minDecimal) {

			throw {
				message: `Number must have at least ${minDecimal} decimal places`,
				value: x,
				minDecimal
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

