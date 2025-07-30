export default function cleanString(x, {
	required = false,
	minLength = false,
	maxLength = false,
	allowHtml = false,
	allowScripts = false,
	validValues = false
} = {}){

	if(allowScripts && !allowHtml){

		allowHtml = true; 

	}
	
	try {

		if(typeof x !== 'string') {

			throw {
				name: 'TypeError',
				message: 'Input must be a string',
				value: x
			};
		
		}

		if(minLength !== false && x.length < minLength) {

			throw {
				message: `String length must be between ${minLength} `,
				length: x.length,
				value: x
			};
		
		}

		if(maxLength !== false && x.length > maxLength) {

			throw {
				message: `String length must be less than or equal to ${maxLength}`,
				length: x.length,
				value: x
			};
		
		}

		if(!allowHtml && /<[^>]*>/g.test(x)) {

			throw {
				message: 'HTML tags are not allowed',
				value: x
			};
		
		}

		if(!allowScripts && /<script[^>]*>.*<\/script>/g.test(x)) {

			throw {
				message: 'Script tags are not allowed',
				value: x
			};
		
		}

		if( 
			validValues
			&& Array.isArray(validValues) 
			&& !validValues.includes(x) 
		) {

			throw {
				message: `Value invalid`,
				validValues,
				value: x
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