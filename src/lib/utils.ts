export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** frame-rate independent dampening */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt))

/** Detects WebGL support so the 3D scene can degrade gracefully. */
export function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    )
  } catch {
    return false
  }
}

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))
