import { ArrowUpRight, Heart, Palette, Rocket, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { CanvaCover, CanvaLogo } from '@/components/art/CanvaArt'
import { canva } from '@/data/canva'
import { MotionLink } from '@/components/shared/MotionLink'

type WorkItem =
  | { kind: 'work'; n: string; title: string; art: ReactNode }
  | {
      kind: 'stat'
      label: string
      icon: LucideIcon
      value: string
      caption: string
      detail: string
      bg: string
      fg: string
    }

const items: WorkItem[] = [
  {
    kind: 'work',
    n: '01',
    title: 'Logo Design',
    art: <CanvaCover img={canva.designHorizon} className="h-full w-full object-center" />,
  },
  {
    kind: 'work',
    n: '02',
    title: 'Website Design',
    art: <CanvaCover img={canva.businessPro} className="h-full w-full object-[57%_50%]" />,
  },
  {
    kind: 'stat',
    label: 'Branding',
    icon: Palette,
    value: '25+',
    caption: 'Brand identities launched',
    detail: 'Across brand, digital and campaign work',
    bg: '#04d66d',
    fg: '#000000',
  },
  {
    kind: 'work',
    n: '04',
    title: 'Animated Logo',
    art: <CanvaCover img={canva.animatedLogo} className="h-full w-full object-center" />,
  },
  {
    kind: 'work',
    n: '05',
    title: 'Brand Identity',
    art: <CanvaLogo img={canva.brandKit} bg={canva.brandKit.bg} pad="0" />,
  },
  {
    kind: 'stat',
    label: 'Delivery',
    icon: Rocket,
    value: '50+',
    caption: 'Projects delivered',
    detail: 'Brand, web and motion work shipped',
    bg: '#800000',
    fg: '#ffffff',
  },
  {
    kind: 'work',
    n: '07',
    title: 'E-commerce Website',
    art: <CanvaCover img={canva.logoAgency} className="h-full w-full object-center" />,
  },
  {
    kind: 'stat',
    label: 'Clients',
    icon: Heart,
    value: '98%',
    caption: 'Clients who refer us',
    detail: 'Built through long-term creative partnerships',
    bg: '#f5e52b',
    fg: '#000000',
  },
]

const COLS = 4
const COL_OFFSET = [0, 44, 40, 0]
const COL_TRAVEL = [46, 12, 20, 40]
const MAX_TILT = 48
const LERP = 0.18
const columns = Array.from({ length: COLS }, (_, c) => items.filter((_, i) => i % COLS === c))

function WorkCard({ item }: { item: WorkItem }) {
  if (item.kind === 'work') {
    return (
      <div
        data-work-item=""
        className="work-item rounded-2xl [backface-visibility:hidden] [transform-style:preserve-3d] max-md:relative max-md:w-[min(305px,100vw_-_48px)] max-md:[grid-area:1/1]"
      >
        <div data-work-visual="" className="block aspect-[305/250] w-full overflow-hidden rounded-2xl">
          {item.art}
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 px-1 pt-3">
          <p className="flex min-w-0 items-baseline gap-2.5">
            <span className="font-mono text-[11px] font-medium text-primary">{item.n}</span>
            <span className="text-[15px] font-semibold leading-tight tracking-[-0.01em] text-white">{item.title}</span>
          </p>
          <ArrowUpRight size={16} className="flex-none text-white/40" />
        </div>
      </div>
    )
  }
  const Icon = item.icon
  const dark = item.fg === '#000000'
  return (
    <div
      data-work-item=""
      className="work-item rounded-2xl [backface-visibility:hidden] [transform-style:preserve-3d] max-md:relative max-md:w-[min(305px,100vw_-_48px)] max-md:[grid-area:1/1]"
    >
      <div
        data-work-visual=""
        className="relative flex aspect-[305/250] w-full flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-4 lg:p-5 xl:p-7"
        style={{ backgroundColor: item.bg, color: item.fg }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border-[22px] border-current opacity-[0.08]"
        />
        <span
          className={`relative inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[11px] md:py-1 lg:py-1.5 font-bold uppercase tracking-[0.18em] ${dark ? 'bg-black/10' : 'bg-white/15'}`}
        >
          <Icon size={14} strokeWidth={2.5} />
          {item.label}
        </span>
        <div className="relative">
          <p className="text-6xl font-black leading-none tracking-[-0.04em] md:text-4xl lg:text-6xl xl:text-7xl">{item.value}</p>
          <p className="mt-3 text-base font-bold leading-tight md:mt-1.5 md:text-xs lg:mt-2 lg:text-base xl:mt-3 xl:text-lg">{item.caption}</p>
        </div>
      </div>
      <div className="mt-3 flex min-w-0 items-center gap-3 px-1">
        <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-white/10 text-primary ring-1 ring-white/15">
          <Icon size={15} strokeWidth={2.5} />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="text-[13px] font-semibold text-white">{item.detail}</p>
          <p className="truncate text-[11px] font-medium text-white/50">Studio stats</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Four staggered columns drift at different speeds (scrubbed parallax) while each
 * card folds backwards in 3D (rotateX up to 48°, pushed along Z) as it exits the top.
 * On phones the cards cross-fade in a single slot instead.
 */
export function WorkSection() {
  const section = useRef<HTMLElement>(null)
  const grid = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = section.current
    const gridEl = grid.current
    if (!root || !gridEl) return
    const wrap = gridEl.parentElement!
    const cols = gsap.utils.toArray<HTMLElement>('.work-col', root)
    const cards = gsap.utils.toArray<HTMLElement>('[data-work-item]', root)
    const visuals = cards.map((c) => c.querySelector<HTMLElement>('[data-work-visual]'))
    const reduced = prefersReducedMotion()
    const offsetIn = (el: HTMLElement) => (el.parentElement ? el.parentElement.offsetTop + el.offsetTop : 0)
    const easeIn = gsap.parseEase('power1.in')
    let firstRun = true

    const mm = gsap.matchMedia()
    mm.add({ isMobile: '(max-width: 767px)', isDesktop: '(min-width: 768px)' }, (ctx) => {
      const { isMobile } = ctx.conditions as { isMobile: boolean }
      const tweens: Array<gsap.core.Animation> = []
      const triggers: Array<ScrollTrigger & { cleanupTicker?: () => void }> = []
      gsap.set(cols, { clearProps: 'transform' })
      gsap.set(cards, { clearProps: 'filter,opacity,transform,visibility' })
      gsap.set(visuals, { clearProps: 'filter' })

      if (reduced) {
        if (isMobile) gsap.set(cards.slice(1), { autoAlpha: 0 })
        return
      }

      if (isMobile) {
        gsap.set(cards, { autoAlpha: 0 })
        gsap.set(cards[0], { autoAlpha: 1 })
        const tl = gsap.timeline({
          repeat: -1,
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play pause resume pause',
          },
        })
        cards.forEach((card, i) => {
          const next = cards[(i + 1) % cards.length]
          const label = `swap-${i}`
          tl.addLabel(label, '+=1.2')
            .to(card, { autoAlpha: 0, duration: 0.8, ease: 'power1.inOut' }, label)
            .to(next, { autoAlpha: 1, duration: 0.8, ease: 'power1.inOut' }, label)
        })
        tweens.push(tl)
      } else {
        cols.forEach((col, i) => {
          const travel = COL_TRAVEL[i % COL_TRAVEL.length]
          gsap.set(col, { force3D: true })
          tweens.push(
            gsap.fromTo(
              col,
              { y: travel },
              {
                y: -travel,
                ease: 'none',
                force3D: true,
                scrollTrigger: {
                  trigger: root,
                  start: 'top bottom+=70%',
                  end: 'center top',
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              },
            ),
          )
        })
        cards.forEach((card, i) => {
          const visual = visuals[i]
          const setRot = gsap.quickSetter(card, 'rotationX', 'deg') as (v: number) => void
          const setZ = gsap.quickSetter(card, 'z', 'px') as (v: number) => void
          const dim = gsap.utils.mapRange(0.55, 1, 1, 0.35)
          const s = { current: 0, target: 0, ticker: null as null | (() => void) }
          gsap.set(card, { force3D: true, transformOrigin: '50% 50%' })
          const render = (p: number) => {
            const rot = MAX_TILT * easeIn(p)
            setRot(rot)
            setZ(-900 * (1 - Math.cos((rot * Math.PI) / 180)))
            const b = p > 0.55 ? gsap.utils.clamp(0.35, 1, dim(p)) : 1
            if (visual) visual.style.filter = b < 1 ? `brightness(${b.toFixed(3)})` : ''
          }
          const step = () => {
            s.current += LERP * (s.target - s.current)
            if (Math.abs(s.target - s.current) < 0.001) {
              s.current = s.target
              if (s.ticker) {
                gsap.ticker.remove(s.ticker)
                s.ticker = null
              }
            }
            render(s.current)
          }
          const setTarget = (p: number) => {
            s.target = p
            if (p === 0 || p === 1) {
              s.current = p
              if (s.ticker) {
                gsap.ticker.remove(s.ticker)
                s.ticker = null
              }
              step()
              return
            }
            if (!s.ticker) {
              s.ticker = step
              gsap.ticker.add(step)
            }
          }
          const st = ScrollTrigger.create({
            trigger: gridEl,
            start: 'bottom bottom',
            end: () => `top+=${offsetIn(card)} top-=${Math.round(card.offsetHeight * 0.35)}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => setTarget(self.progress),
            onRefresh: (self) => setTarget(self.progress),
            onLeave: () => setTarget(1),
            onLeaveBack: () => setTarget(0),
          }) as ScrollTrigger & { cleanupTicker?: () => void }
          st.cleanupTicker = () => {
            if (s.ticker) gsap.ticker.remove(s.ticker)
            s.ticker = null
          }
          triggers.push(st)
          setTarget(st.progress)
        })
      }

      if (firstRun) {
        gsap.set(wrap, { autoAlpha: 0 })
        tweens.push(
          gsap.to(wrap, {
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power1.out',
            scrollTrigger: { trigger: root, start: 'top 88%', once: true },
          }),
        )
      } else gsap.set(wrap, { autoAlpha: 1 })
      firstRun = false

      const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
      return () => {
        cancelAnimationFrame(raf)
        triggers.forEach((t) => {
          t.cleanupTicker?.()
          t.kill()
        })
        tweens.forEach((t) => {
          ;(t as gsap.core.Tween).scrollTrigger?.kill()
          t.kill()
        })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={section}
      id="work"
      className="relative flex flex-col items-center bg-black pt-16 text-white after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-[1] after:h-[clamp(80px,8vw,120px)] after:bg-gradient-to-t after:from-black after:to-transparent max-md:pb-16 max-md:after:hidden md:pb-[clamp(60px,6vw,100px)] md:pt-[clamp(80px,8.3vw,120px)]"
    >
      <div className="relative z-[2] flex w-full flex-col items-center text-center">
        <div className="container mx-auto mb-24 px-6 text-center max-md:mb-12">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-primary">Proof, not promises</p>
          <h2
            data-reveal=""
            className="mx-auto max-w-4xl text-4xl font-black normal-case leading-[0.95] tracking-[-0.04em] sm:text-6xl"
          >
            Different businesses,
            <br />
            one sharper first impression.
          </h2>
          <p className="mx-auto mb-8 mt-6 max-w-xl text-sm font-medium leading-relaxed text-white/55 md:text-base">
            Logos, websites and motion for real companies, each shaped for its own market rather than a one-size
            template.
          </p>
          <MotionLink
            to="/portfolio"
            className="relative inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-sm font-black uppercase tracking-tighter text-black transition-colors hover:bg-white"
          >
            Browse the portfolio
          </MotionLink>
        </div>
      </div>
      <div className="pointer-events-none z-0 overflow-hidden max-md:relative max-md:h-[clamp(300px,86vw,350px)] max-md:w-full max-md:self-stretch md:relative md:w-full md:overflow-visible">
        <div
          ref={grid}
          className="max-md:absolute max-md:inset-0 max-md:grid max-md:w-full max-md:place-items-center md:relative md:mx-auto md:flex md:w-[min(1480px,100vw_-_40px)] md:gap-5 md:[perspective-origin:50%_0%] md:[perspective:1200px] md:[transform-style:preserve-3d]"
        >
          {columns.map((col, i) => (
            <div
              key={i}
              style={{ ['--col-offset' as string]: `${COL_OFFSET[i]}px` }}
              className="work-col max-md:contents md:mt-[var(--col-offset)] md:flex md:min-w-0 md:flex-1 md:flex-col md:gap-5 md:[transform-style:preserve-3d]"
            >
              {col.map((item, j) => (
                <WorkCard key={j} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
