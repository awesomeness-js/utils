import { expect, test } from 'vitest';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import utils from '../index.js';

function writeJs(filePath, content = 'export default () => true;\n') {

	mkdirSync(dirname(filePath), {
		recursive: true
	});
	writeFileSync(filePath, content);

}

test('build generates imports relative to nested destination', async () => {

	const root = join('test', 'buildSpotCheck', 'nested');

	rmSync(root, {
		recursive: true,
		force: true
	});

	const src = join(root, 'sites', 'abetterbibleapp.com', 'api', 'functions');
	const dest = join(root, 'sites', 'abetterbibleapp.com', 'api', 'app.js');
	const functionFile = join(src, 'user', 'bibleVersion.js');

	writeJs(functionFile);

	await utils.build({
		src,
		dest,
		dts: false,
		ignore: [
			'*.test.js'
		]
	});

	const output = readFileSync(dest, 'utf8');

	expect(output).toContain("import _user_bibleVersion from './functions/user/bibleVersion.js';");
	expect(output).not.toContain("./sites/abetterbibleapp.com/api/functions/user/bibleVersion.js");

});

test('build generates correct imports for non-root destination', async () => {

	const root = join('test', 'buildSpotCheck', 'nonRoot');

	rmSync(root, {
		recursive: true,
		force: true
	});

	const src = join(root, 'src');
	const dest = join(root, 'test', 'justATest.js');
	const functionFile = join(src, 'hello.js');

	writeJs(functionFile);
	mkdirSync(dirname(dest), {
		recursive: true
	});

	await utils.build({
		src,
		dest,
		dts: false
	});

	const output = readFileSync(dest, 'utf8');

	expect(output).toContain("import _hello from '../src/hello.js';");

});

test('build generates correct imports for deeper non-root destination', async () => {

	const root = join('test', 'buildSpotCheck', 'deeperNonRoot');

	rmSync(root, {
		recursive: true,
		force: true
	});

	const src = join(root, 'src');
	const dest = join(root, 'test', 'nested', 'justATest.js');
	const functionFile = join(src, 'hello.js');

	writeJs(functionFile);
	mkdirSync(dirname(dest), {
		recursive: true
	});

	await utils.build({
		src,
		dest,
		dts: false
	});

	const output = readFileSync(dest, 'utf8');

	expect(output).toContain("import _hello from '../../src/hello.js';");

});
