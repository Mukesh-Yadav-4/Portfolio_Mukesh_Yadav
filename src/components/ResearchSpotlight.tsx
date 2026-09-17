"use client";

import React, { useState } from "react";
import {
  Award,
  ExternalLink,
  Download,
  Github,
  Check,
  Copy,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { PROJECTS_DATA } from "../data/projects";

export default function ResearchSpotlight() {
  const paper = PROJECTS_DATA[0]; // Flagship paper
  const pub = paper.publication!;
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [activeTab, setActiveTab] = useState<"normalized" | "uncalibrated">("normalized");

  const copyBibtex = () => {
    navigator.clipboard.writeText(pub.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2500);
  };

  return (
    <section id="research" className="py-20 border-b border-slate-200 dark:border-border/60 bg-white dark:bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-sky-600 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Flagship Research & Publication</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Personalized Biosignal Computing Benchmark
            </h2>
          </div>
          <a
            href={pub.doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-50 dark:bg-surface-card hover:bg-slate-100 dark:hover:bg-surface-hover text-xs font-mono text-sky-700 dark:text-cyan-400 border border-slate-200 dark:border-border hover:border-sky-500 transition-all shadow-sm"
          >
            <span>Permanent DOI: 10.5281/zenodo.22806710</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Master Showcase Card */}
        <div className="glass-panel p-6 sm:p-8 border-slate-200 dark:border-border relative overflow-hidden bg-white dark:bg-surface-card shadow-md dark:shadow-2xl">
          {/* Top Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-sky-100 dark:bg-cyan-500/15 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/30">
              Zenodo Verified Preprint
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-purple-100 dark:bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30">
              15-Fold Leave-One-Subject-Out (LOSO-CV)
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
              Open Source (MIT)
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-border">
              WESAD Public Benchmark (N=15, 445 Windows)
            </span>
          </div>

          {/* Paper Title & Author */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
            {paper.title}
          </h3>
          <p className="text-sm font-semibold text-sky-700 dark:text-cyan-400 mb-4">
            {pub.authors} • Department of Electronics and Communication Engineering (ECE), JSSATEN, Noida
          </p>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            {paper.summary}
          </p>

          {/* Breakthrough Metric Scorecard */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {paper.metrics?.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all ${
                  m.highlight
                    ? "bg-sky-50 dark:bg-cyan-950/20 border-sky-300 dark:border-cyan-500/40 shadow-xs"
                    : "bg-slate-50 dark:bg-surface-card/70 border-slate-200 dark:border-border"
                }`}
              >
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  {m.label}
                </div>
                <div
                  className={`text-xl sm:text-2xl font-mono font-bold ${
                    m.highlight ? "text-sky-600 dark:text-cyan-400" : "text-slate-900 dark:text-white"
                  }`}
                >
                  {m.value}
                </div>
                {m.subtext && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{m.subtext}</div>
                )}
              </div>
            ))}
          </div>

          {/* The Scientific Mechanism: Interactive Ablation Comparison */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#090E1B] border border-slate-200 dark:border-border mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                  <span>The Mathematical Breakthrough: Relative Baseline Transform</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Mitigating inter-subject baseline variability across unseen subjects.
                </p>
              </div>

              {/* Toggle Buttons */}
              <div className="flex items-center p-1 rounded-lg bg-white dark:bg-surface border border-slate-200 dark:border-border text-xs font-mono shadow-xs">
                <button
                  onClick={() => setActiveTab("normalized")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                    activeTab === "normalized"
                      ? "bg-sky-600 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Normalized (Ours: 92.36%)
                </button>
                <button
                  onClick={() => setActiveTab("uncalibrated")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                    activeTab === "uncalibrated"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Uncalibrated Raw (81.57%)
                </button>
              </div>
            </div>

            {/* Formula Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="p-4 rounded-lg bg-white dark:bg-surface-card border border-slate-200 dark:border-border shadow-xs">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">Mathematical Formulation:</div>
                <div className="text-center font-mono text-lg sm:text-xl text-sky-800 dark:text-amber-400 py-2.5 bg-slate-50 dark:bg-[#050811] rounded border border-slate-200 dark:border-border/80">
                  X* = ( X - B<sub>s</sub> ) / | B<sub>s</sub> |
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  Where <span className="text-slate-900 dark:text-slate-200 font-semibold">X</span> is the 60-second window metric, and{" "}
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">B<sub>s</sub></span> is the subject's resting baseline reference vector.
                </div>
              </div>

              <div className="space-y-3">
                {activeTab === "normalized" ? (
                  <div className="p-4 rounded-lg bg-sky-50 dark:bg-cyan-950/20 border border-sky-200 dark:border-cyan-500/30">
                    <div className="flex items-center gap-2 text-sky-700 dark:text-cyan-400 font-bold text-sm mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Calibrated Baseline-Relative Pipeline</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      Anchors each subject to their own basal physiology before classification. Improves accuracy from 81.57% to{" "}
                      <b className="text-slate-900 dark:text-white">92.36% (+10.79%)</b> and stress recall from 73.03% to{" "}
                      <b className="text-slate-900 dark:text-white">89.03% (+16.00%)</b> with <b>0.9494 ROC-AUC</b>.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-rose-50 dark:bg-ruby-950/20 border border-rose-200 dark:border-ruby-500/30">
                    <div className="flex items-center gap-2 text-rose-700 dark:text-ruby-400 font-bold text-sm mb-1">
                      <span>⚠️ Uncalibrated Global Classifier (Standard Approach)</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      Resting HR varies from 50 to 95+ BPM across subjects. Uncalibrated models mistake naturally tachycardic calm subjects
                      (e.g., S10) as stressed, and athletic calm subjects as unresponsive, resulting in 81.57% accuracy and low generalization.
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                  <span className="px-2.5 py-1 rounded bg-white dark:bg-surface border border-slate-200 dark:border-border">
                    Primary Predictor: <b className="text-sky-700 dark:text-cyan-400">ΔMeanRR (OR=0.25)</b>
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white dark:bg-surface border border-slate-200 dark:border-border">
                    Sympathetic Acceleration: <b className="text-rose-600 dark:text-ruby-400">ΔMeanHR (OR=1.34)</b>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row: PDF Download, BibTeX, Code */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-border/80">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={pub.pdfUrl}
                download="ECG_Stress_Detection_WESAD_Benchmark_Paper.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Full 6-Page Paper (PDF)</span>
              </a>
              <a
                href={paper.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-surface-card hover:bg-slate-50 dark:hover:bg-surface-hover text-slate-800 dark:text-white border border-slate-200 dark:border-border hover:border-sky-500 text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
              <a
                href={pub.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
              >
                <span>Zenodo Record</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* BibTeX Copy Button */}
            <button
              onClick={copyBibtex}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-surface border border-slate-200 dark:border-border hover:border-sky-500 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-xs"
            >
              {copiedBibtex ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">BibTeX Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy BibTeX Citation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
