import type { PageSlug } from '../lib/i18n';

export type Action = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  slug: '' | PageSlug;
};

export type SectionCopy = {
  eyebrow?: string;
  title: string;
  description: string;
  points?: string[];
  action?: Action;
};

export type HeroCopy = SectionCopy & {
  titleAccent: string;
  labels: string[];
  actions: Action[];
  /** Station names along the hero learning road, in journey order. */
  journey: [string, string, string];
  /** Illustrative "next step" card shown on the road. */
  nextStep: { label: string; title: string; progress: string };
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type FeatureCollectionCopy = SectionCopy & {
  items: FeatureItem[];
};

export type AdaptiveStep = FeatureItem & {
  number: string;
};

export type AdaptiveHomeCopy = SectionCopy & {
  steps: AdaptiveStep[];
  evidenceNote: string;
  pathway: string[];
};

export type InstitutionalCopy = FeatureCollectionCopy & {
  qualifier: string;
};

export type InsightTab = {
  label: string;
  title: string;
  description: string;
  value: string;
  detail: string;
};

export type HomeContent = {
  hero: HeroCopy;
  audiences: FeatureCollectionCopy;
  studentChoices: FeatureCollectionCopy;
  adaptive: AdaptiveHomeCopy;
  curriculum: SectionCopy;
  teachers: SectionCopy;
  leaders: SectionCopy;
  insights: SectionCopy & { tabs: InsightTab[] };
  institutional: InstitutionalCopy;
  devices: SectionCopy;
  finalCta: SectionCopy & { actions: Action[] };
};

export type Story = {
  number: string;
  title: string;
  description: string;
  points?: string[];
  visual:
    | 'journey'
    | 'student-choices'
    | 'placement'
    | 'prerequisite'
    | 'teacher-content'
    | 'assignment-monitoring'
    | 'attempt-details'
    | 'school-overview'
    | 'district-drilldown'
    | 'activity'
    | 'path'
    | 'curriculum-map'
    | 'devices';
};

export type PageContent = {
  kind: 'stories' | 'faq';
  eyebrow: string;
  title: string;
  description: string;
  stories: Story[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type MetadataCopy = {
  title: string;
  description: string;
};

export type SiteContent = {
  brand: {
    name: 'MAHER';
    arabicName: 'ماهر';
    statement: string;
  };
  nav: NavItem[];
  common: {
    language: string;
    learnMore: string;
    menu: string;
    close: string;
  };
  home: HomeContent;
  pages: Record<PageSlug, PageContent>;
  faqs: FaqItem[];
  metadata: Record<'home' | PageSlug, MetadataCopy>;
  footer: {
    note: string;
    productStatus: string;
    rights: string;
  };
};
