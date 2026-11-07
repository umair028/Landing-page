import { Hero } from '@/components/home/Hero'
import { StudioSection } from '@/components/home/StudioSection'
import { WorkSection } from '@/components/home/WorkSection'
import { LogoWallSection } from '@/components/shared/LogoWallSection'
import { PortfolioGrid } from '@/components/shared/PortfolioGrid'
import { PricingSection } from '@/components/shared/Pricing'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CtaSection, FaqSection } from '@/components/shared/Sections'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Home() {
  usePageTitle('Custom Logo, Brand & Website Design')
  return (
    <>
      <Hero />
      <WorkSection />
      <StudioSection />
      <section id="portfolio" className="scroll-mt-20 bg-black px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Portfolio"
            title={
              <>
                Custom work across
                <br />
                logos, brands, sites, and motion.
              </>
            }
            intro="Browse by category. Every piece was made for a specific brief, never pulled from a stock library."
          />
          <PortfolioGrid initial="logo" />
        </div>
      </section>
      <LogoWallSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <section id="contact">
        <CtaSection />
      </section>
    </>
  )
}
