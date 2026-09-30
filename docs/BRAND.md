# MAHER — Brand & design guide

The visual rules the website follows. Keep new pages and sections consistent with them.

## Logo

- The MAHER Learn lockup: purple triangle, "maher", ماهر and "learn".
- Files:
  - `public/brand/maher-logo.png` for light backgrounds
  - `public/brand/maher-logo-reverse.png` for dark backgrounds
- Always keep the original aspect ratio (720 : 302). Never stretch or squeeze the logo.
- Header height is 3.4rem on desktop and 2.9rem on mobile. The footer uses 4.4rem.

## Colour

| Role | Colour |
|---|---|
| MAHER Purple (primary) | `#5F48B1` |
| Deep Ink (headings, dark sections, footer) | `#1E1838` |
| Graphite (secondary text) | `#51514F` |
| Surface | `#F6F5FA` |
| Line | `#EAE7EE` |
| Muted text | `#6B6975` |
| Success (data) | `#0E9F8F` · text-safe `#0A7A6D` |
| Attention (data, current step) | `#F08A24` |
| Accent on dark | `#B9AFDD` |

Purple scale: 50 `#F6F5FA` · 100 `#EFECF8` · 200 `#DDD6F0` · 300 `#B9AFDD` · 500 `#8775C4` · 600 `#5F48B1` · 700 `#4C3993` · 800 `#3A2C72` · 950 `#1E1838`.

## Typography

- Arabic: **Noto Kufi Arabic**. English: **Inter Tight**. The same family is used for headings and body text.
- Both are self-hosted in `public/fonts/`.
- Use Western digits (0–9) in both languages.

## Imagery

- Photography: calm, natural light, UAE school settings, one clear subject.
  - Images are registered in `lib/media.ts` with Arabic and English alt text.
  - Formats: WebP at 800 and 1600 px.
- Device renders show real MAHER screens, one set per language.
- AI-generated images must be reviewed for accuracy before use, for example counting place-value blocks.

## The MAHER character

- A friendly purple triangle with an orange tip, used as a guide and not as decoration.
- Poses in `public/media/character/`: `front`, `three-quarter`, `curious`, `thinking` and `happy`. Each has a large and a `-sm` version.
- Used in:
  - the home hero learning road
  - the student section
  - product screens (the learner avatar and the "well done" feedback)
  - the current step of the learning path
  - the closing call to action
  - FAQ and 404
  - the favicon
- In Arabic (right-to-left) layouts the character is mirrored so it faces the content.

## Layout and motion

- Calm backgrounds: white to a soft lavender with gentle dunes at the base of heroes. Dark sections use Deep Ink.
- Avoid:
  - "pill" labels with glowing dots
  - gradient text
  - glowing buttons
  - floating decorative shapes
  - grid or blob backgrounds
  - geometric lattices
- Motion:
  - short scroll reveals and one-time entrance animations
  - nothing loops
  - everything is disabled when the visitor prefers reduced motion
- Arabic is the primary language: right-to-left layout, served from the site root.
