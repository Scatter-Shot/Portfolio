"use client";
import React, { useState } from 'react';
import { sound } from '@/utils/soundEngine';
import { Tv, Activity, Radio, Cpu } from 'lucide-react';

const CHANNELS = [
  { num: 1, title: 'ALPHA CORE // KERNEL', subtitle: 'SYSTEM INITIALIZATION & TELEMETRY' },
  { num: 2, title: 'C++ GRAPHICS // SHADERS', subtitle: 'OPENGL VERTEX PIPELINE ACTIVE' },
  { num: 3, title: 'REACT // APPARATUS', subtitle: 'DYNAMIC SSR RUNTIME SYNCED' },
  { num: 4, title: 'TACTICAL RADAR // SWEEP', subtitle: 'ATMOSPHERIC & NETWORK PROFILING' },
  { num: 5, title: 'MEMORY MATRIX // CACHE', subtitle: 'ZERO-ALLOCATION BUFFER ONLINE' },
  { num: 6, title: 'AUDIO DSP // OSCILLATOR', subtitle: 'SYNTHESIZED 8-BIT HARMONICS' },
];

export default function P4RetroTVStage() {
  const [channelIdx, setChannelIdx] = useState(0);
  const [isFlickering, setIsFlickering] = useState(false);

  const flipChannel = () => {
    sound.playTVStatic();
    setIsFlickering(true);
    setChannelIdx((prev) => (prev + 1) % CHANNELS.length);
    setTimeout(() => setIsFlickering(false), 250);
  };

  const ch = CHANNELS[channelIdx];

  return (
    <div className="relative w-full max-w-[380px] lg:max-w-[420px] select-none">
      {/* Twin Antennas */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-44 flex justify-between pointer-events-none z-0">
        <div className="w-1.5 h-20 bg-black origin-bottom -rotate-25 shadow-md border border-[#0c0b05]" />
        <div className="w-1.5 h-20 bg-black origin-bottom rotate-25 shadow-md border border-[#0c0b05]" />
      </div>

      {/* Outer Retro CRT Chassis */}
      <div className="relative bg-[#0c0b05] border-4 border-black p-4 md:p-5 p4-skew shadow-[10px_10px_0px_#FF6600] z-10">
        <div className="p4-skew-reverse">
          
          {/* TV Screen Surround */}
          <div className="relative bg-[#1a1708] border-4 border-black p-3.5 rounded-lg shadow-inner">
            
            {/* Curved CRT Display */}
            <div 
              onClick={flipChannel}
              title="Click monitor to switch channel"
              className="relative w-full h-48 md:h-56 bg-[#080703] border-4 border-[#0c0b05] rounded overflow-hidden flex flex-col items-center justify-center cursor-pointer group shadow-2xl"
            >
              {/* Scanlines */}
              <div className="absolute inset-0 crt-scanlines z-10 opacity-50 pointer-events-none" />

              {/* Screen Content */}
              {isFlickering ? (
                <div className="absolute inset-0 rainbow-strip opacity-90 animate-pulse" />
              ) : (
                <div className="relative z-20 text-center p-3">
                  <div className="w-10 h-10 mx-auto mb-2 bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Tv size={22} className="text-black" />
                  </div>

                  <span className="font-display font-p4-display text-2xl md:text-3xl text-[#FFE600] block tracking-wider leading-none">
                    {ch.title}
                  </span>
                  <span className="font-mono text-[9px] text-white/80 block mt-1.5 tracking-widest uppercase">
                    {ch.subtitle}
                  </span>

                  {/* Rainbow Strip Bottom Indicator */}
                  <div className="w-28 h-1.5 rainbow-strip mx-auto mt-3 border border-black" />
                </div>
              )}
            </div>

            {/* Monitor Control Dials on Bottom */}
            <div className="flex items-center justify-between mt-2.5 pt-2 border-t-2 border-[#FFE600]/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF6600] animate-pulse" />
                <span className="font-mono text-[9px] text-[#FFE600] font-bold tracking-wider">
                  ALPHA CRT // FEED 0{ch.num}
                </span>
              </div>

              {/* Clickable Channel Dial Knobs */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={flipChannel}
                  className="w-6 h-6 rounded-full bg-[#FFE600] border-2 border-black flex items-center justify-center text-[9px] font-black text-black hover:bg-white transition-colors"
                >
                  CH
                </button>
                <button 
                  onClick={() => sound.playSelect()}
                  className="w-6 h-6 rounded-full bg-white border-2 border-black flex items-center justify-center text-[9px] font-black text-black hover:bg-[#FFE600] transition-colors"
                >
                  VOL
                </button>
              </div>
            </div>

          </div>

          {/* Tactical Operative Badge */}
          <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[#FFE600]">
            <span>ALPHA PROTOCOL // UNIT #01</span>
            <span className="bg-[#FFE600] text-black px-2 py-0.5 font-bold">
              SIGNAL LOCK
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
