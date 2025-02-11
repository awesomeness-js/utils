import { readdirSync, statSync, writeFileSync, readFileSync } from 'fs';
import { join, sep } from 'path';

function shouldIgnore(filePath, ignorePatterns) {
    const ignore = ignorePatterns.some(pattern => {
        const normalizedPath = filePath.replace(/\\/g, '/');
        const normalizedPattern = pattern.replace(/\\/g, '/');
        if (normalizedPath === normalizedPattern) return true;
        if (normalizedPattern.endsWith('/*')) {
            const baseDir = normalizedPattern.slice(0, -2);
            return normalizedPath.startsWith(baseDir + '/');
        }
        if (normalizedPattern.endsWith('/')) {
            return normalizedPath === normalizedPattern.slice(0, -1) ||
                   normalizedPath.startsWith(normalizedPattern);
        }
        return false;
    });
    //console.log('shouldIgnore', filePath, ignore);
    return ignore;
}

function getAllFiles(base, dir, files = [], ignore = []) {
    const directory = join(base, dir);
    const normalizedDir = dir.replace(/\\/g, '/');
    if (ignore.some(pattern => normalizedDir.startsWith(pattern.replace(/\/\*$/, '')))) {
        //.log('Ignoring folder:', normalizedDir);
        return files;
    }
    let sortedFiles = readdirSync(directory).sort();
    sortedFiles.forEach(file => {
        const fullPath = join(directory, file);
        const relativePath = join(dir, file).replace(/\\/g, '/');
        if (shouldIgnore(relativePath, ignore)) {
            //console.log('Ignoring file:', relativePath);
            return;
        }
        if (statSync(fullPath).isDirectory() && file !== '_template') {
            getAllFiles(base, join(dir, file), files, ignore);
        } else if (file.endsWith('.js') && !file.match(/\..*\./)) {
            files.push(relativePath);
        }
    });
    return files;
}

function extractJSDocComment(filePath) {
    const fileContent = readFileSync(filePath, 'utf8');
    const match = fileContent.match(/\/\*\*([\s\S]*?)\*\//);
    return match ? `/**${match[1]}*/` : '';
}

/**
 * Generates the export file contents.
 *
 * For each file, if includeComments is true, its JSDoc comment is placed
 * immediately above its key in the default export object.
 */
function generateExports(src, exportRoots, ignore, includeComments = false) {
    const allFiles = getAllFiles(src, '.', [], ignore);
    let importStatements = '';
    let flatExports = [];
    let nestedExports = {}; // Build a tree for nested exports

    // Create file info objects
    const fileDataList = allFiles.map(file => {
        const normalizedFile = file.replace(/\\/g, '/');
        const parts = normalizedFile.split('/');
        const fileName = parts.pop();
        const functionName = fileName.replace(/\.js$/, '');
        const namespaceParts = parts;
        const importVarName = namespaceParts.length > 0
            ? '_' + [...namespaceParts, functionName].join('_')
            : '_' + functionName;
        const importPath = src + '/' + normalizedFile.replace(/\.js$/, '');
        const jsDocComment = includeComments ? extractJSDocComment(join(src, normalizedFile)) : '';
        return { normalizedFile, parts: namespaceParts, functionName, importVarName, importPath, jsDocComment };
    });

    // Generate import statements (without comments)
    fileDataList.forEach(({ importVarName, importPath }) => {
        importStatements += `import ${importVarName} from '${importPath}.js';\n`;
    });

    // Build flat exports and nested export tree.
    fileDataList.forEach(({ parts, functionName, importVarName, jsDocComment }) => {
        if (parts.length === 0) {
            flatExports.push({ functionName, importVarName, jsDocComment });
        } else {
            let current = nestedExports;
            parts.forEach(part => {
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part];
            });
            // Store the leaf export along with its JSDoc comment.
            current[functionName] = { importVarName, jsDocComment };
        }
    });

    // Generate flat export statements for default export object.
    let flatExportLines = '';
    flatExports.forEach(({ functionName, importVarName, jsDocComment }) => {
        if (exportRoots) {
            if (includeComments && jsDocComment) {
                // Indent each comment line by 4 spaces.
                const indentedComment = jsDocComment.split('\n').map(line => '    ' + line).join('\n');
                flatExportLines += indentedComment + '\n';
            }
            flatExportLines += `    ${functionName}: ${importVarName},\n`;
        }
    });

    // Recursively generate code for nested namespaces,
    // placing JSDoc comments above each leaf key.
    function generateNamespaceCode(nsObj, indentLevel) {
        const indent = '    '.repeat(indentLevel);
        let lines = ['{'];
        for (const key in nsObj) {
            const value = nsObj[key];
            if (typeof value === 'object' && value.hasOwnProperty('importVarName')) {
                // Leaf node.
                if (includeComments && value.jsDocComment) {
                    const indentedComment = value.jsDocComment.split('\n').map(line => indent + '    ' + line).join('\n');
                    lines.push(indentedComment);
                }
                lines.push(`${indent}    ${key}: ${value.importVarName},`);
            } else {
                // Nested namespace.
                const nestedCode = generateNamespaceCode(value, indentLevel + 1);
                lines.push(`${indent}    ${key}: ${nestedCode},`);
            }
        }
        lines.push(indent + '}');
        return lines.join('\n');
    }

    // Generate the default export object.
    let namespaceExportLines = '';
    for (const ns in nestedExports) {
        const nsCode = generateNamespaceCode(nestedExports[ns], 1);
        namespaceExportLines += `    ${ns}: ${nsCode},\n`;
    }

    const defaultExportCode = 'export default {\n' +
        flatExportLines +
        namespaceExportLines +
        '};';

    // Generate individual flat export statements.
    let flatExportStatements = '';
    flatExports.forEach(({ functionName, importVarName }) => {
        if (exportRoots) {
            flatExportStatements += `export { ${importVarName} as ${functionName} };\n`;
        }
    });

    const headerComment = `/**
 * This file is auto-generated by the build script.
 * It consolidates API functions for use in the application.
 * Do not edit manually.
 */
`;

    return headerComment +
           importStatements + '\n' +
           flatExportStatements +
           '\n' +
           defaultExportCode;
}

async function build({
    src = './src',
    dest = './index.js',
    exportRoots = true,
    ignore = [],
    includeComments = true
} = {}) {
    const indexContent = generateExports(src, exportRoots, ignore, includeComments);
    writeFileSync(dest, indexContent);
    return true;
}

export default build;
