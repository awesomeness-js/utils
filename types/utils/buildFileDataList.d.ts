export default function buildFileDataList({ src, ignore, includeComments }: {
    src: any;
    ignore: any;
    includeComments: any;
}): {
    normalizedFile: any;
    parts: any;
    functionName: any;
    importVarName: string;
    importPath: string;
    jsDocComment: string;
}[];
