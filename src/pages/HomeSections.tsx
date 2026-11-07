import { useRef, type ComponentType } from 'react'
import { StudioSection } from '@/components/home/StudioSection'
import { WorkSection } from '@/components/home/WorkSection'
import { RevealManager } from '@/components/layout/RevealManager'
import { LogoWallSection } from '@/components/shared/LogoWallSection'
import { PortfolioGrid } from '@/components/shared/PortfolioGrid'
import { PricingSection } from '@/components/shared/Pricing'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CtaSection, FaqSection } from '@/components/shared/Sections'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { useProgressiveCount } from '@/hooks/useDeferredContent'

function PortfolioSection() {
  return (
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
  )
}

function ContactSection() {
  return (
    <section id="contact">
      <CtaSection />
    </section>
  )
}

/** Below-the-fold home sections, in page order. */
const sections: ComponentType[] = [
  WorkSection,
  StudioSection,
  PortfolioSection,
  LogoWallSection,
  TestimonialsSection,
  PricingSection,
  FaqSection,
  ContactSection,
]

/**
 * Everything on the home page after the hero. Loaded as its own chunk and mounted a
 * section at a time, as the visitor approaches it, so the first render stays small.
 * Scroll reveals are bound once the last section is in the DOM.
 */
export default function HomeSections() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const count = useProgressiveCount(sections.length, sentinelRef)
  const isComplete = count === sections.length

  return (
    <>
      {sections.slice(0, count).map((Section, index) => (
        <Section key={index} />
      ))}
      {/* Holds the footer below the fold and tells the hook when to mount the next section. */}
      {isComplete ? <RevealManager /> : <div ref={sentinelRef} aria-hidden="true" className="min-h-[100vh]" />}
    </>
  )
}
