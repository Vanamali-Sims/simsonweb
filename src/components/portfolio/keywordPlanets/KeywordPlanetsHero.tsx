import dynamic from 'next/dynamic';
import {
  CV_PDF_PATH,
  EMAIL,
  getSkillsWithUsage,
  LINKEDIN_URL,
  workItems,
} from '@content/keywordPlanets';
import VisuallyHidden from '@/components/VisuallyHidden';
import styles from './KeywordPlanets.module.css';

const PlanetPanel = dynamic(() => import('./PlanetPanel'), {
  ssr: false,
  loading: () => (
    <div
      className={styles.panel}
      style={
        {
          '--globe-size': '330px',
          '--sphere-r': '132px',
          minHeight: 440,
        } as React.CSSProperties
      }
      aria-hidden
    />
  ),
});

function GlobeSrList() {
  const skills = getSkillsWithUsage();
  return (
    <ul className="sr-only">
      {skills.map((s) => {
        const works = workItems.filter((w) => w.skillIds.includes(s.id));
        return (
          <li key={s.id}>
            {s.name}: used in{' '}
            {works.map((w) => `${w.name} (${w.result})`).join('; ')}
          </li>
        );
      })}
      {workItems.map((w) => (
        <li key={w.id}>
          {w.name}: {w.result}
        </li>
      ))}
    </ul>
  );
}

export default function KeywordPlanetsHero() {
  const mailto = `mailto:${EMAIL}`;

  return (
    <section id="hero" className={styles.section} aria-labelledby="hero-name">
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.leftEnter}>
            <div className={styles.left}>
              <h1 id="hero-name" className={styles.name}>
                SAI
                <br />
                VANAMALI
              </h1>

              <div className={styles.buttons}>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSolid}
                >
                  LinkedIn
                  <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
                </a>
                <a href={mailto} className={styles.btnSolid}>
                  Email
                </a>
                <a
                  href={CV_PDF_PATH}
                  download
                  className={styles.btnOutline}
                >
                  CV ↓
                </a>
              </div>

              <div className={styles.summary}>
                <p className={styles.summaryLead}>
                  I build analysis pipelines, ML models and the front-ends people
                  actually use. Routing cut from 6s to 0.2s in production, a
                  recommender 20× over baseline, client sites that grew 18×.
                </p>
                <p className={styles.summarySub}>
                  Master of Data Science, Monash (Nov 2026). Melbourne. Available
                  Dec 2026, full work rights.
                </p>
              </div>

              <p className={styles.interests}>
                ML <span className={styles.interestSep}>—</span> DS{' '}
                <span className={styles.interestSep}>—</span> Front-end{' '}
                <span className={styles.interestSep}>—</span> Music
              </p>
            </div>
          </div>

          <PlanetPanel />
        </div>
      </div>

      <div className={styles.footerRow}>
        <a href="#case-studies" className={styles.footerLink}>
          Selected work, experience and case studies ↓
        </a>
        <span>simsdoesdata.me</span>
      </div>

      <GlobeSrList />
    </section>
  );
}
