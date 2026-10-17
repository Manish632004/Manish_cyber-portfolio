import { useState } from 'react';
import { X, Terminal, Filter, Search, ShieldCheck, AlertCircle } from 'lucide-react';
import { SIMULATED_LOGS } from '../../data/portfolioData';
import { soundEngine } from './SoundController';

interface SplunkTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SplunkTerminalModal({ isOpen, onClose }: SplunkTerminalModalProps) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('index=os_security | stats count by src_ip, service');
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const filters = [
    { id: 'ALL', label: 'ALL LOGS' },
    { id: 'SSH_BRUTE_FORCE', label: 'SSH BRUTE FORCE' },
    { id: 'FIM_INTEGRITY_ALERT', label: 'FIM ALERT' },
    { id: 'SURICATA_PROBE', label: 'SURICATA IDS' },
    { id: 'CVE-2018-7600_ATTEMPT', label: 'DRUPAL RCE' },
    { id: 'IP_BLOCKED', label: 'ACTIVE RESPONSE' }
  ];

  const filteredLogs = SIMULATED_LOGS.filter((log) => {
    if (activeFilter !== 'ALL' && log.tag !== activeFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    // allow SPL filter or string match
    if (q.includes('stats') || q.includes('index=')) return true;
    return (
      log.msg.toLowerCase().includes(q) ||
      log.host.toLowerCase().includes(q) ||
      log.service.toLowerCase().includes(q) ||
      log.tag.toLowerCase().includes(q)
    );
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#030814] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] p-6 sm:p-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono-cyber text-emerald-400 mb-2">
          <Terminal className="w-4 h-4" />
          <span>SIMULATED SECURITY MONITORING & SPL CONSOLE</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h2 className="text-2xl font-heading font-bold text-white">
            Splunk & Wazuh Telemetry Inspector
          </h2>
          <span className="px-2.5 py-1 text-[10px] font-mono-cyber rounded bg-amber-950/60 border border-amber-500/40 text-amber-300">
            SIMULATED LAB DATA ONLY
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Test interactive queries, inspect parsed security alerts, and explore simulated brute-force correlation.
        </p>

        {/* Search Bar / SPL query input */}
        <div className="relative mb-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/80 border border-cyan-500/40 font-mono-cyber text-xs">
            <span className="text-cyan-400 font-bold shrink-0">SPL &gt;</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. index=os_security src_ip=185.220.* or filter keyword..."
              className="w-full bg-transparent text-cyan-200 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-[11px] font-mono-cyber text-slate-500 flex items-center gap-1">
            <Filter className="w-3 h-3" /> FILTER:
          </span>
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  soundEngine.playBlip(700, 0.03, 0.03);
                  setActiveFilter(f.id);
                }}
                className={`px-3 py-1 text-xs font-mono-cyber rounded-lg border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Log Stream Table */}
        <div className="space-y-2 mb-6 max-h-72 overflow-y-auto pr-1">
          {filteredLogs.map((log) => {
            const isSelected = selectedLogId === log.id;
            const isCritical = log.level === 'CRITICAL' || log.level === 'HIGH';
            const isAction = log.level === 'ACTION';

            return (
              <div
                key={log.id}
                onClick={() => {
                  soundEngine.playBlip(600, 0.03, 0.02);
                  setSelectedLogId(isSelected ? null : log.id);
                }}
                className={`p-3 rounded-xl border font-mono-cyber text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-[11px]">{log.time}</span>
                    <span className="text-slate-300 font-semibold">{log.host}</span>
                    <span className="text-slate-500">[{log.service}]</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCritical
                          ? 'bg-rose-950/60 border border-rose-500/50 text-rose-300'
                          : isAction
                          ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300'
                          : 'bg-amber-950/60 border border-amber-500/50 text-amber-300'
                      }`}
                    >
                      {log.level}
                    </span>
                    <span className="text-[10px] text-cyan-400">{log.tag}</span>
                  </div>
                </div>

                <div className="text-slate-300 text-xs break-all">{log.msg}</div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-cyan-200/90 bg-black/40 p-2.5 rounded-lg">
                    <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      SOC Triage & Response Notes:
                    </div>
                    {log.tag === 'SSH_BRUTE_FORCE' && (
                      <p>
                        Threshold rule triggered after 5 consecutive auth failures in 60s from 185.220.101.45. Automated active response playbook invoked firewall iptables drop.
                      </p>
                    )}
                    {log.tag === 'FIM_INTEGRITY_ALERT' && (
                      <p>
                        Syscheck daemon calculated SHA-1 digest delta on /etc/passwd. Host flagged for endpoint containment and user account diff auditing.
                      </p>
                    )}
                    {log.tag === 'SURICATA_PROBE' && (
                      <p>
                        Inbound TCP SYN packets to multiple consecutive ports without ACK completion. Signature matches Nmap stealth scan profile.
                      </p>
                    )}
                    {log.tag === 'CVE-2018-7600_ATTEMPT' && (
                      <p>
                        POST request targeted Drupal Ajax form API element handler with PHP code injection string. Web Application Firewall rule mapped.
                      </p>
                    )}
                    {log.tag === 'IP_BLOCKED' && (
                      <p>
                        Automated Wazuh active response script successfully appended drop rule to UFW. Duration set for 3600 seconds.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono-cyber text-slate-400">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Click on any event row to expand forensic triage analysis and automated remediation details.
          </span>
        </div>
      </div>
    </div>
  );
}
