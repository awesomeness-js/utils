export default function generateNamedExports({
	flatExports,
	exportRoots,
	nestedExports,
	dts,
	useTabs = true
}) {

	const indentStyle = useTabs ? '\t' : '    ';
	let lines = '';

	if (!exportRoots) return lines;

	// existing flat exports
	flatExports.forEach(({
		functionName, importVarName 
	}) => {

		lines += dts
			? `export declare const ${functionName}: typeof ${importVarName};\n`
			: `export { ${importVarName} as ${functionName} };\n`;
	
	});

	// grouped namespaces as named exports
	if (nestedExports) {

		lines += '\n';

		for (const [ groupName, members ] of Object.entries(nestedExports)) {

			if (dts) {

				const fields = Object.entries(members)
					.map(([ k, v ]) => `${indentStyle}${k}: typeof ${v.importVarName};`)
					.join('\n');

				lines += `export declare const ${groupName}: {\n${fields}\n};\n\n`;
			
			} else {

				const fields = Object.entries(members)
					.map(([ k, v ]) => `${indentStyle}${k}: ${v.importVarName}`)
					.join(',\n');

				lines += `export const ${groupName} = {\n${fields}\n};\n\n`;
			
			}
		
		}
	
	}

	return lines;

}
