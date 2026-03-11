import { useLanguage } from '../context/LanguageContext'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useLanguage()
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <p className="section-label fade-up">{t.hero.label}</p>
        <h1 className={`${styles.title} fade-up fade-up-delay-1`}>
          {t.hero.title1} <br />
          <em>{t.hero.title2}</em>
        </h1>
        <p className={`${styles.sub} fade-up fade-up-delay-2`}>
          {t.hero.sub}
        </p>
        <div className={`${styles.actions} fade-up fade-up-delay-3`}>
          <button className={styles.btnPrimary} onClick={() => scrollTo('#gallery')}>
            {t.hero.btn1}
          </button>
          <button className={styles.btnSecondary} onClick={() => scrollTo('#contact')}>
            {t.hero.btn2}
          </button>
        </div>

        <div className={`${styles.stats} fade-up`} style={{ animationDelay: '0.6s' }}>
          {[
            { value: '40+',  label: t.hero.stat1 },
            { value: '500+', label: t.hero.stat2 },
            { value: '100%', label: t.hero.stat3 },
          ].map(s => (
            <div key={s.label} className={styles.stat}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scroll} onClick={() => scrollTo('#gallery')}>
        <span />
      </div>
    </section>
  )
}
