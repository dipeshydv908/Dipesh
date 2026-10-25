import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, Calendar, Building2, Eye, Copy, Check, Filter } from 'lucide-react';
import { INITIAL_CERTIFICATES } from '../data/portfolioData';
import { CertificateItem } from '../types';
import { CertificateLightbox } from './CertificateLightbox';

interface CertificatesSectionProps {
  activeCertId?: string | null;
  onCloseActiveCert?: () => void;
}

const CERT_CATEGORIES = [
  'All (8)',
  'AI & ML',
  'Cloud & DevOps',
  'Internships',
  'Hackathons',
  'Professional Skills'
];

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  activeCertId,
  onCloseActiveCert,
}) => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('All (8)');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [candidatePaths, setCandidatePaths] = useState<Record<string, string>>({});
  const [imgLoadErrors, setImgLoadErrors] = useState<Record<string, boolean>>({});

  // Synchronize when an external component (e.g. ExperienceSection) requests a certificate
  useEffect(() => {
    if (activeCertId) {
      const target = INITIAL_CERTIFICATES.find((c) => c.id === activeCertId);
      if (target) {
        setSelectedCert(target);
        const el = document.querySelector('#certificates');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeCertId]);

  const handleImageError = (certId: string, currentSrc: string) => {
    if (currentSrc.startsWith('/certificates/')) {
      const rootFallback = currentSrc.replace('/certificates/', '/');
      setCandidatePaths((prev) => ({ ...prev, [certId]: rootFallback }));
    } else if (currentSrc.startsWith('/assets/aistudio/')) {
      const certFallback = currentSrc.replace('/assets/aistudio/', '/certificates/');
      setCandidatePaths((prev) => ({ ...prev, [certId]: certFallback }));
    } else {
      setImgLoadErrors((prev) => ({ ...prev, [certId]: true }));
    }
  };

  const handleCopyCredential = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCertificates = INITIAL_CERTIFICATES.filter((cert) => {
    if (activeCategory === 'All (8)') return true;
    if (activeCategory === 'AI & ML') {
      return (
        cert.id.includes('ibm') ||
        cert.id.includes('codeup') ||
        cert.id.includes('azure') ||
        cert.id.includes('tcs')
      );
    }
    if (activeCategory === 'Cloud & DevOps') {
      return cert.id.includes('linuxworld') || cert.id.includes('azure');
    }
    if (activeCategory === 'Internships') {
      return (
        cert.id.includes('internpe') ||
        cert.id.includes('codeup') ||
        cert.id.includes('linuxworld')
      );
    }
    if (activeCategory === 'Hackathons') {
      return cert.id.includes('codefiesta');
    }
    if (activeCategory === 'Professional Skills') {
      return cert.id.includes('tcs') || cert.id.includes('internpe');
    }
    return true;
  });

  return (
    <section id="certificates" className="py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>04 // CREDENTIALS &amp; ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Official <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Certificates</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Verified academic milestones, hackathon achievements, and industry engineering credentials from Microsoft, Tata Consultancy Services (TCS iON), IBM SkillsBuild, InternPe, LinuxWorld, CodeUp, and Global Institute of Technology.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md max-w-full">
            {CERT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Official Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCertificates.map((cert) => {
            return (
              <div
                key={cert.id}
                className="rounded-3xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cyan-500/15 flex flex-col justify-between p-5 sm:p-6 group relative overflow-hidden"
              >
                {/* Subtle card glow */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Top Header: Organization & Verification Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 truncate">
                      <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-semibold truncate">{cert.organization}</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Certificate Preview Card Mini Frame */}
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="relative w-full aspect-[4/3] rounded-2xl bg-[#070b1e] border border-slate-800 flex items-center justify-center p-2 mb-4 cursor-pointer group-hover:border-cyan-500/40 transition-all overflow-hidden shadow-inner"
                  >
                    {cert.imageUrl && !imgLoadErrors[cert.id] ? (
                      <img
                        src={candidatePaths[cert.id] || cert.imageUrl}
                        alt={cert.title}
                        onError={() => handleImageError(cert.id, candidatePaths[cert.id] || cert.imageUrl)}
                        className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-2.5">
                          <Award className="w-6 h-6 text-cyan-400" />
                        </div>
                        <span className="text-xs font-mono text-slate-200 font-semibold mb-1 line-clamp-1">{cert.title}</span>
                        <div className="mt-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-[11px] font-mono text-cyan-400">
                          {cert.imageUrl?.replace('/certificates/', '')}
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#050711]/75 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Full Certificate</span>
                      </span>
                    </div>
                  </div>

                  {/* Title and Details */}
                  <h3 className="text-base font-bold font-display text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Topics covered tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cert.topics.slice(0, 4).map((tp) => (
                      <span
                        key={tp}
                        className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400"
                      >
                        {tp}
                      </span>
                    ))}
                    {cert.topics.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-cyan-400">
                        +{cert.topics.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 truncate">
                    <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{cert.date}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {cert.credentialId && (
                      <button
                        onClick={() => handleCopyCredential(cert.id, cert.credentialId!)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Copy Credential ID"
                      >
                        {copiedId === cert.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}

                    <button
                      id={`view-cert-btn-${cert.id}`}
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Lightbox Viewer */}
      <CertificateLightbox
        certificate={selectedCert}
        customImage={selectedCert?.imageUrl}
        onClose={() => {
          setSelectedCert(null);
          if (onCloseActiveCert) onCloseActiveCert();
        }}
      />
    </section>
  );
};

