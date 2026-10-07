'use client';

import { site } from '@content/portfolio';
import VisuallyHidden from '@/components/VisuallyHidden';
import { useEffect, useState } from 'react';

const sections = [
  { id: 'case-studies', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

export default function StickyTopBar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>('hero');

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ids = ['hero', ...sections.map((s) => s.id)];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (!visibleEntries.length) return;
        const top = visibleEntries.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActive(top.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  if (!visible) return null;

  const mailto = `mailto:${site.email}`;

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] border-b border-grid bg-paper/95 backdrop-blur-sm"
      role="banner"
    >
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-3 px-4 py-3 md:gap-4 md:px-6">
        <button
          type="button"
          onClick={scrollTop}
          className="font-display text-sm font-bold tracking-tight md:text-base"
        >
          {site.name}
        </button>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-sm bg-ink px-3 text-sm text-paper sm:inline-flex"
          >
            LinkedIn
            <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
          </a>
          <a
            href={mailto}
            className="hidden min-h-11 items-center rounded-sm bg-ink px-3 text-sm text-paper sm:inline-flex"
          >
            Email
          </a>
          <a
            href={site.cvPath}
            download
            className="inline-flex min-h-11 items-center border border-ink px-3 text-sm font-medium"
          >
            CV ↓
          </a>
        </div>
      </div>
      <nav
        className="mx-auto max-w-[1360px] overflow-x-auto px-4 pb-2 md:px-6"
        aria-label="Page sections"
      >
        <ul className="flex gap-1 font-mono text-xs uppercase tracking-wide">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`inline-flex min-h-11 items-center whitespace-nowrap px-2 py-1 ${
                  active === s.id
                    ? 'font-semibold text-ink underline decoration-2 underline-offset-4'
                    : 'text-muted hover:text-ink'
                }`}
                aria-current={active === s.id ? 'location' : undefined}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
