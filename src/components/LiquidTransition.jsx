"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiquidTransition({ isVisible, color = "#00E5FF" }) {
  return (
    <>
      {/* SVG gooey liquid filter definition */}
      <svg className="fixed top-0 left-0 w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="p3r-liquid-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            <feColorMatrix 
              in="blur" 
              type="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -9" 
              result="gooey" 
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center">
            {/* Primary Liquid Splash Wave */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -20 }}
              animate={{ scale: 2.5, opacity: 0.95, rotate: 0 }}
              exit={{ scale: 4.5, opacity: 0, rotate: 20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ 
                filter: "url('#p3r-liquid-filter')",
                background: "radial-gradient(circle, #00E5FF 0%, #0055FF 50%, #010a1f 90%)"
              }}
              className="w-[110vw] h-[110vw] rounded-full origin-center shadow-[0_0_80px_#00E5FF]"
            />

            {/* Accent Diagonal Flash Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.8 }}
              exit={{ scaleX: 1.5, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-x-0 h-1.5 bg-white transform -rotate-12 shadow-[0_0_20px_#fff]"
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
