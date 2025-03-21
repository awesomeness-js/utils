// example.test.js
import { expect, test } from 'vitest'
import utils from '../index.js';

let convertBytesTest = utils.convertBytes(1024);
test('convertBytes 1024 => 1.00 KB', () => {
    expect(convertBytesTest).toBeDefined();
    expect(convertBytesTest).toEqual('1.00 KB');
});