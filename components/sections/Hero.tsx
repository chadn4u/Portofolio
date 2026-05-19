'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { i18n } from '@/lib/i18n'

const ROLES_ID = ['Full-Stack Engineer', 'AI Systems Builder', 'E-commerce Architect', 'Mobile App Developer', 'Production Shipper']
const ROLES_EN = ['Full-Stack Engineer', 'AI Systems Builder', 'E-commerce Architect', 'Mobile App Developer', 'Production Shipper']

const STATS = [
  { to: 8,   labelKey: 'Years_Shipping' },
  { to: 15,  labelKey: 'Projects_Delivered' },
  { to: 100, labelKey: 'K_Users_Served' },
  { to: 99,  labelKey: 'Uptime_Pct' },
]

export default function Hero() {
  const { lang } = useLang()
  const h = i18n.hero
  const ROLES = lang === 'id' ? ROLES_ID : ROLES_EN

  const [typed, setTyped] = useState('')
  const [clock, setClock] = useState('--:--:--')
  const [llmCalls, setLlmCalls] = useState(312)
  const [ragHits, setRagHits] = useState(1284)
  const statsRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState(STATS.map(() => 0))
  const countsDone = useRef(false)
  const roleRef = useRef({ rIdx: 0, cIdx: 0, deleting: false })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    roleRef.current = { rIdx: 0, cIdx: 0, deleting: false }
    function tick() {
      const { rIdx, cIdx, deleting } = roleRef.current
      const cur = ROLES[rIdx]
      if (!deleting) {
        setTyped(cur.slice(0, cIdx + 1))
        roleRef.current.cIdx++
        if (cIdx + 1 === cur.length) { roleRef.current.deleting = true; timer = setTimeout(tick, 1400); return }
      } else {
        setTyped(cur.slice(0, cIdx - 1))
        roleRef.current.cIdx--
        if (cIdx - 1 === 0) { roleRef.current.deleting = false; roleRef.current.rIdx = (rIdx + 1) % ROLES.length }
      }
      timer = setTimeout(tick, roleRef.current.deleting ? 35 : 70)
    }
    tick()
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    function update() {
      const d = new Date(), p = (n: number) => String(n).padStart(2, '0')
      setClock(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setLlmCalls(280 + Math.floor(Math.random() * 80))
      setRagHits(1100 + Math.floor(Math.random() * 400))
    }, 1800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countsDone.current) {
        countsDone.current = true
        STATS.forEach((stat, i) => {
          let v = 0
          function step() {
            v += Math.max(1, Math.ceil(stat.to / 30))
            if (v >= stat.to) { setCounts(c => { const n = [...c]; n[i] = stat.to; return n }); return }
            setCounts(c => { const n = [...c]; n[i] = v; return n })
            requestAnimationFrame(step)
          }
          step()
        })
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="home" className="hero">
      <div className="hero-left">
        <h3 className="mono">
          <span className="blink" /> {h.badge[lang]}
        </h3>
        <h1>
          <span className="glitch" data-text="Richard">Richard</span>
          <br />
          <span className="accent">Mario.</span>
        </h1>
        <div className="role mono">
          {h.role[lang]}<span className="typed">{typed}</span><span className="caret" />
        </div>
        <p className="lede" dangerouslySetInnerHTML={{ __html: h.lede[lang] }} />
        <div className="cta-row">
          <a href="#projects" className="btn solid mono"
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
            {h.cta1[lang]} <span className="arrow">→</span>
          </a>
          <a href="/cv.pdf" className="btn ghost mono">
            <i className="ri-download-2-line" /> {h.cta2[lang]}
          </a>
        </div>
        <div className="stats" ref={statsRef}>
          {STATS.map((stat, i) => (
            <div className="stat" key={stat.labelKey}>
              <div className="n">{counts[i]}</div>
              <div className="l mono">{stat.labelKey}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <div className="panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="panel-head mono">
            <div className="dots"><i className="r" /><i className="y" /><i className="g" /></div>
            <span className="path">richard@stack ~ /portfolio</span>
            <div className="right">
              <span className="live">online</span>
              <span>{clock}</span>
            </div>
          </div>
          <div className="terminal">
            <span className="ln"><span className="p">richard@stack</span>:<span className="k">~</span>$ whoami</span>
            <span className="ln c"># Full-Stack Engineer · AI Systems</span>
            <span className="ln"><span className="p">richard@stack</span>:<span className="k">~</span>$ cat ./profile.json</span>
            <span className="ln">{'{'}</span>
            <span className="ln">{'  '}<span className="k">&quot;name&quot;</span>: <span className="s">&quot;Richard Mario&quot;</span>,</span>
            <span className="ln">{'  '}<span className="k">&quot;location&quot;</span>: <span className="s">&quot;Bekasi, ID&quot;</span>,</span>
            <span className="ln">{'  '}<span className="k">&quot;focus&quot;</span>: [<span className="s">&quot;Full-Stack&quot;</span>, <span className="s">&quot;AI&quot;</span>, <span className="s">&quot;E-commerce&quot;</span>],</span>
            <span className="ln">{'  '}<span className="k">&quot;stack&quot;</span>: [<span className="s">&quot;Next.js&quot;</span>, <span className="s">&quot;FastAPI&quot;</span>, <span className="s">&quot;PostgreSQL&quot;</span>],</span>
            <span className="ln">{'  '}<span className="k">&quot;available&quot;</span>: <span className="v">true</span>,</span>
            <span className="ln">{'  '}<span className="k">&quot;coffee_per_day&quot;</span>: <span className="v">3</span></span>
            <span className="ln">{'}'}</span>
            <span className="ln"><span className="p">richard@stack</span>:<span className="k">~</span>$ <span className="ok">./deploy.sh --prod</span></span>
            <span className="ln ok">✓ build complete · 0 errors · 0.42s</span>
            <span className="ln c"># waiting for your message...</span>
          </div>
        </div>

        <div className="hud">
          <div className="panel">
            <div className="panel-head mono"><span style={{ color: 'var(--cy)' }}>◆</span> LATENCY</div>
            <div className="body">
              <div className="row"><span>edge_ttfb</span><b>42<span style={{ color: 'var(--fg-muted)' }}>ms</span></b></div>
              <div className="row"><span>api_p95</span><b>118<span style={{ color: 'var(--fg-muted)' }}>ms</span></b></div>
              <div className="row"><span>db_query</span><b>11<span style={{ color: 'var(--fg-muted)' }}>ms</span></b></div>
              <div className="pulse-graph">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
            </div>
          </div>
          <div className="panel">
            <div className="panel-head mono"><span style={{ color: 'var(--lime)' }}>◆</span> AGENT_OPS</div>
            <div className="body">
              <div className="row"><span>llm_calls/min</span><b>{llmCalls}</b></div>
              <div className="bar"><i style={{ width: '72%' }} /></div>
              <div className="row" style={{ marginTop: 8 }}><span>rag_hits</span><b>{String(ragHits).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b></div>
              <div className="bar"><i style={{ width: '48%' }} /></div>
              <div className="row" style={{ marginTop: 8 }}><span>queue_depth</span><b>3</b></div>
              <div className="bar"><i style={{ width: '12%' }} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
