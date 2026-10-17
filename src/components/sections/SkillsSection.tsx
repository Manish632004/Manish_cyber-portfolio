import { Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { soundEngine } from '../ui/SoundController';

interface SkillsSectionProps {
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export function SkillsSection({
  selectedCategoryId,
  onSelectCategory
}: SkillsSectionProps) {
  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === selectedCategoryId) || null;

  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-12 pointer-events-none"
    >
      <div className="max-w-6xl w-full pointer-events-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono-cyber tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SCENE 06 // TECHNICAL CONSTELLATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            MY TECHNICAL{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-emerald-300">
              ARSENAL.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Practical, hands-on capabilities across defensive detection, intrusion analysis, authorized vulnerability assessments, and systems engineering.
          </p>
        </div>

        {/* 4 Category Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => {
              soundEngine.playBlip(600, 0.03, 0.03);
              onSelectCategory(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono-cyber transition-all cursor-pointer ${
              selectedCategoryId === null
                ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            VIEW ALL CLUSTERS
          </button>

          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playBlip(750, 0.04, 0.04);
                  onSelectCategory(isSelected ? null : cat.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono-cyber font-semibold tracking-wide transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border text-white shadow-lg'
                    : 'bg-[#040814]/80 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                style={{
                  borderColor: isSelected ? cat.color : undefined,
                  boxShadow: isSelected ? `0 0 20px ${cat.color}33` : undefined
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Selected Category Highlight Banner (if category picked) */}
        {activeCategory && (
          <div className="mb-8 p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs font-mono-cyber text-slate-300 animate-in fade-in duration-200">
            <div>
              <span className="text-slate-400">CLUSTER SELECTED:</span>{' '}
              <strong className="text-white">{activeCategory.name}</strong> — {activeCategory.description}
            </div>
            <button
              onClick={() => onSelectCategory(null)}
              className="text-cyan-400 hover:underline cursor-pointer shrink-0 ml-4"
            >
              RESET FOCUS
            </button>
          </div>
        )}

        {/* 4 Category Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((category) => {
            const isSelected = selectedCategoryId === category.id;
            const isDimmed = selectedCategoryId !== null && !isSelected;

            return (
              <div
                key={category.id}
                onClick={() => {
                  soundEngine.playBlip(700, 0.03, 0.03);
                  onSelectCategory(isSelected ? null : category.id);
                }}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#060e20] border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)]'
                    : isDimmed
                    ? 'opacity-40 bg-[#030610]/60 border-slate-800'
                    : 'bg-[#040916]/80 hover:bg-[#061022]/90 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="text-lg font-heading font-bold"
                    style={{ color: category.color }}
                  >
                    {category.name}
                  </h3>
                  <span className="text-[10px] font-mono-cyber text-slate-400">
                    {category.skills.length} FOCUS AREAS
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-light mb-6">
                  {category.description}
                </p>

                {/* Skills Grid */}
                <div className="space-y-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-xl bg-black/40 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-mono-cyber font-semibold text-slate-200">
                          {skill.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-light">
                          {skill.focus}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono-cyber bg-slate-900 border border-slate-700 text-cyan-300">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
