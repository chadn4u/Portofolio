'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/context/LanguageContext'
import { i18n } from '@/lib/i18n'

export default function Contact() {
  const { lang } = useLang()
  const c = i18n.contact
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
    setStatus({ text: c.sending[lang], color: 'var(--cy)' })
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY, ...data }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus({ text: c.sent[lang], color: 'var(--lime)' })
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus({ text: c.error[lang], color: 'var(--red)' })
      }
    } catch {
      setStatus({ text: c.netError[lang], color: 'var(--red)' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="reveal" ref={sectionRef}>
      <span className="eyebrow mono">{c.eyebrow[lang]}</span>
      <h2 className="title">{c.title[lang]} <em>{c.em[lang]}</em></h2>
      <p className="sub">{c.sub[lang]}</p>

      <div className="contact-grid">
        <div className="panel">
          <div className="panel-head mono">
            <div className="dots"><i className="r" /><i className="y" /><i className="g" /></div>
            <span className="path">{c.termPath[lang]}</span>
            <div className="right"><span className="live">{c.accepting[lang]}</span></div>
          </div>
          <form className="form-body" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label>{c.labelName[lang]}</label>
                <input type="text" name="name" placeholder={c.phName[lang]} required />
              </div>
              <div className="field">
                <label>{c.labelEmail[lang]}</label>
                <input type="email" name="email" placeholder={c.phEmail[lang]} required />
              </div>
            </div>
            <div className="field" style={{ marginBottom: 14 }}>
              <label>{c.labelSubject[lang]}</label>
              <input type="text" name="subject" placeholder={c.phSubject[lang]} required />
            </div>
            <div className="field" style={{ marginBottom: 18 }}>
              <label>{c.labelMsg[lang]}</label>
              <textarea name="message" rows={5} placeholder={c.phMsg[lang]} required />
            </div>
            <button type="submit" className="btn solid mono" disabled={submitting}>
              {c.send[lang]} <span className="arrow">→</span>
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
            <div><div className="l">{c.locLabel[lang]}</div><div className="v">Bekasi Utara, Jakarta · UTC+7</div></div>
          </div>
          <div className="info-row">
            <div className="ic"><i className="ri-time-line" /></div>
            <div><div className="l">{c.availLabel[lang]}</div><div className="v">{c.availVal[lang]}</div></div>
          </div>
          <div className="info-row">
            <div className="ic"><i className="ri-pulse-line" /></div>
            <div><div className="l">{c.respLabel[lang]}</div><div className="v">&lt; 24h</div></div>
          </div>
          <div style={{ borderTop: '1px dashed var(--line)', paddingTop: 18, marginTop: 6 }}>
            <div className="l mono" style={{ color: 'var(--fg-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 10 }}>
              {c.follow[lang]}
            </div>
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
