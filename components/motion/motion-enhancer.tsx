'use client';

import { useEffect } from 'react';

/**
 * Progressive motion layer. Content is fully visible without JavaScript; once this
 * runs (and the visitor has not asked for reduced motion) it adds `motion-ready`
 * to <html>, and CSS animates elements as they receive `in-view`.
 */
const ANIMATED = [
  '.reveal',
  '.adaptive-path',
  '.product-frame',
  '.feature-card-grid',
  '.adaptive-step-grid',
  '.institutional-readiness__grid',
  '.point-list',
  '.pathway-ribbon',
  '.device-stage',
  '.insight-panel',
  '.feature-story__copy',
  '.section-heading',
  '.hero-labels',
  '.device-labels',
  '.branching-visual',
  '.faq-accordion',
  '.site-footer',
].join(',');

export function MotionEnhancer() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    root.classList.add('motion-ready');
    (window as Window & { __maherMotion?: boolean }).__maherMotion = true;

    const pending = new Set<Element>();
    const reveal = (element: Element) => {
      element.classList.add('in-view');
      pending.delete(element);
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal anything visible, or anything the visitor has already scrolled past.
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) reveal(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    const observeAll = () => {
      document.querySelectorAll(ANIMATED).forEach((element) => {
        if (element.classList.contains('in-view') || pending.has(element)) return;
        pending.add(element);
        observer.observe(element);
      });
    };

    // Safety net for very fast scrolling: anything whose top has entered the
    // viewport (or is already above it) is revealed even if no threshold fired.
    const sweep = () => {
      const limit = window.innerHeight * 0.92;
      pending.forEach((element) => {
        if (element.getBoundingClientRect().top < limit) reveal(element);
      });
    };
    observeAll();

    // Tabs and other client-rendered panels mount new nodes; keep observing them.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    // Header scroll progress.
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty('--scroll-progress', max > 0 ? String(window.scrollY / max) : '0');
        sweep();
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
