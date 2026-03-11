import { useState, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { furniture } from '../data/furniture'
import FurnitureCard from './FurnitureCard'
import styles from './Gallery.module.css'

export default function Gallery() {
  const { t } = useLanguage()
  const [active, setActive] = useState('all')

  const categoryIds = ['all', 'living', 'bedroom', 'dining', 'office', 'outdoor']

  const categories = categoryIds.map(id => ({
    id,
    label: t.gallery.categories[id],
  }))

  const filtered = useMemo(() =>
    active === 'all' ? furniture : furniture.filter(f => f.category === active),
    [active]
  )

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <p className="section-label">{t.gallery.label}</p>
          <h2 className="section-title">{t.gallery.title}</h2>
          <p className="section-sub">{t.gallery.sub}</p>
        </div>

        <div className={styles.filters} role="tablist" aria-label="Furniture categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              className={`${styles.pill} ${active === cat.id ? styles.pillActive : ''}`}
              onClick={() => setActive(cat.id)}
            >
              {cat.label}
              <span className={styles.count}>
                {cat.id === 'all'
                  ? furniture.length
                  : furniture.filter(f => f.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((item, i) => (
            <FurnitureCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <div className={styles.banner}>
          <div>
            <h3>{t.gallery.bannerTitle}</h3>
            <p>{t.gallery.bannerDesc}</p>
          </div>
          <button
            className={styles.bannerBtn}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.gallery.bannerBtn}
          </button>
        </div>
      </div>
    </section>
  )
}
