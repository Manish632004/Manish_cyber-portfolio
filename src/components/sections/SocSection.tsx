import { Terminal, Shield, Activity, HardDrive, ArrowUpRight } from 'lucide-react';
import { SOC_PANELS } from '../../data/portfolioData';
import { soundEngine } from '../ui/SoundController';

interface SocSectionProps {
  onSelectPanel: (panelId: string) => void;
  onOpenTerminal: () => void;
}

export function SocSection({ onSelectPanel, onOpenTerminal }: SocSectionProps) {
  const panelIcons = [Activity, Shield, HardDrive];

  return (
    <section
      id="soc"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-12 pointer-events-none"
    >
      <div className="max-w-6xl w-full pointer-events-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono-cyber tracking-widest uppercase mb-4">
            <span>SCENE 03 // SECURITY OPERATIONS CENTER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            FROM LOGS TO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 text-glow-green">
              INSIGHTS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-6">
            I work with security monitoring tools to understand system activity, investigate suspicious behavior, and explore how security events can be turned into actionable findings.
          </p>

          {/* Quick Terminal Trigger Button */}
          <button
            onClick={() => {
              soundEngine.playScan();
              onOpenTerminal();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-mono-cyber font-medium transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>LAUNCH SIMULATED EVENT STREAM CONSOLE</span>
          </button>
        </div>

        {/* 3 Interactive SOC Monitoring Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SOC_PANELS.map((panel, idx) => {
            const Icon = panelIcons[idx];
            return (
              <div
                key={panel.id}
                onClick={() => {
                  soundEngine.playBlip(780, 0.04, 0.04);
                  onSelectPanel(panel.id);
                }}
                onMouseEnter={() => soundEngine.playBlip(650, 0.02, 0.02)}
                className="group relative p-6 rounded-2xl bg-[#040916]/80 hover:bg-[#061124]/90 border border-cyan-500/20 hover:border-cyan-400/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] cursor-pointer"
              >
                {/* Header index & icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-cyber text-xs font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                    {panel.index}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/40 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {panel.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-6">
                  {panel.summary}
                </p>

                {/* Technologies List */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {panel.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono-cyber bg-slate-900/90 border border-slate-800 text-slate-300 group-hover:border-cyan-500/30 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono-cyber text-slate-400 group-hover:text-cyan-300 transition-colors">
                  <span>EXPAND TELEMETRY</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear SOC Disclaimer */}
        <div className="mt-8 text-center text-[11px] font-mono-cyber text-slate-500">
          * Simulated portfolio visualization based on isolated security lab testbeds. No real-time production telemetry or live metrics.
        </div>
      </div>
    </section>
  );
}
