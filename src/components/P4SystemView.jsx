"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import { Tv, Send, CheckCircle, Radio, Activity } from 'lucide-react';

export default function P4SystemView({ onBack }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSelect();
    sound.playTVStatic();
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-4xl text-black ml-auto pb-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-4 h-8 bg-[#FF6600] border-2 border-black" />
          <div>
            <span className="font-mono text-xs font-black tracking-widest text-[#0c0b05] uppercase block">
              MIDNIGHT CHANNEL // TRANSMISSION RELAY
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-p4-display text-[#0c0b05] leading-none">
              SYSTEM <span className="text-[#FF6600] text-3xl">/ BROADCAST</span>
            </h2>
          </div>
        </div>

        <button
          onClick={() => { sound.playBack(); onBack(); }}
          onMouseEnter={() => sound.playHover()}
          className="px-8 py-2 border-4 border-black bg-[#0c0b05] text-[#FFE600] hover:bg-[#FF6600] hover:text-white font-display font-p4-display text-xl p4-skew transition-all shadow-[6px_6px_0px_#0c0b05]"
        >
          <span className="block p4-skew-reverse font-black tracking-widest">
            ESC // BACK
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Vector Live Broadcast Signal Monitor */}
        <div className="lg:col-span-5 bg-[#0c0b05] border-4 border-black p-5 p4-skew shadow-[8px_8px_0px_#FF6600] flex flex-col justify-between">
          <div className="p4-skew-reverse">
            <div className="flex items-center justify-between border-b-2 border-[#FFE600]/30 pb-2 mb-3">
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#FFE600] font-bold">
                <Tv size={15} />
                <span>INABA BROADCAST MONITOR</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* CRT Oscilloscope Screen Frame (Pure Vector & SVG) */}
            <div className="relative w-full h-44 md:h-52 rounded border-2 border-[#FFE600]/40 overflow-hidden bg-[#080703] shadow-inner flex flex-col items-center justify-center p-3">
              <div className="absolute inset-0 crt-scanlines z-10 opacity-60" />
              
              {/* Dynamic Oscilloscope Wave Vector */}
              <div className="relative z-20 w-full flex items-center justify-center">
                <svg viewBox="0 0 300 80" className="w-full h-20 overflow-visible stroke-[#FFE600] fill-none">
                  <path
                    d="M 0 40 Q 25 10 50 40 T 100 40 T 150 15 T 200 65 T 250 40 T 300 40"
                    strokeWidth="3"
                    className="drop-shadow-[0_0_8px_#FFE600]"
                  />
                  <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255,230,0,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Status Readouts */}
              <div className="relative z-20 mt-3 w-full flex justify-between items-center font-mono text-[9px] text-[#FFE600]">
                <span>FREQ: 104.5 MHz</span>
                <span className="bg-[#FFE600] text-black px-1.5 py-0.5 font-bold">SIGNAL LOCKED</span>
              </div>

              <span className="absolute bottom-2 left-2 bg-black/90 px-2 py-0.5 text-[8px] font-mono text-gray-400 border border-white/20">
                MAYONAKA TV // TELEMETRY
              </span>
            </div>

            <div className="mt-3.5 p-3 bg-[#18160a] border-l-4 border-[#FFE600] text-gray-200 font-mono text-[10px] leading-relaxed">
              "When it rains at midnight, turn on the television alone to broadcast your transmission."
            </div>
          </div>
        </div>

        {/* Right Column: Retro Transmission Form */}
        <div className="lg:col-span-7 bg-[#0c0b05] text-white border-4 border-black p-5 md:p-6 p4-skew shadow-[8px_8px_0px_#0c0b05]">
          <div className="p4-skew-reverse">
            
            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10"
              >
                <CheckCircle className="mx-auto text-[#FFE600] mb-3 drop-shadow-[0_0_15px_#FFE600]" size={56} />
                <h3 className="font-display font-p4-display text-3xl text-white">
                  TRANSMISSION BROADCASTED!
                </h3>
                <p className="font-mono text-xs text-gray-300 mt-2 max-w-sm mx-auto leading-relaxed">
                  Your message has been beamed directly through the Midnight Channel into Varun Kumar Kaushik's inbox.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-5 px-6 py-2 bg-[#FFE600] text-black font-display font-p4-display text-lg tracking-wider hover:bg-white transition-colors border-2 border-black"
                >
                  BROADCAST ANOTHER SIGNAL
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-mono text-[#FFE600] mb-1 font-bold uppercase tracking-wider">
                    Investigator Identifier (Your Name / Studio)
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-[#18160a] border-2 border-[#FFE600]/40 px-3.5 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#FFE600] focus:shadow-[0_0_12px_rgba(255,230,0,0.3)] transition-all"
                    placeholder="Yu Narukami / Studio Name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#FFE600] mb-1 font-bold uppercase tracking-wider">
                    Broadcast Frequency (Your Email)
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-[#18160a] border-2 border-[#FFE600]/40 px-3.5 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#FFE600] focus:shadow-[0_0_12px_rgba(255,230,0,0.3)] transition-all"
                    placeholder="investigator@yasogami.edu"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#FFE600] mb-1 font-bold uppercase tracking-wider">
                    Signal Transmission (Message)
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full bg-[#18160a] border-2 border-[#FFE600]/40 px-3.5 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#FFE600] focus:shadow-[0_0_12px_rgba(255,230,0,0.3)] transition-all resize-none"
                    placeholder="Inquiry regarding game engine systems, full-stack development, or creative opportunities..."
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => sound.playHover()}
                  className="w-full bg-[#FFE600] text-black py-3 font-display font-p4-display text-xl tracking-widest hover:bg-white hover:text-black transition-colors border-2 border-black flex items-center justify-center gap-2 shadow-[4px_4px_0px_#FF6600]"
                >
                  <Send size={18} />
                  DISPATCH TO MIDNIGHT CHANNEL
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </motion.div>
  );
}
