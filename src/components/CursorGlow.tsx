"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (opacity === 0) setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [opacity]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500 ease-out"
      style={{
        opacity: opacity,
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(212, 160, 23, 0.04), transparent 80%)`,
      }}
    />
  );
}
