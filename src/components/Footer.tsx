import Link from 'next/link';
import { social } from '@/data/site';
import VisuallyHidden from './VisuallyHidden';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.block} ${styles.meta}`}>
        <p className={styles.sign} aria-hidden="true">
          VS / {new Date().getFullYear()}
        </p>
        <p className={styles.copy}>Melbourne · Built like a building.</p>
      </div>

      <nav className={`${styles.block} ${styles.links}`} aria-label="Footer">
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
          <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
        </a>
        <a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LinkedIn
          <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
        </a>
        <Link href="/#contact" className={styles.link}>
          Contact
        </Link>
      </nav>
    </footer>
  );
}
