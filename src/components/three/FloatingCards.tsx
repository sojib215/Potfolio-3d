import { useMemo, useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createCardTexture, createChipTexture, type CardKind } from './textures'
import { pointer } from '@/lib/pointer'
import { damp } from '@/lib/utils'

interface CardConfig {
  kind: CardKind
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
  factor: number
  delay: number
}

const CARD_LAYOUT: CardConfig[] = [
  {
    kind: 'stats',
    position: [-2.02, 0.6, 0.95],
    rotation: [0.05, 0.5, -0.03],
    size: [1.3, 0.87],
    factor: 0.3,
    delay: 0,
  },
  {
    kind: 'chart',
    position: [2.08, 0.14, 0.85],
    rotation: [0.04, -0.46, 0.03],
    size: [1.22, 0.81],
    factor: 0.22,
    delay: 1.7,
  },
  {
    kind: 'list',
    position: [1.55, 1.28, -0.5],
    rotation: [0.02, -0.22, -0.02],
    size: [1.04, 0.69],
    factor: 0.14,
    delay: 3.1,
  },
]

function Card({ config, quality }: { config: CardConfig; quality: 'high' | 'low' }) {
  const ref = useRef<THREE.Group>(null)
  const texture = useMemo(() => createCardTexture(config.kind), [config.kind])
  const [bx, by, bz] = config.position
  const [rx, ry, rz] = config.rotation

  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime
    const targetY = by + Math.sin(t * 0.5 + config.delay) * 0.05
    const targetX = bx + pointer.x * config.factor * 0.6
    g.position.y = damp(g.position.y, targetY, 3, dt)
    g.position.x = damp(g.position.x, targetX, 2.6, dt)
    g.position.z = bz
    g.rotation.y = ry + pointer.x * 0.07 * config.factor * 2
    g.rotation.x = rx + Math.sin(t * 0.4 + config.delay) * 0.018
    g.rotation.z = rz
  })

  return (
    <group ref={ref} position={config.position} rotation={config.rotation}>
      <mesh>
        <planeGeometry args={config.size} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={quality === 'high' ? 0.95 : 0.9}
          toneMapped={false}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

/** The floating panel layer around the workspace. */
export function FloatingCards({ quality }: { quality: 'high' | 'low' }) {
  const cards = quality === 'high' ? CARD_LAYOUT : CARD_LAYOUT.slice(0, 2)
  return (
    <>
      {cards.map((c) => (
        <Card key={c.kind} config={c} quality={quality} />
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */

const CHIPS: Array<{
  label: string
  position: [number, number, number]
  factor: number
  delay: number
}> = [
  { label: '</>', position: [-2.35, 1.32, 1.25], factor: 0.4, delay: 0.4 },
  { label: '{ }', position: [2.42, 1.12, 0.95], factor: 0.32, delay: 2.2 },
  { label: 'useState', position: [-1.75, -0.62, 1.55], factor: 0.5, delay: 3.6 },
  { label: 'firestore', position: [1.95, -0.72, 1.35], factor: 0.44, delay: 5.1 },
]

function Chip({
  label,
  position,
  factor,
  delay,
}: {
  label: string
  position: [number, number, number]
  factor: number
  delay: number
}) {
  const ref = useRef<THREE.Group>(null)
  const texture = useMemo(() => createChipTexture(label), [label])

  useFrame((state) => {
    const g = ref.current
    if (!g) return
    const t = state.clock.elapsedTime
    g.position.y = position[1] + Math.sin(t * 0.62 + delay) * 0.06
    g.position.x = position[0] + pointer.x * factor * 0.7
    g.rotation.y = Math.sin(t * 0.3 + delay) * 0.08
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <planeGeometry args={[0.56, 0.14]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.55}
          toneMapped={false}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export function CodeChips() {
  return (
    <>
      {CHIPS.map((c) => (
        <Chip key={c.label} {...c} />
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */

/** Thin orbital rings — depth without clutter. */
export function OrbitRings({ quality }: { quality: 'high' | 'low' }) {
  const a = useRef<THREE.Mesh>(null)
  const b = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (a.current) a.current.rotation.z = t * 0.018
    if (b.current) b.current.rotation.z = -t * 0.012
  })

  return (
    <group>
      <mesh ref={a} rotation={[1.32, 0.16, 0]} position={[0, 0.1, -0.6]}>
        <torusGeometry args={[3.05, 0.0075, 6, quality === 'high' ? 180 : 80]} />
        <meshBasicMaterial color="#3d4a63" transparent opacity={0.55} toneMapped={false} />
      </mesh>
      {quality === 'high' ? (
        <mesh ref={b} rotation={[1.5, -0.3, 0.4]} position={[0, 0.2, -1.2]}>
          <torusGeometry args={[4.1, 0.006, 6, 160]} />
          <meshBasicMaterial color="#2c3448" transparent opacity={0.35} toneMapped={false} />
        </mesh>
      ) : null}
    </group>
  )
}

/** Wrapper that keeps children inside a slowly drifting group. */
export function Drift({ children, amount = 0.02 }: { children: ReactNode; amount?: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    const g = ref.current
    if (!g) return
    const t = state.clock.elapsedTime
    g.rotation.y = Math.sin(t * 0.18) * amount
  })
  return <group ref={ref}>{children}</group>
}
