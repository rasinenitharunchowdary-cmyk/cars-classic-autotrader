import { RoundedBox } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { MathUtils, PerspectiveCamera, type Group } from 'three'
import './HeroScene.css'

type PointerPosition = {
  x: number
  y: number
}

export type HeroSceneProps = {
  className?: string
  carColor?: string
  accentColor?: string
  ariaLabel?: string
}

type WheelProps = {
  position: [number, number, number]
  side: -1 | 1
}

type SceneProps = {
  accentColor: string
  carColor: string
  pointer: MutableRefObject<PointerPosition>
  reducedMotion: boolean
}

const CHROME = '#dce3ea'
const RUBBER = '#090a0d'
const WINDOW = '#101b24'
const INTERIOR = '#1a1412'

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return reducedMotion
}

function useWebGLSupport() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const options: WebGLContextAttributes = {
      alpha: true,
      failIfMajorPerformanceCaveat: true,
      powerPreference: 'low-power',
    }

    try {
      const context =
        canvas.getContext('webgl2', options) ??
        canvas.getContext('webgl', options)

      setIsSupported(Boolean(context))
      context?.getExtension('WEBGL_lose_context')?.loseContext()
    } catch {
      setIsSupported(false)
    }
  }, [])

  return isSupported
}

function useElementVisibility(
  elementRef: MutableRefObject<HTMLDivElement | null>,
) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const element = elementRef.current
    if (!element || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '160px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [elementRef])

  return isVisible
}

function CameraSetup() {
  const { camera, invalidate, size } = useThree()

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1)
    const portrait = aspect < 1

    camera.position.set(
      portrait ? 9.5 : 8.1,
      portrait ? 4.6 : 3.9,
      portrait ? 13.5 : 9.2,
    )
    camera.lookAt(0, 0.55, 0)

    if (camera instanceof PerspectiveCamera) {
      camera.fov = portrait ? 36 : 31
      camera.updateProjectionMatrix()
    }

    invalidate()
  }, [camera, invalidate, size.height, size.width])

  return null
}

function Wheel({ position, side }: WheelProps) {
  const spokes = useMemo(() => Array.from({ length: 6 }, (_, index) => index), [])

  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.42, 28]} />
        <meshStandardMaterial color={RUBBER} metalness={0.15} roughness={0.72} />
      </mesh>

      <mesh position={[0, 0, side * 0.235]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.055, 24]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.18} />
      </mesh>

      {spokes.map((index) => (
        <mesh
          key={index}
          position={[0, 0, side * 0.27]}
          rotation={[0, 0, (index / spokes.length) * Math.PI]}
        >
          <boxGeometry args={[0.58, 0.052, 0.026]} />
          <meshStandardMaterial color="#818a93" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      <mesh position={[0, 0, side * 0.292]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.105, 0.105, 0.035, 20]} />
        <meshStandardMaterial color="#f4f6f8" metalness={1} roughness={0.12} />
      </mesh>
    </group>
  )
}

function ClassicCoupe({ carColor }: Pick<SceneProps, 'carColor'>) {
  return (
    <group>
      <RoundedBox
        args={[5.9, 0.5, 1.98]}
        position={[-0.05, 0.22, 0]}
        radius={0.18}
        smoothness={3}
      >
        <meshStandardMaterial
          color={carColor}
          metalness={0.68}
          roughness={0.25}
        />
      </RoundedBox>

      <RoundedBox
        args={[6.2, 0.72, 2.06]}
        position={[0, 0.62, 0]}
        radius={0.3}
        smoothness={3}
      >
        <meshStandardMaterial
          color={carColor}
          metalness={0.72}
          roughness={0.23}
        />
      </RoundedBox>

      <RoundedBox
        args={[2.48, 0.36, 2]}
        position={[1.84, 1.02, 0]}
        radius={0.2}
        smoothness={3}
      >
        <meshStandardMaterial
          color={carColor}
          metalness={0.7}
          roughness={0.22}
        />
      </RoundedBox>

      <RoundedBox
        args={[1.42, 0.34, 1.98]}
        position={[-2.25, 0.98, 0]}
        radius={0.18}
        smoothness={3}
      >
        <meshStandardMaterial
          color={carColor}
          metalness={0.7}
          roughness={0.24}
        />
      </RoundedBox>

      <RoundedBox
        args={[2.86, 0.82, 1.83]}
        position={[-0.38, 1.42, 0]}
        radius={0.27}
        smoothness={3}
      >
        <meshPhysicalMaterial
          color={WINDOW}
          metalness={0.35}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </RoundedBox>

      <RoundedBox
        args={[2.42, 0.2, 1.82]}
        position={[-0.46, 1.87, 0]}
        radius={0.1}
        smoothness={3}
      >
        <meshStandardMaterial
          color={carColor}
          metalness={0.7}
          roughness={0.22}
        />
      </RoundedBox>

      <mesh position={[-0.36, 1.44, 0]}>
        <boxGeometry args={[0.12, 0.78, 1.91]} />
        <meshStandardMaterial color={carColor} metalness={0.7} roughness={0.22} />
      </mesh>

      <mesh position={[1.02, 1.4, 0]} rotation={[0, 0, -0.22]}>
        <boxGeometry args={[0.12, 0.8, 1.9]} />
        <meshStandardMaterial color={carColor} metalness={0.7} roughness={0.22} />
      </mesh>

      <mesh position={[-1.72, 1.4, 0]} rotation={[0, 0, 0.23]}>
        <boxGeometry args={[0.12, 0.8, 1.9]} />
        <meshStandardMaterial color={carColor} metalness={0.7} roughness={0.22} />
      </mesh>

      <mesh position={[-0.6, 1.05, 0]}>
        <boxGeometry args={[1.4, 0.16, 1.55]} />
        <meshStandardMaterial color={INTERIOR} metalness={0.08} roughness={0.7} />
      </mesh>

      {([-1, 1] as const).map((side) => (
        <group key={side}>
          <mesh position={[0, 0.67, side * 1.055]}>
            <boxGeometry args={[5.15, 0.045, 0.045]} />
            <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.16} />
          </mesh>

          <mesh position={[-0.37, 1.46, side * 0.935]}>
            <boxGeometry args={[0.065, 0.66, 0.035]} />
            <meshStandardMaterial color={carColor} metalness={0.7} roughness={0.22} />
          </mesh>

          <mesh position={[-0.05, 0.93, side * 1.045]}>
            <boxGeometry args={[0.025, 0.64, 0.025]} />
            <meshStandardMaterial color="#722616" metalness={0.25} roughness={0.45} />
          </mesh>

          <RoundedBox
            args={[0.34, 0.09, 0.08]}
            position={[-0.56, 1.03, side * 1.085]}
            radius={0.03}
            smoothness={2}
          >
            <meshStandardMaterial color={CHROME} metalness={1} roughness={0.14} />
          </RoundedBox>

          <RoundedBox
            args={[0.34, 0.16, 0.26]}
            position={[0.82, 1.43, side * 1.05]}
            radius={0.06}
            smoothness={2}
          >
            <meshStandardMaterial color={carColor} metalness={0.74} roughness={0.22} />
          </RoundedBox>

          <Wheel position={[-2.03, 0.17, side * 1.04]} side={side} />
          <Wheel position={[2.02, 0.17, side * 1.04]} side={side} />
        </group>
      ))}

      <RoundedBox
        args={[0.13, 0.34, 1.42]}
        position={[3.1, 0.7, 0]}
        radius={0.045}
        smoothness={2}
      >
        <meshStandardMaterial color="#202329" metalness={0.85} roughness={0.25} />
      </RoundedBox>

      {[-0.68, 0.68].map((zPosition) => (
        <group key={zPosition} position={[3.17, 0.79, zPosition]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />
            <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.12} />
          </mesh>
          <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.03, 24]} />
            <meshStandardMaterial
              color="#fff3c4"
              emissive="#ffd36b"
              emissiveIntensity={0.8}
              roughness={0.14}
            />
          </mesh>
        </group>
      ))}

      <mesh position={[3.15, 0.34, 0]}>
        <boxGeometry args={[0.14, 0.13, 2.24]} />
        <meshStandardMaterial color={CHROME} metalness={0.96} roughness={0.14} />
      </mesh>

      <mesh position={[-3.12, 0.32, 0]}>
        <boxGeometry args={[0.12, 0.13, 2.18]} />
        <meshStandardMaterial color={CHROME} metalness={0.96} roughness={0.14} />
      </mesh>

      {[-0.7, 0.7].map((zPosition) => (
        <RoundedBox
          key={zPosition}
          args={[0.08, 0.2, 0.38]}
          position={[-3.11, 0.75, zPosition]}
          radius={0.035}
          smoothness={2}
        >
          <meshStandardMaterial
            color="#b81618"
            emissive="#ff261e"
            emissiveIntensity={0.45}
            roughness={0.22}
          />
        </RoundedBox>
      ))}

      {[-0.58, 0.58].map((zPosition) => (
        <mesh
          key={zPosition}
          position={[-3.14, 0.06, zPosition]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.07, 0.07, 0.34, 14]} />
          <meshStandardMaterial color="#616870" metalness={0.94} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function GridFloor({ accentColor }: Pick<SceneProps, 'accentColor'>) {
  const positions = useMemo(() => {
    const lines: number[] = []
    const extent = 10
    const step = 1

    for (let value = -extent; value <= extent; value += step) {
      lines.push(-extent, -0.72, value, extent, -0.72, value)
      lines.push(value, -0.72, -extent, value, -0.72, extent)
    }

    return new Float32Array(lines)
  }, [])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color={accentColor}
        transparent
        opacity={0.11}
        depthWrite={false}
      />
    </lineSegments>
  )
}

function Scene({ accentColor, carColor, pointer, reducedMotion }: SceneProps) {
  const rig = useRef<Group>(null)
  const orbit = useRef<Group>(null)

  const particles = useMemo(
    () =>
      new Float32Array([
        -4.8, 2.7, -2.8, -3.3, 3.6, -3.4, -1.9, 2.9, -3.9, -0.2, 4.1, -3.1,
        1.7, 3.4, -3.8, 3.4, 2.8, -3.4, 4.6, 1.8, -2.7, -4.2, 0.8, -2.4,
        4.9, 0.6, -2.1, -2.8, 4.6, -4.2, 2.7, 4.5, -4.1, 5.2, 3.4, -3.5,
      ]),
    [],
  )

  useFrame((state, delta) => {
    if (reducedMotion) return

    const elapsed = state.clock.getElapsedTime()

    if (rig.current) {
      rig.current.rotation.y = MathUtils.damp(
        rig.current.rotation.y,
        -0.13 + pointer.current.x * 0.1,
        4,
        delta,
      )
      rig.current.rotation.x = MathUtils.damp(
        rig.current.rotation.x,
        pointer.current.y * 0.035,
        4,
        delta,
      )
      rig.current.position.y = Math.sin(elapsed * 0.65) * 0.025
    }

    if (orbit.current) {
      orbit.current.rotation.z += delta * 0.025
      orbit.current.rotation.y = Math.sin(elapsed * 0.16) * 0.08
    }
  })

  return (
    <>
      <CameraSetup />

      <ambientLight intensity={0.85} />
      <hemisphereLight args={['#d9e8ff', '#1a1020', 1.55]} />
      <directionalLight color="#fff7e8" intensity={3.2} position={[5, 7, 6]} />
      <pointLight color={accentColor} intensity={14} position={[-4, 1.5, 2.5]} />
      <pointLight color="#ffb36b" intensity={8} position={[4.2, 0.5, -2]} />

      <group ref={orbit} position={[0, 0.9, -2.8]}>
        <mesh>
          <torusGeometry args={[3.65, 0.025, 6, 96]} />
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={0.38}
            depthWrite={false}
          />
        </mesh>
        <mesh rotation={[0.35, 0.35, 0.62]}>
          <torusGeometry args={[4.15, 0.015, 6, 96]} />
          <meshBasicMaterial
            color="#f4bfff"
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#f8efff"
            size={0.065}
            transparent
            opacity={0.62}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
      </group>

      <GridFloor accentColor={accentColor} />

      <mesh
        position={[0, -0.695, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[3.7, 1.45, 1]}
      >
        <circleGeometry args={[1, 48]} />
        <meshBasicMaterial
          color="#07070b"
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, -0.69, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.45, 0.022, 6, 96]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.42}
          depthWrite={false}
        />
      </mesh>

      <group ref={rig} rotation={[0, -0.13, 0]}>
        <ClassicCoupe carColor={carColor} />
      </group>
    </>
  )
}

export function HeroScene({
  className = '',
  carColor = '#db4b2e',
  accentColor = '#8b5cf6',
  ariaLabel = 'Interactive three-dimensional classic grand-touring coupe',
}: HeroSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const pointer = useRef<PointerPosition>({ x: 0, y: 0 })
  const [canvasReady, setCanvasReady] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const webGLSupport = useWebGLSupport()
  const isVisible = useElementVisibility(rootRef)

  const updatePointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()
    pointer.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
    pointer.current.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
  }

  const resetPointer = () => {
    pointer.current.x = 0
    pointer.current.y = 0
  }

  const renderState =
    webGLSupport === false
      ? 'fallback'
      : canvasReady
        ? 'ready'
        : 'loading'

  return (
    <div
      ref={rootRef}
      className={`hero-scene ${className}`.trim()}
      data-render-state={renderState}
      style={
        {
          '--hero-scene-accent': accentColor,
          '--hero-scene-car': carColor,
        } as CSSProperties
      }
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
      role="img"
      aria-label={ariaLabel}
    >
      <div className="hero-scene__fallback" aria-hidden="true">
        <div className="hero-scene__fallback-orbit" />
        <div className="hero-scene__fallback-car">
          <span className="hero-scene__fallback-cabin" />
          <span className="hero-scene__fallback-body" />
          <span className="hero-scene__fallback-wheel hero-scene__fallback-wheel--rear" />
          <span className="hero-scene__fallback-wheel hero-scene__fallback-wheel--front" />
        </div>
      </div>

      {webGLSupport && (
        <Canvas
          className="hero-scene__canvas"
          aria-hidden="true"
          dpr={[1, 1.5]}
          frameloop={reducedMotion || !isVisible ? 'demand' : 'always'}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          camera={{ fov: 31, near: 0.1, far: 80 }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
            setCanvasReady(true)
          }}
        >
          <Scene
            accentColor={accentColor}
            carColor={carColor}
            pointer={pointer}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      )}
    </div>
  )
}

export default HeroScene
