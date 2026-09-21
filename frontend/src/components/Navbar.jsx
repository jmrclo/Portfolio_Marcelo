import React, { useState } from 'react';
import { Terminal, Bot, FileText, Menu, X, ExternalLink, Code2 } from 'lucide-react';

export function Navbar({ onOpenChat, onDownloadResume }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'API Explorer', href: '#api-explorer' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#080b11]/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform font-bold text-xs">
              JM
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-100 text-sm sm:text-base tracking-tight group-hover:text-blue-400 transition-colors">
                John Matthew Marcelo
              </span>
              <span className="text-[10px] text-slate-400 font-mono -mt-1">Full Stack • Laravel & React</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-blue-400 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-500 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenChat}
              className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 hover:border-blue-500/60 transition-all glow-blue"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI Agent</span>
            </button>

            <button
              onClick={onDownloadResume}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>CV / Resume</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenChat}
              className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30"
              title="Chat with AI Agent"
            >
              <Bot className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-blue-400 text-sm font-medium py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenChat(); }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Portfolio Agent</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onDownloadResume(); }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>View & Download CV</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
