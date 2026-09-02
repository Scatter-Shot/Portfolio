"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function P4MenuButton({ label, desc, onClick, onMouseEnter, active }) {
  return (
    <motion.button
      whileHover={{ scale: 1.025, x: -5 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`group relative w-full text-right py-2 sm:py-2.5 px-3.5 sm:px-6 mb-2 p4-skew transition-all duration-150 border-3 sm:border-4 border-black overflow-hidden select-none ${
        active
          ? 'bg-[#0c0b05] text-[#FFE600] shadow-[4px_4px_0px_#FF6600] sm:shadow-[6px_6px_0px_#FF6600]'
          : 'bg-[#FFE600] text-black shadow-[4px_4px_0px_#0c0b05] sm:shadow-[6px_6px_0px_#0c0b05] hover:bg-[#FFF000] hover:shadow-[5px_5px_0px_#0c0b05]'
      }`}
    >
      {/* Tactical Houndstooth Accent on Left Edge */}
      <div className="absolute top-0 bottom-0 left-0 w-2 sm:w-2.5 bg-houndstooth border-r-2 border-black" />

      {/* Retro Pop Rainbow Strip Accent on Active/Hover */}
      <div className="absolute top-0 right-0 w-2 h-full rainbow-strip-vertical border-l-2 border-black" />

      {/* Retro Yellow Indicator Arrow on Hover */}
      <div className="p4-skew-reverse absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 hidden xs:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <span className="font-display font-p4-display text-lg sm:text-xl text-[#FF6600]">
          ▶
        </span>
      </div>

      <div className="p4-skew-reverse relative z-10 pr-1 sm:pr-1.5">
        <span className={`font-display font-p4-display text-xl sm:text-2xl md:text-3xl block tracking-wider leading-none transition-colors ${
          active ? 'text-[#FFE600]' : 'text-black'
        }`}>
          {label}
        </span>
        <span className={`font-mono text-[8px] sm:text-[9px] block tracking-widest uppercase mt-0.5 font-bold ${
          active ? 'text-white' : 'text-[#665500] group-hover:text-black'
        }`}>
          {desc}
        </span>
      </div>
    </motion.button>
  );
}
