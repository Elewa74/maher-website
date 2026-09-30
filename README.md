# MAHER — ماهر

Bilingual (Arabic / English) product website for **MAHER**, the adaptive mathematics platform for UAE learners from KG to Grade 8.

| | |
|---|---|
| **Production domain** | https://maherlearn.com |
| **Live preview** | https://elewa74.github.io/maher-website/ |
| **Deployment package** | [maher-website-deploy.zip](https://github.com/Elewa74/maher-website/releases/download/site-latest/maher-website-deploy.zip) (always the latest build) |

## Site map

Arabic is the primary language and is served from the domain root. English lives under `/en`.

| Page | Arabic | English |
|---|---|---|
| Home | `/` | `/en` |
| Platform | `/platform` | `/en/platform` |
| UAE curriculum | `/uae-curriculum` | `/en/uae-curriculum` |
| Teachers | `/teachers` | `/en/teachers` |
| Schools & education leaders | `/leaders` | `/en/leaders` |
| Insights | `/insights` | `/en/insights` |
| FAQ | `/faq` | `/en/faq` |

- Old `/ar/...` addresses redirect permanently (301) to the same page at the root.
- The language switcher always opens the equivalent page in the other language.
- Every page has a canonical URL, `hreflang` alternates (`ar`, `en`, `x-default`), Open Graph images, `sitemap.xml` and `robots.txt`.

## Tech stack

- [vinext](https://github.com/cloudflare/vinext): the Next.js App Router API on Vite. React 19 with Server Components.
- Tailwind CSS v4 and a hand-written design layer in `app/globals.css`.
- Self-hosted fonts: Noto Kufi Arabic and Inter Tight.
- Tests: Vitest. Lint: oxlint. Types: TypeScript.

## Getting started

Requirements: Node.js `>=22.13` and pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:3000 (Arabic) · http://localhost:3000/en (English)
```

Quality checks (CI runs the same):

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

## Project structure

```
app/                   Routes (app/[locale]/…), layouts, global styles, robots, sitemap
components/
  common/              Brand, buttons, photos, MAHER character
  layout/              Header, mobile menu, footer, page hero, section wrapper
  sections/            Page sections (hero, stories, FAQ, closing call to action…)
  product-ui/          Illustrative product screens used across the site
  motion/              Scroll-reveal system (CSS + IntersectionObserver)
content/               All copy: ar.ts, en.ts, types.ts
lib/                   i18n and URLs, base path, media registry, SEO
public/                Fonts, logo, favicons, photos, character poses, device renders
scripts/               export-static.mjs: static export for hosting
deploy/                Hosting guide and Apache / IIS / Nginx configurations
tests/                 Content, routing, SEO and component contract tests
docs/                  Brand guide and project history
```

## Editing content

- **Text:** `content/ar.ts` and `content/en.ts`. Both follow `content/types.ts`, and the tests keep the two languages in step.
- **Photos and device renders:** `lib/media.ts` registers each image with its sizes and Arabic and English alt text. Files are in `public/media/`.
- **Character:** `components/common/maher-character.tsx`. Poses are in `public/media/character/`.
- **Brand rules:** see [docs/BRAND.md](docs/BRAND.md).

## Build and deployment

Every push to `main` runs `.github/workflows/pages.yml`, which:

1. runs the tests;
2. builds and publishes the **preview** to GitHub Pages;
3. builds the **production package** for `maherlearn.com` and attaches it to the `site-latest` release as `maher-website-deploy.zip`.

The package is plain static files: no database, no Node.js and no PHP on the server. It includes ready-made configurations for Apache/cPanel (`.htaccess`), IIS (`web.config`) and Nginx. Hosting steps are in [deploy/DEPLOY.md](deploy/DEPLOY.md).

To build the package locally:

```bash
NEXT_PUBLIC_SITE_URL=https://maherlearn.com pnpm build
npx wrangler dev --config dist/server/wrangler.json --port 8788 &
BASE_URL=http://127.0.0.1:8788 OUT_DIR=package/site node scripts/export-static.mjs
```

### Environment variables (build time)

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Domain used for canonical URLs, the sitemap and share images | production: `https://maherlearn.com` (set in CI) |
| `NEXT_PUBLIC_BASE_PATH` | Sub-folder the site is served from (GitHub Pages preview only) | empty |

---

## بالعربي

موقع منصة **ماهر** للرياضيات التكيفية بالعربي والإنجليزي.

- **العربية هي اللغة الأساسية** وتظهر على الدومين مباشرة (`maherlearn.com`, `maherlearn.com/teachers`…). **الإنجليزية** تحت `/en`.
- **تعديل النصوص:** من `content/ar.ts` و`content/en.ts`.
- **الصور:** مسجلة في `lib/media.ts` ومعاها نص بديل عربي وإنجليزي.
- **المعاينة:** https://elewa74.github.io/maher-website/
- **حزمة الرفع على السيرفر:** رابط ثابت بيتحدّث مع كل رفع على GitHub:
  https://github.com/Elewa74/maher-website/releases/download/site-latest/maher-website-deploy.zip
- **خطوات الرفع:** في [deploy/DEPLOY.md](deploy/DEPLOY.md).
- **قواعد الهوية البصرية:** في [docs/BRAND.md](docs/BRAND.md).
