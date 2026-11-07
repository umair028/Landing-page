import { useEffect, useState } from 'react'

interface TypewriterOptions {
  /** Freeze on the current frame, e.g. while the user is typing in the field. */
  paused?: boolean
  /** Delay between typed characters. */
  typeMs?: number
  /** Delay between deleted characters. */
  deleteMs?: number
  /** How long a fully typed phrase stays on screen. */
  holdMs?: number
}

/**
 * Cycles through `phrases` with a type, hold, delete rhythm and returns the text
 * to render for the current frame.
 *
 * Keep `phrases` referentially stable (module scope or `useMemo`), otherwise the
 * effect restarts on every render.
 */
export function useTypewriter(
  phrases: string[],
  { paused = false, typeMs = 70, deleteMs = 35, holdMs = 1600 }: TypewriterOptions = {},
): string {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (paused) return

    const phrase = phrases[index % phrases.length]

    // Finished deleting: move on to the next phrase on the following render.
    if (isDeleting && text === '') {
      setIsDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
      return
    }

    let timer: number
    if (!isDeleting && text === phrase) {
      timer = window.setTimeout(() => setIsDeleting(true), holdMs)
    } else {
      const nextLength = text.length + (isDeleting ? -1 : 1)
      timer = window.setTimeout(() => setText(phrase.slice(0, nextLength)), isDeleting ? deleteMs : typeMs)
    }

    return () => window.clearTimeout(timer)
  }, [text, isDeleting, index, paused, phrases, typeMs, deleteMs, holdMs])

  return text
}
