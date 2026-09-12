'use client';

import EmailLink, { EmailAddress } from '@/components/EmailLink';
import ProjectImage from '@/components/ProjectImage';
import { projects } from '@/data/projects';
import {
  aboutShort,
  CV_PATH,
  positioning,
  proofChips,
  roles,
  social,
  stacks,
} from '@/data/site';
import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'product', label: 'Product' },
  { id: 'science', label: 'Science' },
] as const;

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');
  const visible =
    filter === 'all' ? projects : projects.filter((p) => p.cat === filter);

  return (
    <div className={styles.page}>
      <section className={`${styles.hero} grain`}>
        <div className={styles.heroInner}>
          <p className={styles.wayfindingOnInk}>01 / PERSON</p>
          <h1 className={styles.heroName}>
            Vanamali <span>Sims</span>
          </h1>
          <p className={styles.heroLede}>{positioning}</p>
          <ul className={styles.chips}>
            {proofChips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <div className={styles.ctaRow}>
            <a href="#work" className={styles.ctaPrimary}>
              See the work
            </a>
            <a href={CV_PATH} download className={styles.ctaGhost}>
              Download CV
            </a>
          </div>
        </div>
      </section>

      <section id="work" className={`${styles.work} grain`}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>Signal vs. noise</p>
          <p className={styles.wayfinding}>02 / WORK</p>
          <h2 className={styles.sectionTitle}>Selected work</h2>
        </header>
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
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`${styles.project} ${
                i % 3 === 1 ? styles.projectShift : ''
              } ${i % 3 === 2 ? styles.projectHang : ''}`}
            >
              <ProjectImage src={project.image} alt={project.imageAlt} />
              <div className={styles.projectBody}>
                <p className={styles.projectMetric}>
                  {project.metric ?? 'TODO — outcome metric'}
                </p>
                <h3>{project.title}</h3>
                <p>{project.blurb}</p>
                <div className={styles.tags}>
                  {project.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="experience" className={`${styles.experience} grain`}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrowOnInk}>Bias–variance tradeoff</p>
          <p className={styles.wayfindingOnInk}>03 / EXPERIENCE</p>
          <h2 className={styles.sectionTitleOnInk}>Experience</h2>
        </header>
        <div className={styles.loreStack}>
          {roles.map((item, i) => (
            <article
              key={`${item.org}-${item.role}`}
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
      </section>

      <section id="stack" className={styles.stack} aria-label="Stack">
        <p className={styles.eyebrow}>Gradient descent</p>
        <div className={styles.stackStrip}>
          {stacks.map((group) => (
            <div key={group.title} className={styles.stackGroup}>
              <span className={styles.stackLabel}>{group.title}</span>
              <span className={styles.stackItems}>{group.items.join(' · ')}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className={`${styles.about} grain`}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>Overfitting vs. generalization</p>
          <p className={styles.wayfinding}>04 / ABOUT</p>
          <h2 className={styles.sectionTitle}>The short version</h2>
        </header>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutCopy}>
            {aboutShort.map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
            <Link href="/about" className={styles.textLink}>
              Full story →
            </Link>
          </div>
          <div
            className={styles.photoSlot}
            role="img"
            aria-label="Portrait placeholder — photo to be supplied"
          />
        </div>
      </section>

      <section id="contact" className={`${styles.contact} grain`}>
        <header className={styles.sectionHead}>
          <p className={styles.wayfinding}>CONTACT / 05</p>
          <h2 className={styles.sectionTitle}>Got a problem worth solving?</h2>
        </header>
        <div className={styles.contactGrid}>
          <EmailLink className={styles.contactCard}>
            <span className={styles.contactLabel}>Email</span>
            <EmailAddress className={styles.contactValue} />
          </EmailLink>
          <div className={styles.contactCard}>
            <span className={styles.contactLabel}>Location</span>
            <span className={styles.contactValue}>{social.location}</span>
          </div>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactCard}
          >
            <span className={styles.contactLabel}>LinkedIn</span>
            <span className={styles.contactValue}>van-sims</span>
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactCard}
          >
            <span className={styles.contactLabel}>GitHub</span>
            <span className={styles.contactValue}>Vanamali-Sims</span>
          </a>
          <a href={CV_PATH} download className={styles.contactCard}>
            <span className={styles.contactLabel}>CV</span>
            <span className={styles.contactValue}>Download</span>
          </a>
        </div>
      </section>
    </div>
  );
}
