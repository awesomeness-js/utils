export default combineFiles;
declare function combineFiles(dir: any, fileType: any, { minify, moduleToBrowser, }?: {
    minify?: boolean;
    moduleToBrowser?: boolean;
}): string;
