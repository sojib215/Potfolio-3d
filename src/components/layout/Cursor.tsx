import { useEffect, useRef, useState } from 'react'
import { useHasFinePointer } from '@/hooks/useMediaQuery'
import { useReducedMotion } from 'framer-motion'
import { lerp } from '@/lib/utils'

type Variant = 'default' | 'link' | 'project'

/**
 * Refined custom cursor: a precise dot with a trailing ring.
 * Desktop pointers only, and never when reduced motion is requested.
 */
export default function Cursor() {
  const fine = useHasFinePointer()
  const reduce = useReducedMotion()
  const enabled = fine && !reduce

  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const [variant, setVariant] = useState<Variant>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const root = document.documentElement
    root.classList.add('cursor-hidden')

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        '[data-cursor], a, button, [role="button"]',
      )
      const mode = el?.getAttribute('data-cursor')
      setVariant(mode === 'project' ? 'project' : el ? 'link' : 'default')
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    let frame = 0
    const loop = () => {
      ringPos.current.x = lerp(ringPos.current.x, target.current.x, 0.18)
      ringPos.current.y = lerp(ringPos.current.y, target.current.y, 0.18)
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
      root.classList.remove('cursor-hidden')
    }
  }, [enabled])

  if (!enabled) return null

  const size = variant === 'project' ? 68 : variant === 'link' ? 46 : 26

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <div
        ref={dot}
        className="absolute left-0 top-0 size-1 rounded-full bg-chalk transition-opacity duration-300"
        style={{ opacity: visible && variant === 'default' ? 1 : 0 }}
      />
      <div
        ref={ring}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          borderColor:
            variant === 'default'
              ? 'rgba(255,255,255,0.32)'
              : variant === 'link'
                ? 'rgba(76,141,255,0.55)'
                : 'rgba(76,141,255,0.7)',
          backgroundColor: variant === 'default' ? 'transparent' : 'rgba(76,141,255,0.10)',
        }}
      >
        {variant === 'project' ? (
          <span className="font-mono text-[9px] tracking-[0.18em] text-accent-soft">VIEW</span>
        ) : null}
      </div>
    </div>
  )
}
