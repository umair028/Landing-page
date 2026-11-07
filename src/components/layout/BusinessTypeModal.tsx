import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { afterLoad } from '@/lib/idle'

type BusinessType = 'new' | 'existing' | 'dismissed'

const STORAGE_KEY = 'business-type'
const OPEN_DELAY_MS = 1600

/** sessionStorage can throw in private mode or when storage is blocked, so guard every access. */
function readStoredType(): string | null {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function storeType(value: BusinessType): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Storage unavailable; the prompt will simply show again next visit.
  }
}

/**
 * First-visit qualifier asking whether the visitor runs a new or existing business.
 * The answer (or a dismissal) is remembered for the rest of the browser session.
 */
export function BusinessTypeModal() {
  const [isOpen, setIsOpen] = useState(false)

  const choose = useCallback((value: BusinessType) => {
    storeType(value)
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (readStoredType()) return
    let timer = 0
    const cancelLoad = afterLoad(() => {
      timer = window.setTimeout(() => setIsOpen(true), OPEN_DELAY_MS)
    })
    return () => {
      cancelLoad()
      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') choose('dismissed')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, choose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) choose('dismissed')
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="business-type-title"
            className="w-full max-w-[22rem] rounded-[1.75rem] bg-white p-6 text-center text-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-black/10"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            <h2 id="business-type-title" className="text-xl font-bold leading-tight tracking-tight">
              Are you a new or existing business?
            </h2>
            <div className="mt-5 flex gap-2.5">
              <button
                type="button"
                autoFocus
                onClick={() => choose('new')}
                className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-[linear-gradient(100deg,#22c55e_0%,#16a34a_55%,#15803d_100%)] px-2 text-center text-sm font-bold leading-tight text-white shadow-[0_12px_24px_-10px_rgba(21,128,61,0.65)] transition-[filter] hover:brightness-110 active:brightness-95"
              >
                New Business
              </button>
              <button
                type="button"
                onClick={() => choose('existing')}
                className="flex h-14 flex-1 items-center justify-center rounded-2xl border border-black/15 bg-white px-2 text-center text-sm font-bold leading-tight text-black transition-colors hover:bg-black/5 active:bg-black/10"
              >
                Existing Business
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
