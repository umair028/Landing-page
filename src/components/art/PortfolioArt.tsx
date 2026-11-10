import { memo } from 'react'
import type { PortfolioItem } from '@/data/portfolio'
import { sites } from '@/data/art'
import { brandWork, clientLogos, motionWork, websiteShots, type WorkImage } from '@/data/work'
import { CanvaCover, CanvaLogo, CanvaVideo } from './CanvaArt'
import { BrowserMockup, LaptopMockup } from './Mockups'

/** A still image, a looping video over its poster, or (with `bg`) an uncropped image on a colour panel. */
export function WorkPiece({ piece, className }: { piece: WorkImage; className: string }) {
  if (piece.video) {
    return <CanvaVideo video={{ src: piece.video, poster: piece.src, alt: piece.alt }} className={className} />
  }
  if (piece.bg) return <CanvaLogo img={piece} bg={piece.bg} pad="0" className={className} />
  return <CanvaCover img={piece} className={className} />
}

/** Renders the right artwork for any portfolio entry. */
function PortfolioArtBase({ item, className = 'h-full w-full' }: { item: PortfolioItem; className?: string }) {
  switch (item.category) {
    case 'logo':
      return <WorkPiece piece={clientLogos[item.ref]} className={className} />
    case 'animated':
      return <WorkPiece piece={motionWork[item.ref]} className={className} />
    case 'brand':
      return <WorkPiece piece={brandWork[item.ref]} className={className} />
    case 'web': {
      if (item.shot) return <WorkPiece piece={websiteShots[item.ref]} className={className} />
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
