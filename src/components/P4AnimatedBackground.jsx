"use client";
import React, { useEffect, useRef } from 'react';

export default function P4AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Persona 4 Floating TV Sets & Pop Stars
    const items = Array.from({ length: 24 }, (_, i) => ({
      type: i % 3 === 0 ? 'tv' : i % 3 === 1 ? 'star' : 'dot',
      x: Math.random() * width,
      y: Math.random() * height,
      size: i % 3 === 0 ? Math.random() * 20 + 24 : Math.random() * 12 + 10,
      speedY: Math.random() * 0.45 + 0.25,
      speedX: (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      opacity: Math.random() * 0.45 + 0.25
    }));

    const drawStar = (cx, cy, spikes, outerRadius, innerRadius) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    const drawTV = (x, y, size) => {
      const w = size;
      const h = size * 0.75;
      const r = 4;

      // TV Chassis
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, r);
      ctx.stroke();

      // TV Screen
      const sw = w * 0.68;
      const sh = h * 0.72;
      ctx.beginPath();
      ctx.roundRect(-w / 2 + w * 0.08, -h / 2 + h * 0.14, sw, sh, 2);
      ctx.stroke();

      // Antennas
      ctx.beginPath();
      ctx.moveTo(-w * 0.15, -h / 2);
      ctx.lineTo(-w * 0.35, -h / 2 - h * 0.4);
      ctx.moveTo(w * 0.15, -h / 2);
      ctx.lineTo(w * 0.35, -h / 2 - h * 0.4);
      ctx.stroke();

      // Dials
      ctx.beginPath();
      ctx.arc(w / 2 - w * 0.12, -h / 2 + h * 0.32, 2, 0, Math.PI * 2);
      ctx.arc(w / 2 - w * 0.12, -h / 2 + h * 0.62, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Mouse parallax offset factors
      const offsetX = (mouseX / width - 0.5) * 20;
      const offsetY = (mouseY / height - 0.5) * 20;

      items.forEach((item) => {
        item.y -= item.speedY;
        item.x += item.speedX;
        item.rotation += item.rotationSpeed;

        if (item.y < -50) {
          item.y = height + 40;
          item.x = Math.random() * width;
        }
        if (item.x < -50) item.x = width + 40;
        if (item.x > width + 50) item.x = -40;

        ctx.save();
        ctx.translate(item.x + offsetX * 0.5, item.y + offsetY * 0.5);
        ctx.rotate(item.rotation);
        ctx.globalAlpha = item.opacity;

        if (item.type === 'tv') {
          ctx.strokeStyle = '#0c0b05';
          ctx.fillStyle = '#0c0b05';
          ctx.lineWidth = 2;
          drawTV(0, 0, item.size);
        } else if (item.type === 'star') {
          ctx.fillStyle = '#FF6600';
          ctx.strokeStyle = '#0c0b05';
          ctx.lineWidth = 1.5;
          drawStar(0, 0, 4, item.size, item.size * 0.4);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.fillStyle = '#0c0b05';
          ctx.beginPath();
          ctx.arc(0, 0, item.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#FFE600] select-none">
      {/* 1. Subtle Halftone Pop Dots */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#0c0b05 2px, transparent 2px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* 2. Persona 4 Rotating Concentric Pop Target Rings (Background Center-Left) */}
      <div className="absolute -left-28 -bottom-28 w-[560px] h-[560px] pointer-events-none opacity-15">
        <div className="w-full h-full rounded-full border-[22px] border-black flex items-center justify-center animate-spin-slow">
          <div className="w-[380px] h-[380px] rounded-full border-[14px] border-dashed border-black flex items-center justify-center">
            <div className="w-[220px] h-[220px] rounded-full border-[12px] border-black" />
          </div>
        </div>
      </div>

      {/* 3. Floating Animated Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* 4. Top-Right Diagonal Houndstooth Ribbon */}
      <div 
        className="absolute -top-16 right-[-5%] w-[85vw] md:w-[55vw] h-20 bg-houndstooth border-y-4 border-black transform -rotate-12 shadow-xl opacity-85 z-20"
      />

      {/* 5. Bottom Rainbow Strip Accent */}
      <div className="absolute bottom-0 inset-x-0 h-1.5 rainbow-strip z-20" />
    </div>
  );
}
