'use client';

import styles from './page.module.css';
import { ArrowRight, Lightbulb } from 'lucide-react';
import ScrollIndicator from '@/components/ScrollIndicator';
import ProjectsSection from '@/components/ProjectsSection';

function AnimatedText({ text }: { text: string }) {
  return (
    <div className={styles.animatedText}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={styles.animatedChar}
          style={{
            animationDelay: `${i * 0.05}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.background}>
        <div className={styles.noise} />
        <div className={styles.grid} />
        <div className={styles.vectorElements}>
          <div className={styles.circle} />
          <div className={styles.circle} />
          <div className={styles.dots} />
          <div className={styles.dots} />
          <div className={styles.accent} />
          <div className={styles.accent} />
        </div>
        <div className={styles.floatingPoints}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={styles.point}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
              }}
            />
          ))}
        </div>
        <div className={styles.watermarkContainer}>
          <div className={styles.watermark}>
            {['S', 'I', 'M', 'S'].map((letter, i) => (
              <span
                key={i}
                style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.floatingTextContainer}>
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={styles.floatingWord}
              style={{
                '--delay': `${i * -0.5}s`,
                '--angle': `${i * 14.4}`,
                top: `${(i * 100) / 25}%`,
              } as React.CSSProperties}
            >
              {i % 3 === 0 ? '{ design }' : i % 3 === 1 ? '< code />' : '[ create ]'}
            </div>
          ))}
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.introBlock}>
          <div className={styles.greeting}>
            Hello <span className={styles.bulb}><Lightbulb size={16} /></span>
          </div>
          <h1 className={styles.name}>
            Vanamali <span className={styles.sims}>Sims</span>
          </h1>
          <p className={styles.role}>Data Scientist & Software Developer</p>
          <p className={styles.tagline}>Not just models. Meaning.</p>
          <ScrollIndicator styles={styles} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <span>→</span> Currently Exploring
          </h2>
          <div className={styles.nowBlock}>
            <div className={styles.nowItem}>
              <ArrowRight size={16} />
              <span>🧠 Currently exploring how just 72 rows of gene expression data can unravel key differences between human and chimp brains — because in bioinformatics, it's not about the row count, it's about the biological depth.</span>
            </div>
            <div className={styles.nowItem}>
              <ArrowRight size={16} />
              <span>🔬 Bridging data science and genomics to uncover evolutionary insights through RNA-Seq analysis and clean, reproducible pipelines.</span>
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <span>→</span> Latest Music
          </h2>
          <div className={styles.musicShelf}>
            <iframe
              className={styles.musicPlayer}
              src="https://www.youtube.com/embed/cziSQmHNHQs"
              title="Latest Music"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <p className={styles.manifesto}>
            "art imitating life imitating art"
          </p>
        </div>
      </section>
    </main>
  );
}
