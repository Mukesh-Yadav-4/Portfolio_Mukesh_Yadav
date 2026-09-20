"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Zap,
  Sparkles,
  Sliders,
  Maximize2,
  Layers,
  Activity,
} from "lucide-react";
import {
  SomHnnSimulator,
  SomHnnTelemetry,
  DEFAULT_SOM_HNN_PARAMS,
} from "@/lib/somHnnEngine";

interface ButterflyChaosTelemetryProps {
  embedded?: boolean;
}

export default function ButterflyChaosTelemetry({
  embedded = false,
}: ButterflyChaosTelemetryProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const simRef = useRef<SomHnnSimulator | null>(null);

  const [isRunning, setIsRunning] = useState(true);
  const [speed, setSpeed] = useState<1 | 2 | 4>(2);
  const [projection, setProjection] = useState<"phi" | "neuron">("phi");
  const [couplingK, setCouplingK] = useState(0.4);
  const [telemetry, setTelemetry] = useState<SomHnnTelemetry>({
    x1: 1.32,
    x2: -0.17,
    x3: 0.2,
    phi1: 0.94,
    phi2: -1.1,
    memductance: 0.05,
    couplingCurrent: -0.015,
    activeWing: 2,
    phaseVelocity: 2.14,
    lyapunovMetric: 0.018,
  });

  // Initialize simulator once
  useEffect(() => {
    simRef.current = new SomHnnSimulator({ k: couplingK }, 4000);
  }, []);

  // Update coupling coefficient if changed
  useEffect(() => {
    if (simRef.current) {
      simRef.current.setCoupling(couplingK);
    }
  }, [couplingK]);

  // Main Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = embedded ? 240 : 420);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = embedded ? 240 : 420;
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

    // Coordinate mapping ranges
    // phi: phi2 in [-4.5, 2.5], phi1 in [-1.2, 4.2]
    // neuron: x1 in [-3.8, 3.8], x2 in [-1.0, 1.0]
    const mapCoords = (
      p2: number,
      p1: number,
      x1: number,
      x2: number
    ): [number, number] => {
      if (projection === "phi") {
        const minX = -4.8;
        const maxX = 2.6;
        const minY = -1.2;
        const maxY = 4.4;

        const px = ((p2 - minX) / (maxX - minX)) * width;
        const py = height - ((p1 - minY) / (maxY - minY)) * height;
        return [px, py];
      } else {
        const minX = -3.8;
        const maxX = 3.8;
        const minY = -0.9;
        const maxY = 0.9;

        const px = ((x1 - minX) / (maxX - minX)) * width;
        const py = height - ((x2 - minY) / (maxY - minY)) * height;
        return [px, py];
      }
    };

    let frameCount = 0;

    const render = () => {
      if (!isVisible) return;
      const sim = simRef.current;
      if (sim && isRunning) {
        // Step the simulation
        const subSteps = speed === 1 ? 8 : speed === 2 ? 16 : 32;
        const telem = sim.step(0.005, subSteps);

        // Throttle React state updates to ~15 FPS for performance
        if (frameCount % 4 === 0) {
          setTelemetry(telem);
        }
      }

      frameCount++;

      // Clear Canvas
      ctx.fillStyle = "#070A12";
      ctx.fillRect(0, 0, width, height);

      // 1. Grid & Origin Axes
      ctx.strokeStyle = "rgba(30, 41, 59, 0.45)";
      ctx.lineWidth = 0.5;
      const gridSize = 30;
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

      // Origin Lines (0, 0)
      const [originX, originY] = mapCoords(0, 0, 0, 0);
      ctx.strokeStyle = "rgba(100, 116, 139, 0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, height);
      ctx.moveTo(0, originY);
      ctx.lineTo(width, originY);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Multi-Wing Region Demarcation Lines (for phi2 vs phi1 projection)
      if (projection === "phi" && !embedded) {
        const wingDivisions = [-2.2, -0.9, 0.4];
        ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
        ctx.lineWidth = 1;
        wingDivisions.forEach((divVal, idx) => {
          const [divX] = mapCoords(divVal, 0, 0, 0);
          ctx.beginPath();
          ctx.moveTo(divX, 0);
          ctx.lineTo(divX, height);
          ctx.stroke();

          // Wing label
          ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
          ctx.font = "9px monospace";
          ctx.fillText(`Lobe Boundary ${idx + 1}`, divX + 4, 18);
        });
      }

      // 3. Render Chaotic Trajectory Buffer
      if (sim) {
        const traj = sim.getTrajectory();
        const totalPoints = traj.length;

        if (totalPoints > 1) {
          ctx.lineWidth = 1.3;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Segmented gradient drawing for phosphor persistence
          const chunkSize = 120;
          for (let i = 0; i < totalPoints - 1; i += chunkSize) {
            const endIdx = Math.min(i + chunkSize + 1, totalPoints);
            const progress = i / totalPoints; // 0 = oldest, 1 = newest

            // Alpha gradient: older points fade to subtle cyan/slate, newest glow bright ruby/orange
            const alpha = 0.08 + progress * 0.85;

            ctx.beginPath();
            if (projection === "phi") {
              ctx.strokeStyle = `rgba(244, 63, 94, ${alpha})`; // Ruby / Rose for memristor dynamics
              ctx.shadowColor = "rgba(244, 63, 94, 0.5)";
            } else {
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`; // Emerald for neuron interaction
              ctx.shadowColor = "rgba(16, 185, 129, 0.5)";
            }
            ctx.shadowBlur = progress > 0.85 ? 4 : 0;

            for (let j = i; j < endIdx; j++) {
              const pt = traj[j];
              const [px, py] = mapCoords(pt.phi2, pt.phi1, pt.x1, pt.x2);
              if (j === i) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.stroke();
          }

          // 4. Head Electron Beam (Leading chaotic particle)
          ctx.shadowBlur = 0;
          const headPt = traj[totalPoints - 1];
          const [headX, headY] = mapCoords(
            headPt.phi2,
            headPt.phi1,
            headPt.x1,
            headPt.x2
          );

          // Glowing halo
          const gradient = ctx.createRadialGradient(
            headX,
            headY,
            1,
            headX,
            headY,
            14
          );
          gradient.addColorStop(0, "#FFFFFF");
          gradient.addColorStop(0.3, "#F43F5E");
          gradient.addColorStop(1, "rgba(244, 63, 94, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(headX, headY, 14, 0, Math.PI * 2);
          ctx.fill();

          // Solid core
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(headX, headY, 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Canvas HUD Overlay Coordinates
      ctx.fillStyle = "#64748B";
      ctx.font = "10px monospace";
      if (projection === "phi") {
        ctx.fillText("Horizontal: State φ₂ (Memristor Charge)", 12, height - 12);
        ctx.fillText("Vertical: State φ₁ (Internal Flux)", 12, 22);
      } else {
        ctx.fillText("Horizontal: Neuron Voltage x₁", 12, height - 12);
        ctx.fillText("Vertical: Neuron Voltage x₂", 12, 22);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [isRunning, speed, projection, embedded]);

  return (
    <div className="space-y-4">
      {/* 1. Header Telemetry HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 dark:bg-[#0B0F19] border border-slate-200 dark:border-[#1F293D] shadow-inner">
        {/* Active Butterfly Wing Quadrant */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>ATTRACTOR TELEMETRY:</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-xs">
            {[1, 2, 3, 4].map((wingNum) => {
              const isActive = telemetry.activeWing === wingNum;
              return (
                <span
                  key={wingNum}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    isActive
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/40 ring-1 ring-rose-300 scale-105"
                      : "bg-slate-800 text-slate-500 border border-slate-700/50"
                  }`}
                >
                  Wing {wingNum}
                </span>
              );
            })}
          </div>
        </div>

        {/* Dynamic Metric Badges */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="hidden sm:flex items-center gap-1 text-slate-400">
            <span>Memductance W:</span>
            <span className="text-emerald-400 font-bold">
              {telemetry.memductance.toFixed(3)} mS
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Coupling Current:</span>
            <span className="text-rose-400 font-bold">
              {telemetry.couplingCurrent.toFixed(3)} mA
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-slate-400">
            <span>Orbit Speed:</span>
            <span className="text-volt-400 font-bold">
              {telemetry.phaseVelocity.toFixed(2)} rad/s
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Phase-Space Canvas */}
      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-[#1F293D] bg-[#070A12] relative shadow-2xl">
        <canvas ref={canvasRef} className="w-full block cursor-crosshair" />

        {/* Top-Right Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur border border-white/10 text-[11px] font-mono text-slate-300">
            {projection === "phi"
              ? "Phase Plane: (φ₂, φ₁) • Fig. 9(c)"
              : "Phase Plane: (x₁, x₂) • Hopfield Neurons"}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold">
            RK4 • dt=0.005
          </span>
        </div>

        {/* Coordinates readout floating in bottom right */}
        <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur px-2.5 py-1 rounded border border-white/10 text-[11px] font-mono text-slate-400 flex items-center gap-3">
          <span>
            φ₂: <strong className="text-white">{telemetry.phi2.toFixed(3)}</strong>
          </span>
          <span>
            φ₁: <strong className="text-white">{telemetry.phi1.toFixed(3)}</strong>
          </span>
          <span>
            x₁: <strong className="text-white">{telemetry.x1.toFixed(3)}</strong>
          </span>
        </div>
      </div>

      {/* 3. Interactive Laboratory Controls Deck */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#0E131F] border border-slate-200 dark:border-[#1F293D]">
        {/* Left: Playback & Perturbation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              isRunning
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                : "bg-emerald-500 text-white"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Run Telemetry</span>
              </>
            )}
          </button>

          {/* Speed selector */}
          <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-[#161E30] p-0.5 rounded-lg border border-slate-300 dark:border-[#263552]">
            {([1, 2, 4] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                  speed === s
                    ? "bg-emerald-500 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-white"
                }`}
              >
                {s}×
              </button>
            ))}
          </div>

          {/* Perturb Orbit (Butterfly Effect button) */}
          <button
            onClick={() => simRef.current?.perturb(0.12)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold transition-all"
            title="Inject a micro-perturbation to demonstrate chaotic sensitivity (Butterfly Effect)"
          >
            <Zap className="w-3.5 h-3.5 text-rose-500" />
            <span>Perturb Orbit (Δx)</span>
          </button>

          {/* Reset Orbit */}
          <button
            onClick={() => simRef.current?.reset()}
            className="p-1.5 rounded-lg bg-slate-200 dark:bg-[#161E30] hover:bg-slate-300 dark:hover:bg-[#222E46] text-slate-600 dark:text-slate-300 transition-all"
            title="Re-seed to initial attractor point"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Projection & Coupling Slider */}
        <div className="flex items-center gap-3">
          {/* Projection plane toggle */}
          <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-[#161E30] p-0.5 rounded-lg border border-slate-300 dark:border-[#263552]">
            <button
              onClick={() => setProjection("phi")}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                projection === "phi"
                  ? "bg-rose-500 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:text-white"
              }`}
            >
              φ₂ - φ₁ (4-Butterfly)
            </button>
            <button
              onClick={() => setProjection("neuron")}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                projection === "neuron"
                  ? "bg-emerald-500 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:text-white"
              }`}
            >
              x₁ - x₂ (Neurons)
            </button>
          </div>

          {/* Coupling coefficient slider */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500">k (Coupling):</span>
            <input
              type="range"
              min={0.2}
              max={0.6}
              step={0.05}
              value={couplingK}
              onChange={(e) => setCouplingK(Number(e.target.value))}
              className="w-20 accent-rose-500 cursor-pointer"
            />
            <span className="font-bold text-rose-400 w-8">
              {couplingK.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Scientific Context Note */}
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-start gap-2">
        <Activity className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
        <div>
          <strong>NUMERICAL SIMULATION NOTE:</strong> This live visualizer integrates the exact 5D differential equations from Eq. (19) using real-time RK4 (dt = 0.005). The 4 lobes arise directly from the multi-piecewise memristor staircase function with $M=2$. Clicking <strong>&quot;Perturb Orbit (Δx)&quot;</strong> injects a $0.12$ perturbation, demonstrating the positive Lyapunov exponent where two infinitesimally close trajectories diverge exponentially across the 4 butterfly wings.
        </div>
      </div>
    </div>
  );
}
