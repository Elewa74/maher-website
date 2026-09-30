import { describe, expect, it } from 'vitest';
import { buildPageMetadata, sitemapEntries } from '../lib/seo';

describe('localized SEO outputs', () => {
  it('creates equivalent canonical and alternate URLs', () => {
    const metadata = buildPageMetadata('ar', 'teachers');
    expect(metadata.alternates?.canonical).toBe('/ar/teachers');
    expect(metadata.alternates?.languages).toEqual({
      en: '/en/teachers',
      ar: '/ar/teachers',
    });
  });

  it('publishes every localized public page', () => {
    const entries = sitemapEntries();
    expect(entries).toHaveLength(14);
    expect(entries.map((entry) => entry.url)).toContain(
      'https://maher-learning.almotahida-e-4340.chatgpt.site/ar/uae-curriculum',
    );
    expect(entries.map((entry) => entry.url)).not.toContain(
      'https://maher-learning.almotahida-e-4340.chatgpt.site/ar/bilingual',
    );
  });
});
