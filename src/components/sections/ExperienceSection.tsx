import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_ITEMS } from '../../data/portfolioData';
import { soundEngine } from '../ui/SoundController';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-12 pointer-events-none"
    >
      <div className="max-w-5xl w-full pointer-events-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono-cyber tracking-widest uppercase mb-4">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>SCENE 08 // PROFESSIONAL TRAJECTORY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            EXPERIENCE &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-glow-cyan">
              PRACTICAL TRAINING.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Hands-on technical internships, real-world development practices, and focused cybersecurity training programs.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-cyan-500/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {EXPERIENCE_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onMouseEnter={() => soundEngine.playBlip(750 + idx * 50, 0.02, 0.02)}
              className="relative group p-6 sm:p-8 rounded-2xl bg-[#040916]/80 border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
            >
              {/* Glowing Timeline Marker Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-8 w-5 h-5 rounded-full bg-[#030712] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Milestone Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-cyber uppercase font-bold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  MILESTONE 0{idx + 1} // {item.type}
                </span>

                <div className="flex items-center gap-3 text-xs font-mono-cyber text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Role & Company */}
              <h3 className="text-2xl font-heading font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {item.role}
              </h3>
              <div className="text-sm font-mono-cyber font-medium text-emerald-400 mb-4">
                {item.company}
              </div>

              {/* Bullets */}
              <ul className="space-y-2.5 mb-6">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-mono-cyber rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
