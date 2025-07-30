export default function generateNamedExports(flatExports, exportRoots, dts) {

	let lines = '';


	if (exportRoots) {

		flatExports.forEach(({
			functionName, importVarName 
		}) => {

			lines += dts
				? `export declare const ${functionName}: typeof ${importVarName};\n`
				: `export { ${importVarName} as ${functionName} };\n`;
		
		});
	
	}

	return lines;

}
