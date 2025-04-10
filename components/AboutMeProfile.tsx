import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  CpuChipIcon,
  HeartIcon,
  LanguageIcon,
  UserCircleIcon,
  DocumentArrowDownIcon
} from "@heroicons/react/24/solid";
import jsPDF from 'jspdf';

// Define the structure for profile data
interface EducationEntry {
  institution?: string;
  degree: string;
  year?: number | string;
  details?: string[];
  credentialId?: string;
  certNumber?: string;
  earnedDate?: string;
}

interface ProfileData {
  name: string;
  title: string;
  location: string;
  bio: string;
  education: EducationEntry[]; // Changed to an array of EducationEntry
  experience: { title: string; company: string; year: string; description: string; responsibilities: string[]; technologies: string[] }[];
  skills: { category: string; items: string[] }[];
  interests: string[];
  languages: string[];
}

// Parsed data from app/api/chat/marwan-context.txt
const marwanData: ProfileData = {
  name: "Marwan Summakieh",
  title: "SOFTWARE ENGINEER",
  location: "Copenhagen",
  // Updated Bio with friendly context from conversation history
  bio: "A creative, direct, and friendly Software Engineer passionate about front-end development and user-first design. Believes in building intuitive, efficient, and aesthetically pleasing digital experiences through calm brainstorming and clear communication. He is solution-oriented, emotionally invested in world events, and loves helping people and building things that matter. Also passionate about game development, using programming for creative storytelling and fantasy world-building, currently working on his own Dungeons & Dragons quest. Always eager to learn and adapt, currently balancing professional growth with stabilizing personal routines.",
  experience: [
    {
      title: "OUTLOOK FILE MANAGEMENT EXTENSION",
      company: "JOKER IT",
      year: "2024",
      description: "Built a Microsoft Outlook extension that streamlines document workflow by enabling users to manage email attachments and upload files directly to SharePoint without leaving their email interface.",
      responsibilities: [
        "Developed the Outlook add-in using Microsoft's Office Add-in framework.",
        "Implemented secure authentication with SharePoint.",
        "Created intuitive UI for file management operations.",
        "Built robust error handling for network issues and file conflicts.",
        "Provided documentation and user training materials."
      ],
      technologies: ["Microsoft Office Add-in Framework", "JavaScript/React", "SharePoint REST API", "OAuth authentication"]
    },
    {
      title: "AZURE PROVISIONING TOOL",
      company: "JOKER IT",
      year: "2023",
      description: "Developed an automated provisioning tool for streamlining resource allocation and management within Azure environments. This solution significantly reduced manual configuration time and ensured consistent deployment of resources across projects.",
      responsibilities: [
        "Designed and implemented the core provisioning architecture.",
        "Created an intuitive dashboard for monitoring resource allocation.",
        "Developed automated workflows for common provisioning tasks.",
        "Implemented robust error handling and logging mechanisms."
      ],
      technologies: ["Azure Resource Manager", "PowerShell/Azure CLI", "Azure Functions", "REST APIs"]
    },
    {
      title: "ZAKIS-SKRAEDDER-OG-RENSERI",
      company: "FREELANCING",
      year: "2024",
      description: "Created and implemented a website and order tracking application for ZAKI'S Skrædder & Renseri, a tailoring and dry-cleaning service. The website provides detailed information on services, pricing, and the owner's background to inform customers. The order-tracking application facilitates the management of customer orders, enhancing operational efficiency.",
      responsibilities: [
        "Provided end-to-end solutions.",
        "Used Vercel's AWS-based infrastructure.",
        "Developed web and mobile applications with Next.js and React Native.",
        "Created responsive, visually appealing interfaces with Tailwind CSS.",
        "Utilized Relume and Figma for precise UI design and prototyping."
      ],
      technologies: ["Vercel", "AWS", "Next.JS", "Python", "Tailwind CSS", "UX with Figma and Relume"]
    }
  ],
  education: [
    {
        institution: "VIA UNIVERSITY COLLEGE - DENMARK",
        degree: "BACHELOR'S IN SOFTWARE ENGINEERING",
        year: "2019 - 2022",
        details: [
            "Algorithms and Data Structures: C",
            "Dot Net development: A",
            "Game Development: B",
            "Interaction Design: A"
        ]
    },
    {
        degree: "MICROSOFT CERTIFIED: POWER PLATFORM APP MAKER ASSOCIATE",
        credentialId: "F3E768ADDBF1844",
        certNumber: "ADE462-0AECAQ",
        earnedDate: "28 April 2024"
    }
  ],
  // Skills inferred from bio and experience
  skills: [
    { category: "Front-End", items: ["React", "JavaScript", "Next.JS", "Tailwind CSS", "Microsoft Office Add-in Framework"] },
    { category: "Back-End & Scripting", items: ["C# (Learning)", "PowerShell/Azure CLI", "REST APIs"] },
    { category: "Cloud, DevOps & Infrastructure", items: ["Azure Resource Manager", "Azure Functions", "Vercel", "AWS", "CI/CD", "Git"] },
    { category: "Collaboration & Design", items: ["UX with Figma and Relume"] },
    { category: "Microsoft Ecosystem", items: ["SharePoint REST API", "Power Platform App Maker Associate (Certified)"] },
    { category: "Authentication", items: ["OAuth"] }
  ],
  languages: ["English - Bilingual", "Danish - Speaking", "Arabic - Native"],
  interests: ["Football, watching and playing", "Table tennis", "Listening to music", "Writing short stories", "Video games development"]
};

interface AboutMeProfileProps {
  onBack: () => void; // Function to handle going back
}

const AboutMeProfile: React.FC<AboutMeProfileProps> = ({ onBack }) => {
  const handleExportPDF = () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 40; // Page margin
    const contentWidth = pageWidth - margin * 2;
    let currentY = margin; // Start position after top margin
    const lineSpacing = 12; // Base line spacing
    const sectionSpacing = 20; // Space between sections

    const addText = (text: string | string[], x: number, y: number, options?: any) => {
        const fontSize = options?.fontSize || pdf.getFontSize();
        const fontStyle = options?.fontStyle || 'normal';
        const currentFontStyle = pdf.getFont().fontStyle;
        const currentFontName = pdf.getFont().fontName; // Get current font name

        // Set desired style using current font name
        pdf.setFont(currentFontName, fontStyle); // Use currentFontName
        pdf.setFontSize(fontSize);

        let textLines: string[];
        if (!Array.isArray(text)) {
            textLines = pdf.splitTextToSize(text, contentWidth - (x - margin));
        } else {
            textLines = text;
        }

        const lineHeight = fontSize * 1.15;
        const textBlockHeight = textLines.length * lineHeight;

        if (y + textBlockHeight > pageHeight - margin) {
            pdf.addPage();
            currentY = margin;
            y = currentY;
        }

        pdf.text(textLines, x, y);

        // Restore previous font style using current font name
        pdf.setFont(currentFontName, currentFontStyle); // Use currentFontName

        return y + textBlockHeight;
    };

    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0); // Black text

    // --- Header ---
    pdf.setFontSize(20);
    currentY = addText(marwanData.name, margin, currentY) + 5;
    pdf.setFontSize(14);
    currentY = addText(marwanData.title, margin, currentY) + 5;
    pdf.setFontSize(10);
    currentY = addText(marwanData.location, margin, currentY);
    currentY += sectionSpacing;

    // --- Bio ---
    pdf.setFontSize(14);
    currentY = addText("Bio", margin, currentY, { fontStyle: 'bold' });
    currentY += lineSpacing * 0.5;
    pdf.setFontSize(10);
    const bioLines = pdf.splitTextToSize(marwanData.bio, contentWidth);
    currentY = addText(bioLines, margin, currentY);
    currentY += sectionSpacing;

    // --- Experience ---
    pdf.setFontSize(14);
    currentY = addText("Experience", margin, currentY, { fontStyle: 'bold' });
    currentY += lineSpacing;
    marwanData.experience.forEach(exp => {
        pdf.setFontSize(11);
        currentY = addText(exp.title, margin, currentY, { fontStyle: 'bold' });
        pdf.setFontSize(9);
        currentY = addText(`${exp.company} (${exp.year})`, margin, currentY);
        pdf.setFontSize(10);
        currentY = addText(pdf.splitTextToSize(exp.description, contentWidth), margin, currentY, { fontStyle: 'italic' });
        currentY += lineSpacing * 0.5;

        pdf.setFontSize(9);
        currentY = addText("Responsibilities:", margin, currentY, { fontStyle: 'bold' });
        exp.responsibilities.forEach(resp => {
            currentY = addText(`- ${resp}`, margin + 10, currentY);
        });
        currentY += lineSpacing * 0.5;

        currentY = addText("Technologies:", margin, currentY, { fontStyle: 'bold' });
        currentY = addText(pdf.splitTextToSize(exp.technologies.join(', '), contentWidth - 10), margin + 10, currentY);
        currentY += lineSpacing * 1.5; // More space after each experience item
    });
    currentY += sectionSpacing - (lineSpacing * 1.5); // Adjust spacing after last item

     // --- Education ---
    pdf.setFontSize(14);
    currentY = addText("Education", margin, currentY, { fontStyle: 'bold' });
    currentY += lineSpacing;
    marwanData.education.forEach(edu => {
        pdf.setFontSize(11);
        currentY = addText(edu.degree, margin, currentY, { fontStyle: 'bold' });
        pdf.setFontSize(10);
        if(edu.institution) {
            currentY = addText(`${edu.institution} (${edu.year})`, margin, currentY);
        }
        if(edu.details) {
            pdf.setFontSize(9);
            edu.details.forEach(detail => {
                currentY = addText(`- ${detail}`, margin + 10, currentY);
            });
        }
         if(edu.credentialId) {
            pdf.setFontSize(9);
            currentY = addText(`Credential ID: ${edu.credentialId}`, margin + 10, currentY);
            currentY = addText(`Cert Number: ${edu.certNumber}`, margin + 10, currentY);
            currentY = addText(`Earned: ${edu.earnedDate}`, margin + 10, currentY);
        }
        currentY += lineSpacing * 1.5;
    });
     currentY += sectionSpacing - (lineSpacing * 1.5);

    // --- Skills ---
    pdf.setFontSize(14);
    currentY = addText("Skills", margin, currentY, { fontStyle: 'bold' });
    currentY += lineSpacing;
    pdf.setFontSize(10);
    marwanData.skills.forEach(cat => {
        currentY = addText(`${cat.category}:`, margin, currentY, { fontStyle: 'bold' });
        currentY = addText(pdf.splitTextToSize(cat.items.join(', '), contentWidth - 10), margin + 10, currentY);
        currentY += lineSpacing;
    });
    currentY += sectionSpacing - lineSpacing;

    // --- Hobbies & Interests ---
    pdf.setFontSize(14);
    currentY = addText("Hobbies & Interests", margin, currentY, { fontStyle: 'bold' });
    currentY += lineSpacing * 0.5;
    pdf.setFontSize(10);
    currentY = addText(pdf.splitTextToSize(marwanData.interests.join(', '), contentWidth), margin, currentY);
    currentY += sectionSpacing;

    // --- Languages ---
    pdf.setFontSize(14);
    currentY = addText("Languages", margin, currentY, { fontStyle: 'bold' });
    currentY += lineSpacing * 0.5;
    pdf.setFontSize(10);
    marwanData.languages.forEach(lang => {
        currentY = addText(lang, margin, currentY);
    });

    // --- Save PDF ---
    pdf.save(`${marwanData.name.replace(' ', '_')}_Profile.pdf`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const renderSection = (title: string, icon: React.ReactNode, content: React.ReactNode, key?: string) => (
    <motion.div variants={itemVariants} className="p-3 md:p-4 mb-4" key={key || title}>
      <h3 className="flex items-center text-base md:text-lg font-semibold text-blue-300 mb-2">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      {content}
    </motion.div>
  );

  return (
    <motion.div
      key="about-me-profile"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="relative z-10 w-full max-w-4xl mx-auto px-2 md:px-8 py-4 text-white overflow-y-auto h-[calc(100vh-6rem)] bg-gradient-to-br from-[#0b0f19] via-[#121433] to-[#0b0f19]"
    >
      <div className="sticky top-2 left-2 z-30 flex gap-2 mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-blue-300 hover:text-blue-100 transition-colors p-1.5 md:p-2 rounded-md bg-slate-800/60 hover:bg-slate-700/80 backdrop-blur-sm text-sm"
          aria-label="Go back to options"
        >
          <ArrowLeftIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />
          Back
        </button>
        <button
          onClick={handleExportPDF}
          className="flex items-center text-green-300 hover:text-green-100 transition-colors p-1.5 md:p-2 rounded-md bg-slate-800/60 hover:bg-slate-700/80 backdrop-blur-sm text-sm"
          aria-label="Export Profile as PDF"
        >
          <DocumentArrowDownIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />
          Export PDF
        </button>
      </div>

      <motion.div variants={itemVariants} className="text-center mb-6 md:mb-8 profile-section">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 mb-1">{marwanData.name}</h1>
        <p className="text-lg md:text-xl text-blue-200">{marwanData.title}</p>
        <p className="text-xs md:text-sm text-neutral-400">{marwanData.location}</p>
      </motion.div>

      {renderSection("Bio", <UserCircleIcon className="h-5 w-5" />, <p className="text-neutral-300 text-xs md:text-sm whitespace-pre-line">{marwanData.bio}</p>)}

      {renderSection("Experience", <BriefcaseIcon className="h-5 w-5" />, (
        <div className="space-y-5 md:space-y-6">
          {marwanData.experience.map((exp, index) => (
            <div key={index} className="profile-section text-neutral-300 border-l-2 border-blue-700/50 pl-3 md:pl-4">
              <h4 className="text-sm md:text-base font-semibold text-blue-200 mb-1">{exp.title}</h4>
              <p className="text-xs text-neutral-400 mb-1">{exp.company} ({exp.year})</p>
              <p className="italic mb-2 text-xs md:text-sm text-neutral-300">{exp.description}</p>
              <strong className="text-blue-300 text-xs block mb-1">Responsibilities:</strong>
              <ul className="list-disc list-inside space-y-1 mb-2 text-xs md:text-sm text-neutral-300">
                {exp.responsibilities.map((resp, idx) => <li key={idx}>{resp}</li>)}
              </ul>
              <strong className="text-blue-300 text-xs block mb-1">Technologies:</strong>
              <div className="flex flex-wrap gap-1">
                {exp.technologies.map((tech, idx) => (
                  <span key={idx} className="text-[10px] md:text-xs bg-blue-900/50 text-blue-200 px-1.5 md:px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {renderSection("Education", <AcademicCapIcon className="h-5 w-5" />, (
        <div className="space-y-3 md:space-y-4">
          {marwanData.education.map((edu, index) => (
            <div key={index} className="profile-section text-neutral-300 text-xs md:text-sm">
                <p className="font-semibold text-sm md:text-base text-blue-200">{edu.degree}</p>
                {edu.institution && <p>{edu.institution} ({edu.year})</p>}
                {edu.details && (
                    <ul className="list-disc list-inside mt-1 text-[11px] md:text-xs text-neutral-400">
                        {edu.details.map((detail, idx) => <li key={idx}>{detail}</li>)}
                    </ul>
                )}
                {edu.credentialId && (
                    <div className="mt-1 text-[11px] md:text-xs text-neutral-400">
                        <p>Credential ID: {edu.credentialId}</p>
                        <p>Cert Number: {edu.certNumber}</p>
                        <p>Earned: {edu.earnedDate}</p>
                    </div>
                )}
            </div>
          ))}
        </div>
      ))}

      {renderSection("Skills", <CodeBracketIcon className="h-5 w-5" />, (
        <div className="space-y-2 md:space-y-3">
          {marwanData.skills.map((skillCat, index) => (
            <div key={index} className="profile-section">
              <p className="text-blue-300 font-medium text-xs md:text-sm mb-1">{skillCat.category}:</p>
              <div className="flex flex-wrap gap-1">
                {skillCat.items.map((skill, idx) => (
                  <span key={idx} className="text-[10px] md:text-xs bg-blue-900/50 text-blue-200 px-1.5 md:px-2 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Hobbies & Interests Section */}
      {renderSection("Hobbies & Interests", <HeartIcon className="h-5 w-5" />, (
        <div className="flex flex-wrap gap-1 md:gap-2">
          {marwanData.interests.map((interest, index) => (
            <span key={index} className="profile-section text-xs md:text-sm bg-purple-900/50 text-purple-200 px-1.5 md:px-2 py-0.5 rounded-full">
              {interest}
            </span>
          ))}
        </div>
      ), "hobbies")}

      {/* Languages Section */}
      {renderSection("Languages", <LanguageIcon className="h-5 w-5" />, (
        <ul className="profile-section list-disc list-inside text-neutral-300 text-xs md:text-sm">
          {marwanData.languages.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
      ), "languages")}

    </motion.div>
  );
};

export default AboutMeProfile; 