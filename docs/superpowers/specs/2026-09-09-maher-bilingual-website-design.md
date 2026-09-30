# MAHER Bilingual Website Design

## Objective

Build a production-ready bilingual website for MAHER, a UAE-focused adaptive mathematics learning platform for KG through Grade 8. The experience must be credible for ministry and education-leader review while remaining approachable to teachers, learners, and families.

The supplied homepage image is a brand and atmosphere reference only. The production site will retain its clean blue/cyan/teal/purple identity while using substantially more whitespace, clearer hierarchy, fewer simultaneous UI elements, and a more premium editorial rhythm.

## Audience and Product Story

The audience order is ministry and system decision makers, education leaders, schools, teachers, students, then parents. The homepage tells one progressive story:

1. Every learner has an individual path.
2. MAHER responds to learner progress.
3. Learners receive clear, supportive mathematics practice.
4. Teachers see where support is needed.
5. Leaders see system-level learning trends.
6. Arabic and English experiences are equally intentional.
7. Learning is organised around curriculum pathways and useful insight.

The public tone is confident, clear, and evidence-conscious. The site will not include unsupported outcomes, certifications, ministry workflows, or claims.

## Architecture

Use Next.js App Router, React, TypeScript, Tailwind CSS, and Framer Motion for motion that materially improves comprehension. The route tree will use a locale segment so English and Arabic pages share the same page components:

- `/` selects an appropriate locale and redirects to `/en` or `/ar`.
- `/[locale]`
- `/[locale]/platform`
- `/[locale]/teachers`
- `/[locale]/leaders`
- `/[locale]/bilingual`
- `/[locale]/insights`
- `/[locale]/faq`

Only `en` and `ar` are valid locales. Unknown locales and unknown slugs return the framework's not-found experience.

Visible content is stored in a typed central content layer with matching English and Arabic schemas. Page components receive locale content rather than duplicating markup. Directional values such as arrow orientation, alignment, and flow are derived from the active locale.

Server Components render static and narrative content. Client Components are limited to the sticky/mobile navigation, motion wrappers, interactive insight tabs, FAQ accordion, language preservation, and any product visualization that requires interaction.

## Component Boundaries

The implementation will separate responsibilities into focused groups:

- `layout`: site header, mobile navigation, footer, page shell, section containers.
- `navigation`: locale-aware links and current-page language switching.
- `sections`: homepage and internal-page narrative sections.
- `product-ui`: learner journey, mathematics activity, teacher progress, leader insight, bilingual activity, curriculum path, and device mockups.
- `motion`: reduced-motion-aware reveal and progression behaviors.
- `common`: buttons, labels, segmented controls, icons, and typography helpers.
- `content`: typed English and Arabic copy, navigation, page content, FAQs, and metadata.

Each marketing product mockup is composed from semantic HTML and React rather than relying on screenshots. Illustrative data is kept close to the mockup and marked with a discreet source comment as demo data.

## Visual System

The visual thesis is "guided clarity": cinematic whitespace, precise editorial typography, and simplified product surfaces that make the next step obvious.

Central design tokens define deep navy, primary blue, cyan, teal, purple, restrained orange, cool near-white backgrounds, content widths, spacing, radii, shadows, and typography. Accent colors are assigned by purpose rather than used simultaneously.

English and Arabic use a coherent bilingual font system with an intentional Arabic face and appropriate weights. Main text remains at least 16px; navigation and persistent controls use at least 14px. Desktop section spacing generally ranges from 100px to 160px.

Atmospheric backgrounds use light gradients and abstract geometric cues inspired by the UAE's forward-looking identity. They avoid tourism scenes, decorative illustration overload, glass-heavy effects, and imitation of competitor assets.

## Homepage Experience

The homepage contains eleven spacious chapters rather than a dense feature catalogue:

1. Hero with the main brand proposition, two calls to action, three short proof labels, and a simplified learner journey.
2. Adaptive core idea with one branching path and three stages: Understand, Adapt, Progress.
3. Student experience centred on one fractions activity and three supporting points.
4. Four-step adaptation flow: Understand, Practise, Support, Progress.
5. Teacher story with a focused class-progress table of four learner rows.
6. Leader story with three illustrative metrics and one trend visualization.
7. Bilingual story with paired, genuinely directional English and Arabic activities.
8. Curriculum story with one clear skill-map visualization.
9. Insights story with an accessible three-tab progressive reveal.
10. Multi-device composition showing the experience across desktop, tablet, and mobile.
11. Final action area leading to the platform or access request.

At normal desktop sizes, no section intentionally presents more than two or three major cards at once.

## Internal Pages

The Platform page explains the adaptive journey, activity design, progression, feedback, curriculum organisation, assessment, progress, and devices through alternating narrative blocks rather than a grid of every capability.

The Teachers page focuses on classroom overview, individual progress, mastery, targeted practice, learning needs, assignments or recommended practice, and reporting. Its visuals use illustrative classroom data only.

The Education Leaders page uses a more institutional visual language and moves progressively from system overview to school trends, curriculum progress, engagement, comparison, and reporting. Charts remain limited to one main question per section.

The Bilingual page is a principal differentiator. It demonstrates complete RTL/LTR adaptation, consistent objectives, age-appropriate mathematical language, and bilingual classroom suitability through side-by-side and switching interactions.

The Insights page progresses from student to class, school, and system-level visibility. Each level states the decision it can support and avoids dashboard overload.

The FAQ page uses an accessible accordion and only the supplied product topics. It does not introduce legal, security, certification, or infrastructure claims.

## Localization and Directionality

Every localized document sets the correct `lang` and `dir` attributes. Arabic uses professional Modern Standard Arabic written for the intended audience rather than word-for-word translation.

The language control preserves the equivalent current route. RTL adaptation includes navigation order, text alignment, chevrons and directional arrows, product UI flow, content spacing, charts where direction is meaningful, and mobile controls. Decorative icons with no directional meaning remain unchanged.

## Responsive Behavior

Desktop uses wide two-column compositions and large product visuals. Tablet keeps readable type and restructures visuals before they become compressed. Mobile becomes one narrative column, collapses navigation into an accessible menu, simplifies visualizations, and uses mobile-specific mockup arrangements instead of shrinking desktop dashboards.

Controls provide at least a 44px practical touch target. Layouts remain usable at 200% text enlargement without hiding essential content or actions.

## Motion and Interaction

Motion is subordinate to comprehension:

- gentle floating movement for the hero product surface;
- short fade/translate section entrances;
- staged adaptive-path progress;
- single-run chart drawing;
- restrained bilingual panel and tab transitions;
- small hover and focus responses.

All motion respects `prefers-reduced-motion`. No constant background motion, dramatic zooms, or heavy parallax is used.

## Accessibility and Resilience

Semantic landmarks, heading order, meaningful link labels, keyboard navigation, visible focus, sufficient contrast, and accessible disclosure/tab/menu patterns are required. Interactive controls expose their state to assistive technology.

The site has no external data dependency. Static product content therefore has no loading or remote-error state. Invalid routes receive a localized or neutral not-found page. When JavaScript is unavailable, all narrative content and primary links remain available; progressive interactions fall back to readable default content.

## SEO and Metadata

Each locale and internal page receives a localized title, description, canonical URL strategy, and language alternates. The project includes robots and sitemap outputs covering public localized routes. Open Graph title and description metadata are localized; no new social-preview image is generated unless separately requested.

## Validation

Completion requires:

- linting, TypeScript checking, and a production build;
- browser inspection of every route and all navigation;
- English desktop and mobile checks;
- Arabic desktop and mobile checks;
- RTL arrow, menu, mockup, and spacing checks;
- keyboard and accessibility-basics checks;
- reduced-motion behavior check;
- content scans confirming no former product names, competitor names in visible copy, unsupported impact claims, or unsupported real-world metrics;
- responsive verification for density, whitespace, typography, overflow, and viewport transitions.

## Delivery

The final result is a deployable multi-route bilingual site, not a static design artifact. It will be built, visually inspected, refined, and published to the configured Sites environment after validation.
