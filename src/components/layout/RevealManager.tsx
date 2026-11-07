import { useEffect } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '@/lib/gsap'

const SCRUB = 0.6
const CHILD_STAGGER = 0.12
/** Ignore sub-pixel height jitter when deciding whether to refresh triggers. */
const HEIGHT_TOLERANCE_PX = 2
const REFRESH_DEBOUNCE_MS = 200

type RevealMode = string | undefined

const fromVars = (mode: RevealMode): gsap.TweenVars =>
  mode === 'scale' ? { autoAlpha: 0, y: 50, scale: 0.94 } : { autoAlpha: 0, y: 60 }

const toVars: gsap.TweenVars = { autoAlpha: 1, y: 0, scale: 1, ease: 'none' }

/**
 * Binds scroll-scrubbed entrance animations to elements marked up with data attributes:
 *
 * - `data-reveal`           the element rises and fades in
 * - `data-reveal-children`  its direct children animate in sequence on one trigger
 * - `data-reveal-each`      each direct child gets its own trigger
 *
 * Give any of them the value `"scale"` for a rise-and-grow variant.
 * Mount with `key={pathname}` so it rebinds after every route change.
 */
export function RevealManager() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, fromVars(el.dataset.reveal), {
          ...toVars,
          scrollTrigger: { trigger: el, start: 'clamp(top 95%)', end: 'clamp(top 65%)', scrub: SCRUB },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal-children]').forEach((el) => {
        gsap.fromTo(Array.from(el.children), fromVars(el.dataset.revealChildren), {
          ...toVars,
          stagger: CHILD_STAGGER,
          scrollTrigger: { trigger: el, start: 'clamp(top 92%)', end: 'clamp(top 50%)', scrub: SCRUB },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal-each]').forEach((el) => {
        Array.from(el.children).forEach((child) => {
          gsap.fromTo(child, fromVars(el.dataset.revealEach), {
            ...toVars,
            scrollTrigger: { trigger: child, start: 'clamp(top 98%)', end: 'clamp(top 75%)', scrub: SCRUB },
          })
        })
      })
    })

    // Lazy images, fonts and async sections change the page height after mount, which
    // leaves trigger positions stale. Refresh (debounced) whenever the height changes.
    let refreshTimer = 0
    let lastHeight = document.documentElement.scrollHeight
    const resizeObserver = new ResizeObserver(() => {
      const height = document.documentElement.scrollHeight
      if (Math.abs(height - lastHeight) <= HEIGHT_TOLERANCE_PX) return
      lastHeight = height
      window.clearTimeout(refreshTimer)
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), REFRESH_DEBOUNCE_MS)
    })
    resizeObserver.observe(document.body)

    const handleLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', handleLoad)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('load', handleLoad)
      window.clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [])

  return null
}
