import type { ReactNode } from 'react'
import { sites } from '@/data/art'
import { siteShots } from '@/data/canva'
import { brandWork, clientLogos, motionWork, websiteShots, type WorkImage } from '@/data/work'
import { BrowserMockup } from '@/components/art/Mockups'
import { WorkPiece } from '@/components/art/PortfolioArt'
import { shuffled } from '@/lib/shuffle'

/*
 * Slides for the rotating hero cards, built from the same pieces as the Portfolio section.
 * Every piece goes to exactly one card, so two cards never show the same work at once.
 * Each card's order is shuffled with a fixed seed: mixed, but stable between visits.
 */

/** Fixed seed for the hero card shuffles. */
const HERO_SHUFFLE_SEED = 11

const piece = (p: WorkImage) => <WorkPiece key={p.src} piece={p} className="h-full w-full" />

/** A drawn website from the Website Design tab, framed as a browser on its backdrop colour. */
const monitor = (i: number) => (
  <div key={`site-${i}`} className="h-full w-full p-[8%] pb-[16%]" style={{ background: sites[i].backdrop }}>
    <div className="h-full w-full overflow-hidden rounded-md shadow-lg">
      <BrowserMockup p={sites[i].p} title={sites[i].title} variant={i} />
    </div>
  </div>
)

/** Splits a list into its even- and odd-indexed halves. */
const halves = <T,>(items: readonly T[]): [T[], T[]] => [
  items.filter((_, i) => i % 2 === 0),
  items.filter((_, i) => i % 2 === 1),
]

const [logosA, logosB] = halves(clientLogos)
const [motionA, motionB] = halves(motionWork)
const [shotsA, shotsB] = halves(websiteShots)

const deck = (items: WorkImage[], seed: number) => shuffled(items, seed).map(piece)

/** Left-top card: client logos. */
export const logoSlides: ReactNode[] = deck(logosA, HERO_SHUFFLE_SEED)

/** Left-middle card: the rest of the client logos mixed with website mockups. */
export const logoWebSlides: ReactNode[] = deck([...logosB, ...shotsA], HERO_SHUFFLE_SEED + 1)

/** Brand Identity pieces picked for the hero; the rest stay in the Portfolio section only. */
const HERO_BRAND_PICKS = ["Pancho's", 'Maria Bella', 'Retrevo', 'Hair Reality', 'Compacta']

const heroBrand = brandWork.filter((b) => HERO_BRAND_PICKS.includes(b.name))

/** Left-bottom card: a hand-picked set of brand identity mockups. */
export const brandSlides: ReactNode[] = deck(heroBrand, HERO_SHUFFLE_SEED + 2)

/** Right-bottom card: logo animations. */
export const motionSlides: ReactNode[] = deck(motionA, HERO_SHUFFLE_SEED + 3)

/** Right-top card: the rest of the animations mixed with website mockups. */
export const webMotionSlides: ReactNode[] = deck([...motionB, ...shotsB], HERO_SHUFFLE_SEED + 4)

/** Right-middle card: the drawn website designs. */
export const webSlides: ReactNode[] = shuffled(
  sites.map((_, i) => i),
  HERO_SHUFFLE_SEED + 5,
).map(monitor)

/** Still images preloaded up front so each slide is ready when its crossfade starts. Videos stream on demand. */
export const heroImages = [
  ...[...clientLogos, ...heroBrand, ...motionWork, ...websiteShots].map((p) => p.src),
  ...Object.values(siteShots),
]

/** Card channels. The conductor advances one of these at a time. */
export const heroChannels = ['hero-logos', 'hero-logoWeb', 'hero-brand', 'hero-motion', 'hero-webMotion', 'hero-web']
