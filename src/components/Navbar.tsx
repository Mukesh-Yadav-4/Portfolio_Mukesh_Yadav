"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, ExternalLink, Menu, X, Activity, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Default to dark mode unless user explicitly chose light theme
    if (localStorage.theme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  return (
    <>
      {/* Top Status Telemetry Ribbon */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 dark:bg-[#060910] text-slate-300 text-[11px] font-mono border-b border-slate-800 dark:border-[#1F293D] py-1 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">TELEMETRY ACTIVE</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">LEAD-II ECG (72 BPM)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[10px] sm:text-[11px]">
            <a
              href="https://doi.org/10.5281/zenodo.22806710"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              Zenodo DOI: 10.5281/zenodo.22806710 ↗
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`fixed top-[25px] left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#1F293D] shadow-sm py-2.5"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-volt-400/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-volt-400">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight group-hover:text-emerald-600 dark:group-hover:text-volt-400 transition-colors">
                Mukesh Yadav
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono text-emerald-700 dark:text-volt-400 bg-emerald-100/70 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-300/60 dark:border-emerald-800/40">
                ECE • JSSATEN
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300">
            <a href="#research" className="hover:text-emerald-600 dark:hover:text-volt-400 transition-colors font-semibold">
              Research
            </a>
            <a href="#systems" className="hover:text-emerald-600 dark:hover:text-volt-400 transition-colors font-semibold">
              Systems
            </a>
            <a href="#games" className="hover:text-emerald-600 dark:hover:text-volt-400 transition-colors font-semibold">
              Playable Games
            </a>
            <a href="#platforms" className="hover:text-emerald-600 dark:hover:text-volt-400 transition-colors font-semibold">
              Platforms
            </a>
            <a href="#contact" className="hover:text-emerald-600 dark:hover:text-volt-400 transition-colors font-semibold">
              Contact
            </a>
          </div>

          {/* Action Buttons & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-volt-400 shadow-sm transition-all"
              title={isDark ? "Switch to Bright Mode" : "Switch to Titanium Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <a
              href="https://github.com/Mukesh-Yadav-4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 transition-all shadow-sm"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white dark:bg-[#111726] border border-slate-200 dark:border-[#1F293D] text-slate-700 dark:text-slate-300 shadow-sm"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-400"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0E131F] border-b border-slate-200 dark:border-[#1F293D] px-6 py-4 space-y-3 font-mono text-xs text-slate-700 dark:text-slate-300 shadow-lg">
            <a
              href="#research"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-emerald-600 dark:hover:text-volt-400 py-1"
            >
              01 // Research Benchmarks
            </a>
            <a
              href="#systems"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-emerald-600 dark:hover:text-volt-400 py-1"
            >
              02 // Hardware & Systems
            </a>
            <a
              href="#games"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-emerald-600 dark:hover:text-volt-400 py-1"
            >
              03 // Playable Games
            </a>
            <a
              href="#platforms"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-emerald-600 dark:hover:text-volt-400 py-1"
            >
              04 // Full-Stack Platforms
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-emerald-600 dark:hover:text-volt-400 py-1"
            >
              05 // Contact
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://github.com/Mukesh-Yadav-4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900"
              >
                <Github className="w-4 h-4" />
                <span>Visit GitHub Profile</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
