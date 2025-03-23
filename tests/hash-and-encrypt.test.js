// example.test.js
import { expect, test } from 'vitest'
import utils from '../index.js';

// set AWESOMENESS_ENCRYPTION_KEY
await utils.setLocalEnvs('./secrets/dev.env');

const storedHash = utils.password.hash('mySecret123');

test('correct password check', () => {
    expect(utils.password.check('mySecret123', storedHash)).toBe(true)
});

test('incorrect password check', () => {
    expect(utils.password.check('wrongPassword', storedHash)).toBe(false)
});

// Example 256-bit key for AES-256
// In real usage, store this securely (e.g., an environment variable or key vault).

const secretMessage = 'This is top secret!';
const encrypted = utils.encrypt(secretMessage);
const decrypted = utils.decrypt(encrypted);
test('encryption and decryption', () => {
    expect(decrypted).toBe(secretMessage)
});
