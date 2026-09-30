import type { Locale } from './i18n';

/** Approved MAHER imagery. Each entry has a large and a small WebP rendition. */
export type MediaItem = {
  src: string;
  small: string;
  width: number;
  height: number;
  smallWidth: number;
  alt: Record<Locale, string>;
};

const photo = (name: string, width: number, height: number, alt: Record<Locale, string>): MediaItem => ({
  src: `/media/photos/${name}.webp`,
  small: `/media/photos/${name}-800.webp`,
  width,
  height,
  smallWidth: 800,
  alt,
});

export const media = {
  heroStudent: photo('hero-student-tablet', 1600, 1200, {
    ar: 'طالبة في الصف الرابع تتعلم الرياضيات على جهاز لوحي داخل فصلها',
    en: 'A Grade 4 student learning maths on a tablet in her classroom',
  }),
  audiences: photo('audiences-teacher-group', 1600, 900, {
    ar: 'معلمة تدعم مجموعة صغيرة من الطلاب أثناء حل مسألة بالقيمة المكانية',
    en: 'A teacher supporting a small group of students working on a place-value problem',
  }),
  studentHome: photo('student-home-laptop', 1600, 1200, {
    ar: 'طالب يكمل تعلمه من المنزل على حاسوب محمول',
    en: 'A student continuing his learning at home on a laptop',
  }),
  teacherPlanning: photo('teacher-planning', 1600, 1200, {
    ar: 'معلم يراجع أدلة تعلم طلابه ويجهز التكليفات',
    en: 'A teacher reviewing student evidence and preparing assignments',
  }),
  teacherOneToOne: photo('teacher-one-to-one', 1200, 1500, {
    ar: 'معلمة تساعد طالبًا على إعادة تجميع عشرة آحاد في عشرة واحدة',
    en: 'A teacher helping a student regroup ten ones into one ten',
  }),
  leadersMeeting: photo('leaders-meeting', 1600, 900, {
    ar: 'فريق قيادة مدرسة يراجع مؤشرات التقدم معًا',
    en: 'A school leadership team reviewing progress indicators together',
  }),
  placeValue: photo('place-value-blocks', 1600, 1067, {
    ar: 'قطع المئات والعشرات والآحاد توضح جمع 268 و157 مع إعادة التجميع',
    en: 'Base-ten blocks showing 268 plus 157 with regrouping',
  }),
  innovationFair: photo('innovation-fair', 1600, 900, {
    ar: 'فريق طلابي يجهز ركنه في معرض الابتكار المدرسي',
    en: 'A student team preparing their corner at the school innovation fair',
  }),
  studentThinking: photo('student-thinking', 1200, 1500, {
    ar: 'طالبة تفكر في حل مسألة رياضية',
    en: 'A student thinking through a maths problem',
  }),
  schoolInterior: photo('school-interior', 1600, 900, {
    ar: 'مكتبة مدرسة حديثة في دولة الإمارات',
    en: 'A modern school library in the UAE',
  }),
} satisfies Record<string, MediaItem>;

/** Device renders carry localised product screens, so they resolve per locale. */
export function devicesTrio(locale: Locale): MediaItem {
  return {
    src: `/media/devices/devices-trio-${locale}.webp`,
    small: `/media/devices/devices-trio-${locale}-800.webp`,
    width: 1520,
    height: 700,
    smallWidth: 800,
    alt: {
      ar: 'تجربة ماهر على الحاسوب والجهاز اللوحي والهاتف',
      en: 'The MAHER experience on a laptop, a tablet and a phone',
    },
  };
}

export function tabletHands(locale: Locale): MediaItem {
  return {
    src: `/media/devices/tablet-hands-${locale}.webp`,
    small: `/media/devices/tablet-hands-${locale}-700.webp`,
    width: 1200,
    height: 1200,
    smallWidth: 700,
    alt: {
      ar: 'طالب يحل نشاط كسور في ماهر على جهاز لوحي',
      en: 'A learner solving a MAHER fractions activity on a tablet',
    },
  };
}

export const ogImage = (locale: Locale) => `/media/brand/og-${locale}.jpg`;
