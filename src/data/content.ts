import { site } from '@/config/site'

/** Words in the scrolling strip at the bottom of the hero. */
export const marqueeWords = ['Branding', 'Websites', 'Strategy', 'Motion', 'Development', 'Campaigns', 'Design']

/** Placeholder phrases the hero input types out. */
export const heroPhrases = [
  'Enter your business name...',
  'Northline Coffee Co.',
  'Bright Path Dental',
  'Atlas Freight',
  'Enter your business name...',
]

export const faqs = [
  {
    q: 'How much does a project cost?',
    a: 'Logo packages begin at $49, websites at $699 and animation at $499. Brand identity work is quoted on scope, usually from around $299. Every quote is fixed, so you see the full price before anything starts.',
  },
  {
    q: 'What happens after I send a brief or message?',
    a: 'A designer reads your details and replies within 24 working hours with a recommended package, a fixed price and a timeline. Nothing is charged until you approve.',
  },
  {
    q: 'How long will my project take?',
    a: 'First logo concepts usually arrive within 24 hours, and most logo projects wrap up in 3–5 days. Websites take 1–3 weeks and animation 2–6 weeks depending on length.',
  },
  {
    q: 'How many revisions are included?',
    a: 'It depends on the package you pick. Entry packages include a set number of rounds, while Gold and Platinum include unlimited revisions until you are happy.',
  },
  {
    q: 'Do I own the final files?',
    a: 'Yes. Once the project is paid in full, you receive full ownership of the approved design and every file format listed in your package.',
  },
  {
    q: 'Can you redesign an existing logo or brand?',
    a: 'Absolutely. Tell us what you have, what is not working and what must stay. We can modernise carefully or start fresh, whichever serves your business better.',
  },
  {
    q: 'Do you design and build websites?',
    a: 'Yes. Website packages cover custom design and a fully built, mobile-friendly site. Larger builds such as stores or booking systems are scoped individually.',
  },
  {
    q: 'What is the difference between logo design and brand identity?',
    a: 'Logo design focuses on the mark and its files. Brand identity extends it into colours, type, stationery, social assets and guidelines so everything looks consistent.',
  },
  {
    q: 'What if I already have partial branding?',
    a: 'Share what you have in the brief. We can extend your current system, fill the gaps, or tidy up what is inconsistent without throwing away what already works.',
  },
  {
    q: 'What happens after my website launches?',
    a: 'You receive the live site and agreed files. Ongoing hosting, updates and marketing support are available as optional add-ons, never bundled by surprise.',
  },
  {
    q: 'How does the satisfaction guarantee work?',
    a: 'If the work is not meeting the brief, we keep refining within your package. If we still cannot get there, our refund policy explains exactly what is covered.',
  },
  {
    q: 'Do you work with clients outside the United States?',
    a: 'Yes. Everything happens online: brief, concepts, feedback and delivery, so clients in any time zone can work with us comfortably.',
  },
]

export const testimonials = [
  {
    quote: `${site.shortName} understood where our brand was heading before we could put it into words.`,
    name: 'Theo Marsh',
    role: 'Founder & Creative Director',
    company: 'Northline Studio',
    person: 0,
  },
  {
    quote: 'Three concepts in two days, and every one of them felt like it belonged to us. Picking was the hard part.',
    name: 'Ines Rocha',
    role: 'Owner',
    company: 'Kettle & Crumb Bakehouse',
    person: 1,
  },
  {
    quote: 'Clear updates, quick replies and a website that finally looks like the company we actually are.',
    name: 'Ken Ito',
    role: 'Managing Partner',
    company: 'Atlas Freight',
    person: 2,
  },
  {
    quote: 'Our new mark works on a tiny app icon and on a ten-metre sign. That is exactly what we asked for.',
    name: 'Zola Adeyemi',
    role: 'Head of Marketing',
    company: 'Voltage Charging',
    person: 3,
  },
  {
    quote: 'No jargon, no surprise invoices. We knew the price and the timeline from the very first message.',
    name: 'Priya Nair',
    role: 'Co-founder',
    company: 'Glow Atelier',
    person: 4,
  },
]

/** Scripted conversation that plays in the Studio section mock chat. */
export const chatScript: Array<
  | { from: 'client' | 'studio'; kind: 'text'; text: string }
  | { from: 'studio'; kind: 'concepts'; text: string; images: number[]; picked?: number }
  | { from: 'studio'; kind: 'file'; text: string; file: string; size: string }
> = [
  { from: 'client', kind: 'text', text: 'We open in six weeks and our temporary logo looks like clip art.' },
  { from: 'studio', kind: 'text', text: 'Understood. Should it feel bold, minimal, or a bit more playful?' },
  { from: 'client', kind: 'text', text: 'Warm and bold. Something you can read from across the street.' },
  {
    from: 'studio',
    kind: 'concepts',
    text: 'Three directions based on your brief. Pick one to refine.',
    images: [5, 1, 26],
  },
  { from: 'client', kind: 'text', text: 'The second one. The rising sun fits our early-morning story.' },
  {
    from: 'studio',
    kind: 'concepts',
    text: 'Done. Here is the refined version with spacing and colour tuned.',
    images: [1],
    picked: 0,
  },
  {
    from: 'studio',
    kind: 'file',
    text: 'Your final files and brand kit are ready to download.',
    file: 'KettleCrumb_BrandKit.zip',
    size: '24 MB',
  },
  { from: 'client', kind: 'text', text: 'This is exactly the brand we pictured. Thanks for the clear updates.' },
]

export const processSteps = [
  {
    n: '01',
    title: 'Discover',
    text: 'You tell us about your business, your audience and what feels off today. We confirm scope and price before any design begins.',
  },
  {
    n: '02',
    title: 'Concept',
    text: 'We explore several directions and present the strongest ones, each with a short, plain-English explanation of the thinking.',
  },
  {
    n: '03',
    title: 'Refine',
    text: 'You give direct feedback and we adjust colour, type, layout or motion until the result feels unmistakably yours.',
  },
  {
    n: '04',
    title: 'Deliver',
    text: 'You receive the approved files plus a short guide for using them consistently across every channel.',
  },
]

export const services = [
  {
    id: 'logo',
    label: 'Logo Design',
    bg: 'bg-primary',
    delivery: '3–5 days',
    price: '$49',
    title: 'A logo people remember and trust.',
    text: 'Whether your business has outgrown its mark or you are launching something new, you need more than a generic icon. We draw original directions for your market, then refine the winner until it works everywhere.',
    bullets: [
      'Original concepts, never templates',
      'Revision rounds to match your package',
      'Full ownership after payment',
      'Source files (AI, SVG, PNG, PDF)',
    ],
  },
  {
    id: 'brand',
    label: 'Brand Identity',
    bg: 'bg-accent',
    delivery: '1–2 weeks',
    price: '$299',
    title: 'One system, not a lonely logo.',
    text: 'A logo without colours, type and rules quickly drifts. We build the supporting system so your cards, socials and signage all look like they came from the same place.',
    bullets: [
      'Colour palette and typography',
      'Stationery and social kit',
      'Usage guidelines',
      'Templates your team can edit',
    ],
  },
  {
    id: 'web',
    label: 'Website Design',
    bg: 'bg-acid-yellow',
    delivery: '1–3 weeks',
    price: '$699',
    title: 'Where credibility turns into enquiries.',
    text: 'Your site is often the first real conversation with a customer. We design and build pages that load fast, read clearly on phones and make the next step obvious.',
    bullets: ['Custom design, no themes', 'Mobile-first build', 'CMS so you can edit', 'Basic SEO and analytics'],
  },
  {
    id: 'motion',
    label: 'Video Animation',
    bg: 'bg-[#1c1c1c]',
    delivery: '2–6 weeks',
    price: '$499',
    title: 'Motion that earns attention.',
    text: 'Use animation when a still image cannot explain enough. Explainers, product promos and animated logos, scripted and voiced so they are ready to publish.',
    bullets: ['Script and storyboard', 'Voice-over and sound', 'Exports for every channel', 'Animated logo add-ons'],
  },
]

export const values = [
  {
    title: 'Original work',
    text: 'Directions drawn for your brief, never a recycled template with your name swapped in.',
    cls: 'bg-primary text-black',
    icon: 'sparkles',
  },
  {
    title: 'Built to be used',
    text: 'Files prepared for real life: tiny avatars, sharp signage and everything in between.',
    cls: 'bg-accent text-white',
    icon: 'layers',
  },
  {
    title: 'Plain updates',
    text: 'You always know which stage your project is in and what we need from you next.',
    cls: 'bg-acid-yellow text-black',
    icon: 'message',
  },
  {
    title: 'Details on purpose',
    text: 'Spacing, contrast and type are decisions, not defaults, so your brand reads clearly.',
    cls: 'bg-[#1c1c1c] text-white ring-1 ring-white/10',
    icon: 'ruler',
  },
]

export const team = [
  { name: 'Theo Marsh', role: 'Founder & Creative Director', person: 0 },
  { name: 'Ines Rocha', role: 'Lead Logo Designer', person: 1 },
  { name: 'Ken Ito', role: 'Web Designer & Developer', person: 2 },
  { name: 'Zola Adeyemi', role: 'Motion & Animation Lead', person: 3 },
]

const reviewText = [
  'Fast, friendly and genuinely creative. The concepts were miles ahead of what we expected for the price.',
  'They listened carefully and translated a messy brief into a logo our whole team loved on day one.',
  'Our project manager kept us informed at every step. The new website already brings in more enquiries.',
  'Great communication and quick turnaround. Revisions were handled the same day each time.',
  'Professional from start to finish. The brand kit made it easy for our staff to stay consistent.',
  'I was nervous about a redesign but they kept what mattered and modernised the rest beautifully.',
  'The animated logo looks fantastic at the start of our videos. Clients comment on it constantly.',
  'Clear pricing and no upsell pressure. We picked the middle package and it was more than enough.',
  'They delivered print-ready files for our signage without me having to ask twice.',
  'Thoughtful designers who explain their choices. I learned a lot about my own brand along the way.',
  'Our online store looks premium now and checkout works smoothly on every phone we tested.',
  'Excellent value. We have already booked them again for our second location.',
]
const reviewers = [
  'Dana Whitfield',
  'Marcus Lee',
  'Sofia Brandt',
  'Ray Okoro',
  'Lily Chen',
  'Gabe Turner',
  'Nadia Farouk',
  'Chris Patel',
  'Helen Sato',
  'Jordan Blake',
  'Amelia Ross',
  'Victor Diaz',
]
const reviewCats = [
  'logo',
  'logo',
  'web',
  'logo',
  'brand',
  'logo',
  'motion',
  'logo',
  'brand',
  'logo',
  'web',
  'logo',
] as const
const sources = ['Trustpilot', 'Google', 'Clutch']

/**
 * Placeholder reviews for the (currently unpublished) reviews page, generated by rotating
 * the text, reviewer and category lists above so neighbouring cards never repeat.
 */
export const reviews = Array.from({ length: 36 }, (_, i) => {
  const k = i % 12
  const d = new Date(2026, 8 - Math.floor(i / 3), 28 - ((i * 7) % 26))
  return {
    id: i,
    name: reviewers[(k + Math.floor(i / 12) * 5) % 12],
    text: reviewText[(k + Math.floor(i / 12) * 3) % 12],
    category: reviewCats[k],
    source: sources[i % 3],
    date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }
})

export const reviewTabs = [
  { id: 'all', label: 'All reviews' },
  { id: 'logo', label: 'Logo design' },
  { id: 'brand', label: 'Branding' },
  { id: 'web', label: 'Websites' },
  { id: 'motion', label: 'Animation' },
]
