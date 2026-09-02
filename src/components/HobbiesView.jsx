"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import { Gamepad2, Trophy, BookOpen, Palette, Star, Sparkles, Activity } from 'lucide-react';

const HOBBIES = [
  {
    id: 'GAMING',
    icon: <Gamepad2 size={24} className="text-[#FF6600]" />,
    title: 'GAMING & ENGINE DECONSTRUCTION',
    category: 'VIRTUAL WORLDS & ARCHITECTURE',
    badge: 'ENGINE SPECIALIST',
    summary: 'Passionate video gamer with a maker mindset. Beyond just playing games, I love exploring how they function under the hood—dissecting game engine loops, procedural noise algorithms, collision math, and shader pipelines.',
    tags: ['Game Engines', 'Procedural Generation', 'GLSL Shaders', 'Voxel Sandboxes', 'RPGs', 'Collision Math'],
    metric: 'ENGINEERING MINDSET // HIGH'
  },
  {
    id: 'SPORTS',
    icon: <Trophy size={24} className="text-[#FFE600]" />,
    title: 'ATHLETICS & COMPETITIVE SPORTS',
    category: 'PHYSICAL STAMINA & TEAMPLAY',
    badge: 'MULTI-SPORT ATHLETE',
    summary: 'Active competitor across both court and field. Regularly play Basketball, Volleyball, Football, Cricket, Badminton, and Table Tennis. The fast reflexes, endurance, and team synergy translate directly into engineering persistence.',
    tags: ['Basketball', 'Volleyball', 'Football', 'Cricket', 'Badminton', 'Table Tennis'],
    metric: 'STAMINA // LEVEL 99'
  },
  {
    id: 'WRITING',
    icon: <BookOpen size={24} className="text-cyan-400" />,
    title: 'NOVELS & CREATIVE WRITING',
    category: 'LITERATURE & WORLDBUILDING',
    badge: 'AUTHOR & WORLDBUILDER',
    summary: 'Voracious reader of rich fiction and expansive worldbuilding, and an active novelist. Crafting original stories, character psychologies, tension arcs, and multifaceted magic/cosmic lore systems that fuel creative imagination.',
    tags: ['Novel Writing', 'Fiction Reading', 'Worldbuilding Lore', 'Narrative Arcs', 'Story Architecture'],
    metric: 'NARRATIVE DESIGN // ACTIVE'
  },
  {
    id: 'CRAFTS',
    icon: <Palette size={24} className="text-rose-400" />,
    title: 'ART, CRAFT & TACTILE DESIGN',
    category: 'VISUAL CREATIVITY & PROTOTYPING',
    badge: 'MAKER & DESIGNER',
    summary: 'Hands-on background in art, crafting, and physical design. Exploring shapes, colors, and textures by hand informs how I approach digital interface design—blending kinetic responsiveness with tactile, playful delight.',
    tags: ['Visual Art', 'Physical Crafts', 'Tactile Aesthetics', 'Color Theory', 'Creative Prototyping'],
    metric: 'CREATIVITY // UNCONSTRAINED'
  }
];

export default function HobbiesView({ onBack }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeHobby = HOBBIES[activeIdx];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-5xl text-black ml-auto pb-6 select-none"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 sm:border-b-4 border-black pb-2.5 sm:pb-3 mb-4 sm:mb-5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-3 sm:w-4 h-7 sm:h-8 bg-[#FF6600] border-2 border-black flex-shrink-0" />
          <div>
            <span className="font-mono text-[10px] sm:text-xs font-black tracking-widest text-[#0c0b05] uppercase block leading-tight">
              OPERATIVE PURSUITS // SIDE QUESTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-p4-display text-[#0c0b05] leading-none mt-0.5">
              HOBBIES <span className="text-[#FF6600] text-2xl sm:text-3xl">/ INTERESTS</span>
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
        
        {/* Left Column: 4 Selectable Quest Cards */}
        <div className="md:col-span-5 flex flex-col space-y-2 sm:space-y-2.5">
          {HOBBIES.map((h, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={h.id}
                onClick={() => { sound.playSelect(); setActiveIdx(idx); }}
                onMouseEnter={() => sound.playHover()}
                className={`p-3 sm:p-3.5 text-left border-3 sm:border-4 border-black p4-skew transition-all ${
                  isSelected
                    ? 'bg-[#0c0b05] text-[#FFE600] shadow-[5px_5px_0px_#FF6600] sm:shadow-[8px_8px_0px_#FF6600] translate-x-1'
                    : 'bg-[#FFE600] text-black shadow-[4px_4px_0px_#0c0b05] sm:shadow-[6px_6px_0px_#0c0b05] hover:bg-[#FFF000]'
                }`}
              >
                <div className="p4-skew-reverse flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-sm border-2 border-black ${isSelected ? 'bg-[#FFE600] text-black' : 'bg-[#0c0b05] text-[#FFE600]'}`}>
                      {h.icon}
                    </div>
                    <div>
                      <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider block opacity-80">
                        {h.category}
                      </span>
                      <span className="font-display font-p4-display text-base sm:text-lg block tracking-wider leading-snug">
                        {h.title}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] bg-black text-[#FFE600] px-1.5 sm:px-2 py-0.5 border border-[#FFE600]/40 font-black">
                    0{idx + 1}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Hobby Inspector Panel */}
        <div className="md:col-span-7 bg-[#0c0b05] text-white border-3 sm:border-4 border-black p-4 sm:p-6 md:p-8 p4-skew shadow-[6px_6px_0px_#0c0b05] sm:shadow-[8px_8px_0px_#0c0b05] relative">
          <div className="p4-skew-reverse">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHobby.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b-2 border-[#FFE600]/30 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] bg-[#FFE600] text-black px-1.5 sm:px-2 py-0.5 font-bold uppercase tracking-widest inline-block mb-1">
                      {activeHobby.badge}
                    </span>
                    <h3 className="font-display font-p4-display text-2xl sm:text-3xl text-white">
                      {activeHobby.title}
                    </h3>
                    <span className="font-mono text-[11px] sm:text-xs text-cyan-300 block mt-0.5 font-bold">
                      {activeHobby.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] bg-[#FF6600] text-white px-2 py-0.5 font-black uppercase tracking-wider block">
                      ACTIVE PURSUIT
                    </span>
                    <span className="font-mono text-[9px] text-[#FFE600] uppercase font-bold block mt-1">
                      {activeHobby.metric}
                    </span>
                  </div>
                </div>

                {/* Main Summary */}
                <p className="font-mono text-xs sm:text-sm text-gray-200 leading-relaxed mb-4 sm:mb-6 bg-[#18160a] p-3.5 border-l-4 border-[#FFE600]">
                  {activeHobby.summary}
                </p>

                {/* Key Disciplines & Tags */}
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#FFE600] uppercase tracking-wider block mb-2 sm:mb-2.5 font-bold">
                    SPECIALIZATIONS & ASSOCIATED PURSUITS:
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {activeHobby.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-black border border-[#FFE600]/50 text-xs text-[#FFE600] font-mono font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#0c0b05]"
                      >
                        <Star size={11} className="text-[#FF6600]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footnote Quote */}
                <div className="mt-5 pt-3 border-t border-[#FFE600]/20 flex items-center justify-between font-mono text-[10px] text-gray-400">
                  <span>QUEST STATUS: LEVEL MAX</span>
                  <span className="text-[#FFE600] font-bold">PASSION DRIVEN</span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
