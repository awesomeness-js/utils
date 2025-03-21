// example.test.js
import { expect, test } from 'vitest'
import utils from '../index.js';

let combineTest = utils.combineFiles('./src', 'js');

let combineTestBrowser = utils.combineFiles('./src', 'js', { 
    moduleToBrowser: true 
});

test('combineFiles - combine all files in src/js', () => {
    expect(combineTest).toBeDefined();
    expect(combineTestBrowser).toBeDefined();
    expect(combineTest.length).toBeGreaterThan(combineTestBrowser.length);
})


test('has import', () => {
    expect(combineTest.includes('import')).toBe(true);
})

test('should not have import', () => {
    expect(combineTestBrowser.includes('import')).toBe(false);
})
