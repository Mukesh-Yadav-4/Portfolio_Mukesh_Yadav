"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, FileText, ExternalLink, Menu, X, Heart } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070A13]/90 backdrop-blur-md border-b border-border/80 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-surface-card border border-border flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/60 transition-colors">
            <Heart className="w-4 h-4 text-ruby-500 animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-slate-100 text-base sm:text-lg tracking-tight group-hover:text-cyan-400 transition-colors">
              Mukesh Yadav
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono text-cyan-400/80 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
              ECE • JSSATEN
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#research" className="hover:text-cyan-400 transition-colors">
            Research & Publication
          </a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">
            Skills
          </a>
          <a href="#education" className="hover:text-cyan-400 transition-colors">
            Education
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">
            Contact
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://doi.org/10.5281/zenodo.22806710"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-surface-card hover:bg-surface-hover text-slate-200 border border-border hover:border-cyan-500/50 transition-all shadow-sm"
          >
            <span>DOI: 10.5281/zenodo</span>
            <ExternalLink className="w-3 h-3 text-cyan-400" />
          </a>
          <a
            href="https://github.com/Mukesh-Yadav-4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-white text-slate-900 transition-all font-semibold shadow-sm"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B101D] border-b border-border px-6 py-4 space-y-3 font-medium text-slate-300">
          <a
            href="#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-cyan-400 py-1"
          >
            Research & Publication
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-cyan-400 py-1"
          >
            Projects
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-cyan-400 py-1"
          >
            Skills
          </a>
          <a
            href="#education"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-cyan-400 py-1"
          >
            Education
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-cyan-400 py-1"
          >
            Contact
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://doi.org/10.5281/zenodo.22806710"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono rounded bg-surface-card border border-border text-cyan-400"
            >
              DOI: 10.5281/zenodo.22806710
            </a>
            <a
              href="https://github.com/Mukesh-Yadav-4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded bg-slate-100 text-slate-900"
            >
              <Github className="w-4 h-4" />
              Visit GitHub Profile
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
