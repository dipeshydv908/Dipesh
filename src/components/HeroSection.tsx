import React, { useState } from 'react';
import { ArrowRight, Download, Sparkles, Code, Cpu, Layers, Copy, Check, Mail, ExternalLink, FileText } from 'lucide-react';
import { downloadDipeshResume } from '../utils/resumeGenerator';

const PORTRAIT_CANDIDATES = [
  '/dipesh_original.jpg',
  '/dipesh_portrait.jpg',
  '/dipesh_real.jpg',
];

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [downloadingResume, setDownloadingResume] = useState(false);

  const scrollToProjects = () => {
    const el = document.querySelector('#projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dipeshydv908@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownloadResume = () => {
    setDownloadingResume(true);
    try {
      downloadDipeshResume('Dipesh_Resume.pdf');
    } finally {
      setTimeout(() => setDownloadingResume(false), 2000);
    }
  };

  const handleImageError = () => {
    if (photoIndex < PORTRAIT_CANDIDATES.length - 1) {
      setPhotoIndex((prev) => prev + 1);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-24 sm:pt-28 pb-12 sm:pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Core Info */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6 text-left w-full">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px] sm:text-xs font-mono backdrop-blur-md shadow-sm max-w-full">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span className="truncate">B.Tech CSE (2025–2029) • Available for Internships &amp; Roles</span>
            </div>

            {/* Name Title */}
            <div className="space-y-1.5 sm:space-y-2 w-full">
              <h1 className="text-3xl xs:text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight font-display text-white">
                <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  DIPESH
                </span>
              </h1>
              <p className="text-base xs:text-lg sm:text-2xl font-medium text-slate-200 tracking-tight leading-snug">
                Computer Science Engineering Student{' '}
                <span className="text-cyan-400 font-semibold block sm:inline">
                  &amp; Aspiring Software Developer
                </span>
              </p>
            </div>

            {/* Short Description */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
              Passionate Computer Science Engineering student focused on software development,
              Artificial Intelligence, modern web technologies, and scalable software solutions.
            </p>

            {/* Quick Metadata highlights */}
            <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400 w-full">
              <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5 text-[11px] sm:text-xs">
                <Code className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Global Institute of Technology, Jaipur
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5 text-[11px] sm:text-xs">
                <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Python &amp; GenAI Certified
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center gap-1.5 text-[11px] sm:text-xs">
                <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Hackathon Achiever
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2 w-full">
              <button
                id="hero-view-projects-btn"
                onClick={scrollToProjects}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                id="hero-download-resume-btn"
                onClick={handleDownloadResume}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-100 border border-slate-700/80 font-semibold text-sm hover:border-cyan-500/40 transition-all duration-200 shadow-md cursor-pointer active:scale-95 group"
                title="Download genuine single-page A4 PDF resume (Dipesh_Resume.pdf)"
              >
                {downloadingResume ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Downloaded Dipesh_Resume.pdf!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
                    <span>Download Resume</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  id="hero-preview-resume-btn"
                  onClick={onOpenResume}
                  className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-xs font-mono text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 transition-colors cursor-pointer"
                  title="Preview ATS Resume on Screen"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preview</span>
                </button>

                <button
                  id="hero-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                  title="Copy dipeshydv908@gmail.com"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[150px] xs:max-w-none">dipeshydv908@gmail.com</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quantitative Stats Row */}
            <div className="pt-3 grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg border-t border-slate-800/80">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-center sm:text-left">
                <p className="text-lg xs:text-xl sm:text-2xl font-extrabold font-display text-white">8</p>
                <p className="text-[9px] xs:text-[10px] sm:text-xs font-mono text-cyan-400 leading-tight">Verified Certifications</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-center sm:text-left">
                <p className="text-lg xs:text-xl sm:text-2xl font-extrabold font-display text-white">24h</p>
                <p className="text-[9px] xs:text-[10px] sm:text-xs font-mono text-purple-400 leading-tight">Hackathon Prototyping</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-center sm:text-left">
                <p className="text-lg xs:text-xl sm:text-2xl font-extrabold font-display text-white">100%</p>
                <p className="text-[9px] xs:text-[10px] sm:text-xs font-mono text-emerald-400 leading-tight">Hands-on Code</p>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Portrait Frame */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            
            {/* Ambient Multi-Layer Glow Effects */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-purple-600/25 rounded-3xl blur-2xl opacity-75 animate-pulse-slow pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-36 h-36 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />

            {/* Main Portrait Card Container */}
            <div
              id="hero-portrait-card"
              className="relative w-full max-w-[270px] xs:max-w-xs sm:max-w-sm md:max-w-md aspect-[3/4] rounded-3xl p-2 bg-gradient-to-b from-cyan-500/30 via-slate-800/60 to-purple-500/30 shadow-2xl backdrop-blur-xl border border-white/10 group transition-all duration-500 hover:shadow-cyan-500/20"
            >
              {/* Inner Frame */}
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#0a0f24] flex items-center justify-center border border-slate-800/80">
                <img
                  id="profile-portrait-image"
                  src={PORTRAIT_CANDIDATES[photoIndex]}
                  alt="Dipesh"
                  onError={handleImageError}
                  className="w-full h-full object-cover object-[center_12%] transition-transform duration-300 group-hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />

                {/* Delicate Bottom Shading for label contrast without obscuring photo */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050711]/75 to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="backdrop-blur-md bg-slate-950/85 border border-cyan-500/25 px-2.5 sm:px-3 py-1.5 rounded-xl shadow-lg">
                    <p className="text-xs font-bold text-white tracking-wide font-display">
                      Dipesh
                    </p>
                    <p className="text-[10px] font-mono text-cyan-300">
                      B.Tech CSE • GIT Jaipur
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Tech Badges around the frame (responsive positioning to avoid overflow) */}
              <div className="absolute top-2 left-2 sm:-top-4 sm:-left-4 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#09112a]/95 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-xs font-mono flex items-center gap-1.5 shadow-xl shadow-black/60">
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span>Python &amp; AI</span>
              </div>

              <div className="absolute bottom-2 right-2 sm:-bottom-3 sm:-right-3 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#0d0a27]/95 backdrop-blur-md border border-purple-500/30 text-purple-300 text-[10px] sm:text-xs font-mono flex items-center gap-1.5 shadow-xl shadow-black/60">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Web &amp; Systems</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

