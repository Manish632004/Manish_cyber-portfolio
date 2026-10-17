import { X, ExternalLink, CheckCircle2, ShieldAlert, Cpu, Terminal, Layers } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import type { Project } from '../../data/portfolioData';
import { soundEngine } from './SoundController';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenLiveSimulator?: (projectId: string) => void;
}

export function ProjectModal({ project, onClose, onOpenLiveSimulator }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#030917] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] p-6 sm:p-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playBlip(500, 0.03, 0.03);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tags & Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 text-xs font-mono-cyber font-medium rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
            {project.badge}
          </span>
          <span className="text-xs font-mono-cyber text-slate-400">
            {project.category}
          </span>
          {project.isSimulated && (
            <span className="px-2.5 py-0.5 text-[10px] font-mono-cyber rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">
              LAB ENVIRONMENT
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2 tracking-wide">
          {project.title}
        </h2>
        <p className="text-base text-cyan-200/80 mb-6 font-medium">
          {project.subtitle}
        </p>

        {/* Highlight Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div>
            <div className="text-[11px] font-mono-cyber text-slate-400 uppercase">Focus Metric</div>
            <div className="text-xl font-heading font-bold text-emerald-400">{project.highlightStat}</div>
            <div className="text-xs text-slate-400">{project.highlightLabel}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono-cyber text-slate-400 uppercase">Verification Level</div>
            <div className="text-xl font-heading font-bold text-cyan-400">Authorized Lab</div>
            <div className="text-xs text-slate-400">Isolated Virtual Subnet</div>
          </div>
          <div>
            <div className="text-[11px] font-mono-cyber text-slate-400 uppercase">Documentation</div>
            <div className="text-xl font-heading font-bold text-purple-400">Full Report</div>
            <div className="text-xs text-slate-400">Methodology & Remediation</div>
          </div>
        </div>

        {/* Section 1: Objective & Description */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-sm font-mono-cyber font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4" />
            01 // Objective & Overview
          </h3>
          <p className="text-slate-300 leading-relaxed text-sm mb-3">
            {project.description}
          </p>
          <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200/90 leading-relaxed">
            <strong className="text-cyan-300">Primary Objective:</strong> {project.objective}
          </div>
        </div>

        {/* Section 2: Lab Architecture */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-sm font-mono-cyber font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            02 // Lab Architecture & Topology
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            {project.labArchitecture}
          </p>
        </div>

        {/* Section 3: Monitoring Capabilities / Security Controls */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-sm font-mono-cyber font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4" />
            03 // Monitoring & Validation Capabilities
          </h3>
          <ul className="space-y-2">
            {project.monitoringCapabilities.map((cap, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Detection & Analysis Workflow */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-sm font-mono-cyber font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <Terminal className="w-4 h-4" />
            04 // Step-by-Step Detection Workflow
          </h3>
          <div className="p-4 rounded-xl bg-black/60 border border-slate-800 font-mono-cyber text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
            {project.detectionWorkflow}
          </div>
        </div>

        {/* Section 5: Tools & Technologies */}
        <div className="mb-6">
          <h3 className="text-sm font-mono-cyber font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Technologies & Frameworks
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-mono-cyber rounded bg-slate-900 border border-slate-700/80 text-cyan-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Section 6: Key Lessons Learned */}
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-sm font-mono-cyber font-semibold text-purple-400 uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4" />
            05 // Operational Insights & Defensive Lessons
          </h3>
          <ul className="space-y-2">
            {project.lessonsLearned.map((lesson, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playBlip(750, 0.04, 0.04)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white text-xs font-mono-cyber font-medium transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>VIEW REPOSITORY</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {/* Launch Interactive Project Simulator (if applicable) */}
            {onOpenLiveSimulator && (project.id === 'url-phishing-detector' || project.id === 'splunk-ssh-dashboard' || project.id === 'wazuh-siem-lab') && (
              <button
                onClick={() => {
                  onClose();
                  onOpenLiveSimulator(project.id);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-mono-cyber font-semibold transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>LAUNCH INTERACTIVE SIMULATOR</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-cyber transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
