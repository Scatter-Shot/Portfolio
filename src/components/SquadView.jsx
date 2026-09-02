"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import { Shield, Zap, Flame, Wind, Crosshair, Sparkles } from 'lucide-react';

const OPERATIVES = [
  {
    id: 'makoto',
    name: 'MAKOTO YUKI',
    role: 'FIELD COMMANDER',
    arcana: '0. THE FOOL',
    persona: 'ORPHEUS & THANATOS',
    icon: '/characters/icon_makoto.png',
    render: '/characters/makoto.png',
    element: 'ALMIGHTY / ALL-AFFINITY',
    iconElement: <Sparkles size={16} className="text-cyan-400" />,
    quote: '"I don\'t care... I will protect what matters."',
    hp: 999,
    sp: 999,
    stats: { ST: 95, MA: 96, EN: 92, AG: 94, LU: 90 }
  },
  {
    id: 'aigis',
    name: 'AIGIS',
    role: '7TH GEN ANTI-SHADOW WEAPON',
    arcana: 'VII. THE CHARIOT',
    persona: 'PALLADION & ATHENA',
    icon: '/characters/icon_aigis.png',
    render: '/characters/aigis.png',
    element: 'PHYSICAL / PIERCE / ORGIA',
    iconElement: <Crosshair size={16} className="text-yellow-400" />,
    quote: '"I will protect you at all costs. Initiating Orgia Mode."',
    hp: 840,
    sp: 420,
    stats: { ST: 94, MA: 75, EN: 98, AG: 82, LU: 70 }
  },
  {
    id: 'mitsuru',
    name: 'MITSURU KIRIJO',
    role: 'EXECUTIVE OVERSEER',
    arcana: 'III. THE EMPRESS',
    persona: 'PENTHESILEA & ARTEMISIA',
    icon: '/characters/icon_mitsuru.png',
    render: '/characters/mitsuru.png',
    element: 'ICE / BUFU / SLASH',
    iconElement: <Shield size={16} className="text-cyan-300" />,
    quote: '"C\'est magnifique! Target neutralized without hesitation."',
    hp: 780,
    sp: 810,
    stats: { ST: 78, MA: 97, EN: 80, AG: 88, LU: 84 }
  },
  {
    id: 'akihiko',
    name: 'AKIHIKO SANADA',
    role: 'COMBAT STRATEGIST',
    arcana: 'IV. THE EMPEROR',
    persona: 'POLYDEUCES & CAESAR',
    icon: '/characters/icon_akihiko.png',
    element: 'ELECTRICITY / ZIO / STRIKE',
    iconElement: <Zap size={16} className="text-yellow-300" />,
    quote: '"I\'ve been waiting for this! Let\'s finish it!"',
    hp: 880,
    sp: 560,
    stats: { ST: 92, MA: 84, EN: 89, AG: 91, LU: 75 }
  },
  {
    id: 'yukari',
    name: 'YUKARI TAKEBA',
    role: 'PRIMARY HEALER & SNIPER',
    arcana: 'VI. THE LOVERS',
    persona: 'IO & ISIS',
    icon: '/characters/icon_yukari.png',
    element: 'WIND / GARU / RECOVERY',
    iconElement: <Wind size={16} className="text-emerald-400" />,
    quote: '"Leave the healing to me. I won\'t let anyone fall!"',
    hp: 720,
    sp: 890,
    stats: { ST: 70, MA: 94, EN: 72, AG: 89, LU: 86 }
  },
  {
    id: 'junpei',
    name: 'JUNPEI IORI',
    role: 'FRONT-LINE VANGUARD',
    arcana: 'I. THE MAGICIAN',
    persona: 'HERMES & TRISMEGISTUS',
    icon: '/characters/icon_junpei.png',
    element: 'FIRE / AGI / SLASH',
    iconElement: <Flame size={16} className="text-red-400" />,
    quote: '"Who\'s da man?! Junpei Iori, ace detective!"',
    hp: 860,
    sp: 480,
    stats: { ST: 93, MA: 68, EN: 88, AG: 76, LU: 90 }
  }
];

export default function SquadView({ onBack, onSelectMember }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeOp = OPERATIVES[selectedIdx];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-5xl text-white ml-auto"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-2 border-cyan-400/40 pb-3 mb-6">
        <div>
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block">Specialized Extracurricular Execution Squad</span>
          <h2 className="text-4xl md:text-6xl font-display font-p3r-display text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>
            S.E.E.S. <span className="text-white text-3xl">/ OPERATIVES</span>
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
        
        {/* Left Side: Party Members Selector Grid */}
        <div className="md:col-span-5 flex flex-col space-y-2">
          {OPERATIVES.map((op, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={op.id}
                onClick={() => {
                  sound.playSelect();
                  setSelectedIdx(idx);
                  if (onSelectMember && (op.id === 'makoto' || op.id === 'aigis' || op.id === 'mitsuru')) {
                    onSelectMember(op.id);
                  }
                }}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center gap-3 p-2.5 text-left transition-all p3r-slant border-2 ${
                  isSelected
                    ? "bg-cyan-400 text-black border-white shadow-[0_0_15px_rgba(0,229,255,0.7)] translate-x-1"
                    : "bg-[var(--p3r-ocean-dark)]/85 text-white border-cyan-500/30 hover:border-cyan-400 hover:bg-[#011a45]"
                }`}
              >
                <div className="p3r-slant-reverse flex items-center gap-3 w-full">
                  <div className="relative w-11 h-11 rounded border border-cyan-400/60 overflow-hidden bg-blue-950 flex-shrink-0">
                    <img src={op.icon} alt={op.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-display font-p3r-display text-lg tracking-wider truncate block">
                        {op.name}
                      </span>
                      <span className="font-mono text-[10px] opacity-80 flex items-center gap-1">
                        {op.iconElement}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono opacity-80">
                      <span>{op.arcana}</span>
                      <span>HP: {op.hp}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Detailed Operative Data Panel */}
        <div className="md:col-span-7 bg-[var(--p3r-ocean-deep)]/95 border-2 border-cyan-400/60 p-6 md:p-8 backdrop-blur-lg p3r-slant shadow-2xl relative">
          <div className="p3r-slant-reverse">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
                  <div>
                    <span className="px-2.5 py-0.5 bg-cyan-400/20 text-cyan-300 font-mono text-[10px] uppercase font-bold tracking-widest inline-block mb-1">
                      {activeOp.role}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-p3r-display text-white">
                      {activeOp.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-cyan-400 font-bold">{activeOp.arcana}</div>
                    <div className="font-mono text-[10px] text-gray-400">{activeOp.element}</div>
                  </div>
                </div>

                <div className="mb-5 bg-[#00122e]/80 border-l-4 border-cyan-400 p-3">
                  <p className="font-mono text-xs text-cyan-200 italic leading-relaxed">
                    {activeOp.quote}
                  </p>
                </div>

                {/* Persona Data */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs mb-6">
                  <div className="bg-[#001533] p-3 border border-cyan-500/30">
                    <span className="text-[10px] text-gray-400 block uppercase">Persona Manifestation</span>
                    <span className="text-cyan-300 font-bold text-sm block mt-1">{activeOp.persona}</span>
                  </div>
                  <div className="bg-[#001533] p-3 border border-cyan-500/30">
                    <span className="text-[10px] text-gray-400 block uppercase">Combat Affinity</span>
                    <span className="text-white font-bold text-sm block mt-1 flex items-center gap-2">
                      {activeOp.iconElement} {activeOp.element}
                    </span>
                  </div>
                </div>

                {/* Radar Parameter Breakdown */}
                <div>
                  <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block mb-2 font-bold">
                    COMBAT ATTRIBUTES [LV 99]
                  </span>
                  <div className="grid grid-cols-5 gap-2 font-mono text-center">
                    {Object.entries(activeOp.stats).map(([statName, val]) => (
                      <div key={statName} className="bg-[#011438] p-2 border border-cyan-400/25">
                        <div className="text-[10px] text-gray-400">{statName}</div>
                        <div className="text-lg font-bold text-cyan-400 mt-0.5">{val}</div>
                        <div className="w-full h-1 bg-blue-950 mt-1 overflow-hidden">
                          <div className="h-full bg-cyan-400" style={{ width: `${val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button to switch hero on screen */}
                {(activeOp.id === 'makoto' || activeOp.id === 'aigis' || activeOp.id === 'mitsuru') && (
                  <button
                    onClick={() => {
                      sound.playSelect();
                      if (onSelectMember) onSelectMember(activeOp.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="mt-6 w-full py-2.5 bg-gradient-to-r from-blue-700 via-cyan-500 to-cyan-400 text-black font-display font-p3r-display text-lg tracking-widest hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                  >
                    DEPLOY AS STAGE OPERATIVE
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
