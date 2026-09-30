# MAHER website — Hosting guide · دليل رفع الموقع

**Domain:** https://maherlearn.com
**Package:** `maher-website-deploy.zip` (latest build: https://github.com/Elewa74/maher-website/releases/download/site-latest/maher-website-deploy.zip)

---

## English

### What this is

The complete MAHER website (Arabic and English) as plain static files. There is no database, no Node.js, no PHP and no build step on the server.

### Package contents

```
DEPLOY.md                 this guide
site/                     upload the CONTENTS of this folder to the web root
  index.html              Arabic home  (maherlearn.com/)
  platform/ …  faq/       Arabic pages (maherlearn.com/platform …)
  en/                     English site (maherlearn.com/en …)
  404.html                "page not found"
  robots.txt, sitemap.xml
  _next/ fonts/ media/ brand/ art/   assets
  .htaccess               Apache / cPanel configuration (hidden file)
  web.config              IIS / Windows Server configuration
server-configs/           NOT uploaded to the web root
  nginx.conf.example      Nginx server block
  cloudfront-function.js  Amazon CloudFront function (S3 + CloudFront hosting)
```

### Steps

1. **Upload:** copy everything inside `site/` into the domain's web root (for example `public_html/` on cPanel), keeping the folders as they are. Hidden files such as `.htaccess` must be included.
2. **DNS:** point `maherlearn.com` and `www.maherlearn.com` to the server:
   - an `A` record to the server IP, or
   - a `CNAME` to the hosting provider's host name.
3. **SSL:** issue a certificate for `maherlearn.com` and `www.maherlearn.com` (Let's Encrypt or the hosting panel's free SSL).
   The included configs redirect every request to `https://maherlearn.com`, so the site needs the certificate to load.
4. **Web server:**
   - **Apache / cPanel:** nothing to do; `.htaccess` is used automatically. It needs `mod_rewrite`, which is standard.
   - **IIS:** nothing to do; `web.config` is used automatically. It needs the *URL Rewrite* module.
   - **Nginx:** copy the relevant parts of `server-configs/nginx.conf.example` into the server configuration and set `root` to the upload folder.

### Hosting on Amazon Web Services (AWS)

The package works with any of the three usual AWS setups:

**A. EC2 or Lightsail (a server running Apache or Nginx)**
Follow the steps above. On Apache, `.htaccess` needs `AllowOverride All` for the site folder. On Nginx, use `server-configs/nginx.conf.example`.

**B. S3 + CloudFront (recommended for a static site)**

1. **S3 bucket** (private, block all public access). Upload the contents of `site/`:
   ```bash
   # long cache for fingerprinted assets
   aws s3 sync site/ s3://BUCKET/ --delete --exclude "*.html" --exclude "*.xml" --exclude "*.txt" \
     --exclude ".htaccess" --exclude "web.config" \
     --cache-control "public, max-age=31536000, immutable"
   # pages, sitemap and robots: always revalidate
   aws s3 sync site/ s3://BUCKET/ --exclude "*" --include "*.html" --include "*.xml" --include "*.txt" \
     --cache-control "no-cache"
   ```
2. **Certificate:** request one in **ACM, region us-east-1**, for `maherlearn.com` and `www.maherlearn.com`.
3. **CloudFront distribution:**
   - Origin: the S3 bucket, with Origin Access Control (OAC). Allow CloudFront in the bucket policy.
   - Alternate domain names: `maherlearn.com`, `www.maherlearn.com`, with the ACM certificate.
   - Viewer protocol policy: Redirect HTTP to HTTPS. Compression: on. Default root object: `index.html`.
   - **CloudFront Function:** create one from `server-configs/cloudfront-function.js` (runtime `cloudfront-js-2.0`), publish it, and attach it to the default behaviour as a **Viewer request** function. It handles clean URLs (`/teachers`), `www` → bare domain, and old `/ar/...` links.
   - **Custom error responses:** for 403 and 404, return `/404.html` with response code **404**.
4. **DNS (Route 53 or the domain registrar):** `A`/`AAAA` alias records for `maherlearn.com` and `www` pointing to the distribution.
5. **After each update:** create an invalidation for `/*`.

**C. AWS Amplify Hosting**
Upload the zip or connect the GitHub repository. In *Rewrites and redirects*, add:
- `/ar` → `/` (301)
- `/ar/<*>` → `/<*>` (301)
- `/<*>` → `/404.html` (404-200)

Amplify serves the page folders (`/teachers` → `teachers/index.html`) automatically.

### What the configuration does

- Serves Arabic at the root and English under `/en`, with clean URLs (`/teachers`, no `.html`).
- Redirects `http://` and `www.` to `https://maherlearn.com`.
- Redirects any old `/ar/...` link to the same page at the root.
- Shows the MAHER 404 page for unknown addresses.
- Adds long-term caching for fonts, scripts and styles (their file names change with every build), and no caching for pages.

### Check after upload

| Address | Expected |
|---|---|
| `https://maherlearn.com/` | Arabic home page |
| `https://maherlearn.com/teachers` | Arabic teachers page |
| `https://maherlearn.com/en` | English home page |
| `http://www.maherlearn.com/` | redirects to `https://maherlearn.com/` |
| `https://maherlearn.com/ar/faq` | redirects to `https://maherlearn.com/faq` |
| `https://maherlearn.com/anything-wrong` | MAHER 404 page |
| `https://maherlearn.com/sitemap.xml` | sitemap listing 14 pages |

### Updating the site later

Download the latest package from the link above and replace the files on the server. Remove the old `_next/` folder first so outdated files do not accumulate.

---

## العربية

### الحزمة

موقع ماهر كامل (عربي وإنجليزي) في شكل ملفات ثابتة. مش محتاج قاعدة بيانات، ولا Node.js، ولا PHP، ولا أي بناء على السيرفر.

### الخطوات

1. **الرفع:** ارفع كل اللي جوه فولدر `site/` في المجلد الرئيسي للدومين (مثلًا `public_html/`) بنفس ترتيب الفولدرات. لازم الملفات المخفية زي `.htaccess` تترفع معاهم.
2. **الدومين:** وجّه `maherlearn.com` و`www.maherlearn.com` للسيرفر بسجل `A` على عنوان IP السيرفر، أو بسجل `CNAME` على اسم مزوّد الاستضافة.
3. **شهادة SSL:** فعّل شهادة للدومينين. الإعدادات بتحوّل كل الزيارات على `https://maherlearn.com`، فالموقع مش هيفتح من غير الشهادة.
4. **السيرفر:**
   - **Apache / cPanel:** ملف `.htaccess` بيشتغل تلقائي.
   - **IIS:** ملف `web.config` بيشتغل تلقائي، ومحتاج إضافة URL Rewrite.
   - **Nginx:** انسخ الإعدادات من `server-configs/nginx.conf.example`.

### الرفع على Amazon (AWS)

الحزمة بتشتغل مع أي طريقة من الطرق المعتادة على AWS:

- **سيرفر EC2 أو Lightsail عليه Apache أو Nginx:** نفس الخطوات اللي فوق. في Apache لازم `AllowOverride All` لفولدر الموقع عشان ملف `.htaccess` يشتغل.
- **S3 + CloudFront (الأنسب للمواقع الثابتة):** الخطوات بالتفصيل في الجزء الإنجليزي فوق. أهم نقطتين:
  - اربط **CloudFront Function** من ملف `server-configs/cloudfront-function.js` كـ Viewer request. الملف ده مسؤول عن الروابط النظيفة، وتحويل `www` وروابط `/ar` القديمة.
  - خلي أخطاء 403 و404 ترجع صفحة `/404.html`.
  - الشهادة لازم تتعمل من ACM في منطقة **us-east-1**.
- **AWS Amplify:** ارفع الحزمة أو اربط مستودع GitHub، وضيف قواعد التحويل المذكورة في الجزء الإنجليزي.

### للتأكد بعد الرفع

- `maherlearn.com` يفتح الصفحة الرئيسية بالعربي، و`maherlearn.com/en` يفتح الإنجليزي.
- الصفحات روابطها نظيفة، زي `maherlearn.com/teachers`.
- أي رابط قديم فيه `/ar/` بيتحوّل تلقائي للصفحة نفسها من غير `/ar`.
- أي رابط غلط بيطلع صفحة 404 بتاعة ماهر.

### التحديث بعدين

نزّل آخر نسخة من نفس الرابط، وبدّل الملفات على السيرفر. امسح فولدر `_next/` القديم الأول.
