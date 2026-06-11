import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Shield,
  Terminal,
  Bug,
  Network,
  Siren,
  ScanLine,
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowRight,
  ExternalLink,
  Award,
  Lock,
  Cpu,
  Eye,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manish Kumar — SOC Analyst & Ethical Hacker" },
      {
        name: "description",
        content:
          "Portfolio of Manish Kumar, SOC Analyst, Ethical Hacker, and Cyber Security Expert specializing in threat detection, penetration testing, and incident response.",
      },
      { property: "og:title", content: "Manish Kumar — Cyber Security Expert" },
      {
        property: "og:description",
        content:
          "SOC Analyst and Ethical Hacker protecting digital systems through threat hunting, pentesting, and defensive engineering.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});

const skills = [
  { name: "SOC Analysis", icon: Eye, desc: "24/7 monitoring, SIEM tuning, alert triage" },
  { name: "Ethical Hacking", icon: Bug, desc: "Red-team engagements & adversary simulation" },
  { name: "Penetration Testing", icon: Terminal, desc: "Web, network, and API exploitation" },
  { name: "Network Security", icon: Network, desc: "Segmentation, firewall & IDS/IPS hardening" },
  { name: "Incident Response", icon: Siren, desc: "Containment, forensics, root-cause analysis" },
  { name: "Malware Analysis", icon: ScanLine, desc: "Static & dynamic reverse engineering" },
];

const projects = [
  {
    title: "SOC Threat Detection Pipeline",
    stack: ["Splunk", "Sigma", "MITRE ATT&CK"],
    desc: "Built a detection-as-code pipeline mapping 120+ Sigma rules to ATT&CK techniques, reducing mean-time-to-detect by 63%.",
  },
  {
    title: "Enterprise Vulnerability Assessment",
    stack: ["Nessus", "Burp Suite", "Nmap"],
    desc: "Led full-scope assessment across 400 endpoints. Discovered critical RCE chain in legacy auth service; delivered remediation roadmap.",
  },
  {
    title: "Zero-Trust Network Redesign",
    stack: ["pfSense", "Wireguard", "Zeek"],
    desc: "Architected segmented zero-trust LAN with east-west inspection. Cut lateral-movement blast radius by 80% in tabletop exercises.",
  },
  {
    title: "Malware Triage Sandbox",
    stack: ["Cuckoo", "YARA", "Volatility"],
    desc: "Self-hosted dynamic analysis lab with automated IOC extraction. Used to triage 50+ samples weekly for IR team.",
  },
];

const certs = [
  { name: "CEH", full: "Certified Ethical Hacker", org: "EC-Council" },
  { name: "Security+", full: "CompTIA Security+", org: "CompTIA" },
  { name: "OSCP", full: "Offensive Security Certified Pro", org: "OffSec" },
  { name: "CySA+", full: "Cybersecurity Analyst+", org: "CompTIA" },
];

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const links = [
    ["about", "About"],
    ["skills", "Skills"],
    ["projects", "Projects"],
    ["certs", "Certs"],
    ["contact", "Contact"],
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-primary">manish</span>
          <span className="text-muted-foreground">@</span>
          <span className="text-accent">sec</span>
          <span className="text-muted-foreground">:~$</span>
        </a>
        <nav className="hidden gap-6 font-mono text-xs sm:flex">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={`#${href}`}
              className="text-muted-foreground transition hover:text-primary"
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
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 scanlines opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="animate-float-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" />
            STATUS: AVAILABLE FOR ENGAGEMENTS
          </div>
          <p className="mb-4 font-mono text-sm text-accent text-glow-cyan">
            $ whoami
          </p>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            Manish <span className="text-primary text-glow-neon">Kumar</span>
            <span className="cursor-blink ml-2 text-primary">_</span>
          </h1>
          <p className="mt-6 max-w-2xl font-mono text-base text-muted-foreground sm:text-lg">
            <span className="text-accent">&gt;</span> SOC Analyst · Ethical Hacker · Cyber Security
            Expert
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
            Protecting digital systems by hunting threats before they strike — and breaking things
            ethically so they don't break later.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground shadow-neon transition hover:translate-y-[-1px]"
            >
              <Download className="h-4 w-4" />
              Download Résumé
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md border border-accent/50 bg-accent/5 px-6 py-3 font-mono text-sm font-semibold text-accent transition hover:bg-accent/10 hover:shadow-cyan"
            >
              Initiate Contact
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
            {[
              ["5+", "Years Defending"],
              ["200+", "Incidents Resolved"],
              ["50+", "Pentests Delivered"],
              ["0", "Breaches On Watch"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-mono text-3xl font-bold text-primary text-glow-neon">{n}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-12">
      <p className="font-mono text-sm text-accent">// {tag}</p>
      <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary to-transparent" />
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader tag="about" title="About Me" />
      <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
        <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
          <p>
            I'm a cyber security practitioner who lives at the intersection of{" "}
            <span className="text-primary">offensive thinking</span> and{" "}
            <span className="text-accent">defensive engineering</span>. By day I run SOC operations
            — monitoring SIEM telemetry, triaging alerts, and chasing anomalies through endpoint
            and network data.
          </p>
          <p>
            By night I sharpen the other side: building labs, reversing malware, and pentesting
            real-world targets through bug bounty programs and CTFs. The duality keeps both my
            detection rules honest and my exploits creative.
          </p>
          <p>
            I specialize in <span className="text-primary">security monitoring</span>,{" "}
            <span className="text-primary">threat analysis</span>,{" "}
            <span className="text-primary">penetration testing</span>, and end-to-end{" "}
            <span className="text-primary">cyber defense</span> — translating attacker tradecraft
            into resilient blue-team controls.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface/60 p-6 font-mono text-sm shadow-neon">
          <div className="mb-3 flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-accent/70" />
            <span className="h-3 w-3 rounded-full bg-primary/70" />
          </div>
          <div className="space-y-1.5 text-xs">
            <p><span className="text-accent">const</span> <span className="text-primary">profile</span> = {"{"}</p>
            <p className="pl-4"><span className="text-muted-foreground">role:</span> <span className="text-foreground">"SOC Analyst"</span>,</p>
            <p className="pl-4"><span className="text-muted-foreground">focus:</span> <span className="text-foreground">"Threat Hunting"</span>,</p>
            <p className="pl-4"><span className="text-muted-foreground">stack:</span> [<span className="text-foreground">"Splunk"</span>, <span className="text-foreground">"ELK"</span>, <span className="text-foreground">"Burp"</span>],</p>
            <p className="pl-4"><span className="text-muted-foreground">location:</span> <span className="text-foreground">"India / Remote"</span>,</p>
            <p className="pl-4"><span className="text-muted-foreground">coffee:</span> <span className="text-primary">true</span>,</p>
            <p>{"};"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-surface/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader tag="capabilities" title="Skills & Arsenal" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ name, icon: Icon, desc }) => (
            <div
              key={name}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition hover:border-primary/60 hover:shadow-neon"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/20" />
              <Icon className="relative h-8 w-8 text-primary" strokeWidth={1.5} />
              <h3 className="relative mt-4 font-mono text-lg font-semibold text-foreground">
                {name}
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader tag="engagements" title="Featured Projects" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <article
            key={p.title}
            className="group relative flex flex-col rounded-lg border border-border bg-card p-7 transition hover:border-accent/60 hover:shadow-cyan"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              <Lock className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-foreground">{p.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded border border-border bg-background/60 px-2 py-1 font-mono text-xs text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
            <button className="mt-5 inline-flex w-fit items-center gap-2 font-mono text-xs text-accent opacity-0 transition group-hover:opacity-100">
              read case study <ExternalLink className="h-3 w-3" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certs" className="border-y border-border bg-surface/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader tag="credentials" title="Certifications" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c) => (
            <div
              key={c.name}
              className="relative rounded-lg border border-border bg-card p-6 text-center transition hover:border-primary/60 hover:shadow-neon"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/5">
                <Award className="h-7 w-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-mono text-2xl font-bold text-primary text-glow-neon">
                {c.name}
              </h3>
              <p className="mt-2 text-sm text-foreground">{c.full}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{c.org}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} <${form.email}>`);
    window.location.href = `mailto:manish.kumar@example.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader tag="contact" title="Establish Connection" />
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-lg leading-relaxed text-foreground/85">
            Got a security challenge, a suspicious alert, or just want to talk shop about the
            latest CVE? Drop a packet — I respond within{" "}
            <span className="text-primary">24 hours</span>.
          </p>
          <div className="mt-8 space-y-3 font-mono text-sm">
            <a
              href="mailto:manish.kumar@example.com"
              className="flex items-center gap-3 rounded-md border border-border bg-card p-4 transition hover:border-primary/60 hover:text-primary"
            >
              <Mail className="h-5 w-5 text-primary" />
              manish.kumar@example.com
            </a>
            <a
              href="https://linkedin.com/in/manishkumar"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-md border border-border bg-card p-4 transition hover:border-accent/60 hover:text-accent"
            >
              <Linkedin className="h-5 w-5 text-accent" />
              linkedin.com/in/manishkumar
            </a>
            <a
              href="https://github.com/manishkumar"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-md border border-border bg-card p-4 transition hover:border-primary/60 hover:text-primary"
            >
              <Github className="h-5 w-5 text-primary" />
              github.com/manishkumar
            </a>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-lg border border-border bg-card p-6 shadow-neon"
        >
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-3 font-mono text-xs text-muted-foreground">
            <Cpu className="h-4 w-4 text-primary" /> secure_channel.sh
          </div>
          <div className="space-y-4">
            <Field
              label="name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <Field
              label="email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            <div>
              <label className="block font-mono text-xs text-accent">$ message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full resize-none rounded-md border border-input bg-background/60 px-3 py-2 font-mono text-sm text-foreground outline-none transition focus:border-primary focus:shadow-neon"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 font-mono text-sm font-semibold text-primary-foreground shadow-neon transition hover:translate-y-[-1px]"
            >
              {sent ? "// transmitted" : "transmit_packet()"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-xs text-accent">$ {label}</label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-background/60 px-3 py-2 font-mono text-sm text-foreground outline-none transition focus:border-primary focus:shadow-neon"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 font-mono text-xs text-muted-foreground sm:flex-row">
        <p>
          <span className="text-primary">$</span> echo "© {new Date().getFullYear()} Manish Kumar.
          All systems secured."
        </p>
        <p className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> uptime: 99.99%
        </p>
      </div>
    </footer>
  );
}
