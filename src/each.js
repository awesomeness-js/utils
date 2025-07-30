
/**
 * Iterates over elements of an array or properties of an object, invoking a callback for each element/property.
 * The iteration stops if the callback returns `false`.
 *
 * @example each({ a: 1, b: 2 }, (value, key) => { console.log(value, key); });
 * @param {Object|Array} objectOrArray - The object or array to iterate over.
 * @param {Function} callback - The function to invoke per iteration. It is invoked with two arguments: (value, key/index).
 * @returns {void}
 */
export default function each(objectOrArray, callback) {

	if(Array.isArray(objectOrArray)){

		objectOrArray.every( (v, k) => {

			if(callback( v, k ) === false){

				return false; 

			} else {

				return true; 

			}
		
		});

	} else {

		Object.entries(objectOrArray).every((entry) => {

			if(callback( entry[1], entry[0] ) === false){

				return false; 

			} else {

				return true; 

			}
		
		});

	}

}

;