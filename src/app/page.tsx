import styles from './page.module.css';
import { ArrowRight, Lightbulb } from 'lucide-react';
import ScrollIndicator from '@/components/ScrollIndicator';
import GlobalMusicPlayer from '@/components/GlobalMusicPlayer';

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

function FloatingText() {
  const words = [
    'code', 'data', 'AI', '01', 'ML', 
    'python', 'react', '42', 'neural', 
    '∞', '{ }', '[]', '<>', '&&', '||',
    'async', 'await', '404', '200', 'OK'
  ];

  return (
    <div className={styles.floatingTextContainer}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={styles.floatingWord}
          style={{
            '--delay': `${i * 0.5}rad`,
            '--duration': `${20 + Math.random() * 10}s`,
            '--offset': `${Math.random() * 360}deg`,
          } as React.CSSProperties}
        >
          {words[Math.floor(Math.random() * words.length)]}
        </div>
      ))}
    </div>
  );
}

function WavingWatermark() {
  return (
    <div className={styles.watermarkContainer}>
      <div className={styles.watermark}>
        {'SIMS'.split('').map((letter, i) => (
          <span 
            key={i} 
            style={{ '--delay': `${i * 0.2}s` } as React.CSSProperties}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.background}>
        <div className={styles.noise} />
        <div className={styles.grid} />
        <WavingWatermark />
        <FloatingText />
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
      </div>

      <section className={styles.section}>
        <div className={styles.introBlock}>
          <div className={styles.greeting}>
            Hello <span className={styles.bulb}><Lightbulb size={16} /></span>
          </div>
          <h1 className={styles.name}>
            Sai Vanamali <span className={styles.here}>here.</span>
          </h1>
          <p className={styles.role}>Data Scientist & Full Stack Developer</p>
          <p className={styles.tagline}>Crafting AI-powered solutions and digital experiences</p>
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
              <span>Machine Learning & Data Analysis</span>
            </div>
            <div className={styles.nowItem}>
              <ArrowRight size={16} />
              <span>Full Stack Development with FastAPI & React</span>
            </div>
            <div className={styles.nowItem}>
              <ArrowRight size={16} />
              <span>AI-Powered Applications</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <span>→</span> Featured Projects
          </h2>
          <div className={styles.projectCard}>
            <h3 className={styles.projectTitle}>Mira - AI Mental Wellness Platform</h3>
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
          <div className={styles.projectCard}>
            <h3 className={styles.projectTitle}>Disaster Prediction Portal</h3>
            <p className={styles.projectDescription}>
              AI-based system for predicting natural disasters with 88% accuracy, featuring live disaster data APIs.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>Python</span>
              <span className={styles.projectTag}>Machine Learning</span>
              <span className={styles.projectTag}>API Development</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <span>→</span> Latest Music
          </h2>
          <div className={styles.musicShelf}>
            <GlobalMusicPlayer showCornerDecorations={true} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <p className={styles.manifesto}>
            "At the intersection of data science and development, I create intelligent solutions that make a meaningful impact. Every line of code is a step towards building smarter, more empathetic technology."
          </p>
        </div>
      </section>
    </main>
  );
}
