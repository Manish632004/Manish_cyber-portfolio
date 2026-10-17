import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { soundEngine } from '../ui/SoundController';

interface SkillConstellationProps {
  pointer: { x: number; y: number };
  scrollProgress: number;
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export function SkillConstellation({
  pointer,
  scrollProgress,
  selectedCategoryId,
  onSelectCategory
}: SkillConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const orbitalRingRef = useRef<THREE.Group>(null);

  // Pre-calculate satellite node positions for each skill within category
  const clusters = useMemo(() => {
    return SKILL_CATEGORIES.map((cat) => {
      const satellites = cat.skills.map((skill, sIdx) => {
        const angle = (sIdx / cat.skills.length) * Math.PI * 2;
        const radius = 0.85;
        const sx = cat.position[0] + Math.cos(angle) * radius;
        const sy = cat.position[1] + Math.sin(angle) * radius * 0.65;
        const sz = cat.position[2] + Math.sin(angle * 2) * 0.3;
        return {
          name: skill.name,
          focus: skill.focus,
          pos: [sx, sy, sz] as [number, number, number]
        };
      });

      return {
        ...cat,
        satellites
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Slow orbital rotation of background rings
    if (orbitalRingRef.current) {
      orbitalRingRef.current.rotation.z += delta * 0.08;
      orbitalRingRef.current.rotation.y += delta * 0.04;
    }

    // Gentle central core pulse
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.3;
      coreRef.current.rotation.y += delta * 0.5;
    }

    // Pointer parallax
    const targetX = pointer.x * 0.25;
    const targetY = pointer.y * 0.2;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);
  });

  // Active range in Scene 6: roughly 0.52 -> 0.70
  const sceneOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.48) * 8) * Math.min(1, (0.74 - scrollProgress) * 7));

  if (sceneOpacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Rotating Multi-Layer Security Core */}
      <group position={[0, 0, 0]}>
        <mesh ref={coreRef}>
          <dodecahedronGeometry args={[0.9, 0]} />
          <meshBasicMaterial
            color="#06b6d4"
            wireframe
            transparent
            opacity={0.45 * sceneOpacity}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 24, 24]} />
          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={0.3 * sceneOpacity}
          />
        </mesh>
      </group>

      {/* Orbiting Gyro Rings */}
      <group ref={orbitalRingRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.2, 0.015, 16, 100]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.25 * sceneOpacity}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[3.4, 0.012, 16, 100]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.2 * sceneOpacity}
          />
        </mesh>
      </group>

      {/* 4 Skill Clusters */}
      {clusters.map((cluster) => {
        const isSelected = selectedCategoryId === cluster.id;
        const isAnySelected = selectedCategoryId !== null;
        const clusterOpacity = isSelected ? 1 : isAnySelected ? 0.35 : 0.85;

        return (
          <group key={cluster.id}>
            {/* Cluster Central Hub Node */}
            <group
              position={cluster.position}
              onClick={(e) => {
                e.stopPropagation();
                soundEngine.playBlip(640, 0.05, 0.05);
                onSelectCategory(isSelected ? null : cluster.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                soundEngine.playBlip(800, 0.02, 0.02);
              }}
            >
              {/* Outer halo */}
              <mesh>
                <sphereGeometry args={[isSelected ? 0.42 : 0.28, 24, 24]} />
                <meshBasicMaterial
                  color={cluster.color}
                  transparent
                  opacity={(isSelected ? 0.6 : 0.35) * sceneOpacity * clusterOpacity}
                />
              </mesh>
              {/* Inner core */}
              <mesh>
                <sphereGeometry args={[isSelected ? 0.24 : 0.16, 16, 16]} />
                <meshBasicMaterial
                  color="#ffffff"
                  transparent
                  opacity={0.9 * sceneOpacity * clusterOpacity}
                />
              </mesh>
            </group>

            {/* Line from Central Core to Cluster Hub */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([0, 0, 0, ...cluster.position]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={cluster.color}
                transparent
                opacity={(isSelected ? 0.7 : 0.25) * sceneOpacity * clusterOpacity}
              />
            </line>

            {/* Satellite Skill Nodes & Spoke Lines */}
            {cluster.satellites.map((sat, sIdx) => (
              <group key={sIdx}>
                {/* Spoke line */}
                <line>
                  <bufferGeometry>
                    <bufferAttribute
                      attach="attributes-position"
                      args={[new Float32Array([...cluster.position, ...sat.pos]), 3]}
                    />
                  </bufferGeometry>
                  <lineBasicMaterial
                    color={cluster.color}
                    transparent
                    opacity={(isSelected ? 0.5 : 0.15) * sceneOpacity * clusterOpacity}
                  />
                </line>

                {/* Satellite node */}
                <mesh position={sat.pos}>
                  <sphereGeometry args={[0.07, 12, 12]} />
                  <meshBasicMaterial
                    color={cluster.color}
                    transparent
                    opacity={(isSelected ? 0.95 : 0.6) * sceneOpacity * clusterOpacity}
                  />
                </mesh>
              </group>
            ))}
          </group>
        );
      })}
    </group>
  );
}
