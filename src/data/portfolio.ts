import { logos, sites } from './art'

export type PortfolioCategory = 'logo' | 'animated' | 'brand' | 'web'

export type PortfolioItem = {
  id: string
  title: string
  category: PortfolioCategory
  /** Index into `logos` or `sites`, depending on the category. */
  ref: number
  variant?: 'laptop' | 'browser' | 'kit' | 'billboard'
}

/** [background, accent] pairs for the animated-logo tiles. */
export const animatedPalette: Array<[bg: string, accent: string]> = [
  ['#0d0d12', '#04d66d'],
  ['#1a1035', '#ff4fa3'],
  ['#0f2747', '#3cc6ff'],
  ['#111114', '#f5e52b'],
  ['#2a1a12', '#d99a3e'],
  ['#0a0a0a', '#7b5cff'],
  ['#173430', '#c8873f'],
  ['#ff3d6e', '#ffffff'],
  ['#0e1726', '#ff7a1a'],
  ['#123d1d', '#7fd1a0'],
]

export const portfolio: PortfolioItem[] = [
  ...logos.map((l, i) => ({ id: `logo-${i}`, title: l.name, category: 'logo' as const, ref: i })),
  ...animatedPalette.map((_, i) => ({
    id: `anim-${i}`,
    title: `${logos[(i * 3) % logos.length].name} Motion`,
    category: 'animated' as const,
    ref: i,
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `brand-${i}`,
    title: `${logos[(i * 5 + 2) % logos.length].name} Identity`,
    category: 'brand' as const,
    ref: (i * 5 + 2) % logos.length,
    variant: (i % 3 === 2 ? 'billboard' : 'kit') as PortfolioItem['variant'],
  })),
  ...sites.map((s, i) => ({
    id: `web-${i}`,
    title: `${s.title} Website`,
    category: 'web' as const,
    ref: i,
    variant: (i % 2 ? 'browser' : 'laptop') as PortfolioItem['variant'],
  })),
]

export const portfolioTabs: Array<{ id: 'all' | PortfolioCategory; label: string }> = [
  { id: 'all', label: 'All Work' },
  { id: 'logo', label: 'Logo Design' },
  { id: 'animated', label: 'Animated Logos' },
  { id: 'brand', label: 'Brand Identity' },
  { id: 'web', label: 'Website Design' },
]
