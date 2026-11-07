import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CheckCircle2, Clapperboard, Clock, Globe, Instagram, Linkedin, Loader2, Mail, MapPin, Palette, PenTool, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CtaSection, PageHero } from '../components/shared/Sections'
import { site } from '../config/site'
import { usePageTitle } from '../hooks/usePageTitle'
import { cn } from '../lib/cn'
import { isEmail, submitLead } from '../lib/submit'

const needs = [
  { id: 'logo', label: 'Logo Design', icon: PenTool },
  { id: 'brand', label: 'Brand Identity', icon: Palette },
  { id: 'web', label: 'Website Design', icon: Globe },
  { id: 'motion', label: 'Video Animation', icon: Clapperboard },
]
const budgets = ['Under $250', '$250 – $500', '$500 – $1,500', '$1,500+']
const quick = [
  { q: 'Contact form or guided brief?', a: 'Use this form for a quick question or a rough idea. Ready to scope a project? The guided brief gets you an exact quote faster.' },
  { q: 'How fast will you reply?', a: 'Within 24 hours on working days, usually much sooner during studio hours.' },
  { q: 'Is the quote free?', a: 'Yes. You receive a clear, fixed price with scope and timeline, with no obligation to go ahead.' },
]

const field =
  'w-full rounded-2xl bg-white/[0.06] px-5 py-4 text-base font-medium text-white placeholder:text-white/35 outline-none ring-1 ring-white/10 transition focus:bg-white/[0.09] focus:ring-2 focus:ring-primary'
const lbl = 'mb-2 block text-xs font-black uppercase tracking-[0.2em] text-white/70'

type Errors = Partial<Record<'need' | 'name' | 'email' | 'message', string>>

export default function Contact() {
  usePageTitle('Contact Us | Get a Free Quote')
  const [need, setNeed] = useState<string[]>(['logo'])
  const [budget, setBudget] = useState(budgets[1])
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', website: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k as keyof Errors]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const validate = () => {
    const e: Errors = {}
    if (!need.length) e.need = 'Pick at least one service.'
    if (form.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!isEmail(form.email)) e.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 10) e.message = 'Tell us a little more (10+ characters).'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.website) return // honeypot
    if (!validate()) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }
    setStatus('sending')
    try {
      await submitLead('contact', { ...form, need, budget })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-xs font-bold text-red-400">
        {errors[k]}
      </p>
    ) : null

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Ask a question
            <br />
            before you commit.
          </>
        }
        intro="Not ready for the full brief? Send a short message: what you are building, what you need, and roughly when. A designer replies within 24 hours."
      />
      <section className="bg-black px-5 py-24 text-white md:py-32">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div data-reveal="scale" className="rounded-[26px] bg-[#141414] p-6 ring-1 ring-white/10 md:p-10">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[520px] flex-col items-center justify-center text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-primary text-black">
                    <CheckCircle2 size={40} />
                  </span>
                  <h2 className="mt-8 text-3xl font-black normal-case tracking-tight md:text-4xl">Message sent.</h2>
                  <p className="mt-3 max-w-sm text-white/60">Thanks, {form.name.split(' ')[0]}. A designer will reply to {form.email} within 24 hours.</p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link to="/portfolio" className="rounded-full bg-white/10 px-6 py-3 text-xs font-black uppercase tracking-widest ring-1 ring-white/20 transition-colors hover:bg-white hover:text-black">
                      Browse the portfolio
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus('idle')
                        setForm({ name: '', email: '', company: '', message: '', website: '' })
                      }}
                      className="rounded-full bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-white"
                    >
                      Send another
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate className="space-y-7" exit={{ opacity: 0, y: -10 }}>
                  <div>
                    <h2 className="text-3xl font-black normal-case tracking-tight md:text-4xl">Send us a message</h2>
                    <p className="mt-2 text-sm text-white/55">About a minute. Fields marked * are required.</p>
                    <Link to="/brief" className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary transition-colors hover:text-white">
                      Ready for a quote? Start Your Project Brief
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                  <fieldset>
                    <legend className={lbl}>What do you need? *</legend>
                    <div className="grid grid-cols-2 gap-3">
                      {needs.map((n) => {
                        const on = need.includes(n.id)
                        return (
                          <button
                            key={n.id}
                            type="button"
                            aria-pressed={on}
                            onClick={() => {
                              setNeed((x) => (on ? x.filter((i) => i !== n.id) : [...x, n.id]))
                              setErrors((x) => ({ ...x, need: undefined }))
                            }}
                            className={cn(
                              'flex items-center gap-3 rounded-2xl px-4 py-4 text-left text-sm font-bold transition',
                              on ? 'bg-primary text-black shadow-[0_10px_28px_rgba(4,214,109,0.3)]' : 'bg-white/[0.06] text-white ring-1 ring-white/10 hover:bg-white/[0.1]',
                            )}
                          >
                            <n.icon size={18} />
                            {n.label}
                          </button>
                        )
                      })}
                    </div>
                    {err('need')}
                  </fieldset>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={lbl}>
                        Your name *
                      </label>
                      <input id="name" name="name" autoComplete="name" placeholder="Jane Smith" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={cn(field, errors.name && 'ring-2 ring-red-400')} />
                      {err('name')}
                    </div>
                    <div>
                      <label htmlFor="email" className={lbl}>
                        Email *
                      </label>
                      <input id="email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" value={form.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={cn(field, errors.email && 'ring-2 ring-red-400')} />
                      {err('email')}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className={lbl}>
                      Business name
                    </label>
                    <input id="company" name="company" autoComplete="organization" placeholder="Your business or brand" value={form.company} onChange={set('company')} className={field} />
                  </div>
                  <fieldset>
                    <legend className={lbl}>Budget</legend>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button
                          key={b}
                          type="button"
                          aria-pressed={budget === b}
                          onClick={() => setBudget(b)}
                          className={cn('rounded-full px-5 py-2.5 text-sm font-bold transition', budget === b ? 'bg-white text-black' : 'bg-white/[0.06] text-white/75 ring-1 ring-white/10 hover:text-white')}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <label htmlFor="message" className={lbl}>
                      Tell us about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="What does your business do, and how should your brand feel?"
                      value={form.message}
                      onChange={set('message')}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={cn(field, 'resize-none', errors.message && 'ring-2 ring-red-400')}
                    />
                    {err('message')}
                  </div>
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />
                  {status === 'error' && <p className="text-sm font-bold text-red-400">Something went wrong. Please try again or email {site.email}.</p>}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-5 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : null}
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                    {status !== 'sending' && <Send size={16} className="transition-transform group-hover:translate-x-1" />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <aside data-reveal-children="" className="flex flex-col gap-5">
            <a href={`mailto:${site.email}`} className="group rounded-[22px] bg-accent p-7 text-white transition-transform hover:-translate-y-1">
              <Mail size={26} />
              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-white/70">Email us</p>
              <p className="mt-1 flex items-center gap-2 break-all text-xl font-black tracking-tight">
                {site.email}
                <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </p>
            </a>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a href={site.phoneHref} className="group rounded-[22px] bg-primary p-7 text-black transition-transform hover:-translate-y-1">
                <Phone size={24} />
                <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-black/60">Call us</p>
                <p className="mt-1 text-lg font-black tracking-tight">{site.phone}</p>
              </a>
              <div className="rounded-[22px] bg-[#141414] p-7 ring-1 ring-white/10">
                <MapPin size={24} />
                <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-white/60">Head office</p>
                <p className="mt-1 text-sm font-bold leading-snug">{site.address}</p>
              </div>
            </div>
            <div className="rounded-[22px] bg-acid-yellow p-7 text-black">
              <Clock size={24} />
              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-black/60">Response time</p>
              <p className="mt-1 text-xl font-black tracking-tight">Within 24 hours</p>
              <p className="mt-1 text-sm font-medium text-black/65">{site.hours}</p>
            </div>
            <div className="rounded-[22px] bg-[#141414] p-7 ring-1 ring-white/10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Quick answers</p>
              <div className="mt-4 divide-y divide-white/10">
                {quick.map((x) => (
                  <details key={x.q} className="group py-3.5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold">
                      {x.q}
                      <span className="text-lg leading-none text-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{x.a}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[22px] bg-[#141414] p-5 ring-1 ring-white/10">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Follow</span>
              <div className="ml-auto flex gap-2">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-primary hover:text-black">
                    {s.label === 'Instagram' ? <Instagram size={18} /> : <Linkedin size={18} />}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
      <CtaSection eyebrow="Prefer the guided route?" title="Get an exact quote in two minutes." secondary={{ label: 'See pricing first', to: '/pricing' }} />
    </>
  )
}
