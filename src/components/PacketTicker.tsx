import { useEffect, useState } from "react";

const EVENTS = [
  "TCP 443 → ACCEPTED",
  "HTTP GET /projects → 200",
  "DNS QUERY manishk.dev → OK",
  "TLS HANDSHAKE → secure",
  "THREAT LEVEL → LOW",
  "IDS RULE 1042 → MATCH",
  "ICMP ECHO → 12ms",
  "AUTH user=visitor → OK",
  "ARP CACHE → clean",
  "PORT 22 → FILTERED",
  "WAF BLOCK → sqli probe",
  "EDR SCAN → no findings",
];

export function PacketTicker() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 2000);
    return () => window.clearInterval(id);
  }, []);
  void tick;

  const items = [...EVENTS, ...EVENTS];

  return (
    <div className="relative overflow-hidden rounded-md border border-[#00ff41]/20 bg-black/60 backdrop-blur-md">
      <div className="flex items-center gap-2 border-r border-[#00ff41]/20 bg-black/80 px-3 py-2 text-[10px] uppercase tracking-widest text-[#00e5ff] absolute left-0 top-0 bottom-0 z-10">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ff41]" />
        Live Net
      </div>
      <div className="overflow-hidden py-2 pl-28">
        <div
          className="flex gap-8 whitespace-nowrap font-mono text-xs text-[#a7f3d0]/90"
          style={{ animation: "ticker 38s linear infinite" }}
        >
          {items.map((e, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-[#00ff41]">›</span>
              {e}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

export default PacketTicker;
