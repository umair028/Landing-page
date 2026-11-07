import { site } from '@/config/site'

/** Studio wordmark. `light` is the footer version on dark backgrounds. */
export function BrandLogo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  const ink = light ? '#f2f2f2' : '#0b1f14'
  const [first, ...rest] = site.name.split(' ')
  return (
    <svg viewBox="0 0 200 52" className={className} role="img" aria-label={site.name}>
      <rect x="0" y="4" width="44" height="44" rx="12" fill="#04d66d" />
      <path
        d="M12 38V14h10.5c6 0 9.5 3 9.5 7.4 0 2.8-1.5 4.7-3.8 5.6 3 .8 4.9 3 4.9 6.2 0 4.9-3.8 8.8-10.5 8.8H12Z"
        fill="#0b1f14"
        transform="translate(0 -2.5)"
      />
      <circle cx="35.5" cy="36.5" r="4" fill="#fff" />
      <text x="54" y="30" fontSize="25" fontWeight="900" fill={ink} fontFamily="Inter, Arial" letterSpacing="-1.2">
        {first}
      </text>
      <text
        x="55"
        y="45"
        fontSize="9"
        fontWeight="700"
        fill={light ? '#04d66d' : '#0a8a48'}
        fontFamily="Inter, Arial"
        letterSpacing="3.2"
      >
        {(rest.join(' ') || 'STUDIO').toUpperCase()}
      </text>
    </svg>
  )
}
