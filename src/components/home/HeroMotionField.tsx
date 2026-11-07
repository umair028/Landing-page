import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/gsap'
import { afterLoad } from '@/lib/idle'

/**
 * Moving "pixel tile" field behind the hero: a lightweight canvas stand-in for a
 * looping background video (dimmed, monochrome, low opacity). Wavy bands of tiles
 * drift sideways and flicker; tiles show an ✕, a solid block or a dot pair.
 * Pauses off-screen / in background tabs and renders one still frame for reduced motion.
 * The loop only starts after the page has loaded, so it never competes with start-up work.
 */
export function HeroMotionField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduced = prefersReducedMotion()

    let w = 0
    let h = 0
    let cell = 26
    let raf = 0
    let last = 0
    let visible = true
    const start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cell = Math.max(18, Math.min(30, w / 55))
      draw((performance.now() - start) / 1000)
    }

    const hash = (x: number, y: number) => {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
      return s - Math.floor(s)
    }

    const roundRect = (x: number, y: number, s: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + s, y, x + s, y + s, r)
      ctx.arcTo(x + s, y + s, x, y + s, r)
      ctx.arcTo(x, y + s, x, y, r)
      ctx.arcTo(x, y, x + s, y, r)
      ctx.closePath()
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h)
      const rows = Math.ceil(h / cell) + 1
      const cols = Math.ceil(w / cell) + 2
      const travel = t * 22 // px per second, drifting left
      const shift = Math.floor(travel / cell)
      const offset = travel % cell
      const pad = cell * 0.14
      const size = cell - pad * 2

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wc = c + shift // world column, so tiles keep identity as they move
          // two wavy horizontal bands + a faint diagonal sweep
          const b1c = rows * 0.56 + 3.2 * Math.sin(t * 0.32 + wc * 0.085)
          const b2c = rows * 0.34 + 4 * Math.sin(t * 0.21 - wc * 0.06 + 2.1)
          const b1 = Math.exp(-((r - b1c) ** 2) / 7)
          const b2 = Math.exp(-((r - b2c) ** 2) / 4) * 0.75
          const sweep = Math.max(0, Math.sin((wc + r * 0.6) * 0.07 - t * 0.5)) ** 6 * 0.6
          const n = hash(wc, r)
          const flicker = 0.55 + 0.45 * Math.sin(t * (1.4 + n * 2.2) + n * 12)
          const v = Math.max(b1, b2, sweep) * flicker
          if (v < 0.22) continue

          const x = c * cell - offset + pad
          const y = r * cell + pad
          const a = Math.min(1, (v - 0.22) * 1.6)
          const radius = size * 0.22

          if (n < 0.46) {
            // outlined tile with a cross
            roundRect(x, y, size, radius)
            ctx!.fillStyle = `rgba(0, 32, 14, ${0.2 * a})`
            ctx!.fill()
            ctx!.strokeStyle = `rgba(0, 32, 14, ${0.32 * a})`
            ctx!.lineWidth = 1.2
            ctx!.stroke()
            const k = size * 0.3
            ctx!.beginPath()
            ctx!.moveTo(x + k, y + k)
            ctx!.lineTo(x + size - k, y + size - k)
            ctx!.moveTo(x + size - k, y + k)
            ctx!.lineTo(x + k, y + size - k)
            ctx!.strokeStyle = `rgba(255, 255, 255, ${0.16 * a})`
            ctx!.lineWidth = 1.6
            ctx!.stroke()
          } else if (n < 0.76) {
            // solid block
            roundRect(x, y, size, radius)
            ctx!.fillStyle = `rgba(0, 32, 14, ${0.26 * a})`
            ctx!.fill()
          } else {
            // dot pair
            ctx!.fillStyle = `rgba(0, 32, 14, ${0.34 * a})`
            const d = size * 0.16
            ctx!.beginPath()
            ctx!.arc(x + size * 0.32, y + size * 0.5, d, 0, Math.PI * 2)
            ctx!.arc(x + size * 0.68, y + size * 0.5, d, 0, Math.PI * 2)
            ctx!.fill()
          }
        }
      }
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      if (now - last < 1000 / 30) return // ~30fps is plenty for a background
      last = now
      draw((now - start) / 1000)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    resize()
    const cancelLoad = reduced ? () => {} : afterLoad(() => (raf = requestAnimationFrame(loop)))

    return () => {
      cancelLoad()
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-[1] h-full w-full ${className}`}
    />
  )
}
