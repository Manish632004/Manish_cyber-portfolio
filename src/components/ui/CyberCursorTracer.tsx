import { useEffect, useRef, useState, useCallback } from 'react';
import { soundEngine } from './SoundController';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  char?: string;
  color: string;
}

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

interface CyberCursorTracerProps {
  enabled?: boolean;
}

export function CyberCursorTracer({ enabled = true }: CyberCursorTracerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Precision mouse coordinates (instant, no lag)
  const mouseRef = useRef({ x: -100, y: -100, isVisible: false });
  // Trailing reticle coordinates (lerped)
  const reticleRef = useRef({ x: -100, y: -100 });

  // Cursor state
  const [cursorMode, setCursorMode] = useState<'normal' | 'target' | 'text'>('normal');
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  });
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Particles & Trail refs
  const trailRef = useRef<TrailPoint[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const lastMousePosRef = useRef({ x: 0, y: 0, time: 0 });
  const animFrameIdRef = useRef<number | null>(null);
  const reticleElRef = useRef<HTMLDivElement | null>(null);
  const dotElRef = useRef<HTMLDivElement | null>(null);
  const hudElRef = useRef<HTMLDivElement | null>(null);

  // Manage body cursor styling when active
  useEffect(() => {
    if (!enabled || isTouchDevice) {
      document.body.classList.remove('cyber-custom-cursor-active');
      return;
    }

    document.body.classList.add('cyber-custom-cursor-active');
    return () => {
      document.body.classList.remove('cyber-custom-cursor-active');
    };
  }, [enabled, isTouchDevice]);

  // Handle interactive element inspection under mouse
  const checkHoverTarget = useCallback((x: number, y: number) => {
    if (typeof document === 'undefined') return;
    const el = document.elementFromPoint(x, y);
    if (!el) {
      setCursorMode('normal');
      return;
    }

    // Text inputs
    const isText =
      el.tagName === 'INPUT' ||
      el.tagName === 'TEXTAREA' ||
      el.getAttribute('contenteditable') === 'true';

    if (isText) {
      setCursorMode('text');
      return;
    }

    // Interactive clickable targets
    const isClickable = Boolean(
      el.closest('button') ||
      el.closest('a') ||
      el.closest('[role="button"]') ||
      el.closest('.cursor-pointer') ||
      el.closest('[data-cursor="target"]') ||
      window.getComputedStyle(el).cursor === 'pointer'
    );

    setCursorMode((prev) => {
      if (isClickable && prev !== 'target') {
        soundEngine.playBlip(860, 0.02, 0.015);
        return 'target';
      } else if (!isClickable && prev === 'target') {
        return 'normal';
      }
      return isClickable ? 'target' : 'normal';
    });
  }, []);

  // Main canvas animation and physics loop
  useEffect(() => {
    if (!enabled || isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const binaryChars = ['0', '1', '·', '⌖', '⚡', '◈'];
    const cyberColors = [
      '#06b6d4', // Cyan
      '#22d3ee', // Light Cyan
      '#10b981', // Emerald
      '#34d399', // Light Emerald
      '#38bdf8'  // Sky Blue
    ];

    let lastFrameTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(32, time - lastFrameTime) / 1000;
      lastFrameTime = time;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const reticle = reticleRef.current;

      // 1. Lerp Reticle Position towards mouse
      if (mouse.isVisible) {
        const ease = 0.22;
        reticle.x += (mouse.x - reticle.x) * ease;
        reticle.y += (mouse.y - reticle.y) * ease;

        if (reticleElRef.current) {
          reticleElRef.current.style.transform = `translate3d(${reticle.x}px, ${reticle.y}px, 0)`;
        }
        if (dotElRef.current) {
          dotElRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
        }
        if (hudElRef.current) {
          hudElRef.current.style.transform = `translate3d(${reticle.x + 22}px, ${reticle.y + 18}px, 0)`;
        }
      }

      // 2. Render Laser Ribbon Trail
      const trail = trailRef.current;
      const now = performance.now();

      // Filter out points older than 450ms
      trailRef.current = trail.filter((pt) => now - pt.time < 450);

      if (trailRef.current.length > 2) {
        const points = trailRef.current;

        // Outer glow pass
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();

        // Inner sharp laser core pass
        ctx.save();
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const ageRatio = (now - p1.time) / 450;
          const alpha = Math.max(0, 1 - ageRatio);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Head is bright emerald/cyan, fading into deep cyan
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, `rgba(16, 185, 129, ${alpha * 0.9})`);
          grad.addColorStop(1, `rgba(6, 182, 212, ${alpha * 0.4})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(1, (1 - ageRatio) * 3);
          ctx.lineCap = 'round';
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. Render Cyber Particles (Data Sparks)
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        p.life += dt;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.life >= p.maxLife || p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.char) {
          // Digital hex/binary glyph
          ctx.font = `${Math.round(p.size)}px "JetBrains Mono", monospace`;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fillText(p.char, p.x, p.y);
        } else {
          // Glowing energy spark
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
        }
        ctx.restore();
      }

      // 4. Render EMP Radar Shockwaves (on click)
      const shockwaves = shockwavesRef.current;
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.15 + 1.2;
        sw.alpha -= 0.04;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 10;

        // Expanding circle
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();

        // 4 targeting tick notches on shockwave
        const tickLen = 6;
        ctx.beginPath();
        ctx.moveTo(sw.x - sw.radius - tickLen, sw.y);
        ctx.lineTo(sw.x - sw.radius + tickLen, sw.y);
        ctx.moveTo(sw.x + sw.radius - tickLen, sw.y);
        ctx.lineTo(sw.x + sw.radius + tickLen, sw.y);
        ctx.moveTo(sw.x, sw.y - sw.radius - tickLen);
        ctx.lineTo(sw.x, sw.y - sw.radius + tickLen);
        ctx.moveTo(sw.x, sw.y + sw.radius - tickLen);
        ctx.lineTo(sw.x, sw.y + sw.radius + tickLen);
        ctx.stroke();

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    // Mouse movement listener
    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();

      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.isVisible = true;

      // Update coordinates display
      setCoords({ x: Math.round(x), y: Math.round(y) });

      // Add to laser trail
      trailRef.current.push({ x, y, time: now });

      // Calculate velocity
      const last = lastMousePosRef.current;
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(1, now - last.time);
      const speed = dist / dt;

      // Spawn cyber spark particles when moving
      if (speed > 0.4 && particlesRef.current.length < 50) {
        const count = Math.min(3, Math.floor(speed * 1.5));
        for (let i = 0; i < count; i++) {
          const isChar = Math.random() < 0.35;
          const angle = Math.random() * Math.PI * 2;
          const sparkSpeed = Math.random() * 2 + 0.5;
          const color = cyberColors[Math.floor(Math.random() * cyberColors.length)];

          particlesRef.current.push({
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * sparkSpeed - (dx / dt) * 0.3,
            vy: Math.sin(angle) * sparkSpeed - (dy / dt) * 0.3,
            size: isChar ? Math.random() * 4 + 9 : Math.random() * 2.5 + 1.2,
            alpha: 1,
            life: 0,
            maxLife: Math.random() * 0.4 + 0.25,
            char: isChar ? binaryChars[Math.floor(Math.random() * binaryChars.length)] : undefined,
            color
          });
        }
      }

      lastMousePosRef.current = { x, y, time: now };

      // Inspect hover target
      checkHoverTarget(x, y);
    };

    // Click handler for shockwave
    const handlePointerDown = (e: PointerEvent) => {
      setIsClicking(true);
      soundEngine.playBlip(650, 0.03, 0.02);

      shockwavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 52,
        alpha: 0.9,
        color: '#22d3ee'
      });

      // Spawn burst of sparks
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const sparkSpeed = Math.random() * 3 + 2;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * sparkSpeed,
          vy: Math.sin(angle) * sparkSpeed,
          size: Math.random() * 2.5 + 1.5,
          alpha: 1,
          life: 0,
          maxLife: 0.45,
          color: i % 2 === 0 ? '#10b981' : '#06b6d4'
        });
      }
    };

    const handlePointerUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      mouseRef.current.isVisible = false;
    };

    const handleMouseEnter = () => {
      mouseRef.current.isVisible = true;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled, isTouchDevice, checkHoverTarget]);

  if (!enabled || isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Laser Ribbon Trail and Particle Canvas Overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[99990] transition-opacity duration-300"
      />

      {/* Instant Precision Center Dot (Follows exact pointer without lag) */}
      <div
        ref={dotElRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
      >
        <div
          className={`w-2 h-2 rounded-full transition-all duration-150 ${
            cursorMode === 'target'
              ? 'bg-emerald-400 scale-125 shadow-[0_0_10px_#10b981]'
              : cursorMode === 'text'
              ? 'bg-cyan-300 w-1 h-3.5 rounded-sm shadow-[0_0_8px_#22d3ee]'
              : 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]'
          } ${isClicking ? 'scale-75' : ''}`}
        />
      </div>

      {/* Trailing Cyber Reticle HUD (Smooth Lerped follower) */}
      <div
        ref={reticleElRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99995] will-change-transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
      >
        <div
          className={`relative transition-all duration-200 ease-out flex items-center justify-center ${
            cursorMode === 'target'
              ? 'w-14 h-14'
              : cursorMode === 'text'
              ? 'w-8 h-10'
              : 'w-10 h-10'
          } ${isClicking ? 'scale-90' : 'scale-100'}`}
        >
          {/* Default Scanning Crosshair Circle */}
          {cursorMode === 'normal' && (
            <div className="absolute inset-0 rounded-full border border-cyan-500/40 animate-[spin_12s_linear_infinite] shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              {/* 4 Corner Crosshair Notches */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0.5 h-1.5 bg-cyan-400" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0.5 h-1.5 bg-cyan-400" />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 h-0.5 w-1.5 bg-cyan-400" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 h-0.5 w-1.5 bg-cyan-400" />
            </div>
          )}

          {/* Interactive Target Lock Brackets [ + ] */}
          {cursorMode === 'target' && (
            <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
              {/* Corner targeting brackets */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400 shadow-[0_0_8px_#10b981]" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400 shadow-[0_0_8px_#10b981]" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400 shadow-[0_0_8px_#10b981]" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400 shadow-[0_0_8px_#10b981]" />

              {/* Pulsing Target Ring */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-emerald-400/50 animate-pulse" />
            </div>
          )}

          {/* Text Input I-Beam Brackets */}
          {cursorMode === 'text' && (
            <div className="absolute inset-0 flex items-center justify-between px-1">
              <span className="w-1.5 h-full border-t border-b border-l border-cyan-400 shadow-[0_0_8px_#06b6d4]" />
              <span className="w-1.5 h-full border-t border-b border-r border-cyan-400 shadow-[0_0_8px_#06b6d4]" />
            </div>
          )}
        </div>
      </div>

      {/* Floating Telemetry Coordinates HUD Pill */}
      <div
        ref={hudElRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99996] will-change-transform hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 border border-cyan-500/30 backdrop-blur-md shadow-lg text-[9px] font-mono-cyber tracking-wider select-none"
      >
        <span
          className={`w-1.5 h-1.5 rounded-full animate-ping ${
            cursorMode === 'target' ? 'bg-emerald-400' : 'bg-cyan-400'
          }`}
        />
        <span className="text-slate-400">
          X:<span className="text-cyan-300 ml-0.5">{String(coords.x).padStart(4, '0')}</span>
        </span>
        <span className="text-slate-400">
          Y:<span className="text-cyan-300 ml-0.5">{String(coords.y).padStart(4, '0')}</span>
        </span>
        <span
          className={`font-semibold ml-1 ${
            cursorMode === 'target'
              ? 'text-emerald-400'
              : cursorMode === 'text'
              ? 'text-cyan-300'
              : 'text-slate-400'
          }`}
        >
          {cursorMode === 'target' ? 'LOCK' : cursorMode === 'text' ? 'EDIT' : 'TRC'}
        </span>
      </div>
    </>
  );
}
