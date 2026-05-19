'use client'
import { useLang } from '@/context/LanguageContext'
import { i18n } from '@/lib/i18n'

export default function Footer() {
  const { lang } = useLang()
  const f = i18n.footer
  return (
    <footer>
      <div className="foot">
        <div className="lt">
          <span className="dot" />
          <span>{f.built[lang]}</span>
        </div>
        <div>
          {f.uptime[lang]} <span style={{ color: 'var(--lime)' }}>99.98%</span> · {f.deploy[lang]}{' '}
          <span style={{ color: 'var(--fg-dim)' }}>{f.now[lang]}</span>
        </div>
      </div>
    </footer>
  )
}
