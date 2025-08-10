export default build;
declare function build({ src, dest, exportRoots, ignore, includeComments, dts, useTabs, hotModuleReload, hotCallback, hotSource }?: {
    src?: string;
    dest?: string;
    exportRoots?: boolean;
    ignore?: any[];
    includeComments?: boolean;
    dts?: boolean;
    useTabs?: boolean;
    hotModuleReload?: boolean;
    hotCallback?: any;
    hotSource?: string;
}): Promise<boolean>;
