import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useHasFinePointer } from '@/hooks/useMediaQuery'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
  /** Radius in px at which the pull is at full strength. */
  radius?: number
}

/** Subtle magnetic pull on interactive elements (desktop pointers only). */
export function Magnetic({ children, className, strength = 0.32, radius = 90 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useHasFinePointer()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.35 })

  useEffect(() => {
    if (!fine) return
    const el = ref.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const dist = Math.hypot(dx, dy)
      const reach = radius + Math.max(rect.width, rect.height) / 2
      if (dist > reach) {
        x.set(0)
        y.set(0)
        return
      }
      const pull = (1 - dist / reach) * strength
      x.set(dx * pull)
      y.set(dy * pull)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fine, radius, strength, x, y])

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={cn('inline-block', className)}>
      {children}
    </motion.div>
  )
}
