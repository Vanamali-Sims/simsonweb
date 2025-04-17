'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Code2, Database } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'home', path: '/' },
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
          
          <div className={styles.desktopMenu}>
            {navItems.map((item) => (
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
          ))}
        </div>
      </div>
    </nav>
  )
} 