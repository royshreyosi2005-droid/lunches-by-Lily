import React, { useEffect, useRef } from 'react';

/**
 * AmbientParticles — Subtle, organic culinary dust motes and atmospheric light elements.
 * Designed for Lunches By Lily: Muted sage, warm cream, and restrained terracotta tones.
 * - Ultra-lightweight HTML5 Canvas (zero external dependencies).
 * - Pauses automatically when tab is hidden (battery/GPU friendly).
 * - Respects prefers-reduced-motion (renders static particles or pauses loop).
 * - Subtle parallax response to scroll events.
 */
export default function AmbientParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isRunning = true;
    let lastScrollY = window.scrollY;
    let scrollDelta = 0;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Palette: [R, G, B]
    const palette = [
      [165, 173, 145], // Muted Sage
      [239, 233, 220], // Warm Cream
      [200, 117, 81],  // Restrained Terracotta
      [215, 200, 168]  // Soft Ivory
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];

    const initCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Determine density based on screen width
      const particleCount = width < 640 ? 16 : width < 1024 ? 26 : 38;

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const rgb = palette[Math.floor(Math.random() * palette.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.9 + Math.random() * 1.5,
          color: rgb,
          baseAlpha: 0.12 + Math.random() * 0.16, // ultra-low opacity (0.12 - 0.28)
          vx: (Math.random() - 0.5) * 0.2,
          vy: -0.15 - Math.random() * 0.25, // gentle upward drift
          phase: Math.random() * Math.PI * 2,
          swaySpeed: 0.008 + Math.random() * 0.012,
          swayAmp: 0.2 + Math.random() * 0.35,
          parallax: 0.05 + Math.random() * 0.15
        });
      }
    };

    initCanvas();

    // Scroll listener for subtle parallax
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDelta = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize listener with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initCanvas();
        if (prefersReducedMotion) renderStatic();
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Render single frame for reduced motion
    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.baseAlpha})`;
        ctx.fill();
      }
    };

    if (prefersReducedMotion) {
      renderStatic();
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }

    // Animation Loop
    let time = 0;
    const animate = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Dampen scrollDelta smoothly
      scrollDelta *= 0.9;

      for (const p of particles) {
        // Natural organic drift + slight sway
        p.y += p.vy - scrollDelta * p.parallax;
        p.x += p.vx + Math.sin(time + p.phase) * p.swayAmp;

        // Wrap around viewport edges smoothly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        if (p.x < -10) {
          p.x = width + 10;
        } else if (p.x > width + 10) {
          p.x = -10;
        }

        // Subtle alpha breathing (subtle flicker like ambient light)
        const alpha = p.baseAlpha + Math.sin(time * 0.8 + p.phase) * 0.04;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${Math.max(0.04, alpha)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Pause when page is hidden (tabs switched or minimized)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
