'use client';

import styles from '../app/page.module.css';

export default function ProjectsSection() {
  const openProject = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="projects-section" className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>
          <span>→</span> Featured Projects
        </h2>
        <div className={styles.projectsGrid}>
          <div className={styles.projectCard} onClick={() => openProject('https://github.com/Vanamali-Sims/Mira')}>
            <h3 className={styles.projectTitle}>Mira - AI Mental Wellness</h3>
            <p className={styles.projectDescription}>
              A FastAPI backend with GPT-2 integration for personalized wellness tasks and journal responses.
              Built with React frontend for real-time interaction.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>FastAPI</span>
              <span className={styles.projectTag}>React</span>
              <span className={styles.projectTag}>GPT-2</span>
              <span className={styles.projectTag}>PostgreSQL</span>
            </div>
          </div>

          <div className={styles.projectCard} onClick={() => openProject('https://github.com/Vanamali-Sims/excuseMe')}>
            <h3 className={styles.projectTitle}>excuseMe.ai</h3>
            <p className={styles.projectDescription}>
              AI-powered apology generator that crafts witty, heartfelt, or dramatic apologies based on your situation.
              Built with GPT-2 and Streamlit.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>Python</span>
              <span className={styles.projectTag}>GPT-2</span>
              <span className={styles.projectTag}>Streamlit</span>
            </div>
          </div>

          <div className={styles.projectCard} onClick={() => openProject('https://github.com/Vanamali-Sims/m-a-b-chimp')}>
            <h3 className={styles.projectTitle}>Human vs Chimp Brain Analysis</h3>
            <p className={styles.projectDescription}>
              Comparative gene expression analysis between human and chimpanzee brains using RNA-Seq data from GSE50782.
              Includes quality control, normalization, and differential expression analysis.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>Python</span>
              <span className={styles.projectTag}>Jupyter</span>
              <span className={styles.projectTag}>Bioinformatics</span>
            </div>
          </div>

          <div className={styles.projectCard} onClick={() => openProject('https://github.com/Vanamali-Sims/Customer-Churn-Analysis')}>
            <h3 className={styles.projectTitle}>Customer Churn Analysis</h3>
            <p className={styles.projectDescription}>
              Predictive analytics project for customer churn prediction using machine learning models and data visualization.
              Features comprehensive EDA and model evaluation.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>Python</span>
              <span className={styles.projectTag}>ML</span>
              <span className={styles.projectTag}>Analytics</span>
            </div>
          </div>

          <div className={styles.projectCard} onClick={() => openProject('https://github.com/Vanamali-Sims/excuseMe')}>
            <h3 className={styles.projectTitle}>excuseMe.ai</h3>
            <p className={styles.projectDescription}>
              🎭 AI-powered apology generator that crafts witty, heartfelt, or dramatic apologies for any situation.
              Type your blunder, get an AI-crafted apology, and send it like a pro!
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>Python</span>
              <span className={styles.projectTag}>GPT-2</span>
              <span className={styles.projectTag}>Streamlit</span>
            </div>
          </div>

          <div className={styles.projectCard} onClick={() => openProject('https://github.com/Vanamali-Sims/Disaster-predictor-models')}>
            <h3 className={styles.projectTitle}>Disaster Prediction Models</h3>
            <p className={styles.projectDescription}>
              Advanced ML models for predicting natural disasters including earthquakes and forest fires.
              Features real-time data integration and predictive analytics.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>Python</span>
              <span className={styles.projectTag}>ML</span>
              <span className={styles.projectTag}>Jupyter</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 