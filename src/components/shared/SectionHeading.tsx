import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Eyebrow + big heading + intro paragraph, wired for scroll reveal. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  eyebrowClass = 'text-primary',
  introClass = 'text-white/55',
  className = 'mx-auto mb-14 max-w-2xl text-center md:mb-20',
  titleClass = '',
  as: Tag = 'header',
}: {
  eyebrow: ReactNode
  title: ReactNode
  intro?: ReactNode
  eyebrowClass?: string
  introClass?: string
  className?: string
  titleClass?: string
  as?: 'header' | 'div'
}) {
  return (
    <Tag className={className}>
      <Eyebrow className={eyebrowClass}>{eyebrow}</Eyebrow>
      <Heading className={titleClass}>{title}</Heading>
      {intro && <Intro className={cn('mx-auto', introClass)}>{intro}</Intro>}
    </Tag>
  )
}

export function Eyebrow({ children, className = 'text-primary' }: { children: ReactNode; className?: string }) {
  return (
    <p data-reveal="" className={cn('mb-4 text-xs font-black uppercase tracking-[0.28em]', className)}>
      {children}
    </p>
  )
}

export function Heading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2
      data-reveal=""
      className={cn('text-4xl font-black normal-case leading-[0.95] tracking-[-0.04em] sm:text-6xl', className)}
    >
      {children}
    </h2>
  )
}

export function Intro({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p data-reveal="" className={cn('mt-6 max-w-xl text-sm font-medium leading-relaxed md:text-base', className)}>
      {children}
    </p>
  )
}
