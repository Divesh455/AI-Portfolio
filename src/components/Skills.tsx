"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  BrainCircuit,
  Server,
  Database,
  Cloud,
  Wrench,
  Sparkles,
} from "lucide-react";

type SkillCategory = "Programming" | "AI" | "Backend" | "Database" | "Cloud" | "Tools";

interface SkillItem {
  name: string;
  level: number; // percentage
  description: string;
}

const skillsData: Record<SkillCategory, SkillItem[]> = {
  Programming: [
    { name: "Python", level: 98, description: "Dynamic modeling, algorithmic scriptings, data parsing" },
    { name: "TypeScript", level: 85, description: "Structured application frontends and type-safe systems" },
    { name: "Rust", level: 75, description: "Performant system binaries and extensions integration" },
    { name: "C++", level: 80, description: "Low-level model computation optimization" },
    { name: "JavaScript", level: 90, description: "Web interactivity, responsive layouts, API bindings" },
  ],
  AI: [
    { name: "PyTorch", level: 95, description: "Neural layers definition, custom loss optimization" },
    { name: "TensorFlow", level: 85, description: "Deep modeling, Keras wrappers, production deployment" },
    { name: "LangChain", level: 92, description: "Agent orchestration, tool binds, memory wrappers" },
    { name: "RAG & Vector Search", level: 95, description: "Cosine math indexes, chunk hierarchies, hybrid ranks" },
    { name: "LLM Fine-Tuning", level: 88, description: "LoRA adapters, QLoRA quantization, dataset masks" },
    { name: "Hugging Face", level: 90, description: "Pipeline deployment, tokenizer custom configurations" },
  ],
  Backend: [
    { name: "FastAPI", level: 98, description: "Asynchronous router definitions, Pydantic type validation" },
    { name: "Django", level: 80, description: "Monolithic database tools, custom session handlers" },
    { name: "Flask", level: 85, description: "Microservices design, rapid application prototype mocks" },
    { name: "RESTful APIs", level: 95, description: "JSON routing payloads, auth headers, rate limits" },
    { name: "WebSockets", level: 88, description: "Bi-directional sockets, real-time message relays" },
  ],
  Database: [
    { name: "PostgreSQL", level: 90, description: "Relational table schemas, index strategies, transaction queries" },
    { name: "MongoDB", level: 88, description: "NoSQL document mappings, aggregations pipeline indexes" },
    { name: "Redis", level: 92, description: "Caching layers, distributed sessions store, pub/sub relays" },
    { name: "Pinecone", level: 95, description: "Cloud vector database indexes, namespace isolation partitions" },
    { name: "Qdrant", level: 90, description: "Local payload filters, vector metrics similarities search" },
  ],
  Cloud: [
    { name: "AWS", level: 85, description: "EC2 instances, S3 storage buckets, Lambda compute functions" },
    { name: "Google Cloud (GCP)", level: 88, description: "Compute engines, Vertex AI modeling platforms" },
    { name: "Docker", level: 92, description: "Containerized Dockerfiles, network bridges, volume mounts" },
    { name: "Kubernetes", level: 78, description: "Pods deployments, service loaders, namespace managers" },
    { name: "CI/CD & Actions", level: 90, description: "Continuous integration tests, build automation triggers" },
  ],
  Tools: [
    { name: "Git & Versioning", level: 95, description: "Branch merging pipelines, pull requests, merge conflict resolutions" },
    { name: "Linux / Bash", level: 90, description: "Server administration commands, automation shell scripts" },
    { name: "Weights & Biases", level: 85, description: "Hyperparameter tuning tracking, loss plots logs" },
    { name: "Poetry / Pyproject", level: 92, description: "Python project dependency lock, isolated venv managers" },
    { name: "Postman", level: 90, description: "API endpoints mocks, request runner test suites" },
  ],
};

const categoryIcons: Record<SkillCategory, React.ComponentType<{ className?: string }>> = {
  Programming: Code,
  AI: BrainCircuit,
  Backend: Server,
  Database: Database,
  Cloud: Cloud,
  Tools: Wrench,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("Programming");

  const categories = Object.keys(skillsData) as SkillCategory[];

  return (
    <section id="skills" className="relative py-32 bg-[#0B0F19] overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#D4A017] opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#F6C453] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A017]/10 bg-[#1F2937]/35 text-[#D4A017] text-xs font-heading font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Abilities
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#F9FAFB]">
            Technical Competencies
          </h2>
          <p className="font-sans text-sm md:text-base text-[#9CA3AF] max-w-xl mx-auto font-light">
            An extensive breakdown of technical methodologies, architectures, and deployment paradigms.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border text-xs font-heading font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#D4A017] to-[#F6C453] border-transparent text-[#0B0F19] shadow-md shadow-[#D4A017]/15 hover:opacity-95"
                    : "bg-[#1F2937]/20 border-[#D4A017]/10 text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#D4A017]/35"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category}
              </button>
            );
          })}
        </div>

        {/* Dynamic Skill Cards Grid */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {skillsData[activeCategory].map((skill, index) => (
                <div
                  key={skill.name}
                  className="group relative rounded-2xl p-6 bg-[#1F2937]/20 border border-[#D4A017]/10 hover:border-[#D4A017]/40 hover:bg-[#1F2937]/35 transition-all duration-300 flex flex-col justify-between h-44 overflow-hidden"
                >
                  {/* Subtle hover glow ring inside the card */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4A017]/5 to-[#F6C453]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div>
                    {/* Header: Skill Name & Level */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-heading text-base font-bold text-[#F9FAFB]">
                        {skill.name}
                      </h3>
                      <span className="font-mono text-xs text-[#D4A017] font-semibold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Paragraph description */}
                    <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed font-light mb-4">
                      {skill.description}
                    </p>
                  </div>

                  {/* Level Indicator Vector */}
                  <div>
                    <div className="w-full h-1 bg-[#0B0F19] rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                        className="h-full bg-gradient-to-r from-[#D4A017] to-[#F6C453] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
