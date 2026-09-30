import { siteContent } from '../content';
import { ogImage } from './media';
import { pageSlugs, publicPaths, type Locale, type PageSlug } from './i18n';

// Production domain for canonical URLs, Open Graph and the sitemap. Set NEXT_PUBLIC_SITE_URL at build time.
export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://maher-learning.almotahida-e-4340.chatgpt.site').replace(/\/$/, '');

export function buildPageMetadata(locale: Locale, page: 'home' | PageSlug) {
  const slug = page === 'home' ? '' : `/${page}`;
  const copy = siteContent[locale].metadata[page];
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${locale}${slug}`,
      languages: { en: `/en${slug}`, ar: `/ar${slug}` },
    },
    openGraph: {
      type: 'website' as const,
      locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
      title: copy.title,
      description: copy.description,
      url: `/${locale}${slug}`,
      images: [{ url: ogImage(locale), width: 1200, height: 630, alt: copy.title }],
    },
    twitter: { card: 'summary_large_image' as const, images: [ogImage(locale)] },
  };
}

export function sitemapEntries() {
  const changed = new Date('2026-09-10T00:00:00.000Z');
  return publicPaths.map((path) => ({
    url: `${siteOrigin}${path}`,
    lastModified: changed,
    changeFrequency: path === '/en' || path === '/ar' ? ('weekly' as const) : ('monthly' as const),
    priority: path === '/en' || path === '/ar' ? 1 : 0.8,
  }));
}

export const metadataPageSlugs = pageSlugs;
