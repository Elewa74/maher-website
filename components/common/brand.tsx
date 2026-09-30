import { withBase } from '../../lib/base-path';
/** MAHER Learn logo lockup. `tone="dark"` uses the reversed artwork for dark surfaces. */
export function Brand({ href = '/en', tone = 'light' }: { href?: string; tone?: 'light' | 'dark' }) {
  return (
    <a
      href={withBase(href)}
      aria-label="MAHER ماهر"
      className={`brand-lockup brand-lockup--${tone} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200`}
    >
      {/* Small fixed-size logo; plain <img> keeps it crisp and avoids an optimisation round-trip. */}
      {/* oxlint-disable-next-line next/no-img-element */}
      <img
        className="brand-logo"
        src={withBase(tone === 'dark' ? '/brand/maher-logo-reverse.png' : '/brand/maher-logo.png')}
        alt=""
        width={720}
        height={302}
        decoding="async"
      />
    </a>
  );
}
