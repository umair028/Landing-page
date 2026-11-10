import { canva } from './canva'

/**
 * A finished client piece. Pieces with a `video` play it over the still `src`; pieces with a `bg`
 * are shown whole on that colour instead of being cropped to fill their tile.
 */
export type WorkImage = { name: string; src: string; alt: string; video?: string; bg?: string }

const LOGO_DIR = '/work/logos'
const MARK_DIR = '/work/marks'
const BRAND_DIR = '/work/brand'

/** [display name, file slug, short description used for alt text] */
type WorkRow = [name: string, slug: string, description: string]

const logoRows: WorkRow[] = [
  ['Saluda Sports', 'saluda-sports', 'bar and grill mascot badge'],
  ['Studio Skulpt', 'studio-skulpt', 'modern pilates script wordmark'],
  ["Dakota's", 'dakotas', 'freeze-dried treats character logo'],
  ['Faithit', 'faithit', 'ornamental monogram'],
  ["Nuttin' But Turf", 'nuttin-but-turf', 'lawn care mascot logo'],
  ['RayGunn Productions', 'raygunn', 'production company illustrated logo'],
  ['Gamerz Inn', 'gamerz-inn', 'gaming lounge neon emblem'],
  ['So Cal Game Changers', 'so-cal', 'sunset badge logo'],
  ['Doug Turner', 'doug-turner', 'law consulting wordmark'],
  ['Franklin', 'franklin', 'real estate skyline emblem'],
  ['Queen Bee Honey Co.', 'queen-bee', 'circular honey seal'],
  ['Holiday Travel Service', 'holiday-travel', 'travel agency globe logo'],
  ["Reina's", 'reinas', 'character mascot logo'],
  ['Parents For', 'parents-for', 'advocacy group logo'],
  ['Integral', 'integral', 'eco services wordmark'],
  ["Let's Get Rolling", 'lets-get-rolling', 'event brand logo'],
  ['Prouimented', 'prouimented', 'lighting studio signature logo'],
  ['The Eclectic Heiney', 'eclectic-heiney', 'vintage badge logo'],
  ['Bluegrass Golf Supply', 'bluegrass-golf', 'golf crest logo'],
  ['VendWise', 'vendwise', 'vending machine mascot logo'],
  ['Kuhl Construction', 'kuhl', 'construction rooftop wordmark'],
  ['Dynamic Restoration', 'dynamic-restoration', 'home restoration logo'],
  ['Dunlin Studio', 'dunlin', 'bird mascot script logo'],
  ['Clarity', 'clarity', 'tech wordmark'],
  ['Jailbreak Media', 'jailbreak', 'media agency circular seal'],
  ['Overboard Marine', 'overboard', 'marine services badge'],
  ['Boujee Mutt', 'boujee-mutt', 'self-serve dog wash seal'],
  ['Dirty Sips', 'dirty-sips', 'drinks script wordmark'],
  ["Pancho's", 'panchos', 'Mexican food truck badge'],
  ['Sheri Holloway', 'sheri-holloway', 'photography wordmark'],
]

const markRows: WorkRow[] = [
  ['Abstract S', 'abstract-s', 'abstract letter mark'],
  ['High & Low', 'high-and-low', 'stacked wordmark'],
  ["Howler's", 'howlers', 'automotive accessories logo'],
  ['Countr-Kulture', 'countr-kulture', 'streetwear badge'],
  ['OK Businessman', 'businessman-ok', 'character silhouette mark'],
  ['Celtic Knot', 'celtic-knot', 'interlaced line mark'],
  ['Egg Boy', 'egg-boy', 'restaurant mascot logo'],
  ['El Pequeño', 'el-pequeno', 'Havana bar badge'],
  ['Elizabeth Henry', 'elizabeth-henry', 'ornate emblem'],
  ['Zazou', 'zazou', 'geometric mascot logo'],
  ['Kinetic Trails', 'kinetic-trails', 'outdoor script wordmark'],
  ['Mothership Coffee', 'mothership-coffee', 'coffee roasters arched logo'],
  ['Motion Arcs', 'motion-arcs', 'abstract motion mark'],
  ['Mountain Madre', 'mountain-madre', 'sun emblem'],
  ['Queen Card', 'queen-card', 'playing card mark'],
  ['Ravel', 'ravel', 'wave wordmark'],
  ['Viking Ship', 'viking-ship', 'longship mark'],
  ['Wildlife Circle', 'wildlife-circle', 'animal silhouette roundel'],
  ['Wander', 'wander', 'bison mark'],
]

/** Ordered to alternate photographed mockups with full brand boards and guideline decks. */
const brandRows: WorkRow[] = [
  ['AMS Technology', 'ams-technology-signage', 'exterior wall signage'],
  ["Pancho's", 'panchos-business-cards', 'food truck business cards'],
  ['Borcelle Bakery', 'borcelle-bakery-brand-board', 'bakery brand board'],
  ['Power Support', 'power-support-stationery', 'stationery and print collateral'],
  ['Lashion', 'lashion-brand-guidelines', 'brand guidelines deck'],
  ['Maria Bella', 'maria-bella-packaging', 'serum bottle packaging'],
  ['Fauget Candy', 'fauget-candy-brand-board', 'candy company brand board'],
  ['Over Under', 'over-under-stationery', 'letterhead and envelope set'],
  ['Street & Stitch', 'street-and-stitch-guidelines', 'fashion style guidelines'],
  ['Quirell', 'quirell-brand-board', 'brand board'],
  ['X Mobile', 'x-mobile-business-cards', 'business cards and gift box'],
  ['Good Food Co.', 'good-food-co-branding', 'food branding presentation'],
  ['Hair Reality', 'hair-reality-shopping-bag', 'gold-foil shopping bag'],
  ['Fradel & Spies', 'fradel-and-spies-brand-board', 'brand board'],
  ['Compacta', 'compacta-stationery', 'stationery mockup'],
  ['Skyward Journeys', 'skyward-journeys', 'nature campaign presentation'],
  ['Grupo Nortnova', 'grupo-nortnova-brand-board', 'brand board'],
  ['Thynk Unlimited', 'thynk-unlimited-proposal', 'brand proposal deck'],
  ['Licera & Co.', 'licera-brand-guidelines', 'brand guidelines deck'],
  ['Arowwai Industries', 'arowwai-sneaker-report', 'sneaker store presentation'],
]

const websiteRows: WorkRow[] = [
  ['Acora', 'acora-sneakers', 'sneaker store website on a laptop'],
  ['First Premier', 'first-premier-audio-visual', 'audio visual company website on a laptop'],
  ["Beaux's", 'beauxs-lashes', 'lash brand website on a laptop'],
  ["See What I'm Saying", 'see-what-im-saying', 'dark landing page on a laptop'],
  ['Environmental Services', 'environmental-services', 'services company website on a laptop'],
  ['Urogu', 'urogu-food-blog', 'food blog shown on a desktop monitor'],
  ['Ride 4 Less', 'ride-4-less', 'chauffeur service website on a laptop'],
  ['Lang and Sons', 'lang-and-sons-construction', 'construction company website on a laptop'],
  ['Sanders Masonry', 'sanders-masonry-mobile', 'masonry company mobile site on a phone'],
]

const toImages = (rows: WorkRow[], dir: string): WorkImage[] =>
  rows.map(([name, slug, description]) => ({ name, src: `${dir}/${slug}.webp`, alt: `${name} ${description}` }))

/** Full-colour client logos shown in the portfolio's Logo Design tab. */
export const clientLogos: WorkImage[] = [
  ...toImages(logoRows, LOGO_DIR),
  // Also the home page's "Logo Design" service card.
  { name: 'Design Horizon', src: canva.designHorizon.src, alt: canva.designHorizon.alt },
]

/** Square logo marks on white, used on the scrolling logo wall. */
export const logoMarks = toImages(markRows, MARK_DIR)

/** [display name, file slug, short description] for the logo animations; each slug has an .mp4 and a .webp poster. */
const motionRows: WorkRow[] = [
  ['Shift Robotics', 'shift-robotics', 'wordmark animation on lime'],
  ['Monogram', 'm-monogram-stone', 'red M monogram revealed in carved stone'],
  ['Interior Studio', 'interior-studio', 'bracket mark reveal'],
  ['Vibrandt', 'vibrandt', 'wordmark animation'],
  ['Tagset', 'tagset', 'logo reveal over green light trails'],
  ['Deschil', 'deschil', 'logo animation on blue'],
  ['MLC', 'mlc', 'logo intro on blue'],
  ['Up.Fun', 'up-fun', 'pixel wordmark animation'],
  ['Felix & Fox', 'felix-and-fox', 'playful lettering animation'],
  ['Umbral', 'umbral', 'glowing logo reveal'],
  ['Ding', 'ding', 'mascot wordmark animation'],
  ['Shelby', 'shelby', 'brand system animation'],
]

/** The Marketo loop shown on the home page's "Animated Logo" service card; a GIF, so it needs no video. */
export const marketoLoop: WorkImage = {
  name: 'Marketo',
  src: '/work/motion/stacked-cards.gif',
  alt: 'Marketo animated logo, white bars stacking into the wordmark on purple',
}

/** Looping logo animations for the Animated Logos tab. */
export const motionWork: WorkImage[] = [
  ...motionRows.map(([name, slug, description]) => ({
    name,
    src: `/work/motion/${slug}.webp`,
    video: `/work/motion/${slug}.mp4`,
    alt: `${name} ${description}`,
  })),
  marketoLoop,
  // Same file as the skull video on the logo wall.
  { name: 'Dead Rock Rebels', src: canva.skull.poster, video: canva.skull.src, alt: canva.skull.alt },
]

/** Photographed website mockups for the Website Design tab. */
export const websiteShots: WorkImage[] = [
  ...toImages(websiteRows, '/work/web'),
  // Also the home page's "Website Design" and "E-commerce Website" service cards.
  { name: 'Business Pro', src: canva.businessPro.src, alt: canva.businessPro.alt },
  { name: 'Logo Agency', src: canva.logoAgency.src, alt: canva.logoAgency.alt },
]

const retrevoReveal: WorkImage = {
  name: 'Retrevo',
  src: `${BRAND_DIR}/retrevo-brand-reveal.jpg`,
  video: `${BRAND_DIR}/retrevo-brand-reveal.mp4`,
  alt: 'Retrevo finance brand reveal with an R monogram on a glass wall sign',
}

/** Brand identity boards, guideline decks and stationery mockups. The Brand Identity tab shows them shuffled. */
export const brandWork: WorkImage[] = [
  ...toImages(brandRows, BRAND_DIR),
  retrevoReveal,
  // Also the home page's "Brand Identity" service card. 16:9, so it is letterboxed rather than cropped.
  { name: 'Glow Atelier', src: canva.brandKit.src, alt: canva.brandKit.alt, bg: canva.brandKit.bg },
]
