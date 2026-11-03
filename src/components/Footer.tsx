import { social } from '@/data/site';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={`container ${styles.footer}`}>
      <p>© {new Date().getFullYear()} Vanamali Sims · Melbourne</p>
      <nav aria-label="Footer" className={styles.links}>
        <a href={social.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </nav>
      <p>Built by hand · no trackers</p>
    </footer>
  );
}
