import { useEffect, useRef } from "react";

/**
 * CyberBackground — animated grid + network nodes + data packets + matrix rain.
 * All on a single canvas for performance. Respects reduced-motion.
 */
export function CyberBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = (canvas.width = window.innerWidth * devicePixelRatio);
    let h = (canvas.height = window.innerHeight * devicePixelRatio);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    const NODE_COUNT = window.innerWidth < 768 ? 18 : 36;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.15 * devicePixelRatio,
    }));

    type Packet = { from: number; to: number; t: number; speed: number };
    const packets: Packet[] = [];
    const spawnPacket = () => {
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      if (to === from) to = (to + 1) % nodes.length;
      packets.push({ from, to, t: 0, speed: 0.004 + Math.random() * 0.008 });
    };

    const matrixCols = Math.floor(window.innerWidth / 22);
    const drops = Array.from({ length: matrixCols }, () => Math.random() * -100);
    const chars = "01アイウエオカキクケコサシスセソタチツテト";

    const onResize = () => {
      w = canvas.width = window.innerWidth * devicePixelRatio;
      h = canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let frame = 0;
    const draw = () => {
      frame++;
      // fade
      ctx.fillStyle = "rgba(5,5,5,0.18)";
      ctx.fillRect(0, 0, w, h);

      // matrix rain (low opacity)
      ctx.font = `${12 * devicePixelRatio}px JetBrains Mono, monospace`;
      ctx.fillStyle = "rgba(0, 255, 65, 0.18)";
      for (let i = 0; i < drops.length; i++) {
        if (frame % 3 === 0) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(ch, i * 22 * devicePixelRatio, drops[i] * 16 * devicePixelRatio);
          drops[i]++;
          if (drops[i] * 16 > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
        }
      }

      // network nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      // edges
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          const max = 180 * devicePixelRatio;
          if (d < max) {
            const a = (1 - d / max) * 0.22;
            ctx.strokeStyle = `rgba(0, 229, 255, ${a})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      // node dots
      for (const n of nodes) {
        ctx.fillStyle = "rgba(0, 255, 65, 0.7)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }

      // packets
      if (!reduce && frame % 25 === 0 && packets.length < 14) spawnPacket();
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        if (p.t >= 1) {
          packets.splice(i, 1);
          continue;
        }
        const a = nodes[p.from];
        const b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = "rgba(0, 255, 65, 0.95)";
        ctx.shadowColor = "#00ff41";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, 2.2 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };
    if (!reduce) raf = requestAnimationFrame(draw);
    else {
      // single static paint
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <canvas ref={ref} className="absolute inset-0 opacity-70" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,65,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 10%, rgba(0,255,65,0.10), transparent 60%), radial-gradient(ellipse 50% 50% at 85% 25%, rgba(0,229,255,0.10), transparent 60%)",
        }}
      />
    </div>
  );
}

export default CyberBackground;
