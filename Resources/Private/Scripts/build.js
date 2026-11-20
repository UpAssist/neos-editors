// Build per the Neos UI extensibility guideline (esbuild + extensibilityMap).
// One build serves Neos UI 7.3 up to 9.x.
const esbuild = require('esbuild');

// lightningcss returns the CSS module exports in random order, which makes the class map in
// Plugin.js differ between builds. Sort them so the committed bundle is reproducible (CI checks
// it). This must run before the plugin is loaded, because the plugin takes `transform` at load time.
const lightningcss = require('lightningcss');
const transform = lightningcss.transform;
lightningcss.transform = transformOptions => {
    const result = transform(transformOptions);
    if (result.exports) {
        result.exports = Object.fromEntries(Object.entries(result.exports).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
    }
    return result;
};
const {cssModules} = require('esbuild-plugin-lightningcss-modules');
const extensibilityMap = require('@neos-project/neos-ui-extensibility/extensibilityMap.json');
const isWatch = process.argv.includes('--watch');

/** @type {import("esbuild").BuildOptions} */
const options = {
    logLevel: 'info',
    bundle: true,
    minify: !isWatch,
    target: 'es2020',
    entryPoints: {Plugin: 'src/index.js'},
    // The editor uses the legacy `@neos` decorator, so treat .js as TSX with experimental decorators.
    loader: {'.js': 'tsx'},
    tsconfigRaw: {compilerOptions: {experimentalDecorators: true}},
    outdir: '../../Public/ArrayInfoEditor',
    alias: extensibilityMap,
    plugins: [cssModules({})],
};

if (isWatch) {
    esbuild.context(options).then(ctx => ctx.watch());
} else {
    esbuild.build(options).catch(() => process.exit(1));
}
