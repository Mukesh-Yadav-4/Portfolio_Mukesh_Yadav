"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Github, Award, Activity, Gamepad2, ExternalLink, CheckCircle2 } from "lucide-react";
import wesadRawData from "@/data/wesad_ecg_samples.json";

export default function EcgHeroBanner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bpm, setBpm] = useState(76);
  const [rrInterval, setRrInterval] = useState(786);
  const [sweepSpeed, setSweepSpeed] = useState<"25" | "50">("25");
  const sweepSpeedRef = useRef<"25" | "50">("25");

  useEffect(() => {
    sweepSpeedRef.current = sweepSpeed;
  }, [sweepSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 140);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 140;
    };
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const prevVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !prevVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Authentic recorded WESAD Subject S2 baseline signal
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s2Data = (wesadRawData as any).S2.baseline;
    const sig: number[] = s2Data.signal;
    const peaks: number[] = s2Data.peaks;
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
      if (!isVisible) {
        lastTime = currentTime || performance.now();
        return;
      }

      // Delta-time (dt) normalization: strictly 350 samples/sec regardless of monitor refresh rate (60/120/144 Hz)
      const now = currentTime || performance.now();
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0), 0.1);
      lastTime = now;

      offset = (offset + dt * fs) % len;
      ctx.clearRect(0, 0, width, height);

      // Clinical 25 mm/s standard: 6.0-second clinical diagnostic window (2100 samples, ~7-8 beats visible)
      // High-detail 50 mm/s morphology: 3.0-second electrophysiology window (1050 samples)
      const visiblePoints = sweepSpeedRef.current === "25" ? 2100 : 1050;

      const isDarkMode = document.documentElement.classList.contains("dark");

      // Grid colors
      const gridColor = isDarkMode ? "rgba(31, 41, 61, 0.45)" : "rgba(226, 232, 240, 0.85)";
      const lineColor = isDarkMode ? "#00E676" : "#059669";
      const shadowColor = isDarkMode ? "rgba(0, 230, 118, 0.6)" : "rgba(5, 150, 105, 0.3)";

      // Draw coordinate grid
      const gridSize = 25;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;

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
      ctx.strokeStyle = isDarkMode ? "rgba(100, 116, 139, 0.25)" : "rgba(203, 213, 225, 0.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Render Authentic ECG Waveform
      const amp = height * 0.44;

      ctx.beginPath();
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = lineColor;
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = isDarkMode ? 8 : 4;

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

      // Detected R-Peaks
      ctx.shadowBlur = 0;
      peaks.forEach((pIdx) => {
        const dist = (pIdx - offset + len) % len;
        if (dist >= 0 && dist < visiblePoints) {
          const px = (dist / visiblePoints) * width;
          const py = centerY - sig[pIdx] * amp;

          ctx.fillStyle = isDarkMode ? "#4ADE80" : "#059669";
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = "bold 9px monospace";
          ctx.fillText("▼ R", px - 7, py - 7);
        }
      });

      // Leading scan indicator dot
      const lastX = width - 8;
      const scanPos = (offset + (lastX / width) * visiblePoints) % len;
      const s0 = Math.floor(scanPos);
      const s1 = (s0 + 1) % len;
      const sVal = sig[s0] * (1 - (scanPos - s0)) + sig[s1] * (scanPos - s0);
      const scanY = centerY - sVal * amp;

      // Dynamically calculate instantaneous HR from the most recent detected R-peak crossed by the scanhead
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
        setBpm(currentMetric.hr);
        setRrInterval(currentMetric.rrMs);
      }

      ctx.beginPath();
      ctx.arc(lastX, scanY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#EF4444";
      ctx.shadowColor = "rgba(239, 68, 68, 0.9)";
      ctx.shadowBlur = 8;
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden border-b border-slate-200 dark:border-[#1F293D] bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0B0F17] dark:via-[#0E131F] dark:to-[#0B0F17]">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 dark:bg-volt-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Grid: Left Content + Right Master Headshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-xs font-mono text-emerald-600 dark:text-volt-400 mb-6 shadow-sm">
              <Award className="w-3.5 h-3.5" />
              <span>Zenodo Preprint (DOI: 10.5281/zenodo.22806710)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-3">
              Mukesh Yadav
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-volt-400 tracking-tight mb-4">
              Biosignal Processing & Neuromorphic Hardware
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Electronics & Communication Engineering undergraduate at JSSATEN, Noida. Developing physiological signal-processing pipelines, relative baseline methods for stress detection, and analog memristor circuit emulators.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#research"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-sm transition-all shadow-md"
              >
                <span>Explore 3 Research Benchmarks</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#games"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#111726] hover:bg-slate-50 dark:hover:bg-[#161E30] text-slate-800 dark:text-white border border-slate-200 dark:border-[#1F293D] text-sm font-semibold transition-all shadow-sm"
              >
                <Gamepad2 className="w-4 h-4 text-emerald-500" />
                <span>Play Games (Arcade)</span>
              </a>
              <a
                href="https://doi.org/10.5281/zenodo.22806710"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-[#111726] text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white text-sm font-medium transition-all"
              >
                <span>DOI Citation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Master Portrait */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative group">
              {/* Subtle ambient backlight glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500/20 via-volt-400/15 to-blue-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              
              <div className="relative w-60 sm:w-64 lg:w-72 max-w-[280px] rounded-2xl overflow-hidden border-2 border-slate-200/80 dark:border-[#1F293D] bg-slate-900 shadow-2xl">
                <img
                  src="/images/mukesh_headshot_master.jpg"
                  alt="Mukesh Yadav - Biosignal Processing Researcher"
                  width={280}
                  height={370}
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto object-cover aspect-[3/4] transform group-hover:scale-[1.02] transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Canvas Cardiac Telemetry Visualizer */}
        <div className="titanium-panel p-4 sm:p-5 relative bg-white dark:bg-[#111726]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2 px-1">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-800 dark:text-slate-300">
                Lead-II ECG Telemetry
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-1" />
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="hidden sm:inline">Source: <b className="text-emerald-600 dark:text-volt-400">Recorded WESAD Lead-II</b></span>

              {/* Clinical Speed Selector */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-[#0B0F17] border border-slate-200 dark:border-[#1F293D] text-[10px]">
                <button
                  type="button"
                  onClick={() => setSweepSpeed("25")}
                  className={`px-2 py-0.5 rounded font-semibold transition-all ${
                    sweepSpeed === "25"
                      ? "bg-emerald-500 dark:bg-volt-400 text-slate-950 font-bold shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
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
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  title="High-Resolution Morphology Speed (50 mm/s, 3.0s window)"
                >
                  50 mm/s (Detail)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-[#0B0F17] border border-slate-200 dark:border-[#1F293D] text-[11px]">
                  <span className="text-slate-500">RR:</span>
                  <span className="text-emerald-600 dark:text-volt-400 font-bold">{rrInterval}</span>
                  <span className="text-slate-400 text-[10px]">ms</span>
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-100 dark:bg-[#0B0F17] border border-slate-200 dark:border-[#1F293D]">
                  <span className="text-slate-500">HR:</span>
                  <span className="text-emerald-600 dark:text-volt-400 font-bold text-sm">{bpm}</span>
                  <span className="text-slate-400 text-[10px]">BPM</span>
                </span>
              </div>
            </div>
          </div>

          <div className="w-full bg-slate-50 dark:bg-[#070A10] rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] relative">
            <canvas ref={canvasRef} className="w-full block" />
            <div className="absolute bottom-2 left-3 text-[11px] font-mono text-slate-500 pointer-events-none flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                Recorded WESAD Lead-II Telemetry (Subject S2, 700 Hz RespiBAN, 350 Hz playback • {sweepSpeed === "25" ? "25 mm/s Standard Clinical Window (6.0s)" : "50 mm/s Morphology Zoom Window (3.0s)"})
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
