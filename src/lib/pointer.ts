/**
 * Global pointer position, normalised to -1..1 (y inverted for 3D).
 * Kept outside of React so the R3F render loop can read it without
 * triggering re-renders.
 */
export const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false }

let started = false

export function startPointerTracking(): () => void {
  if (started) return () => {}
  started = true

  const onMove = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1
    pointer.active = true
  }

  const onLeave = () => {
    pointer.tx = 0
    pointer.ty = 0
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerleave', onLeave, { passive: true })

  return () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerleave', onLeave)
    started = false
  }
}
