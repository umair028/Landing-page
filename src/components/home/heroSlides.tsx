import type { ReactNode } from 'react'
import { sites } from '@/data/art'
import { siteShots } from '@/data/canva'
import { brandWork, clientLogos, motionWork, websiteShots, type WorkImage } from '@/data/work'
import { BrowserMockup } from '@/components/art/Mockups'
import { WorkPiece } from '@/components/art/PortfolioArt'
import { shuffled } from '@/lib/shuffle'

/*
 * Slides for the rotating hero cards, built from the same pieces as the Portfolio section.
 * Each card mixes every kind of work; every piece goes to exactly one card, so two cards
 * never show the same work at once. Orders are shuffled with fixed seeds: mixed, but stable.
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

/** Brand Identity pieces picked for the hero; the rest stay in the Portfolio section only. */
const HERO_BRAND_PICKS = ["Pancho's", 'Maria Bella', 'Retrevo', 'Hair Reality', 'Compacta']

const heroBrand = brandWork.filter((b) => HERO_BRAND_PICKS.includes(b.name))

/** Number of rotating cards in the hero (see `heroChannels`). */
const CARD_COUNT = 6

/** Every kind of work the hero shows, one list per kind. */
const kinds: ReactNode[][] = [
  clientLogos.map(piece),
  heroBrand.map(piece),
  motionWork.map(piece),
  websiteShots.map(piece),
  sites.map((_, i) => monitor(i)),
]

/**
 * Deals each kind round-robin across the cards (each kind starting one card further along),
 * so every card gets an even mix of logos, brand pieces, animations and websites, then
 * shuffles each card's pile.
 */
const cards: ReactNode[][] = Array.from({ length: CARD_COUNT }, () => [])
kinds.forEach((kind, k) => {
  shuffled(kind, HERO_SHUFFLE_SEED + k).forEach((slide, i) => cards[(i + k) % CARD_COUNT].push(slide))
})
const [cardA, cardB, cardC, cardD, cardE, cardF] = cards.map((pile, c) => shuffled(pile, HERO_SHUFFLE_SEED + 100 + c))

/** Left-top card. */
export const logoSlides: ReactNode[] = cardA
/** Left-middle card. */
export const logoWebSlides: ReactNode[] = cardB
/** Left-bottom card. */
export const brandSlides: ReactNode[] = cardC
/** Right-bottom card. */
export const motionSlides: ReactNode[] = cardD
/** Right-top card. */
export const webMotionSlides: ReactNode[] = cardE
/** Right-middle card. */
export const webSlides: ReactNode[] = cardF

/** Still images preloaded up front so each slide is ready when its crossfade starts. Videos stream on demand. */
export const heroImages = [
  ...[...clientLogos, ...heroBrand, ...motionWork, ...websiteShots].map((p) => p.src),
  ...Object.values(siteShots),
]

/** Card channels. The conductor advances one of these at a time. */
export const heroChannels = ['hero-logos', 'hero-logoWeb', 'hero-brand', 'hero-motion', 'hero-webMotion', 'hero-web']
