import styles from './page.module.css';
import { ArrowRight, Lightbulb } from 'lucide-react';
import ScrollIndicator from '@/components/ScrollIndicator';

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
      </div>

      <section className={styles.section}>
        <div className={styles.introBlock}>
          <div className={styles.greeting}>
            Hello <span className={styles.bulb}><Lightbulb size={16} /></span>
          </div>
          <h1 className={styles.name}>
            Vanamali Sims <span className={styles.here}>here.</span>
          </h1>
          <p className={styles.role}>Full Stack Developer & Music Producer</p>
          <p className={styles.tagline}>Crafting digital experiences through code and sound</p>
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
              <span>Building immersive web experiences</span>
            </div>
            <div className={styles.nowItem}>
              <ArrowRight size={16} />
              <span>Producing electronic music</span>
            </div>
            <div className={styles.nowItem}>
              <ArrowRight size={16} />
              <span>Learning about AI and machine learning</span>
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
            <h3 className={styles.projectTitle}>Project One</h3>
            <p className={styles.projectDescription}>
              A brief description of the project and its impact.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>React</span>
              <span className={styles.projectTag}>TypeScript</span>
              <span className={styles.projectTag}>Node.js</span>
            </div>
          </div>
          <div className={styles.projectCard}>
            <h3 className={styles.projectTitle}>Project Two</h3>
            <p className={styles.projectDescription}>
              Another exciting project showcasing different skills.
            </p>
            <div className={styles.projectTags}>
              <span className={styles.projectTag}>Next.js</span>
              <span className={styles.projectTag}>Tailwind</span>
              <span className={styles.projectTag}>MongoDB</span>
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
            <iframe
              className={styles.musicPlayer}
              src="YOUR_SPOTIFY_OR_SOUNDCLOUD_EMBED_URL"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
            <p className={styles.musicCaption}>
              Latest release: "Your Track Name" - Released on April 2024
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <p className={styles.manifesto}>
            "In the intersection of technology and creativity, we find the space
            where innovation meets expression. Every line of code, every note of
            music, is a step towards building something meaningful."
          </p>
        </div>
      </section>
    </main>
  );
}
