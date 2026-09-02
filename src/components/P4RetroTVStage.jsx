"use client";
import React, { useState } from 'react';
import { sound } from '@/utils/soundEngine';
import { Tv } from 'lucide-react';

export default function P4RetroTVStage() {
  const [channel, setChannel] = useState(4);
  const [isFlickering, setIsFlickering] = useState(false);

  const flipChannel = () => {
    sound.playTVStatic();
    setIsFlickering(true);
    setChannel((prev) => (prev % 8) + 1);
    setTimeout(() => setIsFlickering(false), 250);
  };

  return (
    <div className="relative w-full max-w-[380px] lg:max-w-[420px] select-none">
      {/* Twin Rabbit-Ear Antennas */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-44 flex justify-between pointer-events-none z-0">
        <div className="w-1.5 h-20 bg-black origin-bottom -rotate-25 shadow-md border border-[#0c0b05]" />
        <div className="w-1.5 h-20 bg-black origin-bottom rotate-25 shadow-md border border-[#0c0b05]" />
      </div>

      {/* Outer Retro TV Chassis */}
      <div className="relative bg-[#0c0b05] border-4 border-black p-4 md:p-5 p4-skew shadow-[10px_10px_0px_#FF6600] z-10">
        <div className="p4-skew-reverse">
          
          {/* TV Screen Surround */}
          <div className="relative bg-[#1a1708] border-4 border-black p-3.5 rounded-lg shadow-inner">
            
            {/* Curved CRT Display */}
            <div 
              onClick={flipChannel}
              title="Click TV to flip Midnight Channel"
              className="relative w-full h-48 md:h-56 bg-[#080703] border-4 border-[#0c0b05] rounded overflow-hidden flex flex-col items-center justify-center cursor-pointer group shadow-2xl"
            >
              {/* Screen Content */}
              {isFlickering ? (
                <div className="absolute inset-0 rainbow-strip opacity-90 animate-pulse" />
              ) : (
                <div className="relative z-20 text-center p-3">
                  <div className="w-10 h-10 mx-auto mb-2 bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Tv size={22} className="text-black" />
                  </div>

                  <span className="font-display font-p4-display text-2xl md:text-3xl text-[#FFE600] block tracking-wider leading-none">
                    MIDNIGHT CH. {channel}
                  </span>
                  <span className="font-mono text-[9px] text-white/80 block mt-1 tracking-widest uppercase">
                    BROADCASTING FROM THE TV WORLD
                  </span>

                  {/* Rainbow Strip Bottom Indicator */}
                  <div className="w-28 h-1.5 rainbow-strip mx-auto mt-3 border border-black" />
                </div>
              )}
            </div>

            {/* TV Control Dials on Bottom */}
            <div className="flex items-center justify-between mt-2.5 pt-2 border-t-2 border-[#FFE600]/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF6600] animate-pulse" />
                <span className="font-mono text-[9px] text-[#FFE600] font-bold tracking-wider">
                  J-TV // INABA BROADCAST
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

          {/* Yasogami High Team Badge */}
          <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[#FFE600]">
            <span>INVESTIGATION UNIT #01</span>
            <span className="bg-[#FFE600] text-black px-2 py-0.5 font-bold">
              SIGNAL LOCK
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
