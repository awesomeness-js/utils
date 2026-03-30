import { dirname, relative } from 'path';

export default function generateImportStatements({
	fileDataList, 
	dts, 
	src,
	dest
}) {

	let statements = '';
	const destDir = dirname(dest);

	fileDataList.forEach(({
		importVarName, importPath 
	}) => {

		if (dts) {

			const normalizedDtsPath = `.${importPath.replace(src, '')}`.replace(/\\/g, '/');

			statements += `import type ${importVarName} from '${normalizedDtsPath}';\n`;
			
			return;
		
		}

		const targetPath = `${importPath}.js`;
		const normalizedRelativePath = relative(destDir, targetPath).replace(/\\/g, '/');
		const importSpecifier = normalizedRelativePath.startsWith('.')
			? normalizedRelativePath
			: `./${normalizedRelativePath}`;

		statements += `import ${importVarName} from '${importSpecifier}';\n`;
	
	});
	
	return statements;

}