import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, ChevronDown, Quote, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CtaSection, PageHero } from '../components/shared/Sections'
import { SegmentedTabs } from '../components/shared/SegmentedTabs'
import { site } from '../config/site'
import { reviews, reviewTabs } from '../data/content'
import { usePageTitle } from '../hooks/usePageTitle'

const PAGE = 12
const tints = ['bg-[#0b1f14] text-primary', 'bg-accent text-white', 'bg-acid-yellow text-black', 'bg-primary text-black']

export default function Reviews() {
  usePageTitle('Client Reviews')
  const [tab, setTab] = useState('all')
  const [shown, setShown] = useState(PAGE)
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: reviews.length }
    reviews.forEach((r) => (c[r.category] = (c[r.category] ?? 0) + 1))
    return c
  }, [])
  const list = tab === 'all' ? reviews : reviews.filter((r) => r.category === tab)
  const visible = list.slice(0, shown)

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Real clients. Real results."
        intro="Verified feedback from founders and teams we have designed for. Rated 4.9 out of 5 across independent review platforms."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-black shadow-lg">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={16} className="text-amber-400" fill="currentColor" />
            ))}
            <span className="ml-2 text-sm font-black">4.9 / 5</span>
          </span>
          <span className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-bold ring-1 ring-white/25">{reviews.length}+ verified reviews</span>
        </div>
      </PageHero>
      <section className="bg-[#f4f6f3] px-3 pb-24 pt-12 sm:px-6 md:pb-32 md:pt-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <SegmentedTabs
              tone="forest"
              tabs={reviewTabs.map((t) => ({ ...t, count: counts[t.id] ?? 0 }))}
              value={tab}
              onChange={(id) => {
                setTab(id)
                setShown(PAGE)
              }}
            />
          </div>
          <p className="mb-6 text-center text-sm font-semibold text-black/50">
            Showing {visible.length} of {list.length} reviews
          </p>
          <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            <AnimatePresence initial={false}>
              {visible.map((r, i) => (
                <motion.article
                  key={`${tab}-${r.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, delay: (i % PAGE) * 0.03 }}
                  className="group relative mb-5 break-inside-avoid rounded-2xl bg-white p-6 text-black shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.07] transition-transform duration-300 hover:-translate-y-1"
                >
                  <Quote size={28} className="absolute right-5 top-5 text-black/10 transition-colors group-hover:text-primary/40" fill="currentColor" />
                  <header className="flex items-center gap-3 pr-10">
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-black ${tints[r.id % tints.length]}`}>
                      {r.name
                        .split(' ')
                        .map((p) => p[0])
                        .join('')}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-black normal-case tracking-tight">{r.name}</h3>
                      <p className="truncate text-xs font-medium text-black/55">
                        {r.source} · {r.date}
                      </p>
                    </div>
                  </header>
                  <p className="mt-4 text-[15px] leading-relaxed text-black/75">{r.text.replace('them', site.shortName)}</p>
                  <footer className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-black/[0.06] pt-4 text-xs font-semibold text-black/50">
                    <span className="flex items-center gap-0.5 text-amber-400">
                      {[0, 1, 2, 3, 4].map((k) => (
                        <Star key={k} size={14} fill="currentColor" />
                      ))}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700">
                      <BadgeCheck size={14} />
                      Verified review
                    </span>
                  </footer>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          {visible.length < list.length && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShown((s) => s + PAGE)}
                className="group inline-flex items-center gap-2 rounded-full bg-[#0b1f14] px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] transition-colors hover:bg-black"
              >
                Show more reviews <span className="text-primary">({list.length - visible.length})</span>
                <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          )}
        </div>
      </section>
      <CtaSection eyebrow="Join them" title={`Ready for a ${site.shortName} brand of your own?`} text="Tell us about your business in a short brief. Fixed quote within 24 hours." secondary={{ label: 'See the work', to: '/portfolio' }} />
    </>
  )
}
