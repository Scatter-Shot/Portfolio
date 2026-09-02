"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function P3RTransition({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center">
          
          {/* Layer 1: Deep Ocean Dark Blue Wave Slice */}
          <motion.div
            initial={{ x: '100%', skewX: -15 }}
            animate={{ x: '-10%', skewX: -15 }}
            exit={{ x: '-120%', skewX: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 w-[140vw] bg-[#001f5c] shadow-[0_0_80px_rgba(0,85,255,0.6)]"
          />

          {/* Layer 2: Electric Cyan Liquid Wave Slice */}
          <motion.div
            initial={{ x: '110%', skewX: -15 }}
            animate={{ x: '0%', skewX: -15 }}
            exit={{ x: '-110%', skewX: -15 }}
            transition={{ duration: 0.32, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 w-[130vw] bg-gradient-to-r from-[#0055FF] via-[#00E5FF] to-white shadow-[0_0_100px_#00E5FF]"
          />

          {/* Layer 3: High Voltage White Slanted Flash Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1.2, opacity: 0.9 }}
            exit={{ scaleX: 2, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute w-full h-2 bg-white shadow-[0_0_30px_#fff] transform -rotate-12"
          />

          {/* Layer 4: Center All-Out Attack Star Flash */}
          <motion.div
            initial={{ scale: 0, opacity: 1, rotate: 0 }}
            animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0], rotate: 45 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-24 h-24 p3r-star bg-white shadow-[0_0_40px_#00E5FF]"
          />

        </div>
      )}
    </AnimatePresence>
  );
}
