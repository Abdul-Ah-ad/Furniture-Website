import { useState, useEffect, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { supabase } from '../supabaseClient'
import FurnitureCard from './FurnitureCard'
import styles from './Gallery.module.css'

export default function Gallery() {
  const { t } = useLanguage()
  const [active, setActive]     = useState('all')
  const [furniture, setFurniture] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    async function fetchFurniture() {
      setLoading(true)
      const { data, error } = await supabase
        .from('furniture')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        console.error('Supabase fetch error:', error)
        setError(error.message)
      } else {
        // Normalise field names: Supabase uses image_url; FurnitureCard expects image
        setFurniture(
          (data || []).map(item => ({
            ...item,
            image: item.image_url || item.image || '',
            material: item.material || '',
            description: item.description || '',
            featured: item.featured ?? false,
            category: item.category || 'living',
          }))
        )
      }
      setLoading(false)
    }
    fetchFurniture()
  }, [])

  const categoryIds = ['all', 'living', 'bedroom', 'dining', 'office', 'outdoor']

  const categories = categoryIds.map(id => ({
    id,
    label: t.gallery.categories[id],
  }))

  const filtered = useMemo(() =>
    active === 'all' ? furniture : furniture.filter(f => f.category === active),
    [active, furniture]
  )

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <p className="section-label">{t.gallery.label}</p>
          <h2 className="section-title">{t.gallery.title}</h2>
          <p className="section-sub">{t.gallery.sub}</p>
        </div>

        {error && (
          <p style={{ textAlign: 'center', color: '#c0392b', padding: '2rem 0' }}>
            Could not load products — {error}
          </p>
        )}

        {!error && (
          <>
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

            {loading ? (
              <p style={{ textAlign: 'center', padding: '3rem 0', opacity: 0.6 }}>
                Loading collection…
              </p>
            ) : (
              <div className={styles.grid}>
                {filtered.map((item, i) => (
                  <FurnitureCard key={item.id} item={item} index={i} />
                ))}
              </div>
            )}
          </>
        )}

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
