import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Terminal,
  Bug,
  Network,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ExternalLink,
  Award,
  Eye,
  Send,
  Code2,
  Globe,
  Cpu,
} from "lucide-react";

import { CyberBackground } from "@/components/CyberBackground";
import { BootSequence } from "@/components/BootSequence";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { SocStats } from "@/components/SocStats";
import { AttackChain } from "@/components/AttackChain";
import { IdentityCard } from "@/components/IdentityCard";
import { AchievementToasts } from "@/components/AchievementToasts";
import { PacketTicker } from "@/components/PacketTicker";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { SkillBar } from "@/components/SkillBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manish Kumar — Cybersecurity Analyst & SOC Researcher" },
      {
        name: "description",
        content:
          "Manish Kumar — Cybersecurity Analyst, Security Researcher & SOC Enthusiast. Threat detection, vulnerability assessment, incident response.",
      },
      { property: "og:title", content: "Manish Kumar — Cybersecurity Analyst" },
      {
        property: "og:description",
        content:
          "SOC dashboard portfolio: threat hunting, OSINT, vulnerability assessment, and incident response.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});

const SKILLS: { name: string; level: number }[] = [
  { name: "Web Security", level: 88 },
  { name: "Network Security", level: 82 },
  { name: "Linux", level: 90 },
  { name: "Python", level: 85 },
  { name: "OSINT", level: 80 },
  { name: "Vulnerability Assessment", level: 86 },
  { name: "Incident Response", level: 78 },
];

const PROJECTS = [
  {
    title: "SIEM Alert Triage Pipeline",
    summary:
      "Custom rules + Python automation for Wazuh/ELK reducing analyst MTTR by 42%.",
    stack: ["Wazuh", "ELK", "Python", "Sigma"],
    status: "PROD",
  },
  {
    title: "Active Directory Pentest Lab",
    summary:
      "End-to-end AD attack chain — Kerberoasting, AS-REP, NTLM relay — documented w/ mitigations.",
    stack: ["Impacket", "BloodHound", "CrackMapExec"],
    status: "LAB",
  },
  {
    title: "Phishing URL Classifier",
    summary:
      "OSINT + ML pipeline scoring URLs against threat-intel feeds, exposed as a REST API.",
    stack: ["Python", "FastAPI", "VirusTotal"],
    status: "OSS",
  },
  {
    title: "Web App Vulnerability Report",
    summary:
      "Black-box assessment uncovering IDOR, SSRF, and broken auth chains for a fintech client.",
    stack: ["Burp Suite", "OWASP", "Nuclei"],
    status: "ENG",
  },
];

const CERTS = [
  { name: "CompTIA Security+", issuer: "CompTIA", year: "2024" },
  { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", year: "in progress" },
  { name: "TryHackMe — Top 1%", issuer: "TryHackMe", year: "2024" },
  { name: "HTB CPTS Track", issuer: "Hack The Box", year: "in progress" },
];

function Portfolio() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="relative min-h-screen text-foreground">
      <CyberBackground />
      <BootSequence onDone={() => setBooted(true)} />
      {booted && <AchievementToasts />}

      <Nav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />

        <Section id="stats" tag="telemetry" title="SOC Telemetry">
          <SocStats />
          <div className="mt-6">
            <PacketTicker />
          </div>
        </Section>

        <Section id="about" tag="about" title="About the Operator">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4 text-base leading-relaxed text-muted-foreground"
            >
              <p>
                I'm <span className="text-foreground">Manish Kumar</span>, a
                cybersecurity analyst focused on defending modern enterprises against
                real-world adversaries. My day-to-day spans SOC operations, threat
                hunting, and adversary emulation — translating noisy telemetry into
                decisive action.
              </p>
              <p>
                I love the discipline of digital forensics, the creativity of OSINT,
                and the rigor of vulnerability assessment. I build tooling in Python,
                tune SIEM detections, and write reports engineers actually want to
                read.
              </p>
              <p className="font-mono text-sm text-[#a7f3d0]/80">
                {">"} mission: protect users, harden systems, share knowledge.
              </p>
            </motion.div>

            <IdentityCard />
          </div>
        </Section>

        <Section id="skills" tag="skills" title="Skill Matrix">
          <div className="grid gap-3 sm:grid-cols-2">
            {SKILLS.map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.04} />
            ))}
          </div>
        </Section>

        <Section id="terminal" tag="shell" title="Interactive Terminal">
          <p className="mb-4 text-sm text-muted-foreground">
            Try: <code className="font-mono text-[#00ff41]">help</code>,{" "}
            <code className="font-mono text-[#00ff41]">about</code>,{" "}
            <code className="font-mono text-[#00ff41]">skills</code>,{" "}
            <code className="font-mono text-[#00ff41]">projects</code>.
          </p>
          <InteractiveTerminal />
        </Section>

        <Section id="projects" tag="projects" title="Featured Engagements">
          <div className="grid gap-5 sm:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} p={p} idx={i} />
            ))}
          </div>
        </Section>

        <Section id="attack" tag="methodology" title="Attack Chain">
          <AttackChain />
        </Section>

        <Section id="certifications" tag="credentials" title="Certifications">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERTS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-xl border border-[#00ff41]/15 bg-black/40 p-4 backdrop-blur-md transition-colors hover:border-[#00ff41]/60"
              >
                <div className="flex items-start justify-between">
                  <Award className="h-6 w-6 text-[#00ff41]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#00e5ff]">
                    {c.year}
                  </span>
                </div>
                <div className="mt-3 text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.issuer}</div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="contact" tag="contact" title="Secure Channel">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <ContactPanel />
            <ContactForm />
          </div>
        </Section>

        <footer className="mt-20 border-t border-[#00ff41]/15 py-8 text-center font-mono text-xs text-muted-foreground">
          <div>// session — {new Date().getFullYear()} — manish@soc:~$</div>
          <div className="mt-1">All systems nominal. Built with intent.</div>
        </footer>
      </main>
    </div>
  );
}

function Nav() {
  const links = [
    ["about", "About"],
    ["skills", "Skills"],
    ["projects", "Projects"],
    ["terminal", "Shell"],
    ["contact", "Contact"],
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-[#00ff41]/15 bg-[#050505]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm">
          <Shield className="h-4 w-4 text-[#00ff41]" />
          <span className="text-[#00ff41]">manish@soc</span>
          <span className="text-muted-foreground">:~$</span>
          <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-[#00ff41]" />
        </a>
        <nav className="hidden gap-1 md:flex">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-md px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-[#00ff41]/10 hover:text-[#00ff41]"
            >
              ./{label.toLowerCase()}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-14 pb-20 sm:pt-20 sm:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-flex items-center gap-2 rounded-full border border-[#00ff41]/30 bg-black/50 px-3 py-1 font-mono text-xs text-[#00ff41] backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff41] opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff41]" />
        </span>
        ONLINE — accepting engagements
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mt-5 font-mono text-5xl font-bold leading-[1.05] text-foreground sm:text-7xl"
      >
        MANISH <span className="text-[#00ff41] [text-shadow:0_0_24px_rgba(0,255,65,0.5)]">KUMAR</span>
      </motion.h1>

      <TitleRotator />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
      >
        Defending digital systems through threat detection, vulnerability research,
        and disciplined incident response. I build the quiet machinery that keeps
        adversaries out.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.85 }}
        className="mt-7 flex flex-wrap gap-3"
      >
        <a
          href="#projects"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#00ff41] px-5 py-2.5 font-mono text-sm font-semibold text-black transition-all hover:bg-[#00ff41]/90 hover:shadow-[0_0_28px_rgba(0,255,65,0.6)]"
        >
          View Projects <ArrowRight className="h-4 w-4" />
        </a>
        <ResumeDownloadButton />
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#00e5ff]/50 bg-[#00e5ff]/5 px-5 py-2.5 font-mono text-sm font-semibold text-[#00e5ff] transition-all hover:bg-[#00e5ff]/10 hover:shadow-[0_0_24px_rgba(0,229,255,0.4)]"
        >
          <Mail className="h-4 w-4" /> Contact Me
        </a>
      </motion.div>
    </section>
  );
}

const ROLES = ["Cybersecurity Analyst", "Security Researcher", "SOC Enthusiast"];

function TitleRotator() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  // simple typing loop
  useState(() => {
    let mounted = true;
    let idx = 0;
    let chars = 0;
    let deleting = false;
    const tick = () => {
      if (!mounted) return;
      const full = ROLES[idx];
      if (!deleting) {
        chars++;
        setText(full.slice(0, chars));
        if (chars === full.length) {
          deleting = true;
          setDel(true);
          window.setTimeout(tick, 1400);
          return;
        }
      } else {
        chars--;
        setText(full.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          setDel(false);
          idx = (idx + 1) % ROLES.length;
          setI(idx);
        }
      }
      window.setTimeout(tick, deleting ? 35 : 65);
    };
    window.setTimeout(tick, 900);
    return () => {
      mounted = false;
    };
  });
  void i;
  void del;

  return (
    <div className="mt-3 font-mono text-lg text-[#00e5ff] sm:text-2xl">
      <span className="text-muted-foreground">{">"} </span>
      <span>{text}</span>
      <span className="ml-0.5 inline-block h-5 w-2 animate-pulse bg-[#00e5ff] align-middle" />
    </div>
  );
}

function Section({
  id,
  tag,
  title,
  children,
}: {
  id: string;
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="font-mono text-xs uppercase tracking-widest text-[#00e5ff]">
          // {tag}
        </div>
        <h2 className="mt-2 font-mono text-3xl font-bold text-foreground sm:text-4xl">
          {title}
        </h2>
        <div className="mt-3 h-px w-24 bg-gradient-to-r from-[#00ff41] to-transparent" />
      </motion.div>
      {children}
    </section>
  );
}

function ProjectCard({ p, idx }: { p: (typeof PROJECTS)[number]; idx: number }) {
  return (
    <motion.article
      data-cursor="reticle"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: idx * 0.06 }}
      className="group relative overflow-hidden rounded-xl border border-[#00ff41]/20 bg-black/50 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#00ff41]/70 hover:shadow-[0_0_40px_rgba(0,255,65,0.25)]"
    >
      {/* scan line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px translate-y-0 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(0,255,65,0.06) 50%, transparent 70%)",
        }}
      />
      {/* hover scan beam */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 -translate-y-full bg-[#00ff41]/60 shadow-[0_0_18px_#00ff41] transition-transform duration-[1400ms] group-hover:translate-y-[260px]" />

      <div className="relative flex items-start justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#00e5ff]">
          // op_{String(idx + 1).padStart(2, "0")}
        </div>
        <span className="rounded-sm border border-[#00ff41]/40 px-1.5 py-0.5 font-mono text-[10px] text-[#00ff41]">
          {p.status}
        </span>
      </div>
      <h3 className="relative mt-2 text-lg font-semibold text-foreground">{p.title}</h3>
      <p className="relative mt-1.5 text-sm text-muted-foreground">{p.summary}</p>
      <div className="relative mt-3 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded-sm border border-[#00ff41]/20 bg-[#00ff41]/5 px-2 py-0.5 font-mono text-[11px] text-[#a7f3d0]/90"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="relative mt-4 flex items-center justify-between text-xs">
        <span className="font-mono text-[#00ff41] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          ▶ TARGET ACQUIRED — analysis complete
        </span>
        <a
          href="#contact"
          className="inline-flex items-center gap-1 font-mono text-[#00e5ff] hover:underline"
        >
          case study <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.article>
  );
}

function ContactPanel() {
  const items = [
    { icon: Mail, label: "Email", value: "manish@secops.dev", href: "mailto:manish@secops.dev" },
    { icon: Linkedin, label: "LinkedIn", value: "/in/manishkumar", href: "https://linkedin.com" },
    { icon: Github, label: "GitHub", value: "/manishk-sec", href: "https://github.com" },
  ];
  return (
    <div className="rounded-xl border border-[#00e5ff]/20 bg-black/50 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs uppercase tracking-widest text-[#00e5ff]">
          // secure-channel
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#00ff41]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ff41]" />
          ENCRYPTED
        </div>
      </div>
      <h3 className="mt-2 text-lg font-semibold">Direct lines of communication</h3>
      <p className="text-sm text-muted-foreground">
        Reach out for engagements, collaboration, or research discussion.
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.label}>
              <a
                href={it.href}
                target={it.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-[#00ff41]/15 bg-black/40 px-3 py-2.5 font-mono text-sm transition-colors hover:border-[#00ff41]/60 hover:bg-[#00ff41]/5"
              >
                <Icon className="h-4 w-4 text-[#00ff41]" />
                <span className="text-muted-foreground">{it.label}</span>
                <span className="ml-auto text-[#a7f3d0]/90">{it.value}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <div className="mt-5 grid grid-cols-3 gap-2 font-mono text-[11px]">
        <Stat icon={Globe} label="Region" value="Global" />
        <Stat icon={Cpu} label="Response" value="< 24h" />
        <Stat icon={Code2} label="Status" value="Open" />
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Globe;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-[#00ff41]/15 bg-black/40 px-2 py-2">
      <div className="flex items-center gap-1 text-[#00e5ff]/70">
        <Icon className="h-3 w-3" />
        <span className="text-[9px] uppercase tracking-widest">{label}</span>
      </div>
      <div className="mt-0.5 text-[#00ff41]">{value}</div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[secure-channel] from ${name || "visitor"}`);
    const body = encodeURIComponent(`${msg}\n\n— ${name} <${email}>`);
    window.location.href = `mailto:manish@secops.dev?subject=${subject}&body=${body}`;
  };
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-[#00ff41]/20 bg-black/50 p-5 backdrop-blur-md"
    >
      <div className="font-mono text-xs uppercase tracking-widest text-[#00e5ff]">
        // transmit-packet
      </div>
      <h3 className="mt-2 text-lg font-semibold">Send Message</h3>
      <div className="mt-4 space-y-3">
        <Field label="callsign">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-md border border-[#00ff41]/20 bg-black/60 px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-[#00ff41]/70"
          />
        </Field>
        <Field label="return-addr">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="w-full rounded-md border border-[#00ff41]/20 bg-black/60 px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-[#00ff41]/70"
          />
        </Field>
        <Field label="payload">
          <textarea
            required
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={5}
            placeholder="How can I help?"
            className="w-full resize-none rounded-md border border-[#00ff41]/20 bg-black/60 px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-[#00ff41]/70"
          />
        </Field>
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#00ff41] px-5 py-2.5 font-mono text-sm font-semibold text-black transition-all hover:bg-[#00ff41]/90 hover:shadow-[0_0_28px_rgba(0,255,65,0.5)]"
      >
        <Send className="h-4 w-4" /> Transmit
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-[#00e5ff]/80">
        // {label}
      </span>
      {children}
    </label>
  );
}
