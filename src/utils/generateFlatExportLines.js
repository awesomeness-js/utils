export default function generateFlatExportLines(flatExports, exportRoots, includeComments, dts) {
    let lines = '';
    if (exportRoots) {
        flatExports.forEach(({ functionName, importVarName, jsDocComment }) => {
            if (includeComments && jsDocComment) {
                const indentedComment = jsDocComment
                    .split('\n')
                    .map(line => '    ' + line)
                    .join('\n');
                lines += indentedComment + '\n';
            }
            lines += dts
                ? `    ${functionName}: typeof ${importVarName};\n`
                : `    ${functionName}: ${importVarName},\n`;
        });
    }
    return lines;
}