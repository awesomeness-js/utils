import crypto from 'crypto';

// V4
function uuid() {
  const arr = crypto.randomBytes(16);

  // Set the UUID version and clock sequence bits as per RFC4122
  arr[6] = (arr[6] & 0x0f) | 0x40;
  arr[8] = (arr[8] & 0x3f) | 0x80;

  return [...arr].map((b, i) =>
    [4, 6, 8, 10].includes(i) ? '-' + b.toString(16).padStart(2, '0') : b.toString(16).padStart(2, '0')
  ).join('');
}

export default uuid;