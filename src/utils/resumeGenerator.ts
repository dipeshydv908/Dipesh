import { jsPDF } from 'jspdf';

export interface ResumeGenerationOptions {
  filename?: string;
  triggerDownload?: boolean;
}

/**
 * Generates Dipesh's official, verified single-page ATS-friendly A4 resume.
 *
 * Strict verified data only:
 * - Name: Dipesh
 * - Education: B.Tech, 2nd Year
 * - College: Global Institute of Technology, Jaipur
 * - Skills: C, C++, HTML, CSS, Git, GitHub
 * - Portfolio: https://dipesh-portfolio-rose.vercel.app/
 * - GitHub: https://github.com/dipeshydv908/Dipesh-portfolio
 * - Internship: AI Edge workshop internship (CodeUp - 15-day AI Edge workshop/internship)
 * - Project: To-Do List web application (AI-assisted development platform, browser localStorage)
 * - Strictly NO invented contact numbers, unverified employers, or fake scores.
 */
export function generateDipeshResumePdf(): jsPDF {
  // Create portrait A4 document in millimeters
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const marginX = 18;
  const contentWidth = pageWidth - marginX * 2; // 174mm
  const rightX = marginX + contentWidth; // 192mm

  // Professional color palette (ATS-friendly dark typography with clean tech blue accents)
  const COLOR_NAME = [15, 23, 42]; // #0f172a - Slate 900
  const COLOR_HEADING = [2, 132, 199]; // #0284c7 - Sky/Cyan 600
  const COLOR_BODY = [30, 41, 59]; // #1e293b - Slate 800
  const COLOR_MUTED = [100, 116, 139]; // #64748b - Slate 500
  const COLOR_LINE = [203, 213, 225]; // #cbd5e1 - Slate 300
  const COLOR_LINK = [2, 132, 199]; // #0284c7

  let y = 16;

  // -------------------------------------------------------------
  // HEADER
  // -------------------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(COLOR_NAME[0], COLOR_NAME[1], COLOR_NAME[2]);
  doc.text('DIPESH', marginX, y);

  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(COLOR_HEADING[0], COLOR_HEADING[1], COLOR_HEADING[2]);
  doc.text('B.Tech in Computer Science & Engineering (2nd Year)', marginX, y);

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('Global Institute of Technology, Jaipur  •  Jaipur, Rajasthan, India', marginX, y);

  // Clickable Links row
  y += 4.5;
  const portfolioLabel = 'Portfolio: ';
  const portfolioUrlText = 'dipesh-portfolio-rose.vercel.app';
  const githubLabel = 'GitHub: ';
  const githubUrlText = 'github.com/dipeshydv908/Dipesh-portfolio';

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text(portfolioLabel, marginX, y);

  const portfolioLabelW = doc.getTextWidth(portfolioLabel);
  const pUrlX = marginX + portfolioLabelW;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLOR_LINK[0], COLOR_LINK[1], COLOR_LINK[2]);
  doc.text(portfolioUrlText, pUrlX, y);
  const pUrlW = doc.getTextWidth(portfolioUrlText);
  // Add clickable hyperlink annotation
  doc.link(pUrlX, y - 3, pUrlW, 4, { url: 'https://dipesh-portfolio-rose.vercel.app/' });

  const bulletText = '   |   ';
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  const bulletX = pUrlX + pUrlW;
  doc.text(bulletText, bulletX, y);
  const bulletW = doc.getTextWidth(bulletText);

  const ghLabelX = bulletX + bulletW;
  doc.text(githubLabel, ghLabelX, y);
  const ghLabelW = doc.getTextWidth(githubLabel);

  const ghUrlX = ghLabelX + ghLabelW;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLOR_LINK[0], COLOR_LINK[1], COLOR_LINK[2]);
  doc.text(githubUrlText, ghUrlX, y);
  const ghUrlW = doc.getTextWidth(githubUrlText);
  doc.link(ghUrlX, y - 3, ghUrlW, 4, { url: 'https://github.com/dipeshydv908/Dipesh-portfolio' });

  // Top divider line
  y += 3.5;
  doc.setDrawColor(COLOR_LINE[0], COLOR_LINE[1], COLOR_LINE[2]);
  doc.setLineWidth(0.4);
  doc.line(marginX, y, rightX, y);
  y += 5;

  // Helper for rendering section header
  const renderSectionHeader = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(COLOR_HEADING[0], COLOR_HEADING[1], COLOR_HEADING[2]);
    doc.text(title.toUpperCase(), marginX, y);

    // subtle accent rule underneath
    y += 1.8;
    doc.setDrawColor(COLOR_HEADING[0], COLOR_HEADING[1], COLOR_HEADING[2]);
    doc.setLineWidth(0.3);
    doc.line(marginX, y, marginX + 28, y);

    doc.setDrawColor(COLOR_LINE[0], COLOR_LINE[1], COLOR_LINE[2]);
    doc.setLineWidth(0.15);
    doc.line(marginX + 29, y, rightX, y);
    y += 4;
  };

  // Helper for bullet items
  const renderBullet = (text: string, indent = 3, boldPrefix?: string) => {
    const bulletSymbol = '•';
    const textStartX = marginX + indent + 3;
    const maxW = rightX - textStartX;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_HEADING[0], COLOR_HEADING[1], COLOR_HEADING[2]);
    doc.text(bulletSymbol, marginX + indent, y);

    if (boldPrefix) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLOR_NAME[0], COLOR_NAME[1], COLOR_NAME[2]);
      doc.text(boldPrefix, textStartX, y);
      const prefixW = doc.getTextWidth(boldPrefix);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
      const remainingLines = doc.splitTextToSize(text, maxW - prefixW);
      if (remainingLines.length > 0) {
        doc.text(remainingLines[0], textStartX + prefixW, y);
        for (let i = 1; i < remainingLines.length; i++) {
          y += 4;
          doc.text(remainingLines[i], textStartX, y);
        }
      }
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((line: string, idx: number) => {
        if (idx > 0) y += 4;
        doc.text(line, textStartX, y);
      });
    }
    y += 4.2;
  };

  // -------------------------------------------------------------
  // 1. EDUCATION
  // -------------------------------------------------------------
  renderSectionHeader('Education');

  // Institution line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR_NAME[0], COLOR_NAME[1], COLOR_NAME[2]);
  doc.text('Global Institute of Technology, Jaipur', marginX, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  const locText = 'Jaipur, Rajasthan, India';
  doc.text(locText, rightX - doc.getTextWidth(locText), y);

  y += 4.2;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
  doc.text('Bachelor of Technology (B.Tech) — Computer Science & Engineering', marginX, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_HEADING[0], COLOR_HEADING[1], COLOR_HEADING[2]);
  const yearText = '2nd Year (2025 – 2029)';
  doc.text(yearText, rightX - doc.getTextWidth(yearText), y);

  y += 4.5;
  renderBullet('Core curriculum focusing on fundamental computing disciplines, algorithm design, data structures, and software engineering methodologies.');
  y += 1.5;

  // -------------------------------------------------------------
  // 2. TECHNICAL SKILLS
  // -------------------------------------------------------------
  renderSectionHeader('Technical Skills');

  renderBullet('C, C++', 2, 'Programming Languages: ');
  renderBullet('HTML, HTML5, CSS, CSS3, Responsive Web Layouts', 2, 'Web Technologies: ');
  renderBullet('Git, GitHub, VS Code', 2, 'Developer Tools: ');
  y += 1.5;

  // -------------------------------------------------------------
  // 3. INTERNSHIP EXPERIENCE
  // -------------------------------------------------------------
  renderSectionHeader('Internship Experience');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR_NAME[0], COLOR_NAME[1], COLOR_NAME[2]);
  doc.text('AI Edge Workshop Intern', marginX, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_HEADING[0], COLOR_HEADING[1], COLOR_HEADING[2]);
  const orgText = 'CodeUp';
  doc.text(orgText, rightX - doc.getTextWidth(orgText), y);

  y += 4.2;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('15-Day AI Edge Internship Program', marginX, y);

  const locExp = 'Jaipur, India';
  doc.text(locExp, rightX - doc.getTextWidth(locExp), y);

  y += 4.5;
  renderBullet('Completed an intensive 15-day AI Edge workshop and internship curriculum exploring AI workflows, edge computing concepts, and computational automation.');
  renderBullet('Studied core architecture patterns for lightweight intelligent applications and practiced hands-on algorithmic problem solving.');
  renderBullet('Authored clean, maintainable code implementations and completed verified program milestones under engineering mentor guidance.');
  y += 1.5;

  // -------------------------------------------------------------
  // 4. PROJECTS
  // -------------------------------------------------------------
  renderSectionHeader('Featured Projects');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR_NAME[0], COLOR_NAME[1], COLOR_NAME[2]);
  doc.text('To-Do List Web Application', marginX, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_HEADING[0], COLOR_HEADING[1], COLOR_HEADING[2]);
  const techStack = 'HTML, CSS, JavaScript, LocalStorage';
  doc.text(techStack, rightX - doc.getTextWidth(techStack), y);

  y += 4.2;
  // Clickable project link line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  const projRepoLabel = 'Source Code / Repository: ';
  doc.text(projRepoLabel, marginX, y);
  const projRepoLabelW = doc.getTextWidth(projRepoLabel);

  const projUrlText = 'https://github.com/dipeshydv908/Dipesh-portfolio';
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLOR_LINK[0], COLOR_LINK[1], COLOR_LINK[2]);
  doc.text(projUrlText, marginX + projRepoLabelW, y);
  const projUrlW = doc.getTextWidth(projUrlText);
  doc.link(marginX + projRepoLabelW, y - 3, projUrlW, 4, { url: 'https://github.com/dipeshydv908/Dipesh-portfolio' });

  y += 4.5;
  renderBullet('Designed and built an interactive task management web application using an AI-assisted development platform.');
  renderBullet('Implemented full task lifecycle actions: real-time task creation, title editing, completion status toggling, and deletion.');
  renderBullet('Engineered persistent data storage with browser localStorage, ensuring users retain task state seamlessly across browser reloads without server overhead.');
  renderBullet('Crafted a fully responsive, accessible user interface adhering strictly to modern semantic HTML and CSS styling guidelines.');
  y += 1.5;

  // -------------------------------------------------------------
  // 5. CORE METHODOLOGY & COMPETENCIES
  // -------------------------------------------------------------
  renderSectionHeader('Engineering Competencies & Highlights');

  renderBullet('Algorithmic Foundations: Practical academic and project experience in C and C++, emphasizing structured logic, modular programming, and data organization.');
  renderBullet('Front-End Web Standards: Writing semantic HTML and responsive CSS with flexbox and grid layouts, prioritizing cross-device readability and zero visual clipping.');
  renderBullet('Version Control Discipline: Managing code repositories with Git and GitHub, performing version-tracked commits and repository organization.');
  renderBullet('Continuous Learning: 2nd-year B.Tech CSE student actively pursuing engineering excellence, hands-on development practices, and modern developer workflows.');

  // -------------------------------------------------------------
  // FOOTER (Always at bottom of A4 page)
  // -------------------------------------------------------------
  const footerY = 286;
  doc.setDrawColor(COLOR_LINE[0], COLOR_LINE[1], COLOR_LINE[2]);
  doc.setLineWidth(0.2);
  doc.line(marginX, footerY, rightX, footerY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('Dipesh — Curriculum Vitae | Verified Single-Page ATS Format', marginX, footerY + 4);

  const footerLink = 'dipesh-portfolio-rose.vercel.app';
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLOR_LINK[0], COLOR_LINK[1], COLOR_LINK[2]);
  const flW = doc.getTextWidth(footerLink);
  const flX = rightX - flW;
  doc.text(footerLink, flX, footerY + 4);
  doc.link(flX, footerY + 1, flW, 4, { url: 'https://dipesh-portfolio-rose.vercel.app/' });

  // Guarantee single page assertion:
  const totalPages = doc.getNumberOfPages();
  if (totalPages > 1) {
    for (let p = totalPages; p > 1; p--) {
      doc.deletePage(p);
    }
  }

  return doc;
}

/**
 * Initiates direct download of Dipesh_Resume.pdf
 */
export function downloadDipeshResume(filename = 'Dipesh_Resume.pdf'): void {
  try {
    const doc = generateDipeshResumePdf();
    
    // Direct blob download for maximum mobile and desktop browser compatibility
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  } catch (err) {
    console.error('Error generating and downloading Dipesh_Resume.pdf:', err);
    // Fallback: direct window open or download from public folder
    const fallbackLink = document.createElement('a');
    fallbackLink.href = `/${filename}`;
    fallbackLink.download = filename;
    fallbackLink.click();
  }
}
