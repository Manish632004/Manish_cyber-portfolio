import { ChevronRight, Terminal } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/portfolioData';
import { soundEngine } from '../ui/SoundController';

export function HeroSection() {
  const scrollTo = (id: string) => {
    soundEngine.playBlip(750, 0.04, 0.04);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start pt-28 pb-16 px-4 sm:px-6 lg:px-12 pointer-events-none"
    >
      <div className="max-w-3xl pointer-events-auto z-10">
        {/* Small Category Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono-cyber tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>{PERSONAL_DATA.heroBadge}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-[1.08] mb-6">
          <span className="block text-slate-100">{PERSONAL_DATA.headlineMain}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-200 text-glow-cyan">
            {PERSONAL_DATA.headlineAccent}
          </span>
        </h1>

        {/* Short & Concise Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-light mb-8 max-w-2xl">
          I'm <strong className="text-white font-semibold">{PERSONAL_DATA.name}</strong>, a Computer Science graduate from <span className="text-cyan-300 font-medium">{PERSONAL_DATA.location}</span>. With hands-on experience in SIEM threat monitoring, alert triage, and defensive security, I am actively seeking an entry-level <span className="text-emerald-400 font-medium">SOC Analyst (L1)</span> role.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <button
            onClick={() => scrollTo('network')}
            className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-black font-mono-cyber text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] flex items-center gap-2 cursor-pointer"
          >
            <span>EXPLORE MY WORLD</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollTo('projects')}
            className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white font-mono-cyber text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            VIEW MY PROJECTS
          </button>
        </div>

        {/* Availability Status Indicator */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-mono-cyber">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold tracking-wide">
            {PERSONAL_DATA.availabilityStatus}
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            Targeting: SOC L1 / SIEM / VAPT
          </span>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => scrollTo('network')}>
        <span className="text-[10px] font-mono-cyber text-cyan-400/80 tracking-widest uppercase">
          SCROLL TO ENTER INFRASTRUCTURE
        </span>
        <div className="w-5 h-8 rounded-full border border-cyan-500/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
