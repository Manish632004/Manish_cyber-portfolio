import { Eye, Search, Wrench, Shield, CheckCircle } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/portfolioData';
import { soundEngine } from '../ui/SoundController';

export function AboutSection() {
  const principleIcons = [Eye, Search, Wrench];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-12 pointer-events-none"
    >
      <div className="max-w-5xl w-full pointer-events-auto z-10">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono-cyber tracking-widest uppercase mb-4">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>SCENE 05 // PHILOSOPHY & PROFILE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            CURIOUS BY NATURE.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-glow-cyan">
              SECURITY-FOCUSED BY DESIGN.
            </span>
          </h2>
        </div>

        {/* Narrative & Principles Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Narrative Paragraphs */}
          <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            {PERSONAL_DATA.bioSummary.map((para, idx) => (
              <p
                key={idx}
                className="p-4 rounded-xl bg-[#040a18]/60 border border-slate-800/80 backdrop-blur-md"
              >
                {para}
              </p>
            ))}

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono-cyber text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> SOC Tier 1 Readiness
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Practical Lab Engineering
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> PTES Methodology
              </span>
            </div>
          </div>

          {/* 3 Core Principles */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono-cyber uppercase text-slate-400 tracking-wider mb-2">
              Core Operational Methodology
            </div>

            {PERSONAL_DATA.principles.map((p, idx) => {
              const Icon = principleIcons[idx];
              return (
                <div
                  key={idx}
                  onMouseEnter={() => soundEngine.playBlip(700 + idx * 50, 0.02, 0.02)}
                  className="p-4 rounded-xl bg-[#030917]/80 border border-cyan-500/15 hover:border-cyan-400/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-white tracking-wide">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed pl-10">
                    {p.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
