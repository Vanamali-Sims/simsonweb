'use client';

import { timelineEntries, type WorkNode } from '@content/portfolio';
import BeforeAfterBars from './BeforeAfterBars';
import { useState } from 'react';

const RANGE_START = new Date('2025-03-01');
const RANGE_END = new Date('2026-11-30');
const TODAY = new Date();

function monthIndex(d: Date) {
  return (d.getFullYear() - RANGE_START.getFullYear()) * 12 + (d.getMonth() - RANGE_START.getMonth());
}

const totalMonths = monthIndex(RANGE_END) - monthIndex(RANGE_START) + 1;

function parseYm(ym: string) {
  const [y, m] = ym.split('-').map(Number);
  return new Date(y, m - 1, 1);
}

function barStyle(entry: WorkNode) {
  const t = entry.timeline;
  if (!t) return null;
  const start = parseYm(t.start);
  const end = t.end ? parseYm(t.end) : TODAY;
  const left = (monthIndex(start) / totalMonths) * 100;
  const width = ((monthIndex(end) - monthIndex(start) + 1) / totalMonths) * 100;
  return { left: `${left}%`, width: `${Math.max(width, 2)}%` };
}

function barColor(entry: WorkNode) {
  if (entry.type === 'education') return 'border-2 border-ink bg-transparent';
  if (entry.category === 'frontend') return 'bg-frontend';
  if (entry.category === 'bridge') return 'bg-ink';
  return 'bg-data';
}

const quarters = ['Mar 2025', 'Jun 2025', 'Sep 2025', 'Dec 2025', 'Mar 2026', 'Jun 2026', 'Sep 2026'];

export default function ExperienceGantt() {
  const [openId, setOpenId] = useState<string | null>(null);
  const todayPct = (monthIndex(TODAY) / totalMonths) * 100;

  return (
    <section
      id="experience"
      className="border-b border-grid px-5 py-16 md:px-8 md:py-20"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-[1360px]">
        <h2 id="experience-heading" className="font-display text-4xl font-bold tracking-tight">
          Experience
        </h2>
        <div className="mt-10 overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="relative mb-2 flex justify-between font-mono text-[10px] text-muted">
              {quarters.map((q) => (
                <span key={q}>{q}</span>
              ))}
            </div>
            <div className="relative h-8 border-b border-grid">
              <div
                className="absolute top-0 bottom-0 border-l border-dashed border-muted"
                style={{ left: `${todayPct}%` }}
                aria-hidden="true"
              />
              <span className="sr-only">Today marker on timeline</span>
            </div>
            <ul className="mt-4 space-y-3">
              {timelineEntries.map((entry) => {
                const style = barStyle(entry);
                const isOpen = openId === entry.id;
                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      className="grid w-full gap-2 text-left md:grid-cols-[220px_1fr] md:items-center"
                      onClick={() => setOpenId(isOpen ? null : entry.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-medium md:pr-4">
                        {entry.timeline?.label}
                      </span>
                      <span className="relative block h-8 w-full bg-grid/30">
                        {style ? (
                          <span
                            className={`absolute top-1 h-6 ${barColor(entry)}`}
                            style={style}
                          />
                        ) : null}
                      </span>
                    </button>
                    {isOpen && entry.timeline ? (
                      <div className="mt-3 space-y-3 border-l-2 border-grid pl-4 md:ml-[220px]">
                        <p className="font-mono text-xs text-muted">
                          {entry.dates ?? `${entry.timeline.start} – ${entry.timeline.end ?? 'present'}`}
                        </p>
                        {entry.timeline.detail ? <p>{entry.timeline.detail}</p> : (
                          <p>{entry.headline}</p>
                        )}
                        {entry.resultChart ? (
                          <BeforeAfterBars
                            beforeLabel={entry.resultChart.beforeLabel}
                            afterLabel={entry.resultChart.afterLabel}
                            beforeValue={entry.resultChart.beforeValue}
                            afterValue={entry.resultChart.afterValue}
                            color={entry.category === 'frontend' ? 'frontend' : 'data'}
                            className="max-w-sm"
                          />
                        ) : null}
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
