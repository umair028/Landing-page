import Lenis from 'lenis'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { prefersReducedMotion, ScrollTrigger } from '@/lib/gsap'
import { getLenis, setLenis } from '@/lib/scroll'

/** Offset applied when jumping to a `#hash` target, to clear the fixed header. */
const HASH_SCROLL_OFFSET = -100

/** Starts Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync with it. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const instance = new Lenis({
      lerp: 0.18,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
    })
    setLenis(instance)
    instance.on('scroll', () => ScrollTrigger.update())

    let frameId = 0
    const raf = (time: number) => {
      instance.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return null
}

/** Resets scroll to the top, or to the `#hash` target, on every route change. */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const lenis = getLenis()

    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        requestAnimationFrame(() => {
          if (lenis) lenis.scrollTo(target, { offset: HASH_SCROLL_OFFSET })
          else target.scrollIntoView()
        })
        return
      }
    }

    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
