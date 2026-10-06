import { Suspense, useEffect, useState } from 'react'

import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import { Floor, Rig, Workspace } from './Workspace'
import { CodeChips, FloatingCards, OrbitRings } from './FloatingCards'
import { clamp } from '@/lib/utils'
import type * as THREE from 'three'

type Quality = 'high' | 'low'

/** The composition is authored ~5.6 × 4.0 world units wide. */
const CONTENT = {
  high: { width: 5.1, height: 4.0 },
  low: { width: 3.4, height: 4.0 },
}

/**
 * Scales the whole composition so it always fits the viewport —
 * portrait phones see the workspace itself, wide screens see the
 * full diorama with its floating panels.
 */
function Framing({ quality, children }: { quality: Quality; children: React.ReactNode }) {
  const size = useThree((state) => state.size)
  const camera = useThree((state) => state.camera)

  const height =
    2 * camera.position.z * Math.tan(((camera as THREE.PerspectiveCamera).fov * Math.PI) / 360)
  const width = height * (size.width / Math.max(1, size.height))
  const target = CONTENT[quality]

  const scale = clamp(Math.min(width / target.width, height / target.height), 0.3, 1.25)

  return <group scale={scale}>{children}</group>
}

/** Aims the camera like a still-life photograph: a slight downward tilt. */
function CameraAim() {
  const camera = useThree((state) => state.camera)
  useEffect(() => {
    camera.lookAt(0, -0.02, 0)
  }, [camera])
  return null
}

function SceneContents({ quality }: { quality: Quality }) {
  return (
    <>
      <CameraAim />
      <fog attach="fog" args={['#08080a', 6.5, 17]} />

      <ambientLight intensity={0.32} />
      <directionalLight position={[3.6, 5.2, 3]} intensity={1.15} color="#e6ecff" />
      <directionalLight position={[-4.5, 1.6, 1.5]} intensity={0.55} color="#4c8dff" />
      <pointLight
        position={[0, -0.6, 2.4]}
        intensity={2.2}
        distance={6}
        decay={2}
        color="#7fb0ff"
      />

      {/* Studio reflections, built locally — no HDR download. */}
      <Environment resolution={quality === 'high' ? 192 : 64} frames={1}>
        <color attach="background" args={['#050507']} />
        <Lightformer intensity={2.4} color="#ffffff" position={[0, 4.5, 3]} scale={[11, 4, 1]} />
        <Lightformer intensity={2.6} color="#4c8dff" position={[-5.5, 1, 2]} scale={[3, 7, 1]} />
        <Lightformer intensity={1.3} color="#b9cdf5" position={[5.5, 2, -1]} scale={[1, 9, 1]} />
        <Lightformer intensity={0.9} color="#2b3a55" position={[0, 1.5, -6]} scale={[13, 6, 1]} />
      </Environment>

      <Framing quality={quality}>
        <Rig>
          <Workspace quality={quality} />
          <FloatingCards quality={quality} />
          <OrbitRings quality={quality} />
          {quality === 'high' ? <CodeChips /> : null}
        </Rig>

        <Floor quality={quality} />

        <ContactShadows
          position={[0, -1.265, 0.2]}
          scale={11}
          resolution={quality === 'high' ? 512 : 256}
          blur={2.6}
          opacity={0.62}
          far={2.6}
          color="#000000"
        />
      </Framing>
    </>
  )
}

interface HeroSceneProps {
  quality?: Quality
  /** Pauses the render loop when the hero is scrolled out of view. */
  active?: boolean
  className?: string
}

/**
 * Signature 3D hero: a floating developer workspace.
 * Quality + loop activity are controlled from the Hero section so mobile
 * and off-screen states cost nothing.
 */
export default function HeroScene({ quality = 'high', active = true, className }: HeroSceneProps) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      if (e.message?.toLowerCase().includes('webgl')) setFailed(true)
    }
    window.addEventListener('error', onError)
    return () => window.removeEventListener('error', onError)
  }, [])

  if (failed) return null

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={quality === 'high' ? [1, 1.8] : [1, 1.3]}
        camera={{ position: [0, 0.72, 5.9], fov: 33, near: 0.1, far: 60 }}
        gl={{
          antialias: quality === 'high',
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        frameloop={active ? 'always' : 'never'}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <SceneContents quality={quality} />
        </Suspense>
      </Canvas>
    </div>
  )
}
