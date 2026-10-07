'use client';

import { site } from '@content/portfolio';
import VisuallyHidden from '@/components/VisuallyHidden';
import { useEffect, useState } from 'react';

export default function StickyTopBar() {
  const [visible, setVisible] = useState(false);

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
    </header>
  );
}
