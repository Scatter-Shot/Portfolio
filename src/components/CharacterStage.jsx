"use client";
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/soundEngine';

const CHARACTERS = {
  makoto: {
    id: 'makoto',
    name: 'MAKOTO YUKI',
    title: 'S.E.E.S. FIELD COMMANDER',
    arcana: '0. THE FOOL',
    persona: 'ORPHEUS / THANATOS',
    image: '/characters/makoto.png',
    accentColor: '#00E5FF'
  },
  aigis: {
    id: 'aigis',
    name: 'AIGIS',
    title: '7TH GEN ANTI-SHADOW WEAPON',
    arcana: 'VII. THE CHARIOT',
    persona: 'PALLADION / ATHENA',
    image: '/characters/aigis.png',
    accentColor: '#FFD700'
  },
  mitsuru: {
    id: 'mitsuru',
    name: 'MITSURU KIRIJO',
    title: 'S.E.E.S. EXECUTIVE OVERSEER',
    arcana: 'III. THE EMPRESS',
    persona: 'PENTHESILEA / ARTEMISIA',
    image: '/characters/mitsuru.png',
    accentColor: '#FF1A4B'
  }
};

export default function CharacterStage({ activeTab, activeChar = 'makoto', onSelectChar }) {
  const [selectedChar, setSelectedChar] = useState(activeChar);

  // Synchronize if parent passes prop
  useEffect(() => {
    if (activeChar && CHARACTERS[activeChar]) {
      setSelectedChar(activeChar);
    }
  }, [activeChar]);

  // Dynamic 2.5D Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const ringRotate = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Dynamic stage poses based on menu tab
  const getStagePose = () => {
    switch (activeTab) {
      case 'STATUS':
        return { x: -40, scale: 1.08, opacity: 1, filter: 'brightness(1.05) drop-shadow(0 0 30px rgba(0,229,255,0.45))' };
      case 'ARSENAL':
        return { x: -90, scale: 0.95, opacity: 0.9, filter: 'brightness(0.95) drop-shadow(0 0 25px rgba(0,85,255,0.4))' };
      case 'SYSTEM':
        return { x: -120, scale: 0.82, opacity: 0.65, filter: 'brightness(0.7) blur(1px)' };
      default: // 'MENU'
        return { x: 0, scale: 1, opacity: 1, filter: 'brightness(1) drop-shadow(0 0 35px rgba(0,229,255,0.5))' };
    }
  };

  const currentChar = CHARACTERS[selectedChar] || CHARACTERS.makoto;

  return (
    <div className="absolute left-0 bottom-0 w-full md:w-[60vw] h-[92vh] pointer-events-none select-none z-20 overflow-hidden flex items-end">
      
      {/* Dynamic Tartarus Arcana Circles (Background) */}
      <motion.div 
        style={{ rotate: ringRotate }}
        className="absolute left-[2%] bottom-[10%] w-[580px] h-[580px] border-2 border-dashed border-cyan-400/20 rounded-full flex items-center justify-center animate-spin-slow pointer-events-none -z-10"
      >
        <div className="w-[420px] h-[420px] border border-cyan-300/30 rounded-full border-t-4 animate-spin-reverse-slow" />
        <div className="w-[260px] h-[260px] border border-blue-500/20 rounded-full" />
      </motion.div>

      {/* Atmospheric Under-Glow */}
      <div className="absolute left-[5%] bottom-0 w-[450px] h-[350px] bg-gradient-to-t from-cyan-500/20 via-blue-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* 2.5D Interactive Character Stage */}
      <motion.div 
        style={{ rotateX, rotateY, x: translateX, perspective: 1000 }}
        animate={getStagePose()}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full flex items-end justify-start pl-4 md:pl-16 pb-0 origin-bottom"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedChar + activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative h-full flex items-end"
          >
            <img 
              src={currentChar.image} 
              alt={currentChar.name} 
              className="h-[88vh] max-w-[90vw] md:max-w-none object-contain object-bottom pointer-events-auto filter drop-shadow-[0_15px_30px_rgba(0,10,35,0.9)]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Tactical Character Identity Badge (Hover / Clickable switch) */}
        <div className="absolute left-6 md:left-14 bottom-8 pointer-events-auto z-30">
          <div className="p3r-slant bg-[var(--p3r-ocean-dark)]/90 border-2 border-cyan-400 px-4 py-2 shadow-[0_0_15px_rgba(0,229,255,0.4)] backdrop-blur-md">
            <div className="p3r-slant-reverse flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-cyan-400 p3r-star animate-pulse" />
              <div>
                <span className="font-mono text-[9px] text-cyan-300 tracking-widest block uppercase">
                  {currentChar.arcana} // {currentChar.title}
                </span>
                <span className="font-display font-p3r-display text-xl md:text-2xl text-white tracking-wider leading-none">
                  {currentChar.name}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Operative Switcher (Makoto / Aigis / Mitsuru) */}
          <div className="flex gap-2 mt-2">
            {Object.values(CHARACTERS).map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  sound.playSelect();
                  setSelectedChar(c.id);
                  if (onSelectChar) onSelectChar(c.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`p3r-slant px-3 py-1 text-xs font-display font-p3r-display transition-all border ${
                  selectedChar === c.id
                    ? 'bg-cyan-400 text-black border-white shadow-[0_0_10px_#00E5FF]'
                    : 'bg-[#011438]/80 text-gray-300 border-cyan-500/40 hover:border-cyan-300 hover:text-white'
                }`}
              >
                <span className="p3r-slant-reverse block tracking-wider">
                  {c.id.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Water Horizon Gradient Shimmer at Base */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#010a1f] via-[#010a1f]/85 to-transparent pointer-events-none z-20" />
    </div>
  );
}