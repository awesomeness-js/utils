declare namespace _default {
    export { cleanArray as array };
    export { cleanObject as object };
    export { cleanBoolean as boolean };
    export { cleanInteger as integer };
    export { cleanNumber as number };
    export { cleanString as string };
    export { cleanTimestamp as timestamp };
    export { cleanUUID as uuid };
}
export default _default;
declare function cleanArray(arr: any, schema?: {}, { testMode, allOrNothing, path }?: {
    testMode?: boolean;
    allOrNothing?: boolean;
    path?: string;
}): any[];
declare function cleanObject(obj: any, schema: any, { testMode, allOrNothing, path }?: {
    testMode?: boolean;
    allOrNothing?: boolean;
    path?: string;
}): {};
import cleanBoolean from '../clean/boolean.js';
import cleanInteger from '../clean/integer.js';
import cleanNumber from '../clean/number.js';
import cleanString from '../clean/string.js';
import cleanTimestamp from '../clean/timestamp.js';
import cleanUUID from '../clean/uuid.js';
