import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { ApiTester } from './components/ApiTester';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { ResumeModal } from './components/ResumeModal';
import { api } from './services/api';
import { projectsData as fallbackProjects } from './data/projectsData';
import fallbackProfile from './data/profileData.json';

export function App() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [projects, setProjects] = useState(fallbackProjects);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      const [profRes, projRes] = await Promise.all([
        api.getProfile(),
        api.getProjects()
      ]);
      if (profRes && profRes.data) setProfile(profRes.data);
      if (projRes && projRes.data) setProjects(projRes.data);
    }
    loadData();
  }, []);

  const handleOpenChatWithQuery = (query) => {
    setChatInitialQuery(query);
    setIsChatOpen(true);
  };

  const handleInspectApi = (project) => {
    const el = document.getElementById('api-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar 
        onOpenChat={() => { setChatInitialQuery(''); setIsChatOpen(true); }}
        onDownloadResume={() => setIsResumeOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero 
          profile={profile}
          onOpenChat={() => { setChatInitialQuery(''); setIsChatOpen(true); }}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Professional About & Value Proposition */}
        <About profile={profile} />

        {/* Pinnacle Client Projects Showcase */}
        <Projects 
          projects={projects}
          onSelectProject={(p) => setSelectedProject(p)}
          onInspectApi={handleInspectApi}
        />

        {/* Technical Skills Matrix */}
        <Skills profile={profile} />

        {/* Work Experience Timeline & Milestones */}
        <Experience 
          profile={profile}
          onDownloadResume={() => setIsResumeOpen(true)}
        />

        {/* Interactive Laravel / Mock API Inspector */}
        <ApiTester />

        {/* Contact Section */}
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Floating AI Agent Chatbot */}
      <Chatbot 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuery={chatInitialQuery}
      />

      {/* Case Study Architectural Modal */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onAskAi={handleOpenChatWithQuery}
      />

      {/* Interactive CV / Resume Modal */}
      <ResumeModal 
        profile={profile}
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;

