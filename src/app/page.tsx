"use client";

import { useState, useEffect } from "react";
import AILanding from "@/components/AILanding";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TechStack from "@/components/TechStack";
import AIShowcase from "@/components/AIShowcase";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import { Cpu } from "lucide-react";

export default function Home() {
  const [bootState, setBootState] = useState<"loading" | "transitioning" | "ready">("loading");

  const [heroActivated, setHeroActivated] = useState(false);
  const [mountBelowFold, setMountBelowFold] = useState(false);

  useEffect(() => {
    if (bootState !== "ready") return;

    // Stagger below-fold mounting to ensure the Hero entrance animations are silky smooth.
    // 2.5s is enough time for the GSAP entrance animations to complete.
    const timer = setTimeout(() => {
      setMountBelowFold(true);
    }, 2500);

    // If the user scrolls or interacts, mount immediately
    const triggerMount = () => {
      setMountBelowFold(true);
    };

    window.addEventListener("scroll", triggerMount, { passive: true });
    window.addEventListener("wheel", triggerMount, { passive: true });
    window.addEventListener("touchmove", triggerMount, { passive: true });
    window.addEventListener("keydown", triggerMount, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", triggerMount);
      window.removeEventListener("wheel", triggerMount);
      window.removeEventListener("touchmove", triggerMount);
      window.removeEventListener("keydown", triggerMount);
    };
  }, [bootState]);

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-[#F9FAFB] selection:bg-[#D4A017]/35 selection:text-white font-sans antialiased overflow-hidden">
      {/* Full-screen AI OS Landing Screen */}
      {bootState !== "ready" && (
        <AILanding
          state={bootState}
          onTransitionStart={() => {
            setBootState("transitioning");
          }}
          onTransitionComplete={() => {
            setBootState("ready");

    // Wait 3 seconds before starting Hero video
    setTimeout(() => {
      setHeroActivated(true);
    }, 1000);
  }}
/>
      )}

      {/* Main Content Sections */}
      {bootState === "ready" && (
        <main className="opacity-100 animate-fade-in">
          <Navbar isActivated={heroActivated} />

          {/* Fullscreen Hero */}
          <Hero isActivated={heroActivated} />

      {mountBelowFold && (
        <>
          {/* Floating Tech Stack Cards Grid */}
          <TechStack />

          {/* Dynamic AI Labs Dashboard Playground */}
          <AIShowcase />

          {/* Journey Timeline Stories */}
          <About />

          {/* Skills rating tabs */}
          <Skills />

          {/* Project tilt cards showcase */}
          <Projects />

          {/* Vertical Experience Timeline */}
          <Experience />

          {/* Certification grids */}
          <Certificates />

          {/* Contact Form */}
          <Contact />
        </>
      )}

    </main>
  )}

      {/* Premium Luxury Footer */}
      {bootState === "ready" && mountBelowFold && (
      <footer className="relative bg-[#0B0F19] border-t border-[#D4A017]/10 py-16 overflow-hidden select-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] rounded-full bg-[#D4A017] opacity-[0.03] blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Logo block */}
          <div className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-[#D4A017] to-[#F6C453] text-[#0B0F19] font-bold">
              <Cpu className="w-4 h-4 text-[#0B0F19]" />
            </div>
            <span className="font-heading text-base font-bold tracking-wider bg-gradient-to-r from-[#F9FAFB] via-[#F6C453] to-[#D4A017] bg-clip-text text-transparent">
              DM.AI
            </span>
          </div>

          {/* Links block */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-heading font-semibold tracking-wider uppercase text-[#9CA3AF]">
            <a href="#home" className="hover:text-[#D4A017] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#D4A017] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#D4A017] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#D4A017] transition-colors">Projects</a>
            <a href="#experience" className="hover:text-[#D4A017] transition-colors">Experience</a>
            <a href="#contact" className="hover:text-[#D4A017] transition-colors">Contact</a>
          </div>

          {/* Copyright block */}
          <div className="font-sans text-xs text-[#9CA3AF]/50 text-center md:text-right">
            <span>&copy; {new Date().getFullYear()} Divesh Matkar. All Rights Reserved.</span>
          </div>

        </div>
      </footer>
    )}
    </div>
  );
}
