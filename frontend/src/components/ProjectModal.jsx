import React from 'react';
import { X, ExternalLink, Server, Database, Shield, CheckCircle2, AlertTriangle, Layers, Zap } from 'lucide-react';

export function ProjectModal({ project, onClose, onAskAi }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/60">
                {project.category}
              </span>
              <span className="text-xs font-mono text-emerald-400">● {project.badge}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-1">{project.title}</h3>
            <p className="text-xs text-blue-400 font-mono mt-0.5">{project.client}</p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Overview */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider font-mono">Overview</h4>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture Matrix */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider font-mono mb-3">
              System Architecture & Stack
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-blue-400 flex items-center gap-1.5 font-bold mb-1">
                  <Server className="w-3.5 h-3.5" /> Backend
                </span>
                <p className="text-slate-300">{project.architecture.backend}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-emerald-400 flex items-center gap-1.5 font-bold mb-1">
                  <Layers className="w-3.5 h-3.5" /> Frontend
                </span>
                <p className="text-slate-300">{project.architecture.frontend}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-cyan-400 flex items-center gap-1.5 font-bold mb-1">
                  <Database className="w-3.5 h-3.5" /> Database
                </span>
                <p className="text-slate-300">{project.architecture.database}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-indigo-400 flex items-center gap-1.5 font-bold mb-1">
                  <Shield className="w-3.5 h-3.5" /> Security & Compliance
                </span>
                <p className="text-slate-300">{project.architecture.security}</p>
              </div>
            </div>
          </div>

          {/* Key Modules & Capabilities */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider font-mono mb-3">
              Key Features & Modules
            </h4>
            <div className="space-y-2">
              {project.key_features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Challenges & Solutions */}
          {project.challenges && (
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Engineering Challenges & Solutions
              </h4>
              <div className="space-y-3">
                {project.challenges.map((chal, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-amber-300 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>Challenge: {chal}</span>
                    </div>
                    {project.solutions && project.solutions[i] && (
                      <div className="flex items-start gap-2 text-slate-300 pl-5">
                        <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Solution: {project.solutions[i]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onAskAi(`Tell me more about the technical details and architecture of ${project.title}`);
            }}
            className="w-full sm:w-auto text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-950/40 border border-blue-800/40"
          >
            <span>Ask AI Agent about this project</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white px-4 py-2"
            >
              Close
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-colors"
            >
              <span>Visit Live Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

