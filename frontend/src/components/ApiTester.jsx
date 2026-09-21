import React, { useState } from 'react';
import { Code2, Play, Check, Copy, Server, Sparkles, Send } from 'lucide-react';
import { api } from '../services/api';
import { projectsData } from '../data/projectsData';
import profileData from '../data/profileData.json';

export function ApiTester() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/projects');
  const [customParam, setCustomParam] = useState('pos-tms-philyra');
  const [responseOutput, setResponseOutput] = useState(JSON.stringify({ count: 5, status: "Ready to inspect" }, null, 2));
  const [responseStatus, setResponseStatus] = useState('200 OK');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    { method: 'GET', path: '/api/projects', label: 'All Pinnacle Projects' },
    { method: 'GET', path: '/api/projects/{slug}', label: 'Single Project Details' },
    { method: 'GET', path: '/api/profile', label: 'Engineer Profile & CV' },
    { method: 'GET', path: '/api/metrics', label: 'System Health & Metrics' },
    { method: 'POST', path: '/api/chat', label: 'AI Agent Query Endpoint' }
  ];

  const handleExecute = async () => {
    setLoading(true);
    try {
      if (selectedEndpoint === '/api/projects') {
        const result = await api.getProjects();
        setResponseOutput(JSON.stringify(result.data, null, 2));
        setResponseStatus('200 OK (Source: ' + result.source + ')');
      } else if (selectedEndpoint === '/api/projects/{slug}') {
        const slug = customParam || 'pos-tms-philyra';
        const project = projectsData.find(p => p.slug === slug || p.id.toString() === slug);
        if (project) {
          setResponseOutput(JSON.stringify({ success: true, data: project }, null, 2));
          setResponseStatus('200 OK');
        } else {
          setResponseOutput(JSON.stringify({ success: false, error: 'Project not found' }, null, 2));
          setResponseStatus('404 Not Found');
        }
      } else if (selectedEndpoint === '/api/profile') {
        const result = await api.getProfile();
        setResponseOutput(JSON.stringify(result.data, null, 2));
        setResponseStatus('200 OK (Source: ' + result.source + ')');
      } else if (selectedEndpoint === '/api/metrics') {
        setResponseOutput(JSON.stringify({
          success: true,
          data: {
            total_systems: 5,
            active_users: "60,000+",
            pos_latency_ms: 118,
            peak_admissions_concurrency: "15,000/day",
            availability_sla: "99.9%",
            backend_architecture: "Laravel 11 MVC / REST API"
          }
        }, null, 2));
        setResponseStatus('200 OK');
      } else if (selectedEndpoint === '/api/chat') {
        setResponseOutput(JSON.stringify({
          success: true,
          agent: "Antigravity Engineer Agent (Laravel/Vue Mock Backend)",
          reply: "Philyra Cloud POS & Inventory System is an enterprise cloud SaaS solution engineered with sub-120ms checkout speed and SHA-512 cryptographic security.",
          timestamp: new Date().toISOString()
        }, null, 2));
        setResponseStatus('200 OK');
      }
    } catch (err) {
      setResponseOutput(JSON.stringify({ error: err.message }, null, 2));
      setResponseStatus('500 Error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(responseOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-explorer" className="py-24 relative border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-400 text-xs font-mono mb-3">
            <Server className="w-3.5 h-3.5" /> Laravel MVC & API Mock Explorer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive RESTful API Inspector
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Demonstrating API design contracts connecting the React frontend with the Laravel MVC / Mock server backend.
          </p>
        </div>

        {/* API Tester Console */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Endpoints dropdown */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Endpoint:</span>
              <div className="flex flex-wrap gap-1.5">
                {endpoints.map((ep) => (
                  <button
                    key={ep.path}
                    onClick={() => {
                      setSelectedEndpoint(ep.path);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                      selectedEndpoint === ep.path
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className={`text-[10px] font-bold px-1 rounded ${ep.method === 'GET' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>
                      {ep.method}
                    </span>
                    <span>{ep.path}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Execute button */}
            <button
              onClick={handleExecute}
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-105 shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{loading ? 'Executing...' : 'Send Request'}</span>
            </button>
          </div>

          {/* Optional Parameter input */}
          {selectedEndpoint === '/api/projects/{slug}' && (
            <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">Slug Parameter:</span>
              <input
                type="text"
                value={customParam}
                onChange={(e) => setCustomParam(e.target.value)}
                placeholder="pos-tms-philyra or cldh-ei-aims"
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-white text-xs w-64 focus:outline-none focus:border-blue-500"
              />
              <span className="text-slate-400 text-[11px]">(e.g., pos-tms-philyra, cldh-ei-aims, tms-aims, bc-aims, icct-sms)</span>
            </div>
          )}

          {/* Response Console */}
          <div className="p-5 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <span>Status: <strong className="text-emerald-400">{responseStatus}</strong></span>
                <span>Content-Type: <strong className="text-slate-300">application/json</strong></span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                title="Copy JSON response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copied ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>

            <div className="bg-[#0a0d14] rounded-xl p-4 border border-slate-800 max-h-[360px] overflow-y-auto">
              <pre className="text-blue-300 leading-relaxed whitespace-pre-wrap">
                {responseOutput}
              </pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

