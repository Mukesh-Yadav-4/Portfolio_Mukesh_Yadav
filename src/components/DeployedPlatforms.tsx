"use client";

import React from "react";
import { Globe, ExternalLink, Github, CheckCircle2, Award, Smartphone } from "lucide-react";

export default function DeployedPlatforms() {
  return (
    <section id="platforms" className="py-20 border-b border-slate-200 dark:border-[#1F293D] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-emerald-600 dark:text-volt-400 uppercase mb-2">
              <Globe className="w-4 h-4" />
              <span>03 // FULL-STACK PLATFORMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Live Deployed Web Applications
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Production-ready web systems running globally on Vercel with responsive micro-architectures.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform 1: SIH */}
          <div className="titanium-panel p-6 sm:p-7 flex flex-col justify-between group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[11px] font-mono font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>SMART INDIA HACKATHON</span>
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-volt-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>LIVE ON VERCEL</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-volt-400 transition-colors">
                SIH Employment & Skilling Platform
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-1 mb-3">
                TypeScript • Next.js • Tailwind CSS • Vercel Edge
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Decentralized career pathway and skill credential verification platform designed for national scale, connecting vocational talent with verified industry apprenticeships.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                  <div className="text-slate-400 text-[10px] uppercase">Architecture</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">Component Modular</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                  <div className="text-slate-400 text-[10px] uppercase">Deployment</div>
                  <div className="font-bold text-emerald-500 mt-0.5">Vercel Production</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://sih-employment-skilling-platform.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Launch SIH Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/Mukesh-Yadav-4/sih-employment-skilling-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-100 dark:bg-[#161E30] hover:bg-slate-200 dark:hover:bg-[#1F293D] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1F293D] transition-colors"
                title="View GitHub Code"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform 2: ABTalks */}
          <div className="titanium-panel p-6 sm:p-7 flex flex-col justify-between group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-[11px] font-mono font-bold">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>MOBILE-FIRST REDESIGN</span>
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-volt-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>LIVE ON VERCEL</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-volt-400 transition-colors">
                ABTalks Media Platform Redesign
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-1 mb-3">
                JavaScript • Modern CSS • Responsive UI • Vercel
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Mobile-optimized redesign engineered for the ABTalks 60-day challenge, featuring fluid media player cards, touch gesture carousels, and minimal loading latency.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                  <div className="text-slate-400 text-[10px] uppercase">Focus</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">Mobile Performance</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                  <div className="text-slate-400 text-[10px] uppercase">Lighthouse</div>
                  <div className="font-bold text-emerald-500 mt-0.5">High Performance</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://abtalks-redesign-three.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Launch ABTalks Redesign</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/Mukesh-Yadav-4/abtalks-redesign"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-100 dark:bg-[#161E30] hover:bg-slate-200 dark:hover:bg-[#1F293D] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1F293D] transition-colors"
                title="View GitHub Code"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
