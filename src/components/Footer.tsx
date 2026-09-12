import Link from 'next/link';
import { social } from '@/data/site';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.block} ${styles.meta}`}>
        <p className={styles.sign}>VS / {new Date().getFullYear()}</p>
        <p className={styles.copy}>Melbourne · Built like a building.</p>
      </div>

      <div className={`${styles.block} ${styles.links}`}>
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LinkedIn
        </a>
        <Link href="/#contact" className={styles.link}>
          Contact
        </Link>
      </div>
    </footer>
  );
}
