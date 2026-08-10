'use client';

import Link from 'next/link';
import { useState } from 'react';
import ConceptVisual from '@/components/ConceptVisuals';
import SectionBeatHeader from '@/components/SectionBeat';
import { heroBeat, sectionBeats } from '@/data/sectionBeats';
import styles from './page.module.css';

const projects = [
  {
    title: 'Mira',
    blurb: 'AI mental wellness — FastAPI + React with personalized journaling and tasks.',
    tags: ['FastAPI', 'React', 'GPT', 'PostgreSQL'],
    url: 'https://github.com/Vanamali-Sims/Mira',
    cat: 'product',
  },
  {
    title: 'excuseMe.ai',
    blurb: 'Apology generator that swings witty, heartfelt, or dramatic on demand.',
    tags: ['Python', 'Streamlit', 'LLM'],
    url: 'https://github.com/Vanamali-Sims/excuseMe',
    cat: 'product',
  },
  {
    title: 'Human × Chimp Brain',
    blurb: 'RNA-Seq differential expression across human and chimpanzee brain tissue.',
    tags: ['Bioinformatics', 'Python', 'Jupyter'],
    url: 'https://github.com/Vanamali-Sims/m-a-b-chimp',
    cat: 'science',
  },
  {
    title: 'Disaster Predictors',
    blurb: 'ML models for earthquakes and forest fires with real-time data hooks.',
    tags: ['Python', 'ML'],
    url: 'https://github.com/Vanamali-Sims/Disaster-predictor-models',
    cat: 'science',
  },
  {
    title: 'Customer Churn',
    blurb: 'Predictive churn analysis with full EDA and model evaluation.',
    tags: ['Python', 'Analytics'],
    url: 'https://github.com/Vanamali-Sims/Customer-Churn-Analysis',
    cat: 'science',
  },
  {
    title: 'RSS Reader',
    blurb: 'TypeScript feed parser — fetch, validate, and persist RSS payloads.',
    tags: ['TypeScript', 'APIs'],
    url: 'https://github.com/Vanamali-Sims/Rss_Reader',
    cat: 'product',
  },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'product', label: 'Product' },
  { id: 'science', label: 'Science' },
] as const;

const roles = [
  {
    role: 'Co-Founder & AI Lead',
    org: 'Zelo',
    when: '2025 — Now',
    text: 'Affordable local AI agents. Custom automation, scraping, and intelligent workflows for people who refuse enterprise price tags.',
  },
  {
    role: 'Meta Expert',
    org: 'Meta',
    when: '2025 — Now',
    text: 'Retail + technical consultation on Meta platforms — turning product questions into clear next steps.',
  },
  {
    role: 'Machine Learning Intern',
    org: 'Silveroakapps',
    when: '2025',
    text: 'Shipped ML solutions for real datasets — processing pipelines, predictive models, and evaluation loops.',
  },
];

const lessons = [
  {
    title: 'Shipped ugly, learned faster',
    text: 'The model that generalized was never the prettiest fit on the training set.',
  },
  {
    title: 'Hold out a real world',
    text: 'If it only works on the notebook, it doesn\'t work. New points are the point.',
  },
  {
    title: 'Taste is a regularizer',
    text: 'Constraints — time, clarity, honesty — keep the system from memorizing noise.',
  },
];

const byId = Object.fromEntries(sectionBeats.map((b) => [b.id, b]));

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');
  const visible =
    filter === 'all' ? projects : projects.filter((p) => p.cat === filter);

  return (
    <div className={styles.page}>
      {/* HERO — loud poppy: Rocky + Occam */}
      <section className={`${styles.heroBanner} grain`}>
        <div className={styles.heroMain}>
          <p className={styles.bannerTag}>Motivation, backed by data</p>
          <h1 className={styles.bannerQuote}>
            “{heroBeat.primaryLyric}”
          </h1>
          <p className={styles.bannerCredit}>— {heroBeat.primaryCredit}</p>
        </div>
        <div className={styles.occamPanel}>
          <p className={styles.conceptChip}>{heroBeat.concept}</p>
          <ConceptVisual id="occam" />
          <p className={styles.occamGloss}>{heroBeat.gloss}</p>
        </div>
      </section>

      {/* Soft beat — Skegss, dappled cream */}
      <section className={`${styles.softBeat} grain`}>
        <div className={styles.dapple} aria-hidden="true" />
        <div className={styles.softInner}>
          <p className={styles.wayfindingDark}>01 / PERSON</p>
          <blockquote className={styles.softLyric}>
            <p>“{heroBeat.softLyric}”</p>
            <cite>— {heroBeat.softCredit}</cite>
          </blockquote>
          <h2 className={styles.softName}>
            Vanamali <span>Sims</span>
          </h2>
          <p className={styles.softLede}>
            Data scientist &amp; software developer in Melbourne. I build
            systems that hold weight — AI products, analysis pipelines, and
            tools meant to ship.
          </p>
          <div className={styles.ctaRow}>
            <a href="#work" className={styles.ctaPrimary}>
              See the work
            </a>
            <Link href="/contact" className={styles.ctaGhostDark}>
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS — gradient descent */}
      <section id="process" className={`${styles.process} grain`}>
        <SectionBeatHeader beat={byId.process} tone="dark" />
        <div className={styles.nowGrid}>
          <article className={styles.nowBlock}>
            <span className={styles.nowIndex}>A</span>
            <h3>Zelo</h3>
            <p>
              Making AI usable without the enterprise tax — local agents,
              custom automation, practical deployments.
            </p>
          </article>
          <article className={`${styles.nowBlock} ${styles.nowOffset}`}>
            <span className={styles.nowIndex}>B</span>
            <h3>Gene expression</h3>
            <p>
              Digging into human vs chimp brain RNA-Seq — patterns that make
              biology legible through ML.
            </p>
          </article>
        </div>
      </section>

      {/* WORK — signal vs noise */}
      <section id="work" className={`${styles.work} grain`}>
        <SectionBeatHeader beat={byId.work} tone="cream" />
        <div className={styles.workTools}>
          <div className={styles.filters} role="tablist" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                className={`${styles.filter} ${
                  filter === f.id ? styles.filterActive : ''
                }`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.projectGrid}>
          {visible.map((project, i) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.project} ${
                i % 3 === 1 ? styles.projectShift : ''
              } ${i % 3 === 2 ? styles.projectHang : ''}`}
            >
              <div className={styles.projectFace}>
                <span className={styles.projectNum}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{project.title}</h3>
                <p>{project.blurb}</p>
                <div className={styles.tags}>
                  {project.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className={styles.projectReveal} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      {/* LESSONS — overfitting */}
      <section id="lessons" className={`${styles.lessons} grain`}>
        <SectionBeatHeader beat={byId.lessons} tone="light" />
        <div className={styles.lessonGrid}>
          {lessons.map((item, i) => (
            <article
              key={item.title}
              className={`${styles.lesson} ${i === 1 ? styles.lessonShift : ''}`}
            >
              <span className={styles.lessonNum}>0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* LORE / BALANCE — bias-variance */}
      <section id="lore" className={`${styles.lore} grain`}>
        <SectionBeatHeader beat={byId.balance} tone="light" />
        <div className={styles.loreStack}>
          {roles.map((item, i) => (
            <article
              key={item.role}
              className={`${styles.role} ${i === 1 ? styles.roleCantilever : ''}`}
            >
              <div className={styles.roleMeta}>
                <span className={styles.roleWhen}>{item.when}</span>
                <span className={styles.roleOrg}>{item.org}</span>
              </div>
              <h3>{item.role}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className={styles.stairShadow} aria-hidden="true" />
      </section>

      {/* CONTACT STRIP */}
      <section className={`${styles.strip} grain`}>
        <p className={styles.wayfindingDark}>NEXT / CONVERGENCE</p>
        <h2 className={styles.stripTitle}>Got a problem worth solving?</h2>
        <Link href="/contact" className={styles.stripCta}>
          Start a conversation
        </Link>
      </section>
    </div>
  );
}
