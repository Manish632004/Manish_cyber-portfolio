import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Initializing Security Environment...",
  "Loading Threat Intelligence...",
  "Checking Security Controls...",
  "Launching SOC Dashboard...",
  "Access Granted",
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      setShown((s) => [...s, LINES[i]]);
      i++;
      if (i >= LINES.length) {
        window.clearInterval(id);
        window.setTimeout(() => {
          setDone(true);
          onDone();
        }, 500);
      }
    }, 380);
    return () => window.clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-2xl px-6 font-mono text-sm sm:text-base">
            <div className="mb-4 flex items-center gap-2 text-xs text-[#00e5ff]/70">
              <span className="h-2 w-2 rounded-full bg-[#00ff41] shadow-[0_0_10px_#00ff41]" />
              SOC-OS v4.2.1 — secure boot
            </div>
            <div className="rounded-md border border-[#00ff41]/20 bg-black/60 p-4 backdrop-blur-sm shadow-[0_0_40px_rgba(0,255,65,0.15)]">
              {shown.map((line, i) => {
                const isLast = i === LINES.length - 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-2 py-0.5 ${isLast ? "text-[#00ff41]" : "text-[#a7f3d0]/90"}`}
                  >
                    <span className="text-[#00e5ff]">[OK]</span>
                    <span>{line}</span>
                  </motion.div>
                );
              })}
              <div className="mt-1 flex items-center gap-1 text-[#00ff41]">
                <span>$</span>
                <span className="inline-block h-4 w-2 animate-pulse bg-[#00ff41]" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BootSequence;
