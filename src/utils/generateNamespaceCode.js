export default function generateNamespaceCode(nsObj, indentLevel, includeComments, dts) {
    const indent = '    '.repeat(indentLevel);
    let lines = ['{'];
    for (const key in nsObj) {
        const value = nsObj[key];
        if (typeof value === 'object' && value.hasOwnProperty('importVarName')) {
            if (includeComments && value.jsDocComment) {
                const indentedComment = value.jsDocComment
                    .split('\n')
                    .map(line => indent + '    ' + line)
                    .join('\n');
                lines.push(indentedComment);
            }
            lines.push(dts
                ? `${indent}    ${key}: typeof ${value.importVarName},`
                : `${indent}    ${key}: ${value.importVarName},`
            );
        } else {
            const nestedCode = generateNamespaceCode(value, indentLevel + 1, includeComments, dts);
            lines.push(`${indent}    ${key}: ${nestedCode},`);
        }
    }
    lines.push(indent + '}');
    return lines.join('\n');
}