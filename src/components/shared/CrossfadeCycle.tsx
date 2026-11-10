import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { subscribeToChannel } from '@/hooks/useCycleConductor'
import { prefersReducedMotion } from '@/lib/gsap'
import { hasPlayedThrough } from '@/lib/video'

/** How long a slide stays fully visible in self-timed mode. */
const HOLD_MS = 3000
/** Duration and curve of each slide-to-slide dissolve. */
const FADE_MS = 2000
const FADE_EASING = 'cubic-bezier(0.45, 0, 0.55, 1)'
/** Upper bound for `nextFrame`, in case rAF is throttled. */
const FRAME_FALLBACK_MS = 60
/** Longest a video slide is held waiting for its first full play, in case it stalls or never starts. */
const MAX_VIDEO_HOLD_MS = 30000

/**
 * Resolves after the browser has painted (two rAFs). Falls back to a timeout so it
 * never hangs when frames are paused, e.g. in a background tab.
 */
const nextFrame = () =>
  new Promise<void>((r) => {
    let done = false
    const finish = () => {
      if (!done) {
        done = true
        r()
      }
    }
    requestAnimationFrame(() => requestAnimationFrame(finish))
    window.setTimeout(finish, FRAME_FALLBACK_MS)
  })
const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

/**
 * Endless slideshow: fades the next slide in over the current one, then promotes it.
 * - With `channel`, it advances only when a conductor calls that channel (cards take turns).
 * - Without it, it runs on its own timer (hold, then fade).
 */
export function CrossfadeCycle({
  slides,
  channel,
  initialDelayMs = 0,
  holdMs = HOLD_MS,
  fadeMs = FADE_MS,
  label,
}: {
  slides: ReactNode[]
  channel?: string
  initialDelayMs?: number
  holdMs?: number
  fadeMs?: number
  label?: string
}) {
  const [base, setBase] = useState(0)
  const [overlay, setOverlay] = useState<number | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const baseRef = useRef<HTMLDivElement>(null)
  /** When the current slide became the visible one. */
  const shownAtRef = useRef(Date.now())
  const indexRef = useRef(0)
  const busy = useRef(false)
  const alive = useRef(true)

  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
    }
  }, [])

  const advance = useCallback(async () => {
    if (busy.current || slides.length < 2) return
    // Let an animated logo finish its first full play before swapping it out; this turn is simply skipped.
    const video = baseRef.current?.querySelector('video')
    if (video && !hasPlayedThrough(video) && !video.error && Date.now() - shownAtRef.current < MAX_VIDEO_HOLD_MS) {
      return
    }
    busy.current = true
    const next = (indexRef.current + 1) % slides.length

    // Mount the incoming slide synchronously (fully transparent), then fade it in with
    // the Web Animations API. Unlike a CSS transition this never gets skipped when the
    // first paint of a heavy slide is slow, so every change is a full, gentle fade.
    flushSync(() => setOverlay(next))
    const el = overlayRef.current
    if (el && alive.current) {
      const anim = el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: fadeMs,
        easing: FADE_EASING,
        fill: 'forwards',
      })
      await Promise.race([anim.finished.catch(() => undefined), sleep(fadeMs + 400)])
    }
    if (!alive.current) return
    indexRef.current = next
    flushSync(() => setBase(next))
    shownAtRef.current = Date.now()
    await nextFrame()
    if (!alive.current) return
    setOverlay(null)
    busy.current = false
  }, [slides.length, fadeMs])

  // Conducted mode
  useEffect(() => {
    if (!channel) return
    return subscribeToChannel(channel, advance)
  }, [channel, advance])

  // Self-timed mode
  useEffect(() => {
    if (channel || slides.length < 2 || prefersReducedMotion()) return
    let cancelled = false
    ;(async () => {
      await sleep(initialDelayMs)
      while (!cancelled) {
        await sleep(holdMs)
        if (cancelled) return
        if (!document.hidden) await advance()
      }
    })()
    return () => {
      cancelled = true
    }
  }, [channel, slides.length, initialDelayMs, holdMs, advance])

  return (
    <div className="relative h-full w-full overflow-hidden" role="img" aria-label={label}>
      <div ref={baseRef} className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        {slides[base]}
      </div>
      {overlay !== null && (
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ zIndex: 2, opacity: 0, willChange: 'opacity' }}
        >
          {slides[overlay]}
        </div>
      )}
    </div>
  )
}
