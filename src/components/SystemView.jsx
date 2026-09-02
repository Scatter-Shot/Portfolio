"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/soundEngine';
import { Send, CheckCircle } from 'lucide-react';

export default function SystemView({ onBack }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSelect();
    setSent(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      className="relative z-30 w-full max-w-4xl ml-auto pr-6 md:pr-16 text-white"
    >
      <div className="flex items-center justify-between border-b-2 border-cyan-400/40 pb-4 mb-8">
        <div>
          <span className="text-cyan-400 font-mono tracking-widest text-xs uppercase block">Comms Terminal</span>
          <h2 className="text-5xl md:text-7xl font-display tracking-wide">SYSTEM / TRANSMISSION</h2>
        </div>
        <button
          onClick={() => { sound.playBack(); onBack(); }}
          onMouseEnter={() => sound.playHover()}
          className="px-6 py-2 border border-cyan-400/50 bg-blue-950/40 hover:bg-cyan-400 hover:text-black transition-all font-display text-xl tracking-widest -skew-x-12"
        >
          ESC / BACK
        </button>
      </div>

      <div className="bg-[#01091b]/90 border-2 border-cyan-400/50 p-8 backdrop-blur-md -skew-x-2">
        {sent ? (
          <div className="text-center py-12">
            <CheckCircle className="mx-auto text-cyan-400 mb-4" size={56} />
            <h3 className="text-4xl font-display mb-2">SIGNAL TRANSMITTED</h3>
            <p className="text-sm font-mono text-gray-300">Message successfully dispatched to S.E.E.S. network inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase">Operative Identifier (Your Name)</label>
              <input 
                required
                type="text" 
                className="w-full bg-blue-950/40 border border-cyan-500/40 px-4 py-3 text-white focus:outline-none focus:border-cyan-300 font-mono text-sm"
                placeholder="Agent Name / Company"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase">Frequency (Email / Contact)</label>
              <input 
                required
                type="email" 
                className="w-full bg-blue-950/40 border border-cyan-500/40 px-4 py-3 text-white focus:outline-none focus:border-cyan-300 font-mono text-sm"
                placeholder="agent@domain.com"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase">Encoded Transmission (Message)</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-blue-950/40 border border-cyan-500/40 px-4 py-3 text-white focus:outline-none focus:border-cyan-300 font-mono text-sm"
                placeholder="Let's collaborate on an engine, web platform, or project..."
              />
            </div>
            <button
              type="submit"
              onMouseEnter={() => sound.playHover()}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-black py-4 font-display text-2xl tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(0,229,255,0.4)]"
            >
              <Send size={20} /> TRANSMIT MESSAGE
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}