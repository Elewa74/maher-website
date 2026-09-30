// Static export of the MAHER website.
//
// The site is rendered by the vinext production server; this script requests every
// public page from that server and writes plain HTML files next to the built assets,
// so the result can be hosted on any static web server (Apache, IIS, Nginx, Pages).
//
// Usage (after `pnpm build`, with the production server running):
//   BASE_URL=http://127.0.0.1:8788 OUT_DIR=out node scripts/export-static.mjs
// Optional:
//   NEXT_PUBLIC_BASE_PATH=/maher-website   when the site lives in a sub-folder (GitHub Pages)
//
// Output layout (Arabic at the root, English under /en):
//   index.html, platform/index.html, …, en/index.html, en/platform/index.html, …,
//   404.html, robots.txt, sitemap.xml, _next/…, media/…, fonts/…, plus server configs
//   from deploy/server-configs when exporting for a domain root.
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const origin = process.env.BASE_URL || 'http://127.0.0.1:8788';
const out = process.env.OUT_DIR || 'out';

const slugs = ['platform', 'uae-curriculum', 'teachers', 'leaders', 'insights', 'faq'];
const routes = ['/', ...slugs.map((s) => `/${s}`), '/en', ...slugs.map((s) => `/en/${s}`)];

// Safety net for root-relative URLs in markup/CSS when exporting to a sub-folder.
// The app already prefixes its own links (lib/base-path.ts); this only catches stragglers.
const roots = `(?:en|${slugs.join('|')})(?=[/"'?#\\\\)])|media/|brand/|fonts/|art/|favicon|apple-touch-icon|icon-\\d`;
const rootRe = new RegExp(`(^|[\\s"'(=,]|\\\\")/(?!${base.slice(1) || '\\u0000'}/)(${roots})`, 'g');
const prefix = (text) => (base ? text.replace(rootRe, (_m, lead, root) => `${lead}${base}/${root}`) : text);
// The bundler re-bases public files referenced from CSS under _next/static/; point them back at public/.
const fixCssPublic = (text) =>
  base ? text.replaceAll(`${base}/_next/static/fonts/`, `${base}/fonts/`).replaceAll(`${base}/_next/static/art/`, `${base}/art/`) : text;
// Rewrite markup only: inline <script> blocks carry the RSC payload, which must stay byte-identical.
const prefixHtml = (html) => html.split(/(<script\b[\s\S]*?<\/script>)/i).map((part, i) => (i % 2 ? part : prefix(part))).join('');

async function grab(path, { expectOk = true } = {}) {
  const res = await fetch(`${origin}${base}${path}`, { redirect: 'manual' });
  if (expectOk && res.status !== 200) throw new Error(`${path} → HTTP ${res.status}`);
  return { status: res.status, body: await res.text() };
}

// 1. Built client assets (hashed JS/CSS, fonts, images).
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync('dist/client', out, { recursive: true });
if (base) {
  // With a basePath the bundler nests hashed assets under dist/client/<base>/.
  cpSync(join('dist/client', base), out, { recursive: true });
  rmSync(join(out, base), { recursive: true, force: true });
}
for (const junk of ['_headers', '.assetsignore', '.vite', 'vinext-client-entry-manifest.json', 'favicon.svg']) {
  rmSync(join(out, junk), { recursive: true, force: true });
}

// 2. One index.html per page.
for (const route of routes) {
  const { body } = await grab(route);
  const dir = join(out, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), prefixHtml(body));
  console.log('page', route);
}

// 3. 404 page, robots.txt and sitemap.xml.
// Any unknown /ar/... address renders the Arabic 404 inside the site layout (app/[locale]/[...missing]).
const missing = await grab('/ar/__404', { expectOk: false });
writeFileSync(join(out, '404.html'), prefixHtml(missing.body));
for (const file of ['robots.txt', 'sitemap.xml']) {
  const { body } = await grab(`/${file}`);
  writeFileSync(join(out, file), body);
}

// Old /ar/... addresses: tiny redirect pages, so they also work on hosts without redirect rules
// (GitHub Pages, plain S3). Apache/IIS/Nginx/CloudFront configs redirect with a real 301 first.
for (const route of ['/', ...slugs.map((s) => `/${s}`)]) {
  const target = `${base}${route}`;
  const dir = join(out, 'ar', route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, 'index.html'),
    `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>ماهر</title>` +
      `<meta name="robots" content="noindex"><link rel="canonical" href="${target}">` +
      `<meta http-equiv="refresh" content="0; url=${target}"><script>location.replace(${JSON.stringify(target)} + location.hash)</script>` +
      `</head><body><a href="${target}">ماهر</a></body></html>`,
  );
}

// 4. Fix root-relative URLs inside built CSS/JS (fonts, dunes art, media).
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(css|js)$/.test(name)) writeFileSync(p, fixCssPublic(prefix(readFileSync(p, 'utf8'))));
  }
}
walk(join(out, '_next'));

// 5. Hosting extras.
if (base) {
  writeFileSync(join(out, '.nojekyll'), ''); // GitHub Pages: serve the _next/ folder
} else {
  // Apache and IIS read these from the web root; the Nginx/AWS examples ship next to site/ instead.
  for (const file of ['.htaccess', 'web.config']) cpSync(join('deploy/server-configs', file), join(out, file));
}
console.log(`done → ${out}/ (base "${base || '/'}")`);
