import { describe, expect, it } from 'vitest';
import {
  directionFor,
  isLocale,
  localeHref,
  localizedPath,
  publicPaths,
} from '../lib/i18n';

describe('locale helpers', () => {
  it('rejects unsupported locale segments', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('ar')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(isLocale('')).toBe(false);
  });

  it('returns the document direction for each supported locale', () => {
    expect(directionFor('en')).toBe('ltr');
    expect(directionFor('ar')).toBe('rtl');
  });

  it('serves Arabic from the root and English under /en', () => {
    expect(localeHref('ar')).toBe('/');
    expect(localeHref('ar', 'teachers')).toBe('/teachers');
    expect(localeHref('en')).toBe('/en');
    expect(localeHref('en', 'faq')).toBe('/en/faq');
  });

  it('preserves the equivalent page when switching languages', () => {
    expect(localizedPath('ar', '/en/teachers')).toBe('/teachers');
    expect(localizedPath('en', '/leaders')).toBe('/en/leaders');
    expect(localizedPath('ar', '/en')).toBe('/');
    expect(localizedPath('en', '/')).toBe('/en');
    expect(localizedPath('ar', '/en/uae-curriculum')).toBe('/uae-curriculum');
    expect(localizedPath('en', '/ar/leaders')).toBe('/en/leaders');
  });

  it('publishes seven routes for each locale', () => {
    expect(publicPaths).toHaveLength(14);
    expect(publicPaths).toContain('/');
    expect(publicPaths).toContain('/en');
    expect(publicPaths).toContain('/faq');
    expect(publicPaths).not.toContain('/ar/faq');
    expect(publicPaths).toContain('/en/uae-curriculum');
    expect(publicPaths).not.toContain('/en/bilingual');
  });
});
