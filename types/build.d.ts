export default build;
declare function build({ src, dest, exportRoots, ignore, includeComments, dts, useTabs }?: {
    src?: string;
    dest?: string;
    exportRoots?: boolean;
    ignore?: any[];
    includeComments?: boolean;
    dts?: boolean;
    useTabs?: boolean;
}): Promise<boolean>;
