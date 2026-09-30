# MAHER bilingual website

This package contains the complete source code for the MAHER product-story website in Arabic and English. Both languages are part of one application, and the language switcher preserves the equivalent current page.

## Requirements

- Node.js `>=22.13.0`
- pnpm installed and available on the command line

## Install and run locally

```bash
pnpm install
pnpm dev
```

Open:

- English: `http://localhost:3000/en`
- Arabic: `http://localhost:3000/ar`

The six internal routes are available under both `/en` and `/ar`: `platform`, `uae-curriculum`, `teachers`, `leaders`, `insights`, and `faq`.

## Validate the project

Run each check separately:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

To serve the completed production build locally:

```bash
pnpm start
```

## Project structure

- `app/`: locale-based pages and routing
- `components/`: shared layout, interaction, and product-preview components
- `content/`: typed Arabic and English content
- `public/`: public assets
- `tests/`: content, route, interaction, and component contract tests

## Hosting configuration

`.openai/hosting.json` is the existing OpenAI Sites project configuration. Preserve it when copying or packaging the project. Do not add credentials, tokens, or other secrets to that file or to the repository.

---

# موقع ماهر ثنائي اللغة

تحتوي هذه الحزمة على الكود الكامل لموقع قصة منتج ماهر بالعربية والإنجليزية داخل تطبيق واحد. يحافظ زر تغيير اللغة على الصفحة المقابلة في اللغة الأخرى.

## المتطلبات والتشغيل

- Node.js إصدار `22.13.0` أو أحدث
- تثبيت pnpm وإتاحته في سطر الأوامر

```bash
pnpm install
pnpm dev
```

افتح النسخة الإنجليزية على `http://localhost:3000/en` أو النسخة العربية على `http://localhost:3000/ar`. تتوفر الصفحات الداخلية الست نفسها تحت المسارين `/en` و`/ar`.

## التحقق وبناء نسخة الإنتاج

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

يجب الاحتفاظ بملف `.openai/hosting.json` كما هو لأنه إعداد مشروع Sites الموجود، وعدم إضافة أي بيانات دخول أو أسرار إليه.
