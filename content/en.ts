import type { SiteContent } from './types';

const path = (slug = '') => `/en${slug ? `/${slug}` : ''}`;

export const en: SiteContent = {
  brand: {
    name: 'MAHER',
    arabicName: 'ماهر',
    statement: 'Adaptive mathematics for UAE learners.',
  },
  nav: [
    { label: 'Home', slug: '' },
    { label: 'Platform', slug: 'platform' },
    { label: 'UAE Curriculum', slug: 'uae-curriculum' },
    { label: 'For Teachers', slug: 'teachers' },
    { label: 'For Schools & Education Leaders', slug: 'leaders' },
    { label: 'Insights', slug: 'insights' },
    { label: 'FAQ', slug: 'faq' },
  ],
  common: {
    language: 'العربية',
    learnMore: 'Learn more',
    menu: 'Open menu',
    close: 'Close menu',
  },
  home: {
    hero: {
      eyebrow: 'Learn maths your way',
      title: 'Every learner has a path. With MAHER,',
      titleAccent: 'they reach mastery.',
      description: 'A learning journey that adapts to your child’s needs, step by step.',
      labels: ['UAE curriculum', 'KG to Grade 8'],
      actions: [
        { label: 'Discover the MAHER journey', href: '#adaptive-learning' },
        { label: 'Explore the curriculum', href: path('uae-curriculum') },
      ],
      journey: ['Understand', 'Practise', 'Master'],
      nextStep: { label: 'Your next step', title: 'Explore fractions', progress: '4 of 6' },
    },
    audiences: {
      eyebrow: 'One learning journey. Four connected perspectives.',
      title: 'Designed around the people who support learning.',
      description:
        'MAHER’s target experience connects day-to-day mathematics learning with the information each authorised user needs.',
      items: [
        { title: 'Student', description: 'Learns through activities, a personal path and work assigned by the teacher.' },
        { title: 'Teacher', description: 'Manages classes and assignments, then reviews evidence, progress and skills needing support.' },
        { title: 'School Leadership', description: 'Reviews use, progress, performance and intervention indicators within the school.' },
        { title: 'District / MOE', description: 'Reviews schools, classes and learning trends within the authorised organisational scope.' },
      ],
    },
    studentChoices: {
      eyebrow: 'Student experience',
      title: 'Three clear ways to continue learning.',
      description:
        'A new learner starts from the registered grade and a short placement process. A returning learner resumes from the last saved learning state.',
      items: [
        { title: 'Assigned Work', description: 'Activities and homework selected and sent by the teacher.' },
        { title: 'My Adaptive Path', description: 'A personal learning route that changes as evidence of understanding develops.' },
        { title: 'Explore by Topic', description: 'UAE curriculum topics and skills organised by grade and mathematics domain.' },
      ],
    },
    adaptive: {
      eyebrow: 'How MAHER works',
      title: 'Adaptation follows evidence, not a single answer.',
      description:
        'The target learning model identifies an appropriate starting point, supports confirmed gaps and brings the learner back to the original grade-level goal.',
      steps: [
        { number: '01', title: 'Start from the registered grade', description: 'The learner begins within the official grade recorded by the school.' },
        { number: '02', title: 'Short placement assessment', description: 'A focused diagnostic helps identify a suitable starting point.' },
        { number: '03', title: 'Collect varied evidence', description: 'The model considers attempts, response patterns and levels of difficulty.' },
        { number: '04', title: 'Confirm the learning gap', description: 'A prerequisite detour happens only when more than one signal supports it.' },
        { number: '05', title: 'Practise the prerequisite', description: 'Support may come from an earlier lesson or grade without changing the official grade.' },
        { number: '06', title: 'Build supported understanding', description: 'Guided practice develops the missing foundation.' },
        { number: '07', title: 'Return and check mastery', description: 'The learner returns to the original skill for a new mastery check.' },
        { number: '08', title: 'Continue from saved state', description: 'Later sessions resume from the latest learning state and include follow-up review.' },
      ],
      evidenceNote:
        'One activity result does not establish mastery. A decision depends on multiple pieces of evidence, attempts and levels of difficulty.',
      pathway: [
        'Grade 3 Addition',
        'Regrouping Gap',
        'Grade 2 Place Value Prerequisite',
        'Supported Practice',
        'Return to Grade 3 Addition',
        'Mastery Check',
      ],
    },
    curriculum: {
      eyebrow: 'UAE curriculum alignment',
      title: 'Mathematics pathways connected to grade-level outcomes.',
      description:
        'Mathematics learning aligned with the UAE curriculum, with skills, activities and assessments connected to grade-level learning outcomes.',
      points: [
        'Each skill is connected to its grade, learning outcome and prerequisites.',
        'Content is intended for UAE learners from KG to Grade 8.',
        'Examples can use AED, metric units and situations appropriate to the UAE context.',
      ],
      action: { label: 'Explore UAE curriculum alignment', href: path('uae-curriculum') },
    },
    teachers: {
      eyebrow: 'For teachers',
      title: 'Move from content selection to evidence-informed support.',
      description:
        'The target teacher journey connects class management, curriculum-aligned assignment, attempt details and practical attention cues.',
      points: ['Browse and preview content', 'Assign to a learner, group or class', 'Review evidence and suggested next actions'],
      action: { label: 'For Teachers', href: path('teachers') },
    },
    leaders: {
      eyebrow: 'For schools and education leaders',
      title: 'The right scope of visibility for each authorised role.',
      description:
        'School leaders focus on their school. District and ministry users can review trends across their authorised organisational scope.',
      points: ['School use and curriculum progress', 'Attention indicators and authorised drill-down', 'District and school comparisons using illustrative data'],
      action: { label: 'For Schools & Education Leaders', href: path('leaders') },
    },
    insights: {
      eyebrow: 'Assessment and insights',
      title: 'Connect evidence to the next useful decision.',
      description:
        'Illustrative views progress from one learner to a class, school and wider authorised system scope.',
      tabs: [
        { label: 'Learner', title: 'Understand the current learning state.', description: 'Review skill evidence, prerequisite support and the next appropriate step.', value: '3', detail: 'Illustrative evidence points' },
        { label: 'Class', title: 'See shared needs and individual differences.', description: 'Group attention around skills, outcomes, difficulty and cognitive level.', value: '4', detail: 'Illustrative focus skills' },
        { label: 'School', title: 'Follow use and curriculum progress.', description: 'Review classes, completion and learning outcomes within the school.', value: '12', detail: 'Illustrative classes' },
        { label: 'System', title: 'Compare authorised organisational trends.', description: 'Move from district to school, class and permitted learner detail.', value: '6', detail: 'Illustrative schools' },
      ],
      action: { label: 'Explore Insights', href: path('insights') },
    },
    institutional: {
      eyebrow: 'Designed for institutional use',
      title: 'Target requirements for secure, accessible deployment.',
      description:
        'These items describe intended design and implementation requirements during development, not services represented as currently live or tested.',
      qualifier: 'Target design and implementation requirements',
      items: [
        { title: 'Identity integration', description: 'Target integration with Microsoft 365 and Active Directory.' },
        { title: 'Two-factor authentication', description: 'Target 2FA support according to ministry policies.' },
        { title: 'Approved APIs', description: 'Target integrations with school, student and assessment systems through approved APIs.' },
        { title: 'Scoped permissions', description: 'Target role and organisational-scope permissions for authorised users.' },
        { title: 'Protection and audit', description: 'Target encryption controls and auditable activity records.' },
        { title: 'UAE data residency', description: 'Target hosting and processing of ministry data within the United Arab Emirates.' },
        { title: 'Accessibility', description: 'WCAG 2.1 AA is a target design and implementation requirement.' },
        { title: 'School devices', description: 'Target support for computers, tablets, phones and devices commonly used in schools.' },
      ],
    },
    devices: {
      eyebrow: 'Across school devices',
      title: 'A clear experience wherever learning happens.',
      description:
        'The target experience is designed to adapt across desktop, tablet, phone and devices commonly used in schools.',
    },
    finalCta: {
      eyebrow: 'Explore the product story',
      title: 'See how curriculum, adaptation and evidence connect.',
      description: 'Continue with the platform journey or the teacher experience.',
      actions: [
        { label: 'Explore the Platform', href: path('platform') },
        { label: 'For Teachers', href: path('teachers') },
      ],
    },
  },
  pages: {
    platform: {
      kind: 'stories', eyebrow: 'The MAHER platform', title: 'A learning state that moves with the learner.', description: 'The target platform journey connects registered grade, placement, evidence, prerequisite support, mastery checks and saved continuation.',
      stories: [
        { number: '01', title: 'Choose the next learning route', description: 'Assigned Work, My Adaptive Path and Explore by Topic provide three clear starting choices.', visual: 'student-choices' },
        { number: '02', title: 'Begin from the registered grade', description: 'A new learner starts inside the official school grade and completes a short placement assessment.', visual: 'placement' },
        { number: '03', title: 'Use more than one piece of evidence', description: 'Attempts, response patterns and difficulty levels build a more reliable view of understanding.', visual: 'activity' },
        { number: '04', title: 'Respond to a confirmed gap', description: 'When the evidence supports it, the pathway moves to the relevant prerequisite skill.', visual: 'prerequisite' },
        { number: '05', title: 'Keep the official grade unchanged', description: 'Prerequisite support can come from an earlier lesson or grade without changing school placement.', visual: 'curriculum-map' },
        { number: '06', title: 'Return to the original skill', description: 'After supported practice, the learner returns to the grade-level goal for a new mastery check.', visual: 'prerequisite' },
        { number: '07', title: 'Review for lasting mastery', description: 'A later review provides another evidence point instead of treating one result as final mastery.', visual: 'journey' },
        { number: '08', title: 'Resume from the saved learning state', description: 'A returning learner continues from the latest recorded state across supported school devices.', visual: 'devices' },
      ],
    },
    'uae-curriculum': {
      kind: 'stories', eyebrow: 'UAE curriculum alignment', title: 'Mathematics learning aligned with the UAE curriculum.', description: 'Skills, activities and assessments connect to grade-level learning outcomes and prerequisite relationships from KG to Grade 8.',
      stories: [
        { number: '01', title: 'Grade-level learning outcomes', description: 'Each pathway begins with the mathematics outcomes intended for the learner’s registered grade.', visual: 'curriculum-map' },
        { number: '02', title: 'Skills and prerequisites', description: 'Every skill connects to the knowledge required before it, including prerequisites from earlier lessons or grades.', visual: 'path' },
        { number: '03', title: 'Aligned activities and assessments', description: 'Practice and assessment evidence remain connected to the intended learning outcome.', visual: 'activity' },
        { number: '04', title: 'AED in meaningful contexts', description: 'Money examples can use the UAE dirham and situations familiar to learners in the UAE.', visual: 'activity' },
        { number: '05', title: 'Metric units', description: 'Measurement examples use metric units appropriate to mathematics learning in UAE schools.', visual: 'curriculum-map' },
        { number: '06', title: 'UAE-appropriate situations', description: 'Examples and learning contexts are intended to respect the environment and culture of the UAE.', visual: 'activity' },
        { number: '07', title: 'School-appropriate terminology', description: 'Mathematical language follows terminology used in UAE school contexts in both Arabic and English.', visual: 'curriculum-map' },
      ],
    },
    teachers: {
      kind: 'stories', eyebrow: 'For teachers', title: 'A coherent journey from selection to support.', description: 'The target teacher experience connects classes, UAE curriculum content, assignments, detailed evidence and practical intervention cues.',
      stories: [
        { number: '01', title: 'Open My Classes and choose a class', description: 'Begin with the authorised class and a concise view of learners and current work.', visual: 'teacher-content' },
        { number: '02', title: 'Browse by topic or UAE curriculum alignment', description: 'Choose grade, learning outcome and skill before opening an activity.', visual: 'curriculum-map' },
        { number: '03', title: 'Preview and assign', description: 'Review the activity, then target one learner, a group or the whole class.', visual: 'teacher-content' },
        { number: '04', title: 'Monitor assignment states', description: 'Distinguish Not Started, In Progress and Completed work.', visual: 'assignment-monitoring' },
        { number: '05', title: 'Review every attempt', description: 'See attempt count and the evidence recorded for each attempt.', visual: 'attempt-details' },
        { number: '06', title: 'Understand learner activity', description: 'Use illustrative Last active, Online/Offline and time-used indicators in context.', visual: 'assignment-monitoring' },
        { number: '07', title: 'Analyse the right dimensions', description: 'Review Skill, Learning Outcome, Difficulty Level and Cognitive Level.', visual: 'attempt-details' },
        { number: '08', title: 'Focus attention with evidence', description: 'Students Requiring Attention includes a reason, evidence, affected skill or prerequisite and a suggested teacher action.', visual: 'attempt-details' },
      ],
    },
    leaders: {
      kind: 'stories', eyebrow: 'For schools and education leaders', title: 'Two scopes of visibility, clearly separated.', description: 'The target experience separates school leadership needs from district and ministry-wide authorised views.',
      stories: [
        { number: '01', title: 'School platform use', description: 'School Leadership can review illustrative use, assignment completion and participation inside one school.', visual: 'school-overview' },
        { number: '02', title: 'Class, learner and curriculum progress', description: 'Follow skills and learning outcomes, then identify classes or learners that may need follow-up.', visual: 'curriculum-map' },
        { number: '03', title: 'Authorised school drill-down', description: 'Move from school to class and then to permitted learner detail with attention evidence in context.', visual: 'attempt-details' },
        { number: '04', title: 'District / MOE overview', description: 'Review illustrative schools and learning trends within the authorised organisational scope.', visual: 'district-drilldown' },
        { number: '05', title: 'Comparison, filters and drill-down', description: 'Target filters include emirate, district, school, grade, teacher and learner, with authorised drill-down.', visual: 'district-drilldown' },
        { number: '06', title: 'Target reporting formats', description: 'The intended reporting experience includes target export options for Excel, CSV and PDF.', visual: 'district-drilldown' },
      ],
    },
    insights: {
      kind: 'stories', eyebrow: 'Assessment and insights', title: 'The right evidence for each level of decision.', description: 'Illustrative views move from learner evidence to class, school and wider authorised system context.',
      stories: [
        { number: '01', title: 'Learner level', description: 'Review multiple evidence points, the current learning state and the next appropriate step.', visual: 'journey' },
        { number: '02', title: 'Class level', description: 'Understand shared and individual needs by skill, outcome, difficulty and cognitive level.', visual: 'assignment-monitoring' },
        { number: '03', title: 'School level', description: 'Review use, assignment completion and curriculum progress across authorised classes.', visual: 'school-overview' },
        { number: '04', title: 'District / MOE level', description: 'Compare illustrative trends across authorised schools and reporting periods.', visual: 'district-drilldown' },
      ],
    },
    faq: { kind: 'faq', eyebrow: 'Frequently asked questions', title: 'Clear answers about MAHER’s target experience.', description: 'A concise guide to learners, curriculum alignment, adaptation and institutional requirements.', stories: [] },
  },
  faqs: [
    { question: 'Who is the target learner?', answer: 'MAHER’s target mathematics experience is intended for UAE learners from KG to Grade 8.' },
    { question: 'How is content connected to the UAE curriculum?', answer: 'Skills, activities and assessments are intended to align with grade-level UAE curriculum learning outcomes and prerequisite relationships.' },
    { question: 'How would the adaptive pathway choose a starting point?', answer: 'A new learner would begin from the registered grade and complete a short placement assessment before the pathway uses multiple evidence points to guide practice.' },
    { question: 'Does one correct activity mean a skill is mastered?', answer: 'No. The target model considers more than one attempt, type of evidence and level of difficulty, with later review to check whether mastery is sustained.' },
    { question: 'Can prerequisite support come from an earlier grade?', answer: 'Yes. A learner may practise an earlier prerequisite without changing the official grade recorded by the school, then return to the original grade-level skill.' },
    { question: 'How would MAHER support teachers?', answer: 'The target teacher journey covers content selection, preview and assignment, work status, attempt evidence, activity indicators and suggested support actions.' },
    { question: 'What would school and district leaders see?', answer: 'School leaders would focus on their school, while district and ministry users would view illustrative trends and authorised drill-down within their organisational scope.' },
    { question: 'Are the names, numbers and results real?', answer: 'No. All names, data, metrics and results shown on this website are illustrative examples.' },
    { question: 'Are the institutional capabilities live today?', answer: 'This website presents target design and implementation requirements during development; it does not represent integrations or institutional capabilities as currently live or tested.' },
  ],
  metadata: {
    home: { title: 'MAHER | Adaptive Mathematics for UAE Learners', description: 'Explore MAHER’s target adaptive mathematics experience for UAE learners from KG to Grade 8, aligned with the UAE curriculum.' },
    platform: { title: 'Platform | MAHER', description: 'See how MAHER’s target adaptive journey connects placement, evidence, prerequisite support and mastery checks.' },
    'uae-curriculum': { title: 'UAE Curriculum | MAHER', description: 'Explore mathematics pathways aligned with UAE curriculum outcomes from KG to Grade 8.' },
    teachers: { title: 'For Teachers | MAHER', description: 'Explore the target teacher journey from content selection and assignment to evidence-informed support.' },
    leaders: { title: 'For Schools & Education Leaders | MAHER', description: 'Explore target school leadership and district/MOE views using illustrative data.' },
    insights: { title: 'Assessment and Insights | MAHER', description: 'Understand target learning evidence from learner, class, school and authorised system perspectives.' },
    faq: { title: 'Frequently Asked Questions | MAHER', description: 'Clear answers about MAHER’s target UAE curriculum-aligned adaptive mathematics experience.' },
  },
  footer: {
    note: 'Mathematics pathways for UAE learners.',
    productStatus: 'This website presents MAHER’s target product experience during development. All names, data and results shown are illustrative.',
    rights: 'All rights reserved.',
  },
};
