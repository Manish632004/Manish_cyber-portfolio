import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CyberCursor — futuristic hacker-themed custom cursor.
 * - Glowing ring + trailing dot
 * - Hover state on interactive elements: cyan + scanning ring + pulse
 * - Radar scan, occasional binary digits, particle trail
 * - Disabled on touch / coarse-pointer devices
 */
type Bit = { id: number; x: number; y: number; char: string };
type Particle = { id: number; x: number; y: number };

export function CyberCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);

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

  // Enable only on fine pointers
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

      // particles on motion
      if (speed > 0.4 && Math.random() < 0.5) {
        const pid = ++idRef.current;
        setParticles((p) =>
          [...p, { id: pid, x: e.clientX, y: e.clientY }].slice(-18),
        );
        window.setTimeout(
          () => setParticles((p) => p.filter((q) => q.id !== pid)),
          600,
        );
      }

      // occasional binary digits
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
        window.setTimeout(
          () => setBits((b) => b.filter((q) => q.id !== bid)),
          900,
        );
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setHovering(
        !!t.closest(
          'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]',
        ),
      );
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

  const color = hovering ? "#22d3ee" : "#00ff41";
  const ringSize = hovering ? 56 : 34;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 200ms" }}
    >
      {/* Outer glow ring */}
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
        animate={{
          scale: pressed ? 0.8 : hovering ? [1, 1.08, 1] : 1,
        }}
        transition={{
          duration: hovering ? 1.4 : 0.2,
          repeat: hovering ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Radar scanning sweep */}
      <motion.div
        className="absolute top-0 left-0 rounded-full overflow-hidden"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize + 16,
          height: ringSize + 16,
          opacity: hovering ? 0.9 : 0.35,
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

      {/* Scanning expanding ring on hover */}
      {hovering && (
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

      {/* Inner dot */}
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

      {/* Particle trail */}
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

      {/* Binary digits */}
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
