"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import { Award, Sparkles, Heart, Zap, Shield, Star } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    arcana: '0. THE FOOL',
    character: 'INVESTIGATION TEAM',
    discipline: 'FULL-STACK SYSTEMS & ARCHITECTURE',
    rank: 'RANK 10 [MAX]',
    icon: <Sparkles size={20} className="text-[#FFE600]" />,
    quote: '"A bond that forged the entire software framework into an unbreakable system."',
    milestones: [
      'Engineered procedural tile generation algorithms with spatial hashing.',
      'Constructed scalable microservices and modular state machines.',
      'Ultimate Manifestation: Mastered End-to-End System Integration.'
    ]
  },
  {
    arcana: 'I. THE MAGICIAN',
    character: 'C++ & SYSTEMS DEV',
    discipline: 'LOW-LEVEL MEMORY & SHADERS',
    rank: 'RANK 10 [MAX]',
    icon: <Zap size={20} className="text-[#FF6600]" />,
    quote: '"Speed and precision. Memory managed with relentless pointer accuracy."',
    milestones: [
      'Crafted custom GLSL lighting shaders and dynamic vertex buffers.',
      'Engineered sub-millisecond physics simulations and collision detection.',
      'Ultimate Manifestation: Zero-leak, cache-friendly data structures.'
    ]
  },
  {
    arcana: 'IV. THE EMPEROR',
    character: 'FRONTEND ENGINEERING',
    discipline: 'REACT 19, NEXT.JS & TAILWIND',
    rank: 'RANK 10 [MAX]',
    icon: <Shield size={20} className="text-yellow-400" />,
    quote: '"Unshakable foundations. Building storefronts and dashboards that never falter."',
    milestones: [
      'Engineered high-fidelity responsive clones of Steam and Epic storefronts.',
      'Achieved 100/100 Lighthouse performance through SSR and edge caching.',
      'Ultimate Manifestation: Flawless design-system component architectures.'
    ]
  },
  {
    arcana: 'VI. THE LOVERS',
    character: 'MOTION & INTERACTION',
    discipline: 'FRAMER MOTION, GSAP & AUDIO',
    rank: 'RANK 10 [MAX]',
    icon: <Heart size={20} className="text-rose-400" />,
    quote: '"Bringing interfaces to life with tactile physics, soundscapes, and rhythm."',
    milestones: [
      'Choreographed fluid multi-stage route transitions and spring animations.',
      'Synthesized responsive Web Audio soundscapes for interactive feedback.',
      'Ultimate Manifestation: Tactile, visceral user delight on every click.'
    ]
  }
];

export default function P4SocialLinksView({ onBack }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeLink = SOCIAL_LINKS[selectedIdx];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-5xl text-black ml-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-4 h-8 bg-[#FF6600] border-2 border-black" />
          <div>
            <span className="font-mono text-xs font-black tracking-widest text-[#0c0b05] uppercase block">
              COMMUNITY // TAROT ARCANA BONDS
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-p4-display text-[#0c0b05] leading-none">
              SOCIAL LINKS <span className="text-[#FF6600] text-3xl">/ BONDS</span>
            </h2>
          </div>
        </div>

        <button
          onClick={() => { sound.playBack(); onBack(); }}
          onMouseEnter={() => sound.playHover()}
          className="px-8 py-2 border-4 border-black bg-[#0c0b05] text-[#FFE600] hover:bg-[#FF6600] hover:text-white font-display font-p4-display text-xl p4-skew transition-all shadow-[6px_6px_0px_#0c0b05]"
        >
          <span className="block p4-skew-reverse font-black tracking-widest">
            ESC // BACK
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Social Links Card Deck */}
        <div className="md:col-span-5 flex flex-col space-y-2.5">
          {SOCIAL_LINKS.map((link, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={link.arcana}
                onClick={() => { sound.playSelect(); setSelectedIdx(idx); }}
                onMouseEnter={() => sound.playHover()}
                className={`p-3.5 text-left border-4 border-black p4-skew transition-all ${
                  isSelected
                    ? 'bg-[#0c0b05] text-[#FFE600] shadow-[8px_8px_0px_#FF6600] translate-x-1'
                    : 'bg-[#FFE600] text-black shadow-[6px_6px_0px_#0c0b05] hover:bg-[#FFF000]'
                }`}
              >
                <div className="p4-skew-reverse flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider block">
                      {link.arcana}
                    </span>
                    <span className="font-display font-p4-display text-lg block tracking-wider leading-snug">
                      {link.character}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] bg-black text-[#FFE600] px-2 py-0.5 border border-[#FFE600]/40 font-black">
                    {link.rank}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Social Link Bond Certificate */}
        <div className="md:col-span-7 bg-[#0c0b05] text-white border-4 border-black p-6 md:p-8 p4-skew shadow-[8px_8px_0px_#0c0b05] relative">
          <div className="p4-skew-reverse">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLink.arcana}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between border-b-2 border-[#FFE600]/30 pb-3 mb-4">
                  <div>
                    <span className="font-mono text-[10px] bg-[#FFE600] text-black px-2 py-0.5 font-bold uppercase tracking-widest inline-block mb-1">
                      {activeLink.arcana}
                    </span>
                    <h3 className="font-display font-p4-display text-3xl text-white">
                      {activeLink.character}
                    </h3>
                    <span className="font-mono text-xs text-cyan-300 block mt-0.5 font-bold">
                      {activeLink.discipline}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-p4-display text-2xl text-[#FF6600] block">
                      RANK 10
                    </span>
                    <span className="font-mono text-[9px] text-[#FFE600] uppercase font-bold">
                      BOND MASTERED
                    </span>
                  </div>
                </div>

                <div className="bg-[#18160a] border-l-4 border-[#FFE600] p-3.5 mb-5 font-mono text-xs italic text-gray-200">
                  {activeLink.quote}
                </div>

                {/* Milestones Unlocked */}
                <div>
                  <span className="font-mono text-[10px] text-[#FFE600] uppercase tracking-wider block mb-2.5 font-bold">
                    UNLOCKED ARCANA ABILITIES & ACHIEVEMENTS:
                  </span>
                  <div className="space-y-2 font-mono text-xs">
                    {activeLink.milestones.map((ms, i) => (
                      <div key={i} className="flex items-start gap-2 bg-[#121107] p-2.5 border border-[#FFE600]/20">
                        <Star size={14} className="text-[#FFE600] flex-shrink-0 mt-0.5" />
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
