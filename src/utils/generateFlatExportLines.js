export default function generateFlatExportLines({
	flatExports, 
	exportRoots, 
	includeComments, 
	dts, 
	useTabs = true
}) {

	let indentStyle = useTabs ? '\t' : '    ';

	let lines = '';


	if (exportRoots) {

		flatExports.forEach(({
			functionName, importVarName, jsDocComment 
		}) => {

			if (includeComments && jsDocComment) {

				const indentedComment = jsDocComment
					.split('\n')
					.map((line) => indentStyle + line)
					.join('\n');

				lines += indentedComment + '\n';
			
			}

			lines += dts
				? `${indentStyle}${functionName}: typeof ${importVarName};\n`
				: `${indentStyle}${functionName}: ${importVarName},\n`;
		
		});
	
	}

	return lines;

}