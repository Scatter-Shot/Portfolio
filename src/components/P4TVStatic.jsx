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
          transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center overflow-hidden bg-black/25 select-none will-change-transform"
        >
          {/* Subtle Retro Color Bars Sweep */}
          <div className="w-full h-8 sm:h-10 rainbow-strip shadow-[0_0_20px_rgba(255,255,255,0.6)] border-y-2 border-black transform -skew-y-2 will-change-transform opacity-90" />

          {/* High Voltage CRT Flash Beam */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.16, ease: "easeInOut" }}
            className="w-full h-1 bg-white shadow-[0_0_25px_#FFE600] z-20 my-1 will-change-transform"
          />

          {/* Snappy Channel Label */}
          <div className="relative z-30 font-display font-p4-display text-lg sm:text-xl text-black bg-[#FFE600] px-4 py-0.5 border-3 border-black shadow-md p4-skew will-change-transform">
            <span className="p4-skew-reverse block tracking-widest font-black">
              NEXUS PROTOCOL // ROUTING
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
