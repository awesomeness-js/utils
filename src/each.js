export default function each(objectOrArray, callback) {

	if(Array.isArray(objectOrArray)){

		objectOrArray.every( (v, k) => {
			if(callback( v, k ) === false){ return false; } else { return true; }
		});

	} else {

		Object.entries(objectOrArray).every(entry => {
			if(callback( entry[1], entry[0] ) === false){ return false; } else { return true; }
		});

	}

};