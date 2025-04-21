'use client'

import styles from './page.module.css';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <main className={styles.page}>
      <AnimatedBackground showCornerDecorations={false} />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Contact Me</h1>
          <div className={styles.underline}></div>
          
          <section className={styles.section}>
            <p className={styles.text}>
              Based in Melbourne, Australia, I'm always open to new opportunities and collaborations.
              Whether you have a project in mind, want to discuss AI and technology, or just want to say hi,
              I'd love to hear from you!
            </p>
          </section>

          <div className={styles.contactInfo}>
            <div className={styles.contact}>
              <span className={styles.contactLabel}>Email:</span>
              <a href="mailto:saivanamalisimhambhatla@gmail.com" className={styles.contactLink}>
                saivanamalisimhambhatla@gmail.com <span className={styles.arrow}>→</span>
              </a>
            </div>
            <div className={styles.contact}>
              <span className={styles.contactLabel}>Phone:</span>
              <span>+61 0489 196 006</span>
            </div>
            <div className={styles.contact}>
              <span className={styles.contactLabel}>Location:</span>
              <span>Melbourne, Australia</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 