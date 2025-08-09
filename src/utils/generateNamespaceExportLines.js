import generateNamespaceCode from './generateNamespaceCode.js';

export default function generateNamespaceExportLines({
	nestedExports, 
	includeComments, 
	dts, 
	useTabs = true
}) {

	const indentStyle = useTabs ? '\t' : '    ';

	let lines = '';

	for (const ns in nestedExports) {

		const nsCode = generateNamespaceCode(nestedExports[ns], 1, includeComments, dts, useTabs);

		lines += `${indentStyle}${ns}: ${nsCode},\n`;

	}

	return lines;

}