'use client';

import { site } from '@content/portfolio';
import VisuallyHidden from '@/components/VisuallyHidden';
import { useState } from 'react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <footer
      id="contact"
      className="px-5 py-20 md:px-8 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[1360px] space-y-10">
        <h2 id="contact-heading" className="font-display text-5xl font-bold tracking-tight md:text-6xl">
          Let&apos;s talk.
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="font-display text-2xl font-semibold underline decoration-2 underline-offset-4 md:text-3xl"
          >
            {site.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="min-h-11 rounded border border-ink px-4 text-sm font-medium"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm font-medium" aria-label="Contact links">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
            <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
            <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
          </a>
          <a href={site.cvPath} download>CV ↓</a>
        </nav>
        <p className="font-mono text-xs text-muted">
          {site.name} · Melbourne · {site.year}
        </p>
      </div>
    </footer>
  );
}
