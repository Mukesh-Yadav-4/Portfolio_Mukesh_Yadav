"use client";

import { useRef, useEffect } from "react";
import mitbihData from "@/data/mitbih_filter_samples.json";

interface MiniFilterWidgetProps {
  onClick?: () => void;
}

export default function MiniFilterWidget({ onClick }: MiniFilterWidgetProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(true);

  // Main Dual-Trace Canvas Animation Loop with true zero-CPU viewport pausing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 280);
    let height = (canvas.height = 120);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 120;
    };
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const prevVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !prevVisible) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Authentic MIT-BIH Record 100 Lead-MLII arrays (MATLAB ECG_Filter_Analysis.m workspace)
    const rawNoisy: number[] = mitbihData.noisy;
    const iirClean: number[] = mitbihData.iir;
    const len = mitbihData.length; // 3600 samples
    const fs = mitbihData.fs; // 360 Hz

    let offset = 0;
    let lastTime = performance.now();
    // 4.0-second clinical monitoring window (1440 samples at 360 Hz)
    const visiblePoints = 1440;

    const render = (currentTime?: number) => {
      if (!isVisible) {
        lastTime = currentTime || performance.now();
        return; // Zero CPU/GPU burn when scrolled away
      }

      const now = currentTime || performance.now();
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0), 0.1);
      lastTime = now;

      offset = (offset + dt * fs) % len;

      ctx.clearRect(0, 0, width, height);

      // CRT Dark Background
      ctx.fillStyle = "#070A12";
      ctx.fillRect(0, 0, width, height);

      // Micro Grid Lines (Clinical Monitor style)
      ctx.strokeStyle = "rgba(30, 41, 59, 0.4)";
      ctx.lineWidth = 0.5;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Isoelectric Centerline
      const centerY = height * 0.56;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.15)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      const amp = height * 0.36;

      // -------------------------------------------------------------
      // TRACE 1: REDDISH RAW SIGNAL (+50 Hz hum & 0.3 Hz baseline drift)
      // -------------------------------------------------------------
      ctx.beginPath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "#F43F5E"; // Rose / Reddish
      ctx.shadowColor = "rgba(244, 63, 94, 0.45)";
      ctx.shadowBlur = 4;
      ctx.lineJoin = "round";

      for (let x = 0; x < width; x++) {
        const samplePos = (offset + (x / width) * visiblePoints) % len;
        const i0 = Math.floor(samplePos);
        const i1 = (i0 + 1) % len;
        const frac = samplePos - i0;
        const rawVal = rawNoisy[i0] * (1 - frac) + rawNoisy[i1] * frac;

        const y = centerY - rawVal * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // -------------------------------------------------------------
      // TRACE 2: PURPLISH FILTERED SIGNAL (Authentic 4th-Order Butterworth IIR)
      // -------------------------------------------------------------
      ctx.beginPath();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = "#C084FC"; // Vibrant Purple / Violet
      ctx.shadowColor = "rgba(192, 132, 252, 0.85)";
      ctx.shadowBlur = 6;
      ctx.lineJoin = "round";

      for (let x = 0; x < width; x++) {
        const samplePos = (offset + (x / width) * visiblePoints) % len;
        const i0 = Math.floor(samplePos);
        const i1 = (i0 + 1) % len;
        const frac = samplePos - i0;
        const iirVal = iirClean[i0] * (1 - frac) + iirClean[i1] * frac;

        const y = centerY - iirVal * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Leading scan indicator dot on authentic purple IIR trace
      ctx.shadowBlur = 0;
      const lastX = width - 8;
      const scanPos = (offset + (lastX / width) * visiblePoints) % len;
      const s0 = Math.floor(scanPos);
      const s1 = (s0 + 1) % len;
      const sFrac = scanPos - s0;
      const sVal = iirClean[s0] * (1 - sFrac) + iirClean[s1] * sFrac;
      const scanY = centerY - sVal * amp;

      ctx.beginPath();
      ctx.arc(lastX, scanY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#C084FC";
      ctx.shadowColor = "rgba(192, 132, 252, 0.9)";
      ctx.shadowBlur = 8;
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className="relative rounded-xl overflow-hidden border border-purple-500/30 bg-[#070A12] cursor-pointer group shadow-inner hover:border-purple-500/60 transition-all"
      title="Click to launch interactive FIR vs. IIR ECG Filter Workbench"
    >
      <canvas ref={canvasRef} className="w-full block" />

      {/* Top Left: Pulsing Live Badge */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur border border-white/10 text-[10px] font-mono font-bold text-purple-400">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
        <span>LIVE DSP • MIT-BIH</span>
      </div>

      {/* Top Right: SNR Gain Badge */}
      <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur border border-white/10 text-[9px] font-mono text-slate-300">
        <span className="text-slate-400">IIR SNR:</span>
        <span className="text-purple-400 font-bold">+6.17 dB</span>
      </div>

      {/* Trace Legend Pill */}
      <div className="absolute bottom-2 right-2 flex items-center gap-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur border border-white/10 text-[8px] font-mono pointer-events-none">
        <span className="flex items-center gap-1 text-rose-400">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          Raw (+50Hz)
        </span>
        <span className="text-slate-600">|</span>
        <span className="flex items-center gap-1 text-purple-300 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          IIR Clean
        </span>
      </div>

      {/* Bottom Hint on Hover */}
      <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-xs py-1 px-2 text-[10px] font-mono text-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
        <span>Click to expand Filter Workbench ↗</span>
      </div>
    </div>
  );
}
