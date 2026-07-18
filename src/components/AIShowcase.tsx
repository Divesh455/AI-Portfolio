"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Cpu, MessageSquare, Sparkles, Send, RefreshCw, Sliders, CheckCircle2 } from "lucide-react";

type ActiveTab = "rag" | "neural" | "prompt";

export default function AIShowcase() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("rag");

  // RAG pipeline state
  const [query, setQuery] = useState("");
  const [ragState, setRagState] = useState<"idle" | "embedding" | "retrieval" | "generation" | "complete">("idle");
  const [ragResult, setRagResult] = useState("");

  // Prompt Optimizer states
  const [basicPrompt, setBasicPrompt] = useState("");
  const [optimizerState, setOptimizerState] = useState<"idle" | "analyzing" | "enriching" | "complete">("idle");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [optimizerMetrics, setOptimizerMetrics] = useState({ clarity: 0, tokens: 0, safety: 0, accuracy: 0 });

  const handleRagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || ragState !== "idle") return;

    setRagState("embedding");
    setRagResult("");

    try {
      // Initiate background fetch to our Gemini endpoint
      const fetchPromise = fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: `Please provide a brief, professional answer of 2-3 sentences regarding: ${query}` }]
        })
      }).then(r => r.json());

      // Simulate embedding pipeline duration
      await new Promise(r => setTimeout(r, 1000));
      setRagState("retrieval");

      // Simulate database vector search match duration
      await new Promise(r => setTimeout(r, 1000));
      setRagState("generation");

      // Wait for fetch request results
      const data = await fetchPromise;
      if (data.error || !data.content) {
        throw new Error(data.error || "Connection failure");
      }

      setRagState("complete");
      setRagResult(`[VECTORDb MATCH] Cosine similarity: 0.938. Real Gemini response: "${data.content}"`);
    } catch (err) {
      console.error(err);
      setRagState("complete");
      setRagResult(`[OFFLINE FALLBACK] Connected API returned a response failure. Falling back to local data matching...`);
    }
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
            Experiment with live retrieval-augmented generation (RAG) pipelines, neural activation networks, and prompt engineering optimizers.
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
                    <p className="font-sans text-xs text-[#9CA3AF]/70 font-light mt-0.5">Route inputs through VectorDB & real Gemini API.</p>
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
                  onClick={() => setActiveTab("prompt")}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition-all text-left ${
                    activeTab === "prompt"
                      ? "bg-[#1F2937]/65 border-[#D4A017]/40 text-[#F9FAFB] shadow-md shadow-[#D4A017]/5"
                      : "bg-[#1F2937]/15 border-[#D4A017]/5 text-[#9CA3AF] hover:bg-[#1F2937]/30 hover:border-[#D4A017]/20"
                  }`}
                >
                  <Sliders className={`w-5 h-5 ${activeTab === "prompt" ? "text-[#D4A017]" : "text-[#9CA3AF]"}`} />
                  <div>
                    <h4 className="font-heading text-sm font-semibold">Prompt Optimizer Sandbox</h4>
                    <p className="font-sans text-xs text-[#9CA3AF]/70 font-light mt-0.5">Animate structures and score few-shot models.</p>
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

                    <form onSubmit={handleRagSubmit} className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-white/5">
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g. Does Divesh know FastAPI?"
                        disabled={ragState !== "idle"}
                        className="w-full sm:flex-1 px-4 py-2.5 rounded-xl text-sm bg-[#111827] border border-white/10 text-[#F9FAFB] placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#D4A017] transition-colors disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={!query.trim() || ragState !== "idle"}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#F6C453] text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Send
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {activeTab === "neural" && <NeuralGraph />}
              {activeTab === "prompt" && (
                <PromptOptimizer
                  basicPrompt={basicPrompt}
                  setBasicPrompt={setBasicPrompt}
                  optimizerState={optimizerState}
                  setOptimizerState={setOptimizerState}
                  optimizedPrompt={optimizedPrompt}
                  setOptimizedPrompt={setOptimizedPrompt}
                  optimizerMetrics={optimizerMetrics}
                  setOptimizerMetrics={setOptimizerMetrics}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

type ModelType = "mlp" | "cnn" | "lstm" | "transformer";

const modelConfigs: Record<ModelType, {
  name: string;
  layers: number[];
  lr: string;
  activation: string;
  maxEpochs: number;
  lossBase: number;
  time: string;
  speed: number;
}> = {
  mlp: {
    name: "MLP (Dense)",
    layers: [6, 6, 4],
    lr: "0.003 (Adam)",
    activation: "ReLU",
    maxEpochs: 100,
    lossBase: 0.054,
    time: "1.2s",
    speed: 1.25,
  },
  cnn: {
    name: "CNN (Spatial)",
    layers: [6, 8, 8, 6],
    lr: "0.001 (AdamW)",
    activation: "GELU",
    maxEpochs: 150,
    lossBase: 0.018,
    time: "2.4s",
    speed: 0.85,
  },
  lstm: {
    name: "LSTM (Temporal)",
    layers: [5, 6, 6, 5],
    lr: "0.0005 (RMSprop)",
    activation: "Tanh",
    maxEpochs: 120,
    lossBase: 0.076,
    time: "1.8s",
    speed: 1.0,
  },
  transformer: {
    name: "Transformer (Attention)",
    layers: [4, 8, 8, 8, 4],
    lr: "0.0001 (AdamW + Cosine)",
    activation: "SwiGLU",
    maxEpochs: 200,
    lossBase: 0.008,
    time: "4.5s",
    speed: 0.55,
  }
};

// Subcomponent: Neural Activation Grid Canvas
function NeuralGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [trainStatus, setTrainStatus] = useState<"idle" | "training" | "complete">("idle");
  const trainStatusRef = useRef(trainStatus);
  const [selectedModel, setSelectedModel] = useState<ModelType>("cnn");

  useEffect(() => {
    trainStatusRef.current = trainStatus;
  }, [trainStatus]);

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

    // Dynamic mouse coordinates tracking
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const config = modelConfigs[selectedModel];
    const layers = config.layers;
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
    let currentEpoch = 0;
    let currentLoss = 0.854;

    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        const status = trainStatusRef.current;
        if (status === "training") {
          pulseX += 8.5; // Fast sweep speed to show compute activity
          currentEpoch += config.speed; // Increment epoch count
          if (currentEpoch >= config.maxEpochs) {
            currentEpoch = config.maxEpochs;
            setTimeout(() => setTrainStatus("complete"), 0);
          }
          // Exponential decay mapping for loss convergence
          const progress = currentEpoch / config.maxEpochs;
          currentLoss = (0.83 - config.lossBase) * Math.pow(Math.E, -progress * 5) + config.lossBase + Math.random() * 0.004;
        } else if (status === "idle") {
          pulseX += 4.5;
          currentEpoch = 0;
          currentLoss = 0.854;
        } else {
          pulseX += 4.5;
          currentEpoch = config.maxEpochs;
          currentLoss = config.lossBase + Math.random() * 0.001;
        }

        if (pulseX > width + 100) {
          pulseX = 0;
          // Randomize target activations for dynamic simulation feel
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

        // Draw Connections (weights) & traveling particle waves
        for (let l = 0; l < nodes.length - 1; l++) {
          const currLayer = nodes[l];
          const nextLayer = nodes[l + 1];
          
          currLayer.forEach(n1 => {
            nextLayer.forEach(n2 => {
              const strength = (n1.val + n2.val) / 2;
              
              // Base weight line representation
              ctx.strokeStyle = `rgba(212, 160, 23, ${strength * 0.08})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();

              // Draw glowing signal pulse moving along line paths
              const pulseProgress = (pulseX - n1.x) / (n2.x - n1.x);
              if (pulseProgress >= 0 && pulseProgress <= 1) {
                const px = n1.x + (n2.x - n1.x) * pulseProgress;
                const py = n1.y + (n2.y - n1.y) * pulseProgress;
                
                ctx.beginPath();
                ctx.arc(px, py, 1.8, 0, Math.PI * 2);
                ctx.fillStyle = "#F6C453";
                ctx.shadowBlur = 6;
                ctx.shadowColor = "#F6C453";
                ctx.fill();
                ctx.shadowBlur = 0;
              }
            });
          });
        }

        // Draw Nodes with mouse hover attraction effects
        nodes.forEach((layer) => {
          layer.forEach((n) => {
            // Draw interactive hover line if close to cursor
            if (mouse.x > 0) {
              const dx = mouse.x - n.x;
              const dy = mouse.y - n.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 85) {
                const alpha = ((85 - dist) / 85) * 0.18;
                ctx.strokeStyle = `rgba(246, 196, 83, ${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
              }
            }

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

        // Terminal text status overlay
        ctx.fillStyle = "rgba(156, 163, 175, 0.4)";
        ctx.font = "10px JetBrains Mono, monospace";
        ctx.fillText(`TASK_STATUS: ${status.toUpperCase()}`, 20, 20);
        ctx.fillText(`EPOCH: ${Math.floor(currentEpoch)} / ${config.maxEpochs}`, 20, 35);
        ctx.fillText(`LEARNING_RATE: ${config.lr}`, 20, 50);
        ctx.fillText(`ACT: ${config.activation}`, 20, 65);
        ctx.fillText(`LOSS: ${currentLoss.toFixed(5)}`, 20, 80);
      }

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [selectedModel]);

  const config = modelConfigs[selectedModel];

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
        {trainStatus === "idle" && (
          <button
            onClick={() => setTrainStatus("training")}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#D4A017]/30 bg-[#D4A017]/10 hover:bg-[#D4A017]/20 text-[#D4A017] text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
          >
            Run Training Task
          </button>
        )}
        {trainStatus === "training" && (
          <span className="text-xs font-mono text-[#F6C453] animate-pulse">
            Training {config.name}...
          </span>
        )}
        {trainStatus === "complete" && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-green-400 font-semibold">
              Time Taken: {config.time} (Complete)
            </span>
            <button
              onClick={() => setTrainStatus("idle")}
              className="font-sans text-[10px] text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors cursor-pointer"
            >
              Reset Task
            </button>
          </div>
        )}
      </div>

      {/* Model Selection Tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(modelConfigs) as ModelType[]).map((key) => {
          const mConfig = modelConfigs[key];
          const isSelected = selectedModel === key;
          return (
            <button
              key={key}
              disabled={trainStatus === "training"}
              onClick={() => {
                setSelectedModel(key);
                setTrainStatus("idle");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-heading font-semibold transition-all border disabled:opacity-40 cursor-pointer ${
                isSelected
                  ? "bg-[#D4A017]/10 border-[#D4A017]/30 text-[#D4A017] shadow-[0_0_15px_rgba(212,160,23,0.15)]"
                  : "bg-[#111827]/40 border-white/5 text-[#9CA3AF] hover:border-[#D4A017]/20 hover:text-[#F9FAFB]"
              }`}
            >
              {mConfig.name}
            </button>
          );
        })}
      </div>

      <div className="flex-1 bg-[#0B0F19]/50 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden min-h-[300px]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </motion.div>
  );
}

// Subcomponent: Prompt Optimizer Sandbox
interface PromptOptimizerProps {
  basicPrompt: string;
  setBasicPrompt: (p: string) => void;
  optimizerState: "idle" | "analyzing" | "enriching" | "complete";
  setOptimizerState: (s: "idle" | "analyzing" | "enriching" | "complete") => void;
  optimizedPrompt: string;
  setOptimizedPrompt: (p: string) => void;
  optimizerMetrics: { clarity: number; tokens: number; safety: number; accuracy: number };
  setOptimizerMetrics: (m: { clarity: number; tokens: number; safety: number; accuracy: number }) => void;
}

const promptTemplates: Record<string, { system: string; task: string; constraints: string; examples: string; metrics: { clarity: number; tokens: number; safety: number; accuracy: number } }> = {
  "write sales forecasting script": {
    system: "You are an expert Machine Learning Engineer specializing in Time-Series Forecasting.",
    task: "Build a robust pipeline using XGBoost and Prophet to predict weekly sales demand.",
    constraints: "- Use Pandas, Scikit-learn, and XGBoost.\n- Handle seasonality (weekly, monthly) and anomalies.\n- Return clean, PEP8 compliant Python code with clear type hints.",
    examples: "# Few-shot learning:\n# Input: df = load_data()\n# Output: predictions = model.predict(df)\n# Evaluate metrics using MAPE & RMSE.",
    metrics: { clarity: 98, tokens: 88, safety: 95, accuracy: 96 }
  },
  "make disease prediction model": {
    system: "You are a Lead AI Clinician and Bioinformatician specializing in Medical Diagnosis Models.",
    task: "Design a machine learning classification pipeline to predict patient disease risk based on synthetic blood biomarkers.",
    constraints: "- Use Scikit-learn Random Forest or Gradient Boosting.\n- Implement feature scaling (StandardScaler) and handle class imbalance (SMOTE).\n- Output feature importances and validation metrics (Precision, Recall, ROC-AUC).",
    examples: "# Example workflow:\n# scaler = StandardScaler()\n# smote = SMOTE()\n# clf = RandomForestClassifier()",
    metrics: { clarity: 96, tokens: 92, safety: 98, accuracy: 94 }
  },
  "create movie recommender system": {
    system: "You are a Recommendation Systems Specialist and Senior ML Engineer.",
    task: "Develop a content-based recommendation engine matching TF-IDF embeddings on movie metadata.",
    constraints: "- Use Scikit-learn TfidfVectorizer and cosine_similarity.\n- Input: movie titles and genre descriptions.\n- Output: top 5 highest similarity movie recommendations.",
    examples: "# Recommendation logic:\n# tfidf = TfidfVectorizer(stop_words='english')\n# tfidf_matrix = tfidf.fit_transform(movies['metadata'])\n# cosine_sim = cosine_similarity(tfidf_matrix)",
    metrics: { clarity: 95, tokens: 85, safety: 97, accuracy: 92 }
  }
};

function PromptOptimizer({
  basicPrompt,
  setBasicPrompt,
  optimizerState,
  setOptimizerState,
  optimizedPrompt,
  setOptimizedPrompt,
  optimizerMetrics,
  setOptimizerMetrics
}: PromptOptimizerProps) {
  const handleOptimizeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!basicPrompt.trim() || optimizerState !== "idle") return;

    setOptimizerState("analyzing");

    try {
      // Initiate request to the Gemini API prompt optimizer endpoint
      const fetchPromise = fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: basicPrompt })
      }).then(r => r.json());

      // Simulate analysis phase duration
      await new Promise(r => setTimeout(r, 800));
      setOptimizerState("enriching");

      // Simulate enrichment phase duration
      await new Promise(r => setTimeout(r, 800));

      const data = await fetchPromise;
      if (data.error || !data.system || !data.task) {
        throw new Error(data.error || "Invalid response format");
      }

      setOptimizerState("complete");
      const output = `<< SYSTEM >>\n${data.system}\n\n<< TASK >>\n${data.task}\n\n<< FEW-SHOT EXAMPLES >>\n${data.examples || "None provided."}\n\n<< CONSTRAINTS >>\n${data.constraints || "None provided."}`;
      setOptimizedPrompt(output);
      setOptimizerMetrics(data.metrics || { clarity: 90, tokens: 90, safety: 90, accuracy: 90 });
    } catch (err) {
      console.warn("Gemini Optimizer offline/failed, using local templates:", err);
      // Fallback local matching
      const key = basicPrompt.trim().toLowerCase();
      const matched = promptTemplates[key] || {
        system: "You are an expert AI Assistant specialized in answering technical queries.",
        task: basicPrompt,
        constraints: "- Provide structured explanations.\n- Outline key modules and code snippets.\n- Limit assumptions and state constraints.",
        examples: "# Return response in clean Markdown formatting.",
        metrics: { clarity: 92, tokens: 80, safety: 95, accuracy: 90 }
      };

      setOptimizerState("complete");
      const output = `[LOCAL FALLBACK]\n\n<< SYSTEM >>\n${matched.system}\n\n<< TASK >>\n${matched.task}\n\n<< FEW-SHOT EXAMPLES >>\n${matched.examples}\n\n<< CONSTRAINTS >>\n${matched.constraints}`;
      setOptimizedPrompt(output);
      setOptimizerMetrics(matched.metrics);
    }
  };

  const selectSuggestion = (text: string) => {
    if (optimizerState !== "idle") return;
    setBasicPrompt(text);
  };

  const handleResetOptimizer = () => {
    setBasicPrompt("");
    setOptimizerState("idle");
    setOptimizedPrompt("");
    setOptimizerMetrics({ clarity: 0, tokens: 0, safety: 0, accuracy: 0 });
  };

  return (
    <motion.div
      key="prompt"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="flex flex-col gap-6 h-full justify-between"
    >
      <div className="flex items-center justify-between border-b border-[#D4A017]/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4A017] animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#D4A017]">
            PROMPT OPTIMIZER ACTIVE
          </span>
        </div>
        {optimizerState !== "idle" && (
          <button
            onClick={handleResetOptimizer}
            className="flex items-center gap-1.5 font-sans text-xs text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Suggestion Chips */}
        {optimizerState === "idle" && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-[#9CA3AF]/60 block uppercase tracking-wider">Try quick presets:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectSuggestion("write sales forecasting script")}
                className="px-3 py-1.5 rounded-lg border border-white/5 bg-[#1F2937]/15 hover:border-[#D4A017]/30 text-xs text-[#9CA3AF] hover:text-[#F9FAFB] transition-all cursor-pointer"
              >
                Sales Forecast
              </button>
              <button
                onClick={() => selectSuggestion("make disease prediction model")}
                className="px-3 py-1.5 rounded-lg border border-white/5 bg-[#1F2937]/15 hover:border-[#D4A017]/30 text-xs text-[#9CA3AF] hover:text-[#F9FAFB] transition-all cursor-pointer"
              >
                Disease Prediction
              </button>
              <button
                onClick={() => selectSuggestion("create movie recommender system")}
                className="px-3 py-1.5 rounded-lg border border-white/5 bg-[#1F2937]/15 hover:border-[#D4A017]/30 text-xs text-[#9CA3AF] hover:text-[#F9FAFB] transition-all cursor-pointer"
              >
                Movie Recommender
              </button>
            </div>
          </div>
        )}

        {/* Input area */}
        <form onSubmit={handleOptimizeSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={basicPrompt}
            onChange={(e) => setBasicPrompt(e.target.value)}
            placeholder="Enter a basic prompt... (e.g. 'write sales forecasting script')"
            disabled={optimizerState !== "idle"}
            className="w-full sm:flex-1 px-4 py-2.5 rounded-xl text-sm bg-[#111827] border border-white/10 text-[#F9FAFB] placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#D4A017] transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!basicPrompt.trim() || optimizerState !== "idle"}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#F6C453] text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
          >
            Optimize
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Sandbox output display */}
        <div className="bg-[#0B0F19]/60 rounded-2xl border border-white/5 p-4 min-h-[160px] flex flex-col justify-between">
          <div className="font-mono text-xs text-[#9CA3AF] leading-relaxed">
            {optimizerState === "idle" && (
              <span className="text-[#9CA3AF]/50 italic">{"// Enter or select a basic prompt above to run few-shot structuring..."}</span>
            )}
            {optimizerState === "analyzing" && (
              <span className="text-[#D4A017] animate-pulse">
                {"[ANALYSIS] Scanning input sequence for structural intent... Code task matching active... Inferred Task: ML Architecture Design..."}
              </span>
            )}
            {optimizerState === "enriching" && (
              <span className="text-[#D4A017] animate-pulse">
                {"[ENRICHMENT] Appending system role instructions... Injecting format controls and boundary constraints... Compiling structured few-shot exemplars..."}
              </span>
            )}
            {optimizerState === "complete" && (
              <div className="space-y-3">
                <div className="text-green-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {"[SUCCESS] Structured Prompt Compiled (2.0s)"}
                </div>
                <pre className="bg-[#111827]/85 p-3 rounded-lg border border-white/5 text-[#F9FAFB] text-[11px] overflow-x-auto font-mono max-h-[140px] overflow-y-auto leading-relaxed whitespace-pre-wrap">
                  {optimizedPrompt}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Metrics score displaying block */}
        {optimizerState === "complete" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/5"
          >
            <div>
              <span className="text-[10px] text-[#9CA3AF]/70 block uppercase tracking-wider font-mono">Context Clarity</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-[#111827] h-1 rounded-full overflow-hidden">
                  <div className="bg-[#D4A017] h-full" style={{ width: `${optimizerMetrics.clarity}%` }} />
                </div>
                <span className="font-mono text-xs text-[#D4A017] font-semibold">{optimizerMetrics.clarity}%</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-[#9CA3AF]/70 block uppercase tracking-wider font-mono">Few-Shot Score</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-[#111827] h-1 rounded-full overflow-hidden">
                  <div className="bg-[#D4A017] h-full" style={{ width: `${optimizerMetrics.accuracy}%` }} />
                </div>
                <span className="font-mono text-xs text-[#D4A017] font-semibold">{optimizerMetrics.accuracy}%</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-[#9CA3AF]/70 block uppercase tracking-wider font-mono">Safety Score</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-[#111827] h-1 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: `${optimizerMetrics.safety}%` }} />
                </div>
                <span className="font-mono text-xs text-green-400 font-semibold">{optimizerMetrics.safety}%</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-[#9CA3AF]/70 block uppercase tracking-wider font-mono">Token Eff.</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-[#111827] h-1 rounded-full overflow-hidden">
                  <div className="bg-[#D4A017] h-full" style={{ width: `${optimizerMetrics.tokens}%` }} />
                </div>
                <span className="font-mono text-xs text-[#D4A017] font-semibold">{optimizerMetrics.tokens}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
