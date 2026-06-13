import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

const STATS = [
  { label: "Projects Completed", value: 24, suffix: "+", hint: "Engagements shipped" },
  { label: "Security Labs Solved", value: 180, suffix: "+", hint: "THM / HTB / VulnHub" },
  { label: "Technologies Learned", value: 32, suffix: "", hint: "Tools & frameworks" },
  { label: "Certificates Earned", value: 6, suffix: "", hint: "Industry credentials" },
];

export function SocStats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="relative overflow-hidden rounded-xl border border-[#00ff41]/20 bg-black/40 p-4 backdrop-blur-md transition-colors hover:border-[#00ff41]/60"
        >
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#00e5ff]/80">
            <span>WIDGET / {String(i + 1).padStart(2, "0")}</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ff41]" />
              live
            </span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-[#00ff41] [text-shadow:0_0_18px_rgba(0,255,65,0.45)] sm:text-4xl">
            <Counter to={s.value} suffix={s.suffix} />
          </div>
          <div className="mt-1 text-sm font-medium text-foreground">{s.label}</div>
          <div className="text-xs text-muted-foreground">{s.hint}</div>
          <div className="pointer-events-none absolute -inset-px rounded-xl [background:linear-gradient(120deg,transparent_30%,rgba(0,255,65,0.08)_50%,transparent_70%)]" />
        </motion.div>
      ))}
    </div>
  );
}

export default SocStats;
