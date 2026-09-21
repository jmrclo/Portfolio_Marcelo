import React from 'react';
import { Server, Layout, Cloud, Shield, Database, Sparkles, Terminal, Video } from 'lucide-react';

export function Skills({ profile }) {
  const categories = [
    {
      title: "Front-End Engineering",
      icon: Layout,
      skills: [
        { name: "React", level: 94, desc: "Component-based architecture, hooks, state, modern SPAs" },
        { name: "Vue.js", level: 92, desc: "Vue 3 Composition API, reactive state, Laravel integration" },
        { name: "JavaScript (ES6+)", level: 92, desc: "Async/await, DOM manipulation, modular architecture" },
        { name: "HTML5 & CSS3", level: 96, desc: "Semantic markup, responsive layouts, animations" },
        { name: "Bootstrap & Tailwind CSS", level: 95, desc: "Cross-browser mobile design, clean design systems" },
      ]
    },
    {
      title: "Back-End & Databases",
      icon: Server,
      skills: [
        { name: "PHP & Laravel Framework", level: 95, desc: "MVC architecture, Eloquent ORM, middleware, routing" },
        { name: "RESTful API Design", level: 95, desc: "JSON resources, endpoint security, decoupled backends" },
        { name: "MySQL Database", level: 92, desc: "Schema design, relational indexing, query optimization" },
        { name: "Java, C# & VB.NET", level: 82, desc: "Object-oriented programming, desktop & enterprise logic" },
        { name: "Oracle & MongoDB", level: 80, desc: "Relational constraints & NoSQL document datastores" },
      ]
    },
    {
      title: "AI, Systems & Networking",
      icon: Sparkles,
      skills: [
        { name: "AI-Assisted Engineering", level: 96, desc: "Prompt engineering with ChatGPT, Claude & GitHub Copilot" },
        { name: "Git, GitHub & GitLab", level: 94, desc: "Branching workflows, PR reviews, code quality checks" },
        { name: "Linux Administration", level: 88, desc: "Red Hat, CentOS, Ubuntu server management & scripts" },
        { name: "Cisco Networking & Security", level: 88, desc: "LAN/WAN setup, routers, IP configuration, firewall defense" },
        { name: "Android, Unity & Creative Tools", level: 82, desc: "Android Studio (Java), Unity, Blender, Premiere, Photoshop" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-400 font-mono text-xs tracking-widest uppercase">Technical Competencies</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Full-Stack Skillset & Systems Expertise
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Grounded in 3+ years of full-stack web engineering and 4+ years of hands-on IT support and systems administration.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-lg">{cat.title}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-5">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-slate-200">{skill.name}</span>
                          <span className="font-mono text-blue-400">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-700"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">{skill.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
