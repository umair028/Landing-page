import type Lenis from 'lenis'

const ANCHOR_SCROLL_OFFSET = -20

/**
 * Smooth scrolling is a page-wide singleton, so the active Lenis instance is kept at
 * module level. `SmoothScroll` owns its lifecycle; everything else reads it here.
 */
let lenis: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenis
}

export function setLenis(instance: Lenis | null): void {
  lenis = instance
}

/**
 * Smoothly scrolls to a selector, element or pixel offset. Uses Lenis when it's
 * running and falls back to native smooth scrolling otherwise.
 */
export function smoothScrollTo(target: string | HTMLElement | number): void {
  const destination = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (destination === null) return

  if (lenis) {
    lenis.scrollTo(destination, { offset: typeof destination === 'number' ? 0 : ANCHOR_SCROLL_OFFSET })
  } else if (typeof destination === 'number') {
    window.scrollTo({ top: destination, behavior: 'smooth' })
  } else {
    destination.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
