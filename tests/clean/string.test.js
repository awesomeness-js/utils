// example.test.js
import {
	expect, test 
} from 'vitest';
import utils from '../../index.js';

test('good string', () => {

	expect(utils.clean.string('good string')).toBe('good string');

});

test('number', () => {

	expect(utils.clean.string(123)).toBe(null);
	expect(()=> utils.clean.string(123, { required: true })).toThrow();

});

test('string too short', () => {

	expect(utils.clean.string('123456789', { minLength: 10 })).toBe(null);
	expect(()=> utils.clean.string('123456789', {
		minLength: 10,
		required: true 
	})).toThrow();

});

test('string too long', () => {

	expect(utils.clean.string('123456789', { maxLength: 5 })).toBe(null);
	expect(()=> utils.clean.string('123456789', {
		maxLength: 5,
		required: true 
	})).toThrow();

});

test('no html', () => {

	expect(utils.clean.string('<div>no go</div>')).toBe(null);
	expect(()=> utils.clean.string('<div>no go</div>', { required: true })).toThrow();

});

test('no script', () => {

	expect(utils.clean.string('<script>no go</script>')).toBe(null);
	expect(()=> utils.clean.string('<script>no go</script>', { required: true })).toThrow();

});

test('allow html', () => {

	let x = utils.clean.string('<div>all good/div>', { allowHtml: true });

	expect(utils.clean.string('<div>all good</div>', { allowHtml: true })).toBe('<div>all good</div>');
	expect(utils.clean.string('<div>all good</div>', {
		allowHtml: true,
		required: true 
	})).toBe('<div>all good</div>');

});

test('allow script', () => {

	expect(utils.clean.string('<script>all good</script>', { allowScripts: true })).toBe('<script>all good</script>');
	expect(utils.clean.string('<script>all good</script>', {
		allowScripts: true,
		required: true 
	})).toBe('<script>all good</script>');

});

