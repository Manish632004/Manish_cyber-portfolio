import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberBackgroundProps {
  scrollProgress: number;
}

export function CyberBackground({ scrollProgress }: CyberBackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  // Background cyber dust particles
  const particles = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

      // Deep cyan / electric green / subtle violet
      const pick = Math.random();
      if (pick < 0.45) {
        colors[i * 3] = 0.02; // R
        colors[i * 3 + 1] = 0.71; // G
        colors[i * 3 + 2] = 0.83; // B
      } else if (pick < 0.8) {
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 0.53;
      } else {
        colors[i * 3] = 0.55;
        colors[i * 3 + 1] = 0.36;
        colors[i * 3 + 2] = 0.96;
      }
    }
    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.05;
    }
    if (gridRef.current) {
      gridRef.current.position.z = ((scrollProgress * 10) % 2) - 1;
    }
  });

  return (
    <group>
      {/* Ambient Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#67e8f9" />
      <pointLight position={[-4, -3, 2]} intensity={0.8} color="#00ff88" />
      <pointLight position={[3, 4, -4]} intensity={0.9} color="#8b5cf6" />

      {/* Cyber Dust Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particles.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          vertexColors
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Subtle floor perspective grid */}
      <gridHelper
        ref={gridRef}
        args={[30, 30, '#06b6d4', '#0f172a']}
        position={[0, -3.2, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}
