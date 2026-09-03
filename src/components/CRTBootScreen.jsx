"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import { Power } from 'lucide-react';

export default function CRTBootScreen({ onComplete }) {
  const [phase, setPhase] = useState('STANDBY'); // 'STANDBY', 'IGNITING', 'BARS', 'REVEALING'

  const handlePowerOn = () => {
    if (phase !== 'STANDBY') return;

    sound.playCRTBootSound();
    setPhase('IGNITING');

    // 1. Cathode line expands
    setTimeout(() => {
      setPhase('BARS');
    }, 280);

    // 2. Chromatic test signal lock
    setTimeout(() => {
      setPhase('REVEALING');
    }, 650);

    // 3. Complete and hand off to main site
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  return (
    <div
      onClick={handlePowerOn}
      className="fixed inset-0 z-50 overflow-hidden bg-[#060502] select-none cursor-none flex items-center justify-center font-sans"
    >
      {/* 1. CRT Scanlines & Vignette */}
      <div className="absolute inset-0 crt-scanlines opacity-75 pointer-events-none z-10" />
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.85) 100%)'
        }}
      />

      {/* 2. STANDBY SCREEN */}
      {phase === 'STANDBY' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-20 flex flex-col items-center justify-center p-6 text-center"
        >
          {/* Glowing Retro CRT Standby Chassis */}
          <div className="relative p4-skew bg-[#0c0b05] border-4 border-[#FFE600] p-8 sm:p-10 shadow-[0_0_35px_rgba(255,230,0,0.25)] max-w-lg w-full">
            <div className="p4-skew-reverse flex flex-col items-center">
              
              {/* Standby LED & Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6600] animate-ping" />
                <span className="font-mono text-[10px] text-[#FFE600] font-black uppercase tracking-[0.25em]">
                  STANDBY MODE // CARRIER 104.5 GHz
                </span>
              </div>

              {/* Pulsing Power Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={handlePowerOn}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFE600] border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_#FF6600] group mb-6 transition-all hover:bg-white"
              >
                <Power size={38} className="text-black group-hover:scale-110 transition-transform" />
              </motion.button>

              {/* Tactical Title */}
              <h2 className="font-display font-p4-display text-3xl sm:text-4xl text-white tracking-widest leading-none mb-2">
                NEXUS PROTOCOL
              </h2>
              <p className="font-mono text-xs text-[#FFE600] font-bold uppercase tracking-widest mb-5">
                CLICK TO POWER ON CRT // TUNE IN
              </p>

              {/* Rainbow Ribbon Footer Accent */}
              <div className="w-44 h-2 rainbow-strip border border-black mb-3" />

              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                VARUN KUMAR KAUSHIK // OPERATIVE PORTFOLIO
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. CATHODE RAY TUBE IGNITION (Thin brilliant white line exploding open) */}
      {phase === 'IGNITING' && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <motion.div
            initial={{ scaleX: 0, scaleY: 0.005, opacity: 1 }}
            animate={{ scaleX: [0, 1.2, 1], scaleY: [0.005, 0.015, 1], opacity: 1 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="w-full h-full bg-white shadow-[0_0_100px_#FFE600]"
          />
        </div>
      )}

      {/* 4. CHROMATIC TEST BARS & STATIC SIGNAL LOCK */}
      {(phase === 'BARS' || phase === 'REVEALING') && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'REVEALING' ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#FFE600] pointer-events-none"
        >
          {/* SMPTE Rainbow Flash Bars */}
          <div className="w-full h-24 rainbow-strip shadow-2xl border-y-4 border-black transform -skew-y-3 flex items-center justify-center">
            <span className="font-display font-p4-display text-3xl sm:text-4xl text-black bg-[#FFE600] px-6 py-1 border-4 border-black shadow-xl p4-skew">
              <span className="p4-skew-reverse block font-black tracking-widest">
                SIGNAL ACQUIRED // 104.5 GHz
              </span>
            </span>
          </div>

          <div className="mt-4 font-mono text-xs text-black font-black uppercase tracking-[0.3em] bg-white px-4 py-1 border-2 border-black">
            NEXUS ENGINE // SYSTEM BOOT COMPLETE
          </div>
        </motion.div>
      )}
    </div>
  );
}
