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

export function localizedPath(locale: Locale, pathname: string): string {
  const suffix = pathname.replace(/^\/(en|ar)(?=\/|$)/, '').replace(/^\/$/, '');
  return `/${locale}${suffix}`;
}

export const publicPaths = locales.flatMap((locale) => [
  `/${locale}`,
  ...pageSlugs.map((slug) => `/${locale}/${slug}`),
]);
