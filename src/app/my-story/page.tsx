'use client';

import styles from './page.module.css';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function MyStory() {
  return (
    <main className={styles.page}>
      <AnimatedBackground />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            <span className={styles.titleStatic}>My</span>
            <span className={styles.titleDynamic}>Story</span>
          </h1>
          
          <div className={styles.content}>
            <p className={styles.paragraph}>
              Hey! I'm <span className={styles.name}>Sai Vanamali</span>, a <span className={styles.highlight}>Data Scientist</span> and <span className={styles.highlight}>Full Stack Developer</span> with 
              a passion for creating intelligent solutions that blend AI and modern technology.
            </p>

            <p className={styles.paragraph}>
              Based in Melbourne, Australia, I'm currently pursuing my Master's in Data Science at Monash University. 
              My focus lies in leveraging data science and machine learning to uncover meaningful patterns and create 
              impactful solutions, particularly in bioinformatics and genomic analysis.
            </p>

            <div className={styles.skillsSection}>
              <div className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>Data Science & AI</h3>
                <div className={styles.skillList}>
                  <span className={styles.skill}>Python</span>
                  <span className={styles.skill}>PyTorch</span>
                  <span className={styles.skill}>scikit-learn</span>
                  <span className={styles.skill}>TensorFlow</span>
                  <span className={styles.skill}>Pandas</span>
                  <span className={styles.skill}>NumPy</span>
                  <span className={styles.skill}>R</span>
                </div>
              </div>

              <div className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>Data Analysis & Visualization</h3>
                <div className={styles.skillList}>
                  <span className={styles.skill}>PowerBI</span>
                  <span className={styles.skill}>Excel</span>
                  <span className={styles.skill}>Tableau</span>
                  <span className={styles.skill}>Matplotlib</span>
                  <span className={styles.skill}>Seaborn</span>
                  <span className={styles.skill}>Plotly</span>
                </div>
              </div>

              <div className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>Bioinformatics</h3>
                <div className={styles.skillList}>
                  <span className={styles.skill}>RNA-Seq Analysis</span>
                  <span className={styles.skill}>Genomic Data Processing</span>
                  <span className={styles.skill}>BioPython</span>
                  <span className={styles.skill}>DESeq2</span>
                  <span className={styles.skill}>BLAST</span>
                </div>
              </div>

              <div className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>Web Development</h3>
                <div className={styles.skillList}>
                  <span className={styles.skill}>TypeScript</span>
                  <span className={styles.skill}>React</span>
                  <span className={styles.skill}>Next.js</span>
                  <span className={styles.skill}>FastAPI</span>
                  <span className={styles.skill}>Node.js</span>
                </div>
              </div>

              <div className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>Cloud & DevOps</h3>
                <div className={styles.skillList}>
                  <span className={styles.skill}>AWS</span>
                  <span className={styles.skill}>Docker</span>
                  <span className={styles.skill}>Git</span>
                  <span className={styles.skill}>CI/CD</span>
                </div>
              </div>

              <div className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>Databases</h3>
                <div className={styles.skillList}>
                  <span className={styles.skill}>PostgreSQL</span>
                  <span className={styles.skill}>MongoDB</span>
                  <span className={styles.skill}>MySQL</span>
                  <span className={styles.skill}>Redis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 