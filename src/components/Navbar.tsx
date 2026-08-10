'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LearningRateBar from './LearningRateBar';
import styles from './Navbar.module.css';

const links = [
  { name: 'Work', path: '/#work' },
  { name: 'Lore', path: '/#lore' },
  { name: 'Story', path: '/my-story' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.mark}>VS</span>
          <span className={styles.brandName}>Vanamali Sims</span>
        </Link>

        <nav className={styles.desktop} aria-label="Primary">
          {links.map((link) => {
            const active =
              link.path === '/my-story' || link.path === '/contact'
                ? pathname === link.path
                : false;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.link} ${active ? styles.active : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={styles.drawerLink}
            onClick={() => setOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <LearningRateBar />
    </header>
  );
}
