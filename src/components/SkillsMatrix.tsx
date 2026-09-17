"use client";

import React from "react";
import { Cpu, HeartPulse, BrainCircuit, Terminal, Wrench } from "lucide-react";

export default function SkillsMatrix() {
  const skillCategories = [
    {
      icon: HeartPulse,
      title: "Biosignal Processing & DSP",
      color: "text-rose-600 dark:text-ruby-400",
      bgIcon: "bg-rose-50 dark:bg-rose-950/30",
      borderHover: "hover:border-rose-300 dark:hover:border-ruby-500/40",
      skills: [
        "Single-Lead ECG Telemetry (Lead-II)",
        "Heart Rate Variability (HRV: SDNN, RMSSD, pNN50)",
        "Pan-Tompkins QRS Detection & Adaptive Thresholding",
        "Zero-Phase 4th-Order Butterworth Filtering (0.5–40 Hz)",
        "Physiological RR Interval Filtering (300–1500 ms)",
        "Inter-Individual Relative Baseline Normalization",
      ],
    },
    {
      icon: BrainCircuit,
      title: "Machine Learning & Clinical AI",
      color: "text-sky-600 dark:text-cyan-400",
      bgIcon: "bg-sky-50 dark:bg-cyan-950/30",
      borderHover: "hover:border-sky-300 dark:hover:border-cyan-500/40",
      skills: [
        "15-Fold Leave-One-Subject-Out Cross-Validation (LOSO-CV)",
        "Permutation Feature Importance & Standardized Odds Ratios",
        "Clinical Operating Threshold Sweeps (τ Optimization)",
        "Class Imbalance Calibration & Balanced Accuracy",
        "Classifiers: Logistic Regression, MLP, SVM, Random Forest",
        "Diagnostic ROC-AUC (0.9494) & Precision-Recall Analysis",
      ],
    },
    {
      icon: Cpu,
      title: "Embedded Systems & Hardware",
      color: "text-amber-600 dark:text-amber-400",
      bgIcon: "bg-amber-50 dark:bg-amber-950/30",
      borderHover: "hover:border-amber-300 dark:hover:border-amber-500/40",
      skills: [
        "Microcontroller Firmware (Arduino, C/C++)",
        "LTspice Analog Circuit Emulation (Second-Order Memristors)",
        "Non-blocking Hardware Timer Interrupts",
        "Serial UART Telemetry Protocols",
        "Edge Latency Benchmarking (<0.85 ms, <5 KB RAM)",
        "Low-Power Wearable Sensor Conditioning",
      ],
    },
    {
      icon: Terminal,
      title: "Languages & Engineering Tools",
      color: "text-emerald-600 dark:text-emerald-400",
      bgIcon: "bg-emerald-50 dark:bg-emerald-950/30",
      borderHover: "hover:border-emerald-300 dark:hover:border-emerald-500/40",
      skills: [
        "MATLAB (Signal Processing & Statistics Toolboxes)",
        "Python (NumPy, SciPy, Pandas, Scikit-Learn, Plotly)",
        "Streamlit (Interactive Web Telemetry Dashboards)",
        "TypeScript, React, Next.js, Tailwind CSS",
        "LaTeX & Overleaf (IEEE Standard Publication Formatting)",
        "Git, GitHub Version Control & CI/CD",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 border-b border-slate-200 dark:border-border/60 bg-white dark:bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-sky-600 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Wrench className="w-4 h-4" />
              <span>Technical Competencies</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Skills & Engineering Matrix
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Rigorous background across physiological computing, signal conditioning, machine learning, and microcontroller firmware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className={`glass-panel p-6 border-slate-200 dark:border-border bg-white dark:bg-surface-card transition-all ${cat.borderHover} shadow-sm dark:shadow-xl`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-lg border border-slate-200 dark:border-border ${cat.bgIcon}`}>
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{cat.title}</h3>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 py-1.5 px-3 rounded bg-slate-50 dark:bg-surface/50 border border-slate-200 dark:border-border/50"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
