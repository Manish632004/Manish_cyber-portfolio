import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

type Toast = { id: number; title: string };

const SECTION_TITLES: Record<string, string> = {
  about: "Profile Decoded",
  stats: "Telemetry Online",
  skills: "Skills Analyzed",
  projects: "Projects Discovered",
  attack: "Attack Chain Mapped",
  terminal: "Shell Access Granted",
  certifications: "Credentials Verified",
  contact: "Channel Opened",
};

export function AchievementToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const fired = useRef(new Set<string>());
  const idRef = useRef(0);

  useEffect(() => {
    const targets = Object.keys(SECTION_TITLES)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = e.target.id;
          if (fired.current.has(id)) return;
          fired.current.add(id);
          const tid = ++idRef.current;
          setToasts((t) => [...t, { id: tid, title: SECTION_TITLES[id] }]);
          window.setTimeout(
            () => setToasts((t) => t.filter((x) => x.id !== tid)),
            3200,
          );
        });
      },
      { threshold: 0.35 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[150] flex w-72 flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-lg border border-[#00ff41]/30 bg-black/85 p-3 font-mono shadow-[0_0_30px_rgba(0,255,65,0.25)] backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-md border border-[#00ff41]/40 bg-[#00ff41]/10 text-[#00ff41]">
                <Trophy className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-[#00e5ff]">
                  Achievement Unlocked
                </div>
                <div className="text-sm font-semibold text-[#00ff41]">{t.title}</div>
              </div>
            </div>
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3.2, ease: "linear" }}
              className="mt-2 h-0.5 origin-left bg-[#00ff41]/70"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default AchievementToasts;
