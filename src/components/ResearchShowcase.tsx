"use client";

import React, { useState } from "react";
import { Activity, Cpu, Sliders, ExternalLink, Download, Copy, Check, Sparkles, Award, Image as ImageIcon, Terminal } from "lucide-react";
import WorkbenchModal from "./WorkbenchModal";

export default function ResearchShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"ecg" | "memristor" | "filter">("ecg");
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const openWorkbench = (tab: "ecg" | "memristor" | "filter") => {
    setSelectedTab(tab);
    setModalOpen(true);
  };

  const copyBibtex = () => {
    const bibtex = `@article{yadav2026ecg,
  title     = {Personalized Electrocardiographic and HRV Dynamics for Acute Stress Detection: A Leave-One-Subject-Out Benchmark on WESAD},
  author    = {Yadav, Mukesh},
  journal   = {Zenodo},
  year      = {2026},
  doi       = {10.5281/zenodo.22806710},
  url       = {https://doi.org/10.5281/zenodo.22806710}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <section id="research" className="py-20 border-b border-slate-200 dark:border-[#1F293D] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-emerald-600 dark:text-volt-400 uppercase mb-2">
              <Award className="w-4 h-4" />
              <span>01 // FLAGSHIP RESEARCH BENCHMARKS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Clinical Signals & Neuromorphic Hardware
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Peer-reviewed and validated experimental systems with authentic recorded waveforms, physical circuit prototypes, and open datasets.
          </p>
        </div>

        {/* 3 Benchmarks Grid */}
        <div className="space-y-8">
          {/* BENCHMARK 1: ECG Stress Detection */}
          <div className="titanium-panel p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-volt-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  OFFICIAL CERN PUBLICATION
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  DOI: 10.5281/zenodo.22806710
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-[10px] font-mono text-emerald-600 dark:text-volt-400">
                  ● Authentic WESAD Dataset
                </span>
                <a
                  href="https://ecgstressdetection-2bremsry4npbmx9yn7whju.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-600 dark:text-volt-400 transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Live Streamlit App ↗</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyBibtex}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-[#161E30] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1F293D] transition-all"
                >
                  {copiedBibtex ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>BibTeX Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy BibTeX</span>
                    </>
                  )}
                </button>
                <a
                  href="/ECG_Stress_Detection_WESAD_Benchmark_Paper.pdf"
                  download
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-[#161E30] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1F293D] transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF (6-Page)</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    Personalized ECG & HRV Dynamics for Acute Stress Detection
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    Solved inter-subject baseline heterogeneity across 15 WESAD benchmark subjects using relative baseline normalization:{" "}
                    <span className="font-mono text-emerald-600 dark:text-volt-400 font-semibold">
                      X* = (X - Bs) / |Bs|
                    </span>
                    . Evaluated with Leave-One-Subject-Out (LOSO) stratified cross-validation on authentic 700 Hz Lead-II chest telemetry.
                  </p>
                </div>

                {/* Visual Scientific Figure Previews */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  <div
                    onClick={() => openWorkbench("ecg")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-emerald-500/60 dark:hover:border-volt-400/60 transition-all"
                    title="Click to expand QRS Detection Figure in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ecg/DEMO_Pan_Tompkins_QRS_Detection.png"
                      alt="Pan-Tompkins QRS Complex Detection"
                      className="w-full h-32 sm:h-44 md:h-52 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      QRS Detection
                    </div>
                  </div>
                  <div
                    onClick={() => openWorkbench("ecg")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-emerald-500/60 dark:hover:border-volt-400/60 transition-all"
                    title="Click to expand LOSO ROC Curve in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ecg/FINAL_ROC_Curve.png"
                      alt="LOSO ROC Curve"
                      className="w-full h-32 sm:h-44 md:h-52 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      ROC (AUC 0.949)
                    </div>
                  </div>
                  <div
                    onClick={() => openWorkbench("ecg")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-emerald-500/60 dark:hover:border-volt-400/60 transition-all"
                    title="Click to expand Confusion Matrix in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ecg/FINAL_Confusion_Matrix.png"
                      alt="Confusion Matrix"
                      className="w-full h-32 sm:h-44 md:h-52 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      Confusion Matrix
                    </div>
                  </div>
                </div>

                {/* Giant Metric Readouts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">LOSO Accuracy</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-volt-400 mt-0.5">
                      92.36%
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">+10.79% boost</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Macro F1</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-volt-400 mt-0.5">
                      89.03%
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">+16.00% boost</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">ROC-AUC</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      0.9494
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">Separation score</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Latency / RAM</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      &lt;0.85 ms
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">&lt;5 KB (Wearable)</div>
                  </div>
                </div>
              </div>

              {/* Workbench Launch Card */}
              <div className="flex flex-col justify-center items-stretch p-5 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-slate-200 dark:border-[#1F293D] space-y-4">
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-volt-400 mb-2">
                    <Activity className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Live Telemetry Simulator
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Stream authentic WESAD subjects S2, S3, S17 with live Pan-Tompkins R-peak detector
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => openWorkbench("ecg")}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Launch Live Workbench & Figures</span>
                  </button>

                  <a
                    href="https://ecgstressdetection-2bremsry4npbmx9yn7whju.streamlit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-[#161E30] hover:bg-slate-50 dark:hover:bg-[#1F293D] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#1F293D] text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Open Streamlit Cloud Studio ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* BENCHMARK 2: Second-Order Memristor */}
          <div className="titanium-panel p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-mono font-bold">
                  IEEE TCAS-I HARDWARE REPRODUCTION
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  DOI: 10.1109/TCSI.2026.3663432
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-[10px] font-mono text-blue-500 dark:text-blue-400">
                  ● Breadboard & MATLAB ODE45
                </span>
              </div>
              <a
                href="https://github.com/Mukesh-Yadav-4/second-order-memristor-emulator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-[#161E30] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1F293D] transition-all"
              >
                <span>View Circuit Schematic</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    Second-Order Memristor Circuit Emulator & Hopfield Dynamics
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    Analog LTspice circuit emulation and MATLAB numerical solver reproducing second-order memristive dynamics. Emulated pinched hysteresis fingerprint across frequency sweeps and coupled to a 5D Hopfield Neural Network generating multi-scroll chaotic attractors.
                  </p>
                </div>

                {/* Visual Scientific Figure Previews */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  <div
                    onClick={() => openWorkbench("memristor")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-all"
                    title="Click to expand 4-Butterfly Attractor in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/memristor/SOM_HNN_4Butterfly_Attractor.png"
                      alt="4-Butterfly Attractor"
                      className="w-full h-32 sm:h-44 md:h-52 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      4-Butterfly Attractor
                    </div>
                  </div>
                  <div
                    onClick={() => openWorkbench("memristor")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-all"
                    title="Click to expand Breadboard Prototype in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/memristor/second_order_mem_regestier.png"
                      alt="Breadboard Hardware"
                      className="w-full h-32 sm:h-44 md:h-52 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      Breadboard Hardware
                    </div>
                  </div>
                  <div
                    onClick={() => openWorkbench("memristor")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-all"
                    title="Click to expand 3D State Space in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/memristor/SOM_HNN_3D_State_Space.png"
                      alt="3D State Space"
                      className="w-full h-32 sm:h-44 md:h-52 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      3D State Space
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Frequency Sweep</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                      5 – 80 kHz
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">Pinched hysteresis</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Attractor Topology</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      4-Butterfly
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">Multi-scroll chaos</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Analog Parts</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      AD844 + AD633
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">Current feedback</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-stretch p-5 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-slate-200 dark:border-[#1F293D] space-y-4">
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-2">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Frequency Sweep Emulator
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Slide from 5 kHz to 80 kHz and watch the v-i pinched loop collapse live
                  </div>
                </div>

                <button
                  onClick={() => openWorkbench("memristor")}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Live Workbench & Figures</span>
                </button>
              </div>
            </div>
          </div>

          {/* BENCHMARK 3: ECG Filter Project */}
          <div className="titanium-panel p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                  PHYSIONET MIT-BIH VALIDATED
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  Record 100 Lead-MLII (2,274 Beats)
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-[10px] font-mono text-cyan-500 dark:text-cyan-400">
                  ● 12-bit Format 212 Decoded
                </span>
              </div>
              <a
                href="https://github.com/Mukesh-Yadav-4/ECG-FIR-IIR-filter-comparison"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-[#161E30] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1F293D] transition-all"
              >
                <span>View Filter Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    ECG Signal Denoising: Comparative Study of FIR vs. IIR Filtering
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    Decoded raw 12-bit Format 212 binary telemetry directly in MATLAB. Modeled composite physiological noise (50 Hz powerline hum, 0.3 Hz baseline wander) to evaluate trade-offs between Butterworth IIR power efficiency vs. Equiripple FIR linear-phase morphology fidelity.
                  </p>
                </div>

                {/* Visual Scientific Figure Previews */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  <div
                    onClick={() => openWorkbench("filter")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-cyan-500/60 dark:hover:border-cyan-400/60 transition-all"
                    title="Click to expand Centered Filter Comparison in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/filter/Fig2_Filter_Comparison_Centered.png"
                      alt="Filter Comparison Centered"
                      className="w-full h-32 sm:h-44 md:h-52 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      Waveform Denoising
                    </div>
                  </div>
                  <div
                    onClick={() => openWorkbench("filter")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-cyan-500/60 dark:hover:border-cyan-400/60 transition-all"
                    title="Click to expand R-Peak Temporal Alignment in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/filter/Fig4_RPeak_Alignment.png"
                      alt="R-Peak Alignment"
                      className="w-full h-32 sm:h-44 md:h-52 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      R-Peak Alignment
                    </div>
                  </div>
                  <div
                    onClick={() => openWorkbench("filter")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-cyan-500/60 dark:hover:border-cyan-400/60 transition-all"
                    title="Click to expand Performance Dashboard in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/filter/Fig5_Performance_Dashboard.png"
                      alt="Performance Dashboard"
                      className="w-full h-32 sm:h-44 md:h-52 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      Performance Dashboard
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">SNR Improvement</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                      +6.17 dB
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">IIR Butterworth</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Morphology Alignment</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      100.00%
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">2,274 clinical beats</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Efficiency Gain</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      12.5× Boost
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">8 vs 100 coefficients</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-stretch p-5 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-slate-200 dark:border-[#1F293D] space-y-4">
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mb-2">
                    <Sliders className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Noise & Filter Comparator
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Inject 50 Hz powerline hum and compare IIR vs FIR clean outputs live
                  </div>
                </div>

                <button
                  onClick={() => openWorkbench("filter")}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Live Workbench & Figures</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Workbench Modal */}
      <WorkbenchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={selectedTab}
      />
    </section>
  );
}
