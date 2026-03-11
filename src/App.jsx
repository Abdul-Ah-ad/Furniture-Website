import { useState, useEffect } from 'react'
import Navbar  from './components/Navbar'
import Hero    from './components/Hero'
import Gallery from './components/Gallery'
import About   from './components/About'
import Contact from './components/Contact'
import Footer  from './components/Footer'
import { LanguageProvider } from './context/LanguageContext'

export default function App() {
  const [theme, setTheme] = useState('cream')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <LanguageProvider>
      <Navbar theme={theme} onThemeChange={setTheme} />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
