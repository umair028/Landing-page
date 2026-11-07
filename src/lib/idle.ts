/**
 * Small scheduling helpers for keeping start-up work off the critical path.
 *
 * Anything that isn't needed for the first paint (below-the-fold sections, background
 * animation, image preloads) waits until the page has loaded and the main thread is idle,
 * or until the visitor interacts, whichever comes first.
 */

type Cancel = () => void

/** Longest we wait for an idle period before running the callback anyway. */
const IDLE_TIMEOUT_MS = 2000

/** Events that mean the visitor is engaging with the page, so deferred content is needed now. */
const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const

let hasUserInteracted = false

if (typeof window !== 'undefined') {
  const markInteracted = () => {
    hasUserInteracted = true
    INTERACTION_EVENTS.forEach((type) => window.removeEventListener(type, markInteracted))
  }
  INTERACTION_EVENTS.forEach((type) => window.addEventListener(type, markInteracted, { passive: true }))
}

/** True once the visitor has scrolled, clicked, tapped or typed. */
export function hasInteracted(): boolean {
  return hasUserInteracted
}

/** Runs `callback` during the next idle period (falls back to a short timeout on Safari). */
export function onIdle(callback: () => void, timeout = IDLE_TIMEOUT_MS): Cancel {
  if (typeof window.requestIdleCallback === 'function') {
    const handle = window.requestIdleCallback(callback, { timeout })
    return () => window.cancelIdleCallback(handle)
  }
  const handle = setTimeout(callback, 1)
  return () => clearTimeout(handle)
}

/** Runs `callback` once the window `load` event has fired (immediately if it already has). */
export function afterLoad(callback: () => void): Cancel {
  if (document.readyState === 'complete') {
    const handle = window.setTimeout(callback, 0)
    return () => window.clearTimeout(handle)
  }
  window.addEventListener('load', callback, { once: true })
  return () => window.removeEventListener('load', callback)
}

/** Runs `callback` in the first idle period after the page has loaded. */
export function whenIdleAfterLoad(callback: () => void): Cancel {
  let cancelIdle: Cancel = () => {}
  const cancelLoad = afterLoad(() => {
    cancelIdle = onIdle(callback)
  })
  return () => {
    cancelLoad()
    cancelIdle()
  }
}

/** Runs `callback` once, on the visitor's first scroll, click, tap or key press. */
export function onFirstInteraction(callback: () => void): Cancel {
  if (hasUserInteracted) {
    const handle = window.setTimeout(callback, 0)
    return () => window.clearTimeout(handle)
  }
  let fired = false
  const handle = () => {
    if (fired) return
    fired = true
    cancel()
    callback()
  }
  const cancel = () => INTERACTION_EVENTS.forEach((type) => window.removeEventListener(type, handle))
  INTERACTION_EVENTS.forEach((type) => window.addEventListener(type, handle, { passive: true }))
  return cancel
}
