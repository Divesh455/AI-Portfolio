"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Cpu, MessageSquare, Sparkles, Send, RefreshCw, BarChart2 } from "lucide-react";

type ActiveTab = "rag" | "neural" | "embeddings";

export default function AIShowcase() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("rag");

  // RAG pipeline state
  const [query, setQuery] = useState("");
  const [ragState, setRagState] = useState<"idle" | "embedding" | "retrieval" | "generation" | "complete">("idle");
  const [ragResult, setRagResult] = useState("");

  const handleRagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || ragState !== "idle") return;

    setRagState("embedding");
    setRagResult("");

    setTimeout(() => {
      setRagState("retrieval");
      setTimeout(() => {
        setRagState("generation");
        setTimeout(() => {
          setRagState("complete");
          setRagResult(
            `Matched content: "FastAPI is a modern, high-performance web framework for Python." LLM Response: "Yes, Divesh is a FastAPI expert, having built and deployed dozens of scalable asynchronous APIs."`
          );
        }, 1500);
      }, 1500);
    }, 1200);
  };

  const handleResetRag = () => {
    setQuery("");
    setRagState("idle");
    setRagResult("");
  };

  return (
    <section id="ai-showcase" className="relative py-32 bg-[#0B0F19] overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#D4A017] opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#F6C453] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Title Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A017]/10 bg-[#1F2937]/35 text-[#D4A017] text-xs font-heading font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            AI Labs
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#F9FAFB]">
            Interactive AI Playground
          </h2>
          <p className="font-sans text-sm md:text-base text-[#9CA3AF] max-w-xl mx-auto font-light">
            Experiment with live-simulated retrieval-augmented generation (RAG) pipelines, neural networks, and vector alignments.
          </p>
        </div>

        {/* Layout: Info panel left + Interactive panel right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left panel: Info & Tab selection */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              <h3 className="font-heading text-2xl font-bold text-[#F9FAFB]">
                Under the Hood
              </h3>
              <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed font-light">
                Modern AI isn&apos;t just about prompt engineering; it&apos;s about robust data orchestration. Toggle through these components to visualize how models process information.
              </p>

              {/* Tab Selector buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={() => setActiveTab("rag")}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition-all text-left ${
                    activeTab === "rag"
                      ? "bg-[#1F2937]/65 border-[#D4A017]/40 text-[#F9FAFB] shadow-md shadow-[#D4A017]/5"
                      : "bg-[#1F2937]/15 border-[#D4A017]/5 text-[#9CA3AF] hover:bg-[#1F2937]/30 hover:border-[#D4A017]/20"
                  }`}
                >
                  <Database className={`w-5 h-5 ${activeTab === "rag" ? "text-[#D4A017]" : "text-[#9CA3AF]"}`} />
                  <div>
                    <h4 className="font-heading text-sm font-semibold">RAG Pipeline Simulator</h4>
                    <p className="font-sans text-xs text-[#9CA3AF]/70 font-light mt-0.5">Visualize user inputs routing through VectorDB & LLMs.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("neural")}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition-all text-left ${
                    activeTab === "neural"
                      ? "bg-[#1F2937]/65 border-[#D4A017]/40 text-[#F9FAFB] shadow-md shadow-[#D4A017]/5"
                      : "bg-[#1F2937]/15 border-[#D4A017]/5 text-[#9CA3AF] hover:bg-[#1F2937]/30 hover:border-[#D4A017]/20"
                  }`}
                >
                  <Cpu className={`w-5 h-5 ${activeTab === "neural" ? "text-[#D4A017]" : "text-[#9CA3AF]"}`} />
                  <div>
                    <h4 className="font-heading text-sm font-semibold">Neural Activation Grid</h4>
                    <p className="font-sans text-xs text-[#9CA3AF]/70 font-light mt-0.5">Live neural network layer weight computations.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("embeddings")}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition-all text-left ${
                    activeTab === "embeddings"
                      ? "bg-[#1F2937]/65 border-[#D4A017]/40 text-[#F9FAFB] shadow-md shadow-[#D4A017]/5"
                      : "bg-[#1F2937]/15 border-[#D4A017]/5 text-[#9CA3AF] hover:bg-[#1F2937]/30 hover:border-[#D4A017]/20"
                  }`}
                >
                  <BarChart2 className={`w-5 h-5 ${activeTab === "embeddings" ? "text-[#D4A017]" : "text-[#9CA3AF]"}`} />
                  <div>
                    <h4 className="font-heading text-sm font-semibold">Vector Similarity Space</h4>
                    <p className="font-sans text-xs text-[#9CA3AF]/70 font-light mt-0.5">Semantic math alignment of sentences.</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-[#D4A017]/10 bg-[#111827]/30 text-xs text-[#9CA3AF] leading-relaxed">
              <span className="font-semibold text-[#F9FAFB] block mb-1">Architecture Quote:</span>
              &ldquo;The cost of AI is scaling down exponentially; the intelligence of customized pipelines is scaling up infinitely.&rdquo;
            </div>
          </div>

          {/* Right panel: Glass Playground Content */}
          <div className="lg:col-span-8 glass rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[480px]">
            <AnimatePresence mode="wait">
              {activeTab === "rag" && (
                <motion.div
                  key="rag"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6 h-full justify-between"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-[#D4A017]/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D4A017] animate-ping" />
                      <span className="font-mono text-xs uppercase tracking-widest text-[#D4A017]">
                        RAG Simulator Active
                      </span>
                    </div>
                    {ragState !== "idle" && (
                      <button
                        onClick={handleResetRag}
                        className="flex items-center gap-1.5 font-sans text-xs text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reset
                      </button>
                    )}
                  </div>

                  {/* Flow Animation Nodes */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4 relative">
                    {/* Node 1: Input Query */}
                    <div
                      className={`p-4 rounded-xl border text-center transition-all ${
                        ragState === "idle"
                          ? "border-white/5 bg-white/5 opacity-40"
                          : ragState === "embedding"
                          ? "border-[#D4A017] bg-[#D4A017]/5 glow-gold"
                          : "border-[#D4A017]/40 bg-[#D4A017]/5 opacity-80"
                      }`}
                    >
                      <MessageSquare className="w-5 h-5 mx-auto mb-2 text-[#D4A017]" />
                      <span className="font-heading text-xs font-semibold block text-[#F9FAFB]">1. User Prompt</span>
                      <span className="font-sans text-[10px] text-[#9CA3AF] block mt-1">Raw sentence query</span>
                    </div>

                    {/* Node 2: Embedding */}
                    <div
                      className={`p-4 rounded-xl border text-center transition-all ${
                        ragState === "embedding"
                          ? "border-[#D4A017] bg-[#D4A017]/5 glow-gold"
                          : ragState === "retrieval"
                          ? "border-[#D4A017] bg-[#D4A017]/5 glow-gold"
                          : ragState === "generation" || ragState === "complete"
                          ? "border-[#D4A017]/40 bg-[#D4A017]/5 opacity-80"
                          : "border-white/5 bg-white/5 opacity-40"
                      }`}
                    >
                      <Sparkles className="w-5 h-5 mx-auto mb-2 text-[#D4A017]" />
                      <span className="font-heading text-xs font-semibold block text-[#F9FAFB]">2. Embedding</span>
                      <span className="font-sans text-[10px] text-[#9CA3AF] block mt-1">Float32 vector dimensions</span>
                    </div>

                    {/* Node 3: Vector DB */}
                    <div
                      className={`p-4 rounded-xl border text-center transition-all ${
                        ragState === "retrieval"
                          ? "border-[#D4A017] bg-[#D4A017]/5 glow-gold"
                          : ragState === "generation"
                          ? "border-[#D4A017] bg-[#D4A017]/5 glow-gold"
                          : ragState === "complete"
                          ? "border-[#D4A017]/40 bg-[#D4A017]/5 opacity-80"
                          : "border-white/5 bg-white/5 opacity-40"
                      }`}
                    >
                      <Database className="w-5 h-5 mx-auto mb-2 text-[#D4A017]" />
                      <span className="font-heading text-xs font-semibold block text-[#F9FAFB]">3. Vector DB Search</span>
                      <span className="font-sans text-[10px] text-[#9CA3AF] block mt-1">Cosine similarity index</span>
                    </div>

                    {/* Node 4: LLM */}
                    <div
                      className={`p-4 rounded-xl border text-center transition-all ${
                        ragState === "generation"
                          ? "border-[#D4A017] bg-[#D4A017]/5 glow-gold"
                          : ragState === "complete"
                          ? "border-[#D4A017] bg-[#D4A017]/10 glow-gold"
                          : "border-white/5 bg-white/5 opacity-40"
                      }`}
                    >
                      <Cpu className="w-5 h-5 mx-auto mb-2 text-[#D4A017]" />
                      <span className="font-heading text-xs font-semibold block text-[#F9FAFB]">4. LLM Generation</span>
                      <span className="font-sans text-[10px] text-[#9CA3AF] block mt-1">Context synthesis answer</span>
                    </div>
                  </div>

                  {/* Sandbox playground area */}
                  <div className="bg-[#0B0F19]/60 rounded-2xl border border-white/5 p-4 flex-1 flex flex-col justify-between min-h-[160px]">
                    <div className="font-mono text-xs text-[#9CA3AF] leading-relaxed">
                      {ragState === "idle" && (
                        <span className="text-[#9CA3AF]/50 italic">{"// Enter a prompt below to trace RAG query routing..."}</span>
                      )}
                      {ragState === "embedding" && (
                        <span className="text-[#D4A017] animate-pulse">
                          {"[PROCESS] Embedding input sequence... Vector size = [1536] dimensions..."}
                        </span>
                      )}
                      {ragState === "retrieval" && (
                        <span className="text-[#D4A017] animate-pulse">
                          {"[PROCESS] Querying Vector Database index... Scanning documents matching query metadata..."}
                        </span>
                      )}
                      {ragState === "generation" && (
                        <span className="text-[#F6C453] animate-pulse">
                          {"[LLM] Processing context injection... Executing completion token sequence..."}
                        </span>
                      )}
                      {ragState === "complete" && (
                        <div className="space-y-2">
                          <div className="text-green-400">{"[SUCCESS] Pipeline Executed (3.9s)"}</div>
                          <div className="text-[#F9FAFB] font-sans font-light mt-1">{ragResult}</div>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleRagSubmit} className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g. Does Divesh know FastAPI?"
                        disabled={ragState !== "idle"}
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-[#111827] border border-white/10 text-[#F9FAFB] placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#D4A017] transition-colors disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={!query.trim() || ragState !== "idle"}
                        className="px-4 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#F6C453] text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        Send
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {activeTab === "neural" && <NeuralGraph />}
              {activeTab === "embeddings" && <EmbeddingsGraph />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Subcomponent: Neural Activation Grid Canvas
function NeuralGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 360);
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const layers = [4, 6, 6, 4];
    const nodes: { x: number; y: number; val: number; targetVal: number }[][] = [];

    // Calculate node coordinates
    const xSpacing = width / (layers.length + 1);
    for (let i = 0; i < layers.length; i++) {
      const ySpacing = height / (layers[i] + 1);
      const layerNodes = [];
      for (let j = 0; j < layers[i]; j++) {
        layerNodes.push({
          x: xSpacing * (i + 1),
          y: ySpacing * (j + 1),
          val: 0,
          targetVal: Math.random(),
        });
      }
      nodes.push(layerNodes);
    }

    let pulseX = 0;
    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Advance signal pulse
        pulseX += 3.5;
        if (pulseX > width + 50) {
          pulseX = 0;
          // Randomize target activations
          nodes.forEach(layer =>
            layer.forEach(n => {
              n.targetVal = Math.random();
            })
          );
        }

        // Smooth node values towards target values
        nodes.forEach(layer => {
          layer.forEach(n => {
            n.val += (n.targetVal - n.val) * 0.1;
          });
        });

        // Draw Connections (weights)
        ctx.lineWidth = 0.5;
        for (let l = 0; l < nodes.length - 1; l++) {
          const currLayer = nodes[l];
          const nextLayer = nodes[l + 1];
          
          currLayer.forEach(n1 => {
            nextLayer.forEach(n2 => {
              // Weight strength base representation
              const strength = (n1.val + n2.val) / 2;
              
              // Highlight connections that the pulse is passing over
              const pulseDist = Math.abs(n1.x - pulseX);
              const pulseGlow = pulseDist < 40 ? (40 - pulseDist) / 40 : 0;
              
              ctx.strokeStyle = `rgba(212, 160, 23, ${strength * 0.1 + pulseGlow * 0.25})`;
              ctx.lineWidth = 0.5 + pulseGlow * 1.5;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            });
          });
        }

        // Draw Nodes
        nodes.forEach((layer) => {
          layer.forEach((n) => {
            // Draw outer gold glow ring
            ctx.beginPath();
            ctx.arc(n.x, n.y, 8 + n.val * 6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 160, 23, ${n.val * 0.15})`;
            ctx.fill();

            // Draw center node core
            ctx.beginPath();
            ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = n.val > 0.5 ? "#F6C453" : "#D4A017";
            ctx.shadowBlur = n.val * 10;
            ctx.shadowColor = "#D4A017";
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          });
        });

        // Terminal text overlay
        ctx.fillStyle = "rgba(156, 163, 175, 0.4)";
        ctx.font = "10px JetBrains Mono, monospace";
        ctx.fillText(`EPOCH: ${Math.floor(Date.now() / 2000) % 9999}`, 20, 20);
        ctx.fillText(`LEARNING_RATE: 0.0003`, 20, 35);
        ctx.fillText(`ACT: GELU`, 20, 50);
      }

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      key="neural"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="flex flex-col gap-4 h-full"
    >
      <div className="flex items-center justify-between border-b border-[#D4A017]/10 pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#D4A017]">
          Forward Prop Activations
        </span>
        <span className="text-[10px] font-mono text-[#9CA3AF]/60">Feedforward Layer Grid Visualizer</span>
      </div>
      <div className="flex-1 bg-[#0B0F19]/50 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden min-h-[300px]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </motion.div>
  );
}

// Static document embeddings list outside the render tree to satisfy dependency rules
const documentsList = [
  { text: "FastAPI high performance python API creation", val: [0.91, 0.82, 0.05] },
  { text: "Building Deep Learning models with PyTorch GPU", val: [0.12, 0.45, 0.88] },
  { text: "Generative AI LLM langchain retrieval pipelines", val: [0.35, 0.77, 0.65] },
  { text: "Docker containers orchestration Kubernetes", val: [0.22, 0.15, 0.28] },
];

// Subcomponent: Embeddings Math Match list
function EmbeddingsGraph() {
  const [inputText, setInputText] = useState("FastAPI Server");
  const [cosMatch, setCosMatch] = useState<{ text: string; score: number }[]>([]);

  useEffect(() => {
    // Basic pseudo-cosine match simulation based on character overlap to make it responsive
    const query = inputText.toLowerCase();
    const matches = documentsList.map((doc) => {
      const docLower = doc.text.toLowerCase();
      // Count matches
      let matchCount = 0;
      const queryWords = query.split(/\s+/);
      queryWords.forEach((word) => {
        if (word && docLower.includes(word)) matchCount += 1;
      });

      const baseScore = 0.15 + (matchCount / (queryWords.length + 1)) * 0.75;
      const finalScore = Math.min(0.98, Math.max(0.12, baseScore + Math.random() * 0.05));

      return {
        text: doc.text,
        score: finalScore,
      };
    });

    setCosMatch(matches.sort((a, b) => b.score - a.score));
  }, [inputText]);

  return (
    <motion.div
      key="embeddings"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="flex flex-col gap-6 h-full"
    >
      <div className="flex items-center justify-between border-b border-[#D4A017]/10 pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#D4A017]">
          Semantic Embeddings Search
        </span>
        <span className="text-[10px] font-mono text-[#9CA3AF]/60">Cosine Similarity matches</span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-heading font-semibold text-[#F9FAFB]">Test Query</label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm bg-[#111827] border border-white/10 text-[#F9FAFB]"
            placeholder="Type query to match..."
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-heading font-semibold text-[#F9FAFB] block">Retrieved Matches</label>
          {cosMatch.map((match, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-white/5 bg-[#1F2937]/15 flex items-center justify-between hover:border-[#D4A017]/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded bg-[#0B0F19] text-[10px] font-mono flex items-center justify-center text-[#D4A017] border border-[#D4A017]/10">
                  {i + 1}
                </span>
                <span className="font-sans text-xs text-[#F9FAFB] font-light max-w-sm sm:max-w-md truncate">
                  {match.text}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-[#0B0F19] h-1.5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="bg-[#D4A017] h-full rounded-full transition-all duration-500"
                    style={{ width: `${match.score * 100}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-[#D4A017] font-semibold">
                  {match.score.toFixed(3)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
