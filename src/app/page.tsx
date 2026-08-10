'use client';

import Link from 'next/link';
import { useState } from 'react';
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

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');
  const visible =
    filter === 'all' ? projects : projects.filter((p) => p.cat === filter);

  return (
    <div className={styles.page}>
      {/* HERO — sky blue volume */}
      <section className={`${styles.hero} grain`}>
        <div className={styles.heroSky}>
          <p className={styles.wayfinding}>01 / MELBOURNE</p>
          <h1 className={styles.brand}>
            Vanamali
            <br />
            <span>Sims</span>
          </h1>
          <p className={styles.lede}>
            Data scientist &amp; software developer. I build systems that hold
            weight — AI products, analysis pipelines, and tools meant to ship.
          </p>
          <div className={styles.ctaRow}>
            <a href="#work" className={styles.ctaPrimary}>
              See the work
            </a>
            <Link href="/contact" className={styles.ctaGhost}>
              Get in touch
            </Link>
          </div>
        </div>
        <div className={styles.heroCantilever}>
          <div className={styles.cubeMustard}>
            <span className={styles.bigNum}>DS</span>
            <span className={styles.cubeLabel}>Science</span>
          </div>
          <div className={styles.cubeRust}>
            <span className={styles.bigNum}>AI</span>
            <span className={styles.cubeLabel}>Systems</span>
          </div>
          <div className={styles.cubeCream}>
            <span className={styles.bigNum}>FS</span>
            <span className={styles.cubeLabel}>Build</span>
          </div>
        </div>
      </section>

      {/* NOW — mustard tiled volume */}
      <section className={`${styles.now} grain`}>
        <div className={styles.nowHead}>
          <p className={styles.wayfindingDark}>02 / NOW</p>
          <h2 className={styles.sectionTitle}>Currently in the studio</h2>
        </div>
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
        <div className={styles.dapple} aria-hidden="true" />
      </section>

      {/* WORK — cream with poppy reveals */}
      <section id="work" className={`${styles.work} grain`}>
        <div className={styles.workHead}>
          <div>
            <p className={styles.wayfindingDark}>03 / WORK</p>
            <h2 className={styles.sectionTitle}>Selected volumes</h2>
          </div>
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

      {/* LORE — rust facade */}
      <section id="lore" className={`${styles.lore} grain`}>
        <div className={styles.loreHead}>
          <p className={styles.wayfinding}>04 / LORE</p>
          <h2 className={styles.sectionTitleLight}>Experience</h2>
        </div>
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

      {/* CONTACT STRIP — concrete */}
      <section className={`${styles.strip} grain`}>
        <p className={styles.wayfindingDark}>05 / NEXT</p>
        <h2 className={styles.stripTitle}>
          Got a problem worth solving?
        </h2>
        <Link href="/contact" className={styles.stripCta}>
          Start a conversation
        </Link>
      </section>
    </div>
  );
}
