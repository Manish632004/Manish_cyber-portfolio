import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NetworkInfrastructureProps {
  pointer: { x: number; y: number };
  scrollProgress: number;
}

export function NetworkInfrastructure({ pointer, scrollProgress }: NetworkInfrastructureProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scanBeamRef = useRef<THREE.Mesh>(null);
  const dataStreamRef = useRef<THREE.Points>(null);

  // Generate 3D grid of abstract server nodes & pathways
  const { nodePositions, linePositions, serverCubes } = useMemo(() => {
    const nodes: number[] = [];
    const lines: number[] = [];
    const cubes: { pos: [number, number, number]; scale: [number, number, number] }[] = [];

    // Server rack clusters
    const clusterPositions: [number, number, number][] = [
      [-3, -1, -2],
      [-1.5, 1.2, -3],
      [1.5, -0.8, -2],
      [3.2, 1.0, -2.5],
      [0, -2.2, -1.5],
      [-2.8, 2.0, -4],
      [2.8, -1.8, -3.5]
    ];

    clusterPositions.forEach((pos, idx) => {
      cubes.push({
        pos,
        scale: [0.6, 1.2 + (idx % 3) * 0.4, 0.6]
      });
      nodes.push(pos[0], pos[1] + 0.8, pos[2]);
    });

    // Connecting highway data lines between clusters
    for (let i = 0; i < clusterPositions.length; i++) {
      for (let j = i + 1; j < clusterPositions.length; j++) {
        const p1 = clusterPositions[i];
        const p2 = clusterPositions[j];
        const dist = Math.hypot(p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]);
        if (dist < 5.0) {
          lines.push(p1[0], p1[1] + 0.5, p1[2]);
          // Add a mid-way orthogonal cyber routing point
          const midX = (p1[0] + p2[0]) / 2;
          const midY = p1[1] + 0.5;
          const midZ = (p1[2] + p2[2]) / 2;
          lines.push(midX, midY, midZ);
          lines.push(midX, midY, midZ);
          lines.push(p2[0], p2[1] + 0.5, p2[2]);
        }
      }
    }

    return {
      nodePositions: new Float32Array(nodes),
      linePositions: new Float32Array(lines),
      serverCubes: cubes
    };
  }, []);

  // Moving data stream packets
  const { streamPositions, streamSpeed } = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const speed: number[] = [];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = -Math.random() * 6;
      speed.push(0.02 + Math.random() * 0.04);
    }
    return { streamPositions: pos, streamSpeed: speed };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Pointer response
    const targetX = pointer.x * 0.3;
    const targetY = pointer.y * 0.2;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);

    // Vertical scanning radar laser beam
    if (scanBeamRef.current) {
      scanBeamRef.current.position.y = Math.sin(Date.now() * 0.0015) * 2.5;
    }

    // Animate streaming data packets along Z-axis
    if (dataStreamRef.current) {
      const positions = dataStreamRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < streamSpeed.length; i++) {
        positions[i * 3 + 2] += streamSpeed[i];
        if (positions[i * 3 + 2] > 2) {
          positions[i * 3 + 2] = -6;
        }
      }
      dataStreamRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Calculate active visibility based on scroll
  // Scene 2 is focused around 0.08 -> 0.24
  const sceneOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.04) * 8) * Math.min(1, (0.3 - scrollProgress) * 7));

  if (sceneOpacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {/* Abstract server blocks */}
      {serverCubes.map((cube, i) => (
        <group key={i} position={cube.pos}>
          {/* Main frame */}
          <mesh>
            <boxGeometry args={cube.scale} />
            <meshBasicMaterial
              color="#091428"
              transparent
              opacity={0.85 * sceneOpacity}
            />
          </mesh>
          {/* Neon edges */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(...cube.scale)]} />
            <lineBasicMaterial
              color={i % 2 === 0 ? "#06b6d4" : "#10b981"}
              transparent
              opacity={0.45 * sceneOpacity}
            />
          </lineSegments>
        </group>
      ))}

      {/* Inter-server highway pathways */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.3 * sceneOpacity}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Cluster Node Beacon Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#00ff88"
          transparent
          opacity={0.9 * sceneOpacity}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Animated Traveling Data Streams */}
      <points ref={dataStreamRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[streamPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#67e8f9"
          transparent
          opacity={0.75 * sceneOpacity}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Horizontal Scanning Laser Plane */}
      <mesh ref={scanBeamRef} position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.06 * sceneOpacity}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
