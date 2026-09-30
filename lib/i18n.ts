export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const pageSlugs = [
  'platform',
  'uae-curriculum',
  'teachers',
  'leaders',
  'insights',
  'faq',
] as const;
export type PageSlug = (typeof pageSlugs)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function directionFor(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

/** Arabic is the primary language and lives at the site root; English lives under /en. */
export const defaultLocale: Locale = 'ar';

/** Public URL of a page: `/` and `/teachers` for Arabic, `/en` and `/en/teachers` for English. */
export function localeHref(locale: Locale, slug: string = ''): string {
  const tail = slug ? `/${slug.replace(/^\//, '')}` : '';
  if (locale === defaultLocale) return tail || '/';
  return `/${locale}${tail}`;
}

/** The same page in another language. Accepts public URLs and legacy /ar/... URLs. */
export function localizedPath(locale: Locale, pathname: string): string {
  const slug = pathname.replace(/^\/(en|ar)(?=\/|$)/, '').replace(/^\/+|\/+$/g, '');
  return localeHref(locale, slug);
}

export const publicPaths = locales.flatMap((locale) => [
  localeHref(locale),
  ...pageSlugs.map((slug) => localeHref(locale, slug)),
]);
