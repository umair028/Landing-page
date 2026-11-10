import { useEffect, useRef } from 'react'
import type { canva } from '@/data/canva'
import { prefersReducedMotion } from '@/lib/gsap'
import { PLAYED_THROUGH_ATTR } from '@/lib/video'

type Img = { src: string; alt: string }

/** A logo centred on a flat colour panel, padded so wide wordmarks still breathe. */
export function CanvaLogo({
  img,
  bg,
  pad = '14%',
  className = 'h-full w-full',
}: {
  img: Img
  bg: string
  pad?: string
  className?: string
}) {
  return (
    <div className={`grid place-items-center ${className}`} style={{ background: bg, padding: pad }}>
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  )
}

/** A full-bleed photo / board that covers its card. */
export function CanvaCover({ img, className = 'h-full w-full' }: { img: Img; className?: string }) {
  return (
    <img
      src={img.src}
      alt={img.alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`object-cover ${className}`}
    />
  )
}

/**
 * Muted looping video that only plays while on screen (saves CPU/battery),
 * and shows the still poster for visitors who prefer reduced motion.
 * Marks itself with `PLAYED_THROUGH_ATTR` after its first full play, so slideshows can wait for it.
 */
export function CanvaVideo({
  video,
  bg = '#000',
  fit = 'cover',
  className = 'h-full w-full',
}: {
  video: typeof canva.skull
  bg?: string
  fit?: 'cover' | 'contain'
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.play().catch(() => {})
      else el.pause()
    })
    io.observe(el)

    // A looping video never fires `ended`, so a full play shows up as the playhead jumping back to the start.
    let lastTime = 0
    const markPlayed = () => el.setAttribute(PLAYED_THROUGH_ATTR, '')
    const onTimeUpdate = () => {
      if (el.currentTime < lastTime - 0.5) markPlayed()
      lastTime = el.currentTime
    }
    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('ended', markPlayed)
    return () => {
      io.disconnect()
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('ended', markPlayed)
    }
  }, [])

  return (
    <div className={className} style={{ background: bg }}>
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        aria-label={video.alt}
        muted
        loop
        playsInline
        preload="metadata"
        className={`h-full w-full ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
      />
    </div>
  )
}
