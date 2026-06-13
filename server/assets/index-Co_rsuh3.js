import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Search, ListTree, ShieldAlert, Crosshair, FileText, Fingerprint, ShieldCheck, Trophy, Download, Lock, GraduationCap, Briefcase, Calendar, MapPin, Award, Shield, ArrowRight, Mail, ExternalLink, Linkedin, Github, Globe, Cpu, Code2, Send } from "lucide-react";
function CyberBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = canvas.width = window.innerWidth * devicePixelRatio;
    let h = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    const NODE_COUNT = window.innerWidth < 768 ? 18 : 36;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.15 * devicePixelRatio
    }));
    const packets = [];
    const spawnPacket = () => {
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      if (to === from) to = (to + 1) % nodes.length;
      packets.push({ from, to, t: 0, speed: 4e-3 + Math.random() * 8e-3 });
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
      ctx.fillStyle = "rgba(5,5,5,0.18)";
      ctx.fillRect(0, 0, w, h);
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
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
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
      for (const n of nodes) {
        ctx.fillStyle = "rgba(0, 255, 65, 0.7)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
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
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]", children: [
    /* @__PURE__ */ jsx("canvas", { ref, className: "absolute inset-0 opacity-70" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.18]",
        style: {
          backgroundImage: "linear-gradient(rgba(0,255,65,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%)"
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          background: "radial-gradient(ellipse 60% 50% at 20% 10%, rgba(0,255,65,0.10), transparent 60%), radial-gradient(ellipse 50% 50% at 85% 25%, rgba(0,229,255,0.10), transparent 60%)"
        }
      }
    )
  ] });
}
const LINES = [
  "Initializing Security Environment...",
  "Loading Threat Intelligence...",
  "Checking Security Controls...",
  "Launching SOC Dashboard...",
  "Access Granted"
];
function BootSequence({ onDone }) {
  const [shown, setShown] = useState([]);
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
  return /* @__PURE__ */ jsx(AnimatePresence, { children: !done && /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]",
      initial: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
      children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl px-6 font-mono text-sm sm:text-base", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2 text-xs text-[#00e5ff]/70", children: [
          /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-[#00ff41] shadow-[0_0_10px_#00ff41]" }),
          "SOC-OS v4.2.1 — secure boot"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-[#00ff41]/20 bg-black/60 p-4 backdrop-blur-sm shadow-[0_0_40px_rgba(0,255,65,0.15)]", children: [
          shown.map((line, i) => {
            const isLast = i === LINES.length - 1;
            return /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -8 },
                animate: { opacity: 1, x: 0 },
                className: `flex items-center gap-2 py-0.5 ${isLast ? "text-[#00ff41]" : "text-[#a7f3d0]/90"}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[#00e5ff]", children: "[OK]" }),
                  /* @__PURE__ */ jsx("span", { children: line })
                ]
              },
              i
            );
          }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-1 text-[#00ff41]", children: [
            /* @__PURE__ */ jsx("span", { children: "$" }),
            /* @__PURE__ */ jsx("span", { className: "inline-block h-4 w-2 animate-pulse bg-[#00ff41]" })
          ] })
        ] })
      ] })
    }
  ) });
}
const HELP = `Available commands:
  help            - show this menu
  about           - bio & background
  skills          - technical skill matrix
  projects        - featured engagements
  resume          - download CV
  contact         - reach out
  certifications  - industry credentials
  clear           - clear terminal`;
const RESPONSES = {
  help: HELP,
  about: "Manish Kumar — Cybersecurity Analyst & Security Researcher.\nFocus: SOC operations, threat hunting, OSINT, vulnerability assessment.",
  skills: "Web Sec | Network Sec | Linux | Python | OSINT | Vuln Assessment | Incident Response",
  projects: "Scroll to #projects, or visit GitHub. Featured: SIEM tuning, AD pentest lab, phishing triage automation.",
  resume: "Triggering secure download... use the Resume button in the hero.",
  contact: "Email: manish@secops.dev  |  LinkedIn: /in/manishkumar  |  GitHub: /manishk-sec",
  certifications: "CEH (in progress), CompTIA Security+, TryHackMe Top 1%, HTB CPTS track"
};
function InteractiveTerminal() {
  const [lines, setLines] = useState([
    { kind: "out", text: "soc@manish ~ % type 'help' to begin." }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines]);
  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const reply = RESPONSES[cmd] ?? `command not found: ${cmd}  — try 'help'`;
    setLines((l) => [
      ...l,
      { kind: "in", text: raw },
      { kind: "out", text: reply }
    ]);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => inputRef.current?.focus(),
      className: "group rounded-xl border border-[#00ff41]/25 bg-black/70 font-mono text-sm shadow-[0_0_40px_rgba(0,255,65,0.10)] backdrop-blur-md",
      "data-cursor": "hover",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-b border-[#00ff41]/15 px-4 py-2 text-xs text-[#a7f3d0]/80", children: [
          /* @__PURE__ */ jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-red-500/80" }),
          /* @__PURE__ */ jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-yellow-400/80" }),
          /* @__PURE__ */ jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-[#00ff41]/90" }),
          /* @__PURE__ */ jsx("span", { className: "ml-3 truncate", children: "manish@soc — bash — 80×24" }),
          /* @__PURE__ */ jsx("span", { className: "ml-auto text-[#00e5ff]/70", children: "interactive" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "h-72 overflow-y-auto px-4 py-3 text-[#d1fae5]", children: [
          lines.map((l, i) => /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap leading-relaxed", children: l.kind === "in" ? /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#00ff41]", children: "soc@manish" }),
            /* @__PURE__ */ jsx("span", { className: "text-[#a7f3d0]/70", children: ":~$ " }),
            l.text
          ] }) : /* @__PURE__ */ jsx("div", { className: "text-[#a7f3d0]/95", children: l.text }) }, i)),
          /* @__PURE__ */ jsxs(
            "form",
            {
              onSubmit: (e) => {
                e.preventDefault();
                run(input);
                setInput("");
              },
              className: "mt-1 flex items-center",
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#00ff41]", children: "soc@manish" }),
                /* @__PURE__ */ jsx("span", { className: "text-[#a7f3d0]/70", children: ":~$ " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    ref: inputRef,
                    value: input,
                    onChange: (e) => setInput(e.target.value),
                    className: "flex-1 bg-transparent text-[#d1fae5] caret-[#00ff41] outline-none",
                    spellCheck: false,
                    autoComplete: "off",
                    "aria-label": "terminal input"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-1 inline-block h-4 w-2 animate-pulse bg-[#00ff41]" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { ref: endRef })
        ] })
      ]
    }
  );
}
function Counter({ to, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return /* @__PURE__ */ jsxs("span", { ref, className: "tabular-nums", children: [
    n,
    suffix
  ] });
}
const STATS = [
  { label: "Projects Completed", value: 10, suffix: "+", hint: "Engagements shipped" },
  { label: "Security Labs Solved", value: 80, suffix: "+", hint: "THM / PortSwigger" },
  { label: "Technologies Learned", value: 20, suffix: "+", hint: "Tools & frameworks" },
  { label: "Certificates Earned", value: 4, suffix: "", hint: "Industry credentials" }
];
function SocStats() {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4", children: STATS.map((s, i) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-40px" },
      transition: { duration: 0.5, delay: i * 0.08 },
      className: "relative overflow-hidden rounded-xl border border-[#00ff41]/20 bg-black/40 p-4 backdrop-blur-md transition-colors hover:border-[#00ff41]/60",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10px] uppercase tracking-widest text-[#00e5ff]/80", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "WIDGET / ",
            String(i + 1).padStart(2, "0")
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ff41]" }),
            "live"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 font-mono text-3xl font-bold text-[#00ff41] [text-shadow:0_0_18px_rgba(0,255,65,0.45)] sm:text-4xl", children: /* @__PURE__ */ jsx(Counter, { to: s.value, suffix: s.suffix }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm font-medium text-foreground", children: s.label }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: s.hint }),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -inset-px rounded-xl [background:linear-gradient(120deg,transparent_30%,rgba(0,255,65,0.08)_50%,transparent_70%)]" })
      ]
    },
    s.label
  )) });
}
const STAGES = [
  { name: "Reconnaissance", desc: "Passive & active intel gathering", icon: Search },
  { name: "Enumeration", desc: "Service & asset discovery", icon: ListTree },
  { name: "Vulnerability Assessment", desc: "Identify & prioritize weaknesses", icon: ShieldAlert },
  { name: "Exploitation", desc: "Controlled proof-of-concept", icon: Crosshair },
  { name: "Reporting", desc: "Actionable remediation roadmap", icon: FileText }
];
function AttackChain() {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00ff41]/40 to-transparent md:left-1/2 md:-translate-x-1/2" }),
    /* @__PURE__ */ jsx("ol", { className: "space-y-6", children: STAGES.map((s, i) => {
      const Icon = s.icon;
      const left = i % 2 === 0;
      return /* @__PURE__ */ jsxs(
        motion.li,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay: i * 0.08 },
          className: "relative grid grid-cols-[3rem_1fr] gap-4 md:grid-cols-2 md:gap-12",
          children: [
            /* @__PURE__ */ jsx("div", { className: "relative md:order-none", children: /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-2 flex h-12 w-12 items-center justify-center rounded-full border border-[#00ff41]/50 bg-black/80 text-[#00ff41] shadow-[0_0_18px_rgba(0,255,65,0.4)] md:left-1/2 md:-translate-x-1/2", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }) }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `min-w-0 rounded-xl border border-[#00ff41]/15 bg-black/40 p-4 backdrop-blur-md md:p-5 ${left ? "md:col-start-1 md:row-start-1 md:text-right" : "md:col-start-2 md:row-start-1"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-[10px] uppercase tracking-widest text-[#00e5ff]/80", children: [
                    "Phase ",
                    String(i + 1).padStart(2, "0")
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 font-mono text-lg font-semibold text-[#00ff41]", children: s.name }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: s.desc })
                ]
              }
            )
          ]
        },
        s.name
      );
    }) })
  ] });
}
function IdentityCard() {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true, margin: "-40px" },
      transition: { duration: 0.6 },
      className: "relative overflow-hidden rounded-2xl border border-[#00ff41]/30 bg-gradient-to-br from-black/80 via-[#020f08]/80 to-black/80 p-5 shadow-[0_0_50px_rgba(0,255,65,0.15)] backdrop-blur-md",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 opacity-40",
            style: {
              background: "linear-gradient(115deg, transparent 30%, rgba(0,229,255,0.18) 45%, rgba(0,255,65,0.12) 55%, transparent 70%)",
              animation: "holo-sweep 6s ease-in-out infinite"
            }
          }
        ),
        /* @__PURE__ */ jsx("style", { children: `@keyframes holo-sweep{0%,100%{transform:translateX(-20%)}50%{transform:translateX(20%)}}` }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-start justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-widest text-[#00e5ff]/80", children: "// identity / mk-0427" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-mono text-[#00ff41]", children: [
            /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff41] opacity-70" }),
              /* @__PURE__ */ jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-[#00ff41]" })
            ] }),
            "STATUS: ONLINE"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-4 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative grid h-16 w-16 place-items-center rounded-xl border border-[#00ff41]/40 bg-black/70", children: [
            /* @__PURE__ */ jsx(Fingerprint, { className: "h-8 w-8 text-[#00ff41]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-xl border border-[#00e5ff]/30", style: { animation: "spin 8s linear infinite", borderStyle: "dashed" } })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "font-mono text-xl font-bold text-foreground", children: "MANISH KUMAR" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "ROLE: Cybersecurity Analyst" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "MISSION: Secure Digital Assets" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-5 grid grid-cols-3 gap-2 font-mono text-[11px]", children: [
          /* @__PURE__ */ jsx(Field$1, { label: "CLEARANCE", value: "LEVEL 1" }),
          /* @__PURE__ */ jsx(Field$1, { label: "REGION", value: "IN / GLOBAL" }),
          /* @__PURE__ */ jsx(Field$1, { label: "UPTIME", value: "99.97%" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-4 flex items-center gap-2 text-[11px] text-[#a7f3d0]/80", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-[#00ff41]" }),
          "verified — secure channel established"
        ] })
      ]
    }
  );
}
function Field$1({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-[#00ff41]/15 bg-black/40 px-2 py-1.5", children: [
    /* @__PURE__ */ jsx("div", { className: "text-[9px] uppercase tracking-widest text-[#00e5ff]/70", children: label }),
    /* @__PURE__ */ jsx("div", { className: "text-[#00ff41]", children: value })
  ] });
}
const SECTION_TITLES = {
  about: "Profile Decoded",
  stats: "Telemetry Online",
  skills: "Skills Analyzed",
  projects: "Projects Discovered",
  attack: "Attack Chain Mapped",
  terminal: "Shell Access Granted",
  certifications: "Credentials Verified",
  contact: "Channel Opened"
};
function AchievementToasts() {
  const [toasts, setToasts] = useState([]);
  const fired = useRef(/* @__PURE__ */ new Set());
  const idRef = useRef(0);
  useEffect(() => {
    const targets = Object.keys(SECTION_TITLES).map((id) => document.getElementById(id)).filter((el) => !!el);
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
            3200
          );
        });
      },
      { threshold: 0.35 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed bottom-4 right-4 z-[150] flex w-72 flex-col gap-2", children: /* @__PURE__ */ jsx(AnimatePresence, { children: toasts.map((t) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 40, scale: 0.95 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 40, scale: 0.95 },
      transition: { duration: 0.3 },
      className: "overflow-hidden rounded-lg border border-[#00ff41]/30 bg-black/85 p-3 font-mono shadow-[0_0_30px_rgba(0,255,65,0.25)] backdrop-blur-md",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "grid h-9 w-9 place-items-center rounded-md border border-[#00ff41]/40 bg-[#00ff41]/10 text-[#00ff41]", children: /* @__PURE__ */ jsx(Trophy, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-widest text-[#00e5ff]", children: "Achievement Unlocked" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-[#00ff41]", children: t.title })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scaleX: 1 },
            animate: { scaleX: 0 },
            transition: { duration: 3.2, ease: "linear" },
            className: "mt-2 h-0.5 origin-left bg-[#00ff41]/70"
          }
        )
      ]
    },
    t.id
  )) }) });
}
const EVENTS = [
  "TCP 443 → ACCEPTED",
  "HTTP GET /projects → 200",
  "DNS QUERY manishk.dev → OK",
  "TLS HANDSHAKE → secure",
  "THREAT LEVEL → LOW",
  "IDS RULE 1042 → MATCH",
  "ICMP ECHO → 12ms",
  "AUTH user=visitor → OK",
  "ARP CACHE → clean",
  "PORT 22 → FILTERED",
  "WAF BLOCK → sqli probe",
  "EDR SCAN → no findings"
];
function PacketTicker() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 2e3);
    return () => window.clearInterval(id);
  }, []);
  const items = [...EVENTS, ...EVENTS];
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-md border border-[#00ff41]/20 bg-black/60 backdrop-blur-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-r border-[#00ff41]/20 bg-black/80 px-3 py-2 text-[10px] uppercase tracking-widest text-[#00e5ff] absolute left-0 top-0 bottom-0 z-10", children: [
      /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ff41]" }),
      "Live Net"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden py-2 pl-28", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex gap-8 whitespace-nowrap font-mono text-xs text-[#a7f3d0]/90",
        style: { animation: "ticker 38s linear infinite" },
        children: items.map((e, i) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#00ff41]", children: "›" }),
          e
        ] }, i))
      }
    ) }),
    /* @__PURE__ */ jsx("style", { children: `@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}` })
  ] });
}
const resume = "/assets/resume-DbjOYSn2.pdf";
const STEPS = [
  "Accessing Secure Storage...",
  "Decrypting Document...",
  "Downloading Classified File..."
];
function ResumeDownloadButton({
  href = resume,
  filename = "resume.pdf",
  className = ""
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: start,
        className: `group inline-flex items-center justify-center gap-2 rounded-md border border-[#00ff41]/60 bg-[#00ff41]/10 px-5 py-2.5 font-mono text-sm font-semibold text-[#00ff41] transition-all hover:bg-[#00ff41]/20 hover:shadow-[0_0_24px_rgba(0,255,65,0.5)] ${className}`,
        children: [
          /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
          "Download Resume"
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[180] flex items-center justify-center bg-black/70 backdrop-blur-sm",
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.95, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.95, opacity: 0 },
            className: "w-full max-w-md rounded-xl border border-[#00ff41]/40 bg-black/90 p-5 font-mono shadow-[0_0_60px_rgba(0,255,65,0.25)]",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-[#00e5ff]", children: [
                /* @__PURE__ */ jsx(Lock, { className: "h-3.5 w-3.5" }),
                "SECURE TRANSFER PROTOCOL"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2 text-sm", children: STEPS.map((s, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `flex items-center gap-2 transition-opacity ${i < step ? "text-[#00ff41]" : i === step ? "text-[#a7f3d0]" : "opacity-30"}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { children: i < step ? "[OK]" : i === step ? "[..]" : "[  ]" }),
                    /* @__PURE__ */ jsx("span", { children: s })
                  ]
                },
                s
              )) }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 h-1.5 overflow-hidden rounded-full bg-[#00ff41]/15", children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { width: "0%" },
                  animate: { width: `${step / STEPS.length * 100}%` },
                  transition: { duration: 0.4 },
                  className: "h-full bg-gradient-to-r from-[#00ff41] to-[#00e5ff] shadow-[0_0_12px_rgba(0,255,65,0.6)]"
                }
              ) })
            ]
          }
        )
      }
    ) })
  ] });
}
const PROJECTS = [{
  title: "SIEM Alert Triage Pipeline",
  summary: "Custom rules + Python automation for Wazuh/ELK reducing analyst MTTR by 42%.",
  stack: ["Wazuh", "ELK", "Python", "Sigma"],
  status: "PROD"
}, {
  title: "Active Directory Pentest Lab",
  summary: "End-to-end AD attack chain — Kerberoasting, AS-REP, NTLM relay — documented w/ mitigations.",
  stack: ["Impacket", "BloodHound", "CrackMapExec"],
  status: "LAB"
}, {
  title: "Phishing URL Classifier",
  summary: "OSINT + ML pipeline scoring URLs against threat-intel feeds, exposed as a REST API.",
  stack: ["Python", "FastAPI", "VirusTotal"],
  status: "OSS"
}, {
  title: "Web App Vulnerability Report",
  summary: "Black-box assessment uncovering IDOR, SSRF, and broken auth chains for a fintech client.",
  stack: ["Burp Suite", "OWASP", "Nuclei"],
  status: "ENG"
}];
const CERTS = [{
  name: "SOC Level 1",
  issuer: "Try Hack Me",
  year: "in progress"
}, {
  name: "Cyber Security 101",
  issuer: "Try Hack Me",
  year: "2026"
}, {
  name: "Pre Security",
  issuer: "Try Hack Me",
  year: "2026"
}, {
  name: "Fundamentals of Deep Learning",
  issuer: "NVIDIA",
  year: "2025"
}];
const EDUCATION = [{
  degree: "B.Tech in Computer Science",
  school: "Govt. Engineering College Bharatpur",
  year: "2026",
  detail: "CGPA: 7.5"
}, {
  degree: "12th RBSE Board",
  school: "Vivekanand Sr. Sec. School",
  year: "2022",
  detail: "Percentage: 81.2%"
}];
const EXPERIENCE = [{
  role: "Cybersecurity Trainee",
  company: "Rajasthan Centre of Advanced Technology (RCAT)",
  location: "Jaipur (Rajasthan)",
  duration: "May 2026 – July 2026",
  description: "Gained hands-on experience in cybersecurity operations, network security, vulnerability assessment, and security monitoring through practical labs and real-world security scenarios. Worked with industry-standard tools for reconnaissance, web application security testing, log analysis, and incident investigation while developing a strong foundation in ethical hacking, Linux administration, and security best practices.",
  tech: ["Linux", "Ethical Hacking", "Network Security", "SIEM Fundamentals", "Wireshark", "Nmap", "Burp Suite"]
}, {
  role: "Web Developer Intern",
  company: "IQUINCESOFT",
  location: "Mathura (UP)",
  duration: "May 2025 – July 2025",
  description: "Contributed to the design and development of Bariks, a responsive web-based platform focused on enhancing user experience for a health-tech solution involving Hyperbaric Oxygen Therapy (HBOT). Led the front-end development using HTML, CSS, JavaScript, React.js, and Express.js, ensuring a smooth and intuitive interface that performed seamlessly across both desktop and mobile devices.",
  tech: ["HTML", "CSS", "JavaScript", "React.js", "Express.js"]
}];
function Portfolio() {
  const [booted, setBooted] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen text-foreground", children: [
    /* @__PURE__ */ jsx(CyberBackground, {}),
    /* @__PURE__ */ jsx(BootSequence, { onDone: () => setBooted(true) }),
    booted && /* @__PURE__ */ jsx(AchievementToasts, {}),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsxs(Section, { id: "stats", tag: "telemetry", title: "SOC Telemetry", children: [
        /* @__PURE__ */ jsx(SocStats, {}),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(PacketTicker, {}) })
      ] }),
      /* @__PURE__ */ jsx(Section, { id: "about", tag: "about", title: "About the Operator", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 16
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          duration: 0.5
        }, className: "space-y-4 text-base leading-relaxed text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "I'm ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "Manish Kumar" }),
            ", a cybersecurity analyst focused on defending modern enterprises against real-world adversaries. My day-to-day spans SOC operations, threat hunting, and adversary emulation — translating noisy telemetry into decisive action."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "I love the discipline of digital forensics, the creativity of OSINT, and the rigor of vulnerability assessment. I build tooling in Python, tune SIEM detections, and write reports engineers actually want to read." }),
          /* @__PURE__ */ jsxs("p", { className: "font-mono text-sm text-[#a7f3d0]/80", children: [
            ">",
            " mission: protect users, harden systems, share knowledge."
          ] })
        ] }),
        /* @__PURE__ */ jsx(IdentityCard, {})
      ] }) }),
      /* @__PURE__ */ jsx(Section, { id: "education", tag: "education", title: "Academic Record", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: EDUCATION.map((edu, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.5,
        delay: i * 0.08
      }, className: "group relative overflow-hidden rounded-xl border border-[#00ff41]/20 bg-black/50 p-5 backdrop-blur-md transition-all hover:border-[#00ff41]/70 hover:shadow-[0_0_40px_rgba(0,255,65,0.2)]", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px translate-y-0 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
        /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(GraduationCap, { className: "h-5 w-5 text-[#00ff41]" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-[#00e5ff]", children: edu.year })
        ] }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 text-base font-semibold text-foreground", children: edu.degree }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: edu.school }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 inline-flex items-center rounded-sm border border-[#00ff41]/30 bg-[#00ff41]/5 px-2 py-0.5 font-mono text-[11px] text-[#00ff41]", children: edu.detail })
      ] }, edu.degree)) }) }),
      /* @__PURE__ */ jsx(Section, { id: "experience", tag: "experience", title: "Field Operations", children: /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-3", children: EXPERIENCE.map((exp, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.5,
        delay: i * 0.08
      }, className: "group relative overflow-hidden rounded-xl border border-[#00e5ff]/20 bg-black/50 p-5 backdrop-blur-md transition-all hover:border-[#00e5ff]/70 hover:shadow-[0_0_40px_rgba(0,229,255,0.2)]", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px translate-y-0 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg border border-[#00e5ff]/30 bg-[#00e5ff]/5", children: /* @__PURE__ */ jsx(Briefcase, { className: "h-5 w-5 text-[#00e5ff]" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-foreground", children: exp.role }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-[#00ff41]", children: exp.company })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 font-mono text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3 text-[#00e5ff]" }),
              exp.duration
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3 text-[#00e5ff]" }),
              exp.location
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: exp.description }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: exp.tech.map((t) => /* @__PURE__ */ jsx("span", { className: "rounded-sm border border-[#00e5ff]/20 bg-[#00e5ff]/5 px-2 py-0.5 font-mono text-[11px] text-[#a7f3d0]/90", children: t }, t)) })
      ] }, exp.company)) }) }),
      /* @__PURE__ */ jsxs(Section, { id: "terminal", tag: "shell", title: "Interactive Terminal", children: [
        /* @__PURE__ */ jsxs("p", { className: "mb-4 text-sm text-muted-foreground", children: [
          "Try: ",
          /* @__PURE__ */ jsx("code", { className: "font-mono text-[#00ff41]", children: "help" }),
          ",",
          " ",
          /* @__PURE__ */ jsx("code", { className: "font-mono text-[#00ff41]", children: "about" }),
          ",",
          " ",
          /* @__PURE__ */ jsx("code", { className: "font-mono text-[#00ff41]", children: "skills" }),
          ",",
          " ",
          /* @__PURE__ */ jsx("code", { className: "font-mono text-[#00ff41]", children: "projects" }),
          "."
        ] }),
        /* @__PURE__ */ jsx(InteractiveTerminal, {})
      ] }),
      /* @__PURE__ */ jsx(Section, { id: "projects", tag: "projects", title: "Featured Engagements", children: /* @__PURE__ */ jsx("div", { className: "grid gap-5 sm:grid-cols-2", children: PROJECTS.map((p, i) => /* @__PURE__ */ jsx(ProjectCard, { p, idx: i }, p.title)) }) }),
      /* @__PURE__ */ jsx(Section, { id: "attack", tag: "methodology", title: "Attack Chain", children: /* @__PURE__ */ jsx(AttackChain, {}) }),
      /* @__PURE__ */ jsx(Section, { id: "certifications", tag: "credentials", title: "Certifications", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: CERTS.map((c, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.4,
        delay: i * 0.06
      }, className: "rounded-xl border border-[#00ff41]/15 bg-black/40 p-4 backdrop-blur-md transition-colors hover:border-[#00ff41]/60", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsx(Award, { className: "h-6 w-6 text-[#00ff41]" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-[#00e5ff]", children: c.year })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 text-sm font-semibold", children: c.name }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: c.issuer })
      ] }, c.name)) }) }),
      /* @__PURE__ */ jsx(Section, { id: "contact", tag: "contact", title: "Secure Channel", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_1fr]", children: [
        /* @__PURE__ */ jsx(ContactPanel, {}),
        /* @__PURE__ */ jsx(ContactForm, {})
      ] }) }),
      /* @__PURE__ */ jsxs("footer", { className: "mt-20 border-t border-[#00ff41]/15 py-8 text-center font-mono text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          "// session — ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " — manish@soc:~$"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1", children: "All systems nominal. Built with intent." })
      ] })
    ] })
  ] });
}
function Nav() {
  const links = [["about", "About"], ["education", "Education"], ["experience", "Experience"], ["skills", "Skills"], ["projects", "Projects"], ["terminal", "Shell"], ["contact", "Contact"]];
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 border-b border-[#00ff41]/15 bg-[#050505]/80 backdrop-blur-md", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("a", { href: "#top", className: "flex items-center gap-2 font-mono text-sm", children: [
      /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4 text-[#00ff41]" }),
      /* @__PURE__ */ jsx("span", { className: "text-[#00ff41]", children: "manish@soc" }),
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: ":~$" }),
      /* @__PURE__ */ jsx("span", { className: "ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-[#00ff41]" })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "hidden gap-1 md:flex", children: links.map(([id, label]) => /* @__PURE__ */ jsxs("a", { href: `#${id}`, className: "rounded-md px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-[#00ff41]/10 hover:text-[#00ff41]", children: [
      "./",
      label.toLowerCase()
    ] }, id)) })
  ] }) });
}
function Hero() {
  return /* @__PURE__ */ jsxs("section", { id: "top", className: "relative pt-14 pb-20 sm:pt-20 sm:pb-28", children: [
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 12
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.6,
      delay: 0.1
    }, className: "inline-flex items-center gap-2 rounded-full border border-[#00ff41]/30 bg-black/50 px-3 py-1 font-mono text-xs text-[#00ff41] backdrop-blur-md", children: [
      /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff41] opacity-70" }),
        /* @__PURE__ */ jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-[#00ff41]" })
      ] }),
      "ONLINE — accepting engagements"
    ] }),
    /* @__PURE__ */ jsxs(motion.h1, { initial: {
      opacity: 0,
      y: 16
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.7,
      delay: 0.25
    }, className: "mt-5 font-mono text-5xl font-bold leading-[1.05] text-foreground sm:text-7xl", children: [
      "MANISH ",
      /* @__PURE__ */ jsx("span", { className: "text-[#00ff41] [text-shadow:0_0_24px_rgba(0,255,65,0.5)]", children: "KUMAR" })
    ] }),
    /* @__PURE__ */ jsx(TitleRotator, {}),
    /* @__PURE__ */ jsx(motion.p, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, transition: {
      duration: 0.6,
      delay: 0.7
    }, className: "mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg", children: "Defending digital systems through threat detection, vulnerability research, and disciplined incident response. I build the quiet machinery that keeps adversaries out." }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.5,
      delay: 0.85
    }, className: "mt-7 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs("a", { href: "#projects", className: "inline-flex items-center justify-center gap-2 rounded-md bg-[#00ff41] px-5 py-2.5 font-mono text-sm font-semibold text-black transition-all hover:bg-[#00ff41]/90 hover:shadow-[0_0_28px_rgba(0,255,65,0.6)]", children: [
        "View Projects ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] }),
      /* @__PURE__ */ jsx(ResumeDownloadButton, {}),
      /* @__PURE__ */ jsxs("a", { href: "#contact", className: "inline-flex items-center justify-center gap-2 rounded-md border border-[#00e5ff]/50 bg-[#00e5ff]/5 px-5 py-2.5 font-mono text-sm font-semibold text-[#00e5ff] transition-all hover:bg-[#00e5ff]/10 hover:shadow-[0_0_24px_rgba(0,229,255,0.4)]", children: [
        /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
        " Contact Me"
      ] })
    ] })
  ] });
}
const ROLES = ["Cybersecurity Analyst", "Security Researcher", "SOC Enthusiast"];
function TitleRotator() {
  const [text, setText] = useState("");
  useEffect(() => {
    let mounted = true;
    let idx = 0;
    let chars = 0;
    let deleting = false;
    let to;
    const tick = () => {
      if (!mounted) return;
      const full = ROLES[idx];
      if (!deleting) {
        chars++;
        setText(full.slice(0, chars));
        if (chars === full.length) {
          deleting = true;
          to = window.setTimeout(tick, 1400);
          return;
        }
      } else {
        chars--;
        setText(full.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          idx = (idx + 1) % ROLES.length;
        }
      }
      to = window.setTimeout(tick, deleting ? 35 : 65);
    };
    to = window.setTimeout(tick, 900);
    return () => {
      mounted = false;
      window.clearTimeout(to);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "mt-3 font-mono text-lg text-[#00e5ff] sm:text-2xl", children: [
    /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
      ">",
      " "
    ] }),
    /* @__PURE__ */ jsx("span", { children: text }),
    /* @__PURE__ */ jsx("span", { className: "ml-0.5 inline-block h-5 w-2 animate-pulse bg-[#00e5ff] align-middle" })
  ] });
}
function Section({
  id,
  tag,
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("section", { id, className: "scroll-mt-20 py-14 sm:py-20", children: [
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 12
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true,
      margin: "-60px"
    }, transition: {
      duration: 0.5
    }, className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "font-mono text-xs uppercase tracking-widest text-[#00e5ff]", children: [
        "// ",
        tag
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "mt-2 font-mono text-3xl font-bold text-foreground sm:text-4xl", children: title }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 h-px w-24 bg-gradient-to-r from-[#00ff41] to-transparent" })
    ] }),
    children
  ] });
}
function ProjectCard({
  p,
  idx
}) {
  return /* @__PURE__ */ jsxs(motion.article, { "data-cursor": "reticle", initial: {
    opacity: 0,
    y: 18
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-60px"
  }, transition: {
    duration: 0.5,
    delay: idx * 0.06
  }, className: "group relative overflow-hidden rounded-xl border border-[#00ff41]/20 bg-black/50 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#00ff41]/70 hover:shadow-[0_0_40px_rgba(0,255,65,0.25)]", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px translate-y-0 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100", style: {
      background: "linear-gradient(115deg, transparent 30%, rgba(0,255,65,0.06) 50%, transparent 70%)"
    } }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-1 -translate-y-full bg-[#00ff41]/60 shadow-[0_0_18px_#00ff41] transition-transform duration-[1400ms] group-hover:translate-y-[260px]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] uppercase tracking-widest text-[#00e5ff]", children: [
        "// op_",
        String(idx + 1).padStart(2, "0")
      ] }),
      /* @__PURE__ */ jsx("span", { className: "rounded-sm border border-[#00ff41]/40 px-1.5 py-0.5 font-mono text-[10px] text-[#00ff41]", children: p.status })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "relative mt-2 text-lg font-semibold text-foreground", children: p.title }),
    /* @__PURE__ */ jsx("p", { className: "relative mt-1.5 text-sm text-muted-foreground", children: p.summary }),
    /* @__PURE__ */ jsx("div", { className: "relative mt-3 flex flex-wrap gap-1.5", children: p.stack.map((s) => /* @__PURE__ */ jsx("span", { className: "rounded-sm border border-[#00ff41]/20 bg-[#00ff41]/5 px-2 py-0.5 font-mono text-[11px] text-[#a7f3d0]/90", children: s }, s)) }),
    /* @__PURE__ */ jsxs("div", { className: "relative mt-4 flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsx("span", { className: "font-mono text-[#00ff41] opacity-0 transition-opacity duration-300 group-hover:opacity-100", children: "▶ TARGET ACQUIRED — analysis complete" }),
      /* @__PURE__ */ jsxs("a", { href: "#contact", className: "inline-flex items-center gap-1 font-mono text-[#00e5ff] hover:underline", children: [
        "case study ",
        /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" })
      ] })
    ] })
  ] });
}
function ContactPanel() {
  const items = [{
    icon: Mail,
    label: "Email",
    value: "manish@secops.dev",
    href: "mailto:manish632004@gmail.com"
  }, {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/manishkumar",
    href: "https://www.linkedin.com/in/manish-kumar63"
  }, {
    icon: Github,
    label: "GitHub",
    value: "/manishk-sec",
    href: "https://github.com/Manish632004"
  }];
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-[#00e5ff]/20 bg-black/50 p-5 backdrop-blur-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono text-xs uppercase tracking-widest text-[#00e5ff]", children: "// secure-channel" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 font-mono text-[10px] text-[#00ff41]", children: [
        /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ff41]" }),
        "ENCRYPTED"
      ] })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "mt-2 text-lg font-semibold", children: "Direct lines of communication" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Reach out for engagements, collaboration, or research discussion." }),
    /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2", children: items.map((it) => {
      const Icon = it.icon;
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: it.href, target: it.href.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", className: "group flex items-center gap-3 rounded-lg border border-[#00ff41]/15 bg-black/40 px-3 py-2.5 font-mono text-sm transition-colors hover:border-[#00ff41]/60 hover:bg-[#00ff41]/5", children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-[#00ff41]" }),
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: it.label }),
        /* @__PURE__ */ jsx("span", { className: "ml-auto text-[#a7f3d0]/90", children: it.value })
      ] }) }, it.label);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 grid grid-cols-3 gap-2 font-mono text-[11px]", children: [
      /* @__PURE__ */ jsx(Stat, { icon: Globe, label: "Region", value: "Global" }),
      /* @__PURE__ */ jsx(Stat, { icon: Cpu, label: "Response", value: "< 24h" }),
      /* @__PURE__ */ jsx(Stat, { icon: Code2, label: "Status", value: "Open" })
    ] })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-[#00ff41]/15 bg-black/40 px-2 py-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-[#00e5ff]/70", children: [
      /* @__PURE__ */ jsx(Icon, { className: "h-3 w-3" }),
      /* @__PURE__ */ jsx("span", { className: "text-[9px] uppercase tracking-widest", children: label })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-[#00ff41]", children: value })
  ] });
}
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[secure-channel] from ${name || "visitor"}`);
    const body = encodeURIComponent(`${msg}

— ${name} <${email}>`);
    window.location.href = `mailto:manish632004@gmail.com?subject=${subject}&body=${body}`;
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit, className: "rounded-xl border border-[#00ff41]/20 bg-black/50 p-5 backdrop-blur-md", children: [
    /* @__PURE__ */ jsx("div", { className: "font-mono text-xs uppercase tracking-widest text-[#00e5ff]", children: "// transmit-packet" }),
    /* @__PURE__ */ jsx("h3", { className: "mt-2 text-lg font-semibold", children: "Send Message" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3", children: [
      /* @__PURE__ */ jsx(Field, { label: "callsign", children: /* @__PURE__ */ jsx("input", { required: true, value: name, onChange: (e) => setName(e.target.value), placeholder: "Your name", className: "w-full rounded-md border border-[#00ff41]/20 bg-black/60 px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-[#00ff41]/70" }) }),
      /* @__PURE__ */ jsx(Field, { label: "return-addr", children: /* @__PURE__ */ jsx("input", { required: true, type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@domain.com", className: "w-full rounded-md border border-[#00ff41]/20 bg-black/60 px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-[#00ff41]/70" }) }),
      /* @__PURE__ */ jsx(Field, { label: "payload", children: /* @__PURE__ */ jsx("textarea", { required: true, value: msg, onChange: (e) => setMsg(e.target.value), rows: 5, placeholder: "How can I help?", className: "w-full resize-none rounded-md border border-[#00ff41]/20 bg-black/60 px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-[#00ff41]/70" }) })
    ] }),
    /* @__PURE__ */ jsxs("button", { type: "submit", className: "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#00ff41] px-5 py-2.5 font-mono text-sm font-semibold text-black transition-all hover:bg-[#00ff41]/90 hover:shadow-[0_0_28px_rgba(0,255,65,0.5)]", children: [
      /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
      " Transmit"
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxs("span", { className: "mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#00e5ff]/80", children: [
      "// ",
      label
    ] }),
    children
  ] });
}
export {
  Portfolio as component
};
