"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import { Award, Sparkles, Heart, Zap, Shield, Star, Cpu, Code2, Layers, Activity } from 'lucide-react';

const SYSTEM_PILLARS = [
  {
    code: 'PILLAR 01',
    title: 'FULL-STACK SYSTEMS',
    discipline: 'DISTRIBUTED ARCHITECTURE & APIS',
    status: 'TIER 1 [MASTERED]',
    icon: <Layers size={20} className="text-[#FFE600]" />,
    quote: '"Engineering robust software pipelines where low-latency backends connect seamlessly to reactive frontends."',
    milestones: [
      'Engineered procedural tile generation algorithms with spatial hashing.',
      'Constructed scalable state machines and chunk-streaming pipelines.',
      'Core Mastery: End-to-End Type Safety, Server Actions & Edge Caching.'
    ]
  },
  {
    code: 'PILLAR 02',
    title: 'LOW-LEVEL C++',
    discipline: 'SYSTEMS, MEMORY & GLSL SHADERS',
    status: 'TIER 1 [MASTERED]',
    icon: <Cpu size={20} className="text-[#FF6600]" />,
    quote: '"Speed and precision. Low-level memory managed with relentless pointer accuracy and cache locality."',
    milestones: [
      'Crafted custom GLSL lighting shaders and dynamic vertex buffers.',
      'Engineered sub-millisecond physics simulations and collision detection.',
      'Core Mastery: Zero-leak, cache-friendly data structures & RAII.'
    ]
  },
  {
    code: 'PILLAR 03',
    title: 'FRONTEND ARCHITECTURE',
    discipline: 'REACT 19, NEXT.JS & TAILWIND',
    status: 'TIER 1 [MASTERED]',
    icon: <Code2 size={20} className="text-yellow-400" />,
    quote: '"Unshakable foundations. Building web applications and dashboards that never suffer layout thrashing."',
    milestones: [
      'Engineered high-fidelity responsive clones of Steam and Epic storefronts.',
      'Achieved 100/100 Lighthouse performance through SSR and asset optimization.',
      'Core Mastery: Flawless design-system component architectures.'
    ]
  },
  {
    code: 'PILLAR 04',
    title: 'MOTION & INTERACTION',
    discipline: 'FRAMER MOTION, GSAP & AUDIO DSP',
    status: 'TIER 1 [MASTERED]',
    icon: <Activity size={20} className="text-rose-400" />,
    quote: '"Bringing digital interfaces to life with kinetic physics, tactile feedback, and synchronized soundscapes."',
    milestones: [
      'Choreographed fluid multi-stage route transitions and spring physics.',
      'Synthesized responsive Web Audio soundscapes for interactive user feedback.',
      'Core Mastery: Tactile, visceral user delight on every interaction.'
    ]
  }
];

export default function P4SocialLinksView({ onBack }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activePillar = SYSTEM_PILLARS[selectedIdx];

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
              ARCHITECTURAL PILLARS // SYSTEM MASTERY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-p4-display text-[#0c0b05] leading-none mt-0.5">
              PILLARS <span className="text-[#FF6600] text-2xl sm:text-3xl">/ EXPERTISE</span>
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
        {/* Left: Pillar Selector Deck */}
        <div className="md:col-span-5 flex flex-col space-y-2 sm:space-y-2.5">
          {SYSTEM_PILLARS.map((p, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={p.code}
                onClick={() => { sound.playSelect(); setSelectedIdx(idx); }}
                onMouseEnter={() => sound.playHover()}
                className={`p-3 sm:p-3.5 text-left border-3 sm:border-4 border-black p4-skew transition-all ${
                  isSelected
                    ? 'bg-[#0c0b05] text-[#FFE600] shadow-[5px_5px_0px_#FF6600] sm:shadow-[8px_8px_0px_#FF6600] translate-x-1'
                    : 'bg-[#FFE600] text-black shadow-[4px_4px_0px_#0c0b05] sm:shadow-[6px_6px_0px_#0c0b05] hover:bg-[#FFF000]'
                }`}
              >
                <div className="p4-skew-reverse flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider block">
                      {p.code}
                    </span>
                    <span className="font-display font-p4-display text-base sm:text-lg block tracking-wider leading-snug">
                      {p.title}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] bg-black text-[#FFE600] px-1.5 sm:px-2 py-0.5 border border-[#FFE600]/40 font-black">
                    {p.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Pillar Certificate */}
        <div className="md:col-span-7 bg-[#0c0b05] text-white border-3 sm:border-4 border-black p-4 sm:p-6 md:p-8 p4-skew shadow-[6px_6px_0px_#0c0b05] sm:shadow-[8px_8px_0px_#0c0b05] relative">
          <div className="p4-skew-reverse">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between border-b-2 border-[#FFE600]/30 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] bg-[#FFE600] text-black px-1.5 sm:px-2 py-0.5 font-bold uppercase tracking-widest inline-block mb-1">
                      {activePillar.code}
                    </span>
                    <h3 className="font-display font-p4-display text-2xl sm:text-3xl text-white">
                      {activePillar.title}
                    </h3>
                    <span className="font-mono text-[11px] sm:text-xs text-cyan-300 block mt-0.5 font-bold">
                      {activePillar.discipline}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-p4-display text-xl sm:text-2xl text-[#FF6600] block">
                      TIER 1
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] text-[#FFE600] uppercase font-bold">
                      PRODUCTION READY
                    </span>
                  </div>
                </div>

                <div className="bg-[#18160a] border-l-4 border-[#FFE600] p-2.5 sm:p-3.5 mb-4 sm:mb-5 font-mono text-[11px] sm:text-xs italic text-gray-200">
                  {activePillar.quote}
                </div>

                {/* Milestones Unlocked */}
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#FFE600] uppercase tracking-wider block mb-2 sm:mb-2.5 font-bold">
                    VERIFIED ENGINEERING MILESTONES:
                  </span>
                  <div className="space-y-1.5 sm:space-y-2 font-mono text-[11px] sm:text-xs">
                    {activePillar.milestones.map((ms, i) => (
                      <div key={i} className="flex items-start gap-2 bg-[#121107] p-2 sm:p-2.5 border border-[#FFE600]/20">
                        <Star size={13} className="text-[#FFE600] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">{ms}</span>
                      </div>
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
