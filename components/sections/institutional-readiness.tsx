import {
  Accessibility,
  KeyRound,
  LockKeyhole,
  MapPin,
  MonitorSmartphone,
  Network,
  PlugZap,
  ShieldCheck,
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { InstitutionalCopy } from '../../content/types';
import type { Locale } from '../../lib/i18n';
import { Eyebrow } from '../common/eyebrow';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';

const requirementIcons = [
  Network,
  KeyRound,
  PlugZap,
  LockKeyhole,
  ShieldCheck,
  MapPin,
  Accessibility,
  MonitorSmartphone,
];

export function InstitutionalReadiness({ locale, copy, media }: { locale: Locale; copy: InstitutionalCopy; media?: ReactNode }) {
  return (
    <div className="institutional-readiness">
      <div className="section-heading section-heading--center">
        {copy.eyebrow ? <Eyebrow>{copy.eyebrow}</Eyebrow> : null}
        <h2>{copy.title}</h2>
        <p>{copy.description}</p>
      </div>

      {media}

      <div className="institutional-readiness__status" role="note">
        <ShieldCheck size={19} aria-hidden="true" />
        <strong>{copy.qualifier}</strong>
        <IllustrativeDataLabel locale={locale} />
      </div>

      <div className="institutional-readiness__grid">
        {copy.items.map((item, index) => {
          const Icon = requirementIcons[index];
          return (
            <article
              className="institutional-requirement"
              data-institutional-requirement={index + 1}
              key={item.title}
            >
              <span className="institutional-requirement__icon" aria-hidden="true">
                <Icon size={21} />
              </span>
              <div>
                <span className="institutional-requirement__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
