import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { logoMarks } from '@/data/work'
import { CanvaLogo } from '@/components/art/CanvaArt'
import { canva } from '@/data/canva'

type Tile =
  | { kind: 'mark'; ref: number }
  | { kind: 'img'; img: { src: string; alt: string }; bg: string; pad?: string }
  | { kind: 'stat'; value: string; label: string; bg: string; fg: string }

/** The marks are exported on white, so their tiles match. */
const MARK_BG = '#ffffff'

const lanes: Tile[][] = [
  [
    { kind: 'mark', ref: 0 },
    { kind: 'img', img: canva.glowAtelier, bg: canva.glowAtelier.bg, pad: '0' },
    { kind: 'mark', ref: 1 },
    { kind: 'mark', ref: 2 },
    { kind: 'img', img: canva.voltage, bg: canva.voltage.bg, pad: '0' },
    { kind: 'stat', value: '120+', label: 'Projects', bg: '#6a3df2', fg: '#ffffff' },
    { kind: 'mark', ref: 3 },
    { kind: 'mark', ref: 4 },
    { kind: 'mark', ref: 5 },
    { kind: 'stat', value: '98%', label: 'Referrals', bg: '#04d66d', fg: '#000000' },
    { kind: 'mark', ref: 6 },
  ],
  [
    { kind: 'stat', value: '850+', label: 'Logos Delivered', bg: '#f5e52b', fg: '#000000' },
    { kind: 'mark', ref: 7 },
    { kind: 'img', img: { src: canva.skull.poster, alt: canva.skull.alt }, bg: '#000000', pad: '0' },
    { kind: 'mark', ref: 8 },
    { kind: 'img', img: canva.crownroast, bg: canva.crownroast.bg, pad: '0' },
    { kind: 'mark', ref: 9 },
    { kind: 'stat', value: '4.9★', label: 'Client Rating', bg: '#0b1f14', fg: '#04d66d' },
    { kind: 'mark', ref: 10 },
    { kind: 'mark', ref: 11 },
  ],
  [
    { kind: 'mark', ref: 12 },
    { kind: 'stat', value: '30+', label: 'Countries', bg: '#ff6b2b', fg: '#ffffff' },
    { kind: 'img', img: canva.harborline, bg: canva.harborline.bg, pad: '0' },
    { kind: 'mark', ref: 13 },
    { kind: 'img', img: canva.northpeak, bg: canva.northpeak.bg, pad: '0' },
    { kind: 'mark', ref: 14 },
    { kind: 'mark', ref: 15 },
    { kind: 'stat', value: '100%', label: 'Custom Made', bg: '#111111', fg: '#ffffff' },
    { kind: 'mark', ref: 16 },
  ],
]

/** White "one connected team" block with three endlessly scrolling logo lanes. */
export function LogoWallSection() {
  return (
    <section id="about" className="overflow-hidden bg-white px-6 py-24 text-black md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div data-reveal-children="" className="mx-auto max-w-md lg:mx-0">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-accent">One connected team</p>
          <h2 className="text-4xl font-black normal-case leading-[0.95] tracking-[-0.04em] sm:text-6xl">
            Custom marks,
            <br />
            <span className="whitespace-nowrap">every industry.</span>
          </h2>
          <p className="mt-6 max-w-xl text-sm font-semibold leading-relaxed text-black md:text-base">
            Every logo on this wall was drawn for a specific business, never lifted from a template library.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-black/65 md:text-base">
            Different companies need different signals: bold, refined, playful or technical. That range is the point.
            Your identity should fit your market, not a generic preset.
          </p>
          <Link
            to="/brief"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-7 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_14px_30px_rgba(0,0,0,0.2)] transition-transform hover:scale-105"
          >
            Start Your Project Brief
            <ArrowRight size={16} />
          </Link>
        </div>
        <div data-reveal="scale" className="relative h-[560px] overflow-hidden md:h-[600px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white to-transparent" />
          <div className="mx-auto grid h-full max-w-[386px] grid-cols-3 gap-x-3 md:gap-x-4">
            {lanes.map((lane, li) => (
              <div key={li} className="overflow-hidden">
                <div className={li === 1 ? 'logo-track-down' : 'logo-track-up'}>
                  {[...lane, ...lane].map((t, i) => (
                    <div
                      key={i}
                      aria-hidden={i >= lane.length || undefined}
                      className="mx-auto mb-4 flex aspect-square w-full max-w-[118px] flex-col items-center justify-center overflow-hidden rounded-lg text-center shadow-[0_16px_30px_rgba(0,0,0,0.16)]"
                      style={{
                        backgroundColor: t.kind === 'mark' ? MARK_BG : t.bg,
                        color: t.kind === 'stat' ? t.fg : undefined,
                      }}
                    >
                      {t.kind === 'img' ? (
                        <CanvaLogo img={t.img} bg={t.bg} pad={t.pad} />
                      ) : t.kind === 'mark' ? (
                        <CanvaLogo img={logoMarks[t.ref]} bg={MARK_BG} pad="0" />
                      ) : (
                        <>
                          <p className="text-2xl font-black tracking-tight md:text-3xl">{t.value}</p>
                          <p className="mt-1 px-2 text-[10px] font-bold uppercase tracking-widest opacity-80">
                            {t.label}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
