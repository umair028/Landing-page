import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { people } from '@/data/art'
import { testimonials } from '@/data/content'
import { cn } from '@/lib/cn'
import { Avatar } from '@/components/art/Avatar'

/** How long each testimonial stays up before auto-advancing. */
const ROTATE_MS = 6000

/** Acid-yellow testimonial rotator: avatar picker, progress bar, cross-fading quote. */
export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const t = testimonials[active]
  // Pause the progress bar while off-screen or hovered so nobody misses a quote.
  const running = inView && !isHovered

  return (
    <section className="relative overflow-hidden bg-acid-yellow py-24 text-black md:py-32">
      <div
        ref={ref}
        className="container mx-auto max-w-5xl px-6 text-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div data-reveal-children="">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-black/60">Client feedback</p>
          <h2 className="mx-auto max-w-3xl text-[2rem] font-black normal-case leading-[0.95] tracking-[-0.04em] min-[360px]:text-4xl sm:text-6xl">
            Clear communication,
            <br />
            and work that lasts.
          </h2>
          <div
            className="my-10 flex flex-wrap items-center justify-center gap-3 md:my-12 md:gap-5"
            role="tablist"
            aria-label="Testimonials"
          >
            {testimonials.map((x, i) => (
              <button
                key={x.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show testimonial from ${x.name}`}
                onClick={() => setActive(i)}
                className={cn(
                  'relative overflow-hidden rounded-full border-2 border-black transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black',
                  i === active
                    ? 'h-16 w-16 scale-110 shadow-[0_10px_24px_rgba(0,0,0,0.3)]'
                    : 'h-11 w-11 opacity-85 hover:scale-105 hover:opacity-100 md:h-12 md:w-12',
                )}
              >
                <Avatar spec={people[x.person]} className="h-full w-full" />
              </button>
            ))}
          </div>
          <div className="mx-auto -mt-4 mb-10 h-1 w-40 overflow-hidden rounded-full bg-black/15 md:-mt-6 md:mb-12">
            <div
              key={active}
              className="h-full origin-left rounded-full bg-black"
              style={{
                animation: `${ROTATE_MS}ms linear 0s 1 normal forwards ${running ? 'running' : 'paused'} testimonial-progress`,
              }}
              onAnimationEnd={() => setActive((a) => (a + 1) % testimonials.length)}
            />
          </div>
          <div className="mx-auto min-h-[290px] max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="text-2xl font-bold leading-snug md:text-4xl">“{t.quote}”</blockquote>
                <p className="mt-8 text-2xl font-black uppercase tracking-tight">{t.name}</p>
                <p className="mt-1 text-base font-semibold">{t.role}</p>
                <p className="text-base font-medium opacity-70">{t.company}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <Link
          data-reveal=""
          to="/portfolio"
          className="mt-4 inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_14px_30px_rgba(0,0,0,0.24)] transition-transform hover:scale-105"
        >
          See the work
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
