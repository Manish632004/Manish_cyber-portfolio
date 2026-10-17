interface ScrollProgressProps {
  progress: number;
  currentSection: string;
}

export function ScrollProgress({ progress, currentSection }: ScrollProgressProps) {
  const percentage = Math.round(progress * 100);

  return (
    <>
      {/* Top horizontal slim neon laser progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-slate-900 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-300 transition-all duration-150 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Floating HUD Telemetry Badge (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40 hidden md:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#030712]/80 border border-cyan-500/20 backdrop-blur-md shadow-2xl text-[11px] font-mono-cyber">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-slate-400">SECTOR:</span>
          <span className="text-cyan-300 font-semibold uppercase">{currentSection}</span>
        </div>
        <div className="w-px h-3 bg-slate-800" />
        <div className="text-slate-400">
          INDEX: <span className="text-emerald-400 font-semibold">{percentage}%</span>
        </div>
      </div>
    </>
  );
}
