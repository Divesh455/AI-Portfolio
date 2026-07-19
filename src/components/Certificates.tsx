"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  id?: string;
  link: string;
}

const certificatesList: Certificate[] = [
  {
    title: "The Ultimate Job Ready Data Science Course",
    issuer: "Code With Harry",
    date: "Dec 2025",
    id: "CWH-THE-ULTIMATE-JOB-READY-DATA-SCIENCE-COURSE-34QTDGAX",
    link: "https://drive.google.com/file/d/13QNwB4X7vru8xeyuG4NoZ9UlTofr_0G4/view?usp=sharing",
  },
  {
    title: "Introduction to Generative AI Studio",
    issuer: "Simplilearn",
    date: "Jun 2026",
    id: "10343153",
    link: "https://drive.google.com/file/d/1NmkGCUOeH3kCjAzrbqMOfa4X47UkHCKD/view?usp=sharing",
  },
  {
    title: "Confluence 2.0 Hackathon",
    issuer: "Confluence 2.0 - Beyond The Edge of Possibility",
    date: "Jun 2026",
    link: "https://drive.google.com/file/d/1THdBgMZvIqUw9-aHELjCdPGZfsDZ3lf1/view?usp=sharing",
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-32 bg-bg-secondary/20 border-y border-gold/5 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-gold opacity-[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-gold-hover opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/10 bg-bg-card/35 text-gold text-xs font-heading font-semibold tracking-widest uppercase mb-4">
            <Award className="w-3.5 h-3.5" />
            Credentials
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#F9FAFB]">
            Certifications
          </h2>
          <p className="font-sans text-sm md:text-base text-[#9CA3AF] max-w-xl mx-auto font-light">
            Verified credentials validating my expertise in data science, generative AI, and hackathon milestones.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificatesList.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative p-6 rounded-3xl bg-bg-card/35 border border-gold/10 group-hover:border-gold/40 group-hover:bg-bg-card/55 group-hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between h-56 shadow-lg shadow-black/25">
                
                {/* Gold Inner Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/5 to-gold-hover/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="w-10 h-10 rounded-xl bg-bg-dark/50 border border-white/5 flex items-center justify-center text-gold">
                    <ShieldCheck className="w-5 h-5 text-gold" />
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-bg-dark/30 hover:bg-bg-dark/70 text-[#9CA3AF] hover:text-[#F9FAFB] border border-white/5 hover:border-gold/30 transition-all duration-300"
                    aria-label={`Verify certificate: ${cert.title}`}
                  >
                    <ExternalLink className="w-4 h-4 text-gold" />
                  </a>
                </div>

                {/* Card Text Content */}
                <div className="space-y-1">
                  <span className="font-sans text-[10px] text-gold tracking-widest uppercase font-semibold block">
                    {cert.issuer}
                  </span>
                  <h3 className="font-heading text-base font-bold text-[#F9FAFB] tracking-wide leading-snug">
                    {cert.title}
                  </h3>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-xs text-[#9CA3AF]/60">
                  <span>ID: {cert.id}</span>
                  <span className="text-gold/80">{cert.date}</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
