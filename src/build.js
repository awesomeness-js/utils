import { readdirSync, statSync, writeFileSync, readFileSync } from 'fs';
import { join, sep } from 'path';

/**
 * Generates a output file that consolidates all src functions.
 *
 * @param {Object} [options] - The options for generating the output file.
 * @param {string} [options.src='./src'] - The source directory.
 * @param {array} [options.dest=['./', 'index.js']] - The destination file.
 * @returns {bool} - Returns true if the output file is generated successfully.
 */


function getAllFiles(base, dir, files = []) {
    const directory = join(base, dir);
	let sortedFiles = readdirSync(directory).sort();
    sortedFiles.forEach(file => {
        const fullPath = join(directory, file);

        if (
            statSync(fullPath).isDirectory() &&
            file !== '_template'
        ) {
            files = getAllFiles(base, join(dir, file), files);
        } else if (file.endsWith('.js') && !file.match(/\..*\./)) { // Exclude files with two or more dots
            files.push(join(dir, file));
        }
    });
    return files;
}


function objectToString(obj, allComments, indent = 4, level = 1) {
    const spaces = ' '.repeat(indent * level);
    const entries = Object.entries(obj).map(([key, value]) => {

        if (typeof value === 'object') {
            return `${spaces}${key}: ${objectToString(value, allComments, indent, level + 1)}`;
        }

		if(key.startsWith('___')){
			let realKey = key.replace('___', '');

			// split comment based on lines and insert spaces
			let comment = allComments[value];
			comment = comment.split('\n').map((line) => `${spaces.replace(' ', '')} ${line}`).join('\n');

			return `${comment}\n${spaces}${realKey}: ${value}`;
		} else {
			return `${spaces}${key}: ${value}`;
		}
		
    });

	return `{\n${entries.join(',\n')}\n${' '.repeat(indent * (level - 1))}}`;

}


function extractJSDocComment(filePath) {
    const fileContent = readFileSync(filePath, 'utf8');
    const match = fileContent.match(/\/\*\*([\s\S]*?)\*\//);
    return match ? `/**${match[1]}*/` : '';
}


function generateExports(src) {
    const allFiles = [];
    const fnFiles = getAllFiles(src, '.');
    allFiles.push(...fnFiles);

    let imports = '';
    let allExports = '';
    let apiObject = {};

	let allComments = {};


    for (const file of allFiles) {
        const parts = file.split(sep).filter(p => p !== '.');
        const functionName = parts.pop().replace('.js', '');
        const namespace = parts.join('_');
        const importPath = src + '/' + file.replace(/\.js$/, '').replace(/\\/g, '/');
        const filePath = join(src, file);

        // Extract JSDoc comment, if present
		let hasComment = '';
        const jsDocComment = extractJSDocComment(filePath);
		if(jsDocComment){
			allComments[`${namespace}_${functionName}`] = jsDocComment
			hasComment = '___'
		}


        // Generate import statement with JSDoc comment if available
        imports += `import ${namespace}_${functionName} from '${importPath}.js';\n`;

        // generate exports
        if(!namespace){ allExports += `export { _${functionName} as ${functionName} };\n`; }

        // Populate the API object structure
        let current = apiObject;
        for (const part of parts) {
            current[part] = current[part] || {};
            current = current[part];
        }
        current[`${hasComment}${functionName}`] = `${namespace}_${functionName}`;
    }

    const apiContent = 'export default ' + objectToString(apiObject, allComments) + ';';

    // Add a header comment
    const headerComment = `/**
 * This file is auto-generated by the build script.
 * It consolidates API functions for use in the application.
 * Do not edit manually.
 */
`;

    return headerComment + imports + '\n' + allExports + '\n' + apiContent;
}


async function build({
    src = './src',
    dest = './index.js'
} = {}) {
    const indexContent = generateExports(src);
    writeFileSync(dest, indexContent);
    return true;
}

export default build;
