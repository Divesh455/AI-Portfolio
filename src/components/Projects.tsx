"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Cpu, Database, Network, BrainCircuit } from "lucide-react";
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
      title: "NeuroSearch RAG",
      category: "Generative AI / Vector DB",
      description:
        "High-performance semantic retrieval-augmented generation search system utilizing sparse/dense vector embeddings and metadata filters to query 10M+ documents with sub-100ms latencies.",
      tech: ["Python", "FastAPI", "Pinecone", "PyTorch", "LangChain", "OpenAI"],
      github: "https://github.com",
      demo: "https://demo.com",
      graphic: (
        <div className="absolute inset-0 bg-[#0B0F19] overflow-hidden flex items-center justify-center p-6 border-b border-[#D4A017]/10">
          {/* Abstract Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,160,23,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,160,23,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
          {/* Node graph drawing */}
          <div className="relative w-full h-full flex items-center justify-between px-4 max-w-sm">
            <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-[#111827] border border-[#D4A017]/20 shadow-md">
              <Database className="w-5 h-5 text-[#D4A017]" />
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-[#D4A017] to-[#F6C453] relative">
              <div className="absolute left-[30%] -top-1 w-2 h-2 rounded-full bg-[#F6C453] animate-ping" />
            </div>
            <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-[#111827] border border-[#D4A017]/20 shadow-md">
              <Network className="w-5 h-5 text-[#D4A017]" />
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-[#F6C453] to-[#D4A017] relative">
              <div className="absolute left-[60%] -top-1 w-2 h-2 rounded-full bg-[#F6C453] animate-ping" />
            </div>
            <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-[#111827] border border-[#D4A017]/20 shadow-md">
              <Cpu className="w-5 h-5 text-[#D4A017]" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "SynthFlow Orchestrator",
      category: "Multi-Agent Systems",
      description:
        "Stateful workflow execution dashboard allowing developer users to assemble concurrent AI agents, tie tool APIs, and monitor prompt-chain histories in a low-latency graphical interface.",
      tech: ["Next.js", "FastAPI", "React", "PostgreSQL", "Docker", "Groq"],
      github: "https://github.com",
      demo: "https://demo.com",
      graphic: (
        <div className="absolute inset-0 bg-[#0B0F19] overflow-hidden flex items-center justify-center p-6 border-b border-[#D4A017]/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.05)_0%,transparent_70%)]" />
          <div className="relative w-full h-full flex flex-col justify-around max-w-sm">
            {/* Simulation of a linear flowchart */}
            <div className="flex items-center justify-between">
              <div className="px-3 py-1.5 rounded bg-[#111827] border border-[#D4A017]/20 text-[10px] font-mono text-[#F9FAFB] flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                QueryParser
              </div>
              <div className="px-3 py-1.5 rounded bg-[#111827] border border-[#D4A017]/20 text-[10px] font-mono text-[#F9FAFB] flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                WebAgent
              </div>
            </div>
            <div className="w-full flex justify-center">
              <div className="px-4 py-2 rounded-lg bg-[#111827] border border-[#D4A017]/40 text-xs font-mono text-[#F9FAFB] shadow-md shadow-[#D4A017]/5 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#D4A017]" />
                AgentConsensus
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "DeepVision Pipeline",
      category: "Edge Computing / Vision AI",
      description:
        "High-performance video inference pipeline implementing real-time object classification and bounding segmentation, optimized to run concurrently on local edge CUDA processors.",
      tech: ["C++", "PyTorch", "Docker", "CUDA", "FastAPI", "TensorFlow"],
      github: "https://github.com",
      demo: "https://demo.com",
      graphic: (
        <div className="absolute inset-0 bg-[#0B0F19] overflow-hidden flex items-center justify-center p-6 border-b border-[#D4A017]/10">
          {/* Scanning line simulation */}
          <div className="absolute top-0 bottom-0 left-[20%] w-[1.5px] bg-gradient-to-b from-transparent via-[#D4A017] to-transparent animate-scan" />
          <div className="relative w-44 h-24 border border-[#D4A017]/20 rounded-lg bg-[#111827]/40 flex items-center justify-center">
            <div className="absolute inset-2 border border-dashed border-[#D4A017]/10 flex items-center justify-center">
              <Cpu className="w-8 h-8 text-[#9CA3AF]/30 animate-pulse" />
            </div>
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#D4A017]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#D4A017]" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#D4A017]" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#D4A017]" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="projects" className="relative py-32 bg-[#111827]/20 border-y border-[#D4A017]/5 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[30%] left-[-15%] w-[400px] h-[400px] rounded-full bg-[#D4A017] opacity-[0.02] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[450px] h-[450px] rounded-full bg-[#F6C453] opacity-[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A017]/10 bg-[#1F2937]/35 text-[#D4A017] text-xs font-heading font-semibold tracking-widest uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Showcase
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#F9FAFB]">
            Featured Projects
          </h2>
          <p className="font-sans text-sm md:text-base text-[#9CA3AF] max-w-xl mx-auto font-light">
            Explore premium software systems delivering production artificial intelligence capabilities.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <TiltCard className="group relative rounded-3xl bg-[#1F2937]/30 border border-[#D4A017]/10 hover:border-[#D4A017]/35 overflow-hidden flex flex-col justify-between h-[480px] shadow-lg hover:shadow-[0_15px_40px_-15px_rgba(212,160,23,0.15)] transition-all duration-300">
                {/* Visual Graphic Area */}
                <div className="relative h-48 w-full select-none bg-[#0B0F19] overflow-hidden">
                  {project.graphic}
                </div>

                {/* Info Text Area */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4 relative z-20">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[10px] text-[#D4A017] tracking-widest uppercase font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-[#F9FAFB] group-hover:text-[#F6C453] transition-colors">
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
                          className="px-2 py-0.5 rounded text-[9px] font-mono border border-white/5 bg-[#0B0F19]/40 text-[#9CA3AF]"
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
                        <FaGithub className="w-4 h-4 text-[#D4A017]" />
                        GitHub
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-sans text-xs text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors ml-auto"
                      >
                        Live Demo
                        <ExternalLink className="w-3.5 h-3.5 text-[#D4A017]" />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan-anim {
          0%, 100% { left: 10%; opacity: 0.1; }
          50% { left: 90%; opacity: 0.8; }
        }
        .animate-scan {
          animation: scan-anim 3.5s linear infinite;
        }
      `}</style>
    </section>
  );
}
