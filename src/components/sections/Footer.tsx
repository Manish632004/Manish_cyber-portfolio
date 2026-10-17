import { Shield, ArrowUp } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/portfolioData';
import { soundEngine } from '../ui/SoundController';

export function Footer() {
  const scrollToTop = () => {
    soundEngine.playBlip(900, 0.04, 0.04);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-[#010307] text-slate-400 font-mono-cyber text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-heading font-bold text-white text-sm tracking-wide">
              {PERSONAL_DATA.brandName}
            </div>
            <div className="text-[11px] text-slate-500">
              {PERSONAL_DATA.name} © 2026 — Built with curiosity and a security-first mindset.
            </div>
          </div>
        </div>

        {/* Status & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[11px] text-emerald-400/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ALL SYSTEMS DEFENDED</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Back to top"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
