'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { lenses, profile, roles, social } from '@/data/site';
import { projectsForLens } from '@/data/projects';
import { useLens } from './LensContext';
import CopyEmail from './CopyEmail';
import styles from './Hero.module.css';

/**
 * The whole résumé in one screen: name, role for the chosen lens, proof,
 * contact, top projects, experience and education. Below 760px the tiles
 * stack in reading order.
 */
export default function Hero() {
  const { lens, setLens } = useLens();
  const top = projectsForLens(lens.id).slice(0, 3);
  const grid = useRef<HTMLElement>(null);
  const frame = useRef(0);

  // Cursor spotlight: one rAF-throttled listener writes two CSS variables
  // per tile. Only runs for fine pointers; CSS ignores it elsewhere.
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || frame.current) return;
    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      grid.current?.querySelectorAll<HTMLElement>('[data-spot]').forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${clientX - r.left}px`);
        el.style.setProperty('--my', `${clientY - r.top}px`);
      });
    });
  };

  return (
    <section
      ref={grid}
      className={`container ${styles.bento}`}
      aria-labelledby="hero-name"
      onPointerMove={onPointerMove}
    >
      {/* Name */}
      <div className={`${styles.tile} ${styles.name} dots`} data-spot>
        <div className={styles.nameTop}>
          <div className={styles.who}>
            <Image
              src="/portrait.jpg"
              alt=""
              width={56}
              height={56}
              className={styles.avatar}
              priority
            />
            <span className="label">
              {profile.location} · {profile.graduating}
            </span>
          </div>
          <span className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            Available now · full work rights
          </span>
        </div>

        <div>
          <h1 id="hero-name" className={styles.title}>
            Vanamali
            <br />
            Sims<span className={styles.period}>.</span>
          </h1>
          <p className={styles.role} aria-live="polite">
            {lens.role}
          </p>
          <p className={styles.pitch}>{lens.pitch}</p>
        </div>

        <div className={styles.lensRow}>
          <span className="label" id="lens-label">
            Hiring for
          </span>
          <div className={styles.lenses} role="group" aria-labelledby="lens-label">
            {lenses.map((l) => (
              <button
                key={l.id}
                type="button"
                className={styles.lens}
                aria-pressed={l.id === lens.id}
                onClick={() => setLens(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact — the one green block */}
      <div className={`${styles.tile} ${styles.contact}`}>
        <div className={styles.tileHead}>
          <span className={styles.contactLabel}>03 / Contact</span>
          <a href="#contact" className={styles.contactJump} aria-label="Jump to contact section">
            ↓
          </a>
        </div>
        <p className={styles.contactTitle}>
          Let’s
          <br />
          talk.
        </p>
        <div className={styles.contactActions}>
          <CopyEmail className={styles.copy} />
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.ghost}>
            LinkedIn ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={social.github} target="_blank" rel="noopener noreferrer" className={styles.ghost}>
            GitHub ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>

      {/* Proof numbers for the active lens */}
      <div className={`${styles.tile} ${styles.proof}`} data-spot>
        <span className="label">Proof · {lens.label}</span>
        <ul className={styles.proofList}>
          {lens.proof.map((p) => (
            <li key={p.value + p.source}>
              <span className={styles.proofValue}>{p.value}</span>
              <span className={styles.proofLabel}>
                {p.label} <span className={styles.proofSource}>· {p.source}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Top projects for the lens */}
      <div className={`${styles.tile} ${styles.projects}`} data-spot>
        <div className={styles.tileHead}>
          <span className="label">02 / Projects</span>
          <a href="#projects" className={styles.more}>
            all {`→`}
          </a>
        </div>
        <ul>
          {top.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className={styles.projectRow}>
                <span className={styles.index}>0{i + 1}</span>
                <span className={styles.projectText}>
                  <span className={styles.projectTitle}>{p.title}</span>
                  <span className={styles.projectMeta}>{p.metric ?? p.tags.slice(0, 3).join(' · ')}</span>
                </span>
                <span className={styles.go} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Experience */}
      <a href="#experience" className={`${styles.tile} ${styles.experience}`} data-spot>
        <div className={styles.tileHead}>
          <span className="label">01 / Experience</span>
          <span className={styles.go} aria-hidden="true">
            ↓
          </span>
        </div>
        <ol className={styles.timeline}>
          {roles.map((r) => (
            <li key={r.org}>
              <span className={styles.roleName}>{r.role}</span>
              <span className={styles.roleOrg}>
                {r.org} · {r.when.split(' — ')[0].slice(-4)}
                {r.current ? ' → now' : ''}
              </span>
            </li>
          ))}
        </ol>
      </a>

      {/* Education */}
      <div className={`${styles.tile} ${styles.edu}`} data-spot>
        <span className="label">Education</span>
        <div>
          <p className={styles.eduTitle}>Master of Data Science</p>
          <p className={styles.eduMeta}>Monash University · 2025 — 2026</p>
        </div>
      </div>
    </section>
  );
}
