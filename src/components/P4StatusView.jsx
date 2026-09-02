"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import SocialStatsRadar from './SocialStatsRadar';
import { Shield, Zap, Sparkles, Award, User, Users, Star } from 'lucide-react';

const TEAM_MEMBERS = [
  { name: 'YU NARUKAMI', arcana: 'FOOL', role: 'LEADER / ALL-AFFINITY' },
  { name: 'YOSUKE HANAMURA', arcana: 'MAGICIAN', role: 'WIND / SPEED TACTICS' },
  { name: 'CHIE SATONAKA', arcana: 'CHARIOT', role: 'PHYSICAL / ICE STRIKES' },
  { name: 'YUKIKO AMAGI', arcana: 'PRIESTESS', role: 'FIRE / RECOVERY SPECIALIST' },
  { name: 'KANJI TATSUMI', arcana: 'EMPEROR', role: 'ELECTRIC / HEAVY BRAWLER' },
  { name: 'RISE KUJIKAWA', arcana: 'LOVERS', role: 'SUPPORT / RADAR ANALYSIS' },
  { name: 'TEDDIE', arcana: 'STAR', role: 'ICE / TV WORLD NAVIGATOR' },
  { name: 'NAOTO SHIROGANE', arcana: 'FORTUNE', role: 'LIGHT & DARK / ACE DETECTIVE' }
];

export default function P4StatusView({ onBack }) {
  const combatStats = [
    { label: 'ST [STRENGTH]', val: 95, desc: 'C++ Systems Architecture & Low-Level Memory' },
    { label: 'MA [MAGIC]', val: 94, desc: 'Modern Frontend React/Next.js & Dynamic Frameworks' },
    { label: 'EN [ENDURANCE]', val: 92, desc: 'Reliable Test Coverage & Production Stability' },
    { label: 'AG [AGILITY]', val: 96, desc: 'Kinetic UI Animations, GSAP & Rapid Prototyping' },
    { label: 'LU [LUCK]', val: 88, desc: 'Algorithmic Optimization & Problem Solving' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-5xl text-black ml-auto pb-6"
    >
      {/* P4 Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 sm:border-b-4 border-black pb-2.5 sm:pb-3 mb-4 sm:mb-5">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-3 sm:w-4 h-7 sm:h-8 bg-[#FF6600] border-2 border-black flex-shrink-0" />
          <div>
            <span className="font-mono text-[10px] sm:text-xs font-black tracking-widest text-[#0c0b05] uppercase block leading-tight">
              INVESTIGATION TEAM // OPERATIVE DOSSIER
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-p4-display text-[#0c0b05] leading-none mt-0.5">
              STATUS <span className="text-[#FF6600] text-2xl sm:text-3xl">/ LEVEL 99</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Yasogami High Student ID Card & Team Roster */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main ID Card */}
          <div className="bg-[#0c0b05] text-[#FFE600] border-4 border-black p-5 md:p-6 p4-skew shadow-[8px_8px_0px_#FF6600]">
            <div className="p4-skew-reverse">
              {/* ID Header */}
              <div className="flex justify-between items-center border-b-2 border-[#FFE600]/30 pb-2 mb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-white">
                  <User size={15} className="text-[#FF6600]" />
                  <span>YASOGAMI HIGH // CSE DEPARTMENT</span>
                </div>
                <span className="font-mono text-[10px] bg-[#FFE600] text-black px-1.5 py-0.5 font-bold">
                  SEMESTER VI
                </span>
              </div>

              <h3 className="font-display font-p4-display text-3xl md:text-4xl text-white tracking-wider leading-tight">
                VARUN KUMAR KAUSHIK
              </h3>
              <p className="font-mono text-xs text-gray-300 mt-1 mb-3">
                CSE UNDERGRAD // ABES ENGINEERING COLLEGE
              </p>

              <p className="font-mono text-xs text-gray-200 leading-relaxed bg-[#1a1708] p-3 border-l-4 border-[#FFE600] mb-4">
                Specialized in building high-performance C++ game architectures and reactive, animated frontend web platforms. Blends deep computational theory with playful, tactile user experiences.
              </p>

              {/* Persona Manifestation */}
              <div className="border-t border-[#FFE600]/20 pt-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-gray-400">INITIAL PERSONA:</span>
                  <span className="text-[#FFE600] font-bold">IZANAGI (FULL BUILD)</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">ARCANA:</span>
                  <span className="text-white font-bold">0. THE FOOL / INVESTIGATION TEAM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investigation Team Tactical Roster Matrix (100% Vector) */}
          <div className="bg-[#0c0b05] border-4 border-black p-4 p4-skew shadow-[8px_8px_0px_#0c0b05]">
            <div className="p4-skew-reverse">
              <div className="flex items-center justify-between border-b-2 border-[#FFE600]/30 pb-2 mb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#FFE600] font-bold uppercase">
                  <Users size={16} className="text-[#FF6600]" />
                  <span>INABA INVESTIGATION SQUAD // S-LINK ROSTER</span>
                </div>
                <span className="text-[9px] font-mono bg-[#FFE600] text-black px-1.5 py-0.2 font-black">
                  ALL-OUT READY
                </span>
              </div>

              {/* Tactical Roster Grid */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {TEAM_MEMBERS.map((m, i) => (
                  <div key={i} className="bg-[#18160a] p-2 border border-[#FFE600]/25 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block text-[11px] leading-tight truncate">
                        {m.name}
                      </span>
                      <span className="text-[9px] text-gray-400 block">
                        {m.role}
                      </span>
                    </div>
                    <span className="text-[9px] text-[#FFE600] font-black ml-1 flex-shrink-0">
                      {m.arcana}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Persona 4 Social Stats Pentagon & Attributes */}
        <div className="lg:col-span-6 space-y-4">
          <SocialStatsRadar />

          {/* Combat Attributes Gauge */}
          <div className="bg-[#FFE600] border-4 border-black p-4 p4-skew shadow-[8px_8px_0px_#0c0b05]">
            <div className="p4-skew-reverse">
              <h4 className="font-display font-p4-display text-lg text-black tracking-wider mb-2.5 flex items-center gap-2">
                <Zap size={17} className="text-[#FF6600]" />
                COMBAT ATTRIBUTES [LEVEL 99]
              </h4>
              <div className="space-y-1.5 font-mono text-xs">
                {combatStats.map((st, i) => (
                  <div key={i} className="bg-black text-white px-2.5 py-1.5 border border-black flex justify-between items-center">
                    <div>
                      <span className="font-bold text-[#FFE600] block text-xs">{st.label}</span>
                      <span className="text-[9px] text-gray-300 block">{st.desc}</span>
                    </div>
                    <span className="font-display font-p4-display text-lg text-white ml-2">
                      {st.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
