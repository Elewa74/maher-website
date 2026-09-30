import {
  Binary,
  BookOpen,
  Building2,
  CheckCircle2,
  Landmark,
  UserRound,
  UsersRound,
} from 'lucide-react';
import type { FeatureItem, HeroCopy, HomeContent, SectionCopy } from '../../content/types';
import type { Locale } from '../../lib/i18n';
import { ButtonLink } from '../common/button-link';
import { Eyebrow } from '../common/eyebrow';
import { SitePhoto } from '../common/site-photo';
import { MaherCharacter } from '../common/maher-character';
import { devicesTrio, media } from '../../lib/media';
import { Section } from '../layout/section';
import { Reveal } from '../motion/reveal';
import { CurriculumSkillMap } from '../product-ui/curriculum-skill-map';
import { DistrictDrilldown } from '../product-ui/district-drilldown';
import { PrerequisitePathway } from '../product-ui/prerequisite-pathway';
import { StudentLearningChoices } from '../product-ui/student-learning-choices';
import { TeacherContentSelection } from '../product-ui/teacher-content-selection';
import { SchoolOverview } from '../product-ui/school-overview';
import { ClosingCta } from './closing-cta';
import { HeroJourney } from './hero-journey';
import { InsightTabs } from './insight-tabs';
import { InstitutionalReadiness } from './institutional-readiness';

const labelIcons = [BookOpen, UsersRound];
const audienceIcons = [UserRound, UsersRound, Building2, Landmark];

function SectionHeading({ copy, align = 'start' }: { copy: SectionCopy; align?: 'start' | 'center' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {copy.eyebrow ? <Eyebrow>{copy.eyebrow}</Eyebrow> : null}
      <h2>{copy.title}</h2>
      <p>{copy.description}</p>
    </div>
  );
}

function PointList({ points }: { points?: string[] }) {
  if (!points) return null;
  return <ul className="point-list">{points.map((point) => <li key={point}><CheckCircle2 size={18}/><span>{point}</span></li>)}</ul>;
}

function FeatureCards({ items, icons }: { items: FeatureItem[]; icons?: typeof audienceIcons }) {
  return (
    <div className="feature-card-grid">
      {items.map((item, index) => {
        const Icon = icons?.[index];
        return (
          <article className="feature-card" key={item.title}>
            {Icon ? <span className="feature-card__icon"><Icon size={22} /></span> : <span className="feature-card__index">{String(index + 1).padStart(2, '0')}</span>}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        );
      })}
    </div>
  );
}

export function HeroSection({ locale, copy }: { locale: Locale; copy: HeroCopy }) {
  return (
    <section className="hero-section hero--journey">
      <div className="site-container hero-grid">
        <Reveal className="hero-copy">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1>{copy.title.split(/(?<=\.)\s+/).map((line) => <span className="hero-line" key={line}>{line}{' '}</span>)}<span className="hero-accent">{copy.titleAccent}</span></h1>
          <p>{copy.description}</p>
          <div className="hero-actions">
            <ButtonLink href={copy.actions[0].href}>{copy.actions[0].label}</ButtonLink>
            <ButtonLink href={copy.actions[1].href} variant="secondary">{copy.actions[1].label}</ButtonLink>
          </div>
          <ul className="hero-labels" aria-label={locale === 'ar' ? 'ملامح المنصة' : 'Platform highlights'}>
            {copy.labels.map((label, index) => { const Icon = labelIcons[index]; return <li key={label}><Icon size={19}/><span>{label}</span></li>; })}
          </ul>
        </Reveal>
        <Reveal className="hero-visual" delay={0.1}><HeroJourney locale={locale} copy={copy} /></Reveal>
      </div>
    </section>
  );
}

export function HomeSections({ locale, copy }: { locale: Locale; copy: HomeContent }) {
  return (
    <>
      <HeroSection locale={locale} copy={copy.hero} />

      <Section className="audiences-section site-section--white">
        <Reveal><SectionHeading copy={copy.audiences} align="center" /></Reveal>
        <Reveal delay={0.06}><SitePhoto item={media.audiences} locale={locale} className="photo-band" sizes="(max-width: 1240px) 100vw, 1200px" /></Reveal>
        <Reveal delay={0.08}><FeatureCards items={copy.audiences.items} icons={audienceIcons} /></Reveal>
      </Section>

      <Section className="student-choice-section">
        <div className="story-grid story-grid--visual-first">
          <Reveal className="story-visual story-visual--character"><StudentLearningChoices locale={locale}/><MaherCharacter pose="three-quarter" className="story-character" /></Reveal>
          <Reveal className="story-copy" delay={0.1}>
            <SectionHeading copy={copy.studentChoices}/>
            <FeatureCards items={copy.studentChoices.items}/>
          </Reveal>
        </div>
      </Section>

      <Section className="site-section--blue adaptive-detail-section" id="adaptive-learning">
        <Reveal><SectionHeading copy={copy.adaptive} align="center" /></Reveal>
        <Reveal className="adaptive-step-grid" delay={0.08}>
          {copy.adaptive.steps.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}
        </Reveal>
        <Reveal className="adaptive-path-stage" delay={0.12}><PrerequisitePathway locale={locale}/></Reveal>
        <Reveal className="evidence-note" delay={0.16}><Binary size={20}/><p>{copy.adaptive.evidenceNote}</p></Reveal>
      </Section>

      <Section className="curriculum-story site-section--white">
        <div className="story-grid">
          <Reveal className="story-copy"><SectionHeading copy={copy.curriculum}/><PointList points={copy.curriculum.points}/>{copy.curriculum.action ? <ButtonLink href={copy.curriculum.action.href} variant="quiet">{copy.curriculum.action.label}</ButtonLink> : null}</Reveal>
          <Reveal className="story-visual" delay={0.1}><CurriculumSkillMap locale={locale}/></Reveal>
        </div>
      </Section>

      <Section className="teacher-story">
        <div className="story-grid">
          <Reveal className="story-copy"><SectionHeading copy={copy.teachers}/><PointList points={copy.teachers.points}/>{copy.teachers.action ? <ButtonLink href={copy.teachers.action.href} variant="quiet">{copy.teachers.action.label}</ButtonLink> : null}</Reveal>
          <Reveal className="story-visual" delay={0.1}><TeacherContentSelection locale={locale}/></Reveal>
        </div>
      </Section>

      <Section className="site-section--navy leader-story">
        <div className="story-grid story-grid--visual-first">
          <Reveal className="story-visual leadership-preview-stack"><SchoolOverview locale={locale}/><DistrictDrilldown locale={locale}/></Reveal>
          <Reveal className="story-copy story-copy--light" delay={0.1}><SectionHeading copy={copy.leaders}/><PointList points={copy.leaders.points}/>{copy.leaders.action ? <ButtonLink href={copy.leaders.action.href} variant="secondary">{copy.leaders.action.label}</ButtonLink> : null}</Reveal>
        </div>
      </Section>

      <Section className="site-section--white insights-story">
        <Reveal><SectionHeading copy={copy.insights} align="center"/></Reveal>
        <Reveal delay={0.1}><InsightTabs locale={locale} items={copy.insights.tabs}/></Reveal>
        {copy.insights.action ? <div className="center-action"><ButtonLink href={copy.insights.action.href} variant="quiet">{copy.insights.action.label}</ButtonLink></div> : null}
      </Section>

      <Section className="institutional-section">
        <Reveal><InstitutionalReadiness locale={locale} copy={copy.institutional} media={<SitePhoto item={media.schoolInterior} locale={locale} className="photo-band photo-band--slim" sizes="(max-width: 1240px) 100vw, 1200px" />}/></Reveal>
      </Section>

      <Section className="devices-story site-section--white">
        <div className="story-grid story-grid--visual-first">
          <Reveal className="story-visual"><SitePhoto item={devicesTrio(locale)} locale={locale} className="device-photo" sizes="(max-width: 900px) 100vw, 55vw" /></Reveal>
          <Reveal className="story-copy" delay={0.1}><SectionHeading copy={copy.devices}/><div className="device-labels"><span>{locale === 'ar' ? 'حاسوب' : 'Desktop'}</span><span>{locale === 'ar' ? 'جهاز لوحي' : 'Tablet'}</span><span>{locale === 'ar' ? 'هاتف' : 'Mobile'}</span></div></Reveal>
        </div>
      </Section>

      <ClosingCta copy={copy.finalCta} />
    </>
  );
}
