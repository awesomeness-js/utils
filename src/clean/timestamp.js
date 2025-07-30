export default function cleanTimestamp( isoDateTimeString , {
	required = false,
	maxDaysInFuture = false,
	maxDaysInFPast = false,
} = {}){
	
	try {

		if(typeof isoDateTimeString !== 'string') {

			throw {
				message: 'Input must be a string',
				isoDateTimeString
			};
		
		}
	
		const date = new Date(isoDateTimeString);
	
		if(isNaN(date.getTime())) {

			throw {
				message: 'Invalid date string',
				isoDateTimeString
			};
		
		}
	
		const now = new Date();
		
		if(maxDaysInFuture !== false && (date - now) > maxDaysInFuture * 24 * 60 * 60 * 1000) {

			throw {
				message: `Date is more than ${maxDaysInFuture} days in the future`,
				isoDateTimeString
			};
		
		}
	
		if(maxDaysInFPast !== false && (now - date) > maxDaysInFPast * 24 * 60 * 60 * 1000) {

			throw {
				message: `Date is more than ${maxDaysInFPast} days in the past`,
				value: isoDateTimeString
			};
		
		}
	
		return date.toISOString();

	} catch (e) {

		if(required) {

			throw e; 

		} else {

			return null; 

		}
		
	}

  

}

