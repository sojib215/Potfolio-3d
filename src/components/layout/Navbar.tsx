import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems, profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'
import { lockScroll, scrollTo } from '@/lib/scroll'

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'journey', 'contact'] as const

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      data-cursor="link"
      className="group flex items-baseline gap-2.5"
      aria-label={`${profile.displayName} — home`}
    >
      <span className="text-[15px] font-semibold tracking-[0.14em] text-chalk transition-colors duration-500 group-hover:text-accent">
        {profile.displayName}
      </span>
      <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-faint sm:block">
        Frontend Developer
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  const isActive = (href: string) => {
    const id = href.split('#')[1]
    return id ? active === id : false
  }

  const handleNav = (href: string) => (event: React.MouseEvent) => {
    if (!href.includes('#')) return
    const id = href.split('#')[1]
    if (pathname === '/') {
      event.preventDefault()
      setOpen(false)
      scrollTo(`#${id}`)
    }
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className={cn('transition-all duration-700', scrolled ? 'pt-3' : 'pt-5 md:pt-6')}>
          <nav className="shell">
            <div
              className={cn(
                'pointer-events-auto flex items-center justify-between gap-6 rounded-full border px-4 py-2.5 transition-all duration-700 md:px-5',
                scrolled
                  ? 'border-line bg-void/70 shadow-[0_24px_70px_-40px_rgba(0,0,0,1)] backdrop-blur-xl'
                  : 'border-transparent bg-transparent',
              )}
            >
              <Wordmark />

              <ul className="hidden items-center gap-8 lg:flex">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      onClick={handleNav(item.href)}
                      data-cursor="link"
                      aria-current={isActive(item.href) ? 'true' : undefined}
                      className={cn(
                        'group relative flex items-center gap-2 text-[13px] tracking-[-0.01em] transition-colors duration-500',
                        isActive(item.href) ? 'text-chalk' : 'text-dim hover:text-chalk',
                      )}
                    >
                      <span
                        className={cn(
                          'size-1 rounded-full transition-all duration-500',
                          isActive(item.href) ? 'bg-accent' : 'bg-transparent group-hover:bg-faint',
                        )}
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint xl:flex">
                  <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
                  {profile.status}
                </span>

                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  data-cursor="link"
                  className="pointer-events-auto flex size-9 flex-col items-center justify-center gap-[5px] lg:hidden"
                >
                  <span
                    className={cn(
                      'h-px w-5 bg-chalk transition-transform duration-500',
                      open && 'translate-y-[3px] rotate-45',
                    )}
                  />
                  <span
                    className={cn(
                      'h-px w-5 bg-chalk transition-transform duration-500',
                      open && '-translate-y-[3px] -rotate-45',
                    )}
                  />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* ---- mobile menu ---- */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-center pb-20 pt-24">
              <ul className="space-y-2">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line-soft"
                  >
                    <Link
                      to={item.href}
                      onClick={handleNav(item.href)}
                      className="flex items-baseline justify-between py-5 text-[clamp(1.9rem,9vw,3rem)] font-medium tracking-[-0.035em] text-chalk"
                    >
                      {item.label}
                      <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mt-12 flex flex-wrap gap-x-6 gap-y-2"
              >
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label hover:text-chalk"
                >
                  GitHub
                </a>
                <a href={`mailto:${profile.contact.email}`} className="label hover:text-chalk">
                  Email
                </a>
                <span className="label">{profile.location}</span>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
