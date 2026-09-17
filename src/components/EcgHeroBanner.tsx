"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Github, Award, Activity, FileText } from "lucide-react";

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

    // Realistic P-Q-R-S-T waveform template
    // Normalized time 0 to 1
    function getEcgSample(t: number): number {
      const phase = (t % 1 + 1) % 1;
      const baseline = 0;

      // P wave (at phase 0.15 - 0.25)
      if (phase >= 0.15 && phase <= 0.25) {
        return baseline + 0.18 * Math.sin(((phase - 0.15) / 0.10) * Math.PI);
      }
      // Q wave (dip at phase 0.33)
      if (phase > 0.30 && phase <= 0.35) {
        return baseline - 0.15 * Math.sin(((phase - 0.30) / 0.05) * Math.PI);
      }
      // R peak (tall sharp spike at phase 0.38)
      if (phase > 0.35 && phase <= 0.42) {
        const p = (phase - 0.35) / 0.07;
        return baseline + 1.0 * Math.sin(p * Math.PI);
      }
      // S wave (deep valley right after R at phase 0.43 - 0.48)
      if (phase > 0.42 && phase <= 0.48) {
        const p = (phase - 0.42) / 0.06;
        return baseline - 0.35 * Math.sin(p * Math.PI);
      }
      // T wave (gentle broad wave at phase 0.60 - 0.78)
      if (phase >= 0.60 && phase <= 0.78) {
        return baseline + 0.32 * Math.sin(((phase - 0.60) / 0.18) * Math.PI);
      }

      return baseline;
    }

    let offset = 0;
    const speed = 0.0035;

    const render = () => {
      offset += speed;
      ctx.clearRect(0, 0, width, height);

      // Subtle background grid
      const gridSize = 25;
      ctx.strokeStyle = "rgba(28, 38, 64, 0.45)";
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

      // Draw active ECG waveform line
      const centerY = height * 0.55;
      const amp = height * 0.38;

      ctx.beginPath();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = "#00F0FF";
      ctx.shadowColor = "rgba(0, 240, 255, 0.6)";
      ctx.shadowBlur = 8;

      const totalBeats = width / 260; // Spread pulses naturally across width
      for (let x = 0; x < width; x++) {
        const t = (x / width) * totalBeats - offset;
        const val = getEcgSample(t);
        const y = centerY - val * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Glowing scan dot at the leading edge
      const scanX = width - 15;
      const scanT = (scanX / width) * totalBeats - offset;
      const scanY = centerY - getEcgSample(scanT) * amp;

      ctx.beginPath();
      ctx.arc(scanX, scanY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#FF3366";
      ctx.shadowColor = "rgba(255, 51, 102, 0.9)";
      ctx.shadowBlur = 12;
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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-border/60">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-ruby-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Verification / Publication Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-card border border-border text-xs font-mono text-cyan-400 mb-6 shadow-sm">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>Published Author on Zenodo (CERN) • DOI: 10.5281/zenodo.22806710</span>
        </div>

        {/* Hero Headline */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Mukesh Yadav
          </h1>
          <p className="text-lg sm:text-2xl font-semibold text-cyan-400 tracking-tight mb-4">
            Biosignal Processing & Wearable AI Researcher
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Undergraduate in <span className="text-white font-medium">Electronics & Communication Engineering (ECE)</span> at{" "}
            <span className="text-white font-medium">JSS Academy of Technical Education, Noida</span>. Engineering
            physiological computing algorithms, baseline-relative autonomic transforms, and low-latency machine learning
            models for wearable cardiovascular telemetry.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-12">
            <a
              href="#research"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              <span>Explore Featured Research</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Mukesh-Yadav-4/ECG_STRESS_DETECTION"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-card hover:bg-surface-hover text-white border border-border hover:border-cyan-500/50 text-sm font-semibold transition-all"
            >
              <Github className="w-4 h-4" />
              <span>View GitHub Repo</span>
            </a>
            <a
              href="/ECG_Stress_Detection_WESAD_Benchmark_Paper.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-transparent hover:bg-surface-card text-slate-300 hover:text-white text-sm font-medium transition-all"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Download 6-Page Paper (PDF)</span>
            </a>
          </div>
        </div>

        {/* Live Canvas Cardiac Telemetry Visualizer */}
        <div className="glass-panel p-4 sm:p-5 border-border shadow-2xl relative">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2 px-1">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-ruby-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
                Lead-II ECG Telemetry Stream
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-1" />
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Bandpass: <b className="text-cyan-400">0.5 – 40 Hz</b></span>
              <span>Rhythm: <b className="text-emerald-400">Normal Sinus</b></span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface border border-border">
                <span className="text-slate-400">HR:</span>
                <span className="text-ruby-400 font-bold text-sm">{bpm}</span>
                <span className="text-slate-500 text-[10px]">BPM</span>
              </span>
            </div>
          </div>

          <div className="w-full bg-[#050811] rounded-lg overflow-hidden border border-border/70 relative">
            <canvas ref={canvasRef} className="w-full block" />
            <div className="absolute bottom-2 left-3 text-[11px] font-mono text-slate-500 pointer-events-none">
              RespiBAN 700 Hz Chest Acquisition Model • Pan-Tompkins Adaptive Prominence
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
