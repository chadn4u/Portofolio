export default function Footer() {
  return (
    <footer>
      <div className="foot">
        <div className="lt">
          <span className="dot" />
          <span>© 2025 Richard Mario · built with caffeine &amp; curiosity</span>
        </div>
        <div>
          uptime <span style={{ color: 'var(--lime)' }}>99.98%</span> · last_deploy{' '}
          <span style={{ color: 'var(--fg-dim)' }}>just now</span>
        </div>
      </div>
    </footer>
  )
}
