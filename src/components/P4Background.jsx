"use client";
import React from 'react';

export default function P4Background() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#FFE600] select-none">
      {/* 1. Subtle Halftone Pop Dots */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#0c0b05 2px, transparent 2px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* 2. Top-Right Diagonal Houndstooth Ribbon */}
      <div 
        className="absolute -top-16 right-[-5%] w-[90vw] md:w-[60vw] h-20 bg-houndstooth border-y-4 border-black transform -rotate-12 shadow-xl opacity-80"
      />

      {/* 3. Bottom Rainbow Strip Accent */}
      <div className="absolute bottom-0 inset-x-0 h-1.5 rainbow-strip z-20" />
    </div>
  );
}
