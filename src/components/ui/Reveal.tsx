import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: boolean
  once?: boolean
}

/** Fades + lifts content into view. Reveals once by default. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  blur = false,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: reduce ? 0 : y,
        filter: blur && !reduce ? 'blur(8px)' : 'blur(0px)',
      }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

interface LineMaskProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

/** Text that slides up out of a mask — used for headings. */
export function LineMask({ children, className, delay = 0, duration = 1.05 }: LineMaskProps) {
  const reduce = useReducedMotion()

  return (
    <span className={cn('block overflow-hidden pb-[0.12em]', className)}>
      <motion.span
        className="block"
        initial={{ y: reduce ? 0 : '110%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}{' '}
      </motion.span>
    </span>
  )
}

/** Staggers direct children into view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  y = 22,
}: {
  children: ReactNode
  className?: string
  y?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}
