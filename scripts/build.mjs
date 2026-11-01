/**
 * Production build (no Vite required): esbuild bundles React + TypeScript, then this script
 * writes dist/ with one pre-rendered <head> per route, sitemap.xml and robots.txt.
 *
 * Env vars (all optional):
 *   SITE_URL        Final domain, e.g. https://thomascontracting.com (Netlify's URL is used if unset)
 *   ALLOW_INDEXING  "true" to let search engines index the site. Default: noindex (demo)
 */
import { build } from 'esbuild';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const tmp = join(root, '.build-tmp');
const siteUrl = (process.env.SITE_URL || process.env.URL || '').replace(/\/+$/, '');
const indexable = process.env.ALLOW_INDEXING === 'true' && !!siteUrl;
const watch = process.argv.includes('--watch');

const opts = {
  entryPoints: { app: join(root, 'src/main.tsx') },
  bundle: true,
  minify: !watch,
  sourcemap: watch,
  format: 'esm',
  target: ['es2020', 'safari15', 'chrome90', 'firefox90'],
  jsx: 'automatic',
  outdir: join(dist, 'assets'),
  entryNames: '[name]-[hash]',
  loader: { '.webp': 'file', '.png': 'file' },
  define: { __HASH__: 'false', 'process.env.NODE_ENV': watch ? '"development"' : '"production"' },
  metafile: true,
  logLevel: 'info',
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

async function run() {
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist, { recursive: true });
  cpSync(join(root, 'public'), dist, { recursive: true });

  const result = await build(opts);
  const outs = Object.keys(result.metafile.outputs);
  const js = outs.find((f) => f.endsWith('.js')).split('dist/').pop();
  const css = outs.find((f) => f.endsWith('.css')).split('dist/').pop();

  // Load route metadata (shared with the runtime) by bundling lib/seo.ts for Node.
  mkdirSync(tmp, { recursive: true });
  const seoOut = join(tmp, 'seo.mjs');
  await build({ entryPoints: [join(root, 'src/lib/seo.ts')], bundle: true, format: 'esm', platform: 'node', outfile: seoOut, jsx: 'automatic', logLevel: 'silent', external: ['react'] });
  const { ALL_ROUTES, NOT_FOUND_META } = await import(pathToFileURL(seoOut).href + `?t=${Date.now()}`);
  rmSync(tmp, { recursive: true, force: true });

  const template = readFileSync(join(root, 'index.html'), 'utf8');
  const abs = (p) => `${siteUrl}${p}`;

  const render = (meta, isHome = false) => {
    const canonical = siteUrl ? `<link rel="canonical" href="${abs(meta.path === '/' ? '/' : meta.path)}" />` : '<link rel="canonical" href="" />';
    const og = siteUrl ? abs('/img/og-image.jpg') : '';
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Thomas Contracting & Scrap Removal',
      ...(siteUrl && { url: abs('/'), image: abs('/img/og-image.jpg'), logo: abs('/brand/stacked.png') }),
      telephone: '+16072806926',
      areaServed: ['Lansing', 'Ithaca', 'Dryden', 'Trumansburg', 'Freeville', 'Groton'].map((n) => ({ '@type': 'City', name: n + ', NY' })),
      address: { '@type': 'PostalAddress', streetAddress: '2611 Lansing Genoa Townline Rd', addressLocality: 'Lansing', addressRegion: 'NY', postalCode: '14882', addressCountry: 'US' },
      email: 'info@thomas-contracting-lansing.com',
      // Intentionally omitted until verified: hours, ratings.
    };
    return template
      .replaceAll('%TITLE%', esc(meta.title))
      .replaceAll('%DESCRIPTION%', esc(meta.description))
      .replace('%CANONICAL%', canonical)
      .replaceAll('%OG_IMAGE_TAG%', og ? `<meta property="og:image" content="${og}" /><meta name="twitter:image" content="${og}" />` : '')
      .replace('%ROBOTS%', indexable ? 'index, follow' : 'noindex, nofollow')
      .replace('%SCHEMA%', isHome || true ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : '')
      .replace('%JS%', `/${js}`)
      .replace('%CSS%', `/${css}`);
  };

  for (const meta of ALL_ROUTES) {
    const html = render(meta, meta.path === '/');
    const out = meta.path === '/' ? join(dist, 'index.html') : join(dist, meta.path, 'index.html');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
  }
  writeFileSync(join(dist, '404.html'), render(NOT_FOUND_META));

  // robots + sitemap
  writeFileSync(
    join(dist, 'robots.txt'),
    indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n` : 'User-agent: *\nDisallow: /\n# Demo build. Set ALLOW_INDEXING=true and SITE_URL at launch.\n',
  );
  if (siteUrl) {
    const urls = ALL_ROUTES.map((r) => `  <url><loc>${abs(r.path === '/' ? '/' : r.path)}</loc></url>`).join('\n');
    writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  }

  console.log(`\nBuilt ${ALL_ROUTES.length} routes → dist/  (indexing ${indexable ? 'ON' : 'OFF'}, site url: ${siteUrl || 'not set'})`);
}

await run();
if (watch) {
  const ctx = await (await import('esbuild')).context({ ...opts, minify: false });
  await ctx.watch();
  console.log('Watching for changes… (re-run `npm run build` for full HTML regeneration)');
}
