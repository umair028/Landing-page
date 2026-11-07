import { memo } from 'react'

/**
 * Procedurally drawn logo presentations used in place of client artwork.
 * Every tile is pure SVG: crisp at any size, zero network cost.
 */
export type LogoSpec = {
  name: string
  tagline?: string
  mark: MarkKind
  bg: string
  fg: string
  accent: string
  layout?: 'stack' | 'inline' | 'badge'
}

export type MarkKind =
  | 'monogram'
  | 'shield'
  | 'hex'
  | 'sunrise'
  | 'leaf'
  | 'peaks'
  | 'stack'
  | 'diamond'
  | 'orbit'
  | 'wave'
  | 'spark'
  | 'bolt'
  | 'crown'
  | 'drop'

function Mark({ kind, fg, accent, letter }: { kind: MarkKind; fg: string; accent: string; letter: string }) {
  switch (kind) {
    case 'monogram':
      return (
        <g>
          <circle cx="0" cy="0" r="34" fill="none" stroke={fg} strokeWidth="5" />
          <circle cx="0" cy="0" r="25" fill={accent} />
          <text x="0" y="11" textAnchor="middle" fontSize="32" fontWeight="900" fill={fg} fontFamily="Inter, Arial">
            {letter}
          </text>
        </g>
      )
    case 'shield':
      return (
        <g>
          <path d="M0 -36 L30 -24 V4 C30 22 16 32 0 38 C-16 32 -30 22 -30 4 V-24 Z" fill={accent} />
          <path d="M0 -26 L20 -18 V3 C20 15 11 22 0 27 Z" fill={fg} opacity=".9" />
          <text x="-8" y="9" textAnchor="middle" fontSize="24" fontWeight="900" fill={fg} fontFamily="Inter, Arial">
            {letter}
          </text>
        </g>
      )
    case 'hex':
      return (
        <g>
          <path
            d="M0 -36 L31 -18 V18 L0 36 L-31 18 V-18 Z"
            fill="none"
            stroke={accent}
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path d="M0 -20 L17 -10 V10 L0 20 L-17 10 V-10 Z" fill={fg} />
        </g>
      )
    case 'sunrise':
      return (
        <g>
          <path d="M-34 12 A34 34 0 0 1 34 12 Z" fill={accent} />
          {[-60, -30, 0, 30, 60].map((a) => (
            <rect key={a} x="-2.5" y="-40" width="5" height="12" rx="2.5" fill={fg} transform={`rotate(${a})`} />
          ))}
          <rect x="-38" y="16" width="76" height="5" rx="2.5" fill={fg} />
          <rect x="-26" y="25" width="52" height="5" rx="2.5" fill={fg} opacity=".7" />
        </g>
      )
    case 'leaf':
      return (
        <g>
          <path d="M-26 28 C-30 -10 0 -34 30 -32 C32 0 10 30 -26 28 Z" fill={accent} />
          <path d="M-22 24 C-6 6 8 -8 22 -24" stroke={fg} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      )
    case 'peaks':
      return (
        <g>
          <path d="M-38 26 L-12 -18 L2 4 L14 -28 L38 26 Z" fill={accent} />
          <path d="M14 -28 L22 -12 L16 -8 L10 -14 L6 -8 Z" fill={fg} />
          <circle cx="-22" cy="-24" r="7" fill={fg} />
        </g>
      )
    case 'stack':
      return (
        <g>
          <rect x="-30" y="-30" width="44" height="16" rx="8" fill={accent} />
          <rect x="-14" y="-8" width="44" height="16" rx="8" fill={fg} />
          <rect x="-30" y="14" width="44" height="16" rx="8" fill={accent} />
        </g>
      )
    case 'diamond':
      return (
        <g>
          <path d="M0 -36 L32 0 L0 36 L-32 0 Z" fill={accent} />
          <path d="M0 -36 L32 0 L0 0 Z" fill={fg} opacity=".35" />
          <path d="M0 -14 L14 0 L0 14 L-14 0 Z" fill={fg} />
        </g>
      )
    case 'orbit':
      return (
        <g>
          <ellipse cx="0" cy="0" rx="36" ry="14" fill="none" stroke={accent} strokeWidth="5" transform="rotate(-25)" />
          <ellipse cx="0" cy="0" rx="36" ry="14" fill="none" stroke={fg} strokeWidth="5" transform="rotate(35)" />
          <circle cx="0" cy="0" r="10" fill={accent} />
        </g>
      )
    case 'wave':
      return (
        <g>
          <circle cx="0" cy="0" r="34" fill={accent} />
          <path d="M-34 4 C-22 -8 -10 16 2 4 S 24 -6 34 4 V12 C24 2 14 22 2 12 S-22 0 -34 12 Z" fill={fg} />
          <path d="M-30 18 C-18 8 -8 28 4 18 S 22 10 30 18" stroke={fg} strokeWidth="4" fill="none" />
        </g>
      )
    case 'spark':
      return (
        <g>
          <path d="M0 -38 C4 -10 10 -4 38 0 C10 4 4 10 0 38 C-4 10 -10 4 -38 0 C-10 -4 -4 -10 0 -38 Z" fill={accent} />
          <circle cx="24" cy="-24" r="6" fill={fg} />
        </g>
      )
    case 'bolt':
      return (
        <g>
          <rect x="-34" y="-34" width="68" height="68" rx="18" fill={accent} />
          <path d="M6 -26 L-16 4 H0 L-6 26 L16 -6 H0 Z" fill={fg} />
        </g>
      )
    case 'crown':
      return (
        <g>
          <path d="M-34 18 L-30 -20 L-14 -2 L0 -30 L14 -2 L30 -20 L34 18 Z" fill={accent} />
          <rect x="-34" y="22" width="68" height="8" rx="4" fill={fg} />
          <circle cx="0" cy="2" r="5" fill={fg} />
        </g>
      )
    case 'drop':
      return (
        <g>
          <path d="M0 -38 C18 -14 28 0 28 12 A28 28 0 0 1 -28 12 C-28 0 -18 -14 0 -38 Z" fill={accent} />
          <path d="M-12 12 A12 12 0 0 0 4 24" stroke={fg} strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      )
  }
}

function LogoArtBase({
  spec,
  className = '',
  framed = false,
}: {
  spec: LogoSpec
  className?: string
  framed?: boolean
}) {
  const { name, tagline, mark, bg, fg, accent, layout = 'stack' } = spec
  const letter =
    name
      .replace(/[^A-Za-z]/g, '')
      .charAt(0)
      .toUpperCase() || 'B'
  const fontSize = name.length > 12 ? 22 : name.length > 8 ? 27 : 32

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label={`${name} logo`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="320" height="240" fill={bg} />
      {framed && <rect x="14" y="14" width="292" height="212" rx="10" fill="none" stroke={fg} strokeOpacity=".12" />}
      {layout === 'inline' ? (
        <g>
          <g transform="translate(82 120) scale(.9)">
            <Mark kind={mark} fg={fg} accent={accent} letter={letter} />
          </g>
          <text
            x="128"
            y="122"
            fontSize={fontSize * 0.85}
            fontWeight="900"
            fill={fg}
            fontFamily="Inter, Arial"
            letterSpacing="-0.5"
          >
            {name}
          </text>
          {tagline && (
            <text
              x="129"
              y="142"
              fontSize="9.5"
              fontWeight="700"
              fill={fg}
              opacity=".6"
              fontFamily="Inter, Arial"
              letterSpacing="2.4"
            >
              {tagline.toUpperCase()}
            </text>
          )}
        </g>
      ) : layout === 'badge' ? (
        <g>
          <circle
            cx="160"
            cy="112"
            r="78"
            fill="none"
            stroke={fg}
            strokeWidth="3"
            strokeDasharray="2 6"
            opacity=".55"
          />
          <circle cx="160" cy="112" r="66" fill={accent} opacity=".15" />
          <g transform="translate(160 96) scale(.85)">
            <Mark kind={mark} fg={fg} accent={accent} letter={letter} />
          </g>
          <rect x="70" y="140" width="180" height="34" rx="6" fill={fg} />
          <text
            x="160"
            y="164"
            textAnchor="middle"
            fontSize={Math.min(fontSize * 0.72, 20)}
            fontWeight="900"
            fill={bg}
            fontFamily="Inter, Arial"
            letterSpacing="1"
          >
            {name.toUpperCase()}
          </text>
          {tagline && (
            <text
              x="160"
              y="198"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill={fg}
              opacity=".7"
              fontFamily="Inter, Arial"
              letterSpacing="3"
            >
              {tagline.toUpperCase()}
            </text>
          )}
        </g>
      ) : (
        <g>
          <g transform="translate(160 92)">
            <Mark kind={mark} fg={fg} accent={accent} letter={letter} />
          </g>
          <text
            x="160"
            y="166"
            textAnchor="middle"
            fontSize={fontSize}
            fontWeight="900"
            fill={fg}
            fontFamily="Inter, Arial"
            letterSpacing="-1"
          >
            {name}
          </text>
          {tagline && (
            <text
              x="160"
              y="186"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fill={fg}
              opacity=".6"
              fontFamily="Inter, Arial"
              letterSpacing="3"
            >
              {tagline.toUpperCase()}
            </text>
          )}
        </g>
      )}
    </svg>
  )
}

export const LogoArt = memo(LogoArtBase)

const spin = (s: number, dir = 'normal') => ({
  animation: `mark-spin ${s}s linear infinite ${dir}`,
  transformOrigin: 'center',
  transformBox: 'fill-box' as const,
})

/** A looping animated mark that stands in for animated-logo GIFs. */
export function AnimatedMark({
  className = '',
  bg = '#0d0d12',
  accent = '#04d66d',
  fg = '#ffffff',
  name = 'Pulse',
  variant = 'ring',
}: {
  className?: string
  bg?: string
  accent?: string
  fg?: string
  name?: string
  variant?: 'ring' | 'bars' | 'orbit' | 'squares'
}) {
  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label={`${name} animated logo`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="320" height="240" fill={bg} />
      {variant === 'bars' && (
        <g transform="translate(160 104)">
          {[-36, -18, 0, 18, 36].map((x, i) => (
            <rect
              key={x}
              x={x - 6}
              y="-36"
              width="12"
              height="72"
              rx="6"
              fill={i % 2 ? fg : accent}
              style={{
                animation: `mark-bar 1.1s ease-in-out ${i * 0.12}s infinite`,
                transformOrigin: 'center',
                transformBox: 'fill-box',
              }}
            />
          ))}
        </g>
      )}
      {variant === 'orbit' && (
        <g transform="translate(160 100)">
          <circle r="16" fill={accent} />
          <g style={spin(2.4)}>
            <circle r="44" fill="none" stroke={fg} strokeOpacity=".2" strokeWidth="2" />
            <circle cx="44" r="8" fill={fg} />
          </g>
          <g style={spin(3.6, 'reverse')}>
            <circle r="30" fill="none" stroke="none" />
            <circle cy="-30" r="6" fill={accent} />
          </g>
        </g>
      )}
      {variant === 'squares' && (
        <g transform="translate(160 100)">
          <g style={spin(4)}>
            <rect x="-34" y="-34" width="68" height="68" rx="12" fill="none" stroke={accent} strokeWidth="6" />
          </g>
          <g style={spin(2.6, 'reverse')}>
            <rect x="-18" y="-18" width="36" height="36" rx="6" fill={fg} />
          </g>
        </g>
      )}
      {variant === 'ring' && (
        <g transform="translate(160 100)">
          <g style={{ animation: 'mark-spin 6s linear infinite', transformOrigin: 'center', transformBox: 'fill-box' }}>
            <circle r="48" fill="none" stroke={accent} strokeWidth="6" strokeDasharray="70 30" strokeLinecap="round" />
          </g>
          <circle
            r="30"
            fill="none"
            stroke={fg}
            strokeWidth="5"
            strokeDasharray="300"
            style={{ animation: 'mark-draw 3.2s ease-in-out infinite' }}
          />
          <g
            style={{
              animation: 'mark-pulse 1.6s ease-in-out infinite',
              transformOrigin: 'center',
              transformBox: 'fill-box',
            }}
          >
            <circle r="12" fill={accent} />
          </g>
        </g>
      )}
      <text
        x="160"
        y="190"
        textAnchor="middle"
        fontSize="26"
        fontWeight="900"
        fill={fg}
        fontFamily="Inter, Arial"
        letterSpacing="-1"
      >
        {name}
      </text>
    </svg>
  )
}
