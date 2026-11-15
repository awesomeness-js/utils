/**
 * Builds the `x = x || {};` lines that make sure each parent object exists.
 * The first segment (the global, such as app or ui) is never assigned.
 * Only prefixes longer than base are included, so a nested folder adds just its own line.
 *
 * @example namespaceInits({ name: 'app.pages.start' }); // 'app.pages = app.pages || {};\napp.pages.start = app.pages.start || {};\n'
 * @example namespaceInits({ name: 'ui.button.list', base: 'ui.button' }); // 'ui.button.list = ui.button.list || {};\n'
 * @param {Object} options
 * @param {string} options.name - The full namespace name.
 * @param {string} [options.base=''] - A namespace that already exists.
 * @returns {string} One init line per missing parent, or an empty string.
 */
export default function namespaceInits({ name, base, }: {
    name: string;
    base?: string;
}): string;
