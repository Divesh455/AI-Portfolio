"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ isActivated = true }: { isActivated?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section detection
      const sections = navItems.map(item => item.href.slice(1));
      let currentSection = "home";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isMobile = false) => {
    e.preventDefault();
    if (isMobile) {
      setMobileMenuOpen(false);
    }

    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      const globalWindow = window as unknown as { lenis?: { scrollTo: (el: HTMLElement, opts?: { offset?: number }) => void } };
      if (globalWindow.lenis) {
        globalWindow.lenis.scrollTo(element, { offset: -80 });
      } else {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={isActivated ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0F19]/80 backdrop-blur-md border-b border-[#D4A017]/10 py-4 shadow-lg shadow-black/20"
          : "bg-transparent py-6 max-md:bg-[#0B0F19]/65 max-md:backdrop-blur-md max-md:border-b max-md:border-[#D4A017]/10 max-md:py-4 max-md:shadow-lg max-md:shadow-black/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4A017] to-[#F6C453] shadow-md shadow-[#D4A017]/20 group-hover:scale-105 transition-transform duration-300">
            <Cpu className="w-5 h-5 text-[#0B0F19]" />
            <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-heading text-lg font-bold tracking-wider bg-gradient-to-r from-[#F9FAFB] via-[#F6C453] to-[#D4A017] bg-clip-text text-transparent group-hover:opacity-90">
            DM.AI
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative font-sans text-sm tracking-wide transition-colors duration-300 py-1 cursor-pointer ${
                  isActive ? "text-[#D4A017] font-semibold" : "text-[#9CA3AF] hover:text-[#F9FAFB]"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#D4A017] shadow-[0_0_8px_rgba(212,160,23,0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-heading font-semibold tracking-wider text-[#0B0F19] bg-gradient-to-r from-[#D4A017] to-[#F6C453] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] group overflow-hidden cursor-pointer"
          >
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#9CA3AF] hover:text-[#F9FAFB] p-2 rounded-lg hover:bg-[#1F2937]/50 border border-[#D4A017]/10 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-[#0B0F19]/95 backdrop-blur-lg border-b border-[#D4A017]/10 overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href, true)}
                  className={`font-sans text-base py-2 border-b border-white/5 transition-colors cursor-pointer ${
                    activeSection === item.href.slice(1)
                      ? "text-[#D4A017] font-semibold pl-2 border-l-2 border-l-[#D4A017]"
                      : "text-[#9CA3AF] hover:text-[#F9FAFB]"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact", true)}
                className="mt-4 w-full text-center py-3 rounded-full text-sm font-heading font-semibold text-[#0B0F19] bg-gradient-to-r from-[#D4A017] to-[#F6C453] cursor-pointer"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
