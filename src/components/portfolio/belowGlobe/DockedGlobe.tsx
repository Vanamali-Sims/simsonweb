'use client';

import { useEffect, useState } from 'react';
import { planets } from '@content/keywordPlanets';
import GlobeMini from '@/components/portfolio/keywordPlanets/GlobeMini';
import styles from './belowGlobe.module.css';

const SECTION_PLANET: Record<string, number> = {
  projects: 1,
  experience: 2,
  contact: 0,
};

const SECTION_LABEL: Record<string, string> = {
  projects: 'Projects',
  experience: 'Experience',
  contact: 'Contact',
};

export default function DockedGlobe() {
  const [docked, setDocked] = useState(false);
  const [planetIndex, setPlanetIndex] = useState(1);
  const [sectionLabel, setSectionLabel] = useState('Projects');
  const [size, setSize] = useState(96);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const mq = window.matchMedia('(max-width: 767px)');
    const onMq = () => setSize(mq.matches ? 64 : 96);
    onMq();
    mq.addEventListener('change', onMq);
    return () => mq.removeEventListener('change', onMq);
  }, []);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setDocked(entry.intersectionRatio < 0.15);
      },
      { threshold: [0, 0.15, 0.5, 1] }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ids = ['projects', 'experience', 'contact'];
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
        const id = top.target.id;
        const p = SECTION_PLANET[id];
        if (p != null) {
          setPlanetIndex(p);
          setSectionLabel(SECTION_LABEL[id] ?? 'Projects');
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  if (!docked) return null;

  const planet = planets[planetIndex];

  return (
    <div
      data-docked-globe
      className={`${styles.dockedWrap} ${docked ? styles.dockedWrapVisible : ''}`}
    >
      <button
        type="button"
        className={styles.dockedBtn}
        aria-label="Back to top: keyword globe"
        onClick={scrollTop}
      >
        <span className={styles.dockedLabel}>{sectionLabel}</span>
        <GlobeMini
          size={size}
          planet={planet}
          animateIn={docked}
          reducedMotion={reducedMotion}
          paused={reducedMotion}
        />
      </button>
    </div>
  );
}
