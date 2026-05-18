'use client'
import { useEffect, useRef, useState } from 'react'
import type { Project, VisualKind } from '@/lib/types'

function visualSVG(kind: VisualKind): string {
  switch (kind) {
    case 'chat': return `<svg viewBox="0 0 400 160" preserveAspectRatio="none"><defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#22d3ee" stop-opacity=".0"/><stop offset="1" stop-color="#22d3ee" stop-opacity=".5"/></linearGradient></defs><rect x="20" y="30" rx="6" width="160" height="22" fill="rgba(34,211,238,.15)" stroke="rgba(34,211,238,.4)"/><rect x="220" y="62" rx="6" width="160" height="22" fill="rgba(163,230,53,.12)" stroke="rgba(163,230,53,.4)"/><rect x="20" y="94" rx="6" width="120" height="22" fill="rgba(34,211,238,.15)" stroke="rgba(34,211,238,.4)"/><circle cx="200" cy="80" r="60" fill="none" stroke="url(#g1)" stroke-width="1"/><circle cx="200" cy="80" r="40" fill="none" stroke="url(#g1)" stroke-width="1"/></svg>`
    case 'chart': return `<svg viewBox="0 0 400 160" preserveAspectRatio="none"><polyline points="0,140 40,110 80,120 120,80 160,90 200,50 240,70 280,30 320,55 360,20 400,40" fill="none" stroke="#22d3ee" stroke-width="2"/><polyline points="0,140 40,110 80,120 120,80 160,90 200,50 240,70 280,30 320,55 360,20 400,40 400,160 0,160" fill="rgba(34,211,238,.15)"/><rect x="30" y="110" width="6" height="50" fill="rgba(163,230,53,.4)"/><rect x="75" y="90" width="6" height="70" fill="rgba(163,230,53,.4)"/><rect x="120" y="100" width="6" height="60" fill="rgba(163,230,53,.4)"/><rect x="165" y="70" width="6" height="90" fill="rgba(163,230,53,.4)"/><rect x="210" y="80" width="6" height="80" fill="rgba(163,230,53,.4)"/><rect x="255" y="50" width="6" height="110" fill="rgba(163,230,53,.4)"/><rect x="300" y="60" width="6" height="100" fill="rgba(163,230,53,.4)"/><rect x="345" y="40" width="6" height="120" fill="rgba(163,230,53,.4)"/></svg>`
    case 'flow': return `<svg viewBox="0 0 400 160" preserveAspectRatio="none"><g fill="none" stroke="#22d3ee" stroke-width="1.2"><path d="M40,80 L120,80 L120,40 L200,40 L200,80 L280,80"/><path d="M120,80 L120,120 L200,120 L200,80"/><path d="M280,80 L360,80"/></g><g fill="#04060a" stroke="#22d3ee" stroke-width="1.2"><rect x="20" y="68" width="40" height="24" rx="3"/><rect x="100" y="28" width="40" height="24" rx="3"/><rect x="100" y="108" width="40" height="24" rx="3"/><rect x="180" y="68" width="40" height="24" rx="3"/><rect x="260" y="68" width="40" height="24" rx="3" fill="rgba(163,230,53,.2)" stroke="#a3e635"/><rect x="340" y="68" width="40" height="24" rx="3"/></g></svg>`
    case 'vision': return `<svg viewBox="0 0 400 160" preserveAspectRatio="none"><g stroke="#22d3ee" fill="none"><rect x="60" y="40" width="80" height="80" stroke-width="1.5"/><rect x="180" y="60" width="60" height="60" stroke-width="1.5" stroke="#a3e635"/><rect x="280" y="50" width="70" height="70" stroke-width="1.5"/></g><g fill="#22d3ee" font-family="JetBrains Mono" font-size="9"><text x="64" y="36">person · 0.94</text><text x="184" y="56" fill="#a3e635">vehicle · 0.87</text><text x="284" y="46">person · 0.91</text></g><g stroke="rgba(34,211,238,.2)" stroke-dasharray="2 4"><line x1="0" y1="80" x2="400" y2="80"/><line x1="200" y1="0" x2="200" y2="160"/></g></svg>`
    case 'reco': return `<svg viewBox="0 0 400 160" preserveAspectRatio="none"><rect x="20" y="50" width="28" height="60" rx="3" fill="#22d3ee" fill-opacity=".25" stroke="#22d3ee" stroke-opacity=".6"/><rect x="58" y="30" width="28" height="80" rx="3" fill="#a3e635" fill-opacity=".25" stroke="#a3e635" stroke-opacity=".6"/><rect x="96" y="60" width="28" height="50" rx="3" fill="#22d3ee" fill-opacity=".25" stroke="#22d3ee" stroke-opacity=".6"/><rect x="134" y="40" width="28" height="70" rx="3" fill="#22d3ee" fill-opacity=".25" stroke="#22d3ee" stroke-opacity=".6"/><rect x="172" y="55" width="28" height="55" rx="3" fill="#a3e635" fill-opacity=".25" stroke="#a3e635" stroke-opacity=".6"/><rect x="210" y="35" width="28" height="75" rx="3" fill="#22d3ee" fill-opacity=".25" stroke="#22d3ee" stroke-opacity=".6"/><rect x="248" y="65" width="28" height="45" rx="3" fill="#22d3ee" fill-opacity=".25" stroke="#22d3ee" stroke-opacity=".6"/><rect x="286" y="45" width="28" height="65" rx="3" fill="#a3e635" fill-opacity=".25" stroke="#a3e635" stroke-opacity=".6"/><rect x="324" y="55" width="28" height="55" rx="3" fill="#22d3ee" fill-opacity=".25" stroke="#22d3ee" stroke-opacity=".6"/><rect x="362" y="30" width="28" height="80" rx="3" fill="#22d3ee" fill-opacity=".25" stroke="#22d3ee" stroke-opacity=".6"/></svg>`
    case 'voice': return `<svg viewBox="0 0 400 160" preserveAspectRatio="none">${Array.from({ length: 50 }, (_, i) => { const x = 10 + i * 7.6; const h = 10 + Math.abs(Math.sin(i * 0.4)) * 80; const op = (0.3 + Math.abs(Math.sin(i * 0.4)) * 0.6).toFixed(2); return `<rect x="${x.toFixed(1)}" y="${(80 - h / 2).toFixed(1)}" width="4" height="${h.toFixed(1)}" rx="1" fill="#22d3ee" fill-opacity="${op}"/>` }).join('')}</svg>`
  }
}

interface Props { projects: Project[] }

export default function Projects({ projects }: Props) {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [modal, setModal] = useState<Project | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) el.classList.add('in')
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  return (
    <>
      <section id="projects" className="reveal" ref={sectionRef}>
        <span className="eyebrow mono">04 / Featured Builds</span>
        <h2 className="title">
          Selected <em>work</em> · <span className="mono" style={{ fontSize: '.5em', color: 'var(--fg-dim)', fontWeight: 400 }}>ls -la ./projects</span>
        </h2>
        <p className="sub">Beberapa sistem yang gw bangun &amp; ship — production-grade, scalable, opinionated. Click any project untuk full case study.</p>

        <div className="view-toggle">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>
            <i className="ri-layout-grid-line" /> grid_view
          </button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>
            <i className="ri-terminal-line" /> terminal_list
          </button>
        </div>

        {view === 'grid' && (
          <div className="projects-grid">
            {projects.map(p => (
              <div className="proj" key={p.id} onClick={() => setModal(p)}>
                <div className="proj-head mono">
                  <span className="id">{p.id}</span>
                  <span>· {p.stack[0].toLowerCase()}_module</span>
                  <span className="status" style={p.status === 'archived' ? { color: 'var(--fg-muted)' } : undefined}>
                    {p.status}
                  </span>
                </div>
                <div className="proj-visual">
                  <div className="glow" />
                  <div dangerouslySetInnerHTML={{ __html: visualSVG(p.visual) }} />
                </div>
                <div className="proj-body">
                  <h3>{p.title} <span className="go mono">↗</span></h3>
                  <p>{p.tagline}</p>
                  <div className="stack">{p.stack.slice(0, 3).map(s => <span key={s}>{s}</span>)}</div>
                  <div className="proj-meta">
                    <span><i className="ri-user-line" />{p.users} users</span>
                    <span><i className="ri-pulse-line" />{p.uptime}% uptime</span>
                    <span><i className="ri-git-branch-line" />main</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'list' && (
          <div className="proj-list">
            <div className="head">
              <span>ID</span><span>NAME</span>
              <span className="h-stk">STACK</span><span className="h-users">USERS</span>
              <span className="h-up">UPTIME</span><span>STATUS</span><span />
            </div>
            {projects.map(p => (
              <div className="row" key={p.id} onClick={() => setModal(p)}>
                <span className="id">{p.id}</span>
                <span className="name">{p.title}<small>{p.tagline}</small></span>
                <span className="stk">{p.stack.slice(0, 3).join(' · ')}</span>
                <span className="users mono" style={{ color: 'var(--fg-dim)', fontSize: 12 }}>{p.users}</span>
                <span className="up mono" style={{ color: 'var(--fg-dim)', fontSize: 12 }}>{p.uptime}%</span>
                <span className="st" style={p.status === 'archived' ? { color: 'var(--fg-muted)' } : undefined}>{p.status}</span>
                <span className="arrow mono">→</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {modal && (
        <div className="modal open" onClick={e => { if (e.target === e.currentTarget) setModal(null) }}>
          <div className="modal-card">
            <div className="modal-head mono">
              <div className="dots"><i className="r" /><i className="y" /><i className="g" /></div>
              <span className="path">./case-studies/{modal.slug}.md</span>
              <span className="id">{modal.id}</span>
              <button className="close" aria-label="close" onClick={() => setModal(null)}>
                <i className="ri-close-line" />
              </button>
            </div>
            <div className="modal-body">
              <span className="eyebrow mono">case study · {modal.id}</span>
              <h2>{modal.title}</h2>
              <p className="lede">{modal.tagline}</p>
              <div className="case-meta">
                <div className="item"><div className="l">role</div><div className="v">{modal.role}</div></div>
                <div className="item"><div className="l">year</div><div className="v">{modal.year}</div></div>
                <div className="item"><div className="l">duration</div><div className="v">{modal.duration}</div></div>
                <div className="item"><div className="l">client</div><div className="v">{modal.client}</div></div>
              </div>
              <div className="case-grid">
                <div>
                  <div className="case-section">
                    <h4>The Problem</h4>
                    <p>{modal.problem}</p>
                  </div>
                  <div className="case-section">
                    <h4>Engineering Challenges</h4>
                    <ul>{modal.challenges.map((c, i) => <li key={i}>{c}</li>)}</ul>
                  </div>
                </div>
                <div>
                  <div className="case-section">
                    <h4>Outcomes</h4>
                    <div className="outcomes">
                      {modal.outcomes.map((o, i) => (
                        <div className={`outcome${o.green ? ' green' : ''}`} key={i}>
                          <div className="v">{o.v}</div>
                          <div className="l">{o.l}</div>
                          <div className="s">{o.s}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="case-section">
                    <h4>Full Stack</h4>
                    <div className="stack-grid">{modal.stack.map(s => <span key={s}>{s}</span>)}</div>
                  </div>
                </div>
              </div>
              <div className="case-section">
                <h4>Architecture</h4>
                <div className="arch">
                  <div className="arch-flow">
                    {modal.arch.map((layer, idx) => (
                      <div key={layer.lbl} style={{ display: 'contents' }}>
                        <div className="arch-layer">
                          <div className="lbl">{layer.lbl}</div>
                          {layer.nodes.map(n => (
                            <div className={`arch-node${n.hi ? ' ' + n.hi : ''}`} key={n.n}>{n.n}</div>
                          ))}
                        </div>
                        {idx < modal.arch.length - 1 && <div className="arch-sep">→</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="case-section" style={{ borderTop: '1px solid var(--line)', paddingTop: 24, marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                {modal.storeUrls ? (
                  <>
                    {modal.storeUrls.play && (
                      <a href={modal.storeUrls.play} className="btn solid mono" target="_blank" rel="noopener noreferrer">
                        <i className="ri-google-play-fill" /> Google Play <span className="arrow">→</span>
                      </a>
                    )}
                    {modal.storeUrls.apple && (
                      <a href={modal.storeUrls.apple} className="btn ghost mono" target="_blank" rel="noopener noreferrer">
                        <i className="ri-apple-fill" /> App Store <span className="arrow">→</span>
                      </a>
                    )}
                  </>
                ) : modal.liveUrl ? (
                  <a href={modal.liveUrl} className="btn solid mono" target="_blank" rel="noopener noreferrer">
                    live_demo() <span className="arrow">→</span>
                  </a>
                ) : null}
                <span className="mono" style={{ marginLeft: 'auto', color: 'var(--fg-muted)', fontSize: 12 }}>// last_updated: {modal.year}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
