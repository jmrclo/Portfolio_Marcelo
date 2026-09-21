#!/usr/bin/env python3
"""
Zero-Dependency API Mock Server for John Matthew A. Marcelo's Portfolio
Implements full RESTful API specifications matching the Laravel MVC Backend.
Includes an intelligent AI Agent Chatbot endpoint pre-trained on John Matthew's CV & Pinnacle projects,
with optional live LLM forwarding (Gemini, OpenAI, Groq).
"""

import json
import os
import re
import urllib.request
import urllib.error
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')

def load_json(filename):
    filepath = os.path.join(DATA_DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

PROJECTS = load_json('projects.json')
PROFILE = load_json('profile.json')

SYSTEM_PROMPT = """
You are the AI Portfolio Representative for John Matthew A. Marcelo, a Full Stack Developer.
Background:
- Name: John Matthew A. Marcelo
- Title: Software Developer | Full Stack (Laravel · Vue.js · React)
- Contact: jm.marcelo0212@gmail.com | 0908-519-2226 | Bocaue, Bulacan, Philippines
- Experience:
  1. Full Stack Developer at Pinnacle Technologies Inc. (March 2023 - Present) — Caloocan, Metro Manila
     - Built component-based UIs in React & Vue.js, Laravel REST APIs, and MySQL optimization.
     - Delivered 5 client deployments:
       • CLDH-EI AIMS: https://cldh-ei.pinnacle.edu.ph/admin/login
       • TMS AIMS: https://tms.pinnacle.edu.ph/admin/login
       • Bernardo College AIMS: https://bc.pinnacle.edu.ph/admin/login
       • Philyra Cloud POS TMS: https://pos-tms.philyra.cloud/login (sub-120ms latency, SHA-512 security)
       • ICCT Colleges SMS: https://sms.icct.edu.ph/login (50,000+ students, 15,000+ daily admissions)
  2. Technical Support (September 2018 - March 2023): Hardware, Cisco Networking (LAN/WAN), Windows/Linux servers.
- Education: B.S. Computer Science from Asian Institute of Computer Studies (2014 - 2018). Best in Thesis (3D Educational System).
- AI Tools: Prompt engineering, ChatGPT, Claude, GitHub Copilot.

Tone: Professional, articulate, and engineering-focused.
"""

def get_configured_gemini_key():
    """
    Looks for a centralized Gemini API key from environment variables,
    .env, config.js, config.json, or GEMINI_API_KEY.txt.
    """
    if os.getenv('GEMINI_API_KEY'):
        return os.getenv('GEMINI_API_KEY').strip()

    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(current_dir)

    search_paths = [
        os.path.join(current_dir, 'config.json'),
        os.path.join(parent_dir, 'config.json'),
        os.path.join(parent_dir, 'config.js'),
        os.path.join(parent_dir, '.env'),
        os.path.join(parent_dir, 'GEMINI_API_KEY.txt')
    ]

    for p in search_paths:
        if os.path.exists(p):
            try:
                with open(p, 'r', encoding='utf-8') as f:
                    content = f.read().strip()
                if p.endswith('.json'):
                    data = json.loads(content)
                    if data.get('GEMINI_API_KEY') and not data['GEMINI_API_KEY'].startswith('YOUR_'):
                        return data['GEMINI_API_KEY'].strip()
                elif p.endswith('.js'):
                    import re
                    m = re.search(r'PORTFOLIO_GEMINI_KEY\s*=\s*["\']([^"\']+)["\']', content)
                    if m and m.group(1).strip() and not m.group(1).startswith('YOUR_'):
                        return m.group(1).strip()
                elif p.endswith('.env'):
                    for line in content.splitlines():
                        if line.strip().startswith('GEMINI_API_KEY='):
                            key = line.split('=', 1)[1].strip().strip('"').strip("'")
                            if key and not key.startswith('YOUR_'):
                                return key
                elif p.endswith('.txt'):
                    if content and not content.startswith('YOUR_'):
                        return content
            except Exception:
                pass
    return None

def call_external_llm(provider, api_key, model, prompt):
    """
    Optional forwarder to real LLM providers.
    """
    if provider == 'gemini':
        gem_model = model or 'gemini-1.5-flash'
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{gem_model}:generateContent?key={api_key}"
        data = json.dumps({
            "systemInstruction": {"parts": [{"text": SYSTEM_PROMPT}]},
            "contents": [{"role": "user", "parts": [{"text": prompt}]}]
        }).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=12) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                return res_data['candidates'][0]['content']['parts'][0]['text']
        except Exception as e:
            print(f"[Gemini API Call Failed]: {e}")
            return None

    if provider == 'openai':
        oa_model = model or 'gpt-4o-mini'
        url = "https://api.openai.com/v1/chat/completions"
        data = json.dumps({
            "model": oa_model,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7
        }).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        })
        try:
            with urllib.request.urlopen(req, timeout=12) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                return res_data['choices'][0]['message']['content']
        except Exception as e:
            print(f"[OpenAI API Call Failed]: {e}")
            return None

    return None

def generate_ai_response(query, payload=None):
    """
    RAG-style AI Agent context responder for John Matthew Marcelo.
    """
    payload = payload or {}
    central_gemini_key = get_configured_gemini_key()
    provider = payload.get('provider') or ('gemini' if central_gemini_key else 'builtin')
    api_key = payload.get('api_key') or (central_gemini_key if provider == 'gemini' else None) or os.getenv('OPENAI_API_KEY') or os.getenv('GEMINI_API_KEY')

    # If provider and key are supplied, attempt live LLM call
    if provider and api_key and provider != 'builtin':
        try:
            llm_result = call_external_llm(provider, api_key, payload.get('model'), query)
            if llm_result:
                return llm_result
        except Exception as e:
            print(f"[LLM Error] {e}")

    # Fallback to rich pre-loaded knowledge base
    q = query.lower().strip()

    # 1. Contact / Hire / Phone / Email
    if any(k in q for k in ['contact', 'hire', 'email', 'phone', 'call', 'reach', 'location', 'touch', 'message']):
        return (
            "You can contact **John Matthew A. Marcelo** directly:\n\n"
            "• 📧 **Email:** [jm.marcelo0212@gmail.com](mailto:jm.marcelo0212@gmail.com)\n"
            "• 📱 **Phone:** 0908-519-2226\n"
            "• 📍 **Location:** Bocaue, Bulacan, Philippines\n"
            "• 💼 **Status:** Open to Software Developer Roles (Remote / Hybrid / On-site)\n\n"
            "Feel free to reach out directly via email or phone for full-stack opportunities!"
        )

    if any(k in q for k in ['pos', 'philyra', 'point of sale', 'cashier', 'barcode']):
        return (
            "**Philyra Cloud Point of Sale (POS) & Inventory System** is a flagship cloud application John Matthew Marcelo "
            "contributed to at Pinnacle Technologies.\n\n"
            "Key architectural highlights:\n"
            "- **Sub-120ms checkout speed** with instant barcode scanner parsing.\n"
            "- **SHA-512 cryptographic security** for client authentication and tamper-evident payload verification.\n"
            "- **Real-time multi-location inventory reconciliation** with automatic low-stock reorder triggers.\n"
            "- **Robust Laravel MVC backend** paired with Codebase UI, thermal receipt printing, and ACID transaction safety.\n\n"
            "Explore live deployment: [pos-tms.philyra.cloud](https://pos-tms.philyra.cloud/login)."
        )

    if any(k in q for k in ['cldh', 'doctor', 'hospital', 'medical']):
        return (
            "**CLDH-EI Academic Information Management System (AIMS)** serves Central Luzon Doctor's Hospital Educational Institution.\n\n"
            "- Unifies student admissions, automated grade encoding, prerequisite validation, and Transcript of Records (TOR) generation.\n"
            "- Granular **Role-Based Access Control (RBAC)** across Super Admins, College Deans, Faculty, and Registrars.\n"
            "- Complies with **National Privacy Commission (NPC)** guidelines with automated idle-session invalidation and CSRF protections.\n"
            "- Live production portal: [cldh-ei.pinnacle.edu.ph](https://cldh-ei.pinnacle.edu.ph/admin/login)."
        )

    if any(k in q for k in ['tms', 'montessori', 'tarlac']):
        return (
            "**Tarlac Montessori School AIMS** is an educational management ERP custom-tailored for Montessori & K-12 operations.\n\n"
            "- Features DepEd-compliant quarterly grading matrices with automated Form 137/138 batch PDF generation.\n"
            "- Student financial ledger: tuition installment tracking, automated discount computation, and cashier reconciliation.\n"
            "- Built with a dynamic skin/theme system using CSS variables, AdminLTE, and Laravel scheduled workers.\n"
            "- Live production portal: [tms.pinnacle.edu.ph](https://tms.pinnacle.edu.ph/admin/login)."
        )

    if any(k in q for k in ['bernardo', 'bc ']) or 'bc.pinnacle' in q:
        return (
            "**Bernardo College AIMS** is an academic ERP designed to automate complex registrar and dean workflows.\n\n"
            "- Degree prerequisite auditing to ensure graduating students have met all curriculum criteria.\n"
            "- Optimizes room allocation, faculty loading, and online student clearances.\n"
            "- Live production portal: [bc.pinnacle.edu.ph](https://bc.pinnacle.edu.ph/admin/login)."
        )

    if any(k in q for k in ['icct', 'sms', 'student management', 'admissions']):
        return (
            "**ICCT Colleges Student Management System (SMS)** is a high-concurrency web application serving over 50,000 students.\n\n"
            "- Handles **15,000+ daily concurrent applicant transactions** during peak semester admissions.\n"
            "- Orchestrates student onboarding, automated student number generation, multi-campus data federation, and support hotlines.\n"
            "- Live portal: [sms.icct.edu.ph](https://sms.icct.edu.ph/login)."
        )

    if any(k in q for k in ['skills', 'stack', 'technologies', 'laravel', 'vue', 'react']):
        return (
            "**John Matthew's Core Technical Skills:**\n\n"
            "• **Front-End:** React, Vue.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, Tailwind CSS, Responsive Design\n"
            "• **Back-End:** PHP, Laravel Framework, RESTful APIs, Java, C#, VB.NET\n"
            "• **Databases:** MySQL (Schema optimization & query tuning), Oracle, MongoDB\n"
            "• **AI & Productivity:** Prompt Engineering, ChatGPT, Claude, GitHub Copilot\n"
            "• **Systems & Networking:** Git, GitHub, GitLab, Linux (Red Hat, CentOS, Ubuntu), Cisco Networking (LAN/WAN)"
        )

    if any(k in q for k in ['experience', 'work', 'background', 'career', 'pinnacle']):
        return (
            "**Professional Experience Summary:**\n\n"
            "1. **Full Stack Developer (March 2023 – Present)** at Pinnacle Technologies Inc., Caloocan\n"
            "   - Building responsive UIs in React & Vue.js, architecting Laravel backend logic and REST APIs, and optimizing MySQL databases.\n"
            "   - Contributed to 5 live systems: CLDH-EI, TMS, Bernardo College, Philyra Cloud POS, and ICCT Colleges SMS.\n\n"
            "2. **Technical Support (Sept 2018 – March 2023)**\n"
            "   - Configured hardware, routers, Cisco networking (LAN/WAN), server administration (Linux, Windows), and cybersecurity software."
        )

    if any(k in q for k in ['education', 'college', 'degree', 'thesis', 'award']):
        return (
            "**Education & Honors:**\n\n"
            "• **B.S. in Computer Science (2014 – 2018)** — Asian Institute of Computer Studies, Caloocan City.\n"
            "• **🏆 Best in Thesis Award (2018):** '3D Educational System' — Recognized for technical innovation and pedagogical system design.\n"
            "• **Accounting & Loan Internships:** Bayanihan St. John Cooperative (300 hrs) & Best Choice Inc. (300 hrs)."
        )

    # 2. Age / Birthday / Years Old
    if any(k in q for k in ['age', 'how old', 'birthday', 'birth date', 'born', 'years old']):
        return (
            "As an AI Portfolio Representative, I don't have an age, but **John Matthew A. Marcelo** is an experienced "
            "software developer who completed his B.S. in Computer Science in **2018** (winning **Best in Thesis**).\n\n"
            "He brings over **7+ total years of professional IT & development experience**:\n"
            "• **3+ years** as a Full Stack Developer (Laravel, Vue.js, React, MySQL) at Pinnacle Technologies Inc.\n"
            "• **4+ years** in Technical Support & Systems Administration\n\n"
            "Would you like to know more about his projects, technical stack, or how to contact him?"
        )

    # 3. Why hire / Strengths
    if any(k in q for k in ['why hire', 'why choose', 'strength', 'why should', 'hire you']):
        return (
            "Here is what makes **John Matthew A. Marcelo** a strong candidate for Software Developer roles:\n\n"
            "1. **Full-Stack Proficiency:** Strong command of Laravel MVC, RESTful APIs, Vue.js, React, and MySQL database optimization.\n"
            "2. **Production-Proven at Scale:** Contributed to 5 live portals at Pinnacle Technologies, including the ICCT SMS supporting 15,000+ daily concurrent applicant transactions and Philyra POS with sub-120ms latency.\n"
            "3. **Systems & Security Depth:** 4+ years in IT systems administration gives him practical mastery of Linux servers, Cisco networking, and application security (SHA-512, RBAC, session protection).\n"
            "4. **AI-Driven Acceleration:** Actively leverages modern AI tools (GitHub Copilot, ChatGPT, Claude) to write cleaner, well-tested code faster."
        )

    # 4. Availability / Work Arrangement
    if any(k in q for k in ['available', 'availability', 'start', 'remote', 'hybrid', 'relocate', 'onsite', 'full time']):
        return (
            "**Availability & Work Preferences:**\n\n"
            "• **Status:** Actively available for Software Developer / Full Stack Engineer roles.\n"
            "• **Arrangements:** Open to **Remote**, **Hybrid**, or **On-site** positions.\n"
            "• **Base Location:** Bocaue, Bulacan, Philippines.\n"
            "• **Reach out:** Email [jm.marcelo0212@gmail.com](mailto:jm.marcelo0212@gmail.com) or call `0908-519-2226` to get in touch!"
        )

    # 5. Greetings
    if any(q == g or q.startswith(g + ' ') or q.startswith(g + ',') for g in ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'kamusta']):
        return (
            "👋 Hello! Welcome to **John Matthew A. Marcelo's** portfolio.\n\n"
            "I'm here to answer any questions about:\n"
            "• His **5 Pinnacle client projects** (Philyra Cloud POS, CLDH-EI, TMS, Bernardo College, ICCT SMS)\n"
            "• His **technical stack** (Laravel, Vue.js, React, MySQL, REST APIs)\n"
            "• His **work experience, awards, or direct contact details**\n\n"
            "What would you like to know?"
        )

    # Bio / Who is John Matthew / What is JM
    if any(k in q for k in ['who is', 'what is', 'bio', 'profile', 'about', 'developer', 'who are you', 'tell me about', 'summary']) or q in ['jm', 'john', 'john matthew', 'marcelo']:
        return (
            "**John Matthew A. Marcelo** is a **Full Stack Software Developer** with 3+ years of experience building "
            "responsive web applications using **Laravel, Vue.js, React, and MySQL**, backed by 4+ years in IT support and systems administration.\n\n"
            "• **Current Role:** Full Stack Developer at **Pinnacle Technologies Inc.** (Grace Park, Caloocan) since March 2023.\n"
            "• **Key Systems Built:** Contributed to 5 enterprise client platforms: CLDH-EI AIMS, TMS AIMS, Bernardo College, Philyra Cloud POS, and ICCT Colleges SMS.\n"
            "• **Academic Honor:** 🏆 **Best in Thesis Award (2018)** for '3D Educational System' (B.S. Computer Science, AICS Caloocan).\n"
            "• **Location:** Bocaue, Bulacan, Philippines (Open to Remote / Hybrid / On-site roles).\n\n"
            "Feel free to ask about his specific Pinnacle projects, technical architecture, or contact details!"
        )

    return (
        "Hello! I am the **AI Portfolio Agent** for **John Matthew A. Marcelo**.\n\n"
        "Ask me anything about:\n"
        "• **Who is John Matthew**: Full Stack Developer (Laravel · Vue.js · React) with 3+ years experience\n"
        "• **5 Pinnacle client projects**: CLDH-EI, TMS, Bernardo College, Philyra POS, and ICCT SMS\n"
        "• **Technical stack**: REST APIs, MySQL schema optimization, React, Vue, and Linux\n"
        "• **Contact information**: Email (`jm.marcelo0212@gmail.com`) and Phone (`0908-519-2226`)"
    )

class MockApiHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # Handle Root / and /api/
        if path in ['/', '', '/api', '/api/']:
            accept = self.headers.get('Accept', '')
            if 'text/html' in accept:
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self._send_cors_headers()
                self.end_headers()
                html = """<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>John Matthew A. Marcelo | Portfolio REST API</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background: #080b11; color: #f1f5f9; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
    </style>
</head>
<body class="min-h-screen p-6 sm:p-12 flex flex-col justify-between">
    <div class="max-w-4xl mx-auto w-full space-y-8">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 font-mono text-xs mb-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    API Server Online (Port 8000)
                </div>
                <h1 class="text-3xl font-extrabold text-white">John Matthew A. Marcelo</h1>
                <p class="text-slate-400 text-sm mt-1">Full Stack Developer • Laravel MVC REST API & Mock Server</p>
            </div>
            <a href="http://localhost:3000/" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-2">
                <span>🚀 Open React Portfolio (Port 3000)</span>
            </a>
        </div>

        <!-- Endpoints Grid -->
        <div class="space-y-4">
            <h2 class="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold">Available RESTful Endpoints:</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <a href="/api/profile" class="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors block group">
                    <div class="flex justify-between items-center mb-1.5">
                        <span class="text-emerald-400 font-bold">GET /api/profile</span>
                        <span class="text-[10px] text-slate-500 group-hover:text-blue-400">View JSON ↗</span>
                    </div>
                    <p class="text-slate-400 font-sans">Full CV, contact info (phone/email), education & awards.</p>
                </a>

                <a href="/api/projects" class="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors block group">
                    <div class="flex justify-between items-center mb-1.5">
                        <span class="text-emerald-400 font-bold">GET /api/projects</span>
                        <span class="text-[10px] text-slate-500 group-hover:text-blue-400">View JSON ↗</span>
                    </div>
                    <p class="text-slate-400 font-sans">All 5 Pinnacle client projects (CLDH-EI, TMS, BC, POS, ICCT).</p>
                </a>

                <a href="/api/projects/pos-tms-philyra" class="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors block group">
                    <div class="flex justify-between items-center mb-1.5">
                        <span class="text-emerald-400 font-bold">GET /api/projects/{slug}</span>
                        <span class="text-[10px] text-slate-500 group-hover:text-blue-400">View JSON ↗</span>
                    </div>
                    <p class="text-slate-400 font-sans">Deep-dive technical details for a specific project.</p>
                </a>

                <a href="/api/metrics" class="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors block group">
                    <div class="flex justify-between items-center mb-1.5">
                        <span class="text-emerald-400 font-bold">GET /api/metrics</span>
                        <span class="text-[10px] text-slate-500 group-hover:text-blue-400">View JSON ↗</span>
                    </div>
                    <p class="text-slate-400 font-sans">Production metrics: 60k+ active users, sub-120ms latency.</p>
                </a>
            </div>
        </div>

        <!-- Chat API Info -->
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
            <div class="flex justify-between items-center">
                <span class="text-amber-400 font-bold">POST /api/chat</span>
                <span class="text-slate-400 font-sans">AI Portfolio Agent Endpoint</span>
            </div>
            <p class="text-slate-400 font-sans">
                Accepts JSON: <code class="text-blue-300 bg-slate-950 px-1 py-0.5 rounded">{"message": "What did John Matthew build at Pinnacle?"}</code>
            </p>
        </div>

        <div class="text-center pt-4">
            <a href="http://localhost:3000/" class="text-blue-400 hover:underline text-xs font-mono">
                Click here to view the full interactive React Portfolio at http://localhost:3000/
            </a>
        </div>
    </div>
</body>
</html>"""
                self.wfile.write(html.encode('utf-8'))
                return

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._send_cors_headers()
            self.end_headers()
            root_info = {
                "name": "John Matthew A. Marcelo - Portfolio REST API",
                "developer": "John Matthew A. Marcelo",
                "title": "Software Developer | Full Stack (Laravel · Vue.js · React)",
                "status": "Online",
                "port": PORT,
                "endpoints": {
                    "profile": f"http://localhost:{PORT}/api/profile",
                    "projects": f"http://localhost:{PORT}/api/projects",
                    "single_project": f"http://localhost:{PORT}/api/projects/pos-tms-philyra",
                    "metrics": f"http://localhost:{PORT}/api/metrics",
                    "chat": f"http://localhost:{PORT}/api/chat (POST)"
                },
                "frontend_url": "http://localhost:3000/"
            }
            self.wfile.write(json.dumps(root_info, indent=2).encode('utf-8'))
            return

        if path in ['/api/profile', '/api/profile/']:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "data": PROFILE}).encode('utf-8'))
            return

        if path in ['/api/projects', '/api/projects/']:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "count": len(PROJECTS), "data": PROJECTS}).encode('utf-8'))
            return

        match = re.match(r'^/api/projects/([a-zA-Z0-9_-]+)/?$', path)
        if match:
            slug = match.group(1)
            project = next((p for p in PROJECTS if p['slug'] == slug or str(p['id']) == slug), None)
            if project:
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "data": project}).encode('utf-8'))
            else:
                self.send_response(404)
                self.send_header('Content-Type', 'application/json')
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "message": "Project not found"}).encode('utf-8'))
            return

        if path in ['/api/metrics', '/api/metrics/']:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._send_cors_headers()
            self.end_headers()
            metrics = {
                "engineer": "John Matthew A. Marcelo",
                "total_projects": len(PROJECTS),
                "total_users_served": "60,000+",
                "avg_response_time_ms": 115,
                "uptime": "99.9%",
                "backend_framework": "Laravel 11 MVC",
                "frontend_framework": "React & Vue.js",
                "llm_integration": "Supported (Gemini, OpenAI, Groq, Ollama)"
            }
            self.wfile.write(json.dumps({"success": True, "data": metrics}).encode('utf-8'))
            return

        self.send_response(404)
        self.send_header('Content-Type', 'application/json')
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else '{}'

        try:
            payload = json.loads(post_data)
        except Exception:
            payload = {}

        if path in ['/api/chat', '/api/chat/']:
            message = (
                payload.get('message') or 
                payload.get('query') or 
                payload.get('prompt') or 
                payload.get('text') or 
                ''
            )
            ai_reply = generate_ai_response(message, payload)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._send_cors_headers()
            self.end_headers()
            response_body = {
                "success": True,
                "agent": "John Matthew's AI Portfolio Agent (Laravel/Mock Backend)",
                "reply": ai_reply,
                "provider": payload.get('provider', 'builtin'),
                "timestamp": "2026-09-21T13:00:00Z"
            }
            self.wfile.write(json.dumps(response_body).encode('utf-8'))
            return

        if path in ['/api/contact', '/api/contact/']:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._send_cors_headers()
            self.end_headers()
            response_body = {
                "success": True,
                "message": f"Thank you, {payload.get('name', 'Friend')}! Your message was delivered to John Matthew A. Marcelo.",
                "data": payload
            }
            self.wfile.write(json.dumps(response_body).encode('utf-8'))
            return

        self.send_response(404)
        self.send_header('Content-Type', 'application/json')
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

    def log_message(self, format, *args):
        print(f"[Mock API Server] {args[0]} {args[1]}")

def run():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, MockApiHandler)
    print(f"Mock API Server running at http://localhost:{PORT}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
