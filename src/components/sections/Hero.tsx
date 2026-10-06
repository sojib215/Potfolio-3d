import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Action } from '@/components/ui/Button'
import { LineMask } from '@/components/ui/Reveal'
import { Magnetic } from '@/components/ui/Magnetic'
import { Marker } from '@/components/ui/SectionHead'
import { profile } from '@/data/profile'
import { detectWebGL } from '@/lib/utils'
import { useIsMobile } from '@/hooks/useMediaQuery'
import SceneFallback from '@/components/three/SceneFallback'

// three.js is only fetched when the visitor can actually use it
const HeroScene = lazy(() => import('@/components/three/HeroScene'))
import { scrollTo } from '@/lib/scroll'
import { useIntro } from '@/context/intro'

function LocalClock() {
  const [time, setTime] = useState(() => now())
  useEffect(() => {
    const id = window.setInterval(() => setTime(now()), 20_000)
    return () => window.clearInterval(id)
  }, [])
  return <span className="num">{time}</span>
}

function now() {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: profile.timezone,
      hour12: false,
    }).format(new Date())
  } catch {
    return '--:--'
  }
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const isMobile = useIsMobile()

  const introActive = useIntro()
  /** Entrance animations wait for the intro curtain on a first visit. */
  const introOffset = introActive ? 1.6 : 0

  const [webgl] = useState(() => detectWebGL())
  const [mounted, setMounted] = useState(false)
  const [onScreen, setOnScreen] = useState(true)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => setMounted(true), [])

  // pause the render loop when the hero scrolls away
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin: '160px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%'])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.05])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '22%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])

  const show3D = webgl && !reduce
  const quality = useMemo<'high' | 'low'>(() => (isMobile ? 'low' : 'high'), [isMobile])

  return (
    <section ref={ref} id="home" className="relative isolate min-h-[100svh] w-full overflow-hidden">
      {/* ---- background layers ---- */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-40"
        style={{
          maskImage: 'radial-gradient(120% 90% at 60% 20%, #000 20%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(120% 90% at 60% 20%, #000 20%, transparent 78%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_65%_25%,rgba(76,141,255,0.10),transparent_62%)]" />

      {/* ---- 3D ---- */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 lg:left-[28%]"
        style={{ y: sceneY, opacity: sceneOpacity }}
      >
        {mounted && show3D ? (
          <Suspense fallback={null}>
            <HeroScene
              quality={quality}
              active={onScreen && tabVisible}
              className="absolute inset-0 opacity-70 md:opacity-100"
            />
          </Suspense>
        ) : null}
        {mounted && !show3D ? <SceneFallback className="absolute inset-0" /> : null}
      </motion.div>

      {/* legibility scrim */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/90 to-transparent lg:via-void/55" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-void to-transparent" />

      <Marker className="left-6 top-28 hidden lg:block" />
      <Marker className="right-6 top-28 hidden lg:block" />

      {/* ---- content ---- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="shell relative flex min-h-[100svh] flex-col pb-16 pt-32 lg:pb-20 lg:pt-40"
      >
        <div className="flex flex-1 flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 + introOffset, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="relative flex size-1.5 items-center justify-center">
              <span className="absolute size-1.5 rounded-full bg-accent/30" />
              <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
            </span>
            <span className="label text-chalk/70">Frontend Developer • SaaS Builder</span>
          </motion.div>

          <h1 className="mt-8 text-[clamp(2rem,5.6vw,4.2rem)] font-medium text-edge text-chalk">
            <LineMask delay={0.25 + introOffset}>Building clean</LineMask>
            <LineMask delay={0.35 + introOffset}>digital experiences</LineMask>
            <LineMask delay={0.45 + introOffset}>
              <span className="font-serif italic tracking-[-0.01em] text-accent-soft">
                for real-world ideas.
              </span>
            </LineMask>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62 + introOffset, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-[46ch] text-[15px] leading-[1.7] text-mute md:text-base"
          >
            I’m Habibul Hasan Sojib — a Computer Science &amp; Technology diploma student from
            Bangladesh, currently in my 6th semester at Habiganj Polytechnic Institute. I build
            frontend applications and SaaS-style products with React, TypeScript, Tailwind CSS and
            Firebase.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.74 + introOffset, ease: [0.16, 1, 0.3, 1] }}
            className="mt-11 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Action to="/#projects" arrow data-cursor="link">
                View Projects
              </Action>
            </Magnetic>
            <Magnetic strength={0.22}>
              <Action to="/#about" variant="outline" data-cursor="link">
                About Me
              </Action>
            </Magnetic>
          </motion.div>
        </div>

        {/* ---- micro information ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 + introOffset }}
          className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-line-soft pt-6"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="label">Based in Bangladesh</span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span className="label flex items-center gap-2">
              <span className="size-1 rounded-full bg-accent/80" />
              {profile.status}
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            <span className="hidden md:inline">
              {profile.coords} · <LocalClock /> BST
            </span>
            <button
              type="button"
              onClick={() => scrollTo('#about')}
              data-cursor="link"
              className="group flex items-center gap-2 text-dim transition-colors hover:text-chalk"
            >
              Scroll
              <span className="block h-8 w-px bg-gradient-to-b from-dim to-transparent transition-all duration-500 group-hover:h-10 group-hover:from-accent" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
