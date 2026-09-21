export const projectsData = [
  {
    id: 1,
    slug: "cldh-ei-aims",
    title: "CLDH-EI Academic Information Management System (AIMS)",
    subtitle: "Central Luzon Doctor's Hospital Educational Institution",
    client: "CLDH-EI / Pinnacle Technologies",
    url: "https://cldh-ei.pinnacle.edu.ph/admin/login",
    category: "Enterprise ERP",
    featured: true,
    badge: "Production Live",
    role: "Full Stack Software Engineer",
    summary: "Full-scale enterprise academic management platform for medical and allied health education, handling student admissions, grade submissions, faculty evaluations, and registrar operations.",
    description: "CLDH-EI AIMS is an institutional-scale web portal powering the daily educational and administrative operations of Central Luzon Doctor's Hospital Educational Institution. It orchestrates student enrollment pipelines, automated grade encoding with prerequisite checking, faculty workload scheduling, and transcript of records (TOR) auditing.",
    key_features: [
      "Granular Role-Based Access Control (RBAC) across Super Admin, Deans, Program Chairs, Faculty, and Registrars",
      "Automated Grade Encoding, GPA calculation, and batch Transcript of Records (TOR) generation",
      "Real-time Class Scheduling and Conflict Detection Algorithm",
      "National Privacy Commission (NPC) compliant session security & data privacy protections",
      "Interactive analytics dashboard for dean monitoring and student retention tracking"
    ],
    architecture: {
      frontend: "Modern Responsive UI, AdminLTE, Bootstrap, jQuery, WebRTC & DataTables",
      backend: "Laravel MVC, Eloquent ORM, Service Repository Pattern, RESTful APIs",
      database: "MySQL with optimized relational schema, automated database indexing",
      security: "CSRF tokens, encrypted sessions, secure authentication guards, anti-tamper client defense"
    },
    metrics: {
      active_users: "5,000+ Students & Staff",
      speed: "99.8% Faster Batch Computation",
      uptime: "99.9% Production Uptime"
    },
    tech_stack: ["Laravel", "PHP", "MySQL", "AdminLTE", "REST API", "RBAC", "Bootstrap"],
    challenges: [
      "Ensuring sub-second grade encoding performance when hundreds of faculty members submit grades simultaneously before semester deadlines.",
      "Implementing strict National Privacy Commission (NPC) student record governance and immutable audit logs."
    ],
    solutions: [
      "Engineered queued batch processing and optimized MySQL indexing for grade sheets and GPA calculations.",
      "Implemented strict session expiration guards, CSRF mitigation, and role-based audit trail middleware."
    ]
  },
  {
    id: 2,
    slug: "tms-aims",
    title: "Tarlac Montessori School AIMS",
    subtitle: "K-12 & Montessori Administration ERP",
    client: "Tarlac Montessori School / Pinnacle Technologies",
    url: "https://tms.pinnacle.edu.ph/admin/login",
    category: "Educational ERP",
    featured: true,
    badge: "Production Live",
    role: "Full Stack Software Engineer",
    summary: "Customized school administration ERP driving student lifecycle from enrollment to graduation, integrating K-12 grading standards, tuition billing, and attendance tracking.",
    description: "Designed and engineered tailored educational management software specifically calibrated to Montessori and basic education curricula. Automated complex quarterly grading matrices, report card generation, tuition installment accounting, and faculty assignments.",
    key_features: [
      "Automated DepEd-compliant quarterly grade computation & Form 137/138 export",
      "Student financial ledger: tuition installment tracking, automated discount computation, and cashier reconciliation",
      "Configurable dynamic skin and theme architecture with CSS custom properties",
      "Security seal verification & automated session idle timeout prevention",
      "Parent/Guardian reporting module with attendance alerts"
    ],
    architecture: {
      frontend: "Custom CSS Variables Design System, AdminLTE, Bootstrap, jQuery, Animate.css",
      backend: "Laravel MVC, Artisan command automation, queued PDF generation",
      database: "MySQL, multi-year academic historical archiving",
      security: "Anti-debugging client shields, CSRF protection, rate limiting"
    },
    metrics: {
      active_users: "10,000+ Cumulative Profiles",
      speed: "Instant batch PDF reports",
      adoption: "100% Registrar operational adoption"
    },
    tech_stack: ["Laravel", "PHP", "MySQL", "Bootstrap", "ERP", "PDF Automation", "EdTech"],
    challenges: [
      "Generating hundreds of customized DepEd Form 137/138 report cards during report card distribution week without blocking HTTP requests.",
      "Supporting dynamic multi-school visual branding without code duplication."
    ],
    solutions: [
      "Leveraged asynchronous Laravel background job workers to generate high-fidelity PDF cards.",
      "Designed a centralized CSS variable-driven theming architecture loaded dynamically per institution."
    ]
  },
  {
    id: 3,
    slug: "bc-aims",
    title: "Bernardo College Academic Portal (BC AIMS)",
    subtitle: "Higher Education Degree Audit & Registrar Portal",
    client: "Bernardo College / Pinnacle Technologies",
    url: "https://bc.pinnacle.edu.ph/admin/login",
    category: "Enterprise ERP",
    featured: false,
    badge: "Production Live",
    role: "Full Stack Software Engineer",
    summary: "Higher education academic portal delivering registrar operations, course prerequisites evaluation, curriculum audit, and faculty management.",
    description: "Developed robust academic infrastructure for Bernardo College to digitize previously paper-heavy registrar and dean workflows. Built high-accuracy degree audit algorithms to evaluate graduation prerequisites across degree programs.",
    key_features: [
      "Curriculum tree verification & degree prerequisite tracking",
      "Faculty loading, room allocation, and curriculum scheduling matrices",
      "Online student clearances, document requests, and graduation tracking",
      "Unified password reset and self-service account recovery system",
      "Fine-grained auditing of student record modifications"
    ],
    architecture: {
      frontend: "AdminLTE responsive portal, custom styling, mobile-optimized viewports",
      backend: "Laravel MVC architecture, custom middleware authorization",
      database: "MySQL with foreign key constraints and transactional integrity",
      security: "Encrypted credentials, CSRF tokens, strict session expiration"
    },
    metrics: {
      efficiency: "85% reduction in manual verification time",
      concurrency: "Seamless peak enrollment handling without downtime"
    },
    tech_stack: ["Laravel", "PHP", "MySQL", "Academic ERP", "Registrar System", "REST API"],
    challenges: [
      "Complex prerequisite prerequisite validation spanning multi-curriculum revisions over decades of legacy student records."
    ],
    solutions: [
      "Built a recursive curriculum graph traversal service in Laravel to validate student prerequisites instantaneously."
    ]
  },
  {
    id: 4,
    slug: "pos-tms-philyra",
    title: "Philyra Cloud Point of Sale (POS) & Inventory System",
    subtitle: "Enterprise Cloud POS, Barcode Engine & Multi-Store Inventory",
    client: "Pinnacle Technologies, Inc. / Philyra Cloud",
    url: "https://pos-tms.philyra.cloud/login",
    category: "Cloud SaaS / FinTech",
    featured: true,
    badge: "Cloud SaaS Live",
    role: "Full Stack Software Engineer",
    summary: "High-speed cloud-based Point of Sale and Inventory Management System with real-time cashier checkout, barcode integration, receipt printing, and cryptographic security.",
    description: "Architected and implemented a high-performance, modern cloud POS application hosted on Philyra Cloud. Built for rapid item lookups, offline-tolerant cashier scanning, inventory stock synchronization, and end-of-day Z-reading financial reports.",
    key_features: [
      "Blazing-fast cashier checkout interface with instant barcode scanner parsing",
      "Real-time multi-location inventory depletion and low-stock reorder triggers",
      "SHA-512 client-side password hashing and secure token transmission",
      "Thermal receipt printing, cash drawer kick triggering, and discount calculation",
      "Financial analytics dashboard: profit margin analysis, hourly sales heatmaps, cashier shift audits"
    ],
    architecture: {
      frontend: "Codebase UI framework, responsive dark/light layouts, floating input labels, jQuery Validation, SHA-512 JS crypto engine",
      backend: "PHP / Laravel MVC, RESTful transactional APIs, optimized accounting ledgers",
      database: "MySQL with strict ACID transaction rollbacks for multi-register environments",
      security: "SHA-512 cryptographic hashing, Cloudflare CDN integration, secure cookies, brute-force mitigation"
    },
    metrics: {
      speed: "< 120ms per sale submission",
      accuracy: "99.999% Inventory balance consistency",
      uptime: "99.95% Cloud SLA"
    },
    tech_stack: ["Laravel", "PHP", "Cloud POS", "Inventory Management", "SHA-512", "Codebase UI", "FinTech"],
    challenges: [
      "Ensuring zero inventory discrepancies when multiple cashier registers ring up the same SKU at the exact same second.",
      "Optimizing checkout latency to prevent lines during peak retail/campus rush hours."
    ],
    solutions: [
      "Implemented database row-level locking with pessimistic concurrency control during final checkout balance deduction.",
      "Lightweight client-side barcode buffer parser delivering sub-120ms checkout confirmations."
    ]
  },
  {
    id: 5,
    slug: "icct-sms",
    title: "ICCT Colleges Student Management System (SMS)",
    subtitle: "High-Concurrency Student Admission & Academic Portal",
    client: "ICCT Colleges / Pinnacle Technologies",
    url: "https://sms.icct.edu.ph/login",
    category: "High-Concurrency Portal",
    featured: true,
    badge: "High Concurrency",
    role: "Full Stack Software Engineer",
    summary: "Large-scale centralized student admission, enrollment, and credentials platform supporting tens of thousands of applicants and active college students.",
    description: "Engineered the core high-concurrency student management system for ICCT Colleges. The platform serves as the central digital doorway for online entrance applications, student ID generation, grade inquiries, and academic standing verification across multiple campus branches.",
    key_features: [
      "Massive-scale online student onboarding & automated student number generation",
      "Multi-campus data federation supporting diverse college departments and branches",
      "Integrated helpdesk & emergency hotline dispatch integration",
      "Self-service student password credentialing and profile maintenance",
      "High-throughput load handling during semester rush enrollment periods"
    ],
    architecture: {
      frontend: "Modern lightweight web client, optimized mobile-first responsive design",
      backend: "Laravel / PHP enterprise microservices, load-balanced API routing",
      database: "High-availability MySQL cluster with read replicas for student grade queries",
      security: "HTTPS enforcement, Cloudflare rate-limiting, secure session rotation"
    },
    metrics: {
      capacity: "50,000+ Enrolled Students",
      concurrency: "15,000+ Daily Peak Admissions",
      latency: "Sub-second response under enrollment rush"
    },
    tech_stack: ["Laravel", "PHP", "High Concurrency", "MySQL Cluster", "Student Portal", "REST APIs", "SaaS"],
    challenges: [
      "Handling sudden traffic surges of 15,000+ simultaneous applicants attempting to enroll on the opening day of enrollment.",
      "Preventing duplicate student accounts and identity collisions."
    ],
    solutions: [
      "Implemented intelligent database read replicas, caching frequently queried degree program lists, and distributed queue workers.",
      "Constructed a multi-parameter deduplication hashing algorithm for incoming student profile registrations."
    ]
  }
];

