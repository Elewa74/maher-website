import type { Locale } from '../../lib/i18n';
import type { MediaItem } from '../../lib/media';
import { withBase } from '../../lib/base-path';

/**
 * Responsive photo in a quiet frame. `priority` marks above-the-fold images
 * (eager + high fetch priority); everything else lazy-loads.
 */
export function SitePhoto({
  item,
  locale,
  sizes = '(max-width: 900px) 100vw, 50vw',
  priority = false,
  className = '',
}: {
  item: MediaItem;
  locale: Locale;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`site-photo ${className}`.trim()}>
      {/* Pre-optimised WebP renditions with srcSet; no runtime optimiser in this stack. */}
      {/* oxlint-disable-next-line next/no-img-element */}
      <img
        src={withBase(item.src)}
        srcSet={`${withBase(item.small)} ${item.smallWidth}w, ${withBase(item.src)} ${item.width}w`}
        sizes={sizes}
        width={item.width}
        height={item.height}
        alt={item.alt[locale]}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </figure>
  );
}
