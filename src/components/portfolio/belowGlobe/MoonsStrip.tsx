'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { projectCardHref, type WorkItem } from '@content/keywordPlanets';
import VisuallyHidden from '@/components/VisuallyHidden';
import SkillDotLine from './SkillDotLine';
import styles from './belowGlobe.module.css';

export default function MoonsStrip({ projects }: { projects: WorkItem[] }) {
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-moon-card]');
    const w = card?.offsetWidth ?? 400;
    el.scrollBy({ left: dir * (w + 24), behavior: 'smooth' });
  };

  return (
    <>
      <div className={styles.moonsHeaderRow}>
        <div>
          <p className={styles.kicker}>More builds</p>
          <h3 className={styles.itemTitle}>Smaller orbits</h3>
        </div>
        <div className={styles.moonControls}>
        <button
          type="button"
          className={styles.moonBtn}
          aria-label="Scroll projects left"
          onClick={() => scrollBy(-1)}
        >
          ←
        </button>
        <button
          type="button"
          className={styles.moonBtn}
          aria-label="Scroll projects right"
          onClick={() => scrollBy(1)}
        >
          →
        </button>
        </div>
      </div>
      <div ref={stripRef} className={styles.moonStrip}>
        {projects.map((p) => {
          const href = projectCardHref(p);
          const inner = (
            <>
              {p.media && (
                <Image
                  src={p.media}
                  alt=""
                  fill
                  className={styles.moonMedia}
                  loading="lazy"
                  sizes="(max-width: 767px) 82vw, 38vw"
                />
              )}
              <div className={styles.moonOverlay}>
                <p className={styles.moonName}>{p.name}</p>
                {p.desc && <p className={styles.moonDesc}>{p.desc}</p>}
                <div className={styles.moonMeta}>
                  <span className={styles.moonMetric}>{p.metric}</span>
                  <SkillDotLine skillIds={p.skillIds} />
                </div>
              </div>
            </>
          );
          if (!href) {
            return (
              <div key={p.id} className={styles.moonCard} data-moon-card>
                {inner}
              </div>
            );
          }
          return (
            <a
              key={p.id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.moonCard}
              data-moon-card
            >
              {inner}
              <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
            </a>
          );
        })}
      </div>
    </>
  );
}
