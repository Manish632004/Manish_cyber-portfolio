import { motion } from "framer-motion";
import { ShieldCheck, Fingerprint } from "lucide-react";

export function IdentityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-[#00ff41]/30 bg-gradient-to-br from-black/80 via-[#020f08]/80 to-black/80 p-5 shadow-[0_0_50px_rgba(0,255,65,0.15)] backdrop-blur-md"
    >
      {/* hologram sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(0,229,255,0.18) 45%, rgba(0,255,65,0.12) 55%, transparent 70%)",
          animation: "holo-sweep 6s ease-in-out infinite",
        }}
      />
      <style>{`@keyframes holo-sweep{0%,100%{transform:translateX(-20%)}50%{transform:translateX(20%)}}`}</style>

      <div className="relative flex items-start justify-between">
        <div className="text-[10px] uppercase tracking-widest text-[#00e5ff]/80">
          // identity / mk-0427
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00ff41]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff41] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff41]" />
          </span>
          STATUS: ONLINE
        </div>
      </div>

      <div className="relative mt-4 flex items-center gap-4">
        <div className="relative grid h-16 w-16 place-items-center rounded-xl border border-[#00ff41]/40 bg-black/70">
          <Fingerprint className="h-8 w-8 text-[#00ff41]" />
          <div className="absolute inset-0 rounded-xl border border-[#00e5ff]/30" style={{ animation: "spin 8s linear infinite", borderStyle: "dashed" }} />
        </div>
        <div className="min-w-0">
          <div className="font-mono text-xl font-bold text-foreground">MANISH KUMAR</div>
          <div className="text-xs text-muted-foreground">ROLE: Cybersecurity Analyst</div>
          <div className="text-xs text-muted-foreground">MISSION: Secure Digital Assets</div>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-2 font-mono text-[11px]">
        <Field label="CLEARANCE" value="LEVEL 1" />
        <Field label="REGION" value="IN / GLOBAL" />
        <Field label="UPTIME" value="99.97%" />
      </div>

      <div className="relative mt-4 flex items-center gap-2 text-[11px] text-[#a7f3d0]/80">
        <ShieldCheck className="h-3.5 w-3.5 text-[#00ff41]" />
        verified — secure channel established
      </div>
    </motion.div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[#00ff41]/15 bg-black/40 px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-widest text-[#00e5ff]/70">{label}</div>
      <div className="text-[#00ff41]">{value}</div>
    </div>
  );
}

export default IdentityCard;
