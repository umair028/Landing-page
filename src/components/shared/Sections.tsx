import { ArrowRight, Compass, Lightbulb, PackageCheck, Plus, SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { faqs, processSteps } from '@/data/content'
import { cn } from '@/lib/cn'
import { prefersReducedMotion } from '@/lib/gsap'
import { HeroBackdrop } from './HeroBackdrop'
import { MotionLink } from './MotionLink'
import { SectionHeading } from './SectionHeading'

/* ---------- FAQ ---------- */

const FAQ_CLOSE = { duration: 280, easing: 'cubic-bezier(.4,0,.2,1)' }
const FAQ_OPEN = { duration: 340, easing: 'cubic-bezier(.16,1,.3,1)' }

interface FaqItemProps {
  q: string
  a: string
}

/**
 * Native `<details>` disclosure with an animated height. We intercept the summary
 * click so the panel can animate closed before `open` is removed; with reduced
 * motion the browser's default toggle is left alone.
 */
function FaqItem({ q, a }: FaqItemProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const handleToggle = (event: MouseEvent<HTMLElement>) => {
    const details = detailsRef.current
    const body = bodyRef.current
    if (!details || !body || prefersReducedMotion()) return

    event.preventDefault()
    const collapsed = { height: '0px', opacity: 0 }

    if (details.open) {
      details.classList.remove('is-open')
      const expanded = { height: `${body.scrollHeight}px`, opacity: 1 }
      body.animate([expanded, collapsed], FAQ_CLOSE).onfinish = () => {
        details.open = false
      }
    } else {
      // Open first: a closed <details> doesn't lay out its content, so there's no height to measure yet.
      details.open = true
      details.classList.add('is-open')
      const expanded = { height: `${body.scrollHeight}px`, opacity: 1 }
      body.animate([collapsed, expanded], FAQ_OPEN)
    }
  }

  return (
    <details ref={detailsRef} data-reveal="" className="group cursor-pointer py-8 [&.is-open_svg]:rotate-45">
      <summary
        onClick={handleToggle}
        className="flex list-none items-center justify-between gap-4 text-xl font-black uppercase tracking-tighter md:text-2xl"
      >
        {q}
        <Plus size={28} className="flex-none transition-transform duration-300 group-open:rotate-45" />
      </summary>
      <div ref={bodyRef} className="overflow-hidden">
        <p className="mt-4 text-lg text-white/60">{a}</p>
      </div>
    </details>
  )
}

export function FaqSection({ items = faqs }: { items?: typeof faqs }) {
  return (
    <section id="faq" className="bg-[#111111] py-24 text-white md:py-32">
      <div className="container mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers before you commit."
          intro="Price, timeline, revisions, ownership, and what happens after you hit send."
        />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {items.map((f) => (
            <FaqItem key={f.q} {...f} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <MotionLink
            to="/brief"
            className="relative inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-black uppercase tracking-tighter text-black transition-colors hover:bg-primary"
          >
            Start Your Project Brief
          </MotionLink>
        </div>
      </div>
    </section>
  )
}

/* ---------- CTA ---------- */

export function CtaSection({
  eyebrow = 'Ready when you are',
  title = 'Tell us what you are building.',
  text = 'Six quick questions. A fixed quote within 24 hours. No obligation.',
  secondary = { label: 'Ask a question first', to: '/contact' },
}: {
  eyebrow?: string
  title?: ReactNode
  text?: string
  secondary?: { label: string; to: string }
}) {
  return (
    <section id="cta" className="bg-acid-yellow py-24 text-black md:py-32">
      <div data-reveal-children="" className="container mx-auto px-6 text-center">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-black/60">{eyebrow}</p>
        <h2 className="mx-auto max-w-4xl text-4xl font-black normal-case leading-[0.95] tracking-[-0.04em] sm:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mb-10 mt-6 max-w-xl text-sm font-medium leading-relaxed text-black/65 md:text-base">
          {text}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/brief"
            className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-black px-6 py-4 text-[13px] font-black uppercase tracking-tight text-white shadow-2xl transition-colors hover:bg-accent min-[400px]:gap-3 min-[400px]:px-8 min-[400px]:text-sm sm:px-10 sm:py-5 sm:text-base md:text-lg"
          >
            Start Your Project Brief
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to={secondary.to}
            className="text-sm font-bold uppercase tracking-widest text-black/70 underline-offset-4 hover:text-black hover:underline"
          >
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- Process ---------- */

const stepIcons = [Compass, Lightbulb, SlidersHorizontal, PackageCheck]

export function ProcessSection({ bg = 'bg-[#111111]' }: { bg?: string }) {
  return (
    <section id="process" className={cn('px-5 py-24 text-white md:py-32', bg)}>
      <SectionHeading
        eyebrow="Our process"
        title="Four steps. No mystery."
        intro="First logo concepts in 24 hours. Most logo projects finish in 3–5 days. You always know what we need from you at each stage."
      />
      <div data-reveal-children="scale" className="relative mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((s, i) => {
          const Icon = stepIcons[i]
          return (
            <article
              key={s.n}
              className="group relative rounded-[22px] bg-white/[0.04] p-7 ring-1 ring-white/10 transition-colors hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-black transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon size={22} strokeWidth={2.25} />
                </span>
                <span className="font-mono text-sm font-medium text-white/35">{s.n}</span>
              </div>
              <h3 className="mt-8 text-2xl font-black normal-case tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{s.text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Inner-page hero ---------- */

const rise = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  side,
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
  side?: [ReactNode, ReactNode]
}) {
  return (
    <section className="relative overflow-hidden bg-primary px-5 pb-20 pt-36 text-white md:pb-28 md:pt-44">
      <HeroBackdrop />
      {side && (
        <>
          <div className="pointer-events-none absolute left-[3.5%] top-[26%] hidden h-[9vw] w-[12vw] overflow-hidden rounded-[14px] border-2 border-white bg-white shadow-[0_24px_60px_rgba(0,0,0,0.25)] lg:block">
            {side[0]}
          </div>
          <div className="pointer-events-none absolute right-[3.5%] top-[52%] hidden h-[9vw] w-[12vw] overflow-hidden rounded-[14px] border-2 border-white bg-white shadow-[0_24px_60px_rgba(0,0,0,0.25)] lg:block">
            {side[1]}
          </div>
        </>
      )}
      <motion.div
        className="relative mx-auto flex max-w-5xl flex-col items-center text-center"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }}
      >
        <motion.p
          variants={rise}
          className="mb-5 flex items-center gap-3 whitespace-nowrap text-xs font-bold uppercase tracking-[0.3em] text-white/90 sm:tracking-[0.42em] md:gap-4 md:text-sm"
        >
          <span className="hidden h-px w-8 bg-white/60 sm:block md:w-12" />
          {eyebrow}
          <span className="hidden h-px w-8 bg-white/60 sm:block md:w-12" />
        </motion.p>
        <motion.h1
          variants={rise}
          className="font-display text-[clamp(2.5rem,4.8vw,4.75rem)] font-[900] normal-case leading-[1] tracking-[-0.055em] [text-shadow:0_4px_24px_rgba(0,0,0,0.12)] [word-spacing:0.12em]"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            variants={rise}
            className="mt-6 max-w-xl text-base font-medium leading-snug text-white/95 md:mt-8 md:text-xl"
          >
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div variants={rise} className="mt-8 md:mt-10">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
