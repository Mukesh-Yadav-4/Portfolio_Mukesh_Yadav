"use client";

import React, { useState } from "react";
import { Play, Gamepad2, ExternalLink, Zap } from "lucide-react";
import GamePlayerModal from "./GamePlayerModal";

interface GameInfo {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  url: string;
  instructions: string;
  tags: string[];
  gradient: string;
  description: string;
  image?: string;
}

const GAMES: GameInfo[] = [
  {
    id: "organic-farm-mart",
    title: "Organic Farm Mart",
    subtitle: "Real-time Supermarket Simulation & Economy Game",
    badge: "PLAYABLE LIVE",
    url: "https://organic-farm-mart.vercel.app/",
    instructions: "Touch / Click / Drag to harvest, stock shelves, and serve customers",
    tags: ["Simulation", "Economy", "HTML5 Canvas", "Interactive"],
    gradient: "from-emerald-600/20 via-teal-900/10 to-transparent",
    image: "/images/games/organic_farm_mart.png",
    description: "Fast-paced farm-to-store supermarket management with real-time customer pathfinding, shelf stocking, and cash register dynamics.",
  },
  {
    id: "neon-escape",
    title: "Neon Escape",
    subtitle: "Fast-Paced Cyberpunk Canvas Survival Game",
    badge: "PLAYABLE LIVE",
    url: "https://mukesh-yadav-4.github.io/Making_Game/",
    instructions: "Arrow Keys [← →] or [A / D] to Move • [P] Pause • [R] Restart",
    tags: ["Survival", "Boss Battles", "60 FPS Canvas", "Web Audio API"],
    gradient: "from-cyan-500/20 via-blue-900/10 to-transparent",
    image: "/images/games/neon_escape.jpg",
    description: "Dodging survival game featuring progressive hazard acceleration, boss encounters, energy orb collection, and dynamic procedural audio.",
  },
];

export default function PlayableArcade() {
  const [selectedGame, setSelectedGame] = useState<GameInfo | null>(null);

  return (
    <section id="games" className="py-20 border-b border-slate-200 dark:border-[#1F293D] relative bg-slate-50/50 dark:bg-[#090D15]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-emerald-600 dark:text-volt-400 uppercase mb-2">
              <Gamepad2 className="w-4 h-4" />
              <span>03 // PLAYABLE ARCADE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Interactive In-Browser Games
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Built from scratch with pure HTML5 Canvas, WebGL, responsive physics, and state management. Ready to play instantly.
          </p>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GAMES.map((game) => (
            <div
              key={game.id}
              className="titanium-panel p-6 sm:p-7 relative overflow-hidden group hover:border-emerald-500/50 dark:hover:border-volt-400/50 transition-all flex flex-col justify-between"
            >
              {/* Subtle top gradient glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${game.gradient} pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity`}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Badge & Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-volt-400 border border-emerald-500/30 text-[11px] font-mono font-bold">
                    {game.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>60 FPS Engine</span>
                  </div>
                </div>

                {/* Visual Cover Banner */}
                {game.image ? (
                  <div
                    className="rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-[#1F293D] bg-slate-900 aspect-video relative group/img cursor-pointer"
                    onClick={() => setSelectedGame(game)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={game.image}
                      alt={game.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                      <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Click to Play In-Browser</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="rounded-xl overflow-hidden mb-4 border border-cyan-500/30 bg-[#070A14] aspect-video relative group/img cursor-pointer flex flex-col items-center justify-center p-4 text-center"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_70%)]" />
                    <div className="relative z-10 space-y-2">
                      <div className="inline-flex p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover/img:scale-110 transition-transform">
                        <Zap className="w-7 h-7 animate-pulse" />
                      </div>
                      <div className="text-sm font-mono font-extrabold text-cyan-400 tracking-wider">
                        ⚡ NEON ESCAPE // SURVIVAL
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Boss Battles • Progressive Hazard Acceleration • 60 FPS Canvas
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-black/70 p-2 text-[11px] font-mono text-cyan-400 font-bold flex items-center justify-center gap-1">
                      <Play className="w-3 h-3 fill-current" />
                      <span>Click to Play In-Browser</span>
                    </div>
                  </div>
                )}

                {/* Title & One-line pitch */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-volt-400 transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1 mb-3">
                  {game.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-1">
                  {game.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {game.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#161E30] text-slate-600 dark:text-slate-400 text-[10px] font-mono border border-slate-200 dark:border-[#1F293D]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setSelectedGame(game)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-volt-400 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all group-hover:scale-[1.01]"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Play in Browser</span>
                  </button>

                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-100 dark:bg-[#161E30] hover:bg-slate-200 dark:hover:bg-[#1F293D] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1F293D] transition-colors"
                    title="Open in new window"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In-Browser Player Modal */}
      <GamePlayerModal
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        game={selectedGame}
      />
    </section>
  );
}
