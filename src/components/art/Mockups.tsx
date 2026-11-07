import { memo } from 'react'
import { siteShots } from '@/data/canva'
import { LogoArt, type LogoSpec } from './LogoArt'

export type SitePalette = { bg: string; surface: string; ink: string; accent: string; hero: string }

/** Website screen: the real Canva homepage when one exists, otherwise a drawn SVG fallback. */
function SiteScreen({ p, title, variant = 0 }: { p: SitePalette; title: string; variant?: number }) {
  const shot = siteShots[title]
  if (shot) {
    return (
      <img
        src={shot}
        alt={`${title} website design`}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="block h-full w-full object-cover object-left-top"
      />
    )
  }
  return (
    <svg viewBox="0 0 400 250" className="block h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="250" fill={p.bg} />
      {/* nav */}
      <rect x="0" y="0" width="400" height="26" fill={p.surface} />
      <circle cx="18" cy="13" r="6" fill={p.accent} />
      <text x="30" y="17" fontSize="10" fontWeight="900" fill={p.ink} fontFamily="Inter, Arial">
        {title}
      </text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={230 + i * 32} y="10" width="22" height="5" rx="2.5" fill={p.ink} opacity=".35" />
      ))}
      <rect x="360" y="7" width="32" height="12" rx="6" fill={p.accent} />
      {variant % 2 === 0 ? (
        <>
          <rect x="0" y="26" width="400" height="124" fill={p.hero} />
          <rect x="22" y="52" width="170" height="16" rx="3" fill={p.surface} />
          <rect x="22" y="74" width="130" height="16" rx="3" fill={p.surface} />
          <rect x="22" y="100" width="150" height="5" rx="2.5" fill={p.surface} opacity=".6" />
          <rect x="22" y="110" width="120" height="5" rx="2.5" fill={p.surface} opacity=".6" />
          <rect x="22" y="124" width="60" height="16" rx="8" fill={p.accent} />
          <circle cx="300" cy="88" r="46" fill={p.accent} opacity=".9" />
          <rect x="262" y="58" width="90" height="62" rx="10" fill={p.surface} opacity=".85" />
          <rect x="274" y="72" width="40" height="6" rx="3" fill={p.ink} opacity=".5" />
          <rect x="274" y="84" width="62" height="6" rx="3" fill={p.ink} opacity=".3" />
        </>
      ) : (
        <>
          <rect x="0" y="26" width="400" height="124" fill={p.hero} />
          <rect x="110" y="50" width="180" height="16" rx="3" fill={p.surface} />
          <rect x="140" y="72" width="120" height="16" rx="3" fill={p.surface} />
          <rect x="130" y="98" width="140" height="5" rx="2.5" fill={p.surface} opacity=".6" />
          <rect x="166" y="114" width="68" height="18" rx="9" fill={p.accent} />
        </>
      )}
      {/* cards */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${22 + i * 124} 166)`}>
          <rect width="108" height="70" rx="8" fill={p.surface} />
          <rect x="10" y="10" width="88" height="30" rx="5" fill={i === 1 ? p.accent : p.hero} opacity=".8" />
          <rect x="10" y="48" width="60" height="5" rx="2.5" fill={p.ink} opacity=".5" />
          <rect x="10" y="58" width="40" height="5" rx="2.5" fill={p.ink} opacity=".3" />
        </g>
      ))}
    </svg>
  )
}

/** Laptop on a coloured backdrop. */
function LaptopMockupBase({
  p,
  title,
  backdrop,
  variant = 0,
  className = '',
}: {
  p: SitePalette
  title: string
  backdrop: string
  variant?: number
  className?: string
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ background: backdrop }}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="relative w-[78%]" style={{ transform: 'perspective(800px) rotateY(-14deg) rotateX(4deg)' }}>
        <div className="rounded-t-[10px] bg-[#1b1b1f] p-[3%] shadow-[0_30px_40px_-20px_rgba(0,0,0,0.6)]">
          <div className="aspect-[16/10] overflow-hidden rounded-[3px]">
            <SiteScreen p={p} title={title} variant={variant} />
          </div>
        </div>
        <div className="mx-[-7%] h-[7px] rounded-b-[10px] bg-gradient-to-b from-[#d6d6db] to-[#9a9aa2]" />
      </div>
    </div>
  )
}
export const LaptopMockup = memo(LaptopMockupBase)

/** Browser window / desktop monitor. */
function BrowserMockupBase({
  p,
  title,
  variant = 1,
  className = '',
}: {
  p: SitePalette
  title: string
  variant?: number
  className?: string
}) {
  return (
    <div className={`flex h-full w-full flex-col overflow-hidden bg-white ${className}`}>
      <div className="flex h-[9%] min-h-[14px] items-center gap-1 bg-[#ececef] px-[3%]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        <span className="ml-[4%] h-[40%] w-1/3 rounded-full bg-white" />
      </div>
      <div className="min-h-0 flex-1">
        <SiteScreen p={p} title={title} variant={variant} />
      </div>
    </div>
  )
}
export const BrowserMockup = memo(BrowserMockupBase)

/** Stationery set: letterhead + business cards + badge. */
function BrandKitMockupBase({ logo, className = '' }: { logo: LogoSpec; className?: string }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} style={{ background: '#e9e7e2' }}>
      <div className="absolute left-[8%] top-[10%] h-[86%] w-[48%] -rotate-6 rounded-sm bg-white p-[4%] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.35)]">
        <div className="h-[22%] w-[45%] overflow-hidden rounded-sm">
          <LogoArt spec={{ ...logo, bg: '#ffffff', layout: 'inline', tagline: undefined }} className="h-full w-full" />
        </div>
        {[70, 85, 60, 90, 75, 50].map((w, i) => (
          <div key={i} className="mt-[6%] h-[3%] rounded-full bg-black/10" style={{ width: `${w}%` }} />
        ))}
        <div className="absolute bottom-0 left-0 h-[4%] w-full" style={{ background: logo.accent }} />
      </div>
      <div className="absolute right-[6%] top-[14%] h-[34%] w-[44%] rotate-[8deg] overflow-hidden rounded-md shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)]">
        <LogoArt spec={{ ...logo, tagline: undefined }} className="h-full w-full" />
      </div>
      <div className="absolute bottom-[10%] right-[10%] flex h-[34%] w-[40%] -rotate-3 flex-col justify-end rounded-md bg-white p-[3%] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.35)]">
        <div className="h-[10%] w-[60%] rounded-full bg-black/70" />
        <div className="mt-[6%] h-[7%] w-[40%] rounded-full bg-black/25" />
        <div className="mt-[4%] h-[7%] w-[50%] rounded-full bg-black/25" />
        <div
          className="absolute right-[6%] top-[10%] h-[30%] w-[22%] rounded-full"
          style={{ background: logo.accent }}
        />
      </div>
    </div>
  )
}
export const BrandKitMockup = memo(BrandKitMockupBase)

/** Outdoor billboard with a campaign headline. */
function BillboardMockupBase({
  logo,
  headline = 'Open Season',
  className = '',
}: {
  logo: LogoSpec
  headline?: string
  className?: string
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(180deg,#8fb7d9 0%,#d7e6f1 70%,#9aa39a 70%,#7c857c 100%)' }}
    >
      <div
        className="absolute left-[10%] top-[12%] h-[48%] w-[80%] rounded-sm border-[3px] border-[#2b2b2b] shadow-[0_14px_24px_-10px_rgba(0,0,0,0.5)]"
        style={{ background: logo.bg }}
      >
        <div className="flex h-full items-center gap-[6%] px-[6%]">
          <div className="aspect-square h-[70%] overflow-hidden rounded-md">
            <LogoArt spec={{ ...logo, tagline: undefined, name: logo.name.split(' ')[0] }} className="h-full w-full" />
          </div>
          <div className="min-w-0">
            <p
              className="truncate text-[clamp(8px,1.6vw,18px)] font-black uppercase leading-none tracking-tight"
              style={{ color: logo.fg }}
            >
              {headline}
            </p>
            <p
              className="mt-1 truncate text-[clamp(5px,0.7vw,9px)] font-bold uppercase tracking-widest"
              style={{ color: logo.fg, opacity: 0.7 }}
            >
              {logo.name}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute left-[28%] top-[60%] h-[30%] w-[3%] bg-[#2b2b2b]" />
      <div className="absolute left-[68%] top-[60%] h-[30%] w-[3%] bg-[#2b2b2b]" />
    </div>
  )
}
export const BillboardMockup = memo(BillboardMockupBase)
