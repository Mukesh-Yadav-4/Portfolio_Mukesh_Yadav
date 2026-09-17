"use client";

import React, { useState } from "react";
import { Mail, Github, ExternalLink, Check, Copy, Heart } from "lucide-react";

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = "mkpy06@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer id="contact" className="py-16 bg-[#050811] border-t border-border/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Heart className="w-4 h-4 text-ruby-500" />
              <span>Mukesh Yadav</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Electronics & Communication Engineering undergraduate at JSSATEN, Noida. Dedicated to physiological computing,
              biosignal DSP, and personalized cardiovascular intelligence.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Direct Inquiries & Collaboration
            </div>
            <p className="text-xs text-slate-300">
              Open to research collaborations, graduate study opportunities, and wearable health tech internships.
            </p>
            <div className="pt-2">
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border hover:border-cyan-500/50 text-xs font-mono text-cyan-400 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{email}</span>
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Verification & Links
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a
                  href="https://doi.org/10.5281/zenodo.22806710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Zenodo CERN Publication (DOI: 10.5281/zenodo.22806710)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Mukesh-Yadav-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3 h-3" />
                  <span>GitHub Profile (Mukesh-Yadav-4)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Mukesh-Yadav-4/ECG_STRESS_DETECTION"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>ECG Stress Detection Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Mukesh Yadav. All rights reserved. Released under MIT.
          </div>
          <div className="font-mono text-[11px]">
            Designed for high performance & Vercel deployment
          </div>
        </div>
      </div>
    </footer>
  );
}
