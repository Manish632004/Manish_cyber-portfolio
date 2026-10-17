import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundEngine } from '../ui/SoundController';

interface SocCommandCenterProps {
  pointer: { x: number; y: number };
  scrollProgress: number;
  onSelectPanel: (panelId: string) => void;
}

export function SocCommandCenter({ pointer, scrollProgress, onSelectPanel }: SocCommandCenterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const radarRingRef = useRef<THREE.Group>(null);
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null);

  // 3 Interactive floating monitoring displays
  const panels = [
    {
      id: 'panel-siem',
      index: '01',
      title: 'SIEM & LOGS',
      sub: 'Wazuh • Splunk • SPL',
      pos: [-2.6, 0.4, 0] as [number, number, number],
      rot: [0, 0.28, 0] as [number, number, number],
      color: '#00ff88'
    },
    {
      id: 'panel-network',
      index: '02',
      title: 'NETWORK IDS',
      sub: 'Suricata • PCAP • Nmap',
      pos: [0, 1.1, 0.3] as [number, number, number],
      rot: [0, 0, 0] as [number, number, number],
      color: '#06b6d4'
    },
    {
      id: 'panel-endpoint',
      index: '03',
      title: 'ENDPOINT FIM',
      sub: 'Auditd • Syscheck • Linux/Win',
      pos: [2.6, 0.4, 0] as [number, number, number],
      rot: [0, -0.28, 0] as [number, number, number],
      color: '#38bdf8'
    }
  ];

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Subtle floating breathing motion
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.12;

    // Mouse parallax
    const targetX = pointer.x * 0.25;
    const targetY = pointer.y * 0.18;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY * 0.5, 0.04);

    // Revolving radar telemetry ring
    if (radarRingRef.current) {
      radarRingRef.current.rotation.z += delta * 0.4;
    }
  });

  // Scene active range around 0.22 -> 0.42
  const sceneOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.18) * 8) * Math.min(1, (0.46 - scrollProgress) * 7));

  if (sceneOpacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Central Incident Radar / Telemetry Ring */}
      <group ref={radarRingRef} position={[0, -1.2, -1.5]} rotation={[-Math.PI / 2.6, 0, 0]}>
        <mesh>
          <ringGeometry args={[1.8, 1.84, 64]} />
          <meshBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.45 * sceneOpacity}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[2.5, 2.53, 64]} />
          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={0.25 * sceneOpacity}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Radar sweeping fan */}
        <mesh rotation={[0, 0, 0]}>
          <circleGeometry args={[2.5, 32, 0, Math.PI / 4]} />
          <meshBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.06 * sceneOpacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Floating 3D Interactive Display Panels */}
      {panels.map((p) => {
        const isHovered = hoveredPanel === p.id;
        // Hover moves slightly toward camera
        const targetZ = p.pos[2] + (isHovered ? 0.35 : 0);
        const panelWidth = 2.1;
        const panelHeight = 1.35;

        return (
          <group
            key={p.id}
            position={[p.pos[0], p.pos[1], targetZ]}
            rotation={p.rot}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredPanel(p.id);
              soundEngine.playBlip(720, 0.03, 0.04);
            }}
            onPointerOut={() => {
              setHoveredPanel(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playScan();
              onSelectPanel(p.id);
            }}
          >
            {/* Panel Glass Body */}
            <mesh>
              <planeGeometry args={[panelWidth, panelHeight]} />
              <meshBasicMaterial
                color="#071326"
                transparent
                opacity={(isHovered ? 0.92 : 0.78) * sceneOpacity}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Glowing border outline */}
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(panelWidth, panelHeight)]} />
              <lineBasicMaterial
                color={isHovered ? '#00ff88' : p.color}
                transparent
                opacity={(isHovered ? 0.95 : 0.45) * sceneOpacity}
              />
            </lineSegments>

            {/* Corner Bracket Accents */}
            {[-1, 1].map((x) =>
              [-1, 1].map((y) => (
                <mesh
                  key={`${x}-${y}`}
                  position={[(x * panelWidth) / 2 - x * 0.08, (y * panelHeight) / 2 - y * 0.08, 0.01]}
                >
                  <planeGeometry args={[0.14, 0.14]} />
                  <meshBasicMaterial
                    color={p.color}
                    transparent
                    opacity={0.8 * sceneOpacity}
                    wireframe
                  />
                </mesh>
              ))
            )}

            {/* Status indicator dot in top right */}
            <mesh position={[panelWidth / 2 - 0.22, panelHeight / 2 - 0.22, 0.02]}>
              <circleGeometry args={[0.06, 16]} />
              <meshBasicMaterial
                color={isHovered ? '#00ff88' : '#38bdf8'}
                transparent
                opacity={0.9 * sceneOpacity}
              />
            </mesh>
          </group>
        );
      })}

      {/* Abstract dark server racks in background */}
      {[-4.2, 4.2].map((xPos, idx) => (
        <group key={idx} position={[xPos, -0.6, -3]}>
          <mesh>
            <boxGeometry args={[1.2, 3.2, 1.2]} />
            <meshBasicMaterial
              color="#040914"
              transparent
              opacity={0.8 * sceneOpacity}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.2, 3.2, 1.2)]} />
            <lineBasicMaterial
              color="#1e293b"
              transparent
              opacity={0.5 * sceneOpacity}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}
