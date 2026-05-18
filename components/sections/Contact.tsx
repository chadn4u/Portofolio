'use client'
import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState({ text: '', color: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) el.classList.add('in')
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setStatus({ text: '> transmitting...', color: 'var(--cy)' })
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY, ...data }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus({ text: '✓ message delivered · expect a reply within 24h', color: 'var(--lime)' })
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus({ text: '✗ transmission failed · try again', color: 'var(--red)' })
      }
    } catch {
      setStatus({ text: '✗ network error · try again', color: 'var(--red)' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="reveal" ref={sectionRef}>
      <span className="eyebrow mono">05 / Contact</span>
      <h2 className="title">Let&apos;s <em>build</em> something.</h2>
      <p className="sub">Punya project di mind? Drop pesan — gw bales dalam 24 jam kerja.</p>

      <div className="contact-grid">
        <div className="panel">
          <div className="panel-head mono">
            <div className="dots"><i className="r" /><i className="y" /><i className="g" /></div>
            <span className="path">./send_message.sh</span>
            <div className="right"><span className="live">accepting input</span></div>
          </div>
          <form className="form-body" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field"><label>name</label><input type="text" name="name" placeholder="your name" required /></div>
              <div className="field"><label>email</label><input type="email" name="email" placeholder="you@domain.com" required /></div>
            </div>
            <div className="field" style={{ marginBottom: 14 }}>
              <label>subject</label>
              <input type="text" name="subject" placeholder="what's this about?" required />
            </div>
            <div className="field" style={{ marginBottom: 18 }}>
              <label>message</label>
              <textarea name="message" rows={5} placeholder="// your message here..." required />
            </div>
            <button type="submit" className="btn solid mono" disabled={submitting}>
              execute.send() <span className="arrow">→</span>
            </button>
            <div className="mono" style={{ marginTop: 12, fontSize: 12, color: status.color, minHeight: 18 }}>
              {status.text}
            </div>
          </form>
        </div>

        <div className="panel contact-info">
          <div className="info-row">
            <div className="ic"><i className="ri-mail-line" /></div>
            <div><div className="l">email</div><div className="v">chadpato@gmail.com</div></div>
          </div>
          <div className="info-row">
            <div className="ic"><i className="ri-map-pin-line" /></div>
            <div><div className="l">location</div><div className="v">Bekasi Utara, Jakarta · UTC+7</div></div>
          </div>
          <div className="info-row">
            <div className="ic"><i className="ri-time-line" /></div>
            <div><div className="l">availability</div><div className="v">Mon–Fri · 09:00–18:00</div></div>
          </div>
          <div className="info-row">
            <div className="ic"><i className="ri-pulse-line" /></div>
            <div><div className="l">response_time</div><div className="v">&lt; 24h</div></div>
          </div>
          <div style={{ borderTop: '1px dashed var(--line)', paddingTop: 18, marginTop: 6 }}>
            <div className="l mono" style={{ color: 'var(--fg-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 10 }}>// follow</div>
            <div className="socials">
              <a href="https://github.com/chadn4u" aria-label="github" target="_blank" rel="noopener noreferrer"><i className="ri-github-fill" /></a>
              <a href="#" aria-label="linkedin"><i className="ri-linkedin-fill" /></a>
              <a href="#" aria-label="twitter"><i className="ri-twitter-x-fill" /></a>
              <a href="#" aria-label="portfolio"><i className="ri-code-box-line" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
