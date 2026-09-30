import { siteContent } from '../content';
import { ogImage } from './media';
import { localeHref, pageSlugs, publicPaths, type Locale, type PageSlug } from './i18n';

// Production domain for canonical URLs, Open Graph and the sitemap. Set NEXT_PUBLIC_SITE_URL at build time.
export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://maherlearn.com').replace(/\/$/, '');

export function buildPageMetadata(locale: Locale, page: 'home' | PageSlug) {
  const slug = page === 'home' ? '' : page;
  const url = localeHref(locale, slug);
  const copy = siteContent[locale].metadata[page];
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: url,
      languages: { ar: localeHref('ar', slug), en: localeHref('en', slug), 'x-default': localeHref('ar', slug) },
    },
    openGraph: {
      type: 'website' as const,
      locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
      title: copy.title,
      description: copy.description,
      url,
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
    changeFrequency: path === '/en' || path === '/' ? ('weekly' as const) : ('monthly' as const),
    priority: path === '/en' || path === '/' ? 1 : 0.8,
  }));
}

export const metadataPageSlugs = pageSlugs;
