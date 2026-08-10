import Link from 'next/link';
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
          href="https://github.com/Vanamali-Sims"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/van-sims"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LinkedIn
        </a>
        <Link href="/contact" className={styles.link}>
          Contact
        </Link>
      </div>
    </footer>
  );
}
