"use client";

import React, { useEffect, useRef, useState } from "react";
import { SomHnnSimulator } from "@/lib/somHnnEngine";

interface MiniButterflyWidgetProps {
  onClick?: () => void;
}

export default function MiniButterflyWidget({ onClick }: MiniButterflyWidgetProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const simRef = useRef<SomHnnSimulator | null>(null);
  const isVisibleRef = useRef(true);
  const [activeWing, setActiveWing] = useState<number>(2);

  // Initialize simulator
  useEffect(() => {
    simRef.current = new SomHnnSimulator({ k: 0.4 }, 2200);
  }, []);

  // Canvas Animation Loop with true zero-CPU viewport pausing
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

    // Coordinate mapping for phi2 [-4.6, 2.5] and phi1 [-1.0, 4.2]
    const mapCoords = (p2: number, p1: number): [number, number] => {
      const minX = -4.6;
      const maxX = 2.4;
      const minY = -1.0;
      const maxY = 4.2;

      const px = ((p2 - minX) / (maxX - minX)) * width;
      const py = height - ((p1 - minY) / (maxY - minY)) * height;
      return [px, py];
    };

    let frame = 0;

    const render = () => {
      if (!isVisible) {
        return; // Complete halt: zero RK4 calculations or GPU frames when off-screen
      }

      const sim = simRef.current;
      if (sim) {
        // High-speed step (subSteps = 16 for swift, fluid orbital motion)
        const telem = sim.step(0.005, 16);
        if (frame % 6 === 0) {
          setActiveWing(telem.activeWing);
        }
      }
      frame++;

      // Canvas Background (CRT Dark)
      ctx.fillStyle = "#060911";
      ctx.fillRect(0, 0, width, height);

      // Micro Grid Lines
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

      // Origin Axes (0, 0)
      const [ox, oy] = mapCoords(0, 0);
      ctx.strokeStyle = "rgba(100, 116, 139, 0.3)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(ox, 0);
      ctx.lineTo(ox, height);
      ctx.moveTo(0, oy);
      ctx.lineTo(width, oy);
      ctx.stroke();

      // Trajectory Phosphor Trail
      if (sim) {
        const traj = sim.getTrajectory();
        const len = traj.length;

        if (len > 1) {
          ctx.lineWidth = 1.1;
          ctx.lineCap = "round";

          // Draw in fading segments
          const chunkSize = 100;
          for (let i = 0; i < len - 1; i += chunkSize) {
            const endIdx = Math.min(i + chunkSize + 1, len);
            const progress = i / len;
            const alpha = 0.08 + progress * 0.85;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(244, 63, 94, ${alpha})`;
            ctx.shadowColor = "rgba(244, 63, 94, 0.4)";
            ctx.shadowBlur = progress > 0.85 ? 3 : 0;

            for (let j = i; j < endIdx; j++) {
              const pt = traj[j];
              const [px, py] = mapCoords(pt.phi2, pt.phi1);
              if (j === i) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.stroke();
          }

          // Glowing Head Particle
          ctx.shadowBlur = 0;
          const head = traj[len - 1];
          const [hx, hy] = mapCoords(head.phi2, head.phi1);

          const grad = ctx.createRadialGradient(hx, hy, 1, hx, hy, 8);
          grad.addColorStop(0, "#FFFFFF");
          grad.addColorStop(0.4, "#F43F5E");
          grad.addColorStop(1, "rgba(244, 63, 94, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(hx, hy, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(hx, hy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

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
      className="relative rounded-xl overflow-hidden border border-rose-500/30 bg-[#060911] cursor-pointer group shadow-inner hover:border-rose-500/60 transition-all"
      title="Click to launch full interactive 4-Butterfly laboratory workbench"
    >
      <canvas ref={canvasRef} className="w-full block" />

      {/* Top Left: Pulsing Live Badge */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur border border-white/10 text-[10px] font-mono font-bold text-rose-400">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
        <span>LIVE RK4</span>
      </div>

      {/* Top Right: Active Wing Indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur border border-white/10 text-[9px] font-mono text-slate-400">
        <span>Active:</span>
        <span className="text-rose-400 font-bold">Wing {activeWing}</span>
      </div>

      {/* Bottom Hint on Hover */}
      <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-xs py-1 px-2 text-[10px] font-mono text-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
        <span>Click to expand Full Workbench ↗</span>
      </div>
    </div>
  );
}
