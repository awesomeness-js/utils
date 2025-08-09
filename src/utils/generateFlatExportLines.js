export default function generateFlatExportLines({
	flatExports, 
	exportRoots, 
	includeComments, 
	dts, 
	useTabs = true
}) {

	let indentStyle = useTabs ? '\t' : '    ';

	let lines = '';


 
	function processExports(exportsArr, level = 1) {

		const currentIndent = indentStyle.repeat(level);

		exportsArr.forEach((item) => {

			if (item.functionName && item.importVarName) {

				if (includeComments && item.jsDocComment) {

					const indentedComment = item.jsDocComment
						.split('\n')
						.map((line) => currentIndent + line)
						.join('\n');

					lines += indentedComment + '\n';
				
				}

				lines += dts
					? `${currentIndent}${item.functionName}: typeof ${item.importVarName};\n`
					: `${currentIndent}${item.functionName}: ${item.importVarName},\n`;

			} else if (item.functionName && item.exports) {

				// Nested object
				lines += `${currentIndent}${item.functionName}: {\n`;
				processExports(item.exports, level + 1);
				lines += `${currentIndent}},\n`;

			}

		});

	}

	if (exportRoots) {

		processExports(flatExports, 1);

	}

	return lines;

}