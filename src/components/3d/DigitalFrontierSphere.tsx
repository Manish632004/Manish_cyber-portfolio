import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DigitalFrontierSphereProps {
  pointer: { x: number; y: number };
  scrollProgress: number;
}

export function DigitalFrontierSphere({ pointer, scrollProgress }: DigitalFrontierSphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const dataPulsesRef = useRef<THREE.LineSegments>(null);

  // Generate nodes on Fibonacci sphere
  const { nodePositions, linePositions, pointColors } = useMemo(() => {
    const count = 180;
    const radius = 2.4;
    const positions: number[] = [];
    const colors: number[] = [];
    const pts: THREE.Vector3[] = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const pos = new THREE.Vector3(x * radius, y * radius, z * radius);
      pts.push(pos);
      positions.push(pos.x, pos.y, pos.z);

      // Color variation between cyan and electric green
      const isGreen = i % 4 === 0;
      if (isGreen) {
        colors.push(0.0, 1.0, 0.53); // Electric green #00ff88
      } else if (i % 3 === 0) {
        colors.push(0.02, 0.71, 0.83); // Cyan #06b6d4
      } else {
        colors.push(0.22, 0.74, 0.97); // Icy blue #38bdf8
      }
    }

    // Connect close nodes with lines
    const lineIndices: number[] = [];
    const maxDist = 0.95;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pts[i].distanceTo(pts[j]) < maxDist) {
          lineIndices.push(pts[i].x, pts[i].y, pts[i].z);
          lineIndices.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    return {
      nodePositions: new Float32Array(positions),
      linePositions: new Float32Array(lineIndices),
      pointColors: new Float32Array(colors)
    };
  }, []);

  // Ambient drifting cyber particles
  const ambientParticles = useMemo(() => {
    const count = 220;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 8;
      pos[i + 1] = (Math.random() - 0.5) * 8;
      pos[i + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Slow cinematic rotation
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x += delta * 0.04;

    // Mouse parallax reaction
    const targetX = pointer.x * 0.45;
    const targetY = pointer.y * 0.45;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 1.3 + targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -targetY, 0.05);

    // Pulse core
    if (coreRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.04;
      coreRef.current.scale.set(scale, scale, scale);
    }

    // Drift ambient particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.02;
    }
  });

  // Calculate opacity based on scroll (active in hero, fades as scrolling down)
  const sphereOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  if (sphereOpacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[1.3, 0, 0]}>
      {/* Central cyber wireframe geodesic core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.12 * sphereOpacity}
        />
      </mesh>

      {/* Internal dark volumetric shield */}
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial
          color="#020817"
          transparent
          opacity={0.85 * sphereOpacity}
        />
      </mesh>

      {/* Interconnecting cyber lines */}
      <lineSegments ref={dataPulsesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.35 * sphereOpacity}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Network Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[pointColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.9 * sphereOpacity}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient drifting particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ambientParticles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#38bdf8"
          transparent
          opacity={0.45 * sphereOpacity}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
