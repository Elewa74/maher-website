# MAHER Bilingual Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, validate, preview, and publish a spacious ministry-ready bilingual MAHER marketing website with localized routes and reusable live product mockups.

**Architecture:** Use the Sites Next-compatible App Router starter with locale-first routes under `app/[locale]`, typed centralized content, Server Components for narrative content, and narrowly scoped Client Components for navigation, motion, tabs, and accordions. Reusable HTML/React product mockups share a small product-shell vocabulary and illustrative data while each page composes a distinct, low-density story.

**Tech Stack:** Next-compatible App Router, React, TypeScript, Tailwind CSS, Framer Motion, Lucide icons, Vitest where available, ESLint, and the OpenAI Sites hosting toolchain.

**Spec:** `docs/superpowers/specs/2026-09-09-maher-bilingual-website-design.md`

## Global Constraints

- The brand is only `MAHER | ماهر`; former product names must never occur in production source or visible copy.
- Public routes are `/en`, `/ar`, and localized `platform`, `teachers`, `leaders`, `bilingual`, `insights`, and `faq` pages.
- English is LTR and Arabic is intentionally composed in professional Modern Standard Arabic with RTL-aware spacing, flow, navigation, icons, and product UI.
- The homepage is a spacious eleven-chapter narrative with one primary idea per viewport and no more than two or three major cards visible at once.
- Product mockups use semantic HTML/React and only illustrative data, marked by discreet source comments.
- Main body text is at least 16px, regular controls are at least 14px, and interactive targets are practically at least 44px.
- Motion is subtle, comprehension-led, and disabled or reduced under `prefers-reduced-motion`.
- No unsupported impact, certification, ministry-workflow, security, legal, or real-world numerical claims are introduced.
- No social-preview image is created because none was requested; localized Open Graph title and description metadata are still required.
- Completion requires lint, type checking, a production build, content scans, route/navigation checks, desktop/mobile visual QA in both locales, and a deployed Sites URL.

## Planned File Structure

- `app/layout.tsx`: root metadata shell and global document setup.
- `app/page.tsx`: locale-aware root redirect.
- `app/[locale]/layout.tsx`: locale validation, localized metadata alternates, `lang`/`dir`, and shared chrome.
- `app/[locale]/page.tsx`: localized homepage composition.
- `app/[locale]/{platform,teachers,leaders,bilingual,insights,faq}/page.tsx`: focused internal page compositions.
- `app/not-found.tsx`, `app/robots.ts`, `app/sitemap.ts`: resilience and SEO outputs.
- `app/globals.css`: brand tokens, typography, shared atmosphere, accessibility, and responsive foundations.
- `content/types.ts`: content contracts.
- `content/en.ts`, `content/ar.ts`, `content/index.ts`: centralized copy and typed lookup.
- `lib/i18n.ts`: locale validation, direction, route mapping, and language-preserving helpers.
- `components/layout/{site-header,mobile-nav,site-footer,section,page-hero}.tsx`: global chrome and page structure.
- `components/common/{brand,button-link,eyebrow,icon}.tsx`: small reusable brand primitives.
- `components/motion/reveal.tsx`: reduced-motion-aware entrance wrapper.
- `components/product-ui/{product-frame,learner-journey,math-activity,adaptive-path,teacher-progress,leader-insights,bilingual-activity,curriculum-map,device-stage}.tsx`: live marketing product surfaces.
- `components/sections/{home-sections,feature-story,insight-tabs,faq-accordion}.tsx`: narrative and interactive sections.
- `tests/{i18n,content,seo}.test.ts`: deterministic locale, content-parity, metadata, and prohibited-copy checks.

---

### Task 1: Scaffold the Site and Establish a Tested Locale Contract

**Files:**
- Create or preserve generated project configuration files and `.openai/hosting.json`.
- Create: `lib/i18n.ts`
- Create: `content/types.ts`
- Create: `content/en.ts`
- Create: `content/ar.ts`
- Create: `content/index.ts`
- Create: `tests/i18n.test.ts`
- Create: `tests/content.test.ts`

**Interfaces:**
- Produces: `type Locale = "en" | "ar"`, `locales`, `isLocale(value)`, `directionFor(locale)`, `localizedPath(locale, pathname)`, `siteContent: Record<Locale, SiteContent>`, and `getContent(locale)`.
- Consumes: the approved design spec and starter scripts.

- [ ] **Step 1: Scaffold the project without overwriting the committed docs**

Run the Sites initializer against a clean temporary directory using the pinned command from the environment guide, then copy its generated source and dotfiles into the workspace while preserving `.git` and `docs`. Keep the generated package manager, lockfile, and `shadcn` add-on.

Run in PowerShell:

```powershell
$maherScaffoldDir = Join-Path ([System.IO.Path]::GetTempPath()) ("maher-sites-" + [guid]::NewGuid())
New-Item -ItemType Directory -Path $maherScaffoldDir
npm create --yes @openai/sites@0.3.0 $maherScaffoldDir -- --yes --add-ons shadcn --install
Get-ChildItem -Force -LiteralPath $maherScaffoldDir |
  Where-Object Name -Ne 'node_modules' |
  Copy-Item -Destination . -Recurse -Force
npm install
```

Expected: the temporary directory contains the generated app, package scripts, dependencies, and `.openai/hosting.json`; the workspace retains the approved spec and plan.

- [ ] **Step 2: Add the failing locale tests**

Create tests equivalent to:

```ts
import { describe, expect, it } from "vitest";
import { directionFor, isLocale, localizedPath } from "@/lib/i18n";

describe("locale helpers", () => {
  it("accepts only MAHER locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("maps document direction", () => {
    expect(directionFor("en")).toBe("ltr");
    expect(directionFor("ar")).toBe("rtl");
  });

  it("preserves an equivalent route while switching language", () => {
    expect(localizedPath("ar", "/en/teachers")).toBe("/ar/teachers");
    expect(localizedPath("en", "/ar")).toBe("/en");
  });
});
```

- [ ] **Step 3: Run the locale test to verify it fails**

Run: `npm test -- --run tests/i18n.test.ts`

Expected: FAIL because `lib/i18n.ts` does not exist.

- [ ] **Step 4: Implement locale helpers and typed content contracts**

Implement the exact public contract:

```ts
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const directionFor = (locale: Locale) => locale === "ar" ? "rtl" : "ltr";
export function localizedPath(locale: Locale, pathname: string): string {
  const rest = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  return `/${locale}${rest || ""}`;
}
```

Define `SiteContent` with navigation, shared calls to action, homepage chapters, internal-page stories, FAQs, footer, and localized metadata. Populate matching English and Arabic objects with all visible copy from the brief, using idiomatic Modern Standard Arabic.

- [ ] **Step 5: Add content-parity and prohibited-copy tests**

Create tests equivalent to:

```ts
import { describe, expect, it } from "vitest";
import { siteContent } from "@/content";

describe("localized content", () => {
  it("keeps route and FAQ parity", () => {
    expect(Object.keys(siteContent.ar.pages)).toEqual(Object.keys(siteContent.en.pages));
    expect(siteContent.ar.faqs).toHaveLength(siteContent.en.faqs.length);
  });

  it("contains no prohibited or unsupported brand copy", () => {
    const visible = JSON.stringify(siteContent);
    const prohibitedFormerNames = [
      ["SCI", "VR"].join(""),
      ["SCI", "VR", " SPARK"].join(""),
    ];
    prohibitedFormerNames.forEach((name) => expect(visible).not.toContain(name));
    expect(visible).not.toMatch(/Matific|DreamBox|Prodigy|IXL/i);
    expect(visible).not.toMatch(/revolutionary|world's best|guaranteed results/i);
  });
});
```

- [ ] **Step 6: Run the focused tests**

Run: `npm test -- --run tests/i18n.test.ts tests/content.test.ts`

Expected: PASS with locale, route-preservation, parity, and copy constraints verified.

- [ ] **Step 7: Commit the foundation**

Run: `git add package.json package-lock.json .openai app components content lib tests && git commit -m "feat: establish MAHER bilingual site foundation"`

Expected: one commit containing the generated foundation and passing locale contract.

### Task 2: Build the Brand System and Shared Bilingual Shell

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `app/[locale]/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/not-found.tsx`
- Create: `components/common/brand.tsx`
- Create: `components/common/button-link.tsx`
- Create: `components/common/eyebrow.tsx`
- Create: `components/layout/site-header.tsx`
- Create: `components/layout/mobile-nav.tsx`
- Create: `components/layout/site-footer.tsx`
- Create: `components/layout/section.tsx`
- Create: `components/layout/page-hero.tsx`
- Create: `components/motion/reveal.tsx`
- Modify: `tests/i18n.test.ts`

**Interfaces:**
- Consumes: `Locale`, `directionFor`, `localizedPath`, and `getContent` from Task 1.
- Produces: `<SiteHeader locale pathname />`, `<SiteFooter locale />`, `<Section />`, `<PageHero />`, `<ButtonLink />`, `<Brand />`, and `<Reveal />`.

- [ ] **Step 1: Extend tests for navigation and language preservation**

Add assertions that every route key maps to both `/en/<slug>` and `/ar/<slug>`, the root route remains locale-specific, and the switcher's target always preserves the non-locale suffix.

- [ ] **Step 2: Run tests and confirm the new route assertions fail**

Run: `npm test -- --run tests/i18n.test.ts`

Expected: FAIL until the complete route map is exported.

- [ ] **Step 3: Implement design tokens and typography**

In `app/globals.css`, define shared custom properties for:

```css
:root {
  --navy: #10184a;
  --blue: #386df5;
  --cyan: #20b8e6;
  --teal: #14bfae;
  --purple: #7457e8;
  --orange: #f39a45;
  --canvas: #f7fbff;
  --surface: #ffffff;
  --text: #10184a;
  --muted: #5f6b8c;
  --line: #dce8f4;
  --radius-card: 1.75rem;
  --shadow-soft: 0 24px 70px rgba(31, 74, 122, 0.12);
  --content: 76rem;
}
```

Add responsive section spacing, focus-visible rings, selection styling, logical-direction helpers, reduced-motion rules, and high-quality English/Arabic font stacks loaded through the framework's production-safe font integration.

- [ ] **Step 4: Implement the locale shell and navigation**

Validate `[locale]`, set document language and direction at the closest supported layout boundary, generate localized metadata, render sticky desktop navigation, and provide an accessible mobile menu with `aria-expanded`, Escape handling, focus management, and 44px targets. The header becomes more compact after scrolling without obscuring anchor targets.

- [ ] **Step 5: Implement shared layout primitives and reduced-motion reveals**

`Section` owns max width and section rhythm. `PageHero` owns internal-page title/copy/CTA composition. `Reveal` uses Framer Motion only on the client and returns stable content with motion disabled when the user prefers reduced motion.

- [ ] **Step 6: Run focused tests and compile checks**

Run: `npm test -- --run tests/i18n.test.ts && npm run typecheck`

Expected: PASS with no invalid props or locale holes.

- [ ] **Step 7: Commit the shared shell**

Run: `git add app components lib tests && git commit -m "feat: add MAHER bilingual brand shell"`

### Task 3: Create the Live Product Visualization System

**Files:**
- Create: `components/product-ui/product-frame.tsx`
- Create: `components/product-ui/learner-journey.tsx`
- Create: `components/product-ui/math-activity.tsx`
- Create: `components/product-ui/adaptive-path.tsx`
- Create: `components/product-ui/teacher-progress.tsx`
- Create: `components/product-ui/leader-insights.tsx`
- Create: `components/product-ui/bilingual-activity.tsx`
- Create: `components/product-ui/curriculum-map.tsx`
- Create: `components/product-ui/device-stage.tsx`
- Create: `tests/product-data.test.ts`

**Interfaces:**
- Consumes: `Locale` and localized short labels from the content layer.
- Produces each named visualization as `<Component locale: Locale className?: string />` except `<BilingualActivity />`, which deliberately renders both directions.

- [ ] **Step 1: Write failing demo-data constraint tests**

Test that the teacher mockup exports exactly four rows, the leader mockup exposes only three headline metrics and one series, and all percentage values remain in the inclusive range 0–100.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- --run tests/product-data.test.ts`

Expected: FAIL because the demo datasets and visual components do not yet exist.

- [ ] **Step 3: Implement the shared frame and learner surfaces**

Build a restrained browser/device frame with semantic regions. The hero journey shows only greeting, three journey nodes, one recommended fractions lesson, and a progress ring. The math activity shows a bar model, one question, four choices, and one supportive feedback state.

- [ ] **Step 4: Implement adaptive, teacher, and leader surfaces**

The adaptive path uses four connected steps with CSS/SVG geometry and a single reduced-motion-safe draw effect. The teacher surface contains a class summary and four rows only. The leader surface contains three illustrative metrics and one accessible trend chart with a textual summary.

- [ ] **Step 5: Implement bilingual, curriculum, and device surfaces**

The bilingual activity renders equivalent English LTR and Arabic RTL math tasks. The curriculum map shows one simple KG–Grade 8 progression with a highlighted concept branch. The device stage composes three simplified responsive frames without repeating dense UI.

- [ ] **Step 6: Run tests and Story-level type checks**

Run: `npm test -- --run tests/product-data.test.ts && npm run typecheck`

Expected: PASS and no direction-dependent rendering errors.

- [ ] **Step 7: Commit the visualization system**

Run: `git add components/product-ui tests/product-data.test.ts && git commit -m "feat: create MAHER product visualizations"`

### Task 4: Compose the Localized Homepage and Open the First Meaningful Preview

**Files:**
- Create: `components/sections/home-sections.tsx`
- Create: `components/sections/insight-tabs.tsx`
- Create: `app/[locale]/page.tsx`
- Modify: `content/en.ts`
- Modify: `content/ar.ts`
- Modify: `app/globals.css`
- Create: `tests/home-content.test.ts`

**Interfaces:**
- Consumes: shared shell, all product visualizations, `Locale`, and localized homepage content.
- Produces: complete `/en` and `/ar` home routes and `<InsightTabs locale items />` with roving keyboard tab behavior.

- [ ] **Step 1: Write failing homepage-structure tests**

Assert that each locale defines exactly eleven ordered chapter identifiers and that the hero has exactly three micro-labels and two calls to action.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- --run tests/home-content.test.ts`

Expected: FAIL until chapter data and route composition exist.

- [ ] **Step 3: Build the first meaningful product slice**

Implement the complete brand header, hero copy, calls to action, three micro-labels, and simplified learner journey for `/en` and `/ar`. Apply final theme tokens before styling the slice. Ensure the hero is recognizable, responsive, and genuinely mirrored in Arabic.

- [ ] **Step 4: Start the retained development session and verify compilation**

Run: `npm run dev`

Expected: the server prints an exact Local URL and remains running.

Make one lightweight request to `/en` and require a successful non-error response. Open that Local URL once in the Codex browser panel and retain the tab for subsequent HMR updates.

- [ ] **Step 5: Compose the remaining ten homepage chapters**

Add the adaptive idea, student activity, four-step flow, teacher story, leader story, bilingual experience, curriculum pathway, interactive insights, device experience, and final call to action. Keep section spacing between 100px and 160px on desktop and vary section silhouettes without increasing information density.

- [ ] **Step 6: Implement accessible insight tabs**

Use `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, Home/End and arrow-key navigation, direction-aware arrow behavior, and visible focus. Render one dashboard concept at a time.

- [ ] **Step 7: Run homepage tests and type checks**

Run: `npm test -- --run tests/home-content.test.ts && npm run typecheck`

Expected: PASS for both locale chapter schemas and all component props.

- [ ] **Step 8: Commit the homepage**

Run: `git add app components/sections content tests/home-content.test.ts && git commit -m "feat: build MAHER bilingual homepage"`

### Task 5: Build the Six Localized Internal Experiences

**Files:**
- Create: `components/sections/feature-story.tsx`
- Create: `components/sections/faq-accordion.tsx`
- Create: `app/[locale]/platform/page.tsx`
- Create: `app/[locale]/teachers/page.tsx`
- Create: `app/[locale]/leaders/page.tsx`
- Create: `app/[locale]/bilingual/page.tsx`
- Create: `app/[locale]/insights/page.tsx`
- Create: `app/[locale]/faq/page.tsx`
- Modify: `content/en.ts`
- Modify: `content/ar.ts`
- Create: `tests/pages-content.test.ts`

**Interfaces:**
- Consumes: `PageHero`, `FeatureStory`, product visualizations, `getContent(locale)`, and route metadata.
- Produces: all six localized route pairs and an accessible `<FaqAccordion items />`.

- [ ] **Step 1: Write failing page-content coverage tests**

Assert that every required internal route exists in both locales, has non-empty localized title/description/metadata, and includes the exact expected number of narrative topics from the spec.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- --run tests/pages-content.test.ts`

Expected: FAIL until the internal page content and routes exist.

- [ ] **Step 3: Build Platform and Teachers pages**

Compose alternating feature stories with one visual question per section. Platform covers adaptive journey, activities, progression, feedback, curriculum, assessment, progress, and devices. Teachers covers classroom overview, progress, mastery, targeted practice, learning needs, recommended practice, and reporting.

- [ ] **Step 4: Build Leaders and Bilingual pages**

Give Leaders a more institutional, data-led composition with one chart per major story. Make Bilingual a high-impact paired LTR/RTL experience with equivalent objectives and direction-specific UI rather than mirrored copy alone.

- [ ] **Step 5: Build Insights and FAQ pages**

Progress Insights through student, class, school, and system levels and state the decision each supports. Implement FAQ as native button-controlled disclosures with `aria-expanded` and connected panels; answers remain concise and contain no added legal or certification claims.

- [ ] **Step 6: Run page tests and route smoke checks**

Run: `npm test -- --run tests/pages-content.test.ts && npm run typecheck`

Request every `/en/...` and `/ar/...` route from the retained server and require 2xx responses.

Expected: all fourteen localized pages respond and content tests pass.

- [ ] **Step 7: Commit the internal pages**

Run: `git add app components/sections content tests/pages-content.test.ts && git commit -m "feat: add MAHER localized product pages"`

### Task 6: Complete SEO, Accessibility, and Responsive Production Behavior

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/[locale]/layout.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Modify: `app/not-found.tsx`
- Modify: `app/globals.css`
- Create: `tests/seo.test.ts`

**Interfaces:**
- Consumes: locale route map and content metadata.
- Produces: localized metadata generation, language alternates, canonical paths, robots rules, sitemap routes, and responsive/reduced-motion guarantees.

- [ ] **Step 1: Write failing SEO coverage tests**

Assert that the sitemap contains all fourteen localized public URLs, every page key has English and Arabic title/description values, and alternate links resolve to equivalent routes.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- --run tests/seo.test.ts`

Expected: FAIL because sitemap and complete metadata generation are not yet implemented.

- [ ] **Step 3: Implement localized metadata, robots, sitemap, and not-found handling**

Generate route-specific titles/descriptions, canonical paths, and `en`/`ar` alternates. Add localized Open Graph text without an image. Include every public route in the sitemap and allow public crawling through robots metadata.

- [ ] **Step 4: Finish responsive and RTL styling**

Audit every component at wide desktop, tablet, 390px mobile, and 320px narrow mobile. Replace squeezed grids with stacked or horizontally scrollable semantics only where appropriate. Use logical CSS properties, direction-aware transforms, `min-inline-size: 0`, readable chart labels, and mobile-specific mockup simplifications.

- [ ] **Step 5: Finish accessibility behavior**

Verify heading order, landmark structure, skip link, keyboard menu/accordion/tabs, focus visibility, current-page navigation, chart summaries, contrast, 44px control targets, 200% text enlargement, and reduced-motion CSS plus Framer Motion settings.

- [ ] **Step 6: Run tests, lint, and type checking**

Run: `npm test -- --run && npm run lint && npm run typecheck`

Expected: all suites pass with zero material warnings.

- [ ] **Step 7: Commit production hardening**

Run: `git add app components content lib tests && git commit -m "feat: harden MAHER accessibility and SEO"`

### Task 7: Build, Inspect, Refine, and Publish

**Files:**
- Modify: only files implicated by verified QA issues.
- Modify: `.openai/hosting.json` only through the Sites registration/hosting workflow.

**Interfaces:**
- Consumes: the complete local site and retained development preview.
- Produces: a verified production build and deployed private Sites URL.

- [ ] **Step 1: Run prohibited-content and numerical-claim scans**

Search production source, excluding dependencies, generated output, Git metadata, docs, and tests, for the two prohibited former names, visible competitor names, unsupported superlatives, and suspicious outcome percentages. Inspect every match rather than relying on count alone.

Run: `rg -n -i --glob '!node_modules/**' --glob '!dist/**' --glob '!out/**' --glob '!.git/**' --glob '!docs/**' --glob '!tests/**' "S[C]IVR|Matific|DreamBox|Prodigy|IXL|revolutionary|world.?s best|guaranteed results" app components content lib public`

Expected: no prohibited brand/competitor/claim match in production content; percentages appear only inside clearly illustrative product UI data.

- [ ] **Step 2: Run the production validation suite**

Run: `npm test -- --run && npm run lint && npm run typecheck && npm run build`

Expected: exit code 0 for every command and a deployable output matching `.openai/hosting.json`.

- [ ] **Step 3: Perform requested browser QA in the retained tab**

Inspect English desktop, English mobile, Arabic desktop, and Arabic mobile. Visit every navigation destination and verify the language switch preserves the equivalent route. Check density, section rhythm, awkward whitespace, overflow, sticky header state, menu behavior, tab keyboard behavior, accordion behavior, directional arrows, Arabic typography, product UI direction, and final calls to action.

- [ ] **Step 4: Fix only observed quality defects and revalidate**

For each issue, record the exact page and viewport, make the smallest source change, repeat the relevant browser check, then rerun `npm run build`. Do not add unrequested sections or capabilities during polish.

- [ ] **Step 5: Register and publish through Sites**

Reuse any existing project ID; otherwise create one site, persist its ID, save a version, deploy the passing build, and verify terminal deployment status. Keep credentials out of files, Git, and user-visible output.

- [ ] **Step 6: Stop the retained development session and commit final QA fixes**

Run: `git add app components content lib public .openai/hosting.json && git commit -m "fix: refine MAHER responsive presentation"` only when final QA changed tracked source. Do not create an empty commit.

- [ ] **Step 7: Deliver the site**

Return the deployed Sites URL as the primary result, mention English/Arabic and mobile/desktop validation briefly, and avoid deployment internals unless the user asks.
