"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const coreInterests = [
  "Large Language Models",
  "Retriever-Augmented Gen",
  "AI Systems Engineering",
  "Machine Learning",
  "Deep Learning",
  "API Development",
  "Data Science",
  "Neural Networks",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-[#0B0F19] overflow-hidden border-t border-white/5">
      {/* Background Gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#D4A017] opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#F6C453] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Bio Story */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Capsule Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A017]/35 bg-[#1F2937]/35 text-[#D4A017] text-[10px] font-mono tracking-widest uppercase w-max">
              About Me
            </div>
            
            {/* Bio Paragraphs */}
            <div className="space-y-6 text-[#9CA3AF] font-sans text-base md:text-[17px] leading-relaxed font-light">
              <p>
                I am an aspiring <span className="text-[#D4A017] font-normal">AI Engineer</span> dedicated to building intelligent, AI-driven applications that solve real-world problems. Passionate about Machine Learning, Generative AI, and modern backend development, I enjoy transforming innovative ideas into scalable, production-ready solutions.
              </p>
              <p>
                With hands-on experience in <span className="text-[#F9FAFB] font-normal">Python</span>, <span className="text-[#F9FAFB] font-normal">FastAPI</span>, <span className="text-[#F9FAFB] font-normal">Machine Learning</span>, <span className="text-[#F9FAFB] font-normal">Retrieval-Augmented Generation (RAG)</span>, <span className="text-[#F9FAFB] font-normal">Large Language Models (LLMs)</span>, <span className="text-[#F9FAFB] font-normal">Embeddings</span>, and <span className="text-[#F9FAFB] font-normal">Semantic Search</span>, I continuously explore emerging AI technologies and I enjoy solving real-world problems using technology and creating smart applications that can help people in everyday life.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Core Interests Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 w-full"
          >
            <div className="p-8 rounded-3xl border border-[#D4A017]/10 bg-[#1F2937]/15 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-[#D4A017]/25 transition-colors duration-500">
              {/* Subtle inner gold glow */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-[#D4A017] opacity-[0.03] blur-[40px] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-500" />
              
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#9CA3AF]/60 mb-6 font-semibold">
                Core Interest
              </h3>

              <div className="flex flex-col">
                {coreInterests.map((interest, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-center gap-4 py-3.5 border-b border-white/5 last:border-0 hover:translate-x-1 transition-transform duration-300 group/item"
                  >
                    <Activity className="w-4 h-4 text-[#D4A017] shrink-0 opacity-80 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-300" />
                    <span className="font-mono text-xs md:text-sm text-[#F9FAFB] tracking-wide font-medium">
                      {interest}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
