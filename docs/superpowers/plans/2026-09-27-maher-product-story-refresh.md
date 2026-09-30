# MAHER Product Story and UAE Curriculum Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the existing MAHER marketing site around UAE curriculum-aligned adaptive mathematics, remove all access functionality, add focused product-story mockups, and deliver a verified bilingual source archive.

**Architecture:** Keep the existing locale-segmented static React architecture and visual system. Evolve the typed content contract and route list first, then add small semantic preview components behind the existing `ProductFrame`, wire them into the shared homepage/internal-page renderers, and finish with contract tests, browser QA, and a clean ZIP package.

**Tech Stack:** TypeScript 5.9, React 19, Vinext/Next-compatible App Router, Tailwind CSS 4/global CSS, Framer Motion, Lucide React, Vitest, pnpm.

**Spec:** `docs/superpowers/specs/2026-09-27-maher-product-story-refresh-design.md`

## Global Constraints

- Preserve the current visual identity, typography, spacing rhythm, responsive behavior, and restrained motion; do not redesign the site.
- Keep the site informational and static: no login, authentication, forms, registration, demo booking, request access, analytics backend, or external data source.
- Support only `en` and `ar`; the language switcher must preserve the equivalent current route.
- Replace `/[locale]/bilingual` with `/[locale]/uae-curriculum`; do not retain the old page or navigation link.
- Use `aligned with the UAE curriculum`; never use `MOE approved` or an equivalent government-approval claim.
- Present Microsoft 365, Active Directory, 2FA, APIs, permissions, encryption, audit logs, UAE data residency, WCAG 2.1 AA, device support, and exports only as target requirements or intended capabilities.
- Mark every visible name, number, result, status, metric, table, and chart in product previews as `Illustrative Data / بيانات توضيحية`.
- Never use real learner data, competitor names, unsupported outcomes, testimonials, or claims that the target platform is already built or in use.
- Keep the product-state disclosure quiet and visible in the footer in both languages.
- Do not add dependencies unless an existing library cannot meet a requirement.
- Preserve `.openai/hosting.json` exactly; never invent a hosting ID or place credentials in the package.

## Review Focus

- Language switching from every route, especially `/uae-curriculum`, must produce the equivalent valid route; Task 1 pins this in `tests/i18n.test.ts` and `tests/seo.test.ts`.
- The hero's `#adaptive-learning` action must resolve to one unique section ID in both locale renders; Task 2 pins this in `tests/components.test.tsx` and Task 7 audits all content links.
- Every data-bearing preview must render the localized illustrative-data label; Tasks 2–6 add component assertions and Task 7 adds a source-wide contract check.
- Long Arabic labels and RTL directional flows must not overflow or reverse incorrectly on 360px mobile viewports; Task 7 includes explicit Arabic mobile browser checks.
- Institutional and ministry-facing copy must remain future-oriented and must not imply live functionality or approval; Tasks 1 and 6 add prohibited-claim tests, and Task 7 performs a final rendered-copy scan.

## File Map

**Core contract and routes**

- `lib/i18n.ts`: supported locale routes and equivalent-route switching.
- `lib/seo.ts`: localized canonical, alternate, and sitemap entries.
- `content/types.ts`: bilingual content and product-preview contracts.
- `content/en.ts`, `content/ar.ts`: all visible English and Arabic copy.
- `app/[locale]/uae-curriculum/page.tsx`: new localized curriculum page.
- `app/[locale]/bilingual/page.tsx`: delete.

**Shared page composition**

- `components/sections/home-sections.tsx`: eleven-chapter homepage narrative and adaptive anchor.
- `components/sections/feature-story.tsx`: maps typed visual names to focused previews.
- `components/layout/site-header.tsx`, `mobile-nav.tsx`, `site-footer.tsx`: information-only navigation and product-state disclosure.
- `components/sections/insight-tabs.tsx`: illustrative insight presentation.

**Focused previews**

- `components/common/illustrative-data-label.tsx`: reusable localized disclosure.
- `components/product-ui/student-learning-choices.tsx`: three student entry choices.
- `components/product-ui/placement-assessment.tsx`: registered-grade diagnostic entry.
- `components/product-ui/prerequisite-pathway.tsx`: prerequisite detour and return loop.
- `components/product-ui/curriculum-skill-map.tsx`: grade/outcome/skill/prerequisite model.
- `components/product-ui/teacher-content-selection.tsx`: browse, preview, and assign flow.
- `components/product-ui/assignment-monitoring.tsx`: assignment states and learner activity.
- `components/product-ui/student-attempt-details.tsx`: evidence and attention explanation.
- `components/product-ui/school-overview.tsx`: school scope and drill-down entry.
- `components/product-ui/district-drilldown.tsx`: district/MOE filters, comparison, and target exports.
- `components/sections/institutional-readiness.tsx`: target institutional requirements.
- `components/product-ui/demo-data.ts`: static illustrative datasets only.

**Validation and delivery**

- `tests/content.test.ts`, `home-content.test.ts`, `pages-content.test.ts`, `i18n.test.ts`, `seo.test.ts`: content and route contract.
- `tests/components.test.tsx`, `product-data.test.ts`: semantic preview and dataset checks.
- `tests/site-contract.test.ts`: prohibited actions/claims, valid routes/anchors, and disclosures.
- `app/globals.css`: visual integration and responsive behavior.
- `README.md`: local development, validation, production build, locales, and hosting configuration.

---

### Task 1: Migrate the Public Content, Route, and Access Contract

**Files:**

- Modify: `tests/content.test.ts`
- Modify: `tests/home-content.test.ts`
- Modify: `tests/pages-content.test.ts`
- Modify: `tests/i18n.test.ts`
- Modify: `tests/seo.test.ts`
- Modify: `tests/components.test.tsx`
- Create: `tests/site-contract.test.ts`
- Modify: `content/types.ts`
- Modify: `content/en.ts`
- Modify: `content/ar.ts`
- Modify: `lib/i18n.ts`
- Modify: `components/sections/home-sections.tsx`
- Modify: `components/sections/feature-story.tsx`
- Modify: `components/layout/site-header.tsx`
- Modify: `components/layout/mobile-nav.tsx`
- Modify: `components/layout/site-footer.tsx`
- Create: `app/[locale]/uae-curriculum/page.tsx`
- Delete: `app/[locale]/bilingual/page.tsx`
- Delete: `components/product-ui/bilingual-activity.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Produces: `PageSlug = 'platform' | 'uae-curriculum' | 'teachers' | 'leaders' | 'insights' | 'faq'`.
- Produces: `SiteContent.common` with `language`, `learnMore`, `menu`, and `close`; no `login` or `requestAccess`.
- Produces: `SiteContent.footer.productStatus: string` with the exact localized development-stage disclosure.
- Produces: `HomeContent` keys in this order: `hero`, `audiences`, `studentChoices`, `adaptive`, `curriculum`, `teachers`, `leaders`, `insights`, `institutional`, `devices`, `finalCta`.
- Produces: `/[locale]/uae-curriculum` and removes `/[locale]/bilingual`.

- [ ] **Step 1: Rewrite route and content tests to define the new public contract**

Update the five existing contract tests so they assert seven navigation items per locale, fourteen public paths total, `/ar/uae-curriculum` in sitemap output, no bilingual route, the eleven homepage keys above, and story coverage for `platform`, `uae-curriculum`, `teachers`, `leaders`, and `insights`. Remove the obsolete `BilingualActivity` import and component test from `tests/components.test.tsx` in the same migration.

- [ ] **Step 2: Add the first prohibited-action and product-status tests**

Create `tests/site-contract.test.ts` with tests named `removes access and authentication actions` and `states the development-stage product status`. Collect every `Action` and navigation destination and assert no label or href offers login, request access, registration, or demo booking, and no href equals `#request-access` or targets a login route. This check deliberately allows the illustrative teacher-status label `Last active / آخر دخول`. Assert both exact footer disclosures are present.

- [ ] **Step 3: Run the contract tests and verify they fail for the old structure**

Run: `pnpm vitest --config vitest.config.ts --configLoader runner --run tests/content.test.ts tests/home-content.test.ts tests/pages-content.test.ts tests/i18n.test.ts tests/seo.test.ts tests/site-contract.test.ts`

Expected: FAIL for the old `bilingual` slug, old access copy, missing `uae-curriculum`, and missing product-status fields.

- [ ] **Step 4: Implement the typed route and content migration**

Update `PageSlug`, `HomeContent`, `SiteContent`, English copy, and Arabic copy to match the spec. Use the exact hero copy and disclosure copy from the spec. Write UAE curriculum, adaptive-evidence, teacher, school, district/MOE, insights, institutional-requirement, and FAQ content without operational claims. Keep final actions informational only: Platform, How MAHER Works, Teachers, Leaders, or UAE Curriculum.

- [ ] **Step 5: Replace the route and remove obsolete access/bilingual UI**

Create `app/[locale]/uae-curriculum/page.tsx` with `generateMetadata()` and `InternalStoriesPage` following the existing route pattern. Delete the bilingual route and preview. Remove login from `SiteHeader`, access actions from `MobileNav`, email/request-access UI and IDs from `SiteFooter`, and obsolete `.login-link`, `.bilingual-*`, and request-access CSS. Render the footer product-status text in a quiet paragraph.

- [ ] **Step 6: Recompose the homepage and internal visual fallback mapping**

Update `HomeSections` to render the eleven new content keys with existing layout primitives and temporary existing previews where a focused preview arrives in later tasks. Give the adaptive section the unique ID `adaptive-learning`. Update `InternalStoriesPage` so `uae-curriculum` uses `CurriculumMap` as its hero visual and no switch case references `bilingual`.

- [ ] **Step 7: Run contract tests and the full type check**

Run: `pnpm test && pnpm typecheck`

Expected: the full Vitest suite PASS and TypeScript exits 0.

- [ ] **Step 8: Commit the public contract migration**

```bash
git add app components content lib tests
git commit -m "feat: align MAHER story with UAE curriculum"
```

---

### Task 2: Build the Student Entry and Adaptive Learning Previews

**Files:**

- Create: `components/common/illustrative-data-label.tsx`
- Create: `components/product-ui/student-learning-choices.tsx`
- Create: `components/product-ui/placement-assessment.tsx`
- Create: `components/product-ui/prerequisite-pathway.tsx`
- Modify: `components/product-ui/demo-data.ts`
- Modify: `components/sections/home-sections.tsx`
- Modify: `components/sections/feature-story.tsx`
- Modify: `content/types.ts`
- Modify: `content/en.ts`
- Modify: `content/ar.ts`
- Modify: `tests/components.test.tsx`
- Modify: `tests/product-data.test.ts`
- Modify: `app/globals.css`

**Interfaces:**

- Produces: `IllustrativeDataLabel({ locale }: { locale: Locale }): JSX.Element`.
- Produces: `StudentLearningChoices({ locale }: { locale: Locale }): JSX.Element`.
- Produces: `PlacementAssessment({ locale }: { locale: Locale }): JSX.Element`.
- Produces: `PrerequisitePathway({ locale }: { locale: Locale }): JSX.Element`.
- Produces visual kinds: `'student-choices'`, `'placement'`, and `'prerequisite'`.

- [ ] **Step 1: Add failing semantic preview tests**

In `tests/components.test.tsx`, add tests that render each component in English and Arabic and assert: the three exact student choices; registered Grade 3 starting context; the six-node Grade 3 Addition prerequisite-return example; the sentence that one result does not establish mastery; and a localized illustrative-data label for any displayed status, score, or attempt count.

- [ ] **Step 2: Add failing dataset-boundary tests**

In `tests/product-data.test.ts`, assert `studentChoicesDemo` has exactly three entries and `prerequisiteDemo.steps` contains the exact six English step identifiers in the approved order.

- [ ] **Step 3: Run focused tests and verify missing-component failures**

Run: `pnpm vitest --config vitest.config.ts --configLoader runner --run tests/components.test.tsx tests/product-data.test.ts`

Expected: FAIL because the new exports and datasets do not exist.

- [ ] **Step 4: Implement the reusable label and three student previews**

Use semantic lists, headings, status text, and `ProductFrame`. Keep the placement preview short, show that official grade remains Grade 3 during prerequisite support, and make the return arrow directional with the existing `directional-icon` convention. Do not add client state.

- [ ] **Step 5: Wire the previews into the homepage and Platform page stories**

Add the three visual kinds to `Story.visual`, map them in `StoryVisual`, use `StudentLearningChoices` in the homepage student section, and use `PlacementAssessment` plus `PrerequisitePathway` for the relevant Platform stories. Keep the hero action linked to `#adaptive-learning`.

- [ ] **Step 6: Add visual-system-aligned responsive styles**

Extend `app/globals.css` with existing token colors, radii, shadows, 44px practical controls, RTL-safe logical properties, and a single-column layout below the existing mobile breakpoint.

- [ ] **Step 7: Run focused tests and type check**

Run: `pnpm vitest --config vitest.config.ts --configLoader runner --run tests/components.test.tsx tests/product-data.test.ts && pnpm typecheck`

Expected: PASS and TypeScript exits 0.

- [ ] **Step 8: Commit the student and adaptive previews**

```bash
git add components content tests app/globals.css
git commit -m "feat: explain MAHER adaptive learning journey"
```

---

### Task 3: Build the UAE Curriculum Experience

**Files:**

- Create: `components/product-ui/curriculum-skill-map.tsx`
- Delete: `components/product-ui/curriculum-map.tsx`
- Modify: `components/sections/home-sections.tsx`
- Modify: `components/sections/feature-story.tsx`
- Modify: `content/types.ts`
- Modify: `content/en.ts`
- Modify: `content/ar.ts`
- Modify: `tests/components.test.tsx`
- Modify: `tests/content.test.ts`
- Modify: `app/globals.css`

**Interfaces:**

- Produces: `CurriculumSkillMap({ locale }: { locale: Locale }): JSX.Element`.
- Produces visual kind: `'curriculum-map'`.
- Consumes: `IllustrativeDataLabel({ locale })` from Task 2.

- [ ] **Step 1: Add failing UAE curriculum tests**

Add component assertions for Grade 3, learning outcome, skill, prerequisite, activity, and assessment relationships. Add content assertions for KG–Grade 8, AED/درهم, metric units/الوحدات المترية, UAE-appropriate context, and the exact phrase `aligned with the UAE curriculum`; assert the serialized content does not match `/MOE approved|معتمد من الوزارة/i`.

- [ ] **Step 2: Run focused tests and verify they fail**

Run: `pnpm vitest --config vitest.config.ts --configLoader runner --run tests/components.test.tsx tests/content.test.ts`

Expected: FAIL for the missing component and missing UAE-specific curriculum details.

- [ ] **Step 3: Implement and wire `CurriculumSkillMap`**

Replace the generic stage map with a focused hierarchy that communicates grade → learning outcome → skill → prerequisite → aligned activity/assessment. Include a small UAE-context row for AED, metric units, and classroom terminology. Render the illustrative label because the preview contains grade and outcome examples.

- [ ] **Step 4: Finish the UAE Curriculum page and homepage story**

Use `CurriculumSkillMap` for the homepage curriculum section, page hero, and curriculum-specific stories. Ensure copy distinguishes alignment from approval and explains prerequisites across lessons or previous grades without changing official grade placement.

- [ ] **Step 5: Add responsive and RTL styles**

Use logical borders, gaps, and directional icon rotation. At mobile width, flatten the hierarchy into a readable ordered sequence rather than shrinking the desktop map.

- [ ] **Step 6: Run focused tests and type check**

Run: `pnpm vitest --config vitest.config.ts --configLoader runner --run tests/components.test.tsx tests/content.test.ts && pnpm typecheck`

Expected: PASS and TypeScript exits 0.

- [ ] **Step 7: Commit the UAE curriculum experience**

```bash
git add components content tests app/globals.css
git commit -m "feat: add UAE curriculum learning story"
```

---

### Task 4: Build the Teacher Workflow Previews

**Files:**

- Create: `components/product-ui/teacher-content-selection.tsx`
- Create: `components/product-ui/assignment-monitoring.tsx`
- Create: `components/product-ui/student-attempt-details.tsx`
- Delete: `components/product-ui/teacher-progress.tsx`
- Modify: `components/product-ui/demo-data.ts`
- Modify: `components/sections/home-sections.tsx`
- Modify: `components/sections/feature-story.tsx`
- Modify: `content/types.ts`
- Modify: `content/en.ts`
- Modify: `content/ar.ts`
- Modify: `tests/components.test.tsx`
- Modify: `tests/product-data.test.ts`
- Modify: `app/globals.css`

**Interfaces:**

- Produces: `TeacherContentSelection({ locale }: { locale: Locale }): JSX.Element`.
- Produces: `AssignmentMonitoring({ locale }: { locale: Locale }): JSX.Element`.
- Produces: `StudentAttemptDetails({ locale }: { locale: Locale }): JSX.Element`.
- Produces visual kinds: `'teacher-content'`, `'assignment-monitoring'`, and `'attempt-details'`.
- Consumes: `IllustrativeDataLabel({ locale })` from Task 2.

- [ ] **Step 1: Add failing teacher-workflow component tests**

Assert the rendered previews include My Classes; By Topic; By UAE Curriculum Alignment; grade, outcome, and skill selection; activity preview; learner/group/class assignment targets; Not Started, In Progress, and Completed; attempt count and details; last login; Online/Offline; time used; Skill, Learning Outcome, Difficulty Level, and Cognitive Level; and Students Requiring Attention with reason, evidence, affected prerequisite, and suggested action.

- [ ] **Step 2: Add failing teacher demo-data tests**

Assert all learner records are explicitly illustrative, assignment states use only the three approved values, and the attention record contains `reason`, `evidence`, `affectedSkill`, and `suggestedAction` fields.

- [ ] **Step 3: Run focused tests and verify they fail**

Run: `pnpm vitest --config vitest.config.ts --configLoader runner --run tests/components.test.tsx tests/product-data.test.ts`

Expected: FAIL for missing preview exports and fields.

- [ ] **Step 4: Implement the three teacher previews**

Keep each preview focused on one decision. Reuse `ProductFrame`, semantic tables/lists, and `IllustrativeDataLabel`; do not create a full interactive dashboard. Keep preview controls visually button-like but non-operational unless they are native, accessible tabs with meaningful static content.

- [ ] **Step 5: Wire the teacher narrative**

Use the previews across the homepage teacher chapter and Teachers page so the full specified workflow appears in sequence without repeating one screen. Update the Teachers page hero to use `TeacherContentSelection`, update story visual values, remove every `TeacherProgress` import, and delete the obsolete component. Ensure all copy remains target-experience language.

- [ ] **Step 6: Add responsive and RTL styles**

Allow tables to collapse into labeled rows at mobile width, retain visible statuses without horizontal scrolling, and use logical alignment for Arabic.

- [ ] **Step 7: Run focused tests and type check**

Run: `pnpm vitest --config vitest.config.ts --configLoader runner --run tests/components.test.tsx tests/product-data.test.ts && pnpm typecheck`

Expected: PASS and TypeScript exits 0.

- [ ] **Step 8: Commit the teacher workflow**

```bash
git add components content tests app/globals.css
git commit -m "feat: present the MAHER teacher workflow"
```

---

### Task 5: Separate School Leadership and District/MOE Views

**Files:**

- Create: `components/product-ui/school-overview.tsx`
- Create: `components/product-ui/district-drilldown.tsx`
- Modify: `components/product-ui/demo-data.ts`
- Delete: `components/product-ui/leader-insights.tsx`
- Modify: `components/sections/home-sections.tsx`
- Modify: `components/sections/feature-story.tsx`
- Modify: `content/types.ts`
- Modify: `content/en.ts`
- Modify: `content/ar.ts`
- Modify: `tests/components.test.tsx`
- Modify: `tests/product-data.test.ts`
- Modify: `app/globals.css`

**Interfaces:**

- Produces: `SchoolOverview({ locale }: { locale: Locale }): JSX.Element`.
- Produces: `DistrictDrilldown({ locale }: { locale: Locale }): JSX.Element`.
- Produces visual kinds: `'school-overview'` and `'district-drilldown'`.
- Consumes: `IllustrativeDataLabel({ locale })` from Task 2.

- [ ] **Step 1: Add failing scope-separation tests**

Assert `SchoolOverview` renders use, class/learner progress, assignment completion, outcome progress, attention indicators, and school → class → authorized learner drill-down. Assert `DistrictDrilldown` renders emirate, district, school, grade, teacher, and learner filters; school/period comparison; curriculum progress; district → school → class → authorized learner drill-down; and Excel, CSV, and PDF as target export formats.

- [ ] **Step 2: Add failing illustrative-data tests**

Assert both English and Arabic renders contain the localized illustrative label beside their metrics and that `leaderDemo` is split into `schoolDemo` and `districtDemo` with no real-person identifiers.

- [ ] **Step 3: Run focused tests and verify they fail**

Run: `pnpm vitest --config vitest.config.ts --configLoader runner --run tests/components.test.tsx tests/product-data.test.ts`

Expected: FAIL for missing previews and old combined leader data.

- [ ] **Step 4: Implement the two scoped previews and datasets**

Use distinct visual arrangements: a focused school operational overview and an organizational district/MOE comparison/drill-down surface. Present exports as target capability labels, not working download controls. Place `IllustrativeDataLabel` inside each frame next to the data heading.

- [ ] **Step 5: Wire the homepage and Leaders page**

Use `SchoolOverview` for school-level stories and `DistrictDrilldown` for district/MOE stories. Remove every import and visual mapping for `LeaderInsights`. Preserve the page's alternating editorial layout.

- [ ] **Step 6: Add responsive and RTL styles**

Stack metric groups and filters on mobile, keep drill-down order semantically correct, and prevent charts or labels from exceeding the viewport.

- [ ] **Step 7: Run focused tests and type check**

Run: `pnpm vitest --config vitest.config.ts --configLoader runner --run tests/components.test.tsx tests/product-data.test.ts && pnpm typecheck`

Expected: PASS and TypeScript exits 0.

- [ ] **Step 8: Commit the leadership scope split**

```bash
git add components content tests app/globals.css
git commit -m "feat: separate school and system leadership views"
```

---

### Task 6: Present Insights and Institutional Requirements Safely

**Files:**

- Create: `components/sections/institutional-readiness.tsx`
- Modify: `components/sections/insight-tabs.tsx`
- Modify: `components/sections/home-sections.tsx`
- Modify: `content/types.ts`
- Modify: `content/en.ts`
- Modify: `content/ar.ts`
- Modify: `tests/components.test.tsx`
- Modify: `tests/interaction-logic.test.ts`
- Modify: `tests/site-contract.test.ts`
- Modify: `app/globals.css`

**Interfaces:**

- Produces: `InstitutionalReadiness({ locale, copy }: { locale: Locale; copy: InstitutionalCopy }): JSX.Element`.
- Consumes: `IllustrativeDataLabel({ locale })` from Task 2.
- Preserves: `nextTabIndex(current, movement, count, direction): number` keyboard behavior.

- [ ] **Step 1: Add failing institutional and insight-safety tests**

Assert both locale renders list all eight target requirement groups and visibly qualify them as target design/implementation requirements. Assert insight metrics render the illustrative label. Extend the claim test to reject `/currently integrated|certified compliant|live deployment|مطبق حالياً|معتمد رسمياً|يعمل حالياً/i`.

- [ ] **Step 2: Preserve insight keyboard regression coverage**

Add a case proving Home/End and RTL arrow movement still stay in range for four tabs, matching the learner, class, school, and system levels.

- [ ] **Step 3: Run focused tests and verify they fail for missing qualification**

Run: `pnpm vitest --config vitest.config.ts --configLoader runner --run tests/components.test.tsx tests/interaction-logic.test.ts tests/site-contract.test.ts`

Expected: FAIL for the missing institutional component, four-level insight contract, or illustrative label.

- [ ] **Step 4: Implement the institutional section**

Render eight concise requirement cards using established Section and icon styles. The heading and qualifier must state that these are target design and implementation requirements during development. Do not introduce SOAP, Kafka, databases, or other private architecture details.

- [ ] **Step 5: Update insights and FAQ wording**

Use four decision levels in the Insights page and keep the homepage interaction concise. Add illustrative labels wherever a value is shown. Ensure FAQ answers explain target-state status, illustrative data, curriculum alignment, prerequisite evidence, and institutional requirements without access-request language.

- [ ] **Step 6: Add responsive styles and rerun focused tests**

Run: `pnpm vitest --config vitest.config.ts --configLoader runner --run tests/components.test.tsx tests/interaction-logic.test.ts tests/site-contract.test.ts && pnpm typecheck`

Expected: PASS and TypeScript exits 0.

- [ ] **Step 7: Commit insight and institutional safety**

```bash
git add components content tests app/globals.css
git commit -m "feat: add institutional target requirements"
```

---

### Task 7: Audit Links, Claims, Accessibility, and Responsive Integration

**Files:**

- Modify: `tests/site-contract.test.ts`
- Modify: `tests/components.test.tsx`
- Modify: `app/globals.css`
- Modify: affected component files from Tasks 1–6 only where the audit finds a defect.

**Interfaces:**

- Consumes: `siteContent`, `publicPaths`, every `Action.href`, and rendered preview components.
- Produces: no new product API; this task hardens the integrated site.

- [ ] **Step 1: Add failing route and anchor integrity tests**

Collect every action in both locale content objects. Assert route actions belong to `publicPaths`, anchor actions equal only `#adaptive-learning`, and `HomeSections` contains `id="adaptive-learning"` exactly once. Assert no content or layout source contains `request-access`, `/bilingual`, `login-link`, or the removed contact email.

- [ ] **Step 2: Add failing illustrative-preview coverage**

Render every data-bearing preview in both locales and assert exactly one localized `data-illustrative-label` marker per `ProductFrame`. Components with multiple independently labeled datasets may render one marker per dataset, but the test must pin the intended count explicitly.

- [ ] **Step 3: Run the full test suite and record failures**

Run: `pnpm test`

Expected before fixes: any missed link, label, or removed selector fails with a precise component or content name.

- [ ] **Step 4: Fix only audit findings and finish responsive CSS**

Resolve broken links, duplicate IDs, missing labels, focus visibility, heading-order issues, directional-icon errors, and overflow. At the existing mobile breakpoint, ensure all new cards, tables, filters, paths, and mockups fit a 360px viewport without horizontal scrolling. Respect `prefers-reduced-motion` for all inherited motion.

- [ ] **Step 5: Run complete automated verification**

Run each command separately and save the terminal result:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Expected: each command exits 0; Vitest reports zero failed tests.

- [ ] **Step 6: Commit the integrated audit fixes**

```bash
git add app components content lib tests
git commit -m "test: enforce MAHER public site contracts"
```

---

### Task 8: Perform Browser QA and Build the Delivery Archive

**Files:**

- Modify: `README.md`
- Preserve unchanged: `.openai/hosting.json`
- Create delivery artifact: `MAHER-Website-Source-2026-09-27-refresh.zip`

**Interfaces:**

- Consumes: the completed site and package scripts.
- Produces: a verified source ZIP and exact delivery report.

- [ ] **Step 1: Update README with complete run and validation instructions**

Document Node.js `>=22.13.0`, pnpm installation expectations, `pnpm install`, `pnpm dev`, `/en`, `/ar`, all four verification commands, `pnpm build`, `pnpm start`, language switching, and that `.openai/hosting.json` is an existing Sites project configuration that must be preserved without adding secrets.

- [ ] **Step 2: Start the local site and verify every route in both languages**

Run `pnpm dev`, then inspect `/en`, `/ar`, and all six internal routes per locale. Confirm page headings, no runtime errors, correct language/direction, and equivalent-page language switching including `/en/uae-curriculum` ↔ `/ar/uae-curriculum`.

- [ ] **Step 3: Verify desktop and 360px mobile behavior manually**

At desktop and mobile sizes, verify header/footer links, mobile menu, hero anchor, unique mockups, keyboard focus, FAQ and insight interaction, Arabic RTL order, 360px overflow, and readable tables/filters. Confirm every data-bearing preview visibly says `Illustrative Data / بيانات توضيحية`.

- [ ] **Step 4: Perform the final rendered-copy and source scan**

Run:

```powershell
rg -n -i "login-link|href.{0,40}(/login|#request-access)|request access|اطلب الوصول|book a demo|احجز عرض|MOE approved|معتمد من الوزارة|Matific|IXL" app components content lib
```

Expected: no authentication/access calls to action, prohibited claims, competitor names, or obsolete routes. The teacher-status wording `Last active / آخر دخول` is allowed because it is not an authentication action.

- [ ] **Step 5: Rerun all four verification commands after browser fixes**

Run separately:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Expected: each command exits 0 with no failed tests, type errors, lint errors, or build errors.

- [ ] **Step 6: Commit README and any final QA correction**

```bash
git add README.md app components content lib tests
git commit -m "docs: add MAHER delivery instructions"
```

- [ ] **Step 7: Create a clean dated source archive**

Create a staging directory containing `app`, `components`, `content`, `docs`, `hooks`, `lib`, `public`, `tests`, `.openai/hosting.json`, `.gitignore`, `.oxfmtrc.json`, `.oxlintrc.json`, `components.json`, `next-env.d.ts`, `next.config.ts`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `README.md`, `tsconfig.json`, `vite.config.ts`, and `vitest.config.ts`. Compress the staging directory as `MAHER-Website-Source-2026-09-27-refresh.zip`. Do not include `.git`, `node_modules`, `.next`, `dist`, `.vinext`, `.wrangler`, `.site-scaffold`, `.site-tooling`, prior ZIP files, caches, credentials, or secrets.

- [ ] **Step 8: Verify archive integrity and required hidden configuration**

Open every ZIP entry with `System.IO.Compression.ZipFile`, copy each file stream to `System.IO.Stream.Null`, and assert the archive contains at least:

```text
.openai/hosting.json
app/[locale]/uae-curriculum/page.tsx
content/en.ts
content/ar.ts
components/layout/site-header.tsx
package.json
pnpm-lock.yaml
README.md
```

Expected: no missing required entries and every entry stream reads without error.

- [ ] **Step 9: Prepare the delivery summary**

Report the ZIP path, changed-file groups, exact test count, and exit status for test, typecheck, lint, and build. List all manually inspected routes/viewports and any limitation that could not be verified; do not claim completion without fresh evidence.
