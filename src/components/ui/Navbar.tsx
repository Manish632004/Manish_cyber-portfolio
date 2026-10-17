import { useState, useEffect } from 'react';
import { Shield, Volume2, VolumeX, Eye, EyeOff, Menu, X, ArrowUpRight, Crosshair, Type } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/portfolioData';
import { soundEngine } from './SoundController';

export type FontTheme = 'outfit' | 'urbanist' | 'space';

interface NavbarProps {
  currentSection: string;
  enable3D: boolean;
  onToggle3D: () => void;
  enableTracer: boolean;
  onToggleTracer: () => void;
  fontTheme: FontTheme;
  onCycleFontTheme: () => void;
}

export function Navbar({
  currentSection,
  enable3D,
  onToggle3D,
  enableTracer,
  onToggleTracer,
  fontTheme,
  onCycleFontTheme
}: NavbarProps) {
  const [isMuted, setIsMuted] = useState(() => soundEngine.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { id: 'hero', label: 'FRONTIER' },
    { id: 'network', label: 'NETWORK' },
    { id: 'soc', label: 'SOC' },
    { id: 'attack-surface', label: 'ATTACK PATH' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'ARSENAL' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const handleNavClick = (id: string) => {
    soundEngine.playBlip(700, 0.03, 0.03);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#020408]/85 backdrop-blur-md border-b border-cyan-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Telemetry Indicator */}
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                {PERSONAL_DATA.brandName}
              </span>
              <span className="font-mono-cyber text-[10px] text-slate-400 tracking-widest uppercase">
                DEFENSIVE SEC // SOC L1
              </span>
            </div>
          </a>

          {/* Live Security Indicator */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-800 text-[11px] font-mono-cyber text-emerald-400/90">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide text-slate-300">SYSTEM: ACTIVE</span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-950/70 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1 text-xs font-mono-cyber tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Controls: Audio Toggle, 3D Toggle, Resume */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Enable cyber sound feedback' : 'Mute sound feedback'}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
          </button>

          {/* 3D Mode Toggle */}
          <button
            onClick={onToggle3D}
            aria-label="Toggle 3D visual fidelity"
            title={enable3D ? 'Switch to Lightweight Mode' : 'Switch to 3D WebGL Mode'}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono-cyber transition-all cursor-pointer ${
              enable3D
                ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {enable3D ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
            <span>{enable3D ? '3D: ON' : '3D: ECO'}</span>
          </button>

          {/* Cursor Tracer Toggle */}
          <button
            onClick={onToggleTracer}
            aria-label="Toggle cyber cursor tracer"
            title={enableTracer ? 'Switch to Standard Cursor' : 'Activate Cyber Cursor Tracer'}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono-cyber transition-all cursor-pointer ${
              enableTracer
                ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <Crosshair className={`w-3.5 h-3.5 ${enableTracer ? 'text-emerald-400 animate-[spin_10s_linear_infinite]' : 'text-slate-500'}`} />
            <span>{enableTracer ? 'TRACER: ON' : 'TRACER: OFF'}</span>
          </button>

          {/* Typography Preset Switcher */}
          <button
            onClick={() => {
              soundEngine.playBlip(750, 0.03, 0.02);
              onCycleFontTheme();
            }}
            aria-label="Cycle typography style"
            title={`Active Font: ${fontTheme.toUpperCase()} (Click to toggle between Outfit, Urbanist, and Space Grotesk)`}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-cyan-500/50 bg-slate-900/90 text-slate-300 hover:text-cyan-300 text-xs font-mono-cyber transition-all cursor-pointer"
          >
            <Type className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-semibold text-cyan-300 uppercase">
              {fontTheme}
            </span>
          </button>

          {/* Resume CTA */}
          <a
            href={PERSONAL_DATA.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playBlip(900, 0.04, 0.05)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-mono-cyber font-medium tracking-wide transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <span>RESUME</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="xl:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-2 mx-4 p-4 rounded-2xl bg-[#030814]/95 border border-cyan-500/25 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-mono-cyber text-slate-500 px-3 pb-1 border-b border-slate-800 tracking-widest">
              NAVIGATION // SECTORS
            </div>
            {navLinks.map((link) => {
              const isActive = currentSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-3 py-2 text-sm font-mono-cyber rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-slate-500">→</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between px-2 text-xs font-mono-cyber text-slate-400">
              <span className="flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                CYBER TRACER
              </span>
              <button
                onClick={onToggleTracer}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors cursor-pointer ${
                  enableTracer ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {enableTracer ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between px-2 text-xs font-mono-cyber text-slate-400">
              <span className="flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-cyan-400" />
                FONT THEME
              </span>
              <button
                onClick={() => {
                  soundEngine.playBlip(750, 0.03, 0.02);
                  onCycleFontTheme();
                }}
                className="px-2.5 py-1 rounded text-[11px] font-semibold border border-cyan-500/40 bg-cyan-500/20 text-cyan-300 cursor-pointer uppercase"
              >
                {fontTheme}
              </button>
            </div>
            <div className="pt-2 mt-1 border-t border-slate-800/80 flex items-center justify-between">
              <a
                href={PERSONAL_DATA.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono-cyber font-medium"
              >
                DOWNLOAD RESUME PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
