"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function P4MenuButton({ label, desc, onClick, onMouseEnter, active }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, x: -8 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`group relative w-full text-right py-3.5 px-8 mb-3 p4-skew transition-all duration-150 border-4 border-black overflow-hidden select-none ${
        active
          ? 'bg-[#0c0b05] text-[#FFE600] shadow-[8px_8px_0px_#FF6600]'
          : 'bg-[#FFE600] text-black shadow-[8px_8px_0px_#0c0b05] hover:bg-[#FFF000] hover:shadow-[10px_10px_0px_#0c0b05]'
      }`}
    >
      {/* Yasogami Houndstooth Accent on Left Edge */}
      <div className="absolute top-0 bottom-0 left-0 w-3 bg-houndstooth border-r-2 border-black" />

      {/* Retro Pop Rainbow Strip Accent on Active/Hover */}
      <div className="absolute top-0 right-0 w-2.5 h-full rainbow-strip-vertical border-l-2 border-black" />

      {/* Retro Yellow Indicator Arrow on Hover */}
      <div className="p4-skew-reverse absolute left-7 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <span className="font-display font-p4-display text-2xl text-[#FF6600]">
          ▶
        </span>
      </div>

      <div className="p4-skew-reverse relative z-10 pr-2">
        <span className={`font-display font-p4-display text-3xl md:text-4xl block tracking-wider leading-none transition-colors ${
          active ? 'text-[#FFE600]' : 'text-black'
        }`}>
          {label}
        </span>
        <span className={`font-mono text-[10px] block tracking-widest uppercase mt-1 font-bold ${
          active ? 'text-white' : 'text-[#665500] group-hover:text-black'
        }`}>
          {desc}
        </span>
      </div>
    </motion.button>
  );
}
