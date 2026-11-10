import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle2, FileArchive, Download, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { site } from '@/config/site'
import { chatScript } from '@/data/content'
import { logoMarks } from '@/data/work'

type Msg = (typeof chatScript)[number]

/** How long the typing indicator shows before each message lands. */
const TYPING_MS = 1000
/** Pause between one message landing and the next typing indicator. */
const GAP_MS = 1600
/** Number of bubbles kept on screen; older ones scroll out the top. */
const VISIBLE_MESSAGES = 4

function Who({ from }: { from: Msg['from'] }) {
  return from === 'client' ? (
    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-accent text-xs font-black text-white">
      IR
    </span>
  ) : (
    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-[#0b1f14] text-sm font-black text-primary">
      {site.shortName[0]}
    </span>
  )
}

function Typing() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-black/45"
          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}

function Body({ m }: { m: Msg }) {
  if (m.kind === 'concepts') {
    const single = m.images.length === 1
    return (
      <div>
        <p className="text-sm font-medium">{m.text}</p>
        <div className={`mt-2.5 grid gap-2 ${single ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {m.images.map((img, i) => (
            <div
              key={img}
              className={`relative overflow-hidden rounded-lg ring-1 ring-black/10 ${single ? 'h-32' : 'aspect-square'}`}
            >
              <img
                src={logoMarks[img].src}
                alt={logoMarks[img].alt}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full bg-white object-contain"
              />
              {!single && (
                <span className="absolute left-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-black text-[9px] font-black text-white">
                  {i + 1}
                </span>
              )}
              {m.picked === i && (
                <span className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[9px] font-black uppercase text-white">
                  <CheckCircle2 size={9} /> Final
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (m.kind === 'file') {
    return (
      <div>
        <p className="text-sm font-medium">{m.text}</p>
        <div className="mt-2.5 flex items-center gap-2.5 rounded-lg bg-black/10 px-3 py-2">
          <FileArchive size={18} />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-xs font-black">{m.file}</p>
            <p className="text-[10px] font-semibold opacity-60">{m.size}</p>
          </div>
          <Download size={16} />
        </div>
      </div>
    )
  }
  return <p className="text-sm font-medium">{m.text}</p>
}

function Bubble({ m, typing }: { m: Msg; typing: boolean }) {
  const client = m.from === 'client'
  return (
    <div className={`flex items-end gap-3 ${client ? '' : 'flex-row-reverse'}`}>
      <Who from={m.from} />
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-left ${client ? 'rounded-bl-md bg-gray-100 text-black' : 'rounded-br-md bg-primary text-black'} ${
          m.kind !== 'text' && !typing ? 'w-[78%]' : ''
        }`}
      >
        {typing ? <Typing /> : <Body m={m} />}
      </div>
    </div>
  )
}

/** Self-playing client conversation: typing dots, then the message pops in. Loops. */
function ClientChat() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduced = useReducedMotion()
  const [count, setCount] = useState(reduced ? chatScript.length : 0)
  const [typing, setTyping] = useState(false)
  const [round, setRound] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    let t: number
    if (count >= chatScript.length) {
      t = window.setTimeout(() => {
        setCount(0)
        setRound((r) => r + 1)
      }, GAP_MS * 2.5)
    } else if (typing) {
      t = window.setTimeout(() => {
        setTyping(false)
        setCount((c) => c + 1)
      }, TYPING_MS)
    } else {
      const prev = chatScript[count - 1]
      const wait = count === 0 ? 500 : prev && prev.kind !== 'text' ? GAP_MS * 1.4 : GAP_MS
      t = window.setTimeout(() => setTyping(true), wait)
    }
    return () => window.clearTimeout(t)
  }, [inView, reduced, count, typing])

  const shown = chatScript.slice(0, count).map((m, i) => ({ m, i }))
  const pending = typing && count < chatScript.length ? { m: chatScript[count], i: count } : null
  const visible = [...shown, ...(pending ? [pending] : [])].slice(-VISIBLE_MESSAGES)
  const done = count >= chatScript.length

  return (
    <div ref={ref}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Who from="client" />
          <div className="text-left">
            <p className="text-sm font-black leading-tight">Ines Rocha</p>
            <p className="text-xs font-semibold text-black/50">Mountain Madre · New logo</p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider transition-colors ${
            done ? 'bg-primary/15 text-emerald-700' : 'bg-accent/10 text-accent'
          }`}
        >
          {done ? 'Delivered ✓' : 'In progress'}
        </span>
      </div>
      <div className="relative flex h-[360px] flex-col justify-end gap-4 overflow-hidden" aria-live="off">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-white to-transparent"
        />
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map(({ m, i }) => (
            <motion.div
              key={`${round}-${i}`}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              <Bubble m={m} typing={pending !== null && i === pending.i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function StudioSection() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -30])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const q = name.trim() ? `?${new URLSearchParams({ company: name.trim() })}` : ''
    navigate(`/brief${q}`)
  }

  return (
    <section id="studio" className="relative overflow-hidden bg-accent py-24 text-white md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-full select-none overflow-hidden opacity-5"
      >
        <p className="-translate-y-1/2 -rotate-12 whitespace-nowrap text-[30vw] font-black opacity-5">
          {site.shortName}
        </p>
      </div>
      <div className="container mx-auto grid items-center gap-20 px-6 lg:grid-cols-2">
        <div className="relative z-10">
          <p data-reveal="" className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-acid-yellow">
            Less guesswork for you
          </p>
          <h2 data-reveal="" className="text-4xl font-black normal-case leading-[0.95] tracking-[-0.04em] sm:text-6xl">
            You always know
            <br />
            what comes next.
          </h2>
          <p
            data-reveal=""
            className="mb-10 mt-6 max-w-xl text-sm font-medium leading-relaxed text-white/75 md:text-base"
          >
            Choose what you need, send a short brief and get a fixed quote. Concepts, feedback and final files follow a
            clear path, no design jargon required.
          </p>
          <form data-reveal="" onSubmit={submit} className="max-w-md space-y-4">
            <label
              htmlFor="studio-business-name"
              className="block text-xs font-black uppercase tracking-[0.28em] text-white/80 max-md:hidden"
            >
              Your business name
            </label>
            <input
              id="studio-business-name"
              name="company"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your business name..."
              className="w-full rounded-full bg-white/10 px-6 py-4 text-base font-bold text-white outline-none ring-1 ring-white/30 transition placeholder:font-semibold placeholder:text-white/55 hover:bg-white/15 focus:ring-2 focus:ring-acid-yellow max-md:hidden"
            />
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-acid-yellow px-5 py-4 text-[13px] font-black uppercase tracking-wider text-black shadow-[0_14px_30px_rgba(0,0,0,0.2)] transition-colors hover:bg-white max-md:!mt-0 min-[400px]:px-8 min-[400px]:text-sm min-[400px]:tracking-widest"
            >
              Start Your Project Brief
              <ArrowRight size={16} strokeWidth={2.75} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
        <div data-reveal="scale" className="relative" ref={cardRef}>
          <motion.div
            style={{ y }}
            className="rounded-2xl bg-white p-6 text-black shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
          >
            <div className="mb-8 flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs font-black uppercase tracking-widest text-black/40">Client updates</div>
            </div>
            <div className="space-y-6">
              <ClientChat />
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex gap-2">
                  <div className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-tighter text-accent">
                    Concepts
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-tighter text-primary">
                    Revisions
                  </div>
                </div>
                <div className="text-xs font-black uppercase text-black max-sm:hidden">Plain-language replies</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute -right-10 -top-10 hidden -rotate-12 bg-acid-yellow p-4 shadow-xl md:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles size={32} className="text-black" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
