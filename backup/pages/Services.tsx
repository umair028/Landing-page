import { ArrowRight, Check, Clapperboard, Clock, Globe, Palette, PenTool } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatedMark, LogoArt } from '../components/art/LogoArt'
import { BrandKitMockup, BrowserMockup, LaptopMockup } from '../components/art/Mockups'
import { PricingSection } from '../components/shared/Pricing'
import { CtaSection, FaqSection, PageHero, ProcessSection } from '../components/shared/Sections'
import { logos, sites } from '../data/art'
import { services } from '../data/content'
import { usePageTitle } from '../hooks/usePageTitle'
import { cn } from '../lib/cn'

const icons = { logo: PenTool, brand: Palette, web: Globe, motion: Clapperboard }
const art = {
  logo: <LogoArt spec={{ ...logos[0], layout: 'inline' }} className="h-full w-full" />,
  brand: <BrandKitMockup logo={logos[13]} />,
  web: <LaptopMockup p={sites[2].p} title={sites[2].title} backdrop="#0b1f14" />,
  motion: <AnimatedMark bg="#0d0b1f" accent="#7b5cff" name="Orbital" className="h-full w-full" />,
}

export default function Services() {
  usePageTitle('Services | Logo Design, Branding, Websites & Animation')
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Logo, brand, site and motion
            <br />
            that belong together.
          </>
        }
        intro="When your logo, website and visuals look like three different companies, trust drops. We build the pieces together, or start wherever you need help most."
        side={[<LogoArt spec={logos[7]} className="h-full w-full" />, <BrowserMockup p={sites[4].p} title={sites[4].title} />]}
      >
        <nav className="flex flex-wrap justify-center gap-2" aria-label="Services">
          {services.map((s) => {
            const Icon = icons[s.id as keyof typeof icons]
            return (
              <Link
                key={s.id}
                to={`/services#${s.id}`}
                className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white ring-1 ring-white/25 transition-colors hover:bg-white hover:text-black"
              >
                <Icon size={15} strokeWidth={2.5} />
                {s.label}
              </Link>
            )
          })}
        </nav>
      </PageHero>

      <section className="bg-black px-5 py-24 text-white md:py-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-24 md:gap-32">
          {services.map((s, i) => {
            const Icon = icons[s.id as keyof typeof icons]
            return (
              <article key={s.id} id={s.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div data-reveal="scale" className={cn('relative rounded-[28px] p-4 md:p-6', s.bg, i % 2 === 1 && 'lg:order-2')}>
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.3)]">{art[s.id as keyof typeof art]}</div>
                  <span className="absolute -bottom-5 left-8 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
                    <Clock size={16} className="text-primary" />
                    Delivered in <span className="font-black">{s.delivery}</span>
                  </span>
                </div>
                <div>
                  <p data-reveal="" className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-primary">
                    <Icon size={15} strokeWidth={2.5} />
                    {s.label}
                  </p>
                  <h2 data-reveal="" className="text-4xl font-black normal-case leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                    {s.title}
                  </h2>
                  <p data-reveal="" className="mt-6 max-w-xl text-sm font-medium leading-relaxed text-white/65 md:text-base">
                    {s.text}
                  </p>
                  <ul data-reveal-children="" className="mt-8 grid gap-3 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm font-semibold">
                        <span className="mt-px grid h-5 w-5 flex-none place-items-center rounded-full bg-primary text-black">
                          <Check size={12} strokeWidth={3.5} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div data-reveal="" className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/10 pt-6">
                    <p className="text-sm text-white/55">
                      Starting at <span className="ml-1 text-3xl font-black tracking-tight text-white">{s.price}</span>
                    </p>
                    <Link
                      to={`/brief?service=${s.id}`}
                      className="group ml-auto inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-white"
                    >
                      Start Your Project Brief
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
      <ProcessSection />
      <PricingSection />
      <FaqSection />
      <CtaSection eyebrow="Not sure where to start?" title="Tell us the problem. We will suggest the service." />
    </>
  )
}
