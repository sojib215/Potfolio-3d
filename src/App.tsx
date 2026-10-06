import { Suspense, lazy, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Loader from '@/components/layout/Loader'
import Cursor from '@/components/layout/Cursor'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Home from '@/pages/Home'
import { lockScroll, scrollTo } from '@/lib/scroll'
import { IntroContext } from '@/context/intro'

const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const INTRO_KEY = 'sojib:intro:seen'

/** Handles hash scrolling and scroll reset between routes. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const timer = window.setTimeout(() => scrollTo(`#${id}`), 120)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
    return undefined
  }, [pathname, hash])

  return null
}

function PageShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  return (
    <motion.main
      id="main"
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const reduce = useReducedMotion()
  const [intro, setIntro] = useState(() => {
    if (reduce) return false
    try {
      return sessionStorage.getItem(INTRO_KEY) !== '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    lockScroll(intro)
    return () => lockScroll(false)
  }, [intro])

  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* storage unavailable — fine */
    }
    setIntro(false)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-[2px] focus:bg-chalk focus:px-4 focus:py-2 focus:text-[13px] focus:text-void"
      >
        Skip to content
      </a>

      <IntroContext.Provider value={intro}>
        <SmoothScroll />
        <Cursor />
        <ScrollManager />
        <Navbar />

        <AnimatePresence>{intro ? <Loader onComplete={finishIntro} /> : null}</AnimatePresence>

        <PageShell>
          <Suspense fallback={<div className="min-h-[70svh]" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageShell>
      </IntroContext.Provider>

      <Footer />
    </>
  )
}
