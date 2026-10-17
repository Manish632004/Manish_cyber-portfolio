import { Terminal, ArrowUpRight, Cpu } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../data/portfolioData';
import { soundEngine } from '../ui/SoundController';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenLiveSimulator: (projectId: string) => void;
}

export function ProjectsSection({
  onSelectProject,
  onOpenLiveSimulator
}: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-12 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono-cyber tracking-widest uppercase mb-4">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>SCENE 07 // DIGITAL ARTIFACTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            PROJECTS AS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-200 text-glow-cyan">
              DIGITAL ARTIFACTS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Practical security engineering testbeds, authorized exploitation analyses, custom detection rules, and explainable machine learning models.
          </p>
        </div>

        {/* 4 Large Editorial Project Artifacts */}
        <div className="space-y-16">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={project.id}
                className="group relative rounded-3xl bg-gradient-to-b from-[#061026]/90 to-[#020612]/95 border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-2xl p-6 sm:p-10 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(6,182,212,0.18)]"
              >
                {/* Ambient Top Glow */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Project Metadata & Copy */}
                  <div className={`lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    {/* Badge & Category */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 text-xs font-mono-cyber font-medium rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                        {project.badge}
                      </span>
                      <span className="text-xs font-mono-cyber text-slate-400">
                        ARTIFACT // 0{idx + 1}
                      </span>
                      {project.isSimulated && (
                        <span className="px-2 py-0.5 text-[10px] font-mono-cyber rounded bg-amber-950/50 border border-amber-500/30 text-amber-300">
                          LAB SIMULATION
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2 tracking-wide group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm font-medium text-emerald-400 mb-4">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                      {project.description}
                    </p>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-mono-cyber rounded bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          soundEngine.playScan();
                          onSelectProject(project);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono-cyber text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center gap-2 cursor-pointer"
                      >
                        <span>EXPLORE LAB ARTIFACT</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      {/* Launch Interactive Simulator if applicable */}
                      {(project.id === 'url-phishing-detector' || project.id === 'splunk-ssh-dashboard' || project.id === 'wazuh-siem-lab') && (
                        <button
                          onClick={() => {
                            soundEngine.playBlip(800, 0.04, 0.04);
                            onOpenLiveSimulator(project.id);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono-cyber text-xs font-semibold tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                          <span>RUN SIMULATOR</span>
                        </button>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundEngine.playBlip(700, 0.04, 0.04)}
                          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                          title="View Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Telemetry Box */}
                  <div className={`lg:col-span-5 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div className="p-6 rounded-2xl bg-black/60 border border-slate-800 font-mono-cyber text-xs relative overflow-hidden">
                      {/* Terminal header dots */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-[10px] text-slate-500">
                          TELEMETRY // {project.id}.log
                        </span>
                      </div>

                      {/* Content preview specific to project */}
                      {project.id === 'wazuh-siem-lab' && (
                        <div className="space-y-2 text-[11px]">
                          <div className="text-cyan-300 font-semibold">&gt; wazuh-control status</div>
                          <div className="text-emerald-400">✓ wazuh-manager (pid 1024) is running...</div>
                          <div className="text-emerald-400">✓ suricata-ids (interface eth0) active</div>
                          <div className="text-slate-400">[Syscheck] Monitoring 148 critical files</div>
                          <div className="text-amber-300">[Rule 5710] Failed password for root (x5)</div>
                          <div className="text-rose-400">[Action] Active response triggered: IP drop</div>
                        </div>
                      )}

                      {project.id === 'dc1-vulnhub-vapt' && (
                        <div className="space-y-2 text-[11px]">
                          <div className="text-cyan-300 font-semibold">&gt; nmap -sV -sC 192.168.1.105</div>
                          <div className="text-slate-300">PORT 80/tcp OPEN http Drupal 7</div>
                          <div className="text-purple-400">&gt; use exploit/unix/webapp/drupal_drupalgeddon2</div>
                          <div className="text-emerald-400">[+] Meterpreter session 1 opened</div>
                          <div className="text-amber-300">&gt; find / -perm -u=s -type f 2&gt;/dev/null</div>
                          <div className="text-emerald-400 font-bold">[!] SUID found on /usr/bin/find (Root shell)</div>
                        </div>
                      )}

                      {project.id === 'splunk-ssh-dashboard' && (
                        <div className="space-y-2 text-[11px]">
                          <div className="text-cyan-300 font-semibold">&gt; SPL Search Execution</div>
                          <div className="text-slate-400">index=os_security sourcetype=syslog sshd</div>
                          <div className="text-slate-400">| stats count by src_ip, user</div>
                          <div className="text-emerald-400">| where count &gt; 5 | sort - count</div>
                          <div className="text-rose-400 mt-2">[Surge] 185.220.101.45: 48 failed attempts</div>
                          <div className="text-slate-300">GeoIP: Netherlands (Tor Exit Node)</div>
                        </div>
                      )}

                      {project.id === 'url-phishing-detector' && (
                        <div className="space-y-2 text-[11px]">
                          <div className="text-cyan-300 font-semibold">&gt; python detect_phish.py --eval</div>
                          <div className="text-slate-400">Extracting 16 lexical features...</div>
                          <div className="text-slate-300">Entropy: 4.12 bits | Hyphens: 3 | IP: False</div>
                          <div className="text-amber-400">Trigger: Deceptive keyword [paypal, verify]</div>
                          <div className="text-rose-400 font-bold">Classifier Score: 89.4% (PHISHING)</div>
                          <div className="text-emerald-400">Status: Quarantine link in email gateway</div>
                        </div>
                      )}

                      {/* Stat Footer */}
                      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">{project.highlightLabel}:</span>
                        <span className="text-emerald-400 font-bold">{project.highlightStat}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
