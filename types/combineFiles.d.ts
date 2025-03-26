export default combineFiles;
declare function combineFiles(dir: any, fileType: any, { minify, processContent, }?: {
    minify?: boolean;
    processContent?: ({ content, path }: {
        content: any;
        path: any;
    }) => any;
}): string;
