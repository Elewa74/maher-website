import type { CSSProperties, ReactNode } from 'react';

/**
 * Scroll reveal wrapper. Server output is always fully visible; the client-side
 * MotionEnhancer adds `motion-ready` to <html> and `in-view` to each `.reveal`,
 * which lets CSS play the entrance (and respects prefers-reduced-motion).
 */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const style = delay ? ({ '--reveal-delay': `${delay}s` } as CSSProperties) : undefined;
  return (
    <div className={`reveal ${className}`.trim()} style={style} suppressHydrationWarning>
      {children}
    </div>
  );
}
