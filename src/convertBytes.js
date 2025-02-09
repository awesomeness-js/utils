
/**
 * Converts a given number of bytes into a more readable string format with appropriate units.
 *
 * @param {number} bytes - The number of bytes to convert.
 * @param {number} [precision=2] - The number of decimal places to include in the result.
 * @returns {string} The converted bytes in a string format with appropriate units.
 */
export default function convertBytes(bytes, precision = 2) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    bytes = Math.max(bytes, 0);
    const pow = Math.floor((bytes ? Math.log(bytes) : 0) / Math.log(1024));
    const index = Math.min(pow, units.length - 1);
    bytes /= 2 ** (10 * pow);
    return `${bytes.toFixed(precision)} ${units[index]}`;
};