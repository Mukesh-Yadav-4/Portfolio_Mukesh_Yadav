"use client";

import React, { useEffect, useRef, useState } from "react";
import wesadRawData from "@/data/wesad_ecg_samples.json";

interface MiniEcgWidgetProps {
  onClick?: () => void;
}

interface WesadCondition {
  signal: number[];
  peaks: number[];
}

interface WesadSubjectData {
  baseline: WesadCondition;
  stress: WesadCondition;
}

const wesadData = wesadRawData as Record<string, WesadSubjectData>;

export default function MiniEcgWidget({ onClick }: MiniEcgWidgetProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(true);
  const [bpm, setBpm] = useState(78);

  // Main ECG Canvas Animation Loop with true zero-CPU viewport pausing
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

    // Use Subject S2 Acute Stress ECG data (authentic 700 Hz RespiBAN Lead-II telemetry)
    const stressSample = wesadData["S2"]?.stress || wesadData["S2"]?.baseline;
    const sig = stressSample.signal;
    const peaks = stressSample.peaks;
    const len = sig.length;
    const fs = 350;

    // Precompute authentic beat-by-beat RR-intervals and instantaneous HR from detected stress peaks
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
    // 4.0-second clinical window across mini-card (1400 samples at 350 Hz)
    const visiblePoints = 1400;

    const render = (currentTime?: number) => {
      if (!isVisible) {
        lastTime = currentTime || performance.now();
        return; // Zero CPU/GPU burn when scrolled away
      }

      const now = currentTime || performance.now();
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0), 0.1);
      lastTime = now;

      offset = (offset + dt * fs) % len;

      // Dynamically calculate instantaneous HR from the most recent detected R-peak crossed by the leading edge
      const scanPos = (offset + visiblePoints) % len;
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
        setBpm(hrTable[bestPeakIdx].hr);
      }

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
      const centerY = height * 0.58;
      ctx.strokeStyle = "rgba(239, 68, 68, 0.18)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Draw Authentic ECG Lead-II Signal in RED
      const amp = height * 0.40;

      ctx.beginPath();
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = "#EF4444"; // Red ECG trace
      ctx.shadowColor = "rgba(239, 68, 68, 0.75)";
      ctx.shadowBlur = 6;
      ctx.lineJoin = "round";

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

      // Render Detected R-Peaks with Red Dots
      ctx.shadowBlur = 0;
      peaks.forEach((pIdx) => {
        const dist = (pIdx - offset + len) % len;
        if (dist >= 0 && dist < visiblePoints) {
          const px = (dist / visiblePoints) * width;
          const py = centerY - sig[pIdx] * amp;

          // Glowing R-peak indicator dot
          ctx.fillStyle = "#FCA5A5";
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#EF4444";
          ctx.font = "bold 9px monospace";
          ctx.fillText("▼", px - 3, py - 6);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
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
      className="relative rounded-xl overflow-hidden border border-red-500/30 bg-[#070A12] cursor-pointer group shadow-inner hover:border-red-500/60 transition-all"
      title="Click to launch full interactive ECG laboratory workbench"
    >
      <canvas ref={canvasRef} className="w-full block" />

      {/* Top Left: Pulsing Red Live Badge */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur border border-white/10 text-[10px] font-mono font-bold text-red-400">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        <span>LIVE ECG • LEAD-II</span>
      </div>

      {/* Top Right: Acute Stress Rate Badge */}
      <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/20 backdrop-blur border border-red-500/40 text-[10px] font-mono font-bold text-red-400">
        <span>TSST:</span>
        <span className="text-white">{bpm} BPM</span>
      </div>

      {/* Bottom Hint on Hover */}
      <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-xs py-1 px-2 text-[10px] font-mono text-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
        <span>Click to expand Full ECG Workbench ↗</span>
      </div>
    </div>
  );
}
