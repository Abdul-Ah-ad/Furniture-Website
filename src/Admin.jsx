import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabaseClient'

const ADMIN_PASSWORD = 'shafiq2024'   // change this to whatever you like

const CATEGORIES = ['living', 'bedroom', 'dining', 'office', 'outdoor']

const BLANK = {
  name: '',
  category: 'living',
  material: '',
  description: '',
  featured: false,
  file: null,
}

// ─── tiny toast ────────────────────────────────────────────────────────────────
function Toast({ msg, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999,
      background: type === 'error' ? '#c0392b' : '#27ae60',
      color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '8px',
      boxShadow: '0 4px 14px rgba(0,0,0,.25)', fontFamily: 'sans-serif',
      fontSize: '0.9rem', maxWidth: '320px',
    }}>
      {msg}
    </div>
  )
}

// ─── password gate ─────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const submit = e => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { onUnlock() }
    else { setErr(true); setPw('') }
  }
  return (
    <div style={gateWrap}>
      <div style={gateBox}>
        <h2 style={{ margin: '0 0 0.5rem', fontFamily: 'serif', fontSize: '1.6rem' }}>🔒 Admin Panel</h2>
        <p style={{ margin: '0 0 1.5rem', color: '#666', fontSize: '0.85rem' }}>Shafiq and Sons — private area</p>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input
            type="password" placeholder="Password" value={pw}
            onChange={e => { setPw(e.target.value); setErr(false) }}
            style={{ ...inputStyle, border: err ? '1.5px solid #c0392b' : '1.5px solid #ddd' }}
            autoFocus
          />
          {err && <p style={{ color: '#c0392b', margin: 0, fontSize: '0.82rem' }}>Wrong password</p>}
          <button type="submit" style={btnPrimary}>Enter</button>
        </form>
      </div>
    </div>
  )
}

// ─── main admin ────────────────────────────────────────────────────────────────
export default function Admin() {
  const [unlocked, setUnlocked] = useState(false)
  const [form, setForm]         = useState(BLANK)
  const [preview, setPreview]   = useState(null)
  const [items, setItems]       = useState([])
  const [loading, setLoading]   = useState(false)
  const [toast, setToast]       = useState(null)
  const fileRef = useRef()

  useEffect(() => { if (unlocked) loadItems() }, [unlocked])

  const notify = (msg, type = 'ok') => setToast({ msg, type })

  async function loadItems() {
    const { data, error } = await supabase
      .from('furniture')
      .select('*')
      .order('id', { ascending: false })
    if (error) notify('Could not load items: ' + error.message, 'error')
    else setItems(data || [])
  }

  function handleField(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setForm(f => ({ ...f, file }))
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim())     return notify('Name is required', 'error')
    if (!form.material.trim()) return notify('Material is required', 'error')
    if (!form.file)            return notify('Please select an image', 'error')

    setLoading(true)
    try {
      // 1. Upload image to Supabase Storage
      const ext      = form.file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadErr } = await supabase.storage
        .from('furniture-photos')
        .upload(fileName, form.file, { upsert: false })
      if (uploadErr) throw new Error('Image upload failed: ' + uploadErr.message)

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from('furniture-photos')
        .getPublicUrl(fileName)

      // 3. Insert row into furniture table
      const { error: insertErr } = await supabase.from('furniture').insert([{
        name:        form.name.trim(),
        category:    form.category,
        material:    form.material.trim(),
        description: form.description.trim(),
        featured:    form.featured,
        img_url:     urlData.publicUrl,
      }])
      if (insertErr) throw new Error('DB insert failed: ' + insertErr.message)

      notify(`"${form.name}" added successfully!`)
      setForm(BLANK)
      setPreview(null)
      if (fileRef.current) fileRef.current.value = ''
      loadItems()
    } catch (err) {
      notify(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete "${item.name}"? This cannot be undone.`)) return

    // Extract filename from the public URL to delete from storage
    try {
      const urlParts = item.img_url?.split('/furniture-photos/')
      if (urlParts?.length === 2) {
        await supabase.storage.from('furniture-photos').remove([urlParts[1]])
      }
    } catch (_) { /* storage delete best-effort */ }

    const { error } = await supabase.from('furniture').delete().eq('id', item.id)
    if (error) notify('Delete failed: ' + error.message, 'error')
    else { notify(`"${item.name}" deleted`); loadItems() }
  }

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />

  return (
    <div style={pageWrap}>
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}

      <header style={header}>
        <h1 style={{ margin: 0, fontFamily: 'serif', fontWeight: 700, fontSize: '1.5rem' }}>
          🪑 Shafiq & Sons — Admin
        </h1>
        <a href="/" style={{ fontSize: '0.85rem', color: '#8B6914', textDecoration: 'none' }}>
          ← Back to website
        </a>
      </header>

      <div style={layout}>
        {/* ── Add Furniture Form ── */}
        <section style={card}>
          <h2 style={sectionTitle}>Add New Furniture</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>

            <label style={labelStyle}>
              Name *
              <input name="name" value={form.name} onChange={handleField} placeholder="e.g. Heritage Oak Sofa" style={inputStyle} />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <label style={labelStyle}>
                Category *
                <select name="category" value={form.category} onChange={handleField} style={inputStyle}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </label>
              <label style={labelStyle}>
                Material *
                <input name="material" value={form.material} onChange={handleField} placeholder="e.g. Solid Oak Wood" style={inputStyle} />
              </label>
            </div>

            <label style={labelStyle}>
              Description
              <textarea name="description" value={form.description} onChange={handleField}
                placeholder="Short description of the piece…"
                rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </label>

            <label style={{ ...labelStyle, flexDirection: 'row', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleField} />
              Mark as Featured (shows badge on card)
            </label>

            <label style={labelStyle}>
              Photo *
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile}
                style={{ ...inputStyle, padding: '0.4rem' }} />
            </label>

            {preview && (
              <img src={preview} alt="preview"
                style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} />
            )}

            <button type="submit" disabled={loading} style={{ ...btnPrimary, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Uploading…' : '+ Add Furniture'}
            </button>
          </form>
        </section>

        {/* ── Existing Items ── */}
        <section style={card}>
          <h2 style={sectionTitle}>Existing Items ({items.length})</h2>
          {items.length === 0 ? (
            <p style={{ color: '#999', fontSize: '0.9rem' }}>No items yet — add one on the left.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '75vh', overflowY: 'auto' }}>
              {items.map(item => (
                <div key={item.id} style={itemRow}>
                  <img src={item.img_url} alt={item.name}
                    style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#888' }}>
                      {item.category} · {item.material} {item.featured ? '· ⭐ Featured' : ''}
                    </p>
                  </div>
                  <button onClick={() => handleDelete(item)} style={btnDanger} title="Delete">
                    🗑
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

// ─── styles ────────────────────────────────────────────────────────────────────
const pageWrap   = { minHeight: '100vh', background: '#fafaf8', fontFamily: '"Lato", sans-serif' }
const header     = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#fff', borderBottom: '1px solid #e8e0d0', position: 'sticky', top: 0, zIndex: 100 }
const layout     = { display: 'grid', gridTemplateColumns: 'minmax(340px,1fr) minmax(300px,1fr)', gap: '1.5rem', padding: '2rem', maxWidth: '1100px', margin: '0 auto' }
const card       = { background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,.07)', border: '1px solid #ede8de' }
const sectionTitle = { margin: '0 0 1.2rem', fontFamily: 'serif', fontSize: '1.2rem', fontWeight: 700, color: '#3d2b1f' }
const labelStyle = { display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 600, color: '#555' }
const inputStyle = { padding: '0.55rem 0.75rem', border: '1.5px solid #e0d8cc', borderRadius: '7px', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', background: '#fdfbf8', width: '100%', boxSizing: 'border-box' }
const btnPrimary = { padding: '0.7rem 1.2rem', background: '#8B6914', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }
const btnDanger  = { padding: '0.35rem 0.6rem', background: 'transparent', border: '1px solid #e8d8d8', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', flexShrink: 0 }
const itemRow    = { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem', border: '1px solid #f0ebe0', borderRadius: '8px', background: '#fdfbf8' }
const gateWrap   = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafaf8', fontFamily: '"Lato", sans-serif' }
const gateBox    = { background: '#fff', padding: '2.5rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,.1)', width: '320px', textAlign: 'center' }
