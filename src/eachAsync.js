export default async function eachAsync(objectOrArray, callback) {
    if (Array.isArray(objectOrArray)) {
        // Use a for...of loop for arrays
        for (const [k, v] of objectOrArray.entries()) {
            // Await the callback
            if (await callback(v, k) === false) {
                break;
            }
        }
    } else {
        // Use a for...in loop for objects
        for (const k in objectOrArray) {
            if (objectOrArray.hasOwnProperty(k)) {
                // Await the callback
                if (await callback(objectOrArray[k], k) === false) {
                    break;
                }
            }
        }
    }
}