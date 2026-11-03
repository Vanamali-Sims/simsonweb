import { alsoRole, CV_PATH, roles } from '@/data/site';
import styles from './Sections.module.css';

export default function Experience() {
  return (
    <section id="experience" className={`container ${styles.section}`} aria-labelledby="experience-title" tabIndex={-1}>
      <header className={styles.head}>
        <span className="label">01 / Experience</span>
        <h2 id="experience-title" className={styles.title}>
          Experience
        </h2>
        <a href={CV_PATH} download className={styles.headLink}>
          Download CV ↓
        </a>
      </header>

      <ol className={styles.roles}>
        {roles.map((r) => (
          <li key={r.org} className={styles.roleRow}>
            <p className={r.current ? `${styles.when} ${styles.whenNow}` : styles.when}>{r.when}</p>
            <div>
              <h3 className={styles.roleTitle}>
                {r.role} <span className={styles.roleOrg}>· {r.org}</span>
              </h3>
              <ul className={styles.points}>
                {r.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <ul className={styles.tags} aria-label="Technologies">
                {r.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <p className={styles.also}>{alsoRole}</p>
    </section>
  );
}
