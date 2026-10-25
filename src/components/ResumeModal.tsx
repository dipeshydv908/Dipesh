import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  Copy,
  Check,
  ExternalLink,
  GraduationCap,
  Code2,
  Briefcase,
  Layers,
  Award,
  Globe,
  Github,
  CheckCircle2
} from 'lucide-react';
import { downloadDipeshResume } from '../utils/resumeGenerator';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedText, setCopiedText] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      downloadDipeshResume('Dipesh_Resume.pdf');
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `DIPESH
B.Tech in Computer Science & Engineering (2nd Year)
Global Institute of Technology, Jaipur  •  Jaipur, Rajasthan, India
Portfolio: https://dipesh-portfolio-rose.vercel.app/
GitHub: https://github.com/dipeshydv908/Dipesh-portfolio

EDUCATION
Global Institute of Technology, Jaipur — Jaipur, Rajasthan, India
Bachelor of Technology (B.Tech) in Computer Science & Engineering
2nd Year (2025 – 2029)
• Academic curriculum focused on core computing disciplines, algorithm design, data structures, and software engineering.

TECHNICAL SKILLS
• Programming Languages: C, C++
• Web Technologies: HTML, HTML5, CSS, CSS3, Responsive Design
• Developer Tools: Git, GitHub, VS Code

INTERNSHIP EXPERIENCE
AI Edge Workshop Intern — CodeUp (Jaipur, India)
15-Day AI Edge Internship Program
• Completed an intensive 15-day AI Edge workshop and internship curriculum exploring AI workflows, edge computing concepts, and computational automation.
• Studied fundamental edge computing structures, system logic, and hands-on algorithmic problem solving.
• Authored clean, maintainable code implementations and completed verified program milestones under engineering mentor guidance.

FEATURED PROJECTS
To-Do List Web Application (HTML, CSS, JavaScript, Browser localStorage)
GitHub: https://github.com/dipeshydv908/Dipesh-portfolio
• Designed and built an interactive task management web application using an AI-assisted development platform.
• Implemented full task lifecycle actions: real-time task creation, title editing, completion status toggling, and deletion.
• Engineered persistent data storage with browser localStorage, ensuring users retain task state seamlessly across browser reloads without server overhead.
• Crafted a fully responsive, accessible user interface adhering strictly to modern semantic HTML and CSS styling guidelines.

ENGINEERING COMPETENCIES & HIGHLIGHTS
• Algorithmic Foundations: Practical academic and project experience in C and C++, emphasizing structured logic and modular programming.
• Front-End Web Standards: Writing semantic HTML and responsive CSS layouts prioritizing cross-device readability and zero visual clipping.
• Version Control Discipline: Managing code repositories with Git and GitHub, performing version-tracked commits and repository organization.
• Continuous Learning: 2nd-year B.Tech CSE student actively pursuing engineering excellence, hands-on development practices, and modern developer workflows.
`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn print:p-0 print:bg-white"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#090d22] border border-cyan-500/30 shadow-2xl overflow-hidden print:max-h-none print:border-none print:shadow-none print:rounded-none print:bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-900/90 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h3 className="font-display font-bold text-white text-base">
              Dipesh — Professional Resume (ATS Single Page)
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Primary Download Button */}
            <button
              id="resume-modal-download-btn"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all duration-200 cursor-pointer active:scale-95"
            >
              {isDownloading ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>Downloaded Dipesh_Resume.pdf!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>Download Resume (PDF)</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              id="resume-modal-print-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 shadow-md cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Print / Save</span>
            </button>

            {/* Copy Plaintext Button */}
            <button
              id="resume-modal-copy-btn"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">{copiedText ? 'Copied!' : 'Copy Text'}</span>
            </button>

            {/* Close Button */}
            <button
              id="resume-modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close Resume Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#070b1a] print:bg-white print:p-0 print:overflow-visible">
          
          {/* A4 Resume White Sheet Container */}
          <div
            id="dipesh-ats-resume-sheet"
            className="max-w-[794px] mx-auto bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl border border-slate-200 print:border-none print:shadow-none print:rounded-none print:p-0 font-sans leading-relaxed"
          >
            {/* Header */}
            <div className="border-b-2 border-sky-600 pb-4 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                  DIPESH
                </h1>
                <span className="text-sm font-bold text-sky-600 font-mono">
                  B.Tech in Computer Science & Engineering (2nd Year)
                </span>
              </div>
              
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Global Institute of Technology, Jaipur &bull; Jaipur, Rajasthan, India
              </p>

              {/* Clickable Links Bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-xs">
                <a
                  href="https://dipesh-portfolio-rose.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-800 font-semibold transition-colors underline decoration-sky-300"
                >
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                  <span>dipesh-portfolio-rose.vercel.app</span>
                </a>

                <span className="text-slate-300">|</span>

                <a
                  href="https://github.com/dipeshydv908/Dipesh-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-800 font-semibold transition-colors underline decoration-sky-300"
                >
                  <Github className="w-3.5 h-3.5 text-sky-600" />
                  <span>github.com/dipeshydv908/Dipesh-portfolio</span>
                </a>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-4 text-xs text-slate-800">
              
              {/* 1. Education */}
              <div>
                <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1 mb-2">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-sky-700">
                    Education
                  </h2>
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-[13px]">
                      Global Institute of Technology, Jaipur
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Jaipur, Rajasthan, India
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-between items-baseline text-slate-700">
                    <span className="font-semibold text-sky-800">
                      Bachelor of Technology (B.Tech) — Computer Science & Engineering
                    </span>
                    <span className="font-bold text-sky-700 text-[11px]">
                      2nd Year (2025 – 2029)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal pl-2 border-l-2 border-sky-200 mt-1">
                    Academic curriculum focused on core computing disciplines, algorithm design, data structures, and software engineering methodologies.
                  </p>
                </div>
              </div>

              {/* 2. Technical Skills */}
              <div>
                <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1 mb-2">
                  <Code2 className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-sky-700">
                    Technical Skills
                  </h2>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <p>
                    <strong className="text-slate-900 font-bold">Programming Languages: </strong>
                    <span className="text-slate-700">C, C++</span>
                  </p>
                  <p>
                    <strong className="text-slate-900 font-bold">Web Technologies: </strong>
                    <span className="text-slate-700">HTML, HTML5, CSS, CSS3, Responsive Layouts</span>
                  </p>
                  <p>
                    <strong className="text-slate-900 font-bold">Developer Tools: </strong>
                    <span className="text-slate-700">Git, GitHub, VS Code</span>
                  </p>
                </div>
              </div>

              {/* 3. Internship Experience */}
              <div>
                <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1 mb-2">
                  <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-sky-700">
                    Internship Experience
                  </h2>
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-[13px]">
                      AI Edge Workshop Intern
                    </span>
                    <span className="font-bold text-sky-700 text-[11px]">
                      CodeUp
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-between items-baseline text-slate-600 text-[11px] italic">
                    <span>15-Day AI Edge Internship Program</span>
                    <span>Jaipur, India</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-[11px] text-slate-700">
                    <li>
                      Completed an intensive 15-day AI Edge workshop and internship curriculum exploring AI workflows, edge computing concepts, and computational automation.
                    </li>
                    <li>
                      Studied fundamental edge computing structures, system logic, and hands-on algorithmic problem solving.
                    </li>
                    <li>
                      Authored clean, maintainable code implementations and completed verified program milestones under engineering mentor guidance.
                    </li>
                  </ul>
                </div>
              </div>

              {/* 4. Featured Projects */}
              <div>
                <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1 mb-2">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-sky-700">
                    Featured Projects
                  </h2>
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-[13px]">
                      To-Do List Web Application
                    </span>
                    <span className="font-semibold text-sky-700 text-[11px]">
                      HTML, CSS, JavaScript, LocalStorage
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center gap-1">
                    <span>Repository:</span>
                    <a
                      href="https://github.com/dipeshydv908/Dipesh-portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:underline font-medium inline-flex items-center gap-0.5"
                    >
                      <span>https://github.com/dipeshydv908/Dipesh-portfolio</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-[11px] text-slate-700">
                    <li>
                      Designed and built an interactive task management web application using an AI-assisted development platform.
                    </li>
                    <li>
                      Implemented full task lifecycle actions: real-time task creation, title editing, completion status toggling, and item deletion.
                    </li>
                    <li>
                      Engineered persistent data storage with browser localStorage, ensuring users retain task state seamlessly across browser reloads without server overhead.
                    </li>
                    <li>
                      Crafted a fully responsive, accessible user interface adhering strictly to modern semantic HTML and CSS styling guidelines.
                    </li>
                  </ul>
                </div>
              </div>

              {/* 5. Engineering Competencies & Highlights */}
              <div>
                <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1 mb-2">
                  <Award className="w-3.5 h-3.5 text-sky-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-sky-700">
                    Engineering Competencies &amp; Highlights
                  </h2>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-[11px] text-slate-700">
                  <li>
                    <strong className="text-slate-900 font-semibold">Algorithmic Foundations: </strong>
                    Practical academic and project experience in C and C++, emphasizing structured logic, modular programming, and data organization.
                  </li>
                  <li>
                    <strong className="text-slate-900 font-semibold">Front-End Web Standards: </strong>
                    Writing semantic HTML and responsive CSS with flexbox and grid layouts, prioritizing cross-device readability and zero visual clipping.
                  </li>
                  <li>
                    <strong className="text-slate-900 font-semibold">Version Control Discipline: </strong>
                    Managing code repositories with Git and GitHub, performing version-tracked commits and repository organization.
                  </li>
                  <li>
                    <strong className="text-slate-900 font-semibold">Continuous Learning: </strong>
                    2nd-year B.Tech CSE student actively pursuing engineering excellence, hands-on development practices, and modern developer workflows.
                  </li>
                </ul>
              </div>

            </div>

            {/* Sheet Footer */}
            <div className="border-t border-slate-200 pt-3 mt-4 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Dipesh &bull; Verified Single-Page ATS Format</span>
              <span className="text-sky-600">Dipesh_Resume.pdf</span>
            </div>

          </div>

          {/* Bottom Callout in modal */}
          <div className="max-w-[794px] mx-auto mt-4 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono print:hidden">
            <div className="flex items-center gap-2 text-cyan-200">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Format: Strictly 1-Page A4 ATS PDF with clickable links (`Dipesh_Resume.pdf`).</span>
            </div>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer shrink-0"
            >
              Download PDF Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
