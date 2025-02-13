export default build;
declare function build({ src, dest, exportRoots, ignore, includeComments, dts }?: {
    src?: string;
    dest?: string;
    exportRoots?: boolean;
    ignore?: any[];
    includeComments?: boolean;
    dts?: boolean;
}): Promise<boolean>;
