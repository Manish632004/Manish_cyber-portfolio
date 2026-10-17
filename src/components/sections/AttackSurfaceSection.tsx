import { Shield, ChevronRight, Lock, CheckCircle2, Terminal } from 'lucide-react';
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
  const currentStage = ATTACK_PATH_STAGES[activeStageIndex] || ATTACK_PATH_STAGES[0];

  return (
    <section
      id="attack-surface"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-12 pointer-events-none"
    >
      <div className="max-w-6xl w-full pointer-events-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono-cyber tracking-widest uppercase mb-4">
            <span>SCENE 04 // ATTACK PATH METHODOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            THINK LIKE AN ATTACKER.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">
              ANALYZE LIKE A DEFENDER.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Penetration testing in authorized lab environments enables security analysts to trace exploit chains, uncover root-cause weaknesses, and engineer robust defensive controls.
          </p>
        </div>

        {/* 5 Attack Stages Progress Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-8">
          {ATTACK_PATH_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            const isPassed = idx < activeStageIndex;
            const isRemediation = idx === 4;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  soundEngine.playBlip(680 + idx * 50, 0.04, 0.04);
                  setActiveStageIndex(idx);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? isRemediation
                      ? 'bg-emerald-950/60 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : isPassed
                    ? 'bg-slate-900/70 border-cyan-500/30 text-slate-300'
                    : 'bg-[#040814]/60 border-slate-800 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono-cyber text-[10px] text-slate-400">
                    STAGE {stage.stageNumber}
                  </span>
                  {isRemediation ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </div>
                <div
                  className={`font-heading font-bold text-xs sm:text-sm tracking-wide ${
                    isActive ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {stage.title}
                </div>
                <div className="text-[10px] font-mono-cyber text-slate-400 truncate">
                  {stage.phase}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#040916]/85 border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-cyber text-cyan-400 uppercase mb-1">
                <Terminal className="w-4 h-4" />
                <span>PHASE {currentStage.stageNumber}: {currentStage.phase}</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">
                {currentStage.title}
              </h3>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 font-mono-cyber text-xs text-purple-300">
              Tooling: {currentStage.tooling}
            </div>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed mb-6">
            {currentStage.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lab Vulnerability Finding */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-rose-500/20 text-xs leading-relaxed">
              <div className="flex items-center gap-2 font-mono-cyber font-semibold text-rose-300 uppercase mb-2">
                <Lock className="w-4 h-4 text-rose-400" />
                <span>Authorized Lab Finding</span>
              </div>
              <p className="text-slate-300">{currentStage.labFinding}</p>
            </div>

            {/* Defensive Countermeasure */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/20 text-xs leading-relaxed">
              <div className="flex items-center gap-2 font-mono-cyber font-semibold text-emerald-300 uppercase mb-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Defensive Control & Remediation</span>
              </div>
              <p className="text-slate-300">{currentStage.defensiveControl}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
