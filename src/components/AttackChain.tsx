import { motion } from "framer-motion";
import { Search, ListTree, ShieldAlert, Crosshair, FileText } from "lucide-react";

const STAGES = [
  { name: "Reconnaissance", desc: "Passive & active intel gathering", icon: Search },
  { name: "Enumeration", desc: "Service & asset discovery", icon: ListTree },
  { name: "Vulnerability Assessment", desc: "Identify & prioritize weaknesses", icon: ShieldAlert },
  { name: "Exploitation", desc: "Controlled proof-of-concept", icon: Crosshair },
  { name: "Reporting", desc: "Actionable remediation roadmap", icon: FileText },
];

export function AttackChain() {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00ff41]/40 to-transparent md:left-1/2 md:-translate-x-1/2" />
      <ol className="space-y-6">
        {STAGES.map((s, i) => {
          const Icon = s.icon;
          const left = i % 2 === 0;
          return (
            <motion.li
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative grid grid-cols-[3rem_1fr] gap-4 md:grid-cols-2 md:gap-12"
            >
              <div className="relative md:order-none">
                <div className="absolute left-0 top-2 flex h-12 w-12 items-center justify-center rounded-full border border-[#00ff41]/50 bg-black/80 text-[#00ff41] shadow-[0_0_18px_rgba(0,255,65,0.4)] md:left-1/2 md:-translate-x-1/2">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div
                className={`min-w-0 rounded-xl border border-[#00ff41]/15 bg-black/40 p-4 backdrop-blur-md md:p-5 ${
                  left ? "md:col-start-1 md:row-start-1 md:text-right" : "md:col-start-2 md:row-start-1"
                }`}
              >
                <div className="text-[10px] uppercase tracking-widest text-[#00e5ff]/80">
                  Phase {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 font-mono text-lg font-semibold text-[#00ff41]">
                  {s.name}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

export default AttackChain;
