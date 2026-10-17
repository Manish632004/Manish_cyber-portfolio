import { Award, BookOpen, ShieldCheck } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/portfolioData';
import { soundEngine } from '../ui/SoundController';

export function LearningSection() {
  return (
    <section
      id="learning"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-12 pointer-events-none"
    >
      <div className="max-w-5xl w-full pointer-events-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono-cyber tracking-widest uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>SCENE 09 // CONTINUOUS GROWTH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            ALWAYS INVESTIGATING.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-200 text-glow-green">
              ALWAYS IMPROVING.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Cybersecurity demands relentless curiosity. I continuously expand my detection engineering abilities, examine new threat trends, and refine incident triage playbooks.
          </p>
        </div>

        {/* 6 Core Focus Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {PERSONAL_DATA.learningFocus.map((focus, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEngine.playBlip(700 + idx * 30, 0.02, 0.02)}
              className="p-5 rounded-2xl bg-[#040916]/80 border border-cyan-500/15 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <h3 className="font-heading font-bold text-sm text-white">
                  {focus.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {focus.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Verified Practical Credentials & Lab Blueprints */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#040a1a]/90 to-[#020612]/90 border border-emerald-500/30 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-white">
                Verified Credentials & Practical Lab Certifications
              </h3>
              <p className="text-xs text-slate-400 font-mono-cyber">
                Demonstrated practical coursework & self-directed engineering
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PERSONAL_DATA.certifications
              .filter((c) => c.verified)
              .map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono-cyber"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      {cert.status}
                    </span>
                    <span className="text-slate-500">{cert.date}</span>
                  </div>
                  <h4 className="text-sm font-heading font-bold text-white mb-1">
                    {cert.name}
                  </h4>
                  <div className="text-cyan-300 text-[11px] mb-2">{cert.issuer}</div>
                  <p className="text-slate-400 text-[11px] font-sans leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
