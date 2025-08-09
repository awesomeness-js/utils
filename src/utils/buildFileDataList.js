import getAllFiles from '../getAllFiles.js';
import extractJSDocComment from './extractJSDocComment.js';
import { join } from 'path';

export default function buildFileDataList({
	src, 
	ignore, 
	includeComments
}) {

	const allFiles = getAllFiles(src, { 
		ignore,
		fileTypes: [ '.js' ]
	});

    
	return allFiles.map((file) => {

		const normalizedFile = file.replace(/\\/g, '/');
		const parts = normalizedFile.split('/');
		const fileName = parts.pop();
		const functionName = fileName.replace(/\.js$/, '');
		const namespaceParts = parts;
		const importVarName = namespaceParts.length > 0
			? '_' + [ ...namespaceParts, functionName ].join('_')
			: '_' + functionName;
		const importPath = src + '/' + normalizedFile.replace(/\.js$/, '');
		const jsDocComment = includeComments ? extractJSDocComment(join(src, normalizedFile)) : '';

        
		return {
			normalizedFile,
			parts: namespaceParts,
			functionName,
			importVarName,
			importPath,
			jsDocComment 
		};
	
	});

}