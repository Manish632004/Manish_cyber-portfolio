import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Lock } from "lucide-react";

const STEPS = [
  "Accessing Secure Storage...",
  "Decrypting Document...",
  "Downloading Classified File...",
];

export function ResumeDownloadButton({
  href = "/resume.pdf",
  filename = "Manish-Kumar-Resume.pdf",
  className = "",
}: {
  href?: string;
  filename?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const start = () => {
    setStep(0);
    setOpen(true);
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setStep(i);
      if (i >= STEPS.length) {
        window.clearInterval(id);
        window.setTimeout(() => {
          const a = document.createElement("a");
          a.href = href;
          a.download = filename;
          a.rel = "noopener";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.setTimeout(() => setOpen(false), 600);
        }, 350);
      }
    }, 600);
  };

  return (
    <>
      <button
        onClick={start}
        className={`group inline-flex items-center justify-center gap-2 rounded-md border border-[#00ff41]/60 bg-[#00ff41]/10 px-5 py-2.5 font-mono text-sm font-semibold text-[#00ff41] transition-all hover:bg-[#00ff41]/20 hover:shadow-[0_0_24px_rgba(0,255,65,0.5)] ${className}`}
      >
        <Download className="h-4 w-4" />
        Download Resume
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[180] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-xl border border-[#00ff41]/40 bg-black/90 p-5 font-mono shadow-[0_0_60px_rgba(0,255,65,0.25)]"
            >
              <div className="flex items-center gap-2 text-xs text-[#00e5ff]">
                <Lock className="h-3.5 w-3.5" />
                SECURE TRANSFER PROTOCOL
              </div>
              <div className="mt-3 space-y-2 text-sm">
                {STEPS.map((s, i) => (
                  <div
                    key={s}
                    className={`flex items-center gap-2 transition-opacity ${
                      i < step ? "text-[#00ff41]" : i === step ? "text-[#a7f3d0]" : "opacity-30"
                    }`}
                  >
                    <span>{i < step ? "[OK]" : i === step ? "[..]" : "[  ]"}</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#00ff41]/15">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-gradient-to-r from-[#00ff41] to-[#00e5ff] shadow-[0_0_12px_rgba(0,255,65,0.6)]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ResumeDownloadButton;
