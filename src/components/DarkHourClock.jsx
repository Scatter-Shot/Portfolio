"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import { Moon, Radio, Shield, Compass, Activity } from 'lucide-react';

export default function DarkHourClock({ activeTab }) {
  const [secondsDeg, setSecondsDeg] = useState(0);
  const [minutesDeg, setMinutesDeg] = useState(0);
  const [hoursDeg, setHoursDeg] = useState(0);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const s = now.getSeconds();
      const m = now.getMinutes();
      const h = now.getHours();

      setSecondsDeg((s / 60) * 360);
      setMinutesDeg(((m + s / 60) / 60) * 360);
      setHoursDeg((((h % 12) + m / 60) / 12) * 360);
      setTimeStr(now.toLocaleTimeString([], { hour12: false }));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute left-0 bottom-0 w-full md:w-[50vw] h-[88vh] pointer-events-none select-none z-10 flex flex-col justify-end p-6 md:p-14">
      
      {/* Ambient Blue Core Glow */}
      <div className="absolute left-10 bottom-10 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Tartarus Chronos Clock Mechanism */}
      <div className="relative w-[340px] md:w-[460px] h-[340px] md:h-[460px] flex items-center justify-center pointer-events-auto">
        
        {/* Outer Astronomical Astrolabe Gear */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/20 animate-spin-slow" />
        
        {/* Secondary Counter-Rotating Ring with Ticks */}
        <div className="absolute inset-4 rounded-full border border-cyan-300/30 border-t-2 border-b-2 border-t-cyan-400 border-b-blue-500 animate-spin-reverse-slow" />

        {/* Inner Arcana Dial Ring */}
        <div className="absolute inset-12 rounded-full border border-cyan-400/40 bg-gradient-to-br from-[#011438]/70 via-[#01091b]/80 to-[#000511]/90 backdrop-blur-sm shadow-[0_0_35px_rgba(0,229,255,0.25)] flex items-center justify-center">
          
          {/* Roman Numerals */}
          <div className="absolute top-3 font-display font-p3r-display text-cyan-300 text-sm md:text-base tracking-widest">
            XII
          </div>
          <div className="absolute right-3 font-display font-p3r-display text-cyan-300 text-sm md:text-base tracking-widest">
            III
          </div>
          <div className="absolute bottom-3 font-display font-p3r-display text-cyan-300 text-sm md:text-base tracking-widest">
            VI
          </div>
          <div className="absolute left-3 font-display font-p3r-display text-cyan-300 text-sm md:text-base tracking-widest">
            IX
          </div>

          {/* Center Moon Phase Sphere */}
          <div 
            onClick={() => sound.playSelect()}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#00E5FF]/20 via-[#0055FF]/10 to-transparent border border-cyan-400/50 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)] group"
          >
            <Moon size={24} className="text-cyan-400 animate-pulse group-hover:rotate-12 transition-transform" />
            <span className="font-mono text-[8px] text-cyan-300 tracking-widest uppercase mt-1">
              FULL MOON
            </span>
          </div>

          {/* Clock Hands */}
          {/* Hour Hand */}
          <div 
            className="absolute top-1/2 left-1/2 w-1.5 h-16 md:h-20 bg-gradient-to-t from-cyan-400 to-white rounded-full origin-bottom -translate-x-1/2 -translate-y-full shadow-[0_0_8px_#00E5FF]"
            style={{ transform: `translateX(-50%) translateY(-100%) rotate(${hoursDeg}deg)` }}
          />

          {/* Minute Hand */}
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-24 md:h-32 bg-cyan-300 rounded-full origin-bottom -translate-x-1/2 -translate-y-full shadow-[0_0_10px_#00E5FF]"
            style={{ transform: `translateX(-50%) translateY(-100%) rotate(${minutesDeg}deg)` }}
          />

          {/* Second Hand (Electric Cyan Needle with Star Tail) */}
          <div 
            className="absolute top-1/2 left-1/2 w-0.5 h-28 md:h-36 bg-[#00E5FF] origin-bottom -translate-x-1/2 -translate-y-full"
            style={{ transform: `translateX(-50%) translateY(-100%) rotate(${secondsDeg}deg)` }}
          >
            <div className="absolute -top-1.5 -left-1 w-2.5 h-2.5 bg-white p3r-star shadow-[0_0_10px_#fff]" />
          </div>

          {/* Center Pivot Pin */}
          <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-cyan-400 shadow-[0_0_10px_#00E5FF] z-20" />
        </div>

        {/* Decorative Compass Ticks */}
        <div className="absolute -bottom-6 flex items-center gap-3">
          <div className="h-0.5 w-12 bg-cyan-500/40" />
          <span className="font-mono text-[10px] text-cyan-400 tracking-[0.3em] uppercase">
            CHRONOS MATRIX
          </span>
          <div className="h-0.5 w-12 bg-cyan-500/40" />
        </div>
      </div>

      {/* S.E.E.S. Tactical Readout Terminal */}
      <div className="mt-8 pointer-events-auto max-w-sm">
        <div className="p3r-slant bg-[var(--p3r-ocean-dark)]/90 border-2 border-cyan-400/60 p-4 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.35)]">
          <div className="p3r-slant-reverse">
            <div className="flex items-center justify-between border-b border-cyan-500/25 pb-2 mb-2.5">
              <span className="font-mono text-[10px] text-cyan-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
                <Activity size={13} className="text-cyan-300 animate-pulse" />
                DARK HOUR TELEMETRY
              </span>
              <span className="font-mono text-[9px] bg-cyan-400/20 text-cyan-300 px-2 py-0.5 font-bold">
                OPERATIONAL
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="bg-[#001438]/80 p-2 border border-cyan-500/20">
                <span className="text-gray-400 block text-[9px]">LUNAR CYCLE:</span>
                <span className="text-white font-bold text-xs">12 / 16 DAYS</span>
              </div>
              <div className="bg-[#001438]/80 p-2 border border-cyan-500/20">
                <span className="text-gray-400 block text-[9px]">TARTARUS DEPTH:</span>
                <span className="text-cyan-300 font-bold text-xs">BLOCK IV / 164F</span>
              </div>
            </div>

            <div className="mt-2 text-[10px] font-mono text-cyan-200/80 flex items-center justify-between">
              <span>S.E.E.S. FIELD LINK ACTIVE</span>
              <span className="text-white font-bold">{timeStr}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
