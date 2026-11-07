import { memo } from 'react'
import type { PortfolioItem } from '@/data/portfolio'
import { animatedPalette } from '@/data/portfolio'
import { logos, sites } from '@/data/art'
import { AnimatedMark, LogoArt } from './LogoArt'
import { BillboardMockup, BrandKitMockup, BrowserMockup, LaptopMockup } from './Mockups'

/** Renders the right artwork for any portfolio entry. */
function PortfolioArtBase({ item, className = 'h-full w-full' }: { item: PortfolioItem; className?: string }) {
  switch (item.category) {
    case 'logo':
      return <LogoArt spec={logos[item.ref]} className={className} framed />
    case 'animated': {
      const [bg, accent] = animatedPalette[item.ref]
      return (
        <AnimatedMark
          className={className}
          bg={bg}
          accent={accent}
          name={logos[(item.ref * 3) % logos.length].name.split(' ')[0]}
        />
      )
    }
    case 'brand':
      return item.variant === 'billboard' ? (
        <BillboardMockup logo={logos[item.ref]} headline="Now Open" className={className} />
      ) : (
        <BrandKitMockup logo={logos[item.ref]} className={className} />
      )
    case 'web': {
      const s = sites[item.ref]
      return item.variant === 'browser' ? (
        <div className={`${className} grid place-items-center p-[6%]`} style={{ background: s.backdrop }}>
          <div className="h-full w-full overflow-hidden rounded-md shadow-[0_16px_30px_-12px_rgba(0,0,0,0.5)]">
            <BrowserMockup p={s.p} title={s.title} variant={item.ref} />
          </div>
        </div>
      ) : (
        <LaptopMockup p={s.p} title={s.title} backdrop={s.backdrop} variant={item.ref} className={className} />
      )
    }
  }
}

export const PortfolioArt = memo(PortfolioArtBase)
