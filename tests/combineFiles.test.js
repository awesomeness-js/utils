// example.test.js
import {
	expect, test 
} from 'vitest';
import utils from '../index.js';

let combineTest = utils.combineFiles('./test', 'js');

let combineTest2 = utils.combineFiles('./test', 'js', { 
	processContent: ({
		content, path  
	}) => { 

		const fnName = path.split('/')
			.filter((x) => x !== '') // remove empty strings
			.join('.') // join with dots
			.replaceAll('..', '.') // remove double dots
			.replaceAll('.js', '') // remove .js
			.replace(/^\./, '');

		content = content.replaceAll('export default function', `${fnName} = function`);
		content = content.replaceAll('export default async function', `${fnName} = async function`);
		content = content.replaceAll('export default async', `${fnName} = async`);
		content = content.replaceAll('export default', `${fnName} =`);

		return content; 
	
	},
});

test('combineFiles - combine all files in src/js', () => {

	expect(combineTest).toBeDefined();
	expect(combineTest2).toBeDefined();
	expect(combineTest).not.toEqual(combineTest2);

});