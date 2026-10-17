import { useState, useEffect } from 'react';
import { CyberScene } from './components/3d/CyberScene';
import { Navbar } from './components/ui/Navbar';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ProjectModal } from './components/ui/ProjectModal';
import { PhishingAnalyzerModal } from './components/ui/PhishingAnalyzerModal';
import { SplunkTerminalModal } from './components/ui/SplunkTerminalModal';
import { SocPanelModal } from './components/ui/SocPanelModal';
import { CyberCursorTracer } from './components/ui/CyberCursorTracer';
import { CyberOpeningLoader } from './components/ui/CyberOpeningLoader';

// Sections
import { HeroSection } from './components/sections/HeroSection';
import { InsideNetworkSection } from './components/sections/InsideNetworkSection';
import { SocSection } from './components/sections/SocSection';
import { AttackSurfaceSection } from './components/sections/AttackSurfaceSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { LearningSection } from './components/sections/LearningSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

import type { Project } from './data/portfolioData';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('hero');

  // Opening boot sequence state
  const [isBooting, setIsBooting] = useState(true);

  // Modals & Interactive States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSocPanelId, setSelectedSocPanelId] = useState<string | null>(null);
  const [isPhishingModalOpen, setIsPhishingModalOpen] = useState(false);
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState(false);

  // Attack path active stage (0 to 4)
  const [activeAttackStageIndex, setActiveAttackStageIndex] = useState(0);

  // Skill category focus (null or category id)
  const [selectedSkillCategoryId, setSelectedSkillCategoryId] = useState<string | null>(null);

  // Monitor scroll for 3D camera & current section detection
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScroll / totalScroll)) : 0;
      setScrollProgress(progress);

      // Section detection
      const sections = [
        'hero',
        'network',
        'soc',
        'attack-surface',
        'about',
        'skills',
        'projects',
        'experience',
        'learning',
        'contact'
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.25) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }

      // Auto update attack path stage index as user scrolls through attack section
      const attackEl = document.getElementById('attack-surface');
      if (attackEl) {
        const rect = attackEl.getBoundingClientRect();
        const totalTravel = attackEl.offsetHeight - window.innerHeight;

        if (totalTravel > 0) {
          if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
            // User is actively inside the pinned scroll track
            const progress = Math.max(0, Math.min(1, -rect.top / totalTravel));
            // Card closest to center (0, 0.25, 0.5, 0.75, 1.0)
            const stageIndex = Math.min(4, Math.max(0, Math.round(progress * 4)));
            setActiveAttackStageIndex(stageIndex);
          } else if (rect.top > 0) {
            // Above section
            setActiveAttackStageIndex(0);
          } else {
            // Scrolled past section -> stay on last stage (Remediation)
            setActiveAttackStageIndex(4);
          }
        } else {
          // Fallback if not pinned
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const sectionProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
            const stageIndex = Math.min(4, Math.floor(sectionProgress * 5));
            setActiveAttackStageIndex(stageIndex);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle live simulator launches from Project cards or modals
  const handleOpenLiveSimulator = (projectId: string) => {
    if (projectId === 'url-phishing-detector') {
      setIsPhishingModalOpen(true);
    } else {
      setIsTerminalModalOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020408] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* High-Tech Cybersecurity Opening / Boot Animation */}
      {isBooting && (
        <CyberOpeningLoader onComplete={() => setIsBooting(false)} />
      )}

      {/* High-Tech Cyber Cursor Tracer (Permanently Active) */}
      <CyberCursorTracer enabled={true} />

      {/* Scroll Telemetry Progress Bar & HUD */}
      <ScrollProgress progress={scrollProgress} currentSection={currentSection} />

      {/* Clean Futuristic Navbar */}
      <Navbar currentSection={currentSection} />

      {/* Main 3D Canvas Coordinator (fixed background, permanently active) */}
      <CyberScene
        scrollProgress={scrollProgress}
        onSelectSocPanel={(panelId) => setSelectedSocPanelId(panelId)}
        activeAttackStageIndex={activeAttackStageIndex}
        selectedSkillCategoryId={selectedSkillCategoryId}
        onSelectSkillCategory={(id) => setSelectedSkillCategoryId(id)}
        enable3D={true}
      />

      {/* 10 Immersive Narrative Story Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Scene 1: The Digital Frontier */}
        <HeroSection />

        {/* Scene 2: Inside the Network */}
        <InsideNetworkSection />

        {/* Scene 3: Security Operations Center */}
        <SocSection
          onSelectPanel={(panelId) => setSelectedSocPanelId(panelId)}
          onOpenTerminal={() => setIsTerminalModalOpen(true)}
        />

        {/* Scene 4: The Attack Surface */}
        <AttackSurfaceSection
          activeStageIndex={activeAttackStageIndex}
          setActiveStageIndex={(idx) => setActiveAttackStageIndex(idx)}
        />

        {/* Scene 5: About Me */}
        <AboutSection />

        {/* Scene 6: My Technical Arsenal */}
        <SkillsSection
          selectedCategoryId={selectedSkillCategoryId}
          onSelectCategory={(id) => setSelectedSkillCategoryId(id)}
        />

        {/* Scene 7: Projects as Digital Artifacts */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenLiveSimulator={handleOpenLiveSimulator}
        />

        {/* Scene 8: Experience */}
        <ExperienceSection />

        {/* Scene 9: Learning & Growth */}
        <LearningSection />

        {/* Scene 10: Contact Portal */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onReplayIntro={() => setIsBooting(true)} />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenLiveSimulator={handleOpenLiveSimulator}
      />

      <PhishingAnalyzerModal
        isOpen={isPhishingModalOpen}
        onClose={() => setIsPhishingModalOpen(false)}
      />

      <SplunkTerminalModal
        isOpen={isTerminalModalOpen}
        onClose={() => setIsTerminalModalOpen(false)}
      />

      <SocPanelModal
        panelId={selectedSocPanelId}
        onClose={() => setSelectedSocPanelId(null)}
        onOpenTerminal={() => setIsTerminalModalOpen(true)}
      />
    </div>
  );
}
