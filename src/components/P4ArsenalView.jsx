"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import { Shield, Sword, Sparkles, ExternalLink, Cpu, Code2, Terminal } from 'lucide-react';

const GEAR_PROJECTS = [
  {
    slot: 'ENGINE MODULE',
    slotIcon: <Cpu size={18} className="text-[#FF6600]" />,
    id: 'ALPHA-01',
    name: '2D Procedural Sandbox RPG',
    category: 'SYSTEMS & SIMULATION // C++',
    summary: 'High-performance tile-based sandbox engine inspired by Terraria, featuring procedural simplex noise terrain, spatial hashing collision detection, dynamic lighting shaders, and custom physics simulation.',
    stats: { PERFORMANCE: '60 FPS', STABILITY: '99%', EFFICIENCY: 'LOW RAM' },
    effect: 'Specialization: Infinite chunk-streamed voxel worlds with locked 60FPS physics.',
    tech: ['C++', 'OpenGL', 'GLSL Shaders', 'Data Structures', 'Simplex Noise']
  },
  {
    slot: 'FRONTEND SUITE',
    slotIcon: <Code2 size={18} className="text-yellow-400" />,
    id: 'ALPHA-02',
    name: 'Tactical Storefront Web Replicas',
    category: 'REACTIVE ARCHITECTURE // REACT',
    summary: 'Pixel-perfect, high-fidelity clones of major gaming platforms including Steam and Epic Games, focusing on responsive layout engines, dynamic cart pipelines, and physics-driven micro-interactions.',
    stats: { LIGHTHOUSE: '100', RESPONSIVE: '100%', INTERACTION: 'TACTILE' },
    effect: 'Specialization: Zero layout thrashing, state desync resistance, and edge caching.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Zustand']
  },
  {
    slot: 'DATABASE MATRIX',
    slotIcon: <Terminal size={18} className="text-emerald-400" />,
    id: 'ALPHA-03',
    name: 'Dark Fantasy Codex Database',
    category: 'KNOWLEDGE BASE & ENTITY GRAPH',
    summary: 'Interactive digital encyclopedia and entity hierarchy matrix engineered for cosmic horror fiction and multifaceted magic rule systems with graph relation mapping.',
    stats: { RELATIONS: 'COMPLEX', QUERY: 'SUB-MS', SCHEMA: 'TYPED' },
    effect: 'Specialization: Accelerates complex schema querying and entity relational graphs.',
    tech: ['Next.js', 'TypeScript', 'GSAP', 'JSON Schema', 'Tailwind CSS']
  }
];

export default function P4ArsenalView({ onBack }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeGear = GEAR_PROJECTS[selectedIdx];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-5xl text-black ml-auto pb-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 sm:border-b-4 border-black pb-2.5 sm:pb-3 mb-4 sm:mb-5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-3 sm:w-4 h-7 sm:h-8 bg-[#FF6600] border-2 border-black flex-shrink-0" />
          <div>
            <span className="font-mono text-[10px] sm:text-xs font-black tracking-widest text-[#0c0b05] uppercase block leading-tight">
              ALPHA FORGE // SYSTEMS ARSENAL
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-p4-display text-[#0c0b05] leading-none mt-0.5">
              ARSENAL <span className="text-[#FF6600] text-2xl sm:text-3xl">/ PROJECTS</span>
            </h2>
          </div>
        </div>

        <button
          onClick={() => { sound.playBack(); onBack(); }}
          onMouseEnter={() => sound.playHover()}
          className="px-5 sm:px-8 py-1.5 sm:py-2 border-3 sm:border-4 border-black bg-[#0c0b05] text-[#FFE600] hover:bg-[#FF6600] hover:text-white font-display font-p4-display text-base sm:text-xl p4-skew transition-all shadow-[4px_4px_0px_#0c0b05] sm:shadow-[6px_6px_0px_#0c0b05] self-end sm:self-auto"
        >
          <span className="block p4-skew-reverse font-black tracking-widest">
            ESC // BACK
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
        {/* Left Slot Selector */}
        <div className="md:col-span-5 flex flex-col space-y-2.5 sm:space-y-3">
          {GEAR_PROJECTS.map((gear, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={gear.id}
                onClick={() => { sound.playSelect(); setSelectedIdx(idx); }}
                onMouseEnter={() => sound.playHover()}
                className={`p-3 sm:p-4 text-left border-3 sm:border-4 border-black p4-skew transition-all ${
                  isSelected
                    ? 'bg-[#0c0b05] text-[#FFE600] shadow-[5px_5px_0px_#FF6600] sm:shadow-[8px_8px_0px_#FF6600] translate-x-1'
                    : 'bg-[#FFE600] text-black shadow-[4px_4px_0px_#0c0b05] sm:shadow-[6px_6px_0px_#0c0b05] hover:bg-[#FFF000]'
                }`}
              >
                <div className="p4-skew-reverse flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      {gear.slotIcon}
                      <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                        [{gear.slot}]
                      </span>
                    </div>
                    <span className="font-display font-p4-display text-lg sm:text-xl block tracking-wider leading-snug">
                      {gear.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold opacity-75">
                    {gear.id}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Inspector Screen */}
        <div className="md:col-span-7 bg-[#0c0b05] text-white border-3 sm:border-4 border-black p-4 sm:p-6 md:p-8 p4-skew shadow-[6px_6px_0px_#0c0b05] sm:shadow-[8px_8px_0px_#0c0b05] relative">
          <div className="p4-skew-reverse">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGear.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between border-b-2 border-[#FFE600]/30 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] bg-[#FFE600] text-black px-1.5 sm:px-2 py-0.5 font-bold uppercase tracking-widest inline-block mb-1">
                      {activeGear.category}
                    </span>
                    <h3 className="font-display font-p4-display text-2xl sm:text-3xl md:text-4xl text-white">
                      {activeGear.name}
                    </h3>
                  </div>
                  <div className="rainbow-strip w-10 sm:w-12 h-2.5 sm:h-3 border border-white" />
                </div>

                <p className="font-mono text-xs text-gray-300 leading-relaxed mb-4 sm:mb-6">
                  {activeGear.summary}
                </p>

                {/* Combat Stats Grid */}
                <div className="bg-[#18160a] border-2 border-[#FFE600]/40 p-3 sm:p-4 mb-4 sm:mb-5">
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#FFE600] uppercase tracking-widest block font-bold mb-2">
                    PROJECT ARCHITECTURE METRICS
                  </span>
                  <div className="grid grid-cols-3 gap-2 font-mono text-center">
                    {Object.entries(activeGear.stats).map(([k, v]) => (
                      <div key={k} className="bg-black p-1.5 sm:p-2 border border-[#FFE600]/20">
                        <div className="text-[8px] sm:text-[9px] text-gray-400">{k}</div>
                        <div className="font-display font-p4-display text-lg sm:text-xl text-[#FFE600] mt-0.5">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Passive Effect */}
                <div className="bg-[#1a1300] border-l-4 border-[#FF6600] p-2.5 sm:p-3 mb-4 sm:mb-5 font-mono text-xs">
                  <span className="text-[#FF6600] font-bold block mb-0.5 text-[10px] sm:text-xs">SYSTEM ADVANTAGE:</span>
                  <span className="text-gray-200 text-[11px] sm:text-xs">{activeGear.effect}</span>
                </div>

                {/* Tech Stack Badges */}
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider block mb-2 font-bold">
                    FORGED WITH TECHNOLOGIES:
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {activeGear.tech.map((t, i) => (
                      <span key={i} className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-black border border-[#FFE600]/50 text-[11px] sm:text-xs text-[#FFE600] font-mono font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
