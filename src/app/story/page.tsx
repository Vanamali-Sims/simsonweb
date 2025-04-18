'use client';

import styles from './page.module.css';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Story() {
  return (
    <main className={styles.page}>
      <AnimatedBackground />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Story</h1>
          <div className={styles.underline}></div>
        </div>
        
        <div className={styles.content}>
          <p className={styles.intro}>
            Hey! I'm Vanamali Sims, a Full Stack Developer and Music Producer
            with a passion for creating digital experiences that blend technology and
            creativity.
          </p>

          <p className={styles.paragraph}>
            Based in Belgium, I bring a unique perspective to everything I create. When
            I'm not crafting web experiences or writing code, you'll find me in my
            studio producing music or exploring new technologies.
          </p>

          <p className={styles.paragraph}>
            I believe in the power of technology to create meaningful experiences,
            whether that's through innovative web applications, immersive user
            interfaces, or the perfect blend of sound and code.
          </p>
        </div>
      </div>
    </main>
  );
} 