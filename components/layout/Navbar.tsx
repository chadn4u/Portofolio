'use client'
import { useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { i18n } from '@/lib/i18n'

const NAV_IDS = ['home', 'about', 'stack', 'projects', 'contact']
const TRACKED = ['home', 'about', 'projects', 'contact']

export default function Navbar() {
  const { lang, toggle } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const n = i18n.nav

  useEffect(() => {
    const progressEl = document.getElementById('progress')
    const sections = TRACKED.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    function onScroll() {
      const sc = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      if (progressEl) progressEl.style.width = (sc / max * 100) + '%'
      let active = sections[0]
      sections.forEach(s => { if (s.getBoundingClientRect().top <= 100) active = s })
      setActiveId(active?.id ?? 'home')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navLabels: Record<string, { id: string; en: string }> = {
    home: n.home, about: n.about, stack: n.stack, projects: n.projects, contact: n.contact,
  }
  const idxMap: Record<string, string> = {
    home: '01', about: '02', stack: '03', projects: '04', contact: '05',
  }

  return (
    <>
      <div className="progress"><i id="progress" /></div>
      <nav className="topbar">
        <div className="nav-inner">
          <a href="#home" className="brand mono" onClick={e => { e.preventDefault(); scrollTo('home') }}>
            <span className="dot" />
            RM<span style={{ color: 'var(--cy)' }}>/</span>DEV
            <small>· v3.0.1</small>
          </a>
          <div className={`nav-links mono${menuOpen ? ' open' : ''}`}>
            {NAV_IDS.map(id => (
              <a
                key={id}
                href={`#${id}`}
                className={activeId === id ? 'active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(id) }}
              >
                <span className="idx">{idxMap[id]}</span>{navLabels[id][lang]}
              </a>
            ))}
          </div>
          <a href="#contact" className="nav-cta" onClick={e => { e.preventDefault(); scrollTo('contact') }}>
            {n.cta[lang]}
          </a>
          <button className="lang-toggle mono" onClick={toggle} aria-label="toggle language">
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <button className="hamburger" aria-label="menu" onClick={() => setMenuOpen(o => !o)}>
            <i className={menuOpen ? 'ri-close-line' : 'ri-menu-line'} />
          </button>
        </div>
      </nav>
    </>
  )
}
