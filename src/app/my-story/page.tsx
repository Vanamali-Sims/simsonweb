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
            <span className={styles.titleDynamic}></span>
          </h1>
          
          <div className={styles.content}>
            <p className={styles.paragraph}>
              Hey! I'm <span className={styles.name}>Sai Vanamali</span>, a <span className={styles.highlight}>Data Scientist</span> and <span className={styles.highlight}>Full Stack Developer</span> with 
              a passion for creating intelligent solutions that blend AI and modern technology.
            </p>

            <p className={styles.paragraph}>
              Based in Melbourne, Australia, I'm currently pursuing my Master's in Data Science at Monash University. 
              When I'm not diving into data analysis or building AI applications, you'll find me exploring new technologies 
              and pushing the boundaries of what's possible with machine learning.
            </p>

            <p className={styles.paragraph}>
              I believe in the power of AI and technology to create meaningful impact, whether that's through 
              predictive modeling, intelligent web applications, or innovative data solutions. My goal is to 
              bridge the gap between complex data science and practical, user-friendly applications.
            </p>

            <div className={styles.skillsSection}>
              <h2 className={styles.subtitle}>Technical Arsenal</h2>
              <div className={styles.skillsGrid}>
                <div className={styles.skillCategory}>
                  <h3>Core</h3>
                  <p>Python • SQL • TypeScript • Go</p>
                </div>
                <div className={styles.skillCategory}>
                  <h3>AI & Data</h3>
                  <p>PyTorch • Scikit-learn • Pandas • GPT Integration</p>
                </div>
                <div className={styles.skillCategory}>
                  <h3>Web & Cloud</h3>
                  <p>FastAPI • React • AWS • Docker</p>
                </div>
                <div className={styles.skillCategory}>
                  <h3>Databases</h3>
                  <p>PostgreSQL • MongoDB • DynamoDB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 