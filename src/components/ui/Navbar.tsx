import { useState, useEffect } from 'react';
import { Shield, Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/portfolioData';

interface NavbarProps {
  currentSection: string;
}

export function Navbar({ currentSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

        {/* Controls: Resume CTA & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Resume CTA */}
          <a
            href={PERSONAL_DATA.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono-cyber font-medium tracking-wide transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
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
            <div className="pt-3 mt-1 border-t border-slate-800/80 flex items-center justify-between">
              <a
                href={PERSONAL_DATA.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono-cyber font-medium"
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
