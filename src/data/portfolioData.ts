export interface Project {
  id: string;
  title: string;
  badge: string;
  category: string;
  subtitle: string;
  description: string;
  technologies: string[];
  objective: string;
  labArchitecture: string;
  monitoringCapabilities: string[];
  detectionWorkflow: string;
  toolsUsed: string[];
  lessonsLearned: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  isSimulated?: boolean;
  highlightStat: string;
  highlightLabel: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  bullets: string[];
  skills: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  position: [number, number, number];
  skills: {
    name: string;
    level: string;
    tag: string;
    focus: string;
  }[];
}

export interface AttackStage {
  id: string;
  stageNumber: string;
  title: string;
  phase: string;
  tooling: string;
  description: string;
  labFinding: string;
  defensiveControl: string;
}

export interface SocPanelData {
  id: string;
  index: string;
  title: string;
  tools: string[];
  summary: string;
  detailedAnalysis: string;
  sampleEventTypes: string[];
  actionableInsights: string[];
}

export const PERSONAL_DATA = {
  name: "Manish Kumar",
  brandName: "MANISH.K",
  shortTitle: "CYBERSECURITY PORTFOLIO",
  heroBadge: "CYBERSECURITY • SECURITY OPERATIONS • VAPT",
  headlineMain: "SECURING THE",
  headlineAccent: "DIGITAL FRONTIER.",
  heroSubcopy:
    "I'm Manish Kumar — an aspiring cybersecurity professional focused on threat detection, SIEM monitoring, network security, and vulnerability assessment.",
  availabilityStatus: "OPEN TO CYBERSECURITY OPPORTUNITIES",
  targetRoles: ["SOC Analyst L1", "Security Analyst", "SIEM Analyst", "Junior VAPT"],
  location: "Jaipur, Rajasthan, India",
  email: "manishkumar.cybersec@gmail.com",
  linkedin: "https://www.linkedin.com/in/manish-kumar-cybersec",
  github: "https://github.com/manishkumar-cyber",
  resumePath: "/resume-manish-kumar.pdf",
  bioHeadline: "CURIOUS BY NATURE. SECURITY-FOCUSED BY DESIGN.",
  bioSummary: [
    "I'm Manish Kumar, an aspiring cybersecurity professional with hands-on experience in SIEM monitoring labs, endpoint security monitoring, network intrusion detection, and vulnerability assessment.",
    "My learning approach is practical: build the lab, generate or inspect security events, investigate what happened, understand the underlying weakness, and document the findings.",
    "I'm particularly interested in SOC operations, threat detection, incident investigation, and offensive security fundamentals."
  ],
  principles: [
    {
      title: "OBSERVE",
      summary: "Understand systems, logs, and network behavior before anomalies arise."
    },
    {
      title: "INVESTIGATE",
      summary: "Identify suspicious patterns, correlate telemetry, and validate findings without false assumptions."
    },
    {
      title: "IMPROVE",
      summary: "Document weaknesses, assist with root-cause analysis, and explore practical defensive remediation."
    }
  ],
  learningFocus: [
    { title: "SOC Monitoring Workflows", desc: "Alert prioritization, severity escalation, and playbook execution." },
    { title: "SIEM Detection & Investigation", desc: "Constructing targeted Wazuh rules and high-confidence Splunk SPL queries." },
    { title: "Incident Triage", desc: "Distinguishing benign administrative actions from active lateral movement." },
    { title: "Network Security & PCAP", desc: "Suricata rule syntax, Wireshark packet dissection, and TCP handshake inspection." },
    { title: "Web Application Security", desc: "Analyzing OWASP Top 10 vectors including SQLi, XSS, and broken access controls." },
    { title: "Vulnerability Remediation", desc: "Patch verification, secure baseline hardening, and configuration audits." }
  ],
  certifications: [
    {
      name: "Cyber Security Trainee Certification",
      issuer: "Rajasthan Centre of Advanced Technology (RCAT)",
      date: "2026",
      status: "Completed",
      verified: true,
      description: "Comprehensive practical training spanning network defense, cryptography, OWASP Top 10, and penetration testing."
    },
    {
      name: "Hands-on Practical Labs & SIEM Blueprints",
      issuer: "Self-Directed Security Engineering Lab",
      date: "2025 - Present",
      status: "Active Research",
      verified: true,
      description: "Deployed Wazuh Manager + Agents, Suricata IDS, Splunk Enterprise, and Dockerized vulnerable VMs in isolated environments."
    }
  ]
};

export const SOC_PANELS: SocPanelData[] = [
  {
    id: "panel-siem",
    index: "01",
    title: "SIEM & LOG ANALYSIS",
    tools: ["Wazuh", "Splunk", "SPL", "Log Analysis"],
    summary:
      "Centralized event ingestion, rule correlation, and root-cause tracing across distributed server nodes.",
    detailedAnalysis:
      "Deployed Wazuh SIEM to aggregate syslog, auth.log, and Windows Event Logs. Authored custom SPL queries to detect brute-force surges and lateral movement patterns. Evaluated MITRE ATT&CK mappings against endpoint telemetry.",
    sampleEventTypes: [
      "sshd: Failed password for invalid user root (ID: 5710)",
      "File Integrity Monitoring: /etc/passwd checksum modified",
      "Windows Security: Event ID 4625 (Account Failed to Log on)",
      "Wazuh Rule 5712: SSH brute force attempt detected"
    ],
    actionableInsights: [
      "Correlate failed attempts with IP reputation before escalating",
      "Threshold tuning prevents alert fatigue for administrative maintenance",
      "FIM alerts on critical binary directories require immediate host isolation"
    ]
  },
  {
    id: "panel-network",
    index: "02",
    title: "NETWORK DETECTION",
    tools: ["Suricata", "Nmap", "Network Traffic Analysis"],
    summary:
      "Signature and anomaly-based intrusion detection with automated packet inspection and alert prioritization.",
    detailedAnalysis:
      "Integrated Suricata IDS to inspect bidirectional traffic across perimeter and internal subnets. Analyzed PCAPs using Wireshark to inspect malicious payloads and port sweep behavior initiated by Nmap probes.",
    sampleEventTypes: [
      "ET SCAN Potential SSH Brute Force Inbound",
      "GPL ATTACK_RESPONSE id check returned root",
      "SURICATA HTTP suspicious User-Agent header (sqlmap)",
      "Nmap TCP SYN stealth sweep against high ports"
    ],
    actionableInsights: [
      "Cross-verify network alert timestamps with endpoint process creation logs",
      "Filter internal vulnerability scanner IPs to suppress routine noise",
      "Inspect TLS Server Name Indication (SNI) for suspicious external domains"
    ]
  },
  {
    id: "panel-endpoint",
    index: "03",
    title: "ENDPOINT MONITORING",
    tools: ["File Integrity Monitoring", "Vulnerability Detection", "Linux & Windows"],
    summary:
      "Continuous host-level telemetry, file system auditing, and automated vulnerability scanning.",
    detailedAnalysis:
      "Monitored endpoint file systems using Wazuh Syscheck engine for real-time diffs on critical files (/etc/shadow, system32). Conducted automated package vulnerability scans against national CVE databases.",
    sampleEventTypes: [
      "syscheck: Integrity checksum mismatch on /bin/su",
      "Wazuh Vulnerability Detector: CVE-2021-3156 (Baron Samedit) detected",
      "Process execution: nc -e /bin/bash spawned under www-data",
      "Windows Registry run-key addition for persistence"
    ],
    actionableInsights: [
      "Baseline golden images before applying FIM to eliminate false positives",
      "Prioritize CVE remediation based on network accessibility and exploitability score",
      "Audit SUID/SGID permissions systematically across Linux distributions"
    ]
  }
];

export const ATTACK_PATH_STAGES: AttackStage[] = [
  {
    id: "stage-1",
    stageNumber: "01",
    title: "RECONNAISSANCE",
    phase: "Information Gathering",
    tooling: "Netdiscover, Nmap, OSINT",
    description:
      "Identifying live hosts in the isolated lab subnet, cataloging open TCP/UDP ports, and mapping reachable services.",
    labFinding:
      "Discovered target VM IP 192.168.1.105 with Port 80 (HTTP), Port 22 (SSH), and Port 111 (RPC) exposed.",
    defensiveControl:
      "Enforce network segmentation; restrict management ports (SSH) via host firewall and bastion jump servers."
  },
  {
    id: "stage-2",
    stageNumber: "02",
    title: "ENUMERATION",
    phase: "Service Profiling",
    tooling: "Nmap -sV -sC, Nikto, Gobuster",
    description:
      "Deep fingerprinting of discovered services. Inspecting banner headers, robots.txt, web application versions, and CMS structures.",
    labFinding:
      "Identified outdated Drupal 7.x installation with known remote code execution vulnerabilities (Drupalgeddon2).",
    defensiveControl:
      "Maintain active software inventory; apply vendor security updates promptly; suppress software version headers."
  },
  {
    id: "stage-3",
    stageNumber: "03",
    title: "INITIAL ACCESS",
    phase: "Vulnerability Exploitation",
    tooling: "Metasploit, Custom Exploit Script",
    description:
      "Executing controlled exploitation against the identified vulnerability in an authorized testing environment to gain low-privilege shell access.",
    labFinding:
      "Leveraged CVE-2018-7600 via Metasploit to obtain a non-interactive reverse shell under the service user `www-data`.",
    defensiveControl:
      "Deploy Web Application Firewall (WAF) to detect malicious POST requests; run web processes in unprivileged, read-only containers."
  },
  {
    id: "stage-4",
    stageNumber: "04",
    title: "PRIVILEGE ESCALATION",
    phase: "Host Privilege Auditing",
    tooling: "LinPEAS, find / -perm -u=s, sudo -l",
    description:
      "Auditing internal host configuration, scheduled cron jobs, writable files, and misconfigured SUID binaries to elevate privileges to root.",
    labFinding:
      "Located `/usr/bin/find` binary with the SUID bit enabled, allowing immediate arbitrary command execution as `root` user (`find . -exec /bin/sh -p \\;`).",
    defensiveControl:
      "Periodically scan for unexpected SUID/SGID bits; adhere to the principle of least privilege; implement Linux file integrity monitoring."
  },
  {
    id: "stage-5",
    stageNumber: "05",
    title: "REMEDIATION",
    phase: "Hardening & Reporting",
    tooling: "Ansible, UFW, Wazuh FIM, Patching",
    description:
      "Formulating practical remediation advice, testing patches, establishing monitoring alerts, and producing an executive security debrief.",
    labFinding:
      "Removed the SUID bit on `/usr/bin/find`, updated Drupal core to patched version 7.58, and authored a Wazuh alert rule for www-data shell spawning.",
    defensiveControl:
      "Continuous posture assessment ensures discovered vulnerabilities are permanently resolved and audited against regression."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "siem",
    name: "SIEM & SECURITY MONITORING",
    description:
      "Hands-on event ingestion, correlation rule writing, dashboard creation, and SOC alert investigation workflows.",
    color: "#00ff88",
    position: [-2.5, 1.2, 0],
    skills: [
      { name: "Wazuh", level: "Intermediate", tag: "SIEM / XDR", focus: "Manager/Agent deployment, custom rules, FIM & active response" },
      { name: "Splunk", level: "Intermediate", tag: "Log Analytics", focus: "SPL query construction, index search, transaction modeling" },
      { name: "SPL", level: "Proficient", tag: "Query Language", focus: "Stats, eval, rex regex extraction, lookup tables" },
      { name: "Log Analysis", level: "Hands-on", tag: "Investigation", focus: "Auth.log, syslog, Windows Event IDs (4624, 4625, 7045)" },
      { name: "Alert Investigation", level: "Hands-on", tag: "SOC Workflow", focus: "Triage process, IOC extraction, false-positive tuning" }
    ]
  },
  {
    id: "network",
    name: "NETWORK SECURITY",
    description:
      "Packet-level traffic analysis, IDS signature configuration, network reconnaissance, and protocol fundamentals.",
    color: "#06b6d4",
    position: [2.5, 1.2, 0],
    skills: [
      { name: "Suricata IDS", level: "Intermediate", tag: "NIDS", focus: "Rule writing, eve.json inspection, alert flow correlation" },
      { name: "Nmap", level: "Proficient", tag: "Network Scanner", focus: "SYN stealth scans, OS fingerprinting, NSE scripting engine" },
      { name: "TCP/IP & Protocols", level: "Solid Foundation", tag: "Networking", focus: "Three-way handshake, TCP flags, stateful inspection" },
      { name: "DNS & SSH", level: "Hands-on", tag: "Protocols", focus: "Tunneling detection, brute-force patterns, DNS exfiltration" },
      { name: "Traffic Analysis", level: "Hands-on", tag: "PCAP / Wireshark", focus: "Flow reconstruction, header analysis, anomalous beacons" }
    ]
  },
  {
    id: "vapt",
    name: "VULNERABILITY ASSESSMENT",
    description:
      "Authorized vulnerability testing, lab exploitation chains, privilege escalation audits, and defensive remediation.",
    color: "#a855f7",
    position: [-2.5, -1.2, 0],
    skills: [
      { name: "Kali Linux", level: "Comfortable", tag: "OS Environment", focus: "Primary assessment distro, security toolkit orchestration" },
      { name: "Metasploit", level: "Intermediate", tag: "Framework", focus: "Auxiliary scanners, payload generation, post-exploitation" },
      { name: "Burp Suite", level: "Intermediate", tag: "Web Proxy", focus: "HTTP request interception, Repeater analysis, parameter tampering" },
      { name: "OWASP Top 10", level: "Conceptual & Lab", tag: "Web Security", focus: "SQL injection, broken auth, sensitive data exposure" },
      { name: "Linux Privilege Escalation", level: "Hands-on", tag: "Post-Exploitation", focus: "SUID abuse, cron exploitation, sudo configuration flaws" }
    ]
  },
  {
    id: "systems",
    name: "SYSTEMS & DEVELOPMENT",
    description:
      "System administration, automation scripting, containerized environments, and reproducible lab orchestration.",
    color: "#38bdf8",
    position: [2.5, -1.2, 0],
    skills: [
      { name: "Linux Administration", level: "Proficient", tag: "Core OS", focus: "Ubuntu/Debian, permissions, systemd, bash scripting" },
      { name: "Windows", level: "Comfortable", tag: "Endpoint", focus: "PowerShell basics, Event Viewer, service configurations" },
      { name: "Docker", level: "Intermediate", tag: "Containers", focus: "Containerized lab deployments, multi-container compose" },
      { name: "Python", level: "Intermediate", tag: "Scripting / ML", focus: "Automation scripts, log parsers, scikit-learn classifiers" },
      { name: "JavaScript & React", level: "Intermediate", tag: "Frontend Dev", focus: "UI engineering, interactive dashboards, modern CSS" },
      { name: "Git & GitHub", level: "Proficient", tag: "Version Control", focus: "Repository management, code documentation, CI basics" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "wazuh-siem-lab",
    title: "WAZUH SIEM & ENDPOINT THREAT MONITORING LAB",
    badge: "SOC • SIEM • FIM • IDS",
    category: "Security Operations & Monitoring",
    subtitle: "Multi-node threat detection architecture across Linux & Windows endpoints",
    description:
      "Built an enterprise-grade security monitoring lab using Wazuh across Linux and Windows systems. Configured File Integrity Monitoring (FIM), vulnerability detection, malicious command detection, SSH brute-force monitoring, and automated response playbooks. Integrated Suricata IDS and VirusTotal API for network intrusion and malicious file hash validation.",
    technologies: ["Wazuh", "Suricata", "Linux", "Windows", "Docker", "VirusTotal", "SIEM", "IDS", "FIM"],
    objective:
      "Establish an end-to-end simulated SOC monitoring environment to detect, correlate, and respond to endpoint and network anomalies in real-time.",
    labArchitecture:
      "Deployed a central Wazuh Manager and Indexer on Ubuntu Server. Connected 2 Ubuntu Linux agent endpoints and 1 Windows 10 VM. Configured Suricata IDS at the virtual switch interface and routed eve.json directly to Wazuh for centralized correlation.",
    monitoringCapabilities: [
      "File Integrity Monitoring (FIM) with real-time hash tracking on critical directories (/etc, /bin, system32)",
      "Automated SSH brute-force detection with progressive active response IP blocking",
      "Suricata network signature correlation with Suricata EVE log parsing",
      "VirusTotal integration triggering automated queries on newly downloaded executables",
      "Continuous CVE vulnerability matching against endpoint software packages"
    ],
    detectionWorkflow:
      "1. Malicious activity triggered on endpoint → 2. Agent captures audit log / file modification → 3. Sent via TLS to Wazuh Manager → 4. Wazuh rules engine matches rule ID & decoders → 5. Alert categorized by severity (Levels 1-15) → 6. Active response script isolates offending IP or terminates process.",
    toolsUsed: ["Wazuh Manager 4.x", "Wazuh Agent", "Suricata 7.x", "VirusTotal API", "Docker Compose", "Ubuntu Server", "Windows 10 Pro"],
    lessonsLearned: [
      "Importance of tuning rule thresholds to eliminate false positives caused by scheduled backup cron jobs.",
      "How to configure Wazuh decoders for custom application logs not supported out-of-the-box.",
      "Understanding the operational difference between network-level detection (Suricata) and host-level context (Wazuh FIM)."
    ],
    githubUrl: "https://github.com/manishkumar-cyber/wazuh-siem-threat-monitoring-lab",
    isSimulated: true,
    highlightStat: "100%",
    highlightLabel: "Lab Telemetry Ingestion"
  },
  {
    id: "dc1-vulnhub-vapt",
    title: "VAPT: DC-1 VULNHUB MACHINE",
    badge: "PENETRATION TESTING • PRIV-ESC",
    category: "Vulnerability Assessment & Penetration Testing",
    subtitle: "Complete authorized exploitation chain from Drupalgeddon2 to root SUID abuse",
    description:
      "Performed an in-depth penetration test against the DC-1 vulnerable virtual machine in an isolated, authorized lab environment. Executed systematic Nmap enumeration, exploited a Drupal remote code execution vulnerability (Drupalgeddon2, CVE-2018-7600) via Metasploit for initial foothold, and escalated privileges to root through an improperly permissioned SUID binary (`find`). Documented the exploitation chain, proof of concepts, and comprehensive remediation recommendations.",
    technologies: ["Kali Linux", "Nmap", "Metasploit", "Drupal", "Linux", "Privilege Escalation", "LinPEAS"],
    objective:
      "Perform an end-to-end security assessment against an isolated target VM, strictly following industry testing methodologies (PTES) and practicing responsible documentation.",
    labArchitecture:
      "Isolated Host-Only VMware virtual network connecting Kali Linux (192.168.1.100) and DC-1 VM (192.168.1.105). No connection to external networks to guarantee safe containment.",
    monitoringCapabilities: [
      "Network service enumeration & script scanning (-sV -sC -p-)",
      "Web CMS fingerprinting & known vulnerability verification",
      "Interactive shell stabilization and environment reconnaissance",
      "SUID/SGID privilege escalation vector analysis",
      "Defensive remediation verification and hardening checklist"
    ],
    detectionWorkflow:
      "Reconnaissance (Nmap discovered ports 22, 80, 111) → Web Enumeration (Identified Drupal 7) → Vulnerability Mapping (CVE-2018-7600) → Exploitation (Reverse TCP meterpreter session under www-data) → Post-Exploitation (Discovered /usr/bin/find with SUID flag) → Root Shell Acquisition → Report Generation.",
    toolsUsed: ["Kali Linux 2024", "Nmap", "Metasploit Framework", "LinPEAS", "Bash", "Netcat", "Drupal 7.x"],
    lessonsLearned: [
      "Why misconfigured SUID binaries present catastrophic privilege escalation risks on Linux systems.",
      "How unpatched CMS vulnerabilities expose web servers to unauthenticated remote code execution.",
      "How to write clear remediation guidance tailored to both system administrators and executive stakeholders."
    ],
    githubUrl: "https://github.com/manishkumar-cyber/dc1-vulnhub-vapt-report",
    isSimulated: false,
    highlightStat: "Root",
    highlightLabel: "Controlled Lab PrivEsc"
  },
  {
    id: "splunk-ssh-dashboard",
    title: "SPLUNK SSH MONITORING DASHBOARD",
    badge: "SPLUNK • SPL • BRUTE-FORCE DETECT",
    category: "Security Analytics & Log Engineering",
    subtitle: "Interactive authentication analytics, brute-force detection, and geo-correlation",
    description:
      "Engineered a dedicated security monitoring dashboard in Splunk using SPL queries to detect SSH brute-force attempts and authentication anomalies. Extracted authentication fields, calculated attempt velocity, and correlated client IP addresses against geographic lookups to provide actionable alerts for security analysts.",
    technologies: ["Splunk Enterprise", "SPL", "Linux", "SSH", "Log Analysis", "GeoIP Lookups"],
    objective:
      "Transform voluminous raw authentication logs (`/var/log/auth.log`) into clean visual telemetry, enabling rapid triage of unauthorized access attempts.",
    labArchitecture:
      "Splunk Universal Forwarder running on Linux target servers streaming `auth.log` over port 9997 to a central Splunk Enterprise Indexer. Custom index `os_security` configured with field extractions.",
    monitoringCapabilities: [
      "Real-time velocity tracking: alerts when >5 failed logins occur within 60 seconds from a single IP",
      "Top targeted usernames breakdown (root, admin, test, user)",
      "Interactive timepicker with drilldown capabilities to individual raw log lines",
      "Geolocation mapping of external source IPs",
      "Ratio tracking: Successful logins vs. Failed attempts"
    ],
    detectionWorkflow:
      "Logs streamed via Forwarder → Regex parsing of `sshd` failure messages → SPL aggregates counts by `src_ip`, `user` over 5m time bins → Alert triggered when threshold exceeded → Dashboard highlights top rogue IPs for firewall insertion.",
    toolsUsed: ["Splunk Enterprise", "Splunk Universal Forwarder", "SPL (Search Processing Language)", "Ubuntu 22.04 LTS", "Python log generator"],
    lessonsLearned: [
      "Optimizing SPL queries using streaming commands (`stats` over `dedup`) for faster indexing speed.",
      "Building resilient regex extractions that handle differing SSH daemon log formats across Linux versions.",
      "Designing dashboards with clean visual hierarchy to prevent cognitive overload for SOC Tier 1 analysts."
    ],
    githubUrl: "https://github.com/manishkumar-cyber/splunk-ssh-security-dashboard",
    isSimulated: true,
    highlightStat: "< 3s",
    highlightLabel: "Average SPL Triage Time"
  },
  {
    id: "url-phishing-detector",
    title: "URL PHISHING DETECTOR",
    badge: "AI/ML • HEURISTICS • WEB SECURITY",
    category: "Applied Security Tooling & Machine Learning",
    subtitle: "Hybrid machine learning and lexical feature extraction for real-time URL risk scoring",
    description:
      "Developed a hybrid phishing URL detection tool combining rule-based heuristic analysis and machine learning classifiers. Extracted 16 lexical and structural features (e.g., domain length, IP address in hostname, presence of suspicious tokens, entropy score, subdomain count) to classify URLs with explainable risk breakdowns.",
    technologies: ["Python", "Machine Learning", "Scikit-Learn", "Feature Engineering", "URL Analysis", "Flask"],
    objective:
      "Provide explainable, lightweight URL safety verification that educates end users and provides automated triage for suspected phishing links.",
    labArchitecture:
      "Trained Random Forest and Logistic Regression classifiers on balanced datasets of verified legitimate URLs and PhishTank verified phishing feeds. Bundled with a lightweight Python/Flask interactive test interface.",
    monitoringCapabilities: [
      "Extraction of 16 structural indicators including hyphen count, @ symbol, and suspicious TLDs (.xyz, .top, .tk)",
      "Calculation of domain Shannon entropy to flag randomized algorithmically-generated domains (DGA)",
      "Real-time probability score output alongside specific triggered heuristic red flags",
      "Zero external outbound navigation — completely safe, offline inspection sandbox"
    ],
    detectionWorkflow:
      "Input URL string → Lexical Feature Extractor parses components → Passes to trained ML Model pipeline → Outputs confidence score (%) → Highlights matching heuristic rules with human-readable rationale.",
    toolsUsed: ["Python 3.11", "Scikit-Learn", "Pandas", "PhishTank Dataset", "Flask", "Regex"],
    lessonsLearned: [
      "Balancing false positives: legitimate CDNs and shorteners often share lexical features with phishing pages.",
      "The necessity of combining ML inference with deterministic threat intelligence feeds for maximum reliability.",
      "Ensuring security tools never automatically request or trigger active DNS resolutions against untested untrusted domains."
    ],
    githubUrl: "https://github.com/manishkumar-cyber/url-phishing-detector-ml",
    isSimulated: false,
    highlightStat: "16",
    highlightLabel: "Extracted Security Indicators"
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "rcat-cyber-trainee",
    role: "Cyber Security Trainee",
    company: "Rajasthan Centre of Advanced Technology (RCAT)",
    location: "Jaipur, Rajasthan",
    period: "May 2026 – July 2026",
    type: "Intensive Practical Program",
    bullets: [
      "Completed hands-on practical training in network security architecture, protocol inspection, and cryptographic algorithms.",
      "Practiced web application security testing aligning with the OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, IDOR).",
      "Conducted ethical hacking and authorized penetration testing methodologies using Kali Linux, Nmap, Metasploit, and Burp Suite.",
      "Gained exposure to cloud security controls, identity and access management principles, and modern security operations."
    ],
    skills: ["Network Security", "Cryptography", "OWASP Top 10", "Kali Linux", "Nmap", "Metasploit", "Burp Suite", "Cloud Security"]
  },
  {
    id: "iquincesoft-web-dev",
    role: "Web Development Intern",
    company: "IQUINCESOFT",
    location: "Remote / Hybrid",
    period: "May 2025 – July 2025",
    type: "Frontend Engineering Internship",
    bullets: [
      "Developed modular, responsive user interfaces using ReactJS, modern JavaScript, and Tailwind CSS.",
      "Focused on mobile-first responsive architecture, cross-browser compatibility, and smooth UI navigation states.",
      "Collaborated using Git version control and deployed web platforms via automated GitHub Pages pipelines.",
      "Enhanced understanding of web application structure, client-server communication, and front-end security practices."
    ],
    skills: ["ReactJS", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Git", "GitHub Pages", "Responsive UI"]
  }
];

export const SIMULATED_LOGS = [
  { id: "log-1", time: "12:54:02", host: "srv-auth-01", service: "sshd", level: "HIGH", msg: "Failed password for invalid user admin from 185.220.101.45 port 42890 ssh2", tag: "SSH_BRUTE_FORCE" },
  { id: "log-2", time: "12:54:04", host: "srv-auth-01", service: "sshd", level: "HIGH", msg: "Failed password for invalid user root from 185.220.101.45 port 42894 ssh2", tag: "SSH_BRUTE_FORCE" },
  { id: "log-3", time: "12:54:12", host: "wazuh-agent-02", service: "syscheck", level: "CRITICAL", msg: "File integrity change detected on /etc/passwd (Checksum SHA1 mismatch)", tag: "FIM_INTEGRITY_ALERT" },
  { id: "log-4", time: "12:54:19", host: "gateway-ids", service: "suricata", level: "MEDIUM", msg: "ET SCAN Potential Nmap SYN stealth probe detected [192.168.1.100 -> 192.168.1.105]", tag: "SURICATA_PROBE" },
  { id: "log-5", time: "12:54:33", host: "web-srv-drupal", service: "apache2", level: "HIGH", msg: "POST /user/register?element_parents=account/mail/#value&ajax_form=1 HTTP/1.1 (200 OK)", tag: "CVE-2018-7600_ATTEMPT" },
  { id: "log-6", time: "12:54:48", host: "wazuh-manager", service: "active-response", level: "ACTION", msg: "Active response playbook triggered: host-deny.sh executed for IP 185.220.101.45 (Duration: 3600s)", tag: "IP_BLOCKED" }
];
