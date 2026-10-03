"use client";

import React, { useState } from "react";
import {
  Award,
  ExternalLink,
  Download,
  Github,
  TrendingUp,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { PROJECTS_DATA } from "../data/projects";

export default function ResearchSpotlight() {
  const paper = PROJECTS_DATA[0]; // Flagship paper
  const pub = paper.publication!;
  const [activeTab, setActiveTab] = useState<"normalized" | "uncalibrated">("normalized");

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
              Reproducible Edge-to-Cloud Biosignal Computing Benchmark
            </h2>
          </div>
          <a
            href={paper.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-50 dark:bg-surface-card hover:bg-slate-100 dark:hover:bg-surface-hover text-xs font-mono text-sky-700 dark:text-cyan-400 border border-slate-200 dark:border-border hover:border-sky-500 transition-all shadow-sm"
          >
            <span>GitHub: ECG_STRESS_DETECTION</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Master Showcase Card */}
        <div className="glass-panel p-6 sm:p-8 border-slate-200 dark:border-border relative overflow-hidden bg-white dark:bg-surface-card shadow-md dark:shadow-2xl">
          {/* Top Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-sky-100 dark:bg-cyan-500/15 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/30">
              Flagship Research Paper
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-purple-100 dark:bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30">
              15-Fold Leave-One-Subject-Out (LOSO-CV)
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
              10k HIL Validation (0% Loss)
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30">
              4D Hyperchaotic Cipher (M-4DCHS)
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-border">
              WESAD Public Benchmark (N=15, 445 Windows)
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
              STM32G474RE Bare-Metal Edge DSP
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

          {/* Bare-Metal Hardware & Telemetry Edge IoMT Showcase */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#090E1B] border border-slate-200 dark:border-border mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Bare-Metal STM32 Edge DSP, 4D Hyperchaotic Cipher &amp; 10k HIL Testbed</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ARM Cortex-M4 (STM32G474RE @ 170 MHz) physical Hardware-in-the-Loop (HIL) validation across 10,000 packets with 0% loss.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                1.87 μs DSP Latency (0.065% CPU @ 170 MHz)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-border bg-black group/img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/FIG_Hardware_Testbed_Composite.png"
                  alt="STM32G474RE Hardware Testbed Composite"
                  className="w-full h-48 sm:h-56 object-cover object-center group-hover/img:scale-105 transition-transform duration-300"
                />
                <div className="p-2.5 bg-slate-900/90 border-t border-white/10 text-xs font-mono text-slate-300">
                  <span className="font-bold text-white">Hardware Testbed:</span> Nucleo-G474RE board running CMSIS-DSP 5-stage Biquad IIR filtering &amp; 4D continuous hyperchaotic stream cipher (M-4DCHS) with logic analyzer verification.
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-border bg-black group/img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/FIG_Physical_HIL_10k_Validation.png"
                  alt="10,000-Packet Physical HIL Validation"
                  className="w-full h-48 sm:h-56 object-cover object-center group-hover/img:scale-105 transition-transform duration-300"
                />
                <div className="p-2.5 bg-slate-900/90 border-t border-white/10 text-xs font-mono text-slate-300">
                  <span className="font-bold text-white">10,000-Packet Physical HIL Run:</span> 200,000 wire bytes streamed over physical USB-UART at 350.02 Hz with 0.0% packet drop, 0 CRC errors, and 0.0 mV reconstruction error.
                </div>
              </div>
            </div>
          </div>

          {/* Action Row: PDF Download & Code */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-border/80">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={pub.pdfUrl}
                download="Reproducible_Edge_to_Cloud_ECG_Stress_Detection_with_Embedded_Telemetry_and_Hardware_in_the_Loop_Validation v5.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Research Paper (PDF)</span>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
