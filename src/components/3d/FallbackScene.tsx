export function FallbackScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Radial atmospheric glows */}
      <div className="absolute -top-40 right-10 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px]" />
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px]" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid-pattern opacity-40" />
      <div className="absolute inset-0 cyber-dot-pattern opacity-30" />

      {/* Decorative Vector Cyber Geometry in Hero Area */}
      <div className="absolute top-20 right-10 md:right-28 w-72 md:w-96 h-72 md:h-96 opacity-30 animate-pulse-subtle">
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-cyan-400 fill-none">
          <circle cx="100" cy="100" r="85" strokeWidth="0.8" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="60" strokeWidth="1" stroke="#00ff88" strokeOpacity="0.4" />
          <circle cx="100" cy="100" r="35" strokeWidth="0.8" strokeDasharray="2 3" />
          <polygon points="100,20 170,140 30,140" strokeWidth="0.6" stroke="#38bdf8" strokeOpacity="0.3" />
          <polygon points="100,180 30,60 170,60" strokeWidth="0.6" stroke="#8b5cf6" strokeOpacity="0.3" />
          <line x1="100" y1="10" x2="100" y2="190" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="10" y1="100" x2="190" y2="100" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
      </div>

      {/* Subtle Scanline */}
      <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-cyan-500/0 via-cyan-400/5 to-cyan-500/0 animate-scanline pointer-events-none" />
    </div>
  );
}
