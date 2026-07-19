"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring settings for the ring trail lag effect
  const ringX = useSpring(cursorX, { stiffness: 280, damping: 24 });
  const ringY = useSpring(cursorY, { stiffness: 280, damping: 24 });

  useEffect(() => {
    // Only enable custom cursor on devices with a mouse
    const mediaQuery = window.matchMedia("(pointer: fine)");
    
    const checkDevice = () => {
      if (mediaQuery.matches) {
        setIsMobile(false);
        document.documentElement.classList.add("custom-cursor-active");
      } else {
        setIsMobile(true);
        document.documentElement.classList.remove("custom-cursor-active");
      }
    };

    checkDevice();
    mediaQuery.addEventListener("change", checkDevice);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Dynamic hover bindings for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], .cursor-pointer"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Initial load bindings
    addHoverListeners();

    // Re-bind when RAG logs or dynamic dialogs mutate the DOM
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      mediaQuery.removeEventListener("change", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.classList.remove("custom-cursor-active");
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile) return null;

  return (
    <>
      {/* Background radial glow following cursor smoothly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] rounded-full z-40"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          background: "radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)",
        }}
        transition={{ opacity: { duration: 0.5 } }}
      />

      {/* Custom Inner Dot Pointer */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-gold z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: clicked ? 0.75 : isHovered ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Custom Outer Ring Pointer */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-7 h-7 rounded-full border border-gold z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: clicked ? 0.85 : isHovered ? 1.9 : 1,
          backgroundColor: isHovered ? "var(--theme-gold-hover)" : "rgba(212, 160, 23, 0)",
          opacity: isHovered ? 0.25 : 0.75,
        }}
        transition={{
          scale: { type: "spring", stiffness: 350, damping: 24 },
          backgroundColor: { duration: 0.25 },
          opacity: { duration: 0.25 },
        }}
      />
    </>
  );
}
