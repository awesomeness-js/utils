// example.test.js
import { expect, test } from 'vitest';
import utils from '../index.js';

await utils.setLocalEnvs('./secrets/local.env');

const env1 = process.env.JUST_A_TEST;

test('localEnv - should be testValue', () => {

	expect(env1).toBe('Local just a test');

});

await utils.setLocalEnvs('./secrets/dev.env');

test('localEnv - should be testValue', () => {

	expect(process.env.JUST_A_TEST).toBe('Dev just a test');

});