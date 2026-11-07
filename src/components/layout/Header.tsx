import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BrandLogo } from '@/components/art/BrandLogo'
import { navLinks, site } from '@/config/site'
import { cn } from '@/lib/cn'

const ROLL_EASE = 'ease-[cubic-bezier(0.65,0,0.35,1)]'
const ROLL_STAGGER_MS = 28
/** Scroll distance after which the header picks up its heavier shadow. */
const SCROLLED_OFFSET = 24
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

interface LetterRollProps {
  text: string
}

/**
 * Hover effect for nav labels: each letter slides up and out while a copy slides in
 * from below, staggered left to right. Needs a `group` class on the parent link.
 */
export function LetterRoll({ text }: LetterRollProps) {
  const letterClass = `inline-block transition-[transform,opacity] duration-700 ${ROLL_EASE} motion-reduce:transition-none`

  return (
    <span className="pointer-events-none relative inline-flex overflow-hidden leading-none" aria-label={text}>
      {text.split('').map((char, index) => {
        const glyph = char === ' ' ? ' ' : char
        const delay = { transitionDelay: `${index * ROLL_STAGGER_MS}ms` }
        return (
          <span key={index} aria-hidden="true" className="relative inline-block">
            <span className={cn(letterClass, 'group-hover:-translate-y-full group-hover:opacity-0')} style={delay}>
              {glyph}
            </span>
            <span
              className={cn(
                letterClass,
                'absolute inset-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
              )}
              style={delay}
            >
              {glyph}
            </span>
          </span>
        )
      })}
    </span>
  )
}

/** Floating pill header with desktop nav, call button and a collapsible mobile menu. */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => setIsMenuOpen(false), [pathname])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLLED_OFFSET)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 md:px-10 md:pt-5"
      initial={{ opacity: 0, y: -90 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 }}
    >
      <div
        className={cn(
          'relative mx-auto flex h-14 max-w-[1180px] items-center justify-between rounded-full border border-black/5 bg-white pl-4 pr-1.5 ring-[5px] ring-white/25 transition-shadow duration-300 md:h-[60px] md:pl-6 md:pr-2',
          isScrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.14)]' : 'shadow-[0_6px_18px_rgba(0,0,0,0.08)]',
        )}
      >
        <Link to="/" className="group flex items-center" aria-label={`${site.name} home`}>
          <BrandLogo className="block h-9 w-auto select-none transition-transform duration-300 group-hover:scale-[1.03] md:h-10" />
        </Link>

        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className="group relative px-4 py-2 font-sans text-[14px] font-medium uppercase tracking-[0.06em] text-black"
            >
              {({ isActive }) => (
                <>
                  <LetterRoll text={link.label} />
                  <motion.span
                    className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <a
            href={site.phoneHref}
            className="group hidden items-center gap-2.5 rounded-full bg-[#0b1f14] px-5 py-3 font-sans text-[15px] font-bold tracking-[0.02em] text-white transition-colors duration-300 hover:bg-accent sm:flex"
          >
            <Phone
              size={16}
              fill="currentColor"
              strokeWidth={0}
              className="transition-transform duration-300 group-hover:-rotate-12"
            />
            {site.phone}
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full bg-black text-white xl:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 -z-10 cursor-default bg-black/20 xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              className="mx-auto mt-2 max-w-[1180px] origin-top rounded-[28px] bg-white/85 p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] ring-[5px] ring-white/25 backdrop-blur-xl xl:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
            >
              <ul>
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between rounded-2xl px-5 py-4 text-[15px] font-medium uppercase tracking-[0.08em] text-black transition-colors',
                          isActive ? 'bg-primary/20' : 'hover:bg-black/5',
                        )
                      }
                    >
                      {link.label}
                      <ArrowRight size={18} className="text-black/50" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <a
                href={site.phoneHref}
                className="mt-2 flex items-center justify-center gap-2.5 rounded-full bg-[#0b1f14] px-5 py-4 text-[15px] font-bold text-white"
              >
                <Phone size={16} fill="currentColor" strokeWidth={0} />
                {site.phone}
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
