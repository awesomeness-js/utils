export default function cleanBoolean(x, {
	required = false
} = {}){

	try {
	
		if(x !== true && x !== false){

			throw {
				message: `Invalid boolean value "${x}"`,
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

