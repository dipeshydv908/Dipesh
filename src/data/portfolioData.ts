import { ProjectItem, CertificateItem, ExperienceItem, CreativeItem, EducationItem, SocialLinks, TechnicalSkillItem, CreativeSkillItem } from '../types';

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
  // [EDITABLE PLACEHOLDER]: Update LinkedIn vanity URL when ready
  linkedin: 'https://www.linkedin.com/in/dipesh-developer',
  github: 'https://github.com/dipeshydv908',
  email: 'dipeshydv908@gmail.com',
  portfolio: 'https://dipesh-portfolio-rose.vercel.app/',
  resumeUrl: '/Dipesh_Resume.pdf',
};

export const INITIAL_EDUCATION: EducationItem = {
  institution: 'Global Institute of Technology, Jaipur',
  degree: 'Bachelor of Technology (B.Tech), 2nd Year',
  field: 'Computer Science Engineering (CSE)',
  duration: '2025 – 2029',
  location: 'Jaipur, Rajasthan, India',
  status: 'Active Undergraduate (2nd Year)',
  highlights: [
    'Core Engineering Curriculum: C, C++, Data Structures & Algorithms, Object-Oriented Design, Computer Architecture',
    'Specialized Focus: Artificial Intelligence, Machine Learning Foundations, Web Technologies & Database Systems',
    'Active Hackathon Competitor: 24-hour sprint builder at CODEFIESTA 4.0 (GIT Jaipur)',
    'Practical Engineering Ethos: Synthesizing core systems code with modern reactive web development'
  ],
  // [EDITABLE PLACEHOLDER]: Add verified CGPA / Percentage once university publishes official semester grade cards
  cgpaPlaceholder: 'Official CGPA to be updated following semester result publication'
};

export const TECHNICAL_SKILLS: TechnicalSkillItem[] = [
  {
    name: 'C',
    category: 'Core',
    level: 88,
    icon: 'cpu',
    verified: true,
    description: 'Foundational systems programming, memory management, pointers, and data structure implementations.'
  },
  {
    name: 'C++',
    category: 'Core',
    level: 85,
    icon: 'binary',
    verified: true,
    description: 'Object-oriented programming, STL containers, algorithmic efficiency, and computational logic.'
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Web',
    level: 92,
    icon: 'globe',
    verified: true,
    description: 'Semantic markup, modern responsive CSS layouts, Flexbox, CSS Grid, media queries, and accessible UI.'
  },
  {
    name: 'Python',
    category: 'Core',
    level: 90,
    icon: 'code-2',
    verified: true,
    description: 'OOP architectures, automation scripts, data handling, and algorithmic problem solving (InternPe certified).'
  },
  {
    name: 'Artificial Intelligence',
    category: 'AI & Cloud',
    level: 86,
    icon: 'sparkles',
    verified: true,
    description: 'AI foundation concepts, prompt engineering, generative models, edge AI systems, and Microsoft Azure Computer Vision.'
  },
  {
    name: 'Git & GitHub',
    category: 'DevOps & Tools',
    level: 88,
    icon: 'git-branch',
    verified: true,
    description: 'Version control branching, commits, pull requests, collaborative repository workflows, and code hosting.'
  },
  {
    name: 'Responsive Web Development',
    category: 'Web',
    level: 94,
    icon: 'smartphone',
    verified: true,
    description: 'Mobile-first design principles, cross-device compatibility, modern component hierarchy, and zero-pill UI layouts.'
  },
  {
    name: 'AWS Cloud Services',
    category: 'AI & Cloud',
    level: 80,
    icon: 'cloud',
    verified: true,
    description: 'Boto3 SDK scripting, Amazon EC2, S3, DynamoDB, and AWS Lambda deployments (LinuxWorld certified).'
  }
];

export const CREATIVE_SKILLS: CreativeSkillItem[] = [
  { name: 'Photo Editing', tools: 'Lightroom, Photoshop', highlight: 'Raw processing, color balance & dynamic range recovery' },
  { name: 'Video Editing', tools: 'Premiere Pro, After Effects', highlight: 'Pacing, sound design, transitions & motion graphics' },
  { name: 'Social Media Design', tools: 'Figma & Photoshop', highlight: 'High-CTR visual posts, banners & carousels' },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-todo',
    title: 'To-Do List Web Application',
    subtitle: 'AI-Assisted Task Manager with Local Persistence',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bolt.new / Lovable', 'localStorage API', 'Responsive UI'],
    description: 'A responsive and intuitive task management application engineered using modern AI-assisted rapid development platforms (Bolt.new / Lovable). Architected with zero-backend local persistence via browser localStorage, real-time task lifecycle management (create, toggle complete, edit, filter, and delete), and intuitive mobile-first responsive styling.',
    badge: 'Verified Web Project',
    featured: true,
    githubUrl: 'https://github.com/dipeshydv908/Dipesh-portfolio',
    liveDemoUrl: 'https://dipesh-portfolio-rose.vercel.app/',
    features: [
      'Zero-latency client-side data persistence powered by browser localStorage API',
      'Rapidly designed and structured using AI-driven development platforms (Bolt.new / Lovable)',
      'Comprehensive task lifecycle: dynamic status filters (All / Active / Completed), inline edits, and persistent state',
      'Clean, accessible, responsive interface tested across mobile and desktop viewports',
      'Instant interactive simulator embedded directly in this portfolio for live testing'
    ]
  },
  {
    id: 'proj-1',
    title: 'AI-Powered Personal Assistant',
    subtitle: 'Intelligent Autonomous Agent',
    technologies: ['Python', 'Artificial Intelligence', 'NLP', 'APIs', 'Speech Recognition'],
    description: 'An intelligent assistant designed to help users perform tasks using AI. Integrates natural language processing to automate productivity workflows, query answering, and user operations with intuitive execution.',
    badge: 'Featured AI Project',
    githubUrl: 'https://github.com/dipeshydv908',
    liveDemoUrl: '',
    features: [
      'Natural language query parsing and intention recognition',
      'Task automation pipelines for operating system and web operations',
      'Integration with external AI foundation models and APIs',
      'Modular architecture enabling rapid extension of custom skill modules'
    ]
  },
  {
    id: 'proj-2',
    title: 'Smart Car Parking System',
    subtitle: 'IoT & Hardware Automation',
    technologies: ['Arduino UNO', 'HC-SR04 Ultrasonic Sensors', 'LCD (I2C)', 'LEDs', 'Embedded C/C++'],
    description: 'An automated parking system that detects parking-slot availability using ultrasonic sensors. Provides real-time visual feedback on LCD displays and safety audio alerts to eliminate congestion.',
    badge: 'IoT Hardware',
    githubUrl: 'https://github.com/dipeshydv908',
    liveDemoUrl: '',
    features: [
      'Multi-slot distance tracking with HC-SR04 ultrasonic sensors',
      'Real-time vacant slot counters displayed on 16x2 I2C LCD',
      'Dynamic RGB visual indicator states and automated barrier alert triggers',
      'Power-efficient embedded C/C++ control loops written for Arduino UNO'
    ]
  },
  {
    id: 'proj-3',
    title: 'Personal Portfolio Website',
    subtitle: 'Futuristic Developer Experience',
    technologies: ['TypeScript', 'React 19', 'Tailwind CSS', 'Three.js', 'Express', 'Vite'],
    description: 'A responsive modern developer portfolio showcasing skills, projects, achievements, and certificates with interactive 3D spatial visuals, dark glassmorphism, recruiter-ready ATS PDF resume generator, and an AI assistant.',
    badge: 'Live Web App',
    githubUrl: 'https://github.com/dipeshydv908/Dipesh-portfolio',
    liveDemoUrl: 'https://dipesh-portfolio-rose.vercel.app/',
    features: [
      'Interactive 3D particle constellation canvas via Three.js with hardware acceleration',
      'Single-page A4 ATS-friendly PDF resume generator created with jsPDF',
      'Authentic certificate viewer with high-resolution lightbox and verified credential IDs',
      'Interactive AI portfolio assistant powered by verified knowledge base'
    ]
  }
];

export const INITIAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-codeup-aiedge',
    role: 'AI Edge Engineering Intern',
    organization: 'CodeUp',
    location: 'Hybrid / Virtual',
    duration: '22 June 2026 – 08 July 2026',
    type: 'internship',
    featured: true,
    description: 'Successfully completed the intensive 15-Day AI Edge Internship Program, implementing AI workflows, computational algorithms, and software logic under mentor supervision.',
    highlights: [
      'Engineered edge computing algorithms and evaluated lightweight AI models for low-latency inference',
      'Authored clean, maintainable Python scripts for data manipulation, cleaning, and processing pipelines',
      'Completed verified program milestones under the mentorship of Priyanka Jangid',
      'Earned official Certificate of AI Edge Internship Program (Credential ID: CODEUP-AIEDGE-2026)'
    ],
    certificateId: 'cert-codeup-aiedge',
    technologies: ['Python', 'AI Edge Systems', 'Machine Learning', 'Data Structures', 'Automation Scripting']
  },
  {
    id: 'exp-internpe',
    role: 'Python Programming Intern',
    organization: 'InternPe',
    location: 'Virtual / Remote',
    duration: '08 June 2026 – 22 June 2026',
    type: 'internship',
    featured: false,
    description: 'Completed a comprehensive 2-week software engineering internship focusing on practical Python programming, algorithm development, and object-oriented architecture.',
    highlights: [
      'Developed modular Python applications implementing data structure manipulation and automated logic',
      'Applied clean coding practices, exception handling, and standard library modules',
      'Earned verified Internship Completion Certificate (CID: IPI#80510) recognized by AICTE and MSME'
    ],
    certificateId: 'cert-internpe-python',
    technologies: ['Python', 'OOP', 'Data Structures', 'Algorithmic Problem Solving', 'Software Development']
  },
  {
    id: 'exp-linuxworld-aws',
    role: 'Python & Cloud Engineering Trainee',
    organization: 'LinuxWorld #13 Learn to Lead',
    location: 'Jaipur / Virtual',
    duration: '13 July 2026 – 27 July 2026',
    type: 'internship',
    featured: false,
    description: 'Completed 20+ hours of advanced Python with AWS Cloud hands-on training with 5 production-ready cloud project deployments.',
    highlights: [
      'Automated AWS cloud resources using Boto3, EC2, S3, and Lambda',
      'Built and monitored serverless applications with CloudWatch and DynamoDB',
      'Earned official certification under mentor Syed Jibbran Ali and Vimal Daga'
    ],
    certificateId: 'cert-linuxworld-aws',
    technologies: ['Python', 'AWS CLI', 'Boto3', 'AWS Lambda', 'Amazon S3', 'EC2']
  },
  {
    id: 'exp-1',
    role: 'Hackathon Competitor & Builder',
    organization: 'CODEFIESTA Hackathon 4.0',
    location: 'Global Institute of Technology, Jaipur',
    duration: '09–10 October 2025',
    type: 'hackathon',
    featured: false,
    description: 'Participated in a rigorous 24-hour hackathon, designing and developing an end-to-end technical solution under high-pressure competitive conditions.',
    highlights: [
      'Engineered an innovative prototype within a strict 24-hour sprint',
      'Collaborated effectively on architecture, code reviews, and pitch presentation',
      'Recognized with official certificate of participation and achievement (CID: GITJ-CF4-2025)'
    ],
    certificateId: 'cert-codefiesta',
    technologies: ['Software Development', 'Rapid Prototyping', 'Git', 'Problem Solving']
  }
];

export const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-codeup-aiedge',
    title: 'Certificate of AI Edge Internship Program',
    organization: 'CodeUp',
    date: '22 June – 08 July 2026',
    type: '15-Day AI Edge Internship Program',
    credentialId: 'CODEUP-AIEDGE-2026',
    description: 'Presented to Dipesh for the successful completion of 15-Day AI Edge Internship Program, conducted from 22 June to 08 July 2026. Signed by Priyanka Jangid.',
    imageUrl: '/certificates/Screenshot_20260916-222440.png',
    topics: ['15-Day AI Edge Program', 'Machine Learning', 'Python Engineering', 'Edge Computing', 'CodeUp'],
    verified: true,
  },
  {
    id: 'cert-tcs-careeredge',
    title: 'TCS iON Career Edge - AI Foundation',
    organization: 'TCS iON, Tata Consultancy Services',
    date: '08 Sep – 24 Sep 2026 (Issued 10 Oct 2026)',
    type: 'Professional AI Certification',
    credentialId: '279243-32356944-1016',
    description: 'Awarded to Dipesh for successfully completing TCS iON Career Edge - AI Foundation course covering Introduction to AI, Generative AI Essentials, Prompt Engineering Basics, AI Tools, and Responsible AI. Signed by Mehul Mehta, Global Delivery Head – TCS iON.',
    imageUrl: '/certificates/WhatsApp_Image_2026-10-24_at_11.10.23_PM_1ff084b8.jpeg',
    topics: ['Introduction to AI', 'Generative AI Essentials', 'Prompt Engineering Basics', 'AI Tools', 'Responsible AI', 'Tata Consultancy Services'],
    verified: true,
  },
  {
    id: 'cert-tcs-youngprofessional',
    title: 'TCS iON Career Edge - Young Professional',
    organization: 'TCS iON, Tata Consultancy Services',
    date: '29 May 2026 – 14 June 2026',
    type: 'Professional Development & Workplace Readiness',
    credentialId: '272697-32356944-1016',
    description: 'Awarded to Dipesh for successfully completing TCS iON Career Edge - Young Professional course covering Communication Skills, Thinking Skills for Workplace Success, Presentation Skills, Soft Skills, Resume Writing, Group Discussion Skills, Interview Skills, Business Etiquette, Effective Email Writing, Problem-Solving Mindset, Accounting Fundamentals, IT Foundational Skills, and Overview of Artificial Intelligence. Signed by Mehul Mehta, Global Delivery Head – TCS iON.',
    imageUrl: '/certificates/WhatsApp_Image_2026-10-25_at_2.22.54_AM_69bf25f7.jpeg',
    topics: ['Communication Skills', 'Workplace Problem Solving', 'Presentation & Soft Skills', 'Interview Skills & Etiquette', 'IT Foundational Skills', 'Overview of AI', 'Tata Consultancy Services'],
    verified: true,
  },
  {
    id: 'cert-azure-computervision',
    title: 'Build a Computer Vision App with Azure Cognitive Services',
    organization: 'Microsoft (Coursera)',
    date: '18 September 2025',
    type: 'Cloud AI & Computer Vision Project Certificate',
    credentialId: 'H494N60BDPKZ',
    description: 'Awarded to Dipesh for completing the hands-on project "Build a computer vision app with Azure Cognitive Services", authorized by Microsoft and offered through Coursera. Certified by Catalin Popa (Microsoft Azure MVP, Microsoft MCT). Verification: https://coursera.org/verify/H494N60BDPKZ',
    imageUrl: '/certificates/WhatsApp_Image_2026-10-24_at_10.38.07_PM_3e257138.jpeg',
    topics: ['Azure Cognitive Services', 'Computer Vision', 'Cloud AI', 'Image Analysis API', 'Python SDK', 'Microsoft Azure'],
    verified: true,
  },
  {
    id: 'cert-internpe-python',
    title: 'Python Programming Internship Completion Certificate',
    organization: 'InternPe',
    date: '08 June 2026 – 22 June 2026',
    type: 'Internship Completion Certificate',
    credentialId: 'IPI#80510',
    description: 'Presented to DIPESH in recognition and appreciation for successful completion of the Python Programming Internship at InternPe (08-JUNE-2026 to 22-JUNE-2026). Recognized by MSME, AICTE, and ISO 9001:2015 certified. Verification: https://internpe.in/verify.html',
    imageUrl: '/certificates/WhatsApp_Image_2026-10-24_at_10.37.07_PM_96f61fe3.jpeg',
    topics: ['Python Programming', 'Software Engineering', 'Algorithms & Logic', 'Data Structures', 'Automation Scripting', 'InternPe'],
    verified: true,
  },
  {
    id: 'cert-codefiesta',
    title: 'CODEFIESTA Hackathon 4.0 Certificate of Achievement',
    organization: 'Global Institute of Technology, Jaipur',
    date: '09–10 October 2025',
    type: '24 Hr. Hackathon Participation & Achievement',
    credentialId: 'GITJ-CF4-2025',
    description: 'Awarded to Dipesh for participating in CODEFIESTA 4.0 (24 Hr. Hackathon) organized by Global Institute of Technology, Jaipur. Powered by H2S, Global Innovation Community Technology Hackathon, Google Developer Group, NAAC A+, IIC, and AICTE.',
    imageUrl: '/certificates/161.png',
    topics: ['24-Hour Rapid Prototyping', 'Software Innovation', 'Teamwork', 'GIT Jaipur', 'Problem Solving'],
    verified: true,
  },
  {
    id: 'cert-linuxworld-aws',
    title: 'Certificate of Training - Python with AWS Cloud Training',
    organization: 'LinuxWorld #13 Learn to Lead',
    date: '13 July – 27 July 2026',
    type: 'Python & AWS Cloud Engineering Training',
    credentialId: 'LW-JPR-2026-5309',
    description: 'Bestowed upon Dipesh for attending an exceptional in-depth 20+ hours of hands-on Python with AWS Cloud training featuring practical demonstrations and 5 real-world cloud projects under the mentorship of Syed Jibbran Ali Sir and Vimal Daga (Founder - #13).',
    imageUrl: '/certificates/Screenshot_20260810-174407.png',
    topics: ['Python OOP', 'AWS CLI & Boto3', 'Amazon EC2 & S3', 'Amazon DynamoDB', 'AWS Lambda', 'Amazon CloudWatch', 'Production Automation'],
    verified: true,
  },
  {
    id: 'cert-ibm-genai',
    title: 'Completion Certificate - Generative Artificial Intelligence',
    organization: 'IBM SkillsBuild',
    date: '10 August 2026 (GMT)',
    type: 'Professional AI Certification',
    credentialId: 'PLAN-48EB3211A34F',
    description: 'Presented to DIPESH . for the completion of Generative Artificial Intelligence, according to the Your Learning Builder - Plans system of record.',
    imageUrl: '/certificates/Screenshot_20260810-173214.png',
    topics: ['Generative Artificial Intelligence', 'Prompt Engineering', 'Foundation Models', 'AI Architecture'],
    verified: true,
  }
];

export const INITIAL_CREATIVE_WORKS: CreativeItem[] = [
  {
    id: 'cw-1',
    title: 'Cyberpunk Portrait Color Grade',
    category: 'Photo Editing',
    description: 'Dual-tone neon color grading with high-frequency skin texture preservation, localized dodge & burn, and cinematic atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Photo Editing', 'Color Grading', 'Lighting'],
  },
  {
    id: 'cw-2',
    title: 'Futuristic Sci-Fi Composite',
    category: 'Photo Editing',
    description: 'Multi-layer composite blending architectural geometry, digital holographic elements, and perspective illumination balance.',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
    tags: ['Photo Editing', 'Photoshop', 'Compositing'],
  },
  {
    id: 'cw-3',
    title: 'Editorial Clean Studio Portrait',
    category: 'Photo Editing',
    description: 'High-end frequency separation retouching maintaining natural skin pores, specular highlight shaping, and clean backdrop isolation.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    tags: ['Photo Editing', 'Studio Portrait', 'Texture'],
  },
  {
    id: 'cw-4',
    title: 'Minimalist Social Product Carousel',
    category: 'Social Media Design',
    description: 'Clean high-CTR carousel slides designed for social media feeds with balanced negative space and clear value propositions.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    tags: ['Social Media Design', 'Figma', 'Product Carousel'],
  },
  {
    id: 'cw-5',
    title: 'Cinematic Teaser Motion Poster',
    category: 'Social Media Design',
    description: 'High-impact promotional social graphic optimized for engagement, featuring custom typography lockups and directional light flares.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['Social Media Design', 'Poster', 'Typography'],
  },
  {
    id: 'cw-6',
    title: 'Cinematic Video Reel & Color Sequence',
    category: 'Video Editing',
    description: 'Dynamic video sequence with multi-track sound design, seamless scene cuts, and cinematic color pacing.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    tags: ['Video Editing', 'Premiere Pro', 'Motion Pacing'],
  }
];
