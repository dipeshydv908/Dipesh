import React, { useState } from 'react';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { AIAssistant } from './components/AIAssistant';
import { Footer } from './components/Footer';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#050711] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Interactive 3D Three.js Background Canvas */}
      <ThreeBackground />

      {/* Sticky Futuristic Navigation Bar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Portfolio Content */}
      <main className="relative z-10">
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection
          activeCertId={selectedCertId}
          onCloseActiveCert={() => setSelectedCertId(null)}
        />
        <ExperienceSection
          onOpenCertificate={(certId) => setSelectedCertId(certId)}
        />
        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Futuristic Tech Footer */}
      <Footer />

      {/* Interactive AI Portfolio Assistant */}
      <AIAssistant onOpenResume={() => setIsResumeOpen(true)} />

      {/* Resume Inspector & Print Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

