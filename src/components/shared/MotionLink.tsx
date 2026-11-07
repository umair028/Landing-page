import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

const MotionRouterLink = motion.create(Link)

/** How far the button travels toward the cursor (1 = all the way). */
const PULL = 0.5
const SPRING = { stiffness: 170, damping: 18, mass: 0.35 }

/** Router link with a smooth magnetic hover: it drifts toward the cursor, then eases back on leave. */
interface MotionLinkProps {
  to: string
  className?: string
  children: ReactNode
}

export function MotionLink({ to, className = '', children }: MotionLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  // Motion values update outside React, so mouse moves never trigger re-renders.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, SPRING)
  const y = useSpring(my, SPRING)

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - (r.left + r.width / 2)) * PULL)
    my.set((e.clientY - (r.top + r.height / 2)) * PULL)
  }

  const onMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <MotionRouterLink
      ref={ref}
      to={to}
      className={className}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </MotionRouterLink>
  )
}
