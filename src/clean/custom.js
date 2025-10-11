export default function cleanCustom(value, {
	required = false,
	validate = null, // callback that returns true or cleaned value, throws or returns false if invalid
} = {}) {
	
	try {
		if (value === undefined || value === null) {
			throw {
				message: 'Value is missing',
				value
			};
		}

		if (typeof validate === 'function') {
			const result = validate(value);

			// if validator returns false, treat as invalid
			if (result === false) {
				throw {
					message: 'Validation failed',
					value
				};
			}

			// if validator returns something else, assume cleaned value
			return result === true ? value : result;
		}

		// no validation callback, just return the value
		return value;

	} catch (e) {
		if (required) {
			throw e;
		} else {
			return null;
		}
	}
}
