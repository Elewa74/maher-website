import type { NextConfig } from 'next';

// GitHub Pages preview builds are served from https://<user>.github.io/<repo>/,
// so they set NEXT_PUBLIC_BASE_PATH=/<repo>. Local dev and the production domain leave it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

// Arabic is the primary language and is served from the site root (/, /platform, …);
// English stays under /en. Internally both render from app/[locale].
const arabicPages = 'platform|uae-curriculum|teachers|leaders|insights|faq';

const nextConfig: NextConfig = {
  basePath,
  async rewrites() {
    return [
      { source: '/', destination: '/ar' },
      { source: `/:slug(${arabicPages})`, destination: '/ar/:slug' },
    ];
  },
  async redirects() {
    return [
      { source: '/ar', destination: '/', permanent: true },
      { source: `/ar/:slug(${arabicPages})`, destination: '/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
