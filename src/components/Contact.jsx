import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './Contact.module.css'

const FORMSPREE_URL = 'https://formspree.io/f/xjgalvoq'
const WHATSAPP_NUMBER = '923097427276'

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const openWhatsApp = () => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.overlay} />
      <div className={styles.wrap}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.info}>
            <p className="section-label">{t.contact.label}</p>
            <h2 className="section-title">{t.contact.title1}<br />{t.contact.title2}</h2>
            <p className={styles.sub}>{t.contact.sub}</p>

            <div className={styles.channels}>
              <button className={styles.wa} onClick={openWhatsApp}>
                <svg className={styles.waIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.12 1.533 5.845L0 24l6.334-1.51A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.23-1.5l-.374-.222-3.764.898.934-3.666-.245-.386A9.818 9.818 0 1112 21.818z"/>
                </svg>
                {t.contact.waBtn}
              </button>
              <div className={styles.divider}><span>{t.contact.orText}</span></div>
            </div>

            <div className={styles.facts}>
              {[
                { icon: '⏰', label: t.contact.fact1Label, value: t.contact.fact1Value },
                { icon: '📦', label: t.contact.fact2Label, value: t.contact.fact2Value },
                { icon: '🚚', label: t.contact.fact3Label, value: t.contact.fact3Value },
              ].map(f => (
                <div key={f.label} className={styles.fact}>
                  <span className={styles.factIcon}>{f.icon}</span>
                  <div>
                    <strong>{f.label}</strong>
                    <p>{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formWrap}>
            {status === 'sent' ? (
              <div className={styles.success}>
                <span>✅</span>
                <h3>{t.contact.successTitle}</h3>
                <p>{t.contact.successDesc}</p>
                <button onClick={() => setStatus('idle')}>{t.contact.successBtn}</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <h3 className={styles.formTitle}>{t.contact.formTitle}</h3>

                <div className={styles.row}>
                  <label className={styles.field}>
                    <span>{t.contact.nameLabel}</span>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder={t.contact.namePlaceholder} />
                  </label>
                  <label className={styles.field}>
                    <span>{t.contact.emailLabel}</span>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={t.contact.emailPlaceholder} />
                  </label>
                </div>

                <div className={styles.row}>
                  <label className={styles.field}>
                    <span>{t.contact.phoneLabel}</span>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t.contact.phonePlaceholder} />
                  </label>
                  <label className={styles.field}>
                    <span>{t.contact.typeLabel}</span>
                    <select name="type" value={form.type} onChange={handleChange}>
                      <option value="">{t.contact.typePlaceholder}</option>
                      {t.contact.inquiryTypes.map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className={`${styles.field} ${styles.full}`}>
                  <span>{t.contact.msgLabel}</span>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={t.contact.msgPlaceholder} />
                </label>

                {status === 'error' && (
                  <p className={styles.errMsg}>{t.contact.errorMsg}</p>
                )}

                <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                  {status === 'sending' ? t.contact.submitBusy : t.contact.submitIdle}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
