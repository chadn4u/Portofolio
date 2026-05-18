'use client'
import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { id: 'home', idx: '01' },
  { id: 'about', idx: '02' },
  { id: 'stack', idx: '03' },
  { id: 'projects', idx: '04' },
  { id: 'contact', idx: '05' },
]

const TRACKED = ['home', 'about', 'projects', 'contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')

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
            {NAV_ITEMS.map(({ id, idx }) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeId === id ? 'active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(id) }}
              >
                <span className="idx">{idx}</span>{id}
              </a>
            ))}
          </div>
          <a href="#contact" className="nav-cta" onClick={e => { e.preventDefault(); scrollTo('contact') }}>
            ./connect.sh →
          </a>
          <button className="hamburger" aria-label="menu" onClick={() => setMenuOpen(o => !o)}>
            <i className={menuOpen ? 'ri-close-line' : 'ri-menu-line'} />
          </button>
        </div>
      </nav>
    </>
  )
}
