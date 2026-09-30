# MAHER website — deployment package / حزمة رفع الموقع

## English

This package is the complete, ready-to-serve MAHER website (Arabic and English). It is plain static files: no database, no Node.js, no PHP, no build step on the server.

### Contents

- `site/` — upload the **contents** of this folder to the domain's web root (for example `public_html/`, `/var/www/maher/` or the IIS site folder).
- `site/.htaccess` — Apache and cPanel hosting (used automatically).
- `site/web.config` — IIS / Windows Server (used automatically).
- `site/nginx.conf.example` — a sample server block for Nginx (copy it into the server configuration).

### Steps

1. Upload everything inside `site/` to the web root, keeping the folder structure. Include hidden files such as `.htaccess`.
2. Point the domain's DNS to the server:
   - an `A` record to the server IP, or
   - a `CNAME` to the hosting provider's host name.
3. Enable HTTPS (for example Let's Encrypt, or the hosting panel's free SSL).
4. Check these addresses:
   - `https://your-domain/` should redirect to `/ar/`
   - `/ar/` and `/en/` should open, and so should the pages linked from the menu
   - `/anything-wrong` should show the MAHER 404 page

### Page addresses

`/ar/` · `/en/` · `/ar/platform/` · `/ar/uae-curriculum/` · `/ar/teachers/` · `/ar/leaders/` · `/ar/insights/` · `/ar/faq/`. The English pages use the same paths under `/en/`.

### Notes

- This package is built for **https://maherlearn.com**: canonical links, `sitemap.xml`, `robots.txt` and social-share images point there. If the final domain is different, ask for a rebuilt package; the site itself works on any domain either way.
- To serve the site from a sub-folder instead of the domain root (for example `domain.com/maher/`), ask for a package built for that sub-folder.

## العربية

الحزمة دي فيها موقع ماهر كامل وجاهز للرفع بالعربي والإنجليزي. كلها ملفات ثابتة: مفيش قاعدة بيانات، ولا Node.js، ولا PHP، ولا أي بناء على السيرفر.

### المحتوى

- `site/` — ارفع **محتوى** الفولدر ده في جذر الدومين (مثلًا `public_html/`).
- `.htaccess` لسيرفرات Apache وcPanel، و`web.config` لسيرفرات IIS / Windows. الاتنين بيشتغلوا تلقائي.
- `nginx.conf.example` مثال إعداد لـ Nginx.

### الخطوات

1. ارفع كل اللي جوه `site/` في جذر الموقع بنفس ترتيب الفولدرات، ومعاهم الملفات المخفية زي `.htaccess`.
2. وجّه الدومين للسيرفر: سجل `A` بعنوان IP السيرفر، أو `CNAME` لاسم مزوّد الاستضافة.
3. فعّل HTTPS (شهادة SSL مجانية من لوحة الاستضافة أو Let's Encrypt).
4. اتأكد من:
   - الدومين الرئيسي بيحوّل على `/ar/`
   - `/ar/` و`/en/` وصفحات القائمة بتفتح
   - أي رابط غلط بيطلع صفحة 404 بتاعة ماهر

### ملاحظة

الحزمة مبنية على الدومين **https://maherlearn.com**، والروابط الأساسية (canonical) وخريطة الموقع وصور المشاركة كلها عليه. لو الدومين النهائي مختلف، اطلب حزمة جديدة عليه. الموقع نفسه بيشتغل على أي دومين في الحالتين.
