export type Tier = 'bronze' | 'silver' | 'gold' | 'platinum'

export type Plan = {
  name: string
  tier: Tier
  price: string
  blurb: string
  features: Array<string | { text: string; excluded: true }>
  popular?: boolean
}

export type PlanGroup = {
  id: string
  label: string
  eyebrow?: string
  title: string
  description: string
  service: 'logo' | 'web' | 'motion' | 'brand' | 'bundle'
  plans: Plan[]
}

const no = (text: string) => ({ text, excluded: true as const })

export const logoPlans: Plan[] = [
  {
    name: 'Bronze',
    tier: 'bronze',
    price: '$49',
    blurb: 'Good for: validating a new idea on a lean budget. Two concepts to pick from, turned around in 24 hours.',
    features: ['2 logo concepts', '3 revisions', no('No high-res files'), '24 hours delivery'],
  },
  {
    name: 'Silver',
    tier: 'silver',
    price: '$99',
    popular: true,
    blurb: 'Good for: new businesses that want real choice. Four concepts, print-ready files and full ownership.',
    features: [
      '4 logo concepts',
      '6 revisions',
      'Custom logo',
      'Vector PDF file',
      '24 hours delivery',
      'HQ PNG + JPEG',
      '100% ownership',
    ],
  },
  {
    name: 'Gold',
    tier: 'gold',
    price: '$139',
    blurb: 'Good for: brands that want space to refine. Six concepts, unlimited revisions and every format covered.',
    features: [
      '6 logo concepts',
      'Unlimited revisions',
      'Custom logo',
      'Vector EPS, PDF file',
      '24 hours delivery',
      'HQ PNG + JPEG',
      '100% ownership',
    ],
  },
  {
    name: 'Platinum',
    tier: 'platinum',
    price: '$189',
    blurb: 'Good for: teams launching everywhere at once. Unlimited concepts, editable sources and a business card.',
    features: [
      'Unlimited concepts',
      'Unlimited revisions',
      'Custom logo',
      'Editable vector AI',
      '24 hours delivery',
      'Vector EPS, PDF',
      'HQ PNG + JPEG',
      '100% ownership',
      'Business card design',
    ],
  },
]

export const webPlans: Plan[] = [
  {
    name: 'Starter',
    tier: 'bronze',
    price: '$699',
    blurb: 'Good for: a clean single-page presence that loads fast and explains what you do.',
    features: [
      '1 page custom design',
      'Mobile responsive',
      'Contact form',
      '2 revision rounds',
      no('No CMS'),
      '7 days delivery',
    ],
  },
  {
    name: 'Business',
    tier: 'silver',
    price: '$1,199',
    popular: true,
    blurb: 'Good for: growing companies that need room for services, proof and a contact flow.',
    features: [
      'Up to 5 pages',
      'Custom UI design',
      'CMS integration',
      'On-page SEO setup',
      '4 revision rounds',
      'Speed optimization',
      '14 days delivery',
    ],
  },
  {
    name: 'Growth',
    tier: 'gold',
    price: '$1,699',
    blurb: 'Good for: teams ready to publish regularly and capture leads properly.',
    features: [
      'Up to 10 pages',
      'Blog setup',
      'Lead capture forms',
      'Analytics setup',
      'Unlimited revisions',
      'Copy polish',
      '21 days delivery',
    ],
  },
  {
    name: 'Commerce',
    tier: 'platinum',
    price: '$2,999',
    blurb: 'Good for: selling online with a store that feels as considered as your product.',
    features: [
      'E-commerce store',
      'Up to 50 products',
      'Payment gateway',
      'Inventory setup',
      'Unlimited revisions',
      'Training session',
      '30 days delivery',
    ],
  },
]

export const motionPlans: Plan[] = [
  {
    name: 'Teaser',
    tier: 'bronze',
    price: '$499',
    blurb: 'Good for: a short animated explainer for social or a landing page header.',
    features: [
      'Up to 30 seconds',
      'Script assistance',
      '2D motion graphics',
      'Royalty-free music',
      no('No voice-over'),
      '10 days delivery',
    ],
  },
  {
    name: 'Explainer',
    tier: 'silver',
    price: '$799',
    popular: true,
    blurb: 'Good for: walking customers through your product in a clear, friendly story.',
    features: [
      'Up to 60 seconds',
      'Custom script',
      'Storyboard',
      'Professional voice-over',
      'Sound design',
      '3 revision rounds',
      '14 days delivery',
    ],
  },
  {
    name: 'Story',
    tier: 'gold',
    price: '$999',
    blurb: 'Good for: launches and campaigns that need character design and more polish.',
    features: [
      'Up to 90 seconds',
      'Custom characters',
      'Storyboard',
      'Voice-over',
      'Sound design',
      'Unlimited revisions',
      '21 days delivery',
    ],
  },
  {
    name: 'Campaign',
    tier: 'platinum',
    price: '$1,499',
    blurb: 'Good for: a full asset set across formats, sized for every channel you run.',
    features: [
      'Up to 2 minutes',
      'Custom illustration',
      '3 aspect ratios',
      'Voice-over',
      'Subtitles',
      'Unlimited revisions',
      'Source files',
    ],
  },
]

export const homePricingTabs = [
  { id: 'logo', label: 'Logo Design', plans: logoPlans, service: 'logo' as const },
  { id: 'web', label: 'Website Design', plans: webPlans, service: 'web' as const },
  { id: 'motion', label: 'Video Animation', plans: motionPlans, service: 'motion' as const },
]

export const pricingGroups: PlanGroup[] = [
  {
    id: 'logo-design',
    label: 'Logo',
    title: 'Standout Logo Packages',
    description: 'Original marks drawn for your market. Every package ends with files you fully own.',
    service: 'logo',
    plans: logoPlans,
  },
  {
    id: 'bundles',
    label: 'Bundles',
    eyebrow: '3 in 1 Bundles',
    title: 'Logo + Website + Brand Kit',
    service: 'bundle',
    description: 'Launch with everything matching from day one, and save compared with booking each piece separately.',
    plans: [
      {
        name: 'Launch',
        tier: 'bronze',
        price: '$499',
        blurb: 'Good for: getting a credible start online in a single step.',
        features: ['4 logo concepts', '1 page website', 'Business card design', 'Social media kit', '7 days delivery'],
      },
      {
        name: 'Grow',
        tier: 'silver',
        price: '$999',
        popular: true,
        blurb: 'Good for: small teams that need a real site and consistent assets.',
        features: [
          'Unlimited logo concepts',
          '5 page website',
          'Stationery set',
          'Social media kit',
          'Brand guidelines',
          '14 days delivery',
        ],
      },
      {
        name: 'Scale',
        tier: 'gold',
        price: '$1,499',
        blurb: 'Good for: businesses moving into new markets or products.',
        features: [
          'Unlimited logo concepts',
          '10 page website',
          'Full stationery',
          'Brand guidelines',
          'Email signature',
          'Blog setup',
        ],
      },
      {
        name: 'Flagship',
        tier: 'platinum',
        price: '$1,999',
        blurb: 'Good for: a complete identity launch with commerce built in.',
        features: [
          'Unlimited logo concepts',
          'E-commerce website',
          'Full brand book',
          'Packaging mockups',
          'Animated logo',
          'Priority support',
        ],
      },
    ],
  },
  {
    id: 'branding',
    label: 'Branding',
    title: 'Brand Identity Kits',
    service: 'brand',
    description: 'Extend your mark into a consistent system across print, social and everyday business use.',
    plans: [
      {
        name: 'Essentials',
        tier: 'bronze',
        price: '$59',
        blurb: 'Good for: getting stationery right without overthinking it.',
        features: ['Business card', 'Letterhead', 'Envelope', '2 revisions'],
      },
      {
        name: 'Social',
        tier: 'silver',
        price: '$99',
        popular: true,
        blurb: 'Good for: brands that live on social and need matching assets.',
        features: ['Stationery set', 'Social profile kit', 'Cover images', 'Post templates', '4 revisions'],
      },
      {
        name: 'Complete',
        tier: 'gold',
        price: '$149',
        blurb: 'Good for: teams that need a reference everyone can follow.',
        features: ['Stationery set', 'Social kit', 'Mini brand guide', 'Email signature', 'Unlimited revisions'],
      },
      {
        name: 'Signature',
        tier: 'platinum',
        price: '$199',
        blurb: 'Good for: a fully documented identity system.',
        features: [
          'Everything in Complete',
          'Full brand book',
          'Presentation template',
          'Merch mockups',
          'Source files',
        ],
      },
    ],
  },
  {
    id: 'web-design',
    label: 'Web',
    title: 'Website Design & Build',
    description: 'Custom design, built and tested on every screen size, ready for you to run.',
    service: 'web',
    plans: webPlans,
  },
  {
    id: 'video-animation',
    label: 'Video',
    title: 'Video Animation Packages',
    description: 'Explainers and promos with script, voice and sound handled for you.',
    service: 'motion',
    plans: motionPlans,
  },
  {
    id: 'logo-animation',
    label: 'Animated',
    title: 'Animated Logo',
    service: 'motion',
    description: 'Bring your mark to life for intros, social and presentations.',
    plans: [
      {
        name: 'Simple',
        tier: 'bronze',
        price: '$299',
        blurb: 'Good for: a clean reveal for video intros.',
        features: ['5 second animation', '1 concept', 'HD export', '2 revisions'],
      },
      {
        name: 'Dynamic',
        tier: 'silver',
        price: '$399',
        popular: true,
        blurb: 'Good for: social channels and presentations.',
        features: ['8 second animation', '2 concepts', 'Sound effect', 'HD + 4K export', '4 revisions'],
      },
      {
        name: 'Cinematic',
        tier: 'gold',
        price: '$499',
        blurb: 'Good for: launches and premium video work.',
        features: ['10 second animation', '3 concepts', 'Custom sound', '4K export', 'Unlimited revisions'],
      },
      {
        name: 'Studio',
        tier: 'platinum',
        price: '$899',
        blurb: 'Good for: a full motion system around your logo.',
        features: ['3 animation variants', 'Loop versions', 'Lottie export', 'Custom sound', 'Source files'],
      },
    ],
  },
]
