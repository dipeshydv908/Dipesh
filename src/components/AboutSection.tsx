import React, { useState } from 'react';
import { 
  GraduationCap, MapPin, Calendar, BookOpen, Sparkles, CheckCircle2, 
  Terminal, Github, Linkedin, Mail, ExternalLink, ShieldCheck, Award
} from 'lucide-react';
import { INITIAL_EDUCATION, INITIAL_SOCIAL_LINKS } from '../data/portfolioData';

const ABOUT_PORTRAIT_CANDIDATES = [
  '/dipesh_original.jpg',
  '/dipesh_portrait.jpg',
  '/dipesh_real.jpg',
];

export const AboutSection: React.FC = () => {
  const education = INITIAL_EDUCATION;
  const [photoIndex, setPhotoIndex] = useState(0);

  const INTERESTS = [
    { title: 'Software Development', desc: 'Building scalable logic in C, C++, and Python with robust data structures' },
    { title: 'Artificial Intelligence', desc: 'Practical GenAI prompting, edge computing systems & Microsoft Azure AI' },
    { title: 'Web Development', desc: 'Responsive interfaces, semantic HTML5/CSS3 & modern AI-assisted web apps' },
    { title: 'Python Engineering', desc: 'Algorithmic computing, automation scripting & clean object-oriented architecture' },
    { title: 'IoT & Hardware Automation', desc: 'Microcontroller programming with Arduino UNO, ultrasonic sensors & C/C++' },
    { title: 'Creative Visual Editing', desc: 'Photo color grading, video editing & high-CTR social media visual design' },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // IDENTITY &amp; ACADEMICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            About <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Passionate technologist synthesizing computer engineering discipline with practical AI and modern web design.
          </p>
        </div>

        {/* Top Grid: Bio Overview + Quick Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
          
          {/* Professional Narrative (8 cols) */}
          <div className="lg:col-span-8 p-5 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shrink-0 shadow-lg shadow-cyan-500/15 bg-slate-950">
                    <img
                      src={ABOUT_PORTRAIT_CANDIDATES[photoIndex]}
                      alt="Dipesh"
                      onError={() => {
                        if (photoIndex < ABOUT_PORTRAIT_CANDIDATES.length - 1) {
                          setPhotoIndex(photoIndex + 1);
                        }
                      }}
                      className="w-full h-full object-cover object-[center_15%]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <h3 className="text-xl font-bold font-display text-white">
                        Dipesh
                      </h3>
                    </div>
                    <p className="text-xs font-mono text-cyan-300">
                      B.Tech CSE Student (2nd Year) • 2025 – 2029
                    </p>
                  </div>
                </div>

                {/* Direct Social Links */}
                <div className="flex items-center gap-2">
                  <a
                    href={INITIAL_SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all hover:scale-105"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={INITIAL_SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all hover:scale-105"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${INITIAL_SOCIAL_LINKS.email}`}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all hover:scale-105"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <p className="text-slate-300 text-base leading-relaxed font-normal">
                Hello! I am <strong className="text-white font-semibold">Dipesh</strong>, a dedicated{' '}
                <span className="text-cyan-300 font-medium">Computer Science Engineering student (2nd Year, 2025–2029)</span> at{' '}
                <span className="text-purple-300 font-medium">Global Institute of Technology, Jaipur</span>. 
                With a strong grounding in core programming languages (<span className="text-white font-mono text-sm">C, C++, HTML, CSS, Python</span>), 
                I actively architect practical software solutions, explore edge AI systems, and engineer clean, responsive web applications.
              </p>

              <p className="text-slate-300 text-base leading-relaxed font-normal">
                Recently, I completed the <span className="text-cyan-300 font-medium">15-Day AI Edge Internship Program at CodeUp</span>,
                built a persistent <span className="text-emerald-300 font-medium">To-Do List Web Application</span> using modern AI-assisted engineering with browser localStorage,
                and earned verified certifications from Microsoft Azure, TCS iON, and InternPe.
                I am actively seeking software development and AI engineering internships where I can contribute my engineering skills.
              </p>

              <div className="pt-3 flex flex-wrap gap-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Verified CodeUp AI Edge Intern</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>8 Verified Certifications</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Single-Page A4 ATS Resume Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Institution Spotlight (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/80 to-[#0c1228] border border-cyan-500/20 backdrop-blur-xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Institution</span>
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-lg font-bold text-white font-display mb-1">
                  Global Institute of Technology
                </h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> Jaipur, Rajasthan, India
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono text-slate-300 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Degree:</span>
                    <span className="text-cyan-300 font-medium">B.Tech (2nd Year)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Major:</span>
                    <span className="text-slate-200">Computer Science</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="text-cyan-400 font-medium">2025 – 2029</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="text-emerald-400 font-medium">Active Undergraduate</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-slate-400 mb-1">Core Tech Focus</p>
                <p className="text-base font-bold text-white font-display">
                  C, C++, HTML, CSS, AI
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Terminal className="w-6 h-6" />
              </div>
            </div>
          </div>

        </div>

        {/* Interests Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Core Areas of Focus</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Engineering &amp; Creative</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTERESTS.map((item, index) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5 group"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="font-bold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">
                    0{index + 1}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="p-5 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-xl relative">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-mono mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>ACADEMIC BACKGROUND</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Education Timeline
              </h3>
            </div>
          </div>

          {/* Education Card Item */}
          <div className="relative pl-5 sm:pl-8 border-l-2 border-cyan-500/30 space-y-6">
            <div className="absolute -left-[9px] sm:-left-[11px] top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400" />
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-lg font-bold text-white font-display">
                    {education.institution}
                  </h4>
                  <p className="text-sm font-semibold text-cyan-300">
                    {education.degree} — {education.field}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{education.duration}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{education.location}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-mono">{education.status}</span>
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-800/70">
                {education.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Editable placeholder note for future grade card verification */}
              <div className="mt-4 pt-3 border-t border-dashed border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Academic Record Status: In Progress (Year 2)</span>
                <span className="text-slate-400">Verified Enrollment</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
