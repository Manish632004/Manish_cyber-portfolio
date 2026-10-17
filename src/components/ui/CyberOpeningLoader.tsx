import { useState, useEffect, useCallback } from 'react';
import { Shield, Terminal, CheckCircle2, Cpu, Zap, Radio } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/portfolioData';

interface CyberOpeningLoaderProps {
  onComplete: () => void;
}

interface DiagnosticLog {
  threshold: number;
  time: string;
  text: string;
  tag: string;
}

const DIAGNOSTIC_LOGS: DiagnosticLog[] = [
  {
    threshold: 15,
    time: '00.12s',
    text: 'INITIALIZING KERNEL & THREAT TELEMETRY...',
    tag: 'OK'
  },
  {
    threshold: 35,
    time: '00.42s',
    text: 'INGESTING 3-VM SOC LAB (WAZUH • SURICATA • SPLUNK)...',
    tag: 'ONLINE'
  },
  {
    threshold: 55,
    time: '00.85s',
    text: 'ENFORCING SAFELINE WAF REVERSE PROXY (TLS 4096-BIT)...',
    tag: 'ARMED'
  },
  {
    threshold: 75,
    time: '01.28s',
    text: 'VERIFYING CREDENTIALS (CLLMSE • THM • TATA SIMULATION)...',
    tag: 'VERIFIED'
  },
  {
    threshold: 92,
    time: '01.65s',
    text: 'COMPILING MITRE ATT&CK DETECTIONS & ATTACK SURFACE...',
    tag: 'SYNCED'
  },
  {
    threshold: 100,
    time: '01.95s',
    text: 'SYSTEM DEFENSES OPERATIONAL // ACCESS AUTHORIZED',
    tag: 'GRANTED'
  }
];

export function CyberOpeningLoader({ onComplete }: CyberOpeningLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [revealedLogs, setRevealedLogs] = useState<DiagnosticLog[]>([]);

  // Smoothly complete the loading sequence and trigger exit animation
  const handleFinish = useCallback(() => {
    setIsExiting(true);
    const timer = setTimeout(() => {
      onComplete();
    }, 600); // 600ms exit transition
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Allow instant skip via Space or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape') {
        e.preventDefault();
        setProgress(100);
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Fast procedural increment counter
  useEffect(() => {
    if (isExiting) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random incremental ticks for authentic cyber terminal feel
        const jump = Math.floor(Math.random() * 3) + 1;
        const next = Math.min(100, prev + jump);
        return next;
      });
    }, 32);

    return () => clearInterval(interval);
  }, [isExiting]);

  // Reveal logs as progress passes milestones
  useEffect(() => {
    const matching = DIAGNOSTIC_LOGS.filter((l) => progress >= l.threshold);
    setRevealedLogs(matching);

    if (progress >= 100 && !isExiting) {
      const exitTimer = setTimeout(() => {
        handleFinish();
      }, 350);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, isExiting, handleFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 sm:p-10 bg-[#020408] select-none overflow-hidden transition-all duration-600 ease-out ${
        isExiting
          ? 'opacity-0 scale-105 blur-sm pointer-events-none'
          : 'opacity-100 scale-100 pointer-events-auto'
      }`}
    >
      {/* Background Cyber Grid & Laser Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none cyber-grid-pattern opacity-60" />
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 animate-scanline pointer-events-none" />

      {/* Top HUD Telemetry Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between text-[11px] font-mono-cyber text-slate-400 border-b border-cyan-500/15 pb-4 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SYS_ID: MK-2026-SOC</span>
          </div>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400">
            NODE: {PERSONAL_DATA.location.toUpperCase()}
          </span>
        </div>

        <button
          onClick={() => {
            setProgress(100);
            handleFinish();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 hover:text-cyan-200 transition-all cursor-pointer text-[10px] tracking-wider"
        >
          <span>BYPASS [SPACE]</span>
          <span>→</span>
        </button>
      </div>

      {/* Center Holographic Security Core */}
      <div className="w-full max-w-lg flex flex-col items-center text-center my-auto z-10 py-4">
        {/* Concentric Rotating Holographic Rings */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-6">
          {/* Outer dashed slow clockwise ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40 animate-spin [animation-duration:20s]" />
          
          {/* Inner counter-clockwise ring with cardinal tick markers */}
          <div className="absolute inset-3 rounded-full border border-slate-700/80 border-t-emerald-400 border-b-cyan-400 animate-spin [animation-duration:12s] [animation-direction:reverse]" />

          {/* Glowing pulse aura */}
          <div className="absolute inset-8 rounded-full bg-cyan-500/10 blur-xl animate-pulse" />

          {/* Central Shield Emblem */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#040916] border border-cyan-500/50 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(6,182,212,0.35)]">
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-cyan-300" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-cyan-300" />
            
            <Shield
              className={`w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 ${
                progress >= 100
                  ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] scale-110'
                  : 'text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]'
              }`}
            />
            
            <div className="mt-1 text-[10px] font-mono-cyber text-cyan-300/80 font-semibold tracking-wider">
              {progress >= 100 ? 'SECURE' : `${progress}%`}
            </div>
          </div>
        </div>

        {/* Identity & Subtitle */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-[11px] font-mono-cyber tracking-widest uppercase mb-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>INITIALIZING SECURITY OPERATIONS TERMINAL</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight">
            MANISH KUMAR
          </h1>
          
          <p className="text-xs sm:text-sm font-mono-cyber text-slate-300 tracking-wider mt-1">
            B.TECH CSE (2026) • SOC ANALYST (L1) • VAPT
          </p>
        </div>

        {/* High-Tech Progress Bar */}
        <div className="w-full space-y-2 mb-6">
          <div className="flex items-center justify-between text-xs font-mono-cyber">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>
                {progress < 30
                  ? 'BOOTING CORE SERVICES'
                  : progress < 65
                  ? 'ESTABLISHING SOC TELEMETRY'
                  : progress < 95
                  ? 'SYNCHRONIZING ATTACK GRAPHS'
                  : 'AUTHENTICATED // ACCESS GRANTED'}
              </span>
            </span>
            <span className="text-cyan-400 font-bold tracking-wider">
              {progress}%
            </span>
          </div>

          <div className="relative w-full h-2 rounded-full bg-slate-900 border border-slate-700/80 overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
            <div
              className={`h-full transition-all duration-150 ease-out ${
                progress >= 100
                  ? 'bg-gradient-to-r from-cyan-400 via-emerald-400 to-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.8)]'
                  : 'bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 4 Pipeline Stage Pips */}
          <div className="flex justify-between text-[9px] font-mono-cyber text-slate-500 px-0.5">
            <span className={progress >= 20 ? 'text-cyan-400 font-medium' : ''}>01 CORE</span>
            <span className={progress >= 50 ? 'text-cyan-400 font-medium' : ''}>02 SIEM</span>
            <span className={progress >= 75 ? 'text-cyan-400 font-medium' : ''}>03 WAF</span>
            <span className={progress >= 100 ? 'text-emerald-400 font-bold' : ''}>04 ARMED</span>
          </div>
        </div>

        {/* Live Diagnostics Log Window */}
        <div className="w-full rounded-xl bg-[#030814]/90 border border-slate-800 p-3 sm:p-4 text-left font-mono-cyber text-[11px] leading-relaxed shadow-xl">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>TERMINAL // BOOT_SEQUENCE.LOG</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            </div>
          </div>

          <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
            {revealedLogs.map((log, i) => (
              <div key={i} className="flex items-center justify-between gap-2 text-slate-300">
                <span className="truncate">
                  <span className="text-slate-500">[{log.time}]</span> {log.text}
                </span>
                <span className="shrink-0 text-emerald-400 font-semibold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {log.tag}
                </span>
              </div>
            ))}
            {progress < 100 && (
              <div className="text-cyan-400 animate-pulse flex items-center gap-1">
                <span>&gt; Ingesting packets</span>
                <span className="inline-block w-2 h-3 bg-cyan-400 animate-ping ml-0.5" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer Telemetry Bar */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono-cyber text-slate-500 border-t border-cyan-500/15 pt-4 z-10">
        <div>
          <span>DEFENSE LABS // 3-VM SOC • SAFELINE WAF • VULNHUB DC-1</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>SECURITY PROTOCOL MK-2026 OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}
