import { ArrowRight, Layers, MessageSquareText, Ruler, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar } from '../components/art/Avatar'
import { BrandKitMockup } from '../components/art/Mockups'
import { LogoWallSection } from '../components/shared/LogoWallSection'
import { SectionHeading } from '../components/shared/SectionHeading'
import { CtaSection, PageHero, ProcessSection } from '../components/shared/Sections'
import { site } from '../config/site'
import { logos, people } from '../data/art'
import { team, values } from '../data/content'
import { usePageTitle } from '../hooks/usePageTitle'

const valueIcons = { sparkles: Sparkles, layers: Layers, message: MessageSquareText, ruler: Ruler }
const stats = [
  ['12', 'Years in design'],
  ['850+', 'Logos delivered'],
  ['30+', 'Countries served'],
  ['48h', 'To first concepts'],
]

export default function About() {
  usePageTitle('About Us | Logo Design Studio')
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Know who is designing
            <br />
            your brand.
          </>
        }
        intro={`${site.name} is a focused studio helping founders and growing businesses look as credible as the work they actually do.`}
      />

      <section className="bg-black px-5 py-24 text-white md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p data-reveal="" className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-primary">
              Our story
            </p>
            <h2 data-reveal="" className="text-4xl font-black normal-case leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Good businesses deserve
              <br />
              better first impressions.
            </h2>
            <p data-reveal="" className="mt-6 max-w-xl text-sm font-medium leading-relaxed text-white/65 md:text-base">
              Plenty of companies do excellent work but look improvised online. We started this studio to close that gap with custom design, honest pricing and a process people can actually follow.
            </p>
            <p data-reveal="" className="mt-4 text-sm leading-relaxed text-white/50 md:text-base">
              Today we handle logos, brand systems, websites and animation for clients around the world, with the same structured, plain-spoken approach on every project.
            </p>
            <Link
              data-reveal=""
              to="/portfolio"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-white"
            >
              See our work
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div data-reveal="scale" className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Avatar spec={{ ...people[4], bg: '#cfc6ff' }} className="h-full w-full" />
            </div>
            <div className="mt-12 aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <BrandKitMockup logo={logos[9]} />
            </div>
            <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full bg-white px-5 py-3 text-black shadow-xl">
              <span className="h-2.5 w-2.5 rounded-full bg-primary motion-safe:animate-pulse" />
              <span className="text-sm font-bold">Taking new projects this month</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0c0c0c] px-5 py-14 text-white md:py-16">
        <div data-reveal-children="" className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map(([v, l]) => (
            <div key={l}>
              <p className="text-5xl font-black tracking-[-0.04em] text-primary md:text-6xl">{v}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/60">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111111] px-5 py-24 text-white md:py-32">
        <SectionHeading eyebrow="What we believe" title="What you can expect from us." intro="Four standards that show up on every single project." />
        <div data-reveal-children="scale" className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = valueIcons[v.icon as keyof typeof valueIcons]
            return (
              <article key={v.title} className={`flex flex-col rounded-[22px] p-7 transition-transform duration-300 hover:-translate-y-1.5 ${v.cls}`}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-black/10">
                  <Icon size={22} />
                </span>
                <h3 className="mt-10 text-2xl font-black normal-case tracking-tight">{v.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed opacity-75">{v.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <ProcessSection bg="bg-black" />

      <section className="bg-[#111111] px-5 py-24 text-white md:py-32">
        <SectionHeading eyebrow="The team" title="The people on your project." intro="Designers who handle strategy, visuals, build and motion in-house." />
        <div data-reveal-children="scale" className="mx-auto grid max-w-6xl grid-cols-2 gap-5 lg:grid-cols-4">
          {team.map((m) => (
            <article key={m.name} className="group">
              <div className="overflow-hidden rounded-[22px]">
                <div className="aspect-square w-full grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0">
                  <Avatar spec={people[m.person]} className="h-full w-full" />
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3 border-t border-white/10 pt-4">
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold normal-case tracking-tight">{m.name}</h3>
                  <p className="mt-0.5 text-sm text-white/50">{m.role}</p>
                </div>
                <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-primary" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <LogoWallSection />
      <CtaSection eyebrow="Trust the process" title="If our approach fits, start with a brief." text="You will know the price and timeline before any design work begins." secondary={{ label: 'Contact us', to: '/contact' }} />
    </>
  )
}
