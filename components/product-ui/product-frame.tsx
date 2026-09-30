import type { ReactNode } from 'react';

export function ProductFrame({
  children,
  label,
  className = '',
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={`product-frame ${className}`} aria-label={label}>
      <div className="product-frame__top" aria-hidden="true">
        <span />
        <span />
        <span />
        <i />
      </div>
      <div className="product-frame__body">{children}</div>
    </div>
  );
}
