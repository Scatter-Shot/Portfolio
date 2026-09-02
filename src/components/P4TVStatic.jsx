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
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center overflow-hidden bg-black/40 select-none"
        >
          {/* Retro SMPTE Rainbow Color Bars Flash */}
          <div className="w-full h-14 rainbow-strip shadow-[0_0_25px_rgba(255,255,255,0.8)] border-y-2 border-black transform -skew-y-2" />

          {/* High Voltage CRT Flash Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1.2, 0.05] }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full h-2 bg-white shadow-[0_0_30px_#FFE600] z-20 my-2"
          />

          {/* Channel Label */}
          <div className="relative z-30 font-display font-p4-display text-2xl md:text-3xl text-black bg-[#FFE600] px-5 py-1.5 border-4 border-black shadow-xl p4-skew">
            <span className="p4-skew-reverse block tracking-widest font-black">
              ALPHA PROTOCOL // ROUTING
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
