"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ParallaxCharacter({ currentView }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const charRotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const charRotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const charTranslateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const ringRotate = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {/* Dynamic Tartarus Arcana Circles */}
      <motion.div 
        style={{ rotate: ringRotate }}
        className="absolute left-[5%] top-[15%] w-[650px] h-[650px] border-2 border-dashed border-cyan-400/20 rounded-full flex items-center justify-center animate-spin-slow"
      >
        <div className="w-[480px] h-[480px] border border-cyan-300/30 rounded-full border-t-4" />
        <div className="w-[300px] h-[300px] border border-blue-500/40 rounded-full" />
      </motion.div>

      {/* 2.5D Character Stage */}
      <motion.div 
        style={{ 
          rotateX: charRotateX, 
          rotateY: charRotateY, 
          x: charTranslateX,
          perspective: 1000 
        }}
        animate={{
          scale: currentView === 'MENU' ? 1 : 0.85,
          x: currentView === 'MENU' ? 0 : -100,
          opacity: currentView === 'SYSTEM' ? 0.3 : 1
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute left-[3%] bottom-0 w-[420px] md:w-[620px] h-[85vh] flex items-end justify-center"
      >
        {/* Glowing Backlight Silhouette */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 via-blue-600/10 to-transparent blur-3xl" />

        {/* Protagonist Illustration / Cutout Vector */}
        <div className="relative w-full h-full flex items-end justify-center">
          <svg 
            viewBox="0 0 500 800" 
            className="h-full w-auto drop-shadow-[0_0_35px_rgba(0,229,255,0.45)]"
          >
            {/* Stylized Shadow Body */}
            <path 
              d="M 210 120 C 190 140, 160 210, 150 290 L 130 500 L 110 800 L 390 800 L 370 500 L 350 290 C 340 210, 310 140, 290 120 Z" 
              fill="#010d24" 
              stroke="#00E5FF" 
              strokeWidth="3"
            />
            {/* High Collar & MP3 Headphone Band */}
            <path d="M 190 200 Q 250 240 310 200 L 320 280 Q 250 310 180 280 Z" fill="#002A5A" stroke="#00E5FF" strokeWidth="2" />
            <circle cx="180" cy="240" r="24" fill="#00E5FF" />
            <circle cx="320" cy="240" r="24" fill="#00E5FF" />
            {/* Gekkoukan Tie & Emblem */}
            <polygon points="245,280 255,280 260,420 250,450 240,420" fill="#00E5FF" />
            {/* S.E.E.S. Armband Highlight */}
            <polygon points="145,340 125,360 130,440 152,420" fill="#FF1A4B" stroke="#FFFFFF" strokeWidth="2" />
            <text x="132" y="395" fill="#FFFFFF" fontSize="14" fontWeight="bold" transform="rotate(-70 132,395)">SEES</text>
            {/* Evoker Holster Silhouette Accent */}
            <path d="M 330 460 L 365 480 L 355 580 L 320 540 Z" fill="#001533" stroke="#00E5FF" strokeWidth="2" />
          </svg>

          {/* Tactical Water Wave at Base */}
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#020817] via-[#020817]/80 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}