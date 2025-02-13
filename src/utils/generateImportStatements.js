export default function generateImportStatements(fileDataList, dts, src) {
    let statements = '';
    fileDataList.forEach(({ importVarName, importPath }) => {
        statements += dts
            ? `import type ${importVarName} from '.${importPath.replace(src,'')}';\n`
            : `import ${importVarName} from '${importPath}.js';\n`;
    });
    return statements;
}