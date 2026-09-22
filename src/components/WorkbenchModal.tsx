"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Activity,
  Cpu,
  Sliders,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Image as ImageIcon,
  Terminal,
  CheckCircle2,
  Info
} from "lucide-react";
import wesadRawData from "@/data/wesad_ecg_samples.json";
import mitbihFilterData from "@/data/mitbih_filter_samples.json";
import ButterflyChaosTelemetry from "./ButterflyChaosTelemetry";

interface WesadCondition {
  signal: number[];
  peaks: number[];
}

interface WesadSubjectData {
  baseline: WesadCondition;
  stress: WesadCondition;
}

const wesadData = wesadRawData as Record<string, WesadSubjectData>;

interface WorkbenchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "ecg" | "memristor" | "filter";
}

export default function WorkbenchModal({ isOpen, onClose, initialTab = "ecg" }: WorkbenchModalProps) {
  const [activeTab, setActiveTab] = useState<"ecg" | "memristor" | "filter">(initialTab);

  // Sync initial tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-[#1F293D] shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-white/95 dark:bg-[#0E131F]/95 backdrop-blur border-b border-slate-200 dark:border-[#1F293D]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-volt-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-volt-400 animate-pulse" />
              <span>LIVE LABORATORY WORKBENCH</span>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-[#111726] p-1 rounded-xl border border-slate-200 dark:border-[#1F293D]">
            <button
              onClick={() => setActiveTab("ecg")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                activeTab === "ecg"
                  ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-volt-400 shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#1A2338]"
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-500 dark:text-volt-400" />
              <span>01. ECG Stress</span>
            </button>
            <button
              onClick={() => setActiveTab("memristor")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                activeTab === "memristor"
                  ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-volt-400 shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#1A2338]"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span>02. Memristor</span>
            </button>
            <button
              onClick={() => setActiveTab("filter")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                activeTab === "filter"
                  ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-volt-400 shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#1A2338]"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
              <span>03. FIR vs IIR</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#161E30] text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex sm:hidden border-b border-slate-200 dark:border-[#1F293D] p-2 bg-slate-50 dark:bg-[#0B0F17] gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab("ecg")}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg whitespace-nowrap ${
              activeTab === "ecg" ? "bg-emerald-500/20 text-emerald-600 dark:text-volt-400 font-bold" : "text-slate-500"
            }`}
          >
            01. ECG Stress
          </button>
          <button
            onClick={() => setActiveTab("memristor")}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg whitespace-nowrap ${
              activeTab === "memristor" ? "bg-emerald-500/20 text-emerald-600 dark:text-volt-400 font-bold" : "text-slate-500"
            }`}
          >
            02. Memristor
          </button>
          <button
            onClick={() => setActiveTab("filter")}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg whitespace-nowrap ${
              activeTab === "filter" ? "bg-emerald-500/20 text-emerald-600 dark:text-volt-400 font-bold" : "text-slate-500"
            }`}
          >
            03. FIR vs IIR
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-7 flex-1">
          {activeTab === "ecg" && <EcgStressWorkbench />}
          {activeTab === "memristor" && <MemristorWorkbench />}
          {activeTab === "filter" && <FilterWorkbench />}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 1. ECG STRESS TELEMETRY WORKBENCH
// --------------------------------------------------------------------------
function EcgStressWorkbench() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [subject, setSubject] = useState<"S2" | "S3" | "S17">("S2");
  const [state, setState] = useState<"baseline" | "stress">("baseline");
  const [subView, setSubView] = useState<"simulator" | "gallery" | "streamlit">("simulator");
  const [sweepSpeed, setSweepSpeed] = useState<"25" | "50">("25");
  const sweepSpeedRef = useRef<"25" | "50">("25");
  const [instantBpm, setInstantBpm] = useState<number>(75);
  const [instantRr, setInstantRr] = useState<number>(800);

  useEffect(() => {
    sweepSpeedRef.current = sweepSpeed;
  }, [sweepSpeed]);

  // Clinical telemetry metrics computed directly from WESAD dataset (export_demo_samples.py / samples_meta.json)
  const metrics = {
    S2: {
      baseline: { hr: 75.0, rr: 800, rmssd: 67.5, pnn50: 31.5, prob: 16 },
      stress: { hr: 80.1, rr: 749, rmssd: 43.1, pnn50: 23.1, prob: 22 },
    },
    S3: {
      baseline: { hr: 55.7, rr: 1077, rmssd: 107.4, pnn50: 67.9, prob: 7 },
      stress: { hr: 102.8, rr: 584, rmssd: 25.9, pnn50: 3.0, prob: 61 },
    },
    S17: {
      baseline: { hr: 65.2, rr: 920, rmssd: 106.2, pnn50: 63.5, prob: 26 },
      stress: { hr: 107.7, rr: 557, rmssd: 22.4, pnn50: 4.0, prob: 88 },
    },
  }[subject][state];

  // Authentic recorded WESAD ECG streaming
  useEffect(() => {
    if (subView !== "simulator") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 200);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 200;
    };
    window.addEventListener("resize", handleResize);

    const currentSample = wesadData[subject]?.[state] || wesadData["S2"]["baseline"];
    const sig = currentSample.signal;
    const peaks = currentSample.peaks;
    const len = sig.length;
    const fs = 350;

    // Precompute authentic beat-by-beat RR-intervals and instantaneous HR from detected peaks
    const hrTable = peaks.map((p: number, i: number) => {
      const prevP = i === 0 ? peaks[peaks.length - 1] - len : peaks[i - 1];
      const rrSec = (p - prevP) / fs;
      return {
        peak: p,
        rrMs: Math.round(rrSec * 1000),
        hr: Math.round(60 / rrSec),
      };
    });

    let lastActivePeakIdx = -1;
    let offset = 0;
    let lastTime = performance.now();

    const render = (currentTime?: number) => {
      const now = currentTime || performance.now();
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0), 0.1);
      lastTime = now;

      // Real physical clock advance (350 samples/second)
      offset = (offset + dt * fs) % len;
      ctx.clearRect(0, 0, width, height);

      // Clinical 25 mm/s standard: 6.0s window (2100 samples)
      // Detail 50 mm/s morphology: 3.0s window (1050 samples)
      const visiblePoints = sweepSpeedRef.current === "25" ? 2100 : 1050;

      // Coordinate Grid
      ctx.strokeStyle = "rgba(31, 41, 61, 0.4)";
      ctx.lineWidth = 0.5;
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Isoelectric Centerline
      const centerY = height * 0.60;
      ctx.strokeStyle = "rgba(100, 116, 139, 0.25)";
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Draw Authentic ECG trace
      const amp = height * 0.44;

      ctx.beginPath();
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = state === "stress" ? "#EF4444" : "#00E676";
      ctx.shadowColor = state === "stress" ? "rgba(239, 68, 68, 0.6)" : "rgba(0, 230, 118, 0.6)";
      ctx.shadowBlur = 6;

      for (let x = 0; x < width; x++) {
        const samplePos = (offset + (x / width) * visiblePoints) % len;
        const i0 = Math.floor(samplePos);
        const i1 = (i0 + 1) % len;
        const frac = samplePos - i0;
        const val = sig[i0] * (1 - frac) + sig[i1] * frac;

        const y = centerY - val * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Detected R-Peaks on authentic recorded peaks
      ctx.shadowBlur = 0;
      peaks.forEach((pIdx) => {
        const dist = (pIdx - offset + len) % len;
        if (dist >= 0 && dist < visiblePoints) {
          const px = (dist / visiblePoints) * width;
          const py = centerY - sig[pIdx] * amp;

          ctx.fillStyle = state === "stress" ? "#F87171" : "#4ADE80";
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = "bold 10px monospace";
          ctx.fillText("▼ R", px - 8, py - 9);
        }
      });

      // Leading scan indicator dot
      const lastX = width - 10;
      const scanPos = (offset + (lastX / width) * visiblePoints) % len;
      const s0 = Math.floor(scanPos);
      const s1 = (s0 + 1) % len;
      const sVal = sig[s0] * (1 - (scanPos - s0)) + sig[s1] * (scanPos - s0);
      const scanY = centerY - sVal * amp;

      // Track instantaneous HR from the most recent detected R-peak crossed by the scanhead
      let bestPeakIdx = 0;
      let minDistance = Infinity;
      for (let i = 0; i < peaks.length; i++) {
        const dist = (scanPos - peaks[i] + len) % len;
        if (dist < minDistance) {
          minDistance = dist;
          bestPeakIdx = i;
        }
      }

      if (bestPeakIdx !== lastActivePeakIdx) {
        lastActivePeakIdx = bestPeakIdx;
        const currentMetric = hrTable[bestPeakIdx];
        setInstantBpm(currentMetric.hr);
        setInstantRr(currentMetric.rrMs);
      }

      ctx.beginPath();
      ctx.arc(lastX, scanY, 4, 0, Math.PI * 2);
      ctx.fillStyle = state === "stress" ? "#EF4444" : "#10B981";
      ctx.shadowColor = state === "stress" ? "rgba(239, 68, 68, 0.9)" : "rgba(16, 185, 129, 0.9)";
      ctx.shadowBlur = 8;
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [state, subject, subView]);

  return (
    <div className="space-y-6">
      {/* Title & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Personalized ECG & HRV Stress Telemetry
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1">
            WESAD Dataset • 700 Hz Lead-II Acquisition • Relative Baseline Transform: X* = (X - Bs) / |Bs|
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://ecgstressdetection-2bremsry4npbmx9yn7whju.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-volt-400 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Live Streamlit App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://doi.org/10.5281/zenodo.22895173"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-volt-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
          >
            <span>Zenodo DOI</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/Mukesh-Yadav-4/ECG_STRESS_DETECTION/tree/main/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-lg bg-slate-100 dark:bg-[#161E30] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1F293D] hover:text-emerald-500 transition-all"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Sub-view switcher */}
      <div className="space-y-2 border-b border-slate-200 dark:border-[#1F293D] pb-3">
        <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-emerald-500 dark:text-volt-400" />
            <span>Select Laboratory View:</span>
          </span>
          <span className="text-emerald-600 dark:text-volt-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            3 Interactive Modes (Click to Switch)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-[#090D17] border border-slate-200 dark:border-[#222E46]">
          {/* TAB 1 */}
          <button
            onClick={() => setSubView("simulator")}
            className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              subView === "simulator"
                ? "bg-emerald-500 dark:bg-volt-400 text-slate-950 shadow-md shadow-emerald-500/25 ring-1 ring-emerald-300 dark:ring-volt-300 scale-[1.01]"
                : "bg-white dark:bg-[#131A29] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#263552] hover:border-emerald-400 dark:hover:border-volt-400 hover:bg-slate-50 dark:hover:bg-[#1A2438] hover:text-emerald-600 dark:hover:text-volt-400 hover:scale-[1.01] shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity className={`w-4 h-4 ${subView === "simulator" ? "text-slate-950" : "text-emerald-500 dark:text-volt-400"}`} />
              <span>1. Live Waveforms</span>
            </div>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                subView === "simulator"
                  ? "bg-black/20 text-slate-950"
                  : "bg-emerald-500/15 text-emerald-600 dark:text-volt-400 border border-emerald-500/30"
              }`}
            >
              350 Hz
            </span>
          </button>

          {/* TAB 2 */}
          <button
            onClick={() => setSubView("gallery")}
            className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              subView === "gallery"
                ? "bg-emerald-500 dark:bg-volt-400 text-slate-950 shadow-md shadow-emerald-500/25 ring-1 ring-emerald-300 dark:ring-volt-300 scale-[1.01]"
                : "bg-white dark:bg-[#131A29] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#263552] hover:border-sky-400 dark:hover:border-sky-400 hover:bg-slate-50 dark:hover:bg-[#1A2438] hover:text-sky-500 dark:hover:text-sky-300 hover:scale-[1.01] shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2">
              <ImageIcon className={`w-4 h-4 ${subView === "gallery" ? "text-slate-950" : "text-sky-500 dark:text-sky-400"}`} />
              <span>2. Scientific Figures</span>
            </div>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                subView === "gallery"
                  ? "bg-black/20 text-slate-950"
                  : "bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30"
              }`}
            >
              6 Figures
            </span>
          </button>

          {/* TAB 3 */}
          <button
            onClick={() => setSubView("streamlit")}
            className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              subView === "streamlit"
                ? "bg-emerald-500 dark:bg-volt-400 text-slate-950 shadow-md shadow-emerald-500/25 ring-1 ring-emerald-300 dark:ring-volt-300 scale-[1.01]"
                : "bg-white dark:bg-[#131A29] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#263552] hover:border-amber-400 dark:hover:border-amber-400 hover:bg-slate-50 dark:hover:bg-[#1A2438] hover:text-amber-500 dark:hover:text-amber-300 hover:scale-[1.01] shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2">
              <Terminal className={`w-4 h-4 ${subView === "streamlit" ? "text-slate-950" : "text-amber-500 dark:text-amber-400"}`} />
              <span>3. Python Studio</span>
            </div>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                subView === "streamlit"
                  ? "bg-black/20 text-slate-950"
                  : "bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30"
              }`}
            >
              Live App ↗
            </span>
          </button>
        </div>
      </div>

      {/* SUBVIEW 1: LIVE RECORDED WAVEFORM STREAM */}
      {subView === "simulator" && (
        <div className="space-y-5">
          {/* Authentic Signal Notice Banner */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div>
                <strong className="text-emerald-600 dark:text-volt-400">AUTHENTIC CLINICAL RECORDING:</strong> Rendering actual 700 Hz Lead-II RespiBAN chest telemetry from the WESAD benchmark (Subject {subject}, 10-second continuous cyclic window).
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Peak labels (▼ R) show Detected R-Peaks. To inspect the full raw continuous NumPy arrays, run LOSO scripts, or test with your own signals, switch to Tab 2 (Figures) or launch the Python Streamlit Studio.
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-[#111726] p-4 rounded-xl border border-slate-200 dark:border-[#1F293D]">
            <div>
              <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
                1. Select WESAD Subject
              </div>
              <div className="flex gap-2">
                {(["S2", "S3", "S17"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                      subject === s
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm"
                        : "bg-white dark:bg-[#161E30] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F293D]"
                    }`}
                  >
                    Subject {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
                2. Toggle Autonomic Condition
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setState("baseline")}
                  className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                    state === "baseline"
                      ? "bg-emerald-500 text-white border-transparent shadow-sm shadow-emerald-500/20"
                      : "bg-white dark:bg-[#161E30] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F293D]"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Resting Baseline</span>
                </button>
                <button
                  onClick={() => setState("stress")}
                  className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                    state === "stress"
                      ? "bg-red-500 text-white border-transparent shadow-sm shadow-red-500/20"
                      : "bg-white dark:bg-[#161E30] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F293D]"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Acute Stress (TSST)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Waveform Canvas */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-[#070A10] relative">
            <canvas ref={canvasRef} className="w-full block" />
            
            {/* Top Left Status & Clinical Speed Selector */}
            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
              <div className="text-[11px] font-mono text-slate-300 bg-black/75 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                Subject {subject} • {state === "stress" ? "Acute TSST Induced" : "Calm Baseline"} (350 Hz)
              </div>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/75 border border-white/10 text-[10px] font-mono backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setSweepSpeed("25")}
                  className={`px-2 py-0.5 rounded font-semibold transition-all ${
                    sweepSpeed === "25"
                      ? "bg-emerald-500 dark:bg-volt-400 text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="Standard Clinical Monitor Speed (25 mm/s, 6.0s window)"
                >
                  25 mm/s (Standard)
                </button>
                <button
                  type="button"
                  onClick={() => setSweepSpeed("50")}
                  className={`px-2 py-0.5 rounded font-semibold transition-all ${
                    sweepSpeed === "50"
                      ? "bg-emerald-500 dark:bg-volt-400 text-slate-950 font-bold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title="High-Resolution Morphology Speed (50 mm/s, 3.0s window)"
                >
                  50 mm/s (Detail)
                </button>
              </div>
            </div>

            {/* Top Right Live Telemetry Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <div className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg flex items-center gap-2 bg-black/80 border border-white/10 backdrop-blur-sm">
                <span className="text-slate-400 font-normal">RR: <b className="text-white font-mono">{instantRr} ms</b></span>
                <span className="text-slate-600">|</span>
                <span
                  className={`w-2 h-2 rounded-full ${state === "stress" ? "bg-red-400 animate-ping" : "bg-emerald-400"}`}
                />
                <span className={state === "stress" ? "text-red-400" : "text-emerald-400"}>
                  {instantBpm} BPM ({state === "stress" ? "SYMPATHETIC" : "PARASYMPATHETIC"})
                </span>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-400 pointer-events-none flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded border border-white/10">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>
                {sweepSpeed === "25" ? "25 mm/s Standard Clinical Window (6.0s • ~7-8 beats)" : "50 mm/s High-Detail Morphology Window (3.0s)"} • Clock Δt Normalized
              </span>
            </div>
          </div>

          {/* Real-time Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
              <div className="text-[10px] font-mono uppercase text-slate-500">Heart Rate</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {metrics.hr} <span className="text-xs text-slate-400">BPM</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {state === "stress" ? "↑ Tachycardia" : "Normal sinus"}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
              <div className="text-[10px] font-mono uppercase text-slate-500">Mean RR</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {metrics.rr} <span className="text-xs text-slate-400">ms</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {state === "stress" ? "-28% interval compression" : "Standard interval"}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
              <div className="text-[10px] font-mono uppercase text-slate-500">RMSSD (Vagal)</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {metrics.rmssd} <span className="text-xs text-slate-400">ms</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {state === "stress" ? "↓ Vagal withdrawal" : "Normal variability"}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
              <div className="text-[10px] font-mono uppercase text-slate-500">pNN50</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {metrics.pnn50} <span className="text-xs text-slate-400">%</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {state === "stress" ? "Extreme suppression" : "Healthy autonomic tone"}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
              <div className="text-[10px] font-mono uppercase text-slate-500">Model Probability</div>
              <div
                className={`text-xl font-bold font-mono mt-1 ${
                  state === "stress" ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {metrics.prob}%
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {state === "stress" ? "Class: ACUTE STRESS" : "Class: CALM BASELINE"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: SCIENTIFIC FIGURES & CASE STUDY */}
      {subView === "gallery" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-xs font-mono text-slate-600 dark:text-slate-300">
            High-resolution validation figures directly exported from our Python pipeline (`matplotlib` / `seaborn`) and bare-metal STM32 hardware testbed. These plots validate the Leave-One-Subject-Out (LOSO) cross-validation and embedded DSP latency published in Zenodo Preprint (DOI: 10.5281/zenodo.22895173).
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fig 1: Pan-Tompkins */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/DEMO_Pan_Tompkins_QRS_Detection.png"
                  alt="Detected R-Peaks"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 1: Detected R-Peaks & QRS Feature Extraction
                </div>
                <p className="text-xs text-slate-500">
                  Bandpass filtering (0.5–40 Hz), 5-point derivative, squaring, moving window integration, and adaptive dual-threshold R-peak detection.
                </p>
              </div>
            </div>

            {/* Fig 2: ROC Curve */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/FINAL_ROC_Curve.png"
                  alt="Leave-One-Subject-Out ROC Curve"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 2: Stratified LOSO ROC Curve (AUC = 0.9494)
                </div>
                <p className="text-xs text-slate-500">
                  Receiver Operating Characteristic across 15 unseen subjects under strict Leave-One-Subject-Out cross-validation.
                </p>
              </div>
            </div>

            {/* Fig 3: Confusion Matrix */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/FINAL_Confusion_Matrix.png"
                  alt="Confusion Matrix"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 3: Normalized Confusion Matrix (92.36% Accuracy)
                </div>
                <p className="text-xs text-slate-500">
                  High specificity between calm baseline and acute TSST stress condition, overcoming inter-individual autonomic baseline shifts.
                </p>
              </div>
            </div>

            {/* Fig 4: Full Pipeline Dashboard */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/FINAL_Project_Dashboard.png"
                  alt="Full Pipeline Dashboard"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 4: Comprehensive Telemetry Architecture
                </div>
                <p className="text-xs text-slate-500">
                  End-to-end signal chain from 700 Hz acquisition, HRV feature extraction, to LightGBM / XGBoost inference in &lt;0.85 ms.
                </p>
              </div>
            </div>

            {/* Fig 5: Feature Ablation */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/FINAL_Personalized_Feature_Ablation.png"
                  alt="Personalized Feature Ablation Study"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 5: Personalized Feature Ablation Study
                </div>
                <p className="text-xs text-slate-500">
                  Quantifying the +10.79% accuracy leap enabled by the relative baseline transform X* = (X - Bs)/|Bs|.
                </p>
              </div>
            </div>

            {/* Fig 6: Raw Lead-II */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/DEMO_Raw_ECG_LeadII.png"
                  alt="Continuous Raw Lead-II ECG"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 6: Raw Continuous Lead-II Telemetry
                </div>
                <p className="text-xs text-slate-500">
                  Continuous raw physiological data recorded from the RespiBAN chest band under standard laboratory protocol.
                </p>
              </div>
            </div>

            {/* Fig 7: STM32 Hardware Testbed */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/FIG_Hardware_Testbed_Composite.png"
                  alt="STM32G474RE Hardware Testbed Composite"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 7: Bare-Metal STM32G474RE Testbed & Logic Analyzer Setup
                </div>
                <p className="text-xs text-slate-500">
                  ARM Cortex-M4 (STM32G474RE) executing CMSIS-DSP 5-stage Biquad IIR filtering in 1.87 μs (0.065% CPU load @ 16 MHz) with logic analyzer verification.
                </p>
              </div>
            </div>

            {/* Fig 8: Decrypted Telemetry Terminal */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/Physical_Usb_com_port_continuous_decrypted_telemetery.png"
                  alt="Authorized Terminal View"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 8: Physical USB-UART Telemetry (Authorized View)
                </div>
                <p className="text-xs text-slate-500">
                  Continuous hardware streaming over physical USB COM port with zero CRC drops across 15,000+ packets and bit-exact (0.000000 V) descrambling.
                </p>
              </div>
            </div>

            {/* Fig 9: Eavesdropper Ciphertext Stream */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/Physical_Usb_com_port_continuous_eavesdropper_telemetery.png"
                  alt="Eavesdropper Terminal View"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 9: Eavesdropper Terminal View (Chaotic Scrambler)
                </div>
                <p className="text-xs text-slate-500">
                  Adversarial capture of the scrambled telemetry stream (2.0 μs execution, Shannon entropy 7.25–7.98 b/B), demonstrating complete clinical obfuscation.
                </p>
              </div>
            </div>

            {/* Fig 10: Multi-Subject Clinical Detection */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ecg/FINAL_Subject_Stress_Detection.png"
                  alt="Multi-Subject Stress Detection"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 10: Multi-Subject Benchmark Stress Detection
                </div>
                <p className="text-xs text-slate-500">
                  Continuous multi-subject timeline validation demonstrating acute stress classification aligning with ground truth TSST stress exposure across subjects.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 3: STREAMLIT PYTHON TELEMETRY STUDIO */}
      {subView === "streamlit" && (
        <div className="space-y-6">
          <div className="titanium-panel p-6 bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-mono">
                  Streamlit Python Telemetry Studio (`demo/app.py`)
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  Full standalone Python desktop & web application for live biometric feature extraction
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our repository includes a complete Streamlit studio (`demo/app.py`) with real-time waveform inspection, custom `.npz` file uploads, interactive decision threshold sliders, and HRV feature radar plots.
            </p>

            {/* Launch Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://ecgstressdetection-2bremsry4npbmx9yn7whju.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-md transition-all hover:scale-[1.01]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Launch Live Streamlit Cloud Studio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/Mukesh-Yadav-4/ECG_STRESS_DETECTION/tree/main/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-[#161E30] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#1F293D] font-mono text-xs sm:text-sm hover:text-emerald-500 transition-all"
              >
                <span>View Streamlit Demo on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="http://localhost:8501"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-3 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 font-mono text-xs transition-all"
                title="Open local instance if running locally"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Localhost:8501</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// 2. MEMRISTOR CIRCUIT EMULATOR WORKBENCH
// --------------------------------------------------------------------------
function MemristorWorkbench() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [freq, setFreq] = useState(25); // 5 to 80 kHz
  const [subView, setSubView] = useState<"simulator" | "gallery">("simulator");
  const [mode, setMode] = useState<"hysteresis" | "butterfly" | "statespace">("butterfly");
  const [butterflyViewType, setButterflyViewType] = useState<"live" | "figure">("live");

  useEffect(() => {
    if (subView !== "simulator" || mode !== "hysteresis") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 260);

    const centerX = width / 2;
    const centerY = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = "rgba(31, 41, 61, 0.4)";
      ctx.lineWidth = 0.5;
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Origin Axes
      ctx.strokeStyle = "rgba(100, 116, 139, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();

      // Axis Tick Labels
      ctx.fillStyle = "#64748B";
      ctx.font = "10px monospace";
      ctx.fillText("-2V", width * 0.12, centerY + 14);
      ctx.fillText("0V", centerX + 5, centerY + 14);
      ctx.fillText("+2V", width * 0.88, centerY + 14);
      ctx.fillText("+50mA", centerX + 5, 20);
      ctx.fillText("-50mA", centerX + 5, height - 10);

      // Realistic IEEE TCAS-I Pinched Hysteresis Loop
      const pinchFactor = Math.max(0.04, Math.pow((85 - freq) / 80, 1.4));
      const scaleX = width * 0.38;
      const scaleY = height * 0.38;

      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#00E676";
      ctx.shadowColor = "rgba(0, 230, 118, 0.7)";
      ctx.shadowBlur = 8;

      const steps = 360;
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * Math.PI * 2;
        const v = 2 * Math.sin(theta);

        const cubicConductance = 0.35 * v + 0.15 * Math.pow(v, 3);
        const hysteresisSplit = 0.55 * Math.cos(theta) * (Math.abs(v) / 2) * pinchFactor;
        const iNorm = cubicConductance + hysteresisSplit;

        const px = centerX + (v / 2) * scaleX;
        const py = centerY - (iNorm / 1.8) * scaleY;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Pinched Origin Node (0, 0)
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#EF4444";
      ctx.fill();

      // Trace color and frequency legend
      ctx.fillStyle = "#00E676";
      ctx.font = "11px monospace";
      ctx.fillText(`f = ${freq} kHz`, width - 90, 25);
    };

    render();
  }, [freq, mode, subView]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Second-Order Memristor Analog Circuit Emulation
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Hardware Reproduction • Based on Lin et al., IEEE TCAS-I (2026) • Dual Internal State Variables
          </p>
        </div>
        <a
          href="https://github.com/Mukesh-Yadav-4/second-order-memristor-emulator"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-volt-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
        >
          <span>View LTspice & MATLAB Repo</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Sub-view switcher */}
      <div className="space-y-2 border-b border-slate-200 dark:border-[#1F293D] pb-3">
        <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-emerald-500 dark:text-volt-400" />
            <span>Select Laboratory View:</span>
          </span>
          <span className="text-emerald-600 dark:text-volt-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            2 Interactive Modes (Click to Switch)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-[#090D17] border border-slate-200 dark:border-[#222E46]">
          {/* TAB 1 */}
          <button
            onClick={() => setSubView("simulator")}
            className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              subView === "simulator"
                ? "bg-emerald-500 dark:bg-volt-400 text-slate-950 shadow-md shadow-emerald-500/25 ring-1 ring-emerald-300 dark:ring-volt-300 scale-[1.01]"
                : "bg-white dark:bg-[#131A29] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#263552] hover:border-emerald-400 dark:hover:border-volt-400 hover:bg-slate-50 dark:hover:bg-[#1A2438] hover:text-emerald-600 dark:hover:text-volt-400 hover:scale-[1.01] shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2">
              <Cpu className={`w-4 h-4 ${subView === "simulator" ? "text-slate-950" : "text-emerald-500 dark:text-volt-400"}`} />
              <span>Dynamic Circuit Simulator</span>
            </div>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                subView === "simulator"
                  ? "bg-black/20 text-slate-950"
                  : "bg-emerald-500/15 text-emerald-600 dark:text-volt-400 border border-emerald-500/30"
              }`}
            >
              Lissajous
            </span>
          </button>

          {/* TAB 2 */}
          <button
            onClick={() => setSubView("gallery")}
            className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              subView === "gallery"
                ? "bg-emerald-500 dark:bg-volt-400 text-slate-950 shadow-md shadow-emerald-500/25 ring-1 ring-emerald-300 dark:ring-volt-300 scale-[1.01]"
                : "bg-white dark:bg-[#131A29] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#263552] hover:border-blue-400 dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-[#1A2438] hover:text-blue-500 dark:hover:text-blue-300 hover:scale-[1.01] shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2">
              <ImageIcon className={`w-4 h-4 ${subView === "gallery" ? "text-slate-950" : "text-blue-500 dark:text-blue-400"}`} />
              <span>Circuit Emulator & Chaotic Plots</span>
            </div>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                subView === "gallery"
                  ? "bg-black/20 text-slate-950"
                  : "bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/30"
              }`}
            >
              6 Figures
            </span>
          </button>
        </div>
      </div>

      {subView === "simulator" && (
        <div className="space-y-5">
          {/* Verification Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-500/10 border border-blue-500/25 text-xs font-mono text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-500 dark:text-blue-400">CIRCUIT EMULATOR BENCHMARK:</strong> The interactive Lissajous plot below computes the authentic pinched hysteresis loop passing strictly through (0V, 0mA). As frequency increases toward 80 kHz, the loop degenerates into a single-valued resistor. Switch to Tab 2 to inspect circuit emulation figures and multi-butterfly attractors.
            </div>
          </div>

          {/* Mode Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-50 dark:bg-[#111726] p-2 rounded-xl border border-slate-200 dark:border-[#1F293D]">
            <button
              onClick={() => setMode("butterfly")}
              className={`py-2 px-3 text-xs font-mono font-bold rounded-lg border flex items-center justify-center gap-1.5 transition-all ${
                mode === "butterfly"
                  ? "bg-rose-500 text-white border-transparent shadow-sm shadow-rose-500/25"
                  : "bg-white dark:bg-[#161E30] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F293D]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
              <span>4-Butterfly Chaos (Live RK4)</span>
            </button>
            <button
              onClick={() => setMode("hysteresis")}
              className={`py-2 px-3 text-xs font-mono font-bold rounded-lg border transition-all ${
                mode === "hysteresis"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm"
                  : "bg-white dark:bg-[#161E30] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F293D]"
              }`}
            >
              v-i Pinched Hysteresis (5-80 kHz)
            </button>
            <button
              onClick={() => setMode("statespace")}
              className={`py-2 px-3 text-xs font-mono font-bold rounded-lg border transition-all ${
                mode === "statespace"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm"
                  : "bg-white dark:bg-[#161E30] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F293D]"
              }`}
            >
              3D State Space (x1-x2-x3)
            </button>
          </div>

          {/* Dynamic Display Area */}
          {mode === "hysteresis" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  <span>Excitation Frequency Sweep</span>
                  <span className="text-emerald-600 dark:text-volt-400 font-bold text-sm">{freq} kHz</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={80}
                  value={freq}
                  onChange={(e) => setFreq(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>5 kHz (Broad Multi-Lobed Hysteresis)</span>
                  <span>40 kHz (Intermediate Pinch)</span>
                  <span>80 kHz (Degenerated Single-Valued Resistor)</span>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-[#070A10] relative">
                <canvas ref={canvasRef} className="w-full block" />
                <div className="absolute top-3 left-3 text-[11px] font-mono text-slate-400 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                  v(t) vs i(t) Lissajous Curve • Strict Origin Pinch at (0V, 0mA)
                </div>
              </div>
            </div>
          )}

          {mode === "butterfly" && (
            <div className="space-y-4">
              {/* Telemetry View Switcher Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-100 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                <div className="flex items-center gap-2 px-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-white">
                    4-Butterfly Phase-Space Dynamics (M = 2, k = 0.40)
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white dark:bg-[#161E30] p-1 rounded-lg border border-slate-200 dark:border-[#222E46]">
                  <button
                    onClick={() => setButterflyViewType("live")}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                      butterflyViewType === "live"
                        ? "bg-rose-500 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-white"
                    }`}
                  >
                    ⚡ Real-Time RK4 Simulation
                  </button>
                  <button
                    onClick={() => setButterflyViewType("figure")}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                      butterflyViewType === "figure"
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-white"
                    }`}
                  >
                    📄 Paper Fig. 9(c) (MATLAB)
                  </button>
                </div>
              </div>

              {butterflyViewType === "live" ? (
                <ButterflyChaosTelemetry />
              ) : (
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-white dark:bg-[#070A10] p-3 text-center">
                  <div className="relative rounded-lg overflow-hidden bg-white max-h-[380px] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/memristor/SOM_HNN_4Butterfly_Attractor.png"
                      alt="SOM-HNN 4-Butterfly Attractor (k = 0.4, M = 2)"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto max-h-[360px] object-contain rounded"
                    />
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-2">
                    Fig. 9(c): Authentic MATLAB ode23 steady-state simulation (k = 0.4, M = 2, φ₂ vs φ₁) showcasing 4 distinct dual-lobe chaotic butterfly wings.
                  </div>
                </div>
              )}
            </div>
          )}

          {mode === "statespace" && (
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-white dark:bg-[#070A10] p-3 text-center">
              <div className="relative rounded-lg overflow-hidden bg-white max-h-[380px] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/memristor/SOM_HNN_3D_State_Space.png"
                  alt="SOM-HNN 3D State Space Trajectory"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[360px] object-contain rounded"
                />
              </div>
              <div className="text-xs font-mono text-slate-500 mt-2">
                SOM-HNN 3D State-Space Trajectory (x₁ - x₂ - x₃) demonstrating multi-scroll strange attractor dynamics.
              </div>
            </div>
          )}

          {/* Technical Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
              <div className="text-slate-500 uppercase">Fingerprint Rule</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                Loop Area ∝ 1 / Frequency
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                As f → ∞, memristor degenerates into a linear single-valued resistor.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
              <div className="text-slate-500 uppercase">Hardware Circuit</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                AD844 CFAs + AD633 Multiplier
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                UniversalOpAmp1 macro-model prevents singular matrix crashes in SPICE.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
              <div className="text-slate-500 uppercase">Coupled Network</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                5D Chaotic Hopfield (SOM-HNN)
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Multi-butterfly chaotic attractors validated via MATLAB ODE45 solver.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: SCIENTIFIC FIGURES & CIRCUIT EMULATION GALLERY */}
      {subView === "gallery" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-xs font-mono text-slate-600 dark:text-slate-300">
            Circuit emulation artifacts, frequency sweeps, and MATLAB numerical simulations reproducing IEEE TCAS-I (2026).
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fig 1: Circuit Emulator */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/memristor/second_order_mem_regestier.png"
                  alt="Second-Order Memristor Circuit Emulator"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 1: Analog Circuit Emulator Implementation
                </div>
                <p className="text-xs text-slate-500">
                  Implemented using AD844 Current Feedback Amplifiers (CFAs), AD633 four-quadrant analog multiplier, and dual capacitor state variables.
                </p>
              </div>
            </div>

            {/* Fig 2: 4-Butterfly Attractor */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/memristor/SOM_HNN_4Butterfly_Attractor.png"
                  alt="SOM-HNN 4-Butterfly Attractor"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 2: 4-Butterfly Chaotic Attractor (φ₂ vs φ₁)
                </div>
                <p className="text-xs text-slate-500">
                  MATLAB ode23 numerical integration (k = 0.4, M = 2) revealing 4 distinct symmetric butterfly wings in the coupled SOM-HNN.
                </p>
              </div>
            </div>

            {/* Fig 3: 3D State Space */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/memristor/SOM_HNN_3D_State_Space.png"
                  alt="3D State Space"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 3: 3D State Space Trajectory (x₁ - x₂ - x₃)
                </div>
                <p className="text-xs text-slate-500">
                  Multi-scroll chaotic attractor orbits proving deterministic chaos in the 5-dimensional memristive neural system.
                </p>
              </div>
            </div>

            {/* Fig 4: Pinched Hysteresis vs Frequency */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/memristor/Fig2d_Pinched_Hysteresis_Frequency.png"
                  alt="Frequency-Dependent Pinched Hysteresis"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 4: Frequency-Dependent Pinched Hysteresis Loops
                </div>
                <p className="text-xs text-slate-500">
                  Simulated frequency sweep verifying that hysteresis lobe area collapses to zero as excitation frequency reaches high limits.
                </p>
              </div>
            </div>

            {/* Fig 5: Pinched Hysteresis vs Amplitude */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/memristor/Fig2c_Pinched_Hysteresis_Amplitude.png"
                  alt="Amplitude-Dependent Pinched Hysteresis"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 5: Voltage Amplitude Dependency
                </div>
                <p className="text-xs text-slate-500">
                  Evolution of nonlinear current trajectories across excitation voltages Vm = 1.0V to 3.0V.
                </p>
              </div>
            </div>

            {/* Fig 6: State Variables */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/memristor/SOM_HNN_State_Variables.png"
                  alt="Internal State Variables"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 6: Dual Internal State Variables (u vs v)
                </div>
                <p className="text-xs text-slate-500">
                  Phase relationship between the two independent internal state variables governing second-order memristance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// 3. ECG SIGNAL DENOISING WORKBENCH (FIR vs IIR)
// --------------------------------------------------------------------------
function FilterWorkbench() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [filterType, setFilterType] = useState<"raw" | "iir" | "fir" | "overlay">("overlay");
  const [subView, setSubView] = useState<"simulator" | "gallery">("simulator");

  useEffect(() => {
    if (subView !== "simulator") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 180);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 180;
    };
    window.addEventListener("resize", handleResize);

    const rawData: number[] = mitbihFilterData.noisy;
    const iirData: number[] = mitbihFilterData.iir;
    const firData: number[] = mitbihFilterData.fir;
    const len = mitbihFilterData.length; // 3600 samples
    const fs = mitbihFilterData.fs; // 360 Hz

    let offset = 0;
    let lastTime = performance.now();
    const visiblePoints = 1440; // 4.0s clinical window at 360 Hz

    const render = (currentTime?: number) => {
      const now = currentTime || performance.now();
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0), 0.1);
      lastTime = now;

      offset = (offset + dt * fs) % len;
      ctx.clearRect(0, 0, width, height);

      // CRT Dark Background
      ctx.fillStyle = "#070A10";
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = "rgba(31, 41, 61, 0.4)";
      ctx.lineWidth = 0.5;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const centerY = height * 0.55;
      const amp = height * 0.35;

      const drawSignal = (data: number[], color: string, glow: string, widthPx: number) => {
        ctx.beginPath();
        ctx.lineWidth = widthPx;
        ctx.strokeStyle = color;
        ctx.shadowColor = glow;
        ctx.shadowBlur = widthPx > 1.5 ? 6 : 3;
        ctx.lineJoin = "round";

        for (let x = 0; x < width; x++) {
          const samplePos = (offset + (x / width) * visiblePoints) % len;
          const i0 = Math.floor(samplePos);
          const i1 = (i0 + 1) % len;
          const frac = samplePos - i0;
          const val = data[i0] * (1 - frac) + data[i1] * frac;

          const y = centerY - val * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      if (filterType === "raw") {
        drawSignal(rawData, "#F43F5E", "rgba(244, 63, 94, 0.6)", 1.5);
      } else if (filterType === "iir") {
        drawSignal(iirData, "#10B981", "rgba(16, 185, 129, 0.7)", 2.0);
      } else if (filterType === "fir") {
        drawSignal(firData, "#C084FC", "rgba(192, 132, 252, 0.8)", 2.0);
      } else {
        // Overlay Mode: Noisy in Reddish + IIR in Purple/Green
        drawSignal(rawData, "rgba(244, 63, 94, 0.75)", "rgba(244, 63, 94, 0.3)", 1.2);
        drawSignal(iirData, "#C084FC", "rgba(192, 132, 252, 0.85)", 2.2);
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [filterType, subView]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            ECG Signal Denoising: FIR vs. IIR Filter Benchmark
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1">
            PhysioNet MIT-BIH Database (Record 100) • Format 212 Binary Decoding • Butterworth IIR vs 100-Tap FIR
          </p>
        </div>
        <a
          href="https://github.com/Mukesh-Yadav-4/ECG-FIR-IIR-filter-comparison"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-volt-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
        >
          <span>View Filter Repository</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Sub-view switcher */}
      <div className="space-y-2 border-b border-slate-200 dark:border-[#1F293D] pb-3">
        <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-emerald-500 dark:text-volt-400" />
            <span>Select Laboratory View:</span>
          </span>
          <span className="text-emerald-600 dark:text-volt-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            2 Interactive Modes (Click to Switch)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-[#090D17] border border-slate-200 dark:border-[#222E46]">
          {/* TAB 1 */}
          <button
            onClick={() => setSubView("simulator")}
            className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              subView === "simulator"
                ? "bg-emerald-500 dark:bg-volt-400 text-slate-950 shadow-md shadow-emerald-500/25 ring-1 ring-emerald-300 dark:ring-volt-300 scale-[1.01]"
                : "bg-white dark:bg-[#131A29] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#263552] hover:border-emerald-400 dark:hover:border-volt-400 hover:bg-slate-50 dark:hover:bg-[#1A2438] hover:text-emerald-600 dark:hover:text-volt-400 hover:scale-[1.01] shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2">
              <Sliders className={`w-4 h-4 ${subView === "simulator" ? "text-slate-950" : "text-emerald-500 dark:text-volt-400"}`} />
              <span>1. Interactive Filter Simulator</span>
            </div>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                subView === "simulator"
                  ? "bg-black/20 text-slate-950"
                  : "bg-emerald-500/15 text-emerald-600 dark:text-volt-400 border border-emerald-500/30"
              }`}
            >
              IIR vs FIR
            </span>
          </button>

          {/* TAB 2 */}
          <button
            onClick={() => setSubView("gallery")}
            className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              subView === "gallery"
                ? "bg-emerald-500 dark:bg-volt-400 text-slate-950 shadow-md shadow-emerald-500/25 ring-1 ring-emerald-300 dark:ring-volt-300 scale-[1.01]"
                : "bg-white dark:bg-[#131A29] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#263552] hover:border-cyan-400 dark:hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-[#1A2438] hover:text-cyan-500 dark:hover:text-cyan-300 hover:scale-[1.01] shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2">
              <ImageIcon className={`w-4 h-4 ${subView === "gallery" ? "text-slate-950" : "text-cyan-500 dark:text-cyan-400"}`} />
              <span>2. PhysioNet Record 100 Benchmarks</span>
            </div>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                subView === "gallery"
                  ? "bg-black/20 text-slate-950"
                  : "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30"
              }`}
            >
              5 Figures
            </span>
          </button>
        </div>
      </div>

      {subView === "simulator" && (
        <div className="space-y-5">
          {/* Verification Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-cyan-500 dark:text-cyan-400">PHYSIONET BENCHMARK SIMULATION:</strong> Interactive demonstration of 4th-order Butterworth bandpass (0.5–40 Hz) and 100-tap equiripple FIR linear phase filtering. For original MIT-BIH Record 100 12-bit Format 212 binary decoded waveform plots and MATLAB scripts, switch to Tab 2 or view the GitHub repo.
            </div>
          </div>

          {/* Filter Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-[#111726] p-4 rounded-xl border border-slate-200 dark:border-[#1F293D]">
            <div>
              <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
                1. Select Filter Mode
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setFilterType("overlay")}
                  className={`py-2 px-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                    filterType === "overlay"
                      ? "bg-purple-600 text-white border-transparent shadow-sm"
                      : "bg-white dark:bg-[#161E30] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F293D]"
                  }`}
                >
                  Dual Overlay
                </button>
                <button
                  onClick={() => setFilterType("raw")}
                  className={`py-2 px-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                    filterType === "raw"
                      ? "bg-rose-500 text-white border-transparent shadow-sm"
                      : "bg-white dark:bg-[#161E30] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F293D]"
                  }`}
                >
                  Raw Noisy
                </button>
                <button
                  onClick={() => setFilterType("iir")}
                  className={`py-2 px-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                    filterType === "iir"
                      ? "bg-emerald-500 text-white border-transparent shadow-sm"
                      : "bg-white dark:bg-[#161E30] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F293D]"
                  }`}
                >
                  IIR Butterworth
                </button>
                <button
                  onClick={() => setFilterType("fir")}
                  className={`py-2 px-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                    filterType === "fir"
                      ? "bg-purple-500 text-white border-transparent shadow-sm"
                      : "bg-white dark:bg-[#161E30] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F293D]"
                  }`}
                >
                  FIR Equiripple
                </button>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
                2. MIT-BIH Record 100 Signal Specs
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                <span className="px-2 py-1 rounded bg-slate-200/80 dark:bg-black/50 border border-slate-300 dark:border-white/10">
                  Fs = 360 Hz
                </span>
                <span className="px-2 py-1 rounded bg-slate-200/80 dark:bg-black/50 border border-slate-300 dark:border-white/10">
                  Lead-MLII (2,274 Beats)
                </span>
                <span className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-bold">
                  Zero-Phase filtfilt
                </span>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-[#070A10] relative">
            <canvas ref={canvasRef} className="w-full block" />
            <div className="absolute top-3 left-3 text-[11px] font-mono text-slate-200 bg-black/80 backdrop-blur px-2.5 py-1 rounded border border-white/15">
              {filterType === "overlay" && "Dual Overlay: Reddish Noisy (3.96 dB) vs Purplish IIR Butterworth (10.11 dB)"}
              {filterType === "raw" && "Corrupted MIT-BIH Lead-MLII (+50Hz Hum & 0.3Hz Wander) • Input SNR = 3.96 dB"}
              {filterType === "iir" && "4th-Order Butterworth IIR Bandpass (0.5–40 Hz) • Output SNR = 10.11 dB (+6.17 dB Gain)"}
              {filterType === "fir" && "100-Tap Equiripple FIR Bandpass (0.5–40 Hz) • Output SNR = 7.01 dB (Zero Phase Distortion)"}
            </div>
          </div>

          {/* Comparison Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
              <div className="text-slate-500 uppercase">SNR Improvement</div>
              <div className="text-sm font-bold text-emerald-500 mt-1">
                +6.17 dB Gain (IIR)
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                3.95 dB → 10.12 dB SNR with sharp roll-off at cutoff frequencies.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
              <div className="text-slate-500 uppercase">Morphology Preservation</div>
              <div className="text-sm font-bold text-cyan-400 mt-1">
                100.00% Beat Match (FIR)
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Exact linear phase response avoids ST-segment diagnostic distortion.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
              <div className="text-slate-500 uppercase">Compute Efficiency</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                12.5× Lower Memory (IIR)
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Requires only 8 filter taps vs 100 taps for FIR, ideal for low-power wearables.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: SCIENTIFIC FIGURES & PHYSIONET RECORD 100 */}
      {subView === "gallery" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-xs font-mono text-slate-600 dark:text-slate-300">
            Validation figures computed directly from PhysioNet MIT-BIH Arrhythmia Database Record 100 (Lead-MLII, 2,274 clinical beats).
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fig 1: Filter Comparison Centered */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/filter/Fig2_Filter_Comparison_Centered.png"
                  alt="Filter Comparison Centered"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 1: Centered Waveform Alignment: Clean vs Noisy vs Filtered
                </div>
                <p className="text-xs text-slate-500">
                  Direct time-domain comparison illustrating complete suppression of 50 Hz powerline ripple while preserving QRS morphology.
                </p>
              </div>
            </div>

            {/* Fig 2: R-Peak Alignment */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/filter/Fig4_RPeak_Alignment.png"
                  alt="R-Peak Alignment"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 2: R-Peak Temporal Alignment & Group Delay
                </div>
                <p className="text-xs text-slate-500">
                  Proving zero group-delay distortion across 2,274 clinical beats with the 100-tap equiripple FIR filter.
                </p>
              </div>
            </div>

            {/* Fig 3: Performance Dashboard */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/filter/Fig5_Performance_Dashboard.png"
                  alt="Performance Dashboard"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 3: Full Filter Benchmark Performance Dashboard
                </div>
                <p className="text-xs text-slate-500">
                  Comprehensive quantitative summary comparing SNR improvement (+6.17 dB), processing execution latency, and memory tap requirements.
                </p>
              </div>
            </div>

            {/* Fig 4: IIR Frequency Response */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F]">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/filter/Fig3_IIR_Frequency_Response.png"
                  alt="IIR Frequency Response"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 4: IIR Bode Magnitude & Phase Response
                </div>
                <p className="text-xs text-slate-500">
                  Frequency response showing sharp cutoff characteristics at 0.5 Hz and 40 Hz with minimal passband attenuation.
                </p>
              </div>
            </div>

            {/* Fig 5: Raw vs Corrupted Signals */}
            <div className="titanium-panel p-4 space-y-3 bg-white dark:bg-[#0E131F] md:col-span-2">
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/filter/Fig1_Raw_and_Noisy_Signals.png"
                  alt="Raw and Noisy Signals"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[300px] object-contain hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                  Fig. 5: Raw MIT-BIH Signal & Composite Physiological Artifact Injection
                </div>
                <p className="text-xs text-slate-500">
                  Original clean Lead-MLII waveform alongside corrupted signal exhibiting severe 50 Hz powerline hum and 0.3 Hz baseline drift.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
