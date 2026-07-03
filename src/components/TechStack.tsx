"use client";

import { motion } from "framer-motion";
import {
  SiPython,
  SiFastapi,
  SiTensorflow,
  SiPytorch,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGithub,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiGoogle,
} from "react-icons/si";
import { BsOpenai } from "react-icons/bs";
import { Cpu, Brain, Network, Database, Layers } from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const techItems: TechItem[] = [
  { name: "Python", category: "Core", icon: SiPython, color: "#3776AB" },
  { name: "FastAPI", category: "Backend", icon: SiFastapi, color: "#009688" },
  { name: "TensorFlow", category: "AI", icon: SiTensorflow, color: "#FF6F00" },
  { name: "PyTorch", category: "AI", icon: SiPytorch, color: "#EE4C2C" },
  { name: "LangChain", category: "AI", icon: Network, color: "#13C2C2" },
  { name: "Gemini AI", category: "AI", icon: SiGoogle, color: "#1A73E8" },
  { name: "OpenAI API", category: "AI", icon: BsOpenai, color: "#412991" },
  { name: "Groq", category: "Hardware", icon: Cpu, color: "#F6C453" },
  { name: "RAG Systems", category: "AI Architectures", icon: Brain, color: "#D4A017" },
  { name: "Vector DBs", category: "Database", icon: Database, color: "#F6C453" },
  { name: "PostgreSQL", category: "Database", icon: SiPostgresql, color: "#4169E1" },
  { name: "Docker", category: "DevOps", icon: SiDocker, color: "#2496ED" },
  { name: "GitHub", category: "DevOps", icon: SiGithub, color: "#F9FAFB" },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, color: "#06B6D4" },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative py-28 bg-[#111827]/40 border-y border-[#D4A017]/5 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[30%] right-[-10%] w-[300px] h-[300px] rounded-full bg-[#D4A017] opacity-[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[400px] h-[400px] rounded-full bg-[#F6C453] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Title Block */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A017]/10 bg-[#1F2937]/35 text-[#D4A017] text-xs font-heading font-semibold tracking-widest uppercase mb-4">
            <Layers className="w-3.5 h-3.5" />
            Core Stack
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#F9FAFB]">
            Showcase Tech Stack
          </h2>
          <p className="font-sans text-sm md:text-base text-[#9CA3AF] max-w-xl mx-auto font-light">
            Cutting-edge libraries, architectures, and infrastructures powering next-generation artificial intelligence solutions.
          </p>
        </div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {techItems.map((item, index) => {
            const Icon = item.icon;
            
            // Random floating variables to make the screen feel alive
            const floatDuration = 4 + (index % 4) * 0.8;
            const floatDelay = (index % 5) * 0.4;
            const floatY = -6 - (index % 3) * 3;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                animate={{
                  y: [0, floatY, 0],
                }}
                // We wrap the animation in transition configuration
                transition-animate={{
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay,
                }}
                style={{
                  animation: `float-anim-${index % 4} ${floatDuration}s ease-in-out ${floatDelay}s infinite`
                }}
                className="group relative"
              >
                {/* Glow layer behind card */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${item.color}25 0%, transparent 70%)`,
                  }}
                />

                {/* Card itself */}
                <div className="relative flex flex-col items-center justify-center p-6 h-36 rounded-2xl bg-[#1F2937]/30 backdrop-blur-md border border-[#D4A017]/10 hover:border-[#D4A017]/40 hover:bg-[#1F2937]/55 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#0B0F19]/50 flex items-center justify-center border border-white/5 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    <Icon className="w-6 h-6 text-[#9CA3AF] group-hover:text-[#F6C453] transition-colors" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-[#F9FAFB] tracking-wide mb-1">
                    {item.name}
                  </h3>
                  <span className="font-sans text-[10px] text-[#9CA3AF]/70 tracking-widest uppercase">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Injecting Float Keyframes */}
      <style jsx global>{`
        @keyframes float-anim-0 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes float-anim-1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-11px); }
        }
        @keyframes float-anim-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-9px); }
        }
        @keyframes float-anim-3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}
