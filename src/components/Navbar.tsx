'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CV_PATH } from '@/data/site';
import styles from './Navbar.module.css';

const links = [
  { name: 'Work', path: '/#work' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => {
      setMobile(mq.matches);
      if (!mq.matches) setOpen(false);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

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
              link.path === '/about'
                ? pathname === '/about'
                : link.path === '/#work'
                  ? pathname === '/' || pathname.startsWith('/work/')
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
          <a href={CV_PATH} download className={styles.cv}>
            Download CV
          </a>
        </nav>

        {mobile !== false && (
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        )}
      </div>

      {mobile !== false && (
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
        <a
          href={CV_PATH}
          download
          className={styles.drawerCv}
          onClick={() => setOpen(false)}
        >
          Download CV
        </a>
      </div>
      )}
    </header>
  );
}
