import { useState } from 'react';
import { Mail, FileDown, Send, CheckCircle2, Shield, MapPin, Copy, Check } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../ui/BrandIcons';
import { PERSONAL_DATA } from '../../data/portfolioData';
import { soundEngine } from '../ui/SoundController';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Cybersecurity Opportunity // Recruiter Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    soundEngine.playSuccess();
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSuccess();
    setSubmitted(true);

    // Also trigger mailto so recruiter can send directly via their default mail client
    const mailtoUrl = `mailto:${PERSONAL_DATA.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-12 pointer-events-none"
    >
      <div className="max-w-5xl w-full pointer-events-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono-cyber tracking-widest uppercase mb-4">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>SCENE 10 // CONTACT PORTAL</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight mb-4">
            LET'S SECURE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-200 text-glow-cyan">
              WHAT'S NEXT.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            I'm looking for an opportunity to contribute, learn, and grow with a cybersecurity team. If you're hiring for SOC, security monitoring, or junior VAPT roles, I'd love to connect.
          </p>
        </div>

        {/* 4 Core Direct Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <a
            href={PERSONAL_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playBlip(750, 0.04, 0.04)}
            className="group p-5 rounded-2xl bg-[#040916]/80 hover:bg-cyan-950/40 border border-cyan-500/20 hover:border-cyan-400/60 backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 group-hover:scale-110 flex items-center justify-center mb-3 transition-transform">
              <LinkedinIcon className="w-5 h-5" />
            </div>
            <div className="font-heading font-bold text-white text-sm mb-1">CONNECT ON LINKEDIN</div>
            <div className="text-[11px] font-mono-cyber text-slate-400">Professional Profile</div>
          </a>

          <a
            href={PERSONAL_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playBlip(750, 0.04, 0.04)}
            className="group p-5 rounded-2xl bg-[#040916]/80 hover:bg-slate-900/90 border border-slate-700 hover:border-slate-500 backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 group-hover:scale-110 flex items-center justify-center mb-3 transition-transform">
              <GithubIcon className="w-5 h-5" />
            </div>
            <div className="font-heading font-bold text-white text-sm mb-1">VIEW GITHUB</div>
            <div className="text-[11px] font-mono-cyber text-slate-400">Labs & Code Repos</div>
          </a>

          <a
            href={PERSONAL_DATA.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playBlip(850, 0.04, 0.04)}
            className="group p-5 rounded-2xl bg-[#040916]/80 hover:bg-emerald-950/40 border border-emerald-500/25 hover:border-emerald-400/60 backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 group-hover:scale-110 flex items-center justify-center mb-3 transition-transform">
              <FileDown className="w-5 h-5" />
            </div>
            <div className="font-heading font-bold text-white text-sm mb-1">DOWNLOAD RESUME</div>
            <div className="text-[11px] font-mono-cyber text-slate-400">PDF • Verified</div>
          </a>

          <div
            onClick={copyEmail}
            className="group p-5 rounded-2xl bg-[#040916]/80 hover:bg-purple-950/40 border border-purple-500/25 hover:border-purple-400/60 backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_25px_rgba(0,0,0,0.6)] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 group-hover:scale-110 flex items-center justify-center mb-3 transition-transform">
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Mail className="w-5 h-5" />}
            </div>
            <div className="font-heading font-bold text-white text-sm mb-1">
              {copied ? 'EMAIL COPIED!' : 'SEND DIRECT EMAIL'}
            </div>
            <div className="text-[11px] font-mono-cyber text-slate-400 truncate max-w-[170px]">
              {PERSONAL_DATA.email}
            </div>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#040a1c]/90 to-[#020510]/95 border border-cyan-500/25 backdrop-blur-2xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Quick Notes & Location */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl font-heading font-bold text-white">
                Initiate Recruiter Connection
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Whether you have an open SOC Analyst L1 role, an entry-level SIEM monitoring vacancy, or a junior security internship, I will respond within 24 hours.
              </p>

              <div className="space-y-3 pt-4 text-xs font-mono-cyber text-slate-300">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{PERSONAL_DATA.location} (Open to Relocation / Remote)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{PERSONAL_DATA.email}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 text-xs font-mono-cyber transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-heading font-bold text-lg text-white">
                    Transmission Dispatched
                  </h4>
                  <p className="text-xs text-slate-300 font-mono-cyber">
                    Thank you! Your email client has been prepared. You can also reach out directly at {PERSONAL_DATA.email}.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono-cyber text-slate-300 hover:text-white"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-cyber text-slate-400 uppercase mb-1">
                        Your Name / Recruiter
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Vance"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs font-mono-cyber text-cyan-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-cyber text-slate-400 uppercase mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@securityfirm.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs font-mono-cyber text-cyan-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-cyber text-slate-400 uppercase mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs font-mono-cyber text-cyan-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-cyber text-slate-400 uppercase mb-1">
                      Message / Role Details
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding the role, requirements, or conversation availability..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs font-mono-cyber text-cyan-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-black font-mono-cyber text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND DIRECT MESSAGE</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
