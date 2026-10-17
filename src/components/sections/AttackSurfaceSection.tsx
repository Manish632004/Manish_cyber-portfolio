import { useState, useEffect, useRef } from 'react';
import { Shield, ChevronRight, ChevronLeft, Lock, CheckCircle2, Terminal } from 'lucide-react';
import { ATTACK_PATH_STAGES } from '../../data/portfolioData';
import { soundEngine } from '../ui/SoundController';

interface AttackSurfaceSectionProps {
  activeStageIndex: number;
  setActiveStageIndex: (idx: number) => void;
}

export function AttackSurfaceSection({
  activeStageIndex,
  setActiveStageIndex
}: AttackSurfaceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Monitor scroll progress across this pinned section & track window width
  useEffect(() => {
    const handleScrollOrResize = () => {
      setWindowWidth(window.innerWidth);
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const totalTravel = sectionRef.current.offsetHeight - window.innerHeight;
        if (totalTravel > 0) {
          const p = Math.max(0, Math.min(1, -rect.top / totalTravel));
          setScrollProgress(p);
        }
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    handleScrollOrResize();

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  // Compute card dimensions and horizontal offset so the active card is always centered
  const cardWidth = windowWidth < 640 ? Math.min(windowWidth - 48, 360) : windowWidth < 1024 ? 520 : 620;
  const cardGap = windowWidth < 640 ? 16 : 28;
  const cardSpacing = cardWidth + cardGap;
  const paddingLeft = Math.max(16, (windowWidth - cardWidth) / 2);
  const horizontalShift = scrollProgress * 4 * cardSpacing;

  const handleStageSelect = (idx: number) => {
    soundEngine.playBlip(680 + idx * 50, 0.04, 0.04);
    setActiveStageIndex(idx);

    if (sectionRef.current) {
      const totalTravel = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalTravel > 0) {
        const targetProgress = idx / 4;
        const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
        const targetScrollY = sectionTop + targetProgress * totalTravel;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => {
    if (activeStageIndex > 0) {
      handleStageSelect(activeStageIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeStageIndex < ATTACK_PATH_STAGES.length - 1) {
      handleStageSelect(activeStageIndex + 1);
    }
  };

  const currentStage = ATTACK_PATH_STAGES[activeStageIndex] || ATTACK_PATH_STAGES[0];

  return (
    <section
      id="attack-surface"
      ref={sectionRef}
      className="relative min-h-[260vh] pointer-events-none"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-5 sm:py-7 pointer-events-none">
        {/* Top Header & Interactive Pipeline Stepper */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pointer-events-auto z-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 mb-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 text-xs font-mono-cyber tracking-widest uppercase mb-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>SCENE 04 // ATTACK PATH METHODOLOGY</span>
              </div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-bold text-white tracking-tight">
                THINK LIKE AN ATTACKER.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">
                  DEFEND LIKE A GUARDIAN.
                </span>
              </h2>
            </div>

            {/* Previous / Next Horizontal Navigation Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handlePrev}
                disabled={activeStageIndex === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-mono-cyber"
                aria-label="Previous attack stage"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">PREV</span>
              </button>
              <button
                onClick={handleNext}
                disabled={activeStageIndex === ATTACK_PATH_STAGES.length - 1}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-mono-cyber"
                aria-label="Next attack stage"
              >
                <span className="hidden sm:inline">NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5-Stage Stepper Track */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {ATTACK_PATH_STAGES.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              const isPassed = idx < activeStageIndex;
              const isRemediation = idx === 4;

              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageSelect(idx)}
                  className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? isRemediation
                        ? 'bg-emerald-950/80 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400/50'
                        : 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/50'
                      : isPassed
                      ? 'bg-slate-900/70 border-cyan-500/30 text-slate-300'
                      : 'bg-[#040814]/70 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-mono-cyber text-[9px] sm:text-[10px] text-slate-400">
                      STAGE {stage.stageNumber}
                    </span>
                    {isRemediation ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-cyan-400" />
                    )}
                  </div>
                  <div
                    className={`font-heading font-bold text-[10px] sm:text-xs truncate ${
                      isActive ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {stage.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Middle: Horizontal Scrolling Track of Stages */}
        <div className="w-full relative overflow-visible pointer-events-auto my-auto py-2">
          <div
            className="flex items-center transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translate3d(-${horizontalShift}px, 0, 0)`,
              paddingLeft: `${paddingLeft}px`,
              paddingRight: `${paddingLeft}px`,
              gap: `${cardGap}px`
            }}
          >
            {ATTACK_PATH_STAGES.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              const isRemediation = idx === 4;

              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    if (!isActive) handleStageSelect(idx);
                  }}
                  className={`shrink-0 rounded-2xl border transition-all duration-300 backdrop-blur-2xl p-5 sm:p-6 select-none ${
                    isActive
                      ? isRemediation
                        ? 'bg-[#040e1b]/95 border-emerald-400/70 shadow-[0_10px_40px_rgba(16,185,129,0.25)] scale-100 opacity-100 ring-1 ring-emerald-400/40 cursor-default'
                        : 'bg-[#040b1a]/95 border-cyan-400/70 shadow-[0_10px_40px_rgba(6,182,212,0.25)] scale-100 opacity-100 ring-1 ring-cyan-400/40 cursor-default'
                      : 'bg-[#030712]/75 border-slate-800 scale-[0.93] opacity-45 hover:opacity-75 cursor-pointer'
                  }`}
                  style={{ width: `${cardWidth}px` }}
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-mono-cyber text-cyan-400 uppercase mb-0.5">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span>PHASE {stage.stageNumber}: {stage.phase}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                        {stage.title}
                      </h3>
                    </div>

                    <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 font-mono-cyber text-[11px] text-purple-300">
                      Tooling: {stage.tooling}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                    {stage.description}
                  </p>

                  {/* Findings & Defense Split */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {/* Lab Vulnerability Finding */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/70 border border-rose-500/25 text-xs leading-relaxed">
                      <div className="flex items-center gap-1.5 font-mono-cyber font-semibold text-rose-300 uppercase mb-1.5">
                        <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>Authorized Lab Finding</span>
                      </div>
                      <p className="text-slate-300">{stage.labFinding}</p>
                    </div>

                    {/* Defensive Countermeasure */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/70 border border-emerald-500/25 text-xs leading-relaxed">
                      <div className="flex items-center gap-1.5 font-mono-cyber font-semibold text-emerald-300 uppercase mb-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Defensive Control & Fix</span>
                      </div>
                      <p className="text-slate-300">{stage.defensiveControl}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Horizontal Status & Indicator */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pointer-events-auto z-20 flex items-center justify-between text-[11px] font-mono-cyber text-slate-400">
          <div className="flex items-center gap-2">
            <span className={activeStageIndex === 4 ? 'text-emerald-400 font-semibold' : 'text-cyan-400 font-semibold'}>
              STAGE {activeStageIndex + 1} OF 5
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-200">{currentStage.title}</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-slate-400">{currentStage.phase}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-slate-500">Scroll or click stages to slide horizontally</span>
            <div className="w-24 sm:w-36 h-1.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700/60">
              <div
                className={`h-full transition-all duration-300 ${
                  activeStageIndex === 4 ? 'bg-emerald-400' : 'bg-cyan-400'
                }`}
                style={{ width: `${((activeStageIndex + 1) / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
