import { Link } from 'react-router-dom'
import { PricingGroupSection } from '../components/shared/Pricing'
import { CtaSection, FaqSection, PageHero } from '../components/shared/Sections'
import { pricingGroups } from '../data/pricing'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Pricing() {
  usePageTitle('Pricing | Logo, Branding, Website & Animation Packages')
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Custom logo, branding
            <br />
            &amp; website packages.
          </>
        }
        intro="Fixed prices, clear deliverables and no surprise invoices. Jump to the package family you need."
      >
        <nav className="flex flex-wrap justify-center gap-2" aria-label="Package families">
          {pricingGroups.map((g) => (
            <Link
              key={g.id}
              to={`/pricing#${g.id}`}
              className="rounded-full bg-white/15 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white ring-1 ring-white/25 transition-colors hover:bg-white hover:text-black"
            >
              {g.label}
            </Link>
          ))}
        </nav>
      </PageHero>
      {pricingGroups.map((g, i) => (
        <PricingGroupSection key={g.id} group={g} alt={i % 2 === 1} />
      ))}
      <FaqSection />
      <CtaSection eyebrow="Pick a starting point" title="Request the package that fits your stage." secondary={{ label: 'Ask about custom scope', to: '/contact' }} />
    </>
  )
}
