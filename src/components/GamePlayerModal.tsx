"use client";

import React, { useEffect } from "react";
import { X, Maximize2, ExternalLink, Play, RotateCcw } from "lucide-react";

interface GamePlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: {
    title: string;
    subtitle: string;
    url: string;
    instructions: string;
  } | null;
}

export default function GamePlayerModal({ isOpen, onClose, game }: GamePlayerModalProps) {
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

  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[88vh] rounded-2xl bg-[#090D15] border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden">
        {/* Game Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0D121D] border-b border-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="font-bold text-sm sm:text-base flex items-center gap-2">
                <span>{game.title}</span>
                <span className="text-[11px] font-mono font-normal text-emerald-400 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/30">
                  PLAYING IN BROWSER
                </span>
              </div>
              <div className="text-xs text-slate-400 hidden sm:block">{game.subtitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
            >
              <span>Full Screen / New Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Game"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Game Iframe */}
        <div className="flex-1 w-full bg-black relative">
          <iframe
            src={game.url}
            title={game.title}
            className="w-full h-full border-0"
            allow="fullscreen; autoplay; gamepad; keyboard"
          />
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-[#0D121D] border-t border-slate-800 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div>Controls: {game.instructions}</div>
          <div className="text-slate-500">Live browser deployment</div>
        </div>
      </div>
    </div>
  );
}
