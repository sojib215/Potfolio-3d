import { useMemo, useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { createCodeTexture, createGlowTexture, createKeyboardTexture } from './textures'
import { pointer } from '@/lib/pointer'
import { damp } from '@/lib/utils'

/**
 * The signature object: a minimal floating developer workspace.
 * Monitor + code window + desk + keyboard, lit like a studio still-life.
 */
export function Workspace({ quality }: { quality: 'high' | 'low' }) {
  const group = useRef<THREE.Group>(null)
  const screenGlow = useRef<THREE.Mesh>(null)

  const codeTexture = useMemo(() => createCodeTexture(), [])
  const glowTexture = useMemo(() => createGlowTexture(), [])
  const keyboardTexture = useMemo(() => createKeyboardTexture(), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      // very slow idle breathing so it never looks frozen
      group.current.position.y = Math.sin(t * 0.42) * 0.022
      group.current.rotation.z = Math.sin(t * 0.31) * 0.006
    }
    if (screenGlow.current) {
      const mat = screenGlow.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.42 + Math.sin(t * 0.9) * 0.045
    }
    void delta
  })

  return (
    <group ref={group} position={[0, 0.12, 0]}>
      {/* ---- monitor ---- */}
      <group position={[0, 0.14, 0]}>
        <RoundedBox
          args={[2.66, 1.76, 0.075]}
          radius={0.028}
          smoothness={quality === 'high' ? 5 : 2}
        >
          <meshStandardMaterial color="#15151b" metalness={0.86} roughness={0.3} />
        </RoundedBox>

        {/* screen */}
        <mesh position={[0, 0, 0.041]}>
          <planeGeometry args={[2.5, 1.6]} />
          <meshBasicMaterial map={codeTexture} toneMapped={false} />
        </mesh>

        {/* soft light spill behind the panel */}
        <mesh ref={screenGlow} position={[0, 0, -0.14]}>
          <planeGeometry args={[5, 3.4]} />
          <meshBasicMaterial
            map={glowTexture}
            color="#4c8dff"
            transparent
            opacity={0.44}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* ---- stand ---- */}
      <mesh position={[0, -0.92, 0]}>
        <boxGeometry args={[0.14, 0.48, 0.1]} />
        <meshStandardMaterial color="#1b1b22" metalness={0.7} roughness={0.42} />
      </mesh>
      <RoundedBox
        args={[1.05, 0.045, 0.52]}
        radius={0.018}
        smoothness={3}
        position={[0, -1.175, 0]}
      >
        <meshStandardMaterial color="#1a1a20" metalness={0.75} roughness={0.34} />
      </RoundedBox>

      {/* ---- keyboard ---- */}
      <mesh position={[0, -1.15, 0.72]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[1.72, 0.045, 0.54]} />
        <meshStandardMaterial
          map={keyboardTexture}
          color="#ffffff"
          metalness={0.45}
          roughness={0.55}
        />
      </mesh>

      {/* ---- desk ---- */}
      <RoundedBox
        args={[4.5, 0.07, 1.7]}
        radius={0.012}
        smoothness={3}
        position={[0, -1.235, 0.35]}
      >
        <meshStandardMaterial color="#0f0f13" metalness={0.55} roughness={0.45} />
      </RoundedBox>
    </group>
  )
}

/** Subtle floor: reflective on desktop, matte on smaller devices. */
export function Floor({ quality }: { quality: 'high' | 'low' }) {
  if (quality === 'low') {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.28, 0]}>
        <planeGeometry args={[34, 34]} />
        <meshStandardMaterial color="#08080a" roughness={0.95} metalness={0.1} />
      </mesh>
    )
  }

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.28, 0]}>
      <planeGeometry args={[34, 34]} />
      <MeshReflectorMaterial
        resolution={512}
        mixBlur={1.1}
        mixStrength={16}
        blur={[220, 70]}
        depthScale={1.1}
        minDepthThreshold={0.35}
        maxDepthThreshold={1.35}
        roughness={0.92}
        metalness={0.5}
        mirror={0.55}
        color="#0a0a0d"
      />
    </mesh>
  )
}

/** Eases the whole composition toward the pointer. */
export function Rig({ children, strength = 1 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    const g = ref.current
    if (!g) return
    pointer.x = damp(pointer.x, pointer.tx, 2.4, delta)
    pointer.y = damp(pointer.y, pointer.ty, 2.4, delta)
    g.rotation.y = pointer.x * 0.15 * strength
    g.rotation.x = -pointer.y * 0.09 * strength
    g.position.x = pointer.x * 0.14 * strength
  })

  return <group ref={ref}>{children}</group>
}
