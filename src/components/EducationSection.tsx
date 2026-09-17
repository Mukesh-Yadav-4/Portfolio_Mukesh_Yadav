"use client";

import React from "react";
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from "lucide-react";

export default function EducationSection() {
  return (
    <section id="education" className="py-20 border-b border-slate-200 dark:border-border/60 bg-slate-50/50 dark:bg-[#070A13]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sky-600 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Background & Milestones</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education & Research Achievements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Degree Card */}
          <div className="md:col-span-2 glass-panel p-6 sm:p-7 border-slate-200 dark:border-border relative overflow-hidden bg-white dark:bg-surface-card shadow-sm dark:shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
                  Undergraduate Degree
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Bachelor of Technology (B.Tech) in Electronics & Communication Engineering
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-surface px-2.5 py-1 rounded border border-slate-200 dark:border-border">
                <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                <span>Present</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium mb-4">
              <MapPin className="w-4 h-4 text-rose-600 dark:text-ruby-400 shrink-0" />
              <span>JSS Academy of Technical Education (JSSATEN), Noida, India</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Core coursework in Digital Signal Processing (DSP), Microcontrollers & Embedded Systems, Signals & Systems,
              Analog/Digital Communications, Pattern Recognition, and Linear Algebra.
            </p>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200 dark:border-border/70 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-50 dark:bg-surface border border-slate-200 dark:border-border">
                Specialization: <b className="text-slate-900 dark:text-white">Biosignals & Wearable ML</b>
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-50 dark:bg-surface border border-slate-200 dark:border-border">
                Affiliation: <b className="text-slate-900 dark:text-white">ECE Department</b>
              </span>
            </div>
          </div>

          {/* Key Honor & Hackathon Card */}
          <div className="space-y-4">
            <div className="glass-panel p-5 border-slate-200 dark:border-border bg-white dark:bg-surface-card shadow-sm dark:shadow-xl">
              <div className="flex items-center gap-2 text-sky-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase mb-2">
                <Award className="w-4 h-4" />
                <span>Research Publication</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Zenodo Preprint Benchmark
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Peer-citable international preprint with registered permanent DOI (<span className="text-sky-700 dark:text-cyan-300 font-semibold">10.5281/zenodo.22806710</span>).
              </p>
            </div>

            <div className="glass-panel p-5 border-slate-200 dark:border-border bg-white dark:bg-surface-card shadow-sm dark:shadow-xl">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Smart India Hackathon (SIH)</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                SIH 2026 Technical Presentation
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                National level engineering hackathon presenting scalable technological innovations for real-world impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
