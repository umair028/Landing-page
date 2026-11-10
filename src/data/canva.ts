/** Designs built from Canva templates, exported to /public/canva. `bg` matches each logo's own background. */
export const canva = {
  crownroast: { src: '/canva/crownroast.webp', alt: 'Crownroast coffee roasters badge logo', bg: '#f9f0df' },
  harborline: { src: '/canva/harborline.webp', alt: 'Harborline seafood kitchen logo', bg: '#001436' },
  glowAtelier: { src: '/canva/glow-atelier.webp', alt: 'Glow Atelier skin studio logo', bg: '#fdf8ee' },
  northpeak: { src: '/canva/northpeak.webp', alt: 'Northpeak outdoor supply logo', bg: '#0c3620' },
  voltage: { src: '/canva/voltage.webp', alt: 'Voltage EV charging logo', bg: '#020204' },
  glowWeek: { src: '/canva/glow-week-banner.webp', alt: 'Glow Atelier "Glow Week" promotional banner', bg: '#f6e9ea' },
  brandKit: { src: '/canva/brand-kit-cover.webp', alt: 'Glow Atelier brand kit presentation cover', bg: '#cd919e' },
  autumnReserve: {
    src: '/canva/autumn-reserve-banner.webp',
    alt: 'Crownroast "Autumn Reserve" coffee banner',
    bg: '#140b04',
  },
  smileBright: { src: '/canva/smile-bright.webp', alt: 'Lumen Dental "Smile Bright" brand campaign' },
  freshDaily: { src: '/canva/fresh-daily.webp', alt: 'Kettle & Crumb "Fresh Daily" brand campaign' },
  noDaysOff: { src: '/canva/no-days-off.webp', alt: 'Summit Fit "No Days Off" brand campaign' },
  growGood: { src: '/canva/grow-something-good.webp', alt: 'Fernwood "Grow Something Good" brand campaign' },
  businessPro: { src: '/canva/business-pro-website.webp', alt: 'Business Pro website homepage shown on a laptop' },
  logoAgency: { src: '/canva/logo-agency-website.webp', alt: 'Logo Agency website homepage shown on a laptop' },
  designHorizon: {
    src: '/canva/design-horizon-logo.webp',
    alt: 'Design Horizon creative studio logo over a curved glass building',
  },
  animatedLogo: {
    src: '/work/motion/stacked-cards.gif',
    alt: 'Animated logo reveal',
  },
  skull: {
    src: '/canva/skull-logo.mp4',
    poster: '/canva/skull-poster.jpg',
    alt: 'Dead Rock Rebels animated skull logo',
  },
}

/** Real homepage designs made in Canva, keyed by the site title in data/art.ts. */
export const siteShots: Record<string, string> = {
  Harborline: '/canva/sites/harborline.webp',
  Crownroast: '/canva/sites/crownroast.webp',
  Northpeak: '/canva/sites/northpeak.webp',
  Orbital: '/canva/sites/orbital.webp',
  'Glow Atelier': '/canva/sites/glow-atelier.webp',
  'Atlas Freight': '/canva/sites/atlas-freight.webp',
  Fernwood: '/canva/sites/fernwood.webp',
  Quanta: '/canva/sites/quanta.webp',
  'Lumen Dental': '/canva/sites/lumen-dental.webp',
  'Summit Fit': '/canva/sites/summit-fit.webp',
  'Kettle & Crumb': '/canva/sites/kettle-crumb.webp',
  'Mason Legal': '/canva/sites/mason-legal.webp',
}
