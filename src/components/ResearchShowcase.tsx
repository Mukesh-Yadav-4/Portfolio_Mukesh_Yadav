"use client";

import React, { useState } from "react";
import { Activity, Cpu, Sliders, ExternalLink, Download, Copy, Check, Sparkles, Award, Image as ImageIcon, Terminal } from "lucide-react";
import WorkbenchModal from "./WorkbenchModal";
import MiniButterflyWidget from "./MiniButterflyWidget";
import MiniEcgWidget from "./MiniEcgWidget";
import MiniFilterWidget from "./MiniFilterWidget";

export default function ResearchShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"ecg" | "memristor" | "filter">("ecg");
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const openWorkbench = (tab: "ecg" | "memristor" | "filter") => {
    setSelectedTab(tab);
    setModalOpen(true);
  };

  const copyBibtex = () => {
    const bibtex = `@article{yadav2026personalized,
  title     = {Personalized Electrocardiographic and HRV Dynamics for Acute Stress Detection: A Leave-One-Subject-Out Benchmark and Bare-Metal Edge IoMT Implementation},
  author    = {Yadav, Mukesh},
  journal   = {Zenodo},
  year      = {2026},
  doi       = {10.5281/zenodo.22895173},
  url       = {https://doi.org/10.5281/zenodo.22895173}
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
              Physiological Signals & Neuromorphic Hardware
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Reproducible research systems spanning physiological signal processing, circuit emulation, numerical dynamical systems, authentic recorded waveforms, and open datasets.
          </p>
        </div>

        {/* 3 Benchmarks Grid */}
        <div className="space-y-8">
          {/* BENCHMARK 1: ECG Stress Detection */}
          <div className="titanium-panel p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-volt-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  ZENODO PREPRINT
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  DOI: 10.5281/zenodo.22895173
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
                  href="/Personalized_ECG_Stress_Detection_WESAD_Benchmark_and_STM32_Edge_IoMT.pdf"
                  download
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-[#161E30] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1F293D] transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF (9-Page IEEE)</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    Personalized Electrocardiographic and HRV Dynamics for Acute Stress Detection
                  </h3>
                  <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-volt-400 mt-1">
                    A Leave-One-Subject-Out (LOSO) Benchmark and Bare-Metal Edge IoMT Implementation
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    Mitigated inter-subject baseline variability across 15 WESAD benchmark subjects using relative baseline calibration:{" "}
                    <span className="font-mono text-emerald-600 dark:text-volt-400 font-semibold">
                      X* = (X - Bs) / |Bs|
                    </span>
                    . Validated with bare-metal STM32G474RE ARM Cortex-M4 edge DSP and real-time chaotic telemetry scrambler.
                  </p>
                </div>

                {/* Visual Scientific & Hardware Figure Previews */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  <div
                    onClick={() => openWorkbench("ecg")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-emerald-500/60 dark:hover:border-volt-400/60 transition-all"
                    title="Click to expand STM32 Hardware Testbed in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ecg/FIG_Hardware_Testbed_Composite.png"
                      alt="STM32G474RE Hardware Testbed"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 md:h-44 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      STM32G474RE Testbed
                    </div>
                  </div>
                  <div
                    onClick={() => openWorkbench("ecg")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-emerald-500/60 dark:hover:border-volt-400/60 transition-all"
                    title="Click to expand Live Decrypted Telemetry in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ecg/Physical_Usb_com_port_continuous_decrypted_telemetery.png"
                      alt="Live Continuous Telemetry"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 md:h-44 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      Live Telemetry (0 Drops)
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
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 md:h-44 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
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
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 md:h-44 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
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
                    <div className="text-[10px] font-mono text-slate-400 uppercase">STM32 DSP Latency</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      1.87 μs
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">5-stage Biquad (&lt;0.1% CPU)</div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 pt-1">
                  *Validated on bare-metal ARM Cortex-M4 (STM32G474RE): 1.87 μs DSP latency (0.065% CPU load @ 16 MHz) &amp; 2.0 μs 32-bit chaotic scrambler.
                </div>
              </div>

              {/* Workbench Launch Card */}
              <div className="flex flex-col justify-center items-stretch p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-slate-200 dark:border-[#1F293D] space-y-3.5">
                {/* Live Red Acute Stress ECG Telemetry Widget */}
                <MiniEcgWidget onClick={() => openWorkbench("ecg")} />

                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Live ECG Stress Telemetry
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Stream authentic WESAD subjects S2, S3, and S17 with detected R-peak visualization.
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => openWorkbench("ecg")}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Launch Full ECG Workbench</span>
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
                  HARDWARE REPRODUCTION STUDY
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  Based on: IEEE TCAS-I (Lin et al., 2026)
                </span>
                <button
                  onClick={() => openWorkbench("memristor")}
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-[10px] font-mono font-bold text-rose-500 dark:text-rose-400 transition-all cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Live 4-Butterfly Telemetry ↗</span>
                </button>
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
                    Emulated a dual-state active memristor in LTspice using CFA/multiplier stages and verified frequency-dependent pinched hysteresis from 5–80 kHz; modeled a 5D memristive Hopfield network in MATLAB, reproducing a 4-butterfly chaotic attractor (M = 2).
                  </p>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1.5">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Reference:</span> Lin et al., &quot;A Second-Order Memristor Method to Construct Memristive Neural Networks With Multi-Butterfly and Multi-Scroll Dynamics&quot;, <em>IEEE Trans. Circuits Syst. I (2026)</em>
                  </div>
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
                      src="/images/memristor/SOM_HNN_Transient_vs_Steady.png"
                      alt="4-Butterfly Attractor"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-32 sm:h-44 md:h-52 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      4-Butterfly Attractor
                    </div>
                  </div>
                  <div
                    onClick={() => openWorkbench("memristor")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-all"
                    title="Click to expand Circuit Emulator in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/memristor/second_order_mem_regestier.png"
                      alt="Circuit Emulator Schematic"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-32 sm:h-44 md:h-52 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 sm:p-2 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      Circuit Emulation
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
                      loading="lazy"
                      decoding="async"
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

              <div className="flex flex-col justify-center items-stretch p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-slate-200 dark:border-[#1F293D] space-y-3.5">
                {/* Real-time High-Speed 4-Butterfly Widget */}
                <MiniButterflyWidget onClick={() => openWorkbench("memristor")} />

                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    4-Butterfly Chaos Telemetry
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Real-time 60 FPS numerical RK4 solver tracing the 4 chaotic wings and memductance dynamics live.
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => openWorkbench("memristor")}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Launch Full Telemetry Workbench</span>
                  </button>

                  <button
                    onClick={() => openWorkbench("memristor")}
                    className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-[#161E30] hover:bg-slate-50 dark:hover:bg-[#1F293D] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#1F293D] text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sliders className="w-3.5 h-3.5 text-blue-500" />
                    <span>Open Pinched Hysteresis & Figures</span>
                  </button>
                </div>
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
                      loading="lazy"
                      decoding="async"
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
                      loading="lazy"
                      decoding="async"
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
                      loading="lazy"
                      decoding="async"
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

              <div className="flex flex-col justify-center items-stretch p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-slate-200 dark:border-[#1F293D] space-y-3.5">
                {/* Real-time Dual-Trace DSP Filter Widget (Reddish Raw vs Purplish Clean) */}
                <MiniFilterWidget onClick={() => openWorkbench("filter")} />

                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Real-Time Noise & Filter Telemetry
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Dual-trace oscilloscope: Reddish raw (+50 Hz hum) vs. Purplish 4th-order IIR Butterworth clean output (+6.17 dB SNR).
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => openWorkbench("filter")}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Launch Filter Lab & Gallery</span>
                  </button>

                  <button
                    onClick={() => openWorkbench("filter")}
                    className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-[#161E30] hover:bg-slate-50 dark:hover:bg-[#1F293D] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#1F293D] text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    <span>Open Interactive Filter Workbench</span>
                  </button>
                </div>
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
