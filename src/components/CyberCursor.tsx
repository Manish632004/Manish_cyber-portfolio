import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Bit = { id: number; x: number; y: number; char: string };
type Particle = { id: number; x: number; y: number };

export function CyberCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reticle, setReticle] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [glitch, setGlitch] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });
  const trailX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const trailY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  const [bits, setBits] = useState<Bit[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastPos = useRef({ x: 0, y: 0, t: 0 });
  const idRef = useRef(0);
  const glitchTimer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mq.matches && !reduce.matches);
    update();
    mq.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cyber-cursor-active");
    return () => document.documentElement.classList.remove("cyber-cursor-active");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const now = performance.now();
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dt = Math.max(1, now - lastPos.current.t);
      const speed = Math.hypot(dx, dy) / dt;
      lastPos.current = { x: e.clientX, y: e.clientY, t: now };

      if (speed > 2.2) {
        setGlitch(true);
        if (glitchTimer.current) window.clearTimeout(glitchTimer.current);
        glitchTimer.current = window.setTimeout(() => setGlitch(false), 140);
      }

      if (speed > 0.4 && Math.random() < 0.5) {
        const pid = ++idRef.current;
        setParticles((p) => [...p, { id: pid, x: e.clientX, y: e.clientY }].slice(-18));
        window.setTimeout(() => setParticles((p) => p.filter((q) => q.id !== pid)), 600);
      }

      if (Math.random() < 0.04) {
        const bid = ++idRef.current;
        setBits((b) =>
          [
            ...b,
            {
              id: bid,
              x: e.clientX + (Math.random() * 40 - 20),
              y: e.clientY + (Math.random() * 40 - 20),
              char: Math.random() > 0.5 ? "1" : "0",
            },
          ].slice(-10),
        );
        window.setTimeout(() => setBits((b) => b.filter((q) => q.id !== bid)), 900);
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const isReticle = !!t.closest('[data-cursor="reticle"]');
      const isHover =
        isReticle ||
        !!t.closest(
          'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]',
        );
      setReticle(isReticle);
      setHovering(isHover);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const color = reticle ? "#00e5ff" : hovering ? "#22d3ee" : "#00ff41";
  const ringSize = reticle ? 72 : hovering ? 56 : 30;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        opacity: hidden ? 0 : 1,
        transition: "opacity 200ms",
        filter: glitch ? "url(#cyber-glitch) hue-rotate(15deg)" : "none",
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="cyber-glitch">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
          <feOffset dx="2" dy="0" result="r" />
          <feOffset dx="-2" dy="0" result="b" />
          <feBlend in="r" in2="b" mode="screen" />
        </filter>
      </svg>

      {/* Outer ring (or reticle frame) */}
      {!reticle && (
        <motion.div
          className="absolute top-0 left-0 rounded-full"
          style={{
            x: trailX,
            y: trailY,
            translateX: "-50%",
            translateY: "-50%",
            width: ringSize,
            height: ringSize,
            border: `1px solid ${color}`,
            boxShadow: `0 0 18px ${color}, inset 0 0 12px ${color}55`,
            background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
          }}
          animate={{ scale: pressed ? 0.8 : hovering ? [1, 1.08, 1] : 1 }}
          transition={{
            duration: hovering ? 1.4 : 0.2,
            repeat: hovering ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Reticle */}
      {reticle && (
        <motion.div
          className="absolute top-0 left-0"
          style={{
            x: trailX,
            y: trailY,
            translateX: "-50%",
            translateY: "-50%",
            width: ringSize,
            height: ringSize,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 72 72" width={ringSize} height={ringSize} style={{ overflow: "visible" }}>
            {[0, 90, 180, 270].map((a) => (
              <g key={a} transform={`rotate(${a} 36 36)`}>
                <path d="M36 2 L36 14" stroke={color} strokeWidth="1.5" />
                <path d="M30 2 L36 2 L36 8" fill="none" stroke={color} strokeWidth="1.5" />
              </g>
            ))}
            <circle cx="36" cy="36" r="22" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
            <circle cx="36" cy="36" r="2" fill={color} />
            <line x1="20" y1="36" x2="32" y2="36" stroke={color} strokeWidth="1" />
            <line x1="40" y1="36" x2="52" y2="36" stroke={color} strokeWidth="1" />
            <line x1="36" y1="20" x2="36" y2="32" stroke={color} strokeWidth="1" />
            <line x1="36" y1="40" x2="36" y2="52" stroke={color} strokeWidth="1" />
          </svg>
        </motion.div>
      )}

      {/* Radar sweep */}
      {!reticle && (
        <motion.div
          className="absolute top-0 left-0 rounded-full overflow-hidden"
          style={{
            x: trailX,
            y: trailY,
            translateX: "-50%",
            translateY: "-50%",
            width: ringSize + 16,
            height: ringSize + 16,
            opacity: hovering ? 0.9 : 0.3,
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, ${color}aa 30deg, transparent 80deg)`,
              borderRadius: "9999px",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: hovering ? 1.4 : 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {hovering && !reticle && (
        <motion.div
          className="absolute top-0 left-0 rounded-full"
          style={{
            x: trailX,
            y: trailY,
            translateX: "-50%",
            translateY: "-50%",
            border: `1px solid ${color}`,
          }}
          initial={{ width: ringSize, height: ringSize, opacity: 0.8 }}
          animate={{ width: ringSize + 40, height: ringSize + 40, opacity: 0 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      <motion.div
        className="absolute top-0 left-0 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        }}
      />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0 left-0 rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: 3,
            height: 3,
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2, y: -8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {bits.map((b) => (
        <motion.span
          key={b.id}
          className="absolute font-mono text-[10px] font-bold"
          style={{ left: b.x, top: b.y, color }}
          initial={{ opacity: 0.9, y: 0 }}
          animate={{ opacity: 0, y: -22 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {b.char}
        </motion.span>
      ))}
    </div>
  );
}

export default CyberCursor;
