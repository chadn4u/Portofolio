'use client'
import { useEffect } from 'react'

export default function AnimatedBackground() {
  useEffect(() => {
    const canvas = document.getElementById('net') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0
    let points: { x: number; y: number; vx: number; vy: number }[] = []
    let animId: number

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      const n = Math.min(80, Math.floor(W * H / 22000))
      points = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      for (const p of points) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      }
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j]
          const dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy
          if (d < 18000) {
            const o = 1 - d / 18000
            ctx.strokeStyle = `rgba(34,211,238,${(o * 0.35).toFixed(2)})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        ctx.fillStyle = 'rgba(34,211,238,.6)'
        ctx.fillRect(points[i].x - 0.8, points[i].y - 0.8, 1.6, 1.6)
      }
      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    const spot = document.getElementById('spot') as HTMLElement
    const bgGrid = document.querySelector('.bg-grid') as HTMLElement

    function onMouseMove(e: MouseEvent) {
      if (spot) { spot.style.left = e.clientX + 'px'; spot.style.top = e.clientY + 'px' }
      if (bgGrid) {
        bgGrid.style.setProperty('--mx', (e.clientX / window.innerWidth * 100) + '%')
        bgGrid.style.setProperty('--my', (e.clientY / window.innerHeight * 100) + '%')
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <div className="bg-fx" />
      <div className="bg-grid" />
      <canvas className="net" id="net" />
      <div className="scanlines" />
      <div className="spot" id="spot" />
    </>
  )
}
