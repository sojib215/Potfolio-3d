import * as THREE from 'three'

/**
 * All textures are painted procedurally on a 2D canvas at runtime.
 * No image downloads → no loading screens, tiny bundle, always crisp.
 */

type Ctx = CanvasRenderingContext2D

function makeCanvas(w: number, h: number): { canvas: HTMLCanvasElement; ctx: Ctx } {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  return { canvas, ctx }
}

function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

const MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace'
const SANS = '"Inter Tight", system-ui, sans-serif'

const C = {
  bg: '#0a0a0d',
  panel: '#101015',
  panelSoft: '#14141a',
  line: '#22222b',
  chalk: '#e8e8ec',
  mute: '#8b8b95',
  dim: '#4d4d57',
  accent: '#4c8dff',
  accentSoft: '#8ab6ff',
  green: '#5bd6a0',
  amber: '#e5b567',
  violet: '#a78bfa',
}

/* ------------------------------------------------------------------ */
/* Code editor screen                                                  */
/* ------------------------------------------------------------------ */

const CODE_LINES: Array<Array<[string, string]>> = [
  [
    ['kw', 'export function '],
    ['fn', 'SchoolDashboard'],
    ['p', '() {'],
  ],
  [
    ['kw', 'const '],
    ['p', '{ students, loading } = '],
    ['fn', 'useStudents'],
    ['p', '(classId)'],
  ],
  [
    ['kw', 'const '],
    ['p', '[section, setSection] = '],
    ['fn', 'useState'],
    ['p', "('A')"],
  ],
  [],
  [['c', '// one record → class list, profile + results']],
  [
    ['kw', 'const '],
    ['p', 'filtered = '],
    ['fn', 'useMemo'],
    ['p', '(() =>'],
  ],
  [
    ['p', 'students.'],
    ['fn', 'filter'],
    ['p', '((s) => s.section === section),'],
  ],
  [['p', '[students, section])']],
  [],
  [
    ['kw', 'if '],
    ['p', '(loading) '],
    ['kw', 'return '],
    ['p', '<'],
    ['tag', 'Skeleton'],
    ['p', ' rows={6} />'],
  ],
  [],
  [
    ['kw', 'return '],
    ['p', '('],
  ],
  [
    ['p', '<'],
    ['tag', 'Panel'],
    ['p', ' title='],
    ['str', '"Class 8 — Section A"'],
    ['p', '>'],
  ],
  [
    ['p', '<'],
    ['tag', 'StudentTable'],
    ['p', ' rows={filtered} />'],
  ],
  [
    ['p', '</'],
    ['tag', 'Panel'],
    ['p', '>'],
  ],
  [['p', ')']],
  [['p', '}']],
]

const TOKEN_COLOR: Record<string, string> = {
  kw: C.violet,
  fn: C.accentSoft,
  str: C.green,
  c: C.dim,
  tag: C.amber,
  p: C.chalk,
}

export function createCodeTexture(): THREE.CanvasTexture {
  const W = 1280
  const H = 800
  const { canvas, ctx } = makeCanvas(W, H)

  ctx.fillStyle = C.bg
  ctx.fillRect(0, 0, W, H)

  // window chrome
  ctx.fillStyle = '#0e0e12'
  ctx.fillRect(0, 0, W, 66)
  ctx.fillStyle = C.line
  ctx.fillRect(0, 66, W, 1)

  const dots = ['#2a2a33', '#2a2a33', '#2a2a33']
  dots.forEach((c, i) => {
    ctx.beginPath()
    ctx.fillStyle = c
    ctx.arc(34 + i * 26, 33, 6, 0, Math.PI * 2)
    ctx.fill()
  })

  // tab
  ctx.fillStyle = '#131319'
  roundRect(ctx, 118, 12, 320, 42, 6)
  ctx.fill()
  ctx.fillStyle = C.mute
  ctx.font = `400 20px ${MONO}`
  ctx.textBaseline = 'middle'
  ctx.fillText('mevo-school / dashboard.tsx', 140, 34)

  // file tree gutter
  ctx.fillStyle = '#0c0c10'
  ctx.fillRect(0, 67, 190, H - 67)
  ctx.fillStyle = C.line
  ctx.fillRect(190, 67, 1, H - 67)

  const tree = ['students', 'teachers', 'classes', 'results', 'reports', 'settings']
  tree.forEach((t, i) => {
    const y = 118 + i * 40
    if (i === 0) {
      ctx.fillStyle = '#15151c'
      roundRect(ctx, 12, y - 18, 166, 34, 5)
      ctx.fill()
    }
    ctx.fillStyle = i === 0 ? C.accentSoft : C.dim
    ctx.beginPath()
    ctx.arc(30, y, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = i === 0 ? C.chalk : C.dim
    ctx.font = `400 19px ${MONO}`
    ctx.fillText(t, 48, y + 1)
  })

  // code
  const startX = 234
  let y = 122
  const lh = 38

  CODE_LINES.forEach((line, i) => {
    ctx.fillStyle = '#2a2a33'
    ctx.font = `400 18px ${MONO}`
    ctx.textAlign = 'right'
    ctx.fillText(String(i + 1).padStart(2, '0'), 214, y)
    ctx.textAlign = 'left'

    let x = startX
    line.forEach(([kind, text]) => {
      ctx.fillStyle = TOKEN_COLOR[kind] ?? C.chalk
      ctx.font = `400 21px ${MONO}`
      ctx.fillText(text, x, y)
      x += ctx.measureText(text).width
    })

    // caret on the last written line
    if (i === CODE_LINES.length - 3) {
      ctx.fillStyle = C.accent
      ctx.fillRect(x + 4, y - 15, 11, 24)
    }
    y += lh
  })

  // scanline sheen
  const grad = ctx.createLinearGradient(0, 67, W, H)
  grad.addColorStop(0, 'rgba(255,255,255,0.035)')
  grad.addColorStop(0.45, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 67, W, H - 67)

  return toTexture(canvas)
}

/* ------------------------------------------------------------------ */
/* Floating UI cards                                                   */
/* ------------------------------------------------------------------ */

export type CardKind = 'stats' | 'chart' | 'list'

export function createCardTexture(kind: CardKind): THREE.CanvasTexture {
  const W = 768
  const H = 512
  const { canvas, ctx } = makeCanvas(W, H)

  ctx.clearRect(0, 0, W, H)

  // card body
  ctx.fillStyle = 'rgba(16,16,21,0.94)'
  roundRect(ctx, 4, 4, W - 8, H - 8, 22)
  ctx.fill()
  ctx.strokeStyle = C.line
  ctx.lineWidth = 2
  roundRect(ctx, 4, 4, W - 8, H - 8, 22)
  ctx.stroke()

  // header
  ctx.fillStyle = C.mute
  ctx.font = `400 19px ${MONO}`
  ctx.textBaseline = 'middle'
  ctx.fillText(
    kind === 'list' ? 'recent activity' : kind === 'chart' ? 'monthly spend' : 'overview',
    40,
    52,
  )

  ctx.beginPath()
  ctx.fillStyle = C.accent
  ctx.arc(W - 52, 52, 6, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = '#1c1c23'
  ctx.beginPath()
  ctx.moveTo(40, 82)
  ctx.lineTo(W - 40, 82)
  ctx.stroke()

  ctx.textBaseline = 'alphabetic'

  if (kind === 'stats') {
    ctx.fillStyle = C.mute
    ctx.font = `400 20px ${SANS}`
    ctx.fillText('Students', 40, 132)

    ctx.fillStyle = C.chalk
    ctx.font = `500 82px ${SANS}`
    ctx.fillText('1,248', 40, 216)

    ctx.fillStyle = C.green
    ctx.font = `400 20px ${SANS}`
    ctx.fillText('+ 64 this term', 40, 258)

    // mini sparkline
    ctx.strokeStyle = C.accent
    ctx.lineWidth = 3
    ctx.beginPath()
    const points = [0.35, 0.52, 0.42, 0.68, 0.58, 0.82, 0.74]
    points.forEach((p, i) => {
      const x = 40 + i * 44
      const yy = 470 - p * 130
      i === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy)
    })
    ctx.stroke()

    ctx.fillStyle = '#15151b'
    roundRect(ctx, 420, 150, 300, 190, 14)
    ctx.fill()
    ctx.fillStyle = C.dim
    ctx.font = `400 18px ${MONO}`
    ctx.fillText('sections', 444, 186)
    ctx.fillStyle = C.chalk
    ctx.font = `500 44px ${SANS}`
    ctx.fillText('A · B · C', 444, 250)
  }

  if (kind === 'chart') {
    const bars = [0.42, 0.66, 0.38, 0.82, 0.55, 0.72, 0.48]
    const bw = 62
    const gap = 26
    bars.forEach((b, i) => {
      const x = 52 + i * (bw + gap)
      const h = b * 250
      ctx.fillStyle = i === 3 ? C.accent : '#20202a'
      roundRect(ctx, x, 420 - h, bw, h, 8)
      ctx.fill()
      ctx.fillStyle = C.dim
      ctx.font = `400 16px ${MONO}`
      ctx.fillText(['M', 'T', 'W', 'T', 'F', 'S', 'S'][i], x + 20, 452)
    })
    ctx.fillStyle = C.chalk
    ctx.font = `500 40px ${SANS}`
    ctx.fillText('৳ 12,480', 40, 150)
    ctx.fillStyle = C.mute
    ctx.font = `400 19px ${SANS}`
    ctx.fillText('this month', 40, 186)
  }

  if (kind === 'list') {
    const rows = [
      ['Admission · Class 8', '09:24', C.accentSoft],
      ['Result published', '08:10', C.green],
      ['Teacher added', 'Yesterday', C.mute],
      ['Fee updated', 'Yesterday', C.mute],
    ]
    rows.forEach(([title, time, color], i) => {
      const y = 130 + i * 82
      ctx.beginPath()
      ctx.fillStyle = color as string
      ctx.arc(56, y + 12, 7, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#191920'
      roundRect(ctx, 84, y - 6, W - 200, 4, 2)
      ctx.fill()
      ctx.fillStyle = '#15151b'
      roundRect(ctx, 84, y + 22, W - 320, 4, 2)
      ctx.fill()

      ctx.fillStyle = C.dim
      ctx.font = `400 17px ${MONO}`
      ctx.fillText(time as string, W - 150, y + 16)

      ctx.fillStyle = C.chalk
      ctx.font = `400 20px ${SANS}`
      ctx.fillText(title as string, 84, y - 18)
    })
  }

  return toTexture(canvas)
}

/* ------------------------------------------------------------------ */
/* Floating code chips                                                 */
/* ------------------------------------------------------------------ */

export function createChipTexture(label: string): THREE.CanvasTexture {
  const W = 512
  const H = 128
  const { canvas, ctx } = makeCanvas(W, H)
  ctx.clearRect(0, 0, W, H)

  ctx.font = `400 46px ${MONO}`
  const w = ctx.measureText(label).width + 76

  ctx.fillStyle = 'rgba(14,14,18,0.86)'
  roundRect(ctx, (W - w) / 2, 30, w, 68, 12)
  ctx.fill()
  ctx.strokeStyle = '#26262f'
  ctx.lineWidth = 2
  roundRect(ctx, (W - w) / 2, 30, w, 68, 12)
  ctx.stroke()

  ctx.fillStyle = C.accentSoft
  ctx.textBaseline = 'middle'
  ctx.fillText(label, (W - w) / 2 + 38, 65)

  return toTexture(canvas)
}

/* ------------------------------------------------------------------ */
/* Light / glow + keyboard surface                                     */
/* ------------------------------------------------------------------ */

export function createGlowTexture(): THREE.CanvasTexture {
  const S = 512
  const { canvas, ctx } = makeCanvas(S, S)
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  g.addColorStop(0, 'rgba(255,255,255,0.85)')
  g.addColorStop(0.35, 'rgba(160,190,255,0.32)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)
  return toTexture(canvas)
}

export function createKeyboardTexture(): THREE.CanvasTexture {
  const W = 1024
  const H = 320
  const { canvas, ctx } = makeCanvas(W, H)
  ctx.fillStyle = '#101014'
  ctx.fillRect(0, 0, W, H)

  const cols = 32
  const rows = 5
  const kw = W / cols
  const kh = H / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * kw + 3
      const y = r * kh + 3
      ctx.fillStyle = '#16161c'
      roundRect(ctx, x, y, kw - 6, kh - 6, 4)
      ctx.fill()
      ctx.strokeStyle = '#1e1e26'
      ctx.lineWidth = 1
      roundRect(ctx, x, y, kw - 6, kh - 6, 4)
      ctx.stroke()
    }
  }

  // accent escape key
  ctx.fillStyle = 'rgba(76,141,255,0.28)'
  roundRect(ctx, 3, 3, kw - 6, kh - 6, 4)
  ctx.fill()

  return toTexture(canvas)
}

export function createNoiseTexture(): THREE.CanvasTexture {
  const S = 128
  const { canvas, ctx } = makeCanvas(S, S)
  const img = ctx.createImageData(S, S)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 120 + Math.random() * 135
    img.data[i] = v
    img.data[i + 1] = v
    img.data[i + 2] = v
    img.data[i + 3] = 12
  }
  ctx.putImageData(img, 0, 0)
  const tex = toTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(6, 6)
  return tex
}
