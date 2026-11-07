import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Clapperboard, Crown, Globe, PenTool, Sprout, Star, X, Zap } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { homePricingTabs, type Plan, type PlanGroup, type Tier } from '@/data/pricing'
import { cn } from '@/lib/cn'
import { SectionHeading } from './SectionHeading'
import { SegmentedTabs } from './SegmentedTabs'

const tierStyle: Record<
  Tier,
  { card: string; label: string; icon: string; check: string; blurb: string; rule: string; btn: string; link: string }
> = {
  bronze: {
    card: 'bg-[#1c1c1c] text-white ring-1 ring-white/10 hover:ring-white/25',
    label: 'text-white/65',
    icon: 'bg-white/10 text-primary',
    check: 'bg-primary text-black',
    blurb: 'text-white/70',
    rule: 'bg-white/15',
    btn: 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white hover:text-black focus-visible:outline-white',
    link: 'text-white/55 hover:text-white',
  },
  silver: {
    card: 'bg-accent text-white ring-2 ring-white/20 shadow-[0_30px_80px_rgba(106,61,242,0.45)] hover:shadow-[0_36px_90px_rgba(106,61,242,0.6)] xl:py-10',
    label: 'text-white/65',
    icon: 'bg-white text-accent',
    check: 'bg-white text-accent',
    blurb: 'text-white/70',
    rule: 'bg-white/15',
    btn: 'bg-white text-black hover:bg-primary focus-visible:outline-white',
    link: 'text-white/55 hover:text-white',
  },
  gold: {
    card: 'bg-[#222] text-white ring-1 ring-primary/35 hover:ring-primary/55',
    label: 'text-white/65',
    icon: 'bg-primary/15 text-primary',
    check: 'bg-primary text-black',
    blurb: 'text-white/70',
    rule: 'bg-white/15',
    btn: 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white hover:text-black focus-visible:outline-white',
    link: 'text-white/55 hover:text-white',
  },
  platinum: {
    card: 'bg-acid-yellow text-black ring-1 ring-black/5 hover:shadow-[0_30px_80px_rgba(245,232,46,0.25)]',
    label: 'text-black/70',
    icon: 'bg-black text-acid-yellow',
    check: 'bg-black text-acid-yellow',
    blurb: 'text-black/70',
    rule: 'bg-black/15',
    btn: 'bg-black text-white hover:bg-accent focus-visible:outline-black',
    link: 'text-black/65 hover:text-black',
  },
}
const tierIcon = { bronze: Sprout, silver: Zap, gold: Star, platinum: Crown }

export function PricingCard({ plan, service, index = 0 }: { plan: Plan; service: string; index?: number }) {
  const s = tierStyle[plan.tier]
  const Icon = tierIcon[plan.tier]
  const navigate = useNavigate()
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      className={cn('relative flex min-w-0 flex-col rounded-[22px] p-7 transition-shadow duration-300 md:p-8', s.card)}
    >
      {plan.popular && (
        <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-black shadow-[0_8px_20px_rgba(4,214,109,0.4)]">
          <Star size={12} fill="currentColor" />
          Most popular
        </span>
      )}
      <div className="mb-6 flex items-center justify-between">
        <p className={cn('font-display text-sm font-bold uppercase tracking-wider', s.label)}>{plan.name}</p>
        <span className={cn('grid h-10 w-10 place-items-center rounded-xl', s.icon)}>
          <Icon size={18} strokeWidth={2.5} />
        </span>
      </div>
      <div className="mb-3 flex flex-wrap items-end gap-x-2 gap-y-1">
        <h3 className="text-4xl font-black normal-case tracking-tight md:text-5xl">{plan.price}</h3>
        <span className="mb-1 w-full text-sm font-semibold opacity-60 sm:w-auto">one-time</span>
      </div>
      <p className={cn('max-w-sm text-base font-medium leading-snug', s.blurb)}>{plan.blurb}</p>
      <div className={cn('my-7 h-px', s.rule)} />
      <p className="mb-4 text-sm font-extrabold">What&apos;s included:</p>
      <ul className="mb-10 space-y-3">
        {plan.features.map((f) => {
          const excluded = typeof f !== 'string'
          const text = typeof f === 'string' ? f : f.text
          return (
            <li key={text} className={cn('flex items-start gap-3 text-sm font-semibold', excluded && 'opacity-60')}>
              <span
                className={cn(
                  'mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full',
                  excluded ? 'bg-red-500 text-white' : s.check,
                )}
              >
                {excluded ? <X size={12} strokeWidth={3} /> : <Check size={12} strokeWidth={3.5} />}
              </span>
              <span>{text}</span>
            </li>
          )
        })}
      </ul>
      <div className="mt-auto">
        <button
          type="button"
          onClick={() =>
            navigate(`/brief?${new URLSearchParams({ service, package: `${plan.name} (${plan.price})` })}`)
          }
          className={cn(
            'group flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 font-display text-sm font-bold uppercase tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
            s.btn,
          )}
        >
          Start Now
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <Link
          to="/contact"
          className={cn('mt-3 block text-center text-xs font-semibold underline-offset-4 hover:underline', s.link)}
        >
          Not sure? Ask us first
        </Link>
      </div>
    </motion.article>
  )
}

function CardGrid({ plans, service, k }: { plans: Plan[]; service: string; k: string }) {
  return (
    <div data-reveal="scale">
      <AnimatePresence mode="wait">
        <motion.div
          key={k}
          className="relative mx-auto grid max-w-[1320px] items-start gap-6 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4"
        >
          {plans.map((p, i) => (
            <PricingCard key={p.name} plan={p} service={service} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const tabIcons = { logo: PenTool, web: Globe, motion: Clapperboard }

/** Homepage pricing: tabbed between logo, website and animation packages. */
export function PricingSection() {
  const [tab, setTab] = useState('logo')
  const current = homePricingTabs.find((t) => t.id === tab)!
  return (
    <section id="pricing" className="relative overflow-hidden bg-[#080808] px-5 py-24 text-white md:px-8 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/25 blur-[120px]" />
      <SectionHeading
        className="relative mx-auto mb-14 max-w-2xl text-center md:mb-20"
        eyebrow="Pricing"
        title={
          <>
            Choose your starting point.
            <br />
            Know the scope upfront.
          </>
        }
        intro="Fixed packages for logos, websites and animation. Higher tiers add depth, never surprise fees. Revisions match the card you pick."
      />
      <div data-reveal="" className="relative mb-16">
        <SegmentedTabs
          tabs={homePricingTabs.map((t) => ({
            id: t.id,
            label: t.label,
            icon: tabIcons[t.id as keyof typeof tabIcons],
          }))}
          value={tab}
          onChange={setTab}
        />
      </div>
      <CardGrid plans={current.plans} service={current.service} k={tab} />
      <div className="relative mx-auto mt-12 flex max-w-xl flex-col items-center gap-4 text-center">
        <Link
          to="/pricing"
          className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-5 py-3 text-[13px] font-bold uppercase tracking-wide min-[400px]:px-6 min-[400px]:text-sm text-white ring-1 ring-white/20 transition-colors hover:bg-white hover:text-black"
        >
          See all packages &amp; bundles
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <p className="text-sm text-white/60">
          Brand identity or a custom scope?{' '}
          <Link to="/brief" className="font-semibold text-white underline underline-offset-4 hover:text-primary">
            Start a brief and we will recommend the right fit
          </Link>
        </p>
      </div>
    </section>
  )
}

/** One package family on the full pricing page. */
export function PricingGroupSection({ group, alt }: { group: PlanGroup; alt: boolean }) {
  return (
    <section
      id={group.id}
      className={cn(
        'relative scroll-mt-24 overflow-hidden px-5 py-24 text-white md:px-8 md:py-32',
        alt ? 'bg-[#111111]' : 'bg-[#080808]',
      )}
    >
      {!alt && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/20 blur-[120px]" />
      )}
      <SectionHeading
        className="relative mx-auto mb-14 max-w-2xl text-center md:mb-20"
        eyebrow={group.eyebrow ?? group.label + ' packages'}
        title={group.title}
        intro={group.description}
      />
      <CardGrid plans={group.plans} service={group.service} k={group.id} />
    </section>
  )
}
