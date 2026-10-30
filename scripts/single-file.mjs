/** Builds one self-contained HTML file (images embedded, hash routing) for quick phone previews. */
import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = process.argv[2] || join(root, 'preview.html');
const r = await build({
  entryPoints: [join(root, 'src/main.tsx')], bundle: true, minify: true, write: false, outdir: 'x', format: 'iife',
  target: ['es2020', 'safari15', 'chrome90', 'firefox90'], jsx: 'automatic', logLevel: 'error',
  define: { __HASH__: 'true', 'process.env.NODE_ENV': '"production"' },
});
let js = r.outputFiles.find((f) => f.path.endsWith('.js')).text;
const css = r.outputFiles.find((f) => f.path.endsWith('.css')).text;
const used = [...new Set([...js.matchAll(/"(\/(?:img|brand)\/[\w.-]+\.(?:webp|png))"/g)].map((m) => m[1]))];
const mime = (f) => (f.endsWith('.png') ? 'image/png' : 'image/webp');
const map = {};
for (const f of used) {
  map[f] = `data:${mime(f)};base64,` + readFileSync(join(root, 'public', f)).toString('base64');
  js = js.split(`"${f}"`).join(`window.__A[${JSON.stringify(f)}]`);
}
const safe = (t) => t.replace(/<\/(script|style)/gi, '<\\/$1');
const html = `<title>Thomas Contracting Website</title>
<meta name="description" content="Demo website for Thomas Contracting & Scrap Removal, Lansing NY">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap">
<style>${safe(css)}</style>
<div id="root"></div>
<script>window.__A=${safe(JSON.stringify(map))};</script>
<script>${safe(js)}</script>
`;
writeFileSync(out, html);
console.log('wrote', out, (html.length / 1e6).toFixed(2) + ' MB', used.length, 'assets');
