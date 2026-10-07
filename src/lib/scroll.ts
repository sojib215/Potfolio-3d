import type Lenis from 'lenis'

let instance: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  instance = l
}
export const getLenis = () => instance

export function lockScroll(locked: boolean) {
  if (instance) {
    locked ? instance.stop() : instance.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/** Scrolls to an element or selector, through Lenis when it is available. */
export function scrollTo(target: string | HTMLElement, offset = -72) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.15 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
