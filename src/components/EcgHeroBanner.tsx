"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Github, Award, Activity, Gamepad2, ExternalLink, CheckCircle2 } from "lucide-react";
import wesadRawData from "@/data/wesad_ecg_samples.json";

export default function EcgHeroBanner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bpm, setBpm] = useState(72);

  useEffect(() => {
    // Subtle realistic natural sinus rhythm jitter (70 - 74 BPM)
    const interval = setInterval(() => {
      setBpm(Math.floor(71 + Math.sin(Date.now() / 3000) * 3));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 140);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 140;
    };
    window.addEventListener("resize", handleResize);

    // Authentic recorded WESAD Subject S2 baseline signal
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s2Data = (wesadRawData as any).S2.baseline;
    const sig: number[] = s2Data.signal;
    const peaks: number[] = s2Data.peaks;
    const len = sig.length;

    let offset = 0;
    const speed = 5.83; // 350 Hz real-time playback (350 samples/sec at 60 FPS)
    const visiblePoints = 1050; // 3.0-second clinical monitoring window

    const render = () => {
      offset = (offset + speed) % len;
      ctx.clearRect(0, 0, width, height);

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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden border-b border-slate-200 dark:border-[#1F293D] bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0B0F17] dark:via-[#0E131F] dark:to-[#0B0F17]">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 dark:bg-volt-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-xs font-mono text-emerald-600 dark:text-volt-400 mb-6 shadow-sm">
          <Award className="w-3.5 h-3.5" />
          <span>Zenodo Preprint (DOI: 10.5281/zenodo.22806710)</span>
        </div>

        {/* Hero Headline */}
        <div className="max-w-3xl">
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
          <div className="flex flex-wrap items-center gap-3.5 mb-10">
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
            <div className="flex items-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="hidden sm:inline">Source: <b className="text-emerald-600 dark:text-volt-400">Recorded WESAD Lead-II Telemetry</b></span>
              <span>Playback: <b className="text-emerald-600 dark:text-volt-400">350 Hz waveform playback</b></span>
              <span>Rhythm: <b className="text-emerald-600 dark:text-volt-400">Normal Sinus</b></span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-100 dark:bg-[#0B0F17] border border-slate-200 dark:border-[#1F293D]">
                <span className="text-slate-500">HR:</span>
                <span className="text-emerald-600 dark:text-volt-400 font-bold text-sm">{bpm}</span>
                <span className="text-slate-400 text-[10px]">BPM</span>
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-50 dark:bg-[#070A10] rounded-lg overflow-hidden border border-slate-200 dark:border-[#1F293D] relative">
            <canvas ref={canvasRef} className="w-full block" />
            <div className="absolute bottom-2 left-3 text-[11px] font-mono text-slate-500 pointer-events-none flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Recorded WESAD Lead-II Telemetry (Subject S2, 700 Hz RespiBAN Chest Acquisition, 350 Hz waveform playback)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
