import { describe, expect, it } from 'vitest';
import { siteContent } from '../content';

const expectedStoryCounts = {
  platform: 8,
  'uae-curriculum': 7,
  teachers: 8,
  leaders: 6,
  insights: 4,
} as const;

describe('internal page stories', () => {
  it('covers every required narrative topic in both locales', () => {
    for (const locale of ['en', 'ar'] as const) {
      for (const [slug, count] of Object.entries(expectedStoryCounts)) {
        const page = siteContent[locale].pages[slug as keyof typeof expectedStoryCounts];
        expect(page.stories, `${locale}/${slug}`).toHaveLength(count);
      }
    }
  });

  it('keeps the FAQ separate from feature-story pages', () => {
    expect(siteContent.en.pages.faq.kind).toBe('faq');
    expect(siteContent.ar.pages.faq.kind).toBe('faq');
  });
});
