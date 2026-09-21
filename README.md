# Enterprise Software Engineer Portfolio & AI Agent Chatbot

A modern, high-performance, and professional web application portfolio showcasing enterprise client projects from **Pinnacle Technologies**, an interactive **AI Agent Chatbot**, a **React frontend**, and a full-stack **Laravel 11 + Vue 3 MVC backend** with RESTful API mocks.

---

## 🌟 Featured Pinnacle Client Projects

| Project | Institution / Client | System Category | Architecture Highlights | Live Production Portal |
| :--- | :--- | :--- | :--- | :--- |
| **CLDH-EI AIMS** | Central Luzon Doctor's Hospital Educational Institution | Academic ERP | Laravel MVC, MySQL Relational, Role-Based Access Control (RBAC), NPC Compliance | [cldh-ei.pinnacle.edu.ph/admin/login](https://cldh-ei.pinnacle.edu.ph/admin/login) |
| **TMS AIMS** | Tarlac Montessori School | Educational ERP | DepEd Grade Computation, Form 137/138 PDF automation, Tuition Installment Ledgers | [tms.pinnacle.edu.ph/admin/login](https://tms.pinnacle.edu.ph/admin/login) |
| **Bernardo College AIMS** | Bernardo College | Higher Education ERP | Degree Audit Engine, Curriculum Verification, Registrar Clearances | [bc.pinnacle.edu.ph/admin/login](https://bc.pinnacle.edu.ph/admin/login) |
| **Philyra Cloud POS TMS** | Pinnacle Technologies / Philyra Cloud | FinTech & Cloud POS | Sub-120ms Checkout Latency, SHA-512 Security, Real-time Cloud Inventory | [pos-tms.philyra.cloud/login](https://pos-tms.philyra.cloud/login) |
| **ICCT Colleges SMS** | ICCT Colleges | High-Concurrency Portal | 50,000+ Students, 15k+ Peak Daily Concurrent Admissions, MySQL Read Replicas | [sms.icct.edu.ph/login](https://sms.icct.edu.ph/login) |

---

## 🚀 Key Features

1. **Modern Reactive Frontend (React + Tailwind CSS)**:
   - Developer aesthetic with glassmorphic cards, responsive navigation, dark theme, and glowing status indicators.
   - Filterable projects showcase with live links and in-depth **Architectural Case Studies**.
   - Technical skills matrix with visual proficiency meters across Backend, Frontend, and Cloud/DevOps.
   - Interactive Resume Hub allowing immediate viewing and downloading of your CV in Markdown format.

2. **AI Portfolio Agent ("Antigravity Engineer Agent")**:
   - Floating dockable chatbot widget available on every page.
   - Pre-trained domain knowledge base covering all 5 Pinnacle systems, Laravel MVC patterns, cloud POS cryptography, and ICCT concurrency.
   - Dual-mode architecture: communicates with the live backend (`POST /api/chat`) and has an intelligent client-side fallback engine.

3. **Full-Stack Laravel 11 MVC Backend with Vue 3**:
   - Located in `backend-laravel/`.
   - Domain controllers: `ProjectController.php`, `ProfileController.php`, `ChatController.php`, `ContactController.php`, `DashboardController.php`.
   - Preloaded database seeder (`PortfolioDatabaseSeeder.php`) with all 5 Pinnacle projects.
   - Integrated Vue 3 administrative dashboard (`resources/js/app.js` and `resources/views/app.blade.php`).

4. **Zero-Dependency API Mock Server**:
   - Located in `mock-server/server.py`.
   - Runs out of the box with Python's built-in standard library.
   - Serves `GET /api/profile`, `GET /api/projects`, `GET /api/projects/<slug>`, `GET /api/metrics`, and `POST /api/chat` with full CORS support.

5. **Interactive API Explorer**:
   - Built into the portfolio UI (`#api-explorer`), allowing recruiters and tech leads to inspect live JSON responses directly from their browser.

---

## 📁 Project Directory Structure

```
engineer-portfolio/
├── preview.html                      # Standalone zero-setup React web application
├── index.html                        # Instant entry point redirecting to preview
│
├── frontend/                         # Vite + React + Tailwind CSS Production Source
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Responsive header with AI & Resume triggers
│   │   │   ├── Hero.jsx              # High-impact introduction & metrics
│   │   │   ├── About.jsx             # Professional engineering background
│   │   │   ├── Projects.jsx          # Pinnacle deployments showcase
│   │   │   ├── ProjectModal.jsx      # Architectural case study dialog
│   │   │   ├── Skills.jsx            # Full-stack competencies matrix
│   │   │   ├── Experience.jsx        # Pinnacle timeline & milestones
│   │   │   ├── ApiTester.jsx         # Live REST endpoint inspector
│   │   │   ├── Contact.jsx           # Inquiry form & direct email
│   │   │   ├── Chatbot.jsx           # Floating AI Agent Chatbot widget
│   │   │   ├── ResumeModal.jsx       # CV viewer & Markdown export
│   │   │   └── Footer.jsx
│   │   ├── data/
│   │   │   ├── profileData.json      # ✏️ Edit your CV details here!
│   │   │   └── projectsData.js       # Pinnacle project technical metadata
│   │   ├── services/
│   │   │   ├── api.js                # Live/Mock API bridge
│   │   │   └── chatbotEngine.js      # Client fallback AI knowledge engine
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend-laravel/                  # Laravel 11 MVC Application with Vue 3
│   ├── app/Http/Controllers/
│   │   ├── Api/                      # Project, Profile, Chat, Contact Controllers
│   │   └── Admin/                    # Blade & Vue Dashboard Controller
│   ├── database/seeders/             # Preloaded with Pinnacle projects
│   ├── resources/
│   │   ├── js/app.js                 # Vue 3 Dashboard & API Tester
│   │   └── views/app.blade.php       # Blade Layout
│   ├── routes/
│   │   ├── api.php                   # REST API routes
│   │   └── web.php                   # Web MVC routes
│   └── composer.json
│
└── mock-server/                      # Python REST Mock Server
    ├── server.py                     # Runs on http://localhost:8000
    └── data/
        ├── projects.json
        └── profile.json
```

---

## ⚡ Quick Start

### 1. View the Portfolio Right Now:
Open your browser and navigate to:
```
http://localhost:3000/
```
*(Or simply open `preview.html` directly in Google Chrome, Edge, or Firefox).*

### 2. Run the Mock API Server:
In terminal:
```bash
cd mock-server
python server.py
```
This runs the REST endpoints on `http://localhost:8000`:
- `GET http://localhost:8000/api/projects`
- `GET http://localhost:8000/api/projects/pos-tms-philyra`
- `GET http://localhost:8000/api/profile`
- `GET http://localhost:8000/api/metrics`
- `POST http://localhost:8000/api/chat`

### 3. Customize Your CV / Personal Information:
Open `frontend/src/data/profileData.json` (and `mock-server/data/profile.json`) and update:
- Your full name and contact email
- LinkedIn and GitHub profiles
- Educational degrees and certifications
- Custom career summary

The frontend and AI Agent will immediately pick up your edits!

