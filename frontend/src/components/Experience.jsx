import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, GraduationCap, Award, Download, FileText, Sparkles } from 'lucide-react';

export function Experience({ profile, onDownloadResume }) {
  const experiences = profile.experience || [];
  const education = profile.education || [];
  const awards = profile.internships_and_awards || [];

  return (
    <section id="experience" className="py-24 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-400 font-mono text-xs tracking-widest uppercase">Career Track Record</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Work Experience & Milestones
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Demonstrated growth from systems administration to full-stack web engineering at Pinnacle Technologies.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Work Experiences */}
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 relative group overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-base text-blue-400 font-semibold">{exp.company}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {exp.location}
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                {exp.summary}
              </p>

              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Core Responsibilities & Deliverables:
                </h4>
                {exp.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Education & Awards Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Education */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-blue-600/15 text-blue-400 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Education</h3>
                  <p className="text-xs text-slate-400 font-mono">Academic Foundation</p>
                </div>
              </div>

              {education.map((edu, eIdx) => (
                <div key={eIdx} className="space-y-1 text-xs">
                  <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
                  <p className="text-blue-400">{edu.institution} — {edu.location}</p>
                  <p className="text-slate-400 font-mono text-[11px]">{edu.period}</p>
                </div>
              ))}
            </div>

            {/* Awards & Internships */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-600/15 text-amber-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Awards & Internships</h3>
                  <p className="text-xs text-slate-400 font-mono">Honors & Field Training</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {awards.map((aw, aIdx) => (
                  <div key={aIdx} className="space-y-0.5">
                    <strong className="text-white block font-semibold">{aw.title}</strong>
                    <p className="text-slate-300 leading-relaxed">{aw.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* CV Hub Download Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-800/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Curriculum Vitae • John Matthew A. Marcelo</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  Complete resume with Pinnacle client projects, education, technical skills, and references.
                </p>
              </div>
            </div>

            <button
              onClick={onDownloadResume}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-105 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (.MD)</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
