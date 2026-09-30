'use client';

import { BarChart3, Building2, Lightbulb, Target } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import type { InsightTab } from '../../content/types';
import type { Locale } from '../../lib/i18n';
import { IllustrativeDataLabel } from '../common/illustrative-data-label';

type TabMove = 'next' | 'previous' | 'first' | 'last';

export function nextTabIndex(current: number, move: TabMove, count: number, dir: 'ltr' | 'rtl') {
  if (move === 'first') return 0;
  if (move === 'last') return count - 1;
  const forward = move === 'next' ? 1 : -1;
  const delta = dir === 'rtl' ? -forward : forward;
  return (current + delta + count) % count;
}

const icons = [BarChart3, Target, Building2, Lightbulb];

export function InsightTabs({ locale, items }: { locale: Locale; items: InsightTab[] }) {
  const [active, setActive] = useState('insight-0');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    const current = Number(active.replace('insight-', ''));
    const moves: Record<string, TabMove> = { ArrowRight: 'next', ArrowLeft: 'previous', Home: 'first', End: 'last' };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const next = nextTabIndex(current, move, items.length, dir);
    const value = `insight-${next}`;
    setActive(value);
    document.getElementById(`${value}-tab`)?.focus();
  }

  return (
    <Tabs value={active} onValueChange={setActive} className="insight-tabs" dir={dir}>
      <TabsList className="insight-tabs__list" onKeyDown={handleKeys}>
        {items.map((item, index) => <TabsTrigger id={`insight-${index}-tab`} value={`insight-${index}`} key={item.label}>{item.label}</TabsTrigger>)}
      </TabsList>
      {items.map((item, index) => {
        const Icon = icons[index];
        return (
          <TabsContent value={`insight-${index}`} className="insight-panel" key={item.label}>
            <div className="insight-panel__copy"><span><Icon size={23}/></span><h3>{item.title}</h3><p>{item.description}</p></div>
            <div className="insight-panel__metric">
              <IllustrativeDataLabel locale={locale} />
              <small>{item.detail}</small>
              <strong>{item.value}</strong>
              <div aria-hidden="true"><i/><i/><i/><i/><i/></div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
