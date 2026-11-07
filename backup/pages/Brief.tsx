import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Clapperboard, Globe, Layers, Loader2, Palette, PenTool, Timer } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BrandLogo } from '../components/art/BrandLogo'
import { usePageTitle } from '../hooks/usePageTitle'
import { cn } from '../lib/cn'
import { isEmail, submitLead } from '../lib/submit'

const STORAGE = 'project-brief'
const COUNTDOWN = 3 * 60

type Answers = {
  company: string
  service: string
  industry: string
  about: string
  styles: string[]
  timeline: string
  budget: string
  name: string
  email: string
  phone: string
}
const empty: Answers = { company: '', service: '', industry: '', about: '', styles: [], timeline: '', budget: '', name: '', email: '', phone: '' }

const serviceOptions = [
  { id: 'logo', label: 'Logo Design', icon: PenTool },
  { id: 'brand', label: 'Brand Identity', icon: Palette },
  { id: 'web', label: 'Website Design', icon: Globe },
  { id: 'motion', label: 'Video Animation', icon: Clapperboard },
  { id: 'bundle', label: 'Logo + Website Bundle', icon: Layers },
]
const styleOptions = ['Modern', 'Minimal', 'Bold', 'Playful', 'Elegant', 'Vintage', 'Techy', 'Organic', 'Luxury', 'Friendly']
const timelineOptions = ['As soon as possible', 'Within a week', '2–4 weeks', 'Flexible']
const budgetOptions = ['Under $250', '$250 – $500', '$500 – $1,500', '$1,500+']

function Choice({ on, onClick, children, className = '' }: { on: boolean; onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-bold transition',
        on ? 'bg-primary text-black shadow-[0_10px_24px_-10px_rgba(4,214,109,0.7)]' : 'bg-black/[0.04] text-black ring-1 ring-black/10 hover:bg-black/[0.07]',
        className,
      )}
    >
      {children}
    </button>
  )
}

const input =
  'w-full rounded-2xl bg-black/[0.04] px-5 py-4 text-base font-medium text-black placeholder:text-black/35 outline-none ring-1 ring-black/10 transition focus:bg-white focus:ring-2 focus:ring-primary'

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => {
    const t = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(t)
  }, [])
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  return `00:${mm}:${ss}`
}

export default function Brief() {
  usePageTitle('Project Brief | Start Your Logo or Brand Project')
  const [params] = useSearchParams()
  const [a, setA] = useState<Answers>(() => {
    let saved: Partial<Answers> = {}
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE) || '{}')
    } catch {
      /* ignore */
    }
    const svc = params.get('service') ?? ''
    return {
      ...empty,
      ...saved,
      company: params.get('company') || saved.company || '',
      service: serviceOptions.some((s) => s.id === svc) ? svc : saved.service || '',
    }
  })
  const pkg = params.get('package')
  const [step, setStep] = useState(() => (params.get('company') ? 1 : 0))
  const [dir, setDir] = useState(1)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const clock = useCountdown(COUNTDOWN)
  const firstField = useRef<HTMLElement | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(a))
  }, [a])
  useEffect(() => {
    const t = window.setTimeout(() => firstField.current?.focus({ preventScroll: true }), 350)
    return () => window.clearTimeout(t)
  }, [step])

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => {
    setA((x) => ({ ...x, [k]: v }))
    setError('')
  }

  const steps = useMemo(
    () => [
      {
        title: "What's your business called?",
        short: (
          <>
            Enter Your Company <span className="text-emerald-600">Name</span>
          </>
        ),
        valid: () => (a.company.trim().length >= 2 ? '' : 'Please enter your business name.'),
        body: (
          <input
            ref={(el) => (firstField.current = el)}
            id="brief-company"
            name="company"
            autoComplete="organization"
            placeholder="e.g. Northline Coffee Co."
            value={a.company}
            onChange={(e) => set('company', e.target.value)}
            className={input}
          />
        ),
      },
      {
        title: 'What can we help with?',
        short: (
          <>
            Choose a <span className="text-emerald-600">Service</span>
          </>
        ),
        valid: () => (a.service ? '' : 'Pick the service you need.'),
        body: (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {serviceOptions.map((s) => (
              <Choice key={s.id} on={a.service === s.id} onClick={() => set('service', s.id)} className={s.id === 'bundle' ? 'sm:col-span-2' : ''}>
                <s.icon size={18} />
                {s.label}
              </Choice>
            ))}
          </div>
        ),
      },
      {
        title: 'Tell us about the business.',
        short: (
          <>
            About Your <span className="text-emerald-600">Business</span>
          </>
        ),
        valid: () => (a.industry.trim().length < 2 ? 'Add your industry.' : a.about.trim().length < 10 ? 'Add a short description (10+ characters).' : ''),
        body: (
          <div className="space-y-3">
            <input ref={(el) => (firstField.current = el)} placeholder="Industry, e.g. coffee shop, law firm, SaaS" value={a.industry} onChange={(e) => set('industry', e.target.value)} className={input} />
            <textarea rows={4} placeholder="What do you do, and who are your customers?" value={a.about} onChange={(e) => set('about', e.target.value)} className={cn(input, 'resize-none')} />
          </div>
        ),
      },
      {
        title: 'How should it feel?',
        short: (
          <>
            Pick a <span className="text-emerald-600">Style</span>
          </>
        ),
        valid: () => (a.styles.length ? '' : 'Choose at least one style.'),
        body: (
          <div className="flex flex-wrap justify-center gap-2">
            {styleOptions.map((s) => {
              const on = a.styles.includes(s)
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set('styles', on ? a.styles.filter((x) => x !== s) : [...a.styles, s])}
                  className={cn('flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold transition', on ? 'bg-[#0b1f14] text-white' : 'bg-black/[0.04] ring-1 ring-black/10 hover:bg-black/[0.07]')}
                >
                  {on && <Check size={14} className="text-primary" strokeWidth={3} />}
                  {s}
                </button>
              )
            })}
          </div>
        ),
      },
      {
        title: 'Timeline and budget?',
        short: (
          <>
            Timeline &amp; <span className="text-emerald-600">Budget</span>
          </>
        ),
        valid: () => (!a.timeline ? 'Pick a timeline.' : !a.budget ? 'Pick a budget range.' : ''),
        body: (
          <div className="space-y-5 text-left">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-black/50">Timeline</p>
              <div className="grid grid-cols-2 gap-2">
                {timelineOptions.map((t) => (
                  <Choice key={t} on={a.timeline === t} onClick={() => set('timeline', t)}>
                    {t}
                  </Choice>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-black/50">Budget</p>
              <div className="grid grid-cols-2 gap-2">
                {budgetOptions.map((b) => (
                  <Choice key={b} on={a.budget === b} onClick={() => set('budget', b)}>
                    {b}
                  </Choice>
                ))}
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'Where should we send the quote?',
        short: (
          <>
            Your <span className="text-emerald-600">Details</span>
          </>
        ),
        valid: () => (a.name.trim().length < 2 ? 'Please enter your name.' : !isEmail(a.email) ? 'Please enter a valid email.' : ''),
        body: (
          <div className="space-y-3">
            <input ref={(el) => (firstField.current = el)} autoComplete="name" placeholder="Your name *" value={a.name} onChange={(e) => set('name', e.target.value)} className={input} />
            <input type="email" autoComplete="email" placeholder="Email address *" value={a.email} onChange={(e) => set('email', e.target.value)} className={input} />
            <input type="tel" autoComplete="tel" placeholder="Phone (optional)" value={a.phone} onChange={(e) => set('phone', e.target.value)} className={input} />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [a],
  )

  const current = steps[step]
  const last = step === steps.length - 1

  const go = async (d: 1 | -1) => {
    if (d === -1) {
      if (step === 0) return
      setDir(-1)
      setError('')
      setStep((s) => s - 1)
      return
    }
    const problem = current.valid()
    if (problem) {
      setError(problem)
      return
    }
    if (last) {
      setStatus('sending')
      try {
        await submitLead('brief', { ...a, package: pkg })
        localStorage.removeItem(STORAGE)
        setStatus('sent')
      } catch {
        setStatus('error')
      }
      return
    }
    setDir(1)
    setStep((s) => s + 1)
  }

  const navBtn = 'pointer-events-auto flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full border-2 transition disabled:opacity-30'

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white text-black">
      <header className="relative z-10 shrink-0 px-[15px] py-3 sm:px-6 sm:py-5">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4">
          <Link to="/" className="min-w-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="Back to home">
            <BrandLogo className="block h-9 w-auto select-none md:h-10" />
          </Link>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.12] bg-black/5 px-[15px] py-2 text-base font-semibold tabular-nums tracking-wide" aria-label="Estimated time remaining">
            <Timer size={18} className="text-emerald-600" />
            {clock}
          </div>
        </div>
      </header>

      <section className="relative flex min-h-0 flex-1 flex-col">
        <div className="pointer-events-none absolute inset-x-0 top-1/3 h-64 bg-primary/10 blur-[100px]" />
        {status === 'sent' ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-primary">
              <CheckCircle2 size={40} />
            </span>
            <h1 className="mt-8 text-3xl font-black normal-case tracking-tight md:text-5xl">Brief received.</h1>
            <p className="mt-4 max-w-md text-black/60">
              Thanks {a.name.split(' ')[0]}. We will email a fixed quote for <strong>{a.company}</strong> to {a.email} within 24 hours.
            </p>
            <Link to="/" className="mt-8 rounded-full bg-[#0b1f14] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-black">
              Back to home
            </Link>
          </motion.div>
        ) : (
          <form
            className="relative flex flex-1 flex-col items-center justify-center px-5 pb-8 sm:px-6 md:px-24 md:pb-36 md:pt-20"
            onSubmit={(e) => {
              e.preventDefault()
              go(1)
            }}
            noValidate
          >
            <div className="mb-5 hidden max-w-lg text-center md:block">
              <p className="mt-4 text-sm leading-relaxed text-black/55">Six quick questions so we can quote accurately, in about two minutes. Your answers save automatically if you leave and come back.</p>
              {pkg && <p className="mt-2 text-xs font-black uppercase tracking-widest text-emerald-600">Selected package: {pkg}</p>}
            </div>
            <div className="mb-6 flex w-full max-w-lg items-center gap-1.5" aria-label={`Step ${step + 1} of ${steps.length}`}>
              {steps.map((_, i) => (
                <span key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
                  <motion.span className="block h-full rounded-full bg-primary" initial={false} animate={{ width: i <= step ? '100%' : '0%' }} transition={{ duration: 0.4 }} />
                </span>
              ))}
            </div>

            <div className="flex w-full max-w-3xl items-center justify-center gap-4 md:gap-10">
              <button type="button" onClick={() => go(-1)} disabled={step === 0} aria-label="Previous question" className={cn(navBtn, 'hidden border-[#dcdcdc] bg-white text-[#1a1a1a] hover:border-black md:flex')}>
                <ArrowLeft size={18} />
              </button>
              <div className="w-full max-w-lg overflow-hidden px-1 py-1">
                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  <motion.div
                    key={step}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -40 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center"
                  >
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-black/40">
                      Question {step + 1} of {steps.length}
                    </p>
                    <h1 className="text-2xl font-semibold normal-case leading-tight text-[#1a1a1a] sm:text-[1.7rem] md:text-4xl md:tracking-tight md:text-black">
                      <span className="md:hidden">{current.short}</span>
                      <span className="hidden md:inline">{current.title}</span>
                    </h1>
                    <div className="mt-[25px] text-left md:mt-7">{current.body}</div>
                    <AnimatePresence>
                      {error && (
                        <motion.p role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 text-sm font-bold text-red-600">
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {status === 'error' && <p className="mt-3 text-sm font-bold text-red-600">Could not send. Please try again.</p>}
                  </motion.div>
                </AnimatePresence>
              </div>
              <button type="submit" disabled={status === 'sending'} aria-label={last ? 'Submit brief' : 'Next question'} className={cn(navBtn, 'hidden border-primary bg-primary text-black hover:brightness-110 md:flex')}>
                {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : last ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            </div>

            <div className="mt-8 flex w-full max-w-lg items-center gap-3 md:hidden">
              <button type="button" onClick={() => go(-1)} disabled={step === 0} aria-label="Previous question" className={cn(navBtn, 'border-[#dcdcdc] bg-white')}>
                <ArrowLeft size={18} />
              </button>
              <button type="submit" disabled={status === 'sending'} className="flex h-[45px] flex-1 items-center justify-center gap-2 rounded-full bg-[#0b1f14] text-sm font-black uppercase tracking-widest text-white">
                {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : null}
                {last ? 'Get my quote' : 'Continue'}
              </button>
            </div>
            <p className="mt-6 hidden text-xs font-semibold text-black/40 md:block">
              Press <kbd className="rounded bg-black/5 px-1.5 py-0.5">Enter ↵</kbd> to continue
            </p>
          </form>
        )}
      </section>
    </div>
  )
}
