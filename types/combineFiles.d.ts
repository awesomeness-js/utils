export default combineFiles;
/**
 * Combines every file of one type in a folder (recursively, sorted) into one string.
 * With namespace, each file's `export default` is assigned to a name from its path:
 * combineFiles(dir, 'js', { namespace: 'app' }) turns state/create.js into app.state.create = function…
 * Namespace defaults: indexIsParent, parentInits, and stripImports are all true.
 * processContent({ content, path, name }) runs after the namespace rewrite.
 */
declare function combineFiles(dir: any, fileType: any, { minify, processContent, namespace, indexIsParent, parentInits, stripImports, }?: {
    minify?: boolean;
    processContent?: ({ content, path }: {
        content: any;
        path: any;
    }) => any;
    namespace?: any;
    indexIsParent?: boolean;
    parentInits?: boolean;
    stripImports?: boolean;
}): string;
