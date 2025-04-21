'use client';

import styles from './page.module.css';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Story() {
  return (
    <main className={styles.page}>
      <AnimatedBackground showCornerDecorations={false} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Story</h1>
          <div className={styles.underline}></div>
        </div>
        
        <div className={styles.content}>
          <p className={styles.intro}>
            Hey! I'm Sai Vanamali, a Data Scientist and Full Stack Developer currently pursuing my Master's in Data Science
            at Monash University, Melbourne. I blend the worlds of AI and web development to create intelligent, user-centric solutions.
          </p>

          <p className={styles.paragraph}>
            With a background in Technology from JNTU Kakinada and certifications in AWS Machine Learning and Cloud Foundations,
            I specialize in building AI-powered applications that make a real impact. My toolkit includes Python, FastAPI, React,
            and various machine learning frameworks, allowing me to tackle complex challenges from both data science and development perspectives.
          </p>

          <p className={styles.paragraph}>
            Currently, I'm working as a Python Developer, building sophisticated analytics dashboards with GPT-4 integration
            and developing data pipelines for real-time insights. My recent projects include an AI-powered mental wellness platform
            and a disaster prediction system with 88% accuracy.
          </p>

          <p className={styles.paragraph}>
            I'm passionate about using technology to create meaningful solutions, whether that's through predictive modeling,
            machine learning applications, or full-stack development. My goal is to continue pushing the boundaries of what's
            possible at the intersection of AI and web technology.
          </p>

          <div className={styles.skillsSection}>
            <h2 className={styles.subtitle}>Technical Skills</h2>
            <div className={styles.skillsGrid}>
              <div className={styles.skillCategory}>
                <h3>Languages</h3>
                <p>Python, SQL, Go, TypeScript, JavaScript, C++</p>
              </div>
              <div className={styles.skillCategory}>
                <h3>Frameworks & Libraries</h3>
                <p>FastAPI, Scikit-learn, PyTorch, Transformers, Pandas, React, Node.js</p>
              </div>
              <div className={styles.skillCategory}>
                <h3>Tools & Technologies</h3>
                <p>Git, Docker, AWS SAM, VS Code, Kaggle, Flutter</p>
              </div>
              <div className={styles.skillCategory}>
                <h3>Databases</h3>
                <p>PostgreSQL, MongoDB, SQLite, DynamoDB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 