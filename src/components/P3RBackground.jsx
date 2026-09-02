"use client";
import React, { useEffect, useRef } from 'react';

export default function P3RBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating Dark Hour Lunar particles
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.4 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI
    }));

    let step = 0;

    const render = () => {
      step += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Deep Ocean / Dark Hour Base Gradient
      const bgGradient = ctx.createRadialGradient(
        width * 0.3, height * 0.5, 50,
        width * 0.5, height * 0.5, Math.max(width, height)
      );
      bgGradient.addColorStop(0, '#021235');
      bgGradient.addColorStop(0.5, '#010b1f');
      bgGradient.addColorStop(1, '#000611');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Persona 3 Liquid Water Waves at Bottom
      const waveCount = 3;
      const waveColors = [
        'rgba(0, 85, 255, 0.18)',
        'rgba(0, 180, 255, 0.12)',
        'rgba(0, 229, 255, 0.08)'
      ];

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.fillStyle = waveColors[i];
        const waveHeight = 60 + i * 35;
        const speed = step * (0.8 + i * 0.3);
        const freq = 0.003 - i * 0.0006;

        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 15) {
          const y = height - waveHeight + Math.sin(x * freq + speed) * (20 + i * 8) + Math.cos(x * 0.002 + speed * 0.5) * 12;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      }

      // 3. Floating Lunar Ember Particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulse += 0.03;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.15;
        ctx.fillStyle = `rgba(0, 229, 255, ${Math.max(0, currentOpacity)})`;
        ctx.shadowColor = '#00E5FF';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Tactical Diagonal Scanlines Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #00E5FF 0, #00E5FF 1px, transparent 0, transparent 8px)'
        }}
      />
    </div>
  );
}
