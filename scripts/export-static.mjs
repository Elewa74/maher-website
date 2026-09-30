// Static snapshot for GitHub Pages previews.
// Usage: build with NEXT_PUBLIC_BASE_PATH=/<repo>, start the production server, then
//   BASE_URL=http://127.0.0.1:8788 NEXT_PUBLIC_BASE_PATH=/<repo> node scripts/export-static.mjs
// Writes ./out: one index.html per route, 404.html, and the built client assets.
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const origin = process.env.BASE_URL || 'http://127.0.0.1:8788';
const out = process.env.OUT_DIR || 'out';
const locales = ['ar', 'en'];
const slugs = ['platform', 'uae-curriculum', 'teachers', 'leaders', 'insights', 'faq'];
const routes = locales.flatMap((l) => [`/${l}`, ...slugs.map((s) => `/${l}/${s}`)]);

// Root-relative paths in our own markup/CSS that need the Pages sub-path in front.
const roots = '(?:ar|en)(?=[/"\'?#\\\\)])|media/|brand/|fonts/|art/|favicon|apple-touch-icon|icon-\\d';
const rootRe = new RegExp(`(^|[\\s"'(=,]|\\\\")/(?!${base.slice(1) || '\\u0000'}/)(${roots})`, 'g');
const prefix = (text) => (base ? text.replace(rootRe, (_m, lead, root) => `${lead}${base}/${root}`) : text);
// The bundler re-bases public files referenced from CSS under _next/static/; point them back at public/.
const fixCssPublic = (text) => (base ? text.replaceAll(`${base}/_next/static/fonts/`, `${base}/fonts/`).replaceAll(`${base}/_next/static/art/`, `${base}/art/`) : text);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync('dist/client', out, { recursive: true });
for (const junk of ['_headers', '.assetsignore', '.vite', 'vinext-client-entry-manifest.json', 'favicon.svg']) rmSync(join(out, junk), { recursive: true, force: true });
// With a basePath the bundler nests hashed assets under dist/client/<base>/; Pages serves out/ at <base>/.
if (base) {
  cpSync(join('dist/client', base), out, { recursive: true });
  rmSync(join(out, base), { recursive: true, force: true });
}

// Rewrite markup only. Inline <script> blocks carry the RSC flight payload, which must stay byte-identical.
const prefixHtml = (html) => html.split(/(<script\b[\s\S]*?<\/script>)/i).map((part, i) => (i % 2 ? part : prefix(part))).join('');

async function grab(path) {
  const res = await fetch(`${origin}${base}${path}`);
  return { status: res.status, html: await res.text() };
}

for (const route of routes) {
  const { status, html } = await grab(route);
  if (status !== 200) throw new Error(`${route} → HTTP ${status}`);
  mkdirSync(join(out, route), { recursive: true });
  writeFileSync(join(out, route, 'index.html'), prefixHtml(html));
  console.log('page', route);
}

// Root redirects to the Arabic home; 404 uses the app's own not-found page.
writeFileSync(join(out, 'index.html'), `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${base}/ar/"><link rel="canonical" href="${base}/ar/"><title>MAHER</title>`);
writeFileSync(join(out, '404.html'), prefixHtml((await grab('/__missing__')).html));
writeFileSync(join(out, '.nojekyll'), '');
for (const file of ['robots.txt', 'sitemap.xml']) {
  const res = await fetch(`${origin}${base}/${file}`);
  if (res.ok) writeFileSync(join(out, file), await res.text());
}
// Root deployments (a real domain) get ready-made configs for the common web servers.
if (!base) cpSync('deploy/server-configs', out, { recursive: true });

// Fix root-relative URLs inside built CSS/JS (fonts, dunes art, media).
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(css|js)$/.test(name)) writeFileSync(p, fixCssPublic(prefix(readFileSync(p, 'utf8'))));
  }
}
walk(join(out, '_next'));
console.log(`done → ${out}/ (base "${base || '/'}")`);
