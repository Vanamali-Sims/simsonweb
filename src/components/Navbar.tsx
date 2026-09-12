'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
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
  const menuId = useId();

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

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (path: string) => {
    if (path === '/about') return pathname === '/about';
    if (path === '/#work') return pathname === '/' || pathname.startsWith('/work/');
    return false;
  };

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.brand}
          onClick={() => setOpen(false)}
        >
          <span className={styles.mark} aria-hidden="true">
            VS
          </span>
          <span className={styles.brandName}>Vanamali Sims</span>
        </Link>

        <nav className={styles.desktop} aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.link} ${isActive(link.path) ? styles.active : ''}`}
              aria-current={isActive(link.path) ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
          <a href={CV_PATH} download className={styles.cv}>
            Download CV
          </a>
        </nav>

        {mobile !== false && (
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={menuId}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        )}
      </div>

      {mobile !== false && (
        <div
          id={menuId}
          className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
          hidden={!open}
        >
          <nav aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={styles.drawerLink}
                aria-current={isActive(link.path) ? 'page' : undefined}
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
          </nav>
        </div>
      )}
    </header>
  );
}
