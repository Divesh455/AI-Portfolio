"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu } from "lucide-react";

interface AILandingProps {
  state: "loading" | "transitioning" | "ready";
  onTransitionStart: () => void;
  onTransitionComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING COGNITIVE CORE...",
  "ESTABLISHING SECURE NEURAL WORKSPACE...",
  "MOUNTING DATA INTELLIGENCE MODULES...",
  "OPTIMIZING VECTOR SEARCH GRAPH...",
  "CORE SYSTEMS OPERATIONAL. SYSTEM READY."
];

export default function AILanding({ state, onTransitionStart, onTransitionComplete }: AILandingProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [typedLog, setTypedLog] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Canvas floating particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: (Math.random() - 0.5) * 0.005,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 160, 23, ${p.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(212, 160, 23, 0.3)";
        ctx.fill();

        // Move particle up
        p.y += p.speedY;
        p.x += p.speedX;

        // Oscillate opacity
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.7 || p.opacity < 0.05) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Wrap around screen boundaries
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // System Loading Simulation (2.5s duration)
  useEffect(() => {
    const duration = 2500; // 2.5s
    const steps = 100;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Sync log messages with loader progress
  useEffect(() => {
    const logSectionSize = 100 / BOOT_LOGS.length;
    const index = Math.min(
      Math.floor(progress / logSectionSize),
      BOOT_LOGS.length - 1
    );
    if (index !== currentLogIndex) {
      setCurrentLogIndex(index);
      setTypedLog("");
    }
  }, [progress, currentLogIndex]);

  // Micro-typing effect for logs
  useEffect(() => {
    const targetText = BOOT_LOGS[currentLogIndex];
    if (typedLog.length < targetText.length) {
      const typeTimer = setTimeout(() => {
        setTypedLog(targetText.slice(0, typedLog.length + 1));
      }, 15);
      return () => clearTimeout(typeTimer);
    }
  }, [typedLog, currentLogIndex]);

  return (
    <AnimatePresence mode="wait">
      {state !== "ready" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ willChange: "opacity" }}
          className="fixed inset-0 w-full h-[100dvh] bg-[#0B0F19] z-[9999] flex flex-col items-center justify-center overflow-hidden select-none font-sans"
        >
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none z-10" />

          {/* Luxury slowly animated background grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none z-0 animate-grid-drift" />

          {/* Radial soft gold ambient glow */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.06)_0%,rgba(0,0,0,0)_70%)] blur-[40px] animate-pulse-slow" />
            <div className="absolute bottom-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.02)_0%,rgba(0,0,0,0)_60%)] blur-[40px]" />
          </div>

          {/* Canvas particles */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

          {/* Central neural core orb */}
          <div className="relative flex items-center justify-center z-20 mb-12">
            {/* Outer golden aura breathing ring */}
            <motion.div
              animate={{
                scale: state === "transitioning" ? 18 : [1, 1.05, 1],
                opacity: state === "transitioning" ? 0 : [0.4, 0.7, 0.4],
                rotate: 360,
              }}
              transition={{
                scale: state === "transitioning" ? { duration: 1.2, ease: [0.76, 0, 0.24, 1] } : { duration: 4, repeat: Infinity, ease: "easeInOut" },
                opacity: state === "transitioning" ? { duration: 0.6 } : { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              }}
              style={{ willChange: "transform, opacity" }}
              className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full border border-dashed border-[#D4A017]/30 bg-gradient-to-r from-transparent via-[#D4A017]/5 to-transparent shadow-[0_0_40px_rgba(212,160,23,0.15)]"
            />

            {/* Inner secondary spinning glow ring */}
            <motion.div
              animate={{
                scale: state === "transitioning" ? 12 : [1, 0.96, 1],
                opacity: state === "transitioning" ? 0 : [0.3, 0.5, 0.3],
                rotate: -360,
              }}
              transition={{
                scale: state === "transitioning" ? { duration: 1.2, ease: [0.76, 0, 0.24, 1] } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                opacity: state === "transitioning" ? { duration: 0.5 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 18, repeat: Infinity, ease: "linear" },
              }}
              style={{ willChange: "transform, opacity" }}
              className="absolute w-[170px] h-[170px] sm:w-[210px] sm:h-[210px] rounded-full border border-[#D4A017]/15 bg-[conic-gradient(from_0deg,rgba(212,160,23,0.08)_0%,transparent_50%,rgba(212,160,23,0.08)_100%)]"
            />

            {/* Main core glassmorphism sphere */}
            <motion.div
              animate={state === "transitioning" ? { scale: 22, opacity: 0 } : {}}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
              style={{ willChange: "transform, opacity" }}
              className={`relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rounded-full border border-[#D4A017]/35 flex flex-col items-center justify-center shadow-[inset_0_4px_30px_rgba(255,255,255,0.05),0_15px_45px_rgba(0,0,0,0.7),0_0_35px_rgba(212,160,23,0.25)] overflow-hidden group ${
                state === "transitioning" ? "bg-[#111827]/90" : "glass"
              }`}
            >
              {/* Spherical Reflection Highlight Overlay */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none" />

              {/* Glowing inner particle core */}
              <div className="absolute w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full bg-[radial-gradient(circle_at_center,#D4A017_0%,transparent_70%)] opacity-[0.25] group-hover:scale-110 transition-transform duration-700 pointer-events-none blur-sm" />

              {/* Bold modern logo name */}
              <span className="relative z-10 text-3xl sm:text-4xl font-black tracking-tight font-heading bg-gradient-to-br from-[#F9FAFB] via-[#F6C453] to-[#D4A017] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(212,160,23,0.25)] select-none">
                DM
              </span>

              {/* Microchips logo lines background */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
                <Cpu className="w-16 h-16 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Loading logs / System Status text */}
          <div className="h-10 flex items-center justify-center mb-5 max-w-[90vw]">
            <Terminal className="w-3.5 h-3.5 text-[#D4A017]/80 mr-2 shrink-0" />
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#9CA3AF] opacity-90 text-center leading-relaxed">
              {typedLog}
              <span className="w-1.5 h-3 bg-[#D4A017] inline-block animate-blink ml-1 align-middle" />
            </span>
          </div>

          {/* Loading progress / CTA Container */}
          <div className="relative w-[260px] sm:w-[320px] flex flex-col items-center min-h-[80px] z-20">
            <AnimatePresence mode="wait">
              {!isLoaded ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Progress bar tracks */}
                  <div className="w-full h-1 bg-[#111827] border border-white/5 rounded-full overflow-hidden mb-3.5 shadow-inner">
                    <motion.div
                      style={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-[#D4A017] to-[#F6C453] shadow-[0_0_8px_rgba(212,160,23,0.6)]"
                    />
                  </div>
                  {/* Progress values */}
                  <div className="flex items-center justify-between w-full font-mono text-[9px] tracking-widest text-[#9CA3AF]/60">
                    <span>SYSTEM BOOT</span>
                    <span>v1.0.0</span>
                    <span className="text-[#D4A017] font-semibold">{progress}%</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Action button */}
                  <motion.button
                    onClick={() => {
                      onTransitionStart();
                      setTimeout(() => {
                        onTransitionComplete();
                      }, 1200); // sync with exit timeline
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-[52px] glass border border-[#D4A017]/40 rounded-[18px] text-xs font-heading font-bold tracking-[0.2em] uppercase text-[#F9FAFB] hover:text-[#D4A017] hover:border-[#D4A017] shadow-[0_0_20px_rgba(212,160,23,0.08)] hover:shadow-[0_0_30px_rgba(212,160,23,0.22)] transition-all duration-300 relative group flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    {/* Hover light sheen slide effect */}
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:animate-shine" />
                    ENTER PORTFOLIO
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
