import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Brand } from '../components/common/brand';
import { Reveal } from '../components/motion/reveal';
import { LearnerJourney } from '../components/product-ui/learner-journey';
import { CurriculumSkillMap } from '../components/product-ui/curriculum-skill-map';
import { PlacementAssessment } from '../components/product-ui/placement-assessment';
import { PrerequisitePathway } from '../components/product-ui/prerequisite-pathway';
import { StudentLearningChoices } from '../components/product-ui/student-learning-choices';
import { AssignmentMonitoring } from '../components/product-ui/assignment-monitoring';
import { StudentAttemptDetails } from '../components/product-ui/student-attempt-details';
import { TeacherContentSelection } from '../components/product-ui/teacher-content-selection';
import { DistrictDrilldown } from '../components/product-ui/district-drilldown';
import { DeviceStage } from '../components/product-ui/device-stage';
import { MathActivity } from '../components/product-ui/math-activity';
import { SchoolOverview } from '../components/product-ui/school-overview';
import { InsightTabs } from '../components/sections/insight-tabs';
import { InstitutionalReadiness } from '../components/sections/institutional-readiness';
import { siteContent } from '../content';

describe('MAHER product presentation components', () => {
  it('renders an accessible bilingual brand name', () => {
    const html = renderToStaticMarkup(<Brand />);
    expect(html).toContain('aria-label="MAHER ماهر"');
    expect(html).toContain('MAHER');
  });

  it('describes learner progress without relying on the ring visual', () => {
    const html = renderToStaticMarkup(<LearnerJourney locale="en" />);
    expect(html).toContain('aria-label="72% complete"');
    expect(html).toContain('Compare fractions with bar models');
  });

  it('keeps revealed content visible in the server-rendered no-JavaScript experience', () => {
    const html = renderToStaticMarkup(<Reveal>Always readable</Reveal>);
    expect(html).toContain('Always readable');
    expect(html).not.toContain('opacity:0');
  });

  it('offers the three approved student learning choices', () => {
    const html = renderToStaticMarkup(<StudentLearningChoices locale="en" />);

    expect(html).toContain('Assigned Work');
    expect(html).toContain('My Adaptive Path');
    expect(html).toContain('Explore by Topic');
    expect((html.match(/data-student-choice=/g) ?? [])).toHaveLength(3);
  });

  it('starts placement from the registered Grade 3 context', () => {
    const english = renderToStaticMarkup(<PlacementAssessment locale="en" />);
    const arabic = renderToStaticMarkup(<PlacementAssessment locale="ar" />);

    expect(english).toContain('Registered grade');
    expect(english).toContain('Grade 3');
    expect(english).toContain('Illustrative Data');
    expect(arabic).toContain('الصف المسجل');
    expect(arabic).toContain('الصف الثالث');
    expect(arabic).toContain('بيانات توضيحية');
  });

  it('shows the six-step prerequisite detour and return', () => {
    const english = renderToStaticMarkup(<PrerequisitePathway locale="en" />);
    const arabic = renderToStaticMarkup(<PrerequisitePathway locale="ar" />);

    expect((english.match(/data-pathway-step=/g) ?? [])).toHaveLength(6);
    expect(english).toContain('Grade 3 Addition');
    expect(english).toContain('Grade 2 Place Value Prerequisite');
    expect(english).toContain('Return to Grade 3 Addition');
    expect(english).toContain('One activity result does not establish mastery.');
    expect(english).toContain('Illustrative Data');
    expect(arabic).toContain('لا تعني نتيجة نشاط واحد إتقان المهارة.');
    expect(arabic).toContain('بيانات توضيحية');
  });

  it('connects UAE curriculum outcomes to skills and evidence', () => {
    const english = renderToStaticMarkup(<CurriculumSkillMap locale="en" />);
    const arabic = renderToStaticMarkup(<CurriculumSkillMap locale="ar" />);

    expect(english).toContain('Grade 3');
    expect(english).toContain('Learning outcome');
    expect(english).toContain('Skill');
    expect(english).toContain('Prerequisite');
    expect(english).toContain('Aligned activity');
    expect(english).toContain('Assessment evidence');
    expect(english).toContain('AED');
    expect(english).toContain('Metric units');
    expect(english).toContain('UAE context');
    expect(english).toContain('Illustrative Data');
    expect((english.match(/data-curriculum-node=/g) ?? [])).toHaveLength(6);
    expect(arabic).toContain('مخرج التعلم');
    expect(arabic).toContain('المتطلب السابق');
    expect(arabic).toContain('الدرهم الإماراتي');
    expect(arabic).toContain('الوحدات المترية');
    expect(arabic).toContain('بيانات توضيحية');
  });

  it('shows curriculum-aware teacher content selection and assignment', () => {
    const english = renderToStaticMarkup(<TeacherContentSelection locale="en" />);
    const arabic = renderToStaticMarkup(<TeacherContentSelection locale="ar" />);

    expect(english).toContain('My Classes');
    expect(english).toContain('By Topic');
    expect(english).toContain('By UAE Curriculum Alignment');
    expect(english).toContain('Grade 4');
    expect(english).toContain('Learning outcome');
    expect(english).toContain('Skill');
    expect(english).toContain('Preview activity');
    expect(english).toContain('Learner');
    expect(english).toContain('Group');
    expect(english).toContain('Class');
    expect(english).toContain('Illustrative Data');
    expect(arabic).toContain('فصولي');
    expect(arabic).toContain('حسب ارتباط المنهج الإماراتي');
    expect(arabic).toContain('بيانات توضيحية');
  });

  it('monitors approved assignment and learner activity states', () => {
    const html = renderToStaticMarkup(<AssignmentMonitoring locale="en" />);

    expect(html).toContain('<table');
    expect(html).toContain('<thead');
    expect(html).toContain('<tbody');
    expect((html.match(/<tr/g) ?? [])).toHaveLength(4);
    expect(html).toContain('Not Started');
    expect(html).toContain('In Progress');
    expect(html).toContain('Completed');
    expect(html).toContain('Attempts');
    expect(html).toContain('Last active');
    expect(html).toContain('Online');
    expect(html).toContain('Offline');
    expect(html).toContain('Time used');
    expect(html).toContain('Illustrative Data');
  });

  it('explains attempt evidence and a suggested teacher action', () => {
    const english = renderToStaticMarkup(<StudentAttemptDetails locale="en" />);
    const arabic = renderToStaticMarkup(<StudentAttemptDetails locale="ar" />);

    expect(english).toContain('Students Requiring Attention');
    expect(english).toContain('Reason');
    expect(english).toContain('Evidence');
    expect(english).toContain('Affected prerequisite');
    expect(english).toContain('Suggested action');
    expect(english).toContain('Skill');
    expect(english).toContain('Learning Outcome');
    expect(english).toContain('Difficulty Level');
    expect(english).toContain('Cognitive Level');
    expect((english.match(/data-attempt=/g) ?? [])).toHaveLength(2);
    expect(arabic).toContain('الطلاب الذين يحتاجون إلى متابعة');
    expect(arabic).toContain('الإجراء المقترح');
  });

  it('keeps the school leadership view focused on one school', () => {
    const english = renderToStaticMarkup(<SchoolOverview locale="en" />);
    const arabic = renderToStaticMarkup(<SchoolOverview locale="ar" />);

    expect(english).toContain('Platform use');
    expect(english).toContain('Class progress');
    expect(english).toContain('Learner progress');
    expect(english).toContain('Assignment completion');
    expect(english).toContain('Learning outcome progress');
    expect(english).toContain('Attention indicators');
    expect(english).toContain('School');
    expect(english).toContain('Class');
    expect(english).toContain('Authorised learner');
    expect(english).toContain('Illustrative Data');
    expect(arabic).toContain('استخدام المنصة');
    expect(arabic).toContain('الطالب المصرح به');
    expect(arabic).toContain('بيانات توضيحية');
  });

  it('shows district and ministry filters, drill-down and target exports', () => {
    const english = renderToStaticMarkup(<DistrictDrilldown locale="en" />);
    const arabic = renderToStaticMarkup(<DistrictDrilldown locale="ar" />);

    for (const filter of ['Emirate', 'District', 'School', 'Grade', 'Teacher', 'Learner']) {
      expect(english).toContain(filter);
    }
    expect(english).toContain('Compare schools');
    expect(english).toContain('Compare periods');
    expect(english).toContain('Curriculum progress');
    expect(english).toContain('Authorised learner');
    expect(english).toContain('Target export formats');
    expect(english).toContain('Excel');
    expect(english).toContain('CSV');
    expect(english).toContain('PDF');
    expect(english).toContain('Illustrative Data');
    expect(arabic).toContain('الإمارة');
    expect(arabic).toContain('المنطقة');
    expect(arabic).toContain('صيغ التصدير المستهدفة');
    expect(arabic).toContain('بيانات توضيحية');
  });

  it('presents all eight institutional requirements as development targets in both languages', () => {
    const english = renderToStaticMarkup(
      <InstitutionalReadiness locale="en" copy={siteContent.en.home.institutional} />,
    );
    const arabic = renderToStaticMarkup(
      <InstitutionalReadiness locale="ar" copy={siteContent.ar.home.institutional} />,
    );

    expect((english.match(/data-institutional-requirement=/g) ?? [])).toHaveLength(8);
    expect((arabic.match(/data-institutional-requirement=/g) ?? [])).toHaveLength(8);
    expect(english).toContain('Target design and implementation requirements');
    expect(arabic).toContain('متطلبات تصميم وتنفيذ مستهدفة');
  });

  it('labels insight metrics as illustrative data', () => {
    const english = renderToStaticMarkup(
      <InsightTabs locale="en" items={siteContent.en.home.insights.tabs} />,
    );
    const arabic = renderToStaticMarkup(
      <InsightTabs locale="ar" items={siteContent.ar.home.insights.tabs} />,
    );

    expect(english).toContain('Illustrative Data');
    expect(arabic).toContain('بيانات توضيحية');
  });

  it('labels each data-bearing product preview exactly once in both locales', () => {
    const previews = [
      LearnerJourney,
      StudentLearningChoices,
      PlacementAssessment,
      PrerequisitePathway,
      MathActivity,
      CurriculumSkillMap,
      TeacherContentSelection,
      AssignmentMonitoring,
      StudentAttemptDetails,
      SchoolOverview,
      DistrictDrilldown,
    ];

    for (const Preview of previews) {
      for (const locale of ['en', 'ar'] as const) {
        const html = renderToStaticMarkup(<Preview locale={locale} />);
        expect((html.match(/class="product-frame /g) ?? [])).toHaveLength(1);
        expect((html.match(/data-illustrative-label/g) ?? [])).toHaveLength(1);
      }
    }

    for (const locale of ['en', 'ar'] as const) {
      const html = renderToStaticMarkup(<DeviceStage locale={locale} />);
      expect((html.match(/data-illustrative-label/g) ?? [])).toHaveLength(1);
    }
  });
});
