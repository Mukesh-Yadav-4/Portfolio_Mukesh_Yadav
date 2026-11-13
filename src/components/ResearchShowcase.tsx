"use client";

import React, { useState, useEffect } from "react";
import { Activity, Cpu, Sliders, ExternalLink, Download, Sparkles, Award, Image as ImageIcon, Terminal, Github, X, ZoomIn } from "lucide-react";
import WorkbenchModal from "./WorkbenchModal";
import MiniButterflyWidget from "./MiniButterflyWidget";
import MiniEcgWidget from "./MiniEcgWidget";
import MiniFilterWidget from "./MiniFilterWidget";

export default function ResearchShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"ecg" | "memristor" | "filter">("ecg");
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    if (lightboxImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxImage]);

  const openWorkbench = (tab: "ecg" | "memristor" | "filter") => {
    setSelectedTab(tab);
    setModalOpen(true);
  };

  return (
    <section id="research" className="py-20 border-b border-slate-200 dark:border-[#1F293D] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-emerald-600 dark:text-volt-400 uppercase mb-2">
              <Award className="w-4 h-4" />
              <span>01 // FLAGSHIP RESEARCH PROJECTS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Physiological Signals & Neuromorphic Hardware
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Reproducible research systems spanning physiological signal processing, circuit emulation, numerical dynamical systems, recorded waveforms, and open datasets.
          </p>
        </div>

        {/* 5 Research Projects Grid */}
        <div className="space-y-8">
          {/* PROJECT 1: ECG Stress Detection */}
          <div className="titanium-panel p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-volt-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  PROJECT 01
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-volt-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  FLAGSHIP BENCHMARK
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-[10px] font-mono text-emerald-600 dark:text-volt-400">
                  ● Recorded WESAD Dataset
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
                <a
                  href="/Reproducible_Edge_to_Cloud_ECG_Stress_Detection_with_Embedded_Telemetry_and_Hardware_in_the_Loop_Validation_v5.pdf"
                  download="Reproducible_Edge_to_Cloud_ECG_Stress_Detection_with_Embedded_Telemetry_and_Hardware_in_the_Loop_Validation v5.pdf"
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-[#161E30] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1F293D] transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Manuscript (in preparation)</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    Reproducible Edge-to-Cloud ECG Stress Detection with Embedded Telemetry and Hardware-in-the-Loop Validation
                  </h3>
                  <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-volt-400 mt-1">
                    10,000-Packet Physical HIL Validation • 4D Hyperchaotic Stream Cipher (no formal cryptanalysis) • 15-Fold LOSO Benchmark
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    Mitigated inter-subject baseline variability across 15 WESAD benchmark subjects using relative baseline calibration:{" "}
                    <span className="font-mono text-emerald-600 dark:text-volt-400 font-semibold">
                      X* = (X - Bs) / (|Bs| + ε)
                    </span>
                    . Evaluated on bare-metal STM32G474RE ARM Cortex-M4 edge DSP, continuous 4D hyperchaotic stream cipher (M-4DCHS; no formal cryptanalysis), and a physical 10,000-packet zero-loss HIL testbed.
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
                    title="Click to expand 10,000-Packet Physical HIL Validation in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ecg/FIG_Physical_HIL_10k_Validation.png"
                      alt="10k Packet Physical HIL Validation"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 md:h-44 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      10k HIL Run (0% Loss)
                    </div>
                  </div>
                  <div
                    onClick={() => openWorkbench("ecg")}
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-emerald-500/60 dark:hover:border-volt-400/60 transition-all"
                    title="Click to expand 4D Hyperchaotic Attractor in Workbench"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ecg/FIG_M4D_Attractor_3D.png"
                      alt="4D Hyperchaotic Attractor"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 md:h-44 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      4D Hyperchaotic Attractor
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
                      alt="LOSO Confusion Matrix"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 md:h-44 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10">
                      LOSO Matrix (7 False Alarms)
                    </div>
                  </div>
                </div>

                {/* Giant Metric Readouts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Primary Acc (τ=0.50)</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-volt-400 mt-0.5">
                      92.13%
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">410 / 445 windows</div>
                    <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 mt-1">Best of six classifiers; requires a test-time baseline recording.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Primary Specificity</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-volt-400 mt-0.5">
                      97.54%
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">7 false alarms</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">ROC-AUC / PR-AUC</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      0.9493
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">PR-AUC = 0.9467</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Physical HIL Testbed</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      10,000 pkts
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">0% loss • 0 CRC err</div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 pt-1">
                  *Evaluated on bare-metal ARM Cortex-M4 (STM32G474RE @ 170 MHz): 1.87 μs DSP latency (0.065% CPU), continuous 4D hyperchaotic stream cipher (λ₁ ≈ +0.438, λ₂ ≈ +0.254; no formal cryptanalysis), and 10,000-packet zero-loss physical HIL validation.
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
                    Stream recorded WESAD subjects S2, S3, and S17 with detected R-peak visualization.
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

          {/* PROJECT 2: Memristive 4D Hyperchaotic Medical Image Encryption (STM32 HIL) */}
          <div className="titanium-panel p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-volt-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  PROJECT 02
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-volt-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  EMBEDDED HIL CRYPTOSYSTEM
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  STM32G474RE ARM Cortex-M4 @ 921,600 Baud
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-[10px] font-mono text-emerald-600 dark:text-volt-400">
                  ● Bit-Exact Lossless (MSE = 0)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/Mukesh-Yadav-4/Memristive-hyperchaotic-medical-image-encryption"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-[#161E30] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1F293D] transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    Memristive 4D Hyperchaotic Medical Image Encryption with STM32 HIL Integration
                  </h3>
                  <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-volt-400 mt-1">
                    Multi-Model Spatial Permutation • Bit-Exact Reversible CBC Diffusion • Physical 921.6k Baud UART HIL
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    Evaluated on clinical diagnostic modalities (Brain MRI, Retinal Fundus, CT) using an autonomous 4D memristive hyperchaotic system (M-4DCHS) with flux-controlled memductance nonlinearity. Benchmarked four modular spatial permutation paradigms (Concentric Cross-Ring Josephus, 2D Arnold Cat Map, Orthogonal Diagonal Zigzag, and 4D Memristive Coordinate Sorting) paired with bi-directional CBC diffusion executed on bare-metal ARM Cortex-M4 (STM32G474RE Nucleo with hardware FPU @ 921,600 baud UART). Verified bit-exact lossless reconstruction (MSE ≡ 0.000000, PSNR = ∞ dB, 0 mismatched pixels).
                  </p>
                </div>

                {/* Visual Scientific & Hardware Figure Previews */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  <div
                    onClick={() =>
                      setLightboxImage({
                        src: "/images/medical_image_hil/benchmark_comparison.png",
                        alt: "Multi-Model Permutation Benchmark Comparison",
                        title: "Multi-Model Permutation Benchmark Comparison",
                        subtitle: "Side-by-side quantitative evaluation across Josephus, Arnold Cat Map, Diagonal Zigzag, and 4D Memristive Coordinate Sorting on clinical modalities.",
                      })
                    }
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-emerald-500/60 dark:hover:border-volt-400/60 transition-all"
                    title="Click to view full image"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/medical_image_hil/benchmark_comparison.png"
                      alt="Multi-Model Permutation Benchmark Comparison"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 md:h-44 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10 flex items-center justify-center gap-1">
                      <span>Multi-Model Benchmark</span>
                      <ZoomIn className="w-3 h-3 text-emerald-400 inline" />
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      setLightboxImage({
                        src: "/images/medical_image_hil/step1_encryption_results.png",
                        alt: "Step 1 Encryption & Histogram Uniformity",
                        title: "Step 1: Encryption Dashboard & Histogram Uniformity",
                        subtitle: "Plaintext scan, spatial scrambling, ciphertext generation, and flat chi-square histogram proof.",
                      })
                    }
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-emerald-500/60 dark:hover:border-volt-400/60 transition-all"
                    title="Click to view full image"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/medical_image_hil/step1_encryption_results.png"
                      alt="Step 1 Encryption & Histogram Uniformity"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 md:h-44 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10 flex items-center justify-center gap-1">
                      <span>Encryption &amp; Histogram</span>
                      <ZoomIn className="w-3 h-3 text-emerald-400 inline" />
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      setLightboxImage({
                        src: "/images/medical_image_hil/step3_security_audit_results.png",
                        alt: "Step 3 Security Audit & Pixel Correlation",
                        title: "Step 3: Security Audit & Pixel Correlation",
                        subtitle: "Adjacent pixel correlation (H/V/D), Shannon entropy (7.9991 bits/byte), and differential metrics (NPCR 100%, UACI 33.42%).",
                      })
                    }
                    className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-emerald-500/60 dark:hover:border-volt-400/60 transition-all"
                    title="Click to view full image"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/medical_image_hil/step3_security_audit_results.png"
                      alt="Step 3 Security Audit & Pixel Correlation"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 md:h-44 object-cover object-center group-hover/fig:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs p-1.5 text-[10px] sm:text-xs font-mono font-semibold text-slate-200 text-center truncate border-t border-white/10 flex items-center justify-center gap-1">
                      <span>Security Audit (NPCR/UACI)</span>
                      <ZoomIn className="w-3 h-3 text-emerald-400 inline" />
                    </div>
                  </div>
                </div>

                {/* Metric Readouts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Restoration Fidelity</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-volt-400 mt-0.5">
                      MSE = 0.0
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">PSNR = ∞ dB (Bit-exact)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Cipher Entropy</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-volt-400 mt-0.5">
                      7.9991
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">bits/byte (Ideal: 8.0000)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Physical HIL UART</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      921.6k
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">baud on STM32G474RE</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Differential Defense</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      100.0%
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">NPCR (UACI = 33.42%)</div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 pt-1">
                  *Physical HIL validation executed on bare-metal ARM Cortex-M4 (STM32G474RE Nucleo); hardware FPU coprocessor enabled in startup assembly; bit-exact verification documented in security audit.
                </div>
              </div>

              {/* Side Card: Reversible Visual Evidence */}
              <div className="flex flex-col justify-center items-stretch p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-slate-200 dark:border-[#1F293D] space-y-3.5">
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() =>
                      setLightboxImage({
                        src: "/images/medical_image_hil/cipher_image.png",
                        alt: "Encrypted Cipher Image",
                        title: "Encrypted Ciphertext (Brain MRI)",
                        subtitle: "Physical STM32 HIL ciphertext output streamed over 921,600 baud UART with continuous 4D hyperchaotic CBC diffusion.",
                      })
                    }
                    className="group/img cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative hover:border-emerald-500/60 transition-all"
                    title="Click to view full image"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/medical_image_hil/cipher_image.png"
                      alt="Encrypted Cipher Image"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto aspect-square object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="p-1 text-center text-[10px] font-mono text-slate-400 bg-black/75 flex items-center justify-center gap-1">
                      <span>Ciphertext</span>
                      <ZoomIn className="w-2.5 h-2.5 text-emerald-400 inline" />
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      setLightboxImage({
                        src: "/images/medical_image_hil/decrypted_image.png",
                        alt: "Reconstructed Decrypted Image",
                        title: "Restored Decrypted Image (Brain MRI)",
                        subtitle: "Bit-exact lossless reconstruction verified on STM32G474RE Nucleo testbed (MSE = 0.000000, 0 mismatched pixels).",
                      })
                    }
                    className="group/img cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative hover:border-emerald-500/60 transition-all"
                    title="Click to view full image"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/medical_image_hil/decrypted_image.png"
                      alt="Reconstructed Decrypted Image"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto aspect-square object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="p-1 text-center text-[10px] font-mono text-slate-400 bg-black/75 flex items-center justify-center gap-1">
                      <span>Restored (MSE=0)</span>
                      <ZoomIn className="w-2.5 h-2.5 text-emerald-400 inline" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    End-to-End Reversible Cryptosystem
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Physical HIL decryption over UART restoring 256×256×3 Brain MRI scan with zero distortion (MSE = 0.000000).
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href="https://github.com/Mukesh-Yadav-4/Memristive-hyperchaotic-medical-image-encryption"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <Github className="w-4 h-4" />
                    <span>View HIL Firmware &amp; Benchmark</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT 3: Second-Order Memristor Circuit Emulator & Hopfield Dynamics */}
          <div className="titanium-panel p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-mono font-bold">
                  PROJECT 03
                </span>
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

          {/* PROJECT 4: Hopfield Self-Optimization Independent Replication */}
          <div className="titanium-panel p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-xs font-mono font-bold">
                  PROJECT 04
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-xs font-mono font-bold">
                  INDEPENDENT REPLICATION STUDY
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  Weber, Guckelsberger &amp; Froese (2025)
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-[10px] font-mono text-purple-600 dark:text-purple-400">
                  ● Negative Results Reported
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/Mukesh-Yadav-4/Hopfield-self-optimization-replication"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-[#161E30] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1F293D] transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://github.com/Mukesh-Yadav-4/Hopfield-self-optimization-replication#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-[#161E30] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1F293D] transition-all"
                >
                  <span>README</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    Hopfield Self-Optimization: Independent Replication &amp; Ablations
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    Reimplemented the self-optimization Hopfield model of Weber, Guckelsberger &amp; Froese (2025) in Python/Numba and reproduced its four learning regimes. Ablations over 10 random networks found that partial resets confound the learning effect, and a duty-cycle test did not support a 1/e optimum. Negative results, reported with limitations.
                  </p>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2">
                    Independent work, not affiliated with the original authors.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Inner Loop</div>
                    <div className="text-base sm:text-lg font-bold font-mono text-purple-600 dark:text-purple-400 mt-0.5">
                      Python / Numba JIT
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">Asynchronous updates</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Regimes Reproduced</div>
                    <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      4 / 4 Regimes
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">Qualitative match</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Ablation Outcome</div>
                    <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      Reset Confound
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">10 random W0 networks</div>
                  </div>
                </div>
              </div>

              {/* Static Figure Preview - Click to Expand */}
              <div className="flex flex-col justify-center items-stretch p-3 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-slate-200 dark:border-[#1F293D]">
                <div
                  onClick={() =>
                    setLightboxImage({
                      src: "/so_repro_fig4.png",
                      alt: "Reproduction of Figure 4 from Weber et al. (2025): Hopfield network state and energy trajectories across four learning regimes",
                      title: "Hopfield Self-Optimization: 4-Regime Reproduction",
                      subtitle: "State trajectories and energy convergence across Flat (A), Inappropriate (B), Appropriate (C), and Creative (D) regimes under simulated annealing and Hebbian learning.",
                    })
                  }
                  className="group/fig cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-[#222E46] bg-slate-950 relative shadow-sm hover:border-purple-500/60 dark:hover:border-purple-400/60 transition-all"
                  title="Click to view full-resolution image"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/so_repro_fig4.png"
                    alt="Reproduction of Figure 4 from Weber et al. (2025): Hopfield network state and energy trajectories across four learning regimes"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain group-hover/fig:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-mono font-semibold flex items-center gap-1.5 border border-white/20 shadow-lg">
                      <ZoomIn className="w-3.5 h-3.5 text-purple-400" />
                      <span>Click to Expand</span>
                    </span>
                  </div>
                </div>
                <div className="p-2 text-center text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  Figure: 4-regime reproduction under simulated annealing and Hebbian learning (click to expand)
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT 5: ECG Signal Denoising: FIR vs. IIR (PhysioNet MIT-BIH Record 100) */}
          <div className="titanium-panel p-6 sm:p-8 relative overflow-hidden group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                  PROJECT 05
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                  PhysioNet MIT-BIH, single record (100), simulated noise
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
                    <div className="text-[10px] font-mono text-slate-400 uppercase">R-peak Alignment</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      100.00%
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">2,274 beats</div>
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

      {/* High-Resolution Image Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between pb-3 px-2 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-mono font-bold tracking-wide truncate max-w-[280px] sm:max-w-md">
                  {lightboxImage.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1"
                  title="Open full resolution in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Original Size</span>
                </a>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/80 text-slate-300 hover:text-white transition-all"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl flex items-center justify-center max-h-[75vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Bottom Caption */}
            {lightboxImage.subtitle && (
              <div className="w-full mt-2.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300 text-center">
                {lightboxImage.subtitle}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
