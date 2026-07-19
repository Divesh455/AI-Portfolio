"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";

type Theme = "amber" | "crimson";

const themes: Array<{ id: Theme; name: string; color: string; hover: string; bg: string }> = [
  { id: "amber", name: "Amber Gold", color: "#D4A017", hover: "#F6C453", bg: "#0B0F19" },
  { id: "crimson", name: "Crimson Protocol", color: "#EF4444", hover: "#F87171", bg: "#0D0B0C" },
];

export default function ThemeHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<Theme>("amber");

  // Always reset to amber (Golden) theme on reload/mount
  useEffect(() => {
    setActiveTheme("amber");
    applyTheme("amber");
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    // Remove previous themes
    root.classList.remove("theme-cyberpunk", "theme-matrix", "theme-crimson");
    
    // Add current theme if not default
    if (theme !== "amber") {
      root.classList.add(`theme-${theme}`);
    }
    
    localStorage.setItem("portfolio-theme", theme);
  };

  const handleThemeChange = (theme: Theme) => {
    setActiveTheme(theme);
    applyTheme(theme);
    setIsOpen(false);
  };

  return (
    <div
      className="fixed z-40 pointer-events-auto flex flex-col items-center gap-3"
      style={{
        bottom: "calc(env(safe-area-inset-bottom) + 76px)",
        right: "24px",
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 p-2 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className="group relative w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                style={{
                  backgroundColor: t.bg,
                  border: `2px solid ${activeTheme === t.id ? t.color : "rgba(255,255,255,0.15)"}`,
                }}
              >
                {/* Core Color Dot */}
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: t.color }}
                />
                
                {/* Tooltip */}
                <span className="pointer-events-none absolute right-full mr-3 px-2 py-1 bg-black/95 border border-white/10 text-[9px] text-[#F9FAFB] rounded-lg font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                  {t.name}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 bg-black/80 border border-white/10 text-[#9CA3AF] hover:border-gold/50 hover:text-white backdrop-blur-md cursor-pointer"
        style={{
          borderColor: isOpen ? "var(--theme-gold)" : "rgba(255, 255, 255, 0.1)",
          color: isOpen ? "var(--theme-gold)" : "#9CA3AF",
        }}
        aria-label="Change Theme"
      >
        <Palette className={`w-4.5 h-4.5 ${isOpen ? "rotate-45" : ""} transition-transform duration-300`} />
      </button>
    </div>
  );
}
