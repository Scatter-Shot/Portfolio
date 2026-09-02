"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function MenuButton({ label, desc, onClick, onMouseEnter, active }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, x: -8 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`group relative w-full text-right py-3.5 px-8 mb-2.5 backdrop-blur-md transition-all duration-200 p3r-slant shadow-[0_4px_25px_rgba(0,10,35,0.8)] overflow-hidden border-y border-l-0 ${
        active
          ? 'bg-cyan-400 text-black border-white border-r-[10px]'
          : 'bg-[var(--p3r-ocean-dark)]/85 text-white border-cyan-400/40 border-r-[6px] hover:border-r-[10px] hover:border-cyan-300'
      }`}
    >
      {/* Liquid slide-in wave on hover */}
      <div className="absolute inset-0 bg-gradient-to-l from-cyan-400 via-cyan-300 to-blue-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10" />

      {/* Star motif badge on hover */}
      <div className="p3r-slant-reverse absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-4 h-4 p3r-star bg-black shadow-sm" />
        <span className="font-mono text-[10px] text-black tracking-widest uppercase font-bold">SELECT</span>
      </div>

      <div className="p3r-slant-reverse relative z-10">
        <span className={`font-display font-p3r-display text-3xl md:text-4xl block tracking-wider leading-tight transition-colors ${active ? 'text-black' : 'text-white group-hover:text-black'}`}>
          {label}
        </span>
        <span className={`font-mono text-[10px] block tracking-widest uppercase mt-0.5 transition-colors ${active ? 'text-blue-950 font-bold' : 'text-cyan-300 group-hover:text-black'}`}>
          {desc}
        </span>
      </div>
    </motion.button>
  );
}
