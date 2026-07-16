"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, FileText, ChevronDown, Volume2, VolumeX, Bot, X, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import gsap from "gsap";


const roles = [
  "Machine Learning",
  "AI Engineer",
  "Data Scientist",
  "Generative AI",
];



export default function Hero({ isActivated = false }: { isActivated?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isActivatedRef = useRef(isActivated);

  // Sync isActivated state to ref to avoid observer re-registrations
  useEffect(() => {
    isActivatedRef.current = isActivated;
  }, [isActivated]);

  // Parallax Scroll Animation
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 180]);

  // Typewriter states
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Video and audio states
  const [isMuted, setIsMuted] = useState(false);
  const [showUnmutePrompt, setShowUnmutePrompt] = useState(false);

  // Chatbot Assistant states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hello! I am DM.AI, Divesh's virtual assistant. Ask me anything about his skills, experience, projects, or how to connect with him!"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const text = customText || chatInput;
    if (!text.trim() || isSending) return;

    const newMsg = { role: "user" as const, content: text };
    const updatedMsgs = [...chatMessages, newMsg];
    setChatMessages(updatedMsgs);
    if (!customText) setChatInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMsgs })
      });

      if (!res.ok) throw new Error("Failed to get response");
      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (err) {
      console.error("Chat error:", err);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I had trouble connecting. Please ask again in a moment!"
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isSending]);

  // Floating Social Bubbles Random Walk with GSAP
  const tweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastDirection = useRef<number[]>([1, -1, 1]); // alternate initial directions

  const animateBubble = (index: number) => {
    const el = bubbleRefs.current[index];
    if (!el || !isActivated) return;

    // Get screen-size adapted drift bounds to keep them on screen
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    const range = isMobile ? 65 : (isTablet ? 140 : 250);
    
    // Generate completely independent random targets in 2D space for true random walk
    const targetX = (Math.random() - 0.5) * 2 * range;
    const targetY = (Math.random() - 0.5) * 2 * range;
    const duration = 9 + Math.random() * 5; // Slow, 9s to 14s

    if (tweenRefs.current[index]) {
      tweenRefs.current[index]?.kill();
    }

    tweenRefs.current[index] = gsap.to(el, {
      x: targetX,
      y: targetY,
      duration: duration,
      ease: "power1.inOut",
      onComplete: () => {
        animateBubble(index);
      }
    });
  };

  const bounceBubble = (index: number, nx: number, ny: number) => {
    const el = bubbleRefs.current[index];
    if (!el || !isActivated) return;

    // Get screen-size adapted drift bounds to keep them on screen
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    const range = isMobile ? 65 : (isTablet ? 140 : 250);
    const minRange = isMobile ? 25 : (isTablet ? 50 : 80);
    
    const signX = nx > 0 ? 1 : -1;
    const signY = ny > 0 ? 1 : -1;

    lastDirection.current[index] = signX;

    const targetX = signX * (minRange + Math.random() * (range - minRange));
    const targetY = signY * (minRange + Math.random() * (range - minRange));
    const duration = 7 + Math.random() * 4; // Faster bounce response

    if (tweenRefs.current[index]) {
      tweenRefs.current[index]?.kill();
    }

    tweenRefs.current[index] = gsap.to(el, {
      x: targetX,
      y: targetY,
      duration: duration,
      ease: "power2.out",
      onComplete: () => {
        animateBubble(index);
      }
    });
  };

  useEffect(() => {
    if (isActivated) {
      animateBubble(0);
      animateBubble(1);
      animateBubble(2);
    } else {
      tweenRefs.current.forEach(t => t?.kill());
    }

    return () => {
      tweenRefs.current.forEach(t => t?.kill());
    };
  }, [isActivated]);

  // Bubble-to-Bubble Collision Checker Loop (60 FPS)
  useEffect(() => {
    if (!isActivated) return;

    let active = true;
    const lastCollisionTime = [0, 0, 0];

    const checkCollisions = () => {
      if (!active) return;

      const now = Date.now();
      const rects = bubbleRefs.current.map(el => el?.getBoundingClientRect() || null);
      const pairs = [
        [0, 1],
        [0, 2],
        [1, 2]
      ];

      pairs.forEach(([i, j]) => {
        const elI = bubbleRefs.current[i];
        const elJ = bubbleRefs.current[j];
        const rectI = rects[i];
        const rectJ = rects[j];

        if (elI && elJ && rectI && rectJ) {
          const cxI = rectI.left + rectI.width / 2;
          const cyI = rectI.top + rectI.height / 2;
          const cxJ = rectJ.left + rectJ.width / 2;
          const cyJ = rectJ.top + rectJ.height / 2;

          const dx = cxI - cxJ;
          const dy = cyI - cyJ;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = (rectI.width / 2) + (rectJ.width / 2);

          // Bounce if overlapping and cooldown has expired
          if (distance < minDistance && now - lastCollisionTime[i] > 1000 && now - lastCollisionTime[j] > 1000) {
            lastCollisionTime[i] = now;
            lastCollisionTime[j] = now;

            const nx = distance > 0 ? dx / distance : (Math.random() > 0.5 ? 1 : -1);
            const ny = distance > 0 ? dy / distance : (Math.random() > 0.5 ? 1 : -1);

            // Bounce both in opposite directions away from each other
            bounceBubble(i, nx, ny);
            bounceBubble(j, -nx, -ny);
          }
        }
      });

      requestAnimationFrame(checkCollisions);
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(checkCollisions);
    }, 1500);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [isActivated]);

  const handleMouseEnter = (index: number) => {
    if (tweenRefs.current[index]) {
      tweenRefs.current[index]?.pause();
    }
  };

  const handleMouseLeave = (index: number) => {
    if (tweenRefs.current[index]) {
      tweenRefs.current[index]?.play();
    }
  };

  // Typewriter Effect
  useEffect(() => {
    if (!isActivated) return;
    let timer: NodeJS.Timeout;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedRole((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
      }, 100);
    }

    if (!isDeleting && displayedRole === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayedRole === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex, isActivated]);

  // GSAP Entrance Animations for text and CTA buttons
  useEffect(() => {
    if (!isActivated) return;
    const ctx = gsap.context(() => {
      const badge = containerRef.current?.querySelector(".hero-badge");
      const titleFirst = containerRef.current?.querySelector(".hero-title-first");
      const titleSecond = containerRef.current?.querySelector(".hero-title-second");
      const typewriter = containerRef.current?.querySelector(".hero-typewriter-container");
      const desc = containerRef.current?.querySelector(".hero-desc");
      const btn = containerRef.current?.querySelectorAll(".hero-btn");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (badge) {
        tl.fromTo(
          badge,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
        );
      }
      if (titleFirst) {
        tl.fromTo(
          titleFirst,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          badge ? "-=0.5" : "0.2"
        );
      }
      if (titleSecond) {
        tl.fromTo(
          titleSecond,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
      }
      if (typewriter) {
        tl.fromTo(
          typewriter,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.4"
        );
      }
      if (desc) {
        tl.fromTo(
          desc,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );
      }
      if (btn && btn.length > 0) {
        tl.fromTo(
          btn,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          "-=0.4"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActivated]);

  // Neural Network Canvas Animation (Covering background overlay)
  useEffect(() => {
    if (!isActivated) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isVisible = true;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 1;
        this.baseAlpha = Math.random() * 0.15 + 0.05;
        this.alpha = this.baseAlpha;
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
          this.alpha = Math.min(0.5, this.baseAlpha + force * 0.35);
        } else {
          this.alpha = this.alpha > this.baseAlpha ? this.alpha - 0.01 : this.baseAlpha;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(212, 160, 23, ${this.alpha})`;
        c.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 50 }, () => new Particle());
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          p1.update(mouse.x, mouse.y);
          p1.draw(ctx);

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
              const alpha = ((150 - dist) / 150) * 0.06;
              ctx.strokeStyle = `rgba(212, 160, 23, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isActivated]);

  // Play and unmute video when activated (due to user interaction)
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (!isActivated) {
        video.pause();
        video.currentTime = 0;
        return;
    }

    const playVideo = async () => {
        try {
            video.currentTime = 0;
            video.muted = false;
            video.volume = 1;

            await video.play();

            setIsMuted(false);
            setShowUnmutePrompt(false);
        } catch (error) {
            console.error(error);
        }
    };

    playVideo();

    return () => {
        video.pause();
    };

}, [isActivated]);

  // Intersection Observer to pause/play video based on viewport visibility
  useEffect(() => {
    const section = containerRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            // Hero section is visible (at least 20%), play the video if activated
            if (isActivatedRef.current) {
              video.play().catch((err) => {
                console.log("Play failed on scroll resume:", err);
              });
            }
          } else {
            // Hero section is 80% invisible (visible < 20%), pause the video
            video.pause();
          }
        });
      },
      {
        threshold: [0.0, 0.2], // Trigger when visibility crosses 20% (80% invisible)
      }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
      observer.disconnect();
    };
  }, []);

  // Toggle Audio (directly updates the DOM element property and React state)
  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMutedState = !video.muted;
    video.muted = nextMutedState;
    setIsMuted(nextMutedState);

    if (!nextMutedState) {
      video.currentTime = 0; // Restart from the beginning when unmuted
      video.play().catch(() => {});
      setShowUnmutePrompt(false);
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-[100dvh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-[#0B0F19]"
    >


      {/* 
        Full-Screen Video Background:
        Covers the entire screen size (100vw x 100vh) under all screen widths
      */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      >
        <video
          ref={videoRef}
          src="/assets/hero-video.mp4"
          playsInline
          loop
          muted={isMuted}
          controls={false}
          preload="auto"
          className="w-full h-full object-cover object-[center_15%] md:object-center lg:object-[75%_center] filter brightness-[1.15]"
          style={{ filter: "brightness(1.15)" }}
        />

        {/* 
          Dark black gradient overlays:
          Enhanced contrast for text readability, customized responsively
        */}
        {/* Desktop overlay with radial transparency behind the face at (75%, 50%) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none z-10" />
        <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,transparent_12%,rgba(11,15,25,0.75)_55%,#0B0F19_95%)] pointer-events-none z-10" />

        {/* Mobile smooth bottom gradient overlay: face on top half remains fully visible and overlay-free */}
        <div className="md:hidden absolute inset-0 pointer-events-none z-10"
             style={{
               background: "linear-gradient(to top, rgba(11,15,25,0.95) 0%, rgba(11,15,25,0.75) 30%, rgba(11,15,25,0.35) 60%, transparent 100%)"
             }}
        />

        {/* Tablet overlay (>= 768px and < 1024px) */}
        <div className="hidden md:block lg:hidden absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/75 pointer-events-none z-10" />
        <div className="hidden md:block lg:hidden absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,transparent_15%,rgba(11,15,25,0.65)_60%,rgba(11,15,25,0.85)_95%)] pointer-events-none z-10" />
      </motion.div>

      {/* Background Neural Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none opacity-50"
      />

      {/* Gold Ambient Backlight Grid */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-[25%] left-[20%] w-[350px] h-[350px] rounded-full bg-[#D4A017] opacity-[0.02] blur-[120px]" />
        <div className="absolute bottom-[25%] right-[20%] w-[450px] h-[450px] rounded-full bg-[#F6C453] opacity-[0.015] blur-[150px]" />
      </div>

      {/* Unified Content Grid overlay (Desktop/Tablet/Mobile Layout) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col justify-end md:justify-center h-full min-h-[100dvh] md:min-h-0 select-none pb-[calc(env(safe-area-inset-bottom)+80px)] md:pb-[80px] pointer-events-none"
           style={{
             paddingTop: "calc(env(safe-area-inset-top) + 80px)",
             paddingBottom: "calc(env(safe-area-inset-bottom) + 80px)"
           }}
      >
        {/* Spacer to push text content down to 60% viewport height on mobile */}
        <div className="h-[60vh] md:hidden block shrink-0" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column Content (42% width / lg:col-span-5 on desktop, centered on mobile) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left select-none max-w-[620px] mx-auto lg:mx-0">

            {/* Greeting */}
            <h2 className="hero-title-first opacity-0 font-sans text-[#9CA3AF] text-[16px] md:text-[20px] font-light tracking-[0.25em] uppercase mb-[10px] md:mb-[16px]">
              HELLO, I&apos;M
            </h2>

            {/* Name */}
            <h1 className="hero-title-second opacity-0 font-heading text-[clamp(40px,8vw,52px)] md:text-[clamp(72px,7vw,110px)] font-black tracking-[-0.04em] leading-[0.9] mb-[18px] md:mb-[28px] bg-gradient-to-b from-[#F9FAFB] via-[#F9FAFB] to-[#9CA3AF] bg-clip-text text-transparent drop-shadow-sm text-center lg:text-left">
              Divesh<br />Matkar
            </h1>

            {/* Typing Text */}
            <div className="hero-typewriter-container opacity-0 h-[60px] flex items-center justify-center lg:justify-start mb-[28px]">
              <span className="font-heading text-[28px] sm:text-[38px] lg:text-[42px] font-bold text-[#D4A017] cursor-blink pr-1">
                {displayedRole}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row items-center gap-[14px] md:gap-[20px] w-full md:w-auto justify-center lg:justify-start">
              {/* Gold Filled Button 1 */}
              <a
                href="#projects"
                className="hero-btn opacity-0 group relative z-0 flex items-center justify-center gap-2 w-[260px] h-[52px] md:w-auto md:h-[64px] rounded-[18px] md:rounded-[20px] text-[15px] md:text-[16px] font-heading font-semibold tracking-wide text-[#0B0F19] bg-gradient-to-r from-[#D4A017] to-[#F6C453] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] overflow-hidden active:scale-95 md:px-8 pointer-events-auto"
              >
                Explore Projects
                <ArrowUpRight className="w-4.5 h-4.5 md:w-3.5 md:h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
              </a>

              {/* Glass Button 2 (Download Resume) */}
              <a
                href="https://drive.google.com/file/d/1Nc6eFIxnU_Tfue6jWEVgOu_Vxi6SeAvW/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn opacity-0 group relative z-0 flex items-center justify-center gap-2 w-[260px] h-[52px] md:w-auto md:h-[64px] rounded-[18px] md:rounded-[20px] text-[15px] md:text-[16px] font-heading font-semibold tracking-wide text-[#F9FAFB] bg-white/5 backdrop-blur-md border border-[#D4A017]/25 hover:border-[#D4A017]/60 hover:text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(212,160,23,0.3)] overflow-hidden active:scale-95 md:px-8 pointer-events-auto"
              >
                <FileText className="w-4.5 h-4.5 text-[#D4A017]" />
                Download Resume
                <div className="absolute inset-0 bg-[#D4A017]/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10" />
              </a>

              {/* Glass Button 3 (View GitHub) */}
              <a
                href="#contact"
                // target="_blank"
                rel="noopener noreferrer"
                className="hero-btn opacity-0 group relative z-0 flex items-center justify-center gap-2 w-[260px] h-[52px] md:w-auto md:h-auto md:text-xs md:px-6 md:py-3.5 rounded-[18px] md:rounded-[20px] text-[15px] md:text-[16px] font-heading font-semibold tracking-wide text-[#F9FAFB] bg-white/5 backdrop-blur-md border border-[#D4A017]/25 hover:border-[#D4A017]/60 hover:text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(212,160,23,0.3)] overflow-hidden active:scale-95 md:px-8 pointer-events-auto"
              >
                {/* <FaGithub className="w-4.5 h-4.5 text-[#D4A017]" /> */}
                Contact Me
                <div className="absolute inset-0 bg-[#D4A017]/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10" />
              </a>
            </div>

            {/* Scroll Indicator (Mobile only - placed below buttons) */}
            <div className="md:hidden flex flex-col items-center gap-1.5 opacity-60 mt-[18px] pointer-events-none select-none">
              <span className="text-[10px] uppercase font-heading tracking-widest text-[#9CA3AF]">
                Scroll to Explore
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-4 h-4 text-[#D4A017]" />
              </motion.div>
            </div>
          </div>

          {/* Right Column (58% width / lg:col-span-7 on desktop, left empty to show video) */}
          <div className="hidden lg:block lg:col-span-7 pointer-events-none" />

        </div>
      </div>

      {/* Chat Button (Bottom Left) */}
      <div className="absolute z-30 pointer-events-auto"
           style={{
             bottom: "calc(env(safe-area-inset-bottom) + 16px)",
             left: "24px"
           }}>
        <button
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 bg-black/80 border border-white/10 text-[#9CA3AF] hover:border-[#D4A017]/50 hover:text-white backdrop-blur-md cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          aria-label="Chat with DM.AI"
          onClick={() => setIsChatOpen(true)}
        >
          <Bot className="w-4.5 h-4.5 text-[#D4A017]" />
        </button>
      </div>

      {/* Down Scroll Indicator (Desktop/Tablet - responsive position) */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity pointer-events-none"
           style={{ bottom: "calc(env(safe-area-inset-bottom) + 16px)" }}>
        <span className="text-[10px] uppercase font-heading tracking-widest text-[#9CA3AF]">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#D4A017]" />
        </motion.div>
      </div>

      {/* Floating Audio Button (Bottom Right - responsive position) */}
      <div className="absolute bottom-8 right-8 md:bottom-50 md:right-24 z-30"
           style={{ bottom: "calc(env(safe-area-inset-bottom) + 16px)" }}>
        <div className="group relative">
          <button
            onClick={handleToggleMute}
            className={`w-12 h-12 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 bg-black/80 border backdrop-blur-md cursor-pointer ${
              isMuted
                ? "border-white/10 text-[#9CA3AF] hover:border-[#D4A017]/50 hover:text-white"
                : "border-[#D4A017] text-[#D4A017] shadow-[0_0_15px_rgba(212,160,23,0.4)]"
            }`}
            aria-label="Toggle Audio Voice"
          >
            {isMuted ? (
              <VolumeX className="w-4.5 h-4.5" />
            ) : (
              <Volume2 className="w-4.5 h-4.5 animate-pulse" />
            )}
          </button>
          {/* Tooltip */}
          <span className="pointer-events-none absolute bottom-full mb-2 right-0 px-2.5 py-1 bg-black/95 border border-[#D4A017]/25 text-[9px] text-[#F9FAFB] rounded-lg font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            Toggle Voice
          </span>
        </div>
      </div>

      {/* Floating Social Bubbles (Drifting across entire screen with hover pause using GSAP) */}
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        {/* LinkedIn Bubble */}
        <div
          ref={el => { bubbleRefs.current[0] = el; }}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)}
          className="absolute left-[15%] top-[20%] lg:left-[25%] lg:top-[30%] pointer-events-auto"
        >
          <motion.a
            href="https://www.linkedin.com/in/divesh-matkar"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isActivated ? 1 : 0, 
              scale: isActivated ? 1 : 0,
            }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.1, borderColor: "rgba(212, 160, 23, 0.8)" }}
            className="group relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md border border-[#D4A017]/25 shadow-[0_0_15px_rgba(212, 160, 23, 0.1)] hover:shadow-[0_0_25px_rgba(212, 160, 23, 0.35)] transition-colors duration-300 cursor-pointer"
          >
            <FaLinkedin className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#9CA3AF] group-hover:text-[#F6C453] transition-colors" />
            <span className="pointer-events-none absolute bottom-full mb-2.5 px-2 py-1 bg-black/95 border border-[#D4A017]/25 text-[9px] text-[#F9FAFB] rounded-lg font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
              LinkedIn
            </span>
          </motion.a>
        </div>

        {/* LeetCode Bubble */}
        <div
          ref={el => { bubbleRefs.current[1] = el; }}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
          className="absolute left-[50%] top-[45%] lg:left-[55%] lg:top-[45%] pointer-events-auto"
        >
          <motion.a
            href="https://leetcode.com/u/divesh_001/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isActivated ? 1 : 0, 
              scale: isActivated ? 1 : 0,
            }}
            transition={{ duration: 0.8, delay: 1.0 }}
            whileHover={{ scale: 1.1, borderColor: "rgba(212, 160, 23, 0.8)" }}
            className="group relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md border border-[#D4A017]/25 shadow-[0_0_15px_rgba(212, 160, 23, 0.1)] hover:shadow-[0_0_25px_rgba(212, 160, 23, 0.35)] transition-colors duration-300 cursor-pointer"
          >
            <SiLeetcode className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#9CA3AF] group-hover:text-[#F6C453] transition-colors" />
            <span className="pointer-events-none absolute bottom-full mb-2.5 px-2 py-1 bg-black/95 border border-[#D4A017]/25 text-[9px] text-[#F9FAFB] rounded-lg font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
              LeetCode
            </span>
          </motion.a>
        </div>

        {/* GitHub Bubble */}
        <div
          ref={el => { bubbleRefs.current[2] = el; }}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
          className="absolute left-[80%] top-[70%] lg:left-[75%] lg:top-[65%] pointer-events-auto"
        >
          <motion.a
            href="https://github.com/Divesh455"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isActivated ? 1 : 0, 
              scale: isActivated ? 1 : 0,
            }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.1, borderColor: "rgba(212, 160, 23, 0.8)" }}
            className="group relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md border border-[#D4A017]/25 shadow-[0_0_15px_rgba(212, 160, 23, 0.1)] hover:shadow-[0_0_25px_rgba(212, 160, 23, 0.35)] transition-colors duration-300 cursor-pointer"
          >
            <FaGithub className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#9CA3AF] group-hover:text-[#F6C453] transition-colors" />
            <span className="pointer-events-none absolute bottom-full mb-2.5 px-2 py-1 bg-black/95 border border-[#D4A017]/25 text-[9px] text-[#F9FAFB] rounded-lg font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
              GitHub
            </span>
          </motion.a>
        </div>
      </div>

      {/* Chat Dialog Modal Overlay */}
      <AnimatePresence>
        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div 
              className="absolute inset-0 cursor-default" 
              onClick={() => setIsChatOpen(false)} 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-lg h-[500px] flex flex-col rounded-3xl border border-[#D4A017]/30 bg-[#111827]/90 backdrop-blur-lg shadow-[0_0_50px_rgba(212,160,23,0.25)] overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-[#D4A017]/10 bg-black/45 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 flex items-center justify-center text-[#D4A017]">
                    <Bot className="w-4.5 h-4.5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-[#F9FAFB] tracking-wide">
                      DM.AI
                    </h3>
                    <span className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Online Assistant
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#D4A017]/40 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-xs scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#D4A017]/20 hover:scrollbar-thumb-[#D4A017]/40">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-line leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-[#D4A017] text-[#0B0F19] font-medium rounded-tr-none"
                          : "bg-[#1F2937]/85 text-[#F9FAFB] border border-white/5 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="flex justify-start">
                    <div className="bg-[#1F2937]/85 text-[#9CA3AF] border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestion Chips */}
              {chatMessages.length === 1 && (
                <div className="px-6 py-2.5 flex flex-wrap gap-2 justify-center bg-black/10 border-t border-[#D4A017]/5">
                  {[
                    "What are Divesh's skills?",
                    "Show me his projects",
                    "How to contact Divesh?"
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(undefined, chip)}
                      className="text-[10px] text-[#D4A017] border border-[#D4A017]/30 bg-black/40 hover:bg-[#D4A017] hover:text-[#0B0F19] px-3 py-1.5 rounded-full font-mono transition-all cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Footer */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-[#D4A017]/10 bg-black/35 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask me about Divesh..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#0B0F19]/90 text-white text-xs font-sans placeholder-white/35 focus:outline-none focus:border-[#D4A017]/50 focus:ring-1 focus:ring-[#D4A017]/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isSending}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#F6C453] text-[#0B0F19] flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
