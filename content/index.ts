import { ar } from './ar';
import { en } from './en';
import type { SiteContent } from './types';
import type { Locale } from '../lib/i18n';

export const siteContent: Record<Locale, SiteContent> = { en, ar };

export function getContent(locale: Locale): SiteContent {
  return siteContent[locale];
}

export type { SiteContent } from './types';
