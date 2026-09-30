/**
 * Optional sub-path the site is served from (GitHub Pages previews: /<repo>).
 * Empty for local dev and the main deployment. Inlined at build time.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

/** Prefix a root-relative URL ("/ar/faq", "/media/x.webp") with the base path. */
export function withBase(path: string): string {
  if (!BASE_PATH || !path.startsWith('/') || path.startsWith('//')) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}

/** Route pathname without the base path or a trailing slash, for active-link checks. */
export function routePath(pathname: string): string {
  let p = pathname;
  if (BASE_PATH && (p === BASE_PATH || p.startsWith(`${BASE_PATH}/`))) p = p.slice(BASE_PATH.length) || '/';
  return p.length > 1 ? p.replace(/\/$/, '') : p;
}
