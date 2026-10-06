import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

const DURATION = 1500

/** Short cinematic intro. Runs once per session. */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION)
      // ease-out so the last numbers feel calmer
      setProgress(Math.round((1 - Math.pow(1 - t, 2)) * 100))
      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        window.setTimeout(() => setDone(true), 180)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-void px-6 py-7 md:px-10"
      initial={{ y: 0 }}
      animate={done ? { y: '-101%' } : { y: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (done) onComplete()
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="flex items-start justify-between">
        <span className="label">Portfolio — {new Date().getFullYear()}</span>
        <span className="label hidden md:block">{profile.location}</span>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="flex overflow-hidden text-[clamp(2.6rem,13vw,7rem)] font-semibold leading-none tracking-[0.06em] text-chalk">
          {profile.displayName.split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <div className="mt-10 flex items-center gap-5">
          <div className="relative h-px w-40 overflow-hidden bg-line md:w-64">
            <div
              className="h-px bg-accent transition-[width] duration-150 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="num font-mono text-[10px] tracking-[0.16em] text-dim">
            {String(progress).padStart(3, '0')}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <span className="label">{profile.positioning}</span>
        <span className="label">Loading experience</span>
      </div>
    </motion.div>
  )
}
