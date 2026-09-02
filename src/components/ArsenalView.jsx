"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEngine';
import { ExternalLink, Terminal, Layers } from 'lucide-react';

export default function ArsenalView({ onBack }) {
  const [selectedProject, setSelectedProject] = useState(0);

  const projects = [
    {
      id: "PROJ-01",
      name: "2D Procedural Sandbox RPG",
      category: "GAME DEVELOPMENT / C++",
      summary: "Dynamic tile-based sandbox engine inspired by Terraria, featuring procedural world generation, inventory systems, and custom physics simulation.",
      tech: ["C++", "SFML / OpenGL", "Data Structures", "Procedural Noise"],
      stats: { ATTACK: "94", VERSATILITY: "88", LOGIC: "96" }
    },
    {
      id: "PROJ-02",
      name: "Storefront Web Replicas",
      category: "FRONTEND ARCHITECTURE",
      summary: "Pixel-perfect, high-fidelity clones of major gaming platforms including Steam and Epic Games, focusing on responsive layout engines and animation.",
      tech: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      stats: { ATTACK: "89", VERSATILITY: "95", LOGIC: "91" }
    },
    {
      id: "PROJ-03",
      name: "Dark Fantasy Codex Database",
      category: "CREATIVE WORLDBUILDING",
      summary: "Interactive digital encyclopedia and power hierarchy system engineered for cosmic horror fiction and multifaceted magic rule systems.",
      tech: ["Next.js", "Tailwind CSS", "JSON Schema", "GSAP"],
      stats: { ATTACK: "85", VERSATILITY: "90", LOGIC: "92" }
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      className="relative z-30 w-full max-w-5xl ml-auto pr-6 md:pr-16 text-white"
    >
      <div className="flex items-center justify-between border-b-2 border-cyan-400/40 pb-4 mb-8">
        <div>
          <span className="text-cyan-400 font-mono tracking-widest text-xs uppercase block">Equipped Combat Gear</span>
          <h2 className="text-5xl md:text-7xl font-display tracking-wide">ARSENAL / PROJECTS</h2>
        </div>
        <button
          onClick={() => { sound.playBack(); onBack(); }}
          onMouseEnter={() => sound.playHover()}
          className="px-6 py-2 border border-cyan-400/50 bg-blue-950/40 hover:bg-cyan-400 hover:text-black transition-all font-display text-xl tracking-widest -skew-x-12"
        >
          ESC / BACK
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project Selector List */}
        <div className="flex flex-col space-y-3">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => { sound.playSelect(); setSelectedProject(idx); }}
              onMouseEnter={() => sound.playHover()}
              className={`p-4 text-left transition-all -skew-x-6 border ${
                selectedProject === idx
                  ? "bg-cyan-400 text-black border-white shadow-[0_0_20px_rgba(0,229,255,0.6)] font-bold translate-x-2"
                  : "bg-[#010b1e]/80 text-white border-cyan-500/30 hover:border-cyan-400"
              }`}
            >
              <span className="font-mono text-xs block opacity-75">{p.id}</span>
              <span className="font-display text-2xl tracking-wider block">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Project Inspector Screen */}
        <div className="md:col-span-2 bg-[#020b1f]/90 border-2 border-cyan-400/60 p-8 backdrop-blur-lg relative overflow-hidden -skew-x-2 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <span className="px-3 py-1 bg-cyan-400/20 border border-cyan-400 text-cyan-300 font-mono text-xs uppercase tracking-widest inline-block mb-4">
                {projects[selectedProject].category}
              </span>
              <h3 className="text-4xl font-display text-white mb-4">
                {projects[selectedProject].name}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                {projects[selectedProject].summary}
              </p>

              {/* Tech Badges */}
              <div className="mb-6">
                <span className="text-xs font-mono text-gray-400 block mb-2 uppercase">Attribute Enchantments:</span>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedProject].tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-950/80 border border-blue-400/40 text-xs text-cyan-200 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats breakdown */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 font-mono text-center">
                {Object.entries(projects[selectedProject].stats).map(([k, v]) => (
                  <div key={k} className="bg-blue-950/40 p-2 border border-cyan-500/20">
                    <div className="text-[10px] text-gray-400">{k}</div>
                    <div className="text-xl font-bold text-cyan-400">{v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}