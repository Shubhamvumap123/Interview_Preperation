const esbuild = require('esbuild');
try {
    esbuild.transformSync(require('fs').readFileSync('./src/data/systemDesign.js', 'utf8'), { loader: 'js' });
    require('fs').writeFileSync('./esbuild-err.json', 'No error');
} catch (e) {
    require('fs').writeFileSync('./esbuild-err.json', JSON.stringify({
        message: e.message,
        errors: e.errors,
        stack: e.stack
    }, null, 2));
}
