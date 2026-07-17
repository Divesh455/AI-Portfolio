"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  dates: string;
  logoLetter: string;
  details: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Xlofy AI",
    role: "Data Science Intern",
    location: "Thane, Maharashtra (Remote)",
    dates: "June 2026 - July 2026",
    logoLetter: "X",
    details: [
      "Developed end-to-end Machine Learning solutions for house price prediction, employee attrition analysis, and sales forecasting using Python, Scikit-learn, and XGBoost.",
      "Built interactive Streamlit dashboards featuring sales forecasting, anomaly detection, demand segmentation, and business insights to support data-driven decision-making.",
      "Implemented data preprocessing, feature engineering, time series forecasting, and model evaluation by comparing multiple ML models to deliver accurate and deployable AI solutions.",
    ],
  },
  {
    company: "Code: Automata Ver 2.1 Hackathon",
    role: "AI Lead Developer",
    location: "Panvel, Maharashtra,(in",
    dates: "July 2026",
    logoLetter: "C",
    details: [
      "Developed an LLM-powered AI assistant to provide context-aware emotional guidance, enabling supportive and personalized interactions based on user input.",
      "Designed and integrated AI-driven mental wellness features, including emotion-aware conversations and intelligent guidance workflows, enhancing user engagement and emotional support",
      "Collaborated on the AI architecture by integrating LLM capabilities into the platform, delivering scalable AI-powered assistance for a secure mental wellness ecosystem.",
    ],
  },
  {
    company: "Confluence 2.0 Hackathon",
    role: "AI Lead Developer",
    location: "Online",
    dates: "June 2026",
    logoLetter: "C",
    details: [
      "Architected an AI-powered coaching management platform featuring personalized study plans, performance prediction, AI-generated mock tests, and intelligent student assistance for coaching institutes.",
      "Developed Generative AI features using FastAPI, LangChain, and Gemini/Groq APIs, enabling AI study assistance, automated question generation, and parent-focused performance insights.",
      "Designed an intelligent ecosystem with Student, Teacher, and Parent portals, integrating predictive analytics, at-risk student detection, automated reporting, and real-time academic insights.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 bg-[#0B0F19] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-[#D4A017] opacity-[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#F6C453] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A017]/10 bg-[#1F2937]/35 text-[#D4A017] text-xs font-heading font-semibold tracking-widest uppercase mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            Career
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#F9FAFB]">
            Work & Hackathons
          </h2>
          <p className="font-sans text-sm md:text-base text-[#9CA3AF] max-w-xl mx-auto font-light">
            A chronological timeline of my Data Science internship and leading AI development in competitive hackathons.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-[#D4A017]/20 ml-6 md:ml-32 space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline marker */}
              <div className="absolute left-[-21px] top-1.5 w-10 h-10 rounded-xl bg-[#111827] border-2 border-[#D4A017]/40 flex items-center justify-center text-[#D4A017] font-heading font-bold shadow-lg shadow-black/40 group">
                {exp.logoLetter}
              </div>

              {/* Side Date (Desktop Only) */}
              <div className="hidden md:block absolute left-[-168px] top-3.5 w-32 text-right">
                <span className="font-mono text-xs font-semibold text-[#D4A017] tracking-wider block">
                  {exp.dates}
                </span>
                <span className="font-sans text-[9px] text-[#9CA3AF]/60 uppercase tracking-widest block mt-1">
                  {exp.location}
                </span>
              </div>

              {/* Experience Card */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#1F2937]/25 backdrop-blur-md border border-[#D4A017]/10 hover:border-[#D4A017]/30 hover:bg-[#1F2937]/35 transition-all duration-300">
                {/* Date & Location (Mobile Only) */}
                <div className="md:hidden flex flex-wrap items-center gap-3 mb-4 text-xs font-mono">
                  <span className="flex items-center gap-1 text-[#D4A017]">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.dates}
                  </span>
                  <span className="flex items-center gap-1 text-[#9CA3AF]/60">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>

                {/* Job Title and Company */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-6">
                  <h3 className="font-heading text-lg md:text-xl font-bold text-[#F9FAFB]">
                    {exp.role}
                  </h3>
                  <span className="font-heading text-sm text-[#D4A017] font-semibold">
                    {exp.company}
                  </span>
                </div>

                {/* Bullet details */}
                <ul className="space-y-3.5">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
                      <span className="font-sans text-xs md:text-sm text-[#9CA3AF] leading-relaxed font-light">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
