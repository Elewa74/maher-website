import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { withBase } from '../../lib/base-path';

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  showArrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'quiet';
  showArrow?: boolean;
}) {
  return (
    <a className={`button-link button-link--${variant}`} href={withBase(href)}>
      <span>{children}</span>
      {showArrow ? <ArrowRight aria-hidden="true" size={18} className="directional-icon" /> : null}
    </a>
  );
}
