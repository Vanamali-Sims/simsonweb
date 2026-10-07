'use client';

import { useState } from 'react';
import {
  CV_PDF_PATH,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from '@content/keywordPlanets';
import VisuallyHidden from '@/components/VisuallyHidden';
import styles from './belowGlobe.module.css';

export default function ClosingSection() {
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const scrollTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="contact"
      className={`${styles.section} ${styles.sectionSpacing}`}
      aria-labelledby="contact-title"
    >
      <p className={styles.kicker}>04 / Contact</p>
      <h2 id="contact-title" className={styles.closingTitle}>
        Let&apos;s talk.
      </h2>

      <div className={styles.emailRow}>
        <a href={`mailto:${EMAIL}`} className={styles.emailLink}>
          {EMAIL}
        </a>
        <button type="button" className={styles.copyBtn} onClick={copyEmail}>
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? 'Email copied to clipboard' : ''}
        </span>
      </div>

      <div className={styles.heroBtns}>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[50px] items-center bg-ink px-5 text-paper font-semibold uppercase tracking-wide text-base"
        >
          LinkedIn
          <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[50px] items-center bg-ink px-5 text-paper font-semibold uppercase tracking-wide text-base"
        >
          GitHub
          <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
        </a>
        <a
          href={CV_PDF_PATH}
          download
          className="inline-flex min-h-[50px] items-center border-2 border-ink px-5 font-semibold uppercase tracking-wide text-base"
        >
          CV ↓
        </a>
      </div>

      <footer className={styles.closingFooter}>
        <span>Sai Vanamali · Melbourne · {year}</span>
        <button type="button" onClick={scrollTop} className="underline">
          Back to the globe ↑
        </button>
      </footer>
    </section>
  );
}
