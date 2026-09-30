import { describe, expect, it } from 'vitest';
import {
  directionFor,
  isLocale,
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

  it('preserves the equivalent page when switching languages', () => {
    expect(localizedPath('ar', '/en/teachers')).toBe('/ar/teachers');
    expect(localizedPath('en', '/ar/leaders')).toBe('/en/leaders');
    expect(localizedPath('ar', '/en')).toBe('/ar');
    expect(localizedPath('en', '/')).toBe('/en');
    expect(localizedPath('ar', '/en/uae-curriculum')).toBe('/ar/uae-curriculum');
  });

  it('publishes seven routes for each locale', () => {
    expect(publicPaths).toHaveLength(14);
    expect(publicPaths).toContain('/en');
    expect(publicPaths).toContain('/ar/faq');
    expect(publicPaths).toContain('/en/uae-curriculum');
    expect(publicPaths).not.toContain('/en/bilingual');
  });
});
