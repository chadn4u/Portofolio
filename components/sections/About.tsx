'use client'
import { useEffect, useRef } from 'react'

type CSSWithPct = React.CSSProperties & { '--pct': string }

const SKILLS = [
  { name: 'Next.js', icon: 'ri-reactjs-line', pct: 95 },
  { name: 'TypeScript', icon: 'ri-code-s-slash-line', pct: 90 },
  { name: 'Node.js / Fastify', icon: 'ri-nodejs-line', pct: 88 },
  { name: 'FastAPI / Python', icon: 'ri-terminal-box-line', pct: 85 },
  { name: 'PostgreSQL', icon: 'ri-database-2-line', pct: 87 },
  { name: 'Supabase / Redis', icon: 'ri-database-fill', pct: 83 },
  { name: 'LangGraph / AI', icon: 'ri-brain-line', pct: 80 },
  { name: 'Flutter', icon: 'ri-smartphone-line', pct: 82 },
  { name: 'Docker / DevOps', icon: 'ri-server-line', pct: 78 },
]

const TAGS = ['production-ready', 'e-commerce', 'AI-integrated', 'mobile-dev', 'full-ownership', 'core-web-vitals']

export default function About() {
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
      <span className="eyebrow mono">02 / About</span>
      <h2 className="title">Engineer yang <em>nge-ship</em>,<br />bukan cuma <em>nge-talk</em>.</h2>

      <div className="about-grid">
        <div className="about-text">
          <p>Versatile Full-Stack Engineer dengan <b>8+ tahun</b> pengalaman membangun scalable web, mobile & AI-integrated systems. Spesialisasi di <b>Next.js/React frontends</b> dan <b>Node.js/FastAPI backends</b>, dengan solid expertise di <b>PostgreSQL, Redis, Supabase</b>, dan third-party API integrations.</p>
          <p>Berpengalaman dalam <b>end-to-end ownership</b> — dari UI/UX, backend API, payment integration, sampai DevOps di production. Pernah bangun <b>loyalty app dengan 100K+ users</b>, <b>AI CS system dengan 83% token reduction</b>, cashless parking untuk Pemda, dan SaaS digital goods platform.</p>
          <p>Strong focus pada <b>clean architecture</b>, <b>UI/UX quality</b>, dan <b>Core Web Vitals performance</b>. Gw suka ngebangun sistem yang tidak hanya jalan — tapi <em style={{ color: 'var(--cy)', fontStyle: 'normal' }}>scale dan deliver measurable impact</em>.</p>
          <div className="tags mono">
            {TAGS.map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>

        <div className="panel" id="stack" style={{ height: 'fit-content' }}>
          <div className="panel-head mono">
            <div className="dots"><i className="r" /><i className="y" /><i className="g" /></div>
            <span className="path">./stack/proficiency.yml</span>
            <div className="right"><span className="live">syncing</span></div>
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
