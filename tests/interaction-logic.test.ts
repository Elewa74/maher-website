import { describe, expect, it } from 'vitest';
import { nextTabIndex } from '../components/sections/insight-tabs';

describe('insight tab keyboard movement', () => {
  it('wraps forward and backward', () => {
    expect(nextTabIndex(2, 'next', 3, 'ltr')).toBe(0);
    expect(nextTabIndex(0, 'previous', 3, 'ltr')).toBe(2);
  });

  it('reverses horizontal arrow movement for RTL', () => {
    expect(nextTabIndex(0, 'next', 3, 'rtl')).toBe(2);
    expect(nextTabIndex(0, 'previous', 3, 'rtl')).toBe(1);
  });

  it('supports first and last shortcuts', () => {
    expect(nextTabIndex(2, 'first', 4, 'ltr')).toBe(0);
    expect(nextTabIndex(1, 'last', 4, 'rtl')).toBe(3);
  });

  it('keeps four-tab Home, End and RTL arrow movement in range', () => {
    expect(nextTabIndex(3, 'next', 4, 'ltr')).toBe(0);
    expect(nextTabIndex(0, 'previous', 4, 'rtl')).toBe(1);
    expect(nextTabIndex(3, 'first', 4, 'rtl')).toBe(0);
    expect(nextTabIndex(0, 'last', 4, 'ltr')).toBe(3);
  });
});
