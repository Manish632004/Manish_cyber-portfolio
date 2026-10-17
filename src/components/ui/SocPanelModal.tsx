import { X, Shield, Activity, Terminal, ArrowRight } from 'lucide-react';
import { SOC_PANELS } from '../../data/portfolioData';
import type { SocPanelData } from '../../data/portfolioData';
import { soundEngine } from './SoundController';

interface SocPanelModalProps {
  panelId: string | null;
  onClose: () => void;
  onOpenTerminal?: () => void;
}

export function SocPanelModal({ panelId, onClose, onOpenTerminal }: SocPanelModalProps) {
  if (!panelId) return null;

  const panel: SocPanelData | undefined = SOC_PANELS.find((p) => p.id === panelId);
  if (!panel) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#030814] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] p-6 sm:p-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playBlip(500, 0.03, 0.03);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Index & Title */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 text-xs font-mono-cyber font-bold rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
            PANEL {panel.index}
          </span>
          <span className="text-xs font-mono-cyber text-slate-400 uppercase">
            SIMULATED SOC MONITORING DISPLAY
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 tracking-wide">
          {panel.title}
        </h2>

        <p className="text-sm text-cyan-200/90 leading-relaxed mb-6">
          {panel.summary}
        </p>

        {/* Tools Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {panel.tools.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono-cyber text-emerald-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Detailed Analysis */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-xs font-mono-cyber font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <Shield className="w-4 h-4" />
            Detection & Monitoring Methodology
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            {panel.detailedAnalysis}
          </p>
        </div>

        {/* Sample Telemetry Events */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-xs font-mono-cyber font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <Activity className="w-4 h-4" />
            Illustrative Security Event Signatures
          </h3>
          <div className="space-y-2">
            {panel.sampleEventTypes.map((ev, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-black/60 border border-slate-800 font-mono-cyber text-xs text-slate-300 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span className="truncate">{ev}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-xs font-mono-cyber font-semibold text-purple-400 uppercase tracking-wider mb-2">
            <Terminal className="w-4 h-4" />
            Actionable Analyst Insights
          </h3>
          <ul className="space-y-2">
            {panel.actionableInsights.map((ins, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span>{ins}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          {onOpenTerminal && (
            <button
              onClick={() => {
                onClose();
                onOpenTerminal();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-mono-cyber font-semibold transition-all cursor-pointer"
            >
              <span>INSPECT SIMULATED LOG STREAM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-cyber transition-colors cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}
