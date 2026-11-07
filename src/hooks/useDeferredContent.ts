import { startTransition, useEffect, useState, type RefObject } from 'react'
import { hasInteracted, onFirstInteraction, onIdle, whenIdleAfterLoad } from '@/lib/idle'

/*
 * State updates here are wrapped in `startTransition` so React renders the new content
 * in small, interruptible slices instead of one long task that would block input.
 */

/** How far ahead of the viewport the next block is mounted. */
const LOOKAHEAD_MARGIN = '600px 0px'

/**
 * Returns true once deferred (below-the-fold) content should start loading: after the
 * page has loaded and gone idle, or straight away when the visitor interacts or the URL
 * points at an in-page `#hash`.
 */
export function useDeferredReady(): boolean {
  const [ready, setReady] = useState(() => hasInteracted() || window.location.hash.length > 1)

  useEffect(() => {
    if (ready) return
    const show = () => startTransition(() => setReady(true))
    const cancelIdle = whenIdleAfterLoad(show)
    const cancelInteraction = onFirstInteraction(show)
    return () => {
      cancelIdle()
      cancelInteraction()
    }
  }, [ready])

  return ready
}

/**
 * Mounts `total` blocks progressively so no single render blocks input:
 *
 * - the next block mounts whenever `sentinelRef` (placed after the last mounted block)
 *   comes within {@link LOOKAHEAD_MARGIN} of the viewport;
 * - once the visitor has interacted, the rest follow one per idle period, so in-page
 *   links and scroll reveals have every section in place shortly after.
 *
 * @returns how many blocks should currently be rendered.
 */
export function useProgressiveCount(total: number, sentinelRef: RefObject<Element>): number {
  const [count, setCount] = useState(() => (window.location.hash.length > 1 ? total : 0))
  const [engaged, setEngaged] = useState(hasInteracted)

  useEffect(() => {
    if (engaged) return
    return onFirstInteraction(() => setEngaged(true))
  }, [engaged])

  useEffect(() => {
    if (count >= total) return
    const next = () => startTransition(() => setCount((current) => Math.min(total, current + 1)))

    // A fresh observer per step reports the sentinel's current position straight away,
    // so a tall viewport keeps mounting until the sentinel is out of range.
    let observer: IntersectionObserver | null = null
    const sentinel = sentinelRef.current
    if (sentinel) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          observer?.disconnect()
          next()
        },
        { rootMargin: LOOKAHEAD_MARGIN },
      )
      observer.observe(sentinel)
    }
    const cancelIdle = engaged ? onIdle(next) : () => {}

    return () => {
      observer?.disconnect()
      cancelIdle()
    }
  }, [count, total, engaged, sentinelRef])

  return count
}
