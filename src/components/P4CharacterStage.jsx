"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import { Sparkles, Shield, User } from 'lucide-react';

const CHARACTERS = [
  {
    id: 'yu',
    name: 'YU NARUKAMI',
    subtitle: 'INVESTIGATION TEAM LEADER',
    arcana: '0. THE FOOL',
    image: '/p4/yu_narukami.png',
    badge: 'YASOGAMI HIGH // SENIOR',
    color: '#FFE600'
  },
  {
    id: 'izanagi',
    name: 'IZANAGI',
    subtitle: 'INITIAL PERSONA MANIFESTATION',
    arcana: 'ZIO & SLASH AFFINITY',
    image: '/p4/izanagi.png',
    badge: 'LIGHTNING SPECIALIST',
    color: '#FF6600'
  },
  {
    id: 'teddie',
    name: 'TEDDIE',
    subtitle: 'TV WORLD OPERATIVE & MASCOT',
    arcana: 'STAR // ICE & HEALING',
    image: '/p4/teddie.png',
    badge: 'MIDNIGHT CHANNEL GUIDE',
    color: '#00A859'
  }
];

export default function P4CharacterStage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeChar = CHARACTERS[selectedIdx];

  const handleSelect = (idx) => {
    sound.playSelect();
    setSelectedIdx(idx);
  };

  return (
    <div className="relative w-full max-w-[420px] lg:max-w-[460px] h-[480px] md:h-[560px] flex flex-col justify-end select-none">
      
      {/* Background Pop Card Backing */}
      <div className="absolute inset-x-4 bottom-4 top-12 bg-[#0c0b05] border-4 border-black p4-skew shadow-[12px_12px_0px_#FF6600] z-0 overflow-hidden">
        {/* Houndstooth Sash */}
        <div className="absolute top-0 right-0 w-full h-10 bg-houndstooth border-b-2 border-black" />
        
        {/* Subtle Halftone Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#FFE600 2px, transparent 2px)',
            backgroundSize: '16px 16px'
          }}
        />

        {/* Rainbow Accent Strip at Bottom */}
        <div className="absolute bottom-0 inset-x-0 h-2 rainbow-strip" />
      </div>

      {/* Dynamic Character Render Viewport */}
      <div className="relative z-10 w-full h-[82%] flex items-end justify-center pb-2 overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChar.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-full flex items-end justify-center"
          >
            <img
              src={activeChar.image}
              alt={activeChar.name}
              className="h-[105%] max-w-[95%] object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.65)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tactical Character Identity Badge */}
      <div className="relative z-20 px-4 pb-2">
        <div className="p4-skew bg-[#FFE600] text-black border-4 border-black p-3 shadow-[6px_6px_0px_#0c0b05]">
          <div className="p4-skew-reverse flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] bg-black text-[#FFE600] px-1.5 py-0.5 font-black uppercase tracking-wider block w-fit mb-0.5">
                {activeChar.badge}
              </span>
              <h3 className="font-display font-p4-display text-2xl tracking-wider leading-none">
                {activeChar.name}
              </h3>
              <span className="font-mono text-[9px] text-[#554400] font-bold block mt-0.5 uppercase tracking-wide">
                {activeChar.subtitle}
              </span>
            </div>

            {/* Quick Character Tabs */}
            <div className="flex flex-col gap-1">
              {CHARACTERS.map((char, i) => (
                <button
                  key={char.id}
                  onClick={() => handleSelect(i)}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-2 py-0.5 border-2 border-black font-mono text-[9px] font-black uppercase tracking-wider transition-all ${
                    selectedIdx === i
                      ? 'bg-black text-[#FFE600] shadow-[2px_2px_0px_#FF6600]'
                      : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {char.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
