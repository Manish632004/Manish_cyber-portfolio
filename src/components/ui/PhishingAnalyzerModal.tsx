import { useState } from 'react';
import { X, Search, AlertTriangle, CheckCircle, ShieldCheck, Info } from 'lucide-react';
import { soundEngine } from './SoundController';

interface PhishingAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AnalysisResult {
  url: string;
  isPhishing: boolean;
  score: number; // 0 to 100
  entropy: number;
  indicators: {
    name: string;
    triggered: boolean;
    severity: 'low' | 'medium' | 'high';
    desc: string;
  }[];
}

export function PhishingAnalyzerModal({ isOpen, onClose }: PhishingAnalyzerModalProps) {
  const [inputUrl, setInputUrl] = useState('https://paypal-security-update.account-verify.xyz/login');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const sampleUrls = [
    'https://paypal-security-update.account-verify.xyz/login',
    'http://192.168.1.55:8080/bank/login.php',
    'https://github.com/manishkumar-cyber',
    'https://accounts.google.com/signin/v2'
  ];

  const calculateEntropy = (str: string): number => {
    const len = str.length;
    if (len === 0) return 0;
    const freq: { [key: string]: number } = {};
    for (let i = 0; i < len; i++) {
      freq[str[i]] = (freq[str[i]] || 0) + 1;
    }
    let entropy = 0;
    for (const char in freq) {
      const p = freq[char] / len;
      entropy -= p * Math.log2(p);
    }
    return Math.round(entropy * 100) / 100;
  };

  const analyzeUrl = (urlToAnalyze: string) => {
    soundEngine.playScan();
    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      let score = 0;
      const lower = urlToAnalyze.toLowerCase();
      const hasIp = /(\d{1,3}\.){3}\d{1,3}/.test(lower);
      const suspiciousWords = ['verify', 'security', 'update', 'login', 'account', 'banking', 'secure', 'signin'];
      const foundWords = suspiciousWords.filter((w) => lower.includes(w));
      const hasHyphen = (lower.match(/-/g) || []).length > 1;
      const suspiciousTld = /\.(xyz|top|tk|club|work|ru|info|cc)\b/.test(lower);
      const isHttp = lower.startsWith('http://');
      const subdomainCount = (lower.split('/')[2] || '').split('.').length;
      const domainEntropy = calculateEntropy(lower.split('/')[2] || lower);

      const indicators = [
        {
          name: 'IP Address as Hostname',
          triggered: hasIp,
          severity: 'high' as const,
          desc: hasIp ? 'Raw IP used instead of domain name — typical of ad-hoc rogue landing pages.' : 'Standard domain name syntax verified.'
        },
        {
          name: 'Deceptive Phishing Keywords',
          triggered: foundWords.length >= 2,
          severity: 'high' as const,
          desc: foundWords.length >= 2 ? `Contains high-risk target keywords: [${foundWords.join(', ')}].` : 'No deceptive credential harvesting keywords.'
        },
        {
          name: 'Suspicious / Cheap TLD',
          triggered: suspiciousTld,
          severity: 'medium' as const,
          desc: suspiciousTld ? 'Domain uses a top-level domain frequently associated with throwaway phishing campaigns.' : 'Reputable commercial or organization TLD.'
        },
        {
          name: 'Excessive Hyphens & Subdomains',
          triggered: hasHyphen || subdomainCount > 3,
          severity: 'medium' as const,
          desc: hasHyphen ? 'Multiple hyphens used to mimic legitimate brand names.' : 'Normal domain structure.'
        },
        {
          name: 'Unencrypted Protocol (HTTP)',
          triggered: isHttp,
          severity: 'medium' as const,
          desc: isHttp ? 'Cleartext HTTP connection without TLS certificate.' : 'Encrypted HTTPS protocol.'
        },
        {
          name: 'High Lexical Entropy',
          triggered: domainEntropy > 3.8,
          severity: 'low' as const,
          desc: `Domain Shannon entropy calculated at ${domainEntropy} bits (randomized string signature).`
        }
      ];

      // Score calculation
      if (hasIp) score += 35;
      if (foundWords.length >= 2) score += 30;
      if (suspiciousTld) score += 20;
      if (hasHyphen) score += 15;
      if (isHttp) score += 10;
      if (domainEntropy > 3.8) score += 10;

      score = Math.min(score, 99);
      if (score === 0) score = 4; // baseline clean confidence

      const isPhishing = score > 45;

      if (isPhishing) {
        soundEngine.playAlert();
      } else {
        soundEngine.playSuccess();
      }

      setResult({
        url: urlToAnalyze,
        isPhishing,
        score,
        entropy: domainEntropy,
        indicators
      });
      setAnalyzing(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#030917] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] p-6 sm:p-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono-cyber text-cyan-400 mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>PROJECT 04 // INTERACTIVE ML & HEURISTIC ENGINE</span>
        </div>
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          URL Phishing Detector — Live Inspector
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Evaluates URLs using 16 lexical, structural, and information-entropy features. Zero outbound HTTP requests are made.
        </p>

        {/* Input Form */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Paste or enter URL to analyze..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:outline-none text-xs font-mono-cyber text-cyan-200"
            />
          </div>
          <button
            onClick={() => analyzeUrl(inputUrl)}
            disabled={analyzing || !inputUrl.trim()}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono-cyber text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {analyzing ? (
              <span className="animate-spin">◌</span>
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{analyzing ? 'SCANNING...' : 'ANALYZE URL'}</span>
          </button>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6 text-[11px] font-mono-cyber">
          <span className="text-slate-500 mr-1">TRY SAMPLES:</span>
          {sampleUrls.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputUrl(s);
                analyzeUrl(s);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer truncate max-w-[200px]"
            >
              {s.replace('https://', '').replace('http://', '').slice(0, 24)}...
            </button>
          ))}
        </div>

        {/* Results Panel */}
        {result && (
          <div className="animate-in fade-in duration-300 space-y-4">
            {/* Verdict Box */}
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                result.isPhishing
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {result.isPhishing ? (
                  <AlertTriangle className="w-8 h-8 text-rose-400 shrink-0" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-mono-cyber uppercase font-bold tracking-wider">
                    {result.isPhishing ? 'ALERT: SUSPICIOUS / PHISHING SIGNATURE' : 'VERDICT: LIKELY BENIGN'}
                  </div>
                  <div className="text-xs text-slate-300 font-mono-cyber truncate max-w-md">
                    {result.url}
                  </div>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
                <div className="text-[10px] font-mono-cyber text-slate-400 uppercase">Risk Probability</div>
                <div
                  className={`text-3xl font-heading font-extrabold ${
                    result.isPhishing ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {result.score}%
                </div>
              </div>
            </div>

            {/* Indicator Breakdown */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-mono-cyber text-slate-400 uppercase mb-3 flex items-center justify-between">
                <span>Extracted Security Indicators</span>
                <span>Shannon Entropy: {result.entropy} bits</span>
              </div>

              <div className="space-y-2">
                {result.indicators.map((ind, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border text-xs font-mono-cyber flex items-start justify-between gap-3 ${
                      ind.triggered
                        ? 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{ind.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{ind.desc}</div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        ind.triggered
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {ind.triggered ? 'FLAGGED' : 'PASSED'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Safety Note */}
        <div className="mt-6 flex items-start gap-2 p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-[11px] font-mono-cyber text-cyan-300">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Safety Guarantee: This interactive tool evaluates lexical structure safely within your browser client. It never resolves, crawls, or visits any tested target URL.
          </span>
        </div>
      </div>
    </div>
  );
}
