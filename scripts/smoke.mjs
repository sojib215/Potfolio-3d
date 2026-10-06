/**
 * Headless smoke test: loads the production build in jsdom and reports
 * console errors, unhandled errors and whether the page rendered.
 * Run: node scripts/smoke.mjs [url]
 */
import { JSDOM, VirtualConsole } from 'jsdom'

const url = process.argv[2] ?? 'http://127.0.0.1:8098/'
const errors = []

const virtualConsole = new VirtualConsole()
virtualConsole.on('jsdomError', (e) => errors.push(`jsdomError: ${e.message}`))
virtualConsole.on('error', (...args) => errors.push(`console.error: ${args.join(' ')}`))
virtualConsole.on('warn', (...args) => {
  const msg = args.join(' ')
  if (!/chunks? larger|preload|prefetch/i.test(msg)) errors.push(`console.warn: ${msg}`)
})

const dom = await JSDOM.fromURL(url, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  virtualConsole,
  beforeParse(window) {
    class Observer {
      constructor(cb) {
        this.cb = cb
      }
      observe(el) {
        this.cb?.([{ isIntersecting: true, intersectionRatio: 1, target: el }], this)
      }
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    }
    window.IntersectionObserver = Observer
    window.ResizeObserver = Observer
    window.matchMedia =
      window.matchMedia ??
      ((query) => ({
        matches: /min-width/.test(query),
        media: query,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        onchange: null,
        dispatchEvent: () => false,
      }))
    window.addEventListener('error', (e) => errors.push(`window.error: ${e.message}`))
    window.addEventListener('unhandledrejection', (e) =>
      errors.push(`unhandledrejection: ${e.reason}`),
    )
  },
})

await new Promise((r) => setTimeout(r, 4000))

const { document } = dom.window
const root = document.getElementById('root')
const text = root?.textContent ?? ''
const h1 = document.querySelector('h1')?.textContent?.trim()
const sections = [...document.querySelectorAll('section[id]')].map((s) => s.id)
const links = [...document.querySelectorAll('a[href]')].length
const buttons = [...document.querySelectorAll('button')].length

console.log('--- smoke report ---')
console.log('url       :', url)
console.log('rendered  :', root ? `${root.innerHTML.length} chars of html` : 'NO #root')
console.log('h1        :', h1)
console.log('sections  :', sections.join(', '))
console.log('links     :', links, '| buttons:', buttons)
console.log('title     :', document.title)
console.log('has text  :', text.includes('Building clean digital'))
// navigate into a project detail route
const projectTrigger = document.querySelector('[data-cursor="project"]')
if (projectTrigger) {
  projectTrigger.dispatchEvent(
    new dom.window.MouseEvent('click', { bubbles: true, cancelable: true, view: dom.window }),
  )
  await new Promise((r) => setTimeout(r, 2500))
  console.log('--- after project navigation ---')
  console.log('url       :', dom.window.location.pathname)
  console.log('h1        :', document.querySelector('h1')?.textContent?.trim())
  console.log('title     :', document.title)
  console.log('has blocks:', document.querySelectorAll('#problem, #approach, #challenges').length)
}

console.log('errors    :', errors.length)
errors.slice(0, 20).forEach((e) => console.log('  -', e))

dom.window.close()
process.exit(errors.length ? 1 : 0)
