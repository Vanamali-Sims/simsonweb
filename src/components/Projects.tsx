'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { projectsForLens } from '@/data/projects';
import { useLens } from './LensContext';
import styles from './Sections.module.css';

/**
 * Project grid, re-ordered for the active lens. Cover art is rendered on
 * the server and passed in, so the SVG drawing code never ships to the
 * browser.
 */
export default function Projects({ art }: { art: Record<string, ReactNode> }) {
  const { lens } = useLens();
  const list = projectsForLens(lens.id);

  return (
    <section id="projects" className={`container ${styles.section} ${styles.projectsSection}`} aria-labelledby="projects-title" tabIndex={-1}>
      {/* Slow-drifting background shapes, wide screens only */}
      <div className={styles.ambient} aria-hidden="true">
        <span className={`${styles.shape} ${styles.shapeWash}`} />
        <span className={`${styles.shape} ${styles.shapeSquare}`} />
        <span className={`${styles.shape} ${styles.shapeRing}`} />
        <span className={`${styles.shape} ${styles.shapeBlock}`} />
        <span className={`${styles.shape} ${styles.shapeDisc}`} />
        <span className={`${styles.shape} ${styles.shapeSlash}`} />
        <span className={`${styles.shape} ${styles.shapeFrame}`} />
      </div>
      <header className={styles.head}>
        <span className="label">02 / Projects</span>
        <h2 id="projects-title" className={styles.title}>
          Selected work
        </h2>
        {lens.id !== 'all' ? (
          <p className={styles.note}>
            Sorted for <span className={styles.noteLens}>{lens.label}</span>
          </p>
        ) : null}
      </header>

      <ul className={styles.cards}>
        {list.map((p) => {
          const featured = lens.id === 'all' || p.lenses.includes(lens.id as never);
          return (
            <li key={p.slug} className={featured ? styles.card : `${styles.card} ${styles.dim}`}>
              <Link href={`/work/${p.slug}`} className={styles.cardLink}>
                <div className={styles.cover}>{art[p.slug]}</div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <span className={styles.go} aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  {p.metric ? <p className={styles.metric}>{p.metric}</p> : null}
                  <p className={styles.blurb}>{p.blurb}</p>
                  <ul className={styles.tags} aria-label="Technologies">
                    {p.tags.slice(0, 5).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
