import utils from '../index.js';
import {
	expect, test 
} from 'vitest';

test('collectImports', () => {
   
	const imports = utils.collectImports('./test/collectImports.js');

	const names = imports.map((i) => i.name).sort();

	expect(names).toStrictEqual([
		'test.collectImports', 
		'test.js.some',
		'test_css_some', 
	]);

	expect(imports.length).toBe(3);

	expect(Object.keys(imports[0]).sort()).toStrictEqual([
		'code', 
		'fullPath', 
		'hash',
		'name',
		'rootPath',
		'type',
	]);

});


test('collectImports - collect all imports in collectImports.js', () => {
   
	const imports = utils.collectImports('./test/collectImports.js',{
		returnCode: false,
		jsMaps: {
			'test.js': 'app.print',
			'test': 'app.fn',
		},
		cssMaps: {
			'test': 'awesomeness',
		},
	});

	const names = imports.map((i) => i.name).sort();


	expect(names).toStrictEqual([
		'app.fn.collectImports', // test.collectImports
		'app.print.some', // test.js.some
		'awesomeness_css_some', // test_css_some
	]);

	expect(imports.length).toBe(3);

	expect(Object.keys(imports[0]).sort()).toStrictEqual([
		//'code', 
		'fullPath', 
		'hash',
		'name',
		'rootPath',
		'type',
	]);

});

