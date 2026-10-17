import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AttackPathStructureProps {
  pointer: { x: number; y: number };
  scrollProgress: number;
  activeStageIndex: number;
}

export function AttackPathStructure({ pointer, scrollProgress, activeStageIndex }: AttackPathStructureProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // 5 3D node positions representing the attack chain
  const stageCoords: [number, number, number][] = [
    [-3.2, 1.4, -0.5],  // Recon
    [-1.6, 0.4, 0],     // Enum
    [0, 1.2, 0.5],      // Initial Access
    [1.6, -0.2, 0],     // Priv Esc
    [3.2, 0.8, -0.5]    // Remediation
  ];

  useFrame(() => {
    if (!groupRef.current) return;

    // Subtle drift
    groupRef.current.position.y = Math.cos(Date.now() * 0.001) * 0.08;
    const targetX = pointer.x * 0.2;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.04);

    // Pulse traveling along the attack path
    if (pulseRef.current) {
      const t = (Date.now() * 0.0012) % 1;
      const totalStages = stageCoords.length - 1;
      const segmentIndex = Math.floor(t * totalStages);
      const segmentT = (t * totalStages) % 1;

      const p1 = stageCoords[segmentIndex];
      const p2 = stageCoords[Math.min(segmentIndex + 1, totalStages)];

      pulseRef.current.position.x = p1[0] + (p2[0] - p1[0]) * segmentT;
      pulseRef.current.position.y = p1[1] + (p2[1] - p1[1]) * segmentT;
      pulseRef.current.position.z = p1[2] + (p2[2] - p1[2]) * segmentT;
    }
  });

  // Active range roughly 0.38 -> 0.54
  const sceneOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.34) * 8) * Math.min(1, (0.58 - scrollProgress) * 7));

  if (sceneOpacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, 0, -0.5]}>
      {/* Central Vulnerable Target Structure (Wireframe Server Prism) */}
      <mesh position={[0, -0.2, -1.8]}>
        <octahedronGeometry args={[2.0, 1]} />
        <meshBasicMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.15 * sceneOpacity}
        />
      </mesh>

      {/* Path connecting the 5 stages */}
      {stageCoords.slice(0, -1).map((start, idx) => {
        const end = stageCoords[idx + 1];
        const isPassed = idx < activeStageIndex;
        return (
          <group key={idx}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([...start, ...end]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={idx === 4 ? '#00ff88' : isPassed ? '#38bdf8' : '#64748b'}
                transparent
                opacity={(isPassed ? 0.75 : 0.3) * sceneOpacity}
                linewidth={2}
              />
            </line>
          </group>
        );
      })}

      {/* 5 Stage Anchor Nodes */}
      {stageCoords.map((pos, idx) => {
        const isActive = idx === activeStageIndex;
        const isRemediation = idx === 4;
        const nodeColor = isRemediation ? '#00ff88' : isActive ? '#06b6d4' : '#64748b';

        return (
          <group key={idx} position={pos}>
            {/* Core sphere */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.22 : 0.14, 24, 24]} />
              <meshBasicMaterial
                color={nodeColor}
                transparent
                opacity={0.9 * sceneOpacity}
              />
            </mesh>

            {/* Glowing outer halo */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.38 : 0.22, 16, 16]} />
              <meshBasicMaterial
                color={nodeColor}
                wireframe
                transparent
                opacity={(isActive ? 0.6 : 0.2) * sceneOpacity}
              />
            </mesh>
          </group>
        );
      })}

      {/* Traveling Data Pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.95 * sceneOpacity}
        />
      </mesh>
    </group>
  );
}
