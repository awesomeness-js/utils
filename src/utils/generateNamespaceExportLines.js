import generateNamespaceCode from './generateNamespaceCode.js';

export default function generateNamespaceExportLines(nestedExports, includeComments, dts) {
    let lines = '';
    for (const ns in nestedExports) {
        const nsCode = generateNamespaceCode(nestedExports[ns], 1, includeComments, dts);
        lines += `    ${ns}: ${nsCode},\n`;
    }
    return lines;
}