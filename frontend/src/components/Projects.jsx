import React, { useState } from 'react';
import { ExternalLink, Layers, ArrowUpRight, Cpu, ShieldCheck, Database, CheckCircle, Code2, Sparkles, BookOpen } from 'lucide-react';

export function Projects({ projects, onSelectProject, onInspectApi }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Projects (5)' },
    { id: 'erp', label: 'Educational ERP & AIMS (3)' },
    { id: 'pos', label: 'Cloud POS & FinTech (1)' },
    { id: 'high-scale', label: 'High-Concurrency (1)' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'erp') return p.category.includes('ERP') || p.category.includes('Education');
    if (activeFilter === 'pos') return p.category.includes('POS') || p.category.includes('FinTech');
    if (activeFilter === 'high-scale') return p.category.includes('Concurrency') || p.slug.includes('icct');
    return true;
  });

  return (
    <section id="projects" className="py-24 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Client Projects Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Deployments at <span className="text-blue-400">Pinnacle</span>
            </h2>
            <p className="mt-3 text-slate-300 text-base max-w-2xl">
              Production systems designed and built for accredited colleges, Montessori schools, multi-location retail chains, and high-volume student portals.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover rounded-2xl flex flex-col justify-between overflow-hidden border border-slate-800/80 group"
            >
              
              {/* Card Top: Header & Badges */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-300 border border-blue-800/60">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {project.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-blue-400 font-mono mt-1">{project.client}</p>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                {/* Key Metric Highlight */}
                {project.metrics && (
                  <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800/70 font-mono text-xs flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Primary Impact:</span>
                    <span className="text-emerald-400 font-bold">
                      {project.metrics.speed || project.metrics.active_users || project.metrics.efficiency || project.metrics.capacity}
                    </span>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech_stack.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/90 text-slate-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech_stack.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/50 text-slate-400">
                      +{project.tech_stack.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Bottom: Actions */}
              <div className="p-4 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectProject(project)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 py-1.5 px-2.5 rounded-lg hover:bg-blue-950/40 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onInspectApi(project)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Inspect Mock API Schema"
                  >
                    <Code2 className="w-4 h-4" />
                  </button>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/40 hover:bg-blue-600 hover:text-white transition-all shadow"
                  >
                    <span>Live Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

