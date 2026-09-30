import { describe, expect, it } from 'vitest';
import { siteContent } from '../content';

const expectedSections = [
  'hero',
  'audiences',
  'studentChoices',
  'adaptive',
  'curriculum',
  'teachers',
  'leaders',
  'insights',
  'institutional',
  'devices',
  'finalCta',
];

describe('homepage narrative', () => {
  it('keeps the approved eleven-chapter order in both locales', () => {
    expect(Object.keys(siteContent.en.home)).toEqual(expectedSections);
    expect(Object.keys(siteContent.ar.home)).toEqual(expectedSections);
  });

  it('keeps the hero intentionally concise', () => {
    expect(siteContent.en.home.hero.labels).toHaveLength(2);
    expect(siteContent.ar.home.hero.labels).toHaveLength(2);
    expect(siteContent.en.home.hero.actions).toHaveLength(2);
    expect(siteContent.ar.home.hero.actions).toHaveLength(2);
  });

  it('introduces the four audiences and three student choices', () => {
    expect(siteContent.en.home.audiences.items).toHaveLength(4);
    expect(siteContent.ar.home.audiences.items).toHaveLength(4);
    expect(siteContent.en.home.studentChoices.items).toHaveLength(3);
    expect(siteContent.ar.home.studentChoices.items).toHaveLength(3);
  });

  it('covers the four insight levels', () => {
    expect(siteContent.en.home.insights.tabs).toHaveLength(4);
    expect(siteContent.ar.home.insights.tabs).toHaveLength(4);
  });
});
