import { withBase } from '../../lib/base-path';
export type CharacterPose = 'front' | 'three-quarter' | 'curious' | 'thinking' | 'happy';

const sizes = {
  lg: { suffix: '', height: 420 },
  sm: { suffix: '-sm', height: 140 },
} as const;

/** Decorative MAHER companion character (transparent WebP cut from the approved sheet). */
export function MaherCharacter({
  pose,
  size = 'lg',
  className = '',
  eager = false,
}: {
  pose: CharacterPose;
  size?: keyof typeof sizes;
  className?: string;
  eager?: boolean;
}) {
  const s = sizes[size];
  const widths: Record<CharacterPose, number> = { front: 452, 'three-quarter': 393, curious: 395, thinking: 373, happy: 423 };
  const width = Math.round((widths[pose] * s.height) / 420);
  return (
    // Decorative illustration; alt is intentionally empty.
    // oxlint-disable-next-line next/no-img-element
    <img
      className={`maher-character ${className}`.trim()}
      src={withBase(`/media/character/maher-${pose}${s.suffix}.webp`)}
      alt=""
      width={width}
      height={s.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
