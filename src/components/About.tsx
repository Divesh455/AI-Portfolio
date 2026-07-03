"use client";

import { motion } from "framer-motion";
import { User, BookOpen, Briefcase, Award } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  type: "education" | "experience" | "milestone";
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2024 - Present",
    title: "Lead AI Systems Architect",
    institution: "Autonomous Intelligence Lab",
    type: "experience",
    description:
      "Architecting state-of-the-art Generative AI applications, fine-tuning large language models, building real-time embedding pipelines, and deploying high-throughput FastAPI endpoints.",
  },
  {
    year: "2022 - 2024",
    title: "Senior Machine Learning Developer",
    institution: "Cognitive Systems Corp",
    type: "experience",
    description:
      "Built production-ready computer vision pipelines and NLP parsers. Scaled training routines using PyTorch, deployed REST microservices on Docker, and integrated vector search caches.",
  },
  {
    year: "2020 - 2022",
    title: "B.Tech in Artificial Intelligence",
    institution: "Tech University",
    type: "education",
    description:
      "Graduated with honors. Specialization in deep learning algorithms, statistical neural modeling, mathematical foundations of machine learning, and concurrent databases.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-[#111827]/30 border-y border-[#D4A017]/5 overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-[#D4A017] opacity-[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] rounded-full bg-[#F6C453] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Bio Story */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A017]/10 bg-[#1F2937]/35 text-[#D4A017] text-xs font-heading font-semibold tracking-widest uppercase mb-2 w-max">
              <User className="w-3.5 h-3.5" />
              The Developer
            </div>
            
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-2 text-[#F9FAFB]">
              About Divesh
            </h2>
            
            <p className="font-sans text-sm md:text-base text-[#9CA3AF] leading-relaxed font-light">
              I am an AI Engineer dedicated to translating complex machine learning research into highly optimized, production-ready software solutions.
            </p>
            <p className="font-sans text-sm md:text-base text-[#9CA3AF] leading-relaxed font-light">
              With deep technical expertise in PyTorch, FastAPI, Vector Indexes, and Generative LLM orchestration, I bridge the gap between model prototyping and scalable application delivery. I design systems that think, react, and scale with minimal friction.
            </p>

            {/* Quick Stats Panel */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl border border-white/5 bg-[#1F2937]/15">
                <span className="font-heading text-2xl font-bold text-[#D4A017] block">2+</span>
                <span className="font-sans text-[10px] text-[#9CA3AF] tracking-widest uppercase">Years Exp</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#1F2937]/15">
                <span className="font-heading text-2xl font-bold text-[#D4A017] block">20+</span>
                <span className="font-sans text-[10px] text-[#9CA3AF] tracking-widest uppercase">Deployments</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#1F2937]/15">
                <span className="font-heading text-2xl font-bold text-[#D4A017] block">10M+</span>
                <span className="font-sans text-[10px] text-[#9CA3AF] tracking-widest uppercase">API Queries</span>
              </div>
            </div>
          </div>

          {/* Right: Vertical Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h3 className="font-heading text-xl font-bold text-[#F9FAFB] tracking-wide mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D4A017]" />
              Journey & Milestones
            </h3>

            <div className="relative border-l border-[#D4A017]/25 ml-4 pl-8 space-y-12">
              {timelineData.map((item, idx) => {
                const IconComponent = item.type === "education" ? BookOpen : Briefcase;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="relative group"
                  >
                    {/* Glowing dot on timeline */}
                    <div className="absolute left-[-42px] top-1.5 w-6 h-6 rounded-full bg-[#0B0F19] border-2 border-[#D4A017] flex items-center justify-center shadow-lg shadow-[#D4A017]/20 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-3.5 h-3.5 text-[#D4A017]" />
                    </div>

                    {/* Card container */}
                    <div className="p-6 rounded-2xl bg-[#1F2937]/20 backdrop-blur-md border border-[#D4A017]/10 hover:border-[#D4A017]/30 hover:bg-[#1F2937]/35 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-semibold text-[#D4A017] tracking-wider">
                          {item.year}
                        </span>
                        <span className="font-sans text-[10px] text-[#9CA3AF]/60 tracking-wider uppercase font-medium">
                          {item.institution}
                        </span>
                      </div>
                      
                      <h4 className="font-heading text-lg font-bold text-[#F9FAFB] mb-2">
                        {item.title}
                      </h4>
                      
                      <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
