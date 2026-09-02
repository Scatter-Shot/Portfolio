"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function P4TVStatic({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center overflow-hidden bg-black/35 select-none will-change-transform"
        >
          {/* Retro SMPTE Rainbow Color Bars Flash */}
          <div className="w-full h-12 rainbow-strip shadow-[0_0_25px_rgba(255,255,255,0.7)] border-y-2 border-black transform -skew-y-2 will-change-transform" />

          {/* High Voltage CRT Flash Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="w-full h-1.5 bg-white shadow-[0_0_30px_#FFE600] z-20 my-1.5 will-change-transform"
          />

          {/* Channel Label */}
          <div className="relative z-30 font-display font-p4-display text-xl sm:text-2xl text-black bg-[#FFE600] px-4 py-1 border-3 border-black shadow-lg p4-skew will-change-transform">
            <span className="p4-skew-reverse block tracking-widest font-black">
              NEXUS PROTOCOL // ROUTING
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
