import { useEffect } from 'react'
import { prefersReducedMotion } from '@/lib/gsap'

/*
 * Coordinates a group of `CrossfadeCycle` instances so they take turns changing
 * instead of all flipping at the same moment. Each cycler subscribes to a named
 * channel and the conductor fires a few channels per tick.
 */

type Listener = () => void
const channels = new Map<string, Set<Listener>>()

/** Registers `listener` to run whenever the conductor picks `channel`. Returns an unsubscribe function. */
export function subscribeToChannel(channel: string, listener: Listener): () => void {
  let listeners = channels.get(channel)
  if (!listeners) {
    listeners = new Set()
    channels.set(channel, listeners)
  }
  listeners.add(listener)
  return () => {
    channels.get(channel)?.delete(listener)
  }
}

/** Fisher-Yates shuffle that returns a new array. */
function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** Weighted batch sizes: usually 2 or 3 cards change together, occasionally 4 or 5. */
const BATCH_WEIGHTS: Array<[size: number, weight: number]> = [
  [2, 30],
  [3, 35],
  [4, 20],
  [5, 15],
]

function pickBatchSize(weights: Array<[size: number, weight: number]>): number {
  const total = weights.reduce((sum, [, weight]) => sum + weight, 0)
  let roll = Math.random() * total
  for (const [size, weight] of weights) {
    roll -= weight
    if (roll < 0) return size
  }
  return weights[0][0]
}

/**
 * Every `everyMs`, picks a random group of cards (size drawn from `weights`) and changes
 * them together. Cards from the previous group are picked last, so the same cards
 * don't keep repeating and every card keeps getting turns.
 */
export function useCycleConductor(
  names: string[],
  { everyMs = 2200, weights = BATCH_WEIGHTS, startDelayMs = 1800 } = {},
) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    let lastBatch: string[] = []
    const tick = () => {
      if (document.hidden) return
      const size = Math.min(names.length, pickBatchSize(weights))
      const rested = shuffle(names.filter((n) => !lastBatch.includes(n)))
      const batch = rested.slice(0, size)
      if (batch.length < size) batch.push(...shuffle(lastBatch).slice(0, size - batch.length))
      lastBatch = batch
      batch.forEach((name) => channels.get(name)?.forEach((fn) => fn()))
    }
    let interval = 0
    const start = window.setTimeout(() => {
      tick()
      interval = window.setInterval(tick, everyMs)
    }, startDelayMs)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [names, everyMs, weights, startDelayMs])
}
