import { readFileSync } from 'fs';

export default function extractJSDocComment(filePath) {

	const fileContent = readFileSync(filePath, 'utf8');
	const match = fileContent.match(/\/\*\*([\s\S]*?)\*\//);

	// If the match exists and doesn't contain an unresolved template placeholder, return it.

	if (match && match[1] && !match[1].includes('${')) {

		return `/**${match[1]}*/`;
	
	}

	return '';

}