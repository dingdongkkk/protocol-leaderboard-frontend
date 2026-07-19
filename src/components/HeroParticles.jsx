import { useEffect, useRef } from 'react'

/* Soft floating particle field in the hero — palette pinks only. */
const COLORS = ['#d8a6b6', '#CFA5B2', '#c57a90', '#7f1f3a']

export default function HeroParticles({ count = 45 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []

    function resize() {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
    }

    function init() {
      resize()
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (Math.random() * 2.2 + 0.6) * devicePixelRatio,
        vx: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
        vy: (-Math.random() * 0.25 - 0.05) * devicePixelRatio,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.15,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    function tick() {
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

    init()
    tick()
    window.addEventListener('resize', init)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', init)
    }
  }, [count])

  return <canvas ref={canvasRef} className="hero-particles" style={{ width: '100%', height: '100%' }} />
}
