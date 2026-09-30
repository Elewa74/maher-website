import { describe, expect, it } from 'vitest';
import { siteContent } from '../content';

describe('localized MAHER content', () => {
  it('keeps navigation, page, and FAQ structures aligned', () => {
    expect(siteContent.ar.nav.map((item) => item.slug)).toEqual(
      siteContent.en.nav.map((item) => item.slug),
    );
    expect(Object.keys(siteContent.ar.pages)).toEqual(
      Object.keys(siteContent.en.pages),
    );
    expect(siteContent.ar.nav).toHaveLength(7);
    expect(siteContent.en.nav).toHaveLength(7);
    expect(siteContent.en.nav.map((item) => item.slug)).toContain('uae-curriculum');
    expect(siteContent.en.nav.map((item) => item.slug)).not.toContain('bilingual');
    expect(siteContent.ar.faqs).toHaveLength(9);
    expect(siteContent.en.faqs).toHaveLength(9);
  });

  it('provides complete metadata in both languages', () => {
    for (const locale of ['en', 'ar'] as const) {
      expect(siteContent[locale].metadata.home.title.length).toBeGreaterThan(10);
      expect(siteContent[locale].metadata.home.description.length).toBeGreaterThan(30);
      expect(siteContent[locale].brand.name).toBe('MAHER');
      expect(siteContent[locale].brand.arabicName).toBe('ماهر');
    }
  });

  it('does not expose former brands, competitors, or unsupported hype', () => {
    const visible = JSON.stringify(siteContent);
    const prohibitedFormerNames = [
      ['SCI', 'VR'].join(''),
      ['SCI', 'VR', ' SPARK'].join(''),
    ];

    prohibitedFormerNames.forEach((name) => expect(visible).not.toContain(name));
    expect(visible).not.toMatch(/Matific|DreamBox|Prodigy|IXL/i);
    expect(visible).not.toMatch(/revolutionary|world's best|guaranteed results/i);
    expect(visible).not.toMatch(/MOE approved|معتمد من الوزارة/i);
  });

  it('centres UAE curriculum alignment without claiming approval', () => {
    const english = JSON.stringify(siteContent.en);
    const arabic = JSON.stringify(siteContent.ar);

    expect(english).toContain('aligned with the UAE curriculum');
    expect(english).toContain('KG to Grade 8');
    expect(english).toContain('AED');
    expect(english).toContain('metric units');
    expect(english).toContain('UAE-appropriate');
    expect(arabic).toContain('المنهج الإماراتي');
    expect(arabic).toContain('الروضة إلى الصف الثامن');
    expect(arabic).toContain('الدرهم الإماراتي');
    expect(arabic).toContain('الوحدات المترية');
  });
});
