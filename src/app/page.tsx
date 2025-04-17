'use client';

import { useRef, useState } from 'react';
import styles from './page.module.css';
import { ArrowRight } from 'lucide-react';
import ScrollIndicator from '@/components/ScrollIndicator';
import MouseIcon from '@/components/MouseIcon';

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

function AnimatedName({ text }: { text: string }) {
  return (
    <h1 className={styles.name}>
      {text.split('').map((char, i) => {
        let className = '';
        if (char.toLowerCase() === 'v') className = styles.highlight1;
        if (char.toLowerCase() === 's') className = styles.highlight2;
        return (
          <span
            key={i}
            className={className}
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToNextSection = () => {
    if (currentSection < sections.current.length - 1) {
      const nextSection = sections.current[currentSection + 1];
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
        setCurrentSection(prev => prev + 1);
      }
    }
  };

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sections.current[index] = el;
  };

  return (
    <main className={styles.page}>
      <div className={styles.background}>
        <div className={styles.noise} />
        <div className={styles.grid} />
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
        <div className={styles.cornerDecorations}>
          <div className={styles.topLeft}>
            {[...Array(3)].map((_, i) => (
              <div key={`tl-${i}`} className={styles.line} style={{ transform: `rotate(${45 + i * 15}deg)` }} />
            ))}
          </div>
          <div className={styles.topRight}>
            {[...Array(3)].map((_, i) => (
              <div key={`tr-${i}`} className={styles.line} style={{ transform: `rotate(${-45 - i * 15}deg)` }} />
            ))}
          </div>
          <div className={styles.bottomLeft}>
            {[...Array(3)].map((_, i) => (
              <div key={`bl-${i}`} className={styles.line} style={{ transform: `rotate(${-45 + i * 15}deg)` }} />
            ))}
          </div>
          <div className={styles.bottomRight}>
            {[...Array(3)].map((_, i) => (
              <div key={`br-${i}`} className={styles.line} style={{ transform: `rotate(${45 - i * 15}deg)` }} />
            ))}
          </div>
        </div>
      </div>

      <section ref={setSectionRef(0)} className={styles.section}>
        <div className={styles.introBlock}>
          <div className={styles.greeting}>
            Hello <span className={styles.bulb}>💡</span>
          </div>
          <AnimatedName text="Vanamali Sims here." />
          <p className={styles.role}>Full Stack Developer & Music Producer</p>
          <p className={styles.tagline}>Crafting digital experiences through code and sound</p>
        </div>
        <MouseIcon onClick={scrollToNextSection} />
      </section>

      <section ref={setSectionRef(1)} className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <span>→</span> Currently Exploring
          </h2>
          <div className={styles.nowBlock}>
            <div className={styles.nowItem}>
              <span>Building immersive web experiences</span>
            </div>
            <div className={styles.nowItem}>
              <span>Producing electronic music</span>
            </div>
            <div className={styles.nowItem}>
              <span>Learning about AI and machine learning</span>
            </div>
          </div>
        </div>
        <MouseIcon onClick={scrollToNextSection} />
      </section>

      <section ref={setSectionRef(2)} className={styles.section}>
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
        <MouseIcon onClick={scrollToNextSection} />
      </section>

      <section ref={setSectionRef(3)} className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <span>→</span> Latest Music
          </h2>
          <div className={styles.musicShelf}>
            <div className={styles.musicPlayer}>
              [Music Player Embed]
            </div>
            <p className={styles.musicCaption}>
              Latest release: "Track Name" - Released on [Date]
            </p>
          </div>
        </div>
        <MouseIcon onClick={scrollToNextSection} />
      </section>

      <section ref={setSectionRef(4)} className={styles.section}>
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
