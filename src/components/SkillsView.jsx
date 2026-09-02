"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import { Flame, Shield, Zap, Wind, Sparkles, Moon, Cpu, Database, Award } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    id: 'ALMIGHTY',
    name: 'MEGIDOLAON // ALMIGHTY',
    desc: 'Low-Level Systems & Game Engine Architecture',
    icon: <Sparkles className="text-cyan-300" size={20} />,
    color: 'border-cyan-400 bg-cyan-400/10 text-cyan-300',
    skills: [
      { name: 'C++ Systems Architecture', rank: 'TIER IV', cost: '99 SP', desc: 'Memory management, pointers, custom data structures, and cache locality.' },
      { name: 'OpenGL & GLSL Shaders', rank: 'TIER IV', cost: '85 SP', desc: 'Custom 2D render pipelines, lighting shaders, and framebuffer passes.' },
      { name: 'Procedural World Gen', rank: 'TIER III', cost: '70 SP', desc: 'Simplex noise algorithms, infinite chunk streaming, and cellular automata.' }
    ]
  },
  {
    id: 'LIGHT',
    name: 'KOUHA // LIGHT',
    desc: 'Modern Frontend & Reactive Frameworks',
    icon: <Award className="text-yellow-300" size={20} />,
    color: 'border-yellow-400 bg-yellow-400/10 text-yellow-300',
    skills: [
      { name: 'Next.js & React 19', rank: 'TIER IV', cost: '95 SP', desc: 'Server components, dynamic streaming, hydration optimization, and SSR.' },
      { name: 'Tailwind CSS & Modern Styling', rank: 'TIER IV', cost: '90 SP', desc: 'Scalable responsive design systems, custom theme engines, and fluid layouts.' },
      { name: 'TypeScript & Type Safety', rank: 'TIER III', cost: '80 SP', desc: 'Strict interface contracts, generics, schema validations, and zero runtime errors.' }
    ]
  },
  {
    id: 'WIND',
    name: 'GARUDYNE // WIND',
    desc: 'Motion Design & Kinetic UI Interactions',
    icon: <Wind className="text-emerald-300" size={20} />,
    color: 'border-emerald-400 bg-emerald-400/10 text-emerald-300',
    skills: [
      { name: 'Framer Motion Dynamics', rank: 'TIER IV', cost: '92 SP', desc: 'Spring physics, layout animations, gesture tracking, and route transitions.' },
      { name: 'GSAP Timeline Choreography', rank: 'TIER III', cost: '85 SP', desc: 'Complex multi-stage choreographed sequences and high-performance SVG tweens.' },
      { name: 'Tactile Micro-interactions', rank: 'TIER III', cost: '80 SP', desc: 'Spatial audio triggers, cursor ripples, and reactive button physics.' }
    ]
  },
  {
    id: 'ELEC',
    name: 'ZIODYNE // ELEC',
    desc: 'Real-Time Protocols & Network Pipelines',
    icon: <Zap className="text-cyan-400" size={20} />,
    color: 'border-cyan-400 bg-cyan-400/10 text-cyan-400',
    skills: [
      { name: 'WebSockets & Real-Time Sync', rank: 'TIER III', cost: '82 SP', desc: 'Bi-directional low-latency event broadcasting and state synchronization.' },
      { name: 'REST & GraphQL Architecture', rank: 'TIER IV', cost: '88 SP', desc: 'Resilient API endpoints, edge functions, and structured caching strategies.' }
    ]
  }
];

export default function SkillsView({ onBack }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const current = SKILL_CATEGORIES[activeCategory];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-5xl text-white ml-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-cyan-400/40 pb-3 mb-6">
        <div>
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block">Persona Arcana Tree</span>
          <h2 className="text-4xl md:text-6xl font-display font-p3r-display text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>
            SKILLS <span className="text-white text-3xl">/ ABILITIES</span>
          </h2>
        </div>
        <button 
          onClick={() => { sound.playBack(); onBack(); }} 
          onMouseEnter={() => sound.playHover()} 
          className="px-8 py-2 border-2 border-cyan-400 bg-[#011438] hover:bg-cyan-400 hover:text-black font-display font-p3r-display text-xl p3r-slant transition-colors"
        >
          <span className="block p3r-slant-reverse">BACK</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Category List */}
        <div className="md:col-span-5 flex flex-col space-y-2.5">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isSelected = idx === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => { sound.playSelect(); setActiveCategory(idx); }}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center gap-3 p-3.5 text-left transition-all p3r-slant border-2 ${
                  isSelected
                    ? "bg-cyan-400 text-black border-white shadow-[0_0_20px_rgba(0,229,255,0.7)] translate-x-1"
                    : "bg-[var(--p3r-ocean-dark)]/85 text-white border-cyan-500/30 hover:border-cyan-400 hover:bg-[#011a45]"
                }`}
              >
                <div className="p3r-slant-reverse flex items-center gap-3 w-full">
                  <div className={`p-2 rounded border ${isSelected ? 'bg-black/20 border-black' : 'bg-blue-950 border-cyan-400/40'}`}>
                    {cat.icon}
                  </div>
                  <div>
                    <span className="font-display font-p3r-display text-lg tracking-wider block">
                      {cat.name}
                    </span>
                    <span className="font-mono text-[10px] opacity-80 block truncate">
                      {cat.desc}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Skill Details */}
        <div className="md:col-span-7 bg-[var(--p3r-ocean-deep)]/95 border-2 border-cyan-400/60 p-6 md:p-8 backdrop-blur-lg p3r-slant shadow-2xl">
          <div className="p3r-slant-reverse">
            <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-5">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block mb-1">
                  AFFINITY ENCHANTMENT MATRIX
                </span>
                <h3 className="text-3xl font-display font-p3r-display text-white">
                  {current.name}
                </h3>
              </div>
              <div className="p-2.5 bg-[#001533] border border-cyan-400/40">
                {current.icon}
              </div>
            </div>

            <p className="font-mono text-xs text-gray-300 mb-6">
              {current.desc}
            </p>

            {/* Individual Skills List */}
            <div className="space-y-3">
              {current.skills.map((skill, i) => (
                <div key={i} className="bg-[#00122e] border-l-4 border-cyan-400 p-3.5 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-display font-p3r-display text-base text-white tracking-wider">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="bg-cyan-400/20 text-cyan-300 px-2 py-0.5 border border-cyan-400/40">
                        {skill.rank}
                      </span>
                      <span className="text-gray-400 font-bold">
                        {skill.cost}
                      </span>
                    </div>
                  </div>
                  <p className="font-mono text-xs text-gray-300 leading-relaxed mt-1">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
