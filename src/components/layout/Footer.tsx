import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/art/BrandLogo'
import { legalLinks, navLinks, site } from '@/config/site'
import { cn } from '@/lib/cn'

const GRID_MASK = 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 85%)'

const gridStyle: CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.043) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.043) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
  maskImage: GRID_MASK,
  WebkitMaskImage: GRID_MASK,
}

const glowStyle: CSSProperties = {
  background: 'radial-gradient(70% 60% at 50% 40%, rgba(255,255,255,0.035), transparent 70%)',
}

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#111111] px-5 pb-16 pt-24 text-[#f2f2f2] md:pb-20 md:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={gridStyle} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={glowStyle} />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <p data-reveal="" className="text-xl font-bold tracking-tight md:text-3xl">
          Logo, brand, website &amp; motion, made to match.
        </p>
        <Link data-reveal="" to="/" className="group mb-10 mt-6 block md:mb-14" aria-label={`${site.name} home`}>
          <BrandLogo
            light
            className="mx-auto block h-16 w-auto select-none transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] md:h-20"
          />
        </Link>
        <h2
          data-reveal=""
          className="max-w-xl text-2xl font-bold normal-case leading-tight tracking-tight md:text-[34px]"
        >
          Your next step is a brief
          <br className="hidden sm:block" /> or a quick question.
        </h2>
        <Link
          data-reveal=""
          to="/brief"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#eaeaea] px-5 py-2.5 text-base font-semibold text-[#0c0c0c] transition-colors hover:bg-primary"
        >
          Start Your Project Brief
          <ArrowUpRight size={18} />
        </Link>

        <nav
          data-reveal=""
          aria-label="Footer"
          className="mt-16 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-base font-semibold transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <address
          data-reveal=""
          className="mx-auto mt-10 flex w-full max-w-[20rem] flex-col gap-2.5 text-sm not-italic text-white/75 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-2"
        >
          <a
            href={site.phoneHref}
            className="flex items-start gap-2 text-left transition-colors hover:text-primary sm:items-center"
          >
            <Phone size={15} className="mt-0.5 shrink-0 sm:mt-0" />
            <span>{site.phone}</span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-start gap-2 text-left transition-colors hover:text-primary sm:items-center"
          >
            <Mail size={15} className="mt-0.5 shrink-0 sm:mt-0" />
            <span className="break-all">{site.email}</span>
          </a>
          <span className="flex items-start gap-2 text-left sm:items-center">
            <MapPin size={15} className="mt-0.5 shrink-0 sm:mt-0" />
            <span className="min-w-0 leading-snug">{site.address}</span>
          </span>
        </address>

        <p data-reveal="" className="mt-8 text-[10px] text-white/60">
          &copy; {currentYear} {site.name}. All rights reserved.
        </p>
        <nav data-reveal="" aria-label="Legal" className="mt-2 flex flex-wrap justify-center">
          {legalLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'px-2.5 text-[11px] text-white/55 transition-colors hover:text-white',
                index > 0 && 'border-l border-white/25',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
