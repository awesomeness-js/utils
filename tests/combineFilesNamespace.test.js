import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';
import { createContext, runInContext } from 'vm';
import { expect, test } from 'vitest';
import combineFiles from '../src/combineFiles.js';
import namespaceName from '../src/utils/namespaceName.js';
import namespaceInits from '../src/utils/namespaceInits.js';
import exportToAssign from '../src/utils/exportToAssign.js';
import stripImports from '../src/utils/stripImports.js';

const fixtures = './tests/fixtures/namespace';

// frozen copy of combineFiles before the namespace option (1.2.20), for byte-identical checks
function legacyCombineFiles(dir, fileType, { processContent = ({ content }) => content } = {}) {

	let out = '';

	readdirSync(dir).sort().forEach((stuff) => {

		if (statSync(`${dir}/${stuff}`).isDirectory()) {

			out += legacyCombineFiles(`${dir}/${stuff}`, fileType, { processContent });

		} else if (stuff.split('.').pop() === fileType) {

			out += processContent({
				path: `${dir}/${stuff}`,
				content: readFileSync(`${dir}/${stuff}`, 'utf8'),
			}) + ' \n ';

		}

	});

	return out;

}

const run = (code, context) => {

	runInContext(code, createContext(context));

	return context;

};

test('no namespace: output is byte-identical to the previous combineFiles', () => {

	const tag = ({
		content, path 
	}) => {

		return `/* ${path} */${content}`;

	};

	[ './test', fixtures ].forEach((dir) => {

		[ 'js', 'css' ].forEach((type) => {

			expect(combineFiles(dir, type)).toBe(legacyCombineFiles(dir, type));
			expect(combineFiles(dir, type, { processContent: tag })).toBe(legacyCombineFiles(dir, type, { processContent: tag }));

		});

	});

});

test('namespace app: every export default form is assigned and callable', async () => {

	const js = combineFiles(fixtures, 'js', { namespace: 'app' });
	const { app } = run(js, { app: {} });

	expect(js).toContain('app.api = async function(route){');
	expect(js).toContain('app.initMouse = () => {');
	expect(js).toContain('app.later = async () => {');
	expect(js).toContain('app.config = {');
	expect(js).toContain('app.state.create = function(data){');
	expect(js).not.toContain('export default {');
	expect(await app.api('r')).toBe('r');
	expect(app.initMouse()).toBe('mouse');
	expect(await app.later()).toBe('later');
	expect(app.config.dbName).toBe('app');
	expect(app.state.create(5)).toBe(5);
	expect(app.comment()).toBe('not export default here');
	expect(js).not.toContain('.css');

});

test('namespace: index.js maps to its parent and comes before its siblings', () => {

	const js = combineFiles(fixtures, 'js', { namespace: 'ui' });
	const { ui } = run(js, { ui: {} });

	expect(js).toContain('ui.button = function(){');
	expect(js.indexOf('ui.button = function')).toBeLessThan(js.indexOf('ui.button.a = function'));
	expect(ui.button()).toBe('button');
	expect(ui.button.a()).toBe('a');

});

test('namespace: nested parents get init lines, the root global is never assigned', () => {

	const js = combineFiles(fixtures, 'js', { namespace: 'app' });
	const page = combineFiles(join(fixtures, 'state'), 'js', { namespace: 'app.pages.start' });

	expect(js).toContain('app.meta = app.meta || {};\napp.meta.update = app.meta.update || {};\n');
	expect(js.split('app.meta = app.meta').length).toBe(2);
	expect(js).not.toMatch(/^app = /m);
	expect(js).not.toContain('onlyCss');
	expect(page.startsWith('app.pages = app.pages || {};\napp.pages.start = app.pages.start || {};\n')).toBe(true);
	expect(run(page, { app: {} }).app.pages.start.create(1)).toBe(1);
	expect(run(js, { app: { meta: { keep: 1 } } }).app.meta.keep).toBe(1);

});

test('namespace: imports are stripped, mid-line export default is untouched', () => {

	const js = combineFiles(fixtures, 'js', { namespace: 'app' });

	expect(js).not.toContain('import ');
	expect(js).toContain('// a comment that says export default mid-line\n');
	expect(js).toContain(`const label = 'not export default here';`);
	expect(js).toContain('app.comment = function(){');

});

test('namespace: processContent runs after the rewrite and gets the name', () => {

	const seen = {};
	const js = combineFiles(fixtures, 'js', {
		namespace: 'app',
		processContent: ({
			content, path, name 
		}) => {

			seen[name] = path;

			return content.replace(`${name} = `, `${name} = /* ${name} */ `);

		},
	});

	expect(seen['app.state.create']).toMatch(/state\/create\.js$/);
	expect(seen['app.button']).toMatch(/button\/index\.js$/);
	expect(js).toContain('app.state.create = /* app.state.create */ function');

});

test('namespace: Windows and mixed slash folders give the same output', () => {

	const posix = combineFiles(fixtures, 'js', { namespace: 'app' });

	expect(namespaceName({
		path: 'D:\\core\\js\\app\\state\\create.js',
		root: 'D:\\core\\js\\app',
		namespace: 'app',
	})).toBe('app.state.create');
	expect(namespaceName({
		path: 'D:\\core\\js\\app/meta\\update/pages.js',
		root: 'D:/core/js/app/',
		namespace: 'app',
	})).toBe('app.meta.update.pages');
	expect(combineFiles(join(process.cwd(), fixtures), 'js', { namespace: 'app' })).toBe(posix);

	if (process.platform === 'win32') {

		expect(combineFiles(fixtures.replaceAll('/', '\\'), 'js', { namespace: 'app' })).toBe(posix);

	}

});

test('options can turn the defaults off', () => {

	const js = combineFiles(fixtures, 'js', {
		namespace: 'app.x',
		indexIsParent: false,
		parentInits: false,
		stripImports: false,
	});

	expect(js).toContain('app.x.button.index = function');
	expect(js).toContain(`import ui from '#ui';`);
	expect(js).not.toContain('|| {}');

});

test('helpers: names, inits, assign, strip', () => {

	expect(namespaceName({
		path: 'pages/admin-users/js/list.js',
		root: 'pages',
		namespace: 'app.pages',
	})).toBe('app.pages["admin-users"].js.list');
	expect(namespaceName({
		path: 'components/button/index.js',
		root: 'components',
		namespace: 'ui',
	})).toBe('ui.button');
	expect(namespaceInits({ name: 'ui' })).toBe('');
	expect(namespaceInits({
		name: 'ui.button.list',
		base: 'ui.button',
	})).toBe('ui.button.list = ui.button.list || {};\n');
	expect(namespaceInits({ name: 'app.pages["a-b"]' })).toBe('app.pages = app.pages || {};\napp.pages["a-b"] = app.pages["a-b"] || {};\n');
	expect(exportToAssign({
		content: 'export default async () => {\n};',
		name: 'a.b',
	})).toBe('a.b = async () => {\n};');
	expect(exportToAssign({
		content: 'x("export default y");\nexport default function(){}',
		name: '$a',
	})).toBe('x("export default y");\n$a = function(){}');
	expect(stripImports("import a from 'a';\r\nimport 'b';\nimport {\n\tc\n} from \"c\";\nconst d = 1;")).toBe('const d = 1;');

});
