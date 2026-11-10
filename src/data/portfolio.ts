import { shuffled } from '@/lib/shuffle'
import { sites } from './art'
import { brandWork, clientLogos, motionWork, websiteShots } from './work'

export type PortfolioCategory = 'logo' | 'animated' | 'brand' | 'web'

export type PortfolioItem = {
  id: string
  title: string
  category: PortfolioCategory
  /** Index into `clientLogos` (logo), `motionWork` (animated), `brandWork` (brand) or `sites` (web). */
  ref: number
  variant?: 'laptop' | 'browser'
  /** Web only: `ref` points into `websiteShots` (a photographed mockup) instead of `sites`. */
  shot?: boolean
}

/** Fixed seed so the shuffled Website Design order is the same on every visit. */
const WEB_SHUFFLE_SEED = 7

/** Fixed seed so the shuffled Brand Identity order is the same on every visit. */
const BRAND_SHUFFLE_SEED = 5

/** Fixed seed so the shuffled Animated Logos order is the same on every visit. */
const MOTION_SHUFFLE_SEED = 3

export const portfolio: PortfolioItem[] = [
  ...clientLogos.map((l, i) => ({ id: `logo-${i}`, title: l.name, category: 'logo' as const, ref: i })),
  ...shuffled(
    motionWork.map((m, i): PortfolioItem => ({
      id: `anim-${i}`,
      title: `${m.name} Motion`,
      category: 'animated',
      ref: i,
    })),
    MOTION_SHUFFLE_SEED,
  ),
  ...shuffled(
    brandWork.map((b, i): PortfolioItem => ({
      id: `brand-${i}`,
      title: `${b.name} Identity`,
      category: 'brand',
      ref: i,
    })),
    BRAND_SHUFFLE_SEED,
  ),
  ...shuffled(
    [
      ...sites.map((s, i): PortfolioItem => ({
        id: `web-${i}`,
        title: `${s.title} Website`,
        category: 'web',
        ref: i,
        variant: i % 2 ? 'browser' : 'laptop',
      })),
      ...websiteShots.map((w, i): PortfolioItem => ({
        id: `web-shot-${i}`,
        title: `${w.name} Website`,
        category: 'web',
        ref: i,
        shot: true,
      })),
    ],
    WEB_SHUFFLE_SEED,
  ),
]

export const portfolioTabs: Array<{ id: 'all' | PortfolioCategory; label: string }> = [
  { id: 'all', label: 'All Work' },
  { id: 'logo', label: 'Logo Design' },
  { id: 'animated', label: 'Animated Logos' },
  { id: 'brand', label: 'Brand Identity' },
  { id: 'web', label: 'Website Design' },
]
