/**
 * Central GSAP entry point. Import `gsap` and `ScrollTrigger` from here rather than
 * from the package so the plugin is registered exactly once.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/** True when the visitor has asked the OS to minimise non-essential motion. */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches
}
