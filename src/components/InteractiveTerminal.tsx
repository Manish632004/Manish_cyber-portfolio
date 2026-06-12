import { useEffect, useRef, useState } from "react";

type Line = { kind: "in" | "out"; text: string };

const HELP = `Available commands:
  help            - show this menu
  about           - bio & background
  skills          - technical skill matrix
  projects        - featured engagements
  resume          - download CV
  contact         - reach out
  certifications  - industry credentials
  clear           - clear terminal`;

const RESPONSES: Record<string, string> = {
  help: HELP,
  about:
    "Manish Kumar — Cybersecurity Analyst & Security Researcher.\nFocus: SOC operations, threat hunting, OSINT, vulnerability assessment.",
  skills:
    "Web Sec | Network Sec | Linux | Python | OSINT | Vuln Assessment | Incident Response",
  projects:
    "Scroll to #projects, or visit GitHub. Featured: SIEM tuning, AD pentest lab, phishing triage automation.",
  resume: "Triggering secure download... use the Resume button in the hero.",
  contact: "Email: manish@secops.dev  |  LinkedIn: /in/manishkumar  |  GitHub: /manishk-sec",
  certifications: "CEH (in progress), CompTIA Security+, TryHackMe Top 1%, HTB CPTS track",
};

export function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "soc@manish ~ % type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines]);

  const run = (raw: string) => {
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
      { kind: "out", text: reply },
    ]);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="group rounded-xl border border-[#00ff41]/25 bg-black/70 font-mono text-sm shadow-[0_0_40px_rgba(0,255,65,0.10)] backdrop-blur-md"
      data-cursor="hover"
    >
      <div className="flex items-center gap-2 border-b border-[#00ff41]/15 px-4 py-2 text-xs text-[#a7f3d0]/80">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#00ff41]/90" />
        <span className="ml-3 truncate">manish@soc — bash — 80×24</span>
        <span className="ml-auto text-[#00e5ff]/70">interactive</span>
      </div>
      <div className="h-72 overflow-y-auto px-4 py-3 text-[#d1fae5]">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            {l.kind === "in" ? (
              <div>
                <span className="text-[#00ff41]">soc@manish</span>
                <span className="text-[#a7f3d0]/70">:~$ </span>
                {l.text}
              </div>
            ) : (
              <div className="text-[#a7f3d0]/95">{l.text}</div>
            )}
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
            setInput("");
          }}
          className="mt-1 flex items-center"
        >
          <span className="text-[#00ff41]">soc@manish</span>
          <span className="text-[#a7f3d0]/70">:~$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-[#d1fae5] caret-[#00ff41] outline-none"
            spellCheck={false}
            autoComplete="off"
            aria-label="terminal input"
          />
          <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#00ff41]" />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
}

export default InteractiveTerminal;
