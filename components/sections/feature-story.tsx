import type { PageContent, Story } from '../../content/types';
import type { Locale, PageSlug } from '../../lib/i18n';
import { Eyebrow } from '../common/eyebrow';
import { SitePhoto } from '../common/site-photo';
import { media, tabletHands, type MediaItem } from '../../lib/media';
import { PageHero } from '../layout/page-hero';
import { getContent } from '../../content';
import { localeHref } from '../../lib/i18n';
import { ClosingCta } from './closing-cta';
import { Section } from '../layout/section';
import { Reveal } from '../motion/reveal';
import { AdaptivePath } from '../product-ui/adaptive-path';
import { AssignmentMonitoring } from '../product-ui/assignment-monitoring';
import { CurriculumSkillMap } from '../product-ui/curriculum-skill-map';
import { DeviceStage } from '../product-ui/device-stage';
import { DistrictDrilldown } from '../product-ui/district-drilldown';
import { LearnerJourney } from '../product-ui/learner-journey';
import { MathActivity } from '../product-ui/math-activity';
import { PlacementAssessment } from '../product-ui/placement-assessment';
import { PrerequisitePathway } from '../product-ui/prerequisite-pathway';
import { StudentAttemptDetails } from '../product-ui/student-attempt-details';
import { StudentLearningChoices } from '../product-ui/student-learning-choices';
import { TeacherContentSelection } from '../product-ui/teacher-content-selection';
import { SchoolOverview } from '../product-ui/school-overview';

function StoryVisual({ story, locale }: { story: Story; locale: Locale }) {
  switch (story.visual) {
    case 'journey': return <LearnerJourney locale={locale} />;
    case 'student-choices': return <StudentLearningChoices locale={locale} />;
    case 'placement': return <PlacementAssessment locale={locale} />;
    case 'prerequisite': return <PrerequisitePathway locale={locale} />;
    case 'teacher-content': return <TeacherContentSelection locale={locale} />;
    case 'assignment-monitoring': return <AssignmentMonitoring locale={locale} />;
    case 'attempt-details': return <StudentAttemptDetails locale={locale} />;
    case 'school-overview': return <SchoolOverview locale={locale} />;
    case 'district-drilldown': return <DistrictDrilldown locale={locale} />;
    case 'activity': return <MathActivity locale={locale} />;
    case 'path': return <AdaptivePath locale={locale} />;
    case 'curriculum-map': return <CurriculumSkillMap locale={locale} />;
    case 'devices': return <DeviceStage locale={locale} />;
  }
}

/** Page-hero photography per internal page (product UI stays in the stories below). */
function heroPhoto(slug: PageSlug, locale: Locale): MediaItem | null {
  switch (slug) {
    case 'platform': return tabletHands(locale);
    case 'uae-curriculum': return media.placeValue;
    case 'teachers': return media.teacherPlanning;
    case 'leaders': return media.leadersMeeting;
    case 'insights': return media.studentThinking;
    default: return null;
  }
}

/** Stories (by position, so AR and EN match) illustrated with a photograph instead of a repeated product view. */
const storyPhotos: Partial<Record<PageSlug, Record<number, MediaItem>>> = {
  platform: { 2: media.innovationFair, 7: media.studentHome },
  teachers: { 4: media.teacherOneToOne },
};

function StoryMedia({ slug, story, index, locale }: { slug: PageSlug; story: Story; index: number; locale: Locale }) {
  const item = storyPhotos[slug]?.[index];
  return item
    ? <SitePhoto item={item} locale={locale} className="story-photo" sizes="(max-width: 900px) 100vw, 45vw" />
    : <StoryVisual story={story} locale={locale} />;
}

export function InternalStoriesPage({ locale, slug, page }: { locale: Locale; slug: PageSlug; page: PageContent }) {
  const photo = heroPhoto(slug, locale);
  const heroVisual = photo
    ? <SitePhoto item={photo} locale={locale} priority className={`page-hero__photo page-hero__photo--${slug}`} sizes="(max-width: 900px) 100vw, 48vw" />
    : <LearnerJourney locale={locale} />;
  return (
    <main id="main-content" className={`internal-page internal-page--${slug}`}>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} visual={heroVisual} />
      {page.stories.map((story, index) => (
        <Section className={`${index % 2 ? 'site-section--white' : ''} feature-story`} key={story.number}>
          <div className={`feature-story__grid ${index % 2 ? 'is-reversed' : ''}`}>
            <Reveal className="feature-story__copy">
              <Eyebrow>{story.number}</Eyebrow>
              <h2>{story.title}</h2>
              <p>{story.description}</p>
              {story.points ? <ul>{story.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
            </Reveal>
            <Reveal className="feature-story__visual" delay={0.08}>
              <StoryMedia slug={slug} story={story} index={index} locale={locale} />
            </Reveal>
          </div>
        </Section>
      ))}
      <ClosingCta copy={getContent(locale).home.finalCta} currentPath={localeHref(locale, slug)} />
    </main>
  );
}
