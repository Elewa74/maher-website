import { describe, expect, it } from 'vitest';
import { buildPageMetadata, sitemapEntries } from '../lib/seo';

describe('localized SEO outputs', () => {
  it('creates equivalent canonical and alternate URLs', () => {
    const metadata = buildPageMetadata('ar', 'teachers');
    expect(metadata.alternates?.canonical).toBe('/teachers');
    expect(metadata.alternates?.languages).toEqual({
      ar: '/teachers',
      en: '/en/teachers',
      'x-default': '/teachers',
    });
  });

  it('publishes every localized public page', () => {
    const entries = sitemapEntries();
    expect(entries).toHaveLength(14);
    expect(entries.map((entry) => entry.url)).toContain(
      'https://maherlearn.com/uae-curriculum',
    );
    expect(entries.map((entry) => entry.url)).not.toContain(
      'https://maherlearn.com/bilingual',
    );
  });
});
