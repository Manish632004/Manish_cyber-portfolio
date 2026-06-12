import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function SkillBar({
  name,
  level,
  delay = 0,
}: {
  name: string;
  level: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(level * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, level]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group relative overflow-hidden rounded-lg border border-[#00ff41]/15 bg-black/40 p-3 backdrop-blur-md transition-colors hover:border-[#00ff41]/60"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-mono text-foreground">{name}</span>
        <span className="font-mono text-[#00ff41]">{n}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#00ff41]/10">
        <div
          className="h-full bg-gradient-to-r from-[#00ff41] to-[#00e5ff] shadow-[0_0_10px_rgba(0,255,65,0.5)] transition-[width] duration-1000 ease-out"
          style={{ width: `${n}%` }}
        />
      </div>
      {/* scan line on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#00ff41]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </motion.div>
  );
}
