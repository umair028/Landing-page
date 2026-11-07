import { LogoArt } from '../components/art/LogoArt'
import { LaptopMockup } from '../components/art/Mockups'
import { LogoWallSection } from '../components/shared/LogoWallSection'
import { PortfolioGrid } from '../components/shared/PortfolioGrid'
import { CtaSection, PageHero } from '../components/shared/Sections'
import { TestimonialsSection } from '../components/shared/TestimonialsSection'
import { logos, sites } from '../data/art'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Portfolio() {
  usePageTitle('Portfolio | Logos, Brands, Websites & Motion')
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Work that earns
            <br />a second look.
          </>
        }
        intro="Logos, identities, websites and animation, each built for one business and one market. Filter by category and open any piece for a closer look."
        side={[<LogoArt spec={logos[1]} className="h-full w-full" />, <LaptopMockup p={sites[3].p} title={sites[3].title} backdrop="#04d66d" />]}
      />
      <section className="bg-black px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <PortfolioGrid initial="all" limit={20} />
        </div>
      </section>
      <LogoWallSection />
      <TestimonialsSection />
      <CtaSection eyebrow="Like what you see?" title="Your brand could be the next one here." secondary={{ label: 'See pricing', to: '/pricing' }} />
    </>
  )
}
