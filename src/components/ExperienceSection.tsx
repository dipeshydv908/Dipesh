import React from 'react';
import { Trophy, Briefcase, Calendar, MapPin, CheckCircle2, Award, Sparkles, Star } from 'lucide-react';
import { INITIAL_EXPERIENCES } from '../data/portfolioData';

interface ExperienceSectionProps {
  onOpenCertificate?: (certificateId: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenCertificate }) => {
  return (
    <section id="experience" className="py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>05 // INDUSTRY INTERNSHIPS &amp; MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Internships &amp; <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Verified industry software internships, competitive 24-hour hackathons, and cloud engineering programs with authenticated credentials.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Glowing Timeline Line */}
          <div className="hidden sm:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500/40 via-purple-500/40 to-transparent pointer-events-none" />

          <div className="space-y-8 sm:space-y-12">
            {INITIAL_EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const isFeatured = exp.featured;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Node Marker */}
                  <div className={`hidden sm:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-2xl bg-slate-950 border-2 ${
                    isFeatured ? 'border-amber-400 text-amber-300 shadow-amber-500/25' : 'border-cyan-400 text-cyan-400 shadow-cyan-500/20'
                  } items-center justify-center z-10 shadow-lg`}>
                    {isFeatured ? (
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                    ) : exp.type === 'hackathon' ? (
                      <Trophy className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-purple-400" />
                    )}
                  </div>

                  {/* Card Content (Occupies half width on sm+) */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <div className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/70 border ${
                      isFeatured
                        ? 'border-cyan-500/50 shadow-cyan-500/15 ring-1 ring-cyan-500/20'
                        : 'border-slate-800/90 hover:border-cyan-500/40'
                    } backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden`}>
                      
                      {/* Top subtle glow */}
                      <div className={`absolute top-0 right-0 w-36 h-36 ${
                        isFeatured ? 'bg-cyan-500/15' : 'bg-purple-500/5'
                      } rounded-full blur-2xl pointer-events-none`} />

                      {/* Header Badge & Date */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {isFeatured && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              <span>Featured Internship</span>
                            </span>
                          )}

                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium ${
                              exp.type === 'hackathon'
                                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                                : 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                            }`}
                          >
                            {exp.type === 'hackathon' ? (
                              <>
                                <Trophy className="w-3 h-3 text-cyan-400" />
                                <span>24-Hour Hackathon</span>
                              </>
                            ) : (
                              <>
                                <Briefcase className="w-3 h-3 text-purple-400" />
                                <span>Industry Internship</span>
                              </>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>

                      {/* Role & Organization */}
                      <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-300 mb-1">
                        {exp.organization}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{exp.location}</span>
                      </p>

                      {/* Narrative */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 mb-5">
                        {exp.highlights.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Chips & Credential Link */}
                      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {exp.certificateId && onOpenCertificate && (
                          <button
                            onClick={() => onOpenCertificate(exp.certificateId!)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 hover:text-cyan-200 border border-cyan-500/35 text-xs font-mono font-medium transition-all cursor-pointer shadow-sm active:scale-95"
                          >
                            <Award className="w-3.5 h-3.5 text-cyan-400" />
                            <span>View Credential</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
