"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Cpu } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  graphic: React.ReactNode;
}

// 3D Tilt Card Wrapper Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Max rotation is 6 degrees
    const rY = (mouseX / (width / 2)) * 6;
    const rX = -(mouseY / (height / 2)) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const projectsList: Project[] = [
    {
      title: "MediAI - AI Healthcare Assistant",
      category: "Generative AI / Machine Learning",
      description:
        "An AI-powered healthcare platform that combines disease prediction, chest X-ray analysis, AI chatbot assistance, medical report generation, and patient history management to deliver intelligent healthcare support.",
      tech: ["Python", "FastAPI", "Machine Learning", "Computer Vision", "LangChain", "Gemini AI"],
      github: "https://github.com/Divesh455/MediAI",
      demo: "https://mediai-d79e.onrender.com/",
      graphic: (
        <div className="absolute inset-0 bg-bg-dark overflow-hidden flex items-center justify-center p-6 border-b border-gold/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--gold-glow)_0%,transparent_70%)] opacity-20" />
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            {/* Heartbeat pulse path */}
            <svg viewBox="0 0 200 80" className="w-48 h-16 overflow-visible">
              <path
                d="M 0,40 L 40,40 L 50,20 L 55,60 L 60,40 L 90,40 L 95,10 L 100,70 L 105,40 L 140,40 L 150,30 L 155,50 L 160,40 L 200,40"
                fill="none"
                stroke="var(--theme-gold)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
              />
              {/* Glowing signal running along the heartbeat */}
              <circle r="3" fill="var(--theme-gold-hover)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M 0,40 L 40,40 L 50,20 L 55,60 L 60,40 L 90,40 L 95,10 L 100,70 L 105,40 L 140,40 L 150,30 L 155,50 L 160,40 L 200,40"
                />
              </circle>
            </svg>
            <div className="mt-2 text-[9px] font-mono text-gold tracking-widest uppercase opacity-60">
              VITAL MONITORING ACTIVE
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "AI Teaching Assistant",
      category: "GENERATIVE AI / RAG",
      description:
        "An intelligent Retrieval-Augmented Generation (RAG) system that transforms lecture videos into an interactive learning experience using speech-to-text, semantic search, embeddings, and Large Language Models.",
      tech: ["Python", "FastAPI","Gemini AI", "Embeddings", "RAG","Speech-to-Text"],
      github: "https://github.com/Divesh455/RAG-Based-Project_",
      demo: "https://github.com/Divesh455/RAG-Based-Project_",
      graphic: (
        <div className="absolute inset-0 bg-bg-dark overflow-hidden flex items-center justify-center p-6 border-b border-gold/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
          <div className="relative w-44 h-24 rounded-lg border border-gold/25 bg-bg-secondary/40 flex flex-col justify-between p-3">
            {/* Video head bar */}
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[8px] font-mono text-[#9CA3AF]">LECTURE_01.MP4</span>
            </div>
            {/* Play button and wave */}
            <div className="flex items-center justify-center gap-3 my-1">
              <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[9px] border-l-gold-hover border-b-[5px] border-b-transparent ml-0.5" />
              </div>
              {/* Animated audio bars */}
              <div className="flex items-end gap-[2px] h-6">
                <div className="w-[3px] bg-gold animate-pulse" style={{ height: "40%", animationDelay: "0.1s" }} />
                <div className="w-[3px] bg-gold-hover animate-pulse" style={{ height: "80%", animationDelay: "0.3s" }} />
                <div className="w-[3px] bg-gold animate-pulse" style={{ height: "50%", animationDelay: "0.2s" }} />
                <div className="w-[3px] bg-gold-hover animate-pulse" style={{ height: "90%", animationDelay: "0.5s" }} />
                <div className="w-[3px] bg-gold animate-pulse" style={{ height: "30%", animationDelay: "0.4s" }} />
              </div>
            </div>
            {/* Transcript text mockup */}
            <div className="text-[7px] font-mono text-gold opacity-60 text-center">
              TRANSCRIPTING: &quot;Large Language Models...&quot;
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "CinePulse - Movie Recommendation System",
      category: "MACHINE LEARNING / RECOMMENDER SYSTEM",
      description:
        "A content-based movie recommendation platform that delivers personalized movie suggestions through similarity analysis, REST APIs.",
      tech: ["Python","Scikit-learn", "Pandas", "Machine Learning", "FastAPI", "Numpy"],
      github: "https://github.com/Divesh455/movie-recommender-divesh",
      demo: "https://github.com/Divesh455/movie-recommender-divesh",
      graphic: (
        <div className="absolute inset-0 bg-bg-dark overflow-hidden flex items-center justify-center p-6 border-b border-gold/10">
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            {/* Film projector wheel */}
            <div className="relative flex items-center justify-center w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-20 h-20 animate-[spin_10s_linear_infinite] opacity-30">
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--theme-gold)" strokeWidth="1.5" strokeDasharray="6,4" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="var(--theme-gold)" strokeWidth="1.5" />
                <line x1="50" y1="20" x2="50" y2="80" stroke="var(--theme-gold)" strokeWidth="1" />
                <line x1="20" y1="50" x2="80" y2="50" stroke="var(--theme-gold)" strokeWidth="1" />
              </svg>
              {/* Center icon */}
              <div className="absolute w-10 h-10 rounded-full bg-bg-secondary border border-gold/35 flex items-center justify-center shadow-lg">
                <div className="text-[14px] text-gold-hover font-bold">★</div>
              </div>
              {/* Floating suggestions */}
              <div className="absolute -top-1 -left-2 px-2 py-0.5 rounded bg-bg-secondary/80 border border-gold/30 text-[8px] font-mono text-[#F9FAFB] shadow-md animate-bounce" style={{ animationDuration: "3s" }}>
                Sci-Fi 98%
              </div>
              <div className="absolute bottom-2 -right-4 px-2 py-0.5 rounded bg-bg-secondary/80 border border-gold/30 text-[8px] font-mono text-gold-hover shadow-md animate-bounce" style={{ animationDuration: "4s", animationDelay: "0.5s" }}>
                Action 95%
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Sales Forecasting & Demand Intelligence",
      category: "MACHINE LEARNING / FORECASTING",
      description:
        "An end-to-end forecasting platform that predicts future sales, detects anomalies, segments product demand, and provides interactive business insights through a modern analytics dashboard.",
      tech: ["Python","XGBoost", "Prophet", "Machine Learning", "SARIMA", "Pandas","Streamlit","Plotly","Sklearn"],
      github: "https://github.com/Divesh455/SalesForecasting",
      demo: "https://salesforecastingdiveshmatkar.streamlit.app/",
      graphic: (
        <div className="absolute inset-0 bg-bg-dark overflow-hidden flex items-center justify-center p-6 border-b border-gold/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--gold-glow)_1px,transparent_1px),linear-gradient(to_bottom,var(--gold-glow)_1px,transparent_1px)] bg-[size:14px_14px]" />
          <div className="relative w-full h-full flex flex-col justify-end max-w-xs pb-2">
            <svg viewBox="0 0 200 100" className="w-full h-24 overflow-visible">
              <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="50" x2="200" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <path
                d="M 0,75 L 30,68 L 60,78 L 90,55 L 120,62 L 140,48"
                fill="none"
                stroke="rgba(156, 163, 175, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 140,48 L 160,35 L 180,45 L 200,20"
                fill="none"
                stroke="var(--theme-gold-hover)"
                strokeWidth="2"
                strokeDasharray="4,4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="200" cy="20" r="4" fill="var(--theme-gold-hover)" />
              <circle cx="200" cy="20" r="10" fill="none" stroke="var(--theme-gold-hover)" strokeWidth="1" className="animate-ping" style={{ transformOrigin: "200px 20px" }} />
              <text x="5" y="15" fill="rgba(156,163,175,0.6)" fontSize="8" fontFamily="monospace">Historical</text>
              <text x="145" y="15" fill="var(--theme-gold-hover)" fontSize="8" fontFamily="monospace">Forecast</text>
            </svg>
          </div>
        </div>
      ),
    },
    {
      title: "House Price Prediction",
      category: "MACHINE LEARNING / PREDICTIVE ANALYTICS",
      description:
        "A machine learning application that estimates residential property prices using feature engineering, regression models, and exploratory data analysis to support data-driven real estate decisions.",
      tech: ["Python","Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
      github: "https://github.com/Divesh455/Predict_House_Price",
      demo: "https://github.com/Divesh455/Predict_House_Price",
      graphic: (
        <div className="absolute inset-0 bg-bg-dark overflow-hidden flex items-center justify-center p-6 border-b border-gold/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--gold-glow)_1px,transparent_1px),linear-gradient(to_bottom,var(--gold-glow)_1px,transparent_1px)] bg-[size:12px_12px]" />
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            {/* SVG House Blueprint */}
            <svg viewBox="0 0 100 80" className="w-24 h-20 overflow-visible">
              <rect x="15" y="35" width="70" height="35" fill="none" stroke="var(--theme-gold)" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="2,2" />
              <polygon points="50,10 10,40 20,40 20,70 80,70 80,40 90,40" fill="none" stroke="var(--theme-gold)" strokeWidth="1.5" />
              <rect x="40" y="50" width="20" height="20" fill="none" stroke="var(--theme-gold)" strokeWidth="1" />
              <rect x="25" y="45" width="10" height="10" fill="none" stroke="var(--theme-gold)" strokeWidth="1" />
              <rect x="65" y="45" width="10" height="10" fill="none" stroke="var(--theme-gold)" strokeWidth="1" />
              <g transform="translate(40, 22)">
                <rect x="-10" y="-8" width="40" height="12" rx="3" fill="var(--theme-bg-secondary)" stroke="var(--theme-gold-hover)" strokeWidth="1" />
                <text x="10" y="1" fill="var(--theme-gold-hover)" fontSize="7" textAnchor="middle" fontFamily="monospace" fontWeight="bold">$420k</text>
              </g>
            </svg>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="projects" className="relative py-32 bg-bg-secondary/20 border-y border-gold/5 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[30%] left-[-15%] w-[400px] h-[400px] rounded-full bg-gold opacity-[0.02] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[450px] h-[450px] rounded-full bg-gold-hover opacity-[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/10 bg-bg-card/35 text-gold text-xs font-heading font-semibold tracking-widest uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Showcase
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#F9FAFB]">
            Featured Projects
          </h2>
          <p className="font-sans text-sm md:text-base text-[#9CA3AF] max-w-xl mx-auto font-light">
            A curated collection of my data science pipelines, time-series forecasting engines, and LLM-powered applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <TiltCard className="group relative rounded-3xl bg-bg-card/30 border border-gold/10 hover:border-gold/35 overflow-hidden flex flex-col justify-between h-[480px] shadow-lg hover:shadow-[0_15px_40px_-15px_var(--gold-glow)] transition-all duration-300">
                {/* Visual Graphic Area */}
                <div className="relative h-48 w-full select-none bg-bg-dark overflow-hidden">
                  {project.graphic}
                </div>

                {/* Info Text Area */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4 relative z-20">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[10px] text-gold tracking-widest uppercase font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-[#F9FAFB] group-hover:text-gold-hover transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-0.5 rounded text-[9px] font-mono border border-white/5 bg-bg-dark/40 text-[#9CA3AF]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-sans text-xs text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
                      >
                        <FaGithub className="w-4 h-4 text-gold" />
                        GitHub
                      </a>
                      {project.demo !== project.github && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 font-sans text-xs text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors ml-auto"
                        >
                          Live Demo
                          <ExternalLink className="w-3.5 h-3.5 text-gold" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-anim {
          0%, 100% { left: 10%; opacity: 0.1; }
          50% { left: 90%; opacity: 0.8; }
        }
        .animate-scan {
          animation: scan-anim 3.5s linear infinite;
        }
      `}} />
    </section>
  );
}
