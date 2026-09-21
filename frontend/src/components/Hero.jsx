import React from 'react';
import { Bot, ArrowRight, FileText, ShieldCheck, Database, Layers, Sparkles } from 'lucide-react';

export function Hero({ profile, onOpenChat, onOpenResume }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      
      {/* Decorative Glow Spots */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Status Pill */}
        <div className="flex justify-center md:justify-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{profile.availability || "Open to Software Developer Roles (Remote / Hybrid / On-site)"}</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-blue-400 font-mono text-sm tracking-wider uppercase font-semibold">
                {profile.name || "JOHN MATTHEW A. MARCELO"}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Full Stack Developer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
                  Laravel · Vue.js · React
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Full Stack Developer with 3+ years building responsive web applications with <span className="text-white font-semibold">Laravel, Vue.js, React, and MySQL</span> at <span className="text-blue-300 font-semibold">Pinnacle Technologies</span>, backed by 4+ years in IT support & systems administration. Skilled in RESTful APIs and modern AI-assisted engineering.
            </p>

            {/* Stack Tags */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-md bg-blue-950/60 text-blue-300 border border-blue-800/50 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-blue-400" /> Laravel & PHP
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 flex items-center gap-1.5">
                <span className="text-emerald-400">⚛</span> React & Vue.js
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 flex items-center gap-1.5">
                <Database className="w-3 h-3 text-cyan-400" /> MySQL Optimization
              </span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-950/60 text-indigo-300 border border-indigo-800/50 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-400" /> AI-Assisted Dev & LLMs
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>View Pinnacle Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenChat}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-blue-400 border border-blue-500/40 flex items-center justify-center gap-2 transition-all hover:border-blue-400 glow-blue"
              >
                <Bot className="w-4 h-4 text-blue-400 animate-pulse" />
                <span>Interview AI Agent (LLM)</span>
              </button>

              <button
                onClick={onOpenResume}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/70 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Curriculum Vitae</span>
              </button>
            </div>
          </div>

          {/* Right Hero Interactive Card / Terminal Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl p-6 overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">marcelo-profile-summary.sh</span>
              </div>

              <div className="space-y-4 font-mono">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3">
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider">Full Stack</p>
                    <p className="text-2xl font-bold text-blue-400 mt-1">3+ Years</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Laravel, Vue.js, React</p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3">
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider">IT & Systems</p>
                    <p className="text-2xl font-bold text-emerald-400 mt-1">4+ Years</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Networking & Linux/Win</p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3">
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider">Pinnacle Portals</p>
                    <p className="text-2xl font-bold text-cyan-400 mt-1">5 Systems</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">AIMS, POS & SMS</p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3">
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider">Academic Honor</p>
                    <p className="text-xl font-bold text-indigo-400 mt-1">Best Thesis</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">3D Educational System</p>
                  </div>
                </div>

                <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-3.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between text-blue-400 mb-1.5 font-semibold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5" /> LLM-Powered Chatbot Ready
                    </span>
                    <button onClick={onOpenChat} className="text-blue-300 hover:text-white underline text-[10px]">
                      Test Bot
                    </button>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed italic">
                    "Ask John Matthew's AI agent about the Philyra Cloud POS, CLDH-EI, ICCT SMS, or how he integrates modern LLM tools in development."
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
