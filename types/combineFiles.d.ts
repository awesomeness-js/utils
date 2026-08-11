export default combineFiles;
declare function combineFiles(dir: any, fileType: any, { minify, processContent, }?: {
    minify?: boolean | undefined;
    processContent?: (({ content, path }: {
        content: any;
        path: any;
    }) => any) | undefined;
}): string;
