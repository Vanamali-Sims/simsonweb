import { getMissions, getMoonProjects } from '@content/keywordPlanets';
import MissionBlock from './MissionBlock';
import MoonsStrip from './MoonsStrip';
import styles from './belowGlobe.module.css';

export default function ProjectsSection() {
  const missions = getMissions();

  return (
    <section
      id="projects"
      className={`${styles.section} ${styles.sectionSpacing}`}
      aria-labelledby="projects-title"
    >
      <p className={styles.kicker}>02 / Projects</p>
      <h2 id="projects-title" className={styles.sectionTitle}>Missions</h2>
      <p className={styles.sectionLead}>
        Three builds, start to finish. Scroll through each.
      </p>

      {missions.map((m) => (
        <MissionBlock key={m.id} work={m} />
      ))}

      <div className={styles.sectionSpacing}>
        <MoonsStrip projects={getMoonProjects()} />
      </div>
    </section>
  );
}
