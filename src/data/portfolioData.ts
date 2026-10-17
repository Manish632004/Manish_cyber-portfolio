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

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
}

export const PERSONAL_DATA = {
  name: "Manish Kumar",
  brandName: "MANISH.K",
  shortTitle: "CYBERSECURITY GRADUATE | SOC & VAPT",
  heroBadge: "CYBERSECURITY GRADUATE • SOC & VAPT",
  headlineMain: "SECURING THE",
  headlineAccent: "DIGITAL FRONTIER.",
  heroSubcopy:
    "I'm Manish Kumar, a Computer Science graduate from Bharatpur, Rajasthan, India. With hands-on experience in SIEM threat monitoring, alert triage, and defensive security, I am actively seeking an entry-level SOC Analyst (L1) role.",
  availabilityStatus: "SEEKING ENTRY-LEVEL SOC ANALYST (L1) ROLE",
  targetRoles: ["SOC Analyst (L1)", "Security Analyst", "SIEM Analyst", "Junior VAPT Analyst"],
  location: "Bharatpur, Rajasthan, India",
  email: "manish632004@gmail.com",
  phone: "+91 7457835848",
  portfolioUrl: "https://manish-cyber-portfolio.vercel.app",
  linkedin: "https://linkedin.com/in/manish-kumar63",
  github: "https://github.com/Manish632004",
  resumePath: "/Manish_Kumar_SOC_Analyst.pdf",
  bioHeadline: "HANDS-ON SIEM MONITORING, ALERT TRIAGE & VAPT.",
  bioSummary: [
    "I'm Manish Kumar, a Computer Science graduate (B.Tech, 2026) with hands-on experience in SIEM monitoring, security log analysis, and alert triage. Built a 3-VM home SOC lab with Wazuh in Docker, Suricata IDS, and Splunk with MITRE ATT&CK-mapped detection rules.",
    "Engineered a Web Application Firewall (SafeLine WAF) reverse proxy lab blocking SQL injection and HTTP flood attacks, and conducted full-scope penetration testing on VulnHub DC-1 gaining root privileges via Drupalgeddon and SUID binary exploitation.",
    "Actively seeking an entry-level SOC Analyst (L1) role where I can apply my threat investigation, alert triage, log correlation, and offensive security foundations to safeguard production infrastructure."
  ],
  education: {
    degree: "B.Tech. in Computer Science and Engineering",
    institution: "Government Engineering College Bharatpur (RTU, Kota)",
    period: "2022 – 2026",
    location: "Bharatpur, Rajasthan",
    cgpa: "7.69"
  },
  principles: [
    {
      title: "OBSERVE",
      summary: "Continuously monitor endpoint & network telemetry, baseline normal traffic, and ingest logs with Wazuh and Splunk."
    },
    {
      title: "INVESTIGATE",
      summary: "Analyze security events, map alerts to MITRE ATT&CK techniques, and triage alerts without false-positive assumptions."
    },
    {
      title: "DEFEND",
      summary: "Deploy automated active response rules, configure SafeLine WAF protections, and implement actionable remediation."
    }
  ],
  learningFocus: [
    { title: "SOC Alert Triage & Incident Response", desc: "Alert prioritization, severity escalation, IOC extraction, and incident triage playbooks." },
    { title: "SIEM Detection & Log Analysis", desc: "Constructing targeted Wazuh rules and high-confidence Splunk SPL queries mapped to MITRE ATT&CK." },
    { title: "Network Security & IDS/IPS", desc: "Suricata rule syntax, Wireshark packet dissection, TCP/IP flow analysis, and TLS inspection." },
    { title: "Web Application Defense (WAF)", desc: "SafeLine WAF reverse proxy, OpenSSL RSA certificates, rate limiting, and SQL injection blocking." },
    { title: "VAPT & OWASP Top 10", desc: "Authorized testing using Kali Linux, Nmap, Metasploit, Burp Suite, and Linux privilege escalation." },
    { title: "Threat Intelligence & Remediation", desc: "VirusTotal API integration, patch verification, SUID permission auditing, and executive debriefs." }
  ],
  certifications: [
    {
      name: "Certified LLM Security Expert (CLLMSE)",
      issuer: "Red Team Leaders",
      date: "Aug 2026",
      credentialId: "93d4b823297411b1",
      status: "Verified",
      verified: true,
      description: "Advanced certification covering LLM threat modeling, prompt injection vulnerabilities, model poisoning, and defense-in-depth security controls."
    },
    {
      name: "Cyber Security 101",
      issuer: "TryHackMe",
      date: "Jun 2026",
      credentialId: "THM-KS3BYQP176",
      status: "Verified",
      verified: true,
      description: "Foundational security certification covering core networking, web security fundamentals, Linux security, cryptography, and offensive security basics."
    },
    {
      name: "Cybersecurity Analyst Job Simulation",
      issuer: "Tata via Forage",
      date: "Jun 2026",
      credentialId: "P3Rwbp7c4QZofRv2j",
      status: "Verified",
      verified: true,
      description: "Simulated real-world SOC analyst duties including identity and access management auditing, threat risk assessment, and incident communication."
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
      "Centralized event ingestion, correlation rule writing, and alert triage across distributed 3-VM architecture.",
    detailedAnalysis:
      "Deployed Wazuh SIEM in Docker to aggregate auth.log, auditd, and Windows Event Logs. Authored 4 custom Splunk SPL queries mapped to MITRE ATT&CK T1110 (failed logins, repeated authentication failures, successful logins, unauthenticated connections) and an investigation dashboard with geo-location.",
    sampleEventTypes: [
      "sshd: Failed password for invalid user root (MITRE ATT&CK T1110)",
      "auditd: Execution of suspicious binary by unprivileged user",
      "File Integrity Monitoring: /etc/passwd checksum SHA1 modified",
      "Wazuh Rule 5712: SSH brute force surge triggering active-response"
    ],
    actionableInsights: [
      "Correlate failed attempts with IP reputation before escalating alerts",
      "Threshold tuning prevents alert fatigue for routine administrative maintenance",
      "FIM alerts on critical binary directories require immediate host isolation"
    ]
  },
  {
    id: "panel-network",
    index: "02",
    title: "NETWORK & IDS DETECTION",
    tools: ["Suricata IDS", "Wireshark", "VirusTotal", "Network Security"],
    summary:
      "Signature and anomaly-based intrusion detection with automated packet inspection and malicious hash validation.",
    detailedAnalysis:
      "Integrated Suricata IDS to inspect bidirectional traffic across perimeter and internal subnets. Connected VirusTotal API with Wazuh to automatically validate newly downloaded binaries and stopped SSH brute-force attacks via automated active-response IP blocking.",
    sampleEventTypes: [
      "ET SCAN Potential SSH Brute Force Inbound (MITRE T1110)",
      "SURICATA HTTP suspicious User-Agent header (sqlmap)",
      "VirusTotal API: Malicious hash score 48/70 on downloaded binary",
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
    title: "WAF & DEFENSIVE SECURITY",
    tools: ["SafeLine WAF", "OpenSSL", "DVWA", "Reverse Proxy"],
    summary:
      "Web Application Firewall reverse proxy defense with 4096-bit RSA TLS and automated attack mitigation.",
    detailedAnalysis:
      "Configured SafeLine WAF as an HTTPS reverse proxy with a 4096-bit RSA certificate created in OpenSSL. Protected DVWA by blocking SQL injection from Kali Linux, stopping HTTP floods with a rate limit of 3 req/10s, and enforcing IP blocklists.",
    sampleEventTypes: [
      "SafeLine WAF: SQL injection payload blocked in query parameters",
      "SafeLine Rate Limiter: IP dropped after exceeding 3 req/10s threshold",
      "OpenSSL TLS 1.3 Handshake completed using 4096-bit RSA certificate",
      "Access denied: Unauthenticated request intercepted by WAF gate"
    ],
    actionableInsights: [
      "Enforce HTTPS reverse proxy architecture to protect legacy backend web services",
      "Apply strict rate limits to login and registration endpoints to stop credential stuffing",
      "Verify WAF rule effectiveness by testing with detection both enabled and disabled"
    ]
  }
];

export const ATTACK_PATH_STAGES: AttackStage[] = [
  {
    id: "stage-1",
    stageNumber: "01",
    title: "RECONNAISSANCE",
    phase: "Information Gathering",
    tooling: "Nmap, Netdiscover, Kali Linux",
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
      "Identified outdated Drupal 7.x installation with known remote code execution vulnerabilities (Drupalgeddon2, CVE-2018-7600).",
    defensiveControl:
      "Maintain active software inventory; apply vendor security updates promptly; suppress software version headers."
  },
  {
    id: "stage-3",
    stageNumber: "03",
    title: "INITIAL ACCESS",
    phase: "Vulnerability Exploitation",
    tooling: "Metasploit, Kali Linux",
    description:
      "Executing controlled exploitation against the identified vulnerability in an authorized testing environment to gain low-privilege shell access.",
    labFinding:
      "Leveraged Drupalgeddon RCE (CVE-2018-7600) via Metasploit to obtain a non-interactive reverse shell under service user `www-data`.",
    defensiveControl:
      "Deploy Web Application Firewall (SafeLine WAF) to detect malicious POST requests; run web processes in unprivileged, read-only containers."
  },
  {
    id: "stage-4",
    stageNumber: "04",
    title: "PRIVILEGE ESCALATION",
    phase: "Host Privilege Auditing",
    tooling: "LinPEAS, find / -perm -u=s, SUID",
    description:
      "Auditing internal host configuration, scheduled cron jobs, writable files, and misconfigured SUID binaries to elevate privileges to root (MITRE ATT&CK T1548.001).",
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
    tooling: "Patching, Permissions, Wazuh FIM, SafeLine WAF",
    description:
      "Formulating practical remediation advice, testing patches, establishing monitoring alerts, and producing a complete penetration test report.",
    labFinding:
      "Removed the SUID bit on `/usr/bin/find`, updated Drupal core, placed SafeLine WAF in front, and documented the complete attack chain in a formal report.",
    defensiveControl:
      "Continuous posture assessment ensures discovered vulnerabilities are permanently resolved and audited against regression."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "security-ops",
    name: "SECURITY & OPERATIONS",
    description:
      "Core defensive capabilities, threat monitoring, alert triage, incident response, and web application security.",
    color: "#00ff88",
    position: [-2.5, 1.2, 0],
    skills: [
      { name: "SIEM & Log Analysis", level: "Proficient", tag: "Defensive", focus: "Centralized log ingestion, correlation, and auth.log auditing" },
      { name: "Alert Triage & Incident Response", level: "Hands-on", tag: "SOC Workflow", focus: "Alert investigation, IOC extraction, and active-response playbooks" },
      { name: "MITRE ATT&CK Framework", level: "Applied", tag: "Taxonomy", focus: "T1110 (Brute Force), T1548.001 (SUID Abuse) mappings" },
      { name: "VAPT & Ethical Hacking", level: "Hands-on", tag: "Offensive", focus: "Service enumeration, exploit verification, and privilege escalation" },
      { name: "OWASP Top 10 & Web Security", level: "Proficient", tag: "AppSec", focus: "SQL injection, broken access control, parameter tampering" },
      { name: "Network Security & IDS/IPS", level: "Proficient", tag: "Network", focus: "Suricata IDS signature tuning, traffic inspection, and firewalls" }
    ]
  },
  {
    id: "security-tools",
    name: "SECURITY TOOLS",
    description:
      "Industry-standard tools for intrusion detection, vulnerability assessment, SIEM analysis, and firewall protection.",
    color: "#06b6d4",
    position: [2.5, 1.2, 0],
    skills: [
      { name: "Wazuh SIEM", level: "Proficient", tag: "SIEM / XDR", focus: "Docker deployment, agent management, FIM, auditd monitoring" },
      { name: "Splunk (SPL)", level: "Proficient", tag: "Analytics", focus: "4 custom SPL detection queries, dashboard engineering, GeoIP" },
      { name: "Suricata IDS", level: "Intermediate", tag: "NIDS", focus: "Rule writing, eve.json parsing, network intrusion detection" },
      { name: "SafeLine WAF", level: "Hands-on", tag: "WAF Defense", focus: "HTTPS reverse proxy, SQLi blocking, rate-limit flood protection" },
      { name: "Burp Suite", level: "Intermediate", tag: "Web Proxy", focus: "Request interception, Repeater analysis, parameter tampering" },
      { name: "Nmap & Metasploit", level: "Proficient", tag: "Assessment", focus: "SYN stealth scans, NSE scripting, authorized RCE exploitation" },
      { name: "Wireshark & OpenSSL", level: "Hands-on", tag: "Protocols", focus: "PCAP dissection, 4096-bit RSA certificate generation" }
    ]
  },
  {
    id: "languages-web",
    name: "LANGUAGES & WEB",
    description:
      "Programming, automation scripting, machine learning modeling, and full-stack web development.",
    color: "#a855f7",
    position: [-2.5, -1.2, 0],
    skills: [
      { name: "Python", level: "Proficient", tag: "Scripting / ML", focus: "Scikit-learn phishing classifier, entropy calculation, automation" },
      { name: "Bash & Linux Shell", level: "Proficient", tag: "Scripting", focus: "Automated triage scripts, log parsing, system administration" },
      { name: "SQL", level: "Intermediate", tag: "Database", focus: "Query analysis, database auditing, SQL injection payload understanding" },
      { name: "JavaScript & React.js", level: "Proficient", tag: "Frontend", focus: "Interactive web interfaces, telemetry dashboards, state logic" },
      { name: "Node.js & Express.js", level: "Intermediate", tag: "Backend", focus: "REST APIs, server-side logic, secure routing" },
      { name: "Flask & REST APIs", level: "Intermediate", tag: "Web Services", focus: "Lightweight API endpoints for machine learning models" }
    ]
  },
  {
    id: "platforms-networking",
    name: "PLATFORMS & NETWORKING",
    description:
      "Operating systems, virtualization environments, networking protocols, and secure network infrastructure.",
    color: "#38bdf8",
    position: [2.5, -1.2, 0],
    skills: [
      { name: "Kali Linux & Ubuntu", level: "Proficient", tag: "Linux OS", focus: "Primary security assessment and server environments" },
      { name: "Windows 11 & Windows Server", level: "Comfortable", tag: "Endpoints", focus: "Event Viewer (Event ID 4624/4625), endpoint monitoring" },
      { name: "Docker & Containerization", level: "Intermediate", tag: "DevOps", focus: "Dockerized Wazuh SIEM deployment, isolated container labs" },
      { name: "VMware & VirtualBox", level: "Proficient", tag: "Virtualization", focus: "Multi-VM isolated lab topologies (3-VM SOC, 2-VM WAF)" },
      { name: "TCP/IP, DNS & HTTP/HTTPS", level: "Solid Foundation", tag: "Protocols", focus: "Handshake mechanics, DNS resolution, TLS encryption" },
      { name: "SSH, Firewalls & Reverse Proxy", level: "Hands-on", tag: "Infrastructure", focus: "Port hardening, iptables/UFW, SafeLine reverse proxy" },
      { name: "Git & GitHub", level: "Proficient", tag: "Version Control", focus: "Repository management, code documentation, CI basics" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "wazuh-siem-lab",
    title: "SIEM & THREAT DETECTION LAB",
    badge: "WAZUH • SURICATA • SPLUNK • MITRE ATT&CK",
    category: "Security Operations & Threat Detection",
    subtitle: "3-VM Dockerized SOC Lab with Automated Active-Response & Threat Correlation",
    description:
      "Built a 3-VM home SOC lab (Ubuntu, Windows 11, Kali Linux) with Wazuh in Docker, monitoring Linux and Windows endpoints for file integrity changes, vulnerabilities, and malicious commands (auditd). Detected network intrusions and malicious files by integrating Suricata IDS and VirusTotal with Wazuh, and stopped SSH brute-force attacks (MITRE ATT&CK T1110) with automated active-response blocking. Wrote 4 Splunk SPL detection queries mapped to MITRE ATT&CK T1110 and built a visual dashboard with geo-location to investigate SSH attacks.",
    technologies: ["Wazuh", "Suricata IDS", "Splunk Enterprise", "SPL", "Linux", "Windows 11", "Kali Linux", "Docker", "VirusTotal", "MITRE ATT&CK T1110"],
    objective:
      "Establish an end-to-end 3-VM SOC monitoring environment to detect, correlate, and automatically respond to endpoint and network threats.",
    labArchitecture:
      "3-VM topology running Ubuntu, Windows 11, and Kali Linux. Wazuh Manager deployed in Docker orchestrating agents on Linux and Windows endpoints. Suricata IDS monitors network packets at the virtual gateway; Splunk Enterprise ingests authentication telemetry over forwarder channels.",
    monitoringCapabilities: [
      "File Integrity Monitoring (FIM) tracking real-time checksum modifications on critical files (/etc/passwd, system32)",
      "Auditd command logging monitoring unprivileged user executions and privilege escalation attempts",
      "Suricata IDS integration and VirusTotal API automated file hash scanning",
      "Automated Wazuh active-response blocking of SSH brute-force attackers (MITRE ATT&CK T1110)",
      "4 Splunk SPL detection queries: failed logins, repeated auth failures, successful logins, and unauthenticated sessions"
    ],
    detectionWorkflow:
      "1. Brute-force or malicious action triggered from Kali Linux → 2. Suricata IDS detects signature & Wazuh agent captures auth.log/auditd → 3. Correlated in Wazuh Manager (Rule 5712, MITRE T1110) → 4. Automated active-response script drops attacker IP via host firewall → 5. Telemetry indexed into Splunk with GeoIP visualization.",
    toolsUsed: ["Wazuh Manager (Docker)", "Wazuh Agent", "Suricata IDS", "Splunk Enterprise", "Splunk Universal Forwarder", "SPL", "VirusTotal API", "Ubuntu", "Windows 11", "Kali Linux"],
    lessonsLearned: [
      "Configuring Wazuh auditd rules to capture suspicious process executions by unprivileged users.",
      "Synthesizing network IDS alerts from Suricata with host-based file integrity alerts in a unified SIEM dashboard.",
      "Constructing performant Splunk SPL queries mapped directly to MITRE ATT&CK tactical matrices."
    ],
    githubUrl: "https://github.com/Manish632004/Wazuh-SIEM-Endpoint-Threat-Monitoring-Lab",
    isSimulated: true,
    highlightStat: "3-VM",
    highlightLabel: "Dockerized SOC Lab"
  },
  {
    id: "safeline-waf-lab",
    title: "WEB APPLICATION FIREWALL LAB",
    badge: "SAFELINE WAF • DVWA • HTTPS REVERSE PROXY",
    category: "Web Application Defense & Reverse Proxy",
    subtitle: "2-VM SafeLine WAF Deployment Blocking SQL Injection & HTTP Floods",
    description:
      "Protected a vulnerable web application (DVWA) in a 2-VM lab by placing SafeLine WAF in front of it as an HTTPS reverse proxy, configured with a 4096-bit RSA certificate made in OpenSSL and plain HTTP disabled. Blocked SQL injection from a Kali Linux attacker (confirmed by switching detection off and on), stopped HTTP floods with a rate limit of 3 requests per 10 seconds, and added IP block rules and an authentication gate.",
    technologies: ["SafeLine WAF", "DVWA", "Apache", "OpenSSL", "Kali Linux", "Reverse Proxy", "TLS 4096-bit", "SQLi Defense", "Rate Limiting"],
    objective:
      "Harden vulnerable web infrastructure against OWASP Top 10 exploits and denial-of-service floods by deploying and configuring an enterprise Web Application Firewall.",
    labArchitecture:
      "2-VM isolated topology: SafeLine WAF operating as a reverse proxy gateway terminating HTTPS with a custom 4096-bit OpenSSL RSA key, routing sanitized traffic to an internal Apache server hosting DVWA on an isolated subnet.",
    monitoringCapabilities: [
      "HTTPS reverse proxy with custom 4096-bit RSA certificate and plain HTTP disabled",
      "Real-time SQL injection inspection and signature blocking from Kali attacker",
      "HTTP flood rate limiting configured to enforce 3 requests per 10-second threshold",
      "Dynamic IP blocklists and pre-application authentication protection gates",
      "WAF traffic telemetry analytics detailing blocked payloads and attack origin"
    ],
    detectionWorkflow:
      "Inbound client HTTP/S traffic → Intercepted by SafeLine WAF reverse proxy → SSL decryption via 4096-bit key → Deep inspection against SQLi & flood heuristics → Malicious request blocked with 403 Forbidden / Rate Limit drop → Only sanitized requests forwarded to backend DVWA.",
    toolsUsed: ["SafeLine WAF", "DVWA (Damn Vulnerable Web App)", "Apache2", "OpenSSL", "Kali Linux", "Burp Suite", "Ubuntu Server"],
    lessonsLearned: [
      "How to configure zero-trust reverse proxy routing and enforce TLS encryption with OpenSSL.",
      "Fine-tuning rate-limiting thresholds to prevent HTTP flood denial of service without blocking legitimate users.",
      "Validating WAF effectiveness by methodically executing SQL injection with detection enabled and disabled."
    ],
    githubUrl: "https://github.com/Manish632004/SafeLine-Web-Application-Firewall",
    isSimulated: true,
    highlightStat: "4096-bit",
    highlightLabel: "RSA TLS Reverse Proxy"
  },
  {
    id: "dc1-vulnhub-vapt",
    title: "VAPT: DC-1 (VULNHUB)",
    badge: "PENETRATION TESTING • DRUPALGEDDON • SUID PRIV-ESC",
    category: "Vulnerability Assessment & Penetration Testing",
    subtitle: "End-to-End Root Exploitation via Drupalgeddon & SUID Binary Abuse",
    description:
      "Gained root access end to end: enumerated services with Nmap, exploited a Drupal remote code execution flaw (Drupalgeddon) with Metasploit, and escalated privileges through a misconfigured SUID binary (MITRE ATT&CK T1548.001). Documented the full attack chain with remediation steps in a penetration test report.",
    technologies: ["Kali Linux", "Nmap", "Metasploit", "Drupal", "LinPEAS", "SUID Misconfiguration", "MITRE ATT&CK T1548.001", "Linux"],
    objective:
      "Conduct a comprehensive vulnerability assessment and penetration test adhering to PTES guidelines and produce an actionable remediation debrief.",
    labArchitecture:
      "Isolated Host-Only VMware network linking Kali Linux assessment workstation (192.168.1.100) and DC-1 target VM (192.168.1.105).",
    monitoringCapabilities: [
      "Comprehensive Nmap service enumeration (-sV, -sC, full TCP sweep)",
      "Drupalgeddon2 (CVE-2018-7600) remote code execution verification",
      "Interactive reverse meterpreter shell stabilization",
      "Host configuration audit uncovering `/usr/bin/find` SUID privilege escalation (MITRE T1548.001)",
      "Comprehensive vulnerability remediation report with mitigation steps"
    ],
    detectionWorkflow:
      "Reconnaissance (Nmap discovered ports 22, 80, 111) → Web Enumeration (Identified Drupal 7) → Vulnerability Mapping (Drupalgeddon RCE) → Exploitation (Reverse TCP meterpreter session under www-data) → Post-Exploitation (Discovered /usr/bin/find with SUID flag) → Root Shell Acquisition → Report Generation.",
    toolsUsed: ["Kali Linux", "Nmap", "Metasploit Framework", "LinPEAS", "Drupal 7.x", "Bash", "Netcat"],
    lessonsLearned: [
      "Risks associated with misconfigured SUID bits on standard administrative utilities like `find`.",
      "The importance of timely CMS patching to prevent unauthenticated remote code execution.",
      "Writing high-impact penetration test reports that assist system administrators in hardening Linux baselines."
    ],
    githubUrl: "https://github.com/Manish632004/dc1-vulnhub-vapt",
    isSimulated: false,
    highlightStat: "Root",
    highlightLabel: "End-to-End PrivEsc"
  },
  {
    id: "url-phishing-detector",
    title: "PHISHING URL DETECTOR",
    badge: "AI/ML • RANDOM FOREST • FLASK",
    category: "Applied Security Tooling & Machine Learning",
    subtitle: "Hybrid Classifier with 20 Lexical Features & 100% Evaluation Metric",
    description:
      "Built a hybrid phishing URL detector in Python (3 rules plus a Random Forest on 20 features such as domain entropy), achieving 100% precision, recall and F1 on an 800-URL held-out test set; deployed as a Flask app with explainable verdicts.",
    technologies: ["Python", "scikit-learn", "Flask", "Feature Engineering", "Domain Entropy", "Random Forest", "REST API"],
    objective:
      "Deliver a fast, transparent phishing URL risk classifier that provides clear reasoning for security analysts and end users.",
    labArchitecture:
      "Python machine learning pipeline with automated feature extraction, scikit-learn model serialization, and lightweight Flask API interface with real-time analysis visualization.",
    monitoringCapabilities: [
      "20 extracted lexical & structural features including domain Shannon entropy",
      "3 deterministic heuristic rules flagging credential harvesting indicators",
      "100% precision, recall, and F1 on 800-URL held-out evaluation test set",
      "Transparent explainability breakdown for every inspected URL string",
      "Safe, isolated evaluation engine with zero external network requests"
    ],
    detectionWorkflow:
      "Input URL string → Lexical Feature Extractor parses 20 components & entropy → Passes to trained Random Forest pipeline → Outputs confidence score (%) → Highlights matching heuristic rules with human-readable rationale.",
    toolsUsed: ["Python 3.11", "scikit-learn", "Flask", "Pandas", "NumPy", "Regex"],
    lessonsLearned: [
      "Feature engineering domain entropy to detect algorithmically generated domains (DGA).",
      "Balancing rule-based heuristics with statistical classifiers to minimize false positives.",
      "Building explainable AI interfaces for rapid triage in security operations."
    ],
    githubUrl: "https://github.com/Manish632004/Phishing_URL_Detector",
    isSimulated: false,
    highlightStat: "100%",
    highlightLabel: "Precision / Recall / F1"
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "rcat-cyber-trainee",
    role: "Cyber Security Trainee",
    company: "Rajasthan Centre of Advanced Technology",
    location: "Jaipur, Rajasthan",
    period: "05/2026 – 07/2026",
    type: "Cyber Security Training",
    bullets: [
      "Completed hands-on training in SOC operations, SIEM monitoring, and security log analysis.",
      "Practiced threat detection, incident response fundamentals, and network security controls.",
      "Executed web application security testing covering the OWASP Top 10 vulnerabilities.",
      "Conducted penetration testing using Kali Linux, Nmap, Metasploit, and Burp Suite."
    ],
    skills: ["SOC Operations", "SIEM Monitoring", "Log Analysis", "Threat Detection", "Incident Response", "Network Security", "OWASP Top 10", "Penetration Testing", "Kali Linux", "Nmap", "Metasploit", "Burp Suite"]
  },
  {
    id: "iquincesoft-web-dev",
    role: "Web Development Intern",
    company: "IQUINCESOFT",
    location: "Mathura, Uttar Pradesh",
    period: "05/2025 – 07/2025",
    type: "Web Development Internship",
    bullets: [
      "Built responsive web interfaces with React.js, JavaScript, and Tailwind CSS.",
      "Ensured cross-device responsiveness and fluid interactive states for client demos.",
      "Deployed client demo projects on GitHub Pages for live stakeholder verification and testing."
    ],
    skills: ["React.js", "JavaScript", "Tailwind CSS", "GitHub Pages", "Responsive UI", "Web Applications"]
  }
];

export const SIMULATED_LOGS = [
  { id: "log-1", time: "12:54:02", host: "srv-auth-01", service: "sshd", level: "HIGH", msg: "Failed password for invalid user admin from 185.220.101.45 port 42890 ssh2 (MITRE T1110)", tag: "SSH_BRUTE_FORCE" },
  { id: "log-2", time: "12:54:04", host: "srv-auth-01", service: "sshd", level: "HIGH", msg: "Repeated authentication failure: 5 invalid attempts in 10s from 185.220.101.45", tag: "SSH_BRUTE_FORCE" },
  { id: "log-3", time: "12:54:12", host: "wazuh-agent-02", service: "syscheck", level: "CRITICAL", msg: "File integrity change detected on /etc/passwd (Checksum SHA1 mismatch)", tag: "FIM_INTEGRITY_ALERT" },
  { id: "log-4", time: "12:54:19", host: "safeline-waf", service: "waf-engine", level: "HIGH", msg: "SafeLine WAF: SQL injection payload blocked in query parameters (Client IP: 192.168.1.100)", tag: "SQLI_BLOCKED" },
  { id: "log-5", time: "12:54:33", host: "safeline-waf", service: "rate-limiter", level: "MEDIUM", msg: "HTTP Flood threshold exceeded (>3 req/10s): Client rate-limited and dropped", tag: "RATE_LIMIT_DROP" },
  { id: "log-6", time: "12:54:48", host: "wazuh-manager", service: "active-response", level: "ACTION", msg: "Active response playbook triggered: host-deny.sh executed for IP 185.220.101.45 (Duration: 3600s)", tag: "IP_BLOCKED" }
];
