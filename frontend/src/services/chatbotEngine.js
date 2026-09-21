import { projectsData } from '../data/projectsData';
import profileData from '../data/profileData.json';

const SYSTEM_PROMPT = `
You are the interactive AI Representative for John Matthew A. Marcelo, a Full Stack Software Developer.
Profile Information:
- Name: John Matthew A. Marcelo
- Title: Software Developer | Full Stack (Laravel · Vue.js · React)
- Email: jm.marcelo0212@gmail.com
- Phone: 0908-519-2226
- Location: Bocaue, Bulacan, Philippines
- Summary: Full Stack Developer with 3+ years of experience building responsive web applications using Laravel, Vue.js, React, and MySQL, backed by 4+ years in IT support and systems administration. Skilled in designing RESTful APIs, building component-based user interfaces, and using modern AI tools.
- Experience:
  1. Full Stack Developer at Pinnacle Technologies Inc. (March 2023 – Present), Grace Park, Caloocan.
     - Builds component-based UIs in React & Vue.js.
     - Designs Laravel server-side logic and RESTful APIs connecting frontends to MySQL.
     - Leverages AI tooling (ChatGPT, Claude, GitHub Copilot) for code acceleration.
     - Contributed to 5 flagship client systems:
       • CLDH-EI AIMS (Central Luzon Doctor's Hospital Educational Institution): https://cldh-ei.pinnacle.edu.ph/admin/login
       • TMS AIMS (Tarlac Montessori School): https://tms.pinnacle.edu.ph/admin/login
       • Bernardo College AIMS: https://bc.pinnacle.edu.ph/admin/login
       • Philyra Cloud POS & Inventory System: https://pos-tms.philyra.cloud/login (sub-120ms latency, SHA-512 security)
       • ICCT Colleges SMS (Student Management System): https://sms.icct.edu.ph/login (50,000+ students, 15,000+ daily peak admissions)
  2. Technical Support (Sept 2018 – March 2023): Hardware, Cisco networking, server administration, user training.
- Education: B.S. Computer Science from Asian Institute of Computer Studies (2014 – 2018). Best in Thesis Award (3D Educational System).

Guidelines:
1. Always respond in a polite, highly competent, professional tone.
2. Emphasize John Matthew's practical experience with Laravel MVC, Vue.js, React, and MySQL.
3. Link relevant Pinnacle projects when asked about his experience or specific portals.
4. Keep answers clear, structured with markdown, bullet points, and actionable summaries.
`;

/**
 * Direct Live LLM API Caller
 * Supports Google Gemini, OpenAI, Groq, and Local Ollama.
 */
export async function callLiveLlmApi({ provider, apiKey, model, messages }) {
  if (provider === 'gemini') {
    const geminiModel = model || 'gemini-1.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;

    const formattedContents = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const body = {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: formattedContents
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || `Gemini API error (${res.status})`);
    }

    const json = await res.json();
    const replyText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    return replyText || "No response received from Gemini.";
  }

  if (provider === 'openai') {
    const openaiModel = model || 'gpt-4o-mini';
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    const openaiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }))
    ];

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: openaiModel,
        messages: openaiMessages,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || `OpenAI API error (${res.status})`);
    }

    const json = await res.json();
    return json.choices?.[0]?.message?.content || "No response received from OpenAI.";
  }

  if (provider === 'groq') {
    const groqModel = model || 'llama-3.3-70b-versatile';
    const endpoint = 'https://api.groq.com/openai/v1/chat/completions';

    const groqMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }))
    ];

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: groqModel,
        messages: groqMessages,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || `Groq API error (${res.status})`);
    }

    const json = await res.json();
    return json.choices?.[0]?.message?.content || "No response received from Groq.";
  }

  if (provider === 'ollama') {
    const ollamaModel = model || 'llama3';
    const endpoint = 'http://localhost:11434/api/chat';

    const ollamaMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }))
    ];

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: ollamaModel,
        messages: ollamaMessages,
        stream: false
      })
    });

    if (!res.ok) {
      throw new Error(`Ollama connection error. Ensure Ollama is running at localhost:11434.`);
    }

    const json = await res.json();
    return json.message?.content || "No response from local Ollama.";
  }

  throw new Error(`Unknown provider: ${provider}`);
}

/**
 * Built-in Knowledge Engine (Offline / Zero-Config fallback)
 */
export function getLocalChatbotReply(userInput) {
  const q = userInput.toLowerCase().trim();

  // 0. Profile / Who is JM
  if (q.includes('jm') || q.includes('john matthew') || q.includes('who is') || q.includes('what is') || q.includes('about') || q.includes('bio') || q.includes('developer')) {
    return {
      reply: `**John Matthew A. Marcelo** is a **Full Stack Software Developer** with 3+ years of experience in **Laravel, Vue.js, React, and MySQL**, backed by 4+ years in IT support and systems administration.\n\n` +
        `• **Current Role:** Full Stack Developer at **Pinnacle Technologies Inc.** (since March 2023).\n` +
        `• **Flagship Client Portals:** Contributed to CLDH-EI AIMS, TMS AIMS, Bernardo College, Philyra Cloud POS, and ICCT Colleges SMS.\n` +
        `• **Academic Honor:** 🏆 **Best in Thesis Award (2018)** for '3D Educational System' (B.S. Computer Science, AICS Caloocan).\n` +
        `• **Contact:** [jm.marcelo0212@gmail.com](mailto:jm.marcelo0212@gmail.com) • 0908-519-2226\n\n` +
        `Ask me about any of his projects, technical stack, or how to get in touch!`,
      chips: ["What did you build at Pinnacle?", "Explain Philyra POS", "What is your tech stack?", "How to contact John Matthew?"]
    };
  }

  // 1. Philyra POS
  if (q.includes('pos') || q.includes('philyra') || q.includes('inventory') || q.includes('cashier') || q.includes('barcode')) {
    return {
      reply: `**Philyra Cloud Point of Sale (POS) & Inventory System** is a flagship cloud platform John Matthew Marcelo contributed to at Pinnacle Technologies.\n\n` +
        `• **Sub-120ms Checkout Latency:** Fast item barcode parsing and cashier terminal operations.\n` +
        `• **Cryptographic Security:** Client-side SHA-512 password hashing and tamper-resistant transaction tokens.\n` +
        `• **Multi-Store Inventory:** Real-time stock decrementing with ACID-compliant MySQL row locks.\n` +
        `• **Stack:** Laravel MVC, Codebase UI, Thermal Receipt Driver, and RESTful APIs.\n\n` +
        `👉 [Explore Live POS Deployment](https://pos-tms.philyra.cloud/login)`,
      chips: ["Tell me about CLDH-EI", "Show me your Laravel experience", "How to contact John Matthew?"]
    };
  }

  // 2. CLDH-EI AIMS
  if (q.includes('cldh') || q.includes('hospital') || q.includes('doctor') || q.includes('medical')) {
    return {
      reply: `**CLDH-EI Academic Information Management System (AIMS)** serves Central Luzon Doctor's Hospital Educational Institution.\n\n` +
        `• **Granular RBAC:** Granular authorization layers for Super Admins, College Deans, Faculty, and Registrars.\n` +
        `• **Automated Grading:** GPA computation, prerequisite validation, and batch Transcript of Records (TOR) generation.\n` +
        `• **Privacy & Security:** NPC compliant session security with automated idle timeouts and CSRF safeguards.\n\n` +
        `👉 [Explore Live CLDH-EI Portal](https://cldh-ei.pinnacle.edu.ph/admin/login)`,
      chips: ["Tell me about TMS AIMS", "John Matthew's role at Pinnacle", "POS system details"]
    };
  }

  // 3. TMS AIMS
  if (q.includes('tms') || q.includes('montessori') || q.includes('tarlac')) {
    return {
      reply: `**Tarlac Montessori School AIMS** is an educational management ERP custom-tailored for Montessori & K-12 operations.\n\n` +
        `• **DepEd Compliance:** Automated Form 137/138 export and quarterly grading matrices.\n` +
        `• **Financial Accounting:** Tuition installment ledgers, automated discounts, and cashier reconciliation.\n` +
        `• **Theme Engine:** Built a modular CSS variable theme architecture with AdminLTE and Laravel queued PDF jobs.\n\n` +
        `👉 [Explore Live TMS Portal](https://tms.pinnacle.edu.ph/admin/login)`,
      chips: ["Tell me about ICCT SMS", "Explain technical stack", "Download Resume"]
    };
  }

  // 4. Bernardo College
  if (q.includes('bc') || q.includes('bernardo') || q.includes('college')) {
    return {
      reply: `**Bernardo College AIMS** digitizes registrar workflows and degree audits for higher education.\n\n` +
        `• **Degree Audit Engine:** Traverses student prerequisite graphs to verify graduation qualification.\n` +
        `• **Registrar Efficiency:** Reduced manual record verification time by 85%.\n` +
        `• **Security:** MySQL relational integrity with encrypted authentication guards.\n\n` +
        `👉 [Explore Live BC Portal](https://bc.pinnacle.edu.ph/admin/login)`,
      chips: ["Tell me about all 5 projects", "Tell me about Philyra POS", "Contact John Matthew"]
    };
  }

  // 5. ICCT Colleges SMS
  if (q.includes('icct') || q.includes('sms') || q.includes('student management') || q.includes('concurrency')) {
    return {
      reply: `**ICCT Colleges Student Management System (SMS)** is a high-concurrency web platform supporting over 50,000 students.\n\n` +
        `• **Peak Capacity:** Handled **15,000+ daily concurrent admission requests** without downtime.\n` +
        `• **Data Federation:** Multi-campus branch architecture with automated student number generation.\n` +
        `• **Scalability:** Optimized MySQL read replicas, response caching, and Cloudflare rate-limiting.\n\n` +
        `👉 [Explore Live ICCT Portal](https://sms.icct.edu.ph/login)`,
      chips: ["What is your tech stack?", "Pinnacle client projects", "Contact details"]
    };
  }

  // 6. Pinnacle Overview
  if (q.includes('pinnacle') || q.includes('clients') || q.includes('projects') || q.includes('portfolio')) {
    return {
      reply: `John Matthew Marcelo has engineered and supported **5 major enterprise client systems at Pinnacle Technologies**:\n\n` +
        `1. **[CLDH-EI AIMS](https://cldh-ei.pinnacle.edu.ph/admin/login)** — Medical & College Academic ERP\n` +
        `2. **[TMS AIMS](https://tms.pinnacle.edu.ph/admin/login)** — Tarlac Montessori K-12 ERP & Tuition System\n` +
        `3. **[Bernardo College AIMS](https://bc.pinnacle.edu.ph/admin/login)** — Degree Audit & Registrar Portal\n` +
        `4. **[Philyra Cloud POS](https://pos-tms.philyra.cloud/login)** — Cloud POS & Real-Time Inventory\n` +
        `5. **[ICCT Colleges SMS](https://sms.icct.edu.ph/login)** — 50k+ Student High-Concurrency Portal\n\n` +
        `Which system would you like an in-depth breakdown of?`,
      chips: ["Philyra POS Deep Dive", "ICCT SMS Scalability", "Laravel MVC Architecture"]
    };
  }

  // 7. Tech Stack: Laravel / PHP / Vue / React
  if (q.includes('laravel') || q.includes('php') || q.includes('vue') || q.includes('react') || q.includes('stack')) {
    return {
      reply: `John Matthew's full-stack engineering stack combines **Laravel, Vue.js, and React** with robust databases:\n\n` +
        `• **Back-end:** PHP, Laravel Framework, RESTful API Design, Java, C#, VB.NET\n` +
        `• **Front-end:** React, Vue.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, Tailwind CSS, Responsive Design\n` +
        `• **Databases:** MySQL (Schema optimization & query tuning), Oracle, MongoDB\n` +
        `• **AI & Acceleration:** Prompt Engineering, ChatGPT, Claude, GitHub Copilot\n` +
        `• **Systems & DevOps:** Git, GitHub, GitLab, Linux (Red Hat, CentOS, Ubuntu), Cisco Networking (LAN/WAN)`,
      chips: ["Tell me about Pinnacle role", "AI-assisted development", "Contact John Matthew"]
    };
  }

  // 8. Education & Awards
  if (q.includes('education') || q.includes('college') || q.includes('award') || q.includes('thesis') || q.includes('degree')) {
    return {
      reply: `**Education & Academic Honors:**\n\n` +
        `• **B.S. in Computer Science** — Asian Institute of Computer Studies (AICS), Caloocan City (2014 – 2018)\n` +
        `• **🏆 Best in Thesis (2018):** "3D Educational System" — Recognized for outstanding software architecture and interactive pedagogical design.\n` +
        `• **Accounting & Loan Internships:** Bayanihan St. John Cooperative (300 hrs) & Best Choice Inc. (300 hrs).`,
      chips: ["View Pinnacle Experience", "Technical Skills", "Contact John Matthew"]
    };
  }

  // 9. Contact / Hire
  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('phone') || q.includes('reach')) {
    return {
      reply: `You can reach John Matthew A. Marcelo directly:\n\n` +
        `• **Email:** [jm.marcelo0212@gmail.com](mailto:jm.marcelo0212@gmail.com)\n` +
        `• **Phone:** 0908-519-2226\n` +
        `• **Location:** Bocaue, Bulacan, Philippines (Open to Remote / Hybrid / On-site)\n\n` +
        `Feel free to use the contact form on this portfolio to send a message directly!`,
      chips: ["Download CV", "View Pinnacle Projects", "Ask about technical skills"]
    };
  }

  // Default welcome response
  return {
    reply: `👋 Hello! I am the **AI Portfolio Agent** for **John Matthew A. Marcelo**.\n\n` +
      `Ask me anything about:\n` +
      `• **Pinnacle Client Systems:** CLDH-EI, TMS, Bernardo College, Philyra Cloud POS, or ICCT SMS\n` +
      `• **Technical Stack:** Laravel MVC, Vue.js, React, MySQL, REST APIs, and Linux\n` +
      `• **Experience & Education:** 3+ years full-stack, 4+ years IT/systems admin, Best in Thesis\n` +
      `• **Contact Information:** Direct email (jm.marcelo0212@gmail.com) and phone (0908-519-2226)`,
    chips: ["What did you build at Pinnacle?", "Explain Philyra POS", "What is your tech stack?", "How to contact John Matthew?"]
  };
}
