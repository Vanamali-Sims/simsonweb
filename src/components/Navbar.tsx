import Link from 'next/link';
import { CV_PATH } from '@/data/site';
import styles from './Navbar.module.css';

const links = [
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/#projects' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

/**
 * Top bar. Plain links on desktop; on phones the section links collapse
 * and only Contact + CV stay visible so the bar never wraps.
 */
export default function Navbar() {
  return (
    <header className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Vanamali Sims, home">
          ~/vanamali<span className={styles.caret} aria-hidden="true">_</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.name}
            </Link>
          ))}
          <a href={CV_PATH} download className={styles.cv}>
            CV ↓
          </a>
        </nav>
      </div>
    </header>
  );
}
