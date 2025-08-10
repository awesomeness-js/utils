// example.test.js
import {
	expect, test, describe 
} from 'vitest';
import utils from '../index.js';


describe('shouldIgnore', () => {

	test('exact file match (case-insensitive)', () => {

		expect(utils.shouldIgnore('/src/ignoreMe.js', [ 'ignoreMe.js' ])).toBe(true);
		expect(utils.shouldIgnore('/src/IGNOREME.JS', [ 'ignoreMe.js' ])).toBe(true);
		expect(utils.shouldIgnore('/src/notIgnoreMe.js', [ 'ignoreMe.js' ])).toBe(false);

	});

	test('ignore all in folder/* immediate children only', () => {

		expect(utils.shouldIgnore('/src/ignoreFolder/file.js', [ 'ignoreFolder/*' ])).toBe(true);
		expect(utils.shouldIgnore('/src/ignoreFolder/nested/file.js', [ 'ignoreFolder/*' ])).toBe(false);

	});

	test('ignore all with extension (*.js)', () => {

		expect(utils.shouldIgnore('/src/file.js', [ '*.js' ])).toBe(true);
		expect(utils.shouldIgnore('/src/deep/file.js', [ '*.js' ])).toBe(true);
		expect(utils.shouldIgnore('/src/file.ts', [ '*.js' ])).toBe(false);

	});

	test('ignore only specific extension in folder (folder/*.js)', () => {

		expect(utils.shouldIgnore('/src/css/style.js', [ 'css/*.js' ])).toBe(true);
		expect(utils.shouldIgnore('/src/css/nested/style.js', [ 'css/*.js' ])).toBe(false);
		expect(utils.shouldIgnore('/src/css/style.css', [ 'css/*.js' ])).toBe(false);

	});

	test('ignore whole directory (folder)', () => {

		expect(utils.shouldIgnore('/src/namespaceExample/file.js', [ 'namespaceExample' ])).toBe(true);
		expect(utils.shouldIgnore('/src/namespaceExample/nested/file.js', [ 'namespaceExample' ])).toBe(true);
		expect(utils.shouldIgnore('/src/namespaceExampleFile.js', [ 'namespaceExample' ])).toBe(false);

	});

	test('mixed case patterns still match paths', () => {

		expect(utils.shouldIgnore('/src/SomeFolder/File.JS', [ 'somefolder/*' ])).toBe(true);
	
	});

});
