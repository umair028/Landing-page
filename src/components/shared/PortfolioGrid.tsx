import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Film, Globe, LayoutGrid, Maximize2, PenTool, Palette, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { portfolio, portfolioTabs, type PortfolioItem } from '@/data/portfolio'
import { PortfolioArt } from '@/components/art/PortfolioArt'
import { getLenis } from '@/lib/scroll'
import { SegmentedTabs } from './SegmentedTabs'

const tabIcons = { all: LayoutGrid, logo: PenTool, animated: Film, brand: Palette, web: Globe }
const categoryLabels: Record<PortfolioItem['category'], string> = {
  logo: 'logo design',
  animated: 'animated logo',
  brand: 'brand identity',
  web: 'website design',
}

interface LightboxProps {
  items: PortfolioItem[]
  index: number
  onClose: () => void
  /** Step through `items` by `delta` (wraps around). */
  onNav: (delta: number) => void
}

/** Full-screen viewer for a portfolio piece, with keyboard navigation and scroll lock. */
function Lightbox({ items, index, onClose, onNav }: LightboxProps) {
  const item = items[index]
  useEffect(() => {
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onNav])

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-black md:right-8 md:top-8"
      >
        <X size={22} />
      </button>
      <button
        type="button"
        onClick={() => onNav(-1)}
        aria-label="Previous"
        className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-black md:left-8"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={() => onNav(1)}
        aria-label="Next"
        className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-black md:right-8"
      >
        <ChevronRight size={22} />
      </button>
      <AnimatePresence mode="wait">
        <motion.figure
          key={item.id}
          className="w-full max-w-4xl"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-[#f7f7f5] shadow-2xl">
            <PortfolioArt item={item} />
          </div>
          <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-3 text-white">
            <div>
              <p className="text-xl font-black tracking-tight md:text-2xl">{item.title}</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {categoryLabels[item.category]}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-white/50">
                {index + 1} / {items.length}
              </span>
              <Link
                to="/brief"
                onClick={onClose}
                className="rounded-full bg-primary px-5 py-2.5 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-white"
              >
                Start something similar
              </Link>
            </div>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  )
}

interface PortfolioGridProps {
  initial?: 'all' | PortfolioItem['category']
  /** Show this many items, then a "Load more" button. Defaults to everything. */
  limit?: number
}

/** Filterable portfolio grid with category tabs and a lightbox. */
export function PortfolioGrid({ initial = 'logo', limit }: PortfolioGridProps) {
  const [tab, setTab] = useState<string>(initial)
  const [open, setOpen] = useState<number | null>(null)
  const [shown, setShown] = useState(limit ?? Infinity)

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: portfolio.length }
    portfolio.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1))
    return c
  }, [])
  const filtered = useMemo(() => (tab === 'all' ? portfolio : portfolio.filter((p) => p.category === tab)), [tab])
  const visible = filtered.slice(0, shown)

  const nav = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + filtered.length) % filtered.length)),
    [filtered.length],
  )
  const close = useCallback(() => setOpen(null), [])

  return (
    <>
      <div data-reveal="" className="mb-10">
        <SegmentedTabs
          tabs={portfolioTabs.map((t) => ({ ...t, icon: tabIcons[t.id], count: counts[t.id] }))}
          value={tab}
          onChange={(id) => {
            setTab(id)
            setShown(limit ?? Infinity)
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              layout
              data-cursor="View"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 5) * 0.05 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f7f7f5] text-left shadow-[0_7px_18px_rgba(0,0,0,0.08)] outline-none ring-primary focus-visible:ring-2"
              aria-label={`Open ${item.title}`}
            >
              <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                <PortfolioArt item={item} />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-white">{item.title}</p>
                <Maximize2 size={14} className="text-white" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      {visible.length < filtered.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShown((s) => s + (limit ?? 15))}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-widest text-white ring-1 ring-white/20 transition-colors hover:bg-white hover:text-black"
          >
            Load more work <span className="text-primary">({filtered.length - visible.length})</span>
          </button>
        </div>
      )}
      <AnimatePresence>
        {open !== null && <Lightbox items={filtered} index={open} onClose={close} onNav={nav} />}
      </AnimatePresence>
    </>
  )
}
