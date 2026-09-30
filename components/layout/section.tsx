import type { ReactNode } from 'react';

export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return <section className={`site-section ${className}`} id={id}><div className="site-container">{children}</div></section>;
}
