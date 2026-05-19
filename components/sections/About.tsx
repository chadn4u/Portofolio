'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'
import { i18n } from '@/lib/i18n'

type CSSWithPct = React.CSSProperties & { '--pct': string }

const SKILLS = [
  { name: 'Next.js',         icon: 'ri-reactjs-line',       pct: 95 },
  { name: 'TypeScript',      icon: 'ri-code-s-slash-line',  pct: 90 },
  { name: 'Node.js / Fastify',icon: 'ri-nodejs-line',       pct: 88 },
  { name: 'FastAPI / Python',icon: 'ri-terminal-box-line',  pct: 85 },
  { name: 'PostgreSQL',      icon: 'ri-database-2-line',    pct: 87 },
  { name: 'Supabase / Redis',icon: 'ri-database-fill',      pct: 83 },
  { name: 'LangGraph / AI',  icon: 'ri-brain-line',         pct: 80 },
  { name: 'Flutter',         icon: 'ri-smartphone-line',    pct: 82 },
  { name: 'Docker / DevOps', icon: 'ri-server-line',        pct: 78 },
]

const TAGS = ['production-ready', 'e-commerce', 'AI-integrated', 'mobile-dev', 'full-ownership', 'core-web-vitals']

export default function About() {
  const { lang } = useLang()
  const a = i18n.about
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) section.classList.add('in')
    }, { threshold: 0.1 })
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="reveal" ref={sectionRef}>
      <span className="eyebrow mono">{a.eyebrow[lang]}</span>
      <h2 className="title">
        {a.title1[lang]} <em>{a.em1[lang]}</em><br />{a.title2[lang]} <em>{a.em2[lang]}</em>
      </h2>

      <div className="about-grid">
        <div className="about-text">
          <p dangerouslySetInnerHTML={{ __html: a.p1[lang] }} />
          <p dangerouslySetInnerHTML={{ __html: a.p2[lang] }} />
          <p dangerouslySetInnerHTML={{ __html: a.p3[lang] }} />
          <div className="tags mono">
            {TAGS.map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>

        <div className="panel" id="stack" style={{ height: 'fit-content' }}>
          <div className="panel-head mono">
            <div className="dots"><i className="r" /><i className="y" /><i className="g" /></div>
            <span className="path">{a.stackFile[lang]}</span>
            <div className="right"><span className="live">{a.syncing[lang]}</span></div>
          </div>
          <div className="skills">
            {SKILLS.map(s => (
              <div className="skill" key={s.name}>
                <span className="name"><i className={s.icon} />{s.name}</span>
                <span className="track"><i style={{ '--pct': s.pct + '%' } as CSSWithPct} /></span>
                <span className="pct">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
