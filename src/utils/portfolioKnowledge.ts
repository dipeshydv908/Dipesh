export interface KnowledgeMatch {
  reply: string;
  suggestedAction?: {
    label: string;
    actionType: 'resume' | 'section';
    target?: string;
  };
}

export const PORTFOLIO_FACTS_TEXT = `
DIPESH'S VERIFIED PORTFOLIO KNOWLEDGE BASE:

1. IDENTITY & BIO:
- Name: Dipesh
- Status: Computer Science Engineering Student & Aspiring Software Developer (2nd Year)
- Degree: Bachelor of Technology in Computer Science & Engineering (B.Tech CSE, 2025 – 2029)
- College / University: Global Institute of Technology, Jaipur (Rajasthan, India)
- Location: Jaipur, Rajasthan, India
- Email: dipeshydv908@gmail.com
- GitHub: https://github.com/dipeshydv908
- GitHub Repository: https://github.com/dipeshydv908/Dipesh-portfolio
- Live Portfolio: https://dipesh-portfolio-rose.vercel.app/

2. TECHNICAL SKILLS:
- Core Languages: C, C++, Python, JavaScript, TypeScript
- Web & Frontend: HTML5, CSS3, Tailwind CSS, React 19, Vite, Modern Responsive Design
- Cloud & DevOps: AWS Cloud (Amazon EC2, Amazon S3, DynamoDB, AWS Lambda, Amazon CloudWatch, Boto3 SDK, AWS CLI)
- Artificial Intelligence: Generative AI Foundations, Prompt Engineering, Azure Cognitive Services (Computer Vision, Image Analysis API), Edge AI Systems
- Tools & Environments: Git, GitHub, Linux, VS Code, REST APIs, JSON

3. CREATIVE MEDIA SKILLS:
- Photo Editing (high-frequency separation, color grading, lighting adjustment)
- Video Editing (pacing, cuts, multi-track audio)
- Social Media Visual Design (carousels, graphics)
- Tools: Adobe Photoshop, Lightroom, Premiere Pro, After Effects, Figma

4. FEATURED PROJECTS:
- To-Do List Web Application: Responsive task manager engineered with modern AI-assisted rapid development (Bolt.new / Lovable) and browser localStorage for zero-latency, zero-backend persistence.
- AI-Powered Personal Assistant: Intelligent autonomous assistant automating productivity workflows and query answering via natural language processing (Python, AI APIs).
- Smart Car Parking System: Automated parking slot availability tracker with HC-SR04 ultrasonic sensors, 16x2 I2C LCD, and Arduino UNO (Embedded C/C++).
- Personal Portfolio Website: Responsive modern developer portfolio with Three.js 3D spatial particles, dark glassmorphism, ATS single-page A4 PDF resume generator, and AI assistant.

5. INTERNSHIPS & INDUSTRY EXPERIENCE:
- CodeUp: AI Edge Engineering Intern (22 June 2026 – 08 July 2026). Intensive 15-Day AI Edge Internship Program. Certificate ID: CODEUP-AIEDGE-2026 under mentor Priyanka Jangid.
- InternPe: Python Programming Intern (08 June 2026 – 22 June 2026). Certificate ID: IPI#80510 (verified via https://internpe.in/verify.html). Focused on core Python engineering, OOP structures, and automated scripting.
- LinuxWorld #13: Python with AWS Cloud Engineering Training (13 July 2026 – 27 July 2026). 20+ hours of hands-on cloud training and 5 production-ready deployments with Boto3, EC2, S3, and Lambda. Certificate ID: LW-JPR-2026-5309.
- CODEFIESTA Hackathon 4.0: 24-Hour Hackathon Competitor & Builder at Global Institute of Technology, Jaipur (09–10 October 2025). Certificate ID: GITJ-CF4-2025.

6. 8 OFFICIAL VERIFIED CERTIFICATES:
1. Certificate of AI Edge Internship Program (CodeUp) - ID: CODEUP-AIEDGE-2026
2. TCS iON Career Edge - AI Foundation (TCS iON / Tata Consultancy Services) - ID: 279243-32356944-1016
3. TCS iON Career Edge - Young Professional (TCS iON / Tata Consultancy Services) - ID: 272697-32356944-1016
4. Build a Computer Vision App with Azure Cognitive Services (Microsoft / Coursera) - ID: H494N60BDPKZ
5. Python Programming Internship Completion Certificate (InternPe) - ID: IPI#80510
6. CODEFIESTA Hackathon 4.0 Certificate of Achievement (GIT Jaipur) - ID: GITJ-CF4-2025
7. Python with AWS Cloud Training (LinuxWorld #13) - ID: LW-JPR-2026-5309
8. Generative Artificial Intelligence (IBM SkillsBuild) - ID: PLAN-48EB3211A34F

7. RESUME & CONTACT:
- Resume: Can be downloaded as a genuine single-page A4 ATS PDF (Dipesh_Resume.pdf) via the "Download Resume" buttons across the site, or inspected in the modal. Contains B.Tech 2nd Year at GIT Jaipur, skills in C, C++, HTML, CSS, AI Edge workshop internship at CodeUp, and To-Do List project with localStorage.
- Contact: dipeshydv908@gmail.com, GitHub https://github.com/dipeshydv908, or via the on-page Contact form.
`;

export function getVerifiedKnowledgeReply(userQuery: string): KnowledgeMatch {
  const query = userQuery.toLowerCase().trim();

  // Who is Dipesh / Background / About
  if (
    query.includes('who is') ||
    query.includes('who are you') ||
    query.includes('about dipesh') ||
    query.includes('introduce') ||
    query.includes('background') ||
    query.includes('bio')
  ) {
    return {
      reply: `**Dipesh** is a Computer Science Engineering student (B.Tech CSE, 2nd Year, 2025–2029) at **Global Institute of Technology, Jaipur** (Rajasthan, India).

He is an aspiring software developer with verified competencies in:
• **Core Programming & Systems** (C, C++, Python, HTML, CSS, JavaScript, TypeScript)
• **AI & Cloud Engineering** (CodeUp AI Edge Internship, Generative AI, Microsoft Azure Computer Vision, AWS Cloud)
• **Modern Web Projects** (To-Do List with localStorage, Personal Portfolio, AI Assistant)
• **Creative Visual Design** (Photo & Video Editing with Photoshop and Premiere Pro)

He completed the 15-day AI Edge workshop internship at CodeUp and is actively seeking software engineering and AI internship opportunities!`,
      suggestedAction: {
        label: 'Explore About Section',
        actionType: 'section',
        target: '#about',
      },
    };
  }

  // Technical Skills / Programming Languages
  if (
    query.includes('skill') ||
    query.includes('tech stack') ||
    query.includes('language') ||
    query.includes('c++') ||
    query.includes('python') ||
    query.includes('html') ||
    query.includes('css') ||
    query.includes('programming') ||
    query.includes('tools')
  ) {
    return {
      reply: `Here are Dipesh's confirmed, verified technical skills:

**Core Languages:**
• **C & C++** (Data structures, pointers, OOP, algorithmic logic)
• **Python** (OOP, automation scripting, data processing — InternPe certified)
• **HTML5 & CSS3** (Semantic layout, responsive design, Flexbox, Grid, media queries)
• **JavaScript & TypeScript** (Type-safe client architectures, modern ES6+)

**Web Technologies:**
• React 19, Tailwind CSS, Vite, browser localStorage persistence, AI rapid development tools (Bolt.new / Lovable)

**Artificial Intelligence & Cloud:**
• 15-Day AI Edge Systems program (CodeUp)
• Azure Cognitive Services (Computer Vision, Image Analysis API — Microsoft)
• TCS iON Career Edge (AI Foundation)
• AWS Cloud (EC2, S3, DynamoDB, Lambda, Boto3 SDK)

**DevOps & Tools:**
• Git & GitHub, Linux CLI, VS Code`,
      suggestedAction: {
        label: 'View Skills Section',
        actionType: 'section',
        target: '#skills',
      },
    };
  }

  // Projects
  if (
    query.includes('project') ||
    query.includes('what has he built') ||
    query.includes('portfolio work') ||
    query.includes('to-do') ||
    query.includes('todo') ||
    query.includes('bolt') ||
    query.includes('lovable')
  ) {
    return {
      reply: `Dipesh has built several practical software and web projects:

1. **To-Do List Web Application (Featured):**
   • Built using modern AI-assisted rapid development platforms (**Bolt.new / Lovable**)
   • Engineered with zero-backend local persistence using browser **localStorage**
   • Features dynamic filtering (All / Active / Completed), inline status toggles, and responsive mobile styling
   • You can test an interactive simulator directly in the Projects section!

2. **AI-Powered Personal Assistant:**
   • Intelligent assistant designed to execute productivity workflows using NLP and external AI APIs (*Python, AI*).

3. **Smart Car Parking System:**
   • Automated slot detection using HC-SR04 ultrasonic sensors, 16x2 I2C LCD, and Arduino UNO (*Embedded C/C++*).

4. **Personal Portfolio Website:**
   • Modern responsive developer portfolio with Three.js 3D particles, single-page A4 ATS PDF generator, and AI chatbot.`,
      suggestedAction: {
        label: 'View Featured Projects',
        actionType: 'section',
        target: '#projects',
      },
    };
  }

  // Internship / Experience / Work
  if (
    query.includes('intern') ||
    query.includes('experience') ||
    query.includes('work') ||
    query.includes('internpe') ||
    query.includes('codeup') ||
    query.includes('edge') ||
    query.includes('linuxworld') ||
    query.includes('training')
  ) {
    return {
      reply: `Dipesh has completed the following verified industry internships and training milestones:

1. **CodeUp — 15-Day AI Edge Internship Program** (22 June 2026 – 08 July 2026)
   • Verified Credential ID: **CODEUP-AIEDGE-2026**
   • Engineered edge computing algorithms, evaluated AI models for low latency, and automated data scripts under mentor Priyanka Jangid.

2. **InternPe — Python Programming Intern** (08 June 2026 – 22 June 2026)
   • Verified Credential ID: **IPI#80510** (AICTE & MSME recognized)
   • Focused on Python OOP, algorithm design, and exception handling.

3. **LinuxWorld #13 — Python with AWS Cloud Trainee** (13 July 2026 – 27 July 2026)
   • Verified Credential ID: **LW-JPR-2026-5309**
   • Completed 20+ hours of hands-on cloud engineering with 5 real-world deployments using Boto3, EC2, S3, and Lambda.

4. **CODEFIESTA Hackathon 4.0** (09–10 October 2025)
   • 24-Hour competitive hackathon at Global Institute of Technology, Jaipur.`,
      suggestedAction: {
        label: 'View Experience Milestones',
        actionType: 'section',
        target: '#experience',
      },
    };
  }

  // Certificates / Credentials
  if (
    query.includes('cert') ||
    query.includes('credential') ||
    query.includes('achievement') ||
    query.includes('verified')
  ) {
    return {
      reply: `Dipesh holds **8 official verified credentials**:

1. **Certificate of AI Edge Internship Program** — CodeUp (ID: \`CODEUP-AIEDGE-2026\`)
2. **TCS iON Career Edge - AI Foundation** — Tata Consultancy Services (ID: \`279243-32356944-1016\`)
3. **TCS iON Career Edge - Young Professional** — Tata Consultancy Services (ID: \`272697-32356944-1016\`)
4. **Build a Computer Vision App with Azure Cognitive Services** — Microsoft / Coursera (ID: \`H494N60BDPKZ\`)
5. **Python Programming Internship Completion Certificate** — InternPe (ID: \`IPI#80510\`)
6. **CODEFIESTA Hackathon 4.0 Achievement** — GIT Jaipur (ID: \`GITJ-CF4-2025\`)
7. **Python with AWS Cloud Training** — LinuxWorld #13 (ID: \`LW-JPR-2026-5309\`)
8. **Generative Artificial Intelligence** — IBM SkillsBuild (ID: \`PLAN-48EB3211A34F\`)

All 8 certificates can be viewed in high resolution with credential IDs in the Certificates section!`,
      suggestedAction: {
        label: 'View Official Certificates',
        actionType: 'section',
        target: '#certificates',
      },
    };
  }

  // Resume / CV
  if (
    query.includes('resume') ||
    query.includes('cv') ||
    query.includes('download') ||
    query.includes('hire') ||
    query.includes('print')
  ) {
    return {
      reply: `You can download Dipesh's official, single-page A4 ATS-friendly resume (**Dipesh_Resume.pdf**) directly!

**Verified Resume Content:**
• **Candidate:** Dipesh (2nd Year B.Tech CSE Student)
• **College:** Global Institute of Technology, Jaipur
• **Technical Skills:** C, C++, HTML, CSS, Git, GitHub
• **Internship:** AI Edge Workshop Intern at CodeUp (15-Day AI Edge Program)
• **Featured Project:** To-Do List Web Application with browser localStorage persistence
• **Format:** ATS-compliant single A4 page with clickable portfolio & GitHub links

Click below to download immediately:`,
      suggestedAction: {
        label: 'Download Dipesh_Resume.pdf',
        actionType: 'resume',
      },
    };
  }

  // Contact / Email / GitHub
  if (
    query.includes('contact') ||
    query.includes('email') ||
    query.includes('github') ||
    query.includes('reach') ||
    query.includes('message')
  ) {
    return {
      reply: `You can contact Dipesh through the following channels:

• **Email:** [dipeshydv908@gmail.com](mailto:dipeshydv908@gmail.com)
• **GitHub:** [https://github.com/dipeshydv908](https://github.com/dipeshydv908)
• **GitHub Repository:** [https://github.com/dipeshydv908/Dipesh-portfolio](https://github.com/dipeshydv908/Dipesh-portfolio)
• **Live Portfolio:** [https://dipesh-portfolio-rose.vercel.app/](https://dipesh-portfolio-rose.vercel.app/)
• **Location:** Jaipur, Rajasthan, India

You can also send a direct message using the interactive form in the Contact section!`,
      suggestedAction: {
        label: 'Jump to Contact Form',
        actionType: 'section',
        target: '#contact',
      },
    };
  }

  // Education / College / Degree
  if (
    query.includes('education') ||
    query.includes('college') ||
    query.includes('university') ||
    query.includes('git') ||
    query.includes('b.tech')
  ) {
    return {
      reply: `Dipesh is pursuing his **Bachelor of Technology (B.Tech, 2nd Year) in Computer Science & Engineering**:

• **Institution:** Global Institute of Technology, Jaipur (Rajasthan, India)
• **Academic Period:** 2025 – 2029
• **Status:** Active Undergraduate (2nd Year)
• **Coursework:** C, C++, Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Computer Architecture, Artificial Intelligence foundations.`,
      suggestedAction: {
        label: 'View Education in About',
        actionType: 'section',
        target: '#about',
      },
    };
  }

  // Default honest fallback
  return {
    reply: `I only have access to verified facts from **Dipesh's official developer portfolio**. 

I cannot confirm details outside of his documented education, skills, projects, internships, and verified credentials.

Please feel free to ask about:
• His technical skills (C, C++, HTML, CSS, Python, AI)
• His projects (To-Do List app with localStorage, AI Assistant, etc.)
• His 15-day AI Edge internship at CodeUp
• His 8 verified credentials
• Viewing or downloading his single-page A4 resume
• Contacting him directly at **dipeshydv908@gmail.com**`,
  };
}
