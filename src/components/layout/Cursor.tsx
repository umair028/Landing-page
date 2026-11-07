import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const FOLLOW_SPRING = { stiffness: 500, damping: 40, mass: 0.4 }
const DOT_SIZE = 16
const LABEL_SIZE = 84

/**
 * Difference-blended dot that trails the pointer. Hovering any element with a
 * `data-cursor="Label"` attribute grows the dot and shows that label.
 *
 * Only rendered for fine pointers (mouse / trackpad) and hidden for reduced motion.
 */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, FOLLOW_SPRING)
  const springY = useSpring(y, FOLLOW_SPRING)
  const [isVisible, setIsVisible] = useState(false)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setIsVisible(true)

      const target = (event.target as HTMLElement | null)?.closest?.('[data-cursor]')
      setLabel(target ? target.getAttribute('data-cursor') : null)
    }
    const handleLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [x, y])

  const size = label ? LABEL_SIZE : DOT_SIZE

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden items-center justify-center rounded-full bg-white mix-blend-difference motion-reduce:hidden [@media(pointer:fine)]:flex"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%', opacity: isVisible ? 1 : 0 }}
      animate={{ width: size, height: size }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    >
      {label && <span className="text-[11px] font-black uppercase tracking-widest text-black">{label}</span>}
    </motion.div>
  )
}
