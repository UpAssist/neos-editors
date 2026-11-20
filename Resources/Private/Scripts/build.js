// Build per the Neos UI extensibility guideline (esbuild + extensibilityMap).
// One build serves Neos UI 7.3 up to 9.x.
const esbuild = require('esbuild');
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
