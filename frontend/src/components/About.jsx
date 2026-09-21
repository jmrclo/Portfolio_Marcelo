import React from 'react';
import { Server, Layout, Shield, Cpu, Zap, Sparkles, Terminal, Award } from 'lucide-react';

export function About({ profile }) {
  const pillars = [
    {
      icon: Server,
      title: "Full Stack Development",
      desc: "3+ years building responsive, component-driven web applications using Laravel, Vue.js, React, and MySQL, with clean RESTful API design."
    },
    {
      icon: Layout,
      title: "Component-Based Frontends",
      desc: "Crafting fluid user interfaces in React and Vue.js alongside HTML5, CSS3, JavaScript, and Bootstrap, ensuring cross-browser mobile responsiveness."
    },
    {
      icon: Sparkles,
      title: "AI-Assisted Engineering",
      desc: "Proficient in prompt engineering and leveraging ChatGPT, Claude, and GitHub Copilot to accelerate coding, debugging, refactoring, and documentation."
    },
    {
      icon: Shield,
      title: "Systems Administration & Networks",
      desc: "4+ years configuring hardware, routers, Cisco networking (LAN/WAN), server administration (Linux Red Hat/CentOS/Ubuntu, Windows), and cyber-defense."
    }
  ];

  return (
    <section id="about" className="py-20 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-400 font-mono text-xs tracking-widest uppercase">Professional Profile</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Engineering Reliable, User-Focused Web Systems
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            {profile.bio}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-950/50 via-slate-900 to-indigo-950/50 border border-blue-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold text-white">
              Pinnacle Technologies • Core Client Deployments
            </h4>
            <p className="text-sm text-slate-300 max-w-2xl">
              Contributing full-stack development to mission-critical systems: Central Luzon Doctor's Hospital (CLDH-EI), Tarlac Montessori (TMS), Bernardo College, Philyra Cloud POS, and ICCT Colleges SMS.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs tracking-wide shadow-md shadow-blue-500/20 transition-all hover:scale-105"
            >
              Explore Client Portals
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
