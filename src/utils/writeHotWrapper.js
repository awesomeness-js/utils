import { writeFileSync } from 'node:fs';

export default function writeHotWrapper({
	dest, 
	hotSource 
}) {

	const wrapper = `// auto-generated wrapper
import chokidar from 'chokidar';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

let _default;
export { _default as default };

const target = path.resolve(${JSON.stringify(hotSource)});

async function reload() {
	const mod = await import(\`\${pathToFileURL(target)}?t=\${Date.now()}\`);
	_default = mod.default;
	console.log('[hot] reloaded', target);
}

await reload();

let t;
chokidar.watch(target, { ignoreInitial: true }).on('all', () => {
	clearTimeout(t);
	t = setTimeout(() => reload().catch(err => console.error('[hot] failed:', err)), 50);
});
`;

	writeFileSync(dest, wrapper);

}