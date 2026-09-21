import React from 'react';
import { Heart, Code2, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              JM
            </div>
            <span className="text-white font-bold text-sm tracking-tight">
              John Matthew A. Marcelo
            </span>
            <span className="text-slate-400 font-mono pl-2 border-l border-slate-800">
              Full Stack Developer (Laravel · Vue.js · React)
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#api-explorer" className="hover:text-white transition-colors">API Explorer</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <p>© {new Date().getFullYear()} John Matthew A. Marcelo. Bocaue, Bulacan, Philippines.</p>
          <p className="flex items-center gap-1">
            Featuring client deployments from <span className="text-blue-400 font-medium">Pinnacle Technologies Inc.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
