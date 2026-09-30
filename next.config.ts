import type { NextConfig } from 'next';

// GitHub Pages preview builds are served from https://<user>.github.io/<repo>/,
// so they set NEXT_PUBLIC_BASE_PATH=/<repo>. Local dev and the main deployment leave it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = { basePath };

export default nextConfig;
