import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DigitalFrontierSphere } from './DigitalFrontierSphere';
import { NetworkInfrastructure } from './NetworkInfrastructure';
import { SocCommandCenter } from './SocCommandCenter';
import { AttackPathStructure } from './AttackPathStructure';
import { SkillConstellation } from './SkillConstellation';
import { CyberBackground } from './CyberBackground';
import { FallbackScene } from './FallbackScene';

interface CyberSceneProps {
  scrollProgress: number;
  onSelectSocPanel: (panelId: string) => void;
  activeAttackStageIndex: number;
  selectedSkillCategoryId: string | null;
  onSelectSkillCategory: (id: string | null) => void;
  enable3D: boolean;
}

// Camera controller that smoothly interpolates based on scroll
function CinematicCameraController({ scrollProgress }: { scrollProgress: number }) {
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    // Determine target camera position based on scroll segment
    let targetX = 0;
    let targetY = 0;
    let targetZ = 5.2;
    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    if (scrollProgress < 0.12) {
      // Scene 1: Hero (looking slightly at right-shifted sphere)
      targetX = -0.4;
      targetY = 0.1;
      targetZ = 5.0;
      lookX = 0.5;
      lookY = 0;
      lookZ = 0;
    } else if (scrollProgress < 0.28) {
      // Scene 2: Inside Network (moving into infrastructure)
      targetX = 0;
      targetY = 0;
      targetZ = 3.6;
      lookX = 0;
      lookY = 0;
      lookZ = -2;
    } else if (scrollProgress < 0.46) {
      // Scene 3: SOC (elevated view of panels)
      targetX = 0;
      targetY = 0.3;
      targetZ = 4.8;
      lookX = 0;
      lookY = 0.2;
      lookZ = 0;
    } else if (scrollProgress < 0.64) {
      // Scene 4: Attack Path (angled view across stages)
      targetX = 0;
      targetY = 0.1;
      targetZ = 5.0;
      lookX = 0;
      lookY = 0.2;
      lookZ = 0;
    } else if (scrollProgress < 0.74) {
      // Scene 6: Skills Constellation (focused on core)
      targetX = 0;
      targetY = 0;
      targetZ = 5.2;
      lookX = 0;
      lookY = 0;
      lookZ = 0;
    } else {
      // Scenes 7-10: Projects, Experience, Learning, Contact (calm wide perspective)
      targetX = 0;
      targetY = 0.2;
      targetZ = 6.2;
      lookX = 0;
      lookY = 0;
      lookZ = 0;
    }

    // Smooth lerp
    currentCamPos.current.x = THREE.MathUtils.lerp(currentCamPos.current.x, targetX, 0.04);
    currentCamPos.current.y = THREE.MathUtils.lerp(currentCamPos.current.y, targetY, 0.04);
    currentCamPos.current.z = THREE.MathUtils.lerp(currentCamPos.current.z, targetZ, 0.04);

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookX, 0.04);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookY, 0.04);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookZ, 0.04);

    state.camera.position.copy(currentCamPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

export function CyberScene({
  scrollProgress,
  onSelectSocPanel,
  activeAttackStageIndex,
  selectedSkillCategoryId,
  onSelectSkillCategory,
  enable3D
}: CyberSceneProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  // Check WebGL availability safely
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Track mouse coordinates normalized (-1 to 1)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasWebGL || !enable3D) {
    return <FallbackScene />;
  }

  return (
    <div className="fixed inset-0 pointer-events-auto z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 50 }}
        dpr={[1, 1.5]} // Optimized DPR for buttery smoothness
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <CinematicCameraController scrollProgress={scrollProgress} />
          
          <CyberBackground scrollProgress={scrollProgress} />

          {/* Scene 1: The Digital Frontier Sphere */}
          <DigitalFrontierSphere
            pointer={pointer}
            scrollProgress={scrollProgress}
          />

          {/* Scene 2: Inside the Network */}
          <NetworkInfrastructure
            pointer={pointer}
            scrollProgress={scrollProgress}
          />

          {/* Scene 3: SOC Command Center */}
          <SocCommandCenter
            pointer={pointer}
            scrollProgress={scrollProgress}
            onSelectPanel={onSelectSocPanel}
          />

          {/* Scene 4: Attack Path Structure */}
          <AttackPathStructure
            pointer={pointer}
            scrollProgress={scrollProgress}
            activeStageIndex={activeAttackStageIndex}
          />

          {/* Scene 6: Skill Constellation */}
          <SkillConstellation
            pointer={pointer}
            scrollProgress={scrollProgress}
            selectedCategoryId={selectedSkillCategoryId}
            onSelectCategory={onSelectSkillCategory}
          />
        </Suspense>
      </Canvas>

      {/* Atmospheric dark vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020408] via-transparent to-[#020408]/60 opacity-80" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#020408_80%)] opacity-70" />
    </div>
  );
}
