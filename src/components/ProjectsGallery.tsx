"use client";

import React, { useState } from "react";
import { FolderGit2, ExternalLink, Github, PlusCircle } from "lucide-react";
import { PROJECTS_DATA, CATEGORIES } from "../data/projects";

export default function ProjectsGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-20 border-b border-slate-200 dark:border-border/60 bg-slate-50/50 dark:bg-[#070A13]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sky-600 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>Project Portfolio & Engineering Systems</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Engineering Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Modular project showcase spanning biosignals, memristive circuits, machine learning, and embedded microcontrollers.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-sky-600 text-white font-bold shadow-sm shadow-sky-600/25"
                  : "bg-white dark:bg-surface-card hover:bg-slate-50 dark:hover:bg-surface-hover text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-border shadow-xs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="glass-panel glass-panel-hover p-6 flex flex-col justify-between border-slate-200 dark:border-border bg-white dark:bg-surface-card shadow-sm dark:shadow-xl"
            >
              <div>
                {/* Header badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-sky-600 dark:text-cyan-400 uppercase tracking-wider">
                    {proj.category}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-surface border border-slate-200 dark:border-border text-slate-700 dark:text-slate-300">
                    {proj.statusBadge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">{proj.subtitle}</p>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                  {proj.summary}
                </p>

                {/* Metrics Chips */}
                {proj.metrics && proj.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-lg bg-slate-50 dark:bg-[#080D1A] border border-slate-200 dark:border-border/70">
                    {proj.metrics.slice(0, 3).map((m, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">{m.label}</div>
                        <div className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-100 dark:bg-surface-card border border-slate-200 dark:border-border/80 text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-border/70">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code Repository</span>
                    </a>
                  )}

                  {proj.publication?.doiUrl ? (
                    <a
                      href={proj.publication.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-sky-600 dark:text-cyan-400 hover:underline"
                    >
                      <span>Zenodo Record</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : proj.demoUrl ? (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-sky-600 dark:text-cyan-400 hover:underline"
                    >
                      <span>Reference / Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}

          {/* Scalable Future Project Placeholder Card */}
          <div className="glass-panel p-6 border-dashed border-slate-300 dark:border-border/80 flex flex-col items-center justify-center text-center bg-slate-50/70 dark:bg-[#070A13]/40 min-h-[300px]">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-surface-card border border-slate-200 dark:border-border flex items-center justify-center mb-3 text-sky-600 dark:text-cyan-400 shadow-xs">
              <PlusCircle className="w-6 h-6 text-sky-600 dark:text-cyan-400/80" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Pushing New Projects One-By-One</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mb-4">
              Architected to seamlessly showcase new engineering research, embedded prototypes, and ML pipelines.
            </p>
            <div className="text-[11px] font-mono text-sky-800 dark:text-cyan-400/80 bg-sky-100 dark:bg-cyan-950/30 px-3 py-1 rounded border border-sky-200 dark:border-cyan-800/30">
              data/projects.ts → Auto-Deployed to Vercel
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
