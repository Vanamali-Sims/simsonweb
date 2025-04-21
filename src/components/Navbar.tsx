'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Code2, Database } from 'lucide-react'
import Image from 'next/image'
import styles from './Navbar.module.css'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects-section');
    if (projectsSection) {
      const navHeight = 80; // Approximate navbar height
      const targetPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { name: 'home', path: '/' },
    ...(pathname === '/' ? [{ 
      name: 'projects', 
      path: '#projects',
      onClick: scrollToProjects
    }] : []),
    { name: 'my story', path: '/my-story' },
    { name: 'contact', path: '/contact' },
  ]

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link 
            href="/" 
            className={styles.logo}
          >
            <span className={styles.logoText}>
              <Code2 size={20} className={styles.logoIcon} />
              <Database size={20} className={styles.logoIcon} />
            </span>
            <div className={styles.underline}></div>
          </Link>

          <div className={styles.centerGif}>
            {!imageError ? (
              <Image
                src="https://gifdb.com/images/high/red-aesthetic-498-x-278-gif-gquy5q3jqxh8akdn.webp"
                alt="Aesthetic animation"
                width={300}
                height={60}
                className={styles.bannerGif}
                priority
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={styles.fallbackAnimation}>
                <span>W</span>
                <span>E</span>
                <span>L</span>
                <span>C</span>
                <span>O</span>
                <span>M</span>
                <span>E</span>
              </div>
            )}
          </div>
          
          <div className={styles.desktopMenu}>
            {navItems.map((item) => (
              item.onClick ? (
                <button
                  key={item.path}
                  onClick={item.onClick}
                  className={`${styles.navLink} ${
                    pathname === item.path ? styles.active : ''
                  }`}
                >
                  {item.name}
                  <div className={styles.linkUnderline}></div>
                </button>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${styles.navLink} ${
                    pathname === item.path ? styles.active : ''
                  }`}
                >
                  {item.name}
                  <div className={styles.linkUnderline}></div>
                </Link>
              )
            ))}
          </div>

          <button 
            className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={styles.hamburger}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.show : ''}`}>
          {navItems.map((item) => (
            item.onClick ? (
              <button
                key={item.path}
                onClick={() => {
                  item.onClick();
                  setIsMenuOpen(false);
                }}
                className={`${styles.mobileNavLink} ${
                  pathname === item.path ? styles.active : ''
                }`}
              >
                {item.name}
                <div className={styles.linkUnderline}></div>
              </button>
            ) : (
              <Link
                key={item.path}
                href={item.path}
                className={`${styles.mobileNavLink} ${
                  pathname === item.path ? styles.active : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
                <div className={styles.linkUnderline}></div>
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  )
} 