/**
 * This file is auto-generated by the build script.
 * It consolidates API functions for use in the application.
 * Do not edit manually.
 */
import _build from './src/build.js';
import _combineFiles from './src/combineFiles.js';
import _convertBytes from './src/convertBytes.js';
import _each from './src/each.js';
import _eachAsync from './src/eachAsync.js';
import _getAllFiles from './src/getAllFiles.js';
import _isUUID from './src/isUUID.js';
import _md5 from './src/md5.js';
import _namespace_deep_deep from './src/namespace/deep/deep.js';
import _namespace_example from './src/namespace/example.js';
import _setLocalEnvs from './src/setLocalEnvs.js';
import _toPennies from './src/toPennies.js';
import _uuid from './src/uuid.js';

export { _build as build };
export { _combineFiles as combineFiles };
export { _convertBytes as convertBytes };
export { _each as each };
export { _eachAsync as eachAsync };
export { _getAllFiles as getAllFiles };
export { _isUUID as isUUID };
export { _md5 as md5 };
export { _setLocalEnvs as setLocalEnvs };
export { _toPennies as toPennies };
export { _uuid as uuid };

export default {
    /**${match[1]}*/
    build: _build,
    combineFiles: _combineFiles,
    /**
     * Converts a given number of bytes into a more readable string format with appropriate units.
     *
     * @param {number} bytes - The number of bytes to convert.
     * @param {number} [precision=2] - The number of decimal places to include in the result.
     * @returns {string} The converted bytes in a string format with appropriate units.
     */
    convertBytes: _convertBytes,
    each: _each,
    eachAsync: _eachAsync,
    getAllFiles: _getAllFiles,
    isUUID: _isUUID,
    md5: _md5,
    setLocalEnvs: _setLocalEnvs,
    toPennies: _toPennies,
    uuid: _uuid,
    namespace: {
        deep: {
            /**
             * A function that returns the input value.
             *
             * @param {*} something - The input value to be returned.
             * @returns {*} The same value that was passed as input.
             */
            deep: _namespace_deep_deep,
        },
        example: _namespace_example,
    },
};