import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText, Briefcase, GraduationCap, Award, Phone, Mail, MapPin } from 'lucide-react';

export function ResumeModal({ profile, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const cvText = `# ${profile.name}
Software Developer | Full Stack (Laravel · Vue.js · React)
Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}

## PROFESSIONAL SUMMARY
${profile.bio}

## TECHNICAL SKILLS
- Front-end: React, Vue.js, JavaScript, HTML5, CSS3, Bootstrap, Responsive Design, Tailwind CSS
- Back-end: PHP, Laravel, RESTful APIs, Java, C#, VB.NET
- Databases: MySQL, Oracle, MongoDB
- AI & Productivity: AI-assisted development, Prompt Engineering, ChatGPT, Claude, GitHub Copilot, Microsoft Office
- Tools & Systems: Git, GitHub, GitLab, Linux (Red Hat, CentOS, Ubuntu), Windows, Cisco Networking (LAN/WAN)
- Additional: Android Studio (Java), Unity, Blender, Adobe Premiere, Photoshop, Sony Vegas

## PROFESSIONAL EXPERIENCE

### Full Stack Developer — Pinnacle Technologies Inc. (March 2023 – Present)
Grace Park, Caloocan, Metro Manila
- Build and maintain responsive, component-based user interfaces using React and Vue.js, along with HTML5, CSS3, and JavaScript.
- Implement front-end features and enhancements based on design mockups and user feedback, ensuring crossbrowser compatibility across devices.
- Design and implement server-side logic with the Laravel framework, and develop RESTful APIs that connect React and Vue.js front-ends to the back-end.
- Create and optimize MySQL database structures for efficient data storage and retrieval.
- Use AI tools (e.g., ChatGPT, Claude, GitHub Copilot) to speed up coding, debugging, refactoring, and documentation, writing clear prompts and reviewing all AI-generated code before use.
- Manage code with Git on GitHub and GitLab; collaborate with the team and take part in code reviews to maintain code quality and share knowledge.

### Technical Support (September 2018 – March 2023)
- Set up, configured, and maintained hardware, software, drivers, and peripheral devices such as routers.
- Installed and managed LAN/WAN networks and components, including servers and IP configuration.
- Managed security software and settings to protect systems and networks from attacks, and performed regular upgrades.
- Troubleshot system failures and bugs, restored functionality, and kept records of repairs and fixes for future reference.
- Provided timely technical support and trained users to use computers correctly.

## EDUCATION
- B.S. Computer Science — Asian Institute of Computer Studies, Caloocan City (2014 – 2018)

## INTERNSHIPS & AWARDS
- Best in Thesis (2018) — 3D Educational System
- Intern, Loan and Accounting Department (300 hrs) — Bayanihan St. John Multipurpose Cooperative, Bocaue, Bulacan
- Intern, Accounting Department (300 hrs) — Best Choice Inc., Bagong Barrio, Caloocan

## FEATURED CLIENT PROJECTS (PINNACLE TECHNOLOGIES)
- CLDH-EI Academic Information Management System (AIMS): https://cldh-ei.pinnacle.edu.ph/admin/login
- Tarlac Montessori School AIMS: https://tms.pinnacle.edu.ph/admin/login
- Bernardo College Academic Portal: https://bc.pinnacle.edu.ph/admin/login
- Philyra Cloud POS & Inventory System: https://pos-tms.philyra.cloud/login
- ICCT Colleges Student Management System (SMS): https://sms.icct.edu.ph/login
`;

    const blob = new Blob([cvText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JOHN_MATTHEW_MARCELO_CV.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Curriculum Vitae</h3>
              <p className="text-xs text-blue-400 font-mono">John Matthew A. Marcelo • Full Stack Developer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV (.MD)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto font-sans text-slate-300 text-sm">
          
          {/* Header Info */}
          <div className="border-b border-slate-800 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{profile.name}</h1>
            <p className="text-base text-blue-400 font-semibold mt-1">{profile.title}</p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-2">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-blue-400" /> {profile.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-indigo-400" /> {profile.phone}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-400" /> {profile.location}</span>
            </div>
            <p className="mt-4 text-slate-300 leading-relaxed text-xs sm:text-sm">
              {profile.bio}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="border-b border-slate-800 pb-6 space-y-3">
            <h3 className="text-sm font-bold uppercase font-mono text-blue-400 tracking-wider">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <strong className="text-white block mb-1">Front-end:</strong>
                <p className="text-slate-300">React, Vue.js, JavaScript, HTML5, CSS3, Bootstrap, Responsive Design</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <strong className="text-white block mb-1">Back-end:</strong>
                <p className="text-slate-300">PHP, Laravel, RESTful APIs, Java, C#, VB.NET</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <strong className="text-white block mb-1">Databases:</strong>
                <p className="text-slate-300">MySQL, Oracle, MongoDB</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <strong className="text-white block mb-1">AI & Productivity:</strong>
                <p className="text-slate-300">AI-assisted development, Prompt Engineering, ChatGPT, Claude, GitHub Copilot</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 sm:col-span-2">
                <strong className="text-white block mb-1">Tools & Systems:</strong>
                <p className="text-slate-300">Git, GitHub, GitLab, Linux (Red Hat, CentOS, Ubuntu), Windows, Cisco Networking (LAN/WAN)</p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="border-b border-slate-800 pb-6 space-y-6">
            <h3 className="text-sm font-bold uppercase font-mono text-blue-400 tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Professional Experience
            </h3>
            {(profile.experience || []).map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-base">{exp.role}</h4>
                    <p className="text-blue-400 font-medium text-xs">{exp.company} — {exp.location}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300 pl-1">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="leading-relaxed">{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education, Internships & Awards */}
          <div className="border-b border-slate-800 pb-6 space-y-4">
            <h3 className="text-sm font-bold uppercase font-mono text-blue-400 tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Education & Honors
            </h3>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1 text-xs">
              <strong className="text-white block text-sm">B.S. Computer Science (2014 – 2018)</strong>
              <p className="text-blue-400">Asian Institute of Computer Studies — Caloocan City</p>
              <div className="pt-2 text-slate-300 space-y-1">
                <p>🏆 <strong>Best in Thesis (2018)</strong> — 3D Educational System</p>
                <p>• Intern, Loan and Accounting Department (300 hrs) — Bayanihan St. John Multipurpose Cooperative, Bocaue, Bulacan</p>
                <p>• Intern, Accounting Department (300 hrs) — Best Choice Inc., Bagong Barrio, Caloocan</p>
              </div>
            </div>
          </div>

          {/* Featured Enterprise Client Systems */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase font-mono text-blue-400 tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4" /> Client Systems (Pinnacle Technologies)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <strong className="text-white block">CLDH-EI AIMS</strong>
                <span className="text-slate-400">Academic ERP for Doctor's Hospital Educational Institution</span>
                <span className="text-blue-400 font-mono block mt-1">Laravel MVC • MySQL • RBAC</span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <strong className="text-white block">Tarlac Montessori School AIMS</strong>
                <span className="text-slate-400">K-12 Grading, Tuition Ledger & Automated PDF reports</span>
                <span className="text-blue-400 font-mono block mt-1">Laravel • Bootstrap • DepEd</span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <strong className="text-white block">Bernardo College AIMS</strong>
                <span className="text-slate-400">Higher Education Degree Audit & Registrar Portal</span>
                <span className="text-blue-400 font-mono block mt-1">Laravel • Degree Audit • Clearance</span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                <strong className="text-white block">Philyra Cloud POS TMS</strong>
                <span className="text-slate-400">Cloud Point of Sale with sub-120ms latency & SHA-512 security</span>
                <span className="text-blue-400 font-mono block mt-1">Laravel • Codebase UI • SaaS</span>
              </div>
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl sm:col-span-2">
                <strong className="text-white block">ICCT Colleges Student Management System (SMS)</strong>
                <span className="text-slate-400">High-concurrency admissions handling 15k+ daily applicant transactions for 50,000+ students</span>
                <span className="text-blue-400 font-mono block mt-1">High-Throughput Laravel • MySQL Cluster</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
