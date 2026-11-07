/**
 * Brand and contact details used across the site.
 * Editing the values here rebrands every page.
 */

export interface NavLink {
  label: string
  to: string
}

export interface SiteConfig {
  name: string
  shortName: string
  tagline: string
  phone: string
  /** `tel:` URI for the phone number above, digits only. */
  phoneHref: string
  email: string
  address: string
  hours: string
  socials: Array<{ label: string; href: string }>
  /** Optional hero background video, served from `/public`. Empty string disables it. */
  heroVideo: string
}

export const site: SiteConfig = {
  name: 'Brandmint Studio',
  shortName: 'Brandmint',
  tagline: 'Custom logo design studio',
  phone: '+1 (555) 014-2290',
  phoneHref: 'tel:+15550142290',
  email: 'hello@brandmint.studio',
  address: 'Studio 4, 120 Harbor Street, Wilmington, DE 19801',
  hours: 'Mon – Sat, 9am – 7pm',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
  heroVideo: '',
}

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const legalLinks: NavLink[] = [
  { label: 'Terms and Conditions', to: '/terms-and-conditions' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Refund Policy', to: '/refund-policy' },
  { label: 'Cancellation Policy', to: '/cancellation-policy' },
]
