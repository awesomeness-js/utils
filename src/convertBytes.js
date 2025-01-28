export default function convertBytes(bytes, precision = 2) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    bytes = Math.max(bytes, 0);
    const pow = Math.floor((bytes ? Math.log(bytes) : 0) / Math.log(1024));
    const index = Math.min(pow, units.length - 1);
    bytes /= 2 ** (10 * pow);
    return `${bytes.toFixed(precision)} ${units[index]}`;
};