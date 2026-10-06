import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'
import { setLenis } from '@/lib/scroll'
import { startPointerTracking } from '@/lib/pointer'

/** Lenis-driven smooth scrolling + global pointer tracking. */
export default function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    const stopPointer = startPointerTracking()
    if (reduce) return stopPointer

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    })

    setLenis(lenis)

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      setLenis(null)
      stopPointer()
    }
  }, [reduce])

  return null
}
