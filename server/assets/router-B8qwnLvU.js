import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";
const appCss = "/assets/styles-R8oBqr3M.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function CyberCursor() {
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
  const [bits, setBits] = useState([]);
  const [particles, setParticles] = useState([]);
  const lastPos = useRef({ x: 0, y: 0, t: 0 });
  const idRef = useRef(0);
  const glitchTimer = useRef(null);
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
    const onMove = (e) => {
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
        setBits(
          (b) => [
            ...b,
            {
              id: bid,
              x: e.clientX + (Math.random() * 40 - 20),
              y: e.clientY + (Math.random() * 40 - 20),
              char: Math.random() > 0.5 ? "1" : "0"
            }
          ].slice(-10)
        );
        window.setTimeout(() => setBits((b) => b.filter((q) => q.id !== bid)), 900);
      }
    };
    const onOver = (e) => {
      const t = e.target;
      if (!t) return;
      const isReticle = !!t.closest('[data-cursor="reticle"]');
      const isHover = isReticle || !!t.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-hidden": true,
      className: "pointer-events-none fixed inset-0 z-[9999]",
      style: {
        opacity: hidden ? 0 : 1,
        transition: "opacity 200ms",
        filter: glitch ? "url(#cyber-glitch) hue-rotate(15deg)" : "none"
      },
      children: [
        /* @__PURE__ */ jsx("svg", { width: "0", height: "0", style: { position: "absolute" }, children: /* @__PURE__ */ jsxs("filter", { id: "cyber-glitch", children: [
          /* @__PURE__ */ jsx(
            "feColorMatrix",
            {
              type: "matrix",
              values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            }
          ),
          /* @__PURE__ */ jsx("feOffset", { dx: "2", dy: "0", result: "r" }),
          /* @__PURE__ */ jsx("feOffset", { dx: "-2", dy: "0", result: "b" }),
          /* @__PURE__ */ jsx("feBlend", { in: "r", in2: "b", mode: "screen" })
        ] }) }),
        !reticle && /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute top-0 left-0 rounded-full",
            style: {
              x: trailX,
              y: trailY,
              translateX: "-50%",
              translateY: "-50%",
              width: ringSize,
              height: ringSize,
              border: `1px solid ${color}`,
              boxShadow: `0 0 18px ${color}, inset 0 0 12px ${color}55`,
              background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`
            },
            animate: { scale: pressed ? 0.8 : hovering ? [1, 1.08, 1] : 1 },
            transition: {
              duration: hovering ? 1.4 : 0.2,
              repeat: hovering ? Infinity : 0,
              ease: "easeInOut"
            }
          }
        ),
        reticle && /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute top-0 left-0",
            style: {
              x: trailX,
              y: trailY,
              translateX: "-50%",
              translateY: "-50%",
              width: ringSize,
              height: ringSize
            },
            animate: { rotate: 360 },
            transition: { duration: 6, repeat: Infinity, ease: "linear" },
            children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 72 72", width: ringSize, height: ringSize, style: { overflow: "visible" }, children: [
              [0, 90, 180, 270].map((a) => /* @__PURE__ */ jsxs("g", { transform: `rotate(${a} 36 36)`, children: [
                /* @__PURE__ */ jsx("path", { d: "M36 2 L36 14", stroke: color, strokeWidth: "1.5" }),
                /* @__PURE__ */ jsx("path", { d: "M30 2 L36 2 L36 8", fill: "none", stroke: color, strokeWidth: "1.5" })
              ] }, a)),
              /* @__PURE__ */ jsx("circle", { cx: "36", cy: "36", r: "22", fill: "none", stroke: color, strokeWidth: "1", strokeDasharray: "4 4", opacity: "0.7" }),
              /* @__PURE__ */ jsx("circle", { cx: "36", cy: "36", r: "2", fill: color }),
              /* @__PURE__ */ jsx("line", { x1: "20", y1: "36", x2: "32", y2: "36", stroke: color, strokeWidth: "1" }),
              /* @__PURE__ */ jsx("line", { x1: "40", y1: "36", x2: "52", y2: "36", stroke: color, strokeWidth: "1" }),
              /* @__PURE__ */ jsx("line", { x1: "36", y1: "20", x2: "36", y2: "32", stroke: color, strokeWidth: "1" }),
              /* @__PURE__ */ jsx("line", { x1: "36", y1: "40", x2: "36", y2: "52", stroke: color, strokeWidth: "1" })
            ] })
          }
        ),
        !reticle && /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute top-0 left-0 rounded-full overflow-hidden",
            style: {
              x: trailX,
              y: trailY,
              translateX: "-50%",
              translateY: "-50%",
              width: ringSize + 16,
              height: ringSize + 16,
              opacity: hovering ? 0.9 : 0.3
            },
            children: /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute inset-0",
                style: {
                  background: `conic-gradient(from 0deg, transparent 0deg, ${color}aa 30deg, transparent 80deg)`,
                  borderRadius: "9999px"
                },
                animate: { rotate: 360 },
                transition: { duration: hovering ? 1.4 : 3, repeat: Infinity, ease: "linear" }
              }
            )
          }
        ),
        hovering && !reticle && /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute top-0 left-0 rounded-full",
            style: {
              x: trailX,
              y: trailY,
              translateX: "-50%",
              translateY: "-50%",
              border: `1px solid ${color}`
            },
            initial: { width: ringSize, height: ringSize, opacity: 0.8 },
            animate: { width: ringSize + 40, height: ringSize + 40, opacity: 0 },
            transition: { duration: 1.1, repeat: Infinity, ease: "easeOut" }
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute top-0 left-0 rounded-full",
            style: {
              x: dotX,
              y: dotY,
              translateX: "-50%",
              translateY: "-50%",
              width: 6,
              height: 6,
              background: color,
              boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`
            }
          }
        ),
        particles.map((p) => /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute top-0 left-0 rounded-full",
            style: {
              left: p.x,
              top: p.y,
              width: 3,
              height: 3,
              background: color,
              boxShadow: `0 0 6px ${color}`
            },
            initial: { opacity: 0.8, scale: 1 },
            animate: { opacity: 0, scale: 0.2, y: -8 },
            transition: { duration: 0.6, ease: "easeOut" }
          },
          p.id
        )),
        bits.map((b) => /* @__PURE__ */ jsx(
          motion.span,
          {
            className: "absolute font-mono text-[10px] font-bold",
            style: { left: b.x, top: b.y, color },
            initial: { opacity: 0.9, y: 0 },
            animate: { opacity: 0, y: -22 },
            transition: { duration: 0.9, ease: "easeOut" },
            children: b.char
          },
          b.id
        ))
      ]
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$1 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Cyber Guardian Portfolio showcases cybersecurity expertise with a modern, interactive website." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Cyber Guardian Portfolio showcases cybersecurity expertise with a modern, interactive website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "Cyber Guardian Portfolio showcases cybersecurity expertise with a modern, interactive website." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7c871e03-cbb6-466f-a11e-2f600dc43dbc/id-preview-8dabb201--44ee2812-4b13-4a20-8274-9be9ca5d2e58.lovable.app-1781276596988.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7c871e03-cbb6-466f-a11e-2f600dc43dbc/id-preview-8dabb201--44ee2812-4b13-4a20-8274-9be9ca5d2e58.lovable.app-1781276596988.png" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$1.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(CyberCursor, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const $$splitComponentImporter = () => import("./index-Co_rsuh3.js");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Manish Kumar — Cybersecurity Analyst & SOC Researcher"
    }, {
      name: "description",
      content: "Manish Kumar — Cybersecurity Analyst, Security Researcher & SOC Enthusiast. Threat detection, vulnerability assessment, incident response."
    }, {
      property: "og:title",
      content: "Manish Kumar — Cybersecurity Analyst"
    }, {
      property: "og:description",
      content: "SOC dashboard portfolio: threat hunting, OSINT, vulnerability assessment, and incident response."
    }, {
      property: "og:type",
      content: "website"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
