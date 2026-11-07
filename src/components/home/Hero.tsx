import { CheckCircle2, ChevronDown, PencilLine, ArrowRight, Timer } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { site } from '@/config/site'
import { heroPhrases, marqueeWords } from '@/data/content'
import { people } from '@/data/art'
import { useCycleConductor } from '@/hooks/useCycleConductor'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTypewriter } from '@/hooks/useTypewriter'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { whenIdleAfterLoad } from '@/lib/idle'
import { smoothScrollTo } from '@/lib/scroll'
import { Avatar } from '@/components/art/Avatar'
import { CrossfadeCycle } from '@/components/shared/CrossfadeCycle'
import { HeroBackdrop } from '@/components/shared/HeroBackdrop'
import { HeroMotionField } from './HeroMotionField'
import {
  brandSlides,
  heroImages,
  logoSlides,
  logoWebSlides,
  motionSlides,
  heroChannels,
  webMotionSlides,
  webSlides,
} from './heroSlides'

const CLIP_HIDDEN = 'inset(0px 100% 0px 0px)'
const CLIP_SHOWN = 'inset(0px 0% 0px 0px)'
const TILT_X = 4
const TILT_Y = 6
const COLLAPSE_AT = 0.35
const RESTORE_AT = 0.2
const titleCls =
  'block font-display text-[clamp(2.75rem,6.5vw,4.75rem)] font-[900] normal-case leading-[0.92] tracking-[-0.05em] lg:text-[4.9vw]'
/** The floating sample cards only exist from the `lg` breakpoint up. */
const DESKTOP_QUERY = '(min-width: 1024px)'
const NO_CHANNELS: string[] = []
const barCls =
  'flex items-center gap-[0.3em] font-display text-[clamp(2rem,4.8vw,3.5rem)] font-[900] normal-case leading-none tracking-[-0.04em] lg:text-[3.6vw]'

// Floating cards

function FloatCard({
  pos,
  children,
  bg = 'bg-neutral-950',
  round = false,
  spark,
}: {
  pos: string
  children: ReactNode
  bg?: string
  round?: boolean
  spark?: string
}) {
  return (
    <div data-hero-item="" className={`group absolute hidden md:pointer-events-auto lg:block ${pos}`}>
      <div
        data-hero-tilt=""
        className={
          round
            ? 'relative h-full w-full overflow-hidden rounded-full bg-white shadow-[0_12px_28px_rgba(0,0,0,0.22)] ring-[3px] ring-white'
            : 'relative isolate h-full w-full overflow-hidden rounded-[18px] bg-transparent shadow-[0_18px_45px_rgba(0,0,0,0.2)]'
        }
      >
        <div className={`pointer-events-none absolute inset-0 overflow-hidden ${bg}`}>{children}</div>
        <span
          data-hero-shade=""
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-0"
          aria-hidden="true"
        >
          <span
            data-hero-shade-glow=""
            className="absolute -inset-1/2"
            style={{ background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.9) 70%)' }}
          />
        </span>
        <span
          data-hero-shine=""
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 mix-blend-screen"
          aria-hidden="true"
        >
          <span
            data-hero-shine-glow=""
            className="absolute -inset-1/2"
            style={{ background: 'radial-gradient(circle, rgb(255,255,255) 0%, transparent 45%)' }}
          />
        </span>
      </div>
      {spark && (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          className={`pointer-events-none absolute h-[50%] w-[50%] ${spark}`}
          aria-hidden="true"
        >
          <path d="M10 24 18 8" />
          <path d="M18 32 34 26" />
        </svg>
      )}
    </div>
  )
}

// Hero form

function HeroForm() {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const typed = useTypewriter(heroPhrases, { paused: focused || value.length > 0 })
  const navigate = useNavigate()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const name = value.trim()
    if (!name) {
      inputRef.current?.focus()
      if (!prefersReducedMotion())
        gsap.fromTo(
          boxRef.current,
          { x: 0 },
          { keyframes: { x: [-10, 9, -6, 4, 0] }, duration: 0.45, ease: 'power1.out' },
        )
      return
    }
    navigate(`/brief?${new URLSearchParams({ company: name })}`)
  }

  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-2.5 sm:gap-2" noValidate>
      <label htmlFor="hero-business-name" className="sr-only">
        Enter your business name
      </label>
      <div
        ref={boxRef}
        className="flex w-full flex-col gap-[15px] sm:flex-row sm:items-stretch sm:gap-3 sm:rounded-full sm:bg-white sm:p-1.5 sm:pl-2 sm:shadow-[0_24px_60px_-14px_rgba(0,0,0,0.35)] sm:ring-[6px] sm:ring-white/30 sm:transition-shadow sm:duration-300 sm:focus-within:ring-white/50"
      >
        <span className="hidden h-11 w-11 shrink-0 place-items-center self-center rounded-full bg-primary/15 text-[#0b3a22] sm:grid">
          <PencilLine className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <div className="relative min-w-0 flex-1">
          <PencilLine
            className="pointer-events-none absolute left-5 top-1/2 z-10 h-6 w-6 -translate-y-1/2 text-[#0b3a22] sm:hidden"
            strokeWidth={2.5}
          />
          {!value && !focused && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[5] flex items-center pl-[3.4rem] pr-5 text-base font-medium text-black/45 sm:px-0 sm:py-3"
            >
              {typed}
              <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-black/35" style={{ height: '1.05em' }} />
            </span>
          )}
          <input
            ref={inputRef}
            id="hero-business-name"
            name="company"
            type="text"
            autoComplete="organization"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused ? 'Enter your business name...' : ''}
            className="relative h-[52px] w-full rounded-full bg-white pl-[3.4rem] pr-5 text-base font-medium text-black shadow-[0_16px_40px_-14px_rgba(0,0,0,0.35)] outline-none placeholder:text-black/45 sm:h-12 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none"
          />
        </div>
        <button
          type="submit"
          className="cta-shine group relative flex h-[52px] w-full shrink-0 items-center justify-center gap-3 overflow-hidden rounded-full bg-[#0b1f14] px-7 text-base font-bold uppercase tracking-[0.04em] text-white shadow-[0_12px_28px_rgba(0,0,0,0.22)] transition-[filter] hover:brightness-110 sm:h-12 sm:w-auto sm:bg-[linear-gradient(100deg,#22c55e_0%,#16a34a_55%,#15803d_100%)] sm:py-0 sm:text-sm sm:shadow-[0_18px_34px_-12px_rgba(21,128,61,0.65),inset_0_1px_0_rgba(255,255,255,0.35)]"
        >
          <span className="relative">Get My Custom Logo</span>
          <span className="relative grid h-[1.9rem] w-[1.9rem] shrink-0 place-items-center rounded-full bg-white/15 text-white transition-transform duration-200 group-hover:translate-x-1 sm:bg-[#0f2a1c] sm:text-[#86efac]">
            <ArrowRight size={16} strokeWidth={2.75} />
          </span>
        </button>
      </div>
    </form>
  )
}

// Hero

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  // Smaller screens never show the floating cards, so they skip rendering, cycling and
  // preloading them entirely.
  const showCards = useMediaQuery(DESKTOP_QUERY)
  useCycleConductor(showCards ? heroChannels : NO_CHANNELS)

  // Warm the cache for upcoming slides once the page is idle, so they don't compete
  // with the first paint for bandwidth.
  useEffect(() => {
    if (!showCards) return
    return whenIdleAfterLoad(() => {
      heroImages.forEach((src) => {
        new Image().src = src
      })
    })
  }, [showCards])

  useLayoutEffect(() => {
    const section = rootRef.current
    if (!section) return
    const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, section)
    const items = q<HTMLElement>('[data-hero-item]')
    const visibleItems = () => items.filter((el) => el.offsetParent !== null)
    const eyebrow = section.querySelector('[data-hero-eyebrow]')
    const words = q('[data-hero-fade-word]')
    const desc = section.querySelector('[data-hero-desc]')
    const badges = section.querySelector('[data-hero-badges]')
    const scrollCue = section.querySelector('[data-hero-scroll]')
    const builders = section.querySelector<HTMLElement>('[data-hero-builders]')
    const bar = section.querySelector('[data-hero-bar]')
    const cta = section.querySelector<HTMLElement>('[data-hero-cta]')
    const marquee = section.querySelector<HTMLElement>('[data-hero-marquee]')
    const track = section.querySelector('[data-marquee-track]')

    if (prefersReducedMotion()) {
      gsap.set(bar, { clipPath: CLIP_SHOWN })
      return
    }

    const cleanups: Array<() => void> = []
    const ctx = gsap.context(() => {
      // Marquee: 58s loop that eases to 0.35x speed on hover and pauses while off-screen.
      let loop: gsap.core.Tween | null = null
      let marqueeLive = false
      if (marquee && track) {
        loop = gsap.to(track, { xPercent: -50, duration: 58, ease: 'none', repeat: -1, paused: true })
        const speed = (s: number) =>
          gsap.to(loop, { timeScale: s, duration: 0.85, ease: 'power2.inOut', overwrite: true })
        const slow = () => speed(0.35)
        const fast = () => speed(1)
        marquee.addEventListener('pointerenter', slow)
        marquee.addEventListener('pointerleave', fast)
        const io = new IntersectionObserver(([e]) => {
          if (!loop || !marqueeLive) return
          if (e.isIntersecting) loop.play()
          else loop.pause()
        })
        io.observe(marquee)
        cleanups.push(() => {
          marquee.removeEventListener('pointerenter', slow)
          marquee.removeEventListener('pointerleave', fast)
          io.disconnect()
        })
        gsap.set(marquee, { yPercent: 100 })
        gsap.set(q('.marquee-item'), { autoAlpha: 0 })
      }

      // Each card's collapsed state: piled near the centre, scaled down, tilted and hidden.
      const collapsed = new Map<HTMLElement, gsap.TweenVars>()
      const computeCollapsed = (apply: boolean) => {
        const box = section.getBoundingClientRect()
        const cx = box.width * 0.5
        const cy = box.height * 0.45
        collapsed.clear()
        visibleItems().forEach((el) => {
          const r = el.getBoundingClientRect()
          const v = {
            x: cx - (r.left - box.left + r.width / 2) + gsap.utils.random(-50, 50),
            y: cy - (r.top - box.top + r.height / 2) + gsap.utils.random(-36, 36),
            scale: 0.55,
            rotation: gsap.utils.random(-14, 14),
            autoAlpha: 0,
          }
          collapsed.set(el, v)
          if (apply) gsap.set(el, v)
        })
      }
      computeCollapsed(true)
      gsap.set(bar, { clipPath: CLIP_HIDDEN })

      let introDone = false
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => onIntroComplete() })
      intro.to(
        visibleItems(),
        { x: 0, y: 0, scale: 1, rotation: 0, autoAlpha: 1, duration: 1.4, stagger: { each: 0.035, from: 'random' } },
        0.1,
      )
      if (marquee) {
        intro.to(marquee, { yPercent: 0, duration: 0.7, ease: 'power3.out' }, 1.15)
        intro.add(() => {
          marqueeLive = true
          loop?.play()
          gsap.to(
            q<HTMLElement>('.marquee-item').filter((el) => el.offsetLeft < window.innerWidth),
            { autoAlpha: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1 },
          )
          gsap.set(q('.marquee-item'), { autoAlpha: 1, delay: 1.5 })
        }, 1.23)
      }
      intro.to(bar, { clipPath: CLIP_SHOWN, duration: 0.45, ease: 'power3.out' }, 0.85)

      // Scroll collapse: cards fly back to the centre, the copy fades out and the timer bar
      // drops down onto the form. Reversed when the user scrolls back up.
      let timelines: gsap.core.Timeline[] = []
      let state: -1 | 0 | 1 = 0
      const collapseAt = () => Math.max(240, section.offsetHeight * COLLAPSE_AT)
      const restoreAt = () => Math.max(140, section.offsetHeight * RESTORE_AT)

      const copyEls = [eyebrow, ...words, desc, badges, scrollCue].filter(Boolean)

      const build = () => {
        timelines.forEach((t) => t.kill())
        const vis = visibleItems()
        // Killing a timeline mid-flight leaves its inline styles behind, and the fresh
        // timelines below don't render their start state at progress 0. Reset explicitly
        // so a resize while the copy is faded out can't leave it stuck invisible.
        gsap.set(vis, { x: 0, y: 0, scale: 1, rotation: 0, autoAlpha: 1 })
        gsap.set(copyEls, { opacity: 1, scale: 1 })
        gsap.set(builders, { y: 0 })
        computeCollapsed(false)
        const cards = gsap.timeline({ paused: true })
        gsap.utils.shuffle(vis.slice()).forEach((el, i) => {
          const v = collapsed.get(el)
          if (v) cards.to(el, { ...v, duration: 0.85, ease: 'power2.in' }, 0.03 * i)
        })
        const copy = gsap.timeline({ paused: true, defaults: { ease: 'power2.in', duration: 0.65 } })
        const small = window.innerWidth < 640
        copyEls.forEach((el, i) => {
          copy.fromTo(
            el,
            { opacity: 1, scale: 1 },
            { opacity: 0, scale: small ? 1 : 0.92, immediateRender: false },
            0.06 * i,
          )
        })
        const drop = gsap.timeline({ paused: true, defaults: { ease: 'power1.inOut', duration: 0.9 } })
        if (builders && cta) {
          const dy = Math.max(0, cta.getBoundingClientRect().top - builders.getBoundingClientRect().bottom - 22)
          drop.to(builders, { y: dy }, 0)
        }
        timelines = [cards, copy, drop]
        timelines.forEach((t) => {
          const settle = () => {
            if (!timelines.some((x) => x.isActive())) check()
          }
          t.eventCallback('onComplete', settle)
          t.eventCallback('onReverseComplete', settle)
        })
      }
      const collapse = () => {
        if (state === 1) return
        state = 1
        resetTilt()
        timelines.forEach((t) => {
          t.timeScale(1.35)
          t.reversed(false)
          if (t.progress() < 1) t.play()
        })
      }
      const restore = () => {
        if (state === -1) return
        const active = timelines.filter((t) => t.progress() > 0)
        if (!active.length) {
          state = 0
          return
        }
        state = -1
        active.forEach((t) => {
          t.timeScale(1.85)
          t.reverse()
        })
      }
      const check = () => {
        if (!introDone) return
        const y = Math.max(0, window.scrollY)
        if (y >= collapseAt()) collapse()
        else if (y < restoreAt()) restore()
      }
      window.addEventListener('scroll', check, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', check))
      function onIntroComplete() {
        if (introDone) return
        introDone = true
        build()
        check()
      }

      let lastW = window.innerWidth
      let rt = 0
      const onResize = () => {
        window.clearTimeout(rt)
        rt = window.setTimeout(() => {
          if (Math.abs(window.innerWidth - lastW) < 2) return
          lastW = window.innerWidth
          if (!introDone) intro.progress(1)
          gsap.set(items, { x: 0, y: 0, scale: 1, rotation: 0, autoAlpha: 1 })
          build()
          const past = window.scrollY >= collapseAt()
          state = past ? 1 : 0
          timelines.forEach((t) => t.progress(past ? 1 : 0))
          measureTilt()
        }, 120)
      }
      window.addEventListener('resize', onResize)
      cleanups.push(() => {
        window.removeEventListener('resize', onResize)
        window.clearTimeout(rt)
      })

      // Pointer tilt: each card leans toward the cursor with an eased follow, plus sheen and shade glows.
      const canHover = window.matchMedia('(hover: hover) and (min-width: 768px)').matches
      type Tilt = {
        cx: number
        cy: number
        isLeft: boolean
        current: number[]
        target: number[]
        setters: Array<(v: number) => void>
      }
      const tilts: Tilt[] = canHover
        ? items.map((el) => {
            const t = el.querySelector('[data-hero-tilt]')
            const shine = el.querySelector('[data-hero-shine]')
            const shineGlow = el.querySelector('[data-hero-shine-glow]')
            const shade = el.querySelector('[data-hero-shade]')
            const shadeGlow = el.querySelector('[data-hero-shade-glow]')
            gsap.set(t, { transformPerspective: 900, transformOrigin: '50% 50%', force3D: true })
            const qs = (target: Element | null, prop: string, unit?: string) =>
              target ? (gsap.quickSetter(target, prop, unit) as (v: number) => void) : () => {}
            return {
              cx: 0,
              cy: 0,
              isLeft: true,
              current: [0, 0, 0, 0, 0, 0, 0, 0],
              target: [0, 0, 0, 0, 0, 0, 0, 0],
              setters: [
                qs(t, 'rotationX', 'deg'),
                qs(t, 'rotationY', 'deg'),
                qs(shineGlow, 'xPercent'),
                qs(shineGlow, 'yPercent'),
                qs(shine, 'opacity'),
                qs(shadeGlow, 'xPercent'),
                qs(shadeGlow, 'yPercent'),
                qs(shade, 'opacity'),
              ],
            }
          })
        : []
      // Cache each card's centre so pointermove doesn't force a layout read per card.
      const measureTilt = () => {
        const mid = section.offsetWidth / 2
        tilts.forEach((t, i) => {
          const el = items[i]
          t.cx = el.offsetLeft + el.offsetWidth / 2
          t.cy = el.offsetTop + el.offsetHeight / 2
          t.isLeft = t.cx < mid
        })
      }
      measureTilt()
      let ticking = false
      const tick = () => {
        const k = 1 - Math.pow(0.94, gsap.ticker.deltaRatio(60))
        let settled = true
        tilts.forEach((t) => {
          for (let i = 0; i < 8; i++) {
            const d = t.target[i] - t.current[i]
            if (d === 0) continue
            const done = Math.abs(d) <= 0.001
            t.current[i] = done ? t.target[i] : t.current[i] + d * k
            t.setters[i](t.current[i])
            if (!done) settled = false
          }
        })
        if (settled) stop()
      }
      const start = () => {
        if (!ticking) {
          ticking = true
          gsap.ticker.add(tick)
        }
      }
      const stop = () => {
        if (ticking) {
          ticking = false
          gsap.ticker.remove(tick)
        }
      }
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse' || state === 1) return
        const box = section.getBoundingClientRect()
        const span = Math.max(window.innerWidth * 0.9, 1)
        tilts.forEach((t) => {
          const dx = e.clientX - (box.left + t.cx)
          const dy = e.clientY - (box.top + t.cy)
          let ry = gsap.utils.clamp(-TILT_Y, TILT_Y, (90 * Math.atan2(dx, span)) / Math.PI)
          const rx = gsap.utils.clamp(-TILT_X, TILT_X, (90 * -Math.atan2(dy, span)) / Math.PI)
          ry = t.isLeft ? Math.max(0, ry) : Math.min(0, ry)
          const nx = rx / TILT_X
          const ny = ry / TILT_Y
          const m = Math.min(Math.hypot(nx, ny), 1)
          t.target = [rx, ry, -12 * ny, 12 * nx, 0.06 + 0.14 * m, 12 * ny, -12 * nx, 0.06 + 0.16 * m]
        })
        start()
      }
      function resetTilt() {
        tilts.forEach((t) => (t.target = [0, 0, 0, 0, 0, 0, 0, 0]))
        start()
      }
      if (canHover) {
        section.addEventListener('pointermove', onMove)
        section.addEventListener('pointerleave', resetTilt)
        cleanups.push(() => {
          section.removeEventListener('pointermove', onMove)
          section.removeEventListener('pointerleave', resetTilt)
          stop()
        })
      }
    }, section)

    return () => {
      cleanups.forEach((f) => f())
      ctx.revert()
    }
  }, [showCards])

  const marqueeRow = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[...marqueeWords, ...marqueeWords].map((w, i) => (
        <span key={i} className="marquee-item flex shrink-0 items-center">
          <span className="px-6 font-display text-lg font-black uppercase leading-none tracking-tight text-black md:px-10 md:text-2xl">
            {w}
          </span>
          <span className="text-lg text-black md:text-2xl">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <section
      ref={rootRef}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-primary lg:min-h-[100dvh]"
    >
      <HeroBackdrop video={site.heroVideo} />
      {!site.heroVideo && <HeroMotionField />}

      {/* floating work + people */}
      {showCards && (
        <div className="pointer-events-none absolute inset-0 z-[5]">
          <FloatCard pos="lg:left-[10%] lg:top-[21%] lg:h-[11vw] lg:w-[11vw]">
            <CrossfadeCycle slides={logoSlides} channel="hero-logos" label="Custom logo design samples" />
          </FloatCard>
          <FloatCard pos="lg:left-[14%] lg:top-[46%] lg:h-[10vw] lg:w-[10vw]">
            <CrossfadeCycle slides={logoWebSlides} channel="hero-logoWeb" label="Logo and website design samples" />
          </FloatCard>
          <FloatCard pos="lg:left-[19%] lg:top-[70%] lg:h-[10vw] lg:w-[10vw]">
            <CrossfadeCycle slides={brandSlides} channel="hero-brand" label="Branding samples" />
          </FloatCard>
          <FloatCard pos="lg:left-[74%] lg:top-[68%] lg:h-[10vw] lg:w-[10vw]" bg="bg-black">
            <CrossfadeCycle slides={motionSlides} channel="hero-motion" label="Animated logo samples" />
          </FloatCard>
          <FloatCard pos="lg:left-[78.5%] lg:top-[16%] lg:h-[10vw] lg:w-[10vw]" bg="bg-white">
            <CrossfadeCycle slides={webMotionSlides} channel="hero-webMotion" label="Website and animation samples" />
          </FloatCard>
          <FloatCard pos="lg:left-[72%] lg:top-[40.5%] lg:h-[10vw] lg:w-[12.5vw]" bg="bg-[#3b6cf6]">
            <CrossfadeCycle slides={webSlides} channel="hero-web" label="Website design samples" />
          </FloatCard>
          <FloatCard
            round
            pos="lg:left-[8.5%] lg:top-[56%] lg:h-[5.2vw] lg:w-[5.2vw]"
            spark="-left-[40%] -bottom-[24%] rotate-180"
          >
            <Avatar spec={people[0]} className="h-full w-full" />
          </FloatCard>
          <FloatCard
            round
            pos="lg:left-[24.5%] lg:top-[40.5%] lg:h-[4.2vw] lg:w-[4.2vw]"
            spark="-left-[40%] -top-[24%] -scale-x-100"
          >
            <Avatar spec={people[1]} className="h-full w-full" />
          </FloatCard>
          <FloatCard
            round
            pos="lg:left-[74%] lg:top-[27%] lg:h-[4vw] lg:w-[4vw]"
            spark="-left-[40%] -top-[24%] -scale-x-100"
          >
            <Avatar spec={people[2]} className="h-full w-full" />
          </FloatCard>
          <FloatCard
            round
            pos="lg:left-[87.5%] lg:top-[50%] lg:h-[5.2vw] lg:w-[5.2vw]"
            spark="-right-[40%] -bottom-[24%] -scale-y-100"
          >
            <Avatar spec={people[3]} className="h-full w-full" />
          </FloatCard>
        </div>
      )}

      {/* copy */}
      <div className="pointer-events-none relative z-30 flex w-full max-w-2xl flex-col items-center px-4 pb-28 pt-32 text-center text-white sm:max-w-3xl md:max-w-4xl md:pb-36 md:pt-40 lg:pb-32 lg:pt-32">
        <p
          data-hero-eyebrow=""
          className="mb-4 flex items-center gap-2.5 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.3em] text-white/90 sm:gap-3 sm:text-xs sm:tracking-[0.42em] md:mb-5 md:gap-4 md:text-sm lg:text-[max(12px,0.97vw)]"
        >
          <span className="hidden h-px w-8 bg-white/60 sm:block md:w-12" />
          {site.tagline}
          <span className="hidden h-px w-8 bg-white/60 sm:block md:w-12" />
        </p>
        <h1 className="flex w-full flex-col items-center text-white">
          <span data-hero-fade-word="" className={titleCls}>
            Get a Custom
          </span>
          <span data-hero-fade-word="" className={`${titleCls} pb-[0.06em]`}>
            Logo Made in
          </span>
          <span data-hero-builders="" className="relative mt-3 inline-block md:mt-4">
            <span className={`${barCls} px-5 py-2.5 opacity-0 md:px-8 md:py-3.5`}>
              <Timer className="h-[1.05em] w-[1.05em] shrink-0" strokeWidth={2.5} />
              24:00 Hours.
            </span>
            <span
              data-hero-bar=""
              aria-hidden="true"
              className={`${barCls} absolute inset-0 rounded-[18px] bg-[#0b3a22] px-5 py-2.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10 md:rounded-full md:px-8 md:py-3.5`}
              style={{ clipPath: CLIP_HIDDEN }}
            >
              <Timer className="h-[1.05em] w-[1.05em] shrink-0 text-[#b6f36a]" strokeWidth={2.5} />
              <span className="bg-gradient-to-b from-[#e4ff8a] to-[#3ddc84] bg-clip-text text-transparent">
                24:00 Hours.
              </span>
            </span>
          </span>
        </h1>
        <p
          data-hero-desc=""
          className="mt-6 max-w-md text-lg font-medium leading-snug text-white/95 sm:max-w-lg sm:text-lg md:mt-8 md:max-w-xl md:text-xl lg:max-w-[40vw] lg:text-[max(16px,1.39vw)]"
        >
          Custom logos, brand identities, websites and animation, drawn from scratch by real designers.
        </p>
        <div data-hero-cta="" className="pointer-events-auto mt-7 w-full max-w-xl md:mt-8">
          <HeroForm />
        </div>
        <ul
          data-hero-badges=""
          className="mt-5 hidden flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-medium text-white sm:flex md:mt-6"
        >
          {['Fast Response', 'No Obligation', '100% Custom Designs'].map((b, i) => (
            <li key={b} className="flex items-center gap-2">
              {i > 0 && <span className="mr-1 h-3.5 w-px bg-white/40" />}
              <CheckCircle2 size={16} className="text-white" fill="rgba(255,255,255,0.2)" />
              {b}
            </li>
          ))}
        </ul>
        <div data-hero-scroll="" className="mt-8 flex justify-center md:mt-10">
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault()
              smoothScrollTo('#portfolio')
            }}
            className="pointer-events-auto flex flex-col items-center gap-1.5 rounded-full px-4 py-2 text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronDown size={18} className="animate-bounce" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">Scroll to explore</span>
          </a>
        </div>
      </div>

      {/* marquee strip */}
      <div
        data-hero-marquee=""
        className="absolute bottom-0 left-0 z-20 w-full overflow-hidden border-t border-black/10 bg-white py-3 md:py-4"
      >
        <div data-marquee-track="" className="flex w-max">
          {marqueeRow()}
          {marqueeRow(true)}
        </div>
      </div>
    </section>
  )
}
