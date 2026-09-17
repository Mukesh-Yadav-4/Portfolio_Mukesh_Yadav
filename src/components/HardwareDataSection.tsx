"use client";

import React, { useState } from "react";
import { Cpu, BarChart3, Radio, Users, ExternalLink, Github, Zap, TrendingUp } from "lucide-react";

export default function HardwareDataSection() {
  // Arduino Ultrasonic State
  const [distanceCm, setDistanceCm] = useState(45);
  const speedOfSound = 343; // m/s
  // ToF in microseconds = (2 * distance_in_m / 343) * 1,000,000
  const tofMicroseconds = Math.round(((2 * (distanceCm / 100)) / speedOfSound) * 1000000);

  // Customer Segmentation State
  const [activeCluster, setActiveCluster] = useState<"champions" | "loyal" | "atRisk" | "lost">("champions");
  const clusterData = {
    champions: {
      title: "Cluster 01: Champions (High Value)",
      share: "14.2% of customer base",
      revenue: "58.4% of total revenue",
      recency: "Avg. 8 days",
      freq: "Avg. 24 orders/yr",
      action: "Reward with early access, VIP beta programs, and personalized concierge.",
    },
    loyal: {
      title: "Cluster 02: Loyal & Steady",
      share: "28.5% of customer base",
      revenue: "22.1% of total revenue",
      recency: "Avg. 32 days",
      freq: "Avg. 9 orders/yr",
      action: "Upsell premium tiers and incentivize referrals with structured loyalty points.",
    },
    atRisk: {
      title: "Cluster 03: At Risk (Lapsing)",
      share: "22.3% of customer base",
      revenue: "13.8% of total revenue",
      recency: "Avg. 115 days",
      freq: "Avg. 4 orders/yr",
      action: "Trigger automated reactivation win-back campaigns and personalized discounts.",
    },
    lost: {
      title: "Cluster 04: Dormant / Churned",
      share: "35.0% of customer base",
      revenue: "5.7% of total revenue",
      recency: "Avg. 280+ days",
      freq: "Avg. 1 order/yr",
      action: "Low-frequency seasonal newsletters; avoid aggressive marketing spend.",
    },
  }[activeCluster];

  return (
    <section id="systems" className="py-20 border-b border-slate-200 dark:border-[#1F293D] relative bg-slate-50/50 dark:bg-[#090D15]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-emerald-600 dark:text-volt-400 uppercase mb-2">
              <Cpu className="w-4 h-4" />
              <span>04 // HARDWARE & DATA SYSTEMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Embedded Sensors & Machine Learning Systems
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Applied microcontroller signal conditioning and unsupervised machine learning clustering.
          </p>
        </div>

        {/* 2-Column Systems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Module 1: Arduino Ultrasonic Virtual Telemetry HUD */}
          <div className="titanium-panel p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-volt-400 border border-emerald-500/30 text-[11px] font-mono font-bold">
                  EMBEDDED C++ / HARDWARE
                </span>
                <span className="text-xs font-mono text-slate-400">Timer Capture</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Ultrasonic Distance & Time-of-Flight Telemetry
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-1 mb-4">
                Arduino Microcontroller • HC-SR04 Transducer • Non-blocking Timer Interrupts
              </p>

              {/* Interactive Virtual Distance Slider */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] mb-4">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Obstacle Distance (d)</span>
                  <span className="text-emerald-600 dark:text-volt-400 text-sm">{distanceCm} cm</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={400}
                  value={distanceCm}
                  onChange={(e) => setDistanceCm(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>Min: 2 cm</span>
                  <span>Max: 400 cm</span>
                </div>

                {/* Simulated Echo Oscilloscope Trace */}
                <div className="mt-4 p-3 rounded-lg bg-[#070A10] border border-slate-700 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Acoustic Echo Pulse (ToF)</span>
                    <span className="text-emerald-400 font-bold">{tofMicroseconds} μs</span>
                  </div>
                  <div className="h-6 w-full bg-slate-900 rounded relative overflow-hidden flex items-center px-2">
                    <div
                      className="h-3 bg-emerald-400 rounded-sm transition-all duration-75 shadow-sm shadow-emerald-400/50"
                      style={{ width: `${Math.max(4, (distanceCm / 400) * 100)}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1.5 flex justify-between">
                    <span>t = (2 × d) / v_sound</span>
                    <span>v = 343 m/s @ 20°C</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-4">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                  <div className="text-slate-400 text-[10px] uppercase">Sampling Loop</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">&lt; 10 ms Latency</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D]">
                  <div className="text-slate-400 text-[10px] uppercase">Resolution</div>
                  <div className="font-bold text-emerald-500 mt-0.5">±0.3 cm Accuracy</div>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/Mukesh-Yadav-4/Arduino_ultrasonic_sensor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#161E30] dark:hover:bg-[#1F293D] text-slate-800 dark:text-slate-200 text-xs font-mono font-semibold border border-slate-200 dark:border-[#1F293D] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Arduino Firmware on GitHub</span>
            </a>
          </div>

          {/* Module 2: Customer Lifetime Value & RFM Segmentation */}
          <div className="titanium-panel p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-[11px] font-mono font-bold">
                  UNSUPERVISED ML / ANALYTICS
                </span>
                <span className="text-xs font-mono text-slate-400">540k+ Transactions</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Customer Lifetime Value & RFM Segmentation
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-1 mb-4">
                UCI Online Retail II • K-Means Clustering • Prophet Revenue Forecasting
              </p>

              {/* Interactive Cluster Selector Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {(
                  [
                    { id: "champions", label: "Champions (VIP)" },
                    { id: "loyal", label: "Loyal Customers" },
                    { id: "atRisk", label: "At-Risk Cohort" },
                    { id: "lost", label: "Dormant / Lost" },
                  ] as const
                ).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCluster(c.id)}
                    className={`py-2 px-2.5 text-xs font-mono font-semibold rounded-lg border transition-all text-left ${
                      activeCluster === c.id
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm"
                        : "bg-slate-50 dark:bg-[#111726] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F293D]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Cluster Detail Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] font-mono text-xs mb-4">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white mb-2">
                  <span>{clusterData.title}</span>
                  <span className="text-emerald-500 font-bold">{clusterData.revenue}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 mb-2">
                  <div>Customer Volume: <b className="text-slate-700 dark:text-slate-300">{clusterData.share}</b></div>
                  <div>Frequency: <b className="text-slate-700 dark:text-slate-300">{clusterData.freq}</b></div>
                  <div>Recency: <b className="text-slate-700 dark:text-slate-300">{clusterData.recency}</b></div>
                  <div>Horizon: <b className="text-slate-700 dark:text-slate-300">12-Mo Prophet</b></div>
                </div>
                <div className="p-2.5 rounded bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-[#1F293D] text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold">Strategy: </span>
                  {clusterData.action}
                </div>
              </div>
            </div>

            <a
              href="https://github.com/Mukesh-Yadav-4/customer-segmentation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#161E30] dark:hover:bg-[#1F293D] text-slate-800 dark:text-slate-200 text-xs font-mono font-semibold border border-slate-200 dark:border-[#1F293D] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Jupyter Notebook & Models on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
