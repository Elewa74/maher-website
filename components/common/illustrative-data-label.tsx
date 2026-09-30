import type { Locale } from '../../lib/i18n';

export function IllustrativeDataLabel({ locale }: { locale: Locale }) {
  return (
    <span className="illustrative-data-label" data-illustrative-label>
      {locale === 'ar' ? 'بيانات توضيحية' : 'Illustrative Data'}
    </span>
  );
}
