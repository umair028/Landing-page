import type { CSSProperties } from 'react'

const DOT_MASK = 'radial-gradient(50% 50%, #000 20%, transparent 100%)'

const dotPatchStyle: CSSProperties = {
  backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1.2px, transparent 1.6px)',
  backgroundSize: '16px 16px',
  maskImage: DOT_MASK,
  WebkitMaskImage: DOT_MASK,
}

/** Green radial backdrop with soft organic shapes and dotted patches, plus an optional video layer. */
export function HeroBackdrop({ video = '' }: { video?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(65% 55% at 50% 42%, rgb(63,228,140) 0%, rgb(22,201,106) 40%, rgb(10,166,83) 72%, rgb(7,132,63) 100%)',
        }}
      />
      {video && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-20 brightness-50 grayscale"
          src={video}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M0 0H560C420 90 230 150 0 160Z" fill="#000" fillOpacity="0.07" />
        <path d="M980 0C1090 110 1270 170 1440 150V0Z" fill="#000" fillOpacity="0.07" />
        <path d="M0 540C190 480 350 560 480 700C560 790 610 860 640 900H0Z" fill="#fff" fillOpacity="0.08" />
        <path d="M0 660C150 630 280 700 360 820C380 850 395 880 400 900H0Z" fill="#fff" fillOpacity="0.07" />
        <path d="M1440 250C1290 320 1200 470 1240 640C1265 760 1345 850 1440 890Z" fill="#fff" fillOpacity="0.07" />
        <path d="M1440 470C1360 520 1320 610 1345 720C1360 790 1400 850 1440 870Z" fill="#fff" fillOpacity="0.06" />
        <path d="M760 900C900 820 1080 800 1240 860C1290 878 1320 890 1340 900Z" fill="#000" fillOpacity="0.06" />
      </svg>
      <div className="absolute left-[17%] top-[14%] h-[220px] w-[300px]" style={dotPatchStyle} />
      <div className="absolute left-[44%] top-[6%] h-[120px] w-[260px]" style={dotPatchStyle} />
      <div className="absolute right-[14%] top-[58%] h-[220px] w-[280px]" style={dotPatchStyle} />
    </div>
  )
}
