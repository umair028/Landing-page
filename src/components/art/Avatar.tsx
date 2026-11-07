import { memo } from 'react'

export type AvatarSpec = { name: string; skin: string; hair: string; shirt: string; bg: string; style: 0 | 1 | 2 | 3 }

/** Flat illustrated portrait, used as a placeholder for team / client photos. */
function AvatarBase({ spec, className = '' }: { spec: AvatarSpec; className?: string }) {
  const { skin, hair, shirt, bg, style, name } = spec
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={name}>
      <rect width="100" height="100" fill={bg} />
      {style === 1 && <path d="M22 60 C18 30 30 14 50 14 C70 14 82 30 78 60 Z" fill={hair} />}
      {style === 3 && <circle cx="50" cy="40" r="30" fill={hair} />}
      <path d="M14 104 C16 80 32 72 50 72 C68 72 84 80 86 104 Z" fill={shirt} />
      <rect x="43" y="56" width="14" height="18" rx="6" fill={skin} />
      <ellipse cx="50" cy="44" rx="17" ry="20" fill={skin} />
      {style === 0 && (
        <path d="M32 40 C32 22 44 18 52 18 C64 18 70 26 68 40 C64 30 56 28 46 30 C40 31 35 34 32 40 Z" fill={hair} />
      )}
      {style === 1 && <path d="M33 38 C34 24 44 20 52 20 C62 20 68 28 67 38 C60 30 44 28 33 38 Z" fill={hair} />}
      {style === 2 && (
        <path d="M33 36 C33 22 42 20 50 20 C60 20 67 24 67 36 C67 30 60 27 50 27 C40 27 34 30 33 36 Z" fill={hair} />
      )}
      {style === 3 && <path d="M33 38 C34 24 44 22 50 22 C58 22 66 26 67 38 C60 31 42 31 33 38 Z" fill={hair} />}
      <circle cx="43" cy="45" r="1.8" fill="#1d1d1f" />
      <circle cx="57" cy="45" r="1.8" fill="#1d1d1f" />
      <path d="M44 54 C47 57 53 57 56 54" stroke="#1d1d1f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export const Avatar = memo(AvatarBase)
