'use client';

import styles from '../app/page.module.css';

export default function ExperienceSection() {
  return (
    <section id="lore-section" className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>
          <span>→</span> Experience
        </h2>
        <div className={styles.projectsGrid}>
          <div className={styles.projectCard}>
            <h3 className={styles.projectTitle}>Co-Founder & AI Lead</h3>
            <p className={styles.projectDescription}>
              Building affordable, local AI agents for businesses and individuals. Specializing in custom automation solutions,
              web scraping, and intelligent task automation using cutting-edge AI technologies.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>Zelo</span>
              <span className={styles.projectTag}>Jul 2025 - Present</span>
            </div>
          </div>

          <div className={styles.projectCard}>
            <h3 className={styles.projectTitle}>Machine Learning Intern</h3>
            <p className={styles.projectDescription}>
              Developed and implemented machine learning solutions for real-world applications, focusing on data processing
              and predictive modeling. Worked on various ML projects and data analysis tasks.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>Silveroakapps</span>
              <span className={styles.projectTag}>Feb 2025 - Jul 2025</span>
            </div>
          </div>

          <div className={styles.projectCard}>
            <h3 className={styles.projectTitle}>Meta Expert</h3>
            <p className={styles.projectDescription}>
              Part-time retail sales expert providing consultation and solutions for Meta's platform and technologies.
              Supporting customers with platform integration and technical guidance.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>Meta</span>
              <span className={styles.projectTag}>Jul 2025 - Present</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}