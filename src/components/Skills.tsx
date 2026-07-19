"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Network } from "lucide-react";

interface Category {
  name: string;
  description: string;
  score: number;
  skills: string[];
}

const categories: Category[] = [
  {
    name: "AI & Generative AI",
    description: "Designing generative content ecosystems. Expert in Large Language Models (LLMs), Natural Language Processing (NLP), custom RAG workflows, prompt engineering modules, and embedding architectures.",
    score: 0.96,
    skills: ["LLMs", "NLP", "RAG", "Prompt Engineering", "Embedding Models"]
  },
  {
    name: "Data Science & Machine Learning",
    description: "Analyzing large technical datasets. Proficient in tabular transformations (Pandas, NumPy), data profiling, engineering optimal features, statistical models, and validation diagnostics.",
    score: 0.92,
    skills: ["Pandas", "NumPy", "Data Analysis", "Feature Engineering", "Model Evaluation", "Matplotlib", "Seaborn"]
  },
  {
    name: "AI Frameworks",
    description: "Building production modeling workflows. Skilled in Langchain agents, Hugging Face transformers pipelines, and standard Scikit-learn estimation pipelines.",
    score: 0.90,
    skills: ["Langchain", "Hugging Face", "Scikit-learn"]
  },
  {
    name: "Programming and backend",
    description: "Engineering performant server microservices and algorithmic endpoints. Strong foundations in Python, JavaScript, C++, C, FastAPI routers, and Pydantic validation.",
    score: 0.95,
    skills: ["Python", "JavaScript", "C++", "C", "FastAPI", "Pydantic"]
  },
  {
    name: "Database & Data Management",
    description: "Configuring robust index caches and vectors stores. Practical experience with MySQL relational databases, real-time data processing, and custom vector indexes.",
    score: 0.88,
    skills: ["MySQL", "Data Processing", "Vector Store"]
  },
  {
    name: "Developer Tools",
    description: "Maintaining automated, scalable developer environments. Everyday usage of Git version systems, GitHub branches, Jupyter Notebooks, Google AI Studio, VS Code, and Google Colab.",
    score: 0.94,
    skills: ["Git", "GitHub", "Jupyter Notebook", "Google AI Studio", "VS Code", "Google Colab"]
  }
];

interface SkillBadge {
  name: string;
  category: string;
  x: number;
  y: number;
}

const skillBadges: SkillBadge[] = [
  // AI & Generative AI (Vertex 0: 0, -150)
  { name: "LLMs", category: "AI & Generative AI", x: 0, y: -200 },
  { name: "NLP", category: "AI & Generative AI", x: -85, y: -185 },
  { name: "RAG", category: "AI & Generative AI", x: 85, y: -185 },
  { name: "Prompt Engineering", category: "AI & Generative AI", x: -125, y: -150 },
  { name: "Embedding Models", category: "AI & Generative AI", x: 125, y: -150 },

  // Data Science & ML (Vertex 1: 130, -75)
  { name: "Pandas", category: "Data Science & Machine Learning", x: 165, y: -140 },
  { name: "NumPy", category: "Data Science & Machine Learning", x: 210, y: -90 },
  { name: "Data Analysis", category: "Data Science & Machine Learning", x: 215, y: -35 },
  { name: "Feature Engineering", category: "Data Science & Machine Learning", x: 140, y: -175 },
  { name: "Model Evaluation", category: "Data Science & Machine Learning", x: 210, y: 20 },
  { name: "Matplotlib", category: "Data Science & Machine Learning", x: 95, y: -200 },
  { name: "Seaborn", category: "Data Science & Machine Learning", x: 175, y: 80 },

  // AI Frameworks (Vertex 2: 130, 75)
  { name: "Langchain", category: "AI Frameworks", x: 195, y: 125 },
  { name: "Hugging Face", category: "AI Frameworks", x: 145, y: 165 },
  { name: "Scikit-learn", category: "AI Frameworks", x: 90, y: 205 },

  // Programming and backend (Vertex 3: 0, 150)
  { name: "Python", category: "Programming and backend", x: 0, y: 220 },
  { name: "FastAPI", category: "Programming and backend", x: 80, y: 190 },
  { name: "Pydantic", category: "Programming and backend", x: -80, y: 190 },
  { name: "JavaScript", category: "Programming and backend", x: 140, y: 155 },
  { name: "C++", category: "Programming and backend", x: -140, y: 155 },
  { name: "C", category: "Programming and backend", x: 0, y: 170 },

  // Database & Data Management (Vertex 4: -130, 75)
  { name: "MySQL", category: "Database & Data Management", x: -175, y: 110 },
  { name: "Data Processing", category: "Database & Data Management", x: -210, y: 60 },
  { name: "Vector Store", category: "Database & Data Management", x: -215, y: 10 },

  // Developer Tools (Vertex 5: -130, -75)
  { name: "Git", category: "Developer Tools", x: -195, y: -45 },
  { name: "GitHub", category: "Developer Tools", x: -210, y: -95 },
  { name: "Jupyter Notebook", category: "Developer Tools", x: -130, y: -175 },
  { name: "Google AI Studio", category: "Developer Tools", x: -110, y: -210 },
  { name: "VS Code", category: "Developer Tools", x: -60, y: -210 },
  { name: "Google Colab", category: "Developer Tools", x: -180, y: -135 },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("AI & Generative AI");

  // Hexagon math parameters (center of 500x500 is 250, 250)
  const cx = 250;
  const cy = 250;
  const maxR = 155;

  // 6 vertices directions (x, y offsets on a unit circle)
  const vertices = [
    { name: "AI & Generative AI", dx: 0, dy: -1 },
    { name: "Data Science & Machine Learning", dx: 0.866, dy: -0.5 },
    { name: "AI Frameworks", dx: 0.866, dy: 0.5 },
    { name: "Programming and backend", dx: 0, dy: 1 },
    { name: "Database & Data Management", dx: -0.866, dy: 0.5 },
    { name: "Developer Tools", dx: -0.866, dy: -0.5 }
  ];

  const selectedCategoryData = categories.find(c => c.name === activeCategory) || categories[0];

  // Calculate polygon points based on category scores
  const radarPoints = categories.map((cat) => {
    const vIndex = vertices.findIndex(v => v.name === cat.name);
    const v = vertices[vIndex];
    const r = cat.score * maxR;
    return `${cx + v.dx * r},${cy + v.dy * r}`;
  }).join(" ");

  return (
    <section id="skills" className="relative py-28 bg-bg-dark overflow-hidden border-t border-white/5">
      {/* Background Ornaments */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-gold opacity-[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-gold-hover opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/10 bg-bg-card/35 text-gold text-xs font-heading font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Abilities
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#F9FAFB]">
            Technical Competencies
          </h2>
          <p className="font-sans text-sm md:text-base text-[#9CA3AF] max-w-xl mx-auto font-light">
            Interactive constellation radar mapping my core technical ecosystems. Click on any node vertex to inspect related skillsets.
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Radar Constellation */}
          <div className="lg:col-span-7 flex justify-center relative w-full aspect-square max-w-[320px] min-[400px]:max-w-[400px] sm:max-w-[460px] lg:max-w-[500px] mx-auto select-none">
            
            {/* SVG Hexagonal Radar Graph */}
            <svg viewBox="0 0 500 500" className="w-full h-full relative z-0">
              <defs>
                <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--theme-gold)" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="var(--theme-gold-hover)" stopOpacity="0.03" />
                </radialGradient>
              </defs>

              {/* Concentric grid lines (hexagons representing score thresholds) */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale) => {
                const r = maxR * scale;
                const points = vertices.map(v => `${cx + v.dx * r},${cy + v.dy * r}`).join(" ");
                return (
                  <polygon
                    key={scale}
                    points={points}
                    fill="none"
                    stroke="var(--theme-gold)"
                    strokeOpacity="0.15"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* Spoke lines from center to vertices */}
              {vertices.map((v, i) => (
                <g key={i}>
                  {/* Base Solid Spoke line */}
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cx + v.dx * maxR}
                    y2={cy + v.dy * maxR}
                    stroke="var(--theme-gold)"
                    strokeOpacity="0.12"
                    strokeWidth="1"
                  />
                  {/* Animated Light Tracer moving outward */}
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cx + v.dx * maxR}
                    y2={cy + v.dy * maxR}
                    stroke="var(--theme-gold-hover)"
                    strokeWidth="1.2"
                    strokeDasharray="30, 120"
                    className="animate-spoke-trace opacity-65"
                  />
                </g>
              ))}

              {/* Dynamic filled competency area */}
              <polygon
                points={radarPoints}
                fill="url(#radarGrad)"
                stroke="var(--theme-gold)"
                strokeWidth="1.5"
                className="transition-all duration-700 ease-out"
              />

              {/* Interactive clickable node handles at vertices */}
              {categories.map((cat) => {
                const vIndex = vertices.findIndex(v => v.name === cat.name);
                const v = vertices[vIndex];
                const r = cat.score * maxR;
                const vx = cx + v.dx * r;
                const vy = cy + v.dy * r;
                const isActive = cat.name === activeCategory;

                return (
                  <g
                    key={cat.name}
                    className="cursor-pointer group"
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    {/* Hover invisible target area */}
                    <circle cx={vx} cy={vy} r="18" fill="transparent" />
                    
                    {/* Ring aura */}
                    <circle
                      cx={vx}
                      cy={vy}
                      r={isActive ? "7" : "5"}
                      fill={isActive ? "#FFFFFF" : "#111827"}
                      stroke={isActive ? "var(--theme-gold-hover)" : "var(--theme-gold)"}
                      strokeWidth={isActive ? "2.5" : "1.8"}
                      className="transition-all duration-300"
                    />
                    
                    {/* Pulsing glow removed in favor of border trace */}
                  </g>
                );
              })}

              {/* Central hub node badge */}
              <circle cx={cx} cy={cy} r="24" fill="var(--theme-bg-dark)" stroke="var(--theme-gold)" strokeOpacity="0.3" strokeWidth="1.5" />
              <g transform={`translate(${cx - 10}, ${cy - 10})`}>
                <Network className="w-5 h-5 text-gold opacity-80" />
              </g>
            </svg>

            {/* Floating skill constellation (HTML elements mapped dynamically) */}
            {skillBadges.map((badge, idx) => {
              const isActive = badge.category === activeCategory;
              const isOtherActive = activeCategory && badge.category !== activeCategory;

              // Assign float duration offsets
              const floatDur = 4 + (idx % 3) * 0.8;
              const floatDel = (idx % 4) * 0.3;

              return (
                <div
                  key={badge.name}
                  style={{
                    position: "absolute",
                    left: `${50 + (badge.x / 500) * 100}%`,
                    top: `${50 + (badge.y / 500) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="z-10"
                >
                  <motion.button
                    onClick={() => setActiveCategory(badge.category)}
                    animate={{
                      scale: isActive ? 1.08 : 0.95,
                      opacity: isActive ? 1.0 : isOtherActive ? 0.25 : 0.85,
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    style={{
                      animation: `skills-float-${idx % 3} ${floatDur}s ease-in-out ${floatDel}s infinite`,
                    }}
                    className={`px-2 py-1 min-[400px]:px-2.5 min-[400px]:py-1.2 sm:px-3 sm:py-1.5 rounded-xl border text-[8px] min-[400px]:text-[10px] sm:text-xs font-mono tracking-wide uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-gold/15 border-gold-hover text-[#F9FAFB] shadow-[0_0_15px_var(--gold-glow)]"
                        : "bg-bg-secondary/70 border-white/5 text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-gold/30"
                    }`}
                  >
                    {badge.name}
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* Right Column: Skill Details Info Panel */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-3xl border border-gold/10 bg-bg-card/15 backdrop-blur-md shadow-2xl relative overflow-hidden"
              >
                {/* Gold header decorator */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold to-transparent" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-semibold">
                    Core Category Ecosystem
                  </span>
                  <span className="font-mono text-xs text-gold-hover font-bold">
                    {Math.round(selectedCategoryData.score * 100)}% Proficiency
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-extrabold text-[#F9FAFB] mb-4">
                  {selectedCategoryData.name}
                </h3>

                <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed font-light mb-6">
                  {selectedCategoryData.description}
                </p>

                {/* Level Gauge Bar */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#9CA3AF]/60">
                    <span>COMPETENCY SCALE</span>
                    <span>EXPERT ARCHITECT</span>
                  </div>
                  <div className="w-full h-1.5 bg-bg-dark rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedCategoryData.score * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-gold to-gold-hover"
                    />
                  </div>
                </div>

                {/* Associated Technologies */}
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#F9FAFB]/75 mb-3">
                    Featured Stack Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategoryData.skills.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-bg-dark/50 border border-white/5 text-[10px] font-mono text-gold font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Floating Keyframes definitions */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hexagon-trace-anim {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -440; }
        }
        .animate-hexagon-trace {
          animation: hexagon-trace-anim 6s linear infinite;
        }
        @keyframes spoke-trace-anim {
          0% { stroke-dashoffset: 150; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-spoke-trace {
          animation: spoke-trace-anim 3s linear infinite;
        }
        @keyframes skills-float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0.5deg); }
        }
        @keyframes skills-float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-9px) rotate(-0.5deg); }
        }
        @keyframes skills-float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(0.3deg); }
        }
      `}} />
    </section>
  );
}
