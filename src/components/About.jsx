import { useLanguage } from '../context/LanguageContext'
import styles from './About.module.css'

const VALUE_ICONS = ['🇵🇰', '🔨', '🎨', '♾️']

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className={styles.section}>
      <div className={styles.overlay} />
      <div className={styles.wrap}>
      <div className="container">
        <div className={styles.grid}>
          {/* Image collage */}
          <div className={styles.images}>
            <div className={styles.imgBig}>
              <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700&q=80" alt="Craftsman at work" loading="lazy" />
            </div>
            <div className={styles.imgSmall}>
              <img src="https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?w=400&q=80" alt="Wood grain detail" loading="lazy" />
            </div>
            <div className={`${styles.imgSmall} ${styles.imgSmall2}`}>
              <img src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&q=80" alt="Workshop tools" loading="lazy" />
            </div>
            <div className={styles.badge}>Est. 1980</div>
          </div>

          {/* Text */}
          <div className={styles.text}>
            <p className="section-label">{t.about.label}</p>
            <h2 className="section-title">{t.about.title1}<br />{t.about.title2}</h2>
            <p className={styles.lead}>{t.about.lead}</p>
            <p className={styles.body}>{t.about.body}</p>

            <div className={styles.values}>
              {t.about.values.map((v, i) => (
                <div key={i} className={styles.value}>
                  <span className={styles.valueIcon}>{VALUE_ICONS[i]}</span>
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
