"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/soundEngine';
import { Shield, Zap, Sparkles, Brain, Cpu } from 'lucide-react';

export default function StatusView({ onBack }) {
  const stats = [
    { name: "Algorithms & DSA", level: 88, arcana: "THE FOOL", icon: <Brain size={18}/> },
    { name: "C++ & Systems", level: 92, arcana: "THE MAGICIAN", icon: <Cpu size={18}/> },
    { name: "Frontend & UI/UX", level: 95, arcana: "THE EMPEROR", icon: <Sparkles size={18}/> },
    { name: "Game Architecture", level: 85, arcana: "THE CHARIOT", icon: <Zap size={18}/> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative z-30 w-full max-w-5xl ml-auto pr-6 md:pr-16 text-white"
    >
      <div className="flex items-center justify-between border-b-2 border-cyan-400/40 pb-4 mb-8">
        <div>
          <span className="text-cyan-400 font-mono tracking-widest text-xs uppercase block">Character Parameters</span>
          <h2 className="text-5xl md:text-7xl font-display tracking-wide text-white">STATUS / LEVEL 99</h2>
        </div>
        <button
          onClick={() => { sound.playBack(); onBack(); }}
          onMouseEnter={() => sound.playHover()}
          className="px-6 py-2 border border-cyan-400/50 bg-blue-950/40 hover:bg-cyan-400 hover:text-black transition-all font-display text-xl tracking-widest -skew-x-12"
        >
          ESC / BACK
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-[#020b1e]/80 border border-cyan-500/30 p-6 backdrop-blur-md relative overflow-hidden -skew-x-3">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/10 rounded-bl-full pointer-events-none" />
          <h3 className="text-2xl font-display text-cyan-400 mb-2">OPERATIVE PROFILE</h3>
          <p className="text-xs text-gray-400 font-mono mb-6">AFFILIATION: ABES ENGINEERING COLLEGE // CSE</p>
          
          <p className="text-gray-200 text-sm leading-relaxed mb-6 font-light">
            Specialized in crafting modern web applications, high-performance C++ architectures, and 2D procedural game worlds. Balances structural engineering principles with cinematic motion design.
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-white/10 pb-1">
              <span className="text-gray-400">PERSONA</span>
              <span className="text-cyan-400 font-bold">THANATOS (CUSTOM BUILD)</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-1">
              <span className="text-gray-400">PRIMARY ROLE</span>
              <span className="text-white">FULL-STACK & GAME DEV</span>
            </div>
          </div>
        </div>

        {/* Skill Parameters with animated meters */}
        <div className="space-y-4">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-[#01091a]/90 border-l-4 border-cyan-400 p-4 relative overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center gap-2 text-sm font-display text-white tracking-wider">
                  <span className="text-cyan-400">{s.icon}</span>
                  {s.name}
                </span>
                <span className="text-xs font-mono text-cyan-400">{s.arcana} [LV {s.level}]</span>
              </div>
              {/* Progress track */}
              <div className="w-full h-2 bg-blue-950/60 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${s.level}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}