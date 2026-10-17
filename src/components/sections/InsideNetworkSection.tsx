import { Network, Activity, Eye, ShieldAlert } from 'lucide-react';
import { soundEngine } from '../ui/SoundController';

export function InsideNetworkSection() {
  const nodes = [
    {
      title: 'Network Visibility',
      icon: Network,
      tag: 'TRAFFIC TELEMETRY',
      desc: 'Inspecting bidirectional packet flows, TCP handshakes, protocol headers, and DNS queries to reveal unauthorized lateral movement.'
    },
    {
      title: 'Log Analysis',
      icon: Activity,
      tag: 'CENTRALIZED AUDITING',
      desc: 'Correlating auth.log, syslog, and Windows Security Event IDs to identify brute-force surges and unauthorized privilege escalations.'
    },
    {
      title: 'Threat Detection',
      icon: ShieldAlert,
      tag: 'BEHAVIORAL RULES',
      desc: 'Translating threat intelligence into high-fidelity Wazuh XML decoders and Suricata signature rules to minimize analyst alert fatigue.'
    },
    {
      title: 'Security Monitoring',
      icon: Eye,
      tag: 'CONTINUOUS POSTURE',
      desc: 'Maintaining live oversight of endpoints, detecting checksum discrepancies on sensitive binaries, and validating system integrity.'
    }
  ];

  return (
    <section
      id="network"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-12 pointer-events-none"
    >
      <div className="max-w-6xl w-full pointer-events-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono-cyber tracking-widest uppercase mb-4">
            <span>SCENE 02 // DIGITAL INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            EVERY CONNECTION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-glow-cyan">
              TELLS A STORY.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Behind every system is a network of activity. Understanding that activity is where security begins.
          </p>
        </div>

        {/* 4 Interactive Explanatory Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => soundEngine.playBlip(750 + idx * 40, 0.02, 0.02)}
                className="group relative p-6 rounded-2xl bg-[#040a18]/75 border border-cyan-500/15 hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]"
              >
                {/* Corner accent */}
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500/30 group-hover:border-emerald-400 transition-colors" />

                <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-[10px] font-mono-cyber text-slate-500 uppercase tracking-widest mb-1">
                  {node.tag}
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {node.title}
                </h3>

                <p className="text-xs text-slate-300/90 leading-relaxed font-light">
                  {node.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Note Disclaimer */}
        <div className="mt-12 text-center text-[11px] font-mono-cyber text-slate-400">
          <span>* Visualizations and telemetry indicators represent practical lab environments and areas of security research.</span>
        </div>
      </div>
    </section>
  );
}
