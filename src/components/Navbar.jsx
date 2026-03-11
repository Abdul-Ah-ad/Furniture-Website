import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './Navbar.module.css'

export default function Navbar({ theme, onThemeChange }) {
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { href: '#home',    label: t.nav.home },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#about',   label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ]

  const themes = [
    { id: 'cream', color: '#C8A97A', label: 'Warm Cream' },
    // { id: 'black', color: '#1A1A1A', label: 'Midnight Black' },
    { id: 'white', color: '#E8E8E8', label: 'Pure White' },
  ]

  const toggleLang = () => setLang(l => l === 'en' ? 'ur' : 'en')

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#home" className={styles.logo} onClick={e => handleLink(e, '#home')}>
          <span className={styles.logoIcon}>🪵</span>
          <span>
            <strong>Shafiq</strong>
            <em> &amp; Sons</em>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={e => handleLink(e, link.href)}
            >
              {link.label}
            </a>
          ))}

          {/* Theme switcher */}
          <div className={styles.themes} role="group" aria-label="Color theme">
            {themes.map(th => (
              <button
                key={th.id}
                onClick={() => onThemeChange(th.id)}
                className={`${styles.themeDot} ${theme === th.id ? styles.themeDotActive : ''}`}
                style={{ background: th.color }}
                title={th.label}
                aria-label={`Switch to ${th.label} theme`}
              />
            ))}
          </div>

          {/* Language toggle */}
          <button
            className={styles.langToggle}
            onClick={toggleLang}
            title="Switch language"
          >
            <span className={lang === 'en' ? styles.langActive : ''}>EN</span>
            <span className={styles.langSep}>|</span>
            <span className={lang === 'ur' ? styles.langActive : ''}>اردو</span>
          </button>

          <a
            href="#contact"
            className={styles.cta}
            onClick={e => handleLink(e, '#contact')}
          >
            {t.nav.cta}
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobile} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={e => handleLink(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className={styles.mobileCta}
          onClick={e => handleLink(e, '#contact')}
        >
          {t.nav.cta}
        </a>

        {/* Mobile language toggle */}
        <button
          className={`${styles.langToggle} ${styles.mobileLangToggle}`}
          onClick={toggleLang}
        >
          <span className={lang === 'en' ? styles.langActive : ''}>EN</span>
          <span className={styles.langSep}>|</span>
          <span className={lang === 'ur' ? styles.langActive : ''}>اردو</span>
        </button>

        {/* Mobile theme switcher */}
        <div className={styles.mobileThemes}>
          {themes.map(th => (
            <button
              key={th.id}
              onClick={() => { onThemeChange(th.id); setMenuOpen(false) }}
              className={`${styles.themeDot} ${theme === th.id ? styles.themeDotActive : ''}`}
              style={{ background: th.color }}
              title={th.label}
              aria-label={`Switch to ${th.label} theme`}
            />
          ))}
        </div>
      </div>
    </header>
  )
}
