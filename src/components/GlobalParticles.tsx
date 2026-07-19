"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalVx: number;
  originalVy: number;
  radius: number;
  alpha: number;
}

export default function GlobalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let particles: Particle[] = [];

    // Responsive particle count based on viewport
    const getParticleCount = () => {
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        return 25; // Optimized for mobile
      }
      return 75; // Full experience on desktop
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) {
        // Random drift velocities
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: vx,
          vy: vy,
          originalVx: vx,
          originalVy: vy,
          radius: Math.random() * 2.5 + 1.5, // 1.5px to 4.0px
          alpha: Math.random() * 0.5 + 0.25, // 0.25 to 0.75 opacity
        });
      }
    };

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Query active theme variable color dynamically
      const themeGold = typeof window !== "undefined" 
        ? getComputedStyle(document.documentElement).getPropertyValue("--theme-gold").trim() || "#D4A017" 
        : "#D4A017";

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Update positions, physics, boundaries
      particles.forEach((p) => {
        // Natural Drift movement
        p.x += p.vx;
        p.y += p.vy;

        // Cursor Attraction Physics
        if (mx > 0) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const attractionRadius = 180;

          if (dist < attractionRadius) {
            const force = (attractionRadius - dist) / attractionRadius;
            // Accelerate slightly towards mouse position
            p.vx += (dx / dist) * force * 0.05;
            p.vy += (dy / dist) * force * 0.05;

            // Cap maximum speed under attraction
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            const maxSpeed = 1.6;
            if (speed > maxSpeed) {
              p.vx = (p.vx / speed) * maxSpeed;
              p.vy = (p.vy / speed) * maxSpeed;
            }
          }
        }

        // Friction & Return to original drift velocity
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vx += (p.originalVx - p.vx) * 0.02;
        p.vy += (p.originalVy - p.vy) * 0.02;

        // Boundary bounce
        if (p.x < 0 || p.x > canvas.width) {
          p.vx = -p.vx;
          p.originalVx = -p.originalVx;
        }
        if (p.y < 0 || p.y > canvas.height) {
          p.vy = -p.vy;
          p.originalVy = -p.originalVy;
        }
      });

      // 2. Draw Connection Lines between particles (Constellation Net)
      const connectDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            // Fade line out as distance approaches limit
            const alpha = ((connectDistance - dist) / connectDistance) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = themeGold;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // 3. Connect particles to cursor dynamically
        if (mx > 0) {
          const dx = mx - p1.x;
          const dy = my - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const cursorConnectDistance = 150;

          if (dist < cursorConnectDistance) {
            const alpha = ((cursorConnectDistance - dist) / cursorConnectDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = themeGold;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // 4. Draw Particle Dots
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = themeGold;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 opacity-35"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
