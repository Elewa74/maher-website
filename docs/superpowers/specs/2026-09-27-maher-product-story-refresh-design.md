# MAHER Product Story and UAE Curriculum Refresh

## Objective

Refresh the existing bilingual MAHER marketing website so it explains the target product experience for UAE schools, education leaders, and the Ministry of Education while preserving the current visual identity, typography, spacing, responsive behavior, and restrained motion system.

The website remains informational during this phase. It must not imply that the platform, integrations, institutional capabilities, measured outcomes, government approvals, or displayed datasets are currently live, certified, or in production use.

## Success Criteria

- The site clearly presents MAHER as an adaptive mathematics platform for UAE learners from KG to Grade 8.
- UAE curriculum alignment, grade-level learning outcomes, prerequisite skills, assessment evidence, and UAE-appropriate contexts are central to the product story.
- Student, teacher, school leadership, and district/MOE experiences are explained without building operational dashboards.
- Login, request-access, demo-booking, registration, and account-creation actions are absent everywhere.
- Arabic and English remain available in one site, with language switching preserving the equivalent route.
- Every displayed name, number, metric, and chart is clearly identified as illustrative.
- The final source archive contains the necessary hidden hosting configuration, a clear README, and no credentials.

## Constraints and Non-Goals

The implementation will preserve the existing blue, cyan, teal, purple, navy, and restrained orange palette; existing font choices; broad spacing rhythm; card shapes; product-frame language; and reduced-motion behavior. This is a content and product-story evolution, not a visual redesign.

The public site will not include:

- login or authentication screens;
- request-access, registration, demo-booking, or lead-capture forms;
- a parent portal, chatbot, social network, store, payments, or subjects other than mathematics;
- competitor names or copied competitor interfaces;
- unverified improvement percentages, testimonials, government endorsements, certifications, or real learner data;
- wording that states or implies that the target platform capabilities are already built, deployed, tested, or used by schools.

Because `hello@maher.education` has not been confirmed as a real public contact address, it will be removed from the footer rather than included as contact information.

## Information Architecture

The localized route structure will be:

- `/en` and `/ar`
- `/[locale]/platform`
- `/[locale]/uae-curriculum`
- `/[locale]/teachers`
- `/[locale]/leaders`
- `/[locale]/insights`
- `/[locale]/faq`

The existing `/[locale]/bilingual` route, page, navigation item, metadata entry, sitemap entry, and content model entry will be removed. Arabic and English localization remain part of the site implementation, but bilingual delivery will not be positioned as a standalone marketing feature.

Navigation labels will be:

1. Home / الرئيسية
2. Platform / المنصة
3. UAE Curriculum / المنهج الإماراتي
4. For Teachers / للمعلمين
5. For Schools & Education Leaders / للمدارس وقيادات التعليم
6. Insights / التقارير والرؤى
7. FAQ / الأسئلة الشائعة

Desktop and mobile navigation will contain the same informational destinations. The only persistent utility action will be the language switcher.

## Content Architecture

The typed content model will continue to provide matching English and Arabic data. It will be updated to remove login, request-access, and bilingual-marketing fields and to add explicit structures for:

- the four product audiences;
- the three student learning choices;
- adaptive-learning steps and evidence rules;
- the prerequisite-skill example;
- UAE curriculum alignment points;
- teacher workflow stages;
- school leadership and district/MOE views;
- institutional target requirements;
- product-state and illustrative-data disclosures.

Localized content will be authored naturally in each language. Arabic will remain professional Modern Standard Arabic, and all route, directional, and layout behavior will continue to derive from the active locale.

## Homepage Narrative

The existing homepage composition will be reused and reshaped into the following narrative chapters.

### 1. Hero

The current hero presentation and product composition remain visually intact. The copy becomes:

Arabic:

- `لكل طالب مسار يناسب احتياجاته.`
- `وماهر يرشده من الفهم إلى الإتقان.`
- `منصة رياضيات تكيفية لطلبة دولة الإمارات من الروضة إلى الصف الثامن، تربط الممارسة بمخرجات المنهج وتحدد الخطوة التعليمية المناسبة لكل طالب.`

English:

- `Every learner has a path.`
- `MAHER guides the journey from understanding to mastery.`
- `An adaptive mathematics platform for UAE learners from KG to Grade 8, connecting practice with curriculum outcomes and each learner’s next appropriate step.`

The primary action is `Explore How MAHER Works / استكشف كيف يعمل ماهر` and links to the homepage adaptive-learning section. A secondary informational action may link to the UAE Curriculum page. No access-related action appears.

### 2. Who MAHER Serves

A concise four-part presentation introduces Student, Teacher, School Leadership, and District/MOE. Each item explains its intended role without presenting a complete dashboard.

### 3. Student Learning Choices

A new product preview presents:

- Assigned Work;
- My Adaptive Path;
- Explore by Topic.

The accompanying copy states that a new learner starts from their registered grade and a short placement process, while a returning learner resumes from the last saved learning state.

### 4. Adaptive Learning

The adaptive section uses an eight-step explanation:

1. start from the learner's registered grade;
2. complete a short placement assessment;
3. collect multiple pieces of skill-level evidence;
4. identify a confirmed learning gap;
5. move to a prerequisite skill without changing the learner's official grade;
6. complete supported prerequisite practice;
7. return to the original skill and complete a mastery check;
8. continue from the saved learning state on the next visit.

The section explicitly states that one activity result does not establish mastery. Decisions depend on multiple attempts, types of evidence, and levels of difficulty.

The example pathway is:

`Grade 3 Addition → Regrouping Gap → Grade 2 Place Value Prerequisite → Supported Practice → Return to Grade 3 Addition → Mastery Check`

### 5. UAE Curriculum Alignment

The homepage introduces mathematics pathways aligned with the UAE curriculum. It explains the relationship among grade, learning outcome, skill, prerequisites, activities, and assessments. Supporting content references AED, metric units, UAE-appropriate learning situations, and mathematical terminology used in UAE schools without claiming government approval.

### 6. Teacher Experience

A focused teacher story shows content selection, assignment, monitoring, attempt evidence, and recommended action. The homepage remains concise and links to the full Teachers page.

### 7. School and System Visibility

The homepage distinguishes school-level visibility from district/MOE-level visibility, using separate product previews and clear illustrative-data markers.

### 8. Insights

The existing progressive insight interaction is retained but rewritten around the decisions supported at student, class, school, and system levels. Metrics remain illustrative and avoid unsupported impact claims.

### 9. Designed for Institutional Use

A compact section presents the following as target design and implementation requirements:

- Microsoft 365 and Active Directory integration;
- 2FA according to ministry policies;
- approved API integrations with school, student, and assessment systems;
- role- and organizational-scope-based permissions;
- encryption and audit logs;
- ministry data hosting and processing within the UAE;
- WCAG 2.1 AA requirements;
- support for school computers, tablets, phones, and commonly used school devices.

The section will use future-oriented and requirement-oriented wording. It will not state that these capabilities are currently operational or tested.

### 10. Product-State Disclosure

A quiet disclosure will appear in the footer or immediately above it:

Arabic:

`تعرض هذه الصفحة تصور تجربة منصة ماهر والخصائص المستهدفة أثناء مرحلة التطوير. جميع البيانات والأسماء والنتائج المعروضة أمثلة توضيحية.`

English:

`This website presents MAHER’s target product experience during development. All names, data and results shown are illustrative.`

The disclosure will use normal footer styling and will not be presented as a warning banner.

## Internal Pages

### Platform

The Platform page explains the student entry state, the three learning choices, placement, evidence collection, prerequisite movement, supported practice, return to the original skill, mastery checks, later review, and saved-state continuation. It will state clearly that official grade placement does not change when the learner receives prerequisite support.

### UAE Curriculum

The new UAE Curriculum page replaces the Bilingual Learning page. It explains grade-level learning outcomes, skill sequencing, prerequisite relationships across lessons and grades, aligned activities and assessments, UAE context, AED, metric units, and school-appropriate terminology. All wording uses `aligned with the UAE curriculum`, never `MOE approved`.

### Teachers

The Teachers page follows one coherent workflow:

1. open My Classes and choose a class;
2. browse content by topic or UAE curriculum alignment;
3. choose grade, learning outcome, and skill;
4. preview an activity;
5. assign it to a learner, group, or class;
6. monitor Not Started, In Progress, and Completed states;
7. inspect attempt count and individual attempt details;
8. view last login, online/offline state, and time spent;
9. analyze skill, learning outcome, difficulty, and cognitive level;
10. review Students Requiring Attention with reason, evidence, affected skill or prerequisite, and suggested teacher action.

These steps are presented through compact marketing mockups, not a functional teacher dashboard.

### Schools and Education Leaders

The Leaders page contains two clearly separated scopes.

School Leadership covers platform use within one school, class and learner progress, assignment completion, skill and outcome progress, attention indicators, and authorized drill-down from school to class to learner.

District/MOE covers schools in the authorized scope, comparisons across schools and time periods, filters for emirate, district, school, grade, teacher, and learner, curriculum progress, authorized drill-down, and target exports in Excel, CSV, and PDF formats.

Every name, number, metric, chart, table, and status shown on this page will carry `Illustrative Data / بيانات توضيحية` within or immediately beside the visualization.

### Insights

The Insights page connects evidence to decisions at learner, class, school, and system levels. It explains skill, learning-outcome, difficulty, and cognitive-level analysis without claiming predictive accuracy or real measured impact.

### FAQ

The FAQ will answer questions about target learners, UAE curriculum alignment, adaptive decision-making, prerequisite support, teacher use, leadership visibility, illustrative data, target institutional requirements, and the product's current development-stage status. Access-request questions and answers will be removed.

## Product Preview Components

The existing `ProductFrame` visual language will be preserved. Repeated generic screens will be replaced by focused components, each serving one narrative purpose:

- `StudentLearningChoices` for Assigned Work, My Adaptive Path, and Explore by Topic;
- `PlacementAssessment` for the short diagnostic starting point;
- `PrerequisitePathway` for the Grade 3 addition example and return loop;
- `CurriculumSkillMap` for grade, learning outcome, skill, and prerequisite relationships;
- `TeacherContentSelection` for browsing, filtering, previewing, and assigning content;
- `AssignmentMonitoring` for assignment states and completion visibility;
- `StudentAttemptDetails` for attempts, evidence, difficulty, cognitive level, and suggested action;
- `SchoolOverview` for school-level use and progress;
- `DistrictDrilldown` for organizational filters, comparison, authorized drill-down, and target export options.

All preview data will remain local and static. A reusable localized illustrative-data label will appear inside every preview containing names, figures, metrics, or charts. Existing visual tokens and responsive product-frame behavior will be reused so the new mockups feel native to the current site.

## Interaction and Data Flow

The site remains statically rendered from local typed content. No authentication, form submission, analytics backend, external API, or remote dataset will be added.

The language switcher will replace only the locale segment and preserve the current page slug. The hero anchor will target an existing `id="adaptive-learning"` section. All other actions will link to existing localized routes or existing sections.

Product previews are semantic presentational components. Any tabs or disclosures will use accessible native or established project patterns, expose state to assistive technology, support keyboard use, and remain understandable without animation.

## Visual and Responsive Behavior

Existing design tokens, spacing, typography, shadows, radii, gradients, and motion primitives will be retained. New content will follow current `Section`, `PageHero`, `Reveal`, `ButtonLink`, and `ProductFrame` patterns.

Desktop layouts may use two-column story compositions. Tablet and mobile will reorder content into a single readable narrative, avoid compressed desktop dashboards, preserve 44px practical touch targets, and prevent horizontal overflow. Arabic layouts will retain correct RTL reading order and directional-icon behavior.

## Claims and Disclosure Rules

The following rules apply to all English and Arabic content:

- use `aligned with the UAE curriculum`, never `MOE approved`;
- refer to institutional capabilities as target requirements or planned product experience;
- never claim that integrations, hosting, security controls, exports, accessibility conformance, or organizational dashboards are currently live or tested;
- never use real learner data or names presented as real people;
- never present an activity result as sufficient evidence of mastery;
- place an illustrative-data marker beside every visible mockup dataset;
- keep the development-stage disclosure visible but visually quiet.

## SEO, Sitemap, and Route Integrity

Metadata will be rewritten for the refreshed product story. The bilingual page metadata and sitemap URLs will be removed, and localized UAE Curriculum URLs will be added. Canonical and alternate-language mappings will continue to use equivalent routes.

Automated route checks will confirm that every header, mobile-menu, footer, hero, section, and page action points to a valid route or an existing anchor.

## Testing and Verification

Automated coverage will be updated or added for:

- matching Arabic and English content schemas;
- the new `uae-curriculum` slug and removal of `bilingual`;
- the seven-item localized navigation;
- removal of login and request-access types and content;
- absence of login, request-access, and demo-booking calls to action, routes, and anchors; an illustrative `Last active / آخر دخول` teacher-status field is allowed because it describes learner activity rather than offering authentication;
- presence of the development-stage disclosure in both languages;
- presence of illustrative-data labels in every data-bearing preview;
- the hero adaptive anchor and all internal links;
- the adaptive-learning evidence and prerequisite-return story;
- UAE curriculum terminology without government-approval claims;
- localized metadata, sitemap, and route lists;
- language switching that preserves the equivalent page.

Before delivery, run:

- `pnpm test`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`

Manual browser verification will cover every English and Arabic route at desktop and mobile sizes, header and footer navigation, mobile navigation, equivalent-route language switching, anchor integrity, illustrative-data labels, UAE curriculum positioning, RTL/LTR layout, responsive overflow, and absence of wording that presents target capabilities as completed product functionality.

## Delivery Package

The final archive will be named with the delivery date and will include source code, localized content, tests, README, package and lock files, and `.openai/hosting.json` recovered from the current Sites project. It will exclude `.git`, `node_modules`, build outputs, caches, temporary tooling directories, prior ZIP archives, credentials, and secrets.

The README will explain requirements, dependency installation, local development, English and Arabic URLs, testing, production build, and the role of `.openai/hosting.json`. The delivery summary will list changed files and report the exact outcome of each automated and manual verification step.
