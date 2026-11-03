import Image from 'next/image';
import CopyEmail, { MailtoLink } from '@/components/CopyEmail';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import { LensProvider } from '@/components/LensContext';
import Magnetic from '@/components/Magnetic';
import ProjectArt from '@/components/ProjectArt';
import Projects from '@/components/Projects';
import Stack from '@/components/Stack';
import { projects } from '@/data/projects';
import { about, CV_PATH, social } from '@/data/site';
import styles from '@/components/Sections.module.css';

export default function Home() {
  // Cover art is drawn here on the server and handed to the client grid.
  const art = Object.fromEntries(projects.map((p) => [p.slug, <ProjectArt key={p.slug} slug={p.slug} />]));

  return (
    <LensProvider>
      <Hero />
      <Experience />
      <Projects art={art} />
      <Stack />

      <section id="about" className={`container ${styles.section}`} aria-labelledby="about-title" tabIndex={-1}>
        <header className={styles.head}>
          <span className="label">About</span>
          <h2 id="about-title" className={styles.title}>
            The short version
          </h2>
        </header>
        <div className={styles.about}>
          <div className={styles.aboutCopy}>
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Image
            src="/portrait.jpg"
            alt="Vanamali Sims"
            width={800}
            height={600}
            sizes="(max-width: 760px) 100vw, 40vw"
            className={styles.photo}
          />
        </div>
      </section>

      <section id="contact" className={`container ${styles.contact}`} aria-labelledby="contact-title" tabIndex={-1}>
        <div className={styles.contactInner}>
          <span className="label">03 / Contact</span>
          <h2 id="contact-title" className={styles.bigTitle}>
            Let’s build
            <br />
            something<span className={styles.period}>.</span>
          </h2>
          <div className={styles.ctaRow}>
            <Magnetic>
              <MailtoLink className={styles.primary}>Get in touch →</MailtoLink>
            </Magnetic>
            <CopyEmail className={styles.secondary} showAddress />
            <a href={CV_PATH} download className={styles.textLink}>
              CV ↓
            </a>
            <a href={social.github} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
              GitHub ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
              LinkedIn ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </LensProvider>
  );
}
