import { useEffect, useRef } from 'react'

/* Soft floating particle field in the hero — palette pinks only. */
const COLORS = ['#d8a6b6', '#CFA5B2', '#c57a90', '#7f1f3a']

export default function HeroParticles({ count = 45 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    let raf
    let particles = []
    let visible = true
    let lastFrame = 0
    const frameInterval = 1000 / 30
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)

    function resize() {
      canvas.width = Math.max(1, Math.floor(canvas.offsetWidth * pixelRatio))
      canvas.height = Math.max(1, Math.floor(canvas.offsetHeight * pixelRatio))
    }

    function init() {
      resize()
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (Math.random() * 2.2 + 0.6) * pixelRatio,
        vx: (Math.random() - 0.5) * 0.18 * pixelRatio,
        vy: (-Math.random() * 0.25 - 0.05) * pixelRatio,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.15,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    function tick(now) {
      if (!visible || document.hidden || now - lastFrame < frameInterval) {
        raf = requestAnimationFrame(tick)
        return
      }
      lastFrame = now
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.02
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        ctx.globalAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    }, { rootMargin: '120px' })

    init()
    observer.observe(canvas)
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return <canvas ref={canvasRef} className="hero-particles" style={{ width: '100%', height: '100%' }} />
}
