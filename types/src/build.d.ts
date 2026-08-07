export default build;
declare function build({ src, dest, exportRoots, ignore, includeComments, dts, useTabs, }?: {
    src?: string | undefined;
    dest?: string | undefined;
    exportRoots?: boolean | undefined;
    ignore?: never[] | undefined;
    includeComments?: boolean | undefined;
    dts?: boolean | undefined;
    useTabs?: boolean | undefined;
}): Promise<boolean>;
