# MANISH.K — IMMERSIVE 3D CYBERSECURITY PORTFOLIO

> **Exploring the digital frontier. Detecting threats. Securing systems.**

A cinematic, futuristic WebGL & 3D cybersecurity portfolio website built for **Manish Kumar**, targeting **SOC Analyst L1**, **Security Analyst**, **SIEM Analyst**, and **Junior VAPT** positions.

Designed with an aesthetic fusion of an **Apple-level high-end digital experience**, an **award-winning Three.js WebGL space**, and a **next-generation Security Operations Center (SOC)** command interface.

---

## 🛡️ Live Architecture & Highlights

- **Obsidian Black & Midnight Blue Visual Identity**: Deep atmospheric styling (`#020408`), vibrant electric green security status beacons (`#00ff88`), icy cyan data streams (`#06b6d4`), and soft violet volumetric lighting.
- **Cinematic 3D WebGL Canvas**:
  - **Scene 1 (The Digital Frontier)**: Rotating Fibonacci spherical network suspended in space with cyan/green glowing nodes, pulsing connections, tiny floating cyber particles, and mouse parallax.
  - **Scene 2 (Inside the Network)**: Expanding digital infrastructure with server blocks, traversing data streams, and scanning laser planes.
  - **Scene 3 (Security Operations Center)**: Floating holographic monitoring displays, abstract server racks, and revolving telemetry radar.
  - **Scene 4 (The Attack Surface)**: Vulnerable 3D system architecture with a 5-phase interactive penetration testing sequence (*Reconnaissance → Enumeration → Initial Access → Privilege Escalation → Remediation*).
  - **Scene 6 (Technical Arsenal)**: Orbiting 3D skill constellation around a rotating multi-layer security core.
- **Interactive Cyber Tools & Simulators**:
  - **Phishing URL Risk Inspector (Project 04)**: Live client-side lexical analysis evaluating 16 structural indicators and Shannon entropy with zero outbound requests.
  - **Splunk & Wazuh Telemetry Console**: Interactive log filtering, search bar, and triage notes for simulated authentication surges, FIM deltas, and IDS alerts.
  - **Deep-Dive Project Modals**: Complete architecture diagrams, detection engineering workflows, and defensive remediation takeaways.
- **Audio Synthesizer Engine**: Subtle, non-intrusive cyber feedback synthesized procedurally via the native Web Audio API (toggleable in Navbar).
- **Graceful Fallbacks & High-Fi / Eco Toggle**: Includes a non-WebGL SVG/CSS telemetry canvas and a one-click 3D / Eco mode toggle for lower-power devices.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation
```bash
# Clone or navigate to the workspace
cd Portfolio_oct

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🗂️ Project Structure

```
Portfolio_oct/
├── index.html                   # HTML entry point with Google Fonts & Cyber Shield Icon
├── package.json                 # Dependencies (React 19, Three.js, R3F, Drei, Lucide, Tailwind)
├── vite.config.ts               # Vite configuration with @tailwindcss/vite
├── src/
│   ├── main.tsx                 # Application root mounting
│   ├── App.tsx                  # Master application layout coordinating 10 scenes & 3D camera
│   ├── index.css                # Base Tailwind v4 styling, custom scrollbars, and cyber glows
│   ├── data/
│   │   └── portfolioData.ts     # Centralized editable configuration for personal info & projects
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CyberScene.tsx            # Master Three.js Canvas & camera interpolator
│   │   │   ├── DigitalFrontierSphere.tsx # Scene 1: Fibonacci network sphere
│   │   │   ├── NetworkInfrastructure.tsx # Scene 2: Server racks & scanning radar
│   │   │   ├── SocCommandCenter.tsx      # Scene 3: Holographic SOC monitoring displays
│   │   │   ├── AttackPathStructure.tsx   # Scene 4: 3D attack path & target prism
│   │   │   ├── SkillConstellation.tsx    # Scene 6: Orbiting skill clusters & core
│   │   │   ├── CyberBackground.tsx       # Ambient cyber dust & perspective grid
│   │   │   └── FallbackScene.tsx         # High-tech non-WebGL animated fallback
│   │   ├── ui/
│   │   │   ├── Navbar.tsx                # HUD header, live security status, sound & 3D toggles
│   │   │   ├── ScrollProgress.tsx        # Top neon progress laser & sector telemetry badge
│   │   │   ├── ProjectModal.tsx          # Comprehensive project deep-dive modal
│   │   │   ├── PhishingAnalyzerModal.tsx # Interactive URL risk analyzer simulator
│   │   │   ├── SplunkTerminalModal.tsx   # Simulated SOC log stream & SPL search modal
│   │   │   ├── SocPanelModal.tsx         # Detailed SOC monitoring panel modal
│   │   │   ├── BrandIcons.tsx            # Scalable SVG brand icons (GitHub, LinkedIn)
│   │   │   └── SoundController.ts        # Procedural Web Audio API sound synthesizer
│   │   └── sections/
│   │       ├── HeroSection.tsx           # Scene 1: The Digital Frontier
│   │       ├── InsideNetworkSection.tsx  # Scene 2: Inside the Network
│   │       ├── SocSection.tsx            # Scene 3: The Security Operations Center
│   │       ├── AttackSurfaceSection.tsx  # Scene 4: The Attack Surface
│   │       ├── AboutSection.tsx          # Scene 5: About Me & 3 Principles
│   │       ├── SkillsSection.tsx         # Scene 6: My Technical Arsenal
│   │       ├── ProjectsSection.tsx       # Scene 7: Projects as Digital Artifacts
│   │       ├── ExperienceSection.tsx     # Scene 8: Experience & RCAT Traineeship
│   │       ├── LearningSection.tsx       # Scene 9: Learning & Verified Credentials
│   │       ├── ContactSection.tsx        # Scene 10: Contact Portal & Recruiter Form
│   │       └── Footer.tsx                # Terminal status & copyright
```

---

## ⚙️ Customization

All personal details, project descriptions, GitHub URLs, email addresses, and certifications are centralized in a single configuration file:

👉 [`src/data/portfolioData.ts`](file:///e:/Professional/Portfolio/Portfolio_oct/src/data/portfolioData.ts)

Update your LinkedIn profile, GitHub repository links, resume path, and contact details in that file without having to edit multiple components.

---

## 🎯 Target Roles

- **SOC Analyst L1**
- **Security Analyst**
- **SIEM Analyst**
- **Junior VAPT / Penetration Tester**

---

*Manish Kumar © 2026 — Built with curiosity and a security-first mindset.*
